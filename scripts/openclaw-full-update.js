#!/usr/bin/env node
/**
 * OpenClaw Full Update — runs every 6 hours via OpenClaw cron
 *
 * 1. Generate new blog post (content-agent)
 * 2. Update SEO / sitemap (auto-seo-update)
 * 3. Regenerate RSS feed
 * 4. Git commit & push → triggers Vercel deploy
 *
 * Optional: Post latest to social (extend POST_TO_SOCIAL env)
 *
 * Usage: node scripts/openclaw-full-update.js
 * Or:    npm run openclaw:update
 */

import { execSync } from "child_process";
import { existsSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, "..");

function run(cmd, opts = {}) {
  console.log(`\n▶ ${cmd}`);
  try {
    execSync(cmd, { cwd: ROOT, stdio: "inherit", ...opts });
    return true;
  } catch (e) {
    console.error(`✗ Failed: ${cmd}`, e.message);
    return false;
  }
}

function main() {
  const start = new Date().toISOString();
  console.log(`\n🦞 OpenClaw OrbitalSimulatorHub Update — ${start}\n`);

  // 1. Generate new blog post (Ollama-powered)
  const contentOk = run("node scripts/content-agent.js");
  if (!contentOk) {
    console.warn("⚠ Content generation failed (Ollama may be offline). Continuing with SEO...");
  }

  // 2. SEO: update sitemap lastmod
  run("node scripts/auto-seo-update.js");

  // 3. Regenerate RSS
  run("node scripts/generate-rss.js");

  // 4. Git commit & push
  const files = [
    "client/src/data/blogPosts.ts",
    "client/src/data/seo-config.ts",
    "client/public/sitemap.xml",
    "client/public/blog/rss.xml",
    "client/index.html",
  ];
  if (existsSync(path.join(ROOT, "community/data/daily-content.json"))) {
    files.push("community/data/daily-content.json");
  }
  run(`git add ${files.join(" ")}`, { stdio: "pipe" });
  try {
    const status = execSync("git status --porcelain", { cwd: ROOT, encoding: "utf8" });
    if (status.trim()) {
      run(`git commit -m "OpenClaw: auto-update ${new Date().toISOString().slice(0, 10)}"`, { stdio: "pipe" });
      run("git push origin main", { stdio: "pipe" });
      console.log("\n✓ Pushed to GitHub → Vercel will deploy");
    } else {
      console.log("\n✓ No changes to commit");
    }
  } catch (e) {
    console.error("Git error:", e.message);
    process.exit(1);
  }

  // 5. Optional: post to social (user extends via env or script)
  if (process.env.POST_TO_SOCIAL === "1" && existsSync(path.join(ROOT, "scripts", "post-to-social.js"))) {
    run("node scripts/post-to-social.js");
  }

  console.log(`\n✓ Update complete — ${new Date().toISOString()}\n`);
}

main();
