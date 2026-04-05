# 🌐 How Auto-Deploy to Live Site Works

## 🎯 Simple Explanation

**Your workflow currently:**
1. ✅ Generates blog post
2. ✅ Saves to local file (`blogPosts.ts`)

**To update live site, we need:**
3. ✅ Commit to Git
4. ✅ Push to GitHub
5. ✅ Vercel auto-deploys (if connected)

**Result:** https://www.orbitalsimulatorhub.com/ updates automatically! 🎉

---

## 🔄 The Complete Flow

```
n8n Workflow
    ↓
Generate Blog Post
    ↓
Save to Local File (blogPosts.ts)
    ↓
Git Commit Changes          ← ADD THIS STEP
    ↓
Push to GitHub              ← ADD THIS STEP
    ↓
Vercel Detects Change       ← AUTOMATIC!
    ↓
Vercel Builds & Deploys     ← AUTOMATIC!
    ↓
Live Site Updates!          ← RESULT!
```

---

## ✅ Quick Setup (3 Steps)

### Step 1: Verify Vercel is Connected

1. Go to https://vercel.com/dashboard
2. Open your project
3. Check **Settings** → **Git**
4. Should show GitHub repo connected ✅

**If not connected:**
- Connect GitHub repo in Vercel
- Enable auto-deployment

### Step 2: Add Git Step to Workflow

**In n8n workflow, add "Execute Command" node:**

1. After "Post to Blog API" node
2. Add new node: **Execute Command**
3. Configure:
   - **Command:** 
   ```powershell
   cd "c:\Users\mukit\OneDrive\Desktop\nasaArchitech\satellite_simulator_web" ; .\scripts\git-auto-deploy.ps1 -Message "Auto-update: New blog post"
   ```
   - Or use the full git command (see below)

### Step 3: Test It

1. Execute workflow manually
2. Check GitHub - should see commit
3. Check Vercel - should see deployment
4. Wait 1-2 minutes
5. Visit live site - should see new post!

---

## 🔧 Two Ways to Add Git Step

### Option 1: Use PowerShell Script (Easier)

**In n8n "Execute Command" node:**
```powershell
cd "c:\Users\mukit\OneDrive\Desktop\nasaArchitech\satellite_simulator_web" ; .\scripts\git-auto-deploy.ps1
```

### Option 2: Direct Git Command

**In n8n "Execute Command" node:**
```powershell
cd "c:\Users\mukit\OneDrive\Desktop\nasaArchitech\satellite_simulator_web" ; git add client/src/data/blogPosts.ts client/src/data/seo-config.ts client/index.html ; git commit -m "Auto-update: New blog post" ; git push origin main
```

---

## 📋 Complete Workflow

**Import this workflow:**
- `n8n/workflows/auto-blog-posting-with-deploy.json`

**It includes:**
1. Schedule Trigger
2. Generate Content
3. Post to Blog API
4. **Git Commit & Push** ← NEW!
5. **Vercel Auto-Deploys** ← AUTOMATIC!

---

## ✅ Verify It Works

### Check 1: GitHub
- Go to your GitHub repo
- Check **Commits** tab
- Should see commits from n8n

### Check 2: Vercel
- Go to Vercel dashboard
- Check **Deployments** tab
- Should see new deployments

### Check 3: Live Site
- Visit https://www.orbitalsimulatorhub.com/blog
- Should see new posts!

---

## 🎯 Summary

**To update live site automatically:**

1. ✅ Add "Git Commit & Push" step to workflow
2. ✅ Vercel watches GitHub for changes
3. ✅ Vercel auto-deploys when GitHub updates
4. ✅ Live site updates automatically!

**That's it!** Once you add the git step, your live site will update automatically! 🚀

---

## 📚 See Also

- `AUTO-DEPLOY-TO-LIVE-SITE.md` - Complete guide
- `scripts/git-auto-deploy.ps1` - Helper script
