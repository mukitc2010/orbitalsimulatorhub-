/**
 * Planet Database Tool — Solar system data for AstroBot AGI
 */

export interface PlanetData {
  name: string;
  gravity: number; // m/s²
  radiusKm: number;
  distanceFromSunKm: number;
  atmosphere: string;
  moons: number;
  avgTempC: number;
}

const PLANETS: PlanetData[] = [
  { name: "Mercury", gravity: 3.7, radiusKm: 2439.4, distanceFromSunKm: 57_900_000, atmosphere: "Exosphere only", moons: 0, avgTempC: 167 },
  { name: "Venus", gravity: 8.87, radiusKm: 6051.8, distanceFromSunKm: 108_200_000, atmosphere: "CO₂ (96.5%), thick", moons: 0, avgTempC: 464 },
  { name: "Earth", gravity: 9.81, radiusKm: 6371, distanceFromSunKm: 149_600_000, atmosphere: "N₂ (78%), O₂ (21%)", moons: 1, avgTempC: 15 },
  { name: "Mars", gravity: 3.71, radiusKm: 3389.5, distanceFromSunKm: 227_900_000, atmosphere: "CO₂ (95%), thin", moons: 2, avgTempC: -65 },
  { name: "Jupiter", gravity: 24.79, radiusKm: 69911, distanceFromSunKm: 778_500_000, atmosphere: "H₂, He (gas giant)", moons: 92, avgTempC: -110 },
  { name: "Saturn", gravity: 10.44, radiusKm: 58232, distanceFromSunKm: 1_433_500_000, atmosphere: "H₂, He (gas giant)", moons: 83, avgTempC: -140 },
  { name: "Uranus", gravity: 8.87, radiusKm: 25362, distanceFromSunKm: 2_872_500_000, atmosphere: "H₂, He (ice giant)", moons: 27, avgTempC: -195 },
  { name: "Neptune", gravity: 11.15, radiusKm: 24622, distanceFromSunKm: 4_515_000_000, atmosphere: "H₂, He (ice giant)", moons: 14, avgTempC: -200 },
  { name: "Moon", gravity: 1.62, radiusKm: 1737.4, distanceFromSunKm: 149_600_000, atmosphere: "Trace exosphere", moons: 0, avgTempC: -20 },
];

export function getPlanet(name: string): PlanetData | undefined {
  const q = name.toLowerCase();
  return PLANETS.find((p) => p.name.toLowerCase().includes(q));
}

export function getAllPlanets(): PlanetData[] {
  return PLANETS;
}

export function getPlanetGravity(name: string): number | null {
  const p = getPlanet(name);
  return p ? p.gravity : null;
}

export function runPlanetQuery(query: "planet" | "all" | "gravity", param?: string): { planet?: PlanetData; planets?: PlanetData[]; gravity?: number } {
  if (query === "planet" && param) {
    const p = getPlanet(param);
    return p ? { planet: p } : {};
  }
  if (query === "all") return { planets: getAllPlanets() };
  if (query === "gravity" && param) {
    const g = getPlanetGravity(param);
    return g != null ? { gravity: g } : {};
  }
  return {};
}
