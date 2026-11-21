import { useState } from "react";
import { Link } from "wouter";

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "math", label: "Math Explained" },
] as const;

function MathExplainedTab() {
  return (
    <div className="space-y-12">
      <div>
        <p className="text-xs font-medium uppercase tracking-widest text-[var(--accent-gold)] mb-2">No PhD Required</p>
        <h2 className="text-2xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>Space-AGI Math — Explained Simply</h2>
        <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
          The same math NASA uses for spacecraft — but in plain English, with real examples. Perfect for high schoolers, college freshmen, or anyone curious.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/research/space-agi-math" className="text-sm px-3 py-1.5 rounded-lg border-2" style={{ borderColor: "var(--accent-cyan)", color: "var(--text-primary)" }}>
              📐 See the full math (graduate level)
            </Link>
          <Link href="/simulator" className="text-sm px-3 py-1.5 rounded-lg" style={{ background: "var(--accent-gold)", color: "#0f172a" }}>
              🛰 Try the simulators
            </Link>
        </div>
      </div>

      <section className="rounded-xl border-2 p-6" style={{ background: "var(--bg-card)", borderColor: "var(--accent-cyan)" }}>
        <h3 className="text-xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>🚀 Part 1 — Optimal Control Theory</h3>

        <div className="space-y-6">
          <div>
            <h4 className="text-base font-bold mb-2" style={{ color: "var(--accent-cyan)" }}>1️⃣ Optimal Control Problem (Continuous Time)</h4>
            <div className="rounded-lg p-4 font-mono text-sm mb-2" style={{ background: "var(--bg-surface)" }}>
              <p className="mb-1"><strong>Spacecraft dynamics:</strong> ẋ(t) = f(x, u, t)</p>
              <p className="mb-1"><strong>Mission objective:</strong> min J = ∫₀ᵀ L(x,u,t) dt + Φ(x(T))</p>
              <p className="text-xs mt-2" style={{ color: "var(--text-muted)" }}>L = running cost (fuel, risk, energy) · Φ = terminal cost · u(t) = thrust control</p>
            </div>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              <strong>In plain English:</strong> The spacecraft moves according to f (physics). You want to minimize a total cost J: the cost along the way (L) plus the cost at the end (Φ). L is &quot;how much fuel/risk&quot; you use; Φ is &quot;how far from target&quot; you end up. Optimal control finds the thrust u(t) that makes J as small as possible. <em>Example:</em> ISS docking — Dragon picks the path that burns least fuel.
            </p>
          </div>

          <div>
            <h4 className="text-base font-bold mb-2" style={{ color: "var(--accent-cyan)" }}>2️⃣ Pontryagin&apos;s Maximum Principle</h4>
            <div className="rounded-lg p-4 font-mono text-sm mb-2" style={{ background: "var(--bg-surface)" }}>
              <p className="mb-1"><strong>Hamiltonian:</strong> H = L(x,u,t) + λᵀf(x,u,t)</p>
              <p className="mb-1"><strong>Costate:</strong> λ̇ = −∂H/∂x</p>
              <p><strong>Optimal control:</strong> u* = argmin H</p>
            </div>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              <strong>In plain English:</strong> Pontryagin (1960s) gave a recipe: define H (Hamiltonian) = cost + a &quot;shadow price&quot; λ times how the state changes. The costate λ evolves backward in time. The best thrust u* is the one that minimizes H at each instant. This turns an infinite-dimensional problem into solvable equations. Used for fuel-optimal transfers, Mars missions, low-thrust trajectories.
            </p>
          </div>

          <div>
            <h4 className="text-base font-bold mb-2" style={{ color: "var(--accent-cyan)" }}>3️⃣ Model Predictive Control (MPC)</h4>
            <div className="rounded-lg p-4 font-mono text-sm mb-2" style={{ background: "var(--bg-surface)" }}>
              <p className="mb-1"><strong>Discrete form:</strong> xₖ₊₁ = Axₖ + Buₖ</p>
              <p><strong>Optimize:</strong> min ∑ₖ (xₖ−x_ref)ᵀQ(xₖ−x_ref) + uₖᵀRuₖ</p>
            </div>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              <strong>In plain English:</strong> Don&apos;t plan the whole mission. At each step, predict the next N steps (using xₖ₊₁ = Axₖ + Buₖ), find the thrust sequence that keeps you near target (x_ref) with minimal effort (R penalizes big thrusts). Execute the first step, then replan. Like a video game — react to what happens. <em>Example:</em> Starlink — 5,000+ satellites recompute every few minutes: &quot;Will I hit debris? Nudge now if yes.&quot;
            </p>
          </div>

          <div>
            <h4 className="text-base font-bold mb-2" style={{ color: "var(--accent-cyan)" }}>4️⃣ LQR (Linear Quadratic Regulator)</h4>
            <div className="rounded-lg p-4 font-mono text-sm mb-2" style={{ background: "var(--bg-surface)" }}>
              <p className="mb-1"><strong>Cost:</strong> J = ∫₀^∞ (xᵀQx + uᵀRu) dt</p>
              <p className="mb-1"><strong>Solution:</strong> u = −Kx</p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>K from Riccati: AᵀP + PA − PBR⁻¹BᵀP + Q = 0</p>
            </div>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              <strong>In plain English:</strong> When you&apos;re close to target, the math simplifies. LQR says: thrust u = −Kx — proportional to how far off you are, with a gain matrix K from the Riccati equation. Like a thermostat: if 2° too cold, heat a bit more. Used for orbit correction, station-keeping. GPS satellites use this to stay in their slot.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-xl border-2 p-6" style={{ background: "var(--bg-card)", borderColor: "var(--accent-pink)" }}>
        <h3 className="text-xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>🧠 Part 3 — Space-AGI Mathematical Framework</h3>
        <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
          This is where you differentiate from NASA. No one explains this publicly — until now.
        </p>

        <div className="space-y-6">
          <div>
            <h4 className="text-base font-bold mb-2" style={{ color: "var(--accent-pink)" }}>1️⃣ Knowledge–Energy Optimization Law</h4>
            <div className="rounded-lg p-4 font-mono text-sm mb-2" style={{ background: "var(--bg-surface)" }}>
              <p className="mb-1"><strong>Mission intelligence:</strong> D = (dK/dt) / P_use</p>
              <p><strong>Maximize:</strong> max ∫₀ᵀ (dK/dt) / P_use dt</p>
            </div>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              <strong>In plain English:</strong> D = &quot;knowledge gained per watt.&quot; Future spacecraft have limited power (solar, batteries). The goal: learn as much as possible per joule. Maximize the integral = get the most science for your energy budget. <em>Example:</em> Mars rover Perseverance can&apos;t photograph every rock — it picks targets that maximize &quot;new knowledge per joule.&quot;
            </p>
          </div>

          <div>
            <h4 className="text-base font-bold mb-2" style={{ color: "var(--accent-pink)" }}>2️⃣ Autonomous Intelligence Growth Model</h4>
            <div className="rounded-lg p-4 font-mono text-sm mb-2" style={{ background: "var(--bg-surface)" }}>
              <p>dI/dt = αI + βK + γE</p>
              <p className="text-xs mt-2" style={{ color: "var(--text-muted)" }}>I = onboard intelligence · K = knowledge · E = energy access</p>
            </div>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              <strong>In plain English:</strong> The spacecraft&apos;s brain gets smarter over time. Intelligence grows from: (α) current smarts I, (β) knowledge K gathered, (γ) energy E available. It&apos;s a growth equation — recursive improvement. Like studying: each day you know more, so you learn faster the next day.
            </p>
          </div>

          <div>
            <h4 className="text-base font-bold mb-2" style={{ color: "var(--accent-pink)" }}>3️⃣ Reaction–Diffusion Interplanetary AI Network</h4>
            <div className="rounded-lg p-4 font-mono text-sm mb-2" style={{ background: "var(--bg-surface)" }}>
              <p>∂I/∂t = D∇²I + αI</p>
            </div>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              <strong>In plain English:</strong> AI &quot;spreads&quot; across space. D∇²I = diffusion (intelligence flows from node to node, like heat); αI = local growth. Imagine Earth → Moon → Mars bases sharing software updates, navigation data, learned models. This equation describes how that &quot;intelligence flow&quot; works. Very futuristic but mathematically clean.
            </p>
          </div>

          <div>
            <h4 className="text-base font-bold mb-2" style={{ color: "var(--accent-pink)" }}>4️⃣ Safety-Constrained Cosmic Optimization</h4>
            <div className="rounded-lg p-4 font-mono text-sm mb-2" style={{ background: "var(--bg-surface)" }}>
              <p>J_safe = ∫₀ᵀ (U(x,u) − κ/Φ(x,u)) dt</p>
              <p className="text-xs mt-2" style={{ color: "var(--text-muted)" }}>Φ = barrier · κ = safety weight</p>
            </div>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              <strong>In plain English:</strong> Optimize your mission (U = utility) — but the term κ/Φ adds a &quot;barrier&quot; that blows up when you approach unsafe states (Φ → 0). So the optimal path never enters the danger zone. Like a self-driving car: get there fast, but never run a red light. Brings AI safety (alignment) math into space engineering.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-xl p-6" style={{ background: "var(--bg-surface)", border: "1px solid var(--border-color)" }}>
        <h3 className="text-lg font-bold mb-4" style={{ color: "var(--text-primary)" }}>📚 Summary — All Equations Explained</h3>
        <ul className="text-sm space-y-2 mb-4" style={{ color: "var(--text-secondary)" }}>
          <li><strong>Optimal control</strong> — ẋ=f(x,u,t), min J = ∫L dt + Φ. Find best thrust path.</li>
          <li><strong>Pontryagin</strong> — H = L + λᵀf, u* = argmin H. Recipe to compute best path.</li>
          <li><strong>MPC</strong> — xₖ₊₁ = Axₖ + Buₖ. Replan every step (Starlink, formation flying).</li>
          <li><strong>LQR</strong> — u = −Kx. Simple rule when close (orbit correction, GPS).</li>
          <li><strong>Knowledge–Energy</strong> — D = (dK/dt)/P_use. Maximize science per watt.</li>
          <li><strong>Intelligence growth</strong> — dI/dt = αI + βK + γE. Spacecraft get smarter over time.</li>
          <li><strong>Reaction–diffusion</strong> — ∂I/∂t = D∇²I + αI. AI spreads across Moon, Mars.</li>
          <li><strong>Safety-constrained</strong> — J_safe with κ/Φ barrier. Never enter danger zones.</li>
        </ul>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          Ready for the full notation? <Link href="/research/space-agi-math" className="text-[var(--accent-cyan)] hover:underline">Space-AGI Mathematics</Link> (graduate level). Or try the <Link href="/simulator" className="text-[var(--accent-gold)] hover:underline">Orbit & Swarm Simulators</Link>.
        </p>
      </section>
    </div>
  );
}

function OverviewTab() {
  return (
    <div className="space-y-6">
      <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
        Space-AGI is about <strong>autonomous spacecraft</strong> — satellites and rovers that make their own decisions using math and AI. This section explains the concepts in plain language.
      </p>
      <div className="rounded-xl border-2 p-6" style={{ background: "var(--bg-card)", borderColor: "var(--accent-cyan)" }}>
        <h3 className="text-lg font-bold mb-3" style={{ color: "var(--accent-cyan)" }}>📖 Math Explained</h3>
        <p className="text-sm mb-3" style={{ color: "var(--text-secondary)" }}>
          Optimal control, MPC, LQR, Pontryagin — the same math NASA uses, explained with examples (parking a car, ISS docking, Starlink, Mars rover). No PhD required.
        </p>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          Switch to the <strong>Math Explained</strong> tab above to read the full guide.
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        <Link href="/research/space-agi-lab" className="px-4 py-2 rounded-lg font-medium" style={{ background: "var(--accent-cyan)", color: "#0f172a" }}>Engineering Lab</Link>
        <Link href="/research/space-agi-roadmap" className="px-4 py-2 rounded-lg font-medium" style={{ background: "var(--accent-gold)", color: "#0f172a" }}>Roadmap</Link>
        <Link href="/research/space-agi-math" className="px-4 py-2 rounded-lg font-medium border-2" style={{ borderColor: "var(--accent-cyan)", color: "var(--text-primary)" }}>Full Mathematics</Link>
      </div>
    </div>
  );
}

export function SpaceAGIExplanation() {
  const [activeTab, setActiveTab] = useState<"overview" | "math">("math");

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <p className="text-xs font-medium uppercase tracking-widest text-[var(--accent-cyan)] mb-2">Space-AGI Lab</p>
        <h1 className="headline">Explanations</h1>
        <p className="subhead max-w-2xl">
          Plain-language guides for students and curious minds. No jargon — just the ideas behind autonomous spacecraft and space AI.
        </p>
      </div>

      {/* Tab bar */}
      <div className="flex gap-2 border-b-2" style={{ borderColor: "var(--border-color)" }}>
        {TABS.map(({ id, label }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className="px-4 py-2 text-sm font-medium rounded-t-lg transition"
            style={{
              background: activeTab === id ? "var(--accent-cyan)" : "transparent",
              color: activeTab === id ? "#0f172a" : "var(--text-secondary)",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "overview" && <OverviewTab />}
      {activeTab === "math" && <MathExplainedTab />}

      <div className="flex flex-wrap gap-3 pt-4">
        <Link href="/research/space-agi-lab" className="px-4 py-2 rounded-lg font-medium" style={{ background: "var(--accent-cyan)", color: "#0f172a" }}>← Space-AGI Engineering Lab</Link>
        <Link href="/research/space-agi-math" className="px-4 py-2 rounded-lg font-medium" style={{ background: "var(--accent-gold)", color: "#0f172a" }}>Full Mathematics →</Link>
        <Link href="/calculators" className="px-4 py-2 rounded-lg font-medium border-2" style={{ borderColor: "var(--accent-cyan)", color: "var(--text-primary)" }}>Interactive Calculators</Link>
      </div>
    </div>
  );
}
