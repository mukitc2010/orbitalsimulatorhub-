import { EARTH_RADIUS_KM, MU_EARTH_KM3_S2 } from '../../shared/const';
import type { SimAction } from './tools/simActions';

/** Bounded local agent: observe → plan → calculate → validate → prepare.
 * Produces simulator requests, never claims they have been applied. */
export const ORACLE_AGENT = {
  id: 'oracle-loop-engineer',
  role: 'Mission planning, deterministic orbit calculations, action validation and result review',
  maxSatellitesPerRequest: 6,
} as const;
export interface OraclePlan { reply: string; actions: SimAction[]; }
export const ORACLE_SPEEDS = [1, 8, 60, 600, 3600];
export function validOracleAction(action: { type: string; payload: Record<string, unknown> }): boolean {
  const p = action.payload;
  if (action.type === 'SIM_SET_PLAYBACK') return ORACLE_SPEEDS.includes(p.speed as number) && typeof p.playing === 'boolean';
  return action.type === 'SIM_ADD_SATELLITE' && typeof p.a === 'number' && Number.isFinite(p.a)
    && p.a >= EARTH_RADIUS_KM + 160 && p.a <= EARTH_RADIUS_KM + 100000
    && p.e === 0 && typeof p.i === 'number' && Number.isFinite(p.i) && p.i >= 0 && p.i <= 180
    && typeof p.name === 'string' && p.name.length > 0 && p.name.length <= 80;
}
export function planOracleMission(message: string): OraclePlan | null {
  const q = message.toLowerCase();
  const command = /\b(deploy|add|create|launch|load|place|plan a demo|run a demo)\b/.test(q)
    && !/^(why|what|how|explain)\b/.test(q.trim());
  const altitudeText = q.match(/(-?\d[\d,]*(?:\.\d+)?)\s*(?:km|kilometers?)\b/);
  const altitude = altitudeText ? Number(altitudeText[1].replaceAll(',', '')) : undefined;
  if (!command) {
    if (/\b(geostationary|geo)\b/.test(q) && /why|stationary|never move|same place/.test(q)) {
      return { actions: [], reply: 'A geostationary satellite follows a circular, prograde orbit above the equator, with a period matching Earth’s sidereal rotation (about 23 h 56 min). It therefore stays above the same longitude and appears fixed to a ground observer. A tilted or eccentric geosynchronous orbit moves in the sky. The simulator uses an ideal two-body model.' };
    }
    if (altitude !== undefined && /how fast|speed|velocity|period|how long/.test(q)) {
      if (!Number.isFinite(altitude) || altitude < 160 || altitude > 100000) return { actions: [], reply: 'Use an Earth-orbit altitude between 160 and 100,000 km for this calculation.' };
      const r = EARTH_RADIUS_KM + altitude;
      return { actions: [], reply: `For a circular Earth orbit at ${altitude.toLocaleString('en-US')} km altitude, speed is **${Math.sqrt(MU_EARTH_KM3_S2 / r).toFixed(3)} km/s** and period is **${(2 * Math.PI * Math.sqrt(r ** 3 / MU_EARTH_KM3_S2) / 60).toFixed(1)} minutes**. Using v = √(μ/r), T = 2π√(r³/μ), r = ${r} km. Ideal two-body model.` };
    }
    // Educational questions never produce simulator side effects.
    return null;
  }
  const presets = [
    { pattern: /\b(leo|iss)\b/, altitude: 400, i: 51.6, name: 'ISS-like LEO' },
    { pattern: /\b(meo|gps)\b/, altitude: 20200, i: 55, name: 'GPS-like MEO' },
    { pattern: /\b(geo|geostationary)\b/, altitude: Math.cbrt(MU_EARTH_KM3_S2 * (86164.0905 / (2 * Math.PI)) ** 2) - EARTH_RADIUS_KM, i: 0, name: 'Geostationary GEO' },
  ].filter(p => p.pattern.test(q));
  if (altitude !== undefined && presets.length > 1) return { actions: [], reply: 'Please give each orbit its own altitude, or use the LEO, MEO and GEO presets without a shared altitude.' };
  const selected = presets.length ? presets.map(p => ({ ...p, altitude: altitude ?? p.altitude }))
    : altitude !== undefined ? [{ altitude, i: 0, name: `Satellite ${altitude} km` }] : [];
  if (!selected.length) return { actions: [], reply: 'Specify an orbit: ISS-like LEO, GPS-like MEO, GEO, or an altitude in km.' };
  const speedMatch = q.match(/(\d+(?:\.\d+)?)\s*(?:×|x\b|times\b)/);
  const speed = speedMatch ? Number(speedMatch[1]) : undefined;
  if (speed !== undefined && !ORACLE_SPEEDS.includes(speed)) return { actions: [], reply: `Supported playback speeds: ${ORACLE_SPEEDS.join('×, ')}×. No actions prepared.` };
  const actions: SimAction[] = selected.map(p => ({ type: 'SIM_ADD_SATELLITE', payload: { a: EARTH_RADIUS_KM + p.altitude, e: 0, i: p.i, name: p.name } }));
  if (speed !== undefined) actions.push({ type: 'SIM_SET_PLAYBACK', payload: { speed, playing: true } });
  if (!actions.every(validOracleAction)) return { actions: [], reply: 'The requested orbit failed validation. Use an altitude between 160 and 100,000 km.' };
  const summary = selected.map(p => {
    const r = EARTH_RADIUS_KM + p.altitude;
    return `- **${p.name}**: ${p.altitude.toFixed(0)} km, inclination ${p.i}°, speed ${Math.sqrt(MU_EARTH_KM3_S2 / r).toFixed(3)} km/s, period ${(2 * Math.PI * Math.sqrt(r ** 3 / MU_EARTH_KM3_S2) / 60).toFixed(1)} min.`;
  }).join('\n');
  return { actions, reply: `Prepared ${selected.length} circular orbit(s) for the simulator:\n\n${summary}${speed === undefined ? '' : `\n\nRequested playback: ${speed}×.`}\n\nThe simulator reports whether these requests were applied. These are idealized comparison orbits, not live tracking.` };
}
