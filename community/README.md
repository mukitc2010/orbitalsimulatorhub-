# Orbital Simulator Hub Community

Slack-style community for the Orbital Simulator Hub (space/aerospace learning). **Accessible only after sign up / login.**

## Tech

- **Next.js 14** (App Router)
- **Supabase** (Auth, Postgres, Realtime, RLS)
- **Tailwind CSS** (dark default, NASA vibe)

## Setup

1. **Supabase project**
   - Create a project at [supabase.com](https://supabase.com).
   - Run migrations in order:
     - `supabase/migrations/001_schema.sql`
     - `supabase/migrations/002_rls.sql`
   - Run seed: `supabase/seed.sql` (in SQL Editor).
   - Enable Email auth (and optionally Magic Link) in Authentication → Providers.
   - In Authentication → URL Configuration, set Site URL and Redirect URLs to your app (e.g. `http://localhost:3001`, `https://community.orbitalsimulatorhub.com`).

2. **Env**
   - Copy `.env.example` to `.env.local`.
   - Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
   - Set `NEXT_PUBLIC_WORKSPACE_ID` to the workspace UUID from the seed (default in seed is `a0000000-0000-0000-0000-000000000001`).

3. **Run**
   ```bash
   npm install
   npm run dev
   ```
   App runs at `http://localhost:3001`.

## Features (MVP)

- **Auth:** Sign up, sign in, forgot password, magic link.
- **Profile:** Display name, username, bio, interests; terms on sign up.
- **Channels:** Public channels (#home, #astrophysics, #orbital-mechanics, etc.); join from browse; realtime messages.
- **Study groups:** Placeholder list + create (full create in V2).
- **DMs:** Placeholder list (full 1:1 in V2).
- **Invite links:** Generate (community/group, expiration, max uses); redeem at `/invite/[token]` (sign in then auto-join).
- **Onboarding:** Pick interests after sign up.
- **Settings:** Sign out.

## Docs

- `docs/A-PRODUCT-SPEC.md` – Pages and user flows
- `docs/B-UI-LAYOUT.md` – Slack-like layout
- `docs/C-DATABASE-SCHEMA.md` – Tables
- `docs/E-API-AND-ACTIONS.md` – Server actions / API
- `docs/F-REALTIME.md` – Realtime messaging
- `docs/G-BUILD-PLAN.md` – Milestones
- `docs/H-SEO-MARKETING.md` – SEO hooks

## Deploy

- **Vercel:** Connect repo, set env, deploy. Set root directory to `community` if monorepo.
- **Subdomain:** e.g. `community.orbitalsimulatorhub.com` → point to this app.

## Security

- All community routes (channels, dm, groups, profile, invite, settings) require auth; middleware redirects to `/sign-in`.
- RLS on all tables; policies in `002_rls.sql`.
- Invite links are token-based with optional expiration and max uses.
