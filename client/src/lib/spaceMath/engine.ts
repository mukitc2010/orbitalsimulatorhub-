export type GameMode = "flight" | "expert" | "practice";
export const MODES = {
  flight: {
    label: "Flight academy",
    seconds: 1200,
    tolerance: 0.01,
    description: "20 minutes · 1% answer tolerance",
  },
  expert: {
    label: "Deep-space expert",
    seconds: 720,
    tolerance: 0.0025,
    description: "12 minutes · 0.25% answer tolerance",
  },
  practice: {
    label: "Practice",
    seconds: 0,
    tolerance: 0.01,
    description: "No clock · worked solutions · unranked",
  },
};
export const MU = 398600.4418;
export const EARTH_RADIUS = 6371;
export const SOLAR_MU = 1.32712440018e11;
export const AU = 149597870.7;
export interface Mission {
  id: string;
  title: string;
  role: string;
  brief: string;
  given: string[];
  question: string;
  unit: string;
  answer: number;
  hint: string;
  steps: string[];
}
const f = (n: number, digits = 3) =>
  n.toLocaleString("en-US", { maximumFractionDigits: digits });
export const circularSpeed = (radius: number) => Math.sqrt(MU / radius);
export const orbitPeriod = (a: number) => 2 * Math.PI * Math.sqrt(a ** 3 / MU);
export function hohmannDeltaV(r1: number, r2: number) {
  const a = (r1 + r2) / 2;
  return (
    Math.sqrt(MU * (2 / r1 - 1 / a)) -
    circularSpeed(r1) +
    circularSpeed(r2) -
    Math.sqrt(MU * (2 / r2 - 1 / a))
  );
}
export function parseNumericAnswer(text: string): number | null {
  const trimmed = text.trim();
  if (trimmed.includes(",") &&
      !/^[+-]?\d{1,3}(?:,\d{3})+(?:\.\d*)?(?:e[+-]?\d+)?$/i.test(trimmed))
    return null;
  const value = trimmed.replaceAll(",", "");
  if (!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i.test(value)) return null;
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}
export const correctAnswer = (
  answer: number,
  expected: number,
  mode: GameMode,
) =>
  Number.isFinite(answer) &&
  Math.abs(answer - expected) <=
    Math.max(1e-8, Math.abs(expected) * MODES[mode].tolerance);
export const missionScore = (
  failedAttempts: number,
  hinted: boolean,
  streak: number,
) =>
  Math.max(
    0,
    1000 - failedAttempts * 150 - (hinted ? 250 : 0) + Math.min(4, streak) * 50,
  );
export const dailyChallenge = (now = new Date()) =>
  `daily-${now.toISOString().slice(0, 10)}`;
export function validChallenge(seed: unknown): seed is string {
  return typeof seed === "string" && /^[a-zA-Z0-9-]{1,48}$/.test(seed);
}
function seeded(seed: string) {
  let h = 2166136261;
  for (const c of seed) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return () => {
    h = (Math.imul(h, 1664525) + 1013904223) >>> 0;
    return h / 4294967296;
  };
}
export function generateMissions(seed: string): Mission[] {
  if (!validChallenge(seed)) throw new Error("Invalid challenge code");
  const random = seeded(seed);
  const pick = (values: number[]) =>
    values[Math.floor(random() * values.length)];
  const altitude = pick([350, 420, 550, 800, 1000, 1200]);
  const r = EARTH_RADIUS + altitude;
  const hp = pick([300, 450, 600, 900]),
    ha = pick([12000, 18000, 22000, 30000]);
  const a = EARTH_RADIUS + (hp + ha) / 2;
  const h1 = pick([400, 600, 900]),
    h2 = pick([18000, 20200, 28000, 35786]);
  const r1 = EARTH_RADIUS + h1,
    r2 = EARTH_RADIUS + h2;
  const inclination = pick([15, 20, 25, 30, 35]);
  const planeRadius = EARTH_RADIUS + pick([20200, 28000, 35786]);
  const planeDv =
    2 * circularSpeed(planeRadius) * Math.sin((inclination * Math.PI) / 360);
  const dryMass = pick([800, 1000, 1200, 1500]),
    isp = pick([310, 330, 350, 380]);
  const burn = pick([1500, 2200, 3000, 3500]);
  const propellant = dryMass * (Math.exp(burn / (isp * 9.80665)) - 1);
  const destinationAU = pick([1.4, 1.524, 1.7, 1.9]);
  const solarA = (AU * (1 + destinationAU)) / 2;
  const days = (Math.PI * Math.sqrt(solarA ** 3 / SOLAR_MU)) / 86400;
  return [
    {
      id: "insertion",
      title: "Orbital insertion",
      role: "FLIGHT DYNAMICS",
      brief:
        "Your spacecraft has reached parking altitude. Determine the circular speed needed to stay in orbit.",
      given: [
        `Altitude h = ${altitude} km`,
        `Earth radius R = ${EARTH_RADIUS} km`,
        `μ = ${MU} km³/s²`,
      ],
      question: "What circular orbital speed is required?",
      unit: "km/s",
      answer: circularSpeed(r),
      hint: "First convert altitude to radius: r = R + h. Then v = √(μ/r).",
      steps: [
        `r = ${EARTH_RADIUS} + ${altitude} = ${r} km`,
        `v = √(${MU}/${r}) = ${f(circularSpeed(r), 5)} km/s`,
      ],
    },
    {
      id: "ellipse",
      title: "The long way around",
      role: "NAVIGATION",
      brief:
        "A navigation fault has placed the vehicle in an elliptical Earth orbit. Predict when it will complete one revolution.",
      given: [
        `Perigee altitude = ${hp} km`,
        `Apogee altitude = ${ha} km`,
        `Earth radius = ${EARTH_RADIUS} km`,
        `μ = ${MU} km³/s²`,
      ],
      question: "What is the orbital period in minutes?",
      unit: "min",
      answer: orbitPeriod(a) / 60,
      hint: "a = R + (h_perigee + h_apogee)/2. T = 2π√(a³/μ); convert seconds to minutes.",
      steps: [
        `a = ${EARTH_RADIUS} + (${hp} + ${ha})/2 = ${f(a)} km`,
        `T = 2π√(${a}³/${MU}) = ${f(orbitPeriod(a))} s`,
        `T/60 = ${f(orbitPeriod(a) / 60, 5)} min`,
      ],
    },
    {
      id: "transfer",
      title: "Transfer window",
      role: "PROPULSION",
      brief:
        "Raise the spacecraft from one circular Earth orbit to another using a coplanar, two-burn Hohmann transfer.",
      given: [
        `Initial altitude = ${h1} km`,
        `Final altitude = ${h2} km`,
        `Earth radius = ${EARTH_RADIUS} km`,
        `μ = ${MU} km³/s²`,
      ],
      question: "What is the sum of the two burn magnitudes?",
      unit: "km/s",
      answer: hohmannDeltaV(r1, r2),
      hint: "aₜ = (r₁+r₂)/2. Use vis-viva at each transfer apsis, then subtract the corresponding circular speeds.",
      steps: [
        `r₁ = ${r1} km; r₂ = ${r2} km; aₜ = ${(r1 + r2) / 2} km`,
        "Δv₁ = √[μ(2/r₁ − 1/aₜ)] − √(μ/r₁)",
        "Δv₂ = √(μ/r₂) − √[μ(2/r₂ − 1/aₜ)]",
        `Δv total = ${f(hohmannDeltaV(r1, r2), 5)} km/s`,
      ],
    },
    {
      id: "plane",
      title: "Change the plane",
      role: "GUIDANCE",
      brief:
        "At the intersection of two circular orbit planes, rotate the velocity vector without changing its magnitude.",
      given: [
        `Orbit radius (from Earth's center) = ${planeRadius} km`,
        `Plane angle = ${inclination}°`,
        `μ = ${MU} km³/s²`,
      ],
      question: "What impulse magnitude completes this pure plane change?",
      unit: "km/s",
      answer: planeDv,
      hint: "v = √(μ/r). For equal-speed vectors separated by angle Δi, Δv = 2v sin(Δi/2). Use degrees correctly.",
      steps: [
        `v = √(${MU}/${planeRadius}) = ${f(circularSpeed(planeRadius), 5)} km/s`,
        `Δv = 2 × v × sin(${inclination / 2}°) = ${f(planeDv, 5)} km/s`,
      ],
    },
    {
      id: "fuel",
      title: "Protect the fuel budget",
      role: "SYSTEMS ENGINEERING",
      brief:
        "Size the propellant load for an ideal impulsive maneuver. The final dry mass excludes all propellant; ignore tanks, reserves and losses.",
      given: [
        `Final dry mass m_f = ${dryMass} kg`,
        `Specific impulse = ${isp} s`,
        `Required Δv = ${burn} m/s`,
        "Standard gravity g₀ = 9.80665 m/s²",
      ],
      question: "How much propellant must be loaded?",
      unit: "kg",
      answer: propellant,
      hint: "Δv = Isp g₀ ln(m₀/m_f). Solve for m₀, then subtract m_f. Keep Δv in m/s.",
      steps: [
        `Mass ratio m₀/m_f = exp(${burn}/(${isp} × 9.80665))`,
        `m_propellant = ${dryMass} × [exp(Δv/(Isp g₀)) − 1]`,
        `Propellant = ${f(propellant, 5)} kg`,
      ],
    },
    {
      id: "interplanetary",
      title: "Beyond Earth",
      role: "MISSION COMMAND",
      brief:
        "Leave a circular orbit at 1 AU and coast along a solar Hohmann transfer to a circular destination orbit. Assume the departure phase is already aligned. Ignore Earth escape, capture and planet gravity.",
      given: [
        "Initial heliocentric radius = 1 AU",
        `Destination radius = ${destinationAU} AU`,
        `1 AU = ${AU} km`,
        `Solar μ = ${SOLAR_MU} km³/s²`,
        "1 day = 86,400 s",
      ],
      question: "How many days does the transfer coast take?",
      unit: "days",
      answer: days,
      hint: "aₜ = (r₁+r₂)/2 after converting AU to km. The transfer takes half an ellipse: t = π√(aₜ³/μ☉).",
      steps: [
        `aₜ = (1 + ${destinationAU})/2 × ${AU} = ${f(solarA)} km`,
        "Coast time = π√(aₜ³/μ☉)",
        `t = ${f(days, 5)} days`,
      ],
    },
  ];
}
export interface ScoreRecord {
  name: string;
  seed: string;
  mode: GameMode;
  score: number;
  correct: number;
  date: string;
}
export function loadScores(): ScoreRecord[] {
  try {
    const value: unknown = JSON.parse(
      localStorage.getItem("osh-space-math-scores-v1") || "[]",
    );
    if (!Array.isArray(value)) return [];
    return value
      .filter(
        (s): s is ScoreRecord =>
          s &&
          typeof s.name === "string" &&
          s.name.length <= 24 &&
          typeof s.seed === "string" &&
          validChallenge(s.seed) &&
          Object.hasOwn(MODES, s.mode) &&
          Number.isFinite(s.score) &&
          s.score >= 0 &&
          s.score <= 8000 &&
          Number.isInteger(s.correct) &&
          s.correct >= 0 &&
          s.correct <= 6 &&
          typeof s.date === "string",
      )
      .slice(0, 20);
  } catch {
    return [];
  }
}
