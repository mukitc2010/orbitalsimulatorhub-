import { expect, it } from "vitest";
import { flightPosition, warpHeight } from "./spacetimeView";

it("drops the sheet deeper near the mass than far away", () => {
  expect(warpHeight(0, 0, 1, 1)).toBeLessThan(warpHeight(6, 0, 1, 1));
  expect(warpHeight(0, 0, 1, 1)).toBeGreaterThanOrEqual(-2.2);
});

it("places a flyby on the sheet and lifts wormhole and Kerr paths off the plane", () => {
  const flat = flightPosition({ x: 4, y: 0 }, "SCHWARZSCHILD_FLYBY", 1, 1, 0.5);
  const kerr = flightPosition({ x: 4, y: 0 }, "KERR_TOY", 1, 1, 0.25);
  const throat = flightPosition({ x: 4, y: 0 }, "WORMHOLE_TOY", 1, 1, 0.5);
  expect(flat[0]).toBe(4);
  expect(flat[2]).toBe(0);
  expect(flat[1]).toBeCloseTo(warpHeight(4, 0, 1, 1) + 0.25);
  expect(kerr[1]).toBeGreaterThan(flat[1]);
  expect(throat[1]).toBeGreaterThan(kerr[1]);
});
