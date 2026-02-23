/**
 * AstroBot Router — Intent detection and tool dispatch
 */

export type Intent = "TEACH" | "CALCULATE" | "SIMULATE" | "SEARCH" | "QUIZ" | "GENERAL";

export interface RouterResult {
  intent: Intent;
  toolCalls: Array<{ tool: string; params: Record<string, unknown> }>;
  confidence: number;
}

const TEACH_KEYWORDS = ["explain", "what is", "how does", "why", "teach", "learn", "understand", "kepler", "newton", "orbit", "gravity"];
const CALCULATE_KEYWORDS = ["calculate", "compute", "what's the", "velocity", "period", "delta-v", "hohmann", "escape", "altitude", "how fast"];
const SIMULATE_KEYWORDS = ["simulator", "simulate", "add", "show", "zoom", "orbit", "leo", "geo", "gps", "transfer"];
const SEARCH_KEYWORDS = ["astronaut", "mission", "apollo", "planet", "mars", "moon", "iss", "who", "which"];
const QUIZ_KEYWORDS = ["quiz", "test", "question", "exam", "challenge"];

export function routeIntent(message: string): RouterResult {
  const lower = message.toLowerCase().trim();
  const toolCalls: RouterResult["toolCalls"] = [];
  let intent: Intent = "GENERAL";
  let confidence = 0.5;

  if (QUIZ_KEYWORDS.some((k) => lower.includes(k))) {
    intent = "QUIZ";
    confidence = 0.85;
  } else if (CALCULATE_KEYWORDS.some((k) => lower.includes(k))) {
    intent = "CALCULATE";
    confidence = 0.9;
    if (lower.includes("hohmann") || lower.includes("transfer")) {
      const match = lower.match(/(\d+)\s*(?:km)?\s*(?:to|->|and)\s*(\d+)/);
      if (match) {
        toolCalls.push({ tool: "orbitMath", params: { tool: "hohmann", r1: parseFloat(match[1]), r2: parseFloat(match[2]) } });
      } else {
        toolCalls.push({ tool: "orbitMath", params: { tool: "hohmann", r1: 6771, r2: 42164 } });
      }
    } else if (lower.includes("escape")) {
      const alt = extractAlt(lower);
      toolCalls.push({ tool: "orbitMath", params: { tool: "escape", altitude: alt } });
    } else if (lower.includes("period") || lower.includes("orbit time")) {
      const alt = extractAlt(lower);
      toolCalls.push({ tool: "orbitMath", params: { tool: "period", altitude: alt } });
    } else {
      const alt = extractAlt(lower);
      toolCalls.push({ tool: "orbitMath", params: { tool: "velocity", altitude: alt } });
    }
  } else if (SIMULATE_KEYWORDS.some((k) => lower.includes(k))) {
    intent = "SIMULATE";
    confidence = 0.8;
    const alt = extractAlt(lower);
    if (alt) toolCalls.push({ tool: "simActions", params: { action: "add", altitude: alt } });
  } else if (SEARCH_KEYWORDS.some((k) => lower.includes(k))) {
    intent = "SEARCH";
    confidence = 0.85;
    if (lower.includes("astronaut") || lower.includes("moon") || lower.includes("apollo")) {
      toolCalls.push({ tool: "astronautDB", params: { query: lower.includes("moon") ? "moon" : "facts" } });
    }
    if (lower.includes("planet") || lower.includes("mars") || lower.includes("gravity")) {
      const planet = extractPlanet(lower);
      toolCalls.push({ tool: "planetDB", params: { query: "planet", name: planet } });
    }
  } else if (TEACH_KEYWORDS.some((k) => lower.includes(k))) {
    intent = "TEACH";
    confidence = 0.8;
  }

  return { intent, toolCalls, confidence };
}

function extractAlt(text: string): number {
  const m = text.match(/(\d+(?:\.\d+)?)\s*(?:km|kilometers?)?/i);
  if (m) {
    const n = parseFloat(m[1]);
    if (n >= 200 && n <= 100000) return n;
  }
  if (text.includes("iss") || text.includes("400")) return 400;
  if (text.includes("geo") || text.includes("35786")) return 35786;
  if (text.includes("gps") || text.includes("20200")) return 20200;
  return 400;
}

function extractPlanet(text: string): string {
  const planets = ["mercury", "venus", "earth", "mars", "jupiter", "saturn", "uranus", "neptune", "moon"];
  for (const p of planets) {
    if (text.includes(p)) return p.charAt(0).toUpperCase() + p.slice(1);
  }
  return "Earth";
}
