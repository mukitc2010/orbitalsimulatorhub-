'use client';

import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle';

const MAIN_SITE = 'https://www.orbitalsimulatorhub.com';

export function PublicNav() {
  return (
    <header className="sticky top-0 z-30 border-b border-app bg-card/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Link href="/welcome" className="text-lg font-semibold text-app">
          Orbital Simulator Hub
        </Link>
        <nav className="hidden sm:flex items-center gap-5 text-sm font-medium text-muted">
          <Link href="/welcome#topics" className="hover:text-app transition">
            Topics
          </Link>
          <a href={`${MAIN_SITE}/blog`} className="hover:text-app transition">
            Blog
          </a>
          <a href={`${MAIN_SITE}/simulator`} className="hover:text-app transition">
            Simulator
          </a>
          <a href={`${MAIN_SITE}/astrobot`} className="hover:text-app transition">
            AstroBot
          </a>
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href={MAIN_SITE}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-app hover:opacity-90"
          >
            Explore
          </a>
        </div>
      </div>
    </header>
  );
}
