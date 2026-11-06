/** Polar conic orbit, SI meters and m³/s². Educational geometry, not a flight propagator. */

export type ConicKind = "circle" | "ellipse" | "parabola" | "hyperbola";

export function conicKind(eccentricity: number): ConicKind {
  if (!Number.isFinite(eccentricity) || eccentricity < 0) {
    throw new Error("Eccentricity must be a finite number of at least 0.");
  }
  if (eccentricity < 1e-8) return "circle";
  if (eccentricity < 1 - 1e-8) return "ellipse";
  if (eccentricity <= 1 + 1e-8) return "parabola";
  return "hyperbola";
}

/** r = p / (1 + e cos θ). Returns null on the asymptote where the denominator is not positive. */
export function orbitalRadius(semiLatusRectumM: number, eccentricity: number, trueAnomalyRad: number): number | null {
  if (!(semiLatusRectumM > 0) || !Number.isFinite(semiLatusRectumM)) {
    throw new Error("Semi-latus rectum must be a positive finite length.");
  }
  conicKind(eccentricity);
  const denominator = 1 + eccentricity * Math.cos(trueAnomalyRad);
  if (denominator <= 1e-8) return null;
  return semiLatusRectumM / denominator;
}

export function semiMajorAxisM(semiLatusRectumM: number, eccentricity: number): number | null {
  const kind = conicKind(eccentricity);
  if (kind === "parabola") return null;
  if (kind === "hyperbola") return semiLatusRectumM / (eccentricity * eccentricity - 1);
  return semiLatusRectumM / (1 - eccentricity * eccentricity);
}

/** Negative for bound orbits, zero for a parabola, positive for a hyperbola. */
export function specificOrbitalEnergy(muM3S2: number, semiLatusRectumM: number, eccentricity: number): number {
  if (!(muM3S2 > 0)) throw new Error("Gravitational parameter must be positive.");
  const kind = conicKind(eccentricity);
  if (kind === "parabola") return 0;
  const a = semiMajorAxisM(semiLatusRectumM, eccentricity);
  if (a == null) return 0;
  return kind === "hyperbola" ? muM3S2 / (2 * a) : -muM3S2 / (2 * a);
}

export function explainConic(input: {
  semiLatusRectumM: number;
  eccentricity: number;
  trueAnomalyRad: number;
  muM3S2: number;
}): string[] {
  const kind = conicKind(input.eccentricity);
  const radius = orbitalRadius(input.semiLatusRectumM, input.eccentricity, input.trueAnomalyRad);
  const energy = specificOrbitalEnergy(input.muM3S2, input.semiLatusRectumM, input.eccentricity);
  const radiusText = radius == null
    ? "This true anomaly is outside the trajectory. The denominator 1 + e cos θ is not positive."
    : `At this true anomaly the radius is ${(radius / 1000).toFixed(1)} km.`;
  return [
    `This conic is a ${kind}. The radius comes only from r = p / (1 + e cos θ).`,
    radiusText,
    `Specific mechanical energy is ${energy.toExponential(4)} J/kg. Bound orbits are negative, a parabola is zero, and a hyperbola is positive.`,
    "Apollonius classified these curves. Spacecraft engineers later used the same curves for Keplerian orbits. That application was not known in antiquity.",
  ];
}

/** Educational one-axis pointing damper. Not a flight controller. */
export function dampPointingError(errorRad: number, gain: number, dt: number, steps: number): number {
  if (!(dt > 0) || !(gain > 0) || steps < 1) throw new Error("Pointing demo needs a positive gain, time step, and step count.");
  let error = errorRad;
  for (let i = 0; i < steps; i++) error += -gain * error * dt;
  return error;
}
