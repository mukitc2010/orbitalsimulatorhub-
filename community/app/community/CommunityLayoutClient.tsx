'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from '@/components/ThemeToggle';

const MOCK_CHANNELS = [
  { name: 'general', slug: 'general' },
  { name: 'astrophysics', slug: 'astrophysics' },
  { name: 'orbital-mechanics', slug: 'orbital-mechanics' },
  { name: 'nasa-news', slug: 'nasa-news' },
];

const MOCK_SUGGESTED = [
  { name: 'Alex R.', tag: 'Orbital mechanics' },
  { name: 'Sam K.', tag: 'NASA missions' },
  { name: 'Jordan L.', tag: 'Mars exploration' },
];

export function CommunityLayoutClient({
  children,
  profile,
  userId,
}: {
  children: React.ReactNode;
  profile: { display_name?: string | null; username?: string } | null;
  userId: string;
}) {
  const pathname = usePathname();

  function copyInviteLink() {
    const url = `${typeof window !== 'undefined' ? window.location.origin : ''}/invite/placeholder-${userId.slice(0, 8)}`;
    navigator.clipboard.writeText(url);
    // Could add toast
  }

  return (
    <div className="flex h-screen bg-app overflow-hidden">
      {/* Left sidebar */}
      <aside className="flex w-56 shrink-0 flex-col border-r border-app bg-card">
        <div className="flex h-14 items-center justify-between border-b border-app px-4">
          <span className="font-semibold text-app">Orbital Hub</span>
          <ThemeToggle />
        </div>
        <nav className="flex-1 overflow-y-auto p-2">
          <div className="mb-2 text-xs font-medium text-muted uppercase tracking-wider">Channels</div>
          {MOCK_CHANNELS.map((ch) => (
            <Link
              key={ch.slug}
              href={`/channels/${ch.slug}`}
              className={`block rounded-lg px-3 py-2 text-sm ${pathname === `/channels/${ch.slug}` ? 'bg-card-hover text-primary' : 'text-app hover:bg-card-hover'}`}
            >
              # {ch.name}
            </Link>
          ))}
          <div className="mt-4 mb-2 text-xs font-medium text-muted uppercase tracking-wider">Groups</div>
          <Link href="/groups" className="block rounded-lg px-3 py-2 text-sm text-app hover:bg-card-hover">
            Study groups
          </Link>
          <Link href="/dm" className="block rounded-lg px-3 py-2 text-sm text-app hover:bg-card-hover">
            Direct messages
          </Link>
        </nav>
        <div className="border-t border-app p-2">
          <button
            type="button"
            onClick={copyInviteLink}
            className="flex w-full items-center gap-2 rounded-lg border border-app bg-card px-3 py-2 text-sm text-app hover:bg-card-hover"
          >
            Share invite link
          </button>
          <Link
            href="/profile"
            className="mt-1 flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted hover:bg-card-hover hover:text-app"
          >
            {profile?.display_name || profile?.username || 'Profile'}
          </Link>
          <Link href="/settings" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted hover:bg-card-hover hover:text-app">
            Settings
          </Link>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {children}
      </main>

      {/* Right sidebar */}
      <aside className="hidden w-64 shrink-0 flex-col border-l border-app bg-card lg:flex">
        <div className="border-b border-app px-4 py-3">
          <h3 className="text-sm font-semibold text-app">Suggested</h3>
        </div>
        <div className="flex-1 overflow-y-auto p-2">
          {MOCK_SUGGESTED.map((u) => (
            <div
              key={u.name}
              className="flex items-center justify-between rounded-lg px-3 py-2 text-sm hover:bg-card-hover"
            >
              <span className="text-app">{u.name}</span>
              <span className="text-xs text-muted">{u.tag}</span>
            </div>
          ))}
        </div>
        <p className="p-2 text-xs text-muted">Document sharing — coming soon</p>
      </aside>
    </div>
  );
}
