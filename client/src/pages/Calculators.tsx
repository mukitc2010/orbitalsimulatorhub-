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
        <p className="text-sm text-slate-600 mb-4">Minimum speed needed to escape Earth&apos;s gravity from a given altitude.</p>
        <EscapeCalc />
      </section>

      <p className="text-center text-sm text-slate-600">
        <Link href="/formulas-library" className="text-[var(--accent-cyan)] hover:underline">Full formula library</Link>
        {" · "}
        <Link href="/simulator" className="text-[var(--accent-cyan)] hover:underline">3D orbit simulator</Link>
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

function EscapeCalc() {
  const [alt, setAlt] = useState(0);
  const r = (R_EARTH_KM + alt) * 1000;
  const G = 6.674e-11;
  const M = 5.972e24;
  const v = Math.sqrt((2 * G * M) / r) / 1000;
  return (
    <div className="bg-slate-50 p-4 rounded-lg">
      <label className="block mb-2 font-medium">Altitude (km): <input type="number" value={alt} onChange={(e) => setAlt(Number(e.target.value) || 0)} className="border rounded px-3 py-1 w-28" /></label>
      <p className="text-slate-700"><strong>Escape velocity:</strong> {v.toFixed(2)} km/s</p>
    </div>
  );
}
