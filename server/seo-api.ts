/**
 * SEO API endpoints for n8n automation
 * REST API endpoints to update SEO meta tags for pages
 */
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { z } from "zod";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const seoConfigSchema = z.object({
  path: z.string().min(1),
  title: z.string().min(1).optional(),
  description: z.string().min(1).optional(),
  keywords: z.string().optional(),
  ogTitle: z.string().optional(),
  ogDescription: z.string().optional(),
});

const SEO_CONFIG_FILE = path.join(__dirname, "../client/src/data/seo-config.ts");
const HTML_FILE = path.join(__dirname, "../client/index.html");

function updateSEOConfig(updates: z.infer<typeof seoConfigSchema>): { success: boolean; message: string } {
  try {
    let content = fs.readFileSync(SEO_CONFIG_FILE, "utf-8");
    const { path: pagePath, ...seoFields } = updates;
    
    // Find the SEO_CONFIGS entry for this path
    const pathKey = pagePath.split('#')[0]; // Remove hash fragments
    const configRegex = new RegExp(
      `"${pathKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}":\\s*{([\\s\\S]*?)}`,
      "g"
    );
    
    if (!configRegex.test(content)) {
      // Config doesn't exist, need to add it
      // Find the SEO_CONFIGS object closing brace
      const configsEndMatch = content.match(/export const SEO_CONFIGS: Record<string, SEOConfig> = \{([\s\S]*?)\};/);
      if (!configsEndMatch) {
        return { success: false, message: "Could not find SEO_CONFIGS object" };
      }
      
      // Generate new config entry
      const newConfig = `  "${pathKey}": {
    path: "${pathKey}",
    title: "${seoFields.title || ""}",
    description: "${seoFields.description || ""}",
    keywords: "${seoFields.keywords || ""}",
    ${seoFields.ogTitle ? `ogTitle: "${seoFields.ogTitle}",` : ""}
    ${seoFields.ogDescription ? `ogDescription: "${seoFields.ogDescription}",` : ""}
    lastUpdated: "${new Date().toISOString()}",
  },`;
      
      // Insert before closing brace
      const beforeClosing = content.lastIndexOf("};");
      if (beforeClosing === -1) {
        return { success: false, message: "Could not find SEO_CONFIGS closing brace" };
      }
      
      content = content.slice(0, beforeClosing) + newConfig + "\n" + content.slice(beforeClosing);
    } else {
      // Update existing config
      const pathKey = pagePath.split('#')[0];
      
      // Update title if provided
      if (seoFields.title) {
        const titleRegex = new RegExp(
          `("${pathKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}":\\s*{[\\s\\S]*?title:\\s*")[^"]+(")`,
          "g"
        );
        content = content.replace(titleRegex, `$1${seoFields.title.replace(/"/g, '\\"')}$2`);
      }
      
      // Update description if provided
      if (seoFields.description) {
        const descRegex = new RegExp(
          `("${pathKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}":\\s*{[\\s\\S]*?description:\\s*")[^"]+(")`,
          "g"
        );
        content = content.replace(descRegex, `$1${seoFields.description.replace(/"/g, '\\"')}$2`);
      }
      
      // Update keywords if provided
      if (seoFields.keywords) {
        const keywordsRegex = new RegExp(
          `("${pathKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}":\\s*{[\\s\\S]*?keywords:\\s*")[^"]+(")`,
          "g"
        );
        content = content.replace(keywordsRegex, `$1${seoFields.keywords.replace(/"/g, '\\"')}$2`);
      }
      
      // Update ogTitle if provided
      if (seoFields.ogTitle) {
        const ogTitleRegex = new RegExp(
          `("${pathKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}":\\s*{[\\s\\S]*?ogTitle:\\s*")[^"]+(")`,
          "g"
        );
        if (ogTitleRegex.test(content)) {
          content = content.replace(ogTitleRegex, `$1${seoFields.ogTitle.replace(/"/g, '\\"')}$2`);
        } else {
          // Add ogTitle if it doesn't exist
          const beforeLastUpdated = content.lastIndexOf('lastUpdated:');
          content = content.slice(0, beforeLastUpdated) + 
            `    ogTitle: "${seoFields.ogTitle.replace(/"/g, '\\"')}",\n    ` + 
            content.slice(beforeLastUpdated);
        }
      }
      
      // Update ogDescription if provided
      if (seoFields.ogDescription) {
        const ogDescRegex = new RegExp(
          `("${pathKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}":\\s*{[\\s\\S]*?ogDescription:\\s*")[^"]+(")`,
          "g"
        );
        if (ogDescRegex.test(content)) {
          content = content.replace(ogDescRegex, `$1${seoFields.ogDescription.replace(/"/g, '\\"')}$2`);
        } else {
          // Add ogDescription if it doesn't exist
          const beforeLastUpdated = content.lastIndexOf('lastUpdated:');
          content = content.slice(0, beforeLastUpdated) + 
            `    ogDescription: "${seoFields.ogDescription.replace(/"/g, '\\"')}",\n    ` + 
            content.slice(beforeLastUpdated);
        }
      }
      
      // Update lastUpdated field
      const lastUpdatedRegex = new RegExp(
        `("${pathKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}":\\s*{[\\s\\S]*?lastUpdated:\\s*")[^"]+(")`,
        "g"
      );
      content = content.replace(lastUpdatedRegex, `$1${new Date().toISOString()}$2`);
    }
    
    fs.writeFileSync(SEO_CONFIG_FILE, content, "utf-8");
    
    return { success: true, message: `SEO config updated for path: ${pathKey}` };
  } catch (error: any) {
    return { success: false, message: `Error updating SEO config: ${error.message}` };
  }
}

export function createSEORouter() {
  const router = express.Router();

  // Health check
  router.get("/health", (req, res) => {
    res.json({ status: "ok", service: "seo-api" });
  });

  // Update SEO config for a page
  router.put("/config", (req, res) => {
    try {
      const validated = seoConfigSchema.parse(req.body);
      
      const result = updateSEOConfig(validated);
      
      if (result.success) {
        res.json({ success: true, message: result.message, config: validated });
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

  // Get SEO config for a page
  router.get("/config/:path", (req, res) => {
    try {
      const { path: pagePath } = req.params;
      const content = fs.readFileSync(SEO_CONFIG_FILE, "utf-8");
      const pathKey = decodeURIComponent(pagePath).split('#')[0];
      
      const configRegex = new RegExp(
        `"${pathKey.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}":\\s*{([\\s\\S]*?)}`,
        "g"
      );
      const match = configRegex.exec(content);
      
      if (!match) {
        return res.status(404).json({ success: false, message: `SEO config for path "${pathKey}" not found` });
      }
      
      res.json({ success: true, path: pathKey, message: "Config found" });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  });

  // Update HTML file with SEO from config (for homepage)
  router.post("/update-html", (req, res) => {
    try {
      const { path: pagePath } = req.body;
      const pathKey = (pagePath || "/").split('#')[0];
      
      if (pathKey !== "/") {
        return res.json({ success: true, message: "HTML update only supported for homepage (/)", path: pathKey });
      }
      
      // Read SEO config
      const configContent = fs.readFileSync(SEO_CONFIG_FILE, "utf-8");
      const configMatch = configContent.match(/"\/":\s*{([\s\S]*?)}/);
      
      if (!configMatch) {
        return res.status(404).json({ success: false, message: "Homepage SEO config not found" });
      }
      
      // Extract values (simplified - in production use proper parser)
      const titleMatch = configContent.match(/"\/":\s*{[\s\S]*?title:\s*"([^"]+)"/);
      const descMatch = configContent.match(/"\/":\s*{[\s\S]*?description:\s*"([^"]+)"/);
      const keywordsMatch = configContent.match(/"\/":\s*{[\s\S]*?keywords:\s*"([^"]+)"/);
      const ogTitleMatch = configContent.match(/"\/":\s*{[\s\S]*?ogTitle:\s*"([^"]+)"/);
      
      // Read HTML file
      let htmlContent = fs.readFileSync(HTML_FILE, "utf-8");
      
      // Update title
      if (titleMatch) {
        htmlContent = htmlContent.replace(
          /<title>.*?<\/title>/,
          `<title>${titleMatch[1].replace(/&/g, "&amp;")}</title>`
        );
      }
      
      // Update description
      if (descMatch) {
        htmlContent = htmlContent.replace(
          /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/,
          `<meta name="description" content="${descMatch[1].replace(/"/g, "&quot;")}" />`
        );
      }
      
      // Update keywords
      if (keywordsMatch) {
        htmlContent = htmlContent.replace(
          /<meta\s+name="keywords"\s+content="[^"]*"\s*\/?>/,
          `<meta name="keywords" content="${keywordsMatch[1].replace(/"/g, "&quot;")}" />`
        );
      }
      
      // Update og:title
      if (ogTitleMatch) {
        htmlContent = htmlContent.replace(
          /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/,
          `<meta property="og:title" content="${ogTitleMatch[1].replace(/"/g, "&quot;")}" />`
        );
      }
      
      // Write updated HTML
      fs.writeFileSync(HTML_FILE, htmlContent, "utf-8");
      
      res.json({ success: true, message: "HTML file updated with latest SEO config", path: pathKey });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  });

  return router;
}
