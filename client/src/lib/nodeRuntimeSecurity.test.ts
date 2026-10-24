import { describe, expect, it } from 'vitest';
import { meetsNodeSecurityBaseline } from '../../../scripts/check-node-runtime.mjs';
describe('Node October 2026 security baseline', () => {
  it.each(['22.23.4', '24.22.1', '26.12.1', '22.24.0', '24.22.2'])('accepts patched supported release %s', version => {
    expect(meetsNodeSecurityBaseline(version)).toBe(true);
  });
  it.each(['22.16.0', '22.23.3', '24.22.0', '26.12.0', '20.99.0', '23.99.0', '22.23.4-rc.1', 'bad'])('rejects unsupported or unpatched release %s', version => {
    expect(meetsNodeSecurityBaseline(version)).toBe(false);
  });
});
