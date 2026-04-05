# 🔄 Update Workflow to Auto-Deploy

## ✅ What I Just Created

I created a **Git Deploy API endpoint** that handles git commits and pushes. Now you can use **HTTP Request** node instead of executeCommand!

---

## 🎯 Update Your Workflow

### Step 1: Delete the Old Node

1. **Click on "Git Commit & Push" node** (the one with ? icon)
2. **Press Delete** or right-click → Delete

### Step 2: Add HTTP Request Node

1. **Click the "+" button** after "Post Research Content" node
2. **Search for:** "HTTP Request"
3. **Add:** "HTTP Request" node

### Step 3: Configure HTTP Request Node

**Settings:**
- **Name:** "Git Deploy"
- **Method:** POST
- **URL:** `http://localhost:3001/api/git/deploy`
- **Authentication:** None
- **Send Body:** Yes
- **Body Content Type:** JSON
- **JSON Body:** 
```json
{
  "message": "Auto-update: Research content for PhD students and researchers",
  "type": "research-content"
}
```

**OR use expression:**
```
={{ JSON.stringify({ message: "Auto-update: Research content", type: "research-content" }) }}
```

### Step 4: Connect Nodes

1. **Connect:** "Post Research Content" → "Git Deploy"
2. **Save workflow** (Ctrl+S)

---

## ✅ Complete Flow (After Update)

**Daily Automatic Process:**

1. ⏰ **Schedule Trigger** (every 24 hours)
2. 🎲 **Select Research Topic**
3. 🤖 **OpenAI generates** content (GPT-4)
4. 📝 **Format Research Content**
5. 🌐 **Post to API** (`/api/research/content`)
   - Updates `researchContent.ts` file
6. 🔄 **Git Deploy** (`/api/git/deploy`)
   - Commits changes
   - Pushes to GitHub
7. 🚀 **Vercel auto-deploys** from GitHub
8. ✅ **Content appears** on https://www.orbitalsimulatorhub.com/

---

## 🎯 Same for Blog Workflow

**Update "AI Topic Generator" workflow too:**

1. Delete "Git Commit & Push" node
2. Add HTTP Request node
3. Configure:
   - URL: `http://localhost:3001/api/git/deploy`
   - Method: POST
   - Body: `{"message": "Auto-update: AI-generated blog post + AstroBot knowledge", "type": "blog"}`
4. Connect nodes
5. Save

---

## 🧪 Test It

1. **Click "Execute workflow"** button
2. **Watch it run:**
   - Should go through all nodes
   - Should post content
   - Should deploy to GitHub
   - Should trigger Vercel

3. **Check results:**
   - GitHub: Should see new commit
   - Vercel: Should see new deployment
   - Website: Should see new content!

---

## ✅ Summary

**After updating workflows:**

- ✅ **Generates content daily** using OpenAI
- ✅ **Posts to API** (updates data files)
- ✅ **Auto-commits** to GitHub
- ✅ **Auto-pushes** to GitHub
- ✅ **Vercel auto-deploys**
- ✅ **Content appears** on https://www.orbitalsimulatorhub.com/

**Everything is automated!** 🚀

---

## 📝 Quick Checklist

- [ ] ✅ Git Deploy API created (`/api/git/deploy`)
- [ ] ✅ API server updated
- [ ] ✅ Delete "Git Commit & Push" node from workflow
- [ ] ✅ Add HTTP Request node
- [ ] ✅ Configure HTTP Request (URL: `/api/git/deploy`)
- [ ] ✅ Connect nodes
- [ ] ✅ Save workflow
- [ ] ✅ Test workflow
- [ ] ✅ Verify deployment works

**Once done, your site will auto-update daily!** 🎉
