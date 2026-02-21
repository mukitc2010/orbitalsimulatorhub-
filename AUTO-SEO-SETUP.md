# Auto SEO Every 2 Hours — Setup Guide

SEO updates run automatically every 2 hours to keep sitemap `lastmod` fresh for crawlers.

## What It Does

- Updates `client/public/sitemap.xml` — sets all `lastmod` dates to today
- Commits and pushes to GitHub (only when changes exist)
- Triggers Vercel redeploy

## Option 1: n8n (Recommended if n8n runs 24/7)

1. Open n8n (usually http://localhost:5678)
2. Import workflow: `n8n/workflows/auto-seo-every-2-hours.json`
3. Activate the workflow (toggle ON)
4. It runs every 2 hours automatically

## Option 2: Windows Task Scheduler

1. Open PowerShell as Administrator
2. Run:
   ```powershell
   cd "c:\Users\mukit\OneDrive\Desktop\nasaArchitech\satellite_simulator_web"
   .\scripts\schedule-seo-windows.ps1
   ```
3. Task `OrbitalSimulatorHub-AutoSEO` is created
4. To disable: `Unregister-ScheduledTask -TaskName "OrbitalSimulatorHub-AutoSEO"`

## Option 3: Manual / One-off

```bash
npm run seo:auto
```

Or:

```bash
node scripts/auto-seo-update.js
```

## Files

| File | Purpose |
|------|---------|
| `scripts/auto-seo-update.js` | Updates sitemap, git commit & push |
| `n8n/workflows/auto-seo-every-2-hours.json` | n8n workflow (every 2 hours) |
| `scripts/schedule-seo-windows.ps1` | Creates Windows scheduled task |
