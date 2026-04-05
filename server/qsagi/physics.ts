import { SimParams, SimPoint, Vec2 } from "./types";
import { evaluateSafety } from "./safety";

function add(a: Vec2, b: Vec2): Vec2 { return { x: a.x + b.x, y: a.y + b.y }; }
function mul(a: Vec2, k: number): Vec2 { return { x: a.x * k, y: a.y * k }; }
function norm(a: Vec2): number { return Math.sqrt(a.x * a.x + a.y * a.y); }

function gravAccel(pos: Vec2, M: number): Vec2 {
  const r = norm(pos);
  const eps = 1e-9;
  const denom = Math.pow(Math.max(r, eps), 3);
  const rs = 2 * M;
  const factor = 1 + (rs / Math.max(r, rs * 1.05)) * 0.25;
  return mul(pos, -(M * factor) / denom);
}

export function simulateTrajectory(params: SimParams): SimPoint[] {
  let pos: Vec2 = { x: params.r0, y: 0 };
  let vel: Vec2 = { x: 0, y: params.v0 };

  let fuelUsed = 0;
  const points: SimPoint[] = [];

  for (let i = 0; i < params.steps; i++) {
    const t = i * params.dt;
    const a = gravAccel(pos, params.M);
    vel = add(vel, mul(a, params.dt));
    pos = add(pos, mul(vel, params.dt));

    const r = norm(pos);
    const td = Math.sqrt(Math.max(1 - (2 * params.M) / Math.max(r, 2 * params.M * 1.001), 0.0001));
    const tidal = params.M / Math.pow(Math.max(r, 1e-9), 3);
    fuelUsed += norm(a) * params.dt * 0.1;

    const safety = evaluateSafety({ r, M: params.M, tidal, fuelUsed }, params);

    points.push({
      t,
      pos,
      vel,
      r,
      timeDilation: td,
      tidal,
      fuelUsed,
      safe: safety.safe,
      violations: safety.violations,
    });

    if (!safety.safe && safety.violations.includes("Event horizon breach")) break;
  }

  return points;
}
