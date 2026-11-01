import type { ScenarioType, Vec2 } from "./types";

/** Visual height of the spacetime sheet. More negative means a deeper well. */
export function warpHeight(x: number, z: number, mass: number, scale: number): number {
  const depth = (Math.max(mass, 0) * scale) / Math.sqrt(x * x + z * z + 0.16);
  return -Math.min(2.2, depth);
}

/** Map the educational 2D trajectory into the y-up scene. Physics stays in the run data. */
export function flightPosition(
  pos: Vec2,
  scenario: ScenarioType,
  mass: number,
  scale: number,
  progress: number,
): [number, number, number] {
  const x = pos.x * scale;
  const z = pos.y * scale;
  const along = Number.isFinite(progress) ? Math.min(1, Math.max(0, progress)) : 0;
  const lift = scenario === "WORMHOLE_TOY"
    ? Math.sin(along * Math.PI) * 1.4
    : scenario === "KERR_TOY"
      ? Math.sin(along * Math.PI * 2) * 0.45
      : 0;
  return [x, warpHeight(x, z, mass, scale) + 0.25 + lift, z];
}
