# 🤖 AI Topic Generator Setup - Blog Posts & AstroBot

## 🎯 What This Does

**AI-powered automation that:**
- ✅ **Generates diverse blog post topics** using OpenAI
- ✅ **Expands AstroBot's knowledge** automatically
- ✅ **Covers all website topics**: NASA, Newton, Quantum Physics, Astrophysics
- ✅ **Creates unique content** every day
- ✅ **Trains AstroBot** to answer anything related to your website

**Result:** Unlimited topics + AstroBot that knows everything! 🎉

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
2. Select: `n8n/workflows/ai-topic-generator.json`
3. Connect OpenAI credential to "OpenAI Generate Topics" node
4. Update Git path in "Git Commit & Push" node
5. Toggle **Active** ON

---

## 📋 How It Works

### Daily Automation:

1. **Schedule Trigger** → Runs daily
2. **Generate AI Prompt** → Creates prompt for topic generation
3. **OpenAI Generate Topics** → AI generates 5 unique topics
4. **Parse AI Topics** → Extracts blog post data
5. **Post Blog to API** → Saves blog post
6. **Generate AstroBot Knowledge** → Creates knowledge entry
7. **Update AstroBot Knowledge** → Adds to AstroBot
8. **Git Commit & Push** → Deploys to live site

**Result:** New blog post + AstroBot learns new topic!

---

## 🎨 What Gets Generated

### Blog Post Topics:
- NASA missions, discoveries, technology
- Newton's laws applications
- Quantum physics in space
- Astrophysics discoveries
- Orbital mechanics concepts

### AstroBot Knowledge:
- Keywords: Related search terms
- Answers: Comprehensive explanations
- Links: To relevant pages on your site

---

## 🧠 AstroBot Training

**AstroBot learns about:**
- ✅ All NASA missions and projects
- ✅ Newton's laws and applications
- ✅ Quantum physics concepts
- ✅ Astrophysics topics
- ✅ Orbital mechanics details
- ✅ Your website's content

**Users can ask anything and AstroBot will answer!**

---

## ✅ Verify It Works

### Test API:
```bash
curl http://localhost:3001/api/astrobot/health
```

### Test AstroBot Knowledge:
```bash
curl -X POST http://localhost:3001/api/astrobot/knowledge \
  -H "Content-Type: application/json" \
  -d '{
    "keywords": ["test topic", "space test"],
    "answer": "This is a test answer about space topics.",
    "category": "nasa"
  }'
```

### Test AstroBot:
Visit: `http://localhost:5173/astrobot`
- Ask about new topics
- AstroBot should answer!

---

## 🎛️ Customize AI Prompts

**Edit "Generate AI Prompt" node:**

Change the prompt to focus on specific topics:
```javascript
prompt: `Generate 10 unique blog post topics about ${topicCategory}...
- Include advanced topics for PhD researchers
- Include beginner-friendly explanations
- Cover recent discoveries
- Include formulas and calculations`
```

---

## 📊 Expected Results

### Daily:
- ✅ 1 AI-generated blog post
- ✅ 1 new AstroBot knowledge entry
- ✅ AstroBot learns new topic
- ✅ Blog post published
- ✅ Live site updated

### Weekly:
- ✅ 7 AI-generated posts
- ✅ 7 new AstroBot topics
- ✅ AstroBot knowledge expands
- ✅ Diverse content coverage

### Monthly:
- ✅ 30+ AI-generated posts
- ✅ 30+ AstroBot topics
- ✅ AstroBot becomes expert
- ✅ Comprehensive knowledge base

---

## 🎉 Final Result

**Your system will:**

- ✅ Generate unlimited unique topics via AI
- ✅ Create diverse blog posts automatically
- ✅ Train AstroBot continuously
- ✅ AstroBot answers anything about your website
- ✅ Content stays fresh and engaging

**AstroBot becomes an expert on everything related to your site!** 🚀

---

## 📚 Files Created

- `n8n/workflows/ai-topic-generator.json` - AI-powered workflow
- `server/astrobot-api.ts` - AstroBot knowledge API
- `client/src/data/astrobotKnowledgeExpanded.ts` - Expanded knowledge base
- `client/src/astrobotKnowledge.ts` - Updated with more topics

**Import the workflow, add OpenAI key, and activate it!** 🎉

---

## ✅ Checklist

- [ ] OpenAI API key obtained
- [ ] OpenAI credential added in n8n
- [ ] Workflow imported
- [ ] Credential connected to OpenAI node
- [ ] Git path updated
- [ ] Workflow tested
- [ ] Workflow activated
- [ ] AstroBot answering new topics!

**That's it! AI will generate topics and train AstroBot automatically!** 🚀
