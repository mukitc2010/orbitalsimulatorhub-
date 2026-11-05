import { expect, it } from "vitest";
import { FAULTS, faultEvents, signalDelaySeconds } from "./spacecraftPlan";

it("compresses a one-way delay of 12 minutes to 18 seconds", () => {
  expect(signalDelaySeconds(12)).toBe(18);
  expect(signalDelaySeconds(0)).toBe(1.5);
});

it("makes ground control wait out both signal trips before the robot moves", () => {
  const ground = faultEvents(0, 18);
  const agi = faultEvents(1, 18);
  const asi = faultEvents(2, 18);
  expect(ground.at(-1)?.at).toBe(41);
  expect(agi.find((event) => event.label === "Robot deploys")?.at).toBe(1.6);
  expect(asi.find((event) => event.label === "Robot deploys")?.at).toBe(0.4);
  expect(asi.at(-1)!.at).toBeLessThan(agi.at(-1)!.at);
  expect(agi.at(-1)!.at).toBeLessThan(ground.at(-1)!.at);
});

it("defines four faults and a cascade for the power, propulsion, and life-support cases", () => {
  expect(FAULTS).toHaveLength(4);
  expect(FAULTS.map((fault) => fault.system)).toEqual([0, 1, 2, 4]);
  expect(FAULTS[0].cascade).toContain(4);
  expect(FAULTS[3].cascade).toEqual([]);
});
