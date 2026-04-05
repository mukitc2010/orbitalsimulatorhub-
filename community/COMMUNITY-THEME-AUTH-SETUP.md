# Community + Theme + Auth — Setup

This doc describes the **Community + Theme + Auth** system for orbitalsimulatorhub.com.

## File tree (main additions)

```
community/
├── app/
│   ├── api/events/route.ts          # POST /api/events (page_view, tag_follow, post_view, doc_open)
│   ├── community/
│   │   ├── CommunityLayoutClient.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx                 # Slack-style feed
│   ├── welcome/page.tsx              # Pre-login lobby
│   ├── sign-in/page.tsx              # + theme toggle in header
│   ├── sign-up/page.tsx              # 3-step wizard (email → interests → level+goals)
│   ├── privacy/page.tsx
│   ├── guidelines/page.tsx
│   └── (app)/settings/theme/page.tsx # Theme customization
├── components/
│   ├── ThemeProvider.tsx
│   ├── ThemeInitScript.tsx
│   ├── ThemeToggle.tsx
│   └── PublicNav.tsx
├── lib/
│   ├── theme.ts                     # Theme packs + custom
│   ├── profile.ts                   # Profile types
│   ├── recommender.ts               # Mock tag recommender (TODO: embeddings + LLM)
│   └── events-client.ts             # trackEvent() for /api/events
├── supabase/migrations/
│   └── 003_theme_and_events.sql     # profiles.level, goals, theme_settings; events table
└── globals.css                      # CSS variables + .bg-app, .text-app, etc.
```

## Supabase

1. **Run migration 003** (after `full-setup.sql`):
   - In SQL Editor, run `supabase/migrations/003_theme_and_events.sql`.
   - Adds to `profiles`: `level`, `goals`, `theme_settings` (jsonb).
   - Creates `events` table and RLS.

2. **Profile `theme_settings`** stores e.g.:
   ```json
   { "theme": "space-aurora", "density": "normal" }
   ```
   or for custom:
   ```json
   { "theme": "custom", "primary": "#4AA8FF", "bg": "#070B14", "card": "#0D1628", "density": "normal" }
   ```

## Routes

| Route | Access | Description |
|-------|--------|-------------|
| `/` | Public | Redirects to `/welcome` |
| `/welcome` | Public | Pre-login lobby (hero, CTAs, locked feed preview, testimonials) |
| `/sign-in` | Public | Sign in + theme toggle in header |
| `/sign-up` | Public | 3-step wizard → create profile → redirect `/community` |
| `/community` | Private | Slack-style layout (sidebar + feed + suggested) |
| `/settings/theme` | Private | Theme packs + custom colors + density; save to profile |
| `/api/events` | POST, auth | Store events for personalization scaffold |

## Theme system

- **ThemeProvider** (React Context) + **useTheme()** apply theme via `data-theme` and CSS variables on `<html>`.
- **ThemeInitScript** runs before React to prevent flash (reads localStorage).
- Logged-in users: theme loaded from `profiles.theme_settings` and overrides localStorage.
- Changing theme updates localStorage immediately and persists to Supabase when saved.

## Event tracking (scaffold)

- `POST /api/events` with `{ "event_type": "page_view" | "tag_follow" | "post_view" | "doc_open", "event_data": {} }`.
- Use `trackEvent('page_view', { path: '/community' })` from client.
- **lib/recommender.ts**: mock recommender by tag counts; TODO: embeddings + LLM summary + daily digest.

## Default theme: Space Aurora

- `--bg: #070B14`, `--card: #0D1628`, `--primary: #4AA8FF`, `--secondary: #8B5CFF`, etc.
- Hero gradient: `linear-gradient(90deg, #4AA8FF 0%, #8B5CFF 50%, #33D6A6 100%)`.
