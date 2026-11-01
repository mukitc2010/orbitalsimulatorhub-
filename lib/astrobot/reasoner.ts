import { EARTH_RADIUS_KM } from "../../shared/const";
import {
  circularPeriodMinutes,
  circularSpeedKmS,
  escapeSpeedKmS,
  geostationaryAltitudeKm,
  radiusFromAltitudeKm,
} from "../../shared/orbitEngine";
import { runOrbitMath } from "./tools/orbitMath";
import { getAstronautByName, getMoonAstronauts } from "./tools/astronautDB";
import { getPlanet, type PlanetData } from "./tools/planetDB";

const ISS_ALTITUDE_KM = 408;

function fmt(n: number, digits = 3): string {
  return n.toFixed(digits);
}

function altitudeFrom(text: string): number | undefined {
  const labeled = text.match(/(-?\d[\d,]*(?:\.\d+)?)\s*(?:km|kilometers?)\b/i);
  if (labeled) return Number(labeled[1].replaceAll(",", ""));
  if (/\biss\b|space station/.test(text)) return ISS_ALTITUDE_KM;
  if (/\bgeo\b|geostationary/.test(text)) return geostationaryAltitudeKm();
  if (/\bgps\b|\bmeo\b/.test(text)) return 20200;
  if (/\bleo\b/.test(text)) return 400;
  return undefined;
}

function orbitBrief(altitudeKm: number): string {
  const radius = radiusFromAltitudeKm(altitudeKm);
  const speed = circularSpeedKmS(radius);
  const period = circularPeriodMinutes(radius);
  const escape = escapeSpeedKmS(radius);
  return [
    `Circular Earth orbit at **${fmt(altitudeKm, altitudeKm % 1 ? 1 : 0)} km** altitude (radius ${fmt(radius, 1)} km).`,
    `- Speed: **${fmt(speed)} km/s**, from v = √(μ/r).`,
    `- Period: **${fmt(period, 1)} minutes**, from T = 2π√(r³/μ).`,
    `- Escape speed at that radius: **${fmt(escape)} km/s**, from v = √(2μ/r).`,
    "Ideal two-body model. It ignores drag, Earth oblateness, and the Moon.",
  ].join("\n");
}

function planetLine(planet: PlanetData): string {
  return `**${planet.name}**: surface gravity ${planet.gravity} m/s², radius ${planet.radiusKm.toLocaleString("en-US")} km, ${planet.moons} moon${planet.moons === 1 ? "" : "s"}, atmosphere ${planet.atmosphere}, mean temperature about ${planet.avgTempC} °C.`;
}

function weightAnswer(text: string): string | null {
  const planetName = ["mercury", "venus", "earth", "mars", "jupiter", "saturn", "uranus", "neptune", "moon"]
    .find((name) => text.includes(name));
  if (!planetName || !/weigh|weight|kg|kilogram|scale/.test(text)) return null;
  const planet = getPlanet(planetName);
  if (!planet) return null;
  const massMatch = text.match(/(\d+(?:\.\d+)?)\s*kg/);
  const massKg = massMatch ? Number(massMatch[1]) : 70;
  const earth = getPlanet("earth");
  const earthG = earth?.gravity ?? 9.81;
  const scaleKg = massKg * (planet.gravity / earthG);
  const weightN = massKg * planet.gravity;
  return [
    `Your mass stays **${fmt(massKg, massKg % 1 ? 1 : 0)} kg** on ${planet.name}. Mass does not change with gravity.`,
    `A scale calibrated on Earth would read about **${fmt(scaleKg, 1)} kg**, because ${planet.name}'s surface gravity is ${planet.gravity} m/s² and Earth's is ${earthG} m/s².`,
    `Your weight is **${fmt(weightN, 0)} N** there, versus **${fmt(massKg * earthG, 0)} N** on Earth.`,
    planetLine(planet),
  ].join("\n\n");
}

function quiz(text: string): string {
  if (text.includes("kepler")) {
    return [
      "**Kepler check**",
      "1. What shape is a Keplerian orbit, and where is the central body?",
      "2. What does the equal-area law say about speed near periapsis?",
      "3. If the semi-major axis grows by a factor of 4, by what factor does the period grow?",
      "",
      "Answers: an ellipse with the central body at one focus; the spacecraft is fastest at periapsis; the period grows by 8, because T² ∝ a³ so T ∝ a^(3/2).",
    ].join("\n");
  }
  if (text.includes("apollo") || text.includes("moon")) {
    return [
      "**Apollo check**",
      "1. How many people have walked on the Moon?",
      "2. Who was the first, and who was the last?",
      "3. Who was the only professional geologist among them?",
      "",
      "Answers: 12; Neil Armstrong and Gene Cernan; Harrison Schmitt.",
    ].join("\n");
  }
  return [
    "**Orbit check**",
    "1. What is the circular speed formula?",
    "2. Why is escape speed higher than circular speed at the same radius?",
    "3. Why does a higher orbit have a longer period?",
    "",
    "Answers: v = √(μ/r); escape needs twice the specific kinetic energy of a circular orbit, so √2 times the speed; T = 2π√(r³/μ), so a larger radius takes longer.",
  ].join("\n");
}

/** Deterministic tutor. Returns null only when the question is outside its tools. */
export function reasonAboutSpace(message: string): string | null {
  const text = message.toLowerCase();

  const weight = weightAnswer(text);
  if (weight) return weight;

  if (/\bquiz|test me|challenge me\b/.test(text)) return quiz(text);

  if (/who (walked|has walked|have walked)|moonwalk/.test(text)) {
    const crew = getMoonAstronauts();
    return [
      `**${crew.length} people** have walked on the Moon, all on Apollo 11 through 17.`,
      crew.map((person) => `- **${person.name}** (${person.mission}, ${person.role}). ${person.funFact}`).join("\n"),
    ].join("\n\n");
  }

  const named = ["neil armstrong", "buzz aldrin", "gene cernan", "harrison schmitt", "alan shepard", "sally ride", "yuri gagarin", "valentina tereshkova", "john young", "david scott"]
    .find((name) => text.includes(name));
  if (named) {
    const person = getAstronautByName(named);
    if (person) {
      return `**${person.name}** flew ${person.mission} as ${person.role}. ${person.funFact}${person.moonwalker ? " They walked on the Moon." : ""}`;
    }
  }

  if (/kepler/.test(text)) {
    return [
      "**Kepler's three laws**, for a small body orbiting a much heavier one:",
      "1. The orbit is an ellipse with the central body at one focus.",
      "2. The radius vector sweeps equal areas in equal times, so the body moves faster when it is closer.",
      "3. T² ∝ a³. In the two-body model that becomes T = 2π√(a³/μ).",
      "Newton's gravity explains all three. The [simulator](/simulator) shows the result: a higher circular orbit is slower and takes longer.",
    ].join("\n\n");
  }

  if (/satellit/.test(text) && /fall|stay up/.test(text)) {
    return [
      "A satellite is falling. It also moves sideways fast enough that Earth's surface curves away at the same rate, so it never hits the ground.",
      `At the ISS altitude of ${ISS_ALTITUDE_KM} km that sideways speed is about **${fmt(circularSpeedKmS(radiusFromAltitudeKm(ISS_ALTITUDE_KM)))} km/s**.`,
      "Too slow, and the orbit intersects the atmosphere or the ground. At escape speed it does not come back. See it in the [simulator](/simulator).",
    ].join("\n\n");
  }

  if (/compare.*(leo|meo|geo)|leo.*meo.*geo|difference between leo/.test(text)) {
    const geo = geostationaryAltitudeKm();
    return [
      "**Three comparison orbits.** All are circular and use the same Earth μ.",
      `- **LEO, 400 km:** ${fmt(circularSpeedKmS(radiusFromAltitudeKm(400)))} km/s, period ${fmt(circularPeriodMinutes(radiusFromAltitudeKm(400)), 1)} min. The ISS is a bit higher, near ${ISS_ALTITUDE_KM} km.`,
      `- **GPS-like MEO, 20,200 km:** ${fmt(circularSpeedKmS(radiusFromAltitudeKm(20200)))} km/s, period ${fmt(circularPeriodMinutes(radiusFromAltitudeKm(20200)) / 60, 2)} hours.`,
      `- **GEO, ${fmt(geo, 0)} km:** ${fmt(circularSpeedKmS(radiusFromAltitudeKm(geo)))} km/s, period one sidereal day, and only if inclination and eccentricity are both zero.`,
      "Higher orbit, lower circular speed, longer period.",
    ].join("\n");
  }

  if (/hohmann|transfer/.test(text)) {
    const nums = [...text.matchAll(/(\d[\d,]*(?:\.\d+)?)/g)].map((match) => Number(match[1].replaceAll(",", "")));
    const radii = nums.filter((n) => n > EARTH_RADIUS_KM);
    const r1 = radii[0] ?? EARTH_RADIUS_KM + 400;
    const r2 = radii[1] ?? radiusFromAltitudeKm(geostationaryAltitudeKm());
    const result = runOrbitMath({ tool: "hohmann", r1, r2 });
    if (!result) return null;
    return [
      result.explanation,
      "A Hohmann transfer is an ellipse that touches the inner orbit at periapsis and the outer orbit at apoapsis. The two burns change circular speed into that ellipse, then back to a circle.",
      "This is the lowest two-burn cost between circular coplanar orbits. It is not the fastest transfer.",
    ].join("\n\n");
  }

  if (/escape/.test(text)) {
    const altitude = altitudeFrom(text) ?? 0;
    return [
      `Escape speed ${altitude === 0 ? "at Earth's surface" : `at ${fmt(altitude, 0)} km altitude`} is **${fmt(escapeSpeedKmS(radiusFromAltitudeKm(altitude)))} km/s**.`,
      "Formula: v_esc = √(2μ/r). It is √2 times the circular speed at the same radius. Reaching it with no further thrust means the spacecraft can coast away on a parabola.",
    ].join("\n\n");
  }

  const asksOrbitNumber = /how fast|speed|velocity|period|how long|orbit/.test(text);
  const altitude = altitudeFrom(text);
  if (asksOrbitNumber && altitude !== undefined) {
    if (!Number.isFinite(altitude) || altitude < 160 || altitude > 100000) {
      return "Use an Earth-orbit altitude between 160 and 100,000 km. Below about 160 km, drag ends the orbit quickly. This tutor does not compute interplanetary transfers from an altitude alone.";
    }
    return orbitBrief(altitude);
  }

  const planetName = ["mercury", "venus", "mars", "jupiter", "saturn", "uranus", "neptune", "moon"].find((name) => text.includes(name));
  if (planetName && /what|tell|about|gravity|moon|atmosphere|temperature|radius/.test(text)) {
    const planet = getPlanet(planetName);
    if (planet) return planetLine(planet);
  }

  if (/\biss\b|space station/.test(text)) return orbitBrief(ISS_ALTITUDE_KM);

  return null;
}
