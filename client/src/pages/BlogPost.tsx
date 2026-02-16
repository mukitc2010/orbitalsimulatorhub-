import { Link, useRoute } from "wouter";
import { getPostBySlug, getRecentPosts } from "../data/blogPosts";

export function BlogPost() {
  const [match, params] = useRoute<{ slug: string }>("/blog/:slug");
  const post = match && params ? getPostBySlug(params.slug) : null;
  const recent = getRecentPosts(5).filter((p) => p.slug !== params?.slug);

  if (!post) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <h1 className="headline mb-4">Post not found</h1>
        <p className="text-slate-600 mb-6">The blog post you're looking for doesn't exist.</p>
        <Link href="/blog">
          <a className="text-[var(--accent-cyan)] hover:underline font-medium">← Back to Blog</a>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <article className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
        <div className="mb-4">
          <span className="text-xs text-slate-500 uppercase tracking-wide">{post.category.replace("-", " ")}</span>
          <span className="text-slate-400 mx-2">·</span>
          <time className="text-xs text-slate-500">{new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</time>
        </div>
        <h1 className="headline mb-4">{post.title}</h1>
        <div className="prose prose-slate max-w-none text-slate-700 whitespace-pre-line leading-relaxed">{post.content}</div>
        {post.tags.length > 0 && (
          <div className="mt-6 pt-6 border-t border-slate-200">
            <p className="text-sm text-slate-600 mb-2">Tags:</p>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span key={tag} className="px-2 py-1 rounded bg-slate-100 text-slate-700 text-xs">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </article>

      {recent.length > 0 && (
        <section>
          <h2 className="text-lg font-bold text-slate-800 mb-4">More articles</h2>
          <div className="space-y-3">
            {recent.slice(0, 3).map((p) => (
              <Link key={p.slug} href={`/blog/${p.slug}`}>
                <a className="block p-3 rounded-lg border border-slate-200 hover:border-[var(--accent-cyan)] hover:bg-[var(--accent-cyan)]/5 transition">
                  <h3 className="font-medium text-slate-800">{p.title}</h3>
                  <p className="text-xs text-slate-500 mt-1">{p.excerpt.substring(0, 100)}...</p>
                </a>
              </Link>
            ))}
          </div>
        </section>
      )}

      <div className="text-center">
        <Link href="/blog">
          <a className="text-[var(--accent-cyan)] hover:underline font-medium">← Back to Blog</a>
        </Link>
      </div>
    </div>
  );
}
