/**
 * API-only server for development. Run with Vite separately so Vite serves
 * the frontend (fixes CSS/asset 404s). Vite proxies /api to this server.
 */
import "dotenv/config";
import express from "express";
import cors from "cors";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "../routers";
import { createContext } from "./context";

const PORT = Number(process.env.PORT) || 3001;
const app = express();
app.use(cors({ origin: true }));
app.use(express.json());
app.use(
  "/api/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext: ({ req, res }) => createContext({ req, res }),
  })
);
app.listen(PORT, "0.0.0.0", () => {
  console.log(`API at http://localhost:${PORT}/api/trpc`);
});
