import { useState } from "react";
import { Link } from "wouter";

const LAB_QUICK_START = [
  { href: "/research/space-agi-explanation", icon: "📖", title: "Explanation", desc: "Math Explained tab — plain English, examples for teens & college" },
  { href: "/research/space-agi-math", icon: "📐", title: "Learn the Math (Full)", desc: "Optimal control, MPC, LQR, Pontryagin — graduate level" },
  { href: "/simulator", icon: "🛰", title: "Orbit & Swarm Simulators", desc: "3D orbits, swarm AI collision avoidance" },
  { href: "/calculators", icon: "🧮", title: "Use Calculators", desc: "Hohmann, collision P, Mars delay" },
];

function MarsDelayWidget() {
  const [dist, setDist] = useState(78);
  const C_KM_S = 299792;
  const tauMin = (dist * 1e6) / C_KM_S / 60;
  return (
    <div className="rounded-lg p-4" style={{ background: "var(--bg-surface)", border: "1px solid var(--border-color)" }}>
      <p className="text-xs font-bold uppercase mb-2" style={{ color: "var(--accent-pink)" }}>Live: Mars delay τ = d/c</p>
      <label className="flex items-center gap-2 text-sm">
        <span style={{ color: "var(--text-secondary)" }}>Distance (M km):</span>
        <input type="range" min={55} max={401} value={dist} onChange={(e) => setDist(Number(e.target.value))} className="flex-1 max-w-32" />
        <input type="number" value={dist} onChange={(e) => setDist(Number(e.target.value) || 78)} className="w-16 border rounded px-2 py-1 text-sm" style={{ background: "var(--bg-card)" }} />
      </label>
      <p className="text-sm mt-2" style={{ color: "var(--text-primary)" }}><strong>One-way τ:</strong> {tauMin >= 1 ? `${tauMin.toFixed(1)} min` : `${(tauMin * 60).toFixed(0)} s`} · Round-trip: {(2 * tauMin).toFixed(1)} min</p>
    </div>
  );
}

const LAB_EXPERIMENTS = [
  { href: "/calculators", label: "Mars Delay Simulator", desc: "τ = d/c — see one-way light-time" },
  { href: "/calculators", label: "Collision Probability", desc: "P_c from miss distance + uncertainty" },
  { href: "/calculators", label: "Hohmann Transfer", desc: "Δv₁, Δv₂ for orbit changes" },
  { href: "/research/space-agi-doctrine", label: "Delayed MDP", desc: "Predictive vs naive policy" },
  { href: "/simulator", label: "Orbit Propagation", desc: "Add LEO/MEO/GEO, watch evolution" },
];

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

      {/* Lab Quick Start — dashboard */}
      <section className="rounded-xl border-2 p-6" style={{ background: "var(--bg-card)", borderColor: "var(--accent-cyan)" }}>
        <h2 className="text-lg font-bold mb-4" style={{ color: "var(--accent-cyan)" }}>⚡ Lab Quick Start</h2>
        <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>Choose your path — learn the math, run simulations, or use calculators.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {LAB_QUICK_START.map((q) => (
            <Link key={q.href} href={q.href}>
              <a className="block p-4 rounded-xl transition hover:scale-[1.02]" style={{ background: "var(--bg-surface)", border: "2px solid var(--border-color)" }}>
                <span className="text-2xl block mb-2">{q.icon}</span>
                <span className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>{q.title}</span>
                <span className="block text-xs mt-1" style={{ color: "var(--text-secondary)" }}>{q.desc}</span>
              </a>
            </Link>
          ))}
        </div>
      </section>

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
        <div className="mt-4 p-3 rounded-lg" style={{ background: "var(--bg-surface)", borderLeft: "4px solid var(--accent-cyan)" }}>
          <p className="text-xs font-bold uppercase mb-1" style={{ color: "var(--accent-cyan)" }}>Real-world</p>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Curiosity & Perseverance use autonomous navigation for terrain analysis. Starlink uses AI for collision avoidance. See <Link href="/research/space-agi-roadmap"><a className="text-[var(--accent-cyan)] hover:underline">Roadmap Phase 1</a></Link>.</p>
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
        <MarsDelayWidget />
        <div className="rounded-lg p-4 font-mono text-sm mb-4 mt-4" style={{ background: "var(--bg-surface)" }}>
          <p className="font-bold mb-2" style={{ color: "var(--accent-pink)" }}>Signal delay:</p>
          <p className="mb-2">τ = d/c (light-time to Mars ≈ 12–24 min one-way)</p>
          <p className="font-bold mb-2" style={{ color: "var(--accent-pink)" }}>Optimal autonomous decision:</p>
          <p>π*(s) = argmax<sub>a</sub> E[R + γV]</p>
        </div>
        <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
          Predictive AI beats naive control when delay τ increases. See <Link href="/research/space-agi-doctrine"><a className="text-[var(--accent-cyan)] hover:underline">Space-AGI Doctrine</a></Link> for delay vs performance graphs.
        </p>
        <Link href="/calculators">
          <a className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium" style={{ background: "var(--accent-pink)", color: "#0f172a" }}>
            <span>🤖</span> Try Mars Delay Calculator →
          </a>
        </Link>
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
        <div className="grid sm:grid-cols-2 gap-3 mb-4">
          {[
            { label: "Autonomous satellites", phase: "2025–2030" },
            { label: "AI space stations", phase: "2040–2060" },
            { label: "Mars colony automation", phase: "2030–2040" },
            { label: "Space robots", phase: "2030+" },
            { label: "Interplanetary internet", phase: "2040–2060" },
            { label: "Space traffic control AI", phase: "2025–2030" },
          ].map((item) => (
            <div key={item.label} className="p-3 rounded-lg flex justify-between items-center" style={{ background: "var(--bg-surface)" }}>
              <span className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>{item.label}</span>
              <span className="text-xs" style={{ color: "var(--text-muted)" }}>{item.phase}</span>
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
        <h3 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: "var(--accent-cyan)" }}>Run experiments</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          {LAB_EXPERIMENTS.map((e) => (
            <Link key={e.label} href={e.href}>
              <a className="block p-3 rounded-lg transition hover:opacity-90" style={{ background: "var(--bg-surface)", border: "1px solid var(--border-color)" }}>
                <span className="font-bold text-sm" style={{ color: "var(--text-primary)" }}>{e.label}</span>
                <span className="block text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>{e.desc}</span>
              </a>
            </Link>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/simulator">
            <a className="px-5 py-2.5 rounded-xl font-bold" style={{ background: "var(--accent-cyan)", color: "#0f172a" }}>
              Open 3D Simulator →
            </a>
          </Link>
          <Link href="/calculators">
            <a className="px-5 py-2.5 rounded-xl font-bold" style={{ background: "var(--accent-cyan)", color: "#0f172a" }}>
              All Calculators →
            </a>
          </Link>
          <Link href="/research/space-agi-doctrine">
            <a className="px-5 py-2.5 rounded-xl font-medium border-2" style={{ borderColor: "var(--accent-cyan)", color: "var(--text-primary)" }}>
              Space-AGI Doctrine →
            </a>
          </Link>
        </div>
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

      <div className="flex flex-wrap gap-3 items-center">
        <Link href="/research/space-agi-roadmap">
          <a className="px-4 py-2 rounded-lg font-medium" style={{ background: "var(--accent-cyan)", color: "#0f172a" }}>Space-AGI Roadmap →</a>
        </Link>
        <Link href="/research/space-agi-doctrine">
          <a className="px-4 py-2 rounded-lg font-medium border-2" style={{ borderColor: "var(--accent-cyan)", color: "var(--text-primary)" }}>Space-AGI Doctrine</a>
        </Link>
        <Link href="/astrobot">
          <a className="px-4 py-2 rounded-lg font-medium border-2" style={{ borderColor: "var(--accent-gold)", color: "var(--text-primary)" }}>🤖 Ask AstroBot</a>
        </Link>
      </div>
    </div>
  );
}
