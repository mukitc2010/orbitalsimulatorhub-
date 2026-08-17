export interface QuizQuestion {
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

export const FUN_FACTS: string[] = [
  "The ISS orbits Earth at about 7.66 km/s — it circles the whole planet in roughly 92 minutes.",
  "Geostationary satellites at 35,786 km altitude orbit exactly once per day, so they appear fixed in the sky.",
  "GPS satellites fly in Medium Earth Orbit at ~20,200 km and carry atomic clocks accurate to nanoseconds.",
  "Earth's escape velocity is about 11.2 km/s — roughly 34 times the speed of sound.",
  "A satellite in orbit is constantly falling toward Earth — it just moves sideways fast enough to keep missing.",
  "There are over 9,000 active satellites orbiting Earth right now, and tens of thousands of tracked debris objects.",
  "The higher your orbit, the slower you go: the Moon orbits Earth at only about 1 km/s.",
  "Sunlight pressure alone can slowly change a satellite's orbit — some spacecraft even use solar sails to steer.",
  "One day on the ISS includes about 16 sunrises and 16 sunsets.",
  "Kepler worked out the laws of orbital motion in 1609 — four centuries before we could fly them.",
];

export const QUIZ: QuizQuestion[] = [
  {
    question: "What keeps a satellite in orbit around Earth?",
    options: [
      "Its rocket engines fire continuously",
      "Gravity balances its sideways velocity",
      "There is no gravity in space",
      "Magnetic fields push it around",
    ],
    answerIndex: 1,
    explanation:
      "A satellite is in constant free-fall. Its huge sideways speed makes it fall around Earth instead of into it — gravity provides exactly the pull needed to curve its path.",
  },
  {
    question: "Roughly how long does the ISS take to orbit Earth once?",
    options: ["24 hours", "8 hours", "92 minutes", "10 minutes"],
    answerIndex: 2,
    explanation:
      "At ~400 km altitude the ISS travels 7.66 km/s, completing one orbit in about 92 minutes.",
  },
  {
    question: "A geostationary satellite appears fixed in the sky because…",
    options: [
      "It doesn't move at all",
      "Its orbital period matches Earth's rotation",
      "It's attached to a space elevator",
      "It flies below the clouds",
    ],
    answerIndex: 1,
    explanation:
      "At 35,786 km altitude the orbital period is exactly one sidereal day, so the satellite keeps pace with the ground beneath it.",
  },
  {
    question: "What happens to orbital speed as altitude increases?",
    options: [
      "It increases",
      "It stays the same",
      "It decreases",
      "It becomes zero",
    ],
    answerIndex: 2,
    explanation:
      "v = √(μ/r): the larger the orbital radius, the slower the required speed. The Moon orbits at just ~1 km/s.",
  },
  {
    question: "Which of Newton's laws explains a rocket pushing exhaust down to go up?",
    options: [
      "First law (inertia)",
      "Second law (F = ma)",
      "Third law (action–reaction)",
      "Law of universal gravitation",
    ],
    answerIndex: 2,
    explanation:
      "For every action there is an equal and opposite reaction — exhaust pushed one way pushes the rocket the other way.",
  },
  {
    question: "Earth's escape velocity at the surface is about…",
    options: ["1.2 km/s", "7.9 km/s", "11.2 km/s", "35 km/s"],
    answerIndex: 2,
    explanation:
      "v = √(2μ/r) ≈ 11.2 km/s. Reach that speed (ignoring drag) and you'll never fall back.",
  },
  {
    question: "GPS satellites orbit in which region?",
    options: [
      "Low Earth Orbit (~400 km)",
      "Medium Earth Orbit (~20,200 km)",
      "Geostationary orbit (~35,786 km)",
      "Lunar orbit",
    ],
    answerIndex: 1,
    explanation:
      "GPS uses Medium Earth Orbit at ~20,200 km, circling Earth about twice per day.",
  },
  {
    question: "Where does most of the heat of reentry come from?",
    options: [
      "Friction rubbing against the air",
      "The engines firing backwards",
      "Air compressed by the spacecraft's shockwave",
      "Sunlight focused by the atmosphere",
    ],
    answerIndex: 2,
    explanation:
      "A returning craft rams into air faster than it can move aside, compressing it into a glowing shock layer thousands of degrees hot — compression, not friction, does the heating.",
  },
  {
    question: "Why does the James Webb Space Telescope observe in infrared?",
    options: [
      "Infrared cameras are cheaper",
      "Expansion of the universe stretches ancient light into infrared",
      "Infrared passes through Earth's clouds",
      "Stars only emit infrared light",
    ],
    answerIndex: 1,
    explanation:
      "Light from the earliest galaxies has been stretched (redshifted) out of the visible range by the expanding universe — to see the first stars, you must look in infrared.",
  },
  {
    question: "Without the 38 μs/day relativity correction, GPS positions would drift by about…",
    options: ["A few centimeters a day", "10 meters a day", "10 km a day", "Nothing — GPS ignores relativity"],
    answerIndex: 2,
    explanation:
      "Satellite clocks run 38 microseconds per day fast due to relativity. At the speed of light that's roughly 10 km of position error per day if uncorrected.",
  },
  {
    question: "How much of a typical rocket's launch mass is propellant?",
    options: ["About 10%", "About 50%", "About 90%", "About 99.9%"],
    answerIndex: 2,
    explanation:
      "The rocket equation is brutal: reaching orbital speed requires roughly 90% of liftoff mass to be propellant, which is why rockets shed empty stages as they climb.",
  },
  {
    question: "What does an orbit's eccentricity describe?",
    options: [
      "How tilted the orbit is",
      "How stretched (elliptical) the orbit is",
      "How fast the satellite spins",
      "The satellite's mass",
    ],
    answerIndex: 1,
    explanation:
      "Eccentricity 0 is a perfect circle; values approaching 1 are increasingly stretched ellipses.",
  },
];
