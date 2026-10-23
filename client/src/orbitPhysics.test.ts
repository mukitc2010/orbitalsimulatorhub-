import { describe, expect, it } from "vitest";
import { EARTH_RADIUS_KM, MU_EARTH_KM3_S2 } from "../../shared/const";
import { advanceOrbitalState, createOrbitalState, getOrbitalMetrics, sampleOrbitPath } from "./orbitPhysics";

describe("two-body orbital physics", () => {
  it("keeps a circular low Earth orbit stable over one revolution", () => {
    const altitudeKm = 400;
    const radius = EARTH_RADIUS_KM + altitudeKm;
    const speed = Math.sqrt(MU_EARTH_KM3_S2 / radius);
    const initial = createOrbitalState(altitudeKm, speed);
    const metrics = getOrbitalMetrics(initial);
    const result = advanceOrbitalState(initial, metrics.periodSeconds!);

    expect(metrics.periodSeconds).toBeGreaterThan(90 * 60);
    expect(metrics.periodSeconds).toBeLessThan(94 * 60);
    expect(result.impacted).toBe(false);
    expect(Math.hypot(result.state.x - initial.x, result.state.y - initial.y, result.state.z - initial.z)).toBeLessThan(0.1);
  });

  it("reports a bound orbit period and no period for escape", () => {
    const altitudeKm = 400;
    const radius = EARTH_RADIUS_KM + altitudeKm;
    const circularSpeed = Math.sqrt(MU_EARTH_KM3_S2 / radius);
    const escapeSpeed = Math.sqrt(2 * MU_EARTH_KM3_S2 / radius);

    expect(getOrbitalMetrics(createOrbitalState(altitudeKm, circularSpeed)).periodSeconds).not.toBeNull();
    const escapeMetrics = getOrbitalMetrics(createOrbitalState(altitudeKm, escapeSpeed * 1.05));
    expect(escapeMetrics.periodSeconds).toBeNull();
    expect(escapeMetrics.orbitType).toBe("escape");
  });

  it("stops when a falling object reaches Earth's surface", () => {
    const result = advanceOrbitalState(createOrbitalState(100, 0), 1200);
    expect(result.impacted).toBe(true);
    expect(Math.hypot(result.state.x, result.state.y, result.state.z)).toBeLessThanOrEqual(EARTH_RADIUS_KM);
  });

  it("samples finite closed and open conic paths", () => {
    const altitudeKm = 400;
    const radius = EARTH_RADIUS_KM + altitudeKm;
    const circularSpeed = Math.sqrt(MU_EARTH_KM3_S2 / radius);
    const escapeSpeed = Math.sqrt(2 * MU_EARTH_KM3_S2 / radius);

    for (const speed of [circularSpeed, escapeSpeed * 1.05]) {
      const points = sampleOrbitPath(createOrbitalState(altitudeKm, speed));
      expect(points).toHaveLength(241);
      expect(points.flat().every(Number.isFinite)).toBe(true);
    }
  });
});