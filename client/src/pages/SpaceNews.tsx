import { Link } from "wouter";
import { getRecentPosts } from "../data/blogPosts";

/**
 * Space news landing page — targets "space news" keyword.
 * Daily content from blog; Google loves fresh pages.
 */
export function SpaceNews() {
  const recent = getRecentPosts(15);

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="headline">Space News – Daily NASA, Missions &amp; Astronomy</h1>
        <p className="subhead">
          Latest space news: NASA missions, Artemis, Mars rovers, James Webb, SpaceX, and astronomy. Updated daily. Read space news for students, teachers, and space fans.
        </p>
      </div>

      <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 text-slate-700">
        <p className="font-medium">📡 Fresh space news every day.</p>
        <p className="text-sm mt-1">We publish NASA news, satellite tutorials, space facts, and astronomy lessons. Bookmark this page or follow our <Link href="/blog/rss.xml"><a className="text-[var(--accent-cyan)] hover:underline">RSS feed</a></Link> for daily updates. Google loves fresh content — we add new articles regularly.</p>
      </div>

      <section>
        <h2 className="text-xl font-bold text-slate-800 mb-4">Latest space news &amp; articles</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {recent.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <a className="block p-5 rounded-xl border border-slate-200 bg-white hover:border-[var(--accent-cyan)] hover:shadow-md transition">
                <span className="text-xs text-slate-500 uppercase tracking-wide">{post.category.replace("-", " ")}</span>
                <h3 className="font-bold text-slate-800 mt-1 mb-2">{post.title}</h3>
                <p className="text-sm text-slate-600 line-clamp-2">{post.excerpt}</p>
                <p className="text-xs text-slate-500 mt-2">{new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
              </a>
            </Link>
          ))}
        </div>
      </section>

      <div className="flex flex-wrap gap-3">
        <Link href="/blog">
          <a className="px-5 py-2.5 rounded-xl bg-[var(--accent-cyan)] text-[#0f172a] font-semibold hover:opacity-90">All articles →</a>
        </Link>
        <Link href="/blog/category/nasa-news">
          <a className="px-5 py-2.5 rounded-xl border-2 border-[var(--accent-cyan)] text-[var(--accent-cyan)] font-medium hover:bg-[var(--accent-cyan)]/10">NASA news</a>
        </Link>
        <Link href="/missions/timeline">
          <a className="px-5 py-2.5 rounded-xl border-2 border-slate-300 text-slate-700 font-medium hover:bg-slate-100">Mission timeline</a>
        </Link>
      </div>
    </div>
  );
}
