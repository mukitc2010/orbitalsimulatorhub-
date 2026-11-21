#!/usr/bin/env node
/**
 * Research Content Agent — NASA-style scientific content generator
 *
 * Generates:
 *   1. One blog post → appended to client/src/data/blogPosts.ts
 *   2. Daily content JSON → community/data/daily-content.json
 *   3. Regenerates RSS feed
 *
 * Usage:
 *   node scripts/content-agent.js              (auto-pick random topic)
 *   node scripts/content-agent.js --category satellite-tutorials
 *   node scripts/content-agent.js --dry-run    (print without writing)
 *
 * Requires an AI provider. Production automation requires Anthropic and fails
 * closed when the provider is unavailable, preventing uncited content updates.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const BLOG_FILE = path.join(ROOT, 'client/src/data/blogPosts.ts');
const DAILY_JSON = path.join(ROOT, 'community/data/daily-content.json');
const TOPICS_FILE = path.join(ROOT, 'scripts/content-topics.json');
const AFFILIATE_BOOKS = path.join(ROOT, 'scripts/affiliate-books.json');

const AI_PROVIDER = process.env.AI_PROVIDER || 'anthropic';
const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'llama3';
const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY || '';
const ANTHROPIC_MODEL = process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-20250514';
const PRODUCTION_RESEARCH = process.env.PRODUCTION_RESEARCH === 'true';

const args = process.argv.slice(2);
const DRY_RUN = args.includes('--dry-run');
const FORCE_CATEGORY = args.find((_, i, a) => a[i - 1] === '--category') || null;

// ─── Helpers ───────────────────────────────────────────

function slugify(text) {
  return text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').trim();
}

function today() {
  return new Date().toISOString().split('T')[0];
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

async function claudeGenerate(prompt) {
  if (!ANTHROPIC_API_KEY) {
    throw new Error('ANTHROPIC_API_KEY is required for NASA-style research generation');
  }
  try {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: ANTHROPIC_MODEL,
        max_tokens: 4096,
        messages: [{ role: 'user', content: prompt }],
      }),
    });
    if (!res.ok) throw new Error(`Anthropic ${res.status}`);
    const data = await res.json();
    const text = data.content?.[0]?.text || '';
    if (!text.trim()) throw new Error('Anthropic returned no content');
    return text.trim();
  } catch (e) {
    throw new Error(`Anthropic generation failed: ${e.message}`);
  }
}

async function ollamaGenerate(prompt) {
  if (PRODUCTION_RESEARCH) {
    throw new Error('Production research generation requires Anthropic');
  }
  try {
    const res = await fetch(`${OLLAMA_URL}/api/generate`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: OLLAMA_MODEL, prompt, stream: false }),
    });
    if (!res.ok) throw new Error(`Ollama ${res.status}`);
    const data = await res.json();
    if (!data.response?.trim()) throw new Error('Ollama returned no content');
    return data.response.trim();
  } catch (e) {
    throw new Error(`Ollama generation failed: ${e.message}`);
  }
}

async function aiGenerate(prompt) {
  if (AI_PROVIDER === 'anthropic') return claudeGenerate(prompt);
  return ollamaGenerate(prompt);
}

// ─── Load topics ───────────────────────────────────────

const topicsData = JSON.parse(fs.readFileSync(TOPICS_FILE, 'utf8'));
const categories = topicsData.categories;

const PRIORITY_CATEGORIES = ['space-agi', 'space-engineering', 'agi-research', 'robot-engineering'];

function pickCategory() {
  if (FORCE_CATEGORY) {
    const found = categories.find(c => c.id === FORCE_CATEGORY);
    if (!found) {
      console.error(`Unknown category: ${FORCE_CATEGORY}. Available: ${categories.map(c => c.id).join(', ')}`);
      process.exit(1);
    }
    return found;
  }
  // 50% bias toward Space AGI and Space Engineering (revenue + learning focus)
  if (Math.random() < 0.5) {
    const priority = categories.filter(c => PRIORITY_CATEGORIES.includes(c.id));
    if (priority.length > 0) return pickRandom(priority);
  }
  return pickRandom(categories);
}

// ─── Generate blog post ────────────────────────────────

function hasRequiredScientificSections(content) {
  const requiredHeadings = [
    "## Scope and evidence",
    "## Technical analysis",
    "## Limitations and uncertainty",
    "## Sources",
  ];
  const primarySource = /https?:\/\/(?:www\.)?(?:nasa\.gov|science\.nasa\.gov|ntrs\.nasa\.gov|jpl\.nasa\.gov|esa\.int|arxiv\.org|doi\.org)\//i;
  return requiredHeadings.every((heading) => content.includes(heading)) && primarySource.test(content);
}

function getAffiliateBooksForCategory(categoryId) {
  if (!fs.existsSync(AFFILIATE_BOOKS)) return [];
  const data = JSON.parse(fs.readFileSync(AFFILIATE_BOOKS, 'utf8'));
  const tag = data.tag || 'hubdepot-20';
  const books = data.categories?.[categoryId] || data.fallback || [];
  return books.slice(0, 4).map((b) => ({ ...b, tag }));
}

function appendAffiliateSection(content, categoryId) {
  const books = getAffiliateBooksForCategory(categoryId);
  if (books.length === 0) return content;
  const tag = books[0]?.tag || 'hubdepot-20';
  const lines = books.map((b) => `- [${b.name}](https://www.amazon.com/dp/${b.asin}?tag=${tag})`);
  return content.trimEnd() + `\n\n**Recommended Reading & Products**\n\n${lines.join('\n')}\n\nExplore more in our [Space Shop](/space-shop) — NASA t-shirts, LEGO sets, and verified Amazon products.\n`;
}

async function generateBlogPost(cat) {
  const topic = pickRandom(cat.topics);
  const title = topic;
  const slug = slugify(title) + '-' + today().replace(/-/g, '');
  const prompt = topicsData.blog_prompt.replace('{topic}', topic);
  let content = await aiGenerate(prompt);
  if (!hasRequiredScientificSections(content)) {
    throw new Error('Generated article did not meet required NASA-style evidence and citation standards');
  }
  content = appendAffiliateSection(content, cat.id);
  const excerpt = `Learn about ${title.toLowerCase()} — covering the science, real-world applications, and how it connects to space exploration.`;

  return {
    slug,
    title,
    excerpt,
    content,
    category: cat.id,
    date: today(),
    tags: cat.tags,
    seoKeywords: cat.tags.join(', '),
  };
}

function appendBlogPost(post) {
  let src = fs.readFileSync(BLOG_FILE, 'utf8');
  if (src.includes(`slug: "${post.slug}"`)) {
    console.log(`   Skipping duplicate slug: ${post.slug}`);
    return false;
  }
  const entry = `  {
    slug: "${post.slug}",
    title: "${post.title.replace(/"/g, '\\"')}",
    excerpt: "${post.excerpt.replace(/"/g, '\\"')}",
    content: \`${post.content.replace(/`/g, '\\`').replace(/\$\{/g, '\\${')}\`,
    category: "${post.category}",
    date: "${post.date}",
    tags: [${post.tags.map(t => `"${t}"`).join(', ')}],
    seoKeywords: "${post.seoKeywords}",
  },`;

  const idx = src.lastIndexOf('];');
  if (idx === -1) throw new Error('Cannot find end of BLOG_POSTS array');
  src = src.slice(0, idx) + entry + '\n' + src.slice(idx);
  fs.writeFileSync(BLOG_FILE, src, 'utf8');
  return true;
}

// ─── Generate daily content JSON ───────────────────────

async function generateDailyContent(blogPost) {
  const highlightCats = categories.filter(c => c.id !== blogPost.category);
  const pickedHighlights = [];
  for (let i = 0; i < 3; i++) {
    const hCat = pickRandom(highlightCats);
    const hTopic = pickRandom(hCat.topics);
    const hPrompt = topicsData.highlight_prompt.replace('{topic}', hTopic);
    const blurb = await aiGenerate(hPrompt);
    const icons = ['rocket', 'atom', 'plane', 'satellite', 'star', 'telescope'];
    pickedHighlights.push({ title: hTopic.length > 50 ? hTopic.slice(0, 47) + '...' : hTopic, blurb, icon: icons[i % icons.length] });
  }

  const featuredPrompt = topicsData.featured_prompt.replace('{topic}', blogPost.title);
  const featuredExcerpt = await aiGenerate(featuredPrompt);

  const didYouKnow = await aiGenerate(topicsData.fact_prompt);

  // Read existing blog posts for latest_posts
  const blogSrc = fs.readFileSync(BLOG_FILE, 'utf8');
  const postRegex = /slug:\s*"([^"]+)",\s*title:\s*"([^"]+)",\s*excerpt:\s*"([^"]+)",[\s\S]*?category:\s*"([^"]+)",\s*date:\s*"([^"]+)"/g;
  const allPosts = [];
  let m;
  while ((m = postRegex.exec(blogSrc)) !== null) {
    allPosts.push({ slug: m[1], title: m[2], excerpt: m[3], category: m[4], date: m[5] });
  }
  allPosts.sort((a, b) => b.date.localeCompare(a.date));
  const latestPosts = allPosts.slice(0, 3);

  const categoryLinks = {
    'nasa-news': '/learn/how-nasa-launches-satellite',
    'space-facts': '/learn/orbital-mechanics',
    'satellite-tutorials': '/learn/how-satellites-work',
    'astronomy-lessons': '/learn/astrophysics',
    'aerodynamics': '/learn/aerodynamics',
    'quantum-physics': '/learn/quantum-physics',
  };

  return {
    generated_at: new Date().toISOString(),
    featured_article: {
      title: blogPost.title,
      excerpt: featuredExcerpt,
      category: blogPost.category,
      read_more_url: `https://www.orbitalsimulatorhub.com/blog/${blogPost.slug}`,
    },
    did_you_know: didYouKnow,
    topic_highlights: pickedHighlights,
    latest_posts: latestPosts,
    learning_paths: {
      beginner: ['What is orbital mechanics?', 'How do satellites stay up?', 'What is escape velocity?', 'How rockets work', 'The solar system explained'],
      intermediate: ['LEO vs MEO vs GEO orbits', 'Hohmann transfer orbits', 'How GPS works', 'Re-entry physics', 'Aerodynamics of launch vehicles'],
      advanced: ['Quantum physics in space navigation', 'AI-guided spacecraft', 'N-body problem simulations', 'Relativistic corrections for GPS', 'Interplanetary trajectory design'],
    },
  };
}

// ─── Main ──────────────────────────────────────────────

async function main() {
  console.log('🤖 Content Agent starting...');
  console.log(`   Provider: ${AI_PROVIDER}`);
  console.log(`   Model: ${AI_PROVIDER === 'anthropic' ? ANTHROPIC_MODEL : OLLAMA_MODEL}`);
  console.log(`   Production research standards: ${PRODUCTION_RESEARCH}`);
  console.log(`   Dry run: ${DRY_RUN}`);
  console.log('');

  const cat = pickCategory();
  console.log(`📂 Category: ${cat.name} (${cat.id})`);

  // 1. Generate blog post
  console.log('📝 Generating blog post...');
  const blogPost = await generateBlogPost(cat);
  console.log(`   Title: ${blogPost.title}`);
  console.log(`   Slug: ${blogPost.slug}`);

  if (!DRY_RUN) {
    const appended = appendBlogPost(blogPost);
    console.log(appended ? '   ✅ Blog post appended to blogPosts.ts' : '   ⚠️  Blog post already existed');
  } else {
    console.log('   (dry run — not written)');
  }

  // 2. Generate daily content JSON
  console.log('📋 Generating daily content...');
  const dailyContent = await generateDailyContent(blogPost);

  if (!DRY_RUN) {
    fs.mkdirSync(path.dirname(DAILY_JSON), { recursive: true });
    fs.writeFileSync(DAILY_JSON, JSON.stringify(dailyContent, null, 2), 'utf8');
    console.log('   ✅ daily-content.json updated');
  } else {
    console.log('   (dry run — not written)');
    console.log(JSON.stringify(dailyContent, null, 2));
  }

  // 3. Regenerate RSS
  if (!DRY_RUN) {
    console.log('📡 Regenerating RSS feed...');
    try {
      execSync('node scripts/generate-rss.js', { cwd: ROOT, stdio: 'inherit' });
    } catch {
      console.warn('   ⚠ RSS generation failed (non-critical)');
    }
  }

  console.log('');
  console.log('✅ Content Agent finished.');
  console.log(`   Blog: ${blogPost.title}`);
  console.log(`   Daily JSON: ${DRY_RUN ? '(dry run)' : DAILY_JSON}`);
}

main().catch((e) => {
  console.error('❌ Content Agent failed:', e.message);
  process.exit(1);
});
