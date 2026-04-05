# 🌟 Daily Featured Topic Setup

## 🎯 What This Does

**Every day, automatically:**
- ✅ Adds a new featured topic icon on homepage
- ✅ Topics rotate: NASA, Newton, Quantum Physics, Astrophysics, Orbital Mechanics
- ✅ Icon links to educational content
- ✅ Updates automatically via n8n
- ✅ Commits to GitHub and deploys to live site

**Result:** Fresh learning topic every day on https://www.orbitalsimulatorhub.com/! 🎉

---

## 🚀 Quick Setup (3 Steps)

### Step 1: Restart API Server
```bash
npm run dev:api
```

Should see:
```
Daily Topics API at http://localhost:3001/api/daily-topics
```

### Step 2: Import Workflow in n8n

1. In n8n: **Workflows** → **Import from File**
2. Select: `n8n/workflows/daily-topic-generator.json`
3. Edit "Git Commit & Push" node - update path if needed
4. Toggle **Active** ON

### Step 3: Verify on Homepage

Visit: `http://localhost:5173/`

Should see **"Today's Topic"** icon at the top with:
- Icon (🛰️, ⚖️, ⚛️, etc.)
- Topic title
- Description
- Link to learn more

---

## 📋 What Gets Generated

### Topic Categories:

**NASA Topics:**
- ISS, Mars Rovers, James Webb Telescope, Apollo Missions, GPS Satellites

**Newton Topics:**
- Newton's Laws (1st, 2nd, 3rd), Universal Gravitation, Newton and Orbits

**Quantum Physics Topics:**
- Quantum Mechanics Basics, Entanglement, Quantum Computing, Quantum Sensors

**Astrophysics Topics:**
- Black Holes, Star Formation, Dark Matter, Cosmic Microwave Background, Exoplanets

**Orbital Mechanics Topics:**
- Kepler's Laws, Escape Velocity, Hohmann Transfer, Lagrange Points

---

## 🎨 How It Appears on Homepage

**"Today's Topic" section shows:**
- Large animated icon (pulses to draw attention)
- Topic title (e.g., "Newton's Laws of Motion")
- Short description
- Link to learn more

**Users click → Go to educational content → Learn!**

---

## 🔄 Complete Workflow

```
Schedule Trigger (Daily)
    ↓
Generate Daily Topic
    ↓
Post Daily Topic API
    ↓
Git Commit & Push
    ↓
GitHub Updates
    ↓
Vercel Auto-Deploys
    ↓
🌐 Live Site Updates!
```

---

## ✅ Test It

### Test API:
```bash
curl -X POST http://localhost:3001/api/daily-topics/topics \
  -H "Content-Type: application/json" \
  -d '{
    "date": "2026-02-15",
    "title": "Newton'\''s Laws of Motion",
    "icon": "⚖️",
    "category": "newton",
    "description": "Learn how Newton'\''s three laws explain motion in space.",
    "learnMoreUrl": "/learn/newton",
    "keywords": ["Newton", "laws", "physics"]
  }'
```

### Check Homepage:
Visit: `http://localhost:5173/`
Should see the daily topic icon!

---

## 🎛️ Customize Topics

**Edit "Generate Daily Topic" node in n8n:**

Add more topics to the `topics` object:
```javascript
'nasa': [
  { title: 'Your New Topic', icon: '🎯', url: '/your-url', desc: 'Description...', keywords: ['tag1', 'tag2'] },
  // Add more...
]
```

---

## 📊 Expected Results

### Daily:
- ✅ 1 new featured topic icon
- ✅ Rotates through categories
- ✅ Links to educational content
- ✅ Updates automatically

### Weekly:
- ✅ 7 different topics
- ✅ Covers all categories
- ✅ Keeps homepage fresh

### Monthly:
- ✅ 30+ featured topics
- ✅ Comprehensive coverage
- ✅ Engages users daily

---

## 🎉 Result

**Your homepage will now:**
- ✅ Show a new learning topic every day
- ✅ Rotate through NASA, Newton, Quantum, Astrophysics topics
- ✅ Link to educational content
- ✅ Update automatically
- ✅ Deploy to live site automatically

**Users will see fresh content every day!** 🚀

---

## 📚 Files Created

- `client/src/data/dailyTopics.ts` - Topic data storage
- `client/src/components/DailyTopicIcon.tsx` - Homepage component
- `server/daily-topics-api.ts` - API endpoints
- `n8n/workflows/daily-topic-generator.json` - n8n workflow

**Import the workflow and activate it!** 🎉
