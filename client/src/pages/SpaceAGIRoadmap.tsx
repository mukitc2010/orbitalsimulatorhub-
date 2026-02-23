import { Link } from "wouter";

export function SpaceAGIRoadmap() {
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
          The transition from human-controlled spacecraft to AI-assisted orbital systems begins. Future satellites will continuously monitor orbital conditions and adjust trajectories without waiting for Earth-based commands. This marks the first step toward autonomous orbital infrastructure.
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

      {/* Phase 2: 2030–2040 — Mars Autonomous Missions */}
      <section className="rounded-xl border-2 p-6" style={{ background: "var(--bg-card)", borderColor: "var(--accent-pink)" }}>
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl font-bold" style={{ color: "var(--accent-pink)" }}>🟥 Phase 2: 2030–2040</span>
          <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>Mars Autonomous Missions & AI Mission Control</h2>
        </div>
        <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
          Deep-space communication delays make full autonomy essential. Mars delay: τ = distance/c. Real-time control becomes impossible. Spacecraft must think and decide independently.
        </p>

        <div className="space-y-6">
          <div>
            <h3 className="text-base font-bold mb-2" style={{ color: "var(--text-primary)" }}>▸ Mars rover autonomy</h3>
            <p className="text-sm mb-2" style={{ color: "var(--text-secondary)" }}>Rovers capable of planning routes, analyzing terrain, and performing science without Earth instruction.</p>
            <div className="rounded-lg p-3 font-mono text-sm" style={{ background: "var(--bg-surface)" }}>
              <p>π*(s) = argmax<sub>a</sub> E[R + γV]</p>
            </div>
          </div>
          <div>
            <h3 className="text-base font-bold mb-2" style={{ color: "var(--text-primary)" }}>▸ AI mission planning</h3>
            <p className="text-sm mb-2" style={{ color: "var(--text-secondary)" }}>Autonomous systems dynamically optimize: energy use, navigation, science tasks, communication windows.</p>
            <div className="rounded-lg p-3 font-mono text-sm" style={{ background: "var(--bg-surface)" }}>
              <p>min ∫<sub>0</sub><sup>T</sup> (Energy + Risk − Science Gain) dt</p>
            </div>
          </div>
          <div>
            <h3 className="text-base font-bold mb-2" style={{ color: "var(--text-primary)" }}>▸ Autonomous sample return</h3>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>AI selects, collects, and returns samples with minimal human input. Includes: adaptive navigation, fault detection, trajectory optimization.</p>
          </div>
          <div>
            <h3 className="text-base font-bold mb-2" style={{ color: "var(--text-primary)" }}>▸ Human–Mars AI collaboration</h3>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>AI systems become co-pilots for astronauts: habitat control, life-support optimization, mission scheduling, predictive hazard detection.</p>
          </div>
        </div>
      </section>

      {/* Phase 3: 2040–2060 — Self-Repair & Swarm */}
      <section className="rounded-xl border-2 p-6" style={{ background: "var(--bg-card)", borderColor: "var(--accent-gold)" }}>
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl font-bold" style={{ color: "var(--accent-gold)" }}>🟥 Phase 3: 2040–2060</span>
          <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>Self-Repair Spacecraft & Swarm Exploration</h2>
        </div>
        <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
          Spacecraft must survive decades without maintenance.
        </p>

        <div className="space-y-6">
          <div>
            <h3 className="text-base font-bold mb-2" style={{ color: "var(--text-primary)" }}>▸ Self-repair satellites</h3>
            <p className="text-sm mb-2" style={{ color: "var(--text-secondary)" }}>Structural integrity model. H = system health, I = onboard intelligence. AI-driven repair maintains long-term survival.</p>
            <div className="rounded-lg p-3 font-mono text-sm" style={{ background: "var(--bg-surface)" }}>
              <p>∂H/∂t = −λH + αI(1 − H)</p>
            </div>
          </div>
          <div>
            <h3 className="text-base font-bold mb-2" style={{ color: "var(--text-primary)" }}>▸ Swarm exploration</h3>
            <p className="text-sm mb-2" style={{ color: "var(--text-secondary)" }}>Multiple intelligent probes operate as coordinated network. Applications: asteroid mapping, planetary scanning, distributed telescopes, debris monitoring.</p>
            <div className="rounded-lg p-3 font-mono text-sm" style={{ background: "var(--bg-surface)" }}>
              <p>I<sub>total</sub> = ∑I<sub>i</sub> + ∑C<sub>ij</sub></p>
            </div>
          </div>
          <div>
            <h3 className="text-base font-bold mb-2" style={{ color: "var(--text-primary)" }}>▸ AI space stations</h3>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Fully autonomous orbital platforms managing: docking, power, repairs, research, crew support.</p>
          </div>
          <div>
            <h3 className="text-base font-bold mb-2" style={{ color: "var(--text-primary)" }}>▸ Interplanetary internet</h3>
            <p className="text-sm mb-2" style={{ color: "var(--text-secondary)" }}>Delay-tolerant networking connecting Earth ↔ Moon ↔ Mars ↔ deep space. AI manages data flow.</p>
            <div className="rounded-lg p-3 font-mono text-sm" style={{ background: "var(--bg-surface)" }}>
              <p>min (latency + energy + data loss)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Phase 4: 2060+ — Interstellar */}
      <section className="rounded-xl border-2 p-6" style={{ background: "var(--bg-card)", borderColor: "var(--border-color)" }}>
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl font-bold" style={{ color: "var(--accent-cyan)" }}>🟥 Phase 4: 2060+</span>
          <h2 className="text-lg font-bold" style={{ color: "var(--text-primary)" }}>Interstellar Probes & Space-AGI Systems</h2>
        </div>
        <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
          Human-controlled missions cannot scale beyond solar system. Autonomous intelligence becomes primary explorer.
        </p>

        <div className="space-y-6">
          <div>
            <h3 className="text-base font-bold mb-2" style={{ color: "var(--text-primary)" }}>▸ Interstellar probes</h3>
            <p className="text-sm mb-2" style={{ color: "var(--text-secondary)" }}>Self-navigating spacecraft operating for decades or centuries. Relativistic planning: τ = proper time.</p>
            <div className="rounded-lg p-3 font-mono text-sm" style={{ background: "var(--bg-surface)" }}>
              <p>min ∫<sub>0</sub><sup>τ</sup> L(x, u, τ) dτ</p>
            </div>
          </div>
          <div>
            <h3 className="text-base font-bold mb-2" style={{ color: "var(--text-primary)" }}>▸ Space-AGI systems</h3>
            <p className="text-sm mb-2" style={{ color: "var(--text-secondary)" }}>Highly advanced onboard intelligence capable of: scientific discovery, self-repair, adaptive navigation, mission redesign.</p>
            <div className="rounded-lg p-3 font-mono text-sm" style={{ background: "var(--bg-surface)" }}>
              <p>dI/dt = αI + βK + γE</p>
            </div>
          </div>
        </div>
      </section>

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
