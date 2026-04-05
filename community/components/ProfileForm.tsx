'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';

type Profile = {
  username: string;
  display_name: string | null;
  bio: string | null;
  interests: string[] | null;
} | null;

export function ProfileForm({
  profile,
  userId,
}: {
  profile: Profile;
  userId: string;
}) {
  const [username, setUsername] = useState(profile?.username ?? '');
  const [displayName, setDisplayName] = useState(profile?.display_name ?? '');
  const [bio, setBio] = useState(profile?.bio ?? '');
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');
  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    const { error } = await supabase
      .from('profiles')
      .update({
        username: username.trim(),
        display_name: displayName.trim() || null,
        bio: bio.trim() || null,
        updated_at: new Date().toISOString(),
      })
      .eq('id', userId);
    if (error) {
      setError(error.message);
      return;
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="rounded-lg bg-red-500/10 border border-red-500/50 p-3 text-sm text-red-400">
          {error}
        </div>
      )}
      <div>
        <label className="block text-sm font-medium text-space-300 mb-1">Username</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full rounded-lg bg-space-800 border border-space-600 px-4 py-2 text-space-100"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-space-300 mb-1">Display name</label>
        <input
          type="text"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          className="w-full rounded-lg bg-space-800 border border-space-600 px-4 py-2 text-space-100"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-space-300 mb-1">Bio</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={3}
          className="w-full rounded-lg bg-space-800 border border-space-600 px-4 py-2 text-space-100 resize-none"
        />
      </div>
      <button
        type="submit"
        className="rounded-lg bg-accent-cyan px-4 py-2 font-semibold text-space-900 hover:opacity-90"
      >
        {saved ? 'Saved!' : 'Save profile'}
      </button>
    </form>
  );
}
