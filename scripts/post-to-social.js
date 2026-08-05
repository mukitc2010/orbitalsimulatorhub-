#!/usr/bin/env node
/**
 * Publish an evidence-based blog promotion to a LinkedIn organization page.
 *
 * Required environment variables:
 *   LINKEDIN_ACCESS_TOKEN
 *   LINKEDIN_ORGANIZATION_URN=urn:li:organization:123456
 * Optional:
 *   BLOG_SLUG=the-article-to-promote
 */

import { config } from "dotenv";
config({ path: ".env" });

import { readFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOG_FILE = path.join(__dirname, "../client/src/data/blogPosts.ts");

const HASHTAGS = "#SpaceScience #OrbitalMechanics #AerospaceEngineering #STEM #SpaceTechnology";
const SITE_URL = "https://www.orbitalsimulatorhub.com";

function getPost(slug) {
  const src = readFileSync(BLOG_FILE, "utf8");
  const escapedSlug = slug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = src.match(new RegExp(`slug:\\s*"(${escapedSlug})",\\s*title:\\s*"([^"]+)",\\s*excerpt:\\s*"([^"]+)"`));
  if (!match) return null;
  return { slug: match[1], title: match[2], excerpt: match[3] };
}

function buildPostText(post, url) {
  return `${post.title}\n\n${post.excerpt}\n\nRead the evidence-based article: ${url}\n\n${HASHTAGS}`;
}

async function postToLinkedIn(post, url) {
  const token = process.env.LINKEDIN_ACCESS_TOKEN;
  const organizationUrn = process.env.LINKEDIN_ORGANIZATION_URN;
  if (!token || !organizationUrn) {
    throw new Error("LINKEDIN_ACCESS_TOKEN and LINKEDIN_ORGANIZATION_URN are required");
  }
  if (!/^urn:li:organization:\d+$/.test(organizationUrn)) {
    throw new Error("LINKEDIN_ORGANIZATION_URN must use urn:li:organization:<numeric-id> format");
  }

  const commentary = buildPostText(post, url);

  const postRes = await fetch("https://api.linkedin.com/rest/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "LinkedIn-Version": "202402",
      "X-Restli-Protocol-Version": "2.0.0",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      author: organizationUrn,
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

  if (!postRes.ok) {
    throw new Error(`LinkedIn post failed: ${postRes.status} ${await postRes.text()}`);
  }
  console.log("[post-to-social] Posted to LinkedIn organization:", postRes.headers.get("x-restli-id") || "success");
}

async function main() {
  const slug = process.env.BLOG_SLUG;
  if (!slug) throw new Error("BLOG_SLUG is required to publish an exact validated article");
  const post = getPost(slug);
  if (!post) {
    throw new Error(`Blog post not found: ${slug}`);
  }

  const url = `${SITE_URL}/blog/${post.slug}`;
  console.log("[post-to-social] Publishing:", post.title);
  console.log("[post-to-social] URL:", url);

  await postToLinkedIn(post, url);
}

main();
