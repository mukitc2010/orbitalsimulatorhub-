# 🚀 Complete n8n Workflow Guide - Daily Auto-Posting

## **BEST APPROACH: Hybrid (RSS + Ollama)**

### **Why This Works:**
- ✅ **$0 cost** (Ollama is free, RSS is free)
- ✅ **Fresh content daily** (RSS gives you real news)
- ✅ **Evergreen content** (Ollama generates tutorials/research)
- ✅ **Google loves it** (fresh + quality = ranking)

---

## **Workflow 1: RSS → Ollama Rewrite → Publish**

### **Nodes:**

1. **Cron Trigger** (Daily at 9 AM)
2. **HTTP Request** → Fetch NASA RSS feed
   - URL: `https://www.nasa.gov/rss/dyn/breaking_news.rss`
3. **Code** → Parse RSS and select 1-2 articles
4. **HTTP Request** → Ollama rewrite
   - URL: `http://localhost:11434/v1/chat/completions`
   - Body: Rewrite prompt with your site's voice
5. **Code** → Transform to blog post format
6. **HTTP Request** → POST to your blog API
   - URL: `http://localhost:3003/api/blog/posts`
   - Method: POST
   - Body: `{{ $json }}`

---

## **Workflow 2: Ollama Research Content → Publish**

### **Use your improved code:**
- File: `SELECT-RESEARCH-TOPIC-IMPROVED.js`
- Generates research/tutorial content
- Runs 1x per day (different from RSS)

---

## **Complete n8n Workflow JSON**

```json
{
  "name": "Daily Blog Auto-Post",
  "nodes": [
    {
      "name": "Cron Trigger",
      "type": "n8n-nodes-base.cron",
      "parameters": {
        "rule": {
          "interval": [{"field": "hours", "hoursInterval": 24}],
          "hour": 9,
          "minute": 0
        }
      }
    },
    {
      "name": "Fetch NASA RSS",
      "type": "n8n-nodes-base.httpRequest",
      "parameters": {
        "url": "https://www.nasa.gov/rss/dyn/breaking_news.rss",
        "options": {}
      }
    },
    {
      "name": "Parse RSS",
      "type": "n8n-nodes-base.code",
      "parameters": {
        "jsCode": "const xml2js = require('xml2js');\nconst parser = new xml2js.Parser();\nconst items = $input.item[0].item.slice(0, 2); // Get 2 latest\nreturn items.map(item => ({ title: item.title[0], link: item.link[0], description: item.description[0] }));"
      }
    },
    {
      "name": "Ollama Rewrite",
      "type": "n8n-nodes-base.httpRequest",
      "parameters": {
        "url": "http://localhost:11434/v1/chat/completions",
        "method": "POST",
        "body": {
          "model": "llama2",
          "messages": [{
            "role": "user",
            "content": "Rewrite this NASA news article for a space education website. Make it educational, include internal links to /simulator, /learn/orbital-mechanics. Keep it 500-800 words. Original: {{ $json.description }}"
          }],
          "temperature": 0.7,
          "max_tokens": 2000
        }
      }
    },
    {
      "name": "Format Blog Post",
      "type": "n8n-nodes-base.code",
      "parameters": {
        "jsCode": "const response = JSON.parse($input.body);\nconst content = response.choices[0].message.content;\nconst title = $('Parse RSS').item.json.title;\n\nreturn {\n  slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').substring(0, 50),\n  title: title,\n  excerpt: content.substring(0, 150) + '...',\n  content: content,\n  category: 'nasa-news',\n  date: new Date().toISOString().split('T')[0],\n  tags: ['NASA', 'space news', 'space exploration'],\n  seoKeywords: 'NASA news, space news, space exploration, orbital mechanics'\n};"
      }
    },
    {
      "name": "POST to Blog API",
      "type": "n8n-nodes-base.httpRequest",
      "parameters": {
        "url": "http://localhost:3003/api/blog/posts",
        "method": "POST",
        "body": "={{ $json }}"
      }
    }
  ]
}
```

---

## **Quick Setup Steps:**

1. **Install Ollama** (if not already)
   ```bash
   # Download from ollama.ai
   # Run: ollama pull llama2
   ```

2. **Start your API server**
   ```bash
   npm run dev:api
   # Runs on port 3003
   ```

3. **Import workflow to n8n**
   - Copy the JSON above
   - Import in n8n UI
   - Test with "Execute Workflow"

4. **Deploy**
   - After posts are added, run: `npm run generate:rss`
   - Build: `npm run build:client`
   - Deploy to Vercel/GitHub Pages

---

## **Expected Results:**

- **2-3 posts/day** (1-2 from RSS, 1 from Ollama research)
- **$0 cost** (all free)
- **Google indexing** (fresh content = better ranking)
- **Traffic growth** (after 60-90 days)

---

## **Pro Tips:**

1. **Mix content types:**
   - RSS = News (fresh, timely)
   - Ollama = Tutorials (evergreen, SEO)

2. **Add internal links:**
   - Every post should link to `/simulator`, `/learn/orbital-mechanics`, `/space-news`

3. **Monitor quality:**
   - Review first 10 posts manually
   - Adjust prompts if needed

4. **Scale up:**
   - Start with 1 post/day
   - Increase to 2-3/day after 2 weeks
   - Target: 1000 posts in 3 months
