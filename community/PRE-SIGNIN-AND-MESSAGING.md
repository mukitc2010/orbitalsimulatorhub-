# Pre–Sign-In Content & Messaging (Orbital Simulator Hub)

## 1. What visitors can see before sign-in (to get them interested)

Your site [orbitalsimulatorhub.com](https://www.orbitalsimulatorhub.com/) currently shows the main product (simulator, learning, NASA). The **community** app has a **welcome lobby** at `/welcome` with:

- **Hero:** “Join the mission. Find your study crew.”
- **Social proof:** 2,400+ members, 12 channels, 50+ groups
- **Locked feed preview:** blurred teaser + “Sign up to view”
- **Popular groups:** Astrophysics, Orbital Mechanics, NASA News, etc.
- **Testimonials:** short quotes from “members”
- **Footer:** Privacy, Community guidelines

### Ideas to add (to increase sign-ups)

| Section | What to show | Why it helps |
|--------|----------------|--------------|
| **One-line value** | “Study space & aerospace with others. Channels, DMs, and study groups in one place.” | Makes the benefit clear in 5 seconds. |
| **Live or recent activity** | “3 people joined today” or “Last discussion: 2h ago in #orbital-mechanics” | Shows the community is active. |
| **What you get** | Bullets: Join topic channels · DM anyone · Study groups · Share resources · No ads, focused on space | Reduces “why should I sign up?” friction. |
| **Who it’s for** | “Students, researchers, engineers, and space enthusiasts” | Helps people self-identify. |
| **Simulator + community** | Short line: “Use our orbit simulator, then discuss with the community.” + link to main site simulator | Connects product (simulator) to community. |
| **Trust** | “Free to join · No credit card · We don’t sell your data” (if true) | Lowers sign-up anxiety. |
| **Preview of one channel** | Single unblurred example: e.g. one real (or sample) thread from #general or #orbital-mechanics | Gives a concrete “this is what you get.” |

If the **main site** (Vite app) is what most people see first, add there:

- A clear **“Community”** or **“Join the community”** link in the nav that goes to the welcome/sign-up flow.
- One sentence near the hero: e.g. “Join the community to discuss orbits, share resources, and find study partners.”
- A small **“Join 2,400+ members”** or **“Discuss in the community”** CTA so sign-up is visible without scrolling.

---

## 2. Chat and messaging: what exists today

### Channels (Slack-style)

- **Yes.** You have real **channel chat**:
  - Tables: `channels`, `channel_members`, `messages`
  - UI: `ChannelChat` with real-time updates (Supabase Realtime)
  - Route: `/channels/[channelId]` (by channel **ID**, not slug)
- The **left sidebar** still links to `/channels/general`, `/channels/astrophysics`, etc. (by **slug**). Your app expects **UUID** in `[channelId]`. So either:
  - Change sidebar to use channel IDs from the DB, or
  - Add a route that resolves slug → ID (e.g. `/channels/s/general`) and redirects to `/channels/[id]`.

### Direct messages (DMs)

- **Partly.** DB is there: `dm_conversations`, `dm_participants`, and `messages` can store DMs (`dm_conversation_id`).
- The **DM page** (`/dm`) only shows placeholder text: “Direct messages appear here when you start a conversation from a profile or channel.”
- **Missing:**
  - List of existing DM conversations
  - “Start conversation” from a profile or from “Suggested” users
  - Thread view for one DM conversation (message list + composer)

### “Add people with similar ideas” (LinkedIn-style)

- **Suggested** sidebar shows mock users (e.g. Alex R., Sam K., Jordan L.) with tags (Orbital mechanics, NASA missions).
- **Missing:**
  - Real “suggested” list from DB (e.g. by shared interests, level, or channel)
  - “Message” or “Connect” / “Start chat” on each suggested user
  - Creating a DM conversation when they click “Message”

### Summary

| Feature | Status |
|--------|--------|
| Channel list (sidebar) | Mock list; links use slug, app uses ID |
| Channel chat | ✅ Real (messages + realtime) |
| DM list | Placeholder only |
| Start DM from profile/suggested | ❌ Not built |
| Suggested “people like you” | Mock list; no “message” action |
| Study groups | Link in sidebar; implementation depends on your routes |

---

## 3. What to build next (for full Slack/LinkedIn-style)

1. **Channels in sidebar**  
   Load real `channels` from Supabase (e.g. by workspace). Use channel **id** in links: `/channels/[id]`, or add slug→id resolution.

2. **DM list page**  
   On `/dm`, query `dm_participants` + `dm_conversations` (and last message or timestamp) and render a list of conversations. Click → open thread.

3. **DM thread page**  
   New route e.g. `/dm/[conversationId]`: load messages where `dm_conversation_id = conversationId`, realtime subscribe, and a send box (reuse pattern from `ChannelChat` but for `dm_conversation_id`).

4. **Start DM from Suggested**  
   Suggested users from DB (e.g. by `profiles.interests` or channel membership). “Message” button → create or get `dm_conversations` + `dm_participants` for the two users, then redirect to `/dm/[conversationId]`.

5. **Start DM from profile**  
   On a user’s profile page, “Message” button that does the same: create/find conversation, redirect to DM thread.

6. **Optional: “Connect” or “Add contact”**  
   If you want LinkedIn-style connections, add a `connections` or `contacts` table and a “Connect” action; “Message” can then be limited to connections or open to all.

Once these are in place, you’ll have: **channels** (already working), **DMs** (list + thread + start from suggested/profile), and **suggested people** with a way to **message and discuss** — i.e. Slack-like channels + LinkedIn-style “message people with similar interests.”
