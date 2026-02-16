import { useState } from "react";
import { Link } from "wouter";

const MU_KM = 398600.4418;
const R_EARTH_KM = 6371;

export function Calculators() {
  return (
    <div className="max-w-4xl mx-auto space-y-10">
      <div>
        <h1 className="headline">Space &amp; Orbit Calculators</h1>
        <p className="subhead">
          NASA-style orbit calculator, gravity calculator, and escape velocity calculator. Enter values and get speed, period, and force.
        </p>
      </div>

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
