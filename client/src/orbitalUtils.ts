/**
 * Accurate orbital numbers for display (period, altitude, speed).
 * Uses standard formulas: T = 2π√(a³/μ), altitude ≈ a - R_Earth, v = √(μ/r).
 */
import type { OrbitalElements, CartesianState } from "../../shared/types";
import { EARTH_RADIUS_KM } from "../../shared/const";

const MU = 398600.4418; // km³/s²

/** Client-side orbit presets (same as server) so MEO/GEO work without API. */
export function getOrbitTemplateClient(preset: "LEO" | "MEO" | "GEO"): OrbitalElements {
  const R = EARTH_RADIUS_KM;
  if (preset === "LEO") {
    return { semiMajorAxisKm: R + 400, eccentricity: 0.0001, inclinationDeg: 51.6, raanDeg: 0, argPerigeeDeg: 0, trueAnomalyDeg: 0 };
  }
  if (preset === "MEO") {
    return { semiMajorAxisKm: R + 20200, eccentricity: 0.01, inclinationDeg: 55, raanDeg: 0, argPerigeeDeg: 0, trueAnomalyDeg: 0 };
  }
  return { semiMajorAxisKm: R + 35786, eccentricity: 0.0001, inclinationDeg: 0, raanDeg: 0, argPerigeeDeg: 0, trueAnomalyDeg: 0 };
}

/** Orbital period in minutes (accurate for elliptic orbits). */
export function getOrbitalPeriodMinutes(aKm: number): number {
  if (aKm <= 0) return 0;
  const Tseconds = 2 * Math.PI * Math.sqrt((aKm * aKm * aKm) / MU);
  return Tseconds / 60;
}

/** Altitude in km (average for ellipse: a - R_Earth; for circular, perigee = apogee). */
export function getAltitudeKm(aKm: number): number {
  return Math.max(0, aKm - EARTH_RADIUS_KM);
}

/** Perigee and apogee altitudes in km. Perigee = closest to Earth, apogee = farthest. */
export function getPerigeeApogeeKm(aKm: number, e: number): { perigeeKm: number; apogeeKm: number } {
  if (aKm <= 0 || !Number.isFinite(e)) return { perigeeKm: 0, apogeeKm: 0 };
  const eClamp = Math.max(0, Math.min(1, e));
  const rPerigee = aKm * (1 - eClamp);
  const rApogee = aKm * (1 + eClamp);
  return {
    perigeeKm: Math.max(0, rPerigee - EARTH_RADIUS_KM),
    apogeeKm: Math.max(0, rApogee - EARTH_RADIUS_KM),
  };
}

/** Instantaneous speed in km/s from Cartesian state. */
export function getSpeedKmS(state: CartesianState): number {
  const v = Math.sqrt(state.vx * state.vx + state.vy * state.vy + state.vz * state.vz);
  return v;
}

/** Get real-world summary from orbital elements. */
export function getOrbitSummary(el: OrbitalElements): {
  periodMin: number;
  altitudeKm: number;
  realWorldLike: string;
} {
  const a = el.semiMajorAxisKm;
  const periodMin = getOrbitalPeriodMinutes(a);
  const altitudeKm = getAltitudeKm(a);
  let realWorldLike = "Custom orbit";
  if (altitudeKm >= 300 && altitudeKm <= 600) realWorldLike = "Like the ISS (Low Earth Orbit)";
  else if (altitudeKm >= 19000 && altitudeKm <= 22000) realWorldLike = "Like GPS satellites (Medium Earth Orbit)";
  else if (altitudeKm >= 35000 && altitudeKm <= 36000) realWorldLike = "Like weather & TV satellites (Geostationary)";
  return { periodMin, altitudeKm, realWorldLike };
}
