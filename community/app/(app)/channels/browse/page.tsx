import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import Link from 'next/link';

const WORKSPACE_ID = process.env.NEXT_PUBLIC_WORKSPACE_ID ?? 'a0000000-0000-0000-0000-000000000001';

export default async function BrowseChannelsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/sign-in');

  const { data: joined } = await supabase
    .from('channel_members')
    .select('channel_id')
    .eq('profile_id', user.id);
  const joinedIds = new Set((joined ?? []).map((j) => j.channel_id));

  const { data: channels } = await supabase
    .from('channels')
    .select('id, name, slug, description')
    .eq('workspace_id', WORKSPACE_ID)
    .eq('is_public', true)
    .order('slug');

  async function joinChannel(formData: FormData) {
    'use server';
    const channelId = formData.get('channelId') as string;
    if (!channelId) return;
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    await supabase.from('channel_members').insert({
      channel_id: channelId,
      profile_id: user.id,
    });
    revalidatePath('/channels/browse');
    revalidatePath('/channels');
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-xl font-bold text-space-100 mb-2">Browse channels</h1>
      <p className="text-space-500 text-sm mb-6">
        Join a channel to start discussing. Try #astrophysics or #orbital-mechanics.
      </p>
      <ul className="space-y-2">
        {(channels ?? []).map((ch) => {
          const isJoined = joinedIds.has(ch.id);
          return (
            <li
              key={ch.id}
              className="flex items-center justify-between rounded-lg bg-space-800 border border-space-700 p-4"
            >
              <div>
                <span className="font-medium text-space-200">#{ch.slug}</span>
                {ch.description && (
                  <p className="text-sm text-space-500 mt-0.5">{ch.description}</p>
                )}
              </div>
              {isJoined ? (
                <Link
                  href={`/channels/${ch.id}`}
                  className="text-sm text-accent-cyan hover:underline"
                >
                  Open
                </Link>
              ) : (
                <form action={joinChannel}>
                  <input type="hidden" name="channelId" value={ch.id} />
                  <button
                    type="submit"
                    className="rounded-lg bg-accent-cyan px-3 py-1.5 text-sm font-medium text-space-900 hover:opacity-90"
                  >
                    Join
                  </button>
                </form>
              )}
            </li>
          );
        })}
      </ul>
      <Link href="/channels" className="mt-6 inline-block text-space-400 hover:text-space-200 text-sm">
        ← Back to channels
      </Link>
    </div>
  );
}
