"use client";

import type { SimRun } from "../../lib/qsagi/types";

export function RunLog({ run }: { run: SimRun | null }) {
  if (!run) return null;

  const last = run.points[run.points.length - 1];

  return (
    <div className="rounded-2xl border border-white/10 p-4">
      <div className="text-lg font-semibold">Run Log</div>
      <div className="mt-2 grid gap-1 text-sm font-mono opacity-90">
        <div>runId: {run.id}</div>
        <div>scenario: {run.params.scenario}</div>
        <div>assist: {run.params.quantumAssist ? "ON" : "OFF"}</div>
        {last && (
          <>
            <div>t: {last.t.toFixed(2)}</div>
            <div>r: {last.r.toFixed(3)}</div>
            <div>timeDilation: {last.timeDilation.toFixed(4)}</div>
            <div>tidal: {last.tidal.toExponential(3)}</div>
            <div>fuelUsed: {last.fuelUsed.toFixed(3)}</div>
          </>
        )}
      </div>
    </div>
  );
}
