# Run main-site tables (blog_posts, newsletter_signups, page_feedback)

## Option A – Script (no copy-paste of SQL)

1. **Get your database connection string**
   - Supabase Dashboard → **Project Settings** (gear) → **Database**
   - Under **Connection string** choose **URI**
   - Copy the URI (looks like `postgresql://postgres.[ref]:[YOUR-PASSWORD]@...`)
   - Replace `[YOUR-PASSWORD]` with your **database password** (set when you created the project, or reset in the same Database page)

2. **Add to `.env` in the project root** (create the file if it doesn’t exist):
   ```env
   SUPABASE_DB_URL=postgresql://postgres.srxtknwdlitqrswnlfxl:YOUR_ACTUAL_PASSWORD@aws-0-us-west-2.pooler.supabase.com:6543/postgres
   ```
   Use the **exact** URI from the dashboard (region/host may differ). Do not commit `.env`.

3. **Install and run**
   ```bash
   npm install
   npm run db:main-site
   ```
   You should see: `Main-site tables created (blog_posts, newsletter_signups, page_feedback + RLS).`

## Option B – Manual (Supabase SQL Editor)

1. Open **Supabase** → **SQL Editor** → **New query**
2. Copy **all** of `supabase-main-site-tables.sql` and paste
3. Click **Run**

---

Use **one** of the two options. The script uses the same SQL file.
