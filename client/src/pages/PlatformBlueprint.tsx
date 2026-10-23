import { Link } from "wouter";

// Keep these two lists honest: `pillars` must match package.json / requirements.txt.
// Anything not yet installed belongs in `roadmap`, not here.
const pillars = [
  { title: "Frontend", points: ["React 19 + TypeScript + Vite", "Three.js + React Three Fiber", "Tailwind CSS 3", "Wouter routing"] },
  { title: "Backend", points: ["Express 4 + tRPC 11", "FastAPI swarm service", "numpy / scipy / osqp solvers"] },
  { title: "Data", points: ["MySQL 2", "Drizzle ORM + drizzle-kit migrations"] },
  { title: "Learning", points: ["AstroBot Q&A", "Orbital simulator", "Formulas, quizzes, and mission tutorials"] },
];

const roadmap = [
  { title: "Platform", points: ["Supabase + PostgreSQL", "Redis caching", "Docker packaging"] },
  { title: "AI", points: ["Vendor AI SDK integration", "News, research, and mission-planning agents", "Voice and image understanding"] },
  { title: "Security", points: ["RBAC + encryption at rest", "Audit logging", "Rate limiting"] },
  { title: "Commercial", points: ["Stripe subscriptions", "Admin analytics", "Multi-region backups"] },
];

// `href` is set only for modules that actually have a route in App.tsx.
const modules = [
  { name: "Astronomy academy", href: "/learn/astrophysics" },
  { name: "Orbital simulator", href: "/simulator" },
  { name: "Swarm simulator", href: "/simulator/swarm" },
  { name: "Mission explorer", href: "/missions" },
  { name: "Planet hub", href: "/planets" },
  { name: "Research library", href: "/research" },
  { name: "Rocket builder", href: null },
  { name: "Community and gamification", href: null },
  { name: "Premium subscriptions", href: null },
];

export function PlatformBlueprint() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6 py-2">
      <section className="rounded-[30px] border border-cyan-400/30 bg-slate-950/80 p-8 shadow-[0_20px_80px_rgba(0,217,255,0.16)]">
        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-cyan-300">Orbitalsimulatorhub platform blueprint</p>
        <h1 className="mt-3 text-3xl font-black text-white sm:text-4xl">
          Production-grade architecture for a premium space intelligence platform.
        </h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-300">
          This blueprint separates what is running today from what is planned, so the architecture stays an honest map of the platform rather than a wish list.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/">
            <a className="rounded-full bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-slate-950">Back to home</a>
          </Link>
          <Link href="/simulator">
            <a className="rounded-full border border-cyan-400/40 px-5 py-2.5 text-sm font-semibold text-cyan-200">Open simulator</a>
          </Link>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white">Running today</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="rounded-[24px] border border-white/10 bg-slate-900/70 p-5 backdrop-blur">
              <h3 className="text-lg font-semibold text-white">{pillar.title}</h3>
              <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-300">
                {pillar.points.map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <span className="mt-2 h-2 w-2 rounded-full bg-cyan-400" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-white">
          Planned <span className="text-sm font-normal text-slate-400">— not yet implemented</span>
        </h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {roadmap.map((pillar) => (
            <div key={pillar.title} className="rounded-[24px] border border-dashed border-white/10 bg-slate-900/40 p-5 backdrop-blur">
              <h3 className="text-lg font-semibold text-slate-200">{pillar.title}</h3>
              <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-400">
                {pillar.points.map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <span className="mt-2 h-2 w-2 rounded-full border border-fuchsia-400/60" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-[24px] border border-white/10 bg-slate-900/70 p-6 backdrop-blur">
        <h2 className="text-xl font-semibold text-white">Core modules</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {modules.map((module) =>
            module.href ? (
              <Link key={module.name} href={module.href}>
                <a className="rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-slate-200 transition hover:border-cyan-400/40 hover:text-white">
                  {module.name}
                </a>
              </Link>
            ) : (
              <div
                key={module.name}
                className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-3 text-sm text-slate-400"
              >
                {module.name}
                <span className="mt-1 block text-[10px] uppercase tracking-[0.2em] text-fuchsia-300">Planned</span>
              </div>
            )
          )}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="rounded-[24px] border border-white/10 bg-slate-900/70 p-6 backdrop-blur">
          <h2 className="text-xl font-semibold text-white">
            Proposed database schema <span className="text-sm font-normal text-slate-400">— target design</span>
          </h2>
          <pre className="mt-4 overflow-x-auto rounded-2xl border border-white/10 bg-slate-950/80 p-4 text-sm leading-7 text-cyan-200">
{`users
  id, email, role, plan, xp, credits
courses
  id, slug, title, category, lessons
lessons
  id, course_id, title, video_url, duration
simulations
  id, user_id, scenario, status, metrics
missions
  id, user_id, title, status, telemetry
news_items
  id, source, title, published_at, tags
community_posts
  id, author_id, title, body, visibility`}
          </pre>
        </div>
        <div className="rounded-[24px] border border-white/10 bg-slate-900/70 p-6 backdrop-blur">
          <h2 className="text-xl font-semibold text-white">
            Planned API surface <span className="text-sm font-normal text-slate-400">— target endpoints</span>
          </h2>
          <ul className="mt-4 space-y-3 text-sm leading-7 text-slate-300">
            <li>POST /api/astrobot/chat for voice and text sessions</li>
            <li>POST /api/simulations/launch for orbital scenarios</li>
            <li>GET /api/news/live for NASA/ESA/SpaceX aggregation</li>
            <li>POST /api/checkout/subscription for Stripe-powered plans</li>
            <li>GET /api/analytics/overview for admin dashboards</li>
          </ul>
        </div>
      </section>

      <section className="rounded-[24px] border border-white/10 bg-slate-900/70 p-6 backdrop-blur">
        <h2 className="text-xl font-semibold text-white">Security and delivery</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
            <span className="mb-1 block text-xs uppercase tracking-[0.2em] text-cyan-300">Live</span>
            GitHub Actions CI/CD, Vercel deployments, automated SEO and RSS generation
          </div>
          <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-4 text-sm text-slate-400">
            <span className="mb-1 block text-xs uppercase tracking-[0.2em] text-fuchsia-300">Planned</span>
            OWASP controls, rate limiting, RBAC, audit logging
          </div>
          <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-4 text-sm text-slate-400">
            <span className="mb-1 block text-xs uppercase tracking-[0.2em] text-fuchsia-300">Planned</span>
            Lighthouse budgets, image optimization, server-side streaming
          </div>
        </div>
      </section>
    </div>
  );
}
