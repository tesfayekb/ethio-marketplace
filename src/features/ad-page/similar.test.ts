import { afterEach, describe, expect, it, vi } from "vitest";

import type { FeedListing } from "@/features/feed/feed-page";

import { similarListings } from "./similar";

const card = (id: string, publicId: string | null): FeedListing => ({
  id,
  publicId,
  title: `Ad ${id}`,
  tier: "regular",
  priceAmount: 1000,
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
  publishedAt: "2026-10-17T08:00:00Z",
  categoryId: "c-leaf",
  locationId: null,
  locationNameEn: null,
  locationNameAm: null,
  step: 1,
});

const page = (cards: FeedListing[]) => ({
  cards,
  ladder: ["place-1"],
  steps: [cards.length],
  next: null,
});

const ok = (body: unknown) =>
  new Response(JSON.stringify(body), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("SIM — similar ads read (D201 §12)", () => {
  it("SIM-1 the query string: the leaf, the place when present, size 11", async () => {
    const fetchMock = vi.fn().mockResolvedValue(ok(page([])));
    vi.stubGlobal("fetch", fetchMock);
    await similarListings("c-leaf", "place-1", "l-self");
    const url = String(fetchMock.mock.calls[0]?.[0]);
    expect(url).toContain("/api/feed?");
    expect(url).toContain("category=c-leaf");
    expect(url).toContain("place=place-1");
    expect(url).toContain("size=11");
    fetchMock.mockClear();
    await similarListings("c-leaf", null, "l-self");
    const noPlace = String(fetchMock.mock.calls[0]?.[0]);
    expect(noPlace).toContain("category=c-leaf");
    expect(noPlace).not.toContain("place=");
    expect(noPlace).toContain("size=11");
  });

  it("SIM-2 the ad itself is dropped and the first ten of eleven kept", async () => {
    const cards = [
      card("l-self", "p-self"),
      ...[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((n) => card(`l-${n}`, `p-${n}`)),
    ];
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(ok(page(cards))));
    const byId = await similarListings("c-leaf", null, "l-self");
    expect(byId.map((one) => one.id)).toEqual([
      "l-1",
      "l-2",
      "l-3",
      "l-4",
      "l-5",
      "l-6",
      "l-7",
      "l-8",
      "l-9",
      "l-10",
    ]);
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(ok(page(cards))));
    const byPublicId = await similarListings("c-leaf", null, "p-self");
    expect(byPublicId.map((one) => one.id)).toEqual([
      "l-1",
      "l-2",
      "l-3",
      "l-4",
      "l-5",
      "l-6",
      "l-7",
      "l-8",
      "l-9",
      "l-10",
    ]);
  });

  it("SIM-3 a 404/500 answer, an unparsable body and a thrown fetch each give []", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("no", { status: 404 })));
    expect(await similarListings("c-leaf", null, "l-self")).toEqual([]);
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(new Response("no", { status: 500 })));
    expect(await similarListings("c-leaf", null, "l-self")).toEqual([]);
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue(ok({ not: "a feed page" })));
    expect(await similarListings("c-leaf", null, "l-self")).toEqual([]);
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("network down")));
    expect(await similarListings("c-leaf", null, "l-self")).toEqual([]);
  });
});
