/** Visual solar-system clock. Distances and sizes are not to scale. One Earth year lasts `earthYearSeconds` of screen time at 1×. */

export const EARTH_YEAR_SECONDS = 12;

export interface SolarBody {
  name: string;
  color: string;
  orbitRadius: number;
  bodyRadius: number;
  years: number;
  kind: string;
}

export const SOLAR_BODIES: SolarBody[] = [
  { name: "Mercury", color: "#b6b0a6", orbitRadius: 2.2, bodyRadius: 0.12, years: 0.24, kind: "rocky inner planet" },
  { name: "Venus", color: "#efc17a", orbitRadius: 3.1, bodyRadius: 0.18, years: 0.62, kind: "rocky inner planet" },
  { name: "Earth", color: "#38bdf8", orbitRadius: 4.2, bodyRadius: 0.2, years: 1, kind: "rocky inner planet" },
  { name: "Mars", color: "#fb8865", orbitRadius: 5.3, bodyRadius: 0.16, years: 1.88, kind: "rocky inner planet" },
  { name: "Jupiter", color: "#dfb28b", orbitRadius: 7.2, bodyRadius: 0.46, years: 11.86, kind: "gas giant" },
  { name: "Saturn", color: "#e8cf91", orbitRadius: 8.8, bodyRadius: 0.38, years: 29.46, kind: "gas giant" },
  { name: "Uranus", color: "#83dedc", orbitRadius: 10.2, bodyRadius: 0.28, years: 84, kind: "ice giant" },
  { name: "Neptune", color: "#779dfc", orbitRadius: 11.6, bodyRadius: 0.27, years: 165, kind: "ice giant" },
];

/** Angle in radians on the XZ plane. Positive angle moves from +X toward +Z. */
export function orbitAngle(elapsedSeconds: number, years: number, speed: number): number {
  const safeYears = Math.max(years, 0.01);
  return (elapsedSeconds * speed) / (safeYears * EARTH_YEAR_SECONDS) * Math.PI * 2;
}

export function orbitPosition(elapsedSeconds: number, body: SolarBody, speed: number): [number, number, number] {
  const angle = orbitAngle(elapsedSeconds, body.years, speed);
  return [Math.cos(angle) * body.orbitRadius, 0, Math.sin(angle) * body.orbitRadius];
}
