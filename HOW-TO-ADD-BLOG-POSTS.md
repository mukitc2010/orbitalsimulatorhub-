# 🚀 HOW TO ADD BLOG POSTS - Step-by-Step Guide

## Quick Start: Add Your First Post (5 minutes)

### Step 1: Open the Blog Posts File
1. Navigate to: `client/src/data/blogPosts.ts`
2. Open it in your code editor

### Step 2: Copy This Template
Find the `BLOG_POSTS` array (starts around line 5) and add a new post:

```typescript
{
  slug: "your-post-url-here",
  title: "Your Post Title Here",
  excerpt: "One or two sentences that describe what the post is about. This appears in search results.",
  content: `Your full article goes here. Write 300-1000+ words.

**Use formatting:**
- Bullet points work
- **Bold text** for emphasis
- [Links to other pages](/simulator)

**Include sections:**
- Introduction
- Main content (3-5 paragraphs)
- Examples
- Conclusion

**Always link internally:**
- [Try the simulator](/simulator)
- [See formulas](/formulas-library)
- [Learn about satellites](/satellites)`,
  category: "nasa-news", // Choose: "nasa-news", "space-facts", "satellite-tutorials", or "astronomy-lessons"
  date: "2026-02-15", // Format: YYYY-MM-DD (today's date)
  tags: ["NASA", "space", "satellites"], // 3-5 relevant tags
  seoKeywords: "nasa news, space facts, orbital mechanics", // 5-10 keywords
},
```

### Step 3: Fill in Your Content
Replace the template with your actual content. Example:

```typescript
{
  slug: "spacex-falcon-heavy-launch-2026",
  title: "SpaceX Falcon Heavy Launches 50 Satellites to Orbit",
  excerpt: "SpaceX successfully launched a Falcon Heavy rocket carrying 50 Starlink satellites into Low Earth Orbit. Learn about the mission and orbital mechanics involved.",
  content: `SpaceX launched another Falcon Heavy mission today, successfully deploying 50 Starlink satellites into Low Earth Orbit (LEO).

**Mission Details:**
- Launch time: 2:30 PM EST
- Payload: 50 Starlink satellites
- Target orbit: 550 km altitude
- Orbital period: ~96 minutes

**Why LEO?**
Low Earth Orbit is perfect for internet satellites because:
- Lower latency (faster internet)
- Easier to reach (less fuel needed)
- Can deorbit naturally when retired

**Orbital Mechanics:**
At 550 km altitude, these satellites will orbit Earth approximately 15.6 times per day. The orbital speed is about 7.6 km/s.

**Try it yourself:**
Use our [orbit simulator](/simulator) to see how satellites orbit at different altitudes. Add a LEO satellite and watch it circle Earth every 90 minutes!`,
  category: "nasa-news",
  date: "2026-02-15",
  tags: ["SpaceX", "Falcon Heavy", "Starlink", "LEO"],
  seoKeywords: "spacex launch, falcon heavy, starlink satellites, low earth orbit",
},
```

### Step 4: Update RSS Feed
Run this command in your terminal:

```bash
npm run generate:rss
```

### Step 5: Test Locally
```bash
npm run dev:vite
```

Visit: `http://localhost:5173/blog` to see your new post!

### Step 6: Deploy
```bash
npm run build:client
git add .
git commit -m "Add new blog post: [your title]"
git push
```

Vercel will automatically deploy your changes!

---

## 📝 Daily Workflow: Add 11 Posts Per Day

### Morning (30 minutes) - NASA News Posts
1. Check NASA.gov, SpaceX.com, or space news sites
2. Write 2-3 news posts about latest missions/discoveries
3. Use format: "NASA [Mission] [Action] [Result]"

**Example titles:**
- "NASA Perseverance Rover Discovers Ancient Riverbed on Mars"
- "SpaceX Launches Crew-8 Mission to International Space Station"
- "James Webb Telescope Finds Water on Exoplanet 120 Light-Years Away"

### Afternoon (1 hour) - Tutorials & Facts
1. Write 3-4 satellite tutorial posts
2. Write 2-3 space fact posts

**Tutorial examples:**
- "How GPS Satellites Calculate Your Location"
- "Why Weather Satellites Orbit at 36,000 km"
- "How Starlink Creates Global Internet Coverage"

**Fact examples:**
- "The Fastest Satellite Travels at 17,000 mph"
- "There Are Over 5,000 Active Satellites Orbiting Earth"
- "The ISS Completes One Orbit Every 90 Minutes"

### Evening (1 hour) - Astronomy Lessons
1. Write 2-3 astronomy lesson posts

**Examples:**
- "How Stars Are Born: From Gas Cloud to Nuclear Fusion"
- "What Happens When a Star Dies: Supernovas Explained"
- "Why Black Holes Have Event Horizons"

---

## 🎯 Content Ideas Generator

### NASA News Ideas (Daily)
- Latest NASA mission updates
- James Webb Telescope discoveries
- Mars rover findings
- ISS astronaut activities
- SpaceX launches
- Artemis program updates
- Space station research results

### Space Facts Ideas (Daily)
- Orbital mechanics facts
- Satellite statistics
- Space history facts
- Physics facts
- Astronomy facts
- Space records (fastest, farthest, etc.)

### Satellite Tutorial Ideas (Daily)
- How [satellite type] works
- Why satellites use [orbit type]
- How [technology] enables satellites
- GPS explained
- Weather satellites explained
- Communication satellites explained
- Starlink explained

### Astronomy Lesson Ideas (Daily)
- Planet facts
- Star formation
- Black holes
- Galaxies
- Nebulas
- Comets and asteroids
- The solar system

---

## 🤖 Use AI to Help Write Posts

### Option 1: Generate Outline
Ask AI: "Create an outline for a blog post about [topic]"

### Option 2: Expand Bullet Points
1. Write bullet points
2. Ask AI: "Expand these into a 500-word blog post"
3. Copy into your post template

### Option 3: Generate Multiple Variations
Ask AI: "Write 5 different blog post titles about [topic]"

---

## 📋 Post Checklist

Before publishing, make sure:
- [ ] Title is descriptive and includes keywords
- [ ] Excerpt is 150-200 characters
- [ ] Content is 300-1000+ words
- [ ] Includes at least 2 internal links (to /simulator, /formulas-library, etc.)
- [ ] Category is correct
- [ ] Date is today's date (YYYY-MM-DD)
- [ ] 3-5 relevant tags added
- [ ] SEO keywords included
- [ ] RSS feed updated (`npm run generate:rss`)

---

## 🚀 Batch Creation Tips

### Create Weekly Themes
- **Week 1:** Focus on LEO satellites
- **Week 2:** Focus on NASA missions
- **Week 3:** Focus on orbital mechanics
- **Week 4:** Focus on astronomy

### Repurpose Existing Content
- Turn simulator features into tutorials
- Expand formula explanations into posts
- Convert FAQs into articles
- Create "How X works" posts

### Use Templates
Create templates for common post types:
- News post template
- Tutorial template
- Fact post template
- Lesson template

---

## 📊 Track Your Progress

### Week 1 Goal: 77 posts (11/day)
- Day 1: 11 posts
- Day 2: 22 total
- Day 3: 33 total
- ...
- Day 7: 77 total

### Month 1 Goal: 330 posts
### Month 2 Goal: 660 posts
### Month 3 Goal: 1000 posts

---

## ⚡ Quick Commands Reference

```bash
# Generate RSS feed
npm run generate:rss

# Generate post template
npm run generate:post

# Test locally
npm run dev:vite

# Build for production
npm run build:client

# Deploy (after git commit)
git add .
git commit -m "Add blog posts"
git push
```

---

## 🆘 Troubleshooting

### Post doesn't appear?
1. Check the date format: `YYYY-MM-DD`
2. Make sure you saved the file
3. Run `npm run generate:rss`
4. Restart dev server: `npm run dev:vite`

### RSS feed not updating?
1. Run `npm run generate:rss` manually
2. Check `client/public/blog/rss.xml` exists
3. Clear browser cache

### Build fails?
1. Check for syntax errors in `blogPosts.ts`
2. Make sure all posts have required fields
3. Check for missing commas between posts

---

## 💡 Pro Tips

1. **Write in batches:** Create 5-10 posts at once, then publish daily
2. **Use AI assistance:** Generate outlines, expand content, create variations
3. **Link internally:** Every post should link to simulator/formulas
4. **Use keywords naturally:** Don't stuff keywords, use them naturally
5. **Update old posts:** Refresh content periodically for SEO
6. **Create series:** "Understanding Orbits Part 1, 2, 3..." keeps readers engaged

---

## 📞 Need Help?

- Check `BLOG-CONTENT-GUIDE.md` for content strategy
- Check `BLOG-SYSTEM-README.md` for technical details
- Run `npm run generate:post` for template help

**Remember:** Consistency is key! Post daily to reach 1000 posts in 3 months! 🚀
