import { describe, expect, it } from "vitest";

import { en } from "@/i18n/locales/en";

import { GROUP_LABEL, LISTING_GROUPS, parseMyListings, totalOf } from "./my-listings";

/** Bundle 16 turn 2 — the door's answer, refused whole when malformed (F4). */
const counts = { live: 2, review: 1, attention: 0, closed: 3, sold: 0, drafts: 4 };
const row = {
  id: "00000000-0000-4000-8000-000000000001",
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

describe("my_listings answer", () => {
  it("ML-U1 a well-formed answer is read field for field", () => {
    const page = parseMyListings({ counts, rows: [row] });
    expect(page).toEqual({ counts, rows: [row] });
    expect(totalOf(counts)).toBe(10);
  });

  it("ML-U2 a missing or broken count refuses the whole answer", () => {
    const { drafts: _drafts, ...short } = counts;
    expect(parseMyListings({ counts: short, rows: [] })).toBeNull();
    expect(parseMyListings({ counts: { ...counts, live: -1 }, rows: [] })).toBeNull();
    expect(parseMyListings({ counts: { ...counts, live: 1.5 }, rows: [] })).toBeNull();
    expect(parseMyListings({ counts, rows: null })).toBeNull();
    expect(parseMyListings(null)).toBeNull();
  });

  it("ML-U3 a row with a wrong field refuses the whole answer", () => {
    expect(parseMyListings({ counts, rows: [{ ...row, reserved: "yes" }] })).toBeNull();
    expect(parseMyListings({ counts, rows: [{ ...row, daysLeft: -2 }] })).toBeNull();
    expect(parseMyListings({ counts, rows: [{ ...row, priceAmount: "1500" }] })).toBeNull();
    // Turn 3b (call H) — the sold word is one of three.
    expect(parseMyListings({ counts, rows: [{ ...row, soldWord: "leased" }] })).toBeNull();
    const { removedReason: _reason, ...without } = row;
    expect(parseMyListings({ counts, rows: [without] })).toBeNull();
  });

  it("ML-U4 six groups, in the page's order, each with its word", () => {
    expect(LISTING_GROUPS).toEqual(["live", "review", "attention", "closed", "sold", "drafts"]);
    for (const group of LISTING_GROUPS) expect(en[GROUP_LABEL[group]]).toBeTruthy();
  });
});
