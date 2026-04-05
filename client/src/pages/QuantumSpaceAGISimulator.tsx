"use client";

import { useState, useCallback } from "react";
import { ScenarioControls } from "../components/qsagi/ScenarioControls";
import { SimulatorCanvas } from "../components/qsagi/SimulatorCanvas";
import { SpacetimeLens3D } from "../components/qsagi/SpacetimeLens3D";
import { SafetyDashboard } from "../components/qsagi/SafetyDashboard";
import { RunLog } from "../components/qsagi/RunLog";
import { ComparePanel } from "../components/qsagi/ComparePanel";
import { Leaderboard } from "@/components/qsagi/Leaderboard";
import type { CompareResult, SimParams, SimRun } from "../lib/qsagi/types";

const defaultParams: SimParams = {
  scenario: "SCHWARZSCHILD_FLYBY",
  M: 1.0,
  r0: 8.0,
  v0: 0.35,
  steps: 1800,
  dt: 0.01,
  tidalLimit: 0.01,
  horizonMargin: 1.2,
  fuelBudget: 8.0,
  quantumAssist: false,
};

export function QuantumSpaceAGISimulator() {
  const [params, setParams] = useState<SimParams>(defaultParams);
  const [loading, setLoading] = useState(false);
  const [run, setRun] = useState<SimRun | null>(null);
  const [compare, setCompare] = useState<CompareResult | null>(null);

  const postRun = useCallback(async (mode: "classical" | "assisted"): Promise<SimRun> => {
    const res = await fetch("/api/qsagi/runs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ params, mode }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Simulation failed");
    return data.run as SimRun;
  }, [params]);

  const onRun = useCallback(async (mode: "classical" | "assisted") => {
    setLoading(true);
    try {
      if (mode === "classical") {
        const r = await postRun("classical");
        setRun(r);
        setCompare(null);
      } else {
        const classical = await postRun("classical");
        const assisted = await postRun("assisted");
        setCompare({ classical, assisted });
        setRun(assisted);
      }
    } catch (err) {
      console.error("Run failed:", err);
    } finally {
      setLoading(false);
    }
  }, [postRun]);

  return (
    <main className="mx-auto max-w-7xl p-6">
      <div className="text-2xl font-bold">Simulator</div>
      <div className="mt-1 text-sm opacity-70">
        Curvature-aware navigation sandbox with Safety Shield + simulated Quantum Assist.
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <ScenarioControls params={params} setParams={setParams} onRun={onRun} loading={loading} />
          <div className="mt-4 grid gap-4">
            <SafetyDashboard run={run} />
            <RunLog run={run} />
            <Leaderboard scenario={params.scenario} />
          </div>
        </div>

        <div className="lg:col-span-8 grid gap-4">
          <SimulatorCanvas run={compare?.assisted ?? run} />
          <SpacetimeLens3D run={compare?.assisted ?? run} />
          <ComparePanel compare={compare} />
        </div>
      </div>
    </main>
  );
}
