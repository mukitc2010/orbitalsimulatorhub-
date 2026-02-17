/**
 * Git Deploy API endpoint for n8n automation
 * Handles git commit and push operations to trigger Vercel deployment
 */
import express from "express";
import { exec } from "child_process";
import { promisify } from "util";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const execAsync = promisify(exec);

const router = express.Router();

// Project path
const PROJECT_PATH = path.join(__dirname, "../");

/**
 * POST /api/git/deploy
 * Commits changes and pushes to GitHub, triggering Vercel deployment
 */
router.post("/deploy", async (req, res) => {
  try {
    const { message, type } = req.body;
    const deployMessage = message || `Auto-deploy: ${type || "Content update"}`;

    console.log(`🚀 Starting git deploy: ${deployMessage}`);

    // Files to commit (based on type)
    const filesToAdd = [
      "client/src/data/researchContent.ts",
      "client/src/data/blogPosts.ts",
      "client/src/data/dailyTopics.ts",
      "client/src/data/seo-config.ts",
      "client/src/astrobotKnowledge.ts",
      "client/index.html",
      "client/public/blog/rss.xml",
    ];

    // Generate RSS feed first
    try {
      console.log("📰 Generating RSS feed...");
      await execAsync("npm run generate:rss", { cwd: PROJECT_PATH });
    } catch (error) {
      console.warn("⚠️  RSS generation failed, continuing...", error);
    }

    // Stage files
    console.log("📝 Staging changes...");
    const addCommand = `git add ${filesToAdd.join(" ")}`;
    await execAsync(addCommand, { cwd: PROJECT_PATH });

    // Check if there are changes
    const { stdout: status } = await execAsync("git status --porcelain", {
      cwd: PROJECT_PATH,
    });
    if (!status.trim()) {
      console.log("✅ No changes to commit");
      return res.json({ success: true, message: "No changes to commit" });
    }

    // Commit
    console.log("💾 Committing changes...");
    const commitCommand = `git commit -m "${deployMessage.replace(/"/g, '\\"')}"`;
    await execAsync(commitCommand, { cwd: PROJECT_PATH });

    // Push to GitHub
    console.log("📤 Pushing to GitHub...");
    await execAsync("git push origin main", { cwd: PROJECT_PATH });

    console.log("✅ Successfully deployed to GitHub!");
    console.log("🔄 Vercel will auto-deploy in 1-2 minutes...");

    res.json({
      success: true,
      message: "Deployed successfully to GitHub",
      vercel: "Vercel will auto-deploy in 1-2 minutes",
      url: "https://www.orbitalsimulatorhub.com/",
    });
  } catch (error: any) {
    console.error("❌ Git deploy failed:", error);
    res.status(500).json({
      success: false,
      error: error.message,
      stderr: error.stderr,
    });
  }
});

/**
 * GET /api/git/health
 * Health check endpoint
 */
router.get("/health", (req, res) => {
  res.json({ status: "ok", service: "git-deploy-api" });
});

export function createGitDeployRouter() {
  return router;
}
