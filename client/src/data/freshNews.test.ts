import { expect, it } from "vitest";
import { isCurrentNews } from "./freshNews";

it("keeps today and yesterday and drops news that is two days old", () => {
  expect(isCurrentNews("2026-11-03", "2026-11-03")).toBe(true);
  expect(isCurrentNews("2026-11-02", "2026-11-03")).toBe(true);
  expect(isCurrentNews("2026-11-01", "2026-11-03")).toBe(false);
  expect(isCurrentNews("2026-08-04", "2026-11-03")).toBe(false);
});
