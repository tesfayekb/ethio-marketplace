import { beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Bundle 13 turn 12 — D155b / D159: THE ROUTE'S ORDER. The switch before any
 * dial; the ids; the seller's own ad, read as the caller; the cover only; the
 * ad's two tries spent before the provider; the meter after it; nothing else
 * answered as a picture.
 */

const LISTING = "11111111-1111-4111-8111-111111111111";
const COVER = "22222222-2222-4222-8222-222222222222";
const SECOND = "33333333-3333-4333-8333-333333333333";
const OTHER = "44444444-4444-4444-8444-444444444444";

const state = {
  gate: { on: true } as { on: boolean; reason?: string },
  listing: { id: LISTING, status: "draft", seller_id: "seller-1" } as Record<
    string,
    unknown
  > | null,
  photos: [
    { id: COVER, paths: { cover: "c" }, exif_stripped: true },
    { id: SECOND, paths: { cover: "s" }, exif_stripped: true },
  ],
  rates: [] as { action: string; key: string; limit: number; window: string }[],
  budgetLeft: 1 as number | null,
  spent: [] as string[],
  reads: [] as string[],
  logs: [] as string[],
  signed: [] as { ids: string[]; variants: readonly string[] }[],
  signedIn: true,
  pulls: 0,
};

vi.mock("@/server/supabase/user-client", () => {
  const routeJson = (body: unknown, status: number) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { "Content-Type": "application/json; charset=utf-8" },
    });
  const query = (table: string) => {
    state.reads.push(table);
    // Foundations turn 4 — the fixture honours the seller filter ownListing sends
    // (the id AND the seller in one read), as RLS-scoped Postgres does.
    let seller: unknown = undefined;
    const builder = {
      select: () => builder,
      eq: (column: string, value: unknown) => {
        if (column === "seller_id") seller = value;
        return builder;
      },
      order: async () => ({ data: state.photos, error: null }),
      maybeSingle: async () => ({
        data:
          state.listing !== null && seller !== undefined && state.listing["seller_id"] !== seller
            ? null
            : state.listing,
        error: null,
      }),
    };
    return builder;
  };
  return {
    userClientFromRequest: async () =>
      state.signedIn
        ? { supabase: { from: query }, userId: "seller-1", reason: null, message: "" }
        : { supabase: null, userId: null, reason: "noToken", message: "no bearer" },
    refuseUserClient: (_path: string, caller: { userId: string | null }) =>
      caller.userId === null ? routeJson({ error: "unauthorized" }, 401) : null,
    // Foundations turn 4 — the exports route.ts and answer.ts import.
    anonymousClient: () => null,
    upstreamFailed: () => false,
    upstreamUnavailable: () => routeJson({ error: "upstream unavailable" }, 503),
    doorAnswer: (data: unknown) => data,
    consumeRate: async (action: string, key: string, limit: number, window: string) => {
      state.rates.push({ action, key, limit, window });
      if (action === "background:listing") {
        return state.budgetLeft === null
          ? { allowed: false, resetsAt: null, remaining: 0 }
          : { allowed: true, resetsAt: null, remaining: state.budgetLeft };
      }
      return { allowed: true, resetsAt: null, remaining: 9 };
    },
    envDial: (_name: string, fallback: number) => fallback,
    logRouteError: (_path: string, message: unknown) => {
      state.logs.push(String(message));
    },
    readJsonBody: async (request: Request) => (await request.json()) as Record<string, unknown>,
    refusal: (field: string, reason: string) =>
      routeJson({ ok: false, refusals: [{ field, reason }] }, 200),
    routeJson,
  };
});
vi.mock("@/lib/env-flags", () => ({ isE2E: true }));
vi.mock("@/server/ai/meter", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/server/ai/meter")>()),
  aiGate: async () => state.gate,
  recordAiSpend: async (feature: string) => {
    state.spent.push(feature);
  },
}));
vi.mock("@/server/media/links", () => ({
  signPhotoRows: async (_service: unknown, rows: { id: string }[], variants: readonly string[]) => {
    state.signed.push({ ids: rows.map((row) => row.id), variants });
    return { [rows[0]!.id]: { cover: "https://storage.example/signed-cover" } };
  },
}));
vi.mock("@/integrations/supabase/client.server", () => ({ supabaseAdmin: {} }));

const { Route } = await import("@/routes/api/listings/background");

async function post(body: Record<string, unknown>): Promise<Response> {
  const handlers = (
    Route.options as unknown as {
      server: { handlers: { POST: (ctx: { request: Request }) => Promise<Response> } };
    }
  ).server.handlers;
  return handlers.POST({
    request: new Request("http://local/api/listings/background", {
      method: "POST",
      headers: { "content-type": "application/json", Authorization: "Bearer t" },
      body: JSON.stringify(body),
    }),
  });
}

async function refusalOf(response: Response): Promise<{ status: number; refusal: unknown }> {
  const payload = (await response.json()) as { refusals?: unknown[] };
  return { status: response.status, refusal: payload.refusals?.[0] };
}

beforeEach(() => {
  state.gate = { on: true };
  state.listing = { id: LISTING, status: "draft", seller_id: "seller-1" };
  state.budgetLeft = 1;
  state.rates = [];
  state.spent = [];
  state.reads = [];
  state.logs = [];
  state.signed = [];
  state.signedIn = true;
  state.pulls = 0;
  vi.stubEnv("E2E_FAKE_BACKGROUND", "1");
  vi.stubEnv("E2E_FAKE_TRANSLATE", "");
  vi.stubEnv("PHOTOROOM_API_KEY", "");
});

describe("POST /api/listings/background (D155b / D159)", () => {
  it("BGR-5 the switch comes first: off is featureOff, unreadable is providerUnavailable, no key is featureOff — and none spends a dial or reads a row", async () => {
    state.gate = { on: false, reason: "staff" };
    expect(await refusalOf(await post({ listingId: LISTING, photoId: COVER }))).toEqual({
      status: 200,
      refusal: { field: "background", reason: "featureOff" },
    });
    state.gate = { on: false, reason: "unavailable" };
    expect((await refusalOf(await post({ listingId: LISTING, photoId: COVER }))).refusal).toEqual({
      field: "background",
      reason: "providerUnavailable",
    });
    state.gate = { on: true };
    vi.stubEnv("E2E_FAKE_BACKGROUND", "");
    expect((await refusalOf(await post({ listingId: LISTING, photoId: COVER }))).refusal).toEqual({
      field: "background",
      reason: "featureOff",
    });
    expect(state.logs).toEqual(["no PHOTOROOM_API_KEY: background removal answers switched off"]);
    expect(state.rates).toEqual([]);
    expect(state.reads).toEqual([]);
    expect(state.spent).toEqual([]);
  });

  it("BGR-6 the ids, then the seller's own ad read as the caller: a bad id, another seller's ad and a closed ad are refused by name", async () => {
    // Foundations turn 4 — CHANGE: a malformed id is the schema's badShape.
    expect((await refusalOf(await post({ listingId: "x", photoId: COVER }))).refusal).toEqual({
      field: "listingId",
      reason: "badShape",
      detail: "invalid_format",
    });
    expect((await refusalOf(await post({ listingId: LISTING, photoId: 7 }))).refusal).toEqual({
      field: "photoId",
      reason: "badShape",
      detail: "invalid_type",
    });
    state.listing = { id: LISTING, status: "draft", seller_id: "someone-else" };
    expect(await refusalOf(await post({ listingId: LISTING, photoId: COVER }))).toEqual({
      status: 403,
      refusal: { field: "listingId", reason: "notYourListing" },
    });
    state.listing = null;
    expect((await refusalOf(await post({ listingId: LISTING, photoId: COVER }))).status).toBe(403);
    state.listing = { id: LISTING, status: "sold", seller_id: "seller-1" };
    expect(await refusalOf(await post({ listingId: LISTING, photoId: COVER }))).toEqual({
      status: 409,
      refusal: { field: "status", reason: "listingNotOpenForPhotos" },
    });
    // The daily dial was asked each time; the ad's tries never were.
    expect(state.rates.every((rate) => rate.action === "background:day")).toBe(true);
    expect(state.rates[0]).toEqual({
      action: "background:day",
      key: "seller-1",
      limit: 10,
      window: "1 day",
    });
    expect(state.spent).toEqual([]);
  });

  it("BGR-7 the cover only: a photo not on the ad is photoGone, any other photo is notCover, and neither spends a try", async () => {
    expect(await refusalOf(await post({ listingId: LISTING, photoId: OTHER }))).toEqual({
      status: 409,
      refusal: { field: "photoId", reason: "photoGone" },
    });
    expect(await refusalOf(await post({ listingId: LISTING, photoId: SECOND }))).toEqual({
      status: 409,
      refusal: { field: "photoId", reason: "notCover" },
    });
    expect(state.rates.some((rate) => rate.action === "background:listing")).toBe(false);
    expect(state.spent).toEqual([]);
  });

  it("BGR-8 the ad's tries: two for good, keyed by the ad and spent before the provider; a spent budget is backgroundSpent and nothing is metered", async () => {
    state.budgetLeft = null;
    expect((await refusalOf(await post({ listingId: LISTING, photoId: COVER }))).refusal).toEqual({
      field: "background",
      reason: "backgroundSpent",
    });
    expect(state.rates.find((rate) => rate.action === "background:listing")).toEqual({
      action: "background:listing",
      key: LISTING,
      limit: 2,
      window: "10 years",
    });
    expect(state.spent).toEqual([]);
  });

  it("BGR-9 fake mode answers the fixed cut-out itself, never stored, with the tries left, and meters one call", async () => {
    state.budgetLeft = 1;
    const response = await post({ listingId: LISTING, photoId: COVER });
    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toBe("image/png");
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(response.headers.get("x-tries-left")).toBe("1");
    const bytes = new Uint8Array(await response.arrayBuffer());
    expect([...bytes.subarray(0, 4)]).toEqual([0x89, 0x50, 0x4e, 0x47]);
    expect(state.spent).toEqual(["background_removal"]);
    expect(state.signed).toEqual([]);
  });

  it("BGR-10 with the provider: the cover's own link is signed (the cover size only), read, and sent with the key; a provider failure is providerUnavailable and is not metered", async () => {
    vi.stubEnv("E2E_FAKE_BACKGROUND", "");
    vi.stubEnv("PHOTOROOM_API_KEY", "pr-key");
    const calls: string[] = [];
    let photoroom = 200;
    vi.stubGlobal(
      "fetch",
      vi.fn(async (url: string, init?: RequestInit) => {
        calls.push(url);
        if (url === "https://storage.example/signed-cover") {
          return new Response(new Uint8Array([5, 5]), {
            headers: { "content-type": "image/webp" },
          });
        }
        expect((init?.headers as Record<string, string>)["x-api-key"]).toBe("pr-key");
        return photoroom === 200
          ? new Response(new Uint8Array([6, 6, 6]), { headers: { "content-type": "image/webp" } })
          : new Response("{}", {
              status: photoroom,
              headers: { "content-type": "application/json" },
            });
      }),
    );
    const response = await post({ listingId: LISTING, photoId: COVER });
    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toBe("image/webp");
    expect(new Uint8Array(await response.arrayBuffer())).toEqual(new Uint8Array([6, 6, 6]));
    expect(state.signed).toEqual([{ ids: [COVER], variants: ["cover"] }]);
    expect(calls).toEqual([
      "https://storage.example/signed-cover",
      "https://sdk.photoroom.com/v1/segment",
    ]);
    expect(state.spent).toEqual(["background_removal"]);

    photoroom = 402;
    state.spent = [];
    expect((await refusalOf(await post({ listingId: LISTING, photoId: COVER }))).refusal).toEqual({
      field: "background",
      reason: "providerUnavailable",
    });
    expect(state.spent).toEqual([]);
    vi.unstubAllGlobals();
  });

  it("BGR-11 the cutout answer carries x-tries-left and cache-control no-store with the bytes", async () => {
    state.budgetLeft = 1;
    const response = await post({ listingId: LISTING, photoId: COVER });
    expect(response.status).toBe(200);
    expect(response.headers.get("x-tries-left")).toBe("1");
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect((await response.arrayBuffer()).byteLength).toBeGreaterThan(0);
  });

  it("BGR-12 a visitor answers 401 and the stream is never read", async () => {
    state.signedIn = false;
    let sent = false;
    const stream = new ReadableStream<Uint8Array>(
      {
        pull(controller) {
          state.pulls += 1;
          if (sent) {
            controller.close();
            return;
          }
          sent = true;
          controller.enqueue(new TextEncoder().encode(JSON.stringify({ listingId: LISTING })));
        },
      },
      { highWaterMark: 0 },
    );
    const handlers = (
      Route.options as unknown as {
        server: { handlers: { POST: (ctx: { request: Request }) => Promise<Response> } };
      }
    ).server.handlers;
    const response = await handlers.POST({
      request: new Request("http://local/api/listings/background", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: stream,
        duplex: "half",
      } as RequestInit),
    });
    expect(response.status).toBe(401);
    expect(state.pulls).toBe(0);
    expect(state.rates).toEqual([]);
    expect(state.reads).toEqual([]);
    expect(state.spent).toEqual([]);
  });
});
