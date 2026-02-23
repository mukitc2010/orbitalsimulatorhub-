from dataclasses import dataclass
import numpy as np


@dataclass
class Satellite:
    sat_id: int
    r_eci: np.ndarray
    v_eci: np.ndarray
    P: np.ndarray
    fuel: float
    risk: float
    dv_eci_pending: np.ndarray | None = None
