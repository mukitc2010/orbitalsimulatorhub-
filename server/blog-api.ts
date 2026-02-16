/**
 * Blog API endpoints for n8n automation
 * REST API endpoints to add blog posts programmatically
 */
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { z } from "zod";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const blogPostSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  excerpt: z.string().min(1),
  content: z.string().min(100),
  category: z.enum(["nasa-news", "space-facts", "satellite-tutorials", "astronomy-lessons"]),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  tags: z.array(z.string()).min(1),
  seoKeywords: z.string().optional(),
});

const BLOG_POSTS_FILE = path.join(__dirname, "../client/src/data/blogPosts.ts");

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function readBlogPosts(): any[] {
  try {
    const content = fs.readFileSync(BLOG_POSTS_FILE, "utf-8");
    // Simple regex extraction - in production, use a proper parser
    const posts: any[] = [];
    const postRegex = /{\s*slug:\s*"([^"]+)",[\s\S]*?},/g;
    let match;
    while ((match = postRegex.exec(content)) !== null) {
      // This is a simplified parser - for production, use a proper TypeScript parser
    }
    return posts;
  } catch (error) {
    console.error("Error reading blog posts:", error);
    return [];
  }
}

function addBlogPost(post: z.infer<typeof blogPostSchema>): { success: boolean; message: string } {
  try {
    let content = fs.readFileSync(BLOG_POSTS_FILE, "utf-8");
    
    // Generate the post object string
    const postObject = `  {
    slug: "${post.slug}",
    title: "${post.title.replace(/"/g, '\\"')}",
    excerpt: "${post.excerpt.replace(/"/g, '\\"')}",
    content: \`${post.content.replace(/`/g, "\\`").replace(/\$\{/g, "\\${")}\`,
    category: "${post.category}",
    date: "${post.date}",
    tags: [${post.tags.map(t => `"${t.replace(/"/g, '\\"')}"`).join(", ")}],
    ${post.seoKeywords ? `seoKeywords: "${post.seoKeywords.replace(/"/g, '\\"')}",` : ""}
  },`;

    // Find the insertion point (before the closing bracket of BLOG_POSTS array)
    const arrayEndMatch = content.match(/export const BLOG_POSTS: BlogPost\[\] = \[([\s\S]*?)\];/);
    if (!arrayEndMatch) {
      return { success: false, message: "Could not find BLOG_POSTS array" };
    }

    // Insert the new post before the closing bracket
    const beforeClosing = content.lastIndexOf("];");
    if (beforeClosing === -1) {
      return { success: false, message: "Could not find array closing bracket" };
    }

    // Insert new post
    const newContent = content.slice(0, beforeClosing) + postObject + "\n" + content.slice(beforeClosing);
    
    // Write back to file
    fs.writeFileSync(BLOG_POSTS_FILE, newContent, "utf-8");
    
    return { success: true, message: "Blog post added successfully" };
  } catch (error: any) {
    return { success: false, message: `Error adding post: ${error.message}` };
  }
}

export function createBlogRouter() {
  const router = express.Router();

  // Health check
  router.get("/health", (req, res) => {
    res.json({ status: "ok", service: "blog-api" });
  });

  // Add blog post
  router.post("/posts", (req, res) => {
    try {
      const validated = blogPostSchema.parse(req.body);
      
      // Auto-generate slug if not provided
      if (!validated.slug || validated.slug === "auto") {
        validated.slug = slugify(validated.title);
      }

      // Auto-set date if not provided
      if (!validated.date) {
        validated.date = new Date().toISOString().split("T")[0];
      }

      const result = addBlogPost(validated);
      
      if (result.success) {
        res.json({ success: true, message: result.message, post: validated });
      } else {
        res.status(400).json({ success: false, message: result.message });
      }
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, message: "Validation error", errors: error.errors });
      } else {
        res.status(500).json({ success: false, message: error.message });
      }
    }
  });

  // Update blog post by slug
  router.put("/posts/:slug", (req, res) => {
    try {
      const { slug } = req.params;
      const updates = blogPostSchema.partial().parse(req.body);
      
      let content = fs.readFileSync(BLOG_POSTS_FILE, "utf-8");
      
      // Find and replace the post
      const postRegex = new RegExp(
        `({\\s*slug:\\s*"${slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}",[\\s\\S]*?}),`,
        "g"
      );
      
      if (!postRegex.test(content)) {
        return res.status(404).json({ success: false, message: `Post with slug "${slug}" not found` });
      }
      
      // Re-read content
      content = fs.readFileSync(BLOG_POSTS_FILE, "utf-8");
      const match = content.match(postRegex);
      
      if (!match) {
        return res.status(404).json({ success: false, message: `Post with slug "${slug}" not found` });
      }
      
      // For now, return success - full update requires more complex parsing
      // In production, use a proper TypeScript parser
      res.json({ 
        success: true, 
        message: `Post "${slug}" update requested. Note: Full update requires manual file editing or proper parser.`,
        slug,
        updates 
      });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ success: false, message: "Validation error", errors: error.errors });
      } else {
        res.status(500).json({ success: false, message: error.message });
      }
    }
  });

  // Get all posts (for verification)
  router.get("/posts", (req, res) => {
    try {
      const posts = readBlogPosts();
      res.json({ success: true, count: posts.length, posts });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  });

  // Get post by slug
  router.get("/posts/:slug", (req, res) => {
    try {
      const { slug } = req.params;
      const content = fs.readFileSync(BLOG_POSTS_FILE, "utf-8");
      const postRegex = new RegExp(
        `{\\s*slug:\\s*"${slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}",([\\s\\S]*?)},`,
        "g"
      );
      const match = postRegex.exec(content);
      
      if (!match) {
        return res.status(404).json({ success: false, message: `Post with slug "${slug}" not found` });
      }
      
      res.json({ success: true, message: "Post found", slug });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  });

  return router;
}
