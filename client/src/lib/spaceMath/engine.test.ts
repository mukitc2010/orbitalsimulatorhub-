import { describe, expect, it } from "vitest";
import {
  circularSpeed,
  orbitPeriod,
  hohmannDeltaV,
  generateMissions,
  correctAnswer,
  dailyChallenge,
  missionScore,
  parseNumericAnswer,
  validChallenge,
} from "./engine";
describe("Orbital Gauntlet physics and rules", () => {
  it("matches reference low Earth orbit and LEO-to-GEO transfer values", () => {
    expect(circularSpeed(6771)).toBeCloseTo(7.6726, 3);
    expect(orbitPeriod(6771) / 60).toBeCloseTo(92.414, 2);
    expect(hohmannDeltaV(6771, 42164)).toBeCloseTo(3.854, 2);
  });
  it("gives every participant the same six problems for a mission code", () => {
    expect(generateMissions("daily-2026-10-24")).toEqual(
      generateMissions("daily-2026-10-24"),
    );
    expect(generateMissions("crew-alpha")).not.toEqual(
      generateMissions("crew-beta"),
    );
    for (let i = 0; i < 100; i++) {
      const missions = generateMissions(`seed-${i}`);
      expect(missions).toHaveLength(6);
      expect(new Set(missions.map((m) => m.id)).size).toBe(6);
      expect(
        missions.every(
          (m) =>
            Number.isFinite(m.answer) && m.answer > 0 && m.steps.length >= 2,
        ),
      ).toBe(true);
    }
  });
  it("uses UTC boundaries for daily challenges", () => {
    expect(dailyChallenge(new Date("2026-10-24T23:59:59Z"))).toBe(
      "daily-2026-10-24",
    );
    expect(dailyChallenge(new Date("2026-10-25T00:00:00Z"))).toBe(
      "daily-2026-10-25",
    );
  });
  it("accepts numerical rounding and tightens expert tolerance", () => {
    expect(correctAnswer(100.9, 100, "flight")).toBe(true);
    expect(correctAnswer(100.9, 100, "expert")).toBe(false);
    expect(correctAnswer(100.2, 100, "expert")).toBe(true);
    expect(correctAnswer(NaN, 100, "flight")).toBe(false);
  });
  it("parses numbers without evaluating expressions or invalid values", () => {
    expect(parseNumericAnswer("1,234.5")).toBe(1234.5);
    expect(parseNumericAnswer("1.23e3")).toBe(1230);
    for (const invalid of ["", "Infinity", "NaN", "7 km/s", "3+4", "1e999"])
      expect(parseNumericAnswer(invalid)).toBeNull();
  });
  it("applies retry and hint costs, and bounds streak rewards", () => {
    expect(missionScore(0, false, 0)).toBe(1000);
    expect(missionScore(2, true, 0)).toBe(450);
    expect(missionScore(0, false, 20)).toBe(1200);
  });
  it("rejects unsafe or missing challenge identifiers", () => {
    expect(validChallenge(undefined)).toBe(false);
    expect(() => generateMissions("<script>")).toThrow();
    expect(validChallenge("a".repeat(49))).toBe(false);
  });
});

describe("numeric input regression", () => {
  it("rejects malformed comma grouping instead of changing the number", () => {
    for (const text of ["7,67", ",123", "123,", "1,,234", "12,34,567"])
      expect(parseNumericAnswer(text)).toBeNull();
    expect(parseNumericAnswer("1,234,567.5e-2")).toBe(12345.675);
  });
});
