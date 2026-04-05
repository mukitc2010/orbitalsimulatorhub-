# 🚀 START HERE: How to Add Blog Posts

## The Simplest Way (3 Steps)

### ✅ Step 1: Open This File
```
client/src/data/blogPosts.ts
```

### ✅ Step 2: Copy & Paste This Template

Find the line that says `export const BLOG_POSTS: BlogPost[] = [` and add this AFTER the last post (before the closing `];`):

```typescript
  {
    slug: "your-post-title-here",
    title: "Your Post Title Here",
    excerpt: "One sentence describing your post. This appears in search results.",
    content: `Write your article here. 300-1000 words.

**Use formatting:**
- Bullet points
- **Bold text**
- [Links](/simulator)

Always link to:
- [Simulator](/simulator)
- [Formulas](/formulas-library)
- [Satellites](/satellites)`,
    category: "nasa-news",
    date: "2026-02-15",
    tags: ["NASA", "space"],
    seoKeywords: "nasa, space, orbital mechanics",
  },
```

### ✅ Step 3: Fill It In

Replace the template with your real content. Example:

```typescript
  {
    slug: "mars-rover-finds-water-2026",
    title: "Mars Rover Discovers Ancient Water Evidence",
    excerpt: "NASA's Perseverance rover finds signs of ancient water on Mars, suggesting the planet may have once supported life.",
    content: `NASA's Perseverance rover has made a groundbreaking discovery: evidence of ancient water on Mars.

**The Discovery:**
The rover found mineral deposits that form only in the presence of liquid water, dating back billions of years.

**What This Means:**
This suggests Mars may have once had oceans and rivers, making it potentially habitable.

**Try it yourself:**
Learn about [orbital mechanics](/learn/orbital-mechanics) and how rovers reach Mars using our [simulator](/simulator).`,
    category: "nasa-news",
    date: "2026-02-15",
    tags: ["NASA", "Mars", "Perseverance", "water"],
    seoKeywords: "mars rover, nasa mars, perseverance rover, mars water",
  },
```

---

## 🎯 Choose Your Category

Pick ONE:
- `"nasa-news"` - NASA missions, SpaceX launches
- `"space-facts"` - Interesting space facts
- `"satellite-tutorials"` - How satellites work
- `"astronomy-lessons"` - Stars, planets, galaxies

---

## 📅 Set the Date

Use today's date: `"2026-02-15"` (format: YYYY-MM-DD)

---

## 🔄 After Adding Your Post

### Option A: Update RSS (Recommended)
```bash
npm run generate:rss
```

### Option B: Just Build & Deploy
```bash
npm run build:client
git add .
git commit -m "Add blog post"
git push
```

---

## 📚 Need More Help?

- **Detailed guide:** See `HOW-TO-ADD-BLOG-POSTS.md`
- **Visual example:** See `QUICK-START-EXAMPLE.md`
- **Content ideas:** See `BLOG-CONTENT-GUIDE.md`

---

## ⚡ Quick Tips

1. **Write 300+ words** - Better for SEO
2. **Link internally** - Link to /simulator, /formulas-library
3. **Use keywords** - Include terms people search for
4. **Add tags** - 3-5 relevant tags
5. **Save & deploy** - That's it!

---

## 🎯 Daily Goal: 11 Posts

To reach 1000 posts in 3 months:
- Morning: 3 NASA news posts
- Afternoon: 4 tutorial/fact posts  
- Evening: 4 astronomy lesson posts

**Total: 11 posts/day = 1000 posts in 90 days!**

---

## ✅ Checklist

Before you finish:
- [ ] Added comma after previous post
- [ ] Slug is lowercase with hyphens
- [ ] Title is descriptive
- [ ] Content is 300+ words
- [ ] Includes 2+ internal links
- [ ] Date is today
- [ ] Tags added
- [ ] Saved file
- [ ] Ran `npm run generate:rss` (optional)

---

**That's it! Your post will appear on `/blog` automatically!** 🎉
