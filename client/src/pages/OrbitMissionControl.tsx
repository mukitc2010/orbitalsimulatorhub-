import { useEffect, useState } from "react";
import { EarthVisualization, type SatelliteState } from "../components/EarthVisualization";
import { AstroBotChat } from "../components/astrobot/AstroBotChat";
import { advanceOrbitalState, createOrbitalState, getOrbitalMetrics, sampleOrbitPath } from "../orbitPhysics";
import { EARTH_RADIUS_KM, MU_EARTH_KM3_S2 } from "../../../shared/const";
import type { CartesianState } from "../../../shared/types";

import { ORACLE_SPEEDS, validOracleAction } from "../../../lib/astrobot/oracleAgent";

type PresetId = "leo" | "geo" | "elliptical" | "escape";
type Vector = [number, number, number];

interface MissionState {
  cartesian: CartesianState;
  elapsedSeconds: number;
  trail: Vector[];
  orbitPath: Vector[];
  impacted: boolean;
}

const INITIAL_ALTITUDE_KM = 400;
const INITIAL_SPEED_KM_S = Math.sqrt(MU_EARTH_KM3_S2 / (EARTH_RADIUS_KM + INITIAL_ALTITUDE_KM));
const SIM_SPEEDS = ORACLE_SPEEDS;
const MAX_TRAIL_POINTS = 180;
const STEP_SECONDS = 30;

function toScenePoint(state: CartesianState): Vector {
  return [state.x / EARTH_RADIUS_KM, state.y / EARTH_RADIUS_KM, state.z / EARTH_RADIUS_KM];
}

function createMissionState(altitudeKm: number, speedKmS: number): MissionState {
  const cartesian = createOrbitalState(altitudeKm, speedKmS);
  return {
    cartesian,
    elapsedSeconds: 0,
    trail: [toScenePoint(cartesian)],
    orbitPath: sampleOrbitPath(cartesian).map((point) => [
      point[0] / EARTH_RADIUS_KM,
      point[1] / EARTH_RADIUS_KM,
      point[2] / EARTH_RADIUS_KM,
    ]),
    impacted: false,
  };
}

function formatDuration(totalSeconds: number): string {
  const seconds = Math.floor(totalSeconds);
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainder = seconds % 60;
  const clock = [hours, minutes, remainder].map((value) => String(value).padStart(2, "0")).join(":");
  return days > 0 ? `${days}d ${clock}` : clock;
}

function formatPeriod(periodSeconds: number | null): string {
  if (periodSeconds === null) return "Open trajectory";
  const totalMinutes = Math.round(periodSeconds / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return hours > 0 ? `${hours} h ${String(minutes).padStart(2, "0")} min` : `${minutes} min`;
}

function presetValues(preset: PresetId): { altitudeKm: number; speedKmS: number } {
  const altitudeKm = preset === "geo" ? 35786 : 400;
  const radius = EARTH_RADIUS_KM + altitudeKm;
  const circularSpeed = Math.sqrt(MU_EARTH_KM3_S2 / radius);

  if (preset === "elliptical") {
    const apogeeRadius = EARTH_RADIUS_KM + 20000;
    const semiMajorAxis = (radius + apogeeRadius) / 2;
    return { altitudeKm, speedKmS: Math.sqrt(MU_EARTH_KM3_S2 * (2 / radius - 1 / semiMajorAxis)) };
  }
  if (preset === "escape") {
    return { altitudeKm, speedKmS: Math.sqrt(2 * MU_EARTH_KM3_S2 / radius) * 1.08 };
  }
  return { altitudeKm, speedKmS: circularSpeed };
}

export function OrbitMissionControl() {
  const [altitudeKm, setAltitudeKm] = useState(INITIAL_ALTITUDE_KM);
  const [speedKmS, setSpeedKmS] = useState(INITIAL_SPEED_KM_S);
  const [selectedPreset, setSelectedPreset] = useState<PresetId | "custom">("leo");
  const [speedIndex, setSpeedIndex] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [showVelocity, setShowVelocity] = useState(false);
  const [showGravity, setShowGravity] = useState(false);
  const [simulation, setSimulation] = useState(() => createMissionState(INITIAL_ALTITUDE_KM, INITIAL_SPEED_KM_S));
  const [comparison, setComparison] = useState<Array<{ name: string; mission: MissionState }>>([]);
  const metrics = getOrbitalMetrics(simulation.cartesian);

  useEffect(() => {
    if (!playing || simulation.impacted) return;
    const timer = window.setInterval(() => {
      setComparison(current => current.map(item => {
        const dt = 0.1 * SIM_SPEEDS[speedIndex];
        const next = advanceOrbitalState(item.mission.cartesian, dt);
        return { ...item, mission: { ...item.mission, cartesian: next.state,
          elapsedSeconds: item.mission.elapsedSeconds + dt,
          trail: [...item.mission.trail.slice(-(MAX_TRAIL_POINTS - 1)), toScenePoint(next.state)], impacted: next.impacted } };
      }));
      setSimulation((current) => {
        if (current.impacted) return current;
        const dt = 0.1 * SIM_SPEEDS[speedIndex];
        const advance = advanceOrbitalState(current.cartesian, dt);
        return {
          ...current,
          cartesian: advance.state,
          elapsedSeconds: current.elapsedSeconds + dt,
          trail: [...current.trail.slice(-(MAX_TRAIL_POINTS - 1)), toScenePoint(advance.state)],
          impacted: advance.impacted,
        };
      });
    }, 100);
    return () => window.clearInterval(timer);
  }, [playing, simulation.impacted, speedIndex]);

  useEffect(() => {
    if (simulation.impacted) setPlaying(false);
  }, [simulation.impacted]);

  function resetSimulation(nextAltitude = altitudeKm, nextSpeed = speedKmS) {
    setPlaying(false);
    setComparison([]);
    setSimulation(createMissionState(nextAltitude, nextSpeed));
  }

  function loadPreset(preset: PresetId) {
    const values = presetValues(preset);
    setSelectedPreset(preset);
    setAltitudeKm(values.altitudeKm);
    setSpeedKmS(values.speedKmS);
    resetSimulation(values.altitudeKm, values.speedKmS);
  }

  function updateAltitude(value: number) {
    setAltitudeKm(value);
    setSelectedPreset("custom");
    resetSimulation(value, speedKmS);
  }

  function updateSpeed(value: number) {
    setSpeedKmS(value);
    setSelectedPreset("custom");
    resetSimulation(altitudeKm, value);
  }

  function stepOnce() {
    if (simulation.impacted) return;
    setComparison(current => current.map(item => {
      const next = advanceOrbitalState(item.mission.cartesian, STEP_SECONDS);
      return { ...item, mission: { ...item.mission, cartesian: next.state,
        elapsedSeconds: item.mission.elapsedSeconds + STEP_SECONDS,
        trail: [...item.mission.trail.slice(-(MAX_TRAIL_POINTS - 1)), toScenePoint(next.state)], impacted: next.impacted } };
    }));
    const advance = advanceOrbitalState(simulation.cartesian, STEP_SECONDS);
    setSimulation((current) => ({
      ...current,
      cartesian: advance.state,
      elapsedSeconds: current.elapsedSeconds + STEP_SECONDS,
      trail: [...current.trail.slice(-(MAX_TRAIL_POINTS - 1)), toScenePoint(advance.state)],
      impacted: advance.impacted,
    }));
  }

  function applyOracleAction(action: { type: string; payload: Record<string, unknown> }): void {
    if (!validOracleAction(action)) throw new Error("Unsupported or invalid simulator action");
    if (action.type === "SIM_SET_PLAYBACK") {
      if (simulation.impacted) throw new Error("Reset the impacted mission before playback");
      setSpeedIndex(SIM_SPEEDS.indexOf(action.payload.speed as number));
      setPlaying(action.payload.playing as boolean);
      return;
    }
    const altitude = (action.payload.a as number) - EARTH_RADIUS_KM;
    const speed = Math.sqrt(MU_EARTH_KM3_S2 / (EARTH_RADIUS_KM + altitude));
    const mission = createMissionState(altitude, speed);
    const inclination = (action.payload.i as number) * Math.PI / 180;
    const rotate = (v: Vector): Vector => [v[0], v[1] * Math.cos(inclination) - v[2] * Math.sin(inclination), v[1] * Math.sin(inclination) + v[2] * Math.cos(inclination)];
    const velocity = rotate([mission.cartesian.vx, mission.cartesian.vy, mission.cartesian.vz]);
    mission.cartesian = { ...mission.cartesian, vx: velocity[0], vy: velocity[1], vz: velocity[2] };
    mission.orbitPath = mission.orbitPath.map(rotate);
    setComparison(current => [...current.slice(-5), { name: action.payload.name as string, mission }]);
  }

  const satellite: SatelliteState = {
    id: "mission-satellite",
    name: "Mission vehicle",
    color: "#58ddff",
    position: toScenePoint(simulation.cartesian),
    trail: simulation.trail,
    orbitPath: simulation.orbitPath,
    lastCartesian: simulation.cartesian,
  };

  return (
    <div className="orbit-mission-shell -mx-4 min-h-[calc(100vh-5rem)] px-4 py-5 text-slate-100 sm:px-6">
      <div className="mx-auto max-w-[1680px]">
        <header className="mb-4 flex flex-wrap items-end justify-between gap-4 border-b border-white/10 pb-4">
          <div>
            <p className="mb-1 font-mono-tech text-[10px] tracking-[0.18em] text-cyan-300">ORBITAL SIMULATOR HUB / EARTH MISSION</p>
            <h1 className="text-2xl font-semibold text-white sm:text-3xl">Orbital mission control</h1>
            <p className="mt-1 max-w-2xl text-sm text-slate-400">Set a launch state and see how velocity and gravity shape the path around Earth.</p>
          </div>
          <div className="flex items-center gap-2 pb-1 font-mono-tech text-[11px] text-slate-300" role="status">
            <span className={`h-2 w-2 rounded-full ${simulation.impacted ? "bg-orange-400" : playing ? "animate-pulse bg-emerald-400" : "bg-cyan-400"}`} />
            {simulation.impacted ? "IMPACT DETECTED" : playing ? "SIMULATION RUNNING" : "SIMULATION READY"}
          </div>
        </header>

        <div className="grid items-start gap-3 xl:grid-cols-[250px_minmax(0,1fr)_260px]">
          <aside className="orbit-panel p-4" aria-label="Mission controls">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-mono-tech text-xs tracking-[0.12em] text-slate-200">MISSION SETUP</h2>
              <span className="text-[10px] text-slate-500">TWO-BODY MODEL</span>
            </div>

            <fieldset>
              <legend className="mb-2 text-xs font-semibold text-slate-300">Orbit presets</legend>
              <div className="grid grid-cols-2 gap-1.5">
                {([
                  ["leo", "Low Earth", "400 km"],
                  ["geo", "Geostationary", "35,786 km"],
                  ["elliptical", "Elliptical", "400 × 20,000 km"],
                  ["escape", "Escape", "Open path"],
                ] as const).map(([id, label, detail]) => (
                  <button
                    key={id}
                    type="button"
                    aria-pressed={selectedPreset === id}
                    onClick={() => loadPreset(id)}
                    className={`min-h-[58px] border px-2 py-2 text-left transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-cyan-300 ${selectedPreset === id ? "border-cyan-300/70 bg-cyan-300/10 text-white" : "border-white/10 bg-black/20 text-slate-300 hover:border-white/30"}`}
                  >
                    <span className="block text-xs font-semibold">{label}</span>
                    <span className="mt-1 block text-[10px] text-slate-500">{detail}</span>
                  </button>
                ))}
              </div>
            </fieldset>

            <div className="mission-divider my-4" />
            <div className="space-y-4">
              <div>
                <div className="mb-1 flex items-baseline justify-between gap-2">
                  <label htmlFor="starting-altitude" className="text-xs font-semibold text-slate-300">Starting altitude</label>
                  <output htmlFor="starting-altitude" className="font-mono-tech text-xs text-cyan-200">{Math.round(altitudeKm).toLocaleString()} km</output>
                </div>
                <input id="starting-altitude" type="range" min="160" max="40000" step="1" value={altitudeKm} onChange={(event) => updateAltitude(Number(event.target.value))} className="mission-range" />
                <div className="mt-1 flex justify-between text-[10px] text-slate-500"><span>160 km</span><span>40,000 km</span></div>
              </div>

              <div>
                <div className="mb-1 flex items-baseline justify-between gap-2">
                  <label htmlFor="tangential-velocity" className="text-xs font-semibold text-slate-300">Tangential velocity</label>
                  <output htmlFor="tangential-velocity" className="font-mono-tech text-xs text-cyan-200">{speedKmS.toFixed(2)} km/s</output>
                </div>
                <input id="tangential-velocity" type="range" min="0" max="12.5" step="0.01" value={speedKmS} onChange={(event) => updateSpeed(Number(event.target.value))} className="mission-range" />
                <div className="mt-1 flex justify-between text-[10px] text-slate-500"><span>0 km/s</span><span>12.5 km/s</span></div>
              </div>

              <div>
                <div className="mb-1 flex items-baseline justify-between gap-2">
                  <label htmlFor="simulation-speed" className="text-xs font-semibold text-slate-300">Simulation speed</label>
                  <output htmlFor="simulation-speed" className="font-mono-tech text-xs text-cyan-200">{SIM_SPEEDS[speedIndex].toLocaleString()}×</output>
                </div>
                <input id="simulation-speed" type="range" min="0" max={SIM_SPEEDS.length - 1} step="1" value={speedIndex} onChange={(event) => setSpeedIndex(Number(event.target.value))} className="mission-range" />
                <div className="mt-1 flex justify-between text-[10px] text-slate-500"><span>1× real time</span><span>1 h / s</span></div>
              </div>
            </div>

            <div className="mission-divider my-4" />
            <fieldset className="space-y-2">
              <legend className="mb-2 text-xs font-semibold text-slate-300">Vector overlays</legend>
              <label className="flex cursor-pointer items-center gap-2 text-xs text-slate-300">
                <input type="checkbox" checked={showVelocity} onChange={(event) => setShowVelocity(event.target.checked)} className="accent-cyan-300" />
                <span className="mission-legend-dot bg-cyan-300" /> Velocity vector
              </label>
              <label className="flex cursor-pointer items-center gap-2 text-xs text-slate-300">
                <input type="checkbox" checked={showGravity} onChange={(event) => setShowGravity(event.target.checked)} className="accent-orange-300" />
                <span className="mission-legend-dot bg-orange-300" /> Gravity vector
              </label>
            </fieldset>

            <div className="mission-divider my-4" />
            <div className="grid grid-cols-2 gap-2">
              <button type="button" onClick={() => setPlaying((wasPlaying) => !wasPlaying)} disabled={simulation.impacted} aria-label={playing ? "Pause simulation" : "Play simulation"} className="mission-primary-button col-span-2 min-h-10">
                <span aria-hidden="true">{playing ? "Ⅱ" : "▶"}</span> {playing ? "Pause" : "Play"}
              </button>
              <button type="button" onClick={() => resetSimulation()} className="mission-secondary-button min-h-9" title="Reset to the selected launch state">↻ Reset</button>
              <button type="button" onClick={stepOnce} disabled={playing || simulation.impacted} className="mission-secondary-button min-h-9 disabled:cursor-not-allowed disabled:opacity-40" title={`Advance ${STEP_SECONDS} seconds`}>› Single step</button>
            </div>
            <p className="mt-2 text-center font-mono-tech text-[10px] text-slate-500">STEP +{STEP_SECONDS} SIMULATION SECONDS</p>
          </aside>

          <section className="min-w-0" aria-label="Orbital simulation view">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2 font-mono-tech text-[10px] text-slate-400">
              <span>EARTH-CENTERED INERTIAL FRAME</span>
              <span>KM · KM/S · S</span>
            </div>
            <EarthVisualization
              satellites={[satellite, ...comparison.map((item, index): SatelliteState => ({
                id: `oracle-${index}`, name: item.name, color: ["#34d399", "#fbbf24", "#c084fc"][index % 3],
                position: toScenePoint(item.mission.cartesian), trail: item.mission.trail,
                orbitPath: item.mission.orbitPath, lastCartesian: item.mission.cartesian,
              }))]}
              showVelocityVector={showVelocity}
              showGravityVector={showGravity}
            />
            <div className="mt-2 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-2 text-[10px] text-slate-500">
              <span>Drag to rotate · Scroll to zoom · Orbit line shows the predicted path</span>
              <span>Earth radius: 6,371 km</span>
            </div>
            {simulation.impacted && (
              <div className="mt-3 border border-orange-300/40 bg-orange-400/10 px-4 py-3 text-sm text-orange-100" role="alert">
                <strong className="font-semibold">Surface impact.</strong> The spacecraft reached Earth’s 6,371 km radius. The simulation is paused; increase the starting speed or altitude, then reset.
              </div>
            )}
          </section>

          <aside className="orbit-panel p-4" aria-label="Live orbital data">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-mono-tech text-xs tracking-[0.12em] text-slate-200">LIVE TELEMETRY</h2>
              <span className="font-mono-tech text-[10px] text-slate-500">EARTH / 2-BODY</span>
            </div>
            <div className="mb-4 border-l-2 border-cyan-300 pl-3">
              <p className="text-[10px] uppercase tracking-[0.12em] text-slate-500">Current orbit</p>
              <p className="mt-1 text-sm font-semibold text-white">{metrics.orbitType === "escape" ? "Escape trajectory" : metrics.orbitType === "parabolic" ? "Parabolic trajectory" : metrics.eccentricity < 0.02 ? "Near-circular orbit" : "Elliptical orbit"}</p>
            </div>
            <dl className="space-y-0">
              <div className="mission-metric-row">
                <dt>Altitude</dt>
                <dd>{metrics.altitudeKm.toLocaleString(undefined, { maximumFractionDigits: 1 })} <small>km</small></dd>
              </div>
              <div className="mission-metric-row">
                <dt>Speed</dt>
                <dd>{metrics.speedKmS.toFixed(3)} <small>km/s</small></dd>
              </div>
              <div className="mission-metric-row">
                <dt>Gravity</dt>
                <dd>{(metrics.gravityKmS2 * 1000).toFixed(2)} <small>m/s²</small></dd>
              </div>
              <div className="mission-metric-row">
                <dt>Specific energy</dt>
                <dd>{metrics.specificEnergyKm2S2.toFixed(3)} <small>km²/s²</small></dd>
              </div>
              <div className="mission-metric-row">
                <dt>Orbital period</dt>
                <dd className="text-sm">{formatPeriod(metrics.periodSeconds)}</dd>
              </div>
              <div className="mission-metric-row">
                <dt>Elapsed time</dt>
                <dd className="font-mono-tech text-sm">{formatDuration(simulation.elapsedSeconds)}</dd>
              </div>
            </dl>

            <div className="mission-divider my-4" />
            <div className="flex items-center justify-between gap-2 text-xs">
              <span className="text-slate-400">Specific energy</span>
              <span className={metrics.specificEnergyKm2S2 < 0 ? "text-cyan-200" : "text-orange-200"}>
                {metrics.specificEnergyKm2S2 < 0 ? "BOUND" : "UNBOUND"}
              </span>
            </div>
            <p className="mt-2 text-[10px] leading-relaxed text-slate-500">
              Negative energy means Earth-bound. Non-negative energy means the spacecraft can escape. Period is shown only for bound orbits.
            </p>
          </aside>
        </div>
        <footer className="mt-4 border-t border-white/10 pt-3 text-[10px] leading-relaxed text-slate-500">
          Ideal two-body Earth model. Atmospheric drag, Earth oblateness, and third-body forces are not included.
        </footer>

        <section className="mt-6 border-t border-white/10 pt-5" aria-labelledby="orbit-astrobot-title">
          <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="font-mono-tech text-[10px] tracking-[0.16em] text-cyan-300">MISSION INTELLIGENCE</p>
              <h2 id="orbit-astrobot-title" className="mt-1 text-xl font-semibold text-white">ORACLE // Orbital Reasoning And Control Engine</h2>
              <p className="mt-1 max-w-2xl text-sm text-slate-400">Ask about the current trajectory, orbital mechanics, or the forces acting on your spacecraft.</p>
            </div>
            <span className="font-mono-tech text-[10px] text-slate-500">ANSWER · REVIEW · REFINE</span>
          </div>
          {comparison.length > 0 && <div className="mb-3 flex flex-wrap gap-2" aria-label="ORACLE comparison orbits">
            {comparison.map((item, index) => <span key={index} className="rounded border border-cyan-500/30 px-3 py-1 text-xs">{item.name} ? {getOrbitalMetrics(item.mission.cartesian).altitudeKm.toFixed(0)} km</span>)}
            <button type="button" onClick={() => setComparison([])} className="text-xs text-cyan-300">Clear comparison orbits</button>
          </div>}
          <AstroBotChat
            onAction={applyOracleAction}
            className="orbit-astrobot-chat"
            pageContext={`Orbital Simulator Hub live mission. Current altitude: ${metrics.altitudeKm.toFixed(1)} km. Speed: ${metrics.speedKmS.toFixed(3)} km/s. Specific energy: ${metrics.specificEnergyKm2S2.toFixed(3)} km^2/s^2 (${metrics.orbitType}). Orbital period: ${formatPeriod(metrics.periodSeconds)}. Elapsed simulation time: ${formatDuration(simulation.elapsedSeconds)}. The simulation uses an ideal two-body Earth model.`}
          />
        </section>
      </div>
    </div>
  );
}
