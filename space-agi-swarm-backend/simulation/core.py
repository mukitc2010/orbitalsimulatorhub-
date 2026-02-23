import numpy as np
from .config import SimConfig
from .state import Satellite
from .propagators.j2 import J2Propagator
from .conjunction.candidate_filter import candidate_pairs_shell_kdtree
from .conjunction.tca_solver import tca_time_linear, miss_distance_linear
from .conjunction.encounter_plane import encounter_plane_H, project_to_encounter_plane
from .conjunction.collision_probability import compute_pc_numeric_polar
from .covariance.propagation import make_process_noise_Q, propagate_covariance
from .control.osqp_mpc import OSQPMPCController


class Simulation:
    def __init__(self, cfg: SimConfig):
        self.cfg = cfg
        self.t = 0.0
        self.rng = np.random.default_rng(cfg.seed)

        self.propagator = J2Propagator()

        self.controller = OSQPMPCController(
            alpha_fuel=cfg.alpha_fuel,
            pc_threshold=cfg.pc_threshold,
            u_max_ms=0.08,
            w_scale=1e6,
            w_power=1.0,
            pc_theta_steps=cfg.pc_theta_steps,
            pc_radial_steps=cfg.pc_radial_steps,
            hard_body_radius_m=cfg.hard_body_radius_m,
        )

        self.Q = make_process_noise_Q(cfg.process_sigma_r_m, cfg.process_sigma_v_ms)

        self.satellites = self._init_constellation(cfg.n_sats)

    def _init_constellation(self, n: int) -> list:
        from .utils.constants import MU_EARTH, R_EARTH
        sats = []

        alt0 = 550e3
        r0 = R_EARTH + alt0

        sig_r = self.cfg.init_sigma_r_m
        sig_v = self.cfg.init_sigma_v_ms

        P0 = np.zeros((6, 6), dtype=np.float64)
        P0[0, 0] = sig_r**2
        P0[1, 1] = sig_r**2
        P0[2, 2] = sig_r**2
        P0[3, 3] = sig_v**2
        P0[4, 4] = sig_v**2
        P0[5, 5] = sig_v**2

        for i in range(n):
            theta = self.rng.uniform(0, 2 * np.pi)
            phi = self.rng.uniform(-0.2, 0.2)

            r = np.array(
                [
                    r0 * np.cos(theta),
                    r0 * np.sin(theta),
                    r0 * np.sin(phi),
                ],
                dtype=np.float64,
            )

            vmag = np.sqrt(MU_EARTH / np.linalg.norm(r))
            v = vmag * np.array([-np.sin(theta), np.cos(theta), 0.0], dtype=np.float64)

            sats.append(
                Satellite(
                    sat_id=i,
                    r_eci=r,
                    v_eci=v,
                    P=P0.copy(),
                    fuel=1.0,
                    risk=0.0,
                    dv_eci_pending=None,
                )
            )
        return sats

    def _dyn(self, y: np.ndarray) -> np.ndarray:
        r = y[0:3]
        v = y[3:6]
        a = self.propagator._accel(r)
        return np.hstack((v, a)).astype(np.float64)

    def _jacobian_A_numeric(self, y: np.ndarray) -> np.ndarray:
        A = np.zeros((6, 6), dtype=np.float64)
        eps_r = float(self.cfg.jac_eps_r_m)
        eps_v = float(self.cfg.jac_eps_v_ms)

        for k in range(6):
            dy = np.zeros(6, dtype=np.float64)
            dy[k] = eps_r if k < 3 else eps_v
            fp = self._dyn(y + dy)
            fm = self._dyn(y - dy)
            A[:, k] = (fp - fm) / (2.0 * dy[k])
        return A

    def _Phi_discrete_first_order(self, A: np.ndarray, dt: float) -> np.ndarray:
        return (np.eye(6, dtype=np.float64) + A * float(dt)).astype(np.float64)

    def step(self, dt: float) -> dict:
        dt = float(dt)

        for s in self.satellites:
            y = np.hstack((s.r_eci, s.v_eci)).astype(np.float64)
            A = self._jacobian_A_numeric(y)
            Phi = self._Phi_discrete_first_order(A, dt)

            r, v = self.propagator.step(s.r_eci, s.v_eci, dt)
            s.r_eci, s.v_eci = r, v

            s.P = propagate_covariance(s.P, Phi, self.Q)

        positions = np.vstack([s.r_eci for s in self.satellites])
        pairs = candidate_pairs_shell_kdtree(
            positions=positions,
            shell_thickness_m=self.cfg.shell_thickness_m,
            screen_radius_m=self.cfg.screen_radius_m,
        )

        neighbors_by_id = {s.sat_id: [] for s in self.satellites}

        for (i, j) in pairs:
            si = self.satellites[i]
            sj = self.satellites[j]

            r_rel = si.r_eci - sj.r_eci
            v_rel = si.v_eci - sj.v_eci

            tca = tca_time_linear(r_rel, v_rel, self.cfg.tca_window_s)
            miss = miss_distance_linear(r_rel, v_rel, tca)

            if miss > self.cfg.screen_radius_m:
                continue

            r_rel_tca = r_rel + v_rel * tca

            mu_2d = project_to_encounter_plane(r_rel_tca, v_rel)

            Sigma_rel = si.P[0:3, 0:3] + sj.P[0:3, 0:3]

            H = encounter_plane_H(v_rel)
            Sigma_2d = (H @ Sigma_rel @ H.T).astype(np.float64)

            pc = compute_pc_numeric_polar(
                mu_2d=mu_2d,
                Sigma_2d=Sigma_2d,
                R=float(self.cfg.hard_body_radius_m),
                theta_steps=int(self.cfg.pc_theta_steps),
                radial_steps=int(self.cfg.pc_radial_steps),
            )

            info_i = {
                "other_id": sj.sat_id,
                "tca_s": float(tca),
                "miss_m": float(miss),
                "r_rel_tca": r_rel_tca.astype(np.float64),
                "mu_2d": mu_2d.astype(np.float64),
                "Sigma_2d": Sigma_2d.astype(np.float64),
                "pc": float(pc),
                "H": H.astype(np.float64),
            }
            info_j = {
                "other_id": si.sat_id,
                "tca_s": float(tca),
                "miss_m": float(miss),
                "r_rel_tca": (-r_rel_tca).astype(np.float64),
                "mu_2d": (-mu_2d).astype(np.float64),
                "Sigma_2d": Sigma_2d.astype(np.float64),
                "pc": float(pc),
                "H": H.astype(np.float64),
            }
            neighbors_by_id[si.sat_id].append(info_i)
            neighbors_by_id[sj.sat_id].append(info_j)

        for s in self.satellites:
            self.controller.compute_maneuver(s, neighbors_by_id[s.sat_id])

        for s in self.satellites:
            if s.dv_eci_pending is not None:
                s.v_eci = s.v_eci + s.dv_eci_pending
                s.fuel = max(0.0, s.fuel - float(np.linalg.norm(s.dv_eci_pending)) * 1e-3)

                inflate_v = (2e-3) ** 2
                s.P[3, 3] += inflate_v
                s.P[4, 4] += inflate_v
                s.P[5, 5] += inflate_v

                s.dv_eci_pending = None

        self.t += dt

        telem = {
            "t": float(self.t),
            "satellites": [
                {
                    "id": s.sat_id,
                    "r": s.r_eci.tolist(),
                    "v": s.v_eci.tolist(),
                    "risk": float(s.risk),
                    "fuel": float(s.fuel),
                }
                for s in self.satellites
            ],
            "num_candidates": int(len(pairs)),
        }
        return telem
