/** JSON 404 for /api routes that are not a Netlify function. */
export const handler = async () => ({
  statusCode: 404,
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ error: "Not found" }),
});
