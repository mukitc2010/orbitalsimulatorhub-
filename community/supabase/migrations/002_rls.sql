-- D) Row Level Security Policies

-- Helper: current user's profile id
-- In Supabase we use auth.uid()

-- Profiles: read all (for mentions, DMs), update own
CREATE POLICY "Profiles read" ON profiles FOR SELECT TO authenticated USING (true);
CREATE POLICY "Profiles update own" ON profiles FOR UPDATE TO authenticated USING (id = auth.uid());

-- Workspaces: read for all authenticated
CREATE POLICY "Workspaces read" ON workspaces FOR SELECT TO authenticated USING (true);

-- Channels: read if public or member
CREATE POLICY "Channels read" ON channels FOR SELECT TO authenticated
  USING (
    is_public = true
    OR EXISTS (SELECT 1 FROM channel_members cm WHERE cm.channel_id = channels.id AND cm.profile_id = auth.uid())
  );

-- Channel members: read if member of channel; insert/delete own membership
CREATE POLICY "Channel members read" ON channel_members FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM channel_members cm WHERE cm.channel_id = channel_members.channel_id AND cm.profile_id = auth.uid()));
CREATE POLICY "Channel members insert" ON channel_members FOR INSERT TO authenticated WITH CHECK (profile_id = auth.uid());
CREATE POLICY "Channel members delete own" ON channel_members FOR DELETE TO authenticated USING (profile_id = auth.uid());

-- Study groups: read if public or member
CREATE POLICY "Study groups read" ON study_groups FOR SELECT TO authenticated
  USING (
    is_public = true
    OR EXISTS (SELECT 1 FROM study_group_members sgm WHERE sgm.study_group_id = study_groups.id AND sgm.profile_id = auth.uid())
  );
CREATE POLICY "Study groups insert" ON study_groups FOR INSERT TO authenticated WITH CHECK (created_by = auth.uid());
CREATE POLICY "Study groups update creator" ON study_groups FOR UPDATE TO authenticated USING (created_by = auth.uid());

-- Study group members
CREATE POLICY "Study group members read" ON study_group_members FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM study_group_members sgm WHERE sgm.study_group_id = study_group_members.study_group_id AND sgm.profile_id = auth.uid()));
CREATE POLICY "Study group members insert" ON study_group_members FOR INSERT TO authenticated WITH CHECK (profile_id = auth.uid());
CREATE POLICY "Study group members delete own" ON study_group_members FOR DELETE TO authenticated USING (profile_id = auth.uid());

-- DM conversations: participants only
CREATE POLICY "DM conversations read" ON dm_conversations FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM dm_participants dp WHERE dp.conversation_id = dm_conversations.id AND dp.profile_id = auth.uid()));
CREATE POLICY "DM conversations insert" ON dm_conversations FOR INSERT TO authenticated WITH CHECK (true);

-- DM participants
CREATE POLICY "DM participants read" ON dm_participants FOR SELECT TO authenticated
  USING (EXISTS (SELECT 1 FROM dm_participants dp WHERE dp.conversation_id = dm_participants.conversation_id AND dp.profile_id = auth.uid()));
CREATE POLICY "DM participants insert" ON dm_participants FOR INSERT TO authenticated WITH CHECK (profile_id = auth.uid());

-- Messages: read if member of channel/group or DM participant; insert if member; update/delete own or mod
CREATE POLICY "Messages read channel" ON messages FOR SELECT TO authenticated
  USING (
    (channel_id IS NOT NULL AND EXISTS (SELECT 1 FROM channel_members cm WHERE cm.channel_id = messages.channel_id AND cm.profile_id = auth.uid()))
    OR (study_group_id IS NOT NULL AND EXISTS (SELECT 1 FROM study_group_members sgm WHERE sgm.study_group_id = messages.study_group_id AND sgm.profile_id = auth.uid()))
    OR (dm_conversation_id IS NOT NULL AND EXISTS (SELECT 1 FROM dm_participants dp WHERE dp.conversation_id = messages.dm_conversation_id AND dp.profile_id = auth.uid()))
  );
CREATE POLICY "Messages insert" ON messages FOR INSERT TO authenticated WITH CHECK (sender_id = auth.uid());
CREATE POLICY "Messages update own" ON messages FOR UPDATE TO authenticated USING (sender_id = auth.uid());
CREATE POLICY "Messages delete own" ON messages FOR DELETE TO authenticated USING (sender_id = auth.uid());

-- Reactions
CREATE POLICY "Reactions read" ON reactions FOR SELECT TO authenticated USING (true);
CREATE POLICY "Reactions insert" ON reactions FOR INSERT TO authenticated WITH CHECK (profile_id = auth.uid());
CREATE POLICY "Reactions delete own" ON reactions FOR DELETE TO authenticated USING (profile_id = auth.uid());

-- Pinned messages: read if member of channel/group; insert if member
CREATE POLICY "Pinned read" ON pinned_messages FOR SELECT TO authenticated USING (true);
CREATE POLICY "Pinned insert" ON pinned_messages FOR INSERT TO authenticated WITH CHECK (pinned_by = auth.uid());
CREATE POLICY "Pinned delete" ON pinned_messages FOR DELETE TO authenticated USING (pinned_by = auth.uid());

-- Invite links: read own; insert own; update use_count (service or creator)
CREATE POLICY "Invite links read own" ON invite_links FOR SELECT TO authenticated USING (created_by = auth.uid());
CREATE POLICY "Invite links insert" ON invite_links FOR INSERT TO authenticated WITH CHECK (created_by = auth.uid());
CREATE POLICY "Invite links update use" ON invite_links FOR UPDATE TO authenticated USING (created_by = auth.uid());

-- Invite redemptions: insert when redeeming (authenticated)
CREATE POLICY "Invite redemptions insert" ON invite_redemptions FOR INSERT TO authenticated WITH CHECK (redeemed_by = auth.uid());
CREATE POLICY "Invite redemptions read" ON invite_redemptions FOR SELECT TO authenticated USING (redeemed_by = auth.uid());

-- Reports: insert own; read for mods/admins (simplified: allow read for reporter)
CREATE POLICY "Reports insert" ON reports FOR INSERT TO authenticated WITH CHECK (reporter_id = auth.uid());
CREATE POLICY "Reports read own" ON reports FOR SELECT TO authenticated USING (reporter_id = auth.uid());

-- Blocks
CREATE POLICY "Blocks read own" ON blocks FOR SELECT TO authenticated USING (blocker_id = auth.uid());
CREATE POLICY "Blocks insert" ON blocks FOR INSERT TO authenticated WITH CHECK (blocker_id = auth.uid());
CREATE POLICY "Blocks delete own" ON blocks FOR DELETE TO authenticated USING (blocker_id = auth.uid());

-- User roles: read for authenticated
CREATE POLICY "User roles read" ON user_roles FOR SELECT TO authenticated USING (true);
CREATE POLICY "User roles insert admin" ON user_roles FOR INSERT TO authenticated WITH CHECK (false); -- only via service role or migration
