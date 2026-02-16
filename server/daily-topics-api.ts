/**
 * Daily Topics API endpoints for n8n automation
 * REST API endpoints to add daily featured topics
 */
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { z } from "zod";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const dailyTopicSchema = z.object({
  id: z.string().optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  title: z.string().min(1),
  icon: z.string().min(1),
  category: z.enum(["nasa", "newton", "quantum-physics", "astrophysics", "orbital-mechanics"]),
  description: z.string().min(10),
  learnMoreUrl: z.string().min(1),
  keywords: z.array(z.string()).min(1),
});

const DAILY_TOPICS_FILE = path.join(__dirname, "../client/src/data/dailyTopics.ts");

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function addDailyTopic(topic: z.infer<typeof dailyTopicSchema>): { success: boolean; message: string } {
  try {
    let content = fs.readFileSync(DAILY_TOPICS_FILE, "utf-8");

    // Generate ID if not provided
    const id = topic.id || `${slugify(topic.title)}-${topic.date}`;

    // Generate topic object string
    const topicObject = `  {
    id: "${id}",
    date: "${topic.date}",
    title: "${topic.title.replace(/"/g, '\\"')}",
    icon: "${topic.icon}",
    category: "${topic.category}",
    description: "${topic.description.replace(/"/g, '\\"')}",
    learnMoreUrl: "${topic.learnMoreUrl}",
    keywords: [${topic.keywords.map((k) => `"${k.replace(/"/g, '\\"')}"`).join(", ")}],
  },`;

    // Find insertion point (before closing bracket of DAILY_TOPICS array)
    const beforeClosing = content.lastIndexOf("];");
    if (beforeClosing === -1) {
      return { success: false, message: "Could not find DAILY_TOPICS array closing bracket" };
    }

    // Insert new topic
    const newContent = content.slice(0, beforeClosing) + topicObject + "\n" + content.slice(beforeClosing);

    // Write back to file
    fs.writeFileSync(DAILY_TOPICS_FILE, newContent, "utf-8");

    return { success: true, message: "Daily topic added successfully" };
  } catch (error: any) {
    return { success: false, message: `Error adding topic: ${error.message}` };
  }
}

export function createDailyTopicsRouter() {
  const router = express.Router();

  // Health check
  router.get("/health", (req, res) => {
    res.json({ status: "ok", service: "daily-topics-api" });
  });

  // Add daily topic
  router.post("/topics", (req, res) => {
    try {
      const validated = dailyTopicSchema.parse(req.body);

      // Auto-set date if not provided
      if (!validated.date) {
        validated.date = new Date().toISOString().split("T")[0];
      }

      // Auto-generate ID if not provided
      if (!validated.id) {
        validated.id = `${slugify(validated.title)}-${validated.date}`;
      }

      const result = addDailyTopic(validated);

      if (result.success) {
        res.json({ success: true, message: result.message, topic: validated });
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

  // Get today's topic
  router.get("/topics/today", (req, res) => {
    try {
      const today = new Date().toISOString().split("T")[0];
      const content = fs.readFileSync(DAILY_TOPICS_FILE, "utf-8");
      // Simple check - in production use proper parser
      res.json({ success: true, date: today, message: "Today's topic" });
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  });

  return router;
}
