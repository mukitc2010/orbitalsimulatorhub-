'use client';

import { useEffect, useState, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import { format } from 'date-fns';
import { Send } from 'lucide-react';

type Message = {
  id: string;
  body: string;
  sender_id: string;
  created_at: string;
  profiles: { display_name: string | null; username: string } | null;
};

export function GroupChat({
  groupId,
  groupName,
  groupDescription,
  userId,
}: {
  groupId: string;
  groupName: string;
  groupDescription: string | null;
  userId: string;
}) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [body, setBody] = useState('');
  const [loading, setLoading] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  useEffect(() => {
    async function fetchMessages() {
      const { data } = await supabase
        .from('messages')
        .select('id, body, sender_id, created_at, profiles(display_name, username)')
        .eq('study_group_id', groupId)
        .is('deleted_at', null)
        .order('created_at', { ascending: true });
      setMessages((data as Message[]) ?? []);
      setLoading(false);
    }
    fetchMessages();

    const channel = supabase
      .channel(`group:${groupId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `study_group_id=eq.${groupId}`,
        },
        async (payload) => {
          const { data: newRow } = await supabase
            .from('messages')
            .select('id, body, sender_id, created_at, profiles(display_name, username)')
            .eq('id', payload.new.id)
            .single();
          if (newRow) setMessages((prev) => [...prev, newRow as Message]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [groupId, supabase]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    const text = body.trim();
    if (!text) return;
    setBody('');
    await supabase.from('messages').insert({
      study_group_id: groupId,
      sender_id: userId,
      body: text,
    });
  }

  return (
    <div className="flex flex-col h-full">
      <header className="px-4 py-3 border-b border-space-700 shrink-0">
        <span className="font-semibold text-space-100">{groupName}</span>
        {groupDescription && (
          <p className="text-sm text-space-500 mt-0.5">{groupDescription}</p>
        )}
      </header>

      <div className="flex-1 overflow-y-auto scrollbar-thin px-4 py-3">
        {loading ? (
          <p className="text-space-500">Loading…</p>
        ) : messages.length === 0 ? (
          <div className="text-center py-8 text-space-500">
            <p>No messages yet. Start the discussion!</p>
          </div>
        ) : (
          <div className="space-y-3">
            {messages.map((m) => (
              <div key={m.id} className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-space-700 shrink-0 flex items-center justify-center text-sm text-space-300">
                  {(m.profiles?.display_name || m.profiles?.username || '?').slice(0, 1).toUpperCase()}
                </div>
                <div className="min-w-0">
                  <div className="flex items-baseline gap-2">
                    <span className="font-medium text-space-200">
                      {m.profiles?.display_name || m.profiles?.username || 'Unknown'}
                    </span>
                    <span className="text-xs text-space-500">
                      {format(new Date(m.created_at), 'MMM d, HH:mm')}
                    </span>
                  </div>
                  <p className="text-space-300 text-sm mt-0.5 break-words">{m.body}</p>
                </div>
              </div>
            ))}
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSend} className="p-4 border-t border-space-700 shrink-0">
        <div className="flex gap-2">
          <input
            type="text"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder={`Message ${groupName}`}
            className="flex-1 rounded-lg bg-space-800 border border-space-600 px-4 py-2 text-space-100 placeholder-space-500 focus:border-accent-cyan focus:outline-none"
          />
          <button
            type="submit"
            disabled={!body.trim()}
            className="rounded-lg bg-accent-cyan p-2 text-space-900 hover:opacity-90 disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}
