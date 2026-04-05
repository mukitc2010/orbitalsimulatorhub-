# Community Feature – Deliverables Index

## A) Product spec
**File:** `docs/A-PRODUCT-SPEC.md`  
Pages, routes, user flows, role model, empty states.

## B) UI layout
**File:** `docs/B-UI-LAYOUT.md`  
Slack-like desktop/mobile layout, components, design tokens (NASA vibe, dark default).

## C) Database schema
**Files:**
- `docs/C-DATABASE-SCHEMA.md` – Tables and relationships (text).
- `supabase/migrations/001_schema.sql` – Full Postgres schema (workspaces, profiles, channels, channel_members, study_groups, study_group_members, dm_conversations, dm_participants, messages, reactions, pinned_messages, invite_links, invite_redemptions, reports, blocks, user_roles, trigger for new user → profile).

## D) Security rules
**File:** `supabase/migrations/002_rls.sql`  
RLS enabled on all tables; policies for read/insert/update/delete by role and membership.

## E) API / server actions
**File:** `docs/E-API-AND-ACTIONS.md`  
Supabase client usage, server actions (profile, join/leave channel, study group, DMs, messages, invites, reports, blocks, search).

## F) Realtime
**File:** `docs/F-REALTIME.md`  
Supabase Postgres Changes for messages and reactions; optional broadcast for typing.

## G) Build plan
**File:** `docs/G-BUILD-PLAN.md`  
MVP in 5 milestones (foundation, channels, DMs/groups, polish/safety, launch).

## H) SEO / marketing
**File:** `docs/H-SEO-MARKETING.md`  
Study rooms, AstroBot in chat, weekly events; meta for community subdomain.

## I) Seed data
**File:** `supabase/seed.sql`  
Single workspace “Orbital Simulator Hub Community” and default channels: #home, #astrophysics, #aerospace, #orbital-mechanics, #satellites, #ai-in-space, #mars, #nasa-news, #homework-help, #career.

---

## Implemented app (Next.js 14 + Supabase)

- **Auth:** Sign up, sign in, forgot password, magic link; `/auth/callback`; middleware protects community routes.
- **Onboarding:** Pick interests after sign up.
- **Layout:** Slack-style sidebar (channels, study groups, DMs, invite, profile, settings).
- **Channels:** Browse public channels, join, open channel; realtime messages; composer.
- **Study groups:** List, create (name, description, public/private), open group; realtime group chat.
- **DMs:** Placeholder list (full 1:1 in V2).
- **Invite:** Generate link (community/group, expiration, max uses); copy link; redeem at `/invite/[token]` (sign in then auto-join #home).
- **Profile:** Display name, username, bio; save.
- **Settings:** Sign out.

## How to run

1. Create Supabase project; run `001_schema.sql`, `002_rls.sql`, then `seed.sql`.
2. Set `.env.local`: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `NEXT_PUBLIC_WORKSPACE_ID`.
3. `npm install` and `npm run dev` in `community/` (app on port 3001).

## Deploy

- Deploy as separate app (e.g. Vercel) at `community.orbitalsimulatorhub.com`.
- Or mount under main site at `/community` if the main app supports it.
