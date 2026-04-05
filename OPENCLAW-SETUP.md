# OpenClaw Automation for OrbitalSimulatorHub

**News every 6 hours · SEO every 2 hours · Post everywhere**

---

## Quick Setup — OpenClaw Gateway (Recommended)

With OpenClaw gateway running, cron jobs handle everything. No Windows Task Scheduler needed.

### 1. Start the gateway (if not already running)

```powershell
openclaw gateway
```

Keep this running 24/7, or use Task Scheduler to start it on boot.

### 2. Add cron jobs (one-time)

```powershell
# News + blog + deploy + social — every 6 hours
openclaw cron add --name "OrbitalSimulatorHub Update" --every 6h --session isolated --message "Go to c:\Users\mukit\OneDrive\Desktop\nasaArchitech\satellite_simulator_web and execute: npm run openclaw:update" --no-deliver

# SEO sitemap — every 2 hours
openclaw cron add --name "OrbitalSimulatorHub SEO" --every 2h --session isolated --message "Go to c:\Users\mukit\OneDrive\Desktop\nasaArchitech\satellite_simulator_web and execute: npm run seo:auto" --no-deliver
```

### 3. Enable shell access for the agent

The agent must run shell commands. In OpenClaw:

1. Run `openclaw configure` or `openclaw onboard`
2. Enable **shell** or **bash** tool for the agent
3. Approve exec requests when prompted (or set auto-approve for trusted commands)

### 4. Verify

```powershell
openclaw cron list
```

---

## Alternative: Windows Task Scheduler

If you prefer not to use the OpenClaw gateway:

```powershell
cd c:\Users\mukit\OneDrive\Desktop\nasaArchitech\satellite_simulator_web
.\scripts\setup-all-schedules.ps1
```

---

## What Gets Automated

| Task | Frequency | What It Does |
|------|-----------|--------------|
| **Blog post** | Every 6h | Generates new content via Ollama — 50% bias toward Space AGI & Space Engineering |
| **Images** | Every post | Each post gets a category-based NASA image |
| **Affiliate links** | Every post | 2 relevant Amazon books (hubdepot-20) appended to each post |
| **SEO** | Every 2h | Updates sitemap lastmod → more Google visibility |
| **RSS** | Every 6h | Regenerates blog RSS feed |
| **Deploy** | On push | Git push → Vercel auto-deploys |
| **Social** | Every 6h | Posts to LinkedIn + webhook (Zapier → Twitter, Medium, etc.) |

---

## Prerequisites

1. **Node.js** in PATH
2. **Git** configured with push access to your repo
3. **Ollama** running (for blog content) — `ollama run llama3` — optional; site still updates if offline

---

## Post Everywhere (More Views)

Add to `.env`:

```
POST_TO_SOCIAL=1
LINKEDIN_ACCESS_TOKEN=your_token    # See LINKEDIN-SETUP.md
POST_WEBHOOK_URL=https://hooks.zapier.com/...  # Zapier → Twitter, Medium, Reddit, etc.
```

- **LinkedIn** — Direct API. Setup: `LINKEDIN-SETUP.md`
- **Twitter, Medium, Reddit** — Use Zapier or Make.com: create a webhook that receives the POST, then post to each platform. The payload includes `title`, `excerpt`, `url`, `text`.

---

## Post to LinkedIn

1. **Setup LinkedIn** — see `LINKEDIN-SETUP.md`
2. **Add to .env**:
   ```
   POST_TO_SOCIAL=1
   LINKEDIN_ACCESS_TOKEN=your_token
   ```

The scheduled task loads `.env` automatically. LinkedIn tokens expire in ~60 days — re-run OAuth to refresh.

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
