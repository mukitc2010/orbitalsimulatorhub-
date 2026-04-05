import Link from 'next/link';

const MOCK_POSTS = [
  { id: '1', author: 'Alex R.', text: 'Best resources for understanding Hohmann transfers?', time: '2h ago', tag: 'Orbital mechanics' },
  { id: '2', author: 'Sam K.', text: 'Artemis III timeline update from the latest briefing.', time: '5h ago', tag: 'NASA news' },
  { id: '3', author: 'Jordan L.', text: 'Study group #orbital-mechanics meeting Saturday 2pm UTC.', time: '1d ago', tag: 'Study group' },
];

export default function CommunityPage() {
  return (
    <div className="flex h-full flex-col">
      <div className="border-b border-app px-6 py-4">
        <h1 className="text-xl font-semibold text-app">Feed</h1>
        <p className="text-sm text-muted">Recent activity across your channels and groups.</p>
      </div>
      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-2xl space-y-4">
          {MOCK_POSTS.map((post) => (
            <div
              key={post.id}
              className="rounded-xl border border-app bg-card p-4 hover:bg-card-hover transition"
            >
              <div className="flex items-center gap-2 text-sm text-muted">
                <span className="font-medium text-app">{post.author}</span>
                <span>·</span>
                <span>{post.time}</span>
                <span className="rounded bg-primary/20 px-1.5 py-0.5 text-xs text-primary">{post.tag}</span>
              </div>
              <p className="mt-2 text-app">{post.text}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-center text-sm text-muted">
          <Link href="/channels" className="text-primary hover:underline">Browse all channels</Link> to join more conversations.
        </p>
      </div>
    </div>
  );
}
