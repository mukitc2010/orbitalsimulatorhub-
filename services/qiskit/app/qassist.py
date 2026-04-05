"""Quantum-assist optimization using Qiskit scorer."""
from .schemas import QAssistRequest, QAssistResponse, CandidateScore
from .qiskit_scorer import score_candidates_with_qiskit


def quantum_assist_optimize(req: QAssistRequest) -> QAssistResponse:
    """
    Optimize v0 via candidate search with Qiskit-based scoring.
    """
    results = score_candidates_with_qiskit(
        M=req.M,
        r0=req.r0,
        base_v0=req.v0,
        deltas=req.search_deltas,
        horizon_margin=req.horizon_margin,
        tidal_limit=req.tidal_limit,
        fuel_budget=req.fuel_budget,
    )

    candidates = [
        CandidateScore(
            v0=r["v0"],
            score=r["score"],
            estimated_success_prob=r["estimated_success_prob"],
            notes=r.get("notes"),
        )
        for r in results
    ]

    best = results[0] if results else {"v0": req.v0, "score": 0.0}

    return QAssistResponse(
        best_v0=best["v0"],
        best_score=best["score"],
        candidates=candidates,
        meta={
            "backend": req.backend,
            "num_candidates": len(candidates),
        },
    )
