import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { CommunityLayoutClient } from './CommunityLayoutClient';

export default async function CommunityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  let user: { id: string } | null = null;
  try {
    const { data } = await supabase.auth.getUser();
    user = data?.user ?? null;
  } catch {}
  if (!user) redirect('/sign-in?redirect=/community');

  let profile = null;
  try {
    const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
    profile = data;
  } catch {}

  return (
    <CommunityLayoutClient profile={profile} userId={user.id}>
      {children}
    </CommunityLayoutClient>
  );
}
