# 📋 STEP-BY-STEP GUIDE - Complete Setup

## 🎯 Goal: Get 2-3 Blog Posts Per Day Automatically

---

## **STEP 1: Install & Start Ollama** (5 minutes)

### **1.1 Install Ollama**

**Windows:**
```bash
# Option 1: Download installer
# Go to: https://ollama.ai/download
# Download Windows installer and run it

# Option 2: Using winget
winget install Ollama.Ollama
```

**Mac:**
```bash
brew install ollama
```

**Linux:**
```bash
curl -fsSL https://ollama.ai/install.sh | sh
```

### **1.2 Pull the Model**

```bash
ollama pull llama2
```

**This downloads ~4GB. Wait for it to finish.**

### **1.3 Test Ollama Works**

```bash
ollama run llama2 "Hello, can you hear me?"
```

**Expected:** You should get a response from the AI.

### **1.4 Start Ollama Server** (Keep Running)

```bash
ollama serve
```

**Keep this terminal window open!** Ollama needs to be running for n8n to use it.

**Verify it's running:**
- Open browser: http://localhost:11434/api/tags
- Should see JSON with "llama2" model listed

---

## **STEP 2: Start Your Blog API Server** (2 minutes)

### **2.1 Open New Terminal**

**Keep Ollama running in one terminal, open a NEW terminal for this.**

### **2.2 Navigate to Project**

```bash
cd "C:\Users\mukit\OneDrive\Desktop\nasaArchitech\satellite_simulator_web"
```

### **2.3 Start API Server**

```bash
npm run dev:api
```

**Expected output:**
```
Server running on port 3003
API endpoints available at http://localhost:3003/api/blog
```

**Keep this terminal open too!** API server must run for n8n to post.

### **2.4 Test API Works**

**Open new browser tab:**
```
http://localhost:3003/api/blog/health
```

**Expected:** `{"status":"ok","service":"blog-api"}`

---

## **STEP 3: Install & Start n8n** (5 minutes)

### **3.1 Install n8n**

**Option 1: Using npm (Recommended)**
```bash
npm install -g n8n
```

**Option 2: Using npx (No install needed)**
```bash
npx n8n
```

### **3.2 Start n8n**

**If installed globally:**
```bash
n8n start
```

**If using npx:**
```bash
npx n8n
```

**Expected output:**
```
n8n ready on 0.0.0.0, port 5678
```

### **3.3 Open n8n in Browser**

**Go to:** http://localhost:5678

**First time:** You'll see a setup screen. Create an account (just email + password).

**After login:** You'll see the n8n dashboard.

**Keep this terminal open!** n8n must run for workflows to execute.

---

## **STEP 4: Import Workflows** (3 minutes)

### **4.1 Find Workflow Files**

Your workflow files are here:
- `n8n/workflows/daily-rss-to-blog.json`
- `n8n/workflows/daily-ollama-research.json`

### **4.2 Import First Workflow**

1. **In n8n:** Click **"Workflows"** in left sidebar
2. **Click:** **"Import from File"** button (top right)
3. **Browse:** Navigate to `n8n/workflows/daily-rss-to-blog.json`
4. **Select:** Click "Open"
5. **Click:** **"Import"**

**Expected:** You'll see a workflow appear with nodes connected.

### **4.3 Import Second Workflow**

1. **Click:** **"Import from File"** again
2. **Browse:** Navigate to `n8n/workflows/daily-ollama-research.json`
3. **Select:** Click "Open"
4. **Click:** **"Import"**

**Expected:** Two workflows now in your list.

### **4.4 Check Workflow Paths**

**Important:** Update paths if your project is in a different location.

**For each workflow:**
1. **Click on workflow** to open it
2. **Find node:** "Regenerate RSS & Build" (last node)
3. **Click on it**
4. **Check "Command" field:**
   ```
   cd "C:\Users\mukit\OneDrive\Desktop\nasaArchitech\satellite_simulator_web" && npm run generate:rss && npm run build:client
   ```
5. **Update path** if your project is elsewhere

---

## **STEP 5: Test One Workflow Manually** (5 minutes)

### **5.1 Open RSS Workflow**

1. **Click:** "Daily RSS to Blog" workflow
2. **You'll see:** All nodes connected

### **5.2 Execute Manually**

1. **Click:** **"Execute Workflow"** button (top right)
2. **Watch:** Nodes will light up green as they execute
3. **Wait:** Takes 30-60 seconds

**What happens:**
- ✅ Fetches NASA RSS
- ✅ Parses articles
- ✅ Sends to Ollama
- ✅ Formats blog post
- ✅ Posts to API
- ✅ Regenerates RSS & builds

### **5.3 Check Results**

**Option 1: Check API Response**
- Look at "POST to Blog API" node
- Should show: `{"success": true, "message": "Blog post added successfully"}`

**Option 2: Check File**
- Open: `client/src/data/blogPosts.ts`
- Scroll to bottom
- **Should see:** New post added!

**Option 3: Check Build Output**
- Look at "Regenerate RSS & Build" node
- Should show: Build completed successfully

### **5.4 If It Failed**

**Common issues:**

**"Ollama not responding"**
- Check Ollama is running: `ollama serve`
- Test: `curl http://localhost:11434/api/tags`

**"API not responding"**
- Check API server is running: `npm run dev:api`
- Test: `http://localhost:3003/api/blog/health`

**"Build failed"**
- Check for TypeScript errors
- Run manually: `npm run build:client`

---

## **STEP 6: Activate Both Workflows** (1 minute)

### **6.1 Activate RSS Workflow**

1. **In n8n:** Go to "Workflows" page
2. **Find:** "Daily RSS to Blog"
3. **Toggle:** Switch "Active" to **ON** (green)
4. **Schedule:** Should show "Daily at 9:00 AM"

### **6.2 Activate Research Workflow**

1. **Find:** "Daily Ollama Research Content"
2. **Toggle:** Switch "Active" to **ON** (green)
3. **Schedule:** Should show "Daily at 2:00 PM"

### **6.3 Verify Both Active**

**You should see:**
- ✅ Both workflows have green "Active" badge
- ✅ Both show next execution time
- ✅ Both will run automatically

---

## **STEP 7: Let Them Run Daily** (Ongoing)

### **7.1 What Happens Automatically**

**Every day:**
- **9:00 AM:** RSS workflow runs → 1-2 posts from NASA news
- **2:00 PM:** Research workflow runs → 1 post from Ollama

**Total:** 2-3 posts per day automatically!

### **7.2 Keep These Running**

**You need 3 things running 24/7:**

1. **Ollama:** `ollama serve` (Terminal 1)
2. **API Server:** `npm run dev:api` (Terminal 2)
3. **n8n:** `n8n start` or `npx n8n` (Terminal 3)

**Or run as services:**
- Windows: Use Task Scheduler or NSSM
- Mac/Linux: Use systemd or launchd

### **7.3 Monitor Workflows**

**In n8n:**
1. **Go to:** "Executions" tab
2. **See:** All workflow runs
3. **Check:** Green = success, Red = failed

**Daily check:**
- Morning: Check RSS workflow executed
- Afternoon: Check research workflow executed
- Verify: New posts in `blogPosts.ts`

---

## **STEP 8: Review Posts Weekly** (30 minutes/week)

### **8.1 Check Post Quality**

**Every week:**
1. **Open:** `client/src/data/blogPosts.ts`
2. **Review:** Last 14-21 posts (2-3 per day × 7 days)
3. **Check:**
   - ✅ Titles are clear and SEO-friendly
   - ✅ Content makes sense
   - ✅ Internal links work
   - ✅ No obvious errors

### **8.2 Adjust Prompts if Needed**

**If posts are low quality:**

**Edit workflows:**
1. **Open workflow** in n8n
2. **Find:** "Ollama Rewrite Article" or "Ollama Generate Content" node
3. **Edit:** The prompt text
4. **Add:** More specific instructions
5. **Save:** Workflow

**Example better prompt:**
```
Rewrite this NASA news article. Requirements:
- 600-800 words
- Include 3-5 internal links to /simulator, /learn/orbital-mechanics
- Use simple language for beginners
- Add bullet points and examples
- End with conclusion paragraph
```

### **8.3 Fix Any Issues**

**If you see problems:**
- **Bad titles:** Edit prompt to specify title format
- **Missing links:** Add instruction to include internal links
- **Too short:** Increase word count requirement
- **Wrong category:** Check category mapping in code

---

## **STEP 9: Share Posts on Social Media** (10 min/day)

### **9.1 Reddit** (Best for Traffic)

**Subreddits to post in:**
- r/space (1.8M members)
- r/nasa (2.1M members)
- r/astronomy (1.5M members)
- r/Physics (2.3M members)
- r/learnmath (500K members)

**How to post:**
1. **Find:** Your latest blog post
2. **Create post:**
   - **Title:** "How [Topic] Works - Interactive Guide with 3D Simulator"
   - **Link:** Your blog post URL
   - **Text:** Brief description + why it's useful
3. **Post:** Share in relevant subreddit
4. **Don't spam:** 1-2 posts per day max, different subreddits

**Example Reddit post:**
```
Title: How Artemis Moon Mission Works - Complete Guide with Interactive Simulator

Link: https://yourdomain.com/blog/how-artemis-moon-mission-works-2026-complete-guide

Text: I wrote a complete guide explaining how NASA's Artemis program works - from the SLS rocket to the lunar Gateway. Includes orbital mechanics explanations and links to an interactive 3D simulator. Perfect for students and space enthusiasts!
```

### **9.2 Twitter/X** (Daily Engagement)

**Post daily:**
1. **Find:** Your latest blog post
2. **Tweet:**
   ```
   🚀 New: [Post Title]
   
   Learn how [topic] works with our interactive guide and 3D simulator.
   
   [Link to post]
   
   #Space #NASA #Education
   ```
3. **Post:** Once per day
4. **Engage:** Reply to comments, retweet space news

**Example tweet:**
```
🚀 New: How Artemis Moon Mission Works - Complete Guide

Learn how NASA's SLS rocket, Orion spacecraft, and lunar Gateway work. Includes orbital mechanics explanations and interactive 3D simulator.

https://yourdomain.com/blog/how-artemis-moon-mission-works-2026-complete-guide

#Space #NASA #Artemis #Education
```

### **9.3 Quora** (Backlinks)

**Answer questions:**
1. **Search:** "how do satellites orbit" or "how does NASA launch rockets"
2. **Find:** Questions with many views
3. **Answer:** Provide helpful answer + link to your relevant post
4. **Don't spam:** 1-2 answers per day, be helpful

**Example Quora answer:**
```
Great question! Satellites orbit Earth using orbital mechanics - they move fast enough that gravity curves their path into an orbit.

Here's how it works:
- Satellites need ~7.8 km/s speed for Low Earth Orbit
- Gravity pulls them down, but speed keeps them moving forward
- Result: Circular or elliptical orbit

I wrote a detailed guide with an interactive 3D simulator that shows this in action: [link to your post]

You can try adding satellites and seeing how they orbit in real-time!
```

### **9.4 Hacker News** (Traffic Spikes)

**Post interesting content:**
1. **Find:** Your best technical post
2. **Post:** On Hacker News (news.ycombinator.com)
3. **Title:** Make it interesting, not promotional
4. **Engage:** Answer comments

**Example HN post:**
```
Title: I built an interactive 3D orbital mechanics simulator

Link: https://yourdomain.com/simulator

Text: After learning about orbital mechanics, I built a web-based simulator where you can add satellites and see how they orbit. Includes educational content and real NASA mission data.
```

### **9.5 Product Hunt** (One-Time Launch)

**Launch your site:**
1. **Go to:** producthunt.com
2. **Click:** "Submit"
3. **Fill out:**
   - Name: "Orbital Simulator Hub"
   - Tagline: "Learn space physics with interactive 3D simulator"
   - Description: Your site description
   - Link: Your homepage URL
4. **Launch:** On a weekday (Tuesday-Thursday best)
5. **Engage:** Reply to comments, upvote

---

## **STEP 10: Monitor & Optimize** (Weekly)

### **10.1 Check Google Search Console**

**After 2-4 weeks:**
1. **Go to:** https://search.google.com/search-console
2. **Add:** Your site URL
3. **Submit:** Sitemap (`https://yourdomain.com/sitemap.xml`)
4. **Check weekly:**
   - Which keywords people search
   - Which pages get clicks
   - What's ranking

### **10.2 Double Down on What Works**

**If a post gets traffic:**
- Write more posts on that topic
- Improve SEO on that page
- Add more internal links
- Share it more on social media

### **10.3 Fix What Doesn't Work**

**If posts get no traffic:**
- Check SEO keywords
- Improve titles
- Add more internal links
- Share on different platforms

---

## ✅ **CHECKLIST**

### **Setup (One-Time)**
- [ ] Ollama installed and running
- [ ] Model downloaded (`llama2`)
- [ ] API server running on port 3003
- [ ] n8n installed and running
- [ ] Both workflows imported
- [ ] Workflows tested manually
- [ ] Both workflows activated
- [ ] Paths updated if needed

### **Daily (Automatic)**
- [ ] Workflows run automatically (9 AM & 2 PM)
- [ ] Posts appear in `blogPosts.ts`
- [ ] RSS feed regenerates
- [ ] Site rebuilds

### **Weekly (Manual)**
- [ ] Review post quality (14-21 posts)
- [ ] Share 1-2 posts on Reddit
- [ ] Post daily on Twitter
- [ ] Answer 1-2 Quora questions
- [ ] Check Google Search Console

### **Monthly**
- [ ] 60-90 posts created
- [ ] Google starts indexing
- [ ] Traffic begins to grow
- [ ] Adjust prompts if needed

---

## 🎯 **EXPECTED TIMELINE**

| Time | What Happens | Your Action |
|------|--------------|-------------|
| **Week 1** | Workflows running, posts generating | Monitor, fix any issues |
| **Week 2-4** | 30-60 posts created | Start sharing on social media |
| **Month 2** | 60-120 posts, Google indexing | Check Search Console, optimize |
| **Month 3** | 120-180 posts, rankings improving | Double down on what works |
| **Month 4+** | Traffic growing steadily | Keep posting, keep sharing |

---

## 🚨 **TROUBLESHOOTING**

### **Workflows Not Running**

**Check:**
1. ✅ Ollama is running (`ollama serve`)
2. ✅ API server is running (`npm run dev:api`)
3. ✅ n8n is running (`n8n start`)
4. ✅ Workflows are "Active" (green toggle)
5. ✅ Cron times are correct

### **Posts Not Appearing**

**Check:**
1. ✅ API server received request (check terminal)
2. ✅ File permissions (can write to `blogPosts.ts`)
3. ✅ No TypeScript errors
4. ✅ Build completed successfully

### **Low Quality Posts**

**Fix:**
1. ✅ Improve prompts in workflows
2. ✅ Add more specific instructions
3. ✅ Review and edit posts manually
4. ✅ Adjust Ollama temperature (lower = more focused)

---

## 💡 **PRO TIPS**

1. **Start small:** Test workflows for 3-5 days before going full auto
2. **Review quality:** Check posts weekly, adjust prompts as needed
3. **Share consistently:** Daily social media posts = more backlinks
4. **Be patient:** Google takes 60-90 days to rank new sites
5. **Focus on value:** Quality content > quantity

---

**You're all set! 🚀**

Follow these steps and you'll have 2-3 posts per day automatically. In 60-90 days, Google will start ranking you, and traffic will begin to grow.

**Questions?** Check `SETUP-COMPLETE.md` for more details.
