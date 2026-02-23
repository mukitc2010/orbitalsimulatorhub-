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
          <Link href="/research/space-agi-math">
            <a className="text-sm px-3 py-1.5 rounded-lg border-2" style={{ borderColor: "var(--accent-cyan)", color: "var(--text-primary)" }}>
              📐 See the full math (graduate level)
            </a>
          </Link>
          <Link href="/simulator">
            <a className="text-sm px-3 py-1.5 rounded-lg" style={{ background: "var(--accent-gold)", color: "#0f172a" }}>
              🛰 Try the simulators
            </a>
          </Link>
        </div>
      </div>

      <section className="rounded-xl border-2 p-6" style={{ background: "var(--bg-card)", borderColor: "var(--accent-cyan)" }}>
        <h3 className="text-xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>🚀 Part 1 — Optimal Control (The Big Idea)</h3>
        <div className="space-y-6">
          <div>
            <h4 className="text-base font-bold mb-2" style={{ color: "var(--accent-cyan)" }}>What is it?</h4>
            <p className="text-sm mb-3" style={{ color: "var(--text-secondary)" }}>
              <strong>Optimal control</strong> = finding the <em>best</em> way to do something. Not just any way — the one that uses the least fuel, takes the shortest time, or avoids the most risk.
            </p>
            <div className="rounded-lg p-4 text-sm" style={{ background: "var(--bg-surface)" }}>
              <p className="font-bold mb-2">Example: Parking a car</p>
              <p>You could zigzag into a spot (wastes gas) or take 3 smooth turns (efficient). Optimal control finds the smooth path that uses the least steering and gas.</p>
            </div>
          </div>
          <div>
            <h4 className="text-base font-bold mb-2" style={{ color: "var(--accent-cyan)" }}>In space?</h4>
            <p className="text-sm mb-3" style={{ color: "var(--text-secondary)" }}>
              A satellite needs to move from one orbit to another. There are infinite paths. <strong>Optimal control</strong> picks the one that burns the least fuel — critical when you can&apos;t refuel in space.
            </p>
            <div className="rounded-lg p-4 text-sm" style={{ background: "var(--bg-surface)" }}>
              <p className="font-bold mb-2">Real example: ISS docking</p>
              <p>When a Dragon capsule docks with the ISS, it doesn&apos;t fly straight. It follows a fuel-optimal path computed by — you guessed it — optimal control math.</p>
            </div>
          </div>
          <div>
            <h4 className="text-base font-bold mb-2" style={{ color: "var(--accent-cyan)" }}>Pontryagin&apos;s Maximum Principle — The Short Version</h4>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
              This is a <strong>math trick</strong> from the 1960s that turns &quot;find the best path&quot; into a set of equations you can solve. Engineers use it for fuel-optimal transfers, Mars missions, and low-thrust trajectories.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-xl border-2 p-6" style={{ background: "var(--bg-card)", borderColor: "var(--accent-gold)" }}>
        <h3 className="text-xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>🎮 Part 2 — MPC & LQR (How AI Satellites Decide)</h3>
        <div className="space-y-6">
          <div>
            <h4 className="text-base font-bold mb-2" style={{ color: "var(--accent-gold)" }}>MPC = Model Predictive Control</h4>
            <p className="text-sm mb-3" style={{ color: "var(--text-secondary)" }}>
              <strong>Idea:</strong> Don&apos;t plan the whole mission at once. Plan the next few steps, execute them, then <em>replan</em>. Like playing a video game — you react to what happens.
            </p>
            <div className="rounded-lg p-4 text-sm" style={{ background: "var(--bg-surface)" }}>
              <p className="font-bold mb-2">Example: Starlink collision avoidance</p>
              <p>Starlink has 5,000+ satellites. They can&apos;t pre-plan forever — space debris moves. So every few minutes they recompute: &quot;Where will I be in 10 minutes? Will I hit anything? If yes, nudge now.&quot; That&apos;s MPC.</p>
            </div>
          </div>
          <div>
            <h4 className="text-base font-bold mb-2" style={{ color: "var(--accent-gold)" }}>LQR = Linear Quadratic Regulator</h4>
            <p className="text-sm mb-3" style={{ color: "var(--text-secondary)" }}>
              <strong>Idea:</strong> When you&apos;re <em>close</em> to where you want to be, the math gets simpler. LQR says: &quot;Apply thrust proportional to how far off you are.&quot; Like a thermostat.
            </p>
            <div className="rounded-lg p-4 text-sm" style={{ background: "var(--bg-surface)" }}>
              <p className="font-bold mb-2">Example: Orbit correction</p>
              <p>GPS satellites drift. Ground control tells them: &quot;You&apos;re 100 m off. Fire thrusters this much.&quot; The &quot;this much&quot; comes from LQR.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-xl border-2 p-6" style={{ background: "var(--bg-card)", borderColor: "var(--accent-pink)" }}>
        <h3 className="text-xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>🧠 Part 3 — Space-AGI (Future Spacecraft Brains)</h3>
        <div className="space-y-6">
          <div>
            <h4 className="text-base font-bold mb-2" style={{ color: "var(--accent-pink)" }}>1. Knowledge–Energy Optimization</h4>
            <p className="text-sm mb-3" style={{ color: "var(--text-secondary)" }}>
              <strong>Idea:</strong> Future spacecraft have limited power. The goal: learn as much as possible per watt. Mars rover Perseverance picks targets that maximize &quot;new knowledge per joule.&quot;
            </p>
          </div>
          <div>
            <h4 className="text-base font-bold mb-2" style={{ color: "var(--accent-pink)" }}>2. Autonomous Intelligence Growth</h4>
            <p className="text-sm mb-3" style={{ color: "var(--text-secondary)" }}>
              <strong>Idea:</strong> A spacecraft&apos;s brain gets smarter over time. dI/dt = αI + βK + γE — intelligence grows from current smarts (I), knowledge (K), and energy (E).
            </p>
          </div>
          <div>
            <h4 className="text-base font-bold mb-2" style={{ color: "var(--accent-pink)" }}>3. Reaction–Diffusion</h4>
            <p className="text-sm mb-3" style={{ color: "var(--text-secondary)" }}>
              <strong>Idea:</strong> AI &quot;spreading&quot; from Earth to Moon to Mars — like a rumor in a school. Models how intelligence propagates across lunar bases, Mars colony, probes.
            </p>
          </div>
          <div>
            <h4 className="text-base font-bold mb-2" style={{ color: "var(--accent-pink)" }}>4. Safety-Constrained</h4>
            <p className="text-sm mb-3" style={{ color: "var(--text-secondary)" }}>
              <strong>Idea:</strong> Optimize — but never cross into unsafe zones. Like a self-driving car: get there fast, but never run a red light.
            </p>
          </div>
        </div>
      </section>

      <section className="rounded-xl p-6" style={{ background: "var(--bg-surface)", border: "1px solid var(--border-color)" }}>
        <h3 className="text-lg font-bold mb-4" style={{ color: "var(--text-primary)" }}>📚 Summary</h3>
        <ul className="text-sm space-y-2 mb-4" style={{ color: "var(--text-secondary)" }}>
          <li><strong>Optimal control</strong> — find the best path (least fuel, least risk)</li>
          <li><strong>Pontryagin</strong> — math trick to compute that path</li>
          <li><strong>MPC</strong> — replan often (Starlink, formation flying)</li>
          <li><strong>LQR</strong> — simple rule when close to target (orbit correction)</li>
          <li><strong>Knowledge–Energy</strong> — maximize science per watt</li>
          <li><strong>Intelligence growth</strong> — spacecraft get smarter over time</li>
          <li><strong>Reaction–diffusion</strong> — AI spreads across Moon, Mars, probes</li>
          <li><strong>Safety-constrained</strong> — optimize but never enter danger zones</li>
        </ul>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          Ready for the real equations? <Link href="/research/space-agi-math"><a className="text-[var(--accent-cyan)] hover:underline">Space-AGI Mathematics</a></Link> (graduate level). Or try the <Link href="/simulator"><a className="text-[var(--accent-gold)] hover:underline">Orbit & Swarm Simulators</a></Link>.
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
        <Link href="/research/space-agi-lab">
          <a className="px-4 py-2 rounded-lg font-medium" style={{ background: "var(--accent-cyan)", color: "#0f172a" }}>Engineering Lab</a>
        </Link>
        <Link href="/research/space-agi-roadmap">
          <a className="px-4 py-2 rounded-lg font-medium" style={{ background: "var(--accent-gold)", color: "#0f172a" }}>Roadmap</a>
        </Link>
        <Link href="/research/space-agi-math">
          <a className="px-4 py-2 rounded-lg font-medium border-2" style={{ borderColor: "var(--accent-cyan)", color: "var(--text-primary)" }}>Full Mathematics</a>
        </Link>
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
        <Link href="/research/space-agi-lab">
          <a className="px-4 py-2 rounded-lg font-medium" style={{ background: "var(--accent-cyan)", color: "#0f172a" }}>← Space-AGI Engineering Lab</a>
        </Link>
        <Link href="/research/space-agi-math">
          <a className="px-4 py-2 rounded-lg font-medium" style={{ background: "var(--accent-gold)", color: "#0f172a" }}>Full Mathematics →</a>
        </Link>
        <Link href="/calculators">
          <a className="px-4 py-2 rounded-lg font-medium border-2" style={{ borderColor: "var(--accent-cyan)", color: "var(--text-primary)" }}>Interactive Calculators</a>
        </Link>
      </div>
    </div>
  );
}
