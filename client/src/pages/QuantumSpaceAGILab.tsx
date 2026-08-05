"use client";

import { Link } from "wouter";

export function QuantumSpaceAGILab() {
  return (
    <main className="mx-auto max-w-6xl py-6">
      <section className="mission-control-hero rounded-3xl border p-7 md:p-10 overflow-hidden relative">
        <div className="mission-control-grid" aria-hidden="true" />
        <div className="relative z-10 max-w-3xl">
          <p className="text-xs uppercase tracking-[0.25em] font-semibold mb-3" style={{ color: "var(--accent-cyan)" }}>
            Quantum navigation research sandbox
          </p>
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight" style={{ color: "var(--text-primary)" }}>
            Quantum Space AGI Lab
          </h1>
          <p className="mt-4 max-w-2xl leading-7" style={{ color: "var(--text-secondary)" }}>
            Explore curvature-aware navigation, safety constraints, and a simulated quantum-assist planner through transparent,
            educational flight scenarios.
          </p>
          <p className="mt-3 text-sm" style={{ color: "var(--text-muted)" }}>
            Conceptual simulation only. It is not a flight-certified guidance or quantum-computing system.
          </p>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/quantum-space-agi/scenario" className="mission-control-primary rounded-xl px-5 py-3 font-semibold transition">
              Configure scenario
            </Link>
            <Link href="/quantum-space-agi/sim" className="mission-control-secondary rounded-xl px-5 py-3 font-semibold transition">
              Launch simulator
            </Link>
          </div>
        </div>

        <div className="mission-control-orbits" aria-hidden="true">
          <span className="mission-control-core" />
          <span className="mission-control-orbit mission-control-orbit-one" />
          <span className="mission-control-orbit mission-control-orbit-two" />
          <span className="mission-control-satellite" />
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3 mt-6">
        {[
          ["Safety shield", "Evaluate horizon margin, tidal loading, and fuel use before comparing trajectories."],
          ["Classical baseline", "Run the same scenario without assistive optimization to inspect the tradeoffs clearly."],
          ["Mission telemetry", "Review trajectory, risk, and planner output in a persistent research-style console."],
        ].map(([title, description], index) => (
          <article key={title} className="mission-control-card rounded-2xl p-5 border">
            <p className="text-xs font-semibold uppercase tracking-[0.2em]" style={{ color: "var(--accent-cyan)" }}>
              0{index + 1}
            </p>
            <h2 className="font-bold text-lg mt-2" style={{ color: "var(--text-primary)" }}>{title}</h2>
            <p className="text-sm leading-6 mt-2" style={{ color: "var(--text-secondary)" }}>{description}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
