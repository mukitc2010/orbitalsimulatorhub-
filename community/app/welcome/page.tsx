import Link from 'next/link';
import { PublicNav } from '@/components/PublicNav';
import { getDailyContent } from '@/lib/content';

const MAIN_SITE = 'https://www.orbitalsimulatorhub.com';

const TOPICS = [
  { icon: '🚀', title: 'Aerospace Engineering', desc: 'Rocket propulsion, spacecraft design, launch systems, and the engineering behind getting to orbit.', href: `${MAIN_SITE}/learn/how-nasa-launches-satellite` },
  { icon: '✈️', title: 'Aerodynamics', desc: 'Lift, drag, re-entry heating, hypersonic flow, and how NASA designs efficient vehicles for atmosphere and space.', href: `${MAIN_SITE}/learn/aerodynamics` },
  { icon: '⚛️', title: 'Quantum Physics', desc: 'Wave-particle duality, uncertainty principle, atomic clocks, quantum sensors, and how NASA uses quantum tech.', href: `${MAIN_SITE}/learn/quantum-physics` },
  { icon: '🌌', title: 'Orbital Mechanics', desc: "Kepler's laws, Hohmann transfers, escape velocity — the math and physics of how objects move in space.", href: `${MAIN_SITE}/learn/orbital-mechanics` },
  { icon: '🛰️', title: 'Satellites & GPS', desc: 'LEO, MEO, GEO orbits explained. How GPS works, Starlink, weather satellites, and communication networks.', href: `${MAIN_SITE}/learn/how-satellites-work` },
  { icon: '⭐', title: 'Astrophysics', desc: 'Stars, black holes, dark matter, exoplanets, cosmology — the physics of the universe at the largest scales.', href: `${MAIN_SITE}/learn/astrophysics` },
];

const ICON_MAP: Record<string, string> = {
  plane: '✈️',
  atom: '⚛️',
  rocket: '🚀',
};

export default function WelcomePage() {
  const content = getDailyContent();

  return (
    <div className="min-h-screen bg-app">
      <PublicNav />

      {/* Hero */}
      <section className="relative overflow-hidden px-4 py-20 sm:py-28">
        <div
          className="absolute inset-0 opacity-40"
          style={{ background: 'var(--hero-gradient)', filter: 'blur(80px)' }}
        />
        <div className="relative mx-auto max-w-3xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-app sm:text-5xl">
            Explore Aerospace, Quantum Physics, and Beyond
          </h1>
          <p className="mt-4 text-lg text-muted">
            Learn orbital mechanics, aerodynamics, quantum physics, and NASA science.
            Free educational content updated daily for students, engineers, and researchers.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`${MAIN_SITE}/simulator`}
              className="rounded-lg bg-primary px-6 py-3 font-semibold text-app hover:opacity-90"
            >
              Open 3D Simulator
            </a>
            <a
              href="#topics"
              className="rounded-lg border border-app bg-card px-6 py-3 font-medium text-app hover:bg-card-hover"
            >
              Explore Topics
            </a>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-t border-app bg-card/50 px-4 py-6">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-8 text-center text-sm text-muted">
          <span><strong className="text-app">30+</strong> learning topics</span>
          <span><strong className="text-app">Daily</strong> new content</span>
          <span><strong className="text-app">Free</strong> for everyone</span>
          <span><strong className="text-app">NASA-grade</strong> physics</span>
        </div>
      </section>

      {/* Featured Article */}
      <section className="px-4 py-12">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-xl border border-app bg-card p-6">
            <p className="text-xs font-medium uppercase tracking-wider text-primary mb-2">Featured Article</p>
            <h2 className="text-xl font-bold text-app">{content.featured_article.title}</h2>
            <p className="mt-2 text-muted leading-relaxed">{content.featured_article.excerpt}</p>
            <a
              href={content.featured_article.read_more_url}
              className="mt-4 inline-block rounded-lg bg-primary px-4 py-2 text-sm font-medium text-app hover:opacity-90"
            >
              Read full article
            </a>
          </div>
        </div>
      </section>

      {/* Topic Cards */}
      <section id="topics" className="border-t border-app px-4 py-12">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold text-app text-center">Learn by Topic</h2>
          <p className="mt-2 text-center text-muted">Deep dives into the science and engineering of space.</p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {TOPICS.map((t) => (
              <a
                key={t.title}
                href={t.href}
                className="group rounded-xl border border-app bg-card p-5 transition hover:bg-card-hover hover:border-primary"
              >
                <span className="text-3xl block mb-3">{t.icon}</span>
                <h3 className="font-semibold text-app group-hover:text-primary transition">{t.title}</h3>
                <p className="mt-1 text-sm text-muted leading-relaxed">{t.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Did You Know */}
      <section className="border-t border-app bg-card/30 px-4 py-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-xs font-bold uppercase tracking-wider text-primary mb-3">Did You Know?</p>
          <p className="text-lg text-app leading-relaxed">{content.did_you_know}</p>
        </div>
      </section>

      {/* Topic Highlights */}
      <section className="border-t border-app px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-xl font-bold text-app">Today&apos;s Highlights</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {content.topic_highlights.map((h) => (
              <div key={h.title} className="rounded-xl border border-app bg-card p-5">
                <span className="text-2xl block mb-2">{ICON_MAP[h.icon] || '🔬'}</span>
                <h3 className="font-semibold text-app text-sm">{h.title}</h3>
                <p className="mt-1 text-xs text-muted leading-relaxed">{h.blurb}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Blog Posts */}
      <section className="border-t border-app px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-app">Latest from the Blog</h2>
            <a href={`${MAIN_SITE}/blog`} className="text-sm text-primary hover:underline">
              View all posts
            </a>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            {content.latest_posts.map((post) => (
              <a
                key={post.slug}
                href={`${MAIN_SITE}/blog/${post.slug}`}
                className="group rounded-xl border border-app bg-card p-5 transition hover:bg-card-hover"
              >
                <span className="text-xs font-medium uppercase tracking-wider text-primary">{post.category}</span>
                <h3 className="mt-1 font-semibold text-app text-sm group-hover:text-primary transition">{post.title}</h3>
                <p className="mt-1 text-xs text-muted">{post.excerpt}</p>
                <p className="mt-2 text-xs text-muted">{post.date}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Paths */}
      <section className="border-t border-app bg-card/30 px-4 py-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-xl font-bold text-app text-center">Learning Paths</h2>
          <p className="mt-2 text-center text-muted">Pick your level and start exploring.</p>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {(['beginner', 'intermediate', 'advanced'] as const).map((level) => (
              <div key={level} className="rounded-xl border border-app bg-card p-5">
                <h3 className="font-bold text-app capitalize mb-3">
                  {level === 'beginner' ? '🟢' : level === 'intermediate' ? '🟡' : '🔴'} {level}
                </h3>
                <ul className="space-y-2">
                  {content.learning_paths[level].map((topic) => (
                    <li key={topic} className="text-sm text-muted flex items-start gap-2">
                      <span className="text-primary mt-0.5">&#8250;</span>
                      {topic}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA to main site */}
      <section className="border-t border-app px-4 py-12">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-xl font-bold text-app">Ready to explore?</h2>
          <p className="mt-2 text-muted">Run simulations, ask AstroBot, and dive deeper on the main site.</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`${MAIN_SITE}/simulator`}
              className="rounded-lg bg-primary px-6 py-3 font-semibold text-app hover:opacity-90"
            >
              Open Simulator
            </a>
            <a
              href={`${MAIN_SITE}/astrobot`}
              className="rounded-lg border border-app bg-card px-6 py-3 font-medium text-app hover:bg-card-hover"
            >
              Ask AstroBot
            </a>
            <a
              href={`${MAIN_SITE}/blog`}
              className="rounded-lg border border-app bg-card px-6 py-3 font-medium text-app hover:bg-card-hover"
            >
              Read the Blog
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-app px-4 py-8">
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-4 text-sm text-muted">
          <span>Orbital Simulator Hub</span>
          <div className="flex gap-6">
            <a href={MAIN_SITE} className="hover:text-app">Main site</a>
            <Link href="/privacy" className="hover:text-app">Privacy</Link>
            <Link href="/guidelines" className="hover:text-app">Guidelines</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
