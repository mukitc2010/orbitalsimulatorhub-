import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const rawRedirect = searchParams.get('redirect') ?? '/community';
  // Only allow relative paths (prevent open redirect)
  const redirect = rawRedirect.startsWith('/') ? rawRedirect : '/community';

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      // Route through onboarding-sync so client-side can apply localStorage preferences
      return NextResponse.redirect(`${origin}/onboarding-sync`);
    }
  }

  return NextResponse.redirect(`${origin}/sign-in?error=auth`);
}
