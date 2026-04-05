'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';

const INTERESTS = [
  'Astrophysics',
  'Aerospace',
  'Satellites',
  'AI in space',
  'NASA missions',
  'Orbital mechanics',
  'Space robotics',
  'Mars exploration',
];

export default function OnboardingPage() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const supabase = createClient();

  async function handleContinue() {
    setLoading(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase
        .from('profiles')
        .update({ interests: selected })
        .eq('id', user.id);
    }
    setLoading(false);
    router.push('/channels');
    router.refresh();
  }

  function toggle(name: string) {
    setSelected((prev) =>
      prev.includes(name) ? prev.filter((x) => x !== name) : [...prev, name]
    );
  }

  return (
    <div className="min-h-screen bg-space-900 flex items-center justify-center px-4">
      <div className="w-full max-w-lg space-y-6">
        <h1 className="text-2xl font-bold text-space-100 text-center">
          Pick your interests
        </h1>
        <p className="text-space-400 text-center text-sm">
          We&apos;ll suggest channels to join. You can change this later.
        </p>
        <div className="flex flex-wrap gap-2 justify-center">
          {INTERESTS.map((name) => (
            <button
              key={name}
              type="button"
              onClick={() => toggle(name)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                selected.includes(name)
                  ? 'bg-accent-cyan text-space-900'
                  : 'bg-space-800 text-space-300 hover:bg-space-700'
              }`}
            >
              {name}
            </button>
          ))}
        </div>
        <div className="flex flex-col gap-2 pt-4">
          <button
            type="button"
            onClick={handleContinue}
            disabled={loading}
            className="w-full rounded-lg bg-accent-cyan py-2.5 font-semibold text-space-900 hover:opacity-90 disabled:opacity-50"
          >
            {loading ? 'Saving…' : 'Continue to community'}
          </button>
          <Link
            href="/channels"
            className="text-center text-sm text-space-500 hover:text-space-300"
          >
            Skip for now
          </Link>
        </div>
      </div>
    </div>
  );
}
