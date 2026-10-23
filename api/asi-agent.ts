import { planOracleMission } from "../lib/astrobot/oracleAgent";
/**
 * ORACLE — ASI Mission Control agent for Orbital Simulator Hub.
 *
 * A Claude-powered agent with real tools: it runs live orbital-mechanics
 * calculations, plans satellite deployments that execute in the 3D simulator,
 * and answers from the site's knowledge base.
 *
 * Setup: add ANTHROPIC_API_KEY in Vercel Environment Variables.
 * (Coexists with api/chat.ts, which powers the older OpenAI chat widget.)
 */

import type { VercelRequest, VercelResponse } from "@vercel/node";
import Anthropic from "@anthropic-ai/sdk";

export const maxDuration = 60;

// ─── Orbital mechanics (mirrors client/src/orbitalUtils.ts) ──────────────────

const MU = 398600.4418; // km³/s²
const EARTH_RADIUS_KM = 6371;

function orbitalCalculator(input: { altitude_km?: number; semi_major_axis_km?: number }) {
  const a =
    typeof input.semi_major_axis_km === "number" && input.semi_major_axis_km > 0
      ? input.semi_major_axis_km
      : EARTH_RADIUS_KM + Math.max(0, Number(input.altitude_km) || 0);
  const altitudeKm = a - EARTH_RADIUS_KM;
  const speedKmS = Math.sqrt(MU / a);
  const periodMin = (2 * Math.PI * Math.sqrt((a * a * a) / MU)) / 60;
  const escapeKmS = Math.sqrt((2 * MU) / a);
  let comparison = "Custom orbit";
  if (altitudeKm >= 300 && altitudeKm <= 600) comparison = "Like the ISS (Low Earth Orbit)";
  else if (altitudeKm >= 19000 && altitudeKm <= 22000) comparison = "Like GPS satellites (Medium Earth Orbit)";
  else if (altitudeKm >= 35000 && altitudeKm <= 36000) comparison = "Like weather & TV satellites (Geostationary)";
  return {
    altitude_km: Math.round(altitudeKm),
    semi_major_axis_km: Math.round(a),
    orbital_speed_km_s: Number(speedKmS.toFixed(3)),
    orbital_period_minutes: Number(periodMin.toFixed(1)),
    escape_velocity_km_s: Number(escapeKmS.toFixed(3)),
    comparison,
  };
}

// ─── Site knowledge (compact facts the agent can search) ─────────────────────

const KNOWLEDGE: Array<{ topic: string; fact: string }> = [
  { topic: "simulator", fact: "The 3D simulator at /simulator lets users add LEO/MEO/GEO satellites (or custom orbits by altitude, eccentricity, inclination), press Play, and watch real Kepler-propagated motion with live height/speed/period info." },
  { topic: "LEO", fact: "Low Earth Orbit: 200–2,000 km. ISS at ~400 km travels 7.66 km/s, one orbit ≈ 92 minutes, 16 sunrises per day." },
  { topic: "MEO GPS", fact: "Medium Earth Orbit: GPS constellation at 20,200 km, ~12 h period, 31 operational satellites, at least 4 needed in view for a position fix; clocks corrected +38 μs/day for relativity." },
  { topic: "GEO", fact: "Geostationary orbit: 35,786 km above the equator, period 23 h 56 m matches Earth's rotation, so satellites appear fixed — used by TV and weather satellites. Retired GEO satellites move to a graveyard orbit ~300 km higher." },
  { topic: "escape velocity", fact: "Earth escape velocity is 11.2 km/s at the surface — √2 times circular orbital speed at any altitude. From LEO, only ~3.2 km/s more is needed to leave Earth." },
  { topic: "Kepler", fact: "Kepler's laws: (1) orbits are ellipses with Earth at a focus, (2) equal areas in equal times (satellites speed up near perigee), (3) T² ∝ a³ — period depends only on orbit size." },
  { topic: "Newton", fact: "Newton's laws: inertia keeps a satellite moving; gravity (F=ma) bends its path into an orbit; rockets work by action-reaction, throwing exhaust backward." },
  { topic: "ISS", fact: "The ISS masses ~420 t, generates ~100 kW of solar power, recycles >90% of its water, loses ~2 km altitude per month to drag, and gets periodic reboosts from cargo ships." },
  { topic: "rockets", fact: "Rockets are ~90% propellant (Tsiolkovsky equation). Falcon 9 boosters land propulsively and refly 20+ times. Saturn V's first stage burned 15 t of propellant per second." },
  { topic: "Webb telescope", fact: "JWST: 6.5 m gold-coated mirror (18 hexagons), parked at L2 1.5M km away, cooled passively to −233 °C behind a 5-layer sunshield, sees infrared light from the first galaxies." },
  { topic: "Mars", fact: "Mars: 24.6 h day, ~1% of Earth's air pressure (96% CO₂), Olympus Mons 21.9 km tall. Rovers land via the sky-crane maneuver after 'seven minutes of terror'; radio delay is 5–20 minutes." },
  { topic: "reentry", fact: "Reentry heat comes from air compression (not friction). Blunt shapes push the shockwave ahead of the hull; ablative shields (PICA) char away on purpose; plasma causes a radio blackout." },
  { topic: "site pages", fact: "Key pages: /simulator (3D orbits), /learn/newton, /learn/formulas, /astrobot (study chatbot), /calculators, /space-quiz, /research (Space AGI research hub), and the mobile app in the repo's mobile/ folder." },
  { topic: "space agi", fact: "The Research hub (/research) hosts the Space AGI doctrine, roadmap, mathematics, and the AGI/ASI framework pages exploring autonomous intelligence for space missions." },
];

function searchKnowledge(query: string) {
  const words = query.toLowerCase().split(/\W+/).filter((w) => w.length > 2);
  const scored = KNOWLEDGE.map((entry) => {
    const text = (entry.topic + " " + entry.fact).toLowerCase();
    const score = words.reduce((n, w) => n + (text.includes(w) ? 1 : 0), 0);
    return { entry, score };
  })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 4);
  return scored.length > 0
    ? scored.map((s) => s.entry.fact)
    : ["No specific match — answer from general knowledge, accurately."];
}

// ─── Agent definition ────────────────────────────────────────────────────────

const SYSTEM_PROMPT = `You are ORACLE (Orbital Reasoning And Control Engine), the ASI-class Mission Control agent of Orbital Simulator Hub (orbitalsimulatorhub.com), a space-education platform with a real 3D orbital simulator.

Persona: a calm, hyper-competent mission-control intelligence. Address the user as "Commander" occasionally. Be precise, warm, and genuinely educational — never robotic filler. Keep responses focused and concise; use short paragraphs, not walls of text.

You have real capabilities, not just chat:
- orbital_calculator runs the site's actual physics (μ = 398600.4418 km³/s²). Use it for ANY numeric orbit question instead of computing in your head.
- deploy_satellite and set_simulation queue real actions: the UI shows the user an "Execute in Simulator" control that opens the 3D simulator with those satellites deployed and the simulation running. When a user asks to see, compare, or demo orbits, USE these tools, then tell them to press the execute control.
- search_site_knowledge retrieves facts about this site and its content — prefer it before answering questions about the site itself.

Honesty rules: you are an advanced AI agent, not a literal superintelligence — if asked, be truthful about that with good humor. Never invent site features. If a calculation input is nonsensical (negative altitude, sub-surface orbit), say why instead of computing garbage.`;

const TOOLS: Anthropic.Beta.BetaTool[] = [
  {
    name: "orbital_calculator",
    description:
      "Compute real orbital mechanics for a circular Earth orbit: orbital speed, period, escape velocity, and a real-world comparison. Call this for any numeric orbit question. Provide altitude_km (above Earth's surface) OR semi_major_axis_km (from Earth's center).",
    input_schema: {
      type: "object",
      properties: {
        altitude_km: { type: "number", description: "Altitude above Earth's surface in km" },
        semi_major_axis_km: { type: "number", description: "Semi-major axis from Earth's center in km" },
      },
    },
  },
  {
    name: "deploy_satellite",
    description:
      "Queue satellite deployments that the user can execute in the real 3D simulator. Call once per orbit type needed. Use when the user wants to see, demo, or compare orbits.",
    input_schema: {
      type: "object",
      properties: {
        preset: { type: "string", enum: ["LEO", "MEO", "GEO"], description: "Orbit preset to deploy" },
        count: { type: "integer", description: "How many satellites of this preset (default 1, max 5)" },
      },
      required: ["preset"],
    },
  },
  {
    name: "set_simulation",
    description: "Queue simulator playback settings alongside deployments: start playing and/or set time-warp speed.",
    input_schema: {
      type: "object",
      properties: {
        play: { type: "boolean", description: "Start the simulation playing" },
        speed: { type: "integer", enum: [1, 2, 4, 8], description: "Time-warp multiplier (simulator supports 1×–8×)" },
      },
    },
  },
  {
    name: "search_site_knowledge",
    description: "Search Orbital Simulator Hub's knowledge base for facts about orbits, missions, spacecraft, and the site's own pages/features.",
    input_schema: {
      type: "object",
      properties: {
        query: { type: "string", description: "What to look up" },
      },
      required: ["query"],
    },
  },
];

export type AgentAction =
  | { type: "deploy"; preset: "LEO" | "MEO" | "GEO"; count: number }
  | { type: "simulate"; play?: boolean; speed?: number };

// ─── Handler ─────────────────────────────────────────────────────────────────

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const body = req.body as { message?: string; history?: Array<{ role: string; content: string }> };
  const message = typeof body?.message === "string" ? body.message.trim() : "";
  if (!message) return res.status(400).json({ error: "Message is required" });
  const plan = planOracleMission(message);
  if (plan) {
    const custom = plan.actions.some(a => a.type === "SIM_ADD_SATELLITE" && String(a.payload.name).startsWith("Satellite "));
    const actions = custom ? [] : plan.actions.map(action => action.type === "SIM_SET_PLAYBACK"
      ? { type: "simulate", play: action.payload.playing, speed: action.payload.speed }
      : { type: "deploy", preset: String(action.payload.name).includes("GEO") ? "GEO" : String(action.payload.name).includes("GPS") ? "MEO" : "LEO", count: 1 });
    return res.status(200).json({ reply: custom ? "Use /simulator/mission-control to request a custom altitude. No preset was substituted." : plan.reply,
      actions, toolTrace: [{ tool: "oracle-loop-engineer", summary: "Plan, calculate, validate; simulator actions require client application." }] });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey || apiKey.length < 10) {
    return res.status(500).json({
      error: "ORACLE is not configured. Add ANTHROPIC_API_KEY in Vercel Environment Variables.",
    });
  }



  const history = (Array.isArray(body?.history) ? body.history : [])
    .filter((m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string" && m.content.trim())
    .slice(-12)
    .map((m) => ({ role: m.role as "user" | "assistant", content: String(m.content).slice(0, 4000) }));

  const client = new Anthropic({ apiKey });

  const messages: Anthropic.Beta.BetaMessageParam[] = [
    ...history,
    { role: "user", content: message.slice(0, 4000) },
  ];

  const actions: AgentAction[] = [];
  const toolTrace: Array<{ tool: string; summary: string }> = [];

  try {
    for (let turn = 0; turn < 6; turn++) {
      const params = {
        model: "claude-opus-5",
        max_tokens: 4000,
        system: [{ type: "text" as const, text: SYSTEM_PROMPT, cache_control: { type: "ephemeral" as const } }],
        output_config: { effort: "medium" },
        tools: TOOLS,
        messages,
        // Safety classifiers can decline; re-serve declined requests automatically.
        betas: ["server-side-fallback-2026-07-01"],
        fallbacks: "default",
      };
      const response: Anthropic.Beta.BetaMessage = await client.beta.messages.create(
        params as unknown as Anthropic.Beta.MessageCreateParamsNonStreaming
      );

      if (response.stop_reason === "refusal") {
        return res.status(200).json({
          reply:
            "Mission Control here, Commander — I can't help with that particular request. Ask me anything about orbits, spacecraft, or the simulator instead.",
          actions: [],
          toolTrace,
        });
      }

      if (response.stop_reason !== "tool_use") {
        const reply = response.content
          .filter((b): b is Anthropic.Beta.BetaTextBlock => b.type === "text")
          .map((b) => b.text)
          .join("\n")
          .trim();
        return res.status(200).json({
          reply: reply || "Signal received but no telemetry to report. Try rephrasing, Commander.",
          actions,
          toolTrace,
        });
      }

      // Execute every requested tool, return all results in one user message
      messages.push({ role: "assistant", content: response.content });
      const results: Anthropic.Beta.BetaToolResultBlockParam[] = [];
      for (const block of response.content) {
        if (block.type !== "tool_use") continue;
        const input = (block.input ?? {}) as Record<string, unknown>;
        let result = "";
        try {
          if (block.name === "orbital_calculator") {
            const calc = orbitalCalculator(input as { altitude_km?: number; semi_major_axis_km?: number });
            toolTrace.push({ tool: "orbital_calculator", summary: `${calc.altitude_km} km → ${calc.orbital_speed_km_s} km/s, T=${calc.orbital_period_minutes} min` });
            result = JSON.stringify(calc);
          } else if (block.name === "deploy_satellite") {
            const preset = input.preset === "MEO" || input.preset === "GEO" ? input.preset : "LEO";
            const count = Math.min(5, Math.max(1, Number(input.count) || 1));
            actions.push({ type: "deploy", preset, count });
            toolTrace.push({ tool: "deploy_satellite", summary: `${count}× ${preset} queued` });
            result = `Queued ${count} ${preset} satellite(s). The user will see an "Execute in Simulator" control — tell them to press it.`;
          } else if (block.name === "set_simulation") {
            const play = input.play !== false;
            const speed = [1, 2, 4, 8].includes(Number(input.speed)) ? Number(input.speed) : undefined;
            actions.push({ type: "simulate", play, speed });
            toolTrace.push({ tool: "set_simulation", summary: `play=${play}${speed ? ` speed=×${speed}` : ""}` });
            result = "Simulation settings queued alongside the deployments.";
          } else if (block.name === "search_site_knowledge") {
            const facts = searchKnowledge(String(input.query ?? ""));
            toolTrace.push({ tool: "search_site_knowledge", summary: String(input.query ?? "").slice(0, 60) });
            result = facts.join("\n");
          } else {
            result = `Unknown tool: ${block.name}`;
          }
        } catch (err) {
          results.push({ type: "tool_result", tool_use_id: block.id, content: `Tool error: ${String(err)}`, is_error: true });
          continue;
        }
        results.push({ type: "tool_result", tool_use_id: block.id, content: result });
      }
      messages.push({ role: "user", content: results });
    }

    return res.status(200).json({
      reply: "That mission plan ran long, Commander — here's what I completed so far. Ask me to continue.",
      actions,
      toolTrace,
    });
  } catch (err: unknown) {
    console.error("ORACLE agent error:", err);
    if (err instanceof Anthropic.RateLimitError) {
      return res.status(429).json({ error: "Mission Control is at capacity — try again in a moment." });
    }
    if (err instanceof Anthropic.AuthenticationError) {
      return res.status(500).json({ error: "ORACLE is misconfigured (invalid ANTHROPIC_API_KEY)." });
    }
    return res.status(500).json({ error: "Telemetry lost — something went wrong. Please try again." });
  }
}
