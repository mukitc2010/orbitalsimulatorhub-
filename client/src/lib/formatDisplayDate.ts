const LONG_MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const SHORT_MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/**
 * Format a date for display without shifting the calendar day.
 * `YYYY-MM-DD` and the date portion of an ISO timestamp are calendar dates.
 * `new Date("1969-07-16")` is UTC midnight, which is still July 15 in the Americas.
 */
export function formatDisplayDate(iso: string, style: "long" | "short" = "long"): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso.trim());
  if (!match) return iso;
  const monthIndex = Number(match[2]) - 1;
  const day = Number(match[3]);
  const month = (style === "long" ? LONG_MONTHS : SHORT_MONTHS)[monthIndex];
  if (!month || day < 1 || day > 31) return iso;
  return `${month} ${day}, ${match[1]}`;
}
