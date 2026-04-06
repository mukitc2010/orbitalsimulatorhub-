/**
 * Blog post images by category.
 * Using Unsplash (reliable CDN, free license) with fixed dimensions for fast loading.
 * Fallback: CSS gradient placeholder if image fails to load.
 */

export const BLOG_IMAGES_BY_CATEGORY: Record<string, string> = {
  "nasa-news":
    "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=800&h=450&fit=crop&q=80",
  "space-facts":
    "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&h=450&fit=crop&q=80",
  "satellite-tutorials":
    "https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?w=800&h=450&fit=crop&q=80",
  "astronomy-lessons":
    "https://images.unsplash.com/photo-1543722530-d2c3201371e7?w=800&h=450&fit=crop&q=80",
  aerodynamics:
    "https://images.unsplash.com/photo-1517976487492-5750f3195933?w=800&h=450&fit=crop&q=80",
  "quantum-physics":
    "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=450&fit=crop&q=80",
  "space-agi":
    "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=450&fit=crop&q=80",
  "space-engineering":
    "https://images.unsplash.com/photo-1457364559154-aa2644600ebb?w=800&h=450&fit=crop&q=80",
  "agi-research":
    "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&h=450&fit=crop&q=80",
  "robot-engineering":
    "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=450&fit=crop&q=80",
};

const FALLBACK_GRADIENT = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450'%3E%3Cdefs%3E%3ClinearGradient id='g' x1='0%25' y1='0%25' x2='100%25' y2='100%25'%3E%3Cstop offset='0%25' stop-color='%230f172a'/%3E%3Cstop offset='50%25' stop-color='%231e293b'/%3E%3Cstop offset='100%25' stop-color='%230ea5e9'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='800' height='450' fill='url(%23g)'/%3E%3Ctext x='400' y='225' text-anchor='middle' fill='%2394a3b8' font-family='system-ui' font-size='24'%3E🛸 Orbital Simulator Hub%3C/text%3E%3C/svg%3E";

export function getBlogImage(post: { category: string; imageUrl?: string }): string {
  return post.imageUrl || BLOG_IMAGES_BY_CATEGORY[post.category] || BLOG_IMAGES_BY_CATEGORY["space-facts"];
}

export function handleImageError(e: React.SyntheticEvent<HTMLImageElement>): void {
  const img = e.currentTarget;
  if (img.src !== FALLBACK_GRADIENT) {
    img.src = FALLBACK_GRADIENT;
  }
}
