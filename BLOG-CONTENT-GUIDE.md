# Blog Content Generation Guide

## Goal: 1000 Pages in 3 Months

**Daily target:** ~11 posts per day (1000 ÷ 90 days)

## Content Categories

### 🚀 NASA News (Daily)
- Latest NASA mission updates
- James Webb Telescope discoveries
- Mars rover updates
- ISS activities
- SpaceX launches
- Artemis program updates
- Space station research

**Example titles:**
- "NASA's Perseverance Rover Finds [Discovery]"
- "James Webb Telescope Reveals [Finding]"
- "SpaceX Launches [Mission] to [Destination]"
- "ISS Astronauts Conduct [Experiment]"

### ⭐ Space Facts (Daily)
- Interesting orbital mechanics facts
- Satellite statistics
- Space history facts
- Physics facts
- Astronomy facts

**Example titles:**
- "How Many Satellites Orbit Earth?"
- "Why the Moon Doesn't Crash Into Earth"
- "Fastest Human-Made Object in Space"
- "How Long Does Light Take to Reach Earth?"

### 🛰️ Satellite Tutorials (Daily)
- How satellites work
- Different orbit types explained
- GPS explained
- Weather satellites
- Communication satellites
- Starlink explained

**Example titles:**
- "How GPS Satellites Work"
- "What is Low Earth Orbit (LEO)?"
- "How Weather Satellites Predict Storms"
- "Starlink: How It Works and Why It Matters"

### 🔭 Astronomy Lessons (Daily)
- Planet facts
- Star formation
- Black holes
- Galaxies
- Space phenomena
- Cosmology basics

**Example titles:**
- "How Stars Are Born"
- "What is a Black Hole?"
- "The Life Cycle of a Star"
- "Why Pluto Isn't a Planet"

## Content Template

```typescript
{
  slug: "descriptive-url-slug",
  title: "SEO-Friendly Title with Keywords",
  excerpt: "1-2 sentence description (150-200 chars)",
  content: `Full article content (300-1000+ words)

**Use formatting:**
- Bold for emphasis
- Lists for clarity
- Links to internal pages: [Simulator](/simulator)
- Formulas: v = √(GM/r)

Include:
- Introduction
- Main content (3-5 sections)
- Examples
- Conclusion with call-to-action`,
  category: "nasa-news" | "space-facts" | "satellite-tutorials" | "astronomy-lessons",
  date: "YYYY-MM-DD",
  tags: ["tag1", "tag2", "tag3"],
  seoKeywords: "keyword1, keyword2, keyword3",
}
```

## SEO Best Practices

1. **Title:** Include primary keyword, keep under 60 chars
2. **Excerpt:** Include keywords, 150-200 characters
3. **Content:** 300-1000+ words, use keywords naturally
4. **Internal Links:** Link to /simulator, /formulas-library, /satellites, etc.
5. **Tags:** 3-5 relevant tags
6. **Keywords:** 5-10 SEO keywords

## Quick Generation Script

Run: `node scripts/generate-blog-post.js`

This generates a template you can fill in.

## Batch Creation Tips

1. **Create weekly themes:**
   - Week 1: Focus on LEO satellites
   - Week 2: Focus on NASA missions
   - Week 3: Focus on orbital mechanics
   - Week 4: Focus on astronomy

2. **Repurpose content:**
   - Turn simulator features into tutorials
   - Expand formula explanations into full posts
   - Convert FAQs into articles

3. **Use AI assistance:**
   - Generate outlines
   - Expand bullet points
   - Create variations

4. **Link strategy:**
   - Every post links to simulator
   - Link to related formulas
   - Cross-link between posts

## Monetization Ideas

Once traffic grows:
- Google AdSense
- Affiliate links (space books, telescopes)
- Premium courses
- Sponsored content
- App downloads

## Tracking Progress

- Week 1: 77 posts (11/day)
- Week 2: 154 posts total
- Week 3: 231 posts total
- ...
- Week 13: 1000+ posts

## Example Daily Schedule

**Morning (NASA News):**
- Check NASA.gov for latest updates
- Write 1-2 news posts

**Afternoon (Tutorials):**
- Write 2-3 tutorial posts
- Focus on one topic (e.g., GPS satellites)

**Evening (Facts & Lessons):**
- Write 2-3 fact posts
- Write 2-3 astronomy lesson posts

**Total: 7-10 posts/day = 1000 posts in ~3 months**
