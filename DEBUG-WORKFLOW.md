# 🔍 Debug: Workflow Shows Nothing

## Quick Checks

### 1. Is API Server Running?

**Open a new terminal and run:**
```bash
npm run dev:api
```

**Should see:**
```
Blog API at http://localhost:3001/api/blog
```

**Test it:**
```bash
curl http://localhost:3001/api/blog/health
```

**Should return:**
```json
{"status":"ok","service":"blog-api"}
```

---

### 2. Fix "Post to Blog API" Node

**In n8n:**
1. Click **"Post to Blog API"** node
2. Check these settings:

**✅ Correct Settings:**
- **Method:** POST (IMPORTANT!)
- **URL:** `http://localhost:3001/api/blog/posts`
- **Authentication:** None
- **Send Body:** Yes
- **Body Content Type:** JSON

**❌ Common Mistakes:**
- Method is GET (should be POST)
- URL is `https://www.orbitalsimulatorhub.com` (should be localhost)
- Body not configured

---

### 3. Test Each Node Individually

**Test "Generate Content" Node:**
1. Click the node
2. Click **"Execute step"** button (bottom right)
3. Check **OUTPUT** panel (right side)
4. Should see JSON with: slug, title, excerpt, content, etc.

**If no output:**
- Check JavaScript code for errors
- Look for syntax issues

**Test "Post to Blog API" Node:**
1. Click the node
2. Click **"Execute step"** button
3. Check **OUTPUT** panel
4. Should see API response

**If error:**
- Check API server is running
- Verify URL is correct
- Check method is POST

---

### 4. Check Execution Logs

**In n8n:**
1. Click **"Executions"** tab (top of workflow)
2. Click on latest execution
3. Check each node:
   - Green checkmark = Success
   - Red X = Error (click to see details)
   - Yellow warning = Warning

**Common errors:**
- **ECONNREFUSED** = API server not running
- **404 Not Found** = Wrong URL
- **400 Bad Request** = Missing fields in body

---

### 5. Manual API Test

**Test API directly:**
```bash
curl -X POST http://localhost:3001/api/blog/posts \
  -H "Content-Type: application/json" \
  -d '{
    "slug": "test-post-123",
    "title": "Test Post",
    "excerpt": "This is a test post excerpt",
    "content": "This is a test post content with enough words to meet the minimum requirement of 100 characters. This should work if the API is running correctly.",
    "category": "space-facts",
    "date": "2026-02-15",
    "tags": ["test"],
    "seoKeywords": "test, space"
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

**If error:**
- API server not running
- Wrong endpoint
- Missing fields

---

## 🔧 Fix Workflow Configuration

### Update "Post to Blog API" Node:

**Required Settings:**
```json
{
  "method": "POST",
  "url": "http://localhost:3001/api/blog/posts",
  "authentication": "none",
  "sendBody": true,
  "bodyContentType": "json",
  "bodyParameters": {
    "parameters": [
      {"name": "slug", "value": "={{$json.slug}}"},
      {"name": "title", "value": "={{$json.title}}"},
      {"name": "excerpt", "value": "={{$json.excerpt}}"},
      {"name": "content", "value": "={{$json.content}}"},
      {"name": "category", "value": "={{$json.category}}"},
      {"name": "date", "value": "={{$json.date}}"},
      {"name": "tags", "value": "={{$json.tags}}"},
      {"name": "seoKeywords", "value": "={{$json.seoKeywords}}"}
    ]
  }
}
```

---

## ✅ Checklist

- [ ] API server running (`npm run dev:api`)
- [ ] API health check works (`curl http://localhost:3001/api/blog/health`)
- [ ] "Post to Blog API" method is POST
- [ ] "Post to Blog API" URL is `http://localhost:3001/api/blog/posts`
- [ ] Body parameters configured
- [ ] "Generate Content" node outputs JSON
- [ ] Workflow connections are correct
- [ ] No errors in execution logs

---

## 🆘 Still Nothing?

**Share:**
1. What you see in execution logs
2. Any error messages
3. Output from "Generate Content" node
4. Output from "Post to Blog API" node

**I can help fix it!**
