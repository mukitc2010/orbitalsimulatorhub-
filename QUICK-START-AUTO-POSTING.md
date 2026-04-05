# 🚀 QUICK START - Auto-Posting Setup (5 Minutes)

## ✅ What You Have Now

1. ✅ **2 n8n workflows** (RSS + Ollama)
2. ✅ **Auto-deploy script**
3. ✅ **First daily blog post** (Artemis guide)

---

## ⚡ Quick Setup (5 Steps)

### **Step 1: Install Ollama** (2 min)

```bash
# Download from https://ollama.ai
# Or:
winget install Ollama.Ollama  # Windows
brew install ollama           # Mac

# Pull model:
ollama pull llama2
```

---

### **Step 2: Start API Server** (1 min)

```bash
cd satellite_simulator_web
npm run dev:api
```

**Keep this running!** It should show: `Server running on port 3003`

---

### **Step 3: Import Workflows to n8n** (1 min)

1. Open n8n (http://localhost:5678)
2. Click **"Workflows"** → **"Import from File"**
3. Import: `n8n/workflows/daily-rss-to-blog.json`
4. Import: `n8n/workflows/daily-ollama-research.json`

---

### **Step 4: Test One Workflow** (1 min)

1. In n8n, click **"Execute Workflow"** on "Daily RSS to Blog"
2. Watch it run (should take 30-60 seconds)
3. Check: New post should appear in `client/src/data/blogPosts.ts`

---

### **Step 5: Activate Workflows** (30 sec)

1. Toggle **"Active"** switch on both workflows
2. **Done!** They'll run automatically:
   - **9 AM:** RSS → Blog (1-2 posts)
   - **2 PM:** Ollama Research (1 post)

---

## 🎯 Expected Results

**Tomorrow:**
- 2-3 new blog posts automatically
- RSS feed updated
- Site rebuilt

**After 30 days:**
- 60-90 blog posts
- Google starts indexing
- Traffic begins

**After 60 days:**
- 120-180 blog posts
- Google rankings improve
- 100-500 visitors/day

---

## 🔧 Troubleshooting

**Ollama not working?**
```bash
ollama serve
ollama pull llama2
```

**API not responding?**
```bash
npm run dev:api
# Check: http://localhost:3003/api/blog/health
```

**Workflow fails?**
- Check Ollama is running
- Check API server is running
- Check file paths in workflow nodes

---

## 📝 Manual Posting (If Needed)

If workflows fail, post manually:

1. Edit `client/src/data/blogPosts.ts`
2. Add new post to array
3. Run: `npm run generate:rss`
4. Run: `npm run build:client`
5. Deploy

---

## ✅ You're Done!

Your site will now generate **2-3 posts per day automatically**.

**Next:** Let it run for a week, review quality, then share posts on social media for backlinks!

---

**Full guide:** See `SETUP-COMPLETE.md` for detailed instructions.
