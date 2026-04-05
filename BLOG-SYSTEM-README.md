# Blog System - Auto Posting Setup

## ✅ What's Been Created

### 1. **Blog Pages**
- `/blog` - Main blog listing page with categories
- `/blog/:slug` - Individual blog post pages
- `/blog/category/:category` - Category-filtered blog pages

### 2. **Content Structure**
- `client/src/data/blogPosts.ts` - All blog posts stored here
- Categories: NASA News, Space Facts, Satellite Tutorials, Astronomy Lessons
- Each post includes: title, excerpt, content, category, date, tags, SEO keywords

### 3. **RSS Feed**
- `/blog/rss.xml` - Auto-generated RSS feed
- Updated automatically when you run `npm run generate:rss`
- Included in HTML `<head>` for SEO

### 4. **Helper Scripts**
- `scripts/generate-blog-post.js` - Generates post templates
- `scripts/generate-rss.js` - Generates RSS feed from posts

### 5. **Navigation**
- Blog link added to main navigation
- Blog card added to home page
- Quick link added to home page footer

## 🚀 How to Add New Posts

### Method 1: Manual (Recommended for now)

1. Open `client/src/data/blogPosts.ts`
2. Add a new post object to the `BLOG_POSTS` array:

```typescript
{
  slug: "your-post-url-slug",
  title: "Your Post Title",
  excerpt: "Brief 1-2 sentence description",
  content: `Your full article content here.

Use markdown-style formatting:
- Bullet points
- **Bold text**
- [Links](/path)

Include internal links to:
- [Simulator](/simulator)
- [Formulas](/formulas-library)
- [Satellites](/satellites)`,
  category: "nasa-news", // or "space-facts", "satellite-tutorials", "astronomy-lessons"
  date: "2026-02-15", // YYYY-MM-DD format
  tags: ["tag1", "tag2", "tag3"],
  seoKeywords: "keyword1, keyword2, keyword3",
}
```

3. Run `npm run generate:rss` to update RSS feed
4. Build and deploy

### Method 2: Use Template Generator

```bash
npm run generate:post
```

This prints a template you can copy and fill in.

## 📊 Goal: 1000 Posts in 3 Months

**Daily target:** ~11 posts/day

### Content Strategy

**NASA News (Daily):**
- Latest NASA mission updates
- James Webb discoveries
- Mars rover updates
- ISS activities
- SpaceX launches

**Space Facts (Daily):**
- Orbital mechanics facts
- Satellite statistics
- Physics facts
- Astronomy facts

**Satellite Tutorials (Daily):**
- How satellites work
- GPS explained
- Weather satellites
- Starlink explained

**Astronomy Lessons (Daily):**
- Planet facts
- Star formation
- Black holes
- Galaxies

## 🔧 Commands

```bash
# Generate RSS feed
npm run generate:rss

# Generate post template
npm run generate:post

# Build (auto-generates RSS)
npm run build:client
```

## 📈 SEO Benefits

- **Fresh content daily** - Google loves regularly updated sites
- **1000+ pages** - Massive indexable content
- **Internal linking** - Every post links to simulator, formulas, etc.
- **RSS feed** - Helps Google discover new content faster
- **Category pages** - Additional landing pages for SEO

## 💰 Monetization (Future)

Once traffic grows:
- Google AdSense
- Affiliate links (space books, telescopes)
- Premium courses
- Sponsored content

## 📝 Current Sample Posts

1. "How the ISS Orbits Earth 16 Times Every Day" (Space Facts)
2. "NASA James Webb Telescope: Latest Discoveries in 2026" (NASA News)
3. "What is Geostationary Orbit? Explained Simply" (Satellite Tutorials)
4. "Why Satellites Don't Fall: Gravity and Velocity Explained" (Astronomy Lessons)

## 🎯 Next Steps

1. **Start posting daily** - Add 11 posts/day to reach 1000 in 3 months
2. **Use AI assistance** - Generate outlines, expand content
3. **Repurpose content** - Turn simulator features into tutorials
4. **Link internally** - Every post should link to simulator/formulas
5. **Track progress** - Monitor Google Search Console for indexing

## 📚 See Also

- `BLOG-CONTENT-GUIDE.md` - Detailed content strategy
- `ROADMAP-SEO.md` - Overall SEO strategy
