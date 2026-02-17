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
import { createBlogRouter } from "../blog-api";
import { createSEORouter } from "../seo-api";
import { createDailyTopicsRouter } from "../daily-topics-api";
import { createAstroBotRouter } from "../astrobot-api";
import { createResearchContentRouter } from "../research-content-api";
import { createGitDeployRouter } from "../git-deploy-api";

const PORT = Number(process.env.PORT) || 3001;
const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

// Blog API endpoints for n8n automation
app.use("/api/blog", createBlogRouter());

// SEO API endpoints for n8n automation
app.use("/api/seo", createSEORouter());

// Daily Topics API endpoints for n8n automation
app.use("/api/daily-topics", createDailyTopicsRouter());

// AstroBot Knowledge API endpoints for n8n automation
app.use("/api/astrobot", createAstroBotRouter());

// Research Content API endpoints for n8n automation
app.use("/api/research", createResearchContentRouter());

// Git Deploy API endpoints for n8n automation
app.use("/api/git", createGitDeployRouter());

// tRPC endpoints
app.use(
  "/api/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext: ({ req, res }) => createContext({ req, res }),
  })
);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`API at http://localhost:${PORT}/api/trpc`);
  console.log(`Blog API at http://localhost:${PORT}/api/blog`);
  console.log(`SEO API at http://localhost:${PORT}/api/seo`);
  console.log(`Daily Topics API at http://localhost:${PORT}/api/daily-topics`);
  console.log(`AstroBot API at http://localhost:${PORT}/api/astrobot`);
  console.log(`Research Content API at http://localhost:${PORT}/api/research`);
  console.log(`Git Deploy API at http://localhost:${PORT}/api/git`);
});
