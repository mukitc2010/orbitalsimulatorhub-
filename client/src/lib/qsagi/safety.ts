import { SimParams } from "./types";

export function evaluateSafety(
  state: { r: number; M: number; tidal: number; fuelUsed: number },
  params: SimParams
): { safe: boolean; violations: string[] } {
  const violations: string[] = [];
  const rs = 2 * state.M;
  const minAllowedR = rs * params.horizonMargin;

  if (state.r <= minAllowedR) violations.push("Event horizon breach");
  if (state.tidal > params.tidalLimit) violations.push("Tidal limit exceeded");
  if (state.fuelUsed > params.fuelBudget) violations.push("Fuel budget exceeded");

  return { safe: violations.length === 0, violations };
}

export function summarizeViolations(points: { violations: string[] }[]): string[] {
  const set = new Set<string>();
  for (const p of points) for (const v of p.violations) set.add(v);
  return Array.from(set);
}
