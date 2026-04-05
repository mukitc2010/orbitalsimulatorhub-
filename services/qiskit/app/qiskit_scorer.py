"""Qiskit-based candidate scoring for quantum-assist."""
from __future__ import annotations

import math
import numpy as np
from typing import List, Tuple

from qiskit import QuantumCircuit
from qiskit.quantum_info import Statevector


def _toy_physics_penalty(
    M: float,
    r0: float,
    v0: float,
    horizon_margin: float,
    tidal_limit: float,
    fuel_budget: float,
) -> Tuple[float, dict]:
    """
    A lightweight proxy for "safety feasibility" without running the full sim here.
    You already run the real sim in Next.js; this microservice is the Q-assist scorer.
    """
    rs = 2.0 * M
    min_allowed_r = rs * horizon_margin

    # crude: higher v0 tends to increase min radius, lower v0 tends to plunge
    # estimate closest approach proxy
    # (not GR; just a heuristic to rank candidates)
    r_min_est = r0 * (1.0 - min(0.8, (0.45 / max(v0, 1e-6)) * 0.15))
    r_min_est = max(0.0, r_min_est)

    # tidal proxy ~ M / r^3
    tidal_est = M / max(r_min_est, 1e-6) ** 3

    # fuel proxy grows with v0 and mass
    fuel_est = abs(v0) * 8.0 + M * 0.8

    violations = []
    if r_min_est <= min_allowed_r:
        violations.append("horizon")
    if tidal_est > tidal_limit:
        violations.append("tidal")
    if fuel_est > fuel_budget:
        violations.append("fuel")

    # penalty: big negative if violations
    penalty = 0.0
    if violations:
        penalty -= 1000.0 * len(violations)

    # mild preference for smaller r_min_est (closer flyby) if safe
    penalty -= r_min_est * 10.0
    penalty -= fuel_est * 2.0

    return penalty, {
        "r_min_est": r_min_est,
        "tidal_est": tidal_est,
        "fuel_est": fuel_est,
        "violations": violations,
    }


def _qiskit_success_probability(p_classical: float) -> float:
    """
    Use a simple 1-qubit circuit where amplitude encodes success probability.
    If p_classical in [0,1], prepare Ry(2*arcsin(sqrt(p))) so that measuring |1> ~ p.
    Then compute exact probability from statevector.
    """
    p = float(np.clip(p_classical, 0.0, 1.0))
    theta = 2.0 * math.asin(math.sqrt(p))  # ensures Pr(1)=p

    qc = QuantumCircuit(1)
    qc.ry(theta, 0)

    sv = Statevector.from_instruction(qc)
    probs = sv.probabilities()
    # state |0>, |1>
    return float(probs[1])


def score_candidates_with_qiskit(
    M: float,
    r0: float,
    base_v0: float,
    deltas: List[float],
    horizon_margin: float,
    tidal_limit: float,
    fuel_budget: float,
) -> List[dict]:
    """
    For each candidate v0, compute:
      - classical heuristic features
      - qiskit-estimated success probability
      - combined score
    """
    out = []
    for d in deltas:
        v0 = max(0.001, base_v0 * (1.0 + d))
        penalty, info = _toy_physics_penalty(
            M, r0, v0, horizon_margin, tidal_limit, fuel_budget
        )

        # Convert penalty to a classical success-prob proxy (sigmoid)
        # Higher penalty => lower p
        p_classical = 1.0 / (1.0 + math.exp(((-penalty) - 50.0) / 25.0))
        p_q = _qiskit_success_probability(p_classical)

        # Combined score:
        # - Prefer high success probability
        # - Keep some shaping via penalty so it's not flat
        score = (p_q * 1000.0) + penalty

        notes = None
        if info["violations"]:
            notes = "violations=" + ",".join(info["violations"])

        out.append({
            "v0": v0,
            "score": score,
            "estimated_success_prob": p_q,
            "notes": notes,
            "debug": info,
        })

    # sort desc score
    out.sort(key=lambda x: x["score"], reverse=True)
    return out
