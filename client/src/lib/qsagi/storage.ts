import { SimRun } from "./types";

const RUNS = new Map<string, SimRun>();

export function saveRun(run: SimRun) {
  RUNS.set(run.id, run);
}

export function getRun(id: string): SimRun | null {
  return RUNS.get(id) ?? null;
}

export function listRuns(): SimRun[] {
  return Array.from(RUNS.values()).sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}
