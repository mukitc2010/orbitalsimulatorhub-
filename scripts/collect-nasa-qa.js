/**
 * NASA Q&A Collector Script
 * Collects NASA-related Q&A from various AI platforms and sources
 * Can be run manually or via n8n automation
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// NASA Q&A Sources (these would be populated from actual API calls or web scraping)
const NASA_QA_SOURCES = [
  {
    source: "NASA.gov",
    url: "https://www.nasa.gov/",
    qa: [
      {
        question: "What does NASA do?",
        answer: "NASA conducts research, develops technology, and explores space. They send astronauts to the International Space Station, rovers to Mars, telescopes to space, and probes to planets. NASA also studies Earth's climate and helps develop new technologies.",
        references: [
          { title: "About NASA", url: "https://www.nasa.gov/about/index.html", source: "NASA.gov" }
        ]
      },
      {
        question: "How do astronauts live in space?",
        answer: "Astronauts live on the International Space Station (ISS) in Low Earth Orbit. They float because there's almost no gravity. They eat special space food, sleep in sleeping bags tied to walls, exercise daily to stay healthy, and do scientific experiments. The ISS orbits Earth every 90 minutes, so they see 16 sunrises and sunsets every day!",
        references: [
          { title: "Living in Space", url: "https://www.nasa.gov/audience/forstudents/k-4/stories/nasa-knows/what-is-the-international-space-station-k4.html", source: "NASA.gov" }
        ]
      }
    ]
  },
  {
    source: "ChatGPT",
    url: "https://chat.openai.com/",
    qa: [
      {
        question: "How does NASA plan satellite orbits?",
        answer: "NASA uses orbital mechanics and computer simulations to plan satellite orbits. They calculate the right altitude, speed, and angle to achieve the mission goals. For example, Earth observation satellites need specific orbits to cover the planet, while communication satellites use geostationary orbits to stay over one location.",
        references: [
          { title: "ChatGPT Conversation", url: "https://chat.openai.com/", source: "ChatGPT" }
        ]
      }
    ]
  },
  {
    source: "Claude",
    url: "https://claude.ai/",
    qa: [
      {
        question: "What is the James Webb Space Telescope?",
        answer: "The James Webb Space Telescope (JWST) is NASA's most powerful space telescope. It's located at the Sun-Earth L2 Lagrange point, about 1.5 million km from Earth. It observes the universe in infrared light, allowing it to see the oldest galaxies and study exoplanet atmospheres. JWST launched in December 2021 and began science operations in July 2022.",
        references: [
          { title: "JWST Overview", url: "https://www.nasa.gov/mission_pages/webb/main/index.html", source: "NASA.gov" },
          { title: "Claude Conversation", url: "https://claude.ai/", source: "Claude" }
        ]
      }
    ]
  },
  {
    source: "Perplexity AI",
    url: "https://www.perplexity.ai/",
    qa: [
      {
        question: "How do Mars rovers navigate?",
        answer: "Mars rovers like Perseverance use multiple navigation systems: cameras for visual navigation, inertial measurement units (IMU) for orientation, wheel odometry for distance tracking, and hazard avoidance cameras. They can also use orbital images from Mars orbiters to plan routes. The rovers are semi-autonomous - scientists on Earth send commands, but the rover can make decisions to avoid obstacles.",
        references: [
          { title: "Mars Rover Navigation", url: "https://mars.nasa.gov/mars2020/mission/technology/", source: "NASA Mars 2020" },
          { title: "Perplexity AI", url: "https://www.perplexity.ai/", source: "Perplexity AI" }
        ]
      }
    ]
  },
  {
    source: "NASA Q&A Archive",
    url: "https://www.nasa.gov/",
    qa: [
      {
        question: "Why do satellites stay in orbit?",
        answer: "Satellites stay in orbit because of a balance between gravity and forward motion. Earth's gravity pulls the satellite down, but the satellite's forward speed keeps it moving sideways. This creates a circular or elliptical path around Earth. If a satellite slows down too much, it falls back to Earth. If it speeds up too much, it escapes Earth's gravity.",
        references: [
          { title: "How Satellites Work", url: "https://www.nasa.gov/audience/forstudents/k-4/stories/nasa-knows/what-is-a-satellite-k4.html", source: "NASA.gov" }
        ]
      },
      {
        question: "What is the International Space Station?",
        answer: "The International Space Station (ISS) is a large spacecraft orbiting Earth at about 400 km altitude in Low Earth Orbit. It's a joint project of NASA, Roscosmos (Russia), ESA (Europe), JAXA (Japan), and CSA (Canada). Astronauts live and work on the ISS, conducting scientific experiments in microgravity. It orbits Earth every 90 minutes, traveling at about 7.66 km/s.",
        references: [
          { title: "International Space Station", url: "https://www.nasa.gov/mission_pages/station/main/index.html", source: "NASA.gov" }
        ]
      }
    ]
  }
];

/**
 * Collects Q&A from all sources and formats them for AstroBot
 */
function collectNASAQA() {
  const allQA = [];
  
  for (const source of NASA_QA_SOURCES) {
    for (const qa of source.qa) {
      // Extract keywords from question
      const keywords = extractKeywords(qa.question);
      
      allQA.push({
        keywords,
        answer: qa.answer,
        references: qa.references || [],
        category: "nasa"
      });
    }
  }
  
  return allQA;
}

/**
 * Extracts keywords from a question
 */
function extractKeywords(question) {
  const stopWords = new Set(["what", "is", "are", "the", "a", "an", "how", "do", "does", "why", "when", "where", "who", "which"]);
  const words = question.toLowerCase()
    .replace(/[?!.,]/g, "")
    .split(/\s+/)
    .filter(word => word.length > 2 && !stopWords.has(word));
  
  // Add the full question as a keyword too
  return [question.toLowerCase(), ...words];
}

/**
 * Main function to collect and save Q&A
 */
async function main() {
  console.log("🔍 Collecting NASA Q&A from various sources...");
  
  const qaData = collectNASAQA();
  
  console.log(`✅ Collected ${qaData.length} Q&A entries`);
  
  // Save to JSON file for n8n to use
  const outputPath = path.join(__dirname, "../data/nasa-qa-collection.json");
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(qaData, null, 2));
  
  console.log(`💾 Saved to: ${outputPath}`);
  console.log("\n📋 Sample entries:");
  qaData.slice(0, 3).forEach((qa, i) => {
    console.log(`\n${i + 1}. Keywords: ${qa.keywords.slice(0, 3).join(", ")}...`);
    console.log(`   Answer: ${qa.answer.substring(0, 80)}...`);
    console.log(`   References: ${qa.references.length}`);
  });
  
  return qaData;
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export { collectNASAQA, extractKeywords };
