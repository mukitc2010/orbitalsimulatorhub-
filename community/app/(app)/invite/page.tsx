'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Copy, Check } from 'lucide-react';

const WORKSPACE_ID = process.env.NEXT_PUBLIC_WORKSPACE_ID ?? 'a0000000-0000-0000-0000-000000000001';

export default function InvitePage() {
  const [type, setType] = useState<'community' | 'group'>('community');
  const [expiresIn, setExpiresIn] = useState<'24' | '168' | 'never'>('168');
  const [maxUses, setMaxUses] = useState<number | ''>(10);
  const [link, setLink] = useState('');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  async function generateLink() {
    setLoading(true);
    setLink('');
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const token = crypto.randomUUID().replace(/-/g, '').slice(0, 24);
    const expiresAt =
      expiresIn === 'never'
        ? null
        : new Date(Date.now() + parseInt(expiresIn, 10) * 60 * 60 * 1000).toISOString();

    const { error } = await supabase.from('invite_links').insert({
      token,
      type,
      workspace_id: WORKSPACE_ID,
      created_by: user.id,
      expires_at: expiresAt,
      max_uses: maxUses === '' ? null : Number(maxUses),
    });

    setLoading(false);
    if (error) return;
    const base = typeof window !== 'undefined' ? window.location.origin : '';
    setLink(`${base}/invite/${token}`);
  }

  function copyLink() {
    if (!link) return;
    navigator.clipboard.writeText(link);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-xl font-bold text-space-100 mb-4">Invite to community</h1>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-space-300 mb-1">Invite type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as 'community' | 'group')}
            className="w-full rounded-lg bg-space-800 border border-space-600 px-4 py-2 text-space-100"
          >
            <option value="community">Invite to community</option>
            <option value="group">Invite to a study group</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-space-300 mb-1">Expires</label>
          <select
            value={expiresIn}
            onChange={(e) => setExpiresIn(e.target.value as '24' | '168' | 'never')}
            className="w-full rounded-lg bg-space-800 border border-space-600 px-4 py-2 text-space-100"
          >
            <option value="24">24 hours</option>
            <option value="168">7 days</option>
            <option value="never">Never</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-space-300 mb-1">Max uses (optional)</label>
          <input
            type="number"
            min={1}
            value={maxUses}
            onChange={(e) => setMaxUses(e.target.value === '' ? '' : parseInt(e.target.value, 10))}
            className="w-full rounded-lg bg-space-800 border border-space-600 px-4 py-2 text-space-100"
            placeholder="e.g. 10"
          />
        </div>
        <button
          type="button"
          onClick={generateLink}
          disabled={loading}
          className="w-full rounded-lg bg-accent-cyan py-2.5 font-semibold text-space-900 hover:opacity-90 disabled:opacity-50"
        >
          {loading ? 'Generating…' : 'Generate invite link'}
        </button>
        {link && (
          <div className="flex gap-2">
            <input
              readOnly
              value={link}
              className="flex-1 rounded-lg bg-space-800 border border-space-600 px-4 py-2 text-space-100 text-sm"
            />
            <button
              type="button"
              onClick={copyLink}
              className="rounded-lg bg-space-700 px-4 py-2 text-space-200 hover:bg-space-600 flex items-center gap-2"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
