"use client";

import { Link } from "wouter";

export function QuantumSpaceAGILab() {
  return (
    <main className="mx-auto max-w-5xl p-6">
      <div className="rounded-3xl border border-white/10 p-8 shadow-sm">
        <div className="text-3xl font-bold">Quantum Space AGI Lab</div>
        <p className="mt-2 max-w-2xl opacity-80">
          Explore curvature-aware navigation with a safety shield and a simulated quantum-assist planner.
          Built as an educational sandbox for OrbitalSimulatorHub.
        </p>

        <div className="mt-6 flex gap-3">
          <Link href="/quantum-space-agi/scenario" className="rounded-2xl border border-white/15 px-4 py-2 hover:border-white/30 transition">
            Start
          </Link>
          <Link href="/quantum-space-agi/sim" className="rounded-2xl border border-white/15 px-4 py-2 hover:border-white/30 transition">
            Go to Simulator
          </Link>
        </div>
      </div>
    </main>
  );
}
