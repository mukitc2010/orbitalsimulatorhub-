import { Link } from "wouter";

const sections = [
  {
    title: "1. Pontryagin Maximum Principle (PMP)",
    subtitle:
      "The foundation of optimal spacecraft trajectory optimization, fuel-optimal landing, Mars missions, Apollo guidance, and autonomous spacecraft.",
    formulaTitle: "Key equations",
    formulas: [
      "x˙ = f(x, u, t)",
      "J = ϕ(x(t_f)) + ∫[t_0→t_f] L(x, u, t) dt",
      "H(x, λ, u, t) = L(x, u, t) + λ^T f(x, u, t)",
      "λ˙ = −∂H/∂x",
      "u* = argmin_u H(x, λ, u)",
      "λ(t_f) = ∂ϕ/∂x",
    ],
    notes: ["State vector x", "Control input u", "Hamiltonian H", "Costate λ"],
  },
  {
    title: "2. Euler–Lagrange Equation",
    subtitle: "The basis of optimal control, mechanics, robotics, and physics.",
    formulaTitle: "Equation",
    formulas: ["d/dt(∂L/∂q˙) − ∂L/∂q = 0"],
  },
  {
    title: "3. Hamilton's Equations",
    subtitle: "Core equations in analytical mechanics and trajectory analysis.",
    formulaTitle: "Equations",
    formulas: ["q˙ = ∂H/∂p", "p˙ = −∂H/∂q"],
  },
  {
    title: "4. State Space Model",
    subtitle: "Used everywhere in aerospace.",
    formulaTitle: "Equations",
    formulas: ["x˙ = Ax + Bu", "y = Cx + Du"],
  },
  {
    title: "5. Linear Quadratic Regulator (LQR)",
    subtitle: "A standard optimal controller for linear systems.",
    formulaTitle: "Performance index and control law",
    formulas: ["J = ∫[0→∞] (x^TQx + u^TRu) dt", "u = −Kx"],
  },
  {
    title: "6. Riccati Equation",
    subtitle: "One of the most important equations in optimal control.",
    formulaTitle: "Equation",
    formulas: ["A^TP + PA − PBR^−1B^TP + Q = 0"],
  },
  {
    title: "7. Model Predictive Control (MPC)",
    subtitle: "Optimization-based control for constrained systems.",
    formulaTitle: "Optimization problem",
    formulas: ["min ∑[k=0→N] x_k^TQx_k + u_k^TRu_k", "x[k+1] = Ax[k] + Bu[k]"],
  },
  {
    title: "8. Kalman Filter",
    subtitle: "Recursive estimation for navigation, sensing, and guidance.",
    formulaTitle: "Prediction, covariance, and update",
    formulas: [
      "x[k|k−1] = Ax[k−1] + Bu",
      "P = APA^T + Q",
      "K = PH^T(HPH^T + R)^−1",
      "x = x + K(z − Hx)",
    ],
  },
  {
    title: "9. Orbital Dynamics (Two-Body Problem)",
    subtitle: "The fundamental equation governing satellite and planetary motion.",
    formulaTitle: "Equation",
    formulas: ["r¨ = −μ/r^3 · r", "μ = GM"],
  },
  {
    title: "10. Vis-Viva Equation",
    subtitle: "Determines spacecraft velocity at any point in an orbit.",
    formulaTitle: "Equation",
    formulas: ["v = √[μ(2/r − 1/a)]"],
  },
  {
    title: "11. Tsiolkovsky Rocket Equation",
    subtitle: "The cornerstone of rocket propulsion and mission planning.",
    formulaTitle: "Equation",
    formulas: ["Δv = v_e ln(m_0/m_f)"],
  },
  {
    title: "12. Clohessy–Wiltshire (Hill's) Equations",
    subtitle: "Used for satellite rendezvous and formation flying.",
    formulaTitle: "Equations",
    formulas: [
      "x¨ − 2n y˙ − 3n^2 x = u_x",
      "y¨ + 2n x˙ = u_y",
      "z¨ + n^2 z = u_z",
    ],
  },
  {
    title: "13. Quaternion Attitude Dynamics",
    subtitle: "Used for spacecraft orientation and attitude control.",
    formulaTitle: "Kinematics",
    formulas: ["q˙ = 1/2 Ω(ω) q"],
  },
  {
    title: "14. Extended Kalman Filter (EKF)",
    subtitle: "A nonlinear extension of the Kalman filter.",
    formulaTitle: "Prediction, measurement, and linearization",
    formulas: ["x[k+1] = f(x[k], u[k])", "z = h(x) + v", "F = ∂f/∂x"],
  },
  {
    title: "15. Bellman Equation (Dynamic Programming)",
    subtitle: "The foundation of reinforcement learning and optimal decision-making.",
    formulaTitle: "Equation",
    formulas: ["V(x) = min_u [L(x, u) + V(f(x, u))]"],
  },
  {
    title: "16. Hamilton–Jacobi–Bellman (HJB) Equation",
    subtitle: "The continuous-time optimal control equation.",
    formulaTitle: "Equation",
    formulas: ["−∂V/∂t = min_u [L + ∇V^T f]"],
  },
  {
    title: "17. Lyapunov Stability",
    subtitle: "A key criterion for proving stability of control systems.",
    formulaTitle: "Conditions",
    formulas: ["V(x) > 0", "V˙(x) < 0"],
  },
  {
    title: "18. Eigenvalue Problem",
    subtitle: "Used extensively in vibration analysis, control system stability, orbital dynamics, and structural mechanics.",
    formulaTitle: "Equation",
    formulas: ["A v = λ v", "Example eigenvalues: λ1 = 3, λ2 = 1"],
  },
];

export function SpaceAGIMathematics() {
  return (
    <div className="max-w-5xl mx-auto space-y-10">
      <div>
        <p className="text-xs font-medium uppercase tracking-widest text-[var(--accent-cyan)] mb-2">Graduate-Level Credible</p>
        <h1 className="headline">Space-AGI Mathematics</h1>
        <p className="text-sm mb-2" style={{ color: "var(--text-secondary)" }}>
          New to this? <Link href="/research/space-agi-explanation"><a className="text-[var(--accent-gold)] hover:underline">Read the easy version</a></Link> — same concepts, plain English, examples.
        </p>
        <p className="subhead max-w-3xl">
          A compact reference for control theory, orbital mechanics, estimation, and Space-AGI optimization.
        </p>
      </div>

      <section className="rounded-xl border-2 p-6" style={{ background: "var(--bg-card)", borderColor: "rgba(0,217,255,0.5)" }}>
        <p className="text-xs font-medium uppercase tracking-widest text-[var(--accent-cyan)] mb-2">PMP in Spaceflight</p>
        <h2 className="text-2xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>Pontryagin Maximum Principle (PMP)</h2>
        <p className="text-sm mb-4 max-w-4xl" style={{ color: "var(--text-secondary)" }}>
          PMP is one of the core tools of optimal control. In spacecraft problems, it turns the question “what should the engines do next?” into a precise math problem that minimizes fuel, time, energy, or trajectory error while still obeying the vehicle&apos;s dynamics.
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg p-4" style={{ background: "var(--bg-surface)" }}>
            <h3 className="font-semibold mb-2" style={{ color: "var(--accent-cyan)" }}>Core formulation</h3>
            <div className="space-y-2 font-mono text-sm leading-7" style={{ color: "var(--text-primary)" }}>
              <p>x˙(t) = f(x(t), u(t), t)</p>
              <p>J = ϕ(x(t_f)) + ∫[t_0→t_f] L(x(t), u(t), t) dt</p>
              <p>H(x, λ, u, t) = L(x, u, t) + λ^T f(x, u, t)</p>
              <p>λ˙ = −∂H/∂x</p>
              <p>u*(t) = argmin_u H(x, λ, u, t)</p>
              <p>λ(t_f) = ∂ϕ/∂x</p>
            </div>
          </div>

          <div className="rounded-lg p-4" style={{ background: "var(--bg-surface)" }}>
            <h3 className="font-semibold mb-2" style={{ color: "var(--accent-cyan)" }}>What the symbols mean</h3>
            <ul className="space-y-2 text-sm" style={{ color: "var(--text-secondary)" }}>
              <li><strong style={{ color: "var(--text-primary)" }}>x(t)</strong> is the spacecraft state: position, velocity, attitude, fuel, and more.</li>
              <li><strong style={{ color: "var(--text-primary)" }}>u(t)</strong> is the control input: thrust, steering, reaction wheels, or guidance commands.</li>
              <li><strong style={{ color: "var(--text-primary)" }}>H</strong> is the Hamiltonian, which combines immediate cost with future mission impact.</li>
              <li><strong style={{ color: "var(--text-primary)" }}>λ</strong> is the costate, which measures how valuable each state variable is to the mission.</li>
            </ul>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 mt-4">
          <div className="rounded-lg p-4" style={{ background: "var(--bg-surface)" }}>
            <h3 className="font-semibold mb-2" style={{ color: "var(--accent-cyan)" }}>How engineers use it</h3>
            <p className="text-sm leading-7" style={{ color: "var(--text-secondary)" }}>
              Engineers use PMP to choose the best burn schedule, thrust direction, coast periods, and final braking strategy. Instead of guessing, the spacecraft predicts the future consequences of each action and selects the one with the lowest total mission cost.
            </p>
          </div>
          <div className="rounded-lg p-4" style={{ background: "var(--bg-surface)" }}>
            <h3 className="font-semibold mb-2" style={{ color: "var(--accent-cyan)" }}>Real aerospace applications</h3>
            <ul className="space-y-2 text-sm" style={{ color: "var(--text-secondary)" }}>
              <li>• Launch vehicle pitch programs and gravity turns</li>
              <li>• LEO-to-GEO orbit transfers and interplanetary injection</li>
              <li>• Mars landing and lunar powered descent</li>
              <li>• Satellite formation flying and autonomous docking</li>
              <li>• Deep-space low-thrust optimization and gravity assists</li>
            </ul>
          </div>
        </div>

        <div className="rounded-lg p-4 mt-4" style={{ background: "rgba(0,217,255,0.08)", border: "1px solid rgba(0,217,255,0.25)" }}>
          <p className="text-sm leading-7" style={{ color: "var(--text-secondary)" }}>
            Why it matters: without optimal control, spacecraft waste propellant, miss targets, and need more launch mass. PMP makes the engine commands mathematically optimal instead of approximate.
          </p>
        </div>
      </section>

      <div className="grid gap-6">
        {sections.map((section) => (
          <section key={section.title} className="rounded-xl border-2 p-6" style={{ background: "var(--bg-card)", borderColor: "var(--accent-cyan)" }}>
            <h2 className="text-xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>{section.title}</h2>
            <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>{section.subtitle}</p>
            <div className="rounded-lg p-4 font-mono text-sm space-y-2" style={{ background: "var(--bg-surface)" }}>
              <p className="font-semibold text-[var(--accent-cyan)]">{section.formulaTitle}</p>
              {section.formulas.map((formula) => (
                <p key={formula} className="whitespace-pre-wrap leading-7">{formula}</p>
              ))}
              {section.notes ? (
                <div className="pt-2 text-xs space-y-1" style={{ color: "var(--text-secondary)" }}>
                  {section.notes.map((note) => (
                    <p key={note}>• {note}</p>
                  ))}
                </div>
              ) : null}
            </div>
          </section>
        ))}
      </div>

      <div className="flex flex-wrap gap-3">
        <Link href="/research/space-agi-lab">
          <a className="px-4 py-2 rounded-lg font-medium" style={{ background: "var(--accent-cyan)", color: "#0f172a" }}>← Space-AGI Engineering Lab</a>
        </Link>
        <Link href="/research/space-agi-explanation">
          <a className="px-4 py-2 rounded-lg font-medium" style={{ background: "var(--accent-gold)", color: "#0f172a" }}>Easy Version →</a>
        </Link>
        <Link href="/calculators">
          <a className="px-4 py-2 rounded-lg font-medium border-2" style={{ borderColor: "var(--accent-cyan)", color: "var(--text-primary)" }}>Interactive Calculators</a>
        </Link>
        <Link href="/research/space-agi-doctrine">
          <a className="px-4 py-2 rounded-lg font-medium border-2" style={{ borderColor: "var(--accent-cyan)", color: "var(--text-primary)" }}>Space-AGI Doctrine</a>
        </Link>
      </div>
    </div>
  );
}
