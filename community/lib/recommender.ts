/**
 * Simple recommender: counts most-viewed tags and returns recommended tags (mock).
 * TODO: future embeddings + LLM summary + daily digest.
 */

export interface EventRow {
  event_type: string;
  event_data: Record<string, unknown> | null;
}

export function getRecommendedTags(events: EventRow[], limit = 5): string[] {
  const tagCounts: Record<string, number> = {};
  for (const e of events) {
    if (e.event_type !== 'tag_follow' && e.event_type !== 'post_view') continue;
    const tags = (e.event_data?.tags as string[]) ?? (e.event_data?.tag ? [e.event_data.tag as string] : []);
    for (const t of tags) {
      if (typeof t === 'string') tagCounts[t] = (tagCounts[t] ?? 0) + 1;
    }
  }
  return Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([tag]) => tag);
}

const MOCK_POPULAR_TAGS = [
  'Astrophysics',
  'Orbital Mechanics',
  'Aerospace Careers',
  'NASA News',
  'Satellite Tutorials',
  'Mars Exploration',
  'Space Robotics',
  'AI in Space',
];

/** Mock: return popular tags when no events. TODO: replace with real recommendations. */
export function getRecommendedTagsFallback(limit = 5): string[] {
  return MOCK_POPULAR_TAGS.slice(0, limit);
}
