-- ============================================================
-- MAIN WEBSITE TABLES (Orbital Simulator Hub) - OPTIONAL
-- Run in the SAME Supabase project as the community (after full-setup.sql).
-- Use for: blog from DB, newsletter signups, optional feedback.
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Blog posts (for n8n auto-posting and CMS-style content)
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  category TEXT NOT NULL,
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

-- Newsletter / contact signups
CREATE TABLE IF NOT EXISTS newsletter_signups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  source TEXT,
  subscribed_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_newsletter_signups_email ON newsletter_signups(email);

-- Optional: simple page feedback (e.g. "Was this helpful?")
CREATE TABLE IF NOT EXISTS page_feedback (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  path TEXT NOT NULL,
  helpful BOOLEAN,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_page_feedback_path ON page_feedback(path);

-- RLS: allow public read of published blog posts; restrict writes to service role or add admin later
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "blog_posts_public_read" ON blog_posts;
CREATE POLICY "blog_posts_public_read" ON blog_posts
  FOR SELECT USING (published = true);

-- RLS: allow anyone to insert newsletter signup (public form)
ALTER TABLE newsletter_signups ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "newsletter_signups_public_insert" ON newsletter_signups;
CREATE POLICY "newsletter_signups_public_insert" ON newsletter_signups
  FOR INSERT WITH CHECK (true);

-- RLS: allow anyone to insert feedback
ALTER TABLE page_feedback ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "page_feedback_public_insert" ON page_feedback;
CREATE POLICY "page_feedback_public_insert" ON page_feedback
  FOR INSERT WITH CHECK (true);
