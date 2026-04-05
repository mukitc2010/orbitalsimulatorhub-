'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import {
  Hash,
  MessageCircle,
  Users,
  Plus,
  User,
  Link2,
  Settings,
  ChevronDown,
  Menu,
} from 'lucide-react';
import { clsx } from 'clsx';

type Profile = {
  id: string;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
  online_status: string;
} | null;

type Channel = { id: string; name: string; slug: string };
type Group = { id: string; name: string; slug: string };

export function Sidebar({
  profile,
  userId,
  workspaceId,
}: {
  profile: Profile;
  userId: string;
  workspaceId: string;
}) {
  const pathname = usePathname();
  const [channels, setChannels] = useState<Channel[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const { data: cm } = await supabase
        .from('channel_members')
        .select('channel_id, channels(id, name, slug)')
        .eq('profile_id', userId);
      const chs = (cm ?? [])
        .map((c: { channels: Channel | null }) => c.channels)
        .filter(Boolean) as Channel[];
      setChannels(chs);

      const { data: gm } = await supabase
        .from('study_group_members')
        .select('study_group_id, study_groups(id, name, slug)')
        .eq('profile_id', userId);
      const grps = (gm ?? [])
        .map((g: { study_groups: Group | null }) => g.study_groups)
        .filter(Boolean) as Group[];
      setGroups(grps);
    }
    load();
  }, [userId, supabase]);

  const content = (
    <>
      <div className="p-3 border-b border-space-700">
        <Link href="/channels" className="flex items-center gap-2 text-space-100 font-semibold">
          <span className="text-xl">🛸</span>
          <span>Orbital Hub</span>
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto scrollbar-thin py-2">
        <div className="px-2">
          <div className="flex items-center justify-between px-2 py-1">
            <span className="text-xs font-semibold text-space-500 uppercase">Channels</span>
            <Link href="/channels/browse" className="text-space-400 hover:text-space-200 p-1">
              <Plus className="w-4 h-4" />
            </Link>
          </div>
          {channels.length === 0 ? (
            <p className="px-2 py-1 text-sm text-space-500">Join a channel to start</p>
          ) : (
            channels.map((ch) => (
              <Link
                key={ch.id}
                href={`/channels/${ch.id}`}
                className={clsx(
                  'flex items-center gap-2 px-2 py-1.5 rounded-md text-sm',
                  pathname === `/channels/${ch.id}`
                    ? 'bg-space-700 text-space-100'
                    : 'text-space-300 hover:bg-space-800 hover:text-space-100'
                )}
              >
                <Hash className="w-4 h-4 shrink-0" />
                <span className="truncate">{ch.slug}</span>
              </Link>
            ))
          )}
        </div>

        <div className="px-2 mt-4">
          <div className="flex items-center justify-between px-2 py-1">
            <span className="text-xs font-semibold text-space-500 uppercase">Study groups</span>
            <Link href="/groups/new" className="text-space-400 hover:text-space-200 p-1">
              <Plus className="w-4 h-4" />
            </Link>
          </div>
          {groups.length === 0 ? (
            <p className="px-2 py-1 text-sm text-space-500">Create or join a group</p>
          ) : (
            groups.map((g) => (
              <Link
                key={g.id}
                href={`/groups/${g.id}`}
                className={clsx(
                  'flex items-center gap-2 px-2 py-1.5 rounded-md text-sm',
                  pathname === `/groups/${g.id}`
                    ? 'bg-space-700 text-space-100'
                    : 'text-space-300 hover:bg-space-800 hover:text-space-100'
                )}
              >
                <Users className="w-4 h-4 shrink-0" />
                <span className="truncate">{g.slug}</span>
              </Link>
            ))
          )}
        </div>

        <div className="px-2 mt-4">
          <Link
            href="/dm"
            className={clsx(
              'flex items-center gap-2 px-2 py-1.5 rounded-md text-sm',
              pathname.startsWith('/dm') && pathname !== '/dm'
                ? 'bg-space-700 text-space-100'
                : 'text-space-300 hover:bg-space-800 hover:text-space-100'
            )}
          >
            <MessageCircle className="w-4 h-4 shrink-0" />
            <span>Direct messages</span>
          </Link>
        </div>
      </nav>

      <div className="p-2 border-t border-space-700 space-y-1">
        <Link
          href="/invite"
          className="flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-space-300 hover:bg-space-800 hover:text-space-100"
        >
          <Link2 className="w-4 h-4" />
          <span>Invite</span>
        </Link>
        <Link
          href="/profile"
          className="flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-space-300 hover:bg-space-800 hover:text-space-100"
        >
          <User className="w-4 h-4" />
          <span>{profile?.display_name || profile?.username || 'Profile'}</span>
        </Link>
        <Link
          href="/settings"
          className="flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-space-300 hover:bg-space-800 hover:text-space-100"
        >
          <Settings className="w-4 h-4" />
          <span>Settings</span>
        </Link>
      </div>
    </>
  );

  return (
    <>
      <button
        type="button"
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-space-800 text-space-200"
        onClick={() => setMobileOpen(true)}
      >
        <Menu className="w-5 h-5" />
      </button>

      <aside
        className={clsx(
          'w-60 flex flex-col bg-space-800 border-r border-space-700 shrink-0',
          'md:relative fixed inset-y-0 left-0 z-40 transform transition-transform md:translate-x-0',
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {content}
      </aside>

      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden
        />
      )}
    </>
  );
}
