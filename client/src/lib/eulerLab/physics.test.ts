import { expect, it } from "vitest";
import {
  EARTH_RADIUS_M,
  MU_M3_S2,
  circularPeriod,
  circularSpeed,
  energyDrift,
  escapeSpeed,
  initialCircularState,
  propagate,
  radiusError,
  specificEnergy,
  step,
} from "./physics";

const ALT = 400_000;
const RADIUS = EARTH_RADIUS_M + ALT;

it("matches the analytical circular period and speed", () => {
  const speed = circularSpeed(RADIUS);
  const period = circularPeriod(RADIUS);
  expect(speed).toBeCloseTo(Math.sqrt(MU_M3_S2 / RADIUS), 6);
  expect(period).toBeCloseTo(2 * Math.PI * Math.sqrt(RADIUS ** 3 / MU_M3_S2), 6);
  expect(period).toBeGreaterThan(5400);
  expect(period).toBeLessThan(5800);
});

it("keeps an RK4 circular orbit nearer the start radius than explicit Euler", () => {
  const state = initialCircularState(ALT);
  const dt = 20;
  const seconds = circularPeriod(RADIUS);
  const rk = propagate(state, dt, seconds, "rk4");
  const euler = propagate(state, dt, seconds, "explicit-euler");
  expect(radiusError(rk, RADIUS) / RADIUS).toBeLessThan(0.002);
  expect(radiusError(euler, RADIUS)).toBeGreaterThan(radiusError(rk, RADIUS));
  expect(energyDrift(rk)).toBeLessThan(energyDrift(euler));
});

it("shows semi-implicit Euler drifting less in energy than explicit Euler", () => {
  const state = initialCircularState(ALT);
  const seconds = circularPeriod(RADIUS);
  const semi = propagate(state, 30, seconds, "semi-implicit-euler");
  const euler = propagate(state, 30, seconds, "explicit-euler");
  expect(energyDrift(semi)).toBeLessThan(energyDrift(euler));
});

it("leaves a bound ellipse inside an energy well and lets escape speed climb", () => {
  const ellipse = initialCircularState(2_000_000, 0.97);
  expect(specificEnergy(ellipse)).toBeLessThan(0);
  const coast = propagate(ellipse, 20, 2000, "rk4");
  expect(Math.hypot(...coast.at(-1)!.r)).toBeGreaterThan(EARTH_RADIUS_M);
  const escape = initialCircularState(ALT, escapeSpeed(RADIUS) / circularSpeed(RADIUS) + 0.02);
  const flown = propagate(escape, 30, 4000, "rk4");
  expect(Math.hypot(...flown.at(-1)!.r)).toBeGreaterThan(Math.hypot(...flown[0].r) * 1.2);
});

it("rejects a nonpositive time step before it invents a state", () => {
  expect(() => step(initialCircularState(ALT), 0, "rk4")).toThrow(/time step/i);
});
