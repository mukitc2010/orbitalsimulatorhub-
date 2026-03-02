import { useState } from "react";
import { Link } from "wouter";
import { DailyTopicIcon } from "../components/DailyTopicIcon";
import { ShareBar } from "../components/ShareBar";
import { BLOG_POSTS } from "../data/blogPosts";
import { getBlogImage } from "../data/blogImages";

const FEATURES = [
  { href: "/simulator", icon: "🛸", title: "3D Simulator", desc: "Add LEO, MEO, GEO satellites. Watch orbits in real time.", color: "cyan" },
  { href: "/astrobot", icon: "🤖", title: "AstroBot", desc: "Your AI Space Professor. Orbital mechanics, satellites, missions.", color: "gold" },
  { href: "/learn/orbital-mechanics", icon: "🧠", title: "Orbital Mechanics", desc: "Master orbits, escape velocity, Hohmann transfer.", color: "cyan" },
  { href: "/ai-in-aerospace", icon: "🚀", title: "AI in Space", desc: "Autonomous spacecraft, Mars rover AI, Space AGI.", color: "pink" },
  { href: "/research/space-agi-lab", icon: "🔬", title: "Space-AGI Lab", desc: "5 pillars, humanoid robotics, multi-gravity AGI, live swarm simulator.", color: "cyan" },
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
  { href: "/research/space-agi-lab", label: "Space-AGI Lab" },
  { href: "/research/space-agi-math", label: "Space-AGI Math" },
  { href: "/recommended-books", label: "Books" },
  { href: "/space-shop", label: "Space Shop" },
  { href: "/privacy-policy", label: "Privacy" },
];

// Sort by date descending so newest is first (content-agent appends to end of array)
const LATEST_POSTS = [...BLOG_POSTS].sort((a, b) => b.date.localeCompare(a.date));

// Build dynamic updates: latest 3 blog posts first, then featured research, then static links
function getTodaysUpdates() {
  const latest = LATEST_POSTS.slice(0, 3).map((p) => ({
    href: `/blog/${p.slug}`,
    label: `🆕 ${p.title.length > 45 ? p.title.slice(0, 42) + "…" : p.title}`,
    desc: p.excerpt.slice(0, 80) + (p.excerpt.length > 80 ? "…" : ""),
    isNew: true,
  }));
  const featuredResearch = [
    { href: "/docs/EMBODIED-AGI-MULTI-GRAVITY-RESEARCH.md", label: "📄 Embodied AGI for Multi-Gravity", desc: "PhD-level research: humanoid robotics, Moon/Mars/zero-G, Space-Ready AGI architecture", isNew: true, external: true },
    { href: "/research/space-agi-math", label: "🧮 Space-AGI Mathematics", desc: "MPC, LQR, Pontryagin, optimal control — graduate-level", isNew: false },
  ];
  const staticLinks = [
    { href: "/space-news", label: "📰 Daily Space News", desc: "NASA, Artemis, SpaceX, James Webb — updated daily", isNew: false },
    { href: "/research/space-agi-lab", label: "🧠 Space-AGI Lab", desc: "5 pillars, autonomous spacecraft, decision intelligence", isNew: false },
    { href: "/learn/quantum-space", label: "⚛ Quantum & Space", desc: "Quantum physics, atomic clocks, GPS, quantum sensors", isNew: false },
    { href: "/blog", label: "📚 All Articles", desc: "Space engineering, AI, formulas — fresh content every day", isNew: false },
    { href: "/space-shop", label: "🛒 Space Shop", desc: "NASA t-shirts, toys, books — verified Amazon", isNew: false },
  ];
  return [...latest, ...featuredResearch, ...staticLinks];
}

const EXPLORE_BY_TOPIC = [
  { href: "/docs/EMBODIED-AGI-MULTI-GRAVITY-RESEARCH.md", icon: "📄", title: "Embodied AGI Research", external: true },
  { href: "/blog/category/space-agi", icon: "🧠", title: "Space AGI" },
  { href: "/blog/category/space-engineering", icon: "⚙️", title: "Space Engineering" },
  { href: "/research/space-agi-lab", icon: "🔬", title: "Space-AGI Lab" },
  { href: "/research/space-agi-math", icon: "🧮", title: "Space-AGI Math" },
  { href: "/learn/quantum-space", icon: "⚛", title: "Quantum & Space" },
  { href: "/ai-in-aerospace", icon: "🤖", title: "AI in Aerospace" },
  { href: "/learn/orbital-mechanics", icon: "🌌", title: "Orbital mechanics" },
  { href: "/formulas-library", icon: "🧮", title: "Formulas & calculators" },
  { href: "/calculators", icon: "📐", title: "Orbit calculator" },
  { href: "/research/future-civilization", icon: "🚀", title: "Future Civilization" },
  { href: "/space-news", icon: "📰", title: "Daily Space News" },
];

export function Home() {
  const [showExplore, setShowExplore] = useState(false);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Today's Updates — top of page, latest posts highlighted */}
      <section className="rounded-xl border-2 p-4 mb-6" style={{ background: "linear-gradient(135deg, var(--bg-card) 0%, rgba(0,217,255,0.06) 100%)", borderColor: "var(--accent-cyan)" }}>
        <h3 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: "var(--accent-cyan)" }}>✨ Latest Updates • New Posts Every 6h • Embodied AGI Research • Space Engineering • AI • Quantum</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {getTodaysUpdates().map((u) => {
            const linkClass = "block p-3 rounded-lg transition hover:opacity-90 relative";
            const linkStyle = { background: u.isNew ? "rgba(0,217,255,0.08)" : "var(--bg-surface)", border: u.isNew ? "1px solid var(--accent-cyan)" : "1px solid var(--border-color)" };
            return (u as { external?: boolean }).external ? (
              <a key={u.href} href={u.href} className={linkClass} style={linkStyle} target="_blank" rel="noopener noreferrer">
                {u.isNew && <span className="absolute top-2 right-2 text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ background: "var(--accent-cyan)", color: "#0f172a" }}>NEW</span>}
                <span className="font-bold text-sm" style={{ color: "var(--accent-cyan)" }}>{u.label} →</span>
                <span className="block text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>{u.desc}</span>
              </a>
            ) : (
              <Link key={u.href} href={u.href}>
                <a className={linkClass} style={linkStyle}>
                  {u.isNew && <span className="absolute top-2 right-2 text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ background: "var(--accent-cyan)", color: "#0f172a" }}>NEW</span>}
                  <span className="font-bold text-sm" style={{ color: "var(--accent-cyan)" }}>{u.label} →</span>
                  <span className="block text-xs mt-0.5" style={{ color: "var(--text-secondary)" }}>{u.desc}</span>
                </a>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Hero — Intelligence for the Space Age */}
      <section className="rounded-2xl px-6 py-8 sm:py-10 text-center mb-8 hero-gradient">
        <p className="text-xs font-medium uppercase tracking-widest text-[var(--accent-cyan)] mb-2">Space Engineering • AI • Quantum • Daily News • Futuristic</p>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2 leading-tight">
          OrbitalSimulatorHub — Intelligence for the Space Age
        </h1>
        <p className="text-base sm:text-lg text-white/90 max-w-xl mx-auto mb-5">
          Space AGI, orbital mechanics, quantum computing in space, aerospace formulas. New posts daily. Everything futuristic and helpful.
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
          <Link href="/research/space-agi-lab">
            <a className="px-5 py-2.5 rounded-xl font-semibold text-sm border-2 transition hover:opacity-95" style={{ borderColor: "var(--accent-cyan)", color: "var(--text-on-accent)" }}>
              🔬 Space-AGI Lab
            </a>
          </Link>
          <a href="/docs/EMBODIED-AGI-MULTI-GRAVITY-RESEARCH.md" className="px-5 py-2.5 rounded-xl font-semibold text-sm border-2 transition hover:opacity-95" style={{ borderColor: "var(--accent-gold)", color: "var(--text-on-accent)" }} target="_blank" rel="noopener noreferrer">
            📄 Embodied AGI Research
          </a>
          <Link href="/ai-in-aerospace">
            <a className="px-5 py-2.5 rounded-xl font-semibold text-sm border-2 transition hover:opacity-95" style={{ borderColor: "var(--accent-pink)", color: "var(--text-on-accent)" }}>
              🚀 AI in Space
            </a>
          </Link>
        </div>
        <p className="text-xs text-slate-400">Trusted by students, engineers, researchers worldwide</p>
        <ShareBar path="/" showRedditSubs />
      </section>

      {/* 5 main features — Simulator, AstroBot, Orbital Mechanics, AI in Space, Space-AGI Lab */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
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

      {/* Featured Research — Embodied AGI + Space-AGI Lab */}
      <section className="rounded-xl border-2 p-4 mb-8" style={{ background: "linear-gradient(135deg, var(--bg-card) 0%, rgba(255,193,7,0.06) 100%)", borderColor: "var(--accent-gold)" }}>
        <h3 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: "var(--accent-gold)" }}>📄 New: Embodied AGI for Multi-Gravity Space</h3>
        <p className="text-sm mb-3" style={{ color: "var(--text-secondary)" }}>
          Publication-level research — Multi-Gravity Intelligence Hypothesis, humanoid robotics for Earth/Moon/Mars/zero-G, physics-grounded AGI architecture. 10,000+ words. PhD + NASA quality.
        </p>
        <div className="flex flex-wrap gap-2">
          <a href="/docs/EMBODIED-AGI-MULTI-GRAVITY-RESEARCH.md" className="px-4 py-2 rounded-lg font-medium text-sm" style={{ background: "var(--accent-gold)", color: "#0f172a" }} target="_blank" rel="noopener noreferrer">Read Full Research →</a>
          <Link href="/research/space-agi-math">
            <a className="px-4 py-2 rounded-lg font-medium text-sm border-2" style={{ borderColor: "var(--accent-gold)", color: "var(--text-on-accent)" }}>Space-AGI Mathematics</a>
          </Link>
          <Link href="/simulator/swarm">
            <a className="px-4 py-2 rounded-lg font-medium text-sm border-2" style={{ borderColor: "var(--accent-gold)", color: "var(--text-on-accent)" }}>Swarm Simulator</a>
          </Link>
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
        <Link href="/research/space-agi-lab">
          <a className="block rounded-xl border-2 p-4 transition hover:shadow-lg hover:scale-[1.02]" style={{ background: "linear-gradient(135deg, var(--bg-card) 0%, rgba(0,217,255,0.08) 100%)", borderColor: "var(--accent-cyan)" }}>
            <h3 className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: "var(--accent-cyan)" }}>🧠 Space-AGI Engineering Lab</h3>
            <p className="text-sm mb-2 font-semibold" style={{ color: "var(--text-primary)" }}>World-First Platform</p>
            <p className="text-xs mb-2" style={{ color: "var(--text-secondary)" }}>5 pillars: autonomous spacecraft, decision intelligence, orbital math, future systems, live simulation lab.</p>
            <span className="text-xs font-medium" style={{ color: "var(--accent-cyan)" }}>Enter Lab →</span>
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
              (t as { external?: boolean }).external ? (
                <a key={t.href} href={t.href} className="flex items-center gap-2 p-2 rounded-lg text-sm transition hover:opacity-80" style={{ background: "var(--bg-surface)" }} target="_blank" rel="noopener noreferrer">
                  <span>{t.icon}</span>
                  <span style={{ color: "var(--text-primary)" }}>{t.title}</span>
                </a>
              ) : (
                <Link key={t.href} href={t.href}>
                  <a className="flex items-center gap-2 p-2 rounded-lg text-sm transition hover:opacity-80" style={{ background: "var(--bg-surface)" }}>
                    <span>{t.icon}</span>
                    <span style={{ color: "var(--text-primary)" }}>{t.title}</span>
                  </a>
                </Link>
              )
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
          <h3 className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: "var(--text-secondary)" }}>📡 Trending: Space Engineering • AI • Quantum • Futuristic</h3>
          <div className="flex flex-wrap gap-2">
            <a href="/docs/EMBODIED-AGI-MULTI-GRAVITY-RESEARCH.md" className="px-2 py-1 rounded text-sm" style={{ background: "var(--bg-surface)", color: "var(--text-primary)" }} target="_blank" rel="noopener noreferrer">Embodied AGI</a>
            <Link href="/blog/category/space-agi"><a className="px-2 py-1 rounded text-sm" style={{ background: "var(--bg-surface)", color: "var(--text-primary)" }}>Space AGI</a></Link>
            <Link href="/blog/category/space-engineering"><a className="px-2 py-1 rounded text-sm" style={{ background: "var(--bg-surface)", color: "var(--text-primary)" }}>Space Engineering</a></Link>
            <Link href="/research/space-agi-math"><a className="px-2 py-1 rounded text-sm" style={{ background: "var(--bg-surface)", color: "var(--text-primary)" }}>Space-AGI Math</a></Link>
            <Link href="/learn/quantum-space"><a className="px-2 py-1 rounded text-sm" style={{ background: "var(--bg-surface)", color: "var(--text-primary)" }}>Quantum Computing</a></Link>
            <Link href="/space-news"><a className="px-2 py-1 rounded text-sm" style={{ background: "var(--bg-surface)", color: "var(--text-primary)" }}>Daily News</a></Link>
            <Link href="/research/future-civilization"><a className="px-2 py-1 rounded text-sm" style={{ background: "var(--bg-surface)", color: "var(--text-primary)" }}>Future Tech</a></Link>
          </div>
        </div>
      </section>

      {/* Blog & News section — Latest posts with images */}
      <section className="rounded-xl border-2 p-6 mb-8" style={{ background: "linear-gradient(135deg, var(--bg-card) 0%, rgba(0,217,255,0.06) 100%)", borderColor: "var(--accent-cyan)" }}>
        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="text-xs font-medium uppercase tracking-widest mb-1" style={{ color: "var(--accent-cyan)" }}>New Posts • Daily News • Space Engineering • AI • Quantum</p>
            <h2 className="font-bold text-lg" style={{ color: "var(--text-primary)" }}>📰 Latest Articles — Fresh Every Day</h2>
          </div>
          <Link href="/blog">
            <a className="px-4 py-2 rounded-lg font-medium text-sm" style={{ background: "var(--accent-cyan)", color: "#0f172a" }}>View all →</a>
          </Link>
        </div>
        <p className="text-sm mb-4" style={{ color: "var(--text-secondary)" }}>
          Space AGI, space engineering formulas, NASA news, quantum physics, AI in space. Everything futuristic and helpful.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {LATEST_POSTS.slice(0, 6).map((post, i) => {
            const isNewest = i === 0;
            return (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <a className="block rounded-xl border-2 overflow-hidden transition hover:shadow-lg hover:scale-[1.02] relative" style={{ background: isNewest ? "rgba(0,217,255,0.06)" : "var(--bg-surface)", borderColor: isNewest ? "var(--accent-cyan)" : "var(--border-color)" }}>
                  {isNewest && <span className="absolute top-2 left-2 z-10 text-xs font-bold px-2 py-0.5 rounded" style={{ background: "var(--accent-cyan)", color: "#0f172a" }}>LATEST</span>}
                  <div className="aspect-video w-full bg-slate-200">
                    <img src={getBlogImage(post)} alt="" className="w-full h-full object-cover" loading="lazy" />
                  </div>
                  <div className="p-4">
                    <span className="text-xs font-medium uppercase tracking-wide" style={{ color: "var(--accent-cyan)" }}>{post.category.replace("-", " ")}</span>
                    <h3 className="font-semibold text-sm mt-1 line-clamp-2" style={{ color: "var(--text-primary)" }}>{post.title}</h3>
                    <p className="text-xs mt-2" style={{ color: "var(--text-muted)" }}>{new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</p>
                  </div>
                </a>
              </Link>
            );
          })}
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          <Link href="/blog/category/space-agi"><a className="text-xs px-2 py-1 rounded" style={{ background: "var(--bg-surface)", color: "var(--text-primary)" }}>Space AGI</a></Link>
          <Link href="/blog/category/space-engineering"><a className="text-xs px-2 py-1 rounded" style={{ background: "var(--bg-surface)", color: "var(--text-primary)" }}>Space Engineering</a></Link>
          <Link href="/blog/category/nasa-news"><a className="text-xs px-2 py-1 rounded" style={{ background: "var(--bg-surface)", color: "var(--text-primary)" }}>NASA News</a></Link>
          <Link href="/blog/category/quantum-physics"><a className="text-xs px-2 py-1 rounded" style={{ background: "var(--bg-surface)", color: "var(--text-primary)" }}>Quantum</a></Link>
          <Link href="/space-news"><a className="text-xs px-2 py-1 rounded" style={{ background: "var(--bg-surface)", color: "var(--text-primary)" }}>Daily News</a></Link>
        </div>
      </section>

      {/* Popular searches — compact */}
      <section className="rounded-xl border p-4 mb-8" style={{ background: "var(--bg-card)", borderColor: "var(--border-color)" }}>
        <h3 className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: "var(--text-secondary)" }}>🔍 Popular: Space Engineering • AI • Quantum • Futuristic</h3>
        <div className="flex flex-wrap gap-2">
          <a href="/docs/EMBODIED-AGI-MULTI-GRAVITY-RESEARCH.md" className="px-2 py-1 rounded text-sm" style={{ background: "var(--bg-surface)", color: "var(--text-primary)" }} target="_blank" rel="noopener noreferrer">Embodied AGI Research</a>
          <Link href="/blog/what-is-space-agi-why-it-matters"><a className="px-2 py-1 rounded text-sm" style={{ background: "var(--bg-surface)", color: "var(--text-primary)" }}>What is Space AGI?</a></Link>
          <Link href="/blog/ai-collision-avoidance-how-500-satellites-avoid-each-other-without-human-input-20260227"><a className="px-2 py-1 rounded text-sm" style={{ background: "var(--bg-surface)", color: "var(--text-primary)" }}>AI collision avoidance</a></Link>
          <Link href="/blog/vis-viva-equation-explained-master-formula-orbits"><a className="px-2 py-1 rounded text-sm" style={{ background: "var(--bg-surface)", color: "var(--text-primary)" }}>Vis-viva equation</a></Link>
          <Link href="/research/space-agi-math"><a className="px-2 py-1 rounded text-sm" style={{ background: "var(--bg-surface)", color: "var(--text-primary)" }}>Space-AGI Math</a></Link>
          <Link href="/calculators"><a className="px-2 py-1 rounded text-sm" style={{ background: "var(--bg-surface)", color: "var(--text-primary)" }}>How fast does ISS orbit?</a></Link>
          <Link href="/learn/quantum-space"><a className="px-2 py-1 rounded text-sm" style={{ background: "var(--bg-surface)", color: "var(--text-primary)" }}>Quantum in space</a></Link>
          <Link href="/simulator"><a className="px-2 py-1 rounded text-sm" style={{ background: "var(--bg-surface)", color: "var(--text-primary)" }}>Orbit simulator</a></Link>
        </div>
      </section>

      {/* Advanced Research — Space Engineering • AI • Quantum */}
      <section className="rounded-xl border p-4 mb-8" style={{ background: "var(--bg-card)", borderColor: "var(--border-color)" }}>
        <h3 className="text-sm font-bold uppercase tracking-wider mb-2" style={{ color: "var(--text-secondary)" }}>📚 Space Engineering • AI • Quantum • Futuristic</h3>
        <div className="flex flex-wrap gap-2 mb-4">
          <a href="/docs/EMBODIED-AGI-MULTI-GRAVITY-RESEARCH.md" className="px-2 py-1 rounded text-sm" style={{ background: "var(--bg-surface)", color: "var(--text-primary)" }} target="_blank" rel="noopener noreferrer">Embodied AGI Research</a>
          <Link href="/blog/category/space-engineering"><a className="px-2 py-1 rounded text-sm" style={{ background: "var(--bg-surface)", color: "var(--text-primary)" }}>Space Engineering</a></Link>
          <Link href="/blog/category/space-agi"><a className="px-2 py-1 rounded text-sm" style={{ background: "var(--bg-surface)", color: "var(--text-primary)" }}>Space AGI</a></Link>
          <Link href="/research/space-agi-math"><a className="px-2 py-1 rounded text-sm" style={{ background: "var(--bg-surface)", color: "var(--text-primary)" }}>Space-AGI Math</a></Link>
          <Link href="/formulas-library"><a className="px-2 py-1 rounded text-sm" style={{ background: "var(--bg-surface)", color: "var(--text-primary)" }}>Orbital formulas</a></Link>
          <Link href="/learn/quantum-space"><a className="px-2 py-1 rounded text-sm" style={{ background: "var(--bg-surface)", color: "var(--text-primary)" }}>Quantum computing</a></Link>
          <Link href="/ai-in-aerospace"><a className="px-2 py-1 rounded text-sm" style={{ background: "var(--bg-surface)", color: "var(--text-primary)" }}>AI in space</a></Link>
          <Link href="/research/future-civilization"><a className="px-2 py-1 rounded text-sm" style={{ background: "var(--bg-surface)", color: "var(--text-primary)" }}>Future tech</a></Link>
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
