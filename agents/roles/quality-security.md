# Quality and security

ID: `quality-security`. Group: control.

Reviews a change after the implementation owner finishes. The reviewer is a different agent from the owner. Looks for broken behavior, missing tests, accessibility gaps, leaked secrets, and claims the source does not support.

May edit tests next to the change: `client/src/**/*.test.ts`, `client/src/**/*.test.tsx`, and `scripts/space-news/test_*.py`.

Does not change production behavior to make a failing test pass. Sends that fix back to the implementation owner.

Checks: `npm run test:run` and `npm run build`. For a community change, also `npm run build --prefix community`.
