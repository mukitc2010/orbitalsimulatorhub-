/**
 * Scalar algebraic Riccati equation for ẋ = a x + b u.
 * 2 a P − (b²/r) P² + q = 0.
 * The positive root is chosen with the quadratic formula.
 * Educational station-keeping gain, not flight software.
 */
export function scalarAlgebraicRiccati(a: number, b: number, q: number, r: number) {
  if (!(r > 0) || !(q >= 0) || !Number.isFinite(a) || !Number.isFinite(b) || b === 0) {
    throw new Error("Scalar Riccati needs finite a, nonzero b, positive r, and nonnegative q.");
  }
  const g = (b * b) / r;
  const discriminant = a * a + g * q;
  const p = (a + Math.sqrt(discriminant)) / g;
  const k = (b / r) * p;
  const residual = 2 * a * p - g * p * p + q;
  return { p, k, discriminant, residual };
}

/** Closed-loop samples of ẋ = (a − b k) x. */
export function scalarClosedLoop(x0: number, a: number, b: number, k: number, dt: number, steps: number): number[] {
  if (!(dt > 0) || steps < 1) throw new Error("Closed-loop demo needs a positive time step and at least one step.");
  const rate = a - b * k;
  const out = [x0];
  let x = x0;
  for (let i = 0; i < steps; i++) {
    x += rate * x * dt;
    out.push(x);
  }
  return out;
}
