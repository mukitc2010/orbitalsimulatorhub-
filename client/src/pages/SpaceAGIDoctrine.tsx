import { Link } from "wouter";

export function SpaceAGIDoctrine() {
  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div>
        <p className="text-sm text-[var(--accent-cyan)] font-medium uppercase tracking-wider mb-2">Latest Research — February 2026</p>
        <h1 className="headline">Space-AGI Doctrine</h1>
        <p className="text-xl font-bold text-slate-700 mt-2">OrbitalSimulatorHub Space-AGI: Reproducible Simulation + Paper Package</p>
        <p className="text-sm text-slate-500 mt-1">Unified framework for orbital mechanics and autonomous space decision models</p>
      </div>

      <section className="rounded-xl border-2 border-[var(--accent-cyan)]/50 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Abstract</h2>
        <p className="text-slate-700 leading-relaxed">
          Deep-space missions face fundamental constraints: communication delays, limited power, and the need for autonomous decision-making. The <strong>Space-AGI Doctrine</strong> is a reproducible simulation and modeling framework that unifies orbital mechanics with agentic decision models.
        </p>
        <p className="text-slate-700 leading-relaxed mt-3">
          The framework integrates two-body and J2-perturbed propagation, Hohmann transfers, debris-avoidance Monte Carlo, delayed Markov decision processes, Bayesian belief updates, energy-aware planning, and scientific discovery loops. A unified mission score combines orbit safety, navigation precision, energy stability, discovery rate, and autonomy level.
        </p>
      </section>

      <section className="rounded-xl border-2 border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 mb-4">5 Key Breakthroughs</h2>
        <ul className="space-y-3 text-slate-700 list-disc pl-5">
          <li><strong>Delayed Decision-Making:</strong> Predictive policies outperform naive ones when observations lag. Agents that forecast current state from delayed data beat those acting on stale data.</li>
          <li><strong>Bayesian Belief:</strong> Spacecraft reason under uncertainty. Our filter tracks hidden state (radiation, health) with principled uncertainty quantification.</li>
          <li><strong>Energy-Aware Autonomy:</strong> Science vs comms vs propulsion under power limits. Optimize sequence to maximize discovery while staying alive.</li>
          <li><strong>Scientific Discovery Loop:</strong> Automated hypothesis testing via Bayesian model selection. Knowledge gain is measurable.</li>
          <li><strong>Unified Mission Score:</strong> One metric: safety + precision + energy + discovery + autonomy.</li>
        </ul>
      </section>

      <section className="rounded-xl border-2 border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Orbital Simulations</h2>
        <ul className="space-y-2 text-slate-700">
          <li>Two-body propagation (RK4, solve_ivp) with energy conservation</li>
          <li>J2 perturbation — RAAN and argument of periapsis drift</li>
          <li>Hohmann transfer — analytical delta-v and trajectory</li>
          <li>Debris avoidance Monte Carlo — miss distance, collision probability</li>
        </ul>
      </section>

      <section className="rounded-xl border-2 border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Space-AGI Decision Models</h2>
        <ul className="space-y-2 text-slate-700">
          <li><strong>Delayed MDP:</strong> Agent receives delayed observation but acts at current time. Naive vs predictive policy comparison.</li>
          <li><strong>Bayesian Belief Update:</strong> 1D hidden state, noisy observations, Kalman-style posterior.</li>
          <li><strong>Energy-Aware Planner:</strong> Power budget, science/comms/propulsion actions, heuristic MPC.</li>
          <li><strong>Scientific Discovery:</strong> H1 vs H2 hypothesis testing, Shannon entropy knowledge gain.</li>
        </ul>
      </section>

      <section className="rounded-xl border-2 border-[var(--accent-gold)]/50 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Bold Vision</h2>
        <p className="text-slate-700 leading-relaxed">
          <strong>OrbitalSimulatorHub Space-AGI Research Institute</strong> envisions a future where every spacecraft — from CubeSats to Mars landers — is equipped with explainable, safe, and scientifically productive autonomy. The goal: make autonomous space intelligence reproducible, auditable, and aligned with human values.
        </p>
      </section>

      <div className="flex flex-wrap gap-3">
        <Link href="/research">
          <a className="px-4 py-2 rounded-lg bg-[var(--accent-cyan)]/20 text-slate-800 font-medium hover:bg-[var(--accent-cyan)]/30">Research Hub</a>
        </Link>
        <Link href="/ai-in-aerospace">
          <a className="px-4 py-2 rounded-lg bg-[var(--accent-cyan)]/20 text-slate-800 font-medium hover:bg-[var(--accent-cyan)]/30">AI in Aerospace</a>
        </Link>
        <Link href="/simulator">
          <a className="px-4 py-2 rounded-lg bg-[var(--accent-cyan)]/20 text-slate-800 font-medium hover:bg-[var(--accent-cyan)]/30">3D Simulator</a>
        </Link>
      </div>
    </div>
  );
}
