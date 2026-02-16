#!/usr/bin/env node
/**
 * RSS Feed Generator
 * 
 * Generates RSS feed from blogPosts.ts data
 * Run: node scripts/generate-rss.js
 */

const fs = require('fs');
const path = require('path');

// Read blogPosts.ts and extract posts
const blogPostsPath = path.join(__dirname, '../client/src/data/blogPosts.ts');
const blogPostsContent = fs.readFileSync(blogPostsPath, 'utf8');

// Simple regex to extract posts (this is a basic parser - in production, use a proper TS parser)
const postRegex = /{\s*slug:\s*"([^"]+)",\s*title:\s*"([^"]+)",\s*excerpt:\s*"([^"]+)",[\s\S]*?category:\s*"([^"]+)",\s*date:\s*"([^"]+)",[\s\S]*?tags:\s*\[([^\]]+)\],/g;

const posts = [];
let match;
while ((match = postRegex.exec(blogPostsContent)) !== null) {
  const [, slug, title, excerpt, category, date, tagsStr] = match;
  const tags = tagsStr.split(',').map(t => t.trim().replace(/"/g, ''));
  posts.push({ slug, title, excerpt, category, date, tags });
}

// Sort by date (newest first)
posts.sort((a, b) => b.date.localeCompare(a.date));

// Generate RSS XML
const siteUrl = 'https://orbitalsimulatorhub.com';
const buildDate = new Date().toUTCString();

const rssItems = posts.map(post => {
  const pubDate = new Date(post.date + 'T00:00:00').toUTCString();
  return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${siteUrl}/blog/${post.slug}</link>
      <description>${escapeXml(post.excerpt)}</description>
      <pubDate>${pubDate}</pubDate>
      <category>${post.category}</category>
    </item>`;
}).join('\n');

const rssXml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Orbital Simulator Hub Blog</title>
    <link>${siteUrl}/blog</link>
    <description>Daily NASA news, space facts, satellite tutorials, and astronomy lessons. Learn orbital mechanics, space physics, and how satellites work.</description>
    <language>en-US</language>
    <lastBuildDate>${buildDate}</lastBuildDate>
    <atom:link href="${siteUrl}/blog/rss.xml" rel="self" type="application/rss+xml" />
${rssItems}
  </channel>
</rss>`;

function escapeXml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Write RSS file
const rssPath = path.join(__dirname, '../client/public/blog/rss.xml');
fs.mkdirSync(path.dirname(rssPath), { recursive: true });
fs.writeFileSync(rssPath, rssXml, 'utf8');

console.log(`✅ Generated RSS feed with ${posts.length} posts`);
console.log(`   Saved to: ${rssPath}`);
