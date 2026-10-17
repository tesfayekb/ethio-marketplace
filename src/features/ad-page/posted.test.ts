import { describe, expect, it } from "vitest";
import { postedWhen } from "./posted";
const now = Date.parse("2026-10-17T12:00:00Z");
const at = (days: number) => new Date(now - days * 86_400_000).toISOString();
describe("posted relative date", () => {
  it("PO-1 today, yesterday, three days, two weeks, three months in English", () => {
    expect([0, 1, 3, 14, 90].map((days) => postedWhen(at(days), "en", now))).toEqual([
      "today",
      "yesterday",
      "3 days ago",
      "2 weeks ago",
      "3 months ago",
    ]);
    expect(postedWhen("invalid", "en", now)).toBeNull();
  });
  it("PO-2 Amharic comes from Intl's own data", () => {
    const format = new Intl.RelativeTimeFormat("am", { numeric: "auto" });
    expect([0, 1, 3, 14, 90].map((days) => postedWhen(at(days), "am", now))).toEqual([
      format.format(0, "day"),
      format.format(-1, "day"),
      format.format(-3, "day"),
      format.format(-2, "week"),
      format.format(-3, "month"),
    ]);
  });
});
