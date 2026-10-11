import { describe, expect, it } from "vitest";

import { deleteBlockedKey, LISTED_LEVELS, LOCATION_LEVELS } from "./locations-service";

/** Bundle 11 B1 — the one delete rule the verb bar and the row's Delete read. */
describe("deleteBlockedKey", () => {
  it("PL-1 names the first reason a place cannot be deleted, in the door's order, and nothing for a free leaf", () => {
    const free = { childCount: 0, listingCount: 0, coverageCount: 0, profileDefaultCount: 0 };
    expect(deleteBlockedKey(free)).toBeNull();
    expect(deleteBlockedKey({ ...free, childCount: 2, listingCount: 1 })).toBe(
      "admin.locations.error.detail.hasChildren",
    );
    expect(deleteBlockedKey({ ...free, listingCount: 1, coverageCount: 1 })).toBe(
      "admin.locations.error.detail.hasListings",
    );
    expect(deleteBlockedKey({ ...free, coverageCount: 3, profileDefaultCount: 1 })).toBe(
      "admin.locations.error.detail.hasCoverage",
    );
    expect(deleteBlockedKey({ ...free, profileDefaultCount: 1 })).toBe(
      "admin.locations.error.detail.hasProfileDefaults",
    );
  });
});

/** Bundle 11 V2b (the operator's walk) — the Level filter offers only what Places lists. */
describe("LISTED_LEVELS", () => {
  it("PL-2 leaves out the country (its anchor is Admin › Countries'), keeps every other level in order", () => {
    expect(LISTED_LEVELS).not.toContain("country");
    expect(LISTED_LEVELS).toEqual(LOCATION_LEVELS.filter((level) => level !== "country"));
  });
});
