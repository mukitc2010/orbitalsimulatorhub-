# OpenClaw Deploy Rules — Read This Before Deploying

## What to Deploy

When you run `npm run openclaw:update`, you will:

1. **Generate 1 new blog post** (content-agent.js) — Space AGI, Space Engineering, or other topics
2. **Update SEO** (auto-seo-update.js) — sitemap lastmod
3. **Regenerate RSS** (generate-rss.js)
4. **Git add** these files only: `blogPosts.ts`, `seo-config.ts`, `sitemap.xml`, `rss.xml`, `index.html`
5. **Commit & push** to GitHub → Vercel deploys

## What NOT to Change

- **nasaMerchandise.ts** — NASA t-shirts, toys, books. Only verified Amazon products. Do not add unverified ASINs.
- **affiliate-books.json** — Used by content-agent for blog post book links. Only verified ASINs.
- **Space Shop** (`/space-shop`) — Static page. Products are in nasaMerchandise.ts.

## Amazon Products — Verified Only

All products must be verified available on Amazon.com. Current catalog:
- Books: 0393609391, 0080977472, 0553380168, 0345539435, 1118460820, 0312857043, 1439148813
- NASA t-shirts: B0B92VHTVD, B07SSCVV4G, B07KW5ZV6M, B07PKRBHK7
- Toys: B08STQBXN5, B09JHZY7JF, B0CSNN775Y
- Accessories: B08P15CLQ5

Do not add new ASINs without verifying they work on Amazon.com (no "Dogs of Amazon" 404).
