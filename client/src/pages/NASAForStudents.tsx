import { Link } from "wouter";

export function NASAForStudents() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="headline">NASA for Students – Resources &amp; Learning</h1>
        <p className="subhead">
          Free resources for students: NASA missions, orbital mechanics, space physics, internships, and career paths. From high school to PhD.
        </p>
      </div>

      <div className="rounded-xl bg-slate-50 border border-slate-200 p-6 space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Why study NASA &amp; space?</h2>
        <p className="text-slate-700">
          NASA missions rely on orbital mechanics, aerospace engineering, AI, and data science. Learning these topics helps you understand real missions (Artemis, Mars rovers, James Webb) and prepares you for internships, research, and careers in space.
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Study topics</h2>
        <ul className="space-y-2 text-slate-700">
          <li><Link href="/learn/orbital-mechanics" className="text-[var(--accent-cyan)] hover:underline font-medium">Orbital mechanics</Link> — How satellites and spacecraft move; essential for mission design.</li>
          <li><Link href="/learn/nasa-study-guide" className="text-[var(--accent-cyan)] hover:underline font-medium">NASA study guide</Link> — Missions, timeline, key concepts.</li>
          <li><Link href="/learn/how-satellites-work" className="text-[var(--accent-cyan)] hover:underline font-medium">How satellites work</Link> — LEO, MEO, GEO; GPS, ISS, Starlink.</li>
          <li><Link href="/ai-in-aerospace" className="text-[var(--accent-cyan)] hover:underline font-medium">AI in aerospace</Link> — How NASA uses AI for rovers, navigation, and science.</li>
          <li><Link href="/learn/quantum-space" className="text-[var(--accent-cyan)] hover:underline font-medium">Quantum physics &amp; space</Link> — Atomic clocks, sensors, future tech.</li>
          <li><Link href="/research" className="text-[var(--accent-cyan)] hover:underline font-medium">Research hub</Link> — References, algorithms, real data for advanced students.</li>
        </ul>
      </div>

      <div className="rounded-xl border-2 border-[var(--accent-gold)] bg-[var(--accent-gold)]/10 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-2">Careers &amp; internships</h2>
        <p className="text-slate-700 mb-4">NASA offers internships and pathways for students. Learn what it takes: <Link href="/careers" className="text-[var(--accent-cyan)] hover:underline font-medium">Space careers →</Link>. Use our <Link href="/simulator" className="text-[var(--accent-cyan)] hover:underline">simulator</Link>, <Link href="/formulas-library" className="text-[var(--accent-cyan)] hover:underline">formulas</Link>, and <Link href="/astrobot" className="text-[var(--accent-cyan)] hover:underline">AstroBot</Link> to build your skills.
        </p>
      </div>
    </div>
  );
}
