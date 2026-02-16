/** Client-side orbital propagation (same math as server). */
import type { CartesianState, OrbitalElements } from "../../shared/types";

const MU_KM3_S2 = 398600.4418;

function deg2rad(d: number) {
  return (d * Math.PI) / 180;
}
function rad2deg(r: number) {
  return (r * 180) / Math.PI;
}

export function keplerianToCartesian(el: OrbitalElements): CartesianState {
  const { semiMajorAxisKm: a_km, eccentricity: e, inclinationDeg: i_deg, raanDeg: raan_deg, argPerigeeDeg: argp_deg, trueAnomalyDeg: nu_deg } = el;
  const i = deg2rad(i_deg);
  const raan = deg2rad(raan_deg);
  const argp = deg2rad(argp_deg);
  const nu = deg2rad(nu_deg);
  const ecc = Math.max(1e-10, Math.min(e, 1 - 1e-10));
  const rNorm = (a_km * (1 - ecc * ecc)) / (1 + ecc * Math.cos(nu));
  const rPqw = [rNorm * Math.cos(nu), rNorm * Math.sin(nu), 0];
  const vPqw = [
    -Math.sqrt(MU_KM3_S2 / (a_km * (1 - ecc * ecc))) * Math.sin(nu),
    Math.sqrt(MU_KM3_S2 / (a_km * (1 - ecc * ecc))) * (ecc + Math.cos(nu)),
    0,
  ];
  const cR = Math.cos(raan);
  const sR = Math.sin(raan);
  const cI = Math.cos(i);
  const sI = Math.sin(i);
  const cA = Math.cos(argp);
  const sA = Math.sin(argp);
  const x = (cR * cA - sR * sA * cI) * rPqw[0] + (-cR * sA - sR * cA * cI) * rPqw[1];
  const y = (sR * cA + cR * sA * cI) * rPqw[0] + (-sR * sA + cR * cA * cI) * rPqw[1];
  const z = sA * sI * rPqw[0] + cA * sI * rPqw[1];
  const vx = (cR * cA - sR * sA * cI) * vPqw[0] + (-cR * sA - sR * cA * cI) * vPqw[1];
  const vy = (sR * cA + cR * sA * cI) * vPqw[0] + (-sR * sA + cR * cA * cI) * vPqw[1];
  const vz = sA * sI * vPqw[0] + cA * sI * vPqw[1];
  return { x, y, z, vx, vy, vz };
}

function cartesianToKeplerian(state: CartesianState): OrbitalElements {
  const { x, y, z, vx, vy, vz } = state;
  const r = Math.sqrt(x * x + y * y + z * z);
  const v = Math.sqrt(vx * vx + vy * vy + vz * vz);
  const hx = y * vz - z * vy;
  const hy = z * vx - x * vz;
  const hz = x * vy - y * vx;
  const h = Math.sqrt(hx * hx + hy * hy + hz * hz);
  const nX = -hy;
  const nY = hx;
  const n = Math.sqrt(nX * nX + nY * nY);
  const eX = (vy * hz - vz * hy) / MU_KM3_S2 - x / r;
  const eY = (vz * hx - vx * hz) / MU_KM3_S2 - y / r;
  const eZ = (vx * hy - vy * hx) / MU_KM3_S2 - z / r;
  const e = Math.sqrt(eX * eX + eY * eY + eZ * eZ);
  const energy = (v * v) / 2 - MU_KM3_S2 / r;
  const a = Math.abs(e - 1) < 1e-10 ? 1e10 : -MU_KM3_S2 / (2 * energy);
  const iRad = Math.acos(Math.max(-1, Math.min(1, hz / h)));
  const raanRad = n > 1e-10 ? Math.atan2(nY, nX) : 0;
  let argpRad = 0;
  if (e > 1e-10 && Math.sin(iRad) > 1e-10) {
    const num = eX * (nX * Math.cos(raanRad) + nY * Math.sin(raanRad)) + eY * (-nX * Math.sin(raanRad) + nY * Math.cos(raanRad));
    argpRad = Math.atan2(num, eZ * Math.sin(iRad));
  }
  let nuRad = Math.atan2(
    Math.sin(iRad) > 1e-10
      ? (x * (nX * Math.cos(raanRad) + nY * Math.sin(raanRad)) + y * (-nX * Math.sin(raanRad) + nY * Math.cos(raanRad))) / (r * Math.sin(iRad))
      : 0,
    Math.cos(iRad) !== 0 ? z / (r * Math.cos(iRad)) : 0
  );
  if (e < 1e-10) nuRad = Math.atan2(y, x) - raanRad;
  return {
    semiMajorAxisKm: a,
    eccentricity: e,
    inclinationDeg: rad2deg(iRad),
    raanDeg: rad2deg(raanRad) % 360,
    argPerigeeDeg: rad2deg(argpRad) % 360,
    trueAnomalyDeg: rad2deg(nuRad) % 360,
  };
}

/** Get Keplerian elements from current position & velocity (for accurate period/altitude). */
export function getOrbitalElementsFromState(state: CartesianState): OrbitalElements {
  return cartesianToKeplerian(state);
}

export function propagateOrbit(state: CartesianState, dtSeconds: number): CartesianState {
  const el = cartesianToKeplerian(state);
  const a = el.semiMajorAxisKm;
  const e = el.eccentricity;
  const nRadS = Math.sqrt(MU_KM3_S2 / (a * a * a));
  const nuRad = deg2rad(el.trueAnomalyDeg);
  const nuNewRad = nuRad + nRadS * dtSeconds;
  let nuNewDeg = rad2deg(nuNewRad) % 360;
  if (nuNewDeg < 0) nuNewDeg += 360;
  return keplerianToCartesian({
    ...el,
    trueAnomalyDeg: nuNewDeg,
  });
}
