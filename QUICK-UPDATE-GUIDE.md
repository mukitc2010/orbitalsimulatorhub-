# ⚡ Quick Guide: Update Blog Posts & SEO with n8n

## 🎯 What You Can Do Now

**Two new n8n workflows:**
1. ✅ **Update Blog Posts** - Automatically improve SEO of existing posts
2. ✅ **Update SEO Pages** - Automatically optimize pages like `/learn/aerospace#phd`

---

## 🚀 Quick Setup (3 Steps)

### Step 1: Restart API Server
```bash
npm run dev:api
```

You should see:
```
Blog API at http://localhost:3001/api/blog
SEO API at http://localhost:3001/api/seo
```

### Step 2: Import Workflows in n8n

**Workflow 1 - Update Blog Posts:**
1. In n8n: **Workflows** → **Import from File**
2. Select: `n8n/workflows/update-blog-post.json`
3. Edit **"Generate Updates"** node - set the `slug` of post to update
4. Toggle **Active** ON

**Workflow 2 - Update SEO:**
1. In n8n: **Workflows** → **Import from File**
2. Select: `n8n/workflows/update-seo-pages.json`
3. Edit **"Generate SEO Updates"** node - customize pages/SEO data
4. Toggle **Active** ON

### Step 3: Test It

**Test Blog Update:**
```bash
curl -X PUT http://localhost:3001/api/blog/posts/your-slug \
  -H "Content-Type: application/json" \
  -d '{"slug":"your-slug","title":"Updated Title","excerpt":"Updated excerpt"}'
```

**Test SEO Update:**
```bash
curl -X PUT http://localhost:3001/api/seo/config \
  -H "Content-Type: application/json" \
  -d '{"path":"/learn/aerospace","title":"New Title","description":"New description"}'
```

---

## 📝 Example: Update `/learn/aerospace#phd` SEO

**In n8n workflow "Update SEO for Pages":**

Edit **"Generate SEO Updates"** node:

```javascript
{
  path: '/learn/aerospace',
  title: 'Aerospace & NASA Reference | PhD Research Resources 2026',
  description: 'Comprehensive aerospace reference for PhD researchers: NASA missions, algorithms, calculations, NTRS, SPICE, Horizons.',
  keywords: 'aerospace PhD, NASA reference PhD, orbital mechanics algorithms PhD, aerospace research resources',
  ogTitle: 'Aerospace & NASA Reference — PhD Resources',
  ogDescription: 'PhD-level aerospace reference with NASA missions, algorithms, and research tools.'
}
```

**Result:** Page SEO automatically updates weekly! 🎉

---

## 📊 What Happens

### Blog Post Updates:
- ✅ Runs weekly (configurable)
- ✅ Updates title, excerpt, keywords
- ✅ Improves SEO automatically

### SEO Page Updates:
- ✅ Runs weekly (configurable)
- ✅ Updates meta tags for pages
- ✅ Optimizes for Google rankings

---

## 🎛️ Customize Schedule

**More frequent updates:**
- Change `hoursInterval: 168` to `hoursInterval: 24` (daily)
- Or `hoursInterval: 72` (every 3 days)

**Less frequent:**
- Change to `hoursInterval: 336` (bi-weekly)
- Or `hoursInterval: 720` (monthly)

---

## ✅ Verify It Works

**Check API:**
- Blog API: http://localhost:3001/api/blog/health
- SEO API: http://localhost:3001/api/seo/health

**Check Files:**
- Blog posts: `client/src/data/blogPosts.ts`
- SEO config: `client/src/data/seo-config.ts`

---

## 📚 Full Documentation

See `N8N-UPDATE-GUIDE.md` for detailed instructions.

---

## 🎉 Done!

**Your workflows will now:**
- ✅ Update blog posts automatically
- ✅ Optimize SEO automatically
- ✅ Improve Google rankings over time

**Just import the workflows and activate them!** 🚀
