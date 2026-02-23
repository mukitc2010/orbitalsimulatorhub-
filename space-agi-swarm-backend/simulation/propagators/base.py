from abc import ABC, abstractmethod
import numpy as np


class Propagator(ABC):
    @abstractmethod
    def step(self, r_eci: np.ndarray, v_eci: np.ndarray, dt: float) -> tuple[np.ndarray, np.ndarray]:
        raise NotImplementedError
