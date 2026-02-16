import { Link } from "wouter";
import { APP_NAME } from "../const";
import { DailyTopicIcon } from "../components/DailyTopicIcon";

const FEATURES = [
  { href: "/play#simulator", icon: "🛸", title: "3D Simulator", desc: "Add LEO, MEO, GEO satellites and watch orbits in real time.", cyan: true },
  { href: "/play#nasa", icon: "🌟", title: "Learn NASA", desc: "Missions, astronauts, rovers, Moon, solar system.", pink: true },
  { href: "/astrobot", icon: "🤖", title: "Ask AstroBot", desc: "Get answers about orbits, satellites, ISS, and space.", gold: true },
];

const CARDS = [
  { href: "/simulator", icon: "🛸", title: "Orbit simulator", desc: "3D satellite orbit simulator — LEO, MEO, GEO. See height, speed, period.", cyan: true },
  { href: "/blog", icon: "📰", title: "Space Blog", desc: "Daily NASA news, space facts, satellite tutorials, astronomy lessons. Fresh content daily.", pink: true },
  { href: "/formulas-library", icon: "🧮", title: "Space formulas", desc: "Gravity, orbital velocity, escape velocity, Kepler, rocket equation + calculators.", gold: true },
  { href: "/satellites", icon: "🛰", title: "Real satellite orbits", desc: "ISS, Starlink, GPS, weather satellites — altitude, speed, orbit time.", cyan: true },
  { href: "/calculators", icon: "🔢", title: "Orbit calculator", desc: "NASA-style orbit calculator, gravity calculator, escape velocity.", pink: true },
  { href: "/learn/orbital-mechanics", icon: "🌌", title: "What is orbital mechanics?", desc: "Kids, beginner, and engineer versions. Learn how satellites orbit Earth.", cyan: true },
  { href: "/learn/space-questions", icon: "❓", title: "Why don't satellites fall?", desc: "Simple answers: moon, astronauts float, what if satellite stops.", pink: true },
  { href: "/learn/experiments", icon: "🔬", title: "Space Experiments", desc: "5 hands-on DIY experiments to understand orbital mechanics and space physics!", gold: true },
  { href: "/learn/how-gps-works", icon: "📍", title: "How GPS Works", desc: "Learn how GPS satellites help you navigate. Trilateration, atomic clocks, constellation.", cyan: true },
  { href: "/compare/orbits", icon: "📊", title: "Compare Orbits", desc: "Side-by-side comparison: LEO vs MEO vs GEO. See differences in altitude, speed, period.", pink: true },
  { href: "/learn/how-nasa-launches-satellite", icon: "🚀", title: "How NASA Launches", desc: "Step-by-step guide: rocket stages, launch sequence, orbital insertion, real examples.", gold: true },
  { href: "/learn/how-spacex-lands-rockets", icon: "🛬", title: "How SpaceX Lands", desc: "Revolutionary reusable rockets. Grid fins, landing sequence, boost-back burn explained.", cyan: true },
  { href: "/learn/how-mars-rovers-work", icon: "🤖", title: "How Mars Rovers Work", desc: "Landing sequence, navigation systems, science instruments, communication with Earth.", pink: true },
  { href: "/learn/how-starlink-works", icon: "🌐", title: "How Starlink Works", desc: "Global internet from space. Satellite constellation, LEO benefits, ground stations.", gold: true },
  { href: "/learn/how-iss-works", icon: "🏠", title: "How ISS Works", desc: "International Space Station: orbit, life support, power, science, assembly in space.", cyan: true },
  { href: "/missions/timeline", icon: "📅", title: "Mission Timeline", desc: "History of space exploration from Sputnik to James Webb. Key missions and achievements.", pink: true },
  { href: "/quiz/orbital-mechanics", icon: "📝", title: "Orbital Mechanics Quiz", desc: "Test your knowledge! 15 questions on orbits, satellites, and space physics.", gold: true },
  { href: "/learn/how-solar-system-works", icon: "🌍", title: "How Solar System Works", desc: "Kepler's laws, orbital mechanics, Hohmann transfers, gravity assists. Math behind planetary motion.", cyan: true },
  { href: "/learn/what-is-moon", icon: "🌙", title: "What is the Moon?", desc: "Scientific facts: formation, composition, orbit, phases, tides. NASA missions and research.", pink: true },
  { href: "/learn/astrophysics", icon: "⭐", title: "Astrophysics", desc: "Stars, black holes, dark matter, cosmology, exoplanets. Math and physics of the universe.", gold: true },
  { href: "/learn/quantum-physics", icon: "⚛️", title: "Quantum Physics", desc: "Wave-particle duality, uncertainty principle, Schrödinger equation, quantum computing basics.", cyan: true },
  { href: "/learn/quantum-physics-nasa", icon: "🔬", title: "Quantum Physics in NASA", desc: "How NASA uses quantum physics: atomic clocks, quantum sensors, quantum communication, future tech.", pink: true },
  { href: "/astrobot", icon: "🤖", title: "Ask AstroBot", desc: "Ask anything about space, orbits, NASA, rockets.", cyan: true },
  { href: "/research", icon: "📚", title: "Research & PhD", desc: "NASA, Newton, algorithms, real data — for students and researchers.", pink: true },
];

function FeatureCard({ href, icon, title, desc, cyan, pink, gold }: {
  href: string; icon: string; title: string; desc: string; cyan?: boolean; pink?: boolean; gold?: boolean;
}) {
  const border = gold ? "border-[var(--accent-gold)]" : cyan ? "border-[var(--accent-cyan)]" : "border-[var(--accent-pink)]";
  const bg = gold ? "bg-[var(--accent-gold)]/10" : cyan ? "bg-[var(--accent-cyan)]/10" : "bg-[var(--accent-pink)]/10";
  const cardClass = gold ? "card-blueprint-gold" : cyan ? "card-blueprint" : "card-blueprint-pink";
  return (
    <Link href={href}>
      <a className={`block p-6 rounded-xl ${cardClass}`}>
        <div className={`card-icon-float inline-flex w-12 h-12 rounded-xl items-center justify-center text-2xl mb-3 ${bg} ${border} border transition-transform`}>
          {icon}
        </div>
        <h2 className="font-bold text-xl mb-1.5 text-[#0f172a]">{title}</h2>
        <p className="subhead text-sm">{desc}</p>
      </a>
    </Link>
  );
}

export function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero with gradient */}
      <section className="hero-gradient rounded-2xl px-6 py-10 sm:py-12 text-center mb-10">
        <h1 className="headline mb-3 text-white">{APP_NAME}</h1>
        <p className="subhead max-w-xl mx-auto mb-2 text-slate-300">
          Launch into learning — real orbits, real physics, real NASA.
        </p>
        <p className="text-sm text-slate-400 max-w-lg mx-auto mb-6">
          Run a 3D satellite simulator, crack the formulas behind gravity &amp; motion, and ask anything about space.
        </p>
        <Link href="/play">
          <a className="hero-cta inline-block px-8 py-4 rounded-xl font-black text-lg bg-[var(--accent-cyan)] text-[#0f172a] shadow-lg hover:opacity-95 hover:scale-[1.03] transition mb-6">
            🚀 Start Learning →
          </a>
        </Link>
        <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">
          Simulate · Learn NASA · Ask AstroBot
        </p>
      </section>

      {/* Daily Featured Topic */}
      <section className="mb-8">
        <DailyTopicIcon />
      </section>

      <section className="rounded-xl bg-white border border-slate-200 p-4 mb-8 text-sm text-slate-700">
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">What this site teaches</h2>
        <p className="text-xs text-[var(--accent-cyan)] font-medium mb-2">✨ Same physics NASA uses — no magic, just math and gravity.</p>
        <p className="mb-2">
          <strong>Orbits &amp; satellites:</strong> Why satellites stay in orbit (LEO, MEO, GEO), how height and speed relate, and what the numbers mean.
        </p>
        <p className="mb-2">
          <strong>Newton &amp; gravity:</strong> The three laws of motion and the law of gravity — the same physics NASA uses for rockets and orbits.
        </p>
        <p className="mb-3">
          <strong>NASA &amp; space:</strong> Missions, astronauts, the ISS, and how to explore further with the simulator and AstroBot.
        </p>
        <p className="rounded-lg bg-[var(--accent-cyan)]/10 border border-[var(--accent-cyan)]/30 px-3 py-2 text-slate-800">
          <strong>For students, scientists &amp; PhD researchers:</strong> Real NASA data, math and algorithms, and real-life calculations. <Link href="/learn/aerospace#phd"><a className="text-[var(--accent-cyan)] font-medium hover:underline">PhD &amp; advanced resources</a></Link> (textbooks, NTRS, SPICE, Horizons). <Link href="/research"><a className="text-[var(--accent-cyan)] font-medium hover:underline">Research &amp; topics</a></Link> · <Link href="/learn/aerospace"><a className="text-[var(--accent-cyan)] font-medium hover:underline">Aerospace reference</a></Link>.
        </p>
      </section>

      {/* What you get — 3 steps */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        {FEATURES.map((f, i) => (
          <Link key={f.href} href={f.href}>
            <a className={`block p-4 rounded-xl border-2 border-slate-200 bg-white hover:border-[var(--accent-cyan)] hover:shadow-md transition text-center opacity-0 animate-fade-in-up ${i === 0 ? "animate-delay-1" : i === 1 ? "animate-delay-2" : "animate-delay-3"}`} >
              <span className="text-2xl block mb-2">{f.icon}</span>
              <span className="font-bold text-slate-800">{f.title}</span>
              <p className="text-xs text-slate-500 mt-1">{f.desc}</p>
            </a>
          </Link>
        ))}
      </div>

      {/* Section label */}
      <h2 className="text-lg font-bold text-slate-700 mb-1 text-center sm:text-left">Explore by topic</h2>
      <p className="text-sm text-slate-500 mb-4 text-center sm:text-left">Pick your path — each card takes you somewhere interesting.</p>
      <div className="grid gap-4 sm:grid-cols-2 text-left">
        {CARDS.map((c) => (
          <FeatureCard key={c.href} href={c.href} icon={c.icon} title={c.title} desc={c.desc} cyan={c.cyan} pink={c.pink} gold={c.gold} />
        ))}
      </div>

      {/* Quick links */}
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link href="/blog">
          <a className="px-4 py-2 rounded-full text-sm font-medium bg-slate-100 text-slate-700 hover:bg-[var(--accent-cyan)]/20 hover:text-[#0f172a] transition">
            📰 Space Blog
          </a>
        </Link>
        <Link href="/research">
          <a className="px-4 py-2 rounded-full text-sm font-medium bg-slate-100 text-slate-700 hover:bg-[var(--accent-cyan)]/20 hover:text-[#0f172a] transition">
            Research &amp; topics
          </a>
        </Link>
        <Link href="/guide">
          <a className="px-4 py-2 rounded-full text-sm font-medium bg-slate-100 text-slate-700 hover:bg-[var(--accent-cyan)]/20 hover:text-[#0f172a] transition">
            Read the Guide
          </a>
        </Link>
        <Link href="/astrobot">
          <a className="px-4 py-2 rounded-full text-sm font-medium bg-slate-100 text-slate-700 hover:bg-[var(--accent-cyan)]/20 hover:text-[#0f172a] transition">
            Ask AstroBot
          </a>
        </Link>
        <Link href="/simulator">
          <a className="px-4 py-2 rounded-full text-sm font-medium bg-slate-100 text-slate-700 hover:bg-[var(--accent-cyan)]/20 hover:text-[#0f172a] transition">
            Open Simulator
          </a>
        </Link>
        <Link href="/learn/experiments">
          <a className="px-4 py-2 rounded-full text-sm font-medium bg-slate-100 text-slate-700 hover:bg-[var(--accent-cyan)]/20 hover:text-[#0f172a] transition">
            🔬 Experiments
          </a>
        </Link>
        <Link href="/quiz/orbital-mechanics">
          <a className="px-4 py-2 rounded-full text-sm font-medium bg-slate-100 text-slate-700 hover:bg-[var(--accent-cyan)]/20 hover:text-[#0f172a] transition">
            📝 Quiz
          </a>
        </Link>
      </div>
    </div>
  );
}
