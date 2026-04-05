import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export type EventType = 'page_view' | 'tag_follow' | 'post_view' | 'doc_open';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { event_type, event_data = {} } = body as { event_type: EventType; event_data?: Record<string, unknown> };
    if (!event_type || typeof event_type !== 'string') {
      return NextResponse.json({ error: 'event_type required' }, { status: 400 });
    }
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { error } = await supabase.from('events').insert({
      user_id: user.id,
      event_type,
      event_data: event_data ?? {},
    });
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }
}
