import type { SatelliteState } from "./EarthVisualization";
import { getOrbitalElementsFromState } from "../orbitalClient";
import { getOrbitalPeriodMinutes, getSpeedKmS, getPerigeeApogeeKm } from "../orbitalUtils";
import type { OrbitalElements } from "../../../shared/types";

const EARTH_RADIUS_KM = 6371;

interface SimulatorInfoPanelProps {
  satellites: SatelliteState[];
  stepSeconds: number;
  speedMultiplier: number;
}

function getRealWorldLike(altitudeKm: number): string {
  if (Number.isNaN(altitudeKm) || altitudeKm < 0) return "Custom orbit";
  if (altitudeKm >= 200 && altitudeKm <= 800) return "Like the ISS (Low Earth Orbit)";
  if (altitudeKm >= 15000 && altitudeKm <= 25000) return "Like GPS satellites (Medium Earth Orbit)";
  if (altitudeKm >= 30000 && altitudeKm <= 40000) return "Like weather & TV satellites (Geostationary)";
  return "Custom orbit";
}

export function SimulatorInfoPanel({
  satellites,
  stepSeconds,
  speedMultiplier,
}: SimulatorInfoPanelProps) {
  if (satellites.length === 0) {
    return (
      <div className="rounded-lg border-2 border-[var(--accent-cyan)]/50 bg-white/90 p-4 text-sm">
        <h3 className="text-xs font-mono-tech text-slate-500 uppercase tracking-wide mb-2">Orbit info</h3>
        <p className="font-medium text-slate-700">No satellite yet</p>
        <p className="text-slate-600 mt-1">
          Add one using the <strong>presets</strong> (LEO, MEO, GEO) in the form on the right, or enter your own numbers and click &quot;Add satellite.&quot; Once a satellite is added, this panel will show its height, orbital period, and speed.
        </p>
      </div>
    );
  }

  type Row = { name: string; altitudeKm: number; periodMin: number; speedKmS: number; perigeeKm: number; apogeeKm: number; realWorldLike: string };
  const rows: Row[] = [];
  for (const sat of satellites) {
    const cart = sat?.lastCartesian;
    if (!cart) continue;
    let elements: OrbitalElements;
    try {
      elements = getOrbitalElementsFromState(cart);
    } catch {
      elements = { semiMajorAxisKm: 0, eccentricity: 0, inclinationDeg: 0, raanDeg: 0, argPerigeeDeg: 0, trueAnomalyDeg: 0 };
    }
    const r = Math.sqrt(cart.x * cart.x + cart.y * cart.y + cart.z * cart.z);
    const aKm = elements.semiMajorAxisKm > 0 && isFinite(elements.semiMajorAxisKm) ? elements.semiMajorAxisKm : r;
    const periodMin = getOrbitalPeriodMinutes(aKm);
    const altitudeKm = Math.max(0, aKm - EARTH_RADIUS_KM);
    const { perigeeKm, apogeeKm } = getPerigeeApogeeKm(aKm, elements.eccentricity ?? 0);
    rows.push({
      name: sat.name ?? "Satellite",
      altitudeKm,
      periodMin,
      speedKmS: getSpeedKmS(cart),
      perigeeKm,
      apogeeKm,
      realWorldLike: getRealWorldLike(altitudeKm),
    });
  }

  const formatPeriod = (min: number) =>
    Number.isFinite(min) && min > 0 ? (min >= 60 ? `~${(min / 60).toFixed(1)} h` : `~${Math.round(min)} min`) : "—";
  const formatKm = (km: number) => (Number.isFinite(km) && km >= 0 ? `~${Math.round(km)} km` : "—");
  const formatSpeed = (v: number) => (Number.isFinite(v) && v >= 0 ? `~${v.toFixed(2)} km/s` : "—");

  if (satellites.length >= 2) {
    return (
      <div className="mt-2 rounded-lg border-2 border-[var(--accent-cyan)]/50 bg-white/90 p-4 text-sm space-y-3">
        <h3 className="text-xs font-mono-tech text-slate-500 uppercase tracking-wide">Compare orbits</h3>
        <p className="text-slate-600 text-xs">Side-by-side view of all satellites. Perigee = closest to Earth; apogee = farthest.</p>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="py-2 pr-2 font-semibold text-slate-700">Name</th>
                <th className="py-2 pr-2 font-semibold text-slate-700">Height</th>
                <th className="py-2 pr-2 font-semibold text-slate-700">Period</th>
                <th className="py-2 pr-2 font-semibold text-slate-700">Speed</th>
                <th className="py-2 pr-2 font-semibold text-slate-700" title="Closest to Earth">Perigee</th>
                <th className="py-2 pr-2 font-semibold text-slate-700" title="Farthest from Earth">Apogee</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={satellites[i]?.id ?? i} className="border-b border-slate-100">
                  <td className="py-1.5 pr-2 font-medium text-slate-900">{row.name}</td>
                  <td className="py-1.5 pr-2 text-slate-700">{formatKm(row.altitudeKm)}</td>
                  <td className="py-1.5 pr-2 text-slate-700">{formatPeriod(row.periodMin)}</td>
                  <td className="py-1.5 pr-2 text-slate-700">{formatSpeed(row.speedKmS)}</td>
                  <td className="py-1.5 pr-2 text-slate-700">{formatKm(row.perigeeKm)}</td>
                  <td className="py-1.5 pr-2 text-slate-700">{formatKm(row.apogeeKm)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-slate-500 text-xs pt-1 border-t border-slate-200">
          At {speedMultiplier}x speed, each step = {stepSeconds * speedMultiplier} seconds of simulation time.
        </p>
      </div>
    );
  }

  const sat = satellites[0];
  const cart = sat?.lastCartesian;
  if (!cart || rows.length === 0) return null;
  const row = rows[0];
  const periodStr = formatPeriod(row.periodMin);
  const altStr = formatKm(row.altitudeKm);
  const speedStr = formatSpeed(row.speedKmS);
  const perigeeStr = formatKm(row.perigeeKm);
  const apogeeStr = formatKm(row.apogeeKm);

  return (
    <div className="mt-2 rounded-lg border-2 border-[var(--accent-cyan)]/50 bg-white/90 p-4 text-sm space-y-3">
      <h3 className="text-xs font-mono-tech text-slate-500 uppercase tracking-wide">Orbit info</h3>
      <p className="font-bold text-slate-900">{sat?.name ?? "Satellite"}</p>
      <p className="text-[var(--accent-cyan)] font-medium">{row.realWorldLike}</p>
      <dl className="text-slate-700 space-y-2">
        <div>
          <dt className="font-semibold" title="Average distance from Earth's surface. Higher orbits take longer to complete one lap.">Height above Earth: {altStr}</dt>
          <dd className="text-xs text-slate-500 ml-0 mt-0.5">Average distance from the ground (in km). Higher = longer orbital period.</dd>
        </div>
        <div>
          <dt className="font-semibold" title="Closest point to Earth (altitude in km).">Perigee: {perigeeStr}</dt>
          <dd className="text-xs text-slate-500 ml-0 mt-0.5">Closest distance to Earth. For nearly circular orbits (LEO, GEO), perigee ≈ height.</dd>
        </div>
        <div>
          <dt className="font-semibold" title="Farthest point from Earth (altitude in km).">Apogee: {apogeeStr}</dt>
          <dd className="text-xs text-slate-500 ml-0 mt-0.5">Farthest distance from Earth. For circular orbits, apogee ≈ perigee.</dd>
        </div>
        <div>
          <dt className="font-semibold" title="How long one full orbit takes. LEO ~90 min, GEO ~24 hours.">Time for one lap: {periodStr}</dt>
          <dd className="text-xs text-slate-500 ml-0 mt-0.5">Orbital period — how long the satellite takes to complete one orbit around Earth.</dd>
        </div>
        <div>
          <dt className="font-semibold" title="Velocity in km/s. Needed to balance gravity and stay in orbit.">Speed: {speedStr}</dt>
          <dd className="text-xs text-slate-500 ml-0 mt-0.5">Current velocity (km/s). Satellites move at several km/s to stay in orbit.</dd>
        </div>
      </dl>
      <p className="text-slate-500 text-xs pt-1 border-t border-slate-200">
        At {speedMultiplier}x speed, each step = {stepSeconds * speedMultiplier} seconds of simulation time.
      </p>
    </div>
  );
}
