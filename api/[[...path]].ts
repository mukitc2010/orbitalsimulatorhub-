/**
 * Vercel serverless: run full Express API for /api/* (trpc, blog, qsagi, etc.).
 * Specific routes like /api/chat are still handled by their own api/*.ts files.
 */
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createApp } from "../server/app";

let app: ReturnType<typeof createApp> | null = null;

function getApp() {
  if (!app) app = createApp();
  return app;
}

export default function handler(req: VercelRequest, res: VercelResponse) {
  return getApp()(req, res);
}
