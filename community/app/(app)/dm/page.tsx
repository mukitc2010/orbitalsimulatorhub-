import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function DMPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/sign-in');

  const { data: convos } = await supabase
    .from('dm_participants')
    .select(`
      conversation_id,
      dm_conversations(id),
      profile_id
    `)
    .eq('profile_id', user.id);

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold text-space-100 mb-4">Direct messages</h1>
      <p className="text-space-500 text-sm">
        Direct messages appear here when you start a conversation from a profile or channel.
      </p>
      <Link
        href="/channels"
        className="mt-4 inline-block text-accent-cyan hover:underline text-sm"
      >
        Back to channels
      </Link>
    </div>
  );
}
