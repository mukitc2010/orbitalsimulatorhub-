import { describe, expect, it } from "vitest";
import { ALL_PLANETS } from "../data/planets";
import { buildPlanetQuiz } from "./PlanetDetail";

describe("planet quiz", () => {
  it("gives every planet distinct choices with the correct answer first", () => {
    for (const planet of ALL_PLANETS) {
      for (const question of buildPlanetQuiz(planet)) {
        expect(question.options.length).toBeGreaterThan(1);
        expect(new Set(question.options).size).toBe(question.options.length);
        expect(question.answer).toBe(0);
        expect(question.options[0]).toBeTruthy();
      }
    }
  });
});
