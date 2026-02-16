import { useState, useCallback, useRef, useEffect } from "react";
import { Link } from "wouter";
import { EarthVisualization, type SatelliteState } from "../components/EarthVisualization";
import { SatelliteCreationForm } from "../components/SatelliteCreationForm";
import { SimulatorInfoPanel } from "../components/SimulatorInfoPanel";
import { GravityLearnPanel } from "../components/GravityLearnPanel";
import { ExplainBox } from "../components/ExplainBox";
import { keplerianToCartesian, propagateOrbit } from "../orbitalClient";
import { getOrbitTemplateClient } from "../orbitalUtils";
import { SIM_SPEEDS } from "../const";
import type { OrbitalElements, CartesianState } from "../../../shared/types";

const SCALE = 6371;
const STEP_SEC = 60;
const MAX_TRAIL = 150;

export function Simulator() {
  const [satellites, setSatellites] = useState<SatelliteState[]>([]);
  const [playing, setPlaying] = useState(false);
  const [speedIdx, setSpeedIdx] = useState(0);
  const satellitesRef = useRef<SatelliteState[]>([]);
  satellitesRef.current = satellites;

  const addSatellite = useCallback(
    (data: { name: string; color: string; orbitalElements: OrbitalElements }) => {
      const state = keplerianToCartesian(data.orbitalElements);
      const id = `sat-${Date.now()}`;
      const posNorm: [number, number, number] = [
        state.x / SCALE,
        state.y / SCALE,
        state.z / SCALE,
      ];
      setSatellites((prev) => [
        ...prev,
        {
          id,
          name: data.name,
          color: data.color,
          position: posNorm,
          trail: [posNorm],
          lastCartesian: state,
        },
      ]);
    },
    []
  );

  const loadPreset = useCallback((preset: "LEO" | "MEO" | "GEO") => {
    const el = getOrbitTemplateClient(preset);
    addSatellite({
      name: preset + " Satellite",
      color: "#00d9ff",
      orbitalElements: el,
    });
  }, [addSatellite]);

  useEffect(() => {
    if (!playing || satellites.length === 0) return;
    const dt = STEP_SEC * SIM_SPEEDS[speedIdx];
    const interval = setInterval(() => {
      setSatellites((prev) =>
        prev.map((sat) => {
          const cart = sat.lastCartesian;
          if (!cart) return sat;
          const next = propagateOrbit(cart, dt);
          const posNorm: [number, number, number] = [
            next.x / SCALE,
            next.y / SCALE,
            next.z / SCALE,
          ];
          return {
            ...sat,
            position: posNorm,
            trail: [...sat.trail.slice(-MAX_TRAIL), posNorm],
            lastCartesian: next,
          };
        })
      );
    }, 400);
    return () => clearInterval(interval);
  }, [playing, satellites.length, speedIdx]);

  const stepOnce = useCallback(() => {
    const dt = STEP_SEC * SIM_SPEEDS[speedIdx];
    setSatellites((prev) =>
      prev.map((sat) => {
        const cart = sat.lastCartesian;
        if (!cart) return sat;
        const next = propagateOrbit(cart, dt);
        const posNorm: [number, number, number] = [
          next.x / SCALE,
          next.y / SCALE,
          next.z / SCALE,
        ];
        return {
          ...sat,
          position: posNorm,
          trail: [...sat.trail.slice(-MAX_TRAIL), posNorm],
          lastCartesian: next,
        };
      })
    );
  }, [speedIdx]);

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="headline">Simulator</h1>
        <Link href="/guide" className="text-sm text-[var(--accent-cyan)] font-medium hover:underline">
          📖 Read the Guide
        </Link>
      </div>

      <section className="rounded-xl bg-slate-50 border border-slate-200 p-4" aria-label="How to use the simulator">
        <h2 className="text-sm font-bold text-slate-700 mb-3">How to use</h2>
        <ol className="grid sm:grid-cols-3 gap-4 text-sm text-slate-700 list-none pl-0">
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[var(--accent-cyan)] text-[#0f172a] font-bold flex items-center justify-center text-sm">1</span>
            <div><strong>Add a satellite.</strong> Use a preset (LEO, MEO, GEO) on the right, or fill the form and click &quot;Add satellite.&quot;</div>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[var(--accent-cyan)] text-[#0f172a] font-bold flex items-center justify-center text-sm">2</span>
            <div><strong>Run the simulation.</strong> Click Play to advance time; use Step to move one step at a time. Change Speed to run faster.</div>
          </li>
          <li className="flex gap-3">
            <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[var(--accent-cyan)] text-[#0f172a] font-bold flex items-center justify-center text-sm">3</span>
            <div><strong>Read the numbers.</strong> Below the 3D view, &quot;Orbit info&quot; shows height, orbital period, and speed.</div>
          </li>
        </ol>
        <p className="text-sm font-bold text-slate-700 mt-3 mb-1">What you&apos;ll see</p>
        <ul className="text-sm text-slate-700 list-disc pl-5 space-y-1">
          <li><strong>Add one satellite</strong> (e.g. LEO) → orbit info shows height, perigee, apogee, period, and speed.</li>
          <li><strong>Add two or three</strong> (e.g. LEO + MEO + GEO) → the <strong>Compare orbits</strong> table appears so you can see them side by side.</li>
          <li><strong>Scroll down</strong> and expand <strong>Simulator glossary</strong> to see short definitions of every term.</li>
        </ul>
      </section>

      <ExplainBox title="Why these numbers matter">
        The simulator uses the same physics NASA uses: Newton&apos;s law of gravity and Kepler&apos;s laws of motion. So the height, orbital period, and speed you see are real-world accurate — the ISS really does orbit in about 90 minutes at ~400 km, and GPS satellites really are around 20,000 km high.
      </ExplainBox>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="text-sm font-bold text-slate-700 mb-1">3D view</h2>
          <p className="text-sm text-slate-600 mb-2">
            <strong>3D view:</strong> The blue ball is Earth. Colored dots are satellites; the line is each satellite’s path (orbit). Drag to rotate, scroll to zoom.
          </p>
          <p className="text-xs text-slate-500 mb-2 rounded-lg bg-[var(--accent-cyan)]/10 border border-[var(--accent-cyan)]/30 px-3 py-2">
            <strong>Quick tip:</strong> First time? Click <strong>Add LEO</strong> in the form, then <strong>Play</strong> to see an ISS-like orbit.
          </p>
          <p className="text-xs text-slate-600 mb-2 rounded-lg bg-[var(--accent-gold)]/15 border border-[var(--accent-gold)]/40 px-3 py-2">
            🎯 <strong>Mission:</strong> Add LEO, MEO, and GEO — then compare their heights and orbital periods in the info panel below. Real physics, real numbers!
          </p>
          <EarthVisualization satellites={satellites} scale={SCALE} />
          <p className="text-xs text-slate-500 mt-1 mb-2" aria-hidden="true">
            What you&apos;re seeing: you&apos;re looking at Earth from space. Each dot is a satellite; the line behind it is the path it has taken.
          </p>
          <SimulatorInfoPanel satellites={satellites} stepSeconds={STEP_SEC} speedMultiplier={SIM_SPEEDS[speedIdx]} />
          <GravityLearnPanel />
          <div className="mt-4 rounded-lg border border-slate-200 bg-white p-3">
            <h3 className="text-sm font-bold text-slate-700 mb-2">Time controls</h3>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <div className="flex items-center gap-2">
                <button type="button" onClick={() => setPlaying((p) => !p)} className="px-4 py-2 rounded-lg font-medium bg-[var(--accent-cyan)] text-[#0f172a] hover:opacity-90">
                  {playing ? "Pause" : "Play"}
                </button>
                <span className="text-xs text-slate-500">Start or stop the clock</span>
              </div>
              <div className="flex items-center gap-2">
                <button type="button" onClick={stepOnce} className="px-3 py-2 rounded-lg border border-[var(--accent-cyan)] text-sm font-medium hover:bg-[var(--accent-cyan)]/10" title="Advance by one step">
                  Step
                </button>
                <span className="text-xs text-slate-500">Advance by {STEP_SEC * SIM_SPEEDS[speedIdx]} s of simulation time</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-700">Speed:</span>
                {SIM_SPEEDS.map((s, i) => (
                  <button key={s} type="button" onClick={() => setSpeedIdx(i)} className={`px-2 py-1 rounded text-sm ${speedIdx === i ? "bg-[var(--accent-cyan)] text-[#0f172a]" : "border border-slate-300 hover:bg-slate-50"}`} title={`${s}x: 1 real second = ${s} min in simulation`}>
                    {s}x
                  </button>
                ))}
                <span className="text-xs text-slate-500">How fast time runs</span>
              </div>
            </div>
          </div>
        </div>
        <div>
          {satellites.length === 0 && (
            <p className="text-sm text-slate-600 mb-3 p-3 rounded-lg bg-[var(--accent-cyan)]/10 border border-[var(--accent-cyan)]/30">
              👋 <strong>Start here:</strong> click a preset (LEO, MEO, or GEO) to add a satellite, then press <strong>Play</strong> on the left.
            </p>
          )}
          <SatelliteCreationForm onSubmit={addSatellite} onLoadPreset={loadPreset} />
          {satellites.length > 0 && (
            <div className="mt-4 p-3 rounded-lg bg-slate-50 border border-slate-200">
              <p className="text-sm font-medium text-slate-700 mb-1">Satellites: {satellites.length}</p>
              <button type="button" onClick={() => setSatellites([])} className="text-sm text-red-600 hover:underline font-medium">
                Clear all
              </button>
            </div>
          )}
        </div>
      </div>

      <SimulatorGlossary />
    </div>
  );
}

const GLOSSARY_TERMS: { term: string; definition: string }[] = [
  { term: "Orbit", definition: "The path a satellite follows around Earth. Shaped by gravity and the satellite’s speed." },
  { term: "LEO (Low Earth Orbit)", definition: "About 200–2,000 km high. Used by the ISS and many satellites. Short period (~90 min)." },
  { term: "MEO (Medium Earth Orbit)", definition: "Roughly 2,000–35,000 km. Used by GPS and navigation satellites. Period ~12 hours." },
  { term: "GEO (Geostationary)", definition: "~35,786 km. Orbital period = 24 hours, so the satellite appears fixed over one spot. Used for weather and TV." },
  { term: "Orbital period", definition: "Time for one complete orbit around Earth. LEO ~90 min, GEO 24 hours." },
  { term: "Altitude / height", definition: "Distance above Earth’s surface (km). The simulator shows average altitude for the orbit." },
  { term: "Perigee", definition: "The point in the orbit closest to Earth (minimum altitude)." },
  { term: "Apogee", definition: "The point in the orbit farthest from Earth (maximum altitude)." },
  { term: "Speed (in orbit)", definition: "Velocity in km/s. Satellites need high speed to balance gravity and stay in orbit." },
];

function SimulatorGlossary() {
  const [open, setOpen] = useState(false);
  return (
    <section className="mt-8 rounded-xl border border-slate-200 bg-slate-50 overflow-hidden" aria-label="Simulator glossary">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-2 px-4 py-3 text-left font-bold text-slate-800 hover:bg-slate-100 transition"
      >
        <span>📖 Simulator glossary</span>
        <span className="text-slate-500 text-sm font-normal">{open ? "Collapse" : "Expand"}</span>
      </button>
      {open && (
        <div className="px-4 pb-4 pt-0 border-t border-slate-200">
          <p className="text-xs text-slate-600 mb-3">Short definitions for terms used on this page.</p>
          <dl className="space-y-2 text-sm">
            {GLOSSARY_TERMS.map(({ term, definition }) => (
              <div key={term}>
                <dt className="font-semibold text-slate-800">{term}</dt>
                <dd className="text-slate-600 ml-0 mt-0.5">{definition}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </section>
  );
}
