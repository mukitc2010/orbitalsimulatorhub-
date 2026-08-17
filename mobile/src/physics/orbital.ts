/**
 * Orbital mechanics engine — same formulas as the Orbital Simulator Hub web app:
 * T = 2π√(a³/μ), v = √(μ/r), Kepler's equation propagation for elliptic orbits.
 * Units: km, seconds, degrees at the API surface (radians internally).
 */

export const EARTH_RADIUS_KM = 6371;
export const MU = 398600.4418; // km³/s² — Earth's gravitational parameter

export type OrbitPreset = "LEO" | "MEO" | "GEO";

export interface OrbitalElements {
  semiMajorAxisKm: number;
  eccentricity: number;
  inclinationDeg: number;
  raanDeg: number;
  argPerigeeDeg: number;
  trueAnomalyDeg: number;
}

export interface Vec3 {
  x: number;
  y: number;
  z: number;
}

const DEG = Math.PI / 180;

/** Orbit presets matching the web simulator (ISS-like LEO, GPS-like MEO, geostationary). */
export function getOrbitTemplate(preset: OrbitPreset): OrbitalElements {
  const R = EARTH_RADIUS_KM;
  if (preset === "LEO") {
    return { semiMajorAxisKm: R + 400, eccentricity: 0.0001, inclinationDeg: 51.6, raanDeg: 0, argPerigeeDeg: 0, trueAnomalyDeg: 0 };
  }
  if (preset === "MEO") {
    return { semiMajorAxisKm: R + 20200, eccentricity: 0.01, inclinationDeg: 55, raanDeg: 0, argPerigeeDeg: 0, trueAnomalyDeg: 0 };
  }
  return { semiMajorAxisKm: R + 35786, eccentricity: 0.0001, inclinationDeg: 0, raanDeg: 0, argPerigeeDeg: 0, trueAnomalyDeg: 0 };
}

/** Orbital period in minutes: T = 2π√(a³/μ). */
export function getOrbitalPeriodMinutes(aKm: number): number {
  if (aKm <= 0) return 0;
  return (2 * Math.PI * Math.sqrt((aKm * aKm * aKm) / MU)) / 60;
}

/** Mean altitude above Earth's surface in km. */
export function getAltitudeKm(aKm: number): number {
  return Math.max(0, aKm - EARTH_RADIUS_KM);
}

/** Circular orbital speed at radius r: v = √(μ/r), in km/s. */
export function getOrbitalSpeedKmS(rKm: number): number {
  if (rKm <= 0) return 0;
  return Math.sqrt(MU / rKm);
}

/** Escape velocity at radius r: v = √(2μ/r), in km/s. */
export function getEscapeVelocityKmS(rKm: number): number {
  if (rKm <= 0) return 0;
  return Math.sqrt((2 * MU) / rKm);
}

/** Perigee/apogee altitudes for an elliptic orbit. */
export function getPerigeeApogeeKm(aKm: number, e: number): { perigeeKm: number; apogeeKm: number } {
  const eClamp = Math.max(0, Math.min(0.99, e));
  return {
    perigeeKm: Math.max(0, aKm * (1 - eClamp) - EARTH_RADIUS_KM),
    apogeeKm: Math.max(0, aKm * (1 + eClamp) - EARTH_RADIUS_KM),
  };
}

/** Human-friendly description of what an orbit resembles. */
export function getRealWorldLike(altitudeKm: number): string {
  if (altitudeKm >= 300 && altitudeKm <= 600) return "Like the ISS (Low Earth Orbit)";
  if (altitudeKm >= 19000 && altitudeKm <= 22000) return "Like GPS satellites (Medium Earth Orbit)";
  if (altitudeKm >= 35000 && altitudeKm <= 36000) return "Like weather & TV satellites (Geostationary)";
  return "Custom orbit";
}

/** Solve Kepler's equation M = E − e·sin(E) for eccentric anomaly E (radians). */
function solveKepler(meanAnomaly: number, e: number): number {
  let E = e < 0.8 ? meanAnomaly : Math.PI;
  for (let i = 0; i < 12; i++) {
    const delta = (E - e * Math.sin(E) - meanAnomaly) / (1 - e * Math.cos(E));
    E -= delta;
    if (Math.abs(delta) < 1e-9) break;
  }
  return E;
}

/**
 * Position on the orbit at time t seconds after epoch, in Earth-centered
 * inertial km. Also returns instantaneous speed in km/s.
 */
export function propagate(el: OrbitalElements, tSeconds: number): { position: Vec3; speedKmS: number } {
  const a = el.semiMajorAxisKm;
  const e = Math.max(0, Math.min(0.99, el.eccentricity));
  const inc = el.inclinationDeg * DEG;
  const raan = el.raanDeg * DEG;
  const argp = el.argPerigeeDeg * DEG;

  // Mean anomaly at epoch from the initial true anomaly
  const nu0 = el.trueAnomalyDeg * DEG;
  const E0 = 2 * Math.atan2(Math.sqrt(1 - e) * Math.sin(nu0 / 2), Math.sqrt(1 + e) * Math.cos(nu0 / 2));
  const M0 = E0 - e * Math.sin(E0);

  const n = Math.sqrt(MU / (a * a * a)); // mean motion, rad/s
  const M = M0 + n * tSeconds;
  const E = solveKepler(M, e);

  const nu = 2 * Math.atan2(Math.sqrt(1 + e) * Math.sin(E / 2), Math.sqrt(1 - e) * Math.cos(E / 2));
  const r = a * (1 - e * Math.cos(E));

  // Perifocal coordinates
  const xp = r * Math.cos(nu);
  const yp = r * Math.sin(nu);

  const position = perifocalToECI(xp, yp, raan, argp, inc);

  // Vis-viva: v = √(μ(2/r − 1/a))
  const speedKmS = Math.sqrt(MU * (2 / r - 1 / a));

  return { position, speedKmS };
}

/** Sample the full orbit ellipse as ECI points (for drawing the orbit ring). */
export function sampleOrbitPath(el: OrbitalElements, segments = 128): Vec3[] {
  const a = el.semiMajorAxisKm;
  const e = Math.max(0, Math.min(0.99, el.eccentricity));
  const inc = el.inclinationDeg * DEG;
  const raan = el.raanDeg * DEG;
  const argp = el.argPerigeeDeg * DEG;
  const points: Vec3[] = [];
  for (let i = 0; i <= segments; i++) {
    const nu = (i / segments) * 2 * Math.PI;
    const r = (a * (1 - e * e)) / (1 + e * Math.cos(nu));
    points.push(perifocalToECI(r * Math.cos(nu), r * Math.sin(nu), raan, argp, inc));
  }
  return points;
}

/** Rotate perifocal (PQW) coordinates into Earth-centered inertial (ECI). */
function perifocalToECI(xp: number, yp: number, raan: number, argp: number, inc: number): Vec3 {
  const cosO = Math.cos(raan), sinO = Math.sin(raan);
  const cosw = Math.cos(argp), sinw = Math.sin(argp);
  const cosi = Math.cos(inc), sini = Math.sin(inc);

  const x = (cosO * cosw - sinO * sinw * cosi) * xp + (-cosO * sinw - sinO * cosw * cosi) * yp;
  const y = (sinO * cosw + cosO * sinw * cosi) * xp + (-sinO * sinw + cosO * cosw * cosi) * yp;
  const z = sini * sinw * xp + sini * cosw * yp;
  return { x, y, z };
}
