import { EARTH_RADIUS_KM, MU_EARTH_KM3_S2 } from "./const";

/** Mean sidereal day. GEO period in the two-body model. */
export const SIDEREAL_DAY_SECONDS = 86164.0905;

export const MIN_ALTITUDE_KM = 160;
export const MAX_ALTITUDE_KM = 100_000;

export function radiusFromAltitudeKm(altitudeKm: number): number {
  return EARTH_RADIUS_KM + altitudeKm;
}

export function circularSpeedKmS(radiusKm: number): number {
  return Math.sqrt(MU_EARTH_KM3_S2 / radiusKm);
}

export function circularPeriodMinutes(radiusKm: number): number {
  return (2 * Math.PI * Math.sqrt(radiusKm ** 3 / MU_EARTH_KM3_S2)) / 60;
}

export function escapeSpeedKmS(radiusKm: number): number {
  return Math.sqrt((2 * MU_EARTH_KM3_S2) / radiusKm);
}

/** Altitude of a circular equatorial orbit whose period matches one sidereal day. */
export function geostationaryAltitudeKm(): number {
  const semiMajorAxisKm = Math.cbrt(MU_EARTH_KM3_S2 * (SIDEREAL_DAY_SECONDS / (2 * Math.PI)) ** 2);
  return semiMajorAxisKm - EARTH_RADIUS_KM;
}

export function altitudeInRange(altitudeKm: number): boolean {
  return Number.isFinite(altitudeKm) && altitudeKm >= MIN_ALTITUDE_KM && altitudeKm <= MAX_ALTITUDE_KM;
}
