/**
 * Expanded AstroBot Knowledge Base
 * Covers all website topics: NASA, Newton, Quantum Physics, Astrophysics, Orbital Mechanics
 * Auto-updated via n8n with AI-generated topics
 */

export interface AstroBotKnowledge {
  keywords: string[];
  answer: string;
  category: "nasa" | "newton" | "quantum-physics" | "astrophysics" | "orbital-mechanics" | "general";
}

export const EXPANDED_ASTROBOT_KNOWLEDGE: AstroBotKnowledge[] = [
  // NASA Topics
  {
    keywords: ["nasa missions", "nasa projects", "nasa programs", "what nasa does"],
    answer: "NASA conducts amazing missions! They send rovers to Mars (Curiosity, Perseverance), telescopes to space (James Webb, Hubble), astronauts to the ISS, and probes to planets. NASA uses orbital mechanics for every mission. Learn more at /learn/aerospace#nasa",
    category: "nasa",
  },
  {
    keywords: ["james webb", "jwst", "webb telescope", "space telescope"],
    answer: "The James Webb Space Telescope (JWST) is NASA's most powerful telescope! It's at the Sun-Earth L2 point, 1.5 million km away. It sees the oldest light in the universe and studies exoplanets. Learn more at /learn/aerospace",
    category: "nasa",
  },
  {
    keywords: ["mars rover", "curiosity", "perseverance", "mars exploration"],
    answer: "NASA's Mars rovers are amazing robots! Curiosity and Perseverance explore Mars, collect samples, and send data back. They use orbital mechanics to get to Mars and land safely. Learn more at /learn/aerospace#rovers",
    category: "nasa",
  },
  {
    keywords: ["apollo", "moon landing", "apollo mission", "moon mission"],
    answer: "Apollo missions landed humans on the Moon! Apollo 11 was the first in 1969. NASA used Newton's laws and orbital mechanics to get there and back. Learn more at /learn/aerospace#nasa",
    category: "nasa",
  },
  {
    keywords: ["starlink", "spacex starlink", "internet satellites"],
    answer: "Starlink is SpaceX's satellite internet constellation! Thousands of satellites in Low Earth Orbit provide global internet. They orbit at ~550 km altitude. Learn more at /satellites",
    category: "nasa",
  },

  // Newton Topics
  {
    keywords: ["newton first law", "inertia", "law of inertia"],
    answer: "Newton's First Law: Objects at rest stay at rest, objects in motion stay in motion (unless acted upon). This is inertia! Satellites in orbit keep moving because of inertia. Learn more at /learn/newton",
    category: "newton",
  },
  {
    keywords: ["newton second law", "f equals ma", "force equals mass times acceleration"],
    answer: "Newton's Second Law: F = ma (Force = mass × acceleration). More force = more acceleration. Rockets use this: big force pushes rocket up! Learn more at /learn/newton and /formulas-library",
    category: "newton",
  },
  {
    keywords: ["newton third law", "action reaction", "equal and opposite"],
    answer: "Newton's Third Law: For every action, there's an equal and opposite reaction. Rockets push gas down → gas pushes rocket up! Learn more at /learn/newton",
    category: "newton",
  },
  {
    keywords: ["universal gravitation", "law of gravity", "newton gravity"],
    answer: "Newton's Law of Universal Gravitation: F = G(m1×m2)/r². Everything attracts everything else! Earth pulls satellites, keeping them in orbit. Learn more at /formulas-library",
    category: "newton",
  },
  {
    keywords: ["newton laws", "newton's laws", "three laws"],
    answer: "Newton's three laws explain motion! 1st: Inertia (things keep moving). 2nd: F=ma (force causes acceleration). 3rd: Action-reaction (rockets work!). These laws make orbits possible! Learn more at /learn/newton",
    category: "newton",
  },

  // Quantum Physics Topics
  {
    keywords: ["quantum", "quantum mechanics", "quantum physics", "what is quantum"],
    answer: "Quantum physics studies tiny particles (atoms, electrons)! It explains how particles behave differently than big objects. Quantum mechanics helps with space technology like atomic clocks in GPS satellites. Learn more at /research",
    category: "quantum-physics",
  },
  {
    keywords: ["quantum entanglement", "entanglement", "spooky action"],
    answer: "Quantum entanglement is when particles are connected even far apart! Changing one instantly affects the other. Scientists are exploring this for space communication. Learn more at /research",
    category: "quantum-physics",
  },
  {
    keywords: ["quantum computing", "quantum computer", "quantum processor"],
    answer: "Quantum computers use quantum mechanics to solve problems faster! NASA and other agencies research quantum computing for space missions and complex calculations. Learn more at /research",
    category: "quantum-physics",
  },

  // Astrophysics Topics
  {
    keywords: ["black hole", "blackhole", "event horizon", "singularity"],
    answer: "Black holes are regions where gravity is so strong nothing escapes, not even light! They have an event horizon boundary. Scientists study them with telescopes. Learn more at /research",
    category: "astrophysics",
  },
  {
    keywords: ["star formation", "how stars form", "stellar formation", "protostar"],
    answer: "Stars form from gas clouds in space! Gravity pulls gas together, it heats up, and nuclear fusion starts. Our Sun formed this way 4.6 billion years ago! Learn more at /research",
    category: "astrophysics",
  },
  {
    keywords: ["dark matter", "dark energy", "dark matter dark energy"],
    answer: "Dark matter and dark energy are mysterious! Dark matter holds galaxies together. Dark energy makes the universe expand faster. Scientists are still studying them! Learn more at /research",
    category: "astrophysics",
  },
  {
    keywords: ["exoplanet", "exoplanets", "planets outside solar system"],
    answer: "Exoplanets are planets orbiting other stars! Scientists have found thousands. Some might have life! The James Webb Telescope studies exoplanet atmospheres. Learn more at /research",
    category: "astrophysics",
  },
  {
    keywords: ["big bang", "big bang theory", "universe origin"],
    answer: "The Big Bang theory says the universe started from a tiny point 13.8 billion years ago! It expanded and cooled, forming stars, galaxies, and planets. Learn more at /research",
    category: "astrophysics",
  },

  // Orbital Mechanics Topics
  {
    keywords: ["kepler", "kepler's laws", "kepler laws", "planetary motion"],
    answer: "Kepler's three laws describe planetary motion! 1st: Orbits are ellipses. 2nd: Planets sweep equal areas in equal times. 3rd: Period² ∝ distance³. These apply to satellites too! Learn more at /formulas-library",
    category: "orbital-mechanics",
  },
  {
    keywords: ["escape velocity", "escape speed", "how to leave earth"],
    answer: "Escape velocity is the speed needed to leave Earth's gravity! It's about 11.2 km/s. Rockets need this speed to go to the Moon or Mars. Formula: v = √(2GM/r). Learn more at /formulas-library",
    category: "orbital-mechanics",
  },
  {
    keywords: ["hohmann transfer", "orbit transfer", "changing orbits"],
    answer: "Hohmann transfer is the most efficient way to change orbits! It uses two engine burns to move from one orbit to another. NASA uses this for interplanetary missions! Learn more at /simulator",
    category: "orbital-mechanics",
  },
  {
    keywords: ["lagrange points", "l1 l2 l3", "l4 l5", "gravitational balance"],
    answer: "Lagrange points are special spots where gravity balances perfectly! L1, L2, L3, L4, L5. The James Webb Telescope is at L2! Satellites can stay there with little fuel. Learn more at /learn/aerospace",
    category: "orbital-mechanics",
  },
  {
    keywords: ["perigee", "apogee", "closest farthest", "orbit height"],
    answer: "Perigee is the closest point to Earth in an orbit. Apogee is the farthest point! Elliptical orbits have different heights. The Simulator shows perigee and apogee for each satellite! Learn more at /simulator",
    category: "orbital-mechanics",
  },

  // Website-Specific Topics
  {
    keywords: ["formulas", "equations", "formula library", "space formulas"],
    answer: "Our Formulas Library has all space physics formulas! Gravity, orbital velocity, escape velocity, Kepler's laws, rocket equation. Each has explanations and calculators! Visit /formulas-library",
    category: "general",
  },
  {
    keywords: ["calculators", "orbit calculator", "gravity calculator"],
    answer: "We have interactive calculators! Orbit calculator (altitude → speed, period), gravity calculator (mass, distance → force), escape velocity calculator. Try them at /calculators",
    category: "general",
  },
  {
    keywords: ["blog", "space blog", "nasa news", "space facts"],
    answer: "Our Space Blog has daily NASA news, space facts, satellite tutorials, and astronomy lessons! Fresh content every day. Check it out at /blog",
    category: "general",
  },
  {
    keywords: ["research", "phd", "aerospace research", "advanced"],
    answer: "For advanced aerospace study, we have mission data, algorithms, formulas, and calculations. Visit /research and /learn/aerospace",
    category: "general",
  },
];
