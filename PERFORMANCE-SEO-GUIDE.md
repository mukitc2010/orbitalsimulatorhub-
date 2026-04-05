# Performance & SEO Guide — Orbital Simulator Hub

## Part 1: Using Search Console Performance

### What to Check Weekly

| Tab | What to Do |
|-----|------------|
| **Queries** | See which search terms show your site. Add these to page titles/descriptions. |
| **Pages** | Find top pages by impressions. Improve titles for low-CTR pages. |
| **Countries** | See where traffic comes from (e.g. Africa, US). |
| **Devices** | Mobile vs desktop — optimize for the majority. |

### Quick Wins from Performance Data

1. **Low impressions** → Add content around those topics; improve internal links.
2. **High impressions, low clicks** → Rewrite titles and meta descriptions to be more compelling.
3. **Position 11–20** → Small content/title tweaks can move you to page 1.
4. **Position 4–10** → Focus on CTR: better titles, snippets, featured-snippet-style content.

### Request Indexing for New/Updated Pages

1. URL Inspection → paste URL
2. Click **Request indexing**
3. Use sparingly (a few URLs per day)

---

## Part 2: Your Current SEO Setup (Strong)

| Item | Status |
|------|--------|
| Meta title, description, keywords | ✅ |
| Canonical URL | ✅ |
| Hreflang (en, en-US, en-ZA, en-NG, en-KE) | ✅ |
| Open Graph & Twitter Cards | ✅ |
| Google verification | ✅ |
| Sitemap (106 pages) | ✅ Success |
| robots.txt | ✅ |
| FAQ schema | ✅ 15+ questions |
| Organization, WebSite, HowTo, Breadcrumb | ✅ |
| Static SEO content (no-JS fallback) | ✅ |
| RSS feed | ✅ |

---

## Part 3: Actionable SEO Improvements

### A. Titles & Descriptions (Use Performance Queries)

When you see queries in Performance (e.g. "orbital mechanics simulator", "how fast ISS orbit"):

1. Open `client/src/data/seo-config.ts`
2. Update the relevant page's `title` and `description` to include that query naturally.
3. Keep titles under 60 characters, descriptions under 155.

### B. Add `lastmod` to More Sitemap URLs

Google uses `lastmod` for crawl priority. Add it to key pages in `client/public/sitemap.xml`:

```xml
<url>
  <loc>https://www.orbitalsimulatorhub.com/simulator</loc>
  <lastmod>2026-02-20</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.95</priority>
</url>
```

### C. Core Web Vitals

1. Search Console → **Experience** → Core Web Vitals
2. Fix any URLs with "Poor" LCP, INP, or CLS.
3. Typical fixes: optimize images, reduce JS, avoid layout shifts.

### D. Ensure og-image.png Exists

- Path: `client/public/og-image.png`
- Size: 1200×630 px
- Used for social sharing and rich results.

### E. Internal Linking

- Link from high-traffic pages to newer or underperforming pages.
- Use descriptive anchor text (e.g. "orbital mechanics simulator" instead of "click here").

### F. Blog Posts

- Add new posts regularly.
- Each post should have a unique title, description, and H1.
- Link from homepage and related pages.

---

## Part 4: Workflow

1. **Weekly**: Check Performance → Queries and Pages.
2. **Monthly**: Update `seo-config.ts` for top queries; add `lastmod` to changed pages in sitemap.
3. **After changes**: Request indexing for 2–3 important URLs.
4. **Quarterly**: Review Core Web Vitals and fix any regressions.

---

## Files to Edit

| Task | File |
|------|------|
| Page titles/descriptions | `client/src/data/seo-config.ts` |
| Sitemap | `client/public/sitemap.xml` |
| Homepage meta (static) | `client/index.html` |
| robots.txt | `client/public/robots.txt` |
