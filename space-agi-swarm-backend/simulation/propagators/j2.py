import numpy as np
from .base import Propagator
from ..utils.constants import MU_EARTH, R_EARTH, J2
from ..utils.numerics import rk4_step


class J2Propagator(Propagator):
    def _accel(self, r: np.ndarray) -> np.ndarray:
        x, y, z = float(r[0]), float(r[1]), float(r[2])
        r2 = x * x + y * y + z * z
        r1 = np.sqrt(r2)
        r3 = r2 * r1

        ax = -MU_EARTH * x / r3
        ay = -MU_EARTH * y / r3
        az = -MU_EARTH * z / r3

        r5 = r3 * r2
        z2 = z * z
        factor = 1.5 * J2 * MU_EARTH * (R_EARTH**2) / r5
        s = 5.0 * z2 / r2
        ax_j2 = factor * x * (s - 1.0)
        ay_j2 = factor * y * (s - 1.0)
        az_j2 = factor * z * (s - 3.0)

        return np.array([ax + ax_j2, ay + ay_j2, az + az_j2], dtype=np.float64)

    def _dyn(self, t: float, y: np.ndarray) -> np.ndarray:
        r = y[0:3]
        v = y[3:6]
        a = self._accel(r)
        return np.hstack((v, a))

    def step(self, r_eci: np.ndarray, v_eci: np.ndarray, dt: float) -> tuple[np.ndarray, np.ndarray]:
        y0 = np.hstack((r_eci.astype(np.float64), v_eci.astype(np.float64)))
        y1 = rk4_step(self._dyn, 0.0, y0, dt)
        return y1[0:3], y1[3:6]
