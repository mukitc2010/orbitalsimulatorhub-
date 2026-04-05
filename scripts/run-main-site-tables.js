/**
 * Run supabase-main-site-tables.sql against your Supabase database.
 * Requires SUPABASE_DB_URL in .env (from Supabase Dashboard → Project Settings → Database → Connection string → URI).
 * Do NOT commit .env or share the DB URL.
 */
import "dotenv/config";
import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import pg from "pg";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const sqlPath = join(root, "supabase-main-site-tables.sql");

const url = process.env.SUPABASE_DB_URL;
if (!url || url === "postgresql://postgres:[YOUR-PASSWORD]@...") {
  console.error("\nMissing SUPABASE_DB_URL in .env");
  console.error("1. Supabase Dashboard → Project Settings → Database");
  console.error("2. Under 'Connection string' choose 'URI' and copy it");
  console.error("3. Replace [YOUR-PASSWORD] with your database password");
  console.error("4. Add to .env: SUPABASE_DB_URL=<paste>\n");
  process.exit(1);
}

async function run() {
  const sql = readFileSync(sqlPath, "utf8");
  const client = new pg.Client({ connectionString: url });
  try {
    await client.connect();
    await client.query(sql);
    console.log("Main-site tables created (blog_posts, newsletter_signups, page_feedback + RLS).");
  } catch (e) {
    console.error("Error:", e.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

run();
