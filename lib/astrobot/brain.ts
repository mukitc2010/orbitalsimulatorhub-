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
import { reasonAboutSpace } from "./reasoner";

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
  provider: "xai" | "openai" | "ollama",
  apiKey: string,
): Promise<string> {
  const isChatCompletions = provider === "openai" || provider === "xai";
  const response = await fetch(
    provider === "xai"
      ? "https://api.x.ai/v1/chat/completions"
      : provider === "openai"
        ? "https://api.openai.com/v1/chat/completions"
        : `${(process.env.OLLAMA_URL || "http://localhost:11434").replace(/\/$/, "")}/api/chat`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(isChatCompletions ? { Authorization: `Bearer ${apiKey}` } : {}),
      },
      body: JSON.stringify(isChatCompletions
        ? {
            model: provider === "xai" ? (process.env.XAI_MODEL || "grok-4.7") : "gpt-4o-mini",
            messages,
            max_tokens: maxTokens,
            temperature: 0.4,
          }
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
  const text = isChatCompletions ? data.choices?.[0]?.message?.content : data.message?.content;
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

  const xaiKey = process.env.XAI_API_KEY || "";
  const openaiKey = process.env.OPENAI_API_KEY || "";
  const configuredProvider = process.env.ASTROBOT_PROVIDER;
  const provider = configuredProvider === "fallback" || configuredProvider === "local"
    ? "local"
    : configuredProvider === "ollama"
      ? "ollama"
      : configuredProvider === "openai" || (!xaiKey && openaiKey.length >= 10)
        ? "openai"
        : xaiKey.length >= 10
          ? "xai"
          : "local";
  const apiKey = provider === "xai" ? xaiKey : openaiKey;

  if (provider === "xai" || provider === "openai" || provider === "ollama") {
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
        (chatMessages, maxTokens) => completeAstroBotMessage(chatMessages, maxTokens, provider, apiKey),
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
  _routerResult: ReturnType<typeof routeIntent>,
  toolResults: string,
  actions: SimAction[],
  _memory: UserMemory | null
): AstroBotResponse {
  const reasoned = reasonAboutSpace(message);
  if (reasoned) {
    return {
      reply: toolResults ? `${reasoned}\n\nChecked with tools:\n${toolResults}` : reasoned,
      actions,
      memoryPatch: { lastTopic: message.slice(0, 50) },
    };
  }

  if (toolResults) {
    return {
      reply: toolResults,
      actions,
      memoryPatch: { lastTopic: message.slice(0, 50) },
    };
  }

  return {
    reply: "I can calculate circular orbits, escape speed, Hohmann transfers, weight on another world, and the Apollo moonwalkers. Try: \"How fast is a circular orbit at 1,000 km?\", \"Why don't satellites fall?\", or \"Who walked on the Moon?\" Set XAI_API_KEY on the server for open-ended questions. Orbit numbers still come from the local engine.",
    actions: [],
  };
}
