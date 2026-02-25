#!/usr/bin/env node
/**
 * Post latest blog to LinkedIn (and optionally Twitter, Medium).
 *
 * Enable: POST_TO_SOCIAL=1 when running openclaw-full-update.js
 * Add to .env: LINKEDIN_ACCESS_TOKEN=your_token
 *
 * Setup: See LINKEDIN-SETUP.md
 */

import { config } from "dotenv";
config({ path: ".env" });

import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOG_FILE = path.join(__dirname, "../client/src/data/blogPosts.ts");

function getLatestPost() {
  const src = readFileSync(BLOG_FILE, "utf8");
  const match = src.match(/slug:\s*"([^"]+)",\s*title:\s*"([^"]+)",\s*excerpt:\s*"([^"]+)"/);
  if (!match) return null;
  return { slug: match[1], title: match[2], excerpt: match[3] };
}

async function postToLinkedIn(post, url) {
  const token = process.env.LINKEDIN_ACCESS_TOKEN;
  if (!token) {
    console.log("[post-to-social] LINKEDIN_ACCESS_TOKEN not set. Add to .env — see LINKEDIN-SETUP.md");
    return;
  }

  const commentary = `${post.title}\n\n${post.excerpt}\n\nRead more: ${url}\n\n#SpaceEngineering #OrbitalMechanics #SpaceAGI #NASA`;

  try {
    // 1. Get person URN for author
    const meRes = await fetch("https://api.linkedin.com/v2/me", {
      headers: {
        Authorization: `Bearer ${token}`,
        "X-Restli-Protocol-Version": "2.0.0",
      },
    });
    if (!meRes.ok) {
      console.error("[post-to-social] LinkedIn /me failed:", meRes.status, await meRes.text());
      return;
    }
    const me = await meRes.json();
    const personId = me.id || me.sub;
    if (!personId) {
      console.error("[post-to-social] Could not get LinkedIn person ID from /me response");
      return;
    }
    const author = personId.startsWith("urn:") ? personId : `urn:li:person:${personId}`;

    // 2. Create post
    const postRes = await fetch("https://api.linkedin.com/rest/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "LinkedIn-Version": "202402",
        "X-Restli-Protocol-Version": "2.0.0",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        author,
        commentary,
        visibility: "PUBLIC",
        lifecycleState: "PUBLISHED",
        distribution: {
          feedDistribution: "MAIN_FEED",
          targetEntities: [],
          thirdPartyDistributionChannels: [],
        },
        isReshareDisabledByAuthor: false,
      }),
    });

    if (postRes.ok) {
      const postId = postRes.headers.get("x-restli-id");
      console.log("[post-to-social] ✓ Posted to LinkedIn:", postId || "success");
    } else {
      const err = await postRes.text();
      console.error("[post-to-social] LinkedIn post failed:", postRes.status, err);
    }
  } catch (e) {
    console.error("[post-to-social] LinkedIn error:", e.message);
  }
}

async function main() {
  const post = getLatestPost();
  if (!post) {
    console.log("[post-to-social] No blog post found");
    return;
  }

  const url = `https://www.orbitalsimulatorhub.com/blog/${post.slug}`;
  console.log("[post-to-social] Latest:", post.title);
  console.log("[post-to-social] URL:", url);

  await postToLinkedIn(post, url);
}

main();
