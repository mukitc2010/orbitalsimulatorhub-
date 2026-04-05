"""Request/response schemas for Qiskit quantum-assist API."""
from pydantic import BaseModel, Field
from typing import List, Literal, Optional


class QAssistRequest(BaseModel):
    # Inputs from Next.js
    M: float = Field(..., gt=0)
    r0: float = Field(..., gt=0)
    v0: float = Field(..., gt=0)
    horizon_margin: float = Field(1.2, gt=1.0)
    tidal_limit: float = Field(0.01, gt=0.0)
    fuel_budget: float = Field(8.0, gt=0.0)

    # Candidate search window around v0
    search_deltas: List[float] = Field(
        default_factory=lambda: [-0.35, -0.2, -0.1, 0.0, 0.1, 0.2, 0.35]
    )

    # Which qiskit backend
    backend: Literal["aer_sim", "basic_sim"] = "basic_sim"


class CandidateScore(BaseModel):
    v0: float
    score: float
    estimated_success_prob: float
    notes: Optional[str] = None


class QAssistResponse(BaseModel):
    best_v0: float
    best_score: float
    candidates: List[CandidateScore]
    meta: dict
