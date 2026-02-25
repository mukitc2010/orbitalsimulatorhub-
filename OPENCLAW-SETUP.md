# OpenClaw Automation for OrbitalSimulatorHub

Let OpenClaw run your website updates, SEO, and content every 6 hours.

---

## What Gets Automated

| Task | Frequency | What It Does |
|------|-----------|--------------|
| **Blog post** | Every 6h | Generates new content via Ollama — 50% bias toward Space AGI & Space Engineering |
| **Images** | Every post | Each post gets a category-based NASA image |
| **Affiliate links** | Every post | 2 relevant Amazon books (hubdepot-20) appended to each post |
| **SEO** | Every 6h | Updates sitemap lastmod, SEO-optimized prompts, commits |
| **RSS** | Every 6h | Regenerates blog RSS feed |
| **Deploy** | On push | Git push → Vercel auto-deploys |
| **Journal/social** | Optional | Post latest to Twitter, Medium, etc. (you extend) |

---

## Prerequisites

1. **OpenClaw** installed (`npm install -g openclaw`)
2. **Ollama** running (for blog content) — `ollama run llama3`
3. **Node.js** in PATH
4. **Git** configured with push access to your repo

---

## Step 1: Start the OpenClaw Gateway

The gateway must run for cron to work. Run in a dedicated terminal:

```powershell
openclaw gateway
```

Or run as a background service (Windows):

```powershell
# Install as Windows service (if supported)
openclaw gateway install
```

Keep this running 24/7, or use Task Scheduler to start it on boot.

---

## Step 2: Add the 6-Hour Cron Job

With the gateway running:

```powershell
openclaw cron add `
  --name "OrbitalSimulatorHub Update" `
  --every 6h `
  --session isolated `
  --message "Run the OrbitalSimulatorHub website update. Go to c:\Users\mukit\OneDrive\Desktop\nasaArchitech\satellite_simulator_web and execute: npm run openclaw:update" `
  --no-deliver
```

To get a summary in Telegram/Discord when it runs:

```powershell
openclaw cron add `
  --name "OrbitalSimulatorHub Update" `
  --every 6h `
  --session isolated `
  --message "Run the OrbitalSimulatorHub website update. Go to c:\Users\mukit\OneDrive\Desktop\nasaArchitech\satellite_simulator_web and execute: npm run openclaw:update" `
  --announce `
  --channel telegram `
  --to "YOUR_CHAT_ID"
```

---

## Step 3: Give the Agent Shell Access

The agent needs permission to run shell commands. In OpenClaw:

1. Run `openclaw configure` or `openclaw onboard`
2. Ensure the agent has **bash** or **shell** tool enabled
3. Approve exec requests when prompted (or set auto-approve for trusted commands)

---

## Step 4: Verify

```powershell
openclaw cron list
openclaw cron run <job-id>   # Run once now to test
```

---

## Post Journal Everywhere (Optional)

To cross-post your latest blog to Twitter, Medium, LinkedIn:

1. **Install OpenClaw xurl skill** (for Twitter/X):
   ```powershell
   npx clawhub install xurl
   ```

2. **Extend `scripts/post-to-social.js`** with your API keys and logic

3. **Enable in the update**:
   ```powershell
   $env:POST_TO_SOCIAL="1"
   npm run openclaw:update
   ```

4. **Add to cron message** — include "Then run scripts/post-to-social.js" in the agent message

---

## Monetization (Make Money)

The site includes a **Support Section** in the footer with:

| Feature | Env Var | Purpose |
|---------|---------|---------|
| Ko-fi | `VITE_KOFI_URL` | Tip jar link |
| Buy Me a Coffee | `VITE_BMC_URL` | Tip jar link |
| AdSense | `VITE_ADSENSE_ID` | Google AdSense client ID (ca-pub-xxx) |

Add to `.env` in project root:

```
VITE_KOFI_URL=https://ko-fi.com/yourname
VITE_BMC_URL=https://buymeacoffee.com/yourname
VITE_ADSENSE_ID=ca-pub-xxxxxxxxxx
```

**Amazon affiliate** (hubdepot-20) — **Space Shop** (`/space-shop`):
- **Books** — Only verified available on Amazon.com (0393609391, 0080977472, etc.)
- **NASA t-shirts** — B0B92VHTVD, B07SSCVV4G, B07KW5ZV6M, B07PKRBHK7
- **NASA toys** — LEGO Shuttle (B08STQBXN5), LEGO Rocket (B09JHZY7JF), STEM rocket (B0CSNN775Y)
- **Accessories** — NASA tote (B08P15CLQ5)

**OpenClaw deploy checklist** — When running `npm run openclaw:update`, the script:
1. Generates blog post (content-agent) — uses `scripts/affiliate-books.json` for book links (verified ASINs only)
2. Updates SEO/sitemap
3. Regenerates RSS
4. Commits: `blogPosts.ts`, `seo-config.ts`, `sitemap.xml`, `rss.xml`, `index.html`
5. Pushes to GitHub → Vercel auto-deploys

**Do NOT** add unverified ASINs. Only use products in `client/src/data/nasaMerchandise.ts`.

---

## More Visitors: SEO + Content Tips

- **SEO**: The `seo:auto` script updates sitemap lastmod. Search engines favor fresh sitemaps.
- **Content**: New blog posts every 6h = more indexable pages.
- **Social**: Posting to Twitter/LinkedIn/Medium drives referral traffic.
- **n8n**: You can also use n8n workflows (see `COMPLETE-AUTO-DEPLOY-SETUP.md`) for additional automation.

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Gateway not running | `openclaw gateway` in a separate terminal |
| Cron not firing | Check `openclaw cron list` and `openclaw cron status` |
| Agent doesn't run script | Ensure shell tool is enabled; check `openclaw approvals` |
| Ollama offline | Blog uses template fallback; site still updates |
| Git push fails | Check `git remote -v` and credentials |

---

## Manual Run

To run the update manually (without OpenClaw):

```powershell
cd c:\Users\mukit\OneDrive\Desktop\nasaArchitech\satellite_simulator_web
npm run openclaw:update
```
