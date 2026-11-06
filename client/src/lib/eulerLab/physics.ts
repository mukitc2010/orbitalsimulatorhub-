import { EARTH_RADIUS_KM, MU_EARTH_KM3_S2 } from "../../../../shared/const";

/** SI units. μ matches the shared Earth constant: 398600.4418 km³/s². */
export const MU_M3_S2 = MU_EARTH_KM3_S2 * 1e9;
export const EARTH_RADIUS_M = EARTH_RADIUS_KM * 1000;

export type Vec3 = [number, number, number];
export type Method = "explicit-euler" | "semi-implicit-euler" | "rk4";
export type State = { r: Vec3; v: Vec3 };

const add = (a: Vec3, b: Vec3, scale = 1): Vec3 => [a[0] + b[0] * scale, a[1] + b[1] * scale, a[2] + b[2] * scale];
const mag = (a: Vec3) => Math.hypot(a[0], a[1], a[2]);

export function acceleration(r: Vec3, mu = MU_M3_S2): Vec3 {
  const radius = mag(r);
  if (radius < 1) throw new Error("Position is at the gravitational singularity.");
  const scale = -mu / radius ** 3;
  return [r[0] * scale, r[1] * scale, r[2] * scale];
}

export function circularSpeed(radiusM: number, mu = MU_M3_S2): number {
  if (radiusM <= 0) throw new Error("Orbital radius must be positive.");
  return Math.sqrt(mu / radiusM);
}

export function escapeSpeed(radiusM: number, mu = MU_M3_S2): number {
  return circularSpeed(radiusM, mu) * Math.SQRT2;
}

export function circularPeriod(radiusM: number, mu = MU_M3_S2): number {
  return 2 * Math.PI * Math.sqrt(radiusM ** 3 / mu);
}

export function specificEnergy(state: State, mu = MU_M3_S2): number {
  const radius = mag(state.r);
  return 0.5 * mag(state.v) ** 2 - mu / radius;
}

export function specificAngularMomentum(state: State): Vec3 {
  const [x, y, z] = state.r;
  const [vx, vy, vz] = state.v;
  return [y * vz - z * vy, z * vx - x * vz, x * vy - y * vx];
}

export function step(state: State, dt: number, method: Method, mu = MU_M3_S2): State {
  if (!(dt > 0) || !Number.isFinite(dt)) throw new Error("Time step must be a positive finite number.");
  const a = acceleration(state.r, mu);
  if (method === "explicit-euler") {
    return { r: add(state.r, state.v, dt), v: add(state.v, a, dt) };
  }
  if (method === "semi-implicit-euler") {
    const v = add(state.v, a, dt);
    return { r: add(state.r, v, dt), v };
  }
  const k1r = state.v;
  const k1v = a;
  const k2r = add(state.v, k1v, dt / 2);
  const k2v = acceleration(add(state.r, k1r, dt / 2), mu);
  const k3r = add(state.v, k2v, dt / 2);
  const k3v = acceleration(add(state.r, k2r, dt / 2), mu);
  const k4r = add(state.v, k3v, dt);
  const k4v = acceleration(add(state.r, k3r, dt), mu);
  const combine = (base: Vec3, k1: Vec3, k2: Vec3, k3: Vec3, k4: Vec3): Vec3 =>
    add(add(add(add(base, k1, dt / 6), k2, dt / 3), k3, dt / 3), k4, dt / 6);
  return { r: combine(state.r, k1r, k2r, k3r, k4r), v: combine(state.v, k1v, k2v, k3v, k4v) };
}

export function initialCircularState(altitudeM: number, speedScale = 1): State {
  const radius = EARTH_RADIUS_M + altitudeM;
  const speed = circularSpeed(radius) * speedScale;
  return { r: [radius, 0, 0], v: [0, 0, speed] };
}

export type Sample = State & { t: number; energy: number; steps: number };

export function propagate(state: State, dt: number, seconds: number, method: Method, mu = MU_M3_S2): Sample[] {
  if (seconds < 0) throw new Error("Duration cannot be negative.");
  const steps = Math.max(1, Math.ceil(seconds / dt));
  const out: Sample[] = [{ ...state, t: 0, energy: specificEnergy(state, mu), steps: 0 }];
  let current = state;
  for (let i = 1; i <= steps; i++) {
    current = step(current, dt, method, mu);
    if (i % Math.max(1, Math.floor(steps / 360)) === 0 || i === steps) {
      out.push({ ...current, t: i * dt, energy: specificEnergy(current, mu), steps: i });
    }
  }
  return out;
}

export function energyDrift(samples: Sample[]): number {
  const start = samples[0]?.energy ?? 0;
  return samples.reduce((worst, sample) => Math.max(worst, Math.abs(sample.energy - start)), 0);
}

export function radiusError(samples: Sample[], radius: number): number {
  return samples.reduce((worst, sample) => Math.max(worst, Math.abs(mag(sample.r) - radius)), 0);
}
