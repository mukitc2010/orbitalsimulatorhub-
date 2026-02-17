import { Link } from "wouter";

const TOPICS = [
  { id: "particles-waves", title: "Quantum particles & waves", desc: "Wave-particle duality and how it underpins modern technology." },
  { id: "tunneling", title: "Quantum tunneling", desc: "Particles passing through barriers — relevance to sensors and electronics." },
  { id: "quantum-sensors", title: "Quantum sensors for satellites", desc: "Ultra-precise gravimeters, magnetometers, and atom interferometry in space." },
  { id: "atomic-clocks", title: "Atomic clocks (GPS accuracy)", desc: "How quantum transitions define time — and why GPS needs them." },
  { id: "quantum-comms", title: "Quantum communication in space", desc: "Quantum encryption and satellite-based quantum networks." },
  { id: "quantum-computing", title: "Quantum computing for NASA", desc: "Future use of qubits for trajectory optimization and materials science." },
  { id: "radiation", title: "Space radiation & quantum effects", desc: "How radiation affects electronics and quantum systems in orbit." },
];

export function QuantumSpace() {
  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div>
        <h1 className="headline">⚛ Quantum Physics & Space Technology</h1>
        <p className="subhead">
          Quantum mechanics powers the future of navigation, communication, and space computing.
        </p>
      </div>

      <div className="rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-200 p-6">
        <h2 className="text-xl font-bold text-slate-800 mb-3">Why quantum matters in space</h2>
        <p className="text-slate-700 mb-3">
          Quantum physics explains how the universe works at the smallest level.
          Modern satellites, GPS systems, and deep-space missions rely on quantum technology for extreme precision and reliability.
        </p>
        <p className="text-slate-700 font-medium">Learn how:</p>
        <ul className="text-slate-700 mt-2 space-y-1 list-disc pl-5">
          <li>GPS uses atomic clocks</li>
          <li>Quantum sensors detect gravity</li>
          <li>Space agencies explore quantum communication</li>
          <li>Quantum computing may guide future missions</li>
        </ul>
      </div>

      <section>
        <h2 className="text-xl font-bold text-slate-800 mb-4">Topics</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {TOPICS.map((t) => (
            <div
              key={t.id}
              id={t.id}
              className="scroll-mt-6 rounded-xl border-2 border-[var(--accent-pink)]/50 bg-white p-5 shadow-sm hover:border-[var(--accent-pink)]/80 transition"
            >
              <h3 className="font-bold text-slate-800 mb-2">{t.title}</h3>
              <p className="text-sm text-slate-600">{t.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="rounded-xl bg-slate-50 border border-slate-200 p-5 text-sm text-slate-700">
        <p className="mb-2">
          <strong>Related:</strong>{" "}
          <Link href="/learn/quantum-physics"><a className="text-[var(--accent-cyan)] hover:underline">Quantum physics basics</a></Link>
          {" · "}
          <Link href="/learn/quantum-physics-nasa"><a className="text-[var(--accent-cyan)] hover:underline">Quantum physics in NASA</a></Link>
          {" · "}
          <Link href="/learn/how-gps-works"><a className="text-[var(--accent-cyan)] hover:underline">How GPS works</a></Link>
          {" · "}
          <Link href="/astrobot"><a className="text-[var(--accent-cyan)] hover:underline">Ask AstroBot</a></Link>
        </p>
      </div>
    </div>
  );
}
