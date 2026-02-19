/**
 * Planet database with real mission data for the Orbital Simulator Hub.
 * Includes all 8 planets, Moon, and Pluto (dwarf planet).
 * Data sources: NSSDC, JPL Planetary Physical Parameters.
 */

export interface Planet {
  id: string;
  slug: string;
  name: string;
  emoji: string;
  type: "terrestrial" | "gas_giant" | "ice_giant" | "dwarf_planet" | "moon";
  distanceFromSunKm: number;
  distanceFromEarthKm: number;
  orbitalPeriodDays: number;
  rotationPeriodHours: number;
  radiusKm: number;
  massKg: string;
  gravityMps2: number;
  surfaceGravityG: number;
  avgTemperatureC: number;
  atmosphere: string;
  moons: number;
  hasRings: boolean;
  humanVisited: boolean;
  missionsVisited: string[];
  funFacts: string[];
  kidsExplanation: string;
  researchNotes: string;
  seoTitle: string;
  seoDescription: string;
  seoKeywords: string[];
  simulatorLink: string;
  color: string;
}

// ──── MERCURY ────

const MERCURY: Planet = {
  id: "planet_mercury",
  slug: "mercury",
  name: "Mercury",
  emoji: "☿",
  type: "terrestrial",
  distanceFromSunKm: 57_900_000,
  distanceFromEarthKm: 91_000_000,
  orbitalPeriodDays: 87.97,
  rotationPeriodHours: 1407.6,
  radiusKm: 2439.4,
  massKg: "3.30 × 10²³",
  gravityMps2: 3.7,
  surfaceGravityG: 0.38,
  avgTemperatureC: 167,
  atmosphere: "Exosphere only — trace amounts of helium, sodium, oxygen; surface pressure ~10⁻¹⁵ bar.",
  moons: 0,
  hasRings: false,
  humanVisited: false,
  missionsVisited: ["Mariner 10", "MESSENGER", "BepiColombo"],
  funFacts: [
    "Mercury is the smallest and fastest planet — a year is only 88 Earth days!",
    "It has the most extreme temperature swings: -180°C at night to 430°C during the day.",
    "Mercury's orbit is so eccentric it was key to proving Einstein's General Relativity.",
    "A day on Mercury (sunrise to sunrise) lasts 176 Earth days — longer than its year!",
  ],
  kidsExplanation:
    "Mercury is like a tiny speedster zooming around the Sun! It's so close that it gets super hot during the day and freezing at night. If you could stand on Mercury, you'd weigh much less than on Earth — like floating in a dream!",
  researchNotes:
    "Orbital mechanics: a ≈ 0.387 AU, e ≈ 0.206. Precession of perihelion ~43 arcsec/century (Einstein). Kepler's 3rd: T² ∝ a³. Surface gravity g = GM/r² ≈ 3.7 m/s².",
  seoTitle: "Mercury — Closest Planet to the Sun | Real Data | Orbital Simulator",
  seoDescription:
    "Explore Mercury: 57.9M km from the Sun, 0.38g gravity, extreme temperatures. Real mission data, orbital mechanics, and simulator.",
  seoKeywords: ["Mercury", "innermost planet", "solar system", "space agency", "MESSENGER", "orbital mechanics"],
  simulatorLink: "/simulator",
  color: "#8C7853",
};

// ──── VENUS ────

const VENUS: Planet = {
  id: "planet_venus",
  slug: "venus",
  name: "Venus",
  emoji: "♀",
  type: "terrestrial",
  distanceFromSunKm: 108_200_000,
  distanceFromEarthKm: 41_000_000,
  orbitalPeriodDays: 224.7,
  rotationPeriodHours: 5832,
  radiusKm: 6051.8,
  massKg: "4.87 × 10²⁴",
  gravityMps2: 8.87,
  surfaceGravityG: 0.91,
  avgTemperatureC: 462,
  atmosphere:
    "Dense CO₂ (96.5%), N₂ (3.5%); surface pressure 92 bar — equivalent to 900 m underwater on Earth.",
  moons: 0,
  hasRings: false,
  humanVisited: false,
  missionsVisited: ["Mariner 2", "Venera 7", "Magellan", "Venus Express", "Akatsuki", "Parker Solar Probe"],
  funFacts: [
    "Venus rotates backwards — the Sun rises in the west and sets in the east!",
    "A day on Venus (243 Earth days) is longer than its year (225 days).",
    "Its thick atmosphere creates a runaway greenhouse effect — hotter than Mercury despite being farther from the Sun.",
    "Venus is often called Earth's 'evil twin' because of its similar size but hostile conditions.",
  ],
  kidsExplanation:
    "Venus is like a super-hot sauna in space! It's wrapped in thick clouds that trap heat, so it's even hotter than Mercury. Venus spins the wrong way — if you lived there, you'd see the Sun rise in the west!",
  researchNotes:
    "Retrograde rotation: P_rot = -243.0 days. Orbital period 224.7 days. Surface gravity 8.87 m/s² (≈0.91g). Escape velocity 10.36 km/s. Atmospheric scale height H = kT/(mg).",
  seoTitle: "Venus — Hottest Planet, Thick CO₂ Atmosphere | Real Data | Orbital Simulator",
  seoDescription:
    "Explore Venus: 108.2M km from Sun, 462°C surface, thick CO₂ atmosphere. Real mission data and orbital simulator.",
  seoKeywords: ["Venus", "hottest planet", "greenhouse effect", "CO2 atmosphere", "space agency", "Magellan"],
  simulatorLink: "/simulator",
  color: "#E6C229",
};

// ──── EARTH ────

const EARTH: Planet = {
  id: "planet_earth",
  slug: "earth",
  name: "Earth",
  emoji: "🌍",
  type: "terrestrial",
  distanceFromSunKm: 149_600_000,
  distanceFromEarthKm: 0,
  orbitalPeriodDays: 365.25,
  rotationPeriodHours: 23.93,
  radiusKm: 6371.0,
  massKg: "5.97 × 10²⁴",
  gravityMps2: 9.8,
  surfaceGravityG: 1,
  avgTemperatureC: 15,
  atmosphere:
    "N₂ (78%), O₂ (21%), Ar (1%); surface pressure 1 bar. Liquid water, life, and a protective magnetic field.",
  moons: 1,
  hasRings: false,
  humanVisited: true,
  missionsVisited: ["All human spaceflight", "ISS", "Hubble", "Thousands of satellites"],
  funFacts: [
    "Earth is the only known planet with liquid water on the surface and life.",
    "Our Moon is unusually large relative to Earth — about 1/4 Earth's diameter.",
    "Earth's magnetic field protects us from solar wind and cosmic rays.",
    "Earth travels ~940 million km around the Sun each year.",
  ],
  kidsExplanation:
    "Earth is our home — a blue and green marble floating in space! We have air to breathe, water to drink, and the perfect distance from the Sun. The Moon is our nighttime friend, and we're the only planet we know with life!",
  researchNotes:
    "1 AU = 149.6×10⁶ km. Orbital velocity v = √(GM☉/a) ≈ 29.78 km/s. g = 9.8 m/s². Hill sphere ~1.5×10⁶ km. T² = (4π²/GM)a³.",
  seoTitle: "Earth — Our Home Planet | Real Data | Orbital Simulator",
  seoDescription:
    "Explore Earth: 149.6M km from Sun, 1g gravity, 1 moon. Real mission data, orbital mechanics, and simulator.",
  seoKeywords: ["Earth", "home planet", "solar system", "space agency", "orbital mechanics", "1 AU"],
  simulatorLink: "/simulator",
  color: "#1E90FF",
};

// ──── MOON ────

const MOON: Planet = {
  id: "planet_moon",
  slug: "moon",
  name: "Moon",
  emoji: "🌙",
  type: "moon",
  distanceFromSunKm: 149_600_000,
  distanceFromEarthKm: 384_400,
  orbitalPeriodDays: 27.32,
  rotationPeriodHours: 655.7,
  radiusKm: 1737.5,
  massKg: "7.35 × 10²²",
  gravityMps2: 1.62,
  surfaceGravityG: 0.16,
  avgTemperatureC: -20,
  atmosphere: "Essentially none — tenuous exosphere with trace argon, helium, neon; pressure ~10⁻¹⁰ bar.",
  moons: 0,
  hasRings: false,
  humanVisited: true,
  missionsVisited: ["Apollo 11–17", "Luna program", "Artemis (planned)", "Chang'e", "LRO", "SLIM"],
  funFacts: [
    "Twelve humans have walked on the Moon — all during Apollo 11–17 (1969–1972).",
    "The Moon is slowly drifting away from Earth at ~3.8 cm per year.",
    "We always see the same face because the Moon is tidally locked to Earth.",
    "The Moon's gravity causes Earth's tides and stabilizes our planet's axial tilt.",
  ],
  kidsExplanation:
    "The Moon is Earth's best buddy in space! It orbits us every month and lights up our nights. Astronauts have walked on it! On the Moon you'd weigh way less — you could jump really high like a bunny!",
  researchNotes:
    "Semi-major axis a = 384,400 km. Orbital period 27.32 days (sidereal). Tidal locking: P_rot = P_orb. g = 1.62 m/s². Mass ratio M_moon/M_earth ≈ 0.0123. Hill radius of Earth ~1.5×10⁶ km.",
  seoTitle: "Moon — Earth's Natural Satellite | Real Data | Orbital Simulator",
  seoDescription:
    "Explore the Moon: 384,400 km from Earth, 0.16g gravity, Apollo landings. Real mission data and orbital simulator.",
  seoKeywords: ["Moon", "lunar", "Apollo", "space agency", "tidal locking", "orbital mechanics"],
  simulatorLink: "/simulator",
  color: "#C0C0C0",
};

// ──── MARS ────

const MARS: Planet = {
  id: "planet_mars",
  slug: "mars",
  name: "Mars",
  emoji: "♂",
  type: "terrestrial",
  distanceFromSunKm: 227_900_000,
  distanceFromEarthKm: 78_000_000,
  orbitalPeriodDays: 687,
  rotationPeriodHours: 24.62,
  radiusKm: 3389.5,
  massKg: "6.42 × 10²³",
  gravityMps2: 3.71,
  surfaceGravityG: 0.38,
  avgTemperatureC: -65,
  atmosphere:
    "Thin CO₂ (95%), N₂ (2.8%), Ar (2%); surface pressure ~0.006 bar — too thin for liquid water.",
  moons: 2,
  hasRings: false,
  humanVisited: false,
  missionsVisited: [
    "Mariner 4",
    "Viking 1 & 2",
    "Mars Pathfinder",
    "Spirit",
    "Opportunity",
    "Curiosity",
    "Perseverance",
    "Ingenuity",
  ],
  funFacts: [
    "Mars has the tallest volcano in the solar system — Olympus Mons is 21 km high!",
    "Phobos and Deimos are its two tiny, irregularly shaped moons — possibly captured asteroids.",
    "Mars has seasons like Earth because its axis is tilted about 25°.",
    "Perseverance rover is searching for signs of past microbial life and collecting samples for return.",
  ],
  kidsExplanation:
    "Mars is the Red Planet — rusty and dusty! It has giant volcanoes and canyons bigger than anything on Earth. Robots like Curiosity and Perseverance are exploring it right now. Maybe humans will visit someday!",
  researchNotes:
    "a ≈ 1.52 AU, e ≈ 0.093. Orbital period 687 days. g = 3.71 m/s². Moons: Phobos (27 km), Deimos (15 km). Hohmann transfer to Mars: Δv ~5.6 km/s from LEO.",
  seoTitle: "Mars — The Red Planet | Real Data | Orbital Simulator",
  seoDescription:
    "Explore Mars: 227.9M km from Sun, 0.38g, 2 moons, Perseverance rover. Real mission data and orbital simulator.",
  seoKeywords: ["Mars", "Red Planet", "Perseverance", "Olympus Mons", "space agency", "orbital mechanics"],
  simulatorLink: "/simulator",
  color: "#E27B58",
};

// ──── JUPITER ────

const JUPITER: Planet = {
  id: "planet_jupiter",
  slug: "jupiter",
  name: "Jupiter",
  emoji: "♃",
  type: "gas_giant",
  distanceFromSunKm: 778_500_000,
  distanceFromEarthKm: 628_000_000,
  orbitalPeriodDays: 4332.6,
  rotationPeriodHours: 9.93,
  radiusKm: 69911,
  massKg: "1.90 × 10²⁷",
  gravityMps2: 24.79,
  surfaceGravityG: 2.53,
  avgTemperatureC: -110,
  atmosphere:
    "H₂ (~90%), He (~10%); no solid surface — gas transitions to liquid metallic hydrogen at depth.",
  moons: 95,
  hasRings: true,
  humanVisited: false,
  missionsVisited: ["Pioneer 10 & 11", "Voyager 1 & 2", "Galileo", "Juno", "Cassini"],
  funFacts: [
    "Jupiter's Great Red Spot is a storm bigger than Earth that has raged for at least 400 years.",
    "Jupiter is so massive it could fit all other planets inside it — more than twice the combined mass of the rest.",
    "It has 95 known moons, including Europa (ocean world) and Io (most volcanically active body in the solar system).",
    "Jupiter protects Earth by deflecting many comets and asteroids with its gravity.",
  ],
  kidsExplanation:
    "Jupiter is the king of the planets — a giant ball of gas! It has a huge storm called the Great Red Spot. If you could stand on Jupiter (you can't — it's all gas!), you'd weigh more than twice as much as on Earth!",
  researchNotes:
    "a ≈ 5.2 AU, e ≈ 0.048. Orbital period 11.86 years. g = 24.79 m/s² at 1 bar level. Jupiter mass ≈ 318 M⊕. Tisserand parameter for comet encounters. Roche limit for moon disruption.",
  seoTitle: "Jupiter — Largest Planet, Great Red Spot | Real Data | Orbital Simulator",
  seoDescription:
    "Explore Jupiter: 778.5M km from Sun, 2.53g, 95+ moons, Great Red Spot. Real mission data and orbital simulator.",
  seoKeywords: ["Jupiter", "gas giant", "Great Red Spot", "Juno", "Europa", "space agency", "orbital mechanics"],
  simulatorLink: "/simulator",
  color: "#C88B3A",
};

// ──── SATURN ────

const SATURN: Planet = {
  id: "planet_saturn",
  slug: "saturn",
  name: "Saturn",
  emoji: "♄",
  type: "gas_giant",
  distanceFromSunKm: 1_433_500_000,
  distanceFromEarthKm: 1_200_000_000,
  orbitalPeriodDays: 10759,
  rotationPeriodHours: 10.66,
  radiusKm: 58232,
  massKg: "5.68 × 10²⁶",
  gravityMps2: 10.44,
  surfaceGravityG: 1.07,
  avgTemperatureC: -140,
  atmosphere:
    "H₂ (~96%), He (~3%); no solid surface — spectacular ring system of ice and rock particles.",
  moons: 146,
  hasRings: true,
  humanVisited: false,
  missionsVisited: ["Pioneer 11", "Voyager 1 & 2", "Cassini-Huygens"],
  funFacts: [
    "Saturn's rings are made of billions of ice and rock chunks — you could fit Earth between the rings!",
    "Saturn is the only planet less dense than water — it would float in a giant bathtub!",
    "Titan, its largest moon, has lakes of liquid methane and a thick atmosphere.",
    "Cassini orbited Saturn for 13 years before its dramatic Grand Finale plunge into the planet.",
  ],
  kidsExplanation:
    "Saturn is the ringed beauty of the solar system! Those gorgeous rings are made of ice and rocks. Saturn is so light it would float in water — if you had a pool big enough! Its moon Titan has lakes of methane.",
  researchNotes:
    "a ≈ 9.5 AU, e ≈ 0.056. Orbital period 29.45 years. g = 10.44 m/s². Ring system: A, B, C rings; Cassini Division. Roche limit ~2.44 R_Saturn. Titan: N₂ atmosphere, liquid methane.",
  seoTitle: "Saturn — Ringed Planet | Real Data | Orbital Simulator",
  seoDescription:
    "Explore Saturn: 1.43B km from Sun, 1.07g, 146+ moons, spectacular rings. Real mission data and orbital simulator.",
  seoKeywords: ["Saturn", "rings", "Cassini", "Titan", "gas giant", "space agency", "orbital mechanics"],
  simulatorLink: "/simulator",
  color: "#F4D03F",
};

// ──── URANUS ────

const URANUS: Planet = {
  id: "planet_uranus",
  slug: "uranus",
  name: "Uranus",
  emoji: "♅",
  type: "ice_giant",
  distanceFromSunKm: 2_872_500_000,
  distanceFromEarthKm: 2_600_000_000,
  orbitalPeriodDays: 30687,
  rotationPeriodHours: 17.24,
  radiusKm: 25362,
  massKg: "8.68 × 10²⁵",
  gravityMps2: 8.87,
  surfaceGravityG: 0.89,
  avgTemperatureC: -195,
  atmosphere:
    "H₂ (~83%), He (~15%), CH₄ (~2%); ice giant with water, ammonia, methane ices in mantle.",
  moons: 28,
  hasRings: true,
  humanVisited: false,
  missionsVisited: ["Voyager 2"],
  funFacts: [
    "Uranus is tilted 98° — it orbits the Sun 'on its side,' rolling like a ball!",
    "Only Voyager 2 has ever visited Uranus — in 1986 — no other spacecraft has returned.",
    "Its blue-green color comes from methane in the atmosphere absorbing red light.",
    "Uranus has 28 known moons, named after Shakespeare characters — Titania, Oberon, Miranda.",
  ],
  kidsExplanation:
    "Uranus is the sideways planet! It rolls around the Sun instead of spinning upright. It's icy and blue-green. Only one spacecraft, Voyager 2, has ever said hello — way back in 1986!",
  researchNotes:
    "a ≈ 19.2 AU, e ≈ 0.046. Orbital period 84 years. Axial tilt 97.77°. g = 8.87 m/s². Ice giant: H₂O, NH₃, CH₄ ices. Voyager 2 flyby Jan 1986. Ring system discovered 1977.",
  seoTitle: "Uranus — Ice Giant, Tilted 98° | Real Data | Orbital Simulator",
  seoDescription:
    "Explore Uranus: 2.87B km from Sun, 0.89g, 28 moons, tilted 98°. Real mission data and orbital simulator.",
  seoKeywords: ["Uranus", "ice giant", "tilted planet", "Voyager 2", "space agency", "orbital mechanics"],
  simulatorLink: "/simulator",
  color: "#4FD0E7",
};

// ──── NEPTUNE ────

const NEPTUNE: Planet = {
  id: "planet_neptune",
  slug: "neptune",
  name: "Neptune",
  emoji: "♆",
  type: "ice_giant",
  distanceFromSunKm: 4_501_000_000,
  distanceFromEarthKm: 4_300_000_000,
  orbitalPeriodDays: 60225,
  rotationPeriodHours: 16.11,
  radiusKm: 24622,
  massKg: "1.02 × 10²⁶",
  gravityMps2: 11.15,
  surfaceGravityG: 1.14,
  avgTemperatureC: -200,
  atmosphere:
    "H₂ (~80%), He (~19%), CH₄ (~1%); ice giant with strongest winds in the solar system.",
  moons: 16,
  hasRings: true,
  humanVisited: false,
  missionsVisited: ["Voyager 2"],
  funFacts: [
    "Neptune has the strongest winds in the solar system — supersonic gusts up to 2,100 km/h!",
    "It was discovered mathematically — Urbain Le Verrier predicted its position before it was seen.",
    "Neptune's moon Triton orbits backwards and may be a captured Kuiper Belt object.",
    "Only Voyager 2 has visited Neptune — in 1989 — the farthest planet reached by a spacecraft.",
  ],
  kidsExplanation:
    "Neptune is the windiest planet — its storms blow faster than a jet! It's deep blue and super far away. Scientists found it with math before they saw it through a telescope. Voyager 2 is the only visitor!",
  researchNotes:
    "a ≈ 30.1 AU, e ≈ 0.009. Orbital period 164.8 years. g = 11.15 m/s². Great Dark Spot (Voyager 2). Triton: retrograde orbit, geysers. Predicted 1846 by Le Verrier and Adams.",
  seoTitle: "Neptune — Strongest Winds, Ice Giant | Real Data | Orbital Simulator",
  seoDescription:
    "Explore Neptune: 4.5B km from Sun, 1.14g, 16 moons, strongest winds. Real mission data and orbital simulator.",
  seoKeywords: ["Neptune", "ice giant", "strongest winds", "Voyager 2", "Triton", "space agency", "orbital mechanics"],
  simulatorLink: "/simulator",
  color: "#4166F5",
};

// ──── PLUTO ────

const PLUTO: Planet = {
  id: "planet_pluto",
  slug: "pluto",
  name: "Pluto",
  emoji: "♇",
  type: "dwarf_planet",
  distanceFromSunKm: 5_906_400_000,
  distanceFromEarthKm: 5_900_000_000,
  orbitalPeriodDays: 90613,
  rotationPeriodHours: 153.3,
  radiusKm: 1188.3,
  massKg: "1.30 × 10²²",
  gravityMps2: 0.62,
  surfaceGravityG: 0.06,
  avgTemperatureC: -229,
  atmosphere:
    "Thin, variable N₂ with CH₄ and CO; only present when Pluto is near perihelion — freezes out when far from Sun.",
  moons: 5,
  hasRings: false,
  humanVisited: false,
  missionsVisited: ["New Horizons"],
  funFacts: [
    "Pluto was reclassified as a dwarf planet in 2006 — it hasn't cleared its orbital neighborhood.",
    "New Horizons revealed a heart-shaped region (Tombaugh Regio) and icy mountains.",
    "Pluto has five moons — Charon is so big that Pluto-Charon orbit around a point between them.",
    "A year on Pluto lasts 248 Earth years — it hasn't completed one orbit since its discovery in 1930!",
  ],
  kidsExplanation:
    "Pluto is a tiny, icy world way out in the cold! It used to be called a planet, but now it's a dwarf planet. It has a heart-shaped spot and a big moon named Charon. New Horizons visited in 2015 and sent back amazing pictures!",
  researchNotes:
    "a ≈ 39.5 AU, e ≈ 0.249 (highly elliptical). Orbital period 247.9 years. g = 0.62 m/s². Pluto-Charon barycenter outside Pluto. Kuiper Belt object. IAU definition: must clear neighborhood.",
  seoTitle: "Pluto — Dwarf Planet | Real Data | Orbital Simulator",
  seoDescription:
    "Explore Pluto: 5.9B km from Sun, 0.06g, 5 moons, New Horizons. Real mission data and orbital simulator.",
  seoKeywords: ["Pluto", "dwarf planet", "New Horizons", "Kuiper Belt", "Charon", "space agency", "orbital mechanics"],
  simulatorLink: "/simulator",
  color: "#8B7355",
};

// ──── EXPORTS ────

export const ALL_PLANETS: Planet[] = [
  MERCURY,
  VENUS,
  EARTH,
  MOON,
  MARS,
  JUPITER,
  SATURN,
  URANUS,
  NEPTUNE,
  PLUTO,
];

export function getPlanetBySlug(slug: string): Planet | undefined {
  return ALL_PLANETS.find((p) => p.slug === slug);
}

export function getSolarSystemPlanets(): Planet[] {
  return ALL_PLANETS.filter(
    (p) => p.type !== "moon" && p.type !== "dwarf_planet"
  );
}
