export type EventType = 'page_view' | 'tag_follow' | 'post_view' | 'doc_open';

/**
 * Send an event to the API for personalization scaffold.
 * TODO: future embeddings + LLM summary + daily digest.
 */
export async function trackEvent(
  event_type: EventType,
  event_data?: Record<string, unknown>
): Promise<void> {
  try {
    await fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ event_type, event_data: event_data ?? {} }),
    });
  } catch {
    // Ignore
  }
}
