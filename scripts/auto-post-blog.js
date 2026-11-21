#!/usr/bin/env node
/**
 * Automated Blog Posting Script
 * Can be called by n8n or run manually
 * 
 * Usage:
 *   node scripts/auto-post-blog.js --category nasa-news --title "Your Title"
 *   node scripts/auto-post-blog.js --auto (generates random post)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const BLOG_POSTS_FILE = path.join(__dirname, '../client/src/data/blogPosts.ts');

const CATEGORIES = ['nasa-news', 'space-facts', 'satellite-tutorials', 'astronomy-lessons'];

const TOPICS = {
  'nasa-news': [
    'NASA Perseverance Rover discovers new evidence of ancient water on Mars',
    'James Webb Telescope reveals stunning images of distant galaxies',
    'SpaceX launches Falcon Heavy with 50 Starlink satellites',
    'ISS astronauts conduct groundbreaking space experiments',
    'NASA announces plans for Artemis Moon mission',
  ],
  'space-facts': [
    'The ISS orbits Earth 16 times per day',
    'There are over 5,000 active satellites in orbit',
    'Satellites travel at speeds up to 17,000 mph',
    'GPS satellites orbit at 20,200 km altitude',
    'Geostationary satellites stay fixed above one point',
  ],
  'satellite-tutorials': [
    'How GPS satellites calculate your exact location',
    'Why weather satellites orbit at 36,000 km',
    'How Starlink creates global internet coverage',
    'Understanding Low Earth Orbit (LEO) satellites',
    'How geostationary satellites stay in place',
  ],
  'astronomy-lessons': [
    'How stars are born from gas clouds',
    'What happens when a star dies: supernovas explained',
    'Why black holes have event horizons',
    'How planets form around young stars',
    'Understanding the life cycle of stars',
  ],
};

function slugify(text) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function generateContent(title, category) {
  const excerpt = `Learn about ${title.toLowerCase()} and how it relates to orbital mechanics and space physics.`;

  const content = `${title} is a fascinating topic in space science and orbital mechanics.

**Key Points**

- This topic relates directly to how satellites and spacecraft operate
- Understanding this helps explain orbital mechanics
- Real-world applications include satellite communication and space exploration

**How It Works**

The physics behind ${title.toLowerCase()} involves fundamental principles of orbital mechanics, including:

- Gravity and its effects on orbital motion
- Velocity requirements for different orbits
- The relationship between altitude and orbital period

**Try It Yourself**

Use our [orbit simulator](/simulator) to see these concepts in action. Learn more about [orbital mechanics](/learn/orbital-mechanics) and [space formulas](/formulas-library).

**Conclusion**

${title.toLowerCase()} demonstrates the incredible complexity and beauty of space physics. Understanding these concepts helps us appreciate how satellites and spacecraft navigate through space.`;

  return { excerpt, content };
}

function addBlogPost(post) {
  try {
    let content = fs.readFileSync(BLOG_POSTS_FILE, 'utf-8');
    if (content.includes(`slug: "${post.slug}"`)) {
      return { success: false, message: `Blog post already exists: ${post.slug}` };
    }

    const postObject = `  {
    slug: "${post.slug}",
    title: "${post.title.replace(/"/g, '\\"')}",
    excerpt: "${post.excerpt.replace(/"/g, '\\"')}",
    content: \`${post.content.replace(/`/g, '\\`').replace(/\$\{/g, '\\${')}\`,
    category: "${post.category}",
    date: "${post.date}",
    tags: [${post.tags.map(t => `"${t.replace(/"/g, '\\"')}"`).join(', ')}],
    ${post.seoKeywords ? `seoKeywords: "${post.seoKeywords.replace(/"/g, '\\"')}",` : ''}
  },`;

    const beforeClosing = content.lastIndexOf('];');
    if (beforeClosing === -1) {
      throw new Error('Could not find array closing bracket');
    }

    const newContent = content.slice(0, beforeClosing) + postObject + '\n' + content.slice(beforeClosing);
    fs.writeFileSync(BLOG_POSTS_FILE, newContent, 'utf-8');

    return { success: true, message: 'Blog post added successfully' };
  } catch (error) {
    return { success: false, message: `Error adding post: ${error.message}` };
  }
}

function main() {
  const args = process.argv.slice(2);
  let category, title;

  if (args.includes('--auto')) {
    // Auto-generate random post
    category = CATEGORIES[Math.floor(Math.random() * CATEGORIES.length)];
    const topicList = TOPICS[category];
    title = topicList[Math.floor(Math.random() * topicList.length)];
  } else {
    // Parse arguments
    const categoryIndex = args.indexOf('--category');
    const titleIndex = args.indexOf('--title');

    if (categoryIndex === -1 || titleIndex === -1) {
      console.error('Usage: node scripts/auto-post-blog.js --category <category> --title "<title>"');
      console.error('   or: node scripts/auto-post-blog.js --auto');
      process.exit(1);
    }

    category = args[categoryIndex + 1];
    title = args[titleIndex + 1];

    if (!CATEGORIES.includes(category)) {
      console.error(`Invalid category. Must be one of: ${CATEGORIES.join(', ')}`);
      process.exit(1);
    }
  }

  const slug = slugify(title);
  const { excerpt, content } = generateContent(title, category);
  const today = new Date().toISOString().split('T')[0];

  const tagMap = {
    'nasa-news': ['NASA', 'space exploration', 'missions'],
    'space-facts': ['space facts', 'orbital mechanics', 'satellites'],
    'satellite-tutorials': ['satellites', 'tutorial', 'orbital mechanics'],
    'astronomy-lessons': ['astronomy', 'stars', 'space science'],
  };

  const tags = tagMap[category] || ['space', 'orbital mechanics'];
  const seoKeywords = tags.join(', ');

  const post = {
    slug,
    title,
    excerpt,
    content,
    category,
    date: today,
    tags,
    seoKeywords,
  };

  const result = addBlogPost(post);

  if (result.success) {
    console.log('✅ Blog post added successfully!');
    console.log(`   Title: ${title}`);
    console.log(`   Slug: ${slug}`);
    console.log(`   Category: ${category}`);
    console.log(`   Date: ${today}`);
  } else {
    console.error('❌ Error:', result.message);
    process.exit(1);
  }
}

main();
