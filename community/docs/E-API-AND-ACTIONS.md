# E) API Endpoints / Server Actions

## Supabase Client (client-side)

- **Auth:** `supabase.auth.signUp`, `signInWithPassword`, `signInWithOtp`, `resetPasswordForEmail`, `getSession`, `onAuthStateChange`.
- **DB (Realtime):** Channels, messages, reactions subscribed via `supabase.channel()` and `.on('postgres_changes', ...)`.

## Server Actions (Next.js)

- **Auth callback:** Parse magic link / OAuth → redirect to `/onboarding` or `/channels`.
- **Profile:** `updateProfile(display_name, username, bio, avatar_url, interests)` – update `profiles` where id = auth.uid().
- **Channels:** `joinChannel(channelId)`, `leaveChannel(channelId)` – insert/delete `channel_members`.
- **Study groups:** `createStudyGroup(name, slug, description, isPublic)` – insert `study_groups` + `study_group_members`; `joinStudyGroup(groupId)`; `leaveStudyGroup(groupId)`.
- **DMs:** `getOrCreateDmConversation(otherUserId)` – find or create `dm_conversations` + `dm_participants`.
- **Messages:** Prefer realtime + direct Supabase insert from client (with RLS). Optional: `sendMessage({ channelId | studyGroupId | dmConversationId }, body, attachments)` server action that inserts and returns message.
- **Reactions:** Client inserts/deletes `reactions` (RLS).
- **Pinned:** `pinMessage(messageId, channelId | studyGroupId)`, `unpinMessage(pinId)`.
- **Invites:** `createInviteLink({ type: 'community' | 'group', studyGroupId?, expiresInHours?, maxUses? })` – insert `invite_links`, return token + full URL. `redeemInvite(token)` – check token, increment use_count, insert redemption, add user to workspace (e.g. default channel) or study group.
- **Reports:** `reportMessage(messageId, reason)`, `reportUser(userId, reason)` – insert `reports`.
- **Blocks:** `blockUser(userId)`, `unblockUser(userId)` – insert/delete `blocks`.
- **Search:** `searchMessages(query, channelId?)` – full-text search on `messages.body` (add `tsvector` column if needed) filtered by membership.

## REST (optional)

- If not using server actions for invites: `POST /api/invites` (create), `POST /api/invites/redeem` (redeem by token).
