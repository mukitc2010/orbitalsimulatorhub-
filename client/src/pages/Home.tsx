import { useState } from "react";
import { Link } from "wouter";
import { DailyTopicIcon } from "../components/DailyTopicIcon";
import { ShareBar } from "../components/ShareBar";
import { BLOG_POSTS } from "../data/blogPosts";

const FEATURES = [
  { href: "/simulator", icon: "🛸", title: "3D Simulator", desc: "Add LEO, MEO, GEO satellites. Watch orbits in real time.", color: "cyan" },
  { href: "/astrobot", icon: "🤖", title: "AstroBot", desc: "Your AI Space Professor. Orbital mechanics, satellites, missions.", color: "gold" },
  { href: "/learn/orbital-mechanics", icon: "🧠", title: "Orbital Mechanics", desc: "Master orbits, escape velocity, Hohmann transfer.", color: "cyan" },
  { href: "/ai-in-aerospace", icon: "🚀", title: "AI in Space", desc: "Autonomous spacecraft, Mars rover AI, Space AGI.", color: "pink" },
];

const QUICK_LINKS = [
  { href: "/astronauts", label: "Astronauts" },
  { href: "/planets", label: "Planets" },
  { href: "/missions", label: "Missions" },
  { href: "/calculators", label: "Calculators" },
  { href: "/satellites", label: "Satellite Data" },
  { href: "/blog", label: "Blog" },
  { href: "/space-news", label: "Space News" },
  { href: "/research", label: "Research" },
];

const EXPLORE_BY_TOPIC = [
  { href: "/research/space-agi-doctrine", icon: "🔬", title: "Space-AGI Doctrine" },
  { href: "/learn/orbital-mechanics", icon: "🌌", title: "Orbital mechanics" },
  { href: "/learn/how-satellites-work", icon: "🛰", title: "How satellites work" },
  { href: "/formulas-library", icon: "🧮", title: "Formulas & calculators" },
  { href: "/calculators", icon: "📐", title: "Orbit calculator" },
  { href: "/compare/orbits", icon: "📊", title: "Compare LEO MEO GEO" },
  { href: "/ai-in-aerospace", icon: "🤖", title: "AI in Aerospace" },
  { href: "/learn/quantum-space", icon: "⚛", title: "Quantum & Space" },
  { href: "/research/future-civilization", icon: "🚀", title: "Future Civilization" },
];

export function Home() {
  const [showExplore, setShowExplore] = useState(false);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero — Intelligence for the Space Age */}
      <section className="rounded-2xl px-6 py-8 sm:py-10 text-center mb-8 hero-gradient">
        <p className="text-xs font-medium uppercase tracking-widest text-[var(--accent-cyan)] mb-2">Orbital Mechanics • AI in Space • Future Space Intelligence</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 leading-tight">
          OrbitalSimulatorHub — Intelligence for the Space Age
        </h1>
        <p className="text-base sm:text-lg text-white/90 max-w-xl mx-auto mb-5">
          Learn orbital mechanics, satellites, aerospace engineering, and the future of AI-powered space exploration.
        </p>
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          <Link href="/simulator">
            <a className="px-5 py-2.5 rounded-xl font-semibold text-sm transition hover:opacity-95" style={{ background: "var(--accent-primary)", color: "var(--text-on-accent)" }}>
              🛰 Open Orbital Simulator
            </a>
          </Link>
          <Link href="/astrobot">
            <a className="px-5 py-2.5 rounded-xl font-semibold text-sm border-2 transition hover:opacity-95" style={{ borderColor: "var(--accent-cyan)", color: "var(--text-on-accent)" }}>
              🤖 Ask AstroBot
            </a>
          </Link>
          <Link href="/learn/orbital-mechanics">
            <a className="px-5 py-2.5 rounded-xl font-semibold text-sm border-2 transition hover:opacity-95" style={{ borderColor: "var(--accent-pink)", color: "var(--text-on-accent)" }}>
              🧠 Learn Orbital Mechanics
            </a>
          </Link>
          <Link href="/ai-in-aerospace">
            <a className="px-5 py-2.5 rounded-xl font-semibold text-sm border-2 transition hover:opacity-95" style={{ borderColor: "var(--accent-gold)", color: "var(--text-on-accent)" }}>
              🚀 AI in Space
            </a>
          </Link>
        </div>
        <p className="text-xs text-slate-400">Trusted by students, engineers, researchers worldwide</p>
        <ShareBar path="/" showRedditSubs />
      </section>

      {/* 4 main features — Simulator, AstroBot, Orbital Mechanics, AI in Space */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {FEATURES.map((f) => (
          <Link key={f.href} href={f.href}>
            <a className="block p-5 rounded-xl border-2 transition hover:shadow-lg hover:scale-[1.02]" style={{ background: "var(--bg-card)", borderColor: "var(--border-color)" }}>
              <span className="text-2xl block mb-2">{f.icon}</span>
              <h2 className="font-bold text-lg mb-1" style={{ color: "var(--text-primary)" }}>{f.title}</h2>
              <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{f.desc}</p>
            </a>
          </Link>
        ))}
      </section>

      {/* Today's topic + quick links */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        <div className="rounded-xl border p-4" style={{ background: "var(--bg-card)", borderColor: "var(--border-color)" }}>
          <DailyTopicIcon />
        </div>
        <div className="rounded-xl border p-4" style={{ background: "var(--bg-card)", borderColor: "var(--border-color)" }}>
          <h3 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: "var(--text-secondary)" }}>📡 Quick links</h3>
          <div className="flex flex-wrap gap-2">
            {QUICK_LINKS.map((l) => (
              <Link key={l.href} href={l.href}>
                <a className="px-3 py-1.5 rounded-lg text-sm font-medium transition" style={{ background: "var(--bg-surface)", color: "var(--text-primary)" }}>
                  {l.label}
                </a>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Orbital Mechanics Master Hub + AI in Space + Future Space Intelligence */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Link href="/learn/orbital-mechanics">
          <a className="block rounded-xl border-2 p-4 transition hover:shadow-lg hover:scale-[1.02]" style={{ background: "var(--bg-card)", borderColor: "var(--border-color)" }}>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: "var(--accent-cyan)" }}>🧠 Master Orbital Mechanics</h3>
            <p className="text-sm mb-2" style={{ color: "var(--text-primary)" }}>Best on the Internet</p>
            <p className="text-xs mb-2" style={{ color: "var(--text-secondary)" }}>What is orbit • Why satellites don&apos;t fall • LEO MEO GEO • Escape velocity • Hohmann transfer</p>
            <span className="text-xs font-medium" style={{ color: "var(--accent-cyan)" }}>Learn more →</span>
          </a>
        </Link>
        <Link href="/ai-in-aerospace">
          <a className="block rounded-xl border-2 p-4 transition hover:shadow-lg hover:scale-[1.02]" style={{ background: "var(--bg-card)", borderColor: "var(--border-color)" }}>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: "var(--accent-pink)" }}>🚀 #1 AI + Space Platform</h3>
            <p className="text-sm mb-2" style={{ color: "var(--text-primary)" }}>AI controls satellites • Autonomous spacecraft • Mars rover AI • Space AGI</p>
            <span className="text-xs font-medium" style={{ color: "var(--accent-pink)" }}>Explore AI in Space →</span>
          </a>
        </Link>
        <Link href="/research/space-agi-doctrine">
          <a className="block rounded-xl border-2 p-4 transition hover:shadow-lg hover:scale-[1.02]" style={{ background: "linear-gradient(135deg, var(--bg-card) 0%, rgba(0,217,255,0.08) 100%)", borderColor: "var(--accent-cyan)" }}>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: "var(--accent-cyan)" }}>🔬 Latest Research</h3>
            <p className="text-sm mb-2 font-semibold" style={{ color: "var(--text-primary)" }}>Space-AGI Doctrine</p>
            <p className="text-xs mb-2" style={{ color: "var(--text-secondary)" }}>Orbital mechanics + autonomous decision models. Delayed MDP, Bayesian belief, energy-aware planning.</p>
            <span className="text-xs font-medium" style={{ color: "var(--accent-cyan)" }}>Read doctrine →</span>
          </a>
        </Link>
      </section>

      {/* Explore by topic — collapsible */}
      <section className="rounded-xl border border p-4 mb-8" style={{ background: "var(--bg-card)", borderColor: "var(--border-color)" }}>
        <button
          type="button"
          onClick={() => setShowExplore(!showExplore)}
          className="w-full flex items-center justify-between text-left font-bold"
          style={{ color: "var(--text-primary)" }}
        >
          <span>Explore by topic</span>
          <span className="text-xl">{showExplore ? "−" : "+"}</span>
        </button>
        {showExplore && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">
            {EXPLORE_BY_TOPIC.map((t) => (
              <Link key={t.href} href={t.href}>
                <a className="flex items-center gap-2 p-2 rounded-lg text-sm transition hover:opacity-80" style={{ background: "var(--bg-surface)" }}>
                  <span>{t.icon}</span>
                  <span style={{ color: "var(--text-primary)" }}>{t.title}</span>
                </a>
              </Link>
            ))}
          </div>
        )}
        <p className="text-xs mt-2" style={{ color: "var(--text-muted)" }}>Use the navigation bar for full site map</p>
      </section>

      {/* AstroBot highlight + Trending */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <Link href="/astrobot">
          <a className="block rounded-xl border-2 p-4 transition hover:shadow-lg" style={{ background: "var(--bg-card)", borderColor: "var(--accent-gold)" }}>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: "var(--accent-gold)" }}>🤖 AstroBot — Your AI Space Professor</h3>
            <p className="text-sm" style={{ color: "var(--text-secondary)" }}>Orbital mechanics • Satellites • Missions • AI in space • Future tech</p>
          </a>
        </Link>
        <div className="rounded-xl border p-4" style={{ background: "var(--bg-card)", borderColor: "var(--border-color)" }}>
          <h3 className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: "var(--text-secondary)" }}>📡 Trending in Space</h3>
          <div className="flex flex-wrap gap-2">
            <Link href="/space-news"><a className="px-2 py-1 rounded text-sm" style={{ background: "var(--bg-surface)", color: "var(--text-primary)" }}>AI in Space News</a></Link>
            <Link href="/missions/timeline"><a className="px-2 py-1 rounded text-sm" style={{ background: "var(--bg-surface)", color: "var(--text-primary)" }}>Future Missions</a></Link>
            <Link href="/blog"><a className="px-2 py-1 rounded text-sm" style={{ background: "var(--bg-surface)", color: "var(--text-primary)" }}>Space Technology</a></Link>
          </div>
        </div>
      </section>

      {/* Latest blog */}
      <section className="rounded-xl border p-4 mb-8" style={{ background: "var(--bg-card)", borderColor: "var(--border-color)" }}>
        <div className="flex justify-between items-center mb-3">
          <h2 className="font-bold" style={{ color: "var(--text-primary)" }}>📰 Latest from the Blog</h2>
          <Link href="/blog"><a className="text-sm font-medium" style={{ color: "var(--accent-primary)" }}>View all →</a></Link>
        </div>
        <div className="grid sm:grid-cols-3 gap-3">
          {BLOG_POSTS.slice(0, 3).map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <a className="block p-3 rounded-lg border transition hover:border-[var(--accent-cyan)]" style={{ borderColor: "var(--border-color)" }}>
                <span className="text-xs font-medium uppercase" style={{ color: "var(--accent-pink)" }}>{post.category}</span>
                <h3 className="font-semibold text-sm mt-1 line-clamp-2" style={{ color: "var(--text-primary)" }}>{post.title}</h3>
                <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>{post.date}</p>
              </a>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular searches — compact */}
      <section className="rounded-xl border p-4 mb-8" style={{ background: "var(--bg-card)", borderColor: "var(--border-color)" }}>
        <h3 className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: "var(--text-secondary)" }}>🔍 Popular searches</h3>
        <div className="flex flex-wrap gap-2">
          <Link href="/calculators"><a className="px-2 py-1 rounded text-sm" style={{ background: "var(--bg-surface)", color: "var(--text-primary)" }}>How fast does ISS orbit?</a></Link>
          <Link href="/astronauts"><a className="px-2 py-1 rounded text-sm" style={{ background: "var(--bg-surface)", color: "var(--text-primary)" }}>How many astronauts on Moon?</a></Link>
          <Link href="/learn/how-satellites-work"><a className="px-2 py-1 rounded text-sm" style={{ background: "var(--bg-surface)", color: "var(--text-primary)" }}>LEO MEO GEO</a></Link>
          <Link href="/learn/space-questions"><a className="px-2 py-1 rounded text-sm" style={{ background: "var(--bg-surface)", color: "var(--text-primary)" }}>Why don&apos;t satellites fall?</a></Link>
          <Link href="/simulator"><a className="px-2 py-1 rounded text-sm" style={{ background: "var(--bg-surface)", color: "var(--text-primary)" }}>Orbit simulator</a></Link>
        </div>
      </section>

      {/* Advanced Research */}
      <section className="rounded-xl border p-4 mb-8" style={{ background: "var(--bg-card)", borderColor: "var(--border-color)" }}>
        <h3 className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: "var(--text-secondary)" }}>📚 Advanced Space Research</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          <Link href="/formulas-library"><a className="px-2 py-1 rounded text-sm" style={{ background: "var(--bg-surface)", color: "var(--text-primary)" }}>Orbital formulas</a></Link>
          <Link href="/learn/aerospace"><a className="px-2 py-1 rounded text-sm" style={{ background: "var(--bg-surface)", color: "var(--text-primary)" }}>Mission design</a></Link>
          <Link href="/research"><a className="px-2 py-1 rounded text-sm" style={{ background: "var(--bg-surface)", color: "var(--text-primary)" }}>Aerospace concepts</a></Link>
          <Link href="/ai-in-aerospace"><a className="px-2 py-1 rounded text-sm" style={{ background: "var(--bg-surface)", color: "var(--text-primary)" }}>AI for space research</a></Link>
        </div>
      </section>

      {/* FAQ — compact, 2 questions */}
      <section className="rounded-xl border p-4 mb-8" style={{ background: "var(--bg-card)", borderColor: "var(--border-color)" }}>
        <h3 className="font-bold mb-3" style={{ color: "var(--text-primary)" }}>❓ FAQ</h3>
        <div className="space-y-3 text-sm">
          <div>
            <p className="font-semibold mb-0.5" style={{ color: "var(--text-primary)" }}>What is Orbital Simulator Hub?</p>
            <p style={{ color: "var(--text-secondary)" }}>Free 3D orbit simulator, astronaut database (500+), planet explorer, NASA missions. For students, researchers, PhD scientists. No signup.</p>
          </div>
          <div>
            <p className="font-semibold mb-0.5" style={{ color: "var(--text-primary)" }}>How fast does the ISS orbit?</p>
            <p style={{ color: "var(--text-secondary)" }}>~7.66 km/s (27,600 km/h) at 408 km. Orbital period ~92 minutes. <Link href="/calculators"><a style={{ color: "var(--accent-primary)" }}>Calculator →</a></Link></p>
          </div>
        </div>
        <div className="mt-3 flex gap-3">
          <Link href="/astrobot"><a className="text-sm font-medium" style={{ color: "var(--accent-primary)" }}>Ask AstroBot →</a></Link>
          <Link href="/simulator"><a className="text-sm font-medium" style={{ color: "var(--accent-primary)" }}>Try Simulator →</a></Link>
        </div>
      </section>
    </div>
  );
}
