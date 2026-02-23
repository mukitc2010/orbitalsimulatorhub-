/**
 * AstroBot knowledge base — works without the API so chat always responds.
 * Matches app: Orbital Simulator Hub / orbitalsimulatorhub.com (orbits, LEO, MEO, GEO, satellites).
 * Includes references to sources where information was collected.
 */

export interface AstroBotKnowledgeEntry {
  keywords: string[];
  answer: string;
  references?: Array<{ title: string; url: string; source: string }>;
  category?: "nasa" | "newton" | "quantum-physics" | "astrophysics" | "orbital-mechanics" | "general";
}

export const ASTROBOT_KNOWLEDGE: AstroBotKnowledgeEntry[] = [
  // —— Title-related: orbital mechanics & simulator ——
  {
    keywords: ["orbital mechanics", "orbits", "how do orbits work", "what is an orbit"],
    answer:
      "Orbital mechanics describes how objects move in space under gravity. An orbit is the path a satellite or planet takes around another body. Gravity pulls the satellite inward while its velocity keeps it from falling—the result is a curved path (circle or ellipse). Try the [simulator](/simulator) to add LEO, MEO, or GEO and observe the physics. Continue exploring with AstroBot on OrbitalSimulatorHub 🚀",
  },
  {
    keywords: ["leo", "low earth", "iss orbit", "400 km"],
    answer:
      "LEO means Low Earth Orbit — close to Earth, about 200–800 km high. The ISS is in LEO! Satellites in LEO go around Earth in about 90 minutes. In our Orbital Simulator Hub you can add a LEO satellite and see it zoom around the blue Earth. Do you want a space mission challenge?",
  },
  {
    keywords: ["meo", "medium earth", "gps", "gps satellite"],
    answer:
      "MEO is Medium Earth Orbit — higher than LEO, around 20,000 km. GPS satellites orbit there! They take about 12 hours for one lap. In the Simulator, click Add MEO to see a GPS-like orbit. Do you want a space mission challenge?",
  },
  {
    keywords: ["geo", "geostationary", "weather satellite", "35"],
    answer:
      "GEO is Geostationary Orbit — very far, about 36,000 km. The satellite takes 24 hours to orbit, so it seems to stay in the same place in the sky! Weather and TV satellites use GEO. Try Add GEO in the Simulator to see it. Do you want a space mission challenge?",
  },
  {
    keywords: ["simulator", "this app", "website", "what is this"],
    answer:
      "This is Orbital Simulator Hub (orbitalsimulatorhub.com). Add satellites in LEO, MEO, or GEO and watch them orbit Earth in 3D. I'm AstroBot—your space intelligence for learning orbits, satellites, rockets, and the ISS. Continue exploring with AstroBot on OrbitalSimulatorHub 🚀",
  },
  {
    keywords: ["satellite", "satellites", "orbit"],
    answer:
      "Satellites are machines that orbit Earth! They help with TV, weather, GPS, and phones. Orbit = the path they take around Earth. Some are close (LEO, like the ISS), some far (GEO, like weather satellites). Try the Simulator to see different orbits! Do you want a space mission challenge?",
  },
  {
    keywords: ["speed", "how fast", "satellite speed", "orbit speed"],
    answer:
      "Satellites move super fast! In LEO they go about 7–8 km per second. The higher the orbit, the slower they go — in GEO it's about 3 km/s. In the Simulator you can see the speed and period for each orbit. Do you want a space mission challenge?",
  },
  {
    keywords: ["period", "orbit period", "how long", "90 minutes"],
    answer:
      "Orbit period is how long it takes to go around Earth once. LEO (like ISS) ≈ 90 minutes. MEO (GPS) ≈ 12 hours. GEO (weather/TV) ≈ 24 hours. The Simulator shows 'Time for one lap' for each satellite. Do you want a space mission challenge?",
  },
  // —— General space (keep for variety) ——
  {
    keywords: ["what is space", "what is iss", "international space station", "iss"],
    answer:
      "The ISS is a big space house where astronauts live and work! Many countries built it together. It's in LEO — it goes around Earth every 90 minutes, about 400 km high. Astronauts float inside and see 16 sunrises every day! Do you want a space mission challenge?",
  },
  {
    keywords: ["gravity", "why we don't float", "why do we fall", "why things fall"],
    answer:
      "Earth pulls everything toward it — that's gravity! When you drop an apple, Earth pulls it down. In space there's almost no pull, so astronauts float. Orbits work because gravity pulls the satellite while its speed keeps it going around. Do you want a space mission challenge?",
  },
  {
    keywords: ["rocket", "how rocket", "how do rockets fly", "thrust"],
    answer:
      "Rockets push fire and gas DOWN; Earth pushes the rocket UP! That push is thrust. Thrust > Gravity = rocket goes up. Satellites get to orbit on rockets — then they stay in orbit using orbital mechanics! Do you want a space mission challenge?",
  },
  {
    keywords: ["moon", "why moon", "moon follows", "moon round"],
    answer:
      "The Moon goes around Earth in an orbit — like a satellite! Gravity keeps it there. It's round because gravity pulls it into a ball. It doesn't make its own light; it reflects the Sun's light. Do you want a space mission challenge?",
  },
  {
    keywords: ["planet", "planets", "solar system", "eight planets", "sun"],
    answer:
      "Our solar system has the Sun in the middle and 8 planets going around it! The Sun gives us light and energy. Earth is our home. Planets orbit the Sun the same way satellites orbit Earth — orbital mechanics! Do you want a space mission challenge?",
  },
  {
    keywords: ["astronaut", "astronauts", "space suit", "spacewalk"],
    answer:
      "Astronauts are people who go to space! They wear special suits and float because there's almost no gravity. They live on the ISS (in LEO), do science, and sometimes go outside for a spacewalk. Do you want a space mission challenge?",
  },
  {
    keywords: ["mars", "rover", "robot mars"],
    answer:
      "Space agencies send robots called rovers to Mars! They take pictures and send data back. The rover is like a smart car: if it sees a rock it turns, if safe it goes forward. Scientists use math and computers to plan their paths. Do you want a space mission challenge?",
  },
  {
    keywords: ["nasa", "what does nasa do"],
    answer:
      "Space agencies send rockets, satellites, and robots to space. They study the Moon, Mars, and stars. Orbital mechanics is used to plan every satellite and mission. Do you want a space mission challenge?",
    references: [
      {
        title: "About space agencies",
        url: "https://www.nasa.gov/about/index.html",
        source: "Space agency reference"
      }
    ],
  },
  {
    keywords: ["hello", "hi", "hey", "how are you"],
    answer:
      "Hello. I'm AstroBot from Orbital Simulator Hub (orbitalsimulatorhub.com). I can help with orbits, LEO, MEO, GEO, satellites, space missions, Newton's laws, quantum physics, astrophysics, or the ISS. What would you like to explore?",
  },
  // Space mission topics
  {
    keywords: ["nasa missions", "nasa projects", "nasa programs", "what nasa does"],
    answer:
      "Space agencies conduct amazing missions! They send rovers to Mars (Curiosity, Perseverance), telescopes to space (James Webb, Hubble), astronauts to the ISS, and probes to planets. Orbital mechanics is used for every mission. Learn more at /learn/aerospace#nasa",
  },
  {
    keywords: ["james webb", "jwst", "webb telescope", "space telescope"],
    answer:
      "The James Webb Space Telescope (JWST) is the most powerful space telescope! It's at the Sun-Earth L2 point, 1.5 million km away. It sees the oldest light in the universe and studies exoplanets. Learn more at /learn/aerospace",
  },
  {
    keywords: ["mars rover", "curiosity", "perseverance", "mars exploration"],
    answer:
      "Mars rovers are amazing robots! Curiosity and Perseverance explore Mars, collect samples, and send data back. They use orbital mechanics to get to Mars and land safely. Learn more at /learn/aerospace#rovers",
  },
  {
    keywords: ["apollo", "moon landing", "apollo mission", "moon mission"],
    answer:
      "Apollo missions landed humans on the Moon! Apollo 11 was the first in 1969. Newton's laws and orbital mechanics were used to get there and back. Learn more at /learn/aerospace#nasa",
  },
  {
    keywords: ["starlink", "spacex starlink", "internet satellites"],
    answer:
      "Starlink is SpaceX's satellite internet constellation! Thousands of satellites in Low Earth Orbit provide global internet. They orbit at ~550 km altitude. Learn more at /satellites",
  },
  // Newton Topics
  {
    keywords: ["newton first law", "inertia", "law of inertia"],
    answer:
      "Newton's First Law: Objects at rest stay at rest, objects in motion stay in motion (unless acted upon). This is inertia! Satellites in orbit keep moving because of inertia. Learn more at /learn/newton",
  },
  {
    keywords: ["newton second law", "f equals ma", "force equals mass times acceleration"],
    answer:
      "Newton's Second Law: F = ma (Force = mass × acceleration). More force = more acceleration. Rockets use this: big force pushes rocket up! Learn more at /learn/newton and /formulas-library",
  },
  {
    keywords: ["newton third law", "action reaction", "equal and opposite"],
    answer:
      "Newton's Third Law: For every action, there's an equal and opposite reaction. Rockets push gas down → gas pushes rocket up! Learn more at /learn/newton",
  },
  {
    keywords: ["universal gravitation", "law of gravity", "newton gravity"],
    answer:
      "Newton's Law of Universal Gravitation: F = G(m1×m2)/r². Everything attracts everything else! Earth pulls satellites, keeping them in orbit. Learn more at /formulas-library",
  },
  {
    keywords: ["newton laws", "newton's laws", "three laws"],
    answer:
      "Newton's three laws explain motion! 1st: Inertia (things keep moving). 2nd: F=ma (force causes acceleration). 3rd: Action-reaction (rockets work!). These laws make orbits possible! Learn more at /learn/newton",
  },
  // Quantum Physics Topics
  {
    keywords: ["quantum", "quantum mechanics", "quantum physics", "what is quantum"],
    answer:
      "Quantum physics studies tiny particles (atoms, electrons)! It explains how particles behave differently than big objects. Quantum mechanics helps with space technology like atomic clocks in GPS satellites. Learn more at /research",
  },
  {
    keywords: ["quantum entanglement", "entanglement", "spooky action"],
    answer:
      "Quantum entanglement is when particles are connected even far apart! Changing one instantly affects the other. Scientists are exploring this for space communication. Learn more at /research",
  },
  {
    keywords: ["quantum computing", "quantum computer", "quantum processor"],
    answer:
      "Quantum computers use quantum mechanics to solve problems faster! Space agencies research quantum computing for space missions and complex calculations. Learn more at /research",
  },
  // Astrophysics Topics
  {
    keywords: ["black hole", "blackhole", "event horizon", "singularity"],
    answer:
      "Black holes are regions where gravity is so strong nothing escapes, not even light! They have an event horizon boundary. Scientists study them with telescopes. Learn more at /research",
  },
  {
    keywords: ["star formation", "how stars form", "stellar formation", "protostar"],
    answer:
      "Stars form from gas clouds in space! Gravity pulls gas together, it heats up, and nuclear fusion starts. Our Sun formed this way 4.6 billion years ago! Learn more at /research",
  },
  {
    keywords: ["dark matter", "dark energy", "dark matter dark energy"],
    answer:
      "Dark matter and dark energy are mysterious! Dark matter holds galaxies together. Dark energy makes the universe expand faster. Scientists are still studying them! Learn more at /research",
  },
  {
    keywords: ["exoplanet", "exoplanets", "planets outside solar system"],
    answer:
      "Exoplanets are planets orbiting other stars! Scientists have found thousands. Some might have life! The James Webb Telescope studies exoplanet atmospheres. Learn more at /research",
  },
  {
    keywords: ["big bang", "big bang theory", "universe origin"],
    answer:
      "The Big Bang theory says the universe started from a tiny point 13.8 billion years ago! It expanded and cooled, forming stars, galaxies, and planets. Learn more at /research",
  },
  // Orbital Mechanics Advanced Topics
  {
    keywords: ["kepler", "kepler's laws", "kepler laws", "planetary motion"],
    answer:
      "Kepler's three laws describe planetary motion! 1st: Orbits are ellipses. 2nd: Planets sweep equal areas in equal times. 3rd: Period² ∝ distance³. These apply to satellites too! Learn more at /formulas-library",
  },
  {
    keywords: ["escape velocity", "escape speed", "how to leave earth"],
    answer:
      "Escape velocity is the speed needed to leave Earth's gravity! It's about 11.2 km/s. Rockets need this speed to go to the Moon or Mars. Formula: v = √(2GM/r). Learn more at /formulas-library",
  },
  {
    keywords: ["hohmann transfer", "orbit transfer", "changing orbits"],
    answer:
      "Hohmann transfer is the most efficient way to change orbits! It uses two engine burns to move from one orbit to another. Space agencies use this for interplanetary missions! Learn more at /simulator",
  },
  {
    keywords: ["lagrange points", "l1 l2 l3", "l4 l5", "gravitational balance"],
    answer:
      "Lagrange points are special spots where gravity balances perfectly! L1, L2, L3, L4, L5. The James Webb Telescope is at L2! Satellites can stay there with little fuel. Learn more at /learn/aerospace",
  },
  {
    keywords: ["perigee", "apogee", "closest farthest", "orbit height"],
    answer:
      "Perigee is the closest point to Earth in an orbit. Apogee is the farthest point! Elliptical orbits have different heights. The Simulator shows perigee and apogee for each satellite! Learn more at /simulator",
  },
  // Website-Specific Topics
  {
    keywords: ["formulas", "equations", "formula library", "space formulas"],
    answer:
      "Our Formulas Library has all space physics formulas! Gravity, orbital velocity, escape velocity, Kepler's laws, rocket equation. Each has explanations and calculators! Visit /formulas-library",
  },
  {
    keywords: ["calculators", "orbit calculator", "gravity calculator"],
    answer:
      "We have interactive calculators! Orbit calculator (altitude → speed, period), gravity calculator (mass, distance → force), escape velocity calculator. Try them at /calculators",
  },
  {
    keywords: ["blog", "space blog", "nasa news", "space facts"],
    answer:
      "Our Space Blog has daily space news, space facts, satellite tutorials, and astronomy lessons! Fresh content every day. Check it out at /blog",
  },
  {
    keywords: ["research", "phd", "aerospace research", "advanced"],
    answer:
      "For advanced aerospace study, we have mission data, algorithms, formulas, and calculations. Visit /research and /learn/aerospace",
  },
];

function normalize(q: string): string {
  return q
    .toLowerCase()
    .replace(/[?!.,]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Get an answer from the local knowledge base (works without API). */
export function getAstroBotReplyLocal(question: string): { answer: string; references?: Array<{ title: string; url: string; source: string }> } | null {
  const n = normalize(question);
  if (!n) return null;
  for (const entry of ASTROBOT_KNOWLEDGE) {
    if (entry.keywords.some((k) => n.includes(k))) {
      return { answer: entry.answer, references: entry.references };
    }
  }
  return null;
}

export const ASTROBOT_FALLBACK =
  "I can help with orbits, LEO, MEO, GEO, the simulator, satellites, space missions, or the ISS. Try the [simulator](/simulator) to see orbits in 3D, or the [formulas library](/formulas-library) for the math behind gravity and orbital velocity. Continue exploring with AstroBot on OrbitalSimulatorHub 🚀";
