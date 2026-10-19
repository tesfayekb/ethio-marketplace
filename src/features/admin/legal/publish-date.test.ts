import { describe, expect, it } from "vitest";
import { earliestLegalDate, legalPublishDate } from "./publish-date";
describe("legal publishing dates", () => {
  const now = new Date("2026-10-19T23:59:59.000Z");
  it("uses the UTC calendar date across midnight", () => {
    expect(earliestLegalDate(now, 30)).toBe("2026-11-18");
    expect(earliestLegalDate(new Date("2026-10-20T00:00:00Z"), 30)).toBe("2026-11-19");
  });
  it("omits the earliest date so the door preserves the exact notice instant", () => {
    expect(legalPublishDate(false, "material", "2026-11-18", now, 30)).toEqual({ material: true });
  });
  it("sends later choices at midnight UTC", () => {
    expect(legalPublishDate(false, "material", "2026-11-19", now, 30)).toEqual({
      material: true,
      effective_at: "2026-11-19T00:00:00.000Z",
    });
  });
  it("sends version one and correction with no date and false", () => {
    expect(legalPublishDate(true, null, "", now, 30)).toEqual({ material: false });
    expect(legalPublishDate(false, "correction", "", now, 30)).toEqual({ material: false });
  });
  it("requires a choice and refuses an earlier or impossible date", () => {
    expect(legalPublishDate(false, null, "", now, 30)).toBeNull();
    expect(legalPublishDate(false, "material", "2026-11-17", now, 30)).toBeNull();
    expect(legalPublishDate(false, "material", "2026-11-31", now, 30)).toBeNull();
  });
});
