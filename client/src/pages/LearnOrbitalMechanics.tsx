import { useState } from "react";
import { Link } from "wouter";

const TABS = ["kids", "beginner", "engineer"] as const;

const KIDS = (
  <div className="space-y-4 text-slate-700">
    <p><strong>What is an orbit?</strong> An orbit is the path something takes around Earth (or the Sun). The Moon orbits Earth. Satellites orbit Earth too!</p>
    <p><strong>Why don&apos;t satellites fall?</strong> They are going so fast sideways that they keep &quot;missing&quot; Earth. Gravity pulls them toward Earth, but they zoom around the curve. So they go in a circle (or oval) and don&apos;t crash.</p>
    <p><strong>What is gravity?</strong> Gravity is what pulls you down to the ground. Earth has gravity. It also pulls on the Moon and on satellites — that&apos;s why they go in a circle instead of flying away.</p>
    <p><strong>How does space work?</strong> In space there&apos;s almost no air. Rockets push satellites up. Then the satellite keeps going around Earth until something slows it down (like a little bit of air way up high, after a long time).</p>
    <p className="text-sm text-[var(--accent-cyan)]"><Link href="/simulator">Try the simulator →</Link> Add a satellite and press Play!</p>
  </div>
);

const BEGINNER = (
  <div className="space-y-4 text-slate-700">
    <p><strong>What is orbital mechanics?</strong> It&apos;s the science of how objects move in space under gravity — satellites, the Moon, planets. We use math (and computers) to predict where they will be.</p>
    <p><strong>What is an orbit?</strong> An orbit is a repeating path around a central body. For Earth satellites, the orbit is an ellipse (or circle) with Earth at one focus. The satellite has enough speed so that gravity bends its path into a closed loop.</p>
    <p><strong>Why don&apos;t satellites fall?</strong> They have high horizontal velocity. Gravity pulls them toward Earth, but because they move sideways so fast, they keep falling &quot;around&quot; Earth rather than into it. The balance between speed and gravity gives a stable orbit.</p>
    <p><strong>Gravity vs velocity:</strong> Too slow → the satellite falls back (or crashes). Too fast → it escapes. Just right → circular or elliptical orbit. The formula for circular orbital speed is v = √(μ/r).</p>
    <p><strong>How does space work?</strong> In space we use the same physics as on Earth: Newton&apos;s laws and gravity. There&apos;s no air, so no drag (except very low in LEO). We use thrust to change orbits and position.</p>
    <p className="text-sm"><Link href="/simulator" className="text-[var(--accent-cyan)] hover:underline">Simulator</Link> · <Link href="/formulas-library" className="text-[var(--accent-cyan)] hover:underline">Formulas</Link> · <Link href="/learn/newton" className="text-[var(--accent-cyan)] hover:underline">Newton&apos;s laws</Link></p>
  </div>
);

const ENGINEER = (
  <div className="space-y-4 text-slate-700 text-sm">
    <p><strong>Orbital mechanics</strong> is the application of the two-body problem (and perturbations) to spacecraft and natural bodies. We use Keplerian elements or state vectors (position, velocity) in an inertial frame (e.g. ECI) and propagate with F = −μr/r³ (point-mass gravity) or higher-fidelity models (J2, drag, SRP, third body).</p>
    <p><strong>Orbit:</strong> Trajectory of a mass under an inverse-square central force. Closed orbits are ellipses (circle if e=0); energy E = v²/2 − μ/r &lt; 0. Open trajectories (parabola, hyperbola) for escape or flyby.</p>
    <p><strong>Why satellites don&apos;t fall:</strong> Centripetal acceleration required for circular motion is a = v²/r. Gravitational acceleration is μ/r². Setting v²/r = μ/r² gives v = √(μ/r). So at that speed, gravity provides exactly the centripetal force and the orbit is circular. For ellipses, the vis-viva equation v² = μ(2/r − 1/a) holds.</p>
    <p><strong>Gravity vs velocity:</strong> Specific orbital energy E = v²/2 − μ/r. For E &lt; 0, orbit is closed (ellipse). For E = 0, parabola (escape). For E &gt; 0, hyperbola. Velocity vector tangent to the path; magnitude and direction determine a, e, and orientation (i, Ω, ω).</p>
    <p><strong>Reference:</strong> Vallado, <em>Fundamentals of Astrodynamics and Applications</em>; Battin; JPL Horizons and NAIF SPICE for ephemerides and frames.</p>
    <p className="text-sm"><Link href="/learn/aerospace" className="text-[var(--accent-cyan)] hover:underline">Aerospace reference</Link> · <Link href="/learn/aerospace#algorithms" className="text-[var(--accent-cyan)] hover:underline">Algorithms</Link> · <Link href="/formulas-library" className="text-[var(--accent-cyan)] hover:underline">Formula library</Link></p>
  </div>
);

const CONTENT = { kids: KIDS, beginner: BEGINNER, engineer: ENGINEER };

export function LearnOrbitalMechanics() {
  const [tab, setTab] = useState<typeof TABS[number]>("beginner");
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h1 className="headline">What is Orbital Mechanics?</h1>
        <p className="subhead">
          Learn why satellites orbit Earth, how gravity and velocity work in space, and how we predict motion. Pick your level below.
        </p>
      </div>

      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-2">
        {TABS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg font-medium capitalize ${tab === t ? "bg-[var(--accent-cyan)] text-[#0f172a]" : "bg-slate-100 text-slate-700 hover:bg-slate-200"}`}
          >
            {t === "kids" ? "Kids" : t === "beginner" ? "Beginner" : "Engineer"}
          </button>
        ))}
      </div>

      <section className="rounded-xl border-2 border-[var(--accent-cyan)]/50 bg-white p-6 shadow-sm">
        {CONTENT[tab]}
      </section>

      <p className="text-center text-sm text-slate-600">
        <Link href="/simulator" className="text-[var(--accent-cyan)] hover:underline">3D orbit simulator</Link>
        {" · "}
        <Link href="/learn/space-questions" className="text-[var(--accent-cyan)] hover:underline">Why satellites don&apos;t fall &amp; more</Link>
      </p>
    </div>
  );
}
