/**
 * Shown when Supabase is not configured (missing or placeholder anon key).
 * Does not expose the key.
 */
function isPlaceholderKey(key: string | undefined): boolean {
  if (!key || key.length < 50) return true;
  if (key === 'eyJhbGc...') return true;
  return false;
}

export function SetupBanner() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (url && !isPlaceholderKey(key)) return null;

  return (
    <div className="bg-amber-500/20 border border-amber-500/50 text-amber-200 text-sm p-3 text-center">
      Community is not fully set up. Add your Supabase URL and anon key to{' '}
      <code className="bg-space-800 px-1 rounded">.env.local</code> (see{' '}
      <code className="bg-space-800 px-1 rounded">DO-THIS-FOR-ME.md</code>).
    </div>
  );
}
