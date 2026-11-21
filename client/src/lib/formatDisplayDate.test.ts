import { describe, expect, it } from "vitest";
import { formatDisplayDate } from "./formatDisplayDate";

describe("formatDisplayDate", () => {
  it("keeps a date-only value on the written calendar day", () => {
    expect(formatDisplayDate("1969-07-16", "long")).toBe("July 16, 1969");
    expect(formatDisplayDate("1930-08-05", "short")).toBe("Aug 5, 1930");
  });

  it("uses the UTC calendar day of a timestamp", () => {
    expect(formatDisplayDate("1961-04-12T06:07:00Z", "long")).toBe("April 12, 1961");
  });

  it("returns unparseable input unchanged", () => {
    expect(formatDisplayDate("not-a-date")).toBe("not-a-date");
  });
});
