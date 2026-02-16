import { useState } from "react";
import { Link } from "wouter";

const MU_KM = 398600.4418;
const R_EARTH_KM = 6371;
const G_SI = 6.674e-11;
const M_EARTH_KG = 5.972e24;

export function FormulaLibrary() {
  return (
    <div className="max-w-4xl mx-auto space-y-12">
      <div>
        <h1 className="headline">Space & Orbital Mechanics Formula Library</h1>
        <p className="subhead">
          All the formulas you need: Newton&apos;s gravity, orbital velocity, escape velocity, orbital period, Kepler&apos;s laws, and the rocket equation. With explanations, real examples, and interactive calculators.
        </p>
      </div>

      <FormulaBlock
        title="Newton's law of gravity"
        formula="F = G × m₁ × m₂ / r²"
        explain="The force of gravity between two masses is proportional to the product of the masses and inversely proportional to the square of the distance between them."
        example="Earth pulling the ISS: m₁ = Earth mass, m₂ = ISS mass, r = distance from Earth center (~6771 km)."
      >
        <GravityCalculator />
      </FormulaBlock>

      <FormulaBlock
        title="Orbital velocity (circular orbit)"
        formula="v = √(μ/r) = √(GM/r)"
        explain="Speed needed to stay in a circular orbit at distance r from the center. In km/s use μ = 398600 km³/s² for Earth."
        example="ISS at ~400 km altitude: r ≈ 6771 km → v ≈ 7.66 km/s."
      >
        <OrbitVelocityCalculator />
      </FormulaBlock>

      <FormulaBlock
        title="Escape velocity"
        formula="v_esc = √(2GM/r) = √(2μ/r)"
        explain="Minimum speed to escape the gravitational pull of a body (no thrust after launch)."
        example="From Earth surface: v_esc ≈ 11.2 km/s. From 400 km altitude: slightly less."
      >
        <EscapeVelocityCalculator />
      </FormulaBlock>

      <FormulaBlock
        title="Orbital period (Kepler's third law)"
        formula="T = 2π √(a³/μ)"
        explain="Time for one complete orbit. a = semi-major axis (for circular orbit, a = radius). T in seconds when a is in km and μ = 398600 km³/s²."
        example="ISS: a ≈ 6779 km → T ≈ 92.7 min. GEO: a ≈ 42164 km → T = 24 h."
      >
        <PeriodCalculator />
      </FormulaBlock>

      <section className="rounded-xl border-2 border-[var(--accent-cyan)]/50 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 mb-4">Kepler&apos;s three laws</h2>
        <ul className="space-y-4 text-sm text-slate-700">
          <li><strong>1. Law of ellipses:</strong> Planets and satellites move in ellipses with the central body at one focus.</li>
          <li><strong>2. Law of equal areas:</strong> A line from the body to the center sweeps equal areas in equal times (angular momentum constant).</li>
          <li><strong>3. Law of periods:</strong> T² ∝ a³ — the square of the orbital period is proportional to the cube of the semi-major axis.</li>
        </ul>
      </section>

      <FormulaBlock
        title="Rocket equation (Tsiolkovsky)"
        formula="Δv = v_e × ln(m₀ / m_f)"
        explain="Change in velocity from burning propellant. v_e = exhaust velocity, m₀ = initial mass, m_f = final mass (after burn)."
        example="Higher mass ratio (m₀/m_f) or higher exhaust velocity gives more Δv for space travel."
      >
        <RocketEquationCalculator />
      </FormulaBlock>

      <p className="text-center text-sm text-slate-600">
        <Link href="/simulator" className="text-[var(--accent-cyan)] hover:underline">Try the 3D orbit simulator</Link>
        {" · "}
        <Link href="/learn/formulas" className="text-[var(--accent-cyan)] hover:underline">Formulas playground & quiz</Link>
      </p>
    </div>
  );
}

function FormulaBlock({
  title,
  formula,
  explain,
  example,
  children,
}: {
  title: string;
  formula: string;
  explain: string;
  example: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border-2 border-[var(--accent-cyan)]/50 bg-white p-6 shadow-sm">
      <h2 className="text-xl font-bold text-slate-800 mb-2">{title}</h2>
      <p className="font-mono text-lg bg-slate-100 p-3 rounded-lg mb-3">{formula}</p>
      <p className="text-sm text-slate-700 mb-2">{explain}</p>
      <p className="text-xs text-slate-500 mb-4">Real example: {example}</p>
      {children}
    </section>
  );
}

function GravityCalculator() {
  const [r, setR] = useState(6771);
  const m2 = 420; // ISS kg
  const F = (G_SI * M_EARTH_KG * m2) / (r * 1000) ** 2;
  return (
    <div className="bg-slate-50 p-4 rounded-lg text-sm">
      <p className="font-bold text-slate-800 mb-2">Calculator: Force on a 420 kg satellite (ISS-like)</p>
      <label className="block mb-1">Distance from Earth center (km): <input type="number" value={r} onChange={(e) => setR(Number(e.target.value) || 0)} className="border rounded px-2 w-24" /></label>
      <p className="text-slate-700 mt-2">F ≈ <strong>{(F / 1000).toFixed(2)} kN</strong></p>
    </div>
  );
}

function OrbitVelocityCalculator() {
  const [alt, setAlt] = useState(400);
  const r = R_EARTH_KM + alt;
  const v = Math.sqrt(MU_KM / r);
  const T = 2 * Math.PI * Math.sqrt((r ** 3) / MU_KM) / 60;
  return (
    <div className="bg-slate-50 p-4 rounded-lg text-sm">
      <p className="font-bold text-slate-800 mb-2">Orbit calculator: enter altitude (km)</p>
      <label className="block mb-1">Altitude above Earth (km): <input type="number" value={alt} onChange={(e) => setAlt(Number(e.target.value) || 0)} className="border rounded px-2 w-24" /></label>
      <p className="text-slate-700 mt-2">Orbital speed ≈ <strong>{v.toFixed(2)} km/s</strong></p>
      <p className="text-slate-600">Orbital period ≈ <strong>{T.toFixed(1)} min</strong></p>
    </div>
  );
}

function EscapeVelocityCalculator() {
  const [alt, setAlt] = useState(0);
  const r = (R_EARTH_KM + alt) * 1000;
  const v = Math.sqrt((2 * G_SI * M_EARTH_KG) / r) / 1000;
  return (
    <div className="bg-slate-50 p-4 rounded-lg text-sm">
      <p className="font-bold text-slate-800 mb-2">Escape velocity from Earth</p>
      <label className="block mb-1">Altitude (km): <input type="number" value={alt} onChange={(e) => setAlt(Number(e.target.value) || 0)} className="border rounded px-2 w-24" /></label>
      <p className="text-slate-700 mt-2">v_esc ≈ <strong>{v.toFixed(2)} km/s</strong></p>
    </div>
  );
}

function PeriodCalculator() {
  const [alt, setAlt] = useState(400);
  const a = R_EARTH_KM + alt;
  const Tsec = 2 * Math.PI * Math.sqrt((a ** 3) / MU_KM);
  const Tmin = Tsec / 60;
  const Th = Tmin / 60;
  return (
    <div className="bg-slate-50 p-4 rounded-lg text-sm">
      <p className="font-bold text-slate-800 mb-2">Orbital period calculator</p>
      <label className="block mb-1">Semi-major axis (altitude + 6371 km): <input type="number" value={alt} onChange={(e) => setAlt(Number(e.target.value) || 0)} className="border rounded px-2 w-24" /> km altitude</label>
      <p className="text-slate-700 mt-2">Period = <strong>{Tmin < 60 ? `${Tmin.toFixed(1)} min` : `${Th.toFixed(2)} h`}</strong></p>
    </div>
  );
}

function RocketEquationCalculator() {
  const [ve, setVe] = useState(4);
  const [ratio, setRatio] = useState(10);
  const dv = ve * Math.log(ratio);
  return (
    <div className="bg-slate-50 p-4 rounded-lg text-sm">
      <p className="font-bold text-slate-800 mb-2">Rocket equation calculator</p>
      <label className="block mb-1">Exhaust velocity (km/s): <input type="number" value={ve} onChange={(e) => setVe(Number(e.target.value) || 0)} className="border rounded px-2 w-20" /></label>
      <label className="block mb-1 mt-2">Mass ratio m₀/m_f: <input type="number" value={ratio} onChange={(e) => setRatio(Number(e.target.value) || 0)} className="border rounded px-2 w-20" /></label>
      <p className="text-slate-700 mt-2">Δv ≈ <strong>{dv.toFixed(2)} km/s</strong></p>
    </div>
  );
}
