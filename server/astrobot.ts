/**
 * AstroBot — NASA learning assistant.
 * Uses a local knowledge base so it works without an API key.
 * Set OPENAI_API_KEY to use GPT for open-ended questions.
 */

const ASTROBOT_SYSTEM_PROMPT = `You are AstroBot, a helpful NASA learning assistant.

Rules:
- Explain clearly and accurately
- Use accessible language
- Include concrete examples (missions, orbits, satellites)
- Stay on topic: NASA, space, orbital mechanics, satellites
- Be concise; add detail when asked
- Optional: end with a related follow-up or suggestion`;

/** Q&A: keywords (lowercase) -> answer. Title-related: Orbital Mechanics Satellite Simulator. */
const SPACE_KNOWLEDGE: Array<{ keywords: string[]; answer: string }> = [
  {
    keywords: ["orbital mechanics", "orbits", "how do orbits work", "what is an orbit"],
    answer:
      "Orbital mechanics is how things move in space! An orbit is the path a satellite or planet takes around another body. Earth's gravity pulls the satellite, and the satellite's speed keeps it from falling — so it goes in a circle or ellipse. Try the Simulator to add LEO, MEO, or GEO and watch them orbit! Do you want a space mission challenge?",
  },
  {
    keywords: ["leo", "low earth", "iss orbit", "400 km"],
    answer:
      "LEO means Low Earth Orbit — close to Earth, about 200–800 km high. The ISS is in LEO! Satellites in LEO go around Earth in about 90 minutes. In our Orbital Mechanics Simulator you can add a LEO satellite and see it zoom around the blue Earth. Do you want a space mission challenge?",
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
      "This is the Orbital Mechanics Satellite Simulator! You can add satellites in LEO, MEO, or GEO and watch them orbit Earth in 3D. I'm AstroBot — your space teacher. Ask me about orbits, satellites, rockets, or the ISS! Do you want a space mission challenge?",
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
  {
    keywords: ["what is space", "what is iss", "international space station", "iss"],
    answer:
      "The ISS is a big space house where astronauts live and work! 🇺🇸🇷🇺🇯🇵 Many countries built it together. It flies around Earth every 90 minutes, about 400 km high. Astronauts float inside, do science, and see 16 sunrises every day! Do you want a space mission challenge?",
  },
  {
    keywords: ["gravity", "why we don't float", "why do we fall", "why things fall"],
    answer:
      "Earth is like a big magnet that pulls everything toward it — that's gravity! 🍎 When you drop an apple, Earth pulls it down. In space there's almost no pull, so astronauts float. Big planet = strong pull; far away = weak pull. Do you want a space mission challenge?",
  },
  {
    keywords: ["rocket", "how rocket", "how do rockets fly", "thrust"],
    answer:
      "Rockets go up because they push fire and gas DOWN. When the rocket pushes down, Earth pushes the rocket UP! 🚀 That push is called thrust. Simple rule: Thrust > Gravity = rocket goes up. Fuel burns to make that thrust. Do you want a space mission challenge?",
  },
  {
    keywords: ["moon", "why moon", "moon follows", "moon round"],
    answer:
      "The Moon is like a big ball that goes around Earth. It looks like it follows us because it's so far away! 🌙 Gravity keeps it in orbit. It's round because gravity pulls it into a ball shape. The Moon doesn't make its own light — it reflects the Sun's light. Do you want a space mission challenge?",
  },
  {
    keywords: ["planet", "planets", "solar system", "eight planets", "sun"],
    answer:
      "Our solar system has the Sun in the middle and 8 planets going around it! ☀️ The Sun gives us light and energy. Earth is our home. The order is: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune. Space is like a big dark ocean and planets are like boats in it! Do you want a space mission challenge?",
  },
  {
    keywords: ["astronaut", "astronauts", "space suit", "spacewalk"],
    answer:
      "Astronauts are people who go to space! They wear special suits so they can breathe and stay safe. In space they float because there's almost no gravity. They do science, fix the ISS, and sometimes go outside for a spacewalk. 🧑‍🚀 Do you want a space mission challenge?",
  },
  {
    keywords: ["mars", "rover", "robot mars"],
    answer:
      "NASA sends robots called rovers to Mars! They take pictures, collect rocks, and send data back to Earth. 🤖 The rover is like a smart car: if it sees a rock ahead it turns, if the path is safe it goes forward, if the battery is low it sleeps. Scientists on Earth tell it where to go. Do you want a space mission challenge?",
  },
  {
    keywords: ["satellite", "satellites", "orbit"],
    answer:
      "Satellites are machines that orbit Earth! They help with TV, weather, GPS, and phones. Orbit = the path they take. Some are close (LEO, like the ISS), some far (GEO, like weather satellites). Try the Simulator to see different orbits! Do you want a space mission challenge?",
  },
  {
    keywords: ["black hole", "blackhole"],
    answer:
      "A black hole is a place in space where gravity is SO strong that even light can't escape! It's like a super deep hole. Scientists study them with telescopes. They're far away and not scary for us on Earth. 🌌 Do you want a space mission challenge?",
  },
  {
    keywords: ["eat", "food", "space food", "astronauts eat"],
    answer:
      "Astronauts eat special food in space! Some is dried and they add water. Some comes in pouches. They can't have crumbs because they float everywhere! 🍽️ They attach food to the table and eat with a fork or spoon. Yummy and fun! Do you want a space mission challenge?",
  },
  {
    keywords: ["sleep", "astronauts sleep", "sleep in space"],
    answer:
      "In space astronauts sleep in sleeping bags tied to the wall! They float, so they don't need a bed. Sometimes they sleep with their arms floating. They see 16 sunrises and sunsets every day, so they follow a schedule so their body knows when to sleep. 😴 Do you want a space mission challenge?",
  },
  {
    keywords: ["nasa", "what does nasa do"],
    answer:
      "NASA is the space agency of the USA! They send rockets, satellites, and robots to space. They study the Moon, Mars, and stars. They built the ISS and send astronauts there. NASA helps us learn about space and Earth! 🚀 Do you want a space mission challenge?",
  },
  {
    keywords: ["hello", "hi", "hey", "how are you"],
    answer:
      "Hello, future space scientist! 👋 I'm AstroBot, your NASA teacher. Ask me anything about space, rockets, the Moon, ISS, or gravity! Do you want a space mission challenge?",
  },
];

function normalizeQuestion(q: string): string {
  return q
    .toLowerCase()
    .replace(/[?!.,]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/** Find a matching answer from the knowledge base, or null. */
function getLocalAnswer(question: string): string | null {
  const normalized = normalizeQuestion(question);
  if (!normalized) return null;
  for (const { keywords, answer } of SPACE_KNOWLEDGE) {
    if (keywords.some((k) => normalized.includes(k))) return answer;
  }
  return null;
}

/** Call OpenAI if key is set; otherwise return null. */
async function askOpenAI(question: string): Promise<string | null> {
  const key = process.env.OPENAI_API_KEY;
  if (!key || key.length < 10) return null;
  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: ASTROBOT_SYSTEM_PROMPT },
          { role: "user", content: question },
        ],
        max_tokens: 300,
      }),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as { choices?: Array<{ message?: { content?: string } }> };
    const content = data.choices?.[0]?.message?.content;
    return typeof content === "string" ? content.trim() : null;
  } catch {
    return null;
  }
}

/** Get AstroBot's reply: local first, then OpenAI if configured. */
export async function askAstroBot(question: string): Promise<string> {
  const local = getLocalAnswer(question);
  if (local) return local;
  const openAI = await askOpenAI(question);
  if (openAI) return openAI;
  return (
    "That's a great question! 🤔 Try asking about: orbits, LEO, MEO, GEO, the Simulator, satellites, rockets, or the ISS. " +
    "Do you want a space mission challenge?"
  );
}
