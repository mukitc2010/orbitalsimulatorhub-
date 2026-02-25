/**
 * Default images for blog posts by category.
 * NASA images (public domain) and Unsplash (free to use).
 */
export const BLOG_IMAGES_BY_CATEGORY: Record<string, string> = {
  "nasa-news":
    "https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001589/GSFC_20171208_Archive_e001589~orig.jpg",
  "space-facts":
    "https://images-assets.nasa.gov/image/PIA23302/PIA23302~orig.jpg",
  "satellite-tutorials":
    "https://images-assets.nasa.gov/image/PIA18136/PIA18136~orig.jpg",
  "astronomy-lessons":
    "https://images-assets.nasa.gov/image/PIA23123/PIA23123~orig.jpg",
  aerodynamics:
    "https://images-assets.nasa.gov/image/KSC-20220602-PH-KLS01_0001/KSC-20220602-PH-KLS01_0001~orig.jpg",
  "quantum-physics":
    "https://images-assets.nasa.gov/image/GSFC_20171208_Archive_e001589/GSFC_20171208_Archive_e001589~orig.jpg",
  "space-agi":
    "https://images-assets.nasa.gov/image/iss030e015274/iss030e015274~orig.jpg",
  "space-engineering":
    "https://images-assets.nasa.gov/image/KSC-20220602-PH-KLS01_0001/KSC-20220602-PH-KLS01_0001~orig.jpg",
};

export function getBlogImage(post: { category: string; imageUrl?: string }): string {
  return post.imageUrl || BLOG_IMAGES_BY_CATEGORY[post.category] || BLOG_IMAGES_BY_CATEGORY["space-facts"];
}
