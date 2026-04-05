# 🔄 N8N Guide: Update Blog Posts & SEO

## 🎯 What This Does

**Two n8n workflows to automatically:**
1. ✅ **Update existing blog posts** - Improve SEO, refresh content
2. ✅ **Update SEO meta tags** - Optimize pages like `/learn/aerospace#phd` for Google

---

## 📋 Prerequisites

1. ✅ API server running: `npm run dev:api`
2. ✅ n8n installed and running
3. ✅ Blog API accessible: `http://localhost:3001/api/blog`
4. ✅ SEO API accessible: `http://localhost:3001/api/seo`

---

## 🚀 Workflow 1: Update Blog Posts

### Purpose
Automatically update existing blog posts to improve SEO, refresh keywords, and optimize content.

### Setup Steps

1. **Import Workflow:**
   - In n8n, click **"Workflows"** → **"Import from File"**
   - Select: `n8n/workflows/update-blog-post.json`

2. **Configure:**
   - Open the workflow
   - Edit **"Generate Updates"** node:
     - Update `slug` to the post you want to update
     - Modify title, excerpt, keywords as needed

3. **Schedule:**
   - Default: Runs weekly (every 168 hours)
   - Change in **"Schedule Trigger"** node if needed

4. **Activate:**
   - Toggle **"Active"** switch ON

### API Endpoint Used
```
PUT http://localhost:3001/api/blog/posts/:slug
```

### Example Update
```json
{
  "slug": "how-iss-orbits-earth-16-times-daily",
  "title": "How the ISS Orbits Earth 16 Times Daily - Updated 2026",
  "excerpt": "Updated description with better SEO keywords...",
  "seoKeywords": "ISS orbit, space station facts, orbital mechanics 2026"
}
```

---

## 🚀 Workflow 2: Update SEO for Pages

### Purpose
Automatically update SEO meta tags for pages like `/learn/aerospace#phd` to improve Google rankings.

### Setup Steps

1. **Import Workflow:**
   - In n8n, click **"Workflows"** → **"Import from File"**
   - Select: `n8n/workflows/update-seo-pages.json`

2. **Configure:**
   - Open the workflow
   - Edit **"Generate SEO Updates"** node:
     - Modify pages array to include your pages
     - Update SEO data (title, description, keywords)

3. **Schedule:**
   - Default: Runs weekly (every 168 hours)
   - Change in **"Schedule Trigger"** node if needed

4. **Activate:**
   - Toggle **"Active"** switch ON

### API Endpoint Used
```
PUT http://localhost:3001/api/seo/config
```

### Example Update for `/learn/aerospace#phd`
```json
{
  "path": "/learn/aerospace",
  "title": "Aerospace & NASA Reference | Orbital Simulator Hub — PhD Research Resources 2026",
  "description": "Comprehensive aerospace reference for PhD researchers: NASA missions, Newton laws, orbital mechanics algorithms, rover calculations, NTRS, SPICE, Horizons. Updated 2026.",
  "keywords": "aerospace PhD research, NASA reference PhD, orbital mechanics algorithms, aerospace calculations PhD, NASA NTRS, SPICE toolkit, JPL Horizons",
  "ogTitle": "Aerospace & NASA Reference — PhD Research Resources",
  "ogDescription": "PhD-level aerospace reference: NASA missions, algorithms, calculations, and research resources."
}
```

---

## 🎛️ Customize Workflows

### Update More Frequently

**For Blog Posts:**
- Change `hoursInterval: 168` to `hoursInterval: 24` (daily)
- Or `hoursInterval: 72` (every 3 days)

**For SEO:**
- Change `hoursInterval: 168` to `hoursInterval: 336` (bi-weekly)
- Or `hoursInterval: 720` (monthly)

### Update Multiple Pages

Edit **"Generate SEO Updates"** node to update multiple pages:

```javascript
const pages = [
  { path: '/learn/aerospace', ... },
  { path: '/simulator', ... },
  { path: '/blog', ... },
  { path: '/formulas-library', ... },
  // Add more pages
];

// Update all pages
return pages.map(page => ({ json: page }));
```

Then add a **"Split In Batches"** node before **"Update SEO Config"** to process each page.

---

## ✅ Verify Updates

### Check Blog Post Update:
```bash
curl http://localhost:3001/api/blog/posts/your-slug
```

### Check SEO Update:
```bash
curl http://localhost:3001/api/seo/config/learn/aerospace
```

### Check Files:
- Blog posts: `client/src/data/blogPosts.ts`
- SEO config: `client/src/data/seo-config.ts`

---

## 🔍 How It Works

### Blog Post Updates:
1. **Schedule Trigger** → Runs weekly
2. **Generate Updates** → Creates update data with improved SEO
3. **Update Blog Post** → PUT request to `/api/blog/posts/:slug`
4. **Result:** Post updated with better SEO

### SEO Updates:
1. **Schedule Trigger** → Runs weekly
2. **Generate SEO Updates** → Creates optimized meta tags
3. **Update SEO Config** → PUT request to `/api/seo/config`
4. **Result:** Page SEO improved for Google

---

## 📊 Expected Results

### Blog Posts:
- ✅ Titles optimized with keywords
- ✅ Descriptions improved for SEO
- ✅ Keywords refreshed
- ✅ Content updated periodically

### SEO Pages:
- ✅ Meta titles optimized
- ✅ Descriptions improved
- ✅ Keywords updated
- ✅ Open Graph tags optimized

**Result:** Better Google rankings! 🎉

---

## 🆘 Troubleshooting

### API Not Responding
- Check API server: `npm run dev:api`
- Verify endpoints: `http://localhost:3001/api/blog/health`

### Updates Not Saving
- Check file permissions
- Verify file paths in API code
- Check n8n execution logs

### Workflow Errors
- Check n8n execution logs
- Verify API responses
- Test endpoints manually with curl

---

## 📚 API Endpoints Reference

### Blog API:
- `GET /api/blog/posts` - List all posts
- `GET /api/blog/posts/:slug` - Get post by slug
- `POST /api/blog/posts` - Create new post
- `PUT /api/blog/posts/:slug` - Update existing post

### SEO API:
- `GET /api/seo/config/:path` - Get SEO config for page
- `PUT /api/seo/config` - Update SEO config

---

## 🎉 You're All Set!

Once workflows are activated:
- ✅ Blog posts update automatically
- ✅ SEO optimizes automatically
- ✅ Google rankings improve over time

**Your site will continuously improve its SEO!** 🚀
