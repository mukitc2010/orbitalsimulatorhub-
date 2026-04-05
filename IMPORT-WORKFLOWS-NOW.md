# 🚀 Import n8n Workflows - Step by Step Guide

## ✅ Goal: Import 2 Missing Workflows for Auto-Updates

You need to import:
1. **Auto-Generate Research Content Daily** → Updates Research tab
2. **AI Topic Generator - Blog Posts** → Updates Blog

---

## 📍 Step-by-Step Instructions

### **STEP 1: Open n8n Dashboard**

1. Make sure n8n is running:
   ```bash
   npx n8n start
   ```
   Or if you have a script:
   ```bash
   npm run start:n8n
   ```

2. Open your browser and go to:
   ```
   http://localhost:5678
   ```

3. Log in if needed

---

### **STEP 2: Import Research Content Workflow**

1. **Click "Workflows"** in the left sidebar (or top menu)

2. **Click the "+" button** (usually top right) or look for **"Import"** button

3. **Select "Import from File"** or **"Import Workflow"**

4. **Navigate to your project folder:**
   ```
   C:\Users\mukit\OneDrive\Desktop\nasaArchitech\satellite_simulator_web\n8n\workflows\
   ```

5. **Select this file:**
   ```
   auto-research-content.json
   ```

6. **Click "Open"** or **"Import"**

7. **The workflow will open** - you should see nodes like:
   - Schedule Trigger (Daily)
   - Select Research Topic
   - Generate Research Content
   - Format Research Content
   - Post Research Content
   - Git Commit & Push

8. **Save the workflow:**
   - Press **Ctrl+S** (Windows) or **Cmd+S** (Mac)
   - OR click **"Save"** button (usually top right)

9. **Activate the workflow:**
   - Look for a **toggle switch** at the top (usually says "Inactive" or "Active")
   - **Click it to turn it ON** (should turn green/blue)
   - The workflow should now show **"Active"**

10. **Verify:**
    - You should see "Auto-Generate Research Content Daily" in your workflows list
    - Status should show "Active"

---

### **STEP 3: Import Blog Workflow**

1. **Still in n8n**, click **"Workflows"** again

2. **Click "+"** or **"Import"** button

3. **Select "Import from File"**

4. **Navigate to the same folder:**
   ```
   C:\Users\mukit\OneDrive\Desktop\nasaArchitech\satellite_simulator_web\n8n\workflows\
   ```

5. **Select this file:**
   ```
   ai-topic-generator.json
   ```

6. **Click "Open"** or **"Import"**

7. **The workflow will open** - you should see nodes like:
   - Schedule Trigger (Daily)
   - Generate AI Prompt
   - OpenAI Generate Topics
   - Parse AI Topics
   - Post Blog to API
   - Generate AstroBot Knowledge
   - Update AstroBot Knowledge
   - Git Commit & Push

8. **Save the workflow:**
   - Press **Ctrl+S**
   - OR click **"Save"** button

9. **Activate the workflow:**
   - **Toggle the switch to ON** (Active)
   - Should show "Active" status

10. **Verify:**
    - You should see "AI Topic Generator - Blog Posts & AstroBot Knowledge" in workflows list
    - Status should show "Active"

---

## ✅ After Importing: Verify Everything

### Check Your Workflows List

You should now see **3 workflows**:

1. ✅ **Auto Blog Posting - Daily Content** (already had this)
2. ✅ **Auto-Generate Research Content Daily** (just imported)
3. ✅ **AI Topic Generator - Blog Posts & AstroBot Knowledge** (just imported)

All should show **"Active"** status!

---

## 🔧 Before Workflows Run: Setup Required

### 1. **Start API Server** (Required!)

The workflows need your API server running:

```bash
# Open a terminal/command prompt
cd "C:\Users\mukit\OneDrive\Desktop\nasaArchitech\satellite_simulator_web"

# Start API server
npm run dev:api
```

**Verify it's running:**
- Open browser: `http://localhost:3001/api/research/health`
- Should see: `{"status":"ok","service":"research-content-api"}`

### 2. **Configure OpenAI Credentials** (Required!)

Workflows use OpenAI GPT-4. You need to add your API key:

1. In n8n, go to **"Credentials"** (left sidebar)
2. Click **"Add Credential"**
3. Search for **"OpenAI"**
4. Click **"OpenAI API"**
5. Enter your **API Key**
6. Click **"Save"**

**Get OpenAI API Key:**
- Go to: https://platform.openai.com/api-keys
- Create new key if needed
- Copy the key

### 3. **Verify Git is Configured**

The workflows push to GitHub. Make sure:
- Git is installed
- Your GitHub credentials are configured
- The path in workflows matches your system

---

## 🧪 Test Workflows Manually

Before waiting for automatic runs, test them:

### Test Research Content Workflow:

1. Open **"Auto-Generate Research Content Daily"** workflow
2. Click **"Execute Workflow"** button (usually top right)
3. Watch it run step by step
4. Check if it succeeds
5. Visit your website: `/research` - should see new content!

### Test Blog Workflow:

1. Open **"AI Topic Generator - Blog Posts & AstroBot Knowledge"** workflow
2. Click **"Execute Workflow"** button
3. Watch it run
4. Check if it succeeds
5. Visit your website: `/blog` - should see new post!

---

## 📊 What Happens When Workflows Run

### Research Content Workflow (Daily):
1. ⏰ Triggers at scheduled time (every 24 hours)
2. 🎲 Picks random research topic
3. 🤖 Generates content using OpenAI
4. 📝 Formats for Research API
5. 🌐 Posts to `/api/research/content`
6. 💾 Commits & pushes to GitHub
7. 🚀 Vercel auto-deploys
8. ✅ **New content appears in Research tab!**

### Blog Workflow (Daily):
1. ⏰ Triggers at scheduled time (every 24 hours)
2. 🎲 Picks random blog category
3. 🤖 Generates blog post using OpenAI
4. 📝 Creates blog post content
5. 🌐 Posts to `/api/blog/posts`
6. 🤖 Updates AstroBot knowledge
7. 💾 Commits & pushes to GitHub
8. 🚀 Vercel auto-deploys
9. ✅ **New blog post appears!**

---

## 🔍 Troubleshooting

### Can't Find Import Button?
- Look for **"+"** button (top right)
- Or **"Add"** → **"Import"**
- Or try **"Workflows"** → **"Import Workflow"**

### Workflow Won't Save?
- Check if you're logged in
- Try refreshing the page
- Check browser console for errors

### Workflow Won't Activate?
- Make sure all nodes are connected properly
- Check for errors in workflow (red nodes)
- Verify credentials are set up

### API Errors When Testing?
- Make sure API server is running (`npm run dev:api`)
- Check API is accessible: `http://localhost:3001/api/research/health`
- Check API logs for errors

### OpenAI Errors?
- Verify OpenAI credentials are configured
- Check API key is valid
- Check you have credits/quota

---

## 📝 Quick Checklist

Before workflows can run automatically:

- [ ] ✅ Imported "Auto-Generate Research Content Daily"
- [ ] ✅ Imported "AI Topic Generator - Blog Posts"
- [ ] ✅ Both workflows are **Active** (toggled ON)
- [ ] ✅ API server is running (`npm run dev:api`)
- [ ] ✅ OpenAI credentials configured in n8n
- [ ] ✅ Git is configured
- [ ] ✅ Tested workflows manually (optional but recommended)

---

## 🎯 Summary

**What you need to do:**

1. ✅ **Import 2 workflows** (follow steps above)
2. ✅ **Activate them** (toggle ON)
3. ✅ **Start API server** (`npm run dev:api`)
4. ✅ **Configure OpenAI** (add API key in n8n)
5. ✅ **Wait for daily runs!**

**Result:**
- Research tab updates **daily** automatically
- Blog updates **daily** automatically
- Everything auto-deploys to your live site!

---

## 🆘 Need More Help?

If you get stuck:
1. Check n8n logs for errors
2. Verify API server is running
3. Test workflows manually first
4. Check workflow nodes for errors (red = error)

**The workflows are ready - just need to import and activate them!** 🚀
