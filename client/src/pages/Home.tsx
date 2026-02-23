import { useState } from "react";
import { Link } from "wouter";
import { DailyTopicIcon } from "../components/DailyTopicIcon";
import { ShareBar } from "../components/ShareBar";
import { BLOG_POSTS } from "../data/blogPosts";

const FEATURES = [
  { href: "/simulator", icon: "🛸", title: "3D Simulator", desc: "Add LEO, MEO, GEO satellites. Watch orbits in real time.", color: "cyan" },
  { href: "/astrobot", icon: "🤖", title: "Ask AstroBot", desc: "Get answers about orbits, satellites, ISS.", color: "gold" },
  { href: "/play", icon: "🌟", title: "Learn Space", desc: "Missions, astronauts, planets, solar system.", color: "pink" },
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
      {/* Hero — compact, light */}
      <section className="rounded-2xl px-6 py-8 sm:py-10 text-center mb-8 hero-gradient">
        <p className="text-xs font-medium uppercase tracking-widest text-[var(--accent-cyan)] mb-2">🌌 Global Space Research & Future Civilization Hub</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 leading-tight">
          Orbital Mechanics Simulator — Free 3D Satellite Orbit Simulator
        </h1>
        <p className="text-base sm:text-lg text-white/90 max-w-xl mx-auto mb-1">
          The #1 Space Learning & Research Platform on Earth
        </p>
        <p className="text-sm text-slate-300 max-w-lg mx-auto mb-5">
          Learn orbital mechanics, satellites, aerospace engineering, AI in space. For students, engineers, researchers worldwide.
        </p>
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          <Link href="/simulator">
            <a className="px-5 py-2.5 rounded-xl font-semibold text-sm transition hover:opacity-95" style={{ background: "var(--accent-primary)", color: "var(--text-on-accent)" }}>
              🛰 Open Simulator
            </a>
          </Link>
          <Link href="/astrobot">
            <a className="px-5 py-2.5 rounded-xl font-semibold text-sm border-2 transition hover:opacity-95" style={{ borderColor: "var(--accent-cyan)", color: "var(--text-on-accent)" }}>
              🤖 Ask AstroBot
            </a>
          </Link>
          <Link href="/astronauts">
            <a className="px-5 py-2.5 rounded-xl font-semibold text-sm border-2 transition hover:opacity-95" style={{ borderColor: "var(--accent-pink)", color: "var(--text-on-accent)" }}>
              👨‍🚀 Astronauts
            </a>
          </Link>
          <Link href="/planets">
            <a className="px-5 py-2.5 rounded-xl font-semibold text-sm border-2 transition hover:opacity-95" style={{ borderColor: "var(--accent-gold)", color: "var(--text-on-accent)" }}>
              🪐 Planets
            </a>
          </Link>
        </div>
        <p className="text-xs text-slate-400">Use the navigation bar above to explore all topics</p>
        <ShareBar path="/" showRedditSubs />
      </section>

      {/* 3 main features */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
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

      {/* Latest Research Update — Space-AGI Doctrine */}
      <section className="rounded-xl border-2 p-5 mb-8" style={{ background: "linear-gradient(135deg, var(--bg-card) 0%, rgba(0,217,255,0.08) 100%)", borderColor: "var(--accent-cyan)" }}>
        <h3 className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: "var(--accent-cyan)" }}>🔬 Latest Research Update — Feb 2026</h3>
        <p className="font-semibold mb-2 text-lg" style={{ color: "var(--text-primary)" }}>Space-AGI Doctrine: Orbital Mechanics + Autonomous Decision Models</p>
        <p className="text-sm mb-3" style={{ color: "var(--text-secondary)" }}>
          Reproducible simulation package: two-body & J2 propagation, Hohmann transfer, debris Monte Carlo, delayed MDP, Bayesian belief, energy-aware planning, scientific discovery loop. Unified mission score: safety + precision + energy + discovery + autonomy.
        </p>
        <div className="flex flex-wrap gap-2">
          <Link href="/research/space-agi-doctrine">
            <a className="px-4 py-2 rounded-lg font-semibold text-sm transition" style={{ background: "var(--accent-cyan)", color: "var(--text-on-accent)" }}>
              Read Space-AGI Doctrine →
            </a>
          </Link>
          <Link href="/research">
            <a className="px-4 py-2 rounded-lg font-medium text-sm border-2 transition" style={{ borderColor: "var(--accent-cyan)", color: "var(--text-primary)" }}>
              Research Hub
            </a>
          </Link>
        </div>
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
