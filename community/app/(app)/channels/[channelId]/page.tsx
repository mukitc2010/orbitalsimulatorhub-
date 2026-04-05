import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { ChannelChat } from '@/components/ChannelChat';

export default async function ChannelPage({
  params,
}: {
  params: Promise<{ channelId: string }>;
}) {
  const { channelId } = await params;
  const supabase = await createClient();
  const { data: channel } = await supabase
    .from('channels')
    .select('id, name, slug, description')
    .eq('id', channelId)
    .single();

  if (!channel) notFound();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) notFound();

  const { data: member } = await supabase
    .from('channel_members')
    .select('id')
    .eq('channel_id', channelId)
    .eq('profile_id', user.id)
    .single();

  if (!member) {
    await supabase.from('channel_members').insert({
      channel_id: channelId,
      profile_id: user.id,
    });
  }

  return (
    <ChannelChat
      channelId={channel.id}
      channelName={channel.slug}
      channelDescription={channel.description}
      userId={user.id}
    />
  );
}
