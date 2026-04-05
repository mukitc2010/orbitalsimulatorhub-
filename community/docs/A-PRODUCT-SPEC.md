# A) Product Spec – Orbital Simulator Hub Community

## Overview

A Slack-style community for space/aerospace learners. **Accessible only after sign up/login.** Single workspace: "Orbital Simulator Hub Community."

---

## Pages & Routes

| Route | Auth | Description |
|-------|------|-------------|
| `/` | No | Landing: value prop + CTA "Join community" → redirect to sign-in |
| `/sign-in` | No | Sign in (email/password or magic link) |
| `/sign-up` | No | Sign up + accept Terms |
| `/forgot-password` | No | Forgot password flow |
| `/auth/callback` | No | OAuth/magic link callback |
| `/onboarding` | Yes | Pick interests → suggest channels (after first login) |
| `/channels` | Yes | Redirect to default channel |
| `/channels/[channelId]` | Yes | Channel chat view |
| `/dm` | Yes | DM list |
| `/dm/[userId]` | Yes | 1:1 DM chat |
| `/groups` | Yes | Study groups list |
| `/groups/[groupId]` | Yes | Study group chat |
| `/groups/new` | Yes | Create study group |
| `/invite` | Yes | Generate invite links (community + per group) |
| `/invite/[token]` | No→Yes | Consume invite: sign in/up then join |
| `/profile` | Yes | Own profile (display name, username, bio, photo, interests) |
| `/profile/[userId]` | Yes | Public profile (view only) |
| `/settings` | Yes | Account, notifications, privacy (block list) |
| `/search` | Yes | Search messages |
| `/reports` | Admin | Reported content (MVP: simple list) |

---

## User Flows

### 1. New user – Sign up → Onboarding → Channel

1. User clicks "Join community" on main site or `/`.
2. Redirect to `/sign-up`. Enter email, password; accept Terms.
3. Email verification (or magic link) → redirect to `/auth/callback` then `/onboarding`.
4. Onboarding: pick interests (Astrophysics, Aerospace, Satellites, AI, NASA missions, etc.) → system suggests channels.
5. "Join suggested channels" or skip → redirect to `/channels` (default channel, e.g. `#home`).
6. Left sidebar: Channels, Study Groups, DMs. Main area: channel chat.

### 2. Returning user – Sign in → Last channel or default

1. `/sign-in` → success → redirect to `/channels` or last visited channel (stored in pref/localStorage).
2. Sidebar shows joined channels, DMs, study groups.

### 3. Invite flow – Generate link → Friend uses link

1. User goes to `/invite`. Chooses "Invite to community" or "Invite to study group X".
2. Options: expiration (24h / 7d / never), max uses (e.g. 10).
3. Copy link (e.g. `https://community.orbitalsimulatorhub.com/invite/abc123`).
4. Friend opens link → if not logged in: sign up/sign in → then auto-join community (or group).
5. Redirect to channel or group.

### 4. DM flow

1. From channel or profile: "Message" → go to `/dm/[userId]`.
2. Compose message → send. Real-time updates.

### 5. Study group – Create → Invite

1. `/groups/new`: name, description, public/private.
2. Create → redirect to `/groups/[groupId]`.
3. Invite via `/invite` (invite to group) → share link.

### 6. Safety – Report / Block

1. Message menu → "Report" or "Block user". Report stored; admin can review.
2. Block: user is hidden from blocker's DMs/channel list; no message exchange.

---

## Role Model (MVP)

| Role | Permissions |
|------|-------------|
| **member** | Join channels, DM, create/join groups, invite, report, block |
| **moderator** | Same + delete messages, remove users from channel/group, see reports |
| **admin** | Same + assign mod/admin, manage channels, full reports |

---

## Empty States (Copy)

- **No channels joined:** "Join a channel to start discussing. Try #astrophysics or #orbital-mechanics."
- **No DMs:** "Direct messages appear here when you start a conversation."
- **No study groups:** "Create a study group or ask for an invite in a channel."
- **No messages in channel:** "This is the start of #channel-name. Say hi!"

---

## SEO / Marketing Hooks (for main site)

- **Study rooms:** "Join study rooms by topic – astrophysics, orbital mechanics, AI in space."
- **Ask AstroBot in chat:** "Get answers from AstroBot inside community channels."
- **Weekly events:** "Join weekly live Q&As and study sessions in the community."
