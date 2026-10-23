import type { CartesianState } from "../../shared/types";
import { EARTH_RADIUS_KM, MU_EARTH_KM3_S2 } from "../../shared/const";

const MAX_INTEGRATION_STEP_SECONDS = 5;

export interface OrbitalMetrics {
  altitudeKm: number;
  speedKmS: number;
  gravityKmS2: number;
  specificEnergyKm2S2: number;
  periodSeconds: number | null;
  eccentricity: number;
  orbitType: "elliptic" | "parabolic" | "escape";
}

export function createOrbitalState(altitudeKm: number, tangentialSpeedKmS: number): CartesianState {
  const radius = EARTH_RADIUS_KM + altitudeKm;
  return { x: radius, y: 0, z: 0, vx: 0, vy: tangentialSpeedKmS, vz: 0 };
}

export function getOrbitalMetrics(state: CartesianState): OrbitalMetrics {
  const radius = Math.hypot(state.x, state.y, state.z);
  const speedKmS = Math.hypot(state.vx, state.vy, state.vz);
  const specificEnergyKm2S2 = speedKmS ** 2 / 2 - MU_EARTH_KM3_S2 / radius;
  const hx = state.y * state.vz - state.z * state.vy;
  const hy = state.z * state.vx - state.x * state.vz;
  const hz = state.x * state.vy - state.y * state.vx;
  const angularMomentumSquared = hx ** 2 + hy ** 2 + hz ** 2;
  const eccentricitySquared = Math.max(
    0,
    1 + (2 * specificEnergyKm2S2 * angularMomentumSquared) / MU_EARTH_KM3_S2 ** 2,
  );
  const eccentricity = Math.sqrt(eccentricitySquared);
  const orbitType = specificEnergyKm2S2 < -1e-8
    ? "elliptic"
    : specificEnergyKm2S2 > 1e-8
      ? "escape"
      : "parabolic";
  const semiMajorAxis = orbitType === "elliptic"
    ? -MU_EARTH_KM3_S2 / (2 * specificEnergyKm2S2)
    : null;

  return {
    altitudeKm: Math.max(0, radius - EARTH_RADIUS_KM),
    speedKmS,
    gravityKmS2: MU_EARTH_KM3_S2 / radius ** 2,
    specificEnergyKm2S2,
    periodSeconds: semiMajorAxis ? 2 * Math.PI * Math.sqrt(semiMajorAxis ** 3 / MU_EARTH_KM3_S2) : null,
    eccentricity,
    orbitType,
  };
}

function toArray(state: CartesianState): number[] {
  return [state.x, state.y, state.z, state.vx, state.vy, state.vz];
}

function fromArray(values: number[]): CartesianState {
  return { x: values[0], y: values[1], z: values[2], vx: values[3], vy: values[4], vz: values[5] };
}

function derivative(values: number[]): number[] {
  const radiusSquared = values[0] ** 2 + values[1] ** 2 + values[2] ** 2;
  const accelerationScale = -MU_EARTH_KM3_S2 / (radiusSquared * Math.sqrt(radiusSquared));
  return [
    values[3], values[4], values[5],
    values[0] * accelerationScale, values[1] * accelerationScale, values[2] * accelerationScale,
  ];
}

function offset(values: number[], slope: number[], scale: number): number[] {
  return values.map((value, index) => value + slope[index] * scale);
}

function rk4Step(state: CartesianState, dt: number): CartesianState {
  const current = toArray(state);
  const k1 = derivative(current);
  const k2 = derivative(offset(current, k1, dt / 2));
  const k3 = derivative(offset(current, k2, dt / 2));
  const k4 = derivative(offset(current, k3, dt));
  return fromArray(current.map((value, index) => value + (dt / 6) * (k1[index] + 2 * k2[index] + 2 * k3[index] + k4[index])));
}

export function advanceOrbitalState(state: CartesianState, dtSeconds: number): { state: CartesianState; impacted: boolean } {
  if (Math.hypot(state.x, state.y, state.z) <= EARTH_RADIUS_KM) return { state, impacted: true };
  if (!Number.isFinite(dtSeconds) || dtSeconds <= 0) return { state, impacted: false };

  const steps = Math.max(1, Math.ceil(dtSeconds / MAX_INTEGRATION_STEP_SECONDS));
  const stepSeconds = dtSeconds / steps;
  let next = state;
  for (let step = 0; step < steps; step += 1) {
    next = rk4Step(next, stepSeconds);
    if (Math.hypot(next.x, next.y, next.z) <= EARTH_RADIUS_KM) return { state: next, impacted: true };
  }
  return { state: next, impacted: false };
}

export function sampleOrbitPath(state: CartesianState, segments = 240, maxRadiusEarth = 12): [number, number, number][] {
  const radius = Math.hypot(state.x, state.y, state.z);
  const radial = [state.x / radius, state.y / radius, state.z / radius];
  const hx = state.y * state.vz - state.z * state.vy;
  const hy = state.z * state.vx - state.x * state.vz;
  const hz = state.x * state.vy - state.y * state.vx;
  const h = Math.hypot(hx, hy, hz);
  if (h < 1e-10) return [];

  const normal = [hx / h, hy / h, hz / h];
  const transverse = [
    normal[1] * radial[2] - normal[2] * radial[1],
    normal[2] * radial[0] - normal[0] * radial[2],
    normal[0] * radial[1] - normal[1] * radial[0],
  ];
  const eccentricityVector = [
    (state.vy * hz - state.vz * hy) / MU_EARTH_KM3_S2 - radial[0],
    (state.vz * hx - state.vx * hz) / MU_EARTH_KM3_S2 - radial[1],
    (state.vx * hy - state.vy * hx) / MU_EARTH_KM3_S2 - radial[2],
  ];
  const eccentricity = Math.hypot(...eccentricityVector);
  const periapsis = eccentricity > 1e-8
    ? eccentricityVector.map((value) => value / eccentricity)
    : radial;
  const side = [
    normal[1] * periapsis[2] - normal[2] * periapsis[1],
    normal[2] * periapsis[0] - normal[0] * periapsis[2],
    normal[0] * periapsis[1] - normal[1] * periapsis[0],
  ];
  const p = h ** 2 / MU_EARTH_KM3_S2;
  const metrics = getOrbitalMetrics(state);
  let startAngle = Math.atan2(
    radial[0] * side[0] + radial[1] * side[1] + radial[2] * side[2],
    radial[0] * periapsis[0] + radial[1] * periapsis[1] + radial[2] * periapsis[2],
  );
  let startAnglePath = startAngle;
  let sweepAngle = Math.PI * 2;

  if (metrics.orbitType !== "elliptic") {
    const maxRadius = EARTH_RADIUS_KM * maxRadiusEarth;
    const cosineLimit = Math.max(-1 / Math.max(eccentricity, 1), Math.min(1, (p / maxRadius - 1) / Math.max(eccentricity, 1e-8)));
    const limit = Math.acos(cosineLimit);
    startAnglePath = -limit;
    sweepAngle = limit * 2;
  }

  if (metrics.orbitType === "elliptic" && eccentricity > 1e-8) {
    const radialVelocity = radial[0] * state.vx + radial[1] * state.vy + radial[2] * state.vz;
    if (Math.abs(radialVelocity) < 1e-8 && startAngle > Math.PI / 2) startAngle -= Math.PI * 2;
  }

  return Array.from({ length: segments + 1 }, (_, index) => {
    const angle = metrics.orbitType === "elliptic"
      ? startAngle + (index / segments) * sweepAngle
      : startAnglePath + (index / segments) * sweepAngle;
    const distance = p / (1 + eccentricity * Math.cos(angle));
    return [
      distance * (periapsis[0] * Math.cos(angle) + side[0] * Math.sin(angle)),
      distance * (periapsis[1] * Math.cos(angle) + side[1] * Math.sin(angle)),
      distance * (periapsis[2] * Math.cos(angle) + side[2] * Math.sin(angle)),
    ];
  });
}