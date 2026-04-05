-- I) Seed Data – Default workspace and channels

INSERT INTO workspaces (id, name, slug) VALUES
  ('a0000000-0000-0000-0000-000000000001', 'Orbital Simulator Hub Community', 'orbital-hub')
ON CONFLICT DO NOTHING;

-- Default channels (workspace_id = above)
INSERT INTO channels (workspace_id, name, slug, description, is_public) VALUES
  ('a0000000-0000-0000-0000-000000000001', 'home', 'home', 'Welcome and general chat. Say hi!', true),
  ('a0000000-0000-0000-0000-000000000001', 'astrophysics', 'astrophysics', 'Stars, black holes, cosmology, exoplanets.', true),
  ('a0000000-0000-0000-0000-000000000001', 'aerospace', 'aerospace', 'Aerospace engineering and flight.', true),
  ('a0000000-0000-0000-0000-000000000001', 'orbital-mechanics', 'orbital-mechanics', 'Orbits, Kepler, gravity, satellites.', true),
  ('a0000000-0000-0000-0000-000000000001', 'satellites', 'satellites', 'Satellite design, GPS, Starlink, navigation.', true),
  ('a0000000-0000-0000-0000-000000000001', 'ai-in-space', 'ai-in-space', 'AI in aerospace and autonomous systems.', true),
  ('a0000000-0000-0000-0000-000000000001', 'mars', 'mars', 'Mars missions, rovers, and exploration.', true),
  ('a0000000-0000-0000-0000-000000000001', 'nasa-news', 'nasa-news', 'NASA missions and space news.', true),
  ('a0000000-0000-0000-0000-000000000001', 'homework-help', 'homework-help', 'Get help with space-related assignments.', true),
  ('a0000000-0000-0000-0000-000000000001', 'career', 'career', 'Space careers, internships, and jobs.', true)
ON CONFLICT (workspace_id, slug) DO NOTHING;

-- Onboarding message (optional: insert first message in #home after first user joins)
-- e.g. INSERT INTO messages (channel_id, sender_id, body) SELECT id, ... FROM channels WHERE slug = 'home' LIMIT 1;
