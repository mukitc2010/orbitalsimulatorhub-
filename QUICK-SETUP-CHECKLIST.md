# ✅ Quick Setup Checklist - n8n Auto-Updates

## 🔐 Step 1: Add OpenAI API Key to n8n

1. **Open n8n:** http://localhost:5678
2. **Go to:** Credentials (left sidebar)
3. **Click:** "Add Credential" or "+"
4. **Search:** "OpenAI"
5. **Select:** "OpenAI API"
6. **Paste your API key** in the "API Key" field
7. **Click:** "Save"

✅ **Done!** Your API key is now configured.

---

## 📥 Step 2: Import Workflows

### Import Research Content Workflow:

1. **Click:** Workflows → "+" → "Import from File"
2. **Navigate to:** `n8n/workflows/auto-research-content.json`
3. **Select:** `auto-research-content.json`
4. **Click:** Import
5. **Save:** Press Ctrl+S
6. **Activate:** Toggle switch to ON (Active)

### Import Blog Workflow:

1. **Click:** Workflows → "+" → "Import from File"
2. **Navigate to:** `n8n/workflows/ai-topic-generator.json`
3. **Select:** `ai-topic-generator.json`
4. **Click:** Import
5. **Save:** Press Ctrl+S
6. **Activate:** Toggle switch to ON (Active)

---

## 🚀 Step 3: Start API Server

**Open a terminal/command prompt:**

```bash
cd "C:\Users\mukit\OneDrive\Desktop\nasaArchitech\satellite_simulator_web"
npm run dev:api
```

**Keep this terminal open!** The API server must be running for workflows to work.

**Verify it's running:**
- Open browser: http://localhost:3001/api/research/health
- Should see: `{"status":"ok","service":"research-content-api"}`

---

## ✅ Step 4: Verify Everything

### Check Your Workflows:

You should see **3 workflows** in n8n:
1. ✅ Auto Blog Posting - Daily Content
2. ✅ Auto-Generate Research Content Daily
3. ✅ AI Topic Generator - Blog Posts & AstroBot Knowledge

**All should show "Active" status!**

### Test Workflows (Optional):

1. Open a workflow
2. Click "Execute Workflow" button
3. Watch it run
4. Check your website for new content

---

## 🎯 What Happens Next

Once everything is set up:

- ✅ **Research tab** will update **daily** with new research content
- ✅ **Blog** will update **daily** with new blog posts
- ✅ **AstroBot** will get new knowledge daily
- ✅ Everything **auto-deploys** to your live site!

**Workflows run automatically every 24 hours!**

---

## 🔒 Security Reminder

⚠️ **Important:** Your OpenAI API key is sensitive!

- ✅ Keep it private
- ✅ Don't share it publicly
- ✅ Don't commit it to git
- ✅ Only use it in n8n credentials (secure storage)

If you shared it publicly, consider:
- Regenerating a new key at: https://platform.openai.com/api-keys
- Revoking the old one

---

## 📊 Summary Checklist

- [ ] ✅ OpenAI API key added to n8n credentials
- [ ] ✅ Research Content workflow imported & activated
- [ ] ✅ Blog workflow imported & activated
- [ ] ✅ API server running (`npm run dev:api`)
- [ ] ✅ All workflows show "Active" status
- [ ] ✅ Tested workflows manually (optional)

**Once all checked ✅, your site will auto-update daily!** 🚀

---

## 🆘 Troubleshooting

**Workflow won't activate?**
- Check for errors (red nodes)
- Verify OpenAI credentials are set
- Make sure API server is running

**API errors?**
- Verify API server: http://localhost:3001/api/research/health
- Check API server logs
- Make sure port 3001 is not in use

**OpenAI errors?**
- Verify API key is correct
- Check you have credits/quota
- Check OpenAI dashboard: https://platform.openai.com/usage

---

**You're all set! Your website will now update automatically!** 🎉
