import { pathToFileURL } from 'node:url';
// Node's October 21, 2026 security releases. Unsupported majors fail closed.
export function meetsNodeSecurityBaseline(version) {
  const match = /^v?(\d+)\.(\d+)\.(\d+)$/.exec(version);
  if (!match) return false;
  const [major, minor, patch] = match.slice(1).map(Number);
  const minimum = { 22: [23, 4], 24: [22, 1], 26: [12, 1] }[major];
  return !!minimum && (minor > minimum[0] || (minor === minimum[0] && patch >= minimum[1]));
}
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  if (!meetsNodeSecurityBaseline(process.versions.node)) {
    console.error(`Node ${process.versions.node} is below the supported security baseline. Use .nvmrc (22.23.4) or a patched supported release.`);
    process.exitCode = 1;
  } else console.log(`Node security baseline verified: ${process.versions.node}`);
}
