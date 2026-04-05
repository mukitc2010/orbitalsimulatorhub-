# F) Realtime Messaging Approach

## Supabase Realtime

- **Broadcast (optional):** For typing indicators: `supabase.channel('room:' + channelId).on('broadcast', { event: 'typing' }, payload)`.
- **Postgres Changes:** Subscribe to inserts/updates/deletes on `messages` and `reactions` for the current channel/group/DM:

```js
supabase
  .channel('messages:' + channelId)
  .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages', filter: 'channel_id=eq.' + channelId }, handleNewMessage)
  .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'messages', filter: 'channel_id=eq.' + channelId }, handleUpdateMessage)
  .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'messages', filter: 'channel_id=eq.' + channelId }, handleDeleteMessage)
  .on('postgres_changes', { event: '*', schema: 'public', table: 'reactions' }, handleReaction)
  .subscribe();
```

- **Presence:** `supabase.channel('presence:' + channelId).on('presence', { event: 'sync' }, () => { ... })` for online list in right panel; use same for "typing" if not using broadcast.

## Flow

1. User opens channel/group/DM → fetch last N messages (RPC or query with RLS).
2. Subscribe to Postgres changes for that context.
3. On INSERT message → append to list (or merge by id); on UPDATE → replace; on DELETE → remove or show "deleted".
4. Typing: broadcast "typing" with userId; debounce and clear after 3s.
5. Unsubscribe when leaving the view.

## Rate Limiting

- Enforce in DB or API: max messages per user per minute (e.g. 30). Use Supabase Edge Function or app-level check before insert.
