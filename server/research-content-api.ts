/**
 * Research Content API endpoints for n8n automation
 * REST API endpoints to add research content for PhD students and researchers
 */
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { z } from "zod";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const referenceSchema = z.object({
  title: z.string().min(1),
  url: z.string().url(),
  source: z.string().min(1),
  type: z.enum(["paper", "website", "documentation", "data", "tool"]),
});

const formulaSchema = z.object({
  name: z.string().min(1),
  equation: z.string().min(1),
  description: z.string().min(1),
}).optional();

const dataPointSchema = z.object({
  label: z.string().min(1),
  value: z.string().min(1),
  unit: z.string().optional(),
  source: z.string().min(1),
}).optional();

const researchContentSchema = z.object({
  id: z.string().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  title: z.string().min(1),
  type: z.enum(["paper-summary", "discovery", "methodology", "data-source", "tool", "case-study", "trend", "formula", "documentation"]),
  category: z.enum(["nasa", "orbital-mechanics", "astrophysics", "quantum-physics", "aerospace", "general"]),
  summary: z.string().min(10),
  content: z.string().min(50),
  keywords: z.array(z.string()).min(1),
  references: z.array(referenceSchema).min(1),
  formulas: z.array(formulaSchema).optional(),
  dataPoints: z.array(dataPointSchema).optional(),
  relatedTopics: z.array(z.string()).optional(),
  seoKeywords: z.string().optional(),
});

const RESEARCH_CONTENT_FILE = path.join(__dirname, "../client/src/data/researchContent.ts");

function addResearchContent(content: z.infer<typeof researchContentSchema>): { success: boolean; message: string } {
  try {
    let fileContent = fs.readFileSync(RESEARCH_CONTENT_FILE, "utf-8");

    // Generate research content entry
    let entry = `  {\n    id: "${content.id}",\n    date: "${content.date}",\n    title: ${JSON.stringify(content.title)},\n    type: "${content.type}",\n    category: "${content.category}",\n    summary: ${JSON.stringify(content.summary)},\n    content: ${JSON.stringify(content.content)},\n    keywords: [${content.keywords.map(k => JSON.stringify(k)).join(", ")}],\n    references: [\n${content.references.map(ref => `      {\n        title: ${JSON.stringify(ref.title)},\n        url: ${JSON.stringify(ref.url)},\n        source: ${JSON.stringify(ref.source)},\n        type: "${ref.type}"\n      }`).join(",\n")}\n    ]`;

    if (content.formulas && content.formulas.length > 0) {
      entry += `,\n    formulas: [\n${content.formulas.map(f => `      {\n        name: ${JSON.stringify(f.name)},\n        equation: ${JSON.stringify(f.equation)},\n        description: ${JSON.stringify(f.description)}\n      }`).join(",\n")}\n    ]`;
    }

    if (content.dataPoints && content.dataPoints.length > 0) {
      entry += `,\n    dataPoints: [\n${content.dataPoints.map(dp => `      {\n        label: ${JSON.stringify(dp.label)},\n        value: ${JSON.stringify(dp.value)},\n        unit: ${JSON.stringify(dp.unit || "")},\n        source: ${JSON.stringify(dp.source)}\n      }`).join(",\n")}\n    ]`;
    }

    if (content.relatedTopics && content.relatedTopics.length > 0) {
      entry += `,\n    relatedTopics: [${content.relatedTopics.map(t => JSON.stringify(t)).join(", ")}]`;
    }

    if (content.seoKeywords) {
      entry += `,\n    seoKeywords: ${JSON.stringify(content.seoKeywords)}`;
    }

    entry += `\n  },\n`;

    // Find insertion point (before closing bracket of RESEARCH_CONTENT array)
    const beforeClosing = fileContent.lastIndexOf("];");
    if (beforeClosing === -1) {
      return { success: false, message: "Could not find RESEARCH_CONTENT array closing bracket" };
    }

    // Insert new content entry
    const newContent = fileContent.slice(0, beforeClosing) + entry + fileContent.slice(beforeClosing);

    // Write back to file
    fs.writeFileSync(RESEARCH_CONTENT_FILE, newContent, "utf-8");

    return { success: true, message: "Research content added successfully" };
  } catch (error: any) {
    return { success: false, message: `Error adding research content: ${error.message}` };
  }
}

export function createResearchContentRouter() {
  const router = express.Router();

  // Health check
  router.get("/health", (req, res) => {
    res.json({ status: "ok", service: "research-content-api" });
  });

  // Add research content
  router.post("/content", (req, res) => {
    try {
      const validated = researchContentSchema.parse(req.body);

      const result = addResearchContent(validated);

      if (result.success) {
        res.json({ success: true, message: result.message, content: validated });
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

  // Get all research content
  router.get("/content", (req, res) => {
    try {
      // Read and parse the TypeScript file (simplified - in production use proper parser)
      const fileContent = fs.readFileSync(RESEARCH_CONTENT_FILE, "utf-8");
      // This is a simplified approach - in production, use a proper TypeScript parser
      res.json({ success: true, message: "Use GET /content/:id for individual items" });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  });

  return router;
}
