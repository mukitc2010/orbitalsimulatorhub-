import type { SimParams } from "./types";

export type QAssistCandidate = {
  v0: number;
  score: number;
  estimated_success_prob: number;
  notes?: string | null;
};

export type QAssistResponse = {
  best_v0: number;
  best_score: number;
  candidates: QAssistCandidate[];
  meta: Record<string, unknown>;
};

export async function fetchQAssist(params: SimParams): Promise<QAssistResponse> {
  const base = process.env.QASSIST_URL || "http://localhost:8000";

  const res = await fetch(`${base}/qassist`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      M: params.M,
      r0: params.r0,
      v0: params.v0,
      horizon_margin: params.horizonMargin,
      tidal_limit: params.tidalLimit,
      fuel_budget: params.fuelBudget,
      search_deltas: [-0.35, -0.2, -0.1, 0, 0.1, 0.2, 0.35],
      backend: "basic_sim",
    }),
  });

  if (!res.ok) {
    const t = await res.text();
    throw new Error(`QAssist failed: ${res.status} ${t}`);
  }
  return (await res.json()) as QAssistResponse;
}
