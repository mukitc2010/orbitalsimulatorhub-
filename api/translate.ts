/**
 * POST /api/translate — Translate UI text to requested locale
 * Uses OpenAI or fallback to English. Caches in-memory to reduce cost.
 */

import type { VercelRequest, VercelResponse } from "@vercel/node";

const cache = new Map<string, { text: string; ts: number }>();
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

function cacheKey(text: string, locale: string): string {
  return `${locale}:${text}`;
}

function getCached(text: string, locale: string): string | null {
  const key = cacheKey(text, locale);
  const entry = cache.get(key);
  if (!entry) return null;
  if (Date.now() - entry.ts > CACHE_TTL_MS) {
    cache.delete(key);
    return null;
  }
  return entry.text;
}

function setCache(text: string, locale: string, translated: string): void {
  cache.set(cacheKey(text, locale), { text: translated, ts: Date.now() });
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const body = req.body as { text?: string; locale?: string };
  const text = typeof body?.text === "string" ? body.text.trim() : "";
  const locale = typeof body?.locale === "string" ? body.locale.toLowerCase().slice(0, 5) : "en";

  if (!text) return res.status(400).json({ error: "text is required" });
  if (locale === "en") return res.status(200).json({ translated: text });

  const cached = getCached(text, locale);
  if (cached) return res.status(200).json({ translated: cached });

  const key = process.env.OPENAI_API_KEY;
  if (!key || key.length < 10) {
    return res.status(200).json({ translated: text });
  }

  try {
    const res2 = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `Translate the following UI text to ${locale}. Return ONLY the translation, no explanation. Keep technical terms (e.g. LEO, MEO, GEO, NASA) unchanged.`,
          },
          { role: "user", content: text },
        ],
        max_tokens: 200,
        temperature: 0.3,
      }),
    });

    if (!res2.ok) {
      return res.status(200).json({ translated: text });
    }

    const data = (await res2.json()) as { choices?: Array<{ message?: { content?: string } }> };
    const translated = data.choices?.[0]?.message?.content?.trim();
    if (translated) {
      setCache(text, locale, translated);
      return res.status(200).json({ translated });
    }
  } catch {
    // fallback to original
  }

  return res.status(200).json({ translated: text });
}
