/**
 * AstroBot Brain — AGI processor pipeline: memory → router → tools → verify → response
 */

import { routeIntent } from "./router";
import { planOracleMission } from "./oracleAgent";
import { getUserMemory, updateMemory, type UserMemory } from "./memory/memoryStore";
import { runOrbitMath } from "./tools/orbitMath";
import { runAstronautQuery } from "./tools/astronautDB";
import { runPlanetQuery } from "./tools/planetDB";
import { suggestSimActions, type SimAction } from "./tools/simActions";
import { checkAltitude, checkHohmannRadii, extractAltitude, extractHohmannRadii } from "./verify/sanityChecks";
import { SYSTEM_PROMPT } from "./prompts/system";
import { generateLoopedAstroBotReply, type AstroBotChatMessage } from "./loopEngineering";

export interface AstroBotResponse {
  reply: string;
  actions: SimAction[];
  memoryPatch?: Partial<Omit<UserMemory, "userId" | "lastUpdated">>;
}

export interface AstroBotInput {
  message: string;
  userId?: string;
  pageContext?: string;
  history?: Array<{ role: string; content: string }>;
}

async function executeTools(routerResult: ReturnType<typeof routeIntent>, message: string): Promise<{ toolResults: string; actions: SimAction[] }> {
  const toolResults: string[] = [];
  const actions: SimAction[] = [];

  for (const call of routerResult.toolCalls) {
    if (call.tool === "orbitMath") {
      const params = call.params as { tool?: string; altitude?: number; r1?: number; r2?: number };
      const result = runOrbitMath({
        tool: (params.tool as "period" | "escape" | "velocity" | "hohmann") || "velocity",
        altitude: params.altitude,
        r1: params.r1,
        r2: params.r2,
      });
      if (result) toolResults.push(`[OrbitMath] ${result.type}: ${result.value} ${result.unit}. ${result.explanation}`);
    }
    if (call.tool === "astronautDB") {
      const params = call.params as { query?: string };
      const data = runAstronautQuery((params.query as "moon" | "facts") || "facts");
      if (data.astronauts?.length) {
        toolResults.push(`[AstronautDB] Moon astronauts: ${data.astronauts.map((a) => `${a.name} (${a.mission})`).join(", ")}`);
      }
      if (data.facts?.length) {
        toolResults.push(`[AstronautDB] Fun facts: ${data.facts.slice(0, 3).join(" | ")}`);
      }
    }
    if (call.tool === "planetDB") {
      const params = call.params as { query?: string; name?: string };
      const data = runPlanetQuery((params.query as "planet" | "gravity") || "planet", params.name);
      if (data.planet) {
        toolResults.push(`[PlanetDB] ${data.planet.name}: g=${data.planet.gravity} m/s², r=${data.planet.radiusKm} km, ${data.planet.atmosphere}`);
      }
    }
    if (call.tool === "simActions") {
      const params = call.params as { action?: string; altitude?: number };
      const opts = params.altitude != null ? { altitude: params.altitude } : undefined;
      const suggested = suggestSimActions(params.action || "", opts);
      actions.push(...suggested);
    }
  }

  if (routerResult.intent === "SIMULATE" && actions.length === 0) {
    const alt = extractAltitude(message);
    if (alt) {
      actions.push(...suggestSimActions("leo", { altitude: alt }));
    }
  }

  return { toolResults: toolResults.join("\n"), actions };
}

function buildContext(memory: UserMemory | null, pageContext?: string, toolResults?: string): string {
  const parts: string[] = [];
  if (memory) {
    parts.push(`User context: skillLevel=${memory.skillLevel}, lastTopic=${memory.lastTopic || "none"}, preferredStyle=${memory.preferredStyle}`);
  }
  if (pageContext) {
    parts.push(`Page context: ${pageContext}`);
  }
  if (toolResults) {
    parts.push(`Tool results:\n${toolResults}`);
  }
  return parts.join("\n");
}

async function completeAstroBotMessage(
  messages: AstroBotChatMessage[],
  maxTokens: number,
  provider: "openai" | "ollama",
  openaiKey: string,
): Promise<string> {
  const isOpenAI = provider === "openai";
  const response = await fetch(
    isOpenAI ? "https://api.openai.com/v1/chat/completions" : `${(process.env.OLLAMA_URL || "http://localhost:11434").replace(/\/$/, "")}/api/chat`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(isOpenAI ? { Authorization: `Bearer ${openaiKey}` } : {}),
      },
      body: JSON.stringify(isOpenAI
        ? { model: "gpt-4o-mini", messages, max_tokens: maxTokens, temperature: 0.4 }
        : {
            model: process.env.OLLAMA_MODEL || "qwen2.5:7b",
            messages,
            stream: false,
            options: { num_predict: maxTokens, temperature: 0.4 },
          }),
      signal: AbortSignal.timeout(180_000),
    },
  );

  if (!response.ok) throw new Error(`${provider} returned ${response.status}`);
  const data = await response.json() as {
    choices?: Array<{ message?: { content?: string } }>;
    message?: { content?: string };
  };
  const text = isOpenAI ? data.choices?.[0]?.message?.content : data.message?.content;
  if (!text?.trim()) throw new Error(`${provider} returned an empty response`);
  return text.trim();
}

export async function processAstroBot(input: AstroBotInput): Promise<AstroBotResponse> {
  const { message, userId = "anonymous", pageContext, history = [] } = input;

  const mission = planOracleMission(message);
  if (mission) return mission;

  const memory = await getUserMemory(userId);
  const routerResult = routeIntent(message);

  let sanityMessage: string | undefined;
  if (routerResult.intent === "CALCULATE") {
    const alt = extractAltitude(message);
    if (alt != null) {
      const check = checkAltitude(alt);
      if (!check.valid) sanityMessage = check.message;
    }
    const hohmann = extractHohmannRadii(message);
    if (hohmann) {
      const check = checkHohmannRadii(hohmann.r1, hohmann.r2);
      if (!check.valid) sanityMessage = check.message;
    }
  }

  if (sanityMessage) {
    return {
      reply: `I want to make sure I give you the right answer. ${sanityMessage}\n\nCould you clarify the values you'd like me to use?`,
      actions: [],
    };
  }

  const { toolResults } = await executeTools(routerResult, message);
  // Simulator mutations are owned exclusively by the validated ORACLE mission agent.
  const actions: SimAction[] = [];
  const context = buildContext(memory, pageContext, toolResults);

  const openaiKey = process.env.OPENAI_API_KEY || "";
  const configuredProvider = process.env.ASTROBOT_PROVIDER;
  const provider = configuredProvider === "openai" || (!configuredProvider && openaiKey.length >= 10)
    ? "openai"
    : configuredProvider === "fallback"
      ? "fallback"
      : "ollama";

  if (provider !== "fallback" && (provider !== "openai" || openaiKey.length >= 10)) {
    const messages: AstroBotChatMessage[] = [
      { role: "system", content: `${SYSTEM_PROMPT}\n\n${context}` },
      ...history.slice(-6).map((m) => ({
        role: (m.role === "user" ? "user" : "assistant") as "user" | "assistant",
        content: String(m.content).slice(0, 1500),
      })),
      { role: "user", content: message.slice(0, 2000) },
    ];

    try {
      const reply = await generateLoopedAstroBotReply(
        messages,
        (chatMessages, maxTokens) => completeAstroBotMessage(chatMessages, maxTokens, provider, openaiKey),
      );
      const memoryPatch = {
        lastTopic: routerResult.intent === "TEACH" ? message.slice(0, 50) : memory?.lastTopic,
        skillLevel: memory?.skillLevel,
      };

      if (userId !== "anonymous") {
        await updateMemory(userId, memoryPatch);
      }

      return { reply, actions, memoryPatch };
    } catch (err) {
      console.error(`AstroBot ${provider} loop error:`, err);
    }
  }

  return generateFallbackResponse(message, routerResult, toolResults, actions, memory);
}

function generateFallbackResponse(
  message: string,
  routerResult: ReturnType<typeof routeIntent>,
  toolResults: string,
  actions: SimAction[],
  memory: UserMemory | null
): AstroBotResponse {
  const lower = message.toLowerCase();

  if (toolResults) {
    return {
      reply: `**AstroBot Analysis**\n\n${toolResults}\n\n${memory?.preferredStyle === "detailed" ? "Want me to explain the formulas? Try the [Calculators](/calculators) or [Space-AGI Mathematics](/research/space-agi-math)." : "Explore the [3D Simulator](/simulator) or [Calculators](/calculators) to try this yourself!"}`,
      actions,
      memoryPatch: { lastTopic: message.slice(0, 50) },
    };
  }

  if (routerResult.intent === "QUIZ") {
    return {
      reply: "**Quiz Time!**\n\n**Q1)** What is the approximate orbital velocity of the ISS?\nA) 3 km/s  B) 5 km/s  C) **7.66 km/s**  D) 11 km/s\n\n**Q2)** How many astronauts have walked on the Moon?\nA) 6  B) 10  C) **12**  D) 24\n\n*Score yourself! Want more? Ask \"Quiz me on Kepler\" or \"Apollo quiz\".*",
      actions: [],
      memoryPatch: { lastTopic: "quiz" },
    };
  }

  if (lower.includes("kepler")) {
    return {
      reply: "**Kepler's Three Laws**\n\n1. **Ellipse:** Planets orbit in ellipses with the Sun at one focus.\n2. **Equal Areas:** A line sweeps equal areas in equal time — faster when closer.\n3. **T² ∝ a³:** Period squared ∝ semi-major axis cubed.\n\nFormula: T = 2π√(a³/μ). Try the [simulator](/simulator) to see it!",
      actions: [],
    };
  }

  if (lower.includes("iss") || lower.includes("space station")) {
    return {
      reply: "**ISS:** ~408 km altitude, 7.66 km/s, 92 min period. See it in the [simulator](/simulator) at 408 km!",
      actions: [],
    };
  }

  return {
    reply: "I'm AstroBot, your space intelligence! I can teach orbital mechanics, calculate orbits, quiz you, and control the simulator. Try: *\"Calculate orbital velocity at 400 km\"* or *\"Quiz me on Kepler\"* or *\"Add a LEO satellite\"*. Add OPENAI_API_KEY for full AGI mode!",
    actions: [],
  };
}
