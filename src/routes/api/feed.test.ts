import { beforeEach, describe, expect, it, vi } from "vitest";

/**
 * DEC-195 (bundle 19 turn 27) — FD-4: THE FEED'S COVER LINKS. The covers' card
 * and thumb links ride inside the answer, signed through the shared
 * reader-and-signer; a failed or empty signing never fails the feed.
 */

const CARD = (id: string) => `https://staging.example/signed/${id}/card.webp?token=t`;
const THUMB = (id: string) => `https://staging.example/signed/${id}/thumb.webp?token=t`;

const CARD_A = "aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa";
const CARD_B = "bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb";
const CARD_C = "cccccccc-cccc-4ccc-8ccc-cccccccccccc";

const state = {
  rpcCalls: 0,
  rpcData: null as unknown,
  rpcError: null as { message: string } | null,
  links: {} as Record<string, Record<string, string>>,
  signThrows: false,
  signedWith: null as { ids: readonly string[]; variants: readonly string[] } | null,
};

vi.mock("@supabase/supabase-js", () => ({
  createClient: () => ({
    rpc: async () => {
      state.rpcCalls += 1;
      return { data: state.rpcData, error: state.rpcError, status: state.rpcError ? 500 : 200 };
    },
  }),
}));

vi.mock("@/server/media/links", async (importOriginal) => {
  const original = await importOriginal<typeof import("@/server/media/links")>();
  return {
    ...original,
    readAndSignPhotoLinks: async (
      _reader: unknown,
      ids: readonly string[],
      variants: readonly string[],
    ) => {
      state.signedWith = { ids, variants };
      if (state.signThrows) throw new Error("signing failed");
      return state.links;
    },
  };
});

import { Route } from "./feed";

function card(id: string, coverPhotoId: string | null) {
  return {
    id,
    publicId: `pub-${id}`,
    title: `Ad ${id}`,
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
    coverPhotoId,
    soldWord: null,
    reserved: false,
    priceWas: null,
    publishedAt: "2026-10-17T00:00:00Z",
    categoryId: "dddddddd-dddd-4ddd-8ddd-dddddddddddd",
    locationId: null,
    locationNameEn: null,
    locationNameAm: null,
    step: 1,
  };
}

async function get(query = ""): Promise<Response> {
  const handlers = (
    Route.options as unknown as {
      server: { handlers: { GET: (ctx: { request: Request }) => Promise<Response> } };
    }
  ).server.handlers;
  return handlers.GET({ request: new Request(`https://preview.example/api/feed${query}`) });
}

beforeEach(() => {
  state.rpcCalls = 0;
  state.rpcError = null;
  state.links = {};
  state.signThrows = false;
  state.signedWith = null;
  state.rpcData = { cards: [], ladder: ["step"], steps: [1], next: null };
  process.env.SUPABASE_URL = "https://staging.example";
  process.env.SUPABASE_PUBLISHABLE_KEY = "publishable-key";
});

describe("/api/feed — the cover links (DEC-195)", () => {
  it("FD-4 a page with three covers answers coverLinks for the three, at card and thumb sizes", async () => {
    state.rpcData = {
      cards: [card(CARD_A, "p1"), card(CARD_B, "p2"), card(CARD_C, "p3")],
      ladder: ["step"],
      steps: [1],
      next: null,
    };
    state.links = {
      p1: { card: CARD("p1"), thumb: THUMB("p1") },
      p2: { card: CARD("p2"), thumb: THUMB("p2") },
      p3: { card: CARD("p3"), thumb: THUMB("p3") },
    };
    const response = await get();
    expect(response.status).toBe(200);
    const body = (await response.json()) as Record<string, unknown>;
    expect(body.coverLinks).toEqual(state.links);
    expect(body.linksExpireIn).toBe(3600);
    expect(state.signedWith?.ids).toEqual(["p1", "p2", "p3"]);
    expect(state.signedWith?.variants).toEqual(["card", "thumb"]);
  });

  it("FD-4b a page whose signing throws answers 200 with its cards and no coverLinks", async () => {
    state.rpcData = {
      cards: [card(CARD_A, "p1")],
      ladder: ["step"],
      steps: [1],
      next: null,
    };
    state.signThrows = true;
    const response = await get();
    expect(response.status).toBe(200);
    const body = (await response.json()) as Record<string, unknown>;
    expect(Array.isArray(body.cards)).toBe(true);
    expect((body.cards as unknown[]).length).toBe(1);
    expect("coverLinks" in body).toBe(false);
  });

  it("FD-4c a page with no covers answers no coverLinks and makes no signing call", async () => {
    state.rpcData = {
      cards: [card(CARD_A, null)],
      ladder: ["step"],
      steps: [1],
      next: null,
    };
    const response = await get();
    expect(response.status).toBe(200);
    const body = (await response.json()) as Record<string, unknown>;
    expect("coverLinks" in body).toBe(false);
    expect(state.signedWith).toBeNull();
  });

  it("INC-804 a database failure replies 'internal error' and no detail", async () => {
    state.rpcError = { message: "feed_page: marker-text-that-must-not-travel" };
    const response = await get();
    expect(response.status).toBe(500);
    const text = await response.text();
    expect(JSON.parse(text)).toEqual({
      error: "server error",
      incident: expect.stringMatching(/^[0-9a-f-]{36}$/),
    });
    expect(text).not.toContain("marker-text-that-must-not-travel");
  });

  it("FDR-1 invalid sizes answer badSize with no-store before rpc", async () => {
    for (const size of ["0", "51", "x"]) {
      const response = await get(`?size=${size}`);
      expect(response.status).toBe(400);
      expect(response.headers.get("Cache-Control")).toBe("no-store");
      expect(await response.json()).toEqual({ error: "badSize" });
    }
    expect(state.rpcCalls).toBe(0);
  });
  it("FDR-2 garbage cursor is refused before rpc", async () => {
    const response = await get("?after=garbage");
    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ error: "badCursor" });
    expect(state.rpcCalls).toBe(0);
  });
  it("FDR-3 unknown query keys pass", async () => {
    const response = await get("?unknown=value");
    expect(response.status).toBe(200);
    expect(state.rpcCalls).toBe(1);
  });

  it("INC-804 a known refusal keeps its code", async () => {
    const response = await get("?size=0");
    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ error: "badSize" });
  });
});
