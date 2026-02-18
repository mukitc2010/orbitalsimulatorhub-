import { Link } from "wouter";

export function NASAStudyGuide() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="headline">NASA Study Guide – Learn Space &amp; Missions</h1>
        <p className="subhead">
          A clear study guide to NASA missions, orbital mechanics, and space science. For students, teachers, and anyone preparing for space-related exams or curiosity.
        </p>
      </div>

      <div className="rounded-xl bg-slate-50 border border-slate-200 p-6 space-y-4">
        <h2 className="text-xl font-bold text-slate-800">What is NASA?</h2>
        <p className="text-slate-700">
          The National Aeronautics and Space Administration (NASA) is the U.S. agency for civil space exploration, science, and aeronautics. NASA runs crewed missions (e.g. Artemis, ISS), robotic missions (Mars rovers, telescopes), and Earth science. Understanding NASA means understanding orbital mechanics, rockets, and mission design.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Key topics to study</h2>
        <ul className="space-y-2 text-slate-700">
          <li><Link href="/learn/orbital-mechanics"><a className="text-[var(--accent-cyan)] hover:underline font-medium">Orbital mechanics</a></Link> — How satellites and spacecraft move; Kepler, Newton, orbits (LEO, MEO, GEO).</li>
          <li><Link href="/missions/timeline"><a className="text-[var(--accent-cyan)] hover:underline font-medium">Mission timeline</a></Link> — From Sputnik to Artemis; Apollo, Shuttle, ISS, Mars rovers, James Webb.</li>
          <li><Link href="/learn/how-nasa-launches-satellite"><a className="text-[var(--accent-cyan)] hover:underline font-medium">How NASA launches</a></Link> — Rockets, stages, orbital insertion, SLS, Orion.</li>
          <li><Link href="/learn/how-iss-works"><a className="text-[var(--accent-cyan)] hover:underline font-medium">International Space Station</a></Link> — Orbit, life support, science, crew vehicles.</li>
          <li><Link href="/learn/how-mars-rovers-work"><a className="text-[var(--accent-cyan)] hover:underline font-medium">Mars rovers</a></Link> — Curiosity, Perseverance, landing, navigation, instruments.</li>
          <li><Link href="/learn/how-gps-works"><a className="text-[var(--accent-cyan)] hover:underline font-medium">GPS &amp; navigation</a></Link> — Atomic clocks, trilateration, satellite constellations.</li>
          <li><Link href="/ai-in-aerospace"><a className="text-[var(--accent-cyan)] hover:underline font-medium">AI in aerospace</a></Link> — Autonomous rovers, mission planning, satellite operations.</li>
        </ul>
      </div>

      <div className="rounded-xl border-2 border-[var(--accent-cyan)] bg-[var(--accent-cyan)]/5 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-2">Practice &amp; tools</h2>
        <p className="text-slate-700 mb-4">Use our <Link href="/simulator"><a className="text-[var(--accent-cyan)] hover:underline font-medium">3D orbit simulator</a></Link>, <Link href="/formulas-library"><a className="text-[var(--accent-cyan)] hover:underline font-medium">formulas library</a></Link>, and <Link href="/quiz/orbital-mechanics"><a className="text-[var(--accent-cyan)] hover:underline font-medium">orbital mechanics quiz</a></Link> to test your knowledge. Ask <Link href="/astrobot"><a className="text-[var(--accent-cyan)] hover:underline font-medium">AstroBot</a></Link> for quick answers.
        </p>
        <Link href="/blog">
          <a className="inline-block px-4 py-2 rounded-lg bg-[var(--accent-cyan)] text-[#0f172a] font-semibold hover:opacity-90">Read space blog →</a>
        </Link>
      </div>
    </div>
  );
}
