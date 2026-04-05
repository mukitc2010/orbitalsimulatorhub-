# ⚡ AUTO-POSTING QUICK START

## 🎯 What You Get

**Fully automated blog posting with n8n:**
- ✅ Posts generated automatically every 2-24 hours
- ✅ SEO optimized automatically
- ✅ RSS feeds updated automatically
- ✅ Zero manual work required
- ✅ 1000+ posts in 3 months

---

## 🚀 3-Step Setup

### Step 1: Install n8n
```bash
npm install -g n8n
```

### Step 2: Start n8n
```bash
n8n start
```
Open: `http://localhost:5678`

### Step 3: Import Workflow
1. In n8n, click **"Workflows"** → **"Import from File"**
2. Select: `n8n/workflows/auto-blog-posting.json`
3. Click **"Active"** toggle to enable

**That's it!** Posts will generate automatically! 🎉

---

## 🔧 Before Starting

### 1. Start Your API Server
```bash
npm run dev:api
```
API runs on: `http://localhost:3001/api/blog`

### 2. Test API Endpoint
```bash
curl http://localhost:3001/api/blog/health
```
Should return: `{"status":"ok","service":"blog-api"}`

---

## 📊 How It Works

1. **n8n Schedule Trigger** → Runs every 24 hours (configurable)
2. **Generate Content** → Creates blog post with title, content, SEO
3. **Post to Blog API** → Sends POST request to `/api/blog/posts`
4. **Update RSS Feed** → Runs `npm run generate:rss`

**Result:** New post appears on `/blog` automatically!

---

## 🎛️ Customize Schedule

### Post More Frequently:
Edit **Schedule Trigger** node in n8n:
- **Every 2 hours:** Change `hoursInterval: 24` to `hoursInterval: 2`
- **Every 6 hours:** Change to `hoursInterval: 6`
- **Multiple times per day:** Create multiple workflows

### Post Categories:
Edit **Generate Content** node to customize:
- Topics
- Categories
- Content templates

---

## 🤖 AI-Powered Option (Optional)

For higher quality posts:

1. Get OpenAI API key: https://platform.openai.com/api-keys
2. Import: `n8n/workflows/ai-content-generator.json`
3. Add OpenAI credential in n8n
4. Activate workflow

**Result:** AI-generated posts every 2 hours!

---

## ✅ Verify It's Working

### Check n8n Executions:
- n8n Dashboard → **Executions** tab
- See workflow runs and results

### Check Blog Posts:
```bash
# Count posts
grep -c "slug:" client/src/data/blogPosts.ts

# View latest
tail -n 100 client/src/data/blogPosts.ts
```

### Check Blog Page:
Visit: `http://localhost:5173/blog`

---

## 🚨 Troubleshooting

### "API Connection Failed"
- ✅ Start API: `npm run dev:api`
- ✅ Check URL: `http://localhost:3001/api/blog/posts`

### "Posts Not Appearing"
- ✅ Check n8n execution logs
- ✅ Verify API response
- ✅ Check file permissions

### "RSS Not Updating"
- ✅ Update path in "Update RSS Feed" node
- ✅ Use absolute path: `/full/path/to/project`

---

## 📈 Expected Results

### Basic Workflow (24h):
- **1 post/day** = 90 posts in 3 months

### AI Workflow (2h):
- **12 posts/day** = 1,080 posts in 3 months ✅

### Combined:
- **15+ posts/day** = 1,350+ posts in 3 months 🎉

---

## 📚 Full Documentation

See `N8N-SETUP-GUIDE.md` for detailed instructions.

---

## 🎉 You're Done!

**n8n will now automatically:**
- Generate posts daily
- Post to your blog
- Update RSS feeds
- Optimize SEO

**Sit back and watch your blog grow!** 🚀
