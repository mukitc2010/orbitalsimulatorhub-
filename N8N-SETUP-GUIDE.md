# 🚀 N8N Auto-Posting Setup Guide

## What This Does

n8n will automatically:
- ✅ Generate blog posts daily (11 posts/day)
- ✅ Post them to your blog API
- ✅ Update RSS feeds
- ✅ Optimize SEO automatically
- ✅ Schedule content publishing

**Result:** 1000+ posts in 3 months with ZERO manual work!

---

## 📋 Prerequisites

1. **Node.js installed** (you already have this)
2. **n8n installed** (see installation below)
3. **Your API server running** (port 3001)

---

## 🔧 Step 1: Install n8n

### Option A: Install Globally (Recommended)
```bash
npm install -g n8n
```

### Option B: Install Locally
```bash
npm install n8n --save-dev
```

### Option C: Use Docker
```bash
docker run -it --rm \
  --name n8n \
  -p 5678:5678 \
  -v ~/.n8n:/home/node/.n8n \
  n8nio/n8n
```

---

## 🚀 Step 2: Start n8n

### If installed globally:
```bash
n8n start
```

### If installed locally:
```bash
npx n8n start
```

### Access n8n:
Open browser: `http://localhost:5678`

---

## 📝 Step 3: Import Workflows

### Method 1: Import from Files

1. Open n8n: `http://localhost:5678`
2. Click **"Workflows"** → **"Import from File"**
3. Import these files:
   - `n8n/workflows/auto-blog-posting.json` (Basic auto-posting)
   - `n8n/workflows/ai-content-generator.json` (AI-powered, requires OpenAI API key)

### Method 2: Manual Setup

See workflow details below.

---

## ⚙️ Step 4: Configure Workflows

### Workflow 1: Basic Auto-Posting

**What it does:** Generates posts every 24 hours using templates

**Setup:**
1. Open workflow: "Auto Blog Posting - Daily Content"
2. Edit **"Post to Blog API"** node:
   - URL: `http://localhost:3001/api/blog/posts`
   - Method: POST
   - Body: JSON (see below)
3. Edit **"Update RSS Feed"** node:
   - Command: `cd /path/to/your/project && npm run generate:rss`
   - Update path to your project directory

**Body JSON:**
```json
{
  "slug": "={{$json.slug}}",
  "title": "={{$json.title}}",
  "excerpt": "={{$json.excerpt}}",
  "content": "={{$json.content}}",
  "category": "={{$json.category}}",
  "date": "={{$json.date}}",
  "tags": "={{$json.tags}}",
  "seoKeywords": "={{$json.seoKeywords}}"
}
```

### Workflow 2: AI Content Generator (Optional)

**What it does:** Uses OpenAI to generate high-quality posts every 2 hours

**Setup:**
1. Get OpenAI API key: https://platform.openai.com/api-keys
2. In n8n, go to **Credentials** → **Add Credential** → **OpenAI**
3. Enter your API key
4. Open workflow: "AI Content Generator"
5. Connect OpenAI credential to the "OpenAI Generate" node
6. Configure schedule (default: every 2 hours)

---

## 🎯 Step 5: Start Your API Server

Make sure your blog API is running:

```bash
npm run dev:api
```

Or if using the full server:
```bash
npm run dev
```

The API should be available at: `http://localhost:3001/api/blog`

---

## ✅ Step 6: Test the Workflow

1. In n8n, click **"Execute Workflow"** on your workflow
2. Check the execution log
3. Verify post was added:
   - Check `client/src/data/blogPosts.ts`
   - Visit `http://localhost:5173/blog` (if dev server running)

---

## 🔄 Step 7: Activate Workflows

1. Toggle **"Active"** switch on each workflow
2. Workflows will now run automatically on schedule!

---

## 📊 Monitoring

### Check Workflow Executions:
- n8n Dashboard → **Executions** tab
- See success/failure logs
- View generated content

### Check Blog Posts:
```bash
# Count posts
grep -c "slug:" client/src/data/blogPosts.ts

# View latest posts
tail -n 50 client/src/src/data/blogPosts.ts
```

---

## 🎛️ Advanced Configuration

### Change Post Frequency

Edit **Schedule Trigger** node:
- **Every 2 hours:** `hoursInterval: 2`
- **Every 6 hours:** `hoursInterval: 6`
- **Daily:** `hoursInterval: 24`
- **Multiple times per day:** Create multiple workflows

### Add More Content Sources

1. **RSS Feeds:** Add "RSS Read" node to fetch NASA news
2. **Web Scraping:** Add "HTML Extract" node to scrape space news sites
3. **APIs:** Add HTTP Request nodes to fetch from space APIs

### Customize Content Generation

Edit **"Generate Content"** node JavaScript:
- Add more topics
- Customize templates
- Add more categories

---

## 🚨 Troubleshooting

### API Connection Failed
- **Check:** Is API server running? (`npm run dev:api`)
- **Check:** Is URL correct? (`http://localhost:3001/api/blog/posts`)
- **Fix:** Start API server first

### Posts Not Appearing
- **Check:** API response in n8n execution log
- **Check:** File permissions on `blogPosts.ts`
- **Fix:** Ensure API has write access

### RSS Not Updating
- **Check:** Command path in "Update RSS Feed" node
- **Check:** `npm run generate:rss` works manually
- **Fix:** Update path to absolute path

### OpenAI Errors
- **Check:** API key is valid
- **Check:** You have credits in OpenAI account
- **Fix:** Add funds to OpenAI account

---

## 📈 Expected Results

### With Basic Workflow:
- **1 post per day** = 90 posts in 3 months
- **4 posts per day** = 360 posts in 3 months

### With AI Workflow (every 2 hours):
- **12 posts per day** = 1,080 posts in 3 months ✅

### Combined:
- **15+ posts per day** = 1,350+ posts in 3 months 🎉

---

## 🔐 Security Notes

1. **API Authentication:** Add API key to blog API endpoints
2. **n8n Credentials:** Store API keys securely in n8n credentials
3. **Rate Limiting:** Add rate limiting to prevent spam
4. **Content Review:** Review auto-generated content before publishing

---

## 📚 Next Steps

1. ✅ Set up n8n
2. ✅ Import workflows
3. ✅ Configure schedules
4. ✅ Activate workflows
5. ✅ Monitor executions
6. ✅ Deploy to production
7. ✅ Set up monitoring/alerts

---

## 🆘 Need Help?

- **n8n Docs:** https://docs.n8n.io
- **n8n Community:** https://community.n8n.io
- **Check logs:** n8n execution logs show detailed errors

---

## 🎉 You're Done!

Once set up, n8n will automatically:
- Generate posts daily
- Post to your blog
- Update RSS feeds
- Optimize SEO

**You can literally sit back and watch your blog grow to 1000+ posts!** 🚀
