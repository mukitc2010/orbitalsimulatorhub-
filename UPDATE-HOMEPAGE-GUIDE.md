# 🏠 Update Homepage with n8n

## 🎯 What This Does

**Automatically updates your homepage (https://www.orbitalsimulatorhub.com/) SEO:**
- ✅ Updates meta title
- ✅ Updates meta description  
- ✅ Updates keywords
- ✅ Updates Open Graph tags
- ✅ Updates HTML file directly
- ✅ Runs weekly automatically

---

## 🚀 Quick Setup (3 Steps)

### Step 1: Restart API Server
```bash
npm run dev:api
```

You should see:
```
SEO API at http://localhost:3001/api/seo
```

### Step 2: Import Workflow in n8n

1. In n8n: **Workflows** → **Import from File**
2. Select: `n8n/workflows/update-homepage-seo.json`
3. The workflow is pre-configured for homepage updates

### Step 3: Activate

1. Toggle **"Active"** switch ON
2. **Done!** Homepage SEO updates weekly automatically

---

## 📝 What Gets Updated

### Current Homepage SEO:
- **Title:** "Orbital Simulator Hub | orbitalsimulatorhub.com — Satellite Orbit Simulator & Space Learning"
- **Description:** "Orbital mechanics simulator and space physics for everyone..."
- **Keywords:** "orbital mechanics simulator, satellite orbit simulator..."

### After Update:
- **Title:** Includes current year (2026)
- **Description:** Updated with fresh keywords and current date
- **Keywords:** Enhanced with trending terms
- **Open Graph:** Optimized for social sharing

---

## 🎛️ Customize the Update

### Edit "Generate Homepage SEO" Node:

Change the SEO data:

```javascript
{
  path: '/',
  title: 'Your Custom Title 2026',
  description: 'Your custom description with keywords...',
  keywords: 'your, keywords, here',
  ogTitle: 'Your OG Title',
  ogDescription: 'Your OG Description'
}
```

### Change Update Frequency:

**More frequent:**
- Change `hoursInterval: 168` to `hoursInterval: 24` (daily)
- Or `hoursInterval: 72` (every 3 days)

**Less frequent:**
- Change to `hoursInterval: 336` (bi-weekly)
- Or `hoursInterval: 720` (monthly)

---

## ✅ Test It Manually

### Update SEO Config:
```bash
curl -X PUT http://localhost:3001/api/seo/config \
  -H "Content-Type: application/json" \
  -d '{
    "path": "/",
    "title": "Orbital Simulator Hub | Updated 2026",
    "description": "Updated description with fresh keywords...",
    "keywords": "updated, keywords, here"
  }'
```

### Update HTML File:
```bash
curl -X POST http://localhost:3001/api/seo/update-html \
  -H "Content-Type: application/json" \
  -d '{"path": "/"}'
```

---

## 🔍 Verify Updates

### Check SEO Config:
```bash
curl http://localhost:3001/api/seo/config/
```

### Check HTML File:
Open `client/index.html` and check:
- `<title>` tag
- `<meta name="description">` tag
- `<meta name="keywords">` tag
- `<meta property="og:title">` tag

---

## 📊 Expected Results

**Weekly automatic updates:**
- ✅ Fresh SEO keywords
- ✅ Updated year in title
- ✅ Current date in description
- ✅ Optimized for Google rankings
- ✅ Better social media sharing

**Result:** Improved Google rankings over time! 🎉

---

## 🆘 Troubleshooting

### API Not Responding
- Check API server: `npm run dev:api`
- Verify endpoint: `http://localhost:3001/api/seo/health`

### HTML Not Updating
- Check file permissions on `client/index.html`
- Verify SEO config exists for `/`
- Check n8n execution logs

### Workflow Errors
- Check n8n execution logs
- Verify API responses
- Test endpoints manually with curl

---

## 📚 API Endpoints

### SEO API:
- `GET /api/seo/health` - Health check
- `GET /api/seo/config/:path` - Get SEO config
- `PUT /api/seo/config` - Update SEO config
- `POST /api/seo/update-html` - Update HTML file

---

## 🎉 You're Done!

**Your homepage will now:**
- ✅ Update SEO automatically weekly
- ✅ Stay fresh with current year/keywords
- ✅ Improve Google rankings over time
- ✅ Optimize for social media sharing

**Just import the workflow and activate it!** 🚀

---

## 📝 Files Updated

- `client/index.html` - HTML meta tags
- `client/src/data/seo-config.ts` - SEO configuration
- Both updated automatically via n8n!
