import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

/**
 * D234 speed turn S5 — FSP-1…FSP-6. The server's first page for a listings
 * page: the place derived from the request with the shell's own functions, the
 * page read from the feed route in-process, its first covers named; null for
 * any other page, the E2E switch, a refusal, a failure or the deadline. The four
 * routes' handlers and the edge's guess are stubbed.
 */
interface Geo {
  country: string | null;
  regionCode: string | null;
  city: string | null;
  lat: number | null;
  lng: number | null;
}
const state = vi.hoisted(() => ({
  e2e: false,
  geo: { country: null, regionCode: null, city: null, lat: null, lng: null } as Geo,
  asked: [] as string[],
  feedStatus: 200,
  feedDelayMs: 0,
}));

vi.mock("@/lib/env-flags", () => ({
  get isE2E() {
    return state.e2e;
  },
}));
vi.mock("@/server/geo/guess", () => ({
  geoGuess: () => ({ ...state.geo, source: "none" }),
}));

const ET = "11111111-1111-4111-8111-111111111111";
const OROMIA = "22222222-2222-4222-8222-222222222222";
const ADAMA = "33333333-3333-4333-8333-333333333333";
const LEAF = "44444444-4444-4444-8444-444444444444";
const PHOTO = "55555555-5555-4555-8555-555555555555";

function json(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json" },
  });
}

function record(request: Request): string {
  const url = new URL(request.url);
  const path = `${url.pathname}${url.search}`;
  state.asked.push(path);
  return path;
}

vi.mock("@/routes/api/locations", () => ({
  openMarketsGet: async ({ request }: { request: Request }) => {
    record(request);
    return json({ countries: [{ code: "ET", name_en: "Ethiopia", display_order: 0 }] });
  },
}));
vi.mock("@/routes/api/locations.$country", () => ({
  countryTreeGet: async ({ request }: { request: Request }) => {
    record(request);
    return json({
      nodes: [
        { id: ET, parent_id: null, level: "country", slug: "et", name_en: "Ethiopia" },
        { id: OROMIA, parent_id: ET, level: "region", slug: "oromia", name_en: "Oromia" },
        { id: ADAMA, parent_id: OROMIA, level: "city", slug: "adama", name_en: "Adama" },
      ],
    });
  },
}));
vi.mock("@/routes/api/categories.tree", () => ({
  categoryTreeGet: async ({ request }: { request: Request }) => {
    record(request);
    return json({
      version: "v1",
      nodes: [
        {
          id: LEAF,
          name_en: "Phones",
          name_am: null,
          slug: "phones",
          icon: null,
          allow_listings: true,
          is_catchall: false,
          image_url: null,
          image_thumb_url: null,
          display_order: 0,
        },
      ],
      pointers: [],
    });
  },
}));
vi.mock("@/routes/api/feed", () => ({
  feedGet: async ({ request }: { request: Request }) => {
    record(request);
    if (state.feedDelayMs > 0)
      await new Promise((resolve) => setTimeout(resolve, state.feedDelayMs));
    if (state.feedStatus !== 200) return json({ error: "internal error" }, state.feedStatus);
    return json({
      cards: [
        {
          id: "a",
          publicId: "pub-a",
          title: "Ad a",
          tier: "regular",
          priceAmount: null,
          priceCurrency: null,
          priceMode: "contact",
          priceBp: null,
          priceNegotiable: false,
          pricePeriod: "once",
          priceUnit: null,
          priceUnitText: null,
          photosSoon: false,
          coverPhotoId: PHOTO,
          soldWord: null,
          reserved: false,
          priceWas: null,
          publishedAt: "2026-10-17T00:00:00Z",
          categoryId: LEAF,
          locationId: ADAMA,
          locationNameEn: "Adama",
          locationNameAm: null,
          step: 1,
        },
      ],
      ladder: [ADAMA],
      steps: [1],
      next: null,
      coverLinks: {
        [PHOTO]: { card: "https://photos.example/a-card", thumb: "https://photos.example/a-thumb" },
      },
    });
  },
}));

import { FIRST_PAGE_DEADLINE_MS, readFirstFeedPage } from "./first-screen";

const ORIGIN = "https://ethio.example";
const at = (path: string, headers: Record<string, string> = {}) =>
  new Request(`${ORIGIN}${path}`, { headers });

beforeEach(() => {
  state.e2e = false;
  state.geo = { country: null, regionCode: null, city: null, lat: null, lng: null };
  state.asked = [];
  state.feedStatus = 200;
  state.feedDelayMs = 0;
});

afterEach(() => {
  vi.useRealTimers();
});

describe("readFirstFeedPage (D234 S5)", () => {
  it("FSP-1 a saved place on /: the feed read for that place, its first cover named", async () => {
    const held = await readFirstFeedPage(at("/"), `ET:${ADAMA}:1761400000000`);
    expect(held?.path).toBe(`/api/feed?place=${ADAMA}`);
    expect(held?.page.cards.map((entry) => entry.id)).toEqual(["a"]);
    expect(held?.covers).toEqual(["https://photos.example/a-card"]);
    expect(state.asked).toEqual([
      "/api/locations",
      "/api/locations/ET",
      `/api/feed?place=${ADAMA}`,
    ]);
  });

  it("FSP-2 /c/<slug>: the category's id from the tree; an unknown slug reads no feed", async () => {
    const held = await readFirstFeedPage(at("/c/phones"), null);
    expect(held?.path).toBe(`/api/feed?category=${LEAF}`);
    state.asked = [];
    expect(await readFirstFeedPage(at("/c/no-such-slug"), null)).toBeNull();
    expect(state.asked.some((path) => path.startsWith("/api/feed"))).toBe(false);
  });

  it("FSP-3 the guess, when its country is an open market: the market's place, as the shell derives it", async () => {
    state.geo = { country: "ET", regionCode: null, city: "Adama", lat: null, lng: null };
    const held = await readFirstFeedPage(at("/"), null);
    expect(held?.path).toBe(`/api/feed?place=${ADAMA}`);
    state.geo = { country: "SE", regionCode: null, city: null, lat: null, lng: null };
    state.asked = [];
    expect((await readFirstFeedPage(at("/"), null))?.path).toBe("/api/feed");
    // A closed market's tree is never asked: the shell would not ask it either.
    expect(state.asked).toEqual(["/api/locations", "/api/feed"]);
    expect((await readFirstFeedPage(at("/"), "everywhere:1761400000000"))?.path).toBe("/api/feed");
  });

  it("FSP-4 any other page, and the E2E build's switch: no first page, nothing read", async () => {
    expect(await readFirstFeedPage(at("/l/an-ad"), null)).toBeNull();
    state.e2e = true;
    expect(
      await readFirstFeedPage(
        at("/", { cookie: "ethio_lang_star=am; e2e_first_screen=off" }),
        null,
      ),
    ).toBeNull();
    expect(state.asked).toEqual([]);
    state.e2e = false;
    expect(
      await readFirstFeedPage(
        at("/", { cookie: "ethio_lang_star=am; e2e_first_screen=off" }),
        null,
      ),
    ).not.toBeNull();
  });

  it("FSP-5 a refused or failed feed read: no first page (the browser reads as before)", async () => {
    state.feedStatus = 500;
    expect(await readFirstFeedPage(at("/"), null)).toBeNull();
  });

  it("FSP-6 the deadline: past it, no first page, one [first-screen] line", async () => {
    vi.useFakeTimers();
    const warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
    state.feedDelayMs = FIRST_PAGE_DEADLINE_MS * 2;
    const held = readFirstFeedPage(at("/"), null);
    await vi.advanceTimersByTimeAsync(FIRST_PAGE_DEADLINE_MS + 1);
    expect(await held).toBeNull();
    expect(warn).toHaveBeenCalledWith("[first-screen] deadline passed; the browser reads the feed");
    warn.mockRestore();
  });
});
