import numpy as np
from ..utils.numerics import norm


def tca_time_linear(r_rel: np.ndarray, v_rel: np.ndarray, max_window_s: float) -> float:
    vv = float(np.dot(v_rel, v_rel))
    if vv < 1e-12:
        return 0.0
    t = -float(np.dot(r_rel, v_rel)) / vv
    if t < 0.0:
        return 0.0
    if t > max_window_s:
        return float(max_window_s)
    return float(t)


def miss_distance_linear(r_rel: np.ndarray, v_rel: np.ndarray, t: float) -> float:
    r_t = r_rel + v_rel * t
    return norm(r_t)
