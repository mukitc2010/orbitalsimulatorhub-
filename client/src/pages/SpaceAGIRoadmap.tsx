import { Link } from "wouter";

export function SpaceAGIRoadmap() {
  const laterPhases = [
    {
      period: "2030–2040",
      title: "Mars Autonomous Missions & AI Mission Control",
      items: [
        "Mars rover autonomy",
        "AI mission planning",
        "Autonomous sample return",
        "Human-Mars AI collaboration",
      ],
    },
    {
      period: "2040–2060",
      title: "Self-Repair Spacecraft & Swarm Exploration",
      items: [
        "Self-repair satellites",
        "Swarm exploration",
        "AI space stations",
        "Interplanetary internet",
      ],
    },
    {
      period: "2060+",
      title: "Interstellar Probes & Space AGI Systems",
      items: [
        "Interstellar probes",
        "Space AGI systems",
        "Autonomous deep-space missions",
        "Beyond solar system",
      ],
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div>
        <p className="text-xs font-medium uppercase tracking-widest text-[var(--accent-cyan)] mb-2">🚀 Space-AGI Engineering Roadmap</p>
        <h1 className="headline">Future of Autonomous Space Systems</h1>
        <p className="subhead max-w-2xl">
          OrbitalSimulatorHub — The timeline from AI satellites to interstellar probes. Real engineering future — not fantasy.
        </p>
      </div>

      {/* Phase 1: 2025–2030 — Detailed */}
      <section className="rounded-xl border-2 p-6" style={{ background: "var(--bg-card)", borderColor: "var(--accent-cyan)" }}>
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl font-bold" style={{ color: "var(--accent-cyan)" }}>🛰 Phase 1: 2025–2030</span>
          <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>AI Satellites & Autonomous Navigation</h2>
        </div>
        <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
          The next five years will mark the transition from manually operated spacecraft to intelligent autonomous orbital systems. Modern satellite constellations, deep-space probes, and lunar missions already require onboard decision-making due to communication delays and increasing orbital congestion. OrbitalSimulatorHub explores and simulates the mathematical and engineering foundations of this transition.
        </p>

        {/* 1️⃣ AI-Powered Orbit Correction */}
        <div className="mb-8">
          <h3 className="text-base font-bold mb-3" style={{ color: "var(--text-primary)" }}>1️⃣ AI-Powered Orbit Correction</h3>
          <p className="text-sm mb-3" style={{ color: "var(--text-secondary)" }}>
            Future satellites will continuously adjust orbit using onboard intelligence rather than ground control.
          </p>
          <div className="rounded-lg p-4 font-mono text-sm mb-2" style={{ background: "var(--bg-surface)" }}>
            <p className="font-bold mb-1" style={{ color: "var(--accent-cyan)" }}>Orbital state evolution:</p>
            <p className="mb-2">x<sub>t+1</sub> = Ax<sub>t</sub> + Bu<sub>t</sub> + w<sub>t</sub></p>
            <p className="text-xs mb-2" style={{ color: "var(--text-secondary)" }}>Where: x<sub>t</sub> = orbital state vector, u<sub>t</sub> = thrust/control, w<sub>t</sub> = disturbance (drag, radiation pressure)</p>
            <p className="font-bold mb-1" style={{ color: "var(--accent-cyan)" }}>AI controllers estimate optimal correction:</p>
            <p>u* = argmin<sub>u</sub> ||x<sub>desired</sub> − x<sub>predicted</sub>||</p>
            <p className="text-xs mt-2" style={{ color: "var(--text-secondary)" }}>Using: Kalman filtering, reinforcement learning, predictive control</p>
          </div>
          <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>Why this matters:</p>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Manual orbit correction will not scale to tens of thousands of satellites. AI-driven correction will become standard.</p>
        </div>

        {/* 2️⃣ Autonomous Collision Avoidance */}
        <div className="mb-8">
          <h3 className="text-base font-bold mb-3" style={{ color: "var(--text-primary)" }}>2️⃣ Autonomous Collision Avoidance</h3>
          <p className="text-sm mb-3" style={{ color: "var(--text-secondary)" }}>
            With mega-constellations (Starlink, OneWeb, military satellites), collision risk is rising. Future satellites must detect and avoid threats autonomously.
          </p>
          <div className="rounded-lg p-4 font-mono text-sm mb-2" style={{ background: "var(--bg-surface)" }}>
            <p className="font-bold mb-1" style={{ color: "var(--accent-cyan)" }}>Collision probability model:</p>
            <p className="mb-1">Let relative position uncertainty: r ∼ N(μ, Σ)</p>
            <p className="mb-2">P<sub>c</sub> = ∫<sub>|r|&lt;R</sub> N(r; μ, Σ) dr</p>
            <p className="text-xs mb-2" style={{ color: "var(--text-secondary)" }}>AI must decide maneuver when P<sub>c</sub> &gt; P<sub>threshold</sub></p>
            <p>Δv* = argmin<sub>Δv</sub> (Fuel + Risk)</p>
          </div>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>AI-driven collision avoidance will replace human-in-loop decisions.</p>
        </div>

        {/* 3️⃣ Predictive Navigation Under Delay */}
        <div className="mb-8">
          <h3 className="text-base font-bold mb-3" style={{ color: "var(--text-primary)" }}>3️⃣ Predictive Navigation Under Delay</h3>
          <p className="text-sm mb-3" style={{ color: "var(--text-secondary)" }}>
            Deep-space missions face communication delays: τ = distance/c. Mars delay: 4–24 minutes. Outer planets: hours. A spacecraft must predict future state and act independently.
          </p>
          <div className="rounded-lg p-4 font-mono text-sm mb-2" style={{ background: "var(--bg-surface)" }}>
            <p className="font-bold mb-1" style={{ color: "var(--accent-cyan)" }}>Predictive state estimation:</p>
            <p className="mb-2">x<sub>t</sub><sup>pred</sup> = f(x<sub>t−τ</sub>, u<sub>history</sub>)</p>
            <p className="font-bold mb-1" style={{ color: "var(--accent-cyan)" }}>Optimal decision policy:</p>
            <p>π*(s) = argmax<sub>a</sub> E[R + γV(s′)]</p>
          </div>
          <p className="text-sm mb-2" style={{ color: "var(--text-secondary)" }}>Predictive policies outperform reactive control when delay exists.</p>
          <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>Result:</p>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>True autonomy becomes mandatory for deep-space missions.</p>
        </div>

        {/* 4️⃣ Space Traffic Management AI */}
        <div>
          <h3 className="text-base font-bold mb-3" style={{ color: "var(--text-primary)" }}>4️⃣ Space Traffic Management AI</h3>
          <p className="text-sm mb-3" style={{ color: "var(--text-secondary)" }}>
            Earth orbit is becoming a complex dynamic system. Future space environment: 100k+ satellites, debris fields, military assets, commercial constellations. Human tracking alone cannot scale.
          </p>
          <div className="rounded-lg p-4 font-mono text-sm mb-2" style={{ background: "var(--bg-surface)" }}>
            <p className="font-bold mb-1" style={{ color: "var(--accent-cyan)" }}>Space traffic intelligence model:</p>
            <p className="mb-2">I<sub>total</sub> = ∑I<sub>i</sub> + ∑C<sub>ij</sub></p>
            <p className="text-xs mb-2" style={{ color: "var(--text-secondary)" }}>Where: I<sub>i</sub> = satellite intelligence, C<sub>ij</sub> = coordination links</p>
          </div>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            AI will: predict congestion, recommend safe orbital slots, coordinate constellation movement, prevent cascade collisions.
          </p>
        </div>
      </section>

      {/* Later phases — compact */}
      <div className="space-y-6">
        {laterPhases.map((phase) => (
          <section
            key={phase.period}
            className="rounded-xl border-2 p-6"
            style={{ background: "var(--bg-card)", borderColor: "var(--border-color)" }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl font-bold" style={{ color: "var(--accent-cyan)" }}>{phase.period}</span>
              <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>{phase.title}</h2>
            </div>
            <ul className="space-y-2">
              {phase.items.map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm" style={{ color: "var(--text-secondary)" }}>
                  <span style={{ color: "var(--accent-cyan)" }}>▸</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      {/* Why OrbitalSimulatorHub */}
      <section className="rounded-xl border-2 p-6" style={{ background: "var(--bg-card)", borderColor: "var(--accent-cyan)" }}>
        <h2 className="text-lg font-bold mb-4" style={{ color: "var(--accent-cyan)" }}>🌌 Why OrbitalSimulatorHub Is Building This</h2>
        <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
          OrbitalSimulatorHub is developing a public learning and simulation platform to explore:
        </p>
        <ul className="space-y-2 text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
          <li>• AI-driven orbital mechanics</li>
          <li>• Autonomous spacecraft decision systems</li>
          <li>• Future satellite intelligence</li>
          <li>• Interplanetary navigation</li>
        </ul>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          The goal is to make space-AGI engineering understandable and reproducible for students, engineers, and researchers worldwide.
        </p>
      </section>

      <div className="flex flex-wrap gap-3">
        <Link href="/research/space-agi-lab">
          <a className="px-4 py-2 rounded-lg font-medium" style={{ background: "var(--accent-cyan)", color: "#0f172a" }}>← Space-AGI Engineering Lab</a>
        </Link>
        <Link href="/research/space-agi-doctrine">
          <a className="px-4 py-2 rounded-lg font-medium border-2" style={{ borderColor: "var(--accent-cyan)", color: "var(--text-primary)" }}>Space-AGI Doctrine</a>
        </Link>
      </div>
    </div>
  );
}
