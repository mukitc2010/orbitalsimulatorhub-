/** A roundup stays on the news page for today and yesterday. A 2-day-old item is removed. */
export function newsDateInNewYork(now = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: "America/New_York", year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
}

export function isCurrentNews(date: string, today: string): boolean {
  const published = Date.parse(`${date}T00:00:00Z`);
  const current = Date.parse(`${today}T00:00:00Z`);
  if (!Number.isFinite(published) || !Number.isFinite(current)) return false;
  const ageDays = Math.round((current - published) / 86_400_000);
  return ageDays >= 0 && ageDays < 2;
}
