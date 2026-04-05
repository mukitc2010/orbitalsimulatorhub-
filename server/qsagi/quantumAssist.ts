import { SimParams, SimRun } from "./types";
import { simulateTrajectory } from "./physics";
import { summarizeViolations } from "./safety";

export function scoreRun(run: SimRun): number {
  const v = run.summary.violations.length;
  const minR = run.summary.minR;
  const fuel = run.summary.fuelUsed;

  if (v > 0) return -100000;
  return 10000 - minR * 100 - fuel * 50;
}

export function buildRun(params: SimParams, id: string): SimRun {
  const points = simulateTrajectory(params);
  const minR = Math.min(...points.map((p) => p.r));
  const maxTidal = Math.max(...points.map((p) => p.tidal));
  const fuelUsed = points.length ? points[points.length - 1].fuelUsed : 0;
  const violations = summarizeViolations(points);

  return {
    id,
    createdAt: new Date().toISOString(),
    params,
    points,
    summary: { minR, maxTidal, fuelUsed, violations },
  };
}

export function quantumAssistOptimize(base: SimParams): SimParams {
  const candidates: SimParams[] = [];
  const deltas = [-0.35, -0.2, -0.1, 0, 0.1, 0.2, 0.35];

  for (const d of deltas) {
    candidates.push({ ...base, v0: Math.max(0.01, base.v0 * (1 + d)), quantumAssist: false });
  }

  let best = candidates[0];
  let bestScore = -Infinity;

  for (let i = 0; i < candidates.length; i++) {
    const run = buildRun(candidates[i], `candidate-${i}`);
    const s = scoreRun(run);
    if (s > bestScore) {
      bestScore = s;
      best = candidates[i];
    }
  }

  return { ...best, quantumAssist: true };
}
