"use client";

import type { SimParams } from "../../lib/qsagi/types";

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-1">
      <div className="text-xs opacity-70">{label}</div>
      {children}
    </div>
  );
}

export function ScenarioControls({
  params,
  setParams,
  onRun,
  loading,
}: {
  params: SimParams;
  setParams: (p: SimParams) => void;
  onRun: (mode: "classical" | "assisted") => void;
  loading: boolean;
}) {
  const update = (patch: Partial<SimParams>) => setParams({ ...params, ...patch });

  return (
    <div className="grid gap-4 rounded-2xl border border-white/10 p-4">
      <div className="text-lg font-semibold">Scenario Controls</div>

      <div className="grid grid-cols-2 gap-3">
        <Row label="Mass M (scaled)">
          <input
            className="w-full rounded-xl border border-white/10 bg-transparent p-2"
            type="number"
            step="0.1"
            value={params.M}
            onChange={(e) => update({ M: Number(e.target.value) })}
            style={{ color: "var(--text-primary)" }}
          />
        </Row>

        <Row label="Initial radius r0">
          <input
            className="w-full rounded-xl border border-white/10 bg-transparent p-2"
            type="number"
            step="0.1"
            value={params.r0}
            onChange={(e) => update({ r0: Number(e.target.value) })}
            style={{ color: "var(--text-primary)" }}
          />
        </Row>

        <Row label="Tangential speed v0">
          <input
            className="w-full rounded-xl border border-white/10 bg-transparent p-2"
            type="number"
            step="0.01"
            value={params.v0}
            onChange={(e) => update({ v0: Number(e.target.value) })}
            style={{ color: "var(--text-primary)" }}
          />
        </Row>

        <Row label="dt">
          <input
            className="w-full rounded-xl border border-white/10 bg-transparent p-2"
            type="number"
            step="0.01"
            value={params.dt}
            onChange={(e) => update({ dt: Number(e.target.value) })}
            style={{ color: "var(--text-primary)" }}
          />
        </Row>

        <Row label="steps">
          <input
            className="w-full rounded-xl border border-white/10 bg-transparent p-2"
            type="number"
            step="50"
            value={params.steps}
            onChange={(e) => update({ steps: Number(e.target.value) })}
            style={{ color: "var(--text-primary)" }}
          />
        </Row>
      </div>

      <div className="mt-2 text-sm font-semibold opacity-90">Safety Shield</div>
      <div className="grid grid-cols-2 gap-3">
        <Row label="Horizon margin (× 2M)">
          <input
            className="w-full rounded-xl border border-white/10 bg-transparent p-2"
            type="number"
            step="0.01"
            value={params.horizonMargin}
            onChange={(e) => update({ horizonMargin: Number(e.target.value) })}
            style={{ color: "var(--text-primary)" }}
          />
        </Row>

        <Row label="Tidal limit (proxy)">
          <input
            className="w-full rounded-xl border border-white/10 bg-transparent p-2"
            type="number"
            step="0.0001"
            value={params.tidalLimit}
            onChange={(e) => update({ tidalLimit: Number(e.target.value) })}
            style={{ color: "var(--text-primary)" }}
          />
        </Row>

        <Row label="Fuel budget (proxy)">
          <input
            className="w-full rounded-xl border border-white/10 bg-transparent p-2"
            type="number"
            step="0.1"
            value={params.fuelBudget}
            onChange={(e) => update({ fuelBudget: Number(e.target.value) })}
            style={{ color: "var(--text-primary)" }}
          />
        </Row>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-2">
        <button
          type="button"
          disabled={loading}
          onClick={() => onRun("classical")}
          className="rounded-2xl border border-white/15 p-3 hover:border-white/30 disabled:opacity-50 transition"
          style={{ color: "var(--text-primary)" }}
        >
          Run Classical
        </button>

        <button
          type="button"
          disabled={loading}
          onClick={() => onRun("assisted")}
          className="rounded-2xl border border-white/15 p-3 hover:border-white/30 disabled:opacity-50 transition"
          style={{ color: "var(--text-primary)" }}
        >
          Run Quantum Assist (Sim)
        </button>
      </div>
    </div>
  );
}
