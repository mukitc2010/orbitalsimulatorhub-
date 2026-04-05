'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';

const WORKSPACE_ID = process.env.NEXT_PUBLIC_WORKSPACE_ID ?? 'a0000000-0000-0000-0000-000000000001';

export default function NewGroupPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    if (!slug) {
      setError('Name is required.');
      return;
    }
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setLoading(false);
      return;
    }
    const { data: group, error: insertError } = await supabase
      .from('study_groups')
      .insert({
        workspace_id: WORKSPACE_ID,
        name,
        slug,
        description: description || null,
        is_public: isPublic,
        created_by: user.id,
      })
      .select('id')
      .single();
    if (insertError) {
      setError(insertError.message);
      setLoading(false);
      return;
    }
    if (group) {
      await supabase.from('study_group_members').insert({
        study_group_id: group.id,
        profile_id: user.id,
        role: 'moderator',
      });
      router.push(`/groups/${group.id}`);
      router.refresh();
    }
    setLoading(false);
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-xl font-bold text-space-100 mb-4">Create study group</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="rounded-lg bg-red-500/10 border border-red-500/50 p-3 text-sm text-red-400">
            {error}
          </div>
        )}
        <div>
          <label className="block text-sm font-medium text-space-300 mb-1">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="w-full rounded-lg bg-space-800 border border-space-600 px-4 py-2 text-space-100"
            placeholder="e.g. Orbital Mechanics Study"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-space-300 mb-1">Description (optional)</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={2}
            className="w-full rounded-lg bg-space-800 border border-space-600 px-4 py-2 text-space-100 resize-none"
          />
        </div>
        <label className="flex items-center gap-2 text-sm text-space-300">
          <input
            type="checkbox"
            checked={isPublic}
            onChange={(e) => setIsPublic(e.target.checked)}
            className="rounded border-space-600 bg-space-800 text-accent-cyan"
          />
          Public (anyone can find and join)
        </label>
        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-accent-cyan px-4 py-2 font-semibold text-space-900 hover:opacity-90 disabled:opacity-50"
          >
            {loading ? 'Creating…' : 'Create group'}
          </button>
          <Link
            href="/groups"
            className="rounded-lg border border-space-600 px-4 py-2 text-space-300 hover:bg-space-800"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
