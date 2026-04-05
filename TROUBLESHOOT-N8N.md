# 🔧 Troubleshoot n8n Workflow - "Shows Nothing"

## Common Issues & Fixes

### Issue 1: API Server Not Running

**Check:**
```bash
# Is API server running?
curl http://localhost:3001/api/blog/health
```

**Fix:**
```bash
npm run dev:api
```

Should show:
```
Blog API at http://localhost:3001/api/blog
```

---

### Issue 2: Wrong API URL in Workflow

**Check:**
- Open "Post to Blog API" node
- Verify URL is: `http://localhost:3001/api/blog/posts`
- NOT: `https://www.orbitalsimulatorhub.com/...`

**Fix:**
- Change URL to: `http://localhost:3001/api/blog/posts`
- Method should be: **POST** (not GET)

---

### Issue 3: Check Execution Logs

**In n8n:**
1. Click **"Executions"** tab (top of workflow)
2. Click on the latest execution
3. Check each node:
   - **Schedule Trigger** - Should show timestamp
   - **Generate Content** - Should show JSON output
   - **Post to Blog API** - Check for errors

**Common errors:**
- "ECONNREFUSED" = API server not running
- "404 Not Found" = Wrong URL
- "400 Bad Request" = Missing required fields

---

### Issue 4: Test API Manually

**Test if API works:**
```bash
curl -X POST http://localhost:3001/api/blog/posts \
  -H "Content-Type: application/json" \
  -d '{
    "slug": "test-post",
    "title": "Test Post",
    "excerpt": "This is a test",
    "content": "This is a test post content with enough words to meet the minimum requirement.",
    "category": "space-facts",
    "date": "2026-02-15",
    "tags": ["test"],
    "seoKeywords": "test"
  }'
```

**Should return:**
```json
{
  "success": true,
  "message": "Blog post added successfully",
  "post": {...}
}
```

---

### Issue 5: Check Node Outputs

**In n8n workflow:**
1. Click **"Generate Content"** node
2. Click **"Execute step"** button
3. Check **OUTPUT** panel (right side)
4. Should show JSON with: slug, title, excerpt, content, etc.

**If no output:**
- Check JavaScript code in node
- Look for syntax errors
- Verify code returns `{ json: {...} }`

---

### Issue 6: Check Workflow Connections

**Verify:**
- Schedule Trigger → Generate Content (connected)
- Generate Content → Post to Blog API (connected)
- All connections show "1 item"

**If not connected:**
- Drag connection lines between nodes
- Ensure output of one node connects to input of next

---

## 🔍 Step-by-Step Debugging

### Step 1: Test API Server
```bash
# Start API
npm run dev:api

# Test health endpoint
curl http://localhost:3001/api/blog/health
```

### Step 2: Test Generate Content Node
1. In n8n, click "Generate Content" node
2. Click "Execute step"
3. Check OUTPUT panel
4. Should see JSON data

### Step 3: Test Post to Blog API Node
1. Click "Post to Blog API" node
2. Click "Execute step"
3. Check OUTPUT panel
4. Should see API response

### Step 4: Check Full Workflow
1. Click "Execute workflow" button
2. Check "Executions" tab
3. Click on execution
4. Check each node for errors

---

## ✅ Quick Fix Checklist

- [ ] API server running (`npm run dev:api`)
- [ ] API URL correct (`http://localhost:3001/api/blog/posts`)
- [ ] Method is POST (not GET)
- [ ] Body parameters configured correctly
- [ ] Workflow connections are correct
- [ ] No errors in execution logs

---

## 🆘 Still Not Working?

**Check these:**
1. **n8n execution logs** - Look for red error messages
2. **Browser console** - Press F12, check for errors
3. **API server logs** - Check terminal where API is running
4. **File permissions** - Ensure API can write to `blogPosts.ts`

**Share error messages** and I can help fix them!
