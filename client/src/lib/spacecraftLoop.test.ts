import { expect, it } from "vitest";
import { loopCraftPlan, reviewCraftPlan } from "./spacecraftLoop";

it("rejects a plan that skips the return signal", () => {
  const facts = { mode: 0 as const, modeName: "Ground control", system: "Power", delayMinutes: 12 };
  const review = reviewCraftPlan("OPERATIONS PLAN\nMode: Ground control\nSystem: Power\nT+1.6 s — Robot deploys", facts);
  expect(review.ready).toBe(false);
  expect(review.issues.length).toBeGreaterThan(0);
});

it("releases a reviewed plan only after the timeline matches the mode", () => {
  const result = loopCraftPlan({ mode: 1, modeName: "Onboard AGI", system: "Comms", delayMinutes: 8 });
  expect(result.review.ready).toBe(true);
  expect(result.review.issues).toEqual([]);
  expect(result.text).toContain("T+1.6 s — Robot deploys");
  expect(result.text).toContain("Hypothetical: yes");
  expect(result.text).toContain("Status: reviewed, no issues");
  expect(result.text).not.toContain("T+41 s");
});
