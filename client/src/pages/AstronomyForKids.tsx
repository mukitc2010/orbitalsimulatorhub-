import { Link } from "wouter";

export function AstronomyForKids() {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="headline">Astronomy for Kids – Space Made Fun</h1>
        <p className="subhead">
          Simple, fun explanations of the Solar System, stars, astronauts, and how we explore space. Perfect for kids and families.
        </p>
      </div>

      <div className="rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 p-6 space-y-4">
        <h2 className="text-xl font-bold text-slate-800">🌟 What is astronomy?</h2>
        <p className="text-slate-700">
          Astronomy is the study of everything in space: the Sun, Moon, planets, stars, and galaxies. We use telescopes on Earth and in space (like Hubble and James Webb) to see far away. Kids can start by learning the Moon, the planets, and how astronauts live in space!
        </p>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <Link href="/play">
          <a className="block p-5 rounded-xl border-2 border-[var(--accent-pink)] bg-[var(--accent-pink)]/10 hover:shadow-md transition">
            <span className="text-2xl mb-2 block">🪐</span>
            <h3 className="font-bold text-slate-800 mb-1">Play &amp; Learn</h3>
            <p className="text-sm text-slate-600">Solar system, NASA, astronauts, rovers — fun cards and activities.</p>
          </a>
        </Link>
        <Link href="/learn/what-is-moon">
          <a className="block p-5 rounded-xl border-2 border-[var(--accent-cyan)] bg-[var(--accent-cyan)]/10 hover:shadow-md transition">
            <span className="text-2xl mb-2 block">🌙</span>
            <h3 className="font-bold text-slate-800 mb-1">What is the Moon?</h3>
            <p className="text-sm text-slate-600">Facts about the Moon, phases, tides, and NASA missions.</p>
          </a>
        </Link>
        <Link href="/learn/how-solar-system-works">
          <a className="block p-5 rounded-xl border-2 border-[var(--accent-gold)] bg-[var(--accent-gold)]/10 hover:shadow-md transition">
            <span className="text-2xl mb-2 block">🌍</span>
            <h3 className="font-bold text-slate-800 mb-1">How the Solar System Works</h3>
            <p className="text-sm text-slate-600">Planets, orbits, and gravity — explained simply.</p>
          </a>
        </Link>
        <Link href="/simulator">
          <a className="block p-5 rounded-xl border-2 border-[var(--accent-cyan)] bg-[var(--accent-cyan)]/10 hover:shadow-md transition">
            <span className="text-2xl mb-2 block">🛸</span>
            <h3 className="font-bold text-slate-800 mb-1">3D Orbit Simulator</h3>
            <p className="text-sm text-slate-600">Add satellites and watch them orbit Earth. No sign-up.</p>
          </a>
        </Link>
      </div>

      <div className="rounded-xl bg-slate-50 border border-slate-200 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-2">🤖 Ask AstroBot</h2>
        <p className="text-slate-700 mb-4">Kids can ask anything about space: Why is the sky blue? How do rockets work? What do astronauts eat? <Link href="/astrobot"><a className="text-[var(--accent-cyan)] hover:underline font-medium">Try AstroBot →</a></Link></p>
      </div>
    </div>
  );
}
