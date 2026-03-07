/**
 * API-only server for development. Run with Vite separately so Vite serves
 * the frontend (fixes CSS/asset 404s). Vite proxies /api to this server.
 */
import { createApp } from "../app";

const PORT = Number(process.env.PORT) || 3001;
const app = createApp();

app.listen(PORT, "0.0.0.0", () => {
  console.log(`API at http://localhost:${PORT}/api/trpc`);
  console.log(`Blog API at http://localhost:${PORT}/api/blog`);
  console.log(`SEO API at http://localhost:${PORT}/api/seo`);
  console.log(`Daily Topics API at http://localhost:${PORT}/api/daily-topics`);
  console.log(`AstroBot API at http://localhost:${PORT}/api/astrobot`);
  console.log(`Research Content API at http://localhost:${PORT}/api/research`);
  console.log(`Git Deploy API at http://localhost:${PORT}/api/git`);
});
