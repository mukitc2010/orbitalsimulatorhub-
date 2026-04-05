# Do It For Me – 3 Steps Left (You Do in Browser)

Everything that can be automated is done. You only need to do **3 things in Supabase** (about 5 minutes).

---

## Run the setup script (automated)

From the **community** folder:

```bash
node scripts/setup-for-me.js
```

This will:
- Create `.env.local` from `.env.example`
- Open Supabase in your browser
- Print the 3 steps below

---

## Step A – Create a Supabase project

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard) (or the tab that opened).
2. **New project** → name (e.g. `orbital-community`) → set a **database password** (save it).
3. Wait until the project is ready (green).

---

## Step B – Run the SQL (one shot)

1. In the project: left sidebar → **SQL Editor** → **New query**.
2. Open the file **`community/supabase/full-setup.sql`** in your editor.
3. **Select all** (Ctrl+A) → **Copy**.
4. Paste into the Supabase SQL Editor.
5. Click **Run**.
6. You should see **Success** (tables + RLS + seed data are created).

---

## Step C – Copy keys into .env.local

1. In Supabase: **Project Settings** (gear icon) → **API**.
2. Copy **Project URL** → open **`community/.env.local`** → set:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   ```
3. Copy **anon public** key → set:
   ```env
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
   ```
4. Keep this line as is:
   ```env
   NEXT_PUBLIC_WORKSPACE_ID=a0000000-0000-0000-0000-000000000001
   ```
5. Save `.env.local`.

---

## Step D – Auth redirect (for sign-in to work)

1. In Supabase: **Authentication** → **URL Configuration**.
2. **Site URL:** `http://localhost:3001` (or your real community URL later).
3. **Redirect URLs:** add `http://localhost:3001/auth/callback`.
4. Save.

---

## Run the app

```bash
cd community
npm install
npm run dev
```

Open **http://localhost:3001** → you should see the community landing page. Sign up → onboarding → channels.

---

## Summary

| Done for you | You do |
|--------------|--------|
| Full SQL in one file (`full-setup.sql`) | Create Supabase project |
| `.env.local` created | Run that SQL in SQL Editor |
| Script opens Supabase | Copy URL + anon key into `.env.local` |
| App code ready | Set Auth redirect URL |
| | `npm install` + `npm run dev` |

That’s it. After Step C and D, the community app runs locally.
