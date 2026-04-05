/**
 * AI Chat API — Your own platform, powered by OpenAI.
 * Add OPENAI_API_KEY in Vercel Environment Variables.
 */

import type { VercelRequest, VercelResponse } from "@vercel/node";

const SYSTEM_PROMPT = `You are a helpful AI assistant for Orbital Simulator Hub (orbitalsimulatorhub.com), a space education platform.

You help users learn about:
- Orbital mechanics, satellites, orbits (LEO, MEO, GEO)
- ISS, NASA missions, rockets, space science
- The 3D orbital simulator on the site

Be clear, accurate, and engaging. Use examples when helpful. Keep answers concise but informative. You can suggest exploring the Simulator or Calculators when relevant.`;

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const key = process.env.OPENAI_API_KEY;
  if (!key || key.length < 10) {
    return res.status(500).json({
      error: "AI chat is not configured. Add OPENAI_API_KEY in Vercel Environment Variables.",
    });
  }

  const body = req.body as { message?: string; history?: Array<{ role: string; content: string }> };
  const message = typeof body?.message === "string" ? body.message.trim() : "";
  const history = Array.isArray(body?.history) ? body.history : [];

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  const messages: Array<{ role: "system" | "user" | "assistant"; content: string }> = [
    { role: "system", content: SYSTEM_PROMPT },
    ...history
      .filter((m) => m.role && m.content && ["user", "assistant"].includes(m.role))
      .slice(-10)
      .map((m) => ({
        role: m.role as "user" | "assistant",
        content: String(m.content).slice(0, 2000),
      })),
    { role: "user", content: message.slice(0, 4000) },
  ];

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages,
        max_tokens: 600,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      return res.status(response.status).json({
        error: "AI service error",
        details: response.status === 401 ? "Invalid API key" : err.slice(0, 200),
      });
    }

    const data = (await response.json()) as {
      choices?: Array<{ message?: { content?: string } }>;
    };
    const content = data.choices?.[0]?.message?.content;
    const reply = typeof content === "string" ? content.trim() : "I couldn't generate a response. Please try again.";

    return res.status(200).json({ reply });
  } catch (err) {
    console.error("Chat API error:", err);
    return res.status(500).json({
      error: "Something went wrong. Please try again.",
    });
  }
}
