import { describe, expect, it } from "vitest";

import {
  EVERYWHERE,
  feedSections,
  inviteShown,
  placeCount,
  parseFeedPage,
  ribbonOf,
  type FeedListing,
} from "./feed-page";

function card(id: string, step: number, extra: Record<string, unknown> = {}) {
  return {
    id,
    publicId: null,
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
    coverPhotoId: null,
    soldWord: null,
    reserved: false,
    priceWas: null,
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

  it("FP-11 keeps a card's cover photo id, reads a card without one as no photo, and refuses a wrong one (INC-606)", () => {
    const parsed = parseFeedPage(
      page([card("a", 1, { coverPhotoId: "photo-a" }), card("b", 1, { coverPhotoId: null })]),
    );
    expect(parsed?.cards.map((one) => one.coverPhotoId)).toEqual(["photo-a", null]);
    // A door from before INC-606 answers without the field: no photo, not a failure.
    const { coverPhotoId: _absent, ...bare } = card("c", 1);
    expect(parseFeedPage(page([bare]))?.cards[0]?.coverPhotoId).toBeNull();
    expect(parseFeedPage(page([card("d", 1, { coverPhotoId: 7 })]))).toBeNull();
  });

  it("FE-16 a card without publicId parses with null, a card with one keeps it", () => {
    const { publicId: _absent, ...bare } = card("a", 1);
    expect(parseFeedPage(page([bare]))?.cards[0]?.publicId).toBeNull();
    expect(
      parseFeedPage(page([card("b", 1, { publicId: "abcdefghjk" })]))?.cards[0]?.publicId,
    ).toBe("abcdefghjk");
    expect(parseFeedPage(page([card("c", 1, { publicId: 7 })]))).toBeNull();
  });

  it("FP-12 keeps a card's marks, reads a card without them as a live ad with none, and refuses a wrong one (bundle 16 turn 3c)", () => {
    const parsed = parseFeedPage(
      page([
        card("a", 1, { soldWord: "rented" }),
        card("b", 1, { reserved: true, priceWas: 1200 }),
      ]),
    );
    expect(parsed?.cards.map((one) => [one.soldWord, one.reserved, one.priceWas])).toEqual([
      ["rented", false, null],
      [null, true, 1200],
    ]);
    // A page cached from before the marks answers without them: a live ad with no mark, not a failure.
    const { soldWord: _s, reserved: _r, priceWas: _p, ...bare } = card("c", 1);
    expect(parseFeedPage(page([bare]))?.cards[0]).toMatchObject({
      soldWord: null,
      reserved: false,
      priceWas: null,
    });
    expect(parseFeedPage(page([card("d", 1, { soldWord: "gone" })]))).toBeNull();
    expect(parseFeedPage(page([card("e", 1, { reserved: "yes" })]))).toBeNull();
    expect(parseFeedPage(page([card("f", 1, { priceWas: "900" })]))).toBeNull();
  });

  it("FP-13 the ribbon's words, the most important first: Sold alone, then closed, Reserved, Price reduced (D180)", () => {
    const none = { soldWord: null, closed: false, reserved: false, priceReduced: false } as const;
    expect(ribbonOf(none)).toEqual([]);
    expect(ribbonOf({ ...none, soldWord: "filled", reserved: true, priceReduced: true })).toEqual([
      "feed.ribbon.filled",
    ]);
    expect(ribbonOf({ ...none, closed: true, reserved: true, priceReduced: true })).toEqual([
      "feed.ribbon.closed",
      "feed.reserved",
      "feed.priceReduced",
    ]);
    expect(ribbonOf({ ...none, priceReduced: true })).toEqual(["feed.priceReduced"]);
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

  it("FP-10 each wider place is headed by its own name, once (D127)", () => {
    const ladder = ["A", "B", "C", EVERYWHERE];
    const cards = [1, 2, 2, 3, 2, 4].map((s, i) => card(String(i), s) as FeedListing);
    expect(feedSections(cards, ladder).map((s) => [s.step, s.label, s.cards.length])).toEqual([
      [1, null, 1],
      [2, { kind: "place", placeId: "B" }, 2],
      [3, { kind: "place", placeId: "C" }, 1],
      [2, null, 1],
      [4, { kind: "all" }, 1],
    ]);
  });
});

describe("inviteShown", () => {
  it("FP-8 the card shows while the chosen place holds fewer than 4 listings", () => {
    const of = (steps: number[]) => steps.map((s, i) => card(String(i), s) as FeedListing);
    expect(inviteShown([])).toBe(true);
    expect(inviteShown(of([1, 1, 1]))).toBe(true);
    expect(inviteShown(of([1, 1, 1, 1]))).toBe(false);
    expect(inviteShown(of([1, 1, 1, 2, 2, 2, 2, 2]))).toBe(true);
  });
});

describe("placeCount", () => {
  it("FP-9 counts the chosen place's own listings (step 1) only", () => {
    const of = (steps: number[]) => steps.map((s, i) => card(String(i), s) as FeedListing);
    expect(placeCount([])).toBe(0);
    expect(placeCount(of([1, 1, 2, 3]))).toBe(2);
  });
});
