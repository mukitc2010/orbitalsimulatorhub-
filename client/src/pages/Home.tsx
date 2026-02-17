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
  { href: "/learn/aerodynamics", icon: "✈", title: "Aerodynamics & Space Flight", desc: "Lift, drag, re-entry, rocket aerodynamics, heat shields, CFD. How NASA designs efficient vehicles.", cyan: true },
  { href: "/learn/quantum-space", icon: "⚛", title: "Quantum Physics & Space", desc: "Quantum sensors, atomic clocks, GPS accuracy, quantum communication and computing for NASA.", pink: true },
  { href: "/ai-in-aerospace", icon: "🤖", title: "AI in Aerospace", desc: "How AI transforms aerospace: satellite navigation, autonomous spacecraft, Mars rovers, mission planning.", gold: true },
  { href: "/astrobot", icon: "🤖", title: "Ask AstroBot", desc: "Ask anything about space, orbits, NASA, rockets.", cyan: true },
  { href: "/research", icon: "📚", title: "Research & PhD", desc: "NASA, Newton, algorithms, real data — for students and researchers.", pink: true },
  { href: "/careers", icon: "👨‍🚀", title: "Space Careers", desc: "How to become NASA engineer, astronaut, space scientist, AI space engineer.", gold: true },
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
        <p className="text-sm font-medium text-[var(--accent-cyan)] uppercase tracking-wider mb-2">🌌 Welcome to</p>
        <h1 className="headline mb-3 text-white">{APP_NAME}</h1>
        <p className="text-lg sm:text-xl font-semibold text-white/95 max-w-xl mx-auto mb-2">
          Explore Space. Learn Physics. Build the Future.
        </p>
        <p className="subhead max-w-2xl mx-auto mb-4 text-slate-300">
          Dive into real aerospace science, orbital mechanics, quantum physics, and AI-powered space technology.
          From Newton&apos;s laws to satellite simulations and deep space exploration — everything here is built for students, engineers, researchers, and future astronauts.
        </p>
        <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-slate-300 max-w-2xl mx-auto mb-6 list-none pl-0">
          <li>🔭 Learn real NASA concepts</li>
          <li>🛰 Run orbital simulations</li>
          <li>🤖 Discover AI in aerospace</li>
          <li>⚛ Explore quantum physics &amp; space science</li>
          <li>📡 Study real mission data &amp; algorithms</li>
        </ul>
        <Link href="/play">
          <a className="hero-cta inline-block px-8 py-4 rounded-xl font-black text-lg bg-[var(--accent-cyan)] text-[#0f172a] shadow-lg hover:opacity-95 hover:scale-[1.03] transition mb-2">
            🚀 Start your journey beyond Earth →
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

      {/* Homepage highlights: chatbot, news, featured mission */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
        <Link href="/astrobot">
          <a className="rounded-xl border border-slate-200 bg-white p-4 hover:border-[var(--accent-cyan)] hover:shadow-sm transition block">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">AI space chatbot</h3>
            <p className="text-sm text-slate-600 mb-2">Ask anything about space, orbits, NASA.</p>
            <span className="text-xs text-[var(--accent-cyan)] font-medium">Ask AstroBot →</span>
          </a>
        </Link>
        <Link href="/blog">
          <a className="rounded-xl border border-slate-200 bg-white p-4 hover:border-[var(--accent-cyan)] hover:shadow-sm transition block">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Daily space news</h3>
            <p className="text-sm text-slate-600 mb-2">NASA, SpaceX, missions, astronomy.</p>
            <span className="text-xs text-[var(--accent-cyan)] font-medium">Read blog →</span>
          </a>
        </Link>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Featured NASA mission</h3>
          <p className="text-sm font-medium text-slate-800 mb-0.5">Artemis — return to the Moon</p>
          <p className="text-xs text-slate-600">Orion, SLS, lunar Gateway, and crewed lunar landing.</p>
          <Link href="/missions/timeline"><a className="text-xs text-[var(--accent-cyan)] font-medium hover:underline mt-1 inline-block">Mission timeline →</a></Link>
        </div>
      </section>

      <section className="rounded-xl border-2 border-[var(--accent-pink)]/30 bg-gradient-to-br from-slate-50 to-pink-50/30 p-4 mb-4">
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">🪐 Space fact of the day</h2>
        <p className="text-slate-700">
          The ISS orbits Earth about every 90 minutes — astronauts see 16 sunrises and sunsets per day. At ~400 km altitude, orbital speed is roughly 7.66 km/s.
        </p>
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

      {/* Future Space Technology */}
      <section className="rounded-xl border-2 border-[var(--accent-gold)]/50 bg-gradient-to-br from-slate-50 to-amber-50/50 p-6 mb-8">
        <h2 className="text-xl font-bold text-slate-800 mb-2">🚀 Future Space Technology</h2>
        <p className="text-sm text-slate-600 mb-4">
          The next frontier: AI spacecraft, Mars cities, space tourism, space mining, and quantum space communication.
        </p>
        <div className="flex flex-wrap gap-2">
          <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-[var(--accent-gold)]/20 text-slate-800">AI spacecraft</span>
          <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-[var(--accent-gold)]/20 text-slate-800">Mars cities</span>
          <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-[var(--accent-gold)]/20 text-slate-800">Space tourism</span>
          <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-[var(--accent-gold)]/20 text-slate-800">Space mining</span>
          <span className="px-3 py-1.5 rounded-full text-xs font-medium bg-[var(--accent-gold)]/20 text-slate-800">Quantum space communication</span>
        </div>
        <p className="text-xs text-slate-500 mt-3">
          <Link href="/ai-in-aerospace"><a className="text-[var(--accent-cyan)] font-medium hover:underline">AI in Aerospace</a></Link>
          {" · "}
          <Link href="/learn/quantum-space"><a className="text-[var(--accent-cyan)] font-medium hover:underline">Quantum &amp; Space</a></Link>
        </p>
      </section>

      {/* Ask AstroBot / Study Prompts */}
      <section className="rounded-xl border-2 border-[var(--accent-cyan)]/50 bg-white p-6 mb-8">
        <h2 className="text-xl font-bold text-slate-800 mb-2">🧠 Ask AstroBot / Study Prompts</h2>
        <p className="text-sm text-slate-600 mb-4">
          Try these prompts with <Link href="/astrobot"><a className="text-[var(--accent-cyan)] font-medium hover:underline">Ask AstroBot</a></Link> for beginner to advanced learning.
        </p>
        <div className="grid sm:grid-cols-2 gap-4 text-sm">
          <div>
            <h3 className="font-bold text-slate-700 mb-1">Beginner</h3>
            <ul className="text-slate-600 space-y-0.5 list-disc pl-4">
              <li>What is orbital mechanics?</li>
              <li>How do satellites stay in orbit?</li>
              <li>What is escape velocity?</li>
              <li>How do rockets work?</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-slate-700 mb-1">Intermediate</h3>
            <ul className="text-slate-600 space-y-0.5 list-disc pl-4">
              <li>Explain LEO vs GEO orbit</li>
              <li>How GPS satellites work</li>
              <li>How space stations stay in orbit</li>
              <li>How re-entry works</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-slate-700 mb-1">Advanced</h3>
            <ul className="text-slate-600 space-y-0.5 list-disc pl-4">
              <li>Explain Hohmann transfer orbit</li>
              <li>AI in spacecraft navigation</li>
              <li>Quantum physics in GPS</li>
              <li>How SpaceX lands rockets</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-slate-700 mb-1">Research</h3>
            <ul className="text-slate-600 space-y-0.5 list-disc pl-4">
              <li>Future of interplanetary travel</li>
              <li>AI-controlled satellites</li>
              <li>Quantum communication in space</li>
              <li>Mars colonization systems</li>
            </ul>
          </div>
        </div>
        <Link href="/astrobot">
          <a className="inline-block mt-4 px-5 py-2.5 rounded-xl font-medium bg-[var(--accent-cyan)]/20 text-[#0f172a] hover:bg-[var(--accent-cyan)]/30 transition">
            🤖 Open Ask AstroBot →
          </a>
        </Link>
      </section>

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
