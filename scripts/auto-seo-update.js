#!/usr/bin/env node
/**
 * Auto SEO Update — runs every 2 hours (via n8n or Task Scheduler)
 * Updates sitemap lastmod to today. GitHub Actions handles commits and PRs.
 */

import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = join(__dirname, "..");
const sitemapPath = join(projectRoot, "client", "public", "sitemap.xml");

function getToday() {
  return new Date().toISOString().split("T")[0];
}

function updateSitemapLastmod() {
  const today = getToday();
  let content = readFileSync(sitemapPath, "utf8");

  // Replace all lastmod dates with today
  const updated = content.replace(/<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/g, `<lastmod>${today}</lastmod>`);

  if (content === updated) {
    console.log(`[auto-seo] No lastmod changes needed (already ${today})`);
    return false;
  }

  writeFileSync(sitemapPath, updated);
  console.log(`[auto-seo] Updated sitemap lastmod to ${today}`);
  return true;
}

function main() {
  console.log(`[auto-seo] Running at ${new Date().toISOString()}`);
  updateSitemapLastmod();
}

main();
