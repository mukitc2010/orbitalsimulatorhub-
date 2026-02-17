import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { createBlogRouter } from "../blog-api";
import { createSEORouter } from "../seo-api";
import { createDailyTopicsRouter } from "../daily-topics-api";
import { createAstroBotRouter } from "../astrobot-api";
import { createResearchContentRouter } from "../research-content-api";
import { createGitDeployRouter } from "../git-deploy-api";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isDev = process.env.NODE_ENV !== "production";
const PORT = Number(process.env.PORT) || 3000;

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

if (isDev) {
  const projectRoot = process.cwd();
  const clientRoot = path.join(projectRoot, "client");
  const { createServer: createViteServer } = await import("vite");
  const vite = await createViteServer({
    configFile: path.join(projectRoot, "vite.config.ts"),
    root: clientRoot,
    server: { middlewareMode: true },
    appType: "spa",
  });
  app.use(vite.middlewares);
} else {
  const clientDist = path.join(process.cwd(), "client/dist");
  app.use(express.static(clientDist));
  app.get("*", (_req, res) => {
    res.sendFile(path.join(clientDist, "index.html"));
  });
}

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server at http://localhost:${PORT}`);
  if (isDev) console.log("tRPC at http://localhost:" + PORT + "/api/trpc");
});
