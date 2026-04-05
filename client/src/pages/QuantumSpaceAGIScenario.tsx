"use client";

import { useState } from "react";
import { Link } from "wouter";
import { MissionSelector } from "../components/qsagi/MissionSelector";
import type { ScenarioType } from "../lib/qsagi/types";

export function QuantumSpaceAGIScenario() {
  const [scenario, setScenario] = useState<ScenarioType>("SCHWARZSCHILD_FLYBY");

  return (
    <main className="mx-auto max-w-5xl p-6">
      <div className="flex items-center justify-between">
        <div className="text-2xl font-bold">Choose Scenario</div>
        <Link href="/quantum-space-agi/sim" className="rounded-2xl border border-white/15 px-4 py-2 hover:border-white/30 transition">
          Continue →
        </Link>
      </div>

      <div className="mt-4">
        <MissionSelector value={scenario} onChange={setScenario} />
      </div>

      <div className="mt-4 text-sm opacity-70">
        Note: scenario selection is wired in the Simulator via defaults. You can pass it through URL params later.
      </div>
    </main>
  );
}
