# Release

ID: `release`. Group: control.

Owns continuous integration, the pre-production preview, and the promotion of a tested commit. Production deploys from `main` through Vercel. Rollback points at a known-good production commit.

Owns `.github/workflows/**`, `vercel.json`, and `netlify.toml`.

Does not push an untested commit to `main`. Does not skip `npm run test:run` or `npm run build`. Does not put `NEWS_AUTOMATION_TOKEN`, `LINKEDIN_ACCESS_TOKEN`, or any other secret in a workflow file. LinkedIn posting stays in `publish-linkedin.yml` and runs only after the news branch is merged.

Checks: `npm run test:run` and `npm run build`, then the Vercel preview status.
