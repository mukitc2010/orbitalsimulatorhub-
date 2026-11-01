import { describe, expect, it } from "vitest";
import { reasonAboutSpace } from "../../../lib/astrobot/reasoner";
import { circularSpeedKmS, radiusFromAltitudeKm } from "../../../shared/orbitEngine";

describe("AstroBot reasoner", () => {
  it("computes a 1,000 km circular orbit from the shared engine", () => {
    const reply = reasonAboutSpace("How fast is a circular orbit at 1,000 km?")!;
    const expected = circularSpeedKmS(radiusFromAltitudeKm(1000)).toFixed(3);
    expect(reply).toContain(`${expected} km/s`);
    expect(reply).toContain("v = √(μ/r)");
  });

  it("keeps mass and weight distinct on Mars", () => {
    const reply = reasonAboutSpace("How much would 70 kg weigh on Mars?")!;
    expect(reply).toContain("70 kg");
    expect(reply).toContain("26.5 kg");
    expect(reply).toContain("N");
  });

  it("names all twelve moonwalkers", () => {
    const reply = reasonAboutSpace("Who walked on the Moon?")!;
    expect(reply).toContain("Neil Armstrong");
    expect(reply).toContain("Gene Cernan");
    expect(reply).toContain("Harrison Schmitt");
    expect(reply).toContain("12 people");
  });

  it("explains why a satellite does not hit Earth", () => {
    const reply = reasonAboutSpace("Why don't satellites fall?")!;
    expect(reply.toLowerCase()).toContain("falling");
    expect(reply).toContain("km/s");
  });
});
