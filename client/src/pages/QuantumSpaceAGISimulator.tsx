"use client";

import { useState, useCallback } from "react";
import { ScenarioControls } from "../components/qsagi/ScenarioControls";
import { SimulatorCanvas } from "../components/qsagi/SimulatorCanvas";
import { SpacetimeLens3D } from "../components/qsagi/SpacetimeLens3D";
import { SafetyDashboard } from "../components/qsagi/SafetyDashboard";
import { RunLog } from "../components/qsagi/RunLog";
import { ComparePanel } from "../components/qsagi/ComparePanel";
import type { CompareResult, SimParams, SimRun } from "../lib/qsagi/types";

import { buildRun, quantumAssistOptimize } from "../lib/qsagi/quantumAssist";

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
  const [run, setRun] = useState<SimRun | null>(() => buildRun(defaultParams, "browser-preview"));
  const [notice, setNotice] = useState("Animated preview / educational browser simulation");
  const [compare, setCompare] = useState<CompareResult | null>(null);

  const postRun = useCallback(async (mode: "classical" | "assisted"): Promise<SimRun> => {
    const values = [params.M,params.r0,params.v0,params.steps,params.dt,params.tidalLimit,params.horizonMargin,params.fuelBudget];
    if (!values.every(Number.isFinite) || params.M <= 0 || params.r0 <= 0 || params.v0 < 0 || params.dt <= 0 || params.dt > 1 || !Number.isInteger(params.steps) || params.steps < 2 || params.steps > 10000 || params.tidalLimit <= 0 || params.horizonMargin < 1 || params.fuelBudget < 0)
      throw new Error("Use positive finite parameters, dt up to 1, 2-10,000 whole steps, horizon margin at least 1, and nonnegative speed/fuel.");
    // The same educational model is available locally; no backend is needed for playback.
    const chosen = mode === "assisted" ? quantumAssistOptimize(params) : {...params, quantumAssist:false};
    setNotice("Browser simulation / simulated assist searches seven candidate speeds; no quantum hardware or shared leaderboard submission.");
    return buildRun(chosen, crypto.randomUUID());
  }, [params]);

  const onRun = useCallback(async (mode: "classical" | "assisted") => {
    setLoading(true);
    setNotice("Calculating trajectory...");
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
      setNotice(err instanceof Error ? err.message : "Simulation failed");
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

      <p role="status" className="mt-3 text-sm text-cyan-200">{notice}</p>
      <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="order-2 lg:order-1 lg:col-span-4">
          <ScenarioControls params={params} setParams={setParams} onRun={onRun} loading={loading} />
          <div className="mt-4 grid gap-4">
            <SafetyDashboard run={run} />
            <RunLog run={run} />
            <p className="p-3 text-xs opacity-70">Browser runs are educational previews and are not submitted to a shared leaderboard.</p>
          </div>
        </div>

        <div className="order-1 lg:order-2 lg:col-span-8 grid gap-4">
          <SpacetimeLens3D run={compare?.assisted ?? run} />
          <details><summary className="cursor-pointer p-3 text-sm">Show 2D trajectory overview</summary><SimulatorCanvas run={compare?.assisted ?? run} /></details>
          <ComparePanel compare={compare} />
        </div>
      </div>
    </main>
  );
}
