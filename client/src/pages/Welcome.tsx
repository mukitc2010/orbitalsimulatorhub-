import { Link } from "wouter";

export function Welcome() {
  return (
    <div className="max-w-2xl mx-auto">
      <section className="hero-gradient rounded-2xl px-6 py-10 text-center mb-8">
        <h1 className="headline mb-3 text-white">Welcome to Orbital Simulator Hub</h1>
        <p className="text-lg text-white/95 max-w-xl mx-auto mb-4">
          Your global space research & community hub. Learn, explore, and connect.
        </p>
        <p className="text-sm text-slate-300 max-w-lg mx-auto">
          Explore educational content about aerospace, quantum physics, orbital mechanics, and the future of space — updated daily.
        </p>
      </section>

      <section className="rounded-xl border-2 border-[var(--accent-cyan)]/40 bg-white p-6 mb-6">
        <h2 className="text-lg font-bold text-slate-800 mb-4">🚀 Explore the platform</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          <Link href="/simulator" className="block p-4 rounded-lg border border-slate-200 hover:border-[var(--accent-cyan)] hover:shadow-sm transition">
              <span className="text-xl">🛸</span>
              <h3 className="font-semibold text-slate-800 mt-1">3D Simulator</h3>
              <p className="text-sm text-slate-600">Add LEO, MEO, GEO satellites and watch orbits in real time.</p>
            </Link>
          <Link href="/astrobot" className="block p-4 rounded-lg border border-slate-200 hover:border-[var(--accent-cyan)] hover:shadow-sm transition">
              <span className="text-xl">🤖</span>
              <h3 className="font-semibold text-slate-800 mt-1">Ask AstroBot</h3>
              <p className="text-sm text-slate-600">Get answers about space, orbits, satellites, and rockets.</p>
            </Link>
          <Link href="/blog" className="block p-4 rounded-lg border border-slate-200 hover:border-[var(--accent-cyan)] hover:shadow-sm transition">
              <span className="text-xl">📰</span>
              <h3 className="font-semibold text-slate-800 mt-1">Space Blog</h3>
              <p className="text-sm text-slate-600">Daily space news, facts, tutorials, and astronomy lessons.</p>
            </Link>
          <Link href="/research" className="block p-4 rounded-lg border border-slate-200 hover:border-[var(--accent-cyan)] hover:shadow-sm transition">
              <span className="text-xl">📚</span>
              <h3 className="font-semibold text-slate-800 mt-1">Research Hub</h3>
              <p className="text-sm text-slate-600">Future civilization, next 100 years, AI in aerospace.</p>
            </Link>
          <Link href="/astronauts" className="block p-4 rounded-lg border border-slate-200 hover:border-[var(--accent-cyan)] hover:shadow-sm transition">
              <span className="text-xl">👨‍🚀</span>
              <h3 className="font-semibold text-slate-800 mt-1">Astronaut Database</h3>
              <p className="text-sm text-slate-600">500+ astronaut profiles with missions and achievements.</p>
            </Link>
          <Link href="/planets" className="block p-4 rounded-lg border border-slate-200 hover:border-[var(--accent-cyan)] hover:shadow-sm transition">
              <span className="text-xl">🪐</span>
              <h3 className="font-semibold text-slate-800 mt-1">Planet Explorer</h3>
              <p className="text-sm text-slate-600">All 8 planets with real mission data and exploration.</p>
            </Link>
        </div>
      </section>

      <section className="rounded-xl border-2 border-[var(--accent-pink)]/30 bg-gradient-to-br from-slate-50 to-pink-50/30 p-6 mb-8 text-center">
        <h2 className="text-lg font-bold text-slate-800 mb-2">🌐 Community hub</h2>
        <p className="text-sm text-slate-600 mb-4">
          Connect with fellow space enthusiasts. Share ideas, ask questions, and explore together.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/blog" className="px-4 py-2 rounded-full text-sm font-medium bg-white border border-slate-200 hover:border-[var(--accent-pink)] hover:bg-pink-50/50 transition">
              📰 Space Blog
            </Link>
          <Link href="/space-news" className="px-4 py-2 rounded-full text-sm font-medium bg-white border border-slate-200 hover:border-[var(--accent-pink)] hover:bg-pink-50/50 transition">
              Space News
            </Link>
          <Link href="/research" className="px-4 py-2 rounded-full text-sm font-medium bg-white border border-slate-200 hover:border-[var(--accent-pink)] hover:bg-pink-50/50 transition">
              Research
            </Link>
          <Link href="/" className="px-4 py-2 rounded-full text-sm font-medium bg-white border border-slate-200 hover:border-[var(--accent-pink)] hover:bg-pink-50/50 transition">
              ← Back to Home
            </Link>
        </div>
      </section>
    </div>
  );
}
