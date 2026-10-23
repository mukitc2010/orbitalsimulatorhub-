import { describe, expect, it } from 'vitest';
import { handler } from '../../../netlify/functions/asi-agent';
describe('Netlify mission API', () => {
  it('serves deterministic orbital calculations without model credentials', async () => {
    const response = await handler({ httpMethod: 'POST', body: JSON.stringify({ message: 'How fast would I orbit at 1,000 km altitude?' }) });
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).reply).toContain('7.354 km/s');
    expect(JSON.parse(response.body).actions).toEqual([]);
  });
  it('converts the validated demo to the existing simulator action contract', async () => {
    const response = await handler({ httpMethod: 'POST', body: JSON.stringify({ message: 'Plan a demo: one LEO, one MEO and one GEO satellite, playing at 8x speed' }) });
    expect(response.statusCode).toBe(200);
    expect(JSON.parse(response.body).actions).toHaveLength(4);
  });
  it('rejects malformed JSON', async () => {
    expect((await handler({ httpMethod: 'POST', body: '{bad' })).statusCode).toBe(400);
  });
});
