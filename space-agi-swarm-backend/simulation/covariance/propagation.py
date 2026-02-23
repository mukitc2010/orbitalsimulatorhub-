import numpy as np


def make_process_noise_Q(sig_r: float, sig_v: float) -> np.ndarray:
    Q = np.zeros((6, 6), dtype=np.float64)
    Q[0, 0] = sig_r**2
    Q[1, 1] = sig_r**2
    Q[2, 2] = sig_r**2
    Q[3, 3] = sig_v**2
    Q[4, 4] = sig_v**2
    Q[5, 5] = sig_v**2
    return Q


def propagate_covariance(P: np.ndarray, Phi: np.ndarray, Q: np.ndarray) -> np.ndarray:
    return Phi @ P @ Phi.T + Q
