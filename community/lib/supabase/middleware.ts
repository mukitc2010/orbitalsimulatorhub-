import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

const COMMUNITY_PATHS = ['/community', '/channels', '/dm', '/groups', '/invite', '/profile', '/settings', '/onboarding'];
const AUTH_PATHS = ['/sign-in', '/sign-up', '/forgot-password'];
const PUBLIC_PATHS = ['/', '/auth/callback', '/invite/[token]'];

function isCommunityPath(pathname: string) {
  return COMMUNITY_PATHS.some((p) => pathname === p || pathname.startsWith(p + '/'));
}

function isAuthPath(pathname: string) {
  return AUTH_PATHS.some((p) => pathname.startsWith(p));
}

function isInviteTokenPath(pathname: string) {
  return /^\/invite\/[a-zA-Z0-9_-]+$/.test(pathname);
}

export async function updateSession(request: NextRequest) {
  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  let user = null;
  try {
    const { data } = await supabase.auth.getUser();
    user = data?.user ?? null;
  } catch {
    // Invalid env or Supabase down: continue without user so public pages still load
  }
  const pathname = request.nextUrl.pathname;

  if (isCommunityPath(pathname) || (pathname.startsWith('/profile/') && pathname !== '/profile')) {
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = '/sign-in';
      url.searchParams.set('redirect', pathname);
      return NextResponse.redirect(url);
    }
  }

  if (pathname === '/sign-in' && user) {
    const url = request.nextUrl.clone();
    url.pathname = '/community';
    return NextResponse.redirect(url);
  }

  return response;
}

