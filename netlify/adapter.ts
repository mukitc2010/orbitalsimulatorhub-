/** Adapt the existing request handler to Netlify without duplicating mission logic. */
export async function runApi(api: (req: any, res: any) => unknown, event: { httpMethod: string; body: string | null }) {
  let statusCode = 200;
  let body = '';
  const headers: Record<string, string> = {};
  const response = {
    setHeader(name: string, value: string) { headers[name] = value; return response; },
    status(code: number) { statusCode = code; return response; },
    json(value: unknown) { headers['Content-Type'] = 'application/json'; body = JSON.stringify(value); return response; },
    end() { return response; },
  };
  try {
    const payload = event.body ? JSON.parse(event.body) : {};
    await api({ method: event.httpMethod, body: payload }, response);
    return { statusCode, headers, body };
  } catch {
    return { statusCode: 400, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ error: 'Request could not be processed' }) };
  }
}
