import { Link } from "wouter";
import { BLOG_POSTS, getRecentPosts, type BlogPost } from "../data/blogPosts";

const CATEGORIES: { id: BlogPost["category"]; label: string; emoji: string }[] = [
  { id: "nasa-news", label: "NASA News", emoji: "🚀" },
  { id: "space-facts", label: "Space Facts", emoji: "⭐" },
  { id: "satellite-tutorials", label: "Satellite Tutorials", emoji: "🛰️" },
  { id: "astronomy-lessons", label: "Astronomy Lessons", emoji: "🔭" },
];

export function Blog() {
  const recent = getRecentPosts(12);
  const byCategory = CATEGORIES.map((cat) => ({
    ...cat,
    posts: BLOG_POSTS.filter((p) => p.category === cat.id),
  }));

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <div>
        <h1 className="headline">Space Blog</h1>
        <p className="subhead">
          Daily NASA news, space facts, satellite tutorials, and astronomy lessons. Fresh content to help you learn orbital mechanics, space physics, and how satellites work.
        </p>
      </div>

      <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {byCategory.map((cat) => (
          <Link key={cat.id} href={`/blog/category/${cat.id}`}>
            <a className="block p-4 rounded-xl border-2 border-[var(--accent-cyan)]/50 bg-white hover:border-[var(--accent-cyan)] hover:shadow-md transition">
              <span className="text-2xl block mb-2">{cat.emoji}</span>
              <h2 className="font-bold text-slate-800 mb-1">{cat.label}</h2>
              <p className="text-sm text-slate-600">{cat.posts.length} articles</p>
            </a>
          </Link>
        ))}
      </section>

      <section>
        <h2 className="text-xl font-bold text-slate-800 mb-4">Latest articles</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recent.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}>
              <a className="block p-5 rounded-xl border border-slate-200 bg-white hover:border-[var(--accent-cyan)] hover:shadow-md transition">
                <span className="text-xs text-slate-500 uppercase tracking-wide">{post.category.replace("-", " ")}</span>
                <h3 className="font-bold text-lg text-slate-800 mt-1 mb-2">{post.title}</h3>
                <p className="text-sm text-slate-600 mb-3 line-clamp-2">{post.excerpt}</p>
                <p className="text-xs text-slate-500">{new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
              </a>
            </Link>
          ))}
        </div>
      </section>

      <section className="rounded-xl bg-[var(--accent-cyan)]/10 border-2 border-[var(--accent-cyan)]/40 p-4">
        <h2 className="font-bold text-slate-800 mb-2">📰 Daily fresh content</h2>
        <p className="text-sm text-slate-700 mb-2">
          New articles added regularly covering NASA missions, space facts, satellite tutorials, and astronomy lessons. Bookmark this page and check back daily!
        </p>
        <p className="text-xs text-slate-600">
          <Link href="/blog/rss.xml" className="text-[var(--accent-cyan)] hover:underline">RSS Feed</Link> available for automatic updates.
        </p>
      </section>
    </div>
  );
}
