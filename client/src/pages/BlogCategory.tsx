import { Link, useRoute } from "wouter";
import { getPostsByCategory, type BlogPost } from "../data/blogPosts";
import { getBlogImage, handleImageError } from "../data/blogImages";
import { formatDisplayDate } from "../lib/formatDisplayDate";

const CATEGORY_LABELS: Record<string, { label: string; emoji: string }> = {
  "space-agi": { label: "Space AGI", emoji: "🧠" },
  "agi-research": { label: "AGI Research", emoji: "🔬" },
  "robot-engineering": { label: "Robot Engineering", emoji: "🤖" },
  "space-engineering": { label: "Space Engineering", emoji: "⚙️" },
  "nasa-news": { label: "NASA News", emoji: "🚀" },
  "space-facts": { label: "Space Facts", emoji: "⭐" },
  "satellite-tutorials": { label: "Satellite Tutorials", emoji: "🛰️" },
  "astronomy-lessons": { label: "Astronomy Lessons", emoji: "🔭" },
  aerodynamics: { label: "Aerodynamics", emoji: "✈️" },
  "quantum-physics": { label: "Quantum & Space", emoji: "⚛" },
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
        <Link href="/blog" className="text-[var(--accent-cyan)] hover:underline font-medium">← Back to Blog</Link>
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
          <Link key={post.slug} href={`/blog/${post.slug}`} className="block rounded-xl border-2 overflow-hidden transition hover:shadow-lg hover:scale-[1.01]" style={{ background: "var(--bg-card)", borderColor: "var(--border-color)" }}>
              <div className="aspect-video w-full" style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0ea5e9 100%)" }}>
                <img src={getBlogImage(post)} alt={post.title} className="w-full h-full object-cover" loading="lazy" onError={handleImageError} />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg mb-2" style={{ color: "var(--text-primary)" }}>{post.title}</h3>
                <p className="text-sm mb-3 line-clamp-2" style={{ color: "var(--text-secondary)" }}>{post.excerpt}</p>
                <p className="text-xs" style={{ color: "var(--text-muted)" }}>{formatDisplayDate(post.date, "long")}</p>
              </div>
            </Link>
        ))}
      </div>

      <div className="text-center">
        <Link href="/blog" className="text-[var(--accent-cyan)] hover:underline font-medium">← Back to Blog</Link>
      </div>
    </div>
  );
}
