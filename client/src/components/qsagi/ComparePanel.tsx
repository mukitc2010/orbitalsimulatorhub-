"use client";

import type { CompareResult } from "../../lib/qsagi/types";

export function ComparePanel({ compare }: { compare: CompareResult | null }) {
  if (!compare) return null;

  const c = compare.classical.summary;
  const q = compare.assisted.summary;

  const row = (label: string, a: string, b: string) => (
    <div className="grid grid-cols-3 gap-2 text-sm">
      <div className="opacity-70">{label}</div>
      <div className="font-mono">{a}</div>
      <div className="font-mono">{b}</div>
    </div>
  );

  return (
    <div className="rounded-2xl border border-white/10 p-4">
      <div className="text-lg font-semibold">Compare: Classical vs Quantum Assist</div>
      <div className="mt-3 grid gap-2">
        <div className="grid grid-cols-3 gap-2 text-xs opacity-70">
          <div></div>
          <div>Classical</div>
          <div>Quantum Assist (Sim)</div>
        </div>

        {row("Min radius", c.minR.toFixed(3), q.minR.toFixed(3))}
        {row("Max tidal", c.maxTidal.toExponential(3), q.maxTidal.toExponential(3))}
        {row("Fuel used", c.fuelUsed.toFixed(3), q.fuelUsed.toFixed(3))}
        {row("Violations", c.violations.join(", ") || "None", q.violations.join(", ") || "None")}
      </div>

      <div className="mt-3 text-xs opacity-70">
        &quot;Quantum Assist&quot; here is a fast candidate search placeholder. Replace with real Qiskit/Cirq later.
      </div>
    </div>
  );
}
