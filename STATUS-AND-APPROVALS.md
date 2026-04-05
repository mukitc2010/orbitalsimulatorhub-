# What’s Happening & What Needs Your Approval

## What’s happening (what’s done)

### 1. Main site (Orbital Simulator Hub)
- **SEO:** Global meta, sitemap, robots.txt, JSON-LD, per-page titles.
- **Traffic pages:** Space News, NASA for Kids, AI in Space, Satellite Tutorial, Space Quiz.
- **Blog:** 10+ posts, RSS, first “daily” post (Artemis guide).
- **Auto-posting setup:** n8n workflows (RSS + Ollama), auto-deploy script, step-by-step guides.
- **Scripts:** `npm run setup`, `npm run verify`, `start-all-services.bat`, etc.

### 2. Community app (new)
- **Slack-style community** in `/community` (Next.js 14 + Supabase).
- **Docs (A–I):** Product spec, UI layout, DB schema, RLS, API/realtime, build plan, SEO/marketing, seed data.
- **Implemented:** Sign up/in, onboarding, channels (browse, join, chat with realtime), study groups (create, chat), invite links (create + redeem), profile, settings.
- **Not running yet** until you create a Supabase project and add env (see below).

---

## What needs your approval / action

### Main site (no approval needed – just optional actions)

| Item | What it is | Your action |
|------|------------|-------------|
| **Deploy** | Push and deploy so Google can crawl. | Deploy when ready (e.g. Vercel). |
| **Google Search Console** | Submit sitemap so Google indexes. | Add property, submit `sitemap.xml`. |
| **n8n workflows** | Auto-post 2–3 posts/day. | Import workflows in n8n and turn them **Active** (see QUICK-START-READY.md). |
| **Domain in sitemap/robots** | Sitemap uses `https://orbitalsimulatorhub.com`. | If you use another domain, say so and we update it. |

Nothing on the main site is “pending approval” – it’s ready; the table above is what you can do next.

---

### Community app (needs your approval and setup)

The community is **built but not live** until you:

| # | What | Approve / do this |
|---|------|-------------------|
| 1 | **Use a Supabase project** | Create a (free) project at [supabase.com](https://supabase.com). |
| 2 | **Run SQL in Supabase** | In SQL Editor, run in order: `community/supabase/migrations/001_schema.sql`, then `002_rls.sql`, then `community/supabase/seed.sql`. |
| 3 | **Auth settings in Supabase** | In Dashboard → Authentication → URL Configuration: set **Site URL** (e.g. `https://community.orbitalsimulatorhub.com` or `http://localhost:3001`). Add **Redirect URLs** for the same. |
| 4 | **Env vars** | In `community/` create `.env.local` from `community/.env.example` and set: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_WORKSPACE_ID` (use the UUID from seed: `a0000000-0000-0000-0000-000000000001`). |
| 5 | **Where to host community** | Decide: **A)** subdomain `community.orbitalsimulatorhub.com` (recommended), or **B)** a path like `yoursite.com/community` (if your host supports it). No code approval needed; just deploy the `community` app to the chosen URL. |
| 6 | **Terms / privacy** | Sign up currently says “I accept the Terms of Service.” If you have a real Terms/Privacy page, we can link it; otherwise you may want to add those pages later. |

**Approval in words:**  
- “I’m okay using Supabase for auth and database.”  
- “I’ll create the project and run the SQL + env.”  
- “I want the community at [URL you choose].”

---

## Quick checklist

**Main site**
- [ ] Deploy (if not already).
- [ ] Submit sitemap in Google Search Console.
- [ ] (Optional) Turn on n8n workflows for daily posts.
- [ ] (Optional) Change domain in sitemap/robots if not orbitalsimulatorhub.com.

**Community**
- [ ] Create Supabase project.
- [ ] Run migrations + seed in Supabase.
- [ ] Set Auth URLs and add `.env.local` in `community/`.
- [ ] Deploy `community` app to your chosen URL (e.g. community.orbitalsimulatorhub.com).
- [ ] (Later) Add Terms/Privacy pages if you want a real link.

---

## Summary

- **What’s happening:** Main site has SEO, traffic pages, blog, and auto-posting setup; the Slack-style community app is implemented and documented (A–I) but not connected to a live Supabase project yet.
- **What needs to be approved / done:**  
  - **Main site:** No formal approval; optional next steps are deploy, Search Console, n8n, and domain.  
  - **Community:** You approve using Supabase and the chosen URL; then you create the project, run SQL, set env and Auth URLs, and deploy the community app.

If you tell me your domain and whether you’re okay with Supabase, I can give you the exact env and URL values to paste.
