/**
 * Shared Express app for local dev (api-only.ts) and Vercel serverless (api/[[...path]].ts).
 */
import "dotenv/config";
import express from "express";
import cors from "cors";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "./routers";
import { createContext } from "./_core/context";
import { createAstroBotRouter } from "./astrobot-api";
import { createChatRouter } from "./chat-api";
import { createQsagiRouter } from "./qsagi-api";

export function createApp() {
  const app = express();
  app.use(cors({ origin: true }));
  app.use(express.json());

  app.use("/api/astrobot", createAstroBotRouter());
  app.use("/api/chat", createChatRouter());
  app.use("/api/qsagi", createQsagiRouter());
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext: ({ req, res }) => createContext({ req, res }),
    })
  );

  app.get("/create-rule", (_req, res) => {
    res.status(404).json({
      error: "Not found",
      message: "There is no API at /create-rule. Cursor rules are created in .cursor/rules/ as .mdc files.",
    });
  });

  return app;
}
