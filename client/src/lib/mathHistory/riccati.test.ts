import { expect, it } from "vitest";
import { scalarAlgebraicRiccati, scalarClosedLoop } from "./riccati";

it("satisfies the scalar algebraic Riccati equation", () => {
  const { p, residual, k } = scalarAlgebraicRiccati(0.02, 1, 2, 8);
  expect(p).toBeGreaterThan(0);
  expect(Math.abs(residual)).toBeLessThan(1e-9);
  expect(k).toBeCloseTo(p / 8, 8);
});

it("drives a drifting position error toward zero", () => {
  const { k } = scalarAlgebraicRiccati(0.02, 1, 2, 8);
  const path = scalarClosedLoop(1000, 0.02, 1, k, 0.2, 40);
  expect(Math.abs(path.at(-1) ?? 1)).toBeLessThan(Math.abs(path[0]));
});
