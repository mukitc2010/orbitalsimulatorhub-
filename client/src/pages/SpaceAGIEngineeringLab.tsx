import { useState } from "react";
import { Link } from "wouter";

export function SpaceAGIEngineeringLab() {
  const [researchMode, setResearchMode] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-medium uppercase tracking-widest text-[var(--accent-cyan)] mb-2">World-First Platform</p>
          <h1 className="headline">Space-AGI Engineering Lab</h1>
          <p className="subhead max-w-2xl">
            Real simulations, real mathematics, real engineering logic, future AGI for space, and a learning system — all together.
          </p>
        </div>
        <button
          onClick={() => setResearchMode(!researchMode)}
          className="px-4 py-2 rounded-xl font-bold text-sm transition"
          style={{
            background: researchMode ? "var(--accent-cyan)" : "var(--bg-surface)",
            color: researchMode ? "#0f172a" : "var(--text-primary)",
            border: researchMode ? "none" : "2px solid var(--border-color)",
          }}
        >
          <span className="mr-2">🔬</span>
          {researchMode ? "Exit Research Mode" : "Enter Research Mode"}
        </button>
      </div>

      {/* Pillar 1 — Autonomous Spacecraft Intelligence */}
      <section className="rounded-xl border-2 p-6" style={{ background: "var(--bg-card)", borderColor: "var(--accent-cyan)" }}>
        <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
          🔷 Pillar 1 — Autonomous Spacecraft Intelligence
        </h2>
        <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
          How spacecraft will think: autonomous navigation, AI orbit correction, self-repair satellites, Mars rover intelligence, swarm satellites.
        </p>
        <ul className="space-y-2 text-sm mb-4 list-disc pl-5" style={{ color: "var(--text-secondary)" }}>
          <li>Autonomous navigation — spacecraft decide without Earth input</li>
          <li>AI orbit correction — real-time trajectory adjustments</li>
          <li>Self-repair satellites — fault detection and recovery</li>
          <li>Mars rover intelligence — Curiosity, Perseverance autonomy</li>
          <li>Swarm satellites — coordinated multi-agent systems</li>
        </ul>
        <div className="rounded-lg p-4 font-mono text-sm" style={{ background: "var(--bg-surface)" }}>
          <p className="font-bold mb-2" style={{ color: "var(--accent-cyan)" }}>Orbital state estimation:</p>
          <p className="mb-2">x<sub>t+1</sub> = Ax<sub>t</sub> + Bu<sub>t</sub> + w<sub>t</sub></p>
          <p className="font-bold mb-2" style={{ color: "var(--accent-cyan)" }}>Kalman update (Bayesian):</p>
          <p>P(x|z) = P(z|x) P(x) / P(z)</p>
        </div>
      </section>

      {/* Pillar 2 — Space Decision Intelligence */}
      <section className="rounded-xl border-2 p-6" style={{ background: "var(--bg-card)", borderColor: "var(--accent-pink)" }}>
        <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
          🔷 Pillar 2 — Space Decision Intelligence (AGI for Space)
        </h2>
        <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
          Delayed decision math: Mars is 20+ light-minutes away. Why spacecraft must think for themselves.
        </p>
        <div className="rounded-lg p-4 font-mono text-sm mb-4" style={{ background: "var(--bg-surface)" }}>
          <p className="font-bold mb-2" style={{ color: "var(--accent-pink)" }}>Signal delay:</p>
          <p className="mb-2">τ = d/c (light-time to Mars ≈ 12–24 min one-way)</p>
          <p className="font-bold mb-2" style={{ color: "var(--accent-pink)" }}>Optimal autonomous decision:</p>
          <p>π*(s) = argmax<sub>a</sub> E[R + γV]</p>
        </div>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          Predictive AI beats naive control when delay τ increases. See <Link href="/research/space-agi-doctrine"><a className="text-[var(--accent-cyan)] hover:underline">Space-AGI Doctrine</a></Link> for delay vs performance graphs.
        </p>
      </section>

      {/* Pillar 3 — Orbital + AI Mathematics */}
      <section className="rounded-xl border-2 p-6" style={{ background: "var(--bg-card)", borderColor: "var(--accent-gold)" }}>
        <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
          🔷 Pillar 3 — Orbital + AI Mathematics
        </h2>
        <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
          Mathematical foundations of space intelligence.
        </p>
        <div className="space-y-4">
          <div className="rounded-lg p-4 font-mono text-sm" style={{ background: "var(--bg-surface)" }}>
            <p className="font-bold mb-1" style={{ color: "var(--accent-gold)" }}>Orbital mechanics:</p>
            <p>d²r/dt² = −μ/r³</p>
          </div>
          <div className="rounded-lg p-4 font-mono text-sm" style={{ background: "var(--bg-surface)" }}>
            <p className="font-bold mb-1" style={{ color: "var(--accent-gold)" }}>Energy equation:</p>
            <p>ε = v²/2 − μ/r</p>
          </div>
          <div className="rounded-lg p-4 font-mono text-sm" style={{ background: "var(--bg-surface)" }}>
            <p className="font-bold mb-1" style={{ color: "var(--accent-gold)" }}>Collision probability:</p>
            <p>P = ∫ N(r, Σ) dr</p>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link href="/research/space-agi-math"><a className="px-3 py-1.5 rounded-lg text-sm font-medium" style={{ background: "var(--accent-gold)", color: "#0f172a" }}>Space-AGI Mathematics →</a></Link>
          <Link href="/formulas-library"><a className="px-3 py-1.5 rounded-lg text-sm font-medium" style={{ background: "var(--accent-gold)", color: "#0f172a" }}>Formulas Library →</a></Link>
          <Link href="/calculators"><a className="px-3 py-1.5 rounded-lg text-sm font-medium" style={{ background: "var(--accent-gold)", color: "#0f172a" }}>Calculators →</a></Link>
          <Link href="/simulator"><a className="px-3 py-1.5 rounded-lg text-sm font-medium border-2" style={{ borderColor: "var(--accent-gold)", color: "var(--text-primary)" }}>3D Simulator →</a></Link>
        </div>
      </section>

      {/* Pillar 4 — Future Space Systems */}
      <section className="rounded-xl border-2 p-6" style={{ background: "var(--bg-card)", borderColor: "var(--border-color)" }}>
        <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
          🔷 Pillar 4 — Future Space Systems
        </h2>
        <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
          Real engineering future — not fantasy.
        </p>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            "Autonomous satellites",
            "AI space stations",
            "Mars colony automation",
            "Space robots",
            "Interplanetary internet",
            "Space traffic control AI",
          ].map((item) => (
            <div key={item} className="p-3 rounded-lg" style={{ background: "var(--bg-surface)" }}>
              <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{item}</span>
            </div>
          ))}
        </div>
        <Link href="/research/space-agi-roadmap">
          <a className="text-sm font-medium" style={{ color: "var(--accent-cyan)" }}>View Space-AGI Roadmap →</a>
        </Link>
      </section>

      {/* Pillar 5 — Live Simulation Lab */}
      <section className="rounded-xl border-2 p-6" style={{ background: "var(--bg-card)", borderColor: "var(--accent-cyan)" }}>
        <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
          🔷 Pillar 5 — Live Simulation Lab
        </h2>
        <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
          Space-AGI Simulation Lab — collision avoidance, traffic simulation, mission planning, Mars delay, energy optimization.
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          <Link href="/simulator">
            <a className="px-5 py-2.5 rounded-xl font-bold" style={{ background: "var(--accent-cyan)", color: "#0f172a" }}>
              Open 3D Simulator →
            </a>
          </Link>
          <Link href="/calculators">
            <a className="px-5 py-2.5 rounded-xl font-bold" style={{ background: "var(--accent-cyan)", color: "#0f172a" }}>
              Interactive Calculators →
            </a>
          </Link>
          <Link href="/research/space-agi-doctrine">
            <a className="px-5 py-2.5 rounded-xl font-medium border-2" style={{ borderColor: "var(--accent-cyan)", color: "var(--text-primary)" }}>
              Space-AGI Doctrine (simulations)
            </a>
          </Link>
        </div>
        <p className="text-xs" style={{ color: "var(--text-secondary)" }}>
          Calculators: Orbital speed, escape velocity (by planet), Hohmann transfer, collision probability, Mars delay.
        </p>
      </section>

      {/* Research Mode content */}
      {researchMode && (
        <section className="rounded-xl border-2 p-6 border-[var(--accent-cyan)]" style={{ background: "var(--bg-card)" }}>
          <h2 className="text-xl font-bold mb-4" style={{ color: "var(--accent-cyan)" }}>🔬 Research Mode — MIT/NASA Learning Hub</h2>
          <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
            Equations, models, simulations, advanced topics, whitepapers. Deep-dive resources for students, engineers, and researchers.
          </p>
          <ul className="space-y-2 text-sm" style={{ color: "var(--text-secondary)" }}>
            <li><Link href="/learn/aerospace"><a className="text-[var(--accent-cyan)] hover:underline">Aerospace reference</a></Link> — equations, models</li>
            <li><Link href="/research/space-agi-doctrine"><a className="text-[var(--accent-cyan)] hover:underline">Space-AGI Doctrine</a></Link> — delayed MDP, belief, energy, discovery</li>
            <li><Link href="/formulas-library"><a className="text-[var(--accent-cyan)] hover:underline">Formulas library</a></Link> — orbital mechanics</li>
            <li><Link href="/research/neuro-space"><a className="text-[var(--accent-cyan)] hover:underline">Neuro-Space</a></Link> — relativistic aerospace</li>
            <li><Link href="/research/space-agi-roadmap"><a className="text-[var(--accent-cyan)] hover:underline">Space-AGI Roadmap</a></Link> — 2025–2060+ vision</li>
            <li><Link href="/research/space-agi-math"><a className="text-[var(--accent-cyan)] hover:underline">Space-AGI Mathematics</a></Link> — optimal control, MPC, LQR, Space-AGI framework</li>
          </ul>
        </section>
      )}

      <div className="flex flex-wrap gap-3">
        <Link href="/research/space-agi-roadmap">
          <a className="px-4 py-2 rounded-lg font-medium" style={{ background: "var(--accent-cyan)", color: "#0f172a" }}>Space-AGI Roadmap →</a>
        </Link>
        <Link href="/research/space-agi-doctrine">
          <a className="px-4 py-2 rounded-lg font-medium border-2" style={{ borderColor: "var(--accent-cyan)", color: "var(--text-primary)" }}>Space-AGI Doctrine</a>
        </Link>
      </div>
    </div>
  );
}
