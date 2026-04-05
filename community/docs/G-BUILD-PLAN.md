# G) Step-by-Step Build Plan (MVP Milestones)

## Milestone 1 – Foundation (Week 1)

- [ ] Next.js 14 App Router project; Tailwind; Supabase client + env (NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY).
- [ ] Run Supabase migrations (001_schema, 002_rls).
- [ ] Auth: Sign up, sign in, forgot password, magic link; middleware to protect `/channels`, `/dm`, `/groups`, `/profile`, `/invite`, `/settings`; redirect unauthenticated to `/sign-in`.
- [ ] Profile: create on first signup (trigger); profile page (display name, username, bio, interests, avatar); update profile action.
- [ ] Terms acceptance on sign-up; store `terms_accepted_at`.

## Milestone 2 – Workspace & Channels (Week 2)

- [ ] Seed workspace + default channels (see I).
- [ ] Layout: Slack-like sidebar (channels list, study groups, DMs, user footer) + main area + optional right panel.
- [ ] Channel list: fetch channels user is member of; "Join channel" for public channels not yet joined.
- [ ] Channel view: header, message list (paginated/virtualized), message composer; send message (insert with RLS).
- [ ] Realtime: subscribe to messages for current channel; append new messages.

## Milestone 3 – DMs & Study Groups (Week 3)

- [ ] DM: resolve or create conversation for two users; DM list (recent); DM view with message list + composer; realtime for DM.
- [ ] Study groups: create group (name, slug, description, public/private); list user’s groups; group view with messages; join public group or via invite.
- [ ] Invite links: create (community vs group, expiration, max uses); redeem flow (sign in/up then join); redirect after redeem.

## Milestone 4 – Polish & Safety (Week 4)

- [ ] Reactions (👍🔥🚀); message edit/delete (own); pin message; right panel (members, pinned).
- [ ] Report message/user; block user (hide blocked in DMs/channel list).
- [ ] File/image upload (Supabase Storage); attach to message (attachments jsonb).
- [ ] Basic search (messages by body text).
- [ ] Profanity filter (simple blocklist) + rate limit (e.g. 30 msg/min).
- [ ] Onboarding: "Pick interests" → suggest channels; join suggested.

## Milestone 5 – Launch Prep

- [ ] Email verification or magic link required before access.
- [ ] Admin/mod role: assign in `user_roles`; mod can delete messages, remove from channel; admin can manage channels.
- [ ] Empty states; mobile responsive sidebar (drawer).
- [ ] SEO/marketing page for main site: "Study rooms", "AstroBot in chat", "Weekly events".
