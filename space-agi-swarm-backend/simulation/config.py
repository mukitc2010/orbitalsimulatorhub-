from dataclasses import dataclass


@dataclass
class SimConfig:
    dt: float = 2.0
    stream_hz: float = 10.0
    n_sats: int = 500
    seed: int = 42

    screen_radius_m: float = 5_000.0
    hard_body_radius_m: float = 25.0
    tca_window_s: float = 600.0

    pc_threshold: float = 1e-4

    alpha_fuel: float = 1.0
    beta_risk: float = 1e6

    shell_thickness_m: float = 25_000.0

    init_sigma_r_m: float = 30.0
    init_sigma_v_ms: float = 0.03

    process_sigma_r_m: float = 0.05
    process_sigma_v_ms: float = 0.0005

    jac_eps_r_m: float = 0.5
    jac_eps_v_ms: float = 0.0005

    pc_theta_steps: int = 72
    pc_radial_steps: int = 48
