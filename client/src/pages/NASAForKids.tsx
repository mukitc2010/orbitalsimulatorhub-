import { Link } from "wouter";

/**
 * NASA for kids — hub page targeting "NASA for kids" keyword.
 * Links to all kid-friendly space content.
 */
export function NASAForKids() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="headline">NASA for Kids – Space Learning Made Fun</h1>
        <p className="subhead">
          NASA for kids: learn about astronauts, the Moon, Mars rovers, the Solar System, and how we explore space. Free games, quizzes, and activities for kids and families.
        </p>
      </div>

      <div className="rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 p-6">
        <h2 className="text-xl font-bold text-slate-800 mb-2">What is NASA?</h2>
        <p className="text-slate-700 mb-4">
          NASA is the space agency that sends astronauts to space, rovers to Mars, and telescopes to look at the stars. Kids can learn about the Moon landing, the International Space Station, and how rockets work — all in simple, fun ways.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Link href="/play">
          <a className="block p-5 rounded-xl border-2 border-[var(--accent-pink)] bg-[var(--accent-pink)]/10 hover:shadow-md transition">
            <span className="text-2xl mb-2 block">🪐</span>
            <h3 className="font-bold text-slate-800 mb-1">Play &amp; Learn NASA</h3>
            <p className="text-sm text-slate-600">Solar system, astronauts, rovers, Moon — fun cards for kids.</p>
          </a>
        </Link>
        <Link href="/learn/astronomy-for-kids">
          <a className="block p-5 rounded-xl border-2 border-[var(--accent-cyan)] bg-[var(--accent-cyan)]/10 hover:shadow-md transition">
            <span className="text-2xl mb-2 block">🌟</span>
            <h3 className="font-bold text-slate-800 mb-1">Astronomy for Kids</h3>
            <p className="text-sm text-slate-600">Stars, planets, Moon, and space — explained for kids.</p>
          </a>
        </Link>
        <Link href="/learn/what-is-moon">
          <a className="block p-5 rounded-xl border-2 border-[var(--accent-gold)] bg-[var(--accent-gold)]/10 hover:shadow-md transition">
            <span className="text-2xl mb-2 block">🌙</span>
            <h3 className="font-bold text-slate-800 mb-1">What is the Moon?</h3>
            <p className="text-sm text-slate-600">Moon phases, tides, and NASA Moon missions.</p>
          </a>
        </Link>
        <Link href="/simulator">
          <a className="block p-5 rounded-xl border-2 border-[var(--accent-cyan)] bg-[var(--accent-cyan)]/10 hover:shadow-md transition">
            <span className="text-2xl mb-2 block">🛸</span>
            <h3 className="font-bold text-slate-800 mb-1">3D Orbit Simulator</h3>
            <p className="text-sm text-slate-600">Add satellites and watch them orbit Earth. No sign-up.</p>
          </a>
        </Link>
        <Link href="/learn/how-solar-system-works">
          <a className="block p-5 rounded-xl border-2 border-slate-200 bg-white hover:border-[var(--accent-cyan)] hover:shadow-md transition">
            <span className="text-2xl mb-2 block">🌍</span>
            <h3 className="font-bold text-slate-800 mb-1">How the Solar System Works</h3>
            <p className="text-sm text-slate-600">Planets, orbits, and gravity for kids.</p>
          </a>
        </Link>
        <Link href="/astrobot">
          <a className="block p-5 rounded-xl border-2 border-slate-200 bg-white hover:border-[var(--accent-cyan)] hover:shadow-md transition">
            <span className="text-2xl mb-2 block">🤖</span>
            <h3 className="font-bold text-slate-800 mb-1">Ask AstroBot</h3>
            <p className="text-sm text-slate-600">Ask anything about space — great for curious kids!</p>
          </a>
        </Link>
      </div>

      <div className="rounded-xl bg-slate-50 border border-slate-200 p-5">
        <h2 className="text-lg font-bold text-slate-800 mb-2">Space quiz for kids</h2>
        <p className="text-slate-700 mb-3">Test what you learned: <Link href="/space-quiz"><a className="text-[var(--accent-cyan)] hover:underline font-medium">Space quiz →</a></Link></p>
      </div>
    </div>
  );
}
