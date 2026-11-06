import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line, OrbitControls } from "@react-three/drei";
import {
  EARTH_RADIUS_M,
  MU_M3_S2,
  type Method,
  type Sample,
  type State,
  acceleration,
  circularPeriod,
  circularSpeed,
  energyDrift,
  escapeSpeed,
  initialCircularState,
  propagate,
  radiusError,
  specificAngularMomentum,
  specificEnergy,
  step,
} from "../lib/eulerLab/physics";

const METHODS: { id: Method; label: string }[] = [
  { id: "explicit-euler", label: "Explicit Euler" },
  { id: "semi-implicit-euler", label: "Semi-implicit Euler" },
  { id: "rk4", label: "Runge-Kutta 4" },
];

const COLORS: Record<Method, string> = {
  "explicit-euler": "#f2b84b",
  "semi-implicit-euler": "#7ddea2",
  rk4: "#67e8f9",
};

function fmt(n: number, digits = 2) {
  if (!Number.isFinite(n)) return "—";
  return n.toLocaleString(undefined, { maximumFractionDigits: digits });
}

function Scene({ state, trail, method, paused, speed, dt, onSample }: {
  state: State;
  trail: [number, number, number][];
  method: Method;
  paused: boolean;
  speed: number;
  dt: number;
  onSample: (state: State, steps: number, time: number) => void;
}) {
  const live = useRef({ ...state, steps: 0, time: 0 });
  const scale = 1 / EARTH_RADIUS_M;
  useFrame((_, frameDt) => {
    if (paused) return;
    const hops = Math.max(1, Math.round(speed));
    for (let i = 0; i < hops; i++) {
      try {
        const next = step(live.current, dt, method);
        live.current = { ...next, steps: live.current.steps + 1, time: live.current.time + dt };
      } catch {
        return;
      }
    }
    if (live.current.steps % 4 === 0) onSample(live.current, live.current.steps, live.current.time);
    void frameDt;
  });
  const p = state.r.map((n) => n * scale) as [number, number, number];
  const a = acceleration(state.r);
  const vHat = state.v.map((n) => n / Math.max(1, Math.hypot(...state.v))) as [number, number, number];
  const aHat = a.map((n) => n / Math.max(1e-9, Math.hypot(...a))) as [number, number, number];
  return (
    <>
      <color attach="background" args={["#05080f"]} />
      <ambientLight intensity={0.45} />
      <directionalLight position={[4, 3, 2]} intensity={1.4} />
      <mesh>
        <sphereGeometry args={[1, 48, 32]} />
        <meshStandardMaterial color="#1d4e89" roughness={0.75} />
      </mesh>
      <Line points={[[0, 0, 0], [1.8, 0, 0]]} color="#fc3d21" lineWidth={1} />
      <Line points={[[0, 0, 0], [0, 1.8, 0]]} color="#3ddc84" lineWidth={1} />
      <Line points={[[0, 0, 0], [0, 0, 1.8]]} color="#67e8f9" lineWidth={1} />
      {trail.length > 1 && <Line points={trail.map((q) => q.map((n) => n * scale) as [number, number, number])} color={COLORS[method]} lineWidth={2} />}
      <mesh position={p}>
        <boxGeometry args={[0.06, 0.04, 0.08]} />
        <meshStandardMaterial color="#f4f7fb" metalness={0.4} />
      </mesh>
      <Line points={[p, [p[0] + vHat[0] * 0.35, p[1] + vHat[1] * 0.35, p[2] + vHat[2] * 0.35]]} color="#f2b84b" lineWidth={2} />
      <Line points={[p, [p[0] + aHat[0] * 0.35, p[1] + aHat[1] * 0.35, p[2] + aHat[2] * 0.35]]} color="#fc3d21" lineWidth={2} />
      <OrbitControls enablePan={false} />
    </>
  );
}

export function EulerOrbitalLab() {
  const [altitudeKm, setAltitudeKm] = useState(400);
  const [speedScale, setSpeedScale] = useState(1);
  const [dt, setDt] = useState(10);
  const [minutes, setMinutes] = useState(90);
  const [method, setMethod] = useState<Method>("rk4");
  const [speed, setSpeed] = useState(2);
  const [paused, setPaused] = useState(true);
  const [advanced, setAdvanced] = useState(false);
  const [error, setError] = useState("");
  const [live, setLive] = useState<State>(() => initialCircularState(400_000));
  const [steps, setSteps] = useState(0);
  const [time, setTime] = useState(0);
  const [trail, setTrail] = useState<[number, number, number][]>([initialCircularState(400_000).r]);
  const [comparison, setComparison] = useState<null | { method: Method; drift: number; radiusKm: number; steps: number; ms: number }[]>(null);
  const resetKey = useRef(0);

  const radius = EARTH_RADIUS_M + altitudeKm * 1000;
  const period = circularPeriod(radius);
  const vCirc = circularSpeed(radius);

  function reset(nextPaused = true) {
    try {
      const state = initialCircularState(altitudeKm * 1000, speedScale);
      resetKey.current += 1;
      setLive(state);
      setTrail([state.r]);
      setSteps(0);
      setTime(0);
      setPaused(nextPaused);
      setError("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "The orbit could not be started.");
    }
  }

  function compare() {
    const state = initialCircularState(altitudeKm * 1000, speedScale);
    const seconds = Math.min(period, minutes * 60);
    const rows = METHODS.map(({ id }) => {
      const started = performance.now();
      const samples: Sample[] = propagate(state, dt, seconds, id);
      return {
        method: id,
        drift: energyDrift(samples),
        radiusKm: radiusError(samples, radius) / 1000,
        steps: samples.at(-1)?.steps ?? 0,
        ms: performance.now() - started,
      };
    });
    setComparison(rows);
  }

  const example = useMemo(() => {
    const state = initialCircularState(altitudeKm * 1000, speedScale);
    const next = step(state, dt, "explicit-euler");
    return { state, next };
  }, [altitudeKm, speedScale, dt]);

  const energy = specificEnergy(live);
  const h = specificAngularMomentum(live);
  const accel = Math.hypot(...acceleration(live.r));

  return (
    <div className="mx-auto grid max-w-6xl gap-4 px-3 py-4 lg:grid-cols-[320px_1fr]">
      <section className="space-y-3 rounded-2xl border border-cyan-400/20 bg-slate-950/80 p-4 text-sm text-slate-200">
        <h1 className="text-xl font-bold text-white">Euler Orbital Mechanics Laboratory</h1>
        <p>Compare explicit Euler, semi-implicit Euler, and RK4 on the same Earth gravity field. μ = {MU_M3_S2.toExponential(6)} m³/s². Earth radius = {fmt(EARTH_RADIUS_M, 0)} m.</p>
        <label className="block">Altitude (km)
          <input className="mt-1 w-full" type="range" min={160} max={2000} value={altitudeKm} onChange={(e) => setAltitudeKm(Number(e.target.value))} />
          <b>{altitudeKm} km</b>
        </label>
        <label className="block">Speed / circular speed
          <input className="mt-1 w-full" type="range" min={0.5} max={1.5} step={0.01} value={speedScale} onChange={(e) => setSpeedScale(Number(e.target.value))} />
          <b>{speedScale.toFixed(2)} × ({fmt(vCirc * speedScale / 1000, 3)} km/s)</b>
        </label>
        <label className="block">Time step (s)
          <input className="mt-1 w-full" type="number" min={0.1} step={1} value={dt} onChange={(e) => setDt(Number(e.target.value))} />
        </label>
        <label className="block">Comparison duration (min)
          <input className="mt-1 w-full" type="number" min={1} max={180} value={minutes} onChange={(e) => setMinutes(Number(e.target.value))} />
        </label>
        <label className="block">Integrator
          <select className="mt-1 w-full bg-slate-900 p-2" value={method} onChange={(e) => setMethod(e.target.value as Method)}>
            {METHODS.map((item) => <option key={item.id} value={item.id}>{item.label}</option>)}
          </select>
        </label>
        <label className="block">Playback steps per frame
          <input className="mt-1 w-full" type="range" min={1} max={20} value={speed} onChange={(e) => setSpeed(Number(e.target.value))} />
        </label>
        <div className="flex flex-wrap gap-2">
          <button type="button" className="rounded bg-cyan-400 px-3 py-2 font-semibold text-slate-950" onClick={() => reset(false)}>Start</button>
          <button type="button" className="rounded border border-white/20 px-3 py-2" onClick={() => setPaused((v) => !v)}>{paused ? "Resume" : "Pause"}</button>
          <button type="button" className="rounded border border-white/20 px-3 py-2" onClick={() => reset(true)}>Reset</button>
          <button type="button" className="rounded border border-white/20 px-3 py-2" onClick={compare}>Compare</button>
        </div>
        {error && <p className="text-red-300">{error}</p>}
        <p>Circular period at this altitude: {fmt(period / 60, 1)} min. Escape speed: {fmt(escapeSpeed(radius) / 1000, 3)} km/s. A speed below circular makes an ellipse. Above escape speed, the path is not closed.</p>
        <button type="button" className="underline" onClick={() => setAdvanced((v) => !v)}>{advanced ? "Beginner notes" : "Advanced notes"}</button>
        <div className="space-y-2 text-slate-300">
          <p>Explicit Euler updates position with the old velocity, then velocity with acceleration. Energy usually grows, so a circular orbit spirals out.</p>
          <p>Semi-implicit Euler updates velocity first and then moves with that new velocity. It holds energy more steadily on this gravity field.</p>
          <p>RK4 samples acceleration four times per step. On the tested 400 km orbit with a 20 s step, its radius error after one period was smaller than explicit Euler.</p>
          {advanced && <p>One explicit step from the selected start: r moves by v·Δt and v moves by a·Δt. New radius {fmt(Math.hypot(...example.next.r) / 1000, 3)} km.</p>}
        </div>
        <details>
          <summary className="cursor-pointer font-semibold text-white">Module layout</summary>
          <p className="mt-2">The integrator lives in <code>client/src/lib/eulerLab/physics.ts</code> and does not import React. This page only draws the state and the controls. Tests are <code>physics.test.ts</code>. Run them with <code>npx vitest run client/src/lib/eulerLab/physics.test.ts</code>.</p>
        </details>
      </section>
      <div className="space-y-3">
        <div className="h-[55vh] min-h-[320px] overflow-hidden rounded-2xl border border-white/10">
          <Canvas key={resetKey.current} camera={{ position: [2.2, 1.4, 2.2], fov: 45 }}>
            <Scene
              state={live}
              trail={trail}
              method={method}
              paused={paused}
              speed={speed}
              dt={dt}
              onSample={(next, count, t) => {
                setLive(next);
                setSteps(count);
                setTime(t);
                setTrail((prev) => [...prev, next.r].slice(-700));
              }}
            />
          </Canvas>
        </div>
        <p className="text-xs text-slate-400">Gold line: velocity direction. Red line from the satellite: gravity direction. Axis colors: x red, y green, z cyan. Drag to rotate. Scroll or pinch to zoom.</p>
        <dl className="grid grid-cols-2 gap-2 text-sm text-slate-200 md:grid-cols-3">
          {[
            ["X position", `${fmt(live.r[0] / 1000, 1)} km`],
            ["Y position", `${fmt(live.r[1] / 1000, 1)} km`],
            ["Z position", `${fmt(live.r[2] / 1000, 1)} km`],
            ["Velocity X", `${fmt(live.v[0] / 1000, 3)} km/s`],
            ["Velocity Y", `${fmt(live.v[1] / 1000, 3)} km/s`],
            ["Velocity Z", `${fmt(live.v[2] / 1000, 3)} km/s`],
            ["Total speed", `${fmt(Math.hypot(...live.v) / 1000, 3)} km/s`],
            ["Acceleration", `${fmt(accel, 3)} m/s²`],
            ["Altitude", `${fmt((Math.hypot(...live.r) - EARTH_RADIUS_M) / 1000, 1)} km`],
            ["Radius", `${fmt(Math.hypot(...live.r) / 1000, 1)} km`],
            ["Specific energy", `${fmt(energy / 1e6, 3)} MJ/kg`],
            ["Angular momentum", `${fmt(Math.hypot(...h) / 1e9, 3)} ×10⁹ m²/s`],
            ["Time", `${fmt(time, 0)} s`],
            ["Steps", String(steps)],
          ].map(([name, value]) => (
            <div key={name} className="rounded-xl border border-white/10 p-2">
              <dt className="text-slate-400">{name}</dt>
              <dd className="font-semibold text-white">{value}</dd>
            </div>
          ))}
        </dl>
        {comparison && (
          <table className="w-full text-left text-sm text-slate-200">
            <thead>
              <tr><th>Method</th><th>Energy drift</th><th>Radius error</th><th>Steps</th><th>Compute</th></tr>
            </thead>
            <tbody>
              {comparison.map((row) => (
                <tr key={row.method}>
                  <td>{METHODS.find((item) => item.id === row.method)?.label}</td>
                  <td>{row.drift.toExponential(3)} J/kg</td>
                  <td>{fmt(row.radiusKm, 2)} km</td>
                  <td>{row.steps}</td>
                  <td>{fmt(row.ms, 1)} ms</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
