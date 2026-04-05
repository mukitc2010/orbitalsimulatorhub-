'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { ThemeToggle } from '@/components/ThemeToggle';

const INTEREST_OPTIONS = [
  'Astrophysics',
  'Aerospace',
  'Satellites',
  'AI in space',
  'NASA missions',
  'Orbital mechanics',
  'Space robotics',
  'Mars exploration',
  'Planetary science',
  'Rocket propulsion',
];

const LEVEL_OPTIONS = ['Beginner', 'Intermediate', 'Advanced', 'Research'];

const GOAL_OPTIONS = [
  'Learn fundamentals',
  'Prepare for internship',
  'Publish research',
  'Career switch',
  'Teaching / outreach',
  'Stay updated',
];

const ONBOARDING_KEY = 'orbital_onboarding';

function saveOnboarding(data: Record<string, unknown>) {
  try { localStorage.setItem(ONBOARDING_KEY, JSON.stringify(data)); } catch {}
}

export default function SignUpPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3 | 'done'>(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [interests, setInterests] = useState<string[]>([]);
  const [level, setLevel] = useState('');
  const [goals, setGoals] = useState<string[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const supabase = createClient();

  const toggleInterest = (name: string) => {
    setInterests((prev) => (prev.includes(name) ? prev.filter((x) => x !== name) : [...prev, name]));
  };
  const toggleGoal = (name: string) => {
    setGoals((prev) => (prev.includes(name) ? prev.filter((x) => x !== name) : [...prev, name]));
  };

  async function handleStepA(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!acceptTerms) {
      setError('You must accept the Terms of Service.');
      return;
    }
    setLoading(true);
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { display_name: displayName, terms_accepted_at: new Date().toISOString() },
        emailRedirectTo: `${typeof location !== 'undefined' ? location.origin : ''}/auth/callback?redirect=/community`,
      },
    });
    setLoading(false);
    if (error) {
      if (error.message === 'Invalid API key' || error.message?.toLowerCase().includes('invalid api key')) {
        setError('Supabase is not configured correctly. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to community/.env.local (get them from Supabase Dashboard → Project Settings → API). Restart the dev server after changing .env.local.');
      } else {
        setError(error.message);
      }
      return;
    }
    // If Supabase gave us a session immediately (email confirmation disabled), we can update profile later
    if (data?.session) {
      localStorage.setItem('orbital_has_session', '1');
    }
    setStep(2);
  }

  function handleStepB() {
    setStep(3);
  }

  async function handleStepC(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!level) {
      setError('Please choose your level.');
      return;
    }
    setLoading(true);

    // Save choices to localStorage so they persist across email confirmation
    saveOnboarding({
      display_name: displayName,
      interests: interests.length ? interests : null,
      level,
      goals: goals.length ? goals : null,
    });

    // Try to update profile if we have a session
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      await supabase
        .from('profiles')
        .update({
          display_name: displayName || undefined,
          interests: interests.length ? interests : null,
          level,
          goals: goals.length ? goals : null,
        })
        .eq('id', user.id);
      setLoading(false);
      router.push('/community');
      router.refresh();
      return;
    }

    // No session yet (email confirmation required) — show success message
    setLoading(false);
    setStep('done');
  }

  return (
    <div className="min-h-screen bg-app">
      <header className="flex justify-end border-b border-app p-4">
        <ThemeToggle />
      </header>
      <div className="flex min-h-[calc(100vh-65px)] items-center justify-center px-4 py-8">
        <div className="w-full max-w-md space-y-6">

          {step === 'done' ? (
            <div className="text-center space-y-4">
              <div className="text-4xl">📬</div>
              <h1 className="text-2xl font-bold text-app">Check your email</h1>
              <p className="text-muted">
                We sent a confirmation link to <strong className="text-app">{email}</strong>.
                Click it to activate your account and join the community.
              </p>
              <p className="text-sm text-muted">
                Your interests and preferences have been saved — they&apos;ll be applied once you confirm.
              </p>
              <Link
                href="/sign-in"
                className="inline-block mt-4 rounded-lg bg-primary px-6 py-2.5 font-semibold text-app hover:opacity-90"
              >
                Go to sign in
              </Link>
            </div>
          ) : (
            <>
              <div className="text-center">
                <h1 className="text-2xl font-bold text-app">Create account</h1>
                <p className="text-muted mt-1">Step {step} of 3</p>
              </div>

              {step === 1 && (
                <form onSubmit={handleStepA} className="space-y-4">
                  {error && (
                    <div className="rounded-lg bg-danger/10 border border-danger/50 p-3 text-sm text-danger">
                      {error}
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-muted mb-1">Display name</label>
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="w-full rounded-lg bg-card border border-app px-4 py-2 text-app placeholder-muted focus:border-primary focus:outline-none"
                      placeholder="Your name"
                    />
                  </div>
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
                      required
                      minLength={6}
                      className="w-full rounded-lg bg-card border border-app px-4 py-2 text-app placeholder-muted focus:border-primary focus:outline-none"
                      placeholder="At least 6 characters"
                    />
                  </div>
                  <label className="flex items-start gap-2 text-sm text-muted">
                    <input
                      type="checkbox"
                      checked={acceptTerms}
                      onChange={(e) => setAcceptTerms(e.target.checked)}
                      className="mt-1 rounded border-app bg-card text-primary focus:ring-primary"
                    />
                    <span>I accept the Terms of Service and community guidelines.</span>
                  </label>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-lg bg-primary py-2.5 font-semibold text-app hover:opacity-90 disabled:opacity-50"
                  >
                    {loading ? 'Creating account…' : 'Continue'}
                  </button>
                </form>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <p className="text-sm text-muted">Choose topics you care about (optional).</p>
                  <div className="flex flex-wrap gap-2">
                    {INTEREST_OPTIONS.map((name) => (
                      <button
                        key={name}
                        type="button"
                        onClick={() => toggleInterest(name)}
                        className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                          interests.includes(name)
                            ? 'bg-primary text-app'
                            : 'border border-app bg-card text-app hover:bg-card-hover'
                        }`}
                      >
                        {name}
                      </button>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={handleStepB}
                    className="w-full rounded-lg bg-primary py-2.5 font-semibold text-app hover:opacity-90"
                  >
                    Continue
                  </button>
                </div>
              )}

              {step === 3 && (
                <form onSubmit={handleStepC} className="space-y-4">
                  {error && (
                    <div className="rounded-lg bg-danger/10 border border-danger/50 p-3 text-sm text-danger">
                      {error}
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-muted mb-2">Level</label>
                    <div className="flex flex-wrap gap-2">
                      {LEVEL_OPTIONS.map((name) => (
                        <button
                          key={name}
                          type="button"
                          onClick={() => setLevel(name)}
                          className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                            level === name ? 'bg-primary text-app' : 'border border-app bg-card text-app hover:bg-card-hover'
                          }`}
                        >
                          {name}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-muted mb-2">Goals (optional)</label>
                    <div className="flex flex-wrap gap-2">
                      {GOAL_OPTIONS.map((name) => (
                        <button
                          key={name}
                          type="button"
                          onClick={() => toggleGoal(name)}
                          className={`rounded-lg px-3 py-1.5 text-sm transition ${
                            goals.includes(name)
                              ? 'bg-primary text-app'
                              : 'border border-app bg-card text-app hover:bg-card-hover'
                          }`}
                        >
                          {name}
                        </button>
                      ))}
                    </div>
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full rounded-lg bg-primary py-2.5 font-semibold text-app hover:opacity-90 disabled:opacity-50"
                  >
                    {loading ? 'Saving…' : 'Join community'}
                  </button>
                </form>
              )}
            </>
          )}

          {step !== 'done' && (
            <p className="text-center text-muted text-sm">
              Already have an account?{' '}
              <Link href="/sign-in" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
