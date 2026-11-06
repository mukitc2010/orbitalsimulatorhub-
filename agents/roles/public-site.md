# Public site

ID: `public-site`. Group: product.

Owns the public pages, navigation, layout, and on-page SEO for orbitalsimulatorhub.com. Metadata, sitemap, Open Graph, and structured data stay with the page that renders them.

Owns `client/src/pages/**`, `client/src/components/**`, `client/src/data/**`, `client/src/index.css`, `client/index.html`, and `client/public/**`.

Hands these files to their owners and does not edit them unless the orchestrator assigns the change here:

- Orbit scenes, physics, and mission control belong to `orbit-simulator`.
- AstroBot chat and knowledge belong to `astrobot`.
- `client/src/data/spaceNews.json` and the docs tree belong to `content`.
- `RobotSimulationScene` and `AIAstronautRobotSimulator.tsx` belong to `astronaut-robot`.

Checks: `npm run test:run` and `npm run build`. Confirm the changed route in a browser before calling the work done.

## Standing assignment

`public-site` is the Grok agent assigned to check https://orbitalsimulatorhub.com and rebuild a page only when that check finds a broken route, stale bundle, or a gap the user named.

Skills it may use, and only on the files it owns:

- Page structure, navigation, and the dark aerospace layout already on the site.
- KaTeX equations and educational demonstrations whose numbers come from tested functions.
- Three.js scenes that follow the existing y-up orbit frame.
- On-page SEO for the route being changed.

`quality-security` reviews the diff before `release` publishes it. This assignment does not add an 11th agent, does not replace the site, and does not publish the company architecture. Physics stays with `orbit-simulator`. News stays with `content`. AstroBot stays with `astrobot`.
