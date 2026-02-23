import { useState } from "react";
import { Link } from "wouter";
import { FAQSchema } from "../components/FAQSchema";

const MU_KM = 398600.4418;
const R_EARTH_KM = 6371;

const CALCULATOR_FAQS = [
  { question: "How fast does the ISS orbit Earth?", answer: "The International Space Station orbits at approximately 7.66 km/s (27,600 km/h) at 408 km altitude. Its orbital period is about 92 minutes. Use the orbit calculator at orbitalsimulatorhub.com/calculators — enter 408 km altitude to verify." },
  { question: "What is orbital velocity?", answer: "Orbital velocity is the speed needed for an object to stay in a stable orbit around Earth. Formula: v = √(μ/r) where μ = 398,600 km³/s² for Earth. At 400 km altitude, orbital velocity is ~7.66 km/s. Higher altitude = slower speed, longer period." },
  { question: "What is escape velocity?", answer: "Escape velocity is the minimum speed needed to escape Earth's gravity without further propulsion. At Earth's surface it's about 11.2 km/s. From higher altitude it's less. Use the escape velocity calculator at orbitalsimulatorhub.com/calculators." },
];

export function Calculators() {
  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <FAQSchema items={CALCULATOR_FAQS} />
      <div>
        <h1 className="headline">How Fast Does the ISS Orbit? | Orbit Calculator</h1>
        <p className="subhead">
          The ISS orbits at <strong>7.66 km/s (27,600 km/h)</strong> at 408 km altitude. Orbital period ~92 min. Use the calculator below to find orbital speed for any altitude.
        </p>
      </div>

      {/* Featured snippet: How fast does ISS orbit — direct answer for Position 0 */}
      <section className="rounded-xl border-2 border-[var(--accent-cyan)]/50 bg-cyan-50/50 p-6">
        <h2 className="text-lg font-bold text-slate-800 mb-2">How fast does the ISS orbit Earth?</h2>
        <p className="text-slate-700 mb-2">
          The International Space Station orbits at approximately <strong>7.66 km/s (27,600 km/h)</strong> at 408 km altitude. Its orbital period is about <strong>92 minutes</strong> — astronauts see 16 sunrises per day. Enter 408 km in the orbit calculator below to verify.
        </p>
        <Link href="/satellites"><a className="text-sm text-[var(--accent-cyan)] font-medium hover:underline">Real satellite data: ISS, Starlink, GPS →</a></Link>
      </section>

      <section className="rounded-xl border-2 border-[var(--accent-cyan)]/50 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 mb-2">Satellite orbit calculator</h2>
        <p className="text-sm text-slate-600 mb-4">Enter altitude above Earth (km). Get orbital speed and orbit time (period).</p>
        <OrbitCalc />
      </section>

      <section className="rounded-xl border-2 border-[var(--accent-cyan)]/50 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 mb-2">Gravity calculator</h2>
        <p className="text-sm text-slate-600 mb-4">Force of Earth&apos;s gravity on a mass at a given distance from Earth&apos;s center.</p>
        <GravityCalc />
      </section>

      <section className="rounded-xl border-2 border-[var(--accent-cyan)]/50 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 mb-2">Escape velocity calculator</h2>
        <p className="text-sm text-slate-600 mb-4">Minimum speed needed to escape a planet&apos;s gravity. Choose planet, enter altitude.</p>
        <EscapeCalcPlanet />
      </section>

      <section className="rounded-xl border-2 border-[var(--accent-cyan)]/50 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 mb-2">🚀 Hohmann transfer calculator</h2>
        <p className="text-sm text-slate-600 mb-4">Most efficient two-burn transfer between circular orbits. Enter initial and target altitudes. Get Δv₁, Δv₂, total fuel cost.</p>
        <HohmannCalc />
      </section>

      <section className="rounded-xl border-2 border-[var(--accent-cyan)]/50 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 mb-2">☄️ Collision probability estimator</h2>
        <p className="text-sm text-slate-600 mb-4">Approximate P<sub>c</sub> from miss distance and position uncertainty. Rare online. Used in autonomous collision avoidance.</p>
        <CollisionProbCalc />
      </section>

      <section className="rounded-xl border-2 border-[var(--accent-cyan)]/50 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-800 mb-2">🤖 Mars delay simulator</h2>
        <p className="text-sm text-slate-600 mb-4">τ = d/c. Set distance from Earth. See one-way light-time. Control delay impact — predictive vs naive AI.</p>
        <MarsDelayCalc />
      </section>

      <p className="text-center text-sm text-slate-600">
        <Link href="/formulas-library" className="text-[var(--accent-cyan)] hover:underline">Full formula library</Link>
        {" · "}
        <Link href="/simulator" className="text-[var(--accent-cyan)] hover:underline">3D orbit simulator</Link>
        {" · "}
        <Link href="/research/space-agi-math" className="text-[var(--accent-cyan)] hover:underline">Space-AGI Mathematics</Link>
      </p>
    </div>
  );
}

function OrbitCalc() {
  const [alt, setAlt] = useState(400);
  const r = R_EARTH_KM + alt;
  const v = Math.sqrt(MU_KM / r);
  const Tmin = (2 * Math.PI * Math.sqrt((r ** 3) / MU_KM)) / 60;
  return (
    <div className="bg-slate-50 p-4 rounded-lg">
      <label className="block mb-2 font-medium">Altitude (km): <input type="number" value={alt} onChange={(e) => setAlt(Number(e.target.value) || 0)} className="border rounded px-3 py-1 w-28" /></label>
      <p className="text-slate-700"><strong>Orbital speed:</strong> {v.toFixed(2)} km/s</p>
      <p className="text-slate-700"><strong>Orbit time (period):</strong> {Tmin >= 60 ? `${(Tmin / 60).toFixed(2)} hours` : `${Tmin.toFixed(1)} min`}</p>
    </div>
  );
}

function GravityCalc() {
  const [mass, setMass] = useState(100);
  const [r, setR] = useState(6771);
  const G = 6.674e-11;
  const M = 5.972e24;
  const F = (G * M * mass) / ((r * 1000) ** 2);
  return (
    <div className="bg-slate-50 p-4 rounded-lg">
      <label className="block mb-2 font-medium">Mass (kg): <input type="number" value={mass} onChange={(e) => setMass(Number(e.target.value) || 0)} className="border rounded px-3 py-1 w-28" /></label>
      <label className="block mb-2 font-medium">Distance from Earth center (km): <input type="number" value={r} onChange={(e) => setR(Number(e.target.value) || 0)} className="border rounded px-3 py-1 w-28" /></label>
      <p className="text-slate-700"><strong>Force:</strong> {(F / 1000).toFixed(2)} kN</p>
    </div>
  );
}

const PLANETS: { id: string; name: string; mu: number; radius: number }[] = [
  { id: "earth", name: "Earth", mu: 398600.4418, radius: 6371 },
  { id: "mars", name: "Mars", mu: 42828.3, radius: 3390 },
  { id: "moon", name: "Moon", mu: 4902.8, radius: 1737 },
  { id: "jupiter", name: "Jupiter", mu: 126686534, radius: 69911 },
];

function EscapeCalcPlanet() {
  const [planet, setPlanet] = useState("earth");
  const [alt, setAlt] = useState(0);
  const p = PLANETS.find((x) => x.id === planet) || PLANETS[0];
  const r = p.radius + alt;
  const v = Math.sqrt((2 * p.mu) / r);
  return (
    <div className="bg-slate-50 p-4 rounded-lg">
      <label className="block mb-2 font-medium">Planet: <select value={planet} onChange={(e) => setPlanet(e.target.value)} className="border rounded px-3 py-1"><option value="earth">Earth</option><option value="mars">Mars</option><option value="moon">Moon</option><option value="jupiter">Jupiter</option></select></label>
      <label className="block mb-2 font-medium">Altitude (km): <input type="number" value={alt} onChange={(e) => setAlt(Number(e.target.value) || 0)} className="border rounded px-3 py-1 w-28" /></label>
      <p className="text-slate-700"><strong>Escape velocity:</strong> {v.toFixed(2)} km/s</p>
    </div>
  );
}

function HohmannCalc() {
  const [r1, setR1] = useState(6771);
  const [r2, setR2] = useState(42164);
  const a = (r1 + r2) / 2;
  const dv1 = Math.sqrt(MU_KM / r1) * (Math.sqrt(2 * r2 / (r1 + r2)) - 1);
  const dv2 = Math.sqrt(MU_KM / r2) * (1 - Math.sqrt(2 * r1 / (r1 + r2)));
  const total = dv1 + dv2;
  return (
    <div className="bg-slate-50 p-4 rounded-lg">
      <label className="block mb-2 font-medium">Initial orbit radius (km): <input type="number" value={r1} onChange={(e) => setR1(Number(e.target.value) || 0)} className="border rounded px-3 py-1 w-28" /></label>
      <label className="block mb-2 font-medium">Target orbit radius (km): <input type="number" value={r2} onChange={(e) => setR2(Number(e.target.value) || 0)} className="border rounded px-3 py-1 w-28" /></label>
      <p className="text-slate-700"><strong>Δv₁:</strong> {dv1.toFixed(2)} km/s</p>
      <p className="text-slate-700"><strong>Δv₂:</strong> {dv2.toFixed(2)} km/s</p>
      <p className="text-slate-700"><strong>Total Δv (fuel cost):</strong> {total.toFixed(2)} km/s</p>
    </div>
  );
}

function CollisionProbCalc() {
  const [missDist, setMissDist] = useState(1);
  const [sigma, setSigma] = useState(0.5);
  const d = Math.max(0.001, missDist);
  const s = Math.max(0.001, sigma);
  const Pc = Math.exp(-(d * d) / (2 * s * s));
  return (
    <div className="bg-slate-50 p-4 rounded-lg">
      <label className="block mb-2 font-medium">Miss distance (km): <input type="number" value={missDist} onChange={(e) => setMissDist(Number(e.target.value) || 0)} step={0.1} className="border rounded px-3 py-1 w-28" /></label>
      <label className="block mb-2 font-medium">Position uncertainty σ (km): <input type="number" value={sigma} onChange={(e) => setSigma(Number(e.target.value) || 0)} step={0.1} className="border rounded px-3 py-1 w-28" /></label>
      <p className="text-slate-700"><strong>Approx. P<sub>c</sub>:</strong> {(Pc * 100).toFixed(4)}%</p>
      <p className="text-xs text-slate-500 mt-1">Simplified: P ≈ exp(−d²/(2σ²)). Full model uses covariance.</p>
    </div>
  );
}

function MarsDelayCalc() {
  const C_KM_S = 299792;
  const [dist, setDist] = useState(78);
  const distKm = dist * 1e6;
  const tauSec = distKm / C_KM_S;
  const tauMin = tauSec / 60;
  return (
    <div className="bg-slate-50 p-4 rounded-lg">
      <label className="block mb-2 font-medium">Distance from Earth (million km): <input type="number" value={dist} onChange={(e) => setDist(Number(e.target.value) || 0)} step={1} className="border rounded px-3 py-1 w-28" /></label>
      <p className="text-slate-700"><strong>One-way light-time τ:</strong> {tauMin >= 1 ? `${tauMin.toFixed(1)} min` : `${(tauSec).toFixed(1)} s`}</p>
      <p className="text-slate-700"><strong>Round-trip delay:</strong> {(2 * tauMin).toFixed(1)} min</p>
      <p className="text-xs text-slate-500 mt-1">Mars: 55–401 M km. Predictive AI outperforms naive control when τ increases.</p>
    </div>
  );
}
