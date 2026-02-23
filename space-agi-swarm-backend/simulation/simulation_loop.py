import time
from .config import SimConfig
from .core import Simulation


class SimulationRunner:
    def __init__(self, cfg: SimConfig):
        self.cfg = cfg
        self.sim = Simulation(cfg)
        self._last_emit = 0.0

    def tick(self):
        return self.sim.step(self.cfg.dt)

    def should_emit(self, now: float) -> bool:
        period = 1.0 / max(1e-6, self.cfg.stream_hz)
        if now - self._last_emit >= period:
            self._last_emit = now
            return True
        return False
