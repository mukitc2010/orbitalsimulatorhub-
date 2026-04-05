'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function SignInPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') ?? '/community';
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const supabase = createClient();

  async function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);
    if (error) {
      setError(error.message === 'Invalid API key' || error.message?.toLowerCase().includes('invalid api key')
        ? 'Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to community/.env.local and restart the dev server.'
        : error.message);
      return;
    }
    router.push(redirect);
    router.refresh();
  }

  async function handleMagicLink(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { error } = await supabase.auth.signInWithOtp({ email, options: { emailRedirectTo: `${location.origin}/auth/callback?redirect=${redirect}` } });
    setLoading(false);
    if (error) {
      setError(error.message === 'Invalid API key' || error.message?.toLowerCase().includes('invalid api key')
        ? 'Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to community/.env.local and restart the dev server.'
        : error.message);
      return;
    }
    setMagicLinkSent(true);
  }

  return (
    <div className="min-h-screen bg-app">
      <header className="flex justify-end border-b border-app p-4">
        <ThemeToggle />
      </header>
      <div className="flex min-h-[calc(100vh-65px)] items-center justify-center px-4">
        <div className="w-full max-w-md space-y-6">
        {magicLinkSent ? (
          <div className="rounded-lg bg-card border border-app p-4 text-center text-app">
            Check your email for the magic link to sign in.
          </div>
        ) : (
          <form onSubmit={handleSignIn} className="space-y-4">
            {error && (
              <div className="rounded-lg bg-red-500/10 border border-red-500/50 p-3 text-sm text-red-400">
                {error}
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-muted mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-lg bg-card border border-app px-4 py-2 text-app placeholder-muted focus:border-primary focus:outline-none"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-muted mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg bg-card border border-app px-4 py-2 text-app placeholder-muted focus:border-primary focus:outline-none"
                placeholder="••••••••"
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <Link href="/forgot-password" className="text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
            <button
              type="submit"
              disabled={loading}
                className="w-full rounded-lg bg-primary py-2.5 font-semibold text-app hover:opacity-90 disabled:opacity-50"
            >
              {loading ? 'Signing in…' : 'Sign in'}
            </button>
            <button
              type="button"
              onClick={handleMagicLink}
              disabled={loading}
                className="w-full rounded-lg border border-app py-2.5 font-medium text-app hover:bg-card-hover disabled:opacity-50"
            >
              Send magic link
            </button>
          </form>
        )}

        <p className="text-center text-muted text-sm">
          Don&apos;t have an account?{' '}
          <Link href="/sign-up" className="text-primary hover:underline">
            Sign up
          </Link>
        </p>
        </div>
      </div>
    </div>
  );
}
