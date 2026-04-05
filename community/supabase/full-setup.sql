-- ============================================================
-- ORBITAL SIMULATOR HUB COMMUNITY - FULL SETUP (run once)
-- Copy this entire file and paste into Supabase SQL Editor → Run
-- ============================================================

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Workspace (single row)
CREATE TABLE IF NOT EXISTS workspaces (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Profiles (1:1 with auth.users)
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE NOT NULL,
  display_name TEXT,
  bio TEXT,
  avatar_url TEXT,
  interests TEXT[] DEFAULT '{}',
  online_status TEXT DEFAULT 'offline' CHECK (online_status IN ('online', 'away', 'offline')),
  terms_accepted_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_profiles_username ON profiles(username);
CREATE INDEX IF NOT EXISTS idx_profiles_online_status ON profiles(online_status);

-- Channels
CREATE TABLE IF NOT EXISTS channels (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  is_public BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(workspace_id, slug)
);

CREATE TABLE IF NOT EXISTS channel_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  channel_id UUID NOT NULL REFERENCES channels(id) ON DELETE CASCADE,
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'member' CHECK (role IN ('member', 'moderator')),
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(channel_id, profile_id)
);

CREATE INDEX IF NOT EXISTS idx_channel_members_channel ON channel_members(channel_id);
CREATE INDEX IF NOT EXISTS idx_channel_members_profile ON channel_members(profile_id);

-- Study groups
CREATE TABLE IF NOT EXISTS study_groups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT NOT NULL,
  description TEXT,
  is_public BOOLEAN DEFAULT true,
  created_by UUID NOT NULL REFERENCES profiles(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(workspace_id, slug)
);

CREATE TABLE IF NOT EXISTS study_group_members (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  study_group_id UUID NOT NULL REFERENCES study_groups(id) ON DELETE CASCADE,
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'member' CHECK (role IN ('member', 'moderator')),
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(study_group_id, profile_id)
);

CREATE INDEX IF NOT EXISTS idx_study_group_members_group ON study_group_members(study_group_id);
CREATE INDEX IF NOT EXISTS idx_study_group_members_profile ON study_group_members(profile_id);

-- DM conversations
CREATE TABLE IF NOT EXISTS dm_conversations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS dm_participants (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  conversation_id UUID NOT NULL REFERENCES dm_conversations(id) ON DELETE CASCADE,
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  joined_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(conversation_id, profile_id)
);

CREATE INDEX IF NOT EXISTS idx_dm_participants_conversation ON dm_participants(conversation_id);
CREATE INDEX IF NOT EXISTS idx_dm_participants_profile ON dm_participants(profile_id);

-- Messages
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  channel_id UUID REFERENCES channels(id) ON DELETE CASCADE,
  study_group_id UUID REFERENCES study_groups(id) ON DELETE CASCADE,
  dm_conversation_id UUID REFERENCES dm_conversations(id) ON DELETE CASCADE,
  sender_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  body TEXT NOT NULL,
  attachments JSONB DEFAULT '[]',
  reply_to_id UUID REFERENCES messages(id) ON DELETE SET NULL,
  edited_at TIMESTAMPTZ,
  deleted_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT one_message_target CHECK (
    (channel_id IS NOT NULL)::int + (study_group_id IS NOT NULL)::int + (dm_conversation_id IS NOT NULL)::int = 1
  )
);

CREATE INDEX IF NOT EXISTS idx_messages_channel ON messages(channel_id, created_at) WHERE channel_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_messages_study_group ON messages(study_group_id, created_at) WHERE study_group_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_messages_dm ON messages(dm_conversation_id, created_at) WHERE dm_conversation_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS idx_messages_sender ON messages(sender_id);

-- Reactions
CREATE TABLE IF NOT EXISTS reactions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  message_id UUID NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  emoji TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(message_id, profile_id, emoji)
);

CREATE INDEX IF NOT EXISTS idx_reactions_message ON reactions(message_id);

-- Pinned messages
CREATE TABLE IF NOT EXISTS pinned_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  message_id UUID NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
  channel_id UUID REFERENCES channels(id) ON DELETE CASCADE,
  study_group_id UUID REFERENCES study_groups(id) ON DELETE CASCADE,
  pinned_by UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  pinned_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT one_pin_target CHECK (
    (channel_id IS NOT NULL)::int + (study_group_id IS NOT NULL)::int = 1
  )
);

CREATE INDEX IF NOT EXISTS idx_pinned_channel ON pinned_messages(channel_id);
CREATE INDEX IF NOT EXISTS idx_pinned_study_group ON pinned_messages(study_group_id);

-- Invite links
CREATE TABLE IF NOT EXISTS invite_links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  token TEXT NOT NULL UNIQUE,
  type TEXT NOT NULL CHECK (type IN ('community', 'group')),
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  study_group_id UUID REFERENCES study_groups(id) ON DELETE CASCADE,
  created_by UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  expires_at TIMESTAMPTZ,
  max_uses INT,
  use_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_invite_links_token ON invite_links(token);
CREATE INDEX IF NOT EXISTS idx_invite_links_expires ON invite_links(expires_at);

CREATE TABLE IF NOT EXISTS invite_redemptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  invite_link_id UUID NOT NULL REFERENCES invite_links(id) ON DELETE CASCADE,
  redeemed_by UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  redeemed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reports
CREATE TABLE IF NOT EXISTS reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  reporter_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  reported_user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
  reported_message_id UUID REFERENCES messages(id) ON DELETE SET NULL,
  reason TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'resolved')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_reports_status ON reports(status);

-- Blocks
CREATE TABLE IF NOT EXISTS blocks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  blocker_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  blocked_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(blocker_id, blocked_id)
);

CREATE INDEX IF NOT EXISTS idx_blocks_blocker ON blocks(blocker_id);

-- User roles
CREATE TABLE IF NOT EXISTS user_roles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  profile_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  workspace_id UUID NOT NULL REFERENCES workspaces(id) ON DELETE CASCADE,
  role TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('member', 'moderator', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(profile_id, workspace_id)
);

CREATE INDEX IF NOT EXISTS idx_user_roles_workspace ON user_roles(workspace_id);

-- Trigger: create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, display_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', 'user_' || substr(replace(NEW.id::text, '-', ''), 1, 12)),
    COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.raw_user_meta_data->>'email')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Enable RLS
ALTER TABLE workspaces ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE channel_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_group_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE dm_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE dm_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE reactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE pinned_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE invite_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE invite_redemptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- RLS Policies
DROP POLICY IF EXISTS "Profiles read" ON profiles;
DROP POLICY IF EXISTS "Profiles update own" ON profiles;
CREATE POLICY "Profiles read" ON profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Profiles update own" ON profiles FOR UPDATE TO authenticated USING (id = auth.uid());

DROP POLICY IF EXISTS "Workspaces read" ON workspaces;
CREATE POLICY "Workspaces read" ON workspaces FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Channels read" ON channels;
CREATE POLICY "Channels read" ON channels FOR SELECT TO authenticated
  USING (is_public = true OR EXISTS (SELECT 1 FROM channel_members cm WHERE cm.channel_id = channels.id AND cm.profile_id = auth.uid()));

DROP POLICY IF EXISTS "Channel members read" ON channel_members;
DROP POLICY IF EXISTS "Channel members insert" ON channel_members;
DROP POLICY IF EXISTS "Channel members delete own" ON channel_members;
CREATE POLICY "Channel members read" ON channel_members FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM channel_members cm WHERE cm.channel_id = channel_members.channel_id AND cm.profile_id = auth.uid()));
CREATE POLICY "Channel members insert" ON channel_members FOR INSERT TO authenticated WITH CHECK (profile_id = auth.uid());
CREATE POLICY "Channel members delete own" ON channel_members FOR DELETE TO authenticated USING (profile_id = auth.uid());

DROP POLICY IF EXISTS "Study groups read" ON study_groups;
DROP POLICY IF EXISTS "Study groups insert" ON study_groups;
DROP POLICY IF EXISTS "Study groups update creator" ON study_groups;
CREATE POLICY "Study groups read" ON study_groups FOR SELECT TO authenticated
  USING (is_public = true OR EXISTS (SELECT 1 FROM study_group_members sgm WHERE sgm.study_group_id = study_groups.id AND sgm.profile_id = auth.uid()));
CREATE POLICY "Study groups insert" ON study_groups FOR INSERT TO authenticated WITH CHECK (created_by = auth.uid());
CREATE POLICY "Study groups update creator" ON study_groups FOR UPDATE TO authenticated USING (created_by = auth.uid());

DROP POLICY IF EXISTS "Study group members read" ON study_group_members;
DROP POLICY IF EXISTS "Study group members insert" ON study_group_members;
DROP POLICY IF EXISTS "Study group members delete own" ON study_group_members;
CREATE POLICY "Study group members read" ON study_group_members FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM study_group_members sgm WHERE sgm.study_group_id = study_group_members.study_group_id AND sgm.profile_id = auth.uid()));
CREATE POLICY "Study group members insert" ON study_group_members FOR INSERT TO authenticated WITH CHECK (profile_id = auth.uid());
CREATE POLICY "Study group members delete own" ON study_group_members FOR DELETE TO authenticated USING (profile_id = auth.uid());

DROP POLICY IF EXISTS "DM conversations read" ON dm_conversations;
DROP POLICY IF EXISTS "DM conversations insert" ON dm_conversations;
CREATE POLICY "DM conversations read" ON dm_conversations FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM dm_participants dp WHERE dp.conversation_id = dm_conversations.id AND dp.profile_id = auth.uid()));
CREATE POLICY "DM conversations insert" ON dm_conversations FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "DM participants read" ON dm_participants;
DROP POLICY IF EXISTS "DM participants insert" ON dm_participants;
CREATE POLICY "DM participants read" ON dm_participants FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM dm_participants dp WHERE dp.conversation_id = dm_participants.conversation_id AND dp.profile_id = auth.uid()));
CREATE POLICY "DM participants insert" ON dm_participants FOR INSERT TO authenticated WITH CHECK (profile_id = auth.uid());

DROP POLICY IF EXISTS "Messages read channel" ON messages;
DROP POLICY IF EXISTS "Messages insert" ON messages;
DROP POLICY IF EXISTS "Messages update own" ON messages;
DROP POLICY IF EXISTS "Messages delete own" ON messages;
CREATE POLICY "Messages read channel" ON messages FOR SELECT TO authenticated
  USING (
    (channel_id IS NOT NULL AND EXISTS (SELECT 1 FROM channel_members cm WHERE cm.channel_id = messages.channel_id AND cm.profile_id = auth.uid()))
    OR (study_group_id IS NOT NULL AND EXISTS (SELECT 1 FROM study_group_members sgm WHERE sgm.study_group_id = messages.study_group_id AND sgm.profile_id = auth.uid()))
    OR (dm_conversation_id IS NOT NULL AND EXISTS (SELECT 1 FROM dm_participants dp WHERE dp.conversation_id = messages.dm_conversation_id AND dp.profile_id = auth.uid()))
  );
CREATE POLICY "Messages insert" ON messages FOR INSERT TO authenticated WITH CHECK (sender_id = auth.uid());
CREATE POLICY "Messages update own" ON messages FOR UPDATE TO authenticated USING (sender_id = auth.uid());
CREATE POLICY "Messages delete own" ON messages FOR DELETE TO authenticated USING (sender_id = auth.uid());

DROP POLICY IF EXISTS "Reactions read" ON reactions;
DROP POLICY IF EXISTS "Reactions insert" ON reactions;
DROP POLICY IF EXISTS "Reactions delete own" ON reactions;
CREATE POLICY "Reactions read" ON reactions FOR SELECT TO authenticated USING (true);
CREATE POLICY "Reactions insert" ON reactions FOR INSERT TO authenticated WITH CHECK (profile_id = auth.uid());
CREATE POLICY "Reactions delete own" ON reactions FOR DELETE TO authenticated USING (profile_id = auth.uid());

DROP POLICY IF EXISTS "Pinned read" ON pinned_messages;
DROP POLICY IF EXISTS "Pinned insert" ON pinned_messages;
DROP POLICY IF EXISTS "Pinned delete" ON pinned_messages;
CREATE POLICY "Pinned read" ON pinned_messages FOR SELECT TO authenticated USING (true);
CREATE POLICY "Pinned insert" ON pinned_messages FOR INSERT TO authenticated WITH CHECK (pinned_by = auth.uid());
CREATE POLICY "Pinned delete" ON pinned_messages FOR DELETE TO authenticated USING (pinned_by = auth.uid());

DROP POLICY IF EXISTS "Invite links read own" ON invite_links;
DROP POLICY IF EXISTS "Invite links insert" ON invite_links;
DROP POLICY IF EXISTS "Invite links update use" ON invite_links;
CREATE POLICY "Invite links read own" ON invite_links FOR SELECT TO authenticated USING (created_by = auth.uid());
CREATE POLICY "Invite links insert" ON invite_links FOR INSERT TO authenticated WITH CHECK (created_by = auth.uid());
CREATE POLICY "Invite links update use" ON invite_links FOR UPDATE TO authenticated USING (created_by = auth.uid());

DROP POLICY IF EXISTS "Invite redemptions insert" ON invite_redemptions;
DROP POLICY IF EXISTS "Invite redemptions read" ON invite_redemptions;
CREATE POLICY "Invite redemptions insert" ON invite_redemptions FOR INSERT TO authenticated WITH CHECK (redeemed_by = auth.uid());
CREATE POLICY "Invite redemptions read" ON invite_redemptions FOR SELECT TO authenticated USING (redeemed_by = auth.uid());

DROP POLICY IF EXISTS "Reports insert" ON reports;
DROP POLICY IF EXISTS "Reports read own" ON reports;
CREATE POLICY "Reports insert" ON reports FOR INSERT TO authenticated WITH CHECK (reporter_id = auth.uid());
CREATE POLICY "Reports read own" ON reports FOR SELECT TO authenticated USING (reporter_id = auth.uid());

DROP POLICY IF EXISTS "Blocks read own" ON blocks;
DROP POLICY IF EXISTS "Blocks insert" ON blocks;
DROP POLICY IF EXISTS "Blocks delete own" ON blocks;
CREATE POLICY "Blocks read own" ON blocks FOR SELECT TO authenticated USING (blocker_id = auth.uid());
CREATE POLICY "Blocks insert" ON blocks FOR INSERT TO authenticated WITH CHECK (blocker_id = auth.uid());
CREATE POLICY "Blocks delete own" ON blocks FOR DELETE TO authenticated USING (blocker_id = auth.uid());

DROP POLICY IF EXISTS "User roles read" ON user_roles;
DROP POLICY IF EXISTS "User roles insert admin" ON user_roles;
CREATE POLICY "User roles read" ON user_roles FOR SELECT TO authenticated USING (true);
CREATE POLICY "User roles insert admin" ON user_roles FOR INSERT TO authenticated WITH CHECK (false);

-- Seed: workspace + channels
INSERT INTO workspaces (id, name, slug) VALUES
  ('a0000000-0000-0000-0000-000000000001', 'Orbital Simulator Hub Community', 'orbital-hub')
ON CONFLICT (slug) DO NOTHING;

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
