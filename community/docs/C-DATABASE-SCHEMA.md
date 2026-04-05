# C) Database Schema – Supabase (Postgres)

## Tables & Relationships

### Core

- **workspaces** – Single row for "Orbital Simulator Hub Community".
- **profiles** – 1:1 with auth.users; display name, username, bio, avatar_url, interests[], online_status, terms_accepted_at.
- **channels** – Belongs to workspace; name, slug, description, is_public. Default channels seed.
- **channel_members** – profile_id, channel_id, role (member/moderator), joined_at.
- **study_groups** – workspace_id, name, description, is_public, created_by (profile_id).
- **study_group_members** – profile_id, study_group_id, role, joined_at.
- **dm_conversations** – Two-user DMs: (user_a_id, user_b_id), unique constraint.
- **dm_participants** – conversation_id, profile_id (2 rows per DM).
- **messages** – Polymorphic: channel_id OR study_group_id OR dm_conversation_id; sender_id (profile_id), body, attachments (jsonb), edited_at, deleted_at; created_at for ordering.
- **reactions** – message_id, profile_id, emoji (e.g. 👍🔥🚀), unique (message_id, profile_id, emoji).
- **pinned_messages** – channel_id or study_group_id, message_id, pinned_by, pinned_at.
- **invite_links** – token (unique), type (community | group), workspace_id, study_group_id (nullable), created_by, expires_at, max_uses, use_count.
- **invite_redemptions** – invite_link_id, redeemed_by (profile_id), redeemed_at.
- **reports** – reporter_id, reported_user_id (nullable), reported_message_id (nullable), reason, status (pending/reviewed/resolved).
- **blocks** – blocker_id, blocked_id, created_at.
- **user_roles** – profile_id, workspace_id, role (member/moderator/admin).

## Indexes

- messages: (channel_id, created_at), (study_group_id, created_at), (dm_conversation_id, created_at).
- channel_members: (channel_id, profile_id), (profile_id).
- invite_links: (token), (expires_at).
- profiles: (username) unique, (online_status).

## Notes

- All IDs UUID. Soft delete: messages.deleted_at.
- File storage: Supabase Storage buckets `avatars`, `attachments`; messages.attachments = [{ url, name, type }].
