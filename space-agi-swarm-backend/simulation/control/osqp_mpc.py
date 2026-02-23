import numpy as np
import scipy.sparse as sp
import osqp

from .base_controller import Controller
from ..state import Satellite
from ..conjunction.collision_probability import compute_pc_numeric_polar


class OSQPMPCController(Controller):
    def __init__(
        self,
        alpha_fuel: float,
        pc_threshold: float,
        u_max_ms: float = 0.08,
        w_scale: float = 1.0e6,
        w_power: float = 1.0,
        enable_noop_bias: float = 1e-12,
        secondary_max_increase_factor: float = 1.25,
        secondary_abs_margin: float = 5e-6,
        backtrack_steps: int = 6,
        pc_theta_steps: int = 48,
        pc_radial_steps: int = 32,
        hard_body_radius_m: float = 25.0,
    ):
        self.alpha = float(alpha_fuel)
        self.pc_threshold = float(pc_threshold)
        self.u_max = float(u_max_ms)
        self.w_scale = float(w_scale)
        self.w_power = float(w_power)
        self.noop_bias = float(enable_noop_bias)

        self.secondary_max_increase_factor = float(secondary_max_increase_factor)
        self.secondary_abs_margin = float(secondary_abs_margin)
        self.backtrack_steps = int(backtrack_steps)

        self.pc_theta_steps = int(pc_theta_steps)
        self.pc_radial_steps = int(pc_radial_steps)
        self.R = float(hard_body_radius_m)

        self._solvers = {}
        self._A = sp.eye(3, format="csc")
        self._l = -self.u_max * np.ones(3, dtype=np.float64)
        self._u = self.u_max * np.ones(3, dtype=np.float64)

    def _weight(self, pc: float) -> float:
        if pc <= self.pc_threshold:
            return 0.0
        ratio = pc / max(self.pc_threshold, 1e-20)
        return self.w_scale * (ratio**self.w_power)

    def _get_solver(self, sat_id: int) -> osqp.OSQP:
        if sat_id in self._solvers:
            return self._solvers[sat_id]

        solver = osqp.OSQP()
        P0 = sp.csc_matrix(np.eye(3, dtype=np.float64))
        q0 = np.zeros(3, dtype=np.float64)

        solver.setup(
            P=P0,
            q=q0,
            A=self._A,
            l=self._l,
            u=self._u,
            verbose=False,
            warm_start=True,
            polish=True,
            eps_abs=1e-5,
            eps_rel=1e-5,
            max_iter=2000,
        )

        self._solvers[sat_id] = solver
        return solver

    def _pc_after_u(self, nb: dict, u: np.ndarray) -> float:
        pc0 = float(nb.get("pc", 0.0))
        tca = float(nb.get("tca_s", 0.0))
        if tca <= 0.0:
            return pc0

        mu_2d = np.asarray(nb["mu_2d"], dtype=np.float64).reshape(2)
        Sigma_2d = np.asarray(nb["Sigma_2d"], dtype=np.float64).reshape(2, 2)
        H = np.asarray(nb["H"], dtype=np.float64).reshape(2, 3)

        B = tca * H
        mu2 = mu_2d + (B @ u)

        pc2 = compute_pc_numeric_polar(
            mu_2d=mu2,
            Sigma_2d=Sigma_2d,
            R=self.R,
            theta_steps=self.pc_theta_steps,
            radial_steps=self.pc_radial_steps,
        )
        return float(pc2)

    def _secondary_risk_ok(self, neighbors: list, u: np.ndarray) -> bool:
        if not neighbors:
            return True

        pcs0 = np.array([float(nb.get("pc", 0.0)) for nb in neighbors], dtype=np.float64)
        max0 = float(pcs0.max())

        pcs1 = []
        for nb in neighbors:
            pcs1.append(self._pc_after_u(nb, u))
        pcs1 = np.array(pcs1, dtype=np.float64)
        max1 = float(pcs1.max())

        before_bad = pcs0 > self.pc_threshold
        after_bad = pcs1 > self.pc_threshold
        if np.any(after_bad & (~before_bad)):
            return False

        allowed = max(self.secondary_abs_margin, self.secondary_max_increase_factor * max0)
        if max1 > allowed:
            return False

        return True

    def _backtrack_to_safe(self, neighbors: list, u: np.ndarray) -> np.ndarray | None:
        if np.linalg.norm(u) < 1e-10:
            return None

        gamma = 1.0
        for _ in range(max(1, self.backtrack_steps)):
            u_try = gamma * u
            if self._secondary_risk_ok(neighbors, u_try):
                return u_try
            gamma *= 0.5

        return None

    def compute_maneuver(self, sat: Satellite, neighbors: list) -> None:
        if not neighbors:
            sat.dv_eci_pending = None
            sat.risk = 0.0
            return

        max_pc = float(max(float(nb.get("pc", 0.0)) for nb in neighbors))
        sat.risk = float(min(1.0, max_pc / max(self.pc_threshold, 1e-20)))

        if max_pc <= self.pc_threshold:
            sat.dv_eci_pending = None
            return

        P_dense = (2.0 * self.alpha) * np.eye(3, dtype=np.float64)
        q = np.zeros(3, dtype=np.float64)

        for nb in neighbors:
            pc = float(nb.get("pc", 0.0))
            w = self._weight(pc)
            if w <= 0.0:
                continue

            tca = float(nb.get("tca_s", 0.0))
            if tca <= 0.0:
                continue

            mu_2d = np.asarray(nb["mu_2d"], dtype=np.float64).reshape(2)
            H = np.asarray(nb["H"], dtype=np.float64).reshape(2, 3)
            B = (tca * H).astype(np.float64)

            BtB = B.T @ B
            Btmu = B.T @ mu_2d

            P_dense += 2.0 * w * BtB
            q += 2.0 * w * Btmu

        P_dense += self.noop_bias * np.eye(3, dtype=np.float64)
        P = sp.csc_matrix(P_dense)

        solver = self._get_solver(sat.sat_id)
        solver.update(Px=P.data, q=q)
        res = solver.solve()

        if res.info.status_val not in (1, 2):
            sat.dv_eci_pending = None
            return

        u_star = np.asarray(res.x, dtype=np.float64).reshape(3)
        if float(np.linalg.norm(u_star)) < 1e-6:
            sat.dv_eci_pending = None
            return

        u_safe = self._backtrack_to_safe(neighbors, u_star)
        if u_safe is None:
            sat.dv_eci_pending = None
            return

        sat.dv_eci_pending = u_safe
