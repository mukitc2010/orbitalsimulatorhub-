'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

const ONBOARDING_KEY = 'orbital_onboarding';

export default function OnboardingSyncPage() {
  const router = useRouter();
  const [status, setStatus] = useState('Applying your preferences…');

  useEffect(() => {
    async function sync() {
      const raw = localStorage.getItem(ONBOARDING_KEY);
      if (!raw) {
        router.replace('/community');
        return;
      }

      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.replace('/sign-in');
        return;
      }

      try {
        const onboarding = JSON.parse(raw);
        await supabase
          .from('profiles')
          .update({
            display_name: onboarding.display_name || undefined,
            interests: onboarding.interests || null,
            level: onboarding.level || null,
            goals: onboarding.goals || null,
          })
          .eq('id', user.id);

        localStorage.removeItem(ONBOARDING_KEY);
      } catch {
        // If parsing or update fails, just proceed
      }

      router.replace('/community');
    }

    sync();
  }, [router]);

  return (
    <div className="min-h-screen bg-app flex items-center justify-center">
      <div className="text-center space-y-3">
        <div className="text-3xl animate-pulse">🚀</div>
        <p className="text-app font-medium">{status}</p>
        <p className="text-muted text-sm">Redirecting to community…</p>
      </div>
    </div>
  );
}
