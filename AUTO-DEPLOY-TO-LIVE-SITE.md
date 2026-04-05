# 🚀 Auto-Deploy to Live Site (https://www.orbitalsimulatorhub.com/)

## 🎯 How It Works

**Current workflow:** Updates local files only
**New workflow:** Updates local files → Commits to Git → Pushes to GitHub → Vercel auto-deploys → Live site updates!

---

## ✅ How Vercel Auto-Deployment Works

**Vercel automatically deploys when:**
1. ✅ Code is pushed to GitHub
2. ✅ GitHub repo is connected to Vercel
3. ✅ Vercel watches your repo for changes

**So we just need to:**
1. Update files (already done)
2. Commit changes to Git
3. Push to GitHub
4. Vercel deploys automatically! 🎉

---

## 🔧 Setup Auto-Deployment (2 Options)

### Option 1: Git Commit & Push (Recommended - Simplest)

**This automatically triggers Vercel deployment!**

#### Step 1: Add Git Credentials to n8n

**In n8n:**
1. Go to **Settings** → **Credentials**
2. Add **Git** credential (if available)
3. Or use **Execute Command** node with git commands

#### Step 2: Update Workflow

**Add "Git Commit & Push" node after "Post to Blog API":**

1. Add **Execute Command** node
2. Configure:
   - **Command:** 
   ```bash
   cd "c:\Users\mukit\OneDrive\Desktop\nasaArchitech\satellite_simulator_web" && git add client/src/data/blogPosts.ts client/src/data/seo-config.ts client/index.html && git commit -m "Auto-update: New blog post" && git push origin main
   ```
   - **Update path** to your project directory

#### Step 3: Test

1. Execute workflow manually
2. Check GitHub - should see new commit
3. Check Vercel - should see new deployment starting
4. Wait 1-2 minutes
5. Visit https://www.orbitalsimulatorhub.com/ - should see new post!

---

### Option 2: Vercel API (Advanced)

**Directly trigger Vercel deployment via API**

#### Step 1: Get Vercel Token

1. Go to https://vercel.com/account/tokens
2. Create new token
3. Copy token

#### Step 2: Add to n8n

1. In n8n: **Settings** → **Credentials**
2. Add **HTTP Header Auth** credential:
   - **Name:** Authorization
   - **Value:** Bearer YOUR_VERCEL_TOKEN

#### Step 3: Add "Trigger Vercel Deploy" Node

**Add HTTP Request node:**
- **URL:** `https://api.vercel.com/v1/deployments`
- **Method:** POST
- **Authentication:** Use credential from Step 2
- **Body:**
```json
{
  "name": "orbitalsimulatorhub",
  "gitSource": {
    "type": "github",
    "repo": "mukithc/orbitalsimulatorhub-",
    "ref": "main"
  }
}
```

---

## 📋 Complete Workflow Steps

### Current Flow:
1. Schedule Trigger (every 24h)
2. Generate Content
3. Post to Blog API ✅

### New Flow (with deployment):
1. Schedule Trigger (every 24h)
2. Generate Content
3. Post to Blog API ✅
4. **Git Commit & Push** ← NEW!
5. **Vercel Auto-Deploys** ← AUTOMATIC!
6. **Live site updates!** ← RESULT!

---

## 🔍 Verify It's Working

### Check 1: Git Commit
```bash
cd "c:\Users\mukit\OneDrive\Desktop\nasaArchitech\satellite_simulator_web"
git log --oneline -5
```

Should see commits like:
```
Auto-update: New blog post - [title]
```

### Check 2: GitHub
1. Go to your GitHub repo
2. Check **Commits** tab
3. Should see new commits from n8n

### Check 3: Vercel Dashboard
1. Go to https://vercel.com/dashboard
2. Open your project
3. Check **Deployments** tab
4. Should see new deployment starting automatically

### Check 4: Live Site
1. Visit https://www.orbitalsimulatorhub.com/blog
2. Should see new post!

---

## ⚙️ Configure Git in n8n

### Windows PowerShell Command:

**In "Execute Command" node:**
```powershell
cd "c:\Users\mukit\OneDrive\Desktop\nasaArchitech\satellite_simulator_web" ; git add client/src/data/blogPosts.ts client/src/data/seo-config.ts client/index.html ; git commit -m "Auto-update: New blog post" ; git push origin main
```

**Or use Git Bash:**
```bash
cd /c/Users/mukit/OneDrive/Desktop/nasaArchitech/satellite_simulator_web && git add client/src/data/blogPosts.ts client/src/data/seo-config.ts client/index.html && git commit -m "Auto-update: New blog post" && git push origin main
```

---

## 🎯 Quick Setup (Recommended)

### Use Pre-Made Workflow:

1. **Import:** `n8n/workflows/auto-blog-posting-with-deploy.json`
2. **Edit "Git Commit & Push" node:**
   - Update path to your project directory
   - Verify git command works
3. **Activate workflow**
4. **Done!** Posts deploy automatically to live site!

---

## ✅ Checklist

- [ ] GitHub repo connected to Vercel
- [ ] Vercel auto-deployment enabled
- [ ] Git credentials configured in n8n (or use Execute Command)
- [ ] "Git Commit & Push" node added to workflow
- [ ] Path updated to your project directory
- [ ] Test workflow manually
- [ ] Verify GitHub commit appears
- [ ] Verify Vercel deployment starts
- [ ] Check live site for new post

---

## 🆘 Troubleshooting

### Git Command Fails
- **Check:** Git is installed (`git --version`)
- **Check:** Project is a git repo (`git status`)
- **Check:** GitHub remote configured (`git remote -v`)
- **Fix:** Configure git credentials or use SSH keys

### Vercel Not Deploying
- **Check:** GitHub repo connected in Vercel dashboard
- **Check:** Auto-deployment enabled in Vercel settings
- **Check:** Vercel watching correct branch (main/master)
- **Fix:** Reconnect GitHub repo in Vercel

### Changes Not Appearing
- **Wait:** Vercel deployment takes 1-3 minutes
- **Check:** Vercel deployment logs for errors
- **Check:** Browser cache (hard refresh: Ctrl+F5)
- **Check:** Correct files committed to git

---

## 🎉 Result

**Once configured:**
- ✅ Blog posts generate automatically
- ✅ Changes commit to Git automatically
- ✅ GitHub updates automatically
- ✅ Vercel deploys automatically
- ✅ **Live site updates automatically!**

**Your site at https://www.orbitalsimulatorhub.com/ will update automatically every day!** 🚀

---

## 📚 Files

- `n8n/workflows/auto-blog-posting-with-deploy.json` - Complete workflow with deployment
- Import this workflow to get everything set up!
