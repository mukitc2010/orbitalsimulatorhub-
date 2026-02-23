import numpy as np
from ..utils.numerics import unit


def encounter_plane_basis(v_rel: np.ndarray) -> tuple:
    vhat = unit(v_rel)
    a = np.array([1.0, 0.0, 0.0], dtype=np.float64)
    if abs(float(np.dot(a, vhat))) > 0.9:
        a = np.array([0.0, 1.0, 0.0], dtype=np.float64)
    e1 = unit(np.cross(vhat, a))
    e2 = unit(np.cross(vhat, e1))
    return vhat, e1, e2


def encounter_plane_H(v_rel: np.ndarray) -> np.ndarray:
    _, e1, e2 = encounter_plane_basis(v_rel)
    H = np.vstack([e1, e2]).astype(np.float64)
    return H


def project_to_encounter_plane(r_rel: np.ndarray, v_rel: np.ndarray) -> np.ndarray:
    H = encounter_plane_H(v_rel)
    return (H @ r_rel.astype(np.float64)).astype(np.float64)
