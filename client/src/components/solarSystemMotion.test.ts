import { describe, expect, it } from "vitest";
import { SOLAR_BODIES, orbitAngle, orbitPosition } from "./solarSystemMotion";

describe("animated solar system clock", () => {
  it("moves Mercury farther along its orbit than Neptune in the same time", () => {
    const mercury = SOLAR_BODIES[0];
    const neptune = SOLAR_BODIES[7];
    expect(orbitAngle(12, mercury.years, 1)).toBeGreaterThan(orbitAngle(12, neptune.years, 1));
  });

  it("places Earth on the XZ plane, not above the Sun", () => {
    const earth = SOLAR_BODIES[2];
    const [x, y, z] = orbitPosition(3, earth, 1);
    expect(y).toBe(0);
    expect(Math.hypot(x, z)).toBeCloseTo(earth.orbitRadius, 5);
  });

  it("doubles the angle when the playback speed doubles", () => {
    const earth = SOLAR_BODIES[2];
    expect(orbitAngle(4, earth.years, 2)).toBeCloseTo(orbitAngle(4, earth.years, 1) * 2, 5);
  });
});
