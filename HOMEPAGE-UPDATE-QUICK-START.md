# ⚡ Quick Start: Update Homepage with n8n

## 🎯 What You Get

**Automatically update homepage SEO every week:**
- ✅ Fresh meta tags
- ✅ Updated keywords
- ✅ Current year in title
- ✅ Better Google rankings

---

## 🚀 3-Step Setup

### Step 1: Restart API
```bash
npm run dev:api
```

### Step 2: Import Workflow
1. In n8n: **Workflows** → **Import from File**
2. Select: `n8n/workflows/update-homepage-seo.json`
3. Toggle **Active** ON

### Step 3: Done!
Homepage updates automatically every week! 🎉

---

## 📝 What Gets Updated

**Homepage SEO automatically refreshes:**
- Title includes current year
- Description gets fresh keywords
- Keywords optimized for SEO
- Open Graph tags updated

**Result:** Better Google rankings! 📈

---

## ✅ Test It Now

**Update homepage SEO:**
```bash
curl -X PUT http://localhost:3001/api/seo/config \
  -H "Content-Type: application/json" \
  -d '{
    "path": "/",
    "title": "Orbital Simulator Hub | Updated 2026",
    "description": "Free interactive 3D satellite orbit simulator 2026...",
    "keywords": "orbital mechanics simulator 2026, free space simulator..."
  }'
```

**Update HTML file:**
```bash
curl -X POST http://localhost:3001/api/seo/update-html \
  -H "Content-Type: application/json" \
  -d '{"path": "/"}'
```

---

## 🎛️ Customize

**Edit workflow node "Generate Homepage SEO"** to customize:
- Title format
- Description content
- Keywords list
- Update frequency

---

## 📚 Full Guide

See `UPDATE-HOMEPAGE-GUIDE.md` for complete instructions.

---

**Your homepage will now stay fresh and optimized automatically!** 🚀
