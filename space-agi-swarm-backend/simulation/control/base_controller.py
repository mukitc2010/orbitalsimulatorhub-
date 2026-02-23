from abc import ABC, abstractmethod
from ..state import Satellite


class Controller(ABC):
    @abstractmethod
    def compute_maneuver(self, sat: Satellite, neighbors: list) -> None:
        raise NotImplementedError
