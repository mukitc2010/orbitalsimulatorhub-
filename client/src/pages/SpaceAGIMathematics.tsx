import { Link } from "wouter";

export function SpaceAGIMathematics() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div>
        <p className="text-xs font-medium uppercase tracking-widest text-[var(--accent-cyan)] mb-2">Graduate-Level Credible</p>
        <h1 className="headline">Space-AGI Mathematics</h1>
        <p className="subhead max-w-2xl">
          The first open platform teaching Orbital Mechanics + Advanced Control Theory + Space-AGI Engineering. Elite aerospace control math.
        </p>
      </div>

      {/* PART 1 — Optimal Control Theory */}
      <section className="rounded-xl border-2 p-6" style={{ background: "var(--bg-card)", borderColor: "var(--accent-cyan)" }}>
        <h2 className="text-xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>🚀 Part 1 — Optimal Control Theory</h2>

        {/* 1️⃣ Optimal Control Problem */}
        <div className="mb-8">
          <h3 className="text-base font-bold mb-3" style={{ color: "var(--accent-cyan)" }}>1️⃣ Optimal Control Problem (Continuous Time)</h3>
          <div className="rounded-lg p-4 font-mono text-sm mb-2" style={{ background: "var(--bg-surface)" }}>
            <p className="font-bold mb-1">Spacecraft dynamics:</p>
            <p className="mb-3">ẋ(t) = f(x(t), u(t), t)</p>
            <p className="font-bold mb-1">Mission objective:</p>
            <p>min<sub>u(t)</sub> J = ∫<sub>0</sub><sup>T</sup> L(x(t), u(t), t) dt + Φ(x(T))</p>
            <p className="text-xs mt-2" style={{ color: "var(--text-secondary)" }}>
              Where: L = running cost (fuel, risk, energy), Φ = terminal cost, u(t) = thrust control
            </p>
          </div>
        </div>

        {/* 2️⃣ Pontryagin's Maximum Principle */}
        <div className="mb-8">
          <h3 className="text-base font-bold mb-3" style={{ color: "var(--accent-cyan)" }}>2️⃣ Pontryagin&apos;s Maximum Principle (Real Engineering Math)</h3>
          <div className="rounded-lg p-4 font-mono text-sm mb-2" style={{ background: "var(--bg-surface)" }}>
            <p className="font-bold mb-1">Define Hamiltonian:</p>
            <p className="mb-2">H = L(x, u, t) + λ<sup>T</sup>f(x, u, t)</p>
            <p className="font-bold mb-1">Costate dynamics:</p>
            <p className="mb-2">λ̇ = −∂H/∂x</p>
            <p className="font-bold mb-1">Optimal control condition:</p>
            <p>u* = argmin<sub>u</sub> H(x, u, λ, t)</p>
          </div>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Used in: fuel-optimal transfers, low-thrust trajectory design, interplanetary mission planning. This makes your site graduate-level credible.
          </p>
        </div>

        {/* 3️⃣ MPC */}
        <div className="mb-8">
          <h3 className="text-base font-bold mb-3" style={{ color: "var(--accent-cyan)" }}>3️⃣ Model Predictive Control (MPC for Autonomous Satellites)</h3>
          <div className="rounded-lg p-4 font-mono text-sm mb-2" style={{ background: "var(--bg-surface)" }}>
            <p className="font-bold mb-1">Discrete form:</p>
            <p className="mb-2">x<sub>k+1</sub> = Ax<sub>k</sub> + Bu<sub>k</sub></p>
            <p className="font-bold mb-1">Optimization at each time step:</p>
            <p>min<sub>u<sub>0:N</sub></sub> ∑<sub>k=0</sub><sup>N</sup> (x<sub>k</sub> − x<sub>ref</sub>)<sup>T</sup>Q(x<sub>k</sub> − x<sub>ref</sub>) + u<sub>k</sub><sup>T</sup>Ru<sub>k</sub></p>
          </div>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Used for: orbit correction, docking, formation flying, AI-controlled satellite swarms.
          </p>
        </div>

        {/* 4️⃣ LQR */}
        <div>
          <h3 className="text-base font-bold mb-3" style={{ color: "var(--accent-cyan)" }}>4️⃣ LQR (Linear Quadratic Regulator)</h3>
          <div className="rounded-lg p-4 font-mono text-sm mb-2" style={{ background: "var(--bg-surface)" }}>
            <p className="font-bold mb-1">Cost:</p>
            <p className="mb-2">J = ∫<sub>0</sub><sup>∞</sup> (x<sup>T</sup>Qx + u<sup>T</sup>Ru) dt</p>
            <p className="font-bold mb-1">Optimal solution:</p>
            <p className="mb-2">u = −Kx</p>
            <p className="font-bold mb-1">Where K solves Riccati equation:</p>
            <p>A<sup>T</sup>P + PA − PBR<sup>−1</sup>B<sup>T</sup>P + Q = 0</p>
          </div>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>This is elite aerospace control math.</p>
        </div>
      </section>

      {/* PART 3 — Space-AGI Mathematical Framework */}
      <section className="rounded-xl border-2 p-6" style={{ background: "var(--bg-card)", borderColor: "var(--accent-pink)" }}>
        <h2 className="text-xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>🧠 Part 3 — Space-AGI Mathematical Framework</h2>
        <p className="text-sm mb-6" style={{ color: "var(--text-secondary)" }}>
          This is where you differentiate from NASA. No one explains this publicly.
        </p>

        {/* 1️⃣ Knowledge–Energy Optimization */}
        <div className="mb-8">
          <h3 className="text-base font-bold mb-3" style={{ color: "var(--accent-pink)" }}>1️⃣ Knowledge–Energy Optimization Law</h3>
          <div className="rounded-lg p-4 font-mono text-sm mb-2" style={{ background: "var(--bg-surface)" }}>
            <p className="font-bold mb-1">Define mission intelligence:</p>
            <p className="mb-2">D = (dK/dt) / P<sub>use</sub></p>
            <p className="font-bold mb-1">Maximize:</p>
            <p>max ∫<sub>0</sub><sup>T</sup> (dK/dt) / P<sub>use</sub> dt</p>
          </div>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Interpretation: Future spacecraft maximize knowledge per energy unit.
          </p>
        </div>

        {/* 2️⃣ Autonomous Intelligence Growth */}
        <div className="mb-8">
          <h3 className="text-base font-bold mb-3" style={{ color: "var(--accent-pink)" }}>2️⃣ Autonomous Intelligence Growth Model</h3>
          <div className="rounded-lg p-4 font-mono text-sm mb-2" style={{ background: "var(--bg-surface)" }}>
            <p>dI/dt = αI + βK + γE</p>
            <p className="text-xs mt-2" style={{ color: "var(--text-secondary)" }}>
              Where: I = onboard intelligence, K = knowledge, E = energy access. Shows recursive improvement.
            </p>
          </div>
        </div>

        {/* 3️⃣ Reaction–Diffusion */}
        <div className="mb-8">
          <h3 className="text-base font-bold mb-3" style={{ color: "var(--accent-pink)" }}>3️⃣ Reaction–Diffusion Interplanetary AI Network</h3>
          <div className="rounded-lg p-4 font-mono text-sm mb-2" style={{ background: "var(--bg-surface)" }}>
            <p>∂I/∂t = D∇²I + αI</p>
          </div>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Models: Intelligence spreading across lunar + Mars nodes. This is very futuristic but mathematically clean.
          </p>
        </div>

        {/* 4️⃣ Safety-Constrained */}
        <div>
          <h3 className="text-base font-bold mb-3" style={{ color: "var(--accent-pink)" }}>4️⃣ Safety-Constrained Cosmic Optimization</h3>
          <div className="rounded-lg p-4 font-mono text-sm mb-2" style={{ background: "var(--bg-surface)" }}>
            <p className="font-bold mb-1">Define safety functional:</p>
            <p>J<sub>safe</sub> = ∫<sub>0</sub><sup>T</sup> (U(x, u) − κ/Φ(x, u)) dt</p>
            <p className="text-xs mt-2" style={{ color: "var(--text-secondary)" }}>Barrier prevents unsafe state. Brings alignment math into space engineering.</p>
          </div>
        </div>
      </section>

      {/* Differentiator */}
      <section className="rounded-xl border-2 p-6" style={{ background: "var(--bg-card)", borderColor: "var(--accent-gold)" }}>
        <h2 className="text-lg font-bold mb-4" style={{ color: "var(--accent-gold)" }}>🧠 This Makes Your Site Different</h2>
        <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
          Now you are not: A space blog. A simulator tool.
        </p>
        <p className="text-sm font-medium" style={{ color: "var(--text-primary)" }}>
          You are: The first open platform teaching Orbital Mechanics + Advanced Control Theory + Space-AGI Engineering. That is extremely rare.
        </p>
      </section>

      <div className="flex flex-wrap gap-3">
        <Link href="/research/space-agi-lab">
          <a className="px-4 py-2 rounded-lg font-medium" style={{ background: "var(--accent-cyan)", color: "#0f172a" }}>← Space-AGI Engineering Lab</a>
        </Link>
        <Link href="/calculators">
          <a className="px-4 py-2 rounded-lg font-medium" style={{ background: "var(--accent-gold)", color: "#0f172a" }}>Interactive Calculators →</a>
        </Link>
        <Link href="/research/space-agi-doctrine">
          <a className="px-4 py-2 rounded-lg font-medium border-2" style={{ borderColor: "var(--accent-cyan)", color: "var(--text-primary)" }}>Space-AGI Doctrine</a>
        </Link>
      </div>
    </div>
  );
}
