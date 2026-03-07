# Deploy to Vercel

## Quick deploy

1. **Install Vercel CLI** (if needed):
   ```bash
   npm i -g vercel
   ```

2. **From the project root**, run:
   ```bash
   vercel
   ```
   Follow the prompts (link to existing project or create new one).

3. **Production deploy**:
   ```bash
   vercel --prod
   ```

## Connect Git (recommended)

1. Push your code to GitHub/GitLab/Bitbucket.
2. Go to [vercel.com](https://vercel.com) → Add New Project.
3. Import your repo. Vercel will use `vercel.json` and deploy on every push.

## What gets deployed

- **Static frontend**: Built with `npm run build:client` (Vite) → output in `dist/`.
- **API**: All `/api/*` routes (tRPC, blog, qsagi, chat, etc.) run via the Express app in `api/[[...path]].ts`.

## Environment variables

Set in Vercel Dashboard → Project → Settings → Environment Variables:

- `OPENAI_API_KEY` – for AI chat (api/chat).
- `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` – for qsagi leaderboard and other Supabase features.
- Any other keys your app or server uses (e.g. `DATABASE_URL` if you use DB in API).

Then redeploy.

## Custom domain

In Vercel → Project → Settings → Domains, add your domain (e.g. `www.orbitalsimulatorhub.com`). The existing redirects in `vercel.json` send `http` and apex to `https://www.orbitalsimulatorhub.com`.
