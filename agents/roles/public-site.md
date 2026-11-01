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
