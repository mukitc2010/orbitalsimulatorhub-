# Content

ID: `content`. Group: product.

Owns articles, research notes, and the daily space-news roundup. The news runbook is [DAILY_SPACE_NEWS_EDITOR.md](../DAILY_SPACE_NEWS_EDITOR.md).

The news agent reads NASA, JPL, and ESA feeds. It keeps headlines from the last 48 hours, skips duplicates, and writes at most one post. It attributes the source. It does not claim an independent verification. If no story qualifies, it writes nothing. If every feed fails, it changes nothing.

Owns `content/**`, `docs/**`, `scripts/space-news/**`, the content and RSS scripts, `client/src/data/spaceNews.json`, and the news runbook.

Does not publish to LinkedIn. The release workflow does that after merge, using repository secrets that never enter the repo. Does not edit page chrome; `public-site` owns the routes that render a post.

Checks: `npm run news:test` when the news agent changes, and `npm run build` when generated site data changes. Preview with `npm run news:preview` before `npm run news:generate`.
