import { useEffect } from "react";
import { Link, useRoute } from "wouter";
import { getPostBySlug, getRecentPosts } from "../data/blogPosts";
import { BlogContent } from "../components/BlogContent";
import { getBlogImage, handleImageError } from "../data/blogImages";
import { ShareBar } from "../components/ShareBar";

const SITE_NAME = "Orbital Simulator Hub";
const SITE_URL = "https://www.orbitalsimulatorhub.com";

export function BlogPost() {
  const [match, params] = useRoute<{ slug: string }>("/blog/:slug");
  const post = match && params ? getPostBySlug(params.slug) : null;
  const recent = getRecentPosts(5).filter((p) => p.slug !== params?.slug);

  useEffect(() => {
    if (!post) return;
    const prevTitle = document.title;
    const prevDesc = document.querySelector('meta[name="description"]')?.getAttribute("content") ?? "";
    document.title = `${post.title} | ${SITE_NAME}`;
    const descEl = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
    if (descEl) descEl.content = post.excerpt;

    // Article/NewsArticle schema for rich results & AI citation
    const isNews = post.category === "nasa-news";
    const imageUrl = getBlogImage(post);
    const articleSchema = {
      "@context": "https://schema.org",
      "@type": isNews ? "NewsArticle" : "Article",
      headline: post.title,
      description: post.excerpt,
      image: imageUrl,
      datePublished: post.date,
      dateModified: post.date,
      author: { "@type": "Organization", name: SITE_NAME },
      publisher: { "@type": "Organization", name: SITE_NAME, logo: { "@type": "ImageObject", url: `${SITE_URL}/og-image.png` } },
      mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/blog/${post.slug}` },
    };
    let scriptEl = document.getElementById("article-schema") as HTMLScriptElement | null;
    if (!scriptEl) {
      scriptEl = document.createElement("script");
      scriptEl.id = "article-schema";
      scriptEl.type = "application/ld+json";
      document.head.appendChild(scriptEl);
    }
    scriptEl.textContent = JSON.stringify(articleSchema);

    return () => {
      document.title = prevTitle;
      if (descEl) descEl.content = prevDesc;
      scriptEl?.remove();
    };
  }, [post]);

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

  const imageUrl = getBlogImage(post);

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <article className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="aspect-video w-full" style={{ background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0ea5e9 100%)" }}>
          <img src={imageUrl} alt={post.title} className="w-full h-full object-cover" onError={handleImageError} />
        </div>
        <div className="p-8">
          <div className="mb-4">
            <span className="text-xs text-slate-500 uppercase tracking-wide">{post.category.replace("-", " ")}</span>
            <span className="text-slate-400 mx-2">·</span>
            <time className="text-xs text-slate-500">{new Date(post.date).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</time>
          </div>
          <h1 className="headline mb-4">{post.title}</h1>
          <BlogContent content={post.content} />
        {post.tags.length > 0 && (
          <div className="mt-6 pt-6 border-t border-slate-200">
            <p className="text-sm text-slate-600 mb-2">Tags:</p>
            <div className="flex flex-wrap gap-2">
              <Link href={`/blog/category/${post.category}`}>
                <a className="px-2 py-1 rounded bg-slate-100 text-slate-700 text-xs hover:bg-[var(--accent-cyan)]/20 hover:text-[var(--accent-cyan)] transition">
                  View more in {post.category.replace("-", " ")}
                </a>
              </Link>
              {post.tags.map((tag) => (
                <span key={tag} className="px-2 py-1 rounded bg-slate-100 text-slate-700 text-xs">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

          <div className="mt-6 pt-6 border-t border-slate-200">
            <ShareBar path={`/blog/${post.slug}`} title={`${post.title} | Orbital Simulator Hub`} showRedditSubs />
          </div>
        </div>
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
