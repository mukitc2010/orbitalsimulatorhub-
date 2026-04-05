import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { SignOutButton } from '@/components/SignOutButton';

export default async function SettingsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/sign-in');

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-xl font-bold text-space-100 mb-4">Settings</h1>
      <div className="space-y-4">
        <p className="text-space-400 text-sm">Account: {user.email}</p>
        <SignOutButton />
      </div>
    </div>
  );
}
