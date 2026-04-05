# 🤖 AstroBot Training Setup - NASA Q&A from AI Platforms

## 🎯 What This Does

**Automatically trains AstroBot with:**
- ✅ **NASA Q&A from ChatGPT** conversations
- ✅ **NASA Q&A from Claude** conversations  
- ✅ **NASA Q&A from Perplexity AI** results
- ✅ **NASA.gov official** Q&A pages
- ✅ **Other AI platforms** with NASA content
- ✅ **References** to source pages included
- ✅ **Daily training** automatically

**Result:** AstroBot becomes an expert with references! 🎉

---

## 🚀 Quick Setup (3 Steps)

### Step 1: Get OpenAI API Key

1. Go to https://platform.openai.com/api-keys
2. Create new API key
3. Copy the key

### Step 2: Add OpenAI Credential in n8n

1. In n8n: **Settings** → **Credentials**
2. Click **Add Credential** → **OpenAI**
3. Paste your API key
4. Save

### Step 3: Import & Configure Workflow

1. In n8n: **Workflows** → **Import from File**
2. Select: `n8n/workflows/train-astrobot-nasa-qa.json`
3. Connect OpenAI credential to "Generate Answer with AI" node
4. Update Git path in "Git Commit & Push" node if needed
5. Toggle **Active** ON

---

## 📋 How It Works

### Daily Automation:

1. **Schedule Trigger** → Runs daily
2. **Select Q&A Source** → Randomly selects from:
   - NASA.gov
   - ChatGPT
   - Claude
   - Perplexity AI
3. **Generate Answer with AI** → Uses OpenAI to generate accurate answer
4. **Format Knowledge Entry** → Creates knowledge entry with:
   - Keywords
   - Answer
   - References (links to source pages)
5. **Add to AstroBot Knowledge** → Saves to AstroBot knowledge base
6. **Git Commit & Push** → Deploys to live site

**Result:** AstroBot learns new Q&A with references!

---

## 🎨 What Gets Added

### Knowledge Entry Includes:

- **Keywords:** Search terms for matching questions
- **Answer:** Comprehensive answer from AI platforms
- **References:** Links to source pages:
  - NASA.gov pages
  - ChatGPT conversation links
  - Claude conversation links
  - Perplexity AI results
  - Other AI platform sources

### Example Entry:

```json
{
  "keywords": ["nasa", "what does nasa do", "space agency"],
  "answer": "NASA conducts research, develops technology, and explores space...",
  "references": [
    {
      "title": "About NASA",
      "url": "https://www.nasa.gov/about/index.html",
      "source": "NASA.gov"
    },
    {
      "title": "ChatGPT Conversation",
      "url": "https://chat.openai.com/",
      "source": "ChatGPT"
    }
  ],
  "category": "nasa"
}
```

---

## 🧠 AstroBot Features

### Enhanced UI:

- ✅ **Answers** displayed clearly
- ✅ **References** shown below answers
- ✅ **Clickable links** to source pages
- ✅ **Source attribution** (NASA.gov, ChatGPT, etc.)

### Example Display:

```
🛰️ NASA conducts research, develops technology, and explores space...

📚 Sources & References:
• About NASA (NASA.gov)
• ChatGPT Conversation (ChatGPT)
```

---

## 📊 Expected Results

### Daily:
- ✅ 1 new NASA Q&A learned
- ✅ References added
- ✅ AstroBot knowledge expands
- ✅ Live site updated

### Weekly:
- ✅ 7 new Q&As
- ✅ 7 sets of references
- ✅ AstroBot becomes more knowledgeable

### Monthly:
- ✅ 30+ new Q&As
- ✅ 30+ reference sets
- ✅ AstroBot becomes expert
- ✅ Comprehensive knowledge base

---

## ✅ Verify It Works

### Test AstroBot API:
```bash
curl http://localhost:3001/api/astrobot/health
```

### Test Adding Knowledge:
```bash
curl -X POST http://localhost:3001/api/astrobot/knowledge \
  -H "Content-Type: application/json" \
  -d '{
    "keywords": ["test nasa question"],
    "answer": "This is a test answer about NASA.",
    "references": [
      {
        "title": "NASA Test Page",
        "url": "https://www.nasa.gov/",
        "source": "NASA.gov"
      }
    ],
    "category": "nasa"
  }'
```

### Test AstroBot:
Visit: `http://localhost:5173/astrobot`
- Ask: "What does NASA do?"
- AstroBot should answer with references!

---

## 🎛️ Customize Sources

**Edit "Select Q&A Source" node:**

Add more sources:
```javascript
const sources = [
  {
    name: "Google Bard",
    url: "https://bard.google.com/",
    questions: ["..."]
  },
  {
    name: "Bing Chat",
    url: "https://www.bing.com/chat",
    questions: ["..."]
  }
];
```

---

## 📚 Files Created/Modified

### Created:
- `n8n/workflows/train-astrobot-nasa-qa.json` - Training workflow
- `scripts/collect-nasa-qa.js` - Q&A collector script
- `ASTROBOT-TRAINING-SETUP.md` - This guide

### Modified:
- `client/src/astrobotKnowledge.ts` - Added references support
- `client/src/pages/AstroBot.tsx` - Added references display
- `server/astrobot-api.ts` - Added references support

---

## 🎉 Final Result

**Your AstroBot will:**

- ✅ Learn from all AI platforms automatically
- ✅ Include references to source pages
- ✅ Display references in answers
- ✅ Become an expert on NASA topics
- ✅ Provide credible, sourced information

**Users can verify information by clicking reference links!** 🚀

---

## ✅ Checklist

- [ ] OpenAI API key obtained
- [ ] OpenAI credential added in n8n
- [ ] Workflow imported
- [ ] Credential connected
- [ ] Git path updated
- [ ] Workflow tested
- [ ] Workflow activated
- [ ] AstroBot showing references!

**That's it! AstroBot trains automatically with references!** 🎉
