import { describe, expect, it } from "vitest";

import { EVERYWHERE, feedSections, parseFeedPage, type FeedListing } from "./feed-page";

function card(id: string, step: number, extra: Record<string, unknown> = {}) {
  return {
    id,
    title: `t-${id}`,
    tier: "regular",
    priceAmount: 100,
    priceCurrency: "ETB",
    priceMode: "fixed",
    priceBp: null,
    priceNegotiable: false,
    pricePeriod: "once",
    priceUnit: null,
    priceUnitText: null,
    photosSoon: false,
    publishedAt: "2026-10-09T00:00:00+00:00",
    categoryId: "c1",
    locationId: "p1",
    locationNameEn: "Place",
    locationNameAm: null,
    step,
    ...extra,
  };
}

function page(cards: unknown[], ladder: unknown = ["A", EVERYWHERE], next: unknown = "abc") {
  return { cards, ladder, steps: [], next };
}

describe("parseFeedPage", () => {
  it("FP-1 parses a valid page to the same values", () => {
    const raw = page([card("1", 1), card("2", 2)]);
    expect(parseFeedPage(raw)).toEqual({
      cards: [card("1", 1), card("2", 2)],
      ladder: ["A", EVERYWHERE],
      next: "abc",
    });
  });

  it("FP-2 refuses a page without cards, or with an empty ladder", () => {
    expect(parseFeedPage({ ladder: ["A"], steps: [], next: null })).toBeNull();
    expect(parseFeedPage(page([], []))).toBeNull();
  });

  it("FP-3 refuses a card with a wrong tier, step or price", () => {
    expect(parseFeedPage(page([card("1", 1, { tier: "gold" })]))).toBeNull();
    expect(parseFeedPage(page([card("1", 0)]))).toBeNull();
    expect(parseFeedPage(page([card("1", 3)]))).toBeNull();
    expect(parseFeedPage(page([card("1", 1, { priceAmount: "5" })]))).toBeNull();
  });

  it("FP-4 refuses a numeric next", () => {
    expect(parseFeedPage(page([card("1", 1)], ["A"], 5))).toBeNull();
  });
});

describe("feedSections", () => {
  it("FP-5 groups consecutive steps and labels them", () => {
    const ladder = ["A", "B", "C", EVERYWHERE];
    const cards = [1, 1, 3, 3, 4].map((s, i) => card(String(i), s) as FeedListing);
    const sections = feedSections(cards, ladder);
    expect(sections.map((s) => [s.step, s.label, s.cards.length])).toEqual([
      [1, null, 2],
      [3, { kind: "place", placeId: "C" }, 2],
      [4, { kind: "all" }, 1],
    ]);
  });

  it("FP-6 an empty list gives no sections", () => {
    expect(feedSections([], ["A"])).toEqual([]);
  });

  it("FP-7 a step past the ladder gives no label", () => {
    const sections = feedSections([card("1", 3) as FeedListing], ["A"]);
    expect(sections).toHaveLength(1);
    expect(sections[0]?.label).toBeNull();
  });
});
