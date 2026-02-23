import numpy as np


def gaussian_pdf_2d(x: np.ndarray, mu: np.ndarray, Sigma: np.ndarray) -> float:
    det = float(np.linalg.det(Sigma))
    if det <= 0.0:
        return 0.0
    inv = np.linalg.inv(Sigma)
    d = x - mu
    expo = -0.5 * float(d.T @ inv @ d)
    norm = 1.0 / (2.0 * np.pi * np.sqrt(det))
    return float(norm * np.exp(expo))


def compute_pc_numeric_polar(
    mu_2d: np.ndarray,
    Sigma_2d: np.ndarray,
    R: float,
    theta_steps: int = 72,
    radial_steps: int = 48,
) -> float:
    mu = mu_2d.astype(np.float64)
    S = Sigma_2d.astype(np.float64)

    det = float(np.linalg.det(S))
    if det <= 1e-24:
        return 0.0

    theta_steps = max(8, int(theta_steps))
    radial_steps = max(8, int(radial_steps))

    dtheta = 2.0 * np.pi / theta_steps
    dr = R / radial_steps

    pc = 0.0
    for k in range(theta_steps):
        theta = (k + 0.5) * dtheta
        c, s = np.cos(theta), np.sin(theta)
        for m in range(radial_steps):
            r = (m + 0.5) * dr
            x = np.array([r * c, r * s], dtype=np.float64)
            pc += gaussian_pdf_2d(x, mu, S) * r * dr * dtheta

    pc = max(0.0, min(1.0, float(pc)))
    return float(pc)
