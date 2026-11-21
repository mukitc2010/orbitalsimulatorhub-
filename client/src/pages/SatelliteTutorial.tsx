import { Link } from "wouter";

/**
 * Satellite tutorial hub — targets "satellite tutorial" keyword.
 * One page per topic; links to all satellite-related learn pages.
 */
export function SatelliteTutorial() {
  const tutorials = [
    { href: "/learn/how-satellites-work", title: "How satellites work", desc: "Why they don't fall, LEO vs MEO vs GEO, types of orbits." },
    { href: "/learn/how-gps-works", title: "How GPS works", desc: "Trilateration, atomic clocks, navigation satellites." },
    { href: "/learn/how-iss-works", title: "How the ISS works", desc: "International Space Station: orbit, life support, science." },
    { href: "/learn/how-starlink-works", title: "How Starlink works", desc: "Satellite internet, LEO constellation, ground stations." },
    { href: "/learn/how-nasa-launches-satellite", title: "How NASA launches satellites", desc: "Rockets, stages, orbital insertion." },
    { href: "/learn/orbital-mechanics", title: "Orbital mechanics", desc: "Gravity, velocity, Kepler's laws — how orbits work." },
    { href: "/compare/orbits", title: "Compare orbits", desc: "LEO vs MEO vs GEO side-by-side." },
    { href: "/simulator", title: "3D satellite simulator", desc: "Add satellites and watch orbits in real time." },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="headline">Satellite Tutorial – Learn How Satellites Work</h1>
        <p className="subhead">
          Free satellite tutorials: how satellites work, GPS, ISS, Starlink, orbital mechanics, and more. Step-by-step guides for students and anyone curious about space.
        </p>
      </div>

      <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 text-slate-700">
        <p><strong>Why satellite tutorials?</strong> Satellites power GPS, weather forecasts, TV, and the internet. Understanding how they orbit and communicate helps you learn real aerospace and physics. Each tutorial links to our <Link href="/simulator" className="text-[var(--accent-cyan)] hover:underline">3D simulator</Link> and <Link href="/formulas-library" className="text-[var(--accent-cyan)] hover:underline">formulas</Link>.</p>
      </div>

      <section>
        <h2 className="text-xl font-bold text-slate-800 mb-4">All satellite tutorials</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {tutorials.map((t) => (
            <Link key={t.href} href={t.href} className="block p-5 rounded-xl border-2 border-[var(--accent-cyan)]/50 bg-white hover:border-[var(--accent-cyan)] hover:shadow-md transition">
                <h3 className="font-bold text-slate-800 mb-1">{t.title}</h3>
                <p className="text-sm text-slate-600">{t.desc}</p>
              </Link>
          ))}
        </div>
      </section>

      <div className="flex flex-wrap gap-3">
        <Link href="/blog/category/satellite-tutorials" className="px-5 py-2.5 rounded-xl bg-[var(--accent-cyan)] text-[#0f172a] font-semibold hover:opacity-90">Satellite tutorial articles →</Link>
        <Link href="/satellites" className="px-5 py-2.5 rounded-xl border-2 border-slate-300 text-slate-700 font-medium hover:bg-slate-100">Real satellite data</Link>
      </div>
    </div>
  );
}
