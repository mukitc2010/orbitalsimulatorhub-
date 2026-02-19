import { Link } from "wouter";
import { APP_NAME } from "../const";
import { DailyTopicIcon } from "../components/DailyTopicIcon";
import { ShareBar } from "../components/ShareBar";
import { BLOG_POSTS } from "../data/blogPosts";

const FEATURES = [
  { href: "/play#simulator", icon: "🛸", title: "3D Simulator", desc: "Add LEO, MEO, GEO satellites and watch orbits in real time.", cyan: true },
  { href: "/play#nasa", icon: "🌟", title: "Learn Space", desc: "Missions, astronauts, rovers, Moon, solar system.", pink: true },
  { href: "/astrobot", icon: "🤖", title: "Ask AstroBot", desc: "Get answers about orbits, satellites, ISS, and space.", gold: true },
];

const CARDS = [
  { href: "/simulator", icon: "🛸", title: "Orbit simulator", desc: "3D satellite orbit simulator — LEO, MEO, GEO. See height, speed, period.", cyan: true },
  { href: "/blog", icon: "📰", title: "Space Blog", desc: "Daily space news, space facts, satellite tutorials, astronomy lessons. Fresh content daily.", pink: true },
  { href: "/formulas-library", icon: "🧮", title: "Space formulas", desc: "Gravity, orbital velocity, escape velocity, Kepler, rocket equation + calculators.", gold: true },
  { href: "/satellites", icon: "🛰", title: "Real satellite orbits", desc: "ISS, Starlink, GPS, weather satellites — altitude, speed, orbit time.", cyan: true },
  { href: "/calculators", icon: "🔢", title: "Orbit calculator", desc: "Orbit calculator, gravity calculator, escape velocity.", pink: true },
  { href: "/learn/orbital-mechanics", icon: "🌌", title: "Orbital mechanics for beginners", desc: "What is orbital mechanics? Kids, beginner, and engineer versions. Learn how satellites orbit Earth.", cyan: true },
  { href: "/learn/nasa-study-guide", icon: "📖", title: "Space study guide", desc: "Key space missions, orbital mechanics, and space science. For students and teachers.", pink: true },
  { href: "/learn/how-satellites-work", icon: "🛰", title: "How satellites work", desc: "Why satellites don't fall, LEO vs MEO vs GEO, communications, GPS, and real examples.", gold: true },
  { href: "/learn/astronomy-for-kids", icon: "🌟", title: "Astronomy for kids", desc: "Solar system, Moon, planets, astronauts — fun space learning for kids and families.", cyan: true },
  { href: "/learn/nasa-for-students", icon: "🎓", title: "Space for students", desc: "Free resources: missions, orbital mechanics, AI in space, careers, internships.", pink: true },
  { href: "/learn/space-questions", icon: "❓", title: "Why don't satellites fall?", desc: "Simple answers: moon, astronauts float, what if satellite stops.", pink: true },
  { href: "/learn/experiments", icon: "🔬", title: "Space Experiments", desc: "5 hands-on DIY experiments to understand orbital mechanics and space physics!", gold: true },
  { href: "/learn/how-gps-works", icon: "📍", title: "How GPS Works", desc: "Learn how GPS satellites help you navigate. Trilateration, atomic clocks, constellation.", cyan: true },
  { href: "/compare/orbits", icon: "📊", title: "Compare Orbits", desc: "Side-by-side comparison: LEO vs MEO vs GEO. See differences in altitude, speed, period.", pink: true },
  { href: "/learn/how-nasa-launches-satellite", icon: "🚀", title: "How Satellites Launch", desc: "Step-by-step guide: rocket stages, launch sequence, orbital insertion, real examples.", gold: true },
  { href: "/learn/how-spacex-lands-rockets", icon: "🛬", title: "How SpaceX Lands", desc: "Revolutionary reusable rockets. Grid fins, landing sequence, boost-back burn explained.", cyan: true },
  { href: "/learn/how-mars-rovers-work", icon: "🤖", title: "How Mars Rovers Work", desc: "Landing sequence, navigation systems, science instruments, communication with Earth.", pink: true },
  { href: "/learn/how-starlink-works", icon: "🌐", title: "How Starlink Works", desc: "Global internet from space. Satellite constellation, LEO benefits, ground stations.", gold: true },
  { href: "/learn/how-iss-works", icon: "🏠", title: "How ISS Works", desc: "International Space Station: orbit, life support, power, science, assembly in space.", cyan: true },
  { href: "/missions/timeline", icon: "📅", title: "Mission Timeline", desc: "History of space exploration from Sputnik to James Webb. Key missions and achievements.", pink: true },
  { href: "/quiz/orbital-mechanics", icon: "📝", title: "Orbital Mechanics Quiz", desc: "Test your knowledge! 15 questions on orbits, satellites, and space physics.", gold: true },
  { href: "/learn/how-solar-system-works", icon: "🌍", title: "How Solar System Works", desc: "Kepler's laws, orbital mechanics, Hohmann transfers, gravity assists. Math behind planetary motion.", cyan: true },
  { href: "/learn/what-is-moon", icon: "🌙", title: "What is the Moon?", desc: "Scientific facts: formation, composition, orbit, phases, tides. Space missions and research.", pink: true },
  { href: "/learn/astrophysics", icon: "⭐", title: "Astrophysics", desc: "Stars, black holes, dark matter, cosmology, exoplanets. Math and physics of the universe.", gold: true },
  { href: "/learn/quantum-physics", icon: "⚛️", title: "Quantum Physics", desc: "Wave-particle duality, uncertainty principle, Schrödinger equation, quantum computing basics.", cyan: true },
  { href: "/learn/quantum-physics-nasa", icon: "🔬", title: "Quantum Physics in Space", desc: "How space agencies use quantum physics: atomic clocks, quantum sensors, quantum communication, future tech.", pink: true },
  { href: "/learn/aerodynamics", icon: "✈", title: "Aerodynamics & Space Flight", desc: "Lift, drag, re-entry, rocket aerodynamics, heat shields, CFD. How space agencies design efficient vehicles.", cyan: true },
  { href: "/learn/quantum-space", icon: "⚛", title: "Quantum Physics & Space", desc: "Quantum sensors, atomic clocks, GPS accuracy, quantum communication and computing in space.", pink: true },
  { href: "/ai-in-aerospace", icon: "🤖", title: "AI in Aerospace", desc: "How AI transforms aerospace: satellite navigation, autonomous spacecraft, Mars rovers, mission planning.", gold: true },
  { href: "/astrobot", icon: "🤖", title: "Ask AstroBot", desc: "Ask anything about space, orbits, rockets.", cyan: true },
  { href: "/research", icon: "📚", title: "Research & PhD", desc: "Newton, algorithms, real mission data — for students and researchers.", pink: true },
  { href: "/careers", icon: "👨‍🚀", title: "Space Careers", desc: "How to become aerospace engineer, astronaut, space scientist, AI space engineer.", gold: true },
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
        <h2 className="font-bold text-xl mb-1.5" style={{ color: "var(--text-primary)" }}>{title}</h2>
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
        <p className="text-sm font-medium text-[var(--accent-cyan)] uppercase tracking-wider mb-2">🌌 Global Space Research &amp; Future Civilization Hub</p>
        <h1 className="headline mb-3 text-white">Orbital Simulator Hub – Learn Space, Satellites &amp; More</h1>
        <p className="text-lg sm:text-xl font-semibold text-white/95 max-w-xl mx-auto mb-2">
          The #1 Space Learning &amp; Research Platform on Earth
        </p>
        <p className="subhead max-w-2xl mx-auto mb-4 text-slate-300">
          Learn orbital mechanics, satellites, aerospace engineering, AI in space, space missions, and real simulations.
          Interactive space simulator for students, engineers, and researchers.
        </p>
        <p className="text-sm text-slate-400 max-w-2xl mx-auto mb-4">
          Orbital mechanics for beginners · Satellite orbit simulator · How satellites work · Space study guide · Space physics course · AI in space technology · Astronomy for kids · Space for students.
        </p>
        <p className="text-xs text-slate-500 max-w-2xl mx-auto mb-4">
          <strong>Orbital Simulator Hub</strong> (orbitalsimulatorhub.com) is a free 3D orbit simulator and space education platform. Learn orbital mechanics, explore 100+ astronaut profiles, study all 8 planets with real mission data, and use the interactive simulator — all free, no signup required.
        </p>
        <ul className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-sm text-slate-300 max-w-2xl mx-auto mb-6 list-none pl-0">
          <li>🔭 Space education &amp; research</li>
          <li>🛰 AI spacecraft &amp; orbital simulations</li>
          <li>🤖 Quantum space technology</li>
          <li>⚛ Future interstellar civilization</li>
          <li>📡 Real mission data &amp; algorithms</li>
        </ul>
        <div className="flex flex-wrap justify-center gap-3 mb-2">
          <Link href="/simulator">
            <a className="hero-cta inline-block px-6 py-3 rounded-xl font-bold text-base shadow-lg hover:opacity-95 hover:scale-[1.02] transition" style={{ background: "var(--accent-primary)", color: "var(--text-on-accent)" }}>
              🛰 Open 3D Simulator
            </a>
          </Link>
          <Link href="/astrobot">
            <a className="inline-block px-6 py-3 rounded-xl font-bold text-base border-2 transition" style={{ borderColor: "var(--accent-cyan)", color: "var(--text-on-accent)", background: "rgba(0,217,255,0.15)" }}>
              🤖 Ask AstroBot
            </a>
          </Link>
          <Link href="/astronauts">
            <a className="inline-block px-6 py-3 rounded-xl font-bold text-base border-2 transition" style={{ borderColor: "var(--accent-pink)", color: "var(--text-on-accent)", background: "rgba(244,114,182,0.15)" }}>
              👨‍🚀 Astronaut Database
            </a>
          </Link>
          <Link href="/planets">
            <a className="inline-block px-6 py-3 rounded-xl font-bold text-base border-2 transition" style={{ borderColor: "var(--accent-gold)", color: "var(--text-on-accent)", background: "rgba(251,191,36,0.15)" }}>
              🪐 Planet Explorer
            </a>
          </Link>
        </div>
        <p className="text-xs text-slate-400 uppercase tracking-wider font-medium">
          Simulator · Astronauts · Planets · Missions · AstroBot · Research &amp; Future
        </p>
        <div className="mt-4">
          <ShareBar path="/" showRedditSubs />
        </div>
      </section>

      {/* Daily Featured Topic */}
      <section className="mb-8">
        <DailyTopicIcon />
      </section>

      {/* Traffic keywords — daily content hubs (Space news, space for kids, AI in space, Satellite tutorial, Space quiz) */}
      <section className="mb-8 rounded-xl border-2 border-[var(--accent-cyan)]/40 bg-white p-4">
        <h2 className="text-sm font-bold text-slate-600 uppercase tracking-wider mb-3">📡 Daily content · Fresh pages for learners</h2>
        <div className="flex flex-wrap gap-2">
          <Link href="/space-news">
            <a className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-[var(--accent-cyan)]/20 text-slate-800 font-medium text-sm transition">Space news</a>
          </Link>
          <Link href="/learn/nasa-for-kids">
            <a className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-[var(--accent-pink)]/20 text-slate-800 font-medium text-sm transition">Space for kids</a>
          </Link>
          <Link href="/ai-in-space">
            <a className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-[var(--accent-gold)]/20 text-slate-800 font-medium text-sm transition">AI in space</a>
          </Link>
          <Link href="/learn/satellite-tutorial">
            <a className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-[var(--accent-cyan)]/20 text-slate-800 font-medium text-sm transition">Satellite tutorial</a>
          </Link>
          <Link href="/space-quiz">
            <a className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-[var(--accent-gold)]/20 text-slate-800 font-medium text-sm transition">Space quiz</a>
          </Link>
        </div>
      </section>

      {/* Homepage highlights: chatbot, news, featured mission */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
        <Link href="/astrobot">
          <a className="rounded-xl border border-slate-200 bg-white p-4 hover:border-[var(--accent-cyan)] hover:shadow-sm transition block">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">AI space chatbot</h3>
            <p className="text-sm text-slate-600 mb-2">Ask anything about space, orbits, rockets.</p>
            <span className="text-xs text-[var(--accent-cyan)] font-medium">Ask AstroBot →</span>
          </a>
        </Link>
        <Link href="/space-news">
          <a className="rounded-xl border border-slate-200 bg-white p-4 hover:border-[var(--accent-cyan)] hover:shadow-sm transition block">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Space news</h3>
            <p className="text-sm text-slate-600 mb-2">Daily space news, missions, astronomy. Fresh content.</p>
            <span className="text-xs text-[var(--accent-cyan)] font-medium">Space news →</span>
          </a>
        </Link>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <h3 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Featured space mission</h3>
          <p className="text-sm font-medium text-slate-800 mb-0.5">Artemis — return to the Moon</p>
          <p className="text-xs text-slate-600">Orion, SLS, lunar Gateway, and crewed lunar landing.</p>
          <Link href="/missions/timeline"><a className="text-xs text-[var(--accent-cyan)] font-medium hover:underline mt-1 inline-block">Mission timeline →</a></Link>
        </div>
      </section>

      <section className="rounded-xl border-2 border-[var(--accent-pink)]/30 bg-gradient-to-br from-slate-50 to-pink-50/30 p-4 mb-4">
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">💫 Did you know?</h2>
        <p className="text-slate-700 mb-2">
          <strong>The ISS orbits Earth about every 90 minutes</strong> — astronauts see 16 sunrises and sunsets per day. At ~400 km altitude, orbital speed is roughly 7.66 km/s.
        </p>
        <p className="text-slate-600 text-sm">
          A teaspoon of neutron star would weigh 6 billion tons. There are more stars in the universe than grains of sand on Earth. Share if you love space! 🚀
        </p>
      </section>

      {/* Authority: Future & Research */}
      <section className="rounded-xl border-2 border-[var(--accent-cyan)]/40 bg-white p-4 mb-6">
        <h2 className="text-sm font-bold text-slate-700 uppercase tracking-wider mb-3">📚 Authority &amp; Future Research</h2>
        <div className="flex flex-wrap gap-2">
          <Link href="/research/neuro-space"><a className="px-3 py-2 rounded-lg bg-slate-100 hover:bg-[var(--accent-cyan)]/20 text-slate-800 font-medium text-sm transition">Neuro-Space &amp; Light-Speed</a></Link>
          <Link href="/research/future-civilization"><a className="px-3 py-2 rounded-lg bg-slate-100 hover:bg-[var(--accent-cyan)]/20 text-slate-800 font-medium text-sm transition">Future of Space Civilization</a></Link>
          <Link href="/research/next-100-years"><a className="px-3 py-2 rounded-lg bg-slate-100 hover:bg-[var(--accent-cyan)]/20 text-slate-800 font-medium text-sm transition">Next 100 Years</a></Link>
          <Link href="/research"><a className="px-3 py-2 rounded-lg bg-slate-100 hover:bg-[var(--accent-cyan)]/20 text-slate-800 font-medium text-sm transition">Research Hub</a></Link>
          <Link href="/ai-in-aerospace"><a className="px-3 py-2 rounded-lg bg-slate-100 hover:bg-[var(--accent-cyan)]/20 text-slate-800 font-medium text-sm transition">AI in Aerospace</a></Link>
          <Link href="/learn/quantum-space"><a className="px-3 py-2 rounded-lg bg-slate-100 hover:bg-[var(--accent-cyan)]/20 text-slate-800 font-medium text-sm transition">Quantum Space</a></Link>
        </div>
      </section>

      <section className="rounded-xl bg-white border border-slate-200 p-4 mb-8 text-sm text-slate-700">
        <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">What this site teaches</h2>
        <p className="text-xs text-[var(--accent-cyan)] font-medium mb-2">✨ Same physics used by space agencies — no magic, just math and gravity.</p>
        <p className="mb-2">
          <strong>Orbits &amp; satellites:</strong> Why satellites stay in orbit (LEO, MEO, GEO), how height and speed relate, and what the numbers mean.
        </p>
        <p className="mb-2">
          <strong>Newton &amp; gravity:</strong> The three laws of motion and the law of gravity — the same physics used by space agencies for rockets and orbits.
        </p>
        <p className="mb-3">
          <strong>Missions &amp; space:</strong> Space missions, astronauts, the ISS, and how to explore further with the simulator and AstroBot.
        </p>
        <p className="rounded-lg bg-[var(--accent-cyan)]/10 border border-[var(--accent-cyan)]/30 px-3 py-2 text-slate-800">
          <strong>For students, scientists &amp; PhD researchers:</strong> Real mission data, math and algorithms, and real-life calculations. <Link href="/learn/aerospace#phd"><a className="text-[var(--accent-cyan)] font-medium hover:underline">PhD &amp; advanced resources</a></Link> (textbooks, NTRS, SPICE, Horizons). <Link href="/research"><a className="text-[var(--accent-cyan)] font-medium hover:underline">Research &amp; topics</a></Link> · <Link href="/learn/aerospace"><a className="text-[var(--accent-cyan)] font-medium hover:underline">Aerospace reference</a></Link>.
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
          <Link href="/ai-in-space"><a className="text-[var(--accent-cyan)] font-medium hover:underline">AI in space</a></Link>
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
          <a className="inline-block mt-4 px-5 py-2.5 rounded-xl font-medium transition" style={{ background: "color-mix(in srgb, var(--accent-primary) 20%, transparent)", color: "var(--text-primary)" }}>
            🤖 Open Ask AstroBot →
          </a>
        </Link>
      </section>

      {/* Latest Blog Posts */}
      <section className="rounded-xl border-2 border-[var(--accent-cyan)]/40 bg-white p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-slate-800">📰 Latest from the Blog</h2>
          <Link href="/blog">
            <a className="text-sm text-[var(--accent-cyan)] font-medium hover:underline">View all →</a>
          </Link>
        </div>
        <div className="grid sm:grid-cols-3 gap-4">
          {BLOG_POSTS.slice(0, 3).map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <a className="block rounded-lg border border-slate-200 p-4 hover:border-[var(--accent-cyan)] hover:shadow-sm transition">
                <span className="text-xs font-medium uppercase tracking-wider text-[var(--accent-pink)]">{post.category}</span>
                <h3 className="font-semibold text-slate-800 text-sm mt-1 line-clamp-2">{post.title}</h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{post.excerpt}</p>
                <p className="text-xs text-slate-400 mt-2">{post.date}</p>
              </a>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ Section — SEO + AI citation: same content as FAQ schema */}
      <section className="rounded-xl border-2 border-[var(--accent-cyan)]/40 bg-white p-6 mb-8">
        <h2 className="text-xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>❓ Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
            { q: "What is Orbital Simulator Hub?", a: "Orbital Simulator Hub is a free interactive space education platform at orbitalsimulatorhub.com. It features a 3D satellite orbit simulator (LEO, MEO, GEO), an astronaut database with 500+ profiles, a planet explorer with real mission data for all 8 planets, mission details for Apollo and other programs, lunar geology guides, aerospace engineering references, and AI-powered AstroBot for space Q&A. Designed for students, researchers, and PhD scientists." },
            { q: "How does a satellite orbit simulator work?", a: "A satellite orbit simulator uses Kepler's laws and Newton's law of gravitation to calculate orbital paths. At orbitalsimulatorhub.com/simulator, you can add LEO (200-2000 km), MEO (2000-35786 km), and GEO (35786 km) satellites and watch their 3D orbits in real-time. The simulator shows altitude, orbital velocity, period, perigee, and apogee for each satellite." },
            { q: "What is LEO, MEO, and GEO orbit?", a: "LEO (Low Earth Orbit) is 200-2000 km altitude — used by ISS and Starlink. MEO (Medium Earth Orbit) is 2000-35786 km — used by GPS and navigation satellites. GEO (Geostationary Orbit) is exactly 35,786 km — satellites appear stationary above one spot on Earth, used for weather and communications. Try the interactive simulator at orbitalsimulatorhub.com/simulator." },
            { q: "How many astronauts walked on the Moon?", a: "12 astronauts walked on the Moon during the Apollo program (1969-1972): Neil Armstrong and Buzz Aldrin (Apollo 11), Pete Conrad and Alan Bean (Apollo 12), Alan Shepard and Edgar Mitchell (Apollo 14), David Scott and James Irwin (Apollo 15), John Young and Charles Duke (Apollo 16), and Gene Cernan and Harrison Schmitt (Apollo 17). Explore all moonwalkers at orbitalsimulatorhub.com/astronauts." },
            { q: "How fast does the ISS orbit Earth?", a: "The ISS orbits at approximately 7.66 km/s (27,600 km/h) at 408 km altitude. Its orbital period is about 92 minutes. Calculate orbital velocity for any altitude at orbitalsimulatorhub.com/calculators." },
          ].map((faq, i) => (
            <div key={i} className="rounded-lg p-4" style={{ background: "var(--bg-surface)", border: "1px solid var(--border-color)" }}>
              <h3 className="font-bold text-sm mb-2" style={{ color: "var(--text-primary)" }}>{faq.q}</h3>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>{faq.a}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link href="/astrobot"><a className="text-sm font-medium" style={{ color: "var(--accent-primary)" }}>Ask AstroBot more →</a></Link>
          <Link href="/simulator"><a className="text-sm font-medium" style={{ color: "var(--accent-primary)" }}>Try Simulator →</a></Link>
        </div>
      </section>

      {/* Community CTA */}
      <section className="rounded-xl border-2 border-[var(--accent-pink)]/40 bg-gradient-to-br from-slate-50 to-pink-50/30 p-6 mb-8 text-center">
        <h2 className="text-xl font-bold text-slate-800 mb-2">🌐 Join the Community</h2>
        <p className="text-sm text-slate-600 max-w-lg mx-auto mb-4">
          Explore educational content about aerospace, quantum physics, and orbital mechanics — updated daily.
        </p>
        <a
          href="https://www.orbitalsimulatorhub.com/welcome"
          className="inline-block px-6 py-3 rounded-xl font-medium transition"
          style={{ background: "color-mix(in srgb, var(--accent-secondary) 20%, transparent)", color: "var(--text-primary)" }}
        >
          Explore Community Hub →
        </a>
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
