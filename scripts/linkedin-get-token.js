#!/usr/bin/env node
/**
 * One-time script to get LinkedIn access token.
 * Run: node scripts/linkedin-get-token.js
 *
 * Prerequisites:
 * 1. Create app at https://www.linkedin.com/developers/apps
 * 2. Add http://localhost:3999/callback to Auth → Redirect URLs
 * 3. Request "Share on LinkedIn" product, get w_member_social scope
 * 4. Set LINKEDIN_CLIENT_ID and LINKEDIN_CLIENT_SECRET in .env
 */

import { createServer } from "http";
import { config } from "dotenv";

config({ path: ".env" });

const CLIENT_ID = process.env.LINKEDIN_CLIENT_ID;
const CLIENT_SECRET = process.env.LINKEDIN_CLIENT_SECRET;
const REDIRECT_URI = "http://localhost:3999/callback";
const PORT = 3999;

if (!CLIENT_ID || !CLIENT_SECRET) {
  console.error("Set LINKEDIN_CLIENT_ID and LINKEDIN_CLIENT_SECRET in .env");
  console.error("Get them from https://www.linkedin.com/developers/apps → your app → Auth");
  process.exit(1);
}

const authUrl = `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=w_member_social%20r_liteprofile`;

const server = createServer(async (req, res) => {
  const url = new URL(req.url, `http://localhost:${PORT}`);
  if (url.pathname === "/callback") {
    const code = url.searchParams.get("code");
    if (!code) {
      res.writeHead(200, { "Content-Type": "text/html" });
      res.end("<h1>No code received. Try again.</h1>");
      server.close();
      return;
    }

    try {
      const tokenRes = await fetch("https://www.linkedin.com/oauth/v2/accessToken", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          grant_type: "authorization_code",
          code,
          redirect_uri: REDIRECT_URI,
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
        }),
      });
      const data = await tokenRes.json();
      if (data.access_token) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(`
          <h1>Success!</h1>
          <p>Add to your .env:</p>
          <pre>LINKEDIN_ACCESS_TOKEN=${data.access_token}</pre>
          <p>Token expires in ~60 days. Run this script again to refresh.</p>
        `);
        console.log("\n✓ Add to .env:\nLINKEDIN_ACCESS_TOKEN=" + data.access_token);
      } else {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end("<h1>Error:</h1><pre>" + JSON.stringify(data, null, 2) + "</pre>");
      }
    } catch (e) {
      res.writeHead(500, { "Content-Type": "text/html" });
      res.end("<h1>Error:</h1><pre>" + e.message + "</pre>");
    }
    server.close();
  }
});

server.listen(PORT, () => {
  console.log(`\n1. Open this URL in your browser:\n   ${authUrl}\n`);
  console.log(`2. Sign in to LinkedIn and approve.\n`);
  console.log(`3. You'll be redirected to localhost. The token will appear below.\n`);
});
