import { Link } from "wouter";

/**
 * Authority page: Future of Space Civilization
 * Positions site as world authority on humanity's space future.
 */
export function FutureSpaceCivilization() {
  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div>
        <p className="text-sm text-[var(--accent-cyan)] font-medium uppercase tracking-wider mb-2">Global Space Research Hub</p>
        <h1 className="headline">Future of Space Civilization</h1>
        <p className="text-xl font-bold text-slate-700 mt-2">From Earth Orbit to Interstellar — Humanity&apos;s Next Chapter</p>
      </div>

      <section className="rounded-xl border-2 border-[var(--accent-cyan)]/50 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Vision</h2>
        <p className="text-slate-700 leading-relaxed">
          Humanity is transitioning from a single-planet species to a spacefaring civilization. According to publicly available space agency research and mission data, the next 50–100 years will see sustained lunar presence, Mars exploration, and the first steps toward interstellar capability.
        </p>
        <p className="text-slate-700 leading-relaxed mt-3">
          This page synthesizes publicly available information from space agencies, academic research, and mission planning to outline the trajectory of space civilization.
        </p>
      </section>

      <section className="rounded-xl border-2 border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Phases of Space Civilization</h2>
        <div className="space-y-4">
          <div>
            <h3 className="font-bold text-slate-800">Phase 1: Low Earth Orbit (Now)</h3>
            <p className="text-slate-600 text-sm">ISS, commercial crew, Starlink, Earth observation. The foundation of space infrastructure.</p>
          </div>
          <div>
            <h3 className="font-bold text-slate-800">Phase 2: Lunar Presence (2025–2035)</h3>
            <p className="text-slate-600 text-sm">Artemis, Gateway, lunar bases. Learning to live and work beyond Earth.</p>
          </div>
          <div>
            <h3 className="font-bold text-slate-800">Phase 3: Mars (2030s–2040s)</h3>
            <p className="text-slate-600 text-sm">Crewed Mars missions, sample return, eventual outposts. The first interplanetary civilization.</p>
          </div>
          <div>
            <h3 className="font-bold text-slate-800">Phase 4: Solar System (2040s+)</h3>
            <p className="text-slate-600 text-sm">Asteroid mining, outer moons, space habitats. Economic and scientific expansion.</p>
          </div>
          <div>
            <h3 className="font-bold text-slate-800">Phase 5: Interstellar (22nd century+)</h3>
            <p className="text-slate-600 text-sm">Probes to nearby stars, theoretical propulsion, autonomous AI explorers. The ultimate frontier.</p>
          </div>
        </div>
      </section>

      <section className="rounded-xl border-2 border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Key Enablers</h2>
        <ul className="list-disc pl-6 space-y-2 text-slate-700">
          <li><strong>Autonomous AI</strong> — Spacecraft that think and act without Earth control. See <Link href="/research/neuro-space"><a className="text-[var(--accent-cyan)] hover:underline">Neuro-Space Research</a></Link>.</li>
          <li><strong>Quantum technology</strong> — Atomic clocks, sensors, communication. <Link href="/learn/quantum-space"><a className="text-[var(--accent-cyan)] hover:underline">Quantum &amp; Space</a></Link>.</li>
          <li><strong>Propulsion</strong> — Chemical, electric, nuclear, and future concepts.</li>
          <li><strong>In-situ resources</strong> — Water ice, regolith, manufacturing.</li>
          <li><strong>Orbital mechanics</strong> — The physics that makes it all possible. <Link href="/simulator"><a className="text-[var(--accent-cyan)] hover:underline">Try the simulator</a></Link>.</li>
        </ul>
      </section>

      <section className="rounded-xl border-2 border-[var(--accent-gold)]/50 bg-amber-50/30 p-6">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Explore Further</h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/research"><a className="px-4 py-2 rounded-lg bg-[var(--accent-cyan)]/20 text-slate-800 font-medium hover:bg-[var(--accent-cyan)]/30">Research Hub</a></Link>
          <Link href="/research/neuro-space"><a className="px-4 py-2 rounded-lg bg-[var(--accent-cyan)]/20 text-slate-800 font-medium hover:bg-[var(--accent-cyan)]/30">Neuro-Space Doctrine</a></Link>
          <Link href="/missions/timeline"><a className="px-4 py-2 rounded-lg bg-[var(--accent-cyan)]/20 text-slate-800 font-medium hover:bg-[var(--accent-cyan)]/30">Mission Timeline</a></Link>
          <Link href="/astrobot"><a className="px-4 py-2 rounded-lg bg-[var(--accent-cyan)]/20 text-slate-800 font-medium hover:bg-[var(--accent-cyan)]/30">Ask AstroBot</a></Link>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
        <p><strong>References:</strong> NASA Official Website (nasa.gov), ESA (esa.int), published mission data, public aerospace research.</p>
        <p className="mt-2"><strong>Disclaimer:</strong> This research references publicly available information from global space agencies for educational and scientific discussion only. Orbital Simulator Hub is an independent publication and is not affiliated with any government space agency.</p>
      </section>
    </div>
  );
}
