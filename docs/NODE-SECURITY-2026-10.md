# Node security update - 24 October 2026

The website uses Node.js build tools and Netlify functions. No PHP/OpenLiteSpeed application was found in this repository. PHP shell commands from the supplied notice do not apply to this deployment.

The project selects Node 22.23.4 via `.nvmrc` and Netlify NODE_VERSION. CI uses the same file. The package engine range accepts patched Node 22, 24 or 26 release lines. Production build scripts reject versions below the October 21 security baseline. This does not upgrade a globally installed node.exe or modify other computer projects.

Netlify manages the exact function-runtime patch level. Build-time Node selection is not proof of the running Lambda version. API responses expose `X-Node-Security-Baseline: met` or `below-minimum`, calculated from the actual process version. This is a version check, not a vulnerability scan or guarantee that all dependencies are secure. No exact runtime version or credentials are exposed.

If the deployed header says below-minimum, the hosting runtime still needs updating; do not call it patched. Netlify's AWS_LAMBDA_JS_RUNTIME override must be managed through its UI/CLI/API, not netlify.toml. Provider-managed patches within a major runtime cannot be pinned with .nvmrc.

References:
- https://nodejs.org/en/blog/vulnerability/october-2026-security-releases
- https://nodejs.org/en/blog/release/v22.23.4
- https://docs.netlify.com/build/configure-builds/manage-dependencies/
- https://docs.netlify.com/build/functions/environment-variables/
