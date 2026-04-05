import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export default async function InviteRedeemPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/sign-in?redirect=/invite/${token}`);
  }

  const { data: invite } = await supabase
    .from('invite_links')
    .select('*')
    .eq('token', token)
    .single();

  if (!invite || (invite.expires_at && new Date(invite.expires_at) < new Date())) {
    return (
      <div className="min-h-screen bg-space-900 flex items-center justify-center px-4">
        <div className="text-center text-space-400">
          <p>This invite link is invalid or expired.</p>
          <Link href="/channels" className="mt-4 inline-block text-accent-cyan hover:underline">
            Go to community
          </Link>
        </div>
      </div>
    );
  }

  if (invite.max_uses != null && invite.use_count >= invite.max_uses) {
    return (
      <div className="min-h-screen bg-space-900 flex items-center justify-center px-4">
        <div className="text-center text-space-400">
          <p>This invite link has reached its max uses.</p>
          <Link href="/channels" className="mt-4 inline-block text-accent-cyan hover:underline">
            Go to community
          </Link>
        </div>
      </div>
    );
  }

  const { data: existing } = await supabase
    .from('invite_redemptions')
    .select('id')
    .eq('invite_link_id', invite.id)
    .eq('redeemed_by', user.id)
    .single();

  if (!existing) {
    const workspaceId = invite.workspace_id;
    const defaultChannel = await supabase
      .from('channels')
      .select('id')
      .eq('workspace_id', workspaceId)
      .eq('slug', 'home')
      .limit(1)
      .single();

    if (defaultChannel?.id) {
      await supabase.from('channel_members').upsert(
        { channel_id: defaultChannel.id, profile_id: user.id },
        { onConflict: 'channel_id,profile_id' }
      );
    }

    await supabase.from('invite_redemptions').insert({
      invite_link_id: invite.id,
      redeemed_by: user.id,
    });
    await supabase
      .from('invite_links')
      .update({ use_count: (invite.use_count ?? 0) + 1 })
      .eq('id', invite.id);
  }

  redirect('/channels');
}
