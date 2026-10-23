// Resolve newly added news posts from the exact merged commit, never the latest arbitrary article.
import { execFileSync } from 'node:child_process';
import { appendFileSync } from 'node:fs';
const ref = process.env.NEWS_MERGE_SHA;
const base = process.env.NEWS_BASE_SHA;
if (![ref, base].every(s => /^[a-f0-9]{40}$/.test(s || ''))) throw new Error('Expected exact commit SHAs');
const file = 'client/src/data/spaceNews.json';
const load = (sha) => {
  try { return JSON.parse(execFileSync('git', ['show', `${sha}:${file}`], { encoding: 'utf8' }).replace(/^\uFEFF/, '')); }
  catch { throw new Error(`Cannot read news data at ${sha}; refusing publication`); }
};
const before = new Set(load(base).map(p => p.slug));
const added = load(ref).filter(p => !before.has(p.slug));
if (added.length > 1) throw new Error('Multiple new roundups found; select one manually');
if (added.length === 1) {
  if (!/^space-news-\d{4}-\d{2}-\d{2}$/.test(added[0].slug)) throw new Error('Invalid news slug');
  appendFileSync(process.env.GITHUB_OUTPUT, `slug=${added[0].slug}\n`);
}
