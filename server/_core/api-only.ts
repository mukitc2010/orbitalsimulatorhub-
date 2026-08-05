/**
 * API-only server for development. Run with Vite separately so Vite serves
 * the frontend (fixes CSS/asset 404s). Vite proxies /api to this server.
 */
import { createApp } from "../app";

const PORT = Number(process.env.PORT) || 3001;
const app = createApp();

app.listen(PORT, "0.0.0.0", () => {
  console.log(`API at http://localhost:${PORT}/api/trpc`);
  console.log(`AstroBot API at http://localhost:${PORT}/api/astrobot`);
});
