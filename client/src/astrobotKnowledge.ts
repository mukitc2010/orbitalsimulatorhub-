/**
 * AstroBot knowledge base — works without the API so chat always responds.
 * Matches app: Orbital Simulator Hub / orbitalsimulatorhub.com (orbits, LEO, MEO, GEO, satellites).
 */

export const ASTROBOT_KNOWLEDGE: Array<{ keywords: string[]; answer: string }> = [
  // —— Title-related: orbital mechanics & simulator ——
  {
    keywords: ["orbital mechanics", "orbits", "how do orbits work", "what is an orbit"],
    answer:
      "Orbital mechanics is how things move in space! An orbit is the path a satellite or planet takes around another body. Earth's gravity pulls the satellite, and the satellite's speed keeps it from falling — so it goes in a circle or ellipse. Try the Simulator to add LEO, MEO, or GEO and watch them orbit! Do you want a space mission challenge?",
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
      "This is Orbital Simulator Hub (orbitalsimulatorhub.com)! You can add satellites in LEO, MEO, or GEO and watch them orbit Earth in 3D. I'm AstroBot — your space teacher. Ask me about orbits, satellites, rockets, or the ISS! Do you want a space mission challenge?",
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
      "NASA sends robots called rovers to Mars! They take pictures and send data back. The rover is like a smart car: if it sees a rock it turns, if safe it goes forward. Scientists use math and computers to plan their paths. Do you want a space mission challenge?",
  },
  {
    keywords: ["nasa", "what does nasa do"],
    answer:
      "NASA is the USA's space agency! They send rockets, satellites, and robots to space. They study the Moon, Mars, and stars. NASA uses orbital mechanics to plan every satellite and mission. Do you want a space mission challenge?",
  },
  {
    keywords: ["hello", "hi", "hey", "how are you"],
    answer:
      "Hello! I'm AstroBot from Orbital Simulator Hub (orbitalsimulatorhub.com). Ask me about orbits, LEO, MEO, GEO, satellites, NASA missions, or the ISS.",
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
export function getAstroBotReplyLocal(question: string): string | null {
  const n = normalize(question);
  if (!n) return null;
  for (const { keywords, answer } of ASTROBOT_KNOWLEDGE) {
    if (keywords.some((k) => n.includes(k))) return answer;
  }
  return null;
}

export const ASTROBOT_FALLBACK =
  "Try asking about: orbits, LEO, MEO, GEO, the Simulator, satellites, NASA missions, or the ISS. To understand everything better: open the Simulator to see orbits in 3D, or go to the Formulas page for the math behind gravity and orbital speed.";
