import { describe, expect, it } from "vitest";

import { en } from "@/i18n/locales/en";

import {
  filterArgs,
  GROUP_LABEL,
  LISTING_GROUPS,
  LISTING_MARKS,
  NO_FILTERS,
  parseMyListings,
  SEARCH_MAX,
  shareable,
  totalOf,
} from "./my-listings";
import { SOLD_SHOWN_DAYS, visibilityOf } from "./state-line";

/** Bundle 16 turn 2 — the door's answer, refused whole when malformed (F4). */
const counts = { live: 2, review: 1, attention: 0, closed: 3, sold: 0, drafts: 4 };
const row = {
  id: "00000000-0000-4000-8000-000000000001",
  publicId: null,
  status: "active",
  title: "Corolla 2015",
  categoryId: "00000000-0000-4000-8000-0000000000c1",
  coverPhotoId: null,
  photosSoon: false,
  priceMode: "fixed",
  priceAmount: 1500000,
  priceCurrency: "ETB",
  pricePeriod: "once",
  priceBp: null,
  priceNegotiable: true,
  priceUnit: null,
  priceUnitText: null,
  priceWas: 1600000,
  reserved: true,
  publishedFirstAt: "2026-10-01T08:00:00+00:00",
  publishedAt: "2026-10-01T08:00:00+00:00",
  renewedAt: null,
  expiresAt: "2026-10-31T08:00:00+00:00",
  daysLeft: 17,
  daysKept: null,
  soldAt: null,
  soldWord: "sold",
  createdAt: "2026-09-30T08:00:00+00:00",
  updatedAt: "2026-10-14T08:00:00+00:00",
  removedReason: null,
};

/** Turn R1 — the answer carries the admin's renew setting. */
const renew = { renewAllowed: true, renewDays: 30 };

describe("my_listings answer", () => {
  it("ML-U1 a well-formed answer is read field for field", () => {
    const page = parseMyListings({ counts, rows: [row], ...renew });
    expect(page).toEqual({ counts, rows: [row], ...renew });
    expect(parseMyListings({ counts, rows: [], renewAllowed: false, renewDays: null })).toEqual({
      counts,
      rows: [],
      renewAllowed: false,
      renewDays: null,
    });
    expect(totalOf(counts)).toBe(10);
  });

  it("ML-U2 a missing or broken count refuses the whole answer", () => {
    const { drafts: _drafts, ...short } = counts;
    // The control: the same answer with its counts whole is read.
    expect(parseMyListings({ counts, rows: [], ...renew })).not.toBeNull();
    expect(parseMyListings({ counts: short, rows: [], ...renew })).toBeNull();
    expect(parseMyListings({ counts: { ...counts, live: -1 }, rows: [], ...renew })).toBeNull();
    expect(parseMyListings({ counts: { ...counts, live: 1.5 }, rows: [], ...renew })).toBeNull();
    expect(parseMyListings({ counts, rows: null, ...renew })).toBeNull();
    expect(parseMyListings(null)).toBeNull();
  });

  it("ML-U3 a row with a wrong field refuses the whole answer", () => {
    const answer = (rows: unknown[]) => parseMyListings({ counts, rows, ...renew });
    expect(answer([row])).not.toBeNull();
    expect(answer([{ ...row, reserved: "yes" }])).toBeNull();
    expect(answer([{ ...row, daysLeft: -2 }])).toBeNull();
    expect(answer([{ ...row, priceAmount: "1500" }])).toBeNull();
    // Turn 3b (call H) — the sold word is one of three.
    expect(answer([{ ...row, soldWord: "leased" }])).toBeNull();
    const { removedReason: _reason, ...without } = row;
    expect(answer([without])).toBeNull();
  });

  it("ML-U12 the renew setting is read with the answer, and a broken one refuses it (turn R1)", () => {
    expect(parseMyListings({ counts, rows: [] })).toBeNull();
    expect(parseMyListings({ counts, rows: [], renewDays: 30 })).toBeNull();
    expect(parseMyListings({ counts, rows: [], renewAllowed: "yes", renewDays: 30 })).toBeNull();
    expect(parseMyListings({ counts, rows: [], renewAllowed: true, renewDays: 0 })).toBeNull();
    expect(parseMyListings({ counts, rows: [], renewAllowed: true, renewDays: 2.5 })).toBeNull();
    expect(parseMyListings({ counts, rows: [], renewAllowed: true })).toBeNull();
  });

  it("ML-U13 the search and filters reach the door only when asked, the search trimmed and cut to its length (turn R1)", () => {
    expect(filterArgs(NO_FILTERS)).toEqual({});
    expect(filterArgs({ search: "   ", category: null, mark: null })).toEqual({});
    expect(filterArgs({ search: "  red phone ", category: null, mark: null })).toEqual({
      p_search: "red phone",
    });
    expect(
      filterArgs({ search: "a".repeat(SEARCH_MAX + 20), category: null, mark: null }).p_search,
    ).toHaveLength(SEARCH_MAX);
    expect(SEARCH_MAX).toBe(100);
    expect(
      filterArgs({ search: "", category: "00000000-0000-4000-8000-0000000000c1", mark: "reduced" }),
    ).toEqual({ p_category: "00000000-0000-4000-8000-0000000000c1", p_mark: "reduced" });
    expect(LISTING_MARKS).toEqual(["reserved", "reduced"]);
  });

  it("ML-U4 six groups, in the page's order, each with its word", () => {
    expect(LISTING_GROUPS).toEqual(["live", "review", "attention", "closed", "sold", "drafts"]);
    for (const group of LISTING_GROUPS) expect(en[GROUP_LABEL[group]]).toBeTruthy();
  });
});

describe("what buyers see of the ad (bundle 16 turn 3c, D180)", () => {
  it("ML-U11 live is seen, sold is seen marked for 30 days after it sold, every other status is not", () => {
    const now = Date.parse("2026-10-15T12:00:00Z");
    const day = 86_400_000;
    const ago = (days: number) => new Date(now - days * day).toISOString();
    expect(SOLD_SHOWN_DAYS).toBe(30);
    expect(visibilityOf({ status: "active", soldAt: null }, now)).toBe("seen");
    expect(visibilityOf({ status: "reduced", soldAt: null }, now)).toBe("seen");
    expect(visibilityOf({ status: "sold", soldAt: ago(29.9) }, now)).toBe("soldSeen");
    expect(visibilityOf({ status: "sold", soldAt: ago(30) }, now)).toBe("hidden");
    expect(visibilityOf({ status: "sold", soldAt: null }, now)).toBe("hidden");
    for (const status of [
      "closed",
      "expired",
      "screening",
      "held",
      "rejected",
      "removed",
      "draft",
    ]) {
      expect(visibilityOf({ status, soldAt: null }, now)).toBe("hidden");
    }
  });
});

describe("D224 one rule for what can be shared", () => {
  it("ML-U12 live with a string public id shares; every other status or a missing id does not", () => {
    expect(shareable({ status: "active", publicId: "2345678923" })).toBe(true);
    expect(shareable({ status: "active", publicId: null })).toBe(false);
    for (const status of [
      "screening",
      "held",
      "rejected",
      "removed",
      "draft",
      "closed",
      "expired",
      "sold",
      "reduced",
    ]) {
      expect(shareable({ status, publicId: "2345678923" })).toBe(false);
    }
  });
});
