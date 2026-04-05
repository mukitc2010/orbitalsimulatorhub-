# ⚡ QUICK START: Add Your First Post (Copy & Paste Ready)

## Step-by-Step Visual Guide

### 1. Open This File:
```
client/src/data/blogPosts.ts
```

### 2. Find Line 12 (starts with `export const BLOG_POSTS: BlogPost[] = [`)

### 3. You'll see posts like this:

```typescript
export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "how-iss-orbits-earth-16-times-daily",
    title: "How the ISS Orbits Earth 16 Times Every Day",
    // ... existing post ...
  },
  {
    slug: "nasa-james-webb-telescope-new-discoveries-2026",
    title: "NASA James Webb Telescope: Latest Discoveries in 2026",
    // ... existing post ...
  },
  // 👇 ADD YOUR NEW POST HERE (after the last post, before the closing bracket)
];
```

### 4. Copy This Template and Paste It:

```typescript
  {
    slug: "your-post-url-slug-here",
    title: "Your Post Title Here",
    excerpt: "One or two sentences describing your post. This appears in search results and blog listings.",
    content: `Your full article content goes here. Write 300-1000+ words.

**Use formatting:**
- Bullet points work
- **Bold text** for emphasis
- [Links to other pages](/simulator)

**Always include internal links:**
- [Try the simulator](/simulator)
- [See formulas](/formulas-library)
- [Learn about satellites](/satellites)
- [Use calculators](/calculators)

**Write in sections:**
- Introduction paragraph
- Main content (3-5 paragraphs)
- Examples or real-world applications
- Conclusion with call-to-action`,
    category: "nasa-news",
    date: "2026-02-15",
    tags: ["tag1", "tag2", "tag3"],
    seoKeywords: "keyword1, keyword2, keyword3",
  },
```

### 5. Replace with Real Content - Example:

```typescript
  {
    slug: "spacex-starship-mars-mission-2026",
    title: "SpaceX Starship Prepares for First Mars Mission in 2026",
    excerpt: "SpaceX announces plans to launch the first Starship mission to Mars in late 2026. Learn about the mission timeline, orbital mechanics, and how Starship will reach the Red Planet.",
    content: `SpaceX has officially announced that the first Starship mission to Mars will launch in late 2026, marking a historic milestone in human space exploration.

**Mission Overview:**
The Starship spacecraft will carry cargo and scientific instruments to Mars, testing the technology needed for future crewed missions. The journey will take approximately 7-9 months, depending on the launch window.

**Orbital Mechanics:**
To reach Mars, Starship must:
1. Escape Earth's gravity (escape velocity: 11.2 km/s)
2. Enter a transfer orbit around the Sun
3. Match Mars' orbital velocity upon arrival
4. Use Mars' atmosphere for aerobraking

**Why 2026?**
Mars and Earth align favorably every 26 months, creating optimal launch windows. The 2026 window offers the best opportunity for efficient fuel use.

**Try it yourself:**
Use our [orbit simulator](/simulator) to understand how spacecraft transfer between planets. Learn about [orbital mechanics](/learn/orbital-mechanics) and [escape velocity](/formulas-library) calculations.`,
    category: "nasa-news",
    date: "2026-02-15",
    tags: ["SpaceX", "Mars", "Starship", "space exploration"],
    seoKeywords: "spacex mars mission, starship mars, mars mission 2026, spacex starship",
  },
```

### 6. Save the File

### 7. Update RSS Feed:
Open terminal in your project folder and run:
```bash
npm run generate:rss
```

### 8. Test It:
```bash
npm run dev:vite
```
Then visit: `http://localhost:5173/blog`

### 9. Deploy:
```bash
npm run build:client
git add .
git commit -m "Add blog post: [your title]"
git push
```

---

## 🎯 Category Options:

Choose ONE of these:
- `"nasa-news"` - NASA missions, SpaceX launches, space news
- `"space-facts"` - Interesting facts about space, orbits, satellites
- `"satellite-tutorials"` - How satellites work, GPS, Starlink, etc.
- `"astronomy-lessons"` - Stars, planets, galaxies, black holes

---

## 📝 Date Format:
Always use: `"YYYY-MM-DD"` (e.g., `"2026-02-15"`)

---

## ✅ Checklist:
- [ ] Added comma after previous post
- [ ] Slug is URL-friendly (lowercase, hyphens)
- [ ] Title is descriptive
- [ ] Excerpt is 150-200 characters
- [ ] Content is 300+ words
- [ ] Includes 2+ internal links
- [ ] Category is correct
- [ ] Date is today's date
- [ ] 3-5 tags added
- [ ] SEO keywords included
- [ ] Saved the file
- [ ] Ran `npm run generate:rss`

---

## 🚀 That's It! You're Done!

Your post will appear on:
- `/blog` - Main blog page
- `/blog/category/[category]` - Category page
- `/blog/[your-slug]` - Individual post page
- `/blog/rss.xml` - RSS feed
