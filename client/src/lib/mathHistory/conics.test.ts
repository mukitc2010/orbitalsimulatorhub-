import { expect, it } from "vitest";
import {
  conicKind,
  dampPointingError,
  explainConic,
  orbitalRadius,
  specificOrbitalEnergy,
} from "./conics";

const P = 7_000_000;

it("keeps a circle at constant radius", () => {
  expect(conicKind(0)).toBe("circle");
  expect(orbitalRadius(P, 0, 0)).toBeCloseTo(P, 6);
  expect(orbitalRadius(P, 0, 2)).toBeCloseTo(P, 6);
});

it("places periapsis and apoapsis on an ellipse", () => {
  const e = 0.2;
  expect(conicKind(e)).toBe("ellipse");
  expect(orbitalRadius(P, e, 0)).toBeCloseTo(P / (1 + e), 4);
  expect(orbitalRadius(P, e, Math.PI)).toBeCloseTo(P / (1 - e), 4);
  expect(specificOrbitalEnergy(3.986004418e14, P, e)).toBeLessThan(0);
});

it("marks a parabola at zero energy and a hyperbola as unbound", () => {
  expect(conicKind(1)).toBe("parabola");
  expect(specificOrbitalEnergy(3.986004418e14, P, 1)).toBe(0);
  expect(orbitalRadius(P, 1.4, Math.PI)).toBeNull();
  expect(specificOrbitalEnergy(3.986004418e14, P, 1.4)).toBeGreaterThan(0);
});

it("explains from the computed radius and shrinks a pointing error", () => {
  const lines = explainConic({
    semiLatusRectumM: P,
    eccentricity: 0,
    trueAnomalyRad: 0,
    muM3S2: 3.986004418e14,
  });
  expect(lines.join(" ")).toContain("7000.0 km");
  const end = dampPointingError(0.4, 0.2, 0.1, 40);
  expect(Math.abs(end)).toBeLessThan(0.4);
});
