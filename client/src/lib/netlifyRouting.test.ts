import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { handler } from "../../../netlify/functions/api-not-found";

describe("Netlify API routing", () => {
  it("answers unknown API paths with JSON instead of the SPA shell", async () => {
    const response = await handler();
    expect(response.statusCode).toBe(404);
    expect(response.headers["Content-Type"]).toContain("application/json");
    expect(JSON.parse(response.body)).toEqual({ error: "Not found" });
  });

  it("matches known functions before the API fallback and the SPA rewrite", () => {
    const toml = readFileSync(new URL("../../../netlify.toml", import.meta.url), "utf8");
    const asi = toml.indexOf('from = "/api/asi-agent"');
    const astrobot = toml.indexOf('from = "/api/astrobot/chat"');
    const fallback = toml.indexOf('from = "/api/*"');
    const spa = toml.indexOf('from = "/*"');
    expect(asi).toBeGreaterThan(-1);
    expect(astrobot).toBeGreaterThan(asi);
    expect(fallback).toBeGreaterThan(astrobot);
    expect(spa).toBeGreaterThan(fallback);
    expect(toml.slice(fallback, spa)).toContain("api-not-found");
  });
});
