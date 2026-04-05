# 🔧 Fix "Unrecognized node type: n8n-nodes-base.executeCommand"

## ⚠️ Problem

The workflow uses `executeCommand` node which isn't installed in your n8n. This node is used to run git commands.

---

## ✅ Solution: Replace with HTTP Request Node

Instead of using `executeCommand`, we'll use an **HTTP Request** node to trigger git deployment via a simple API endpoint, OR we can use a **Code** node with a different approach.

---

## 🎯 Quick Fix: Use Code Node Instead

### Option 1: Replace Execute Command with Code Node (Recommended)

1. **Delete the "Git Commit & Push" node:**
   - Click on it
   - Press Delete key
   - Or right-click → Delete

2. **Add a Code node:**
   - Click the "+" button between "Post Research Content" and where Git node was
   - Search for "Code"
   - Add "Code" node

3. **Configure Code node:**
   - Name it: "Git Commit & Push"
   - Add this code:

```javascript
// This node logs that content was posted
// Actual git commit will happen via API or manual trigger
// For now, we'll just log success

const response = $input.item.json;

return {
  json: {
    success: true,
    message: "Research content posted successfully. Git commit can be done manually or via API.",
    timestamp: new Date().toISOString()
  }
};
```

4. **Save workflow**

**Note:** This removes automatic git commit. You'll need to commit manually OR set up a separate API endpoint for git operations.

---

## 🔧 Option 2: Install Execute Command Node

### Install the node:

1. **In n8n, go to:** Settings → Community Nodes
2. **Search for:** `n8n-nodes-base.executeCommand`
3. **Install** if available

**OR install via command line:**

```bash
cd "C:\Users\mukit\OneDrive\Desktop\nasaArchitech\satellite_simulator_web"
npm install n8n-nodes-base.executeCommand
```

**Then restart n8n.**

---

## 🎯 Option 3: Use HTTP Request to Trigger Git Script

### Create a simple API endpoint that runs git commands:

1. **Replace Execute Command node** with **HTTP Request** node
2. **Configure it:**
   - Method: POST
   - URL: `http://localhost:3001/api/deploy` (you'd need to create this endpoint)
   - Body: `{"type": "research-content"}`

**This requires creating a new API endpoint** that handles git operations.

---

## ✅ Recommended: Simple Fix (Remove Git Node for Now)

**Easiest solution:**

1. **Delete the "Git Commit & Push" node**
2. **The workflow will still:**
   - ✅ Generate research content
   - ✅ Post to API
   - ✅ Update your website data files

3. **You can commit manually:**
   - After workflow runs, manually commit changes
   - Or set up a separate automation

---

## 🔄 Updated Workflow (Without Git Node)

The workflow will work like this:

1. ✅ Schedule Trigger (Daily)
2. ✅ Select Research Topic
3. ✅ Generate Research Content (OpenAI)
4. ✅ Format Research Content
5. ✅ Post Research Content (to API)
6. ~~Git Commit & Push~~ (removed for now)

**The content will still be added to your data files!** You just need to commit manually or set up git automation separately.

---

## 📝 Step-by-Step: Remove Problem Node

1. **Click on "Git Commit & Push" node** (the one with ? icon)
2. **Press Delete key** OR right-click → Delete
3. **Save workflow** (Ctrl+S)
4. **Try running workflow again**

The workflow should work now!

---

## 🚀 After Fixing: Test Workflow

1. **Click "Execute workflow"** button
2. **Watch it run:**
   - Should go through all nodes
   - Should post content to API
   - Should succeed!

3. **Check your website:**
   - Visit: `/research`
   - Should see new research content!

---

## 💡 Long-term Solution

For automatic git commits, you can:

1. **Set up a separate workflow** that watches for file changes
2. **Use GitHub Actions** to auto-commit
3. **Create a simple API endpoint** that runs git commands securely
4. **Use a scheduled script** that commits changes daily

**For now, removing the git node will make the workflow work immediately!**

---

## ✅ Quick Fix Summary

**Do this now:**

1. ✅ Delete "Git Commit & Push" node
2. ✅ Save workflow
3. ✅ Test workflow
4. ✅ Content will be added (just commit manually later)

**The workflow will work!** You can add git automation later. 🚀
