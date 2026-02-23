/**
 * Orbit Math Tool — Orbital mechanics calculations for AstroBot AGI
 */

const MU_EARTH = 398600.4418; // km³/s²
const R_EARTH_KM = 6371;

export interface OrbitMathResult {
  type: string;
  value: number;
  unit: string;
  explanation: string;
  formula?: string;
}

export function orbitalPeriod(altitudeKm: number): OrbitMathResult {
  const r = R_EARTH_KM + altitudeKm;
  const T = 2 * Math.PI * Math.sqrt((r ** 3) / MU_EARTH);
  const Tmin = T / 60;
  return {
    type: "orbital_period",
    value: Tmin >= 60 ? Tmin / 60 : Tmin,
    unit: Tmin >= 60 ? "hours" : "min",
    explanation: `At ${altitudeKm} km altitude, orbital period T = 2π√(a³/μ) = ${Tmin >= 60 ? (Tmin / 60).toFixed(2) : Tmin.toFixed(1)} ${Tmin >= 60 ? "hours" : "minutes"}.`,
    formula: "T = 2π √(a³/μ)",
  };
}

export function escapeVelocity(altitudeKm: number): OrbitMathResult {
  const r = (R_EARTH_KM + altitudeKm) * 1000; // m
  const G = 6.674e-11;
  const M = 5.972e24;
  const v = Math.sqrt((2 * G * M) / r) / 1000; // km/s
  return {
    type: "escape_velocity",
    value: v,
    unit: "km/s",
    explanation: `Escape velocity from ${altitudeKm} km altitude: v_esc = √(2GM/r) = ${v.toFixed(2)} km/s.`,
    formula: "v_esc = √(2μ/r)",
  };
}

export function orbitalVelocity(altitudeKm: number): OrbitMathResult {
  const r = R_EARTH_KM + altitudeKm;
  const v = Math.sqrt(MU_EARTH / r);
  return {
    type: "orbital_velocity",
    value: v,
    unit: "km/s",
    explanation: `Orbital velocity at ${altitudeKm} km: v = √(μ/r) = ${v.toFixed(2)} km/s (${(v * 3600).toFixed(0)} km/h).`,
    formula: "v = √(μ/r)",
  };
}

export function hohmannTransfer(r1Km: number, r2Km: number): OrbitMathResult {
  const r1 = r1Km;
  const r2 = r2Km;
  const a = (r1 + r2) / 2;
  const dv1 = Math.sqrt(MU_EARTH / r1) * (Math.sqrt(2 * r2 / (r1 + r2)) - 1);
  const dv2 = Math.sqrt(MU_EARTH / r2) * (1 - Math.sqrt(2 * r1 / (r1 + r2)));
  const total = dv1 + dv2;
  return {
    type: "hohmann_delta_v",
    value: total,
    unit: "km/s",
    explanation: `Hohmann transfer r₁=${r1Km} km → r₂=${r2Km} km: Δv₁=${dv1.toFixed(3)} km/s, Δv₂=${dv2.toFixed(3)} km/s, total Δv=${total.toFixed(3)} km/s.`,
    formula: "Δv₁ + Δv₂ (vis-viva)",
  };
}

export function visViva(rKm: number, aKm: number): OrbitMathResult {
  const v = Math.sqrt(MU_EARTH * (2 / rKm - 1 / aKm));
  return {
    type: "vis_viva_velocity",
    value: v,
    unit: "km/s",
    explanation: `Vis-viva at r=${rKm} km, a=${aKm} km: v = √(μ(2/r − 1/a)) = ${v.toFixed(2)} km/s.`,
    formula: "v = √(μ(2/r − 1/a))",
  };
}

export function runOrbitMath(params: {
  tool: "period" | "escape" | "velocity" | "hohmann" | "visviva";
  altitude?: number;
  r1?: number;
  r2?: number;
  r?: number;
  a?: number;
}): OrbitMathResult | null {
  const { tool } = params;
  if (tool === "period" && params.altitude != null) return orbitalPeriod(params.altitude);
  if (tool === "escape" && params.altitude != null) return escapeVelocity(params.altitude);
  if (tool === "velocity" && params.altitude != null) return orbitalVelocity(params.altitude);
  if (tool === "hohmann" && params.r1 != null && params.r2 != null) return hohmannTransfer(params.r1, params.r2);
  if (tool === "visviva" && params.r != null && params.a != null) return visViva(params.r, params.a);
  return null;
}
