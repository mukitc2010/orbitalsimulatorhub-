import { Link, useRoute } from "wouter";
import { getPostsByCategory, type BlogPost } from "../data/blogPosts";

const CATEGORY_LABELS: Record<BlogPost["category"], { label: string; emoji: string }> = {
  "nasa-news": { label: "NASA News", emoji: "🚀" },
  "space-facts": { label: "Space Facts", emoji: "⭐" },
  "satellite-tutorials": { label: "Satellite Tutorials", emoji: "🛰️" },
  "astronomy-lessons": { label: "Astronomy Lessons", emoji: "🔭" },
};

export function BlogCategory() {
  const [match, params] = useRoute<{ category: BlogPost["category"] }>("/blog/category/:category");
  const category = match && params ? params.category : null;
  const posts = category ? getPostsByCategory(category) : [];
  const info = category ? CATEGORY_LABELS[category] : null;

  if (!category || !info) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <h1 className="headline mb-4">Category not found</h1>
        <Link href="/blog">
          <a className="text-[var(--accent-cyan)] hover:underline font-medium">← Back to Blog</a>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="headline flex items-center gap-2">
          <span>{info.emoji}</span>
          {info.label}
        </h1>
        <p className="subhead">{posts.length} articles in this category</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`}>
            <a className="block p-5 rounded-xl border border-slate-200 bg-white hover:border-[var(--accent-cyan)] hover:shadow-md transition">
              <h3 className="font-bold text-lg text-slate-800 mb-2">{post.title}</h3>
              <p className="text-sm text-slate-600 mb-3 line-clamp-2">{post.excerpt}</p>
              <p className="text-xs text-slate-500">{new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
            </a>
          </Link>
        ))}
      </div>

      <div className="text-center">
        <Link href="/blog">
          <a className="text-[var(--accent-cyan)] hover:underline font-medium">← Back to Blog</a>
        </Link>
      </div>
    </div>
  );
}
