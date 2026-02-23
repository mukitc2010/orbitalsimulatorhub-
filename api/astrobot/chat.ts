/**
 * AstroBot AGI Chat API — Vercel serverless endpoint
 * POST /api/astrobot/chat
 */

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { processAstroBot } from "../../lib/astrobot/brain";

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

  const body = req.body as {
    message?: string;
    userId?: string;
    pageContext?: string;
    history?: Array<{ role: string; content: string }>;
  };

  const message = typeof body?.message === "string" ? body.message.trim() : "";
  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const result = await processAstroBot({
      message,
      userId: body.userId || "anonymous",
      pageContext: body.pageContext,
      history: Array.isArray(body.history) ? body.history : [],
    });

    return res.status(200).json({
      reply: result.reply,
      actions: result.actions,
      memoryPatch: result.memoryPatch,
    });
  } catch (err) {
    console.error("AstroBot AGI error:", err);
    return res.status(500).json({
      error: "AstroBot encountered an error. Please try again.",
    });
  }
}
