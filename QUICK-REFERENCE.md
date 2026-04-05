# ⚡ QUICK REFERENCE - Daily Checklist

## 🚀 **DAILY SETUP (One-Time, 15 minutes)**

### **Terminal 1: Ollama**
```bash
ollama serve
```
✅ Keep running 24/7

### **Terminal 2: API Server**
```bash
cd "C:\Users\mukit\OneDrive\Desktop\nasaArchitech\satellite_simulator_web"
npm run dev:api
```
✅ Keep running 24/7

### **Terminal 3: n8n**
```bash
n8n start
# Or: npx n8n
```
✅ Keep running 24/7

### **Browser: n8n Dashboard**
```
http://localhost:5678
```
✅ Import workflows → Activate → Done!

---

## 📋 **DAILY CHECKLIST (2 minutes)**

- [ ] Check n8n "Executions" tab - both workflows ran?
- [ ] Check `blogPosts.ts` - new posts added?
- [ ] Share 1 post on Reddit/Twitter

---

## 🔧 **QUICK COMMANDS**

### **Test Ollama**
```bash
ollama run llama2 "Hello"
curl http://localhost:11434/api/tags
```

### **Test API**
```bash
curl http://localhost:3003/api/blog/health
```

### **Manual Deploy**
```bash
npm run auto-deploy
```

### **Manual RSS Regenerate**
```bash
npm run generate:rss
```

### **Manual Build**
```bash
npm run build:client
```

---

## 🐛 **QUICK FIXES**

### **Ollama Not Working**
```bash
ollama serve
ollama pull llama2
```

### **API Not Working**
```bash
npm run dev:api
# Check: http://localhost:3003/api/blog/health
```

### **Workflow Failed**
1. Check Ollama running
2. Check API running
3. Check n8n running
4. Re-execute workflow manually

---

## 📊 **WHERE TO CHECK**

| What | Where |
|------|-------|
| **New Posts** | `client/src/data/blogPosts.ts` |
| **Workflow Status** | n8n → Executions tab |
| **API Health** | http://localhost:3003/api/blog/health |
| **Ollama Status** | http://localhost:11434/api/tags |
| **RSS Feed** | `client/public/blog/rss.xml` |

---

## 🎯 **SOCIAL MEDIA TEMPLATES**

### **Reddit Post**
```
Title: How [Topic] Works - Interactive Guide with 3D Simulator

Link: [Your blog post URL]

Text: I wrote a complete guide explaining [topic]. Includes [key points] and links to an interactive 3D simulator. Perfect for students and space enthusiasts!
```

### **Twitter Post**
```
🚀 New: [Post Title]

Learn how [topic] works with our interactive guide and 3D simulator.

[Link]

#Space #NASA #Education
```

### **Quora Answer**
```
Great question! [Brief answer]

I wrote a detailed guide with an interactive 3D simulator: [link]

You can try it yourself and see [topic] in action!
```

---

## ⏰ **SCHEDULE**

| Time | Action |
|------|--------|
| **9:00 AM** | RSS workflow runs (auto) |
| **2:00 PM** | Research workflow runs (auto) |
| **Evening** | Share 1 post on social media (manual) |

---

## 📈 **EXPECTED RESULTS**

| Days | Posts | Traffic |
|------|-------|---------|
| 7 | 14-21 | 0-10/day |
| 30 | 60-90 | 10-50/day |
| 60 | 120-180 | 50-200/day |
| 90 | 180-270 | 200-1000/day |

---

**Full guide:** See `STEP-BY-STEP-GUIDE.md` for detailed instructions.
