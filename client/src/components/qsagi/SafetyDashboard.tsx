"use client";

import type { SimRun } from "../../lib/qsagi/types";

export function SafetyDashboard({ run }: { run: SimRun | null }) {
  if (!run) {
    return (
      <div className="rounded-2xl border border-white/10 p-4">
        <div className="text-lg font-semibold">Safety Dashboard</div>
        <div className="text-sm opacity-70">Run a simulation to see safety checks.</div>
      </div>
    );
  }

  const { summary } = run;

  return (
    <div className="rounded-2xl border border-white/10 p-4">
      <div className="text-lg font-semibold">Safety Dashboard</div>

      <div className="mt-3 grid gap-2 text-sm">
        <div className="flex items-center justify-between">
          <span className="opacity-70">Min radius</span>
          <span className="font-mono">{summary.minR.toFixed(3)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="opacity-70">Max tidal (proxy)</span>
          <span className="font-mono">{summary.maxTidal.toExponential(3)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="opacity-70">Fuel used (proxy)</span>
          <span className="font-mono">{summary.fuelUsed.toFixed(3)}</span>
        </div>

        <div className="mt-2">
          <div className="text-xs opacity-70">Violations</div>
          {summary.violations.length === 0 ? (
            <div className="mt-1 rounded-xl border border-white/10 p-2 text-sm">✅ None</div>
          ) : (
            <ul className="mt-1 list-disc pl-5 text-sm">
              {summary.violations.map((v) => (
                <li key={v}>{v}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
