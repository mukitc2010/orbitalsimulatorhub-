# Supabase Database Suggestions for Your Website

You can use **one Supabase project** for both the **community app** and the **main Orbital Simulator Hub site**. Below is what you already have and what you can add.

---

## 1. Already in Supabase (Community App)

Your `community/supabase/full-setup.sql` already creates these in the **same** Supabase project:

| Table / feature | Purpose |
|-----------------|--------|
| **workspaces** | One hub (e.g. Orbital Hub) |
| **profiles** | User profiles (linked to Supabase Auth) |
| **channels** + **channel_members** | Public channels (e.g. #general, #missions) |
| **study_groups** + **study_group_members** | Study groups |
| **dm_conversations** + **dm_participants** | Direct messages |
| **messages** | Chat in channels, groups, and DMs |
| **invite_links** | Invite people to the community |
| **Supabase Auth** | Sign up, sign in, magic link |

No change needed here; keep using this for the community.

---

## 2. Optional: Main Website Tables (Same Supabase)

If you want the **main site** (blog, SEO, newsletter) to use the database instead of (or in addition to) code/JSON, add these in the **same** project.

### A. Blog posts (replace or mirror `blogPosts.ts`)

Useful for: n8n auto-posting, CMS-style edits, more posts without redeploying.

```sql
-- Blog posts (main site)
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  category TEXT NOT NULL,  -- e.g. 'nasa-news', 'space-facts', 'satellite-tutorials', 'astronomy-lessons'
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  tags TEXT[] DEFAULT '{}',
  seo_keywords TEXT,
  published BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_date ON blog_posts(date DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_category ON blog_posts(category);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published) WHERE published = true;
```

- **Who writes:** You (or n8n) insert/update rows.
- **Who reads:** Your main site can fetch posts via Supabase client or a small API; you can keep existing `blogPosts.ts` and sync from DB later.

### B. Newsletter / contact signups

For “Subscribe” or “Get updates” on the main site.

```sql
-- Newsletter or contact signups (main site)
CREATE TABLE IF NOT EXISTS newsletter_signups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  source TEXT,  -- e.g. 'footer', 'blog', 'popup'
  subscribed_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_newsletter_signups_email ON newsletter_signups(email);
```

- Use Supabase Auth or a simple form; insert into `newsletter_signups`. No auth required for public signup if you use RLS that allows anonymous insert (or a small backend endpoint).

### C. Simple analytics or feedback (optional)

For “Was this helpful?” or minimal event counts.

```sql
-- Optional: simple feedback or page views
CREATE TABLE IF NOT EXISTS page_feedback (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  path TEXT NOT NULL,
  helpful BOOLEAN,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_page_feedback_path ON page_feedback(path);
```

---

## 3. What to Use Where

| Need | Supabase feature | Notes |
|------|-------------------|--------|
| Community (channels, DMs, study groups) | **Database + Auth + Realtime** | Already set up in `full-setup.sql` |
| Main site blog (dynamic, n8n posts) | **Database** | Add `blog_posts` table above |
| User sign-up (community) | **Supabase Auth** | Already used by community |
| Newsletter / signups | **Database** | Add `newsletter_signups` |
| File uploads (avatars, images) | **Supabase Storage** | Create buckets, e.g. `avatars`, `blog-images` |
| Live updates (chat, presence) | **Supabase Realtime** | Already used in community |

---

## 4. One Project vs Two

- **One project (recommended):** Use the same Supabase project (e.g. `srxtknwdlitqrswnlfxl`) for both community and main site. Run `full-setup.sql` once for community, then run the optional `blog_posts` / `newsletter_signups` (and optionally `page_feedback`) SQL in the same project. Same URL and anon key in both apps (or per-app if you split later).
- **Two projects:** One for community, one for main site. Only do this if you need strict separation (e.g. different teams, billing).

---

## 5. Quick Start for Main Site Tables

1. In Supabase: **SQL Editor** → New query.
2. Paste and run the **Blog posts** block (and **Newsletter** / **Feedback** if you want them).
3. (Optional) Enable RLS and add policies so only authenticated admins can insert/update `blog_posts`, and the public can only read published rows.

If you want, the next step can be a single **optional SQL file** (e.g. `supabase-main-site-tables.sql`) that you run once, plus a short note on RLS for `blog_posts` and `newsletter_signups`.
