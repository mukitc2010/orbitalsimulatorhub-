import { Link } from "wouter";

const CATEGORIES = [
  {
    title: "NASA & space",
    desc: "Missions, astronauts, ISS, rovers, Moon, solar system. Real mission data and calculations for researchers.",
    links: [
      { href: "/learn/aerospace#nasa", label: "NASA reference", summary: "Apollo, ISS, Mars rovers, James Webb, GPS, GEO — structured facts." },
      { href: "/learn/aerospace#rovers", label: "Rovers & real mission data", summary: "ISS, Curiosity, Perseverance, Apollo: real numbers, masses, orbits, EDL." },
      { href: "/play#nasa", label: "Learn NASA (Play & Learn)", summary: "Solar system, missions, astronauts, rovers, Moon, stars." },
    ],
  },
  {
    title: "Newton's laws & physics",
    desc: "The three laws of motion and the law of gravity — the same physics NASA uses for rockets and orbits.",
    links: [
      { href: "/learn/newton", label: "Newton's laws", summary: "1st (inertia), 2nd (F=ma), 3rd (action-reaction) with orbital examples." },
      { href: "/learn/formulas", label: "Formulas playground", summary: "F=ma, gravity F=GMm/r², orbital speed v=√(μ/r), calculators and quiz." },
      { href: "/learn/aerospace#newton", label: "Newton in aerospace", summary: "Full law statements and how NASA uses them in spaceflight." },
    ],
  },
  {
    title: "Orbital mechanics & aerospace",
    desc: "Why satellites orbit, LEO/MEO/GEO, Kepler's laws, algorithms, height, period, speed, perigee, apogee.",
    links: [
      { href: "/learn/orbital-mechanics", label: "What is orbital mechanics?", summary: "Kids, beginner, and engineer versions. How satellites orbit Earth." },
      { href: "/learn/space-questions", label: "Why don't satellites fall? & more", summary: "Why moon doesn't crash, why astronauts float, what if satellite stops." },
      { href: "/satellites", label: "Real satellite orbits", summary: "ISS, Starlink, GPS, weather satellites — altitude, speed, orbit time." },
      { href: "/simulator", label: "3D Simulator", summary: "Add LEO/MEO/GEO, see height, period, speed, perigee, apogee; compare orbits." },
      { href: "/learn/aerospace#algorithms", label: "Algorithms used on this site", summary: "Two-body, Keplerian↔Cartesian, propagation; same types as NASA mission design." },
      { href: "/learn/aerospace#calculations", label: "Real-life calculations", summary: "Worked examples: ISS period & speed, GPS, GEO altitude, rover weight on Mars." },
      { href: "/guide", label: "Simulator guide", summary: "What an orbit is, what the numbers mean, how to use the simulator." },
      { href: "/learn/aerospace#orbits", label: "Orbital mechanics reference", summary: "LEO, MEO, GEO definitions; Kepler; key equations." },
    ],
  },
  {
    title: "Formulas & math",
    desc: "Gravity, force, orbital period, orbital speed, escape velocity, Kepler, rocket equation — with explanations and calculators.",
    links: [
      { href: "/formulas-library", label: "Space formula library", summary: "All formulas: Newton gravity, orbital v, escape v, period, Kepler, rocket equation + calculators." },
      { href: "/calculators", label: "Orbit & gravity calculators", summary: "Satellite orbit calculator, gravity calculator, escape velocity calculator." },
      { href: "/learn/aerospace#formulas", label: "Key formulas (reference)", summary: "F=ma, F=GMm/r², T=2π√(a³/μ), v=√(μ/r) with constants." },
      { href: "/learn/formulas", label: "Formulas playground & quiz", summary: "Big formulas, F=ma calculator, quick reference, quiz, fun facts." },
      { href: "/play#math", label: "Space math", summary: "Orbital and gravity problems with step-by-step explanations." },
    ],
  },
  {
    title: "Ask & explore",
    desc: "Get answers and explore further.",
    links: [
      { href: "/astrobot", label: "Ask AstroBot", summary: "Ask questions about orbits, NASA, ISS, satellites; get explained answers." },
      { href: "/play", label: "Play & Learn", summary: "Simulator, NASA, math, science, physics, chemistry in one page." },
    ],
  },
];

export function ResearchHub() {
  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div className="text-center mb-8">
        <h1 className="headline">Research & topics</h1>
        <p className="subhead max-w-2xl mx-auto">
          Find everything on this site: NASA, Newton&apos;s laws, orbital mechanics, algorithms, rovers, and real calculations. For students, scientists, PhD researchers, and aerospace study.
        </p>
        <p className="text-sm text-slate-600 mt-2">
          Researching <strong>NASA</strong> or <strong>Newton&apos;s laws</strong>? Doing <strong>PhD or graduate-level</strong> work? Need <strong>algorithms</strong>, <strong>real mission data</strong>, or <strong>curated references</strong>? Use the links below.
        </p>
      </div>

      <section className="rounded-xl bg-slate-800 text-white p-4 mb-6 border-2 border-slate-700">
        <h2 className="font-bold mb-2">🎓 For PhD researchers &amp; advanced aerospace study</h2>
        <p className="text-sm text-slate-200 mb-3">
          Curated resources so you have <strong>enough depth for thesis and publication work</strong>: CODATA/IAU standards, textbooks (Vallado, Bate, Curtis, Battin), NASA NTRS technical reports, JPL Horizons &amp; SPICE, and topics beyond this site (perturbations, coordinate frames, numerical integration, GNC).
        </p>
        <Link href="/learn/aerospace#phd">
          <a className="inline-block px-5 py-2.5 rounded-xl font-bold bg-[var(--accent-cyan)] text-[#0f172a] hover:opacity-90">
            PhD &amp; advanced resources →
          </a>
        </Link>
      </section>

      <section className="rounded-xl bg-[var(--accent-gold)]/15 border-2 border-[var(--accent-gold)]/50 p-4 mb-6">
        <h2 className="font-bold text-slate-800 mb-2">🔬 For scientists &amp; researchers</h2>
        <p className="text-sm text-slate-700 mb-3">
          One reference page with <strong>real NASA project data</strong>, the <strong>math and algorithm types</strong> we use, and <strong>real-life calculations</strong> (ISS, GPS, GEO, rovers). All numbers and formulas are consistent with NASA and standard astrodynamics.
        </p>
        <Link href="/learn/aerospace">
          <a className="inline-block px-5 py-2.5 rounded-xl font-bold bg-[var(--accent-gold)]/80 text-[#0f172a] hover:opacity-90 mb-2">
            Aerospace &amp; NASA reference →
          </a>
        </Link>
        <p className="text-xs text-slate-600">
          Direct links: <Link href="/learn/aerospace#nasa"><a className="text-[var(--accent-cyan)] hover:underline">NASA</a></Link> · <Link href="/learn/aerospace#rovers"><a className="text-[var(--accent-cyan)] hover:underline">Rovers &amp; mission data</a></Link> · <Link href="/learn/aerospace#algorithms"><a className="text-[var(--accent-cyan)] hover:underline">Algorithms</a></Link> · <Link href="/learn/aerospace#formulas"><a className="text-[var(--accent-cyan)] hover:underline">Formulas</a></Link> · <Link href="/learn/aerospace#calculations"><a className="text-[var(--accent-cyan)] hover:underline">Real-life calculations</a></Link> · <Link href="/learn/aerospace#phd"><a className="text-[var(--accent-cyan)] hover:underline">PhD resources</a></Link>
        </p>
      </section>

      <section className="rounded-xl bg-white border-2 border-slate-200 p-4 mb-6">
        <h2 className="font-bold text-slate-800 mb-2">🛰 Learning hub &amp; tools</h2>
        <p className="text-sm text-slate-600 mb-3">Orbital mechanics lessons, real satellite data, space formulas, and calculators.</p>
        <div className="flex flex-wrap gap-2">
          <Link href="/learn/orbital-mechanics"><a className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 font-medium text-sm hover:bg-[var(--accent-cyan)]/20">What is orbital mechanics?</a></Link>
          <Link href="/learn/space-questions"><a className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 font-medium text-sm hover:bg-[var(--accent-cyan)]/20">Why don&apos;t satellites fall?</a></Link>
          <Link href="/formulas-library"><a className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 font-medium text-sm hover:bg-[var(--accent-cyan)]/20">Formula library</a></Link>
          <Link href="/satellites"><a className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 font-medium text-sm hover:bg-[var(--accent-cyan)]/20">Real satellite orbits</a></Link>
          <Link href="/calculators"><a className="px-3 py-1.5 rounded-lg bg-slate-100 text-slate-800 font-medium text-sm hover:bg-[var(--accent-cyan)]/20">Calculators</a></Link>
        </div>
      </section>

      <section className="rounded-xl bg-[var(--accent-cyan)]/10 border-2 border-[var(--accent-cyan)]/40 p-4 mb-6">
        <h2 className="font-bold text-slate-800 mb-2">📚 Full reference (all sections)</h2>
        <p className="text-sm text-slate-700 mb-3">
          The same page also covers Newton&apos;s laws, orbital mechanics (LEO/MEO/GEO, Kepler), and further reading with NASA and Vallado references.
        </p>
        <Link href="/learn/aerospace">
          <a className="inline-block px-5 py-2.5 rounded-xl font-bold bg-[var(--accent-cyan)] text-[#0f172a] hover:opacity-90">
            Open Aerospace reference →
          </a>
        </Link>
      </section>

      <div className="space-y-8">
        {CATEGORIES.map((cat) => (
          <section key={cat.title} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <h2 className="text-lg font-bold text-slate-800 mb-1">{cat.title}</h2>
            <p className="text-sm text-slate-600 mb-4">{cat.desc}</p>
            <ul className="space-y-3">
              {cat.links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href}>
                    <a className="block p-3 rounded-lg border border-slate-200 hover:border-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)]/5 transition">
                      <span className="font-medium text-slate-900">{link.label}</span>
                      <p className="text-xs text-slate-500 mt-0.5">{link.summary}</p>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <p className="text-center text-slate-500 text-sm">
        New here? Start with the <Link href="/guide" className="text-[var(--accent-cyan)] hover:underline">Guide</Link> or the <Link href="/simulator" className="text-[var(--accent-cyan)] hover:underline">Simulator</Link>.
      </p>
    </div>
  );
}
