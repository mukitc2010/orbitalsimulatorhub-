import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { GroupChat } from '@/components/GroupChat';

export default async function GroupPage({
  params,
}: {
  params: Promise<{ groupId: string }>;
}) {
  const { groupId } = await params;
  const supabase = await createClient();
  const { data: group } = await supabase
    .from('study_groups')
    .select('id, name, slug, description')
    .eq('id', groupId)
    .single();

  if (!group) notFound();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) notFound();

  const { data: member } = await supabase
    .from('study_group_members')
    .select('id')
    .eq('study_group_id', groupId)
    .eq('profile_id', user.id)
    .single();

  if (!member) {
    return (
      <div className="p-6">
        <p className="text-space-400">You are not a member of this group. Ask for an invite or join if it&apos;s public.</p>
      </div>
    );
  }

  return (
    <GroupChat
      groupId={group.id}
      groupName={group.slug}
      groupDescription={group.description}
      userId={user.id}
    />
  );
}
