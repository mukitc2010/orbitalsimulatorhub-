# n8n Workflow Setup Guide

## 🎯 Goal: Automatically Update Research Tab & Blog Daily

You have **13 workflow files** but only **1 workflow** is showing in n8n. You need to import the others!

---

## 📋 Required Workflows for Auto-Updates

### 1. **Research Tab Auto-Update**
- **File:** `n8n/workflows/auto-research-content.json`
- **Name:** "Auto-Generate Research Content Daily"
- **What it does:** Generates research content daily, posts to Research tab
- **Schedule:** Every 24 hours

### 2. **Blog Auto-Update**
- **File:** `n8n/workflows/ai-topic-generator.json`
- **Name:** "AI Topic Generator - Blog Posts & AstroBot Knowledge"
- **What it does:** Generates blog posts daily, updates AstroBot
- **Schedule:** Every 24 hours

---

## 🚀 How to Import Workflows into n8n

### Step 1: Open n8n Dashboard
1. Go to: `http://localhost:5678`
2. Make sure you're logged in

### Step 2: Import Workflows
For each workflow file:

1. **Click "Workflows"** in the left sidebar
2. **Click "Import from File"** (or the "+" button → "Import from File")
3. **Select the workflow file:**
   - `n8n/workflows/auto-research-content.json` → Import
   - `n8n/workflows/ai-topic-generator.json` → Import
4. **Save** the workflow (Ctrl+S or click Save)

### Step 3: Activate Workflows
1. **Open each workflow**
2. **Toggle the switch** at the top right to **ON** (Active)
3. The workflow should show "Active" status

---

## ✅ Quick Import Steps

### Option A: Import One by One (Recommended)
1. In n8n, go to **Workflows**
2. Click **"Import from File"**
3. Navigate to: `n8n/workflows/auto-research-content.json`
4. Click **Import**
5. **Save** (Ctrl+S)
6. **Toggle ON** (activate)
7. Repeat for `ai-topic-generator.json`

### Option B: Import All at Once
1. In n8n, go to **Workflows**
2. Click **"Import from File"**
3. Select multiple files:
   - `auto-research-content.json`
   - `ai-topic-generator.json`
4. Import all
5. **Save each** workflow
6. **Activate each** workflow

---

## 🔧 Before Workflows Run: Prerequisites

### 1. API Server Must Be Running
The workflows call `http://localhost:3001/api/...`

**Start API server:**
```bash
npm run dev:api
# OR
npm run dev:3001
```

**Verify it's running:**
- Visit: `http://localhost:3001/api/research/health`
- Should return: `{"status":"ok","service":"research-content-api"}`

### 2. OpenAI API Key Configured
Workflows use OpenAI GPT-4. Make sure:
- OpenAI credentials are set in n8n
- Go to **Credentials** → **OpenAI**
- Add your API key

### 3. Git Configured
Workflows need to push to GitHub:
- Git must be configured with your credentials
- The path in workflows should match your system

---

## 📊 What Each Workflow Does

### Workflow 1: Auto-Generate Research Content Daily
**File:** `auto-research-content.json`

**Flow:**
1. ⏰ Triggers daily (every 24 hours)
2. 🎲 Selects random research topic
3. 🤖 Generates content using OpenAI GPT-4
4. 📝 Formats content for Research API
5. 🌐 Posts to `POST /api/research/content`
6. 💾 Commits & pushes to GitHub
7. 🚀 Vercel auto-deploys

**Result:** New research content appears in Research tab daily!

---

### Workflow 2: AI Topic Generator - Blog Posts
**File:** `ai-topic-generator.json`

**Flow:**
1. ⏰ Triggers daily (every 24 hours)
2. 🎲 Selects random blog category
3. 🤖 Generates blog post topics using OpenAI
4. 📝 Creates blog post content
5. 🌐 Posts to `POST /api/blog/posts`
6. 🤖 Also updates AstroBot knowledge
7. 💾 Commits & pushes to GitHub
8. 🚀 Vercel auto-deploys

**Result:** New blog posts appear daily!

---

## 🧪 Test Workflows Manually

Before waiting for automatic runs, test them:

1. **Open workflow** in n8n
2. **Click "Execute Workflow"** button
3. **Watch it run** step by step
4. **Check results:**
   - Research content: Check `/research` page
   - Blog post: Check `/blog` page

---

## 🔍 Troubleshooting

### Workflow Not Running?
- ✅ Check if workflow is **Active** (toggle ON)
- ✅ Check if **Schedule Trigger** is enabled
- ✅ Check **n8n logs** for errors

### API Errors?
- ✅ Make sure API server is running (`npm run dev:api`)
- ✅ Check API is accessible: `http://localhost:3001/api/research/health`
- ✅ Check API logs for errors

### Git Push Errors?
- ✅ Check git credentials are configured
- ✅ Check the path in workflow matches your system
- ✅ Try running git command manually first

### OpenAI Errors?
- ✅ Check OpenAI credentials in n8n
- ✅ Check API key is valid
- ✅ Check you have credits/quota

---

## 📝 Current Status

Based on your n8n dashboard:
- ✅ **1 workflow** imported: "Auto Blog Posting - Daily Content"
- ❌ **Missing:** "Auto-Generate Research Content Daily"
- ❌ **Missing:** "AI Topic Generator - Blog Posts & AstroBot Knowledge"

**Action needed:** Import the 2 missing workflows!

---

## 🎯 Summary

**To enable automatic updates:**

1. ✅ Import `auto-research-content.json` → **Research tab updates**
2. ✅ Import `ai-topic-generator.json` → **Blog updates**
3. ✅ Activate both workflows (toggle ON)
4. ✅ Make sure API server is running
5. ✅ Configure OpenAI credentials
6. ✅ Wait for daily automatic runs!

**Once set up:**
- Research tab will update **daily** with new content
- Blog will update **daily** with new posts
- Everything auto-deploys to your live site!

---

## 🚀 Quick Start Commands

```bash
# 1. Start API server (in one terminal)
npm run dev:api

# 2. Start n8n (in another terminal)
npx n8n start
# OR use your script:
npm run start:n8n

# 3. Open n8n dashboard
# Go to: http://localhost:5678

# 4. Import workflows
# Follow steps above

# 5. Activate workflows
# Toggle ON for each workflow
```

---

**Need help?** Check the workflow files in `n8n/workflows/` - they're all ready to import!
