import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { ProfileForm } from '@/components/ProfileForm';

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/sign-in');

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-xl font-bold text-space-100 mb-4">Your profile</h1>
      <ProfileForm profile={profile} userId={user.id} />
    </div>
  );
}
