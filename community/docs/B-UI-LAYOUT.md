# B) UI Layout – Slack-like, Mobile Responsive

## Desktop (≥1024px)

```
+------------------+--------------------------------+-------------------+
| SIDEBAR (240px)  | MAIN CHAT (flex 1)             | RIGHT PANEL (280) |
|                  |                                |                   |
| [Logo]           | #channel-name        [Pin] [i] | Channel info      |
| Orbital Hub      | -------------------------------| Members (online)  |
|                  |                                | Pinned messages   |
| CHANNELS         | [Message list - scroll]        |                   |
|  # astrophysics  |   user: message                |                   |
|  # aerospace     |   user: message                |                   |
|  # orbital-mech  |   ...                          |                   |
|  + Add           |                                |                   |
|                  | -------------------------------|                   |
| STUDY GROUPS     | [Composer: type message] [Send]|                   |
|  Group A         |                                |                   |
|  + Create        |                                |                   |
|                  |                                |                   |
| DIRECT MESSAGES  |                                |                   |
|  @ user1         |                                |                   |
|  + Add           |                                |                   |
|                  |                                |                   |
| [Profile] [Invite] [Settings]                    |                   |
+------------------+--------------------------------+-------------------+
```

## Mobile (<768px)

- **Default:** Channel list (or drawer). Tap channel → full-screen chat (list + composer). No right panel.
- **Menu (hamburger):** Channels, Groups, DMs, Profile, Invite, Settings.
- **Chat:** Message list + composer; channel info in header dropdown (members, pinned).

## Components (High-Level)

- **Layout:** `AppLayout` – sidebar + main + optional right panel.
- **Sidebar:** `Sidebar` – channels list, study groups, DMs, user footer.
- **ChannelList:** `ChannelList` – public channels with unread indicator.
- **StudyGroupList:** `StudyGroupList` – user’s groups.
- **DMList:** `DMList` – recent DMs with online status.
- **MainArea:** `MainArea` – header (channel name, actions) + `MessageList` + `MessageComposer`.
- **MessageList:** Virtualized list, each item `Message` (avatar, name, body, time, reactions, edit/delete).
- **MessageComposer:** Textarea + file upload + send; optional reply-thread id.
- **RightPanel:** `ChannelInfo` (description, members), `PinnedMessages`, member list.
- **InvitePage:** Form (type: community vs group), expiration, max uses) → display link + copy.

## Design Tokens (NASA vibe, dark default)

- **Dark:** bg `#0f172a` (slate-900), sidebar `#1e293b`, surface `#334155`, text primary `#f1f5f9`, accent `#38bdf8` (cyan).
- **Light:** bg `#f8fafc`, sidebar `#e2e8f0`, surface white, text `#0f172a`, accent `#0ea5e9`.
- **Typography:** Clean sans (e.g. Inter); monospace for code.
- **Empty states:** Illustration or icon + short copy from Product Spec.
