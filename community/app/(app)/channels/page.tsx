import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

const WORKSPACE_ID = process.env.NEXT_PUBLIC_WORKSPACE_ID ?? 'a0000000-0000-0000-0000-000000000001';

export default async function ChannelsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/sign-in');

  const { data: member } = await supabase
    .from('channel_members')
    .select('channel_id')
    .eq('profile_id', user.id)
    .limit(1)
    .single();

  if (member?.channel_id) {
    redirect(`/channels/${member.channel_id}`);
  }

  const { data: firstChannel } = await supabase
    .from('channels')
    .select('id')
    .eq('workspace_id', WORKSPACE_ID)
    .eq('slug', 'home')
    .limit(1)
    .single();

  if (firstChannel) {
    await supabase.from('channel_members').insert({
      channel_id: firstChannel.id,
      profile_id: user.id,
    });
    redirect(`/channels/${firstChannel.id}`);
  }

  return (
    <div className="flex-1 flex items-center justify-center p-6">
      <div className="text-center text-space-400">
        <p>No channels yet. Join a channel to start.</p>
        <a href="/channels/browse" className="mt-2 inline-block text-accent-cyan hover:underline">
          Browse channels
        </a>
      </div>
    </div>
  );
}
