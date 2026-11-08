import { getPostBySlug } from "./blogPosts";
import type { SEOConfig } from "./seo-config";

export function blogPostSEO(cleanPath: string): SEOConfig | null {
  const slug = cleanPath.replace(/^\/blog\//, "");
  const post = getPostBySlug(slug);
  if (!post) return null;
  return {
    path: cleanPath,
    title: `${post.title} | Space Blog – Orbital Simulator Hub`,
    description: post.excerpt,
    keywords: post.seoKeywords || post.tags.join(", ") || `space blog, space news, ${slug.replace(/-/g, ", ")}`,
    ogTitle: post.title,
    lastUpdated: `${post.date}T00:00:00Z`,
  };
}
