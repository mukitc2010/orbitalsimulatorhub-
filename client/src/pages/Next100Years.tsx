import { Link } from "wouter";

/**
 * Authority page: Next 100 Years of Humanity
 * Strategic roadmap for space exploration 2025–2125.
 */
export function Next100Years() {
  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div>
        <p className="text-sm text-[var(--accent-cyan)] font-medium uppercase tracking-wider mb-2">Strategic Roadmap</p>
        <h1 className="headline">Next 100 Years of Humanity</h1>
        <p className="text-xl font-bold text-slate-700 mt-2">A Vision for Space Exploration 2025–2125</p>
      </div>

      <section className="rounded-xl border-2 border-[var(--accent-cyan)]/50 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Overview</h2>
        <p className="text-slate-700 leading-relaxed">
          Based on publicly available space agency plans, mission timelines, and aerospace research, this roadmap outlines humanity&apos;s likely trajectory in space over the next century. It is a synthesis of published goals and technical feasibility—not a prediction, but a framework for understanding what may come.
        </p>
      </section>

      <section className="rounded-xl border-2 border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Decade by Decade</h2>
        <div className="space-y-6">
          <div className="border-l-4 border-[var(--accent-cyan)] pl-4">
            <h3 className="font-bold text-slate-800">2025–2035: Moon &amp; LEO</h3>
            <p className="text-slate-600 text-sm">Artemis crewed missions, Lunar Gateway, commercial lunar landers, ISS transition, new space stations. First woman and next man on the Moon.</p>
          </div>
          <div className="border-l-4 border-[var(--accent-pink)] pl-4">
            <h3 className="font-bold text-slate-800">2035–2045: Mars</h3>
            <p className="text-slate-600 text-sm">Crewed Mars missions, Mars sample return, initial outposts. AI and autonomous systems become critical for deep-space operations.</p>
          </div>
          <div className="border-l-4 border-[var(--accent-gold)] pl-4">
            <h3 className="font-bold text-slate-800">2045–2065: Solar System Economy</h3>
            <p className="text-slate-600 text-sm">Asteroid mining, lunar bases, Mars settlements, space manufacturing. Space becomes an economic domain.</p>
          </div>
          <div className="border-l-4 border-slate-400 pl-4">
            <h3 className="font-bold text-slate-800">2065–2100: Interplanetary</h3>
            <p className="text-slate-600 text-sm">Outer solar system missions, advanced propulsion, space habitats. Humanity is a multi-world species.</p>
          </div>
          <div className="border-l-4 border-slate-500 pl-4">
            <h3 className="font-bold text-slate-800">2100+: Interstellar</h3>
            <p className="text-slate-600 text-sm">Probes to Alpha Centauri, Breakthrough Starshot, autonomous AI explorers. The first steps beyond our solar system.</p>
          </div>
        </div>
      </section>

      <section className="rounded-xl border-2 border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Key Technologies</h2>
        <ul className="list-disc pl-6 space-y-1 text-slate-700">
          <li>Autonomous spacecraft &amp; AI (see <Link href="/ai-in-aerospace" className="text-[var(--accent-cyan)] hover:underline">AI in Aerospace</Link>)</li>
          <li>Quantum navigation &amp; communication (<Link href="/learn/quantum-space" className="text-[var(--accent-cyan)] hover:underline">Quantum Space</Link>)</li>
          <li>Nuclear propulsion</li>
          <li>In-situ resource utilization</li>
          <li>Relativistic-capable systems (<Link href="/research/neuro-space" className="text-[var(--accent-cyan)] hover:underline">Neuro-Space</Link>)</li>
        </ul>
      </section>

      <section className="rounded-xl border-2 border-[var(--accent-gold)]/50 bg-amber-50/30 p-6">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Learn the Physics</h2>
        <p className="text-slate-700 mb-4">Orbital mechanics, gravity, and propulsion are the foundation. Master them with our free resources:</p>
        <div className="flex flex-wrap gap-3">
          <Link href="/simulator" className="px-4 py-2 rounded-lg bg-[var(--accent-cyan)]/20 text-slate-800 font-medium hover:bg-[var(--accent-cyan)]/30">3D Simulator</Link>
          <Link href="/learn/orbital-mechanics" className="px-4 py-2 rounded-lg bg-[var(--accent-cyan)]/20 text-slate-800 font-medium hover:bg-[var(--accent-cyan)]/30">Orbital Mechanics</Link>
          <Link href="/formulas-library" className="px-4 py-2 rounded-lg bg-[var(--accent-cyan)]/20 text-slate-800 font-medium hover:bg-[var(--accent-cyan)]/30">Formulas</Link>
          <Link href="/astrobot" className="px-4 py-2 rounded-lg bg-[var(--accent-cyan)]/20 text-slate-800 font-medium hover:bg-[var(--accent-cyan)]/30">Ask AstroBot</Link>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
        <p><strong>References:</strong> NASA, ESA, and other space agency published plans; aerospace research; mission timelines.</p>
        <p className="mt-2"><strong>Disclaimer:</strong> This roadmap references publicly available information for educational purposes. Orbital Simulator Hub is independent and not affiliated with any government space agency.</p>
      </section>
    </div>
  );
}
