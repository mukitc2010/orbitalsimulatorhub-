#!/usr/bin/env node
/**
 * Blog Post Generator
 * 
 * Usage: node scripts/generate-blog-post.js
 * 
 * This script helps you quickly create new blog posts by generating
 * a template that you can fill in and add to blogPosts.ts
 */

import fs from 'fs';
import path from 'path';

const CATEGORIES = {
  1: { id: 'nasa-news', label: 'NASA News', emoji: '🚀' },
  2: { id: 'space-facts', label: 'Space Facts', emoji: '⭐' },
  3: { id: 'satellite-tutorials', label: 'Satellite Tutorials', emoji: '🛰️' },
  4: { id: 'astronomy-lessons', label: 'Astronomy Lessons', emoji: '🔭' },
};

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function generatePost() {
  console.log('\n📝 Blog Post Generator\n');
  console.log('Categories:');
  Object.entries(CATEGORIES).forEach(([num, cat]) => {
    console.log(`  ${num}. ${cat.emoji} ${cat.label}`);
  });

  // In a real interactive script, you'd use readline
  // For now, this generates a template
  const today = new Date().toISOString().split('T')[0];
  
  const template = `{
  slug: "your-post-slug-here",
  title: "Your Post Title Here",
  excerpt: "A brief 1-2 sentence description that appears in listings and search results.",
  content: \`Your full article content here. Use markdown-style formatting.

**Bold text** for emphasis.

- Bullet points
- For lists

Add links: [link text](/path)

Include formulas: v = √(GM/r)

Add code examples if needed.\`,
  category: "nasa-news", // or "space-facts", "satellite-tutorials", "astronomy-lessons"
  date: "${today}",
  tags: ["tag1", "tag2", "tag3"],
  seoKeywords: "keyword1, keyword2, keyword3",
},`;

  console.log('\n📄 Template generated:\n');
  console.log(template);
  console.log('\n💡 Copy this template, fill it in, and add it to:');
  console.log('   client/src/data/blogPosts.ts\n');
  console.log('📊 SEO Tips:');
  console.log('   - Use descriptive titles with keywords');
  console.log('   - Write 300-1000+ words for better SEO');
  console.log('   - Include internal links to /simulator, /formulas-library, etc.');
  console.log('   - Add relevant tags');
  console.log('   - Use seoKeywords for search optimization\n');
}

generatePost();
