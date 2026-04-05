# 🔧 Fix Workflow: Replace Git Node

## ⚠️ Problem
The "Git Commit & Push" node (with ? icon) uses `executeCommand` which isn't available.

## ✅ Solution: Replace with HTTP Request Node

---

## 📋 Step-by-Step Instructions

### Step 1: Delete the Problem Node

1. **Click on "Git Commit & Push" node** (the one with the big `?` icon)
2. **Press Delete key** on your keyboard
   - OR right-click → Delete
   - OR select it and click the delete icon in toolbar

### Step 2: Add HTTP Request Node

1. **Click the "+" button** that appears between "Post Research Content" and where the Git node was
   - OR click the "+" button in the right toolbar
   - OR right-click on the connection line → Add node

2. **Search for:** "HTTP Request"
3. **Click on:** "HTTP Request" to add it

### Step 3: Configure HTTP Request Node

**Click on the new HTTP Request node** to configure it:

**Basic Settings:**
- **Name:** Change to "Git Deploy" (optional but helpful)

**Request Settings:**
- **Method:** Select "POST"
- **URL:** Enter: `http://localhost:3001/api/git/deploy`
- **Authentication:** Select "None"

**Body Settings:**
- **Send Body:** Toggle ON (Yes)
- **Body Content Type:** Select "JSON"
- **JSON Body:** Click in the field and paste:
```json
{
  "message": "Auto-update: Research content for PhD students and researchers",
  "type": "research-content"
}
```

**OR use expression (click "Expression" tab):**
```
={{ JSON.stringify({ message: "Auto-update: Research content", type: "research-content" }) }}
```

### Step 4: Connect the Nodes

1. **Drag from "Post Research Content" node** output
2. **Connect to "Git Deploy" node** input
3. The arrow should connect them

### Step 5: Save Workflow

1. **Press Ctrl+S** (or Cmd+S on Mac)
2. **OR click Save** button (top right)

### Step 6: Test the Workflow

1. **Click "Execute workflow"** button (red button)
2. **Watch it run** through all nodes
3. **Should succeed** without errors!

---

## ✅ What Should Happen

After updating:

1. ✅ Schedule Trigger runs
2. ✅ Select Research Topic
3. ✅ Generate Research Content (OpenAI)
4. ✅ Format Research Content
5. ✅ Post Research Content (to API)
6. ✅ **Git Deploy** (HTTP Request to `/api/git/deploy`)
   - Commits changes
   - Pushes to GitHub
   - Triggers Vercel deployment

---

## 🎯 Visual Guide

**Before (Broken):**
```
Post Research Content → [Git Commit & Push] ❌ (Error!)
```

**After (Fixed):**
```
Post Research Content → [Git Deploy] ✅ (HTTP Request)
```

---

## 🔍 Verify API is Running

Before testing, make sure API server is running:

1. **Check:** http://localhost:3001/api/git/health
2. **Should see:** `{"status":"ok","service":"git-deploy-api"}`

If not running:
```bash
npm run dev:api
```

---

## 📝 Summary

**Do this now:**

1. ✅ **Delete** "Git Commit & Push" node (with ? icon)
2. ✅ **Add** HTTP Request node
3. ✅ **Configure:**
   - URL: `http://localhost:3001/api/git/deploy`
   - Method: POST
   - Body: `{"message": "Auto-update: Research content", "type": "research-content"}`
4. ✅ **Connect** nodes
5. ✅ **Save** workflow
6. ✅ **Test** workflow

**The workflow will work and auto-deploy!** 🚀

---

## 🆘 Still Having Issues?

**If HTTP Request doesn't work:**

1. **Check API server** is running
2. **Check URL** is correct: `http://localhost:3001/api/git/deploy`
3. **Check n8n logs** for errors
4. **Try testing API directly:**
   - Use Postman or curl
   - POST to: `http://localhost:3001/api/git/deploy`
   - Body: `{"message": "Test", "type": "test"}`

**The workflow should work after replacing the node!** ✅
