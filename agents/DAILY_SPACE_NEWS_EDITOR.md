# Daily Space News Editor

Procedure for the `content` agent. Covers Earth, Mars, Neptune, Mercury, Venus, Jupiter, Saturn, Uranus, Moon and general spaceflight.

The agent fetches official NASA, JPL and ESA RSS/Atom feeds. It checks source URLs and publication dates, excludes future or over-48-hour-old articles, deduplicates titles and URLs against published roundups, groups headlines by topic, and creates at most one daily website post. No language model or AI key is required. It publishes short attributed headlines and links rather than claiming to independently verify the reporting. Planet classification is keyword-based and can miss implicit planet references.

If no new stories qualify, no post is created. If every feed fails, the run fails without changing content. Partial failures are disclosed. No-news planet sections explicitly say no eligible headline was found; they do not imply nothing happened. Original publication dates remain visible separately from the roundup date.

## Run locally

Python 3.9+ with IANA timezone data is required (GitHub Ubuntu includes it). On Windows, install `tzdata` if `America/New_York` is unavailable.

```
npm run news:preview
npm run news:test
npm run news:generate
```

Preview is read-only. Generate writes `client/src/data/spaceNews.json`, which is included in the existing blog pages and RSS generator. Roundup headlines are sourced from the preceding 48 hours. If fewer than four qualify, the desk fills the roundup with the latest official headlines from the preceding 7 days and says so. Published items are not repeated. Roundups older than two days are deleted from the news page and from `spaceNews.json`. Today and yesterday stay.

## Daily automation and LinkedIn

`.github/workflows/daily-space-news.yml` runs at 13:15 UTC daily (9:15 AM New York during daylight time; 8:15 AM during standard time). GitHub schedules can be delayed. News dates use America/New_York.

The scheduled workflow writes the roundup, commits it on `main`, builds the client, and deploys the Netlify site when `NETLIFY_AUTH_TOKEN` is set. After that commit, `publish-linkedin.yml` can promote the roundup. A commit by itself is not the live page until the deploy step finishes.

To activate, merge these files into the default branch, enable Actions and allow Actions to create PRs. For workflows on bot-created PRs to trigger, configure a narrowly scoped GitHub App/PAT as `NEWS_AUTOMATION_TOKEN`; the default GITHUB_TOKEN cannot trigger most downstream workflows. Existing branch protection and required checks still apply.

Configure repository secrets `LINKEDIN_ACCESS_TOKEN` and `LINKEDIN_ORGANIZATION_URN` (`urn:li:organization:<id>`). The token needs organization posting permission and an authorized page role. Configure repository variable `LINKEDIN_API_VERSION` with a supported YYYYMM API version; default is 202606. Tokens expire and API versions sunset. Never put credentials in code or chat. Personal-profile posting is not included.

LinkedIn requests are not automatically retried because an ambiguous timeout could duplicate a successful post. Check the organization page before rerunning a failed publication job. No credential validation or live social posting is performed during local testing.

Sources: https://www.nasa.gov/rss-feeds/ ; https://www.jpl.nasa.gov/rss/ ; https://www.esa.int/Services/RSS_Feeds ; https://learn.microsoft.com/en-us/linkedin/marketing/community-management/shares/posts-api ; https://learn.microsoft.com/en-us/linkedin/marketing/versioning
