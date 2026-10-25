export const EARTH_METERS = 6378137;
export interface SwarmSatellite { id: number; r: [number, number, number]; v: [number, number, number]; risk: number; fuel: number }
export interface SwarmPacket { t: number; satellites: SwarmSatellite[]; num_candidates: number }
// Circular two-body reference orbits; the highlighted encounter uses an exaggerated
// prescribed radial offset to illustrate avoidance, not a flight-control solution.
export function demoPosition(id: number, t: number, avoidance: boolean): [number, number, number] {
  const shell = id < 2 ? 0 : id % 3;
  let radius = 1.13 + shell * 0.09;
  const omega = Math.sqrt(3.986004418e14 / (radius * EARTH_METERS) ** 3);
  const theta = id < 2 ? (id === 0 ? 1 : -1) * omega * (t - 120) : omega * t + id * 2.399963;
  const inclination = id < 2 ? 0.65 : 0.35 + shell * 0.4;
  const node = id < 2 ? 0 : shell * 2.1;
  if (id === 0 && avoidance) radius += 0.06 * Math.exp(-(((t - 120) / 55) ** 2));
  const x = radius * Math.cos(theta), z = radius * Math.sin(theta) * Math.cos(inclination), y = radius * Math.sin(theta) * Math.sin(inclination);
  return [x * Math.cos(node) - z * Math.sin(node), y, x * Math.sin(node) + z * Math.cos(node)];
}
export function demoPacket(t: number, count: number, avoidance: boolean): SwarmPacket {
  const satellites = Array.from({ length: count }, (_, id) => {
    const p = demoPosition(id, t, avoidance), next = demoPosition(id, t + 0.1, avoidance);
    return { id, r: p.map(x => x * EARTH_METERS) as [number,number,number], v: next.map((x,i) => (x-p[i]) * EARTH_METERS / 0.1) as [number,number,number], risk: id < 2 ? Math.exp(-(((t-120)/35)**2)) * (avoidance ? 0.12 : 1) : 0, fuel: 1 };
  });
  return { t, satellites, num_candidates: Math.abs(t-120) < 80 ? 1 : 0 };
}
export function isSwarmPacket(value: unknown): value is SwarmPacket {
  if (!value || typeof value !== "object") return false;
  const p = value as SwarmPacket;
  return Number.isFinite(p.t) && p.t >= 0 && Number.isInteger(p.num_candidates) && p.num_candidates >= 0 && Array.isArray(p.satellites) && p.satellites.length <= 10000 && new Set(p.satellites.map(s => s?.id)).size === p.satellites.length && p.satellites.every(s => s && Number.isInteger(s.id) && [s.r,s.v].every(v => Array.isArray(v) && v.length === 3 && v.every(Number.isFinite)) && Number.isFinite(s.risk) && s.risk >= 0 && s.risk <= 1 && Number.isFinite(s.fuel));
}
