/**
 * AstroBot Knowledge API endpoints for n8n automation
 * REST API endpoints to update AstroBot's knowledge base
 * + AstroBot AGI Chat endpoint
 */
import express from "express";
import { processAstroBot } from "../../lib/astrobot/brain";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { z } from "zod";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const referenceSchema = z.object({
  title: z.string().min(1),
  url: z.string().url(),
  source: z.string().min(1), // e.g., "NASA.gov", "ChatGPT", "Claude", "Perplexity", "NASA Q&A"
});

const astrobotKnowledgeSchema = z.object({
  keywords: z.array(z.string()).min(1),
  answer: z.string().min(10),
  category: z.enum(["nasa", "newton", "quantum-physics", "astrophysics", "orbital-mechanics", "general"]).optional(),
  references: z.array(referenceSchema).optional(),
});

const ASTROBOT_KNOWLEDGE_FILE = path.join(__dirname, "../client/src/astrobotKnowledge.ts");

function addAstroBotKnowledge(knowledge: z.infer<typeof astrobotKnowledgeSchema>): { success: boolean; message: string } {
  try {
    let content = fs.readFileSync(ASTROBOT_KNOWLEDGE_FILE, "utf-8");

    // Generate knowledge entry with references
    let knowledgeEntry = `  {
    keywords: [${knowledge.keywords.map((k) => `"${k.replace(/"/g, '\\"')}"`).join(", ")}],
    answer:
      "${knowledge.answer.replace(/"/g, '\\"').replace(/\n/g, "\\n")}",`;
    
    if (knowledge.references && knowledge.references.length > 0) {
      knowledgeEntry += `\n    references: [\n${knowledge.references.map((ref) => `      { title: "${ref.title.replace(/"/g, '\\"')}", url: "${ref.url.replace(/"/g, '\\"')}", source: "${ref.source.replace(/"/g, '\\"')}" }`).join(",\n")}\n    ],`;
    }
    
    if (knowledge.category) {
      knowledgeEntry += `\n    category: "${knowledge.category}",`;
    }
    
    knowledgeEntry += `\n  },`;

    // Find insertion point (before closing bracket of ASTROBOT_KNOWLEDGE array)
    const beforeClosing = content.lastIndexOf("];");
    if (beforeClosing === -1) {
      return { success: false, message: "Could not find ASTROBOT_KNOWLEDGE array closing bracket" };
    }

    // Insert new knowledge entry
    const newContent = content.slice(0, beforeClosing) + knowledgeEntry + "\n" + content.slice(beforeClosing);

    // Write back to file
    fs.writeFileSync(ASTROBOT_KNOWLEDGE_FILE, newContent, "utf-8");

    return { success: true, message: "AstroBot knowledge added successfully" };
  } catch (error: any) {
    return { success: false, message: `Error adding knowledge: ${error.message}` };
  }
}

export function createAstroBotRouter() {
  const router = express.Router();

  // Health check
  router.get("/health", (req, res) => {
    res.json({ status: "ok", service: "astrobot-api" });
  });

  // AstroBot AGI Chat
  router.post("/chat", async (req, res) => {
    const body = req.body as { message?: string; userId?: string; pageContext?: string; history?: Array<{ role: string; content: string }>; locale?: string };
    const message = typeof body?.message === "string" ? body.message.trim() : "";
    if (!message) return res.status(400).json({ error: "Message is required" });
    try {
      const result = await processAstroBot({
        message,
        userId: body.userId || "anonymous",
        pageContext: body.pageContext,
        history: Array.isArray(body.history) ? body.history : [],
        locale: body.locale || "en",
      });
      return res.json({ reply: result.reply, actions: result.actions, memoryPatch: result.memoryPatch });
    } catch (err) {
      console.error("AstroBot AGI error:", err);
      return res.status(500).json({ error: "AstroBot encountered an error. Please try again." });
    }
  });

  // Add AstroBot knowledge
  router.post("/knowledge", (req, res) => {
    try {
      const validated = astrobotKnowledgeSchema.parse(req.body);

      const result = addAstroBotKnowledge(validated);

      if (result.success) {
        res.json({ success: true, message: result.message, knowledge: validated });
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

  return router;
}
