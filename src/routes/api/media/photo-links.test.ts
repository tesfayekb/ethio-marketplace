import { beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Foundations turn 4 (DEC-237) — THE PHOTO LINKS ON defineRoute (E2).
 */

const PHOTO = "22222222-2222-4222-8222-222222222222";

const state = {
  rateAllowed: true,
  rateCalls: [] as { action: string; key: string }[],
  reads: [] as { ids: readonly string[]; variants: readonly string[] }[],
};

vi.mock("@/server/supabase/user-client", () => {
  const routeJson = (body: unknown, status: number) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
    });
  return {
    routeJson,
    logRouteError: () => undefined,
    userClientFromRequest: async () => ({
      supabase: { role: "caller" },
      userId: "seller-1",
      reason: null,
      message: "",
    }),
    refuseUserClient: () => null,
    anonymousClient: () => ({ role: "anon" }),
    consumeRate: async (action: string, key: string) => {
      state.rateCalls.push({ action, key });
      return { allowed: state.rateAllowed, resetsAt: "2026-10-24T13:00:00Z", remaining: 0 };
    },
    envDial: (_name: string, fallback: number) => fallback,
    upstreamFailed: () => false,
    upstreamUnavailable: () => routeJson({ error: "upstream unavailable" }, 503),
    doorAnswer: (data: unknown) => data,
  };
});
vi.mock("@/server/catalog-find.server", () => ({
  clientAddress: () => "203.0.113.9",
  hashAddress: (address: string) => `hashed:${address}`,
}));
vi.mock("@/server/media/links", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/server/media/links")>()),
  readAndSignPhotoLinks: async (
    _reader: unknown,
    ids: readonly string[],
    variants: readonly string[],
  ) => {
    state.reads.push({ ids, variants });
    return { [ids[0]!]: { card: "https://storage.example/card" } };
  },
}));

const { Route } = await import("@/routes/api/media/photo-links");

type Handler = (ctx: { request: Request; params: unknown }) => Promise<Response>;
const POST = (Route.options as unknown as { server: { handlers: { POST: Handler } } }).server
  .handlers.POST;

function post(body: unknown, signedIn: boolean): Promise<Response> {
  return POST({
    request: new Request("http://local/api/media/photo-links", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(signedIn ? { Authorization: "Bearer t" } : {}),
      },
      body: JSON.stringify(body),
    }),
    params: {},
  });
}

beforeEach(() => {
  state.rateAllowed = true;
  state.rateCalls = [];
  state.reads = [];
});

describe("/api/media/photo-links on defineRoute (E2)", () => {
  it("PLK-1 a malformed id answers the badShape verdict and no read", async () => {
    const response = await post({ photoIds: ["not-a-uuid"] }, false);
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      ok: false,
      refusals: [{ field: "photoIds", reason: "badShape" }],
    });
    expect(state.reads).toEqual([]);
  });

  it("PLK-2 an anonymous caller over the dial answers 200 {field:'rate'} and no read", async () => {
    state.rateAllowed = false;
    const response = await post({ photoIds: [PHOTO] }, false);
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      ok: false,
      refusals: [{ field: "rate", reason: "rateLimited", detail: "2026-10-24T13:00:00Z" }],
    });
    // The one address reader's value, hashed (never the raw address).
    expect(state.rateCalls).toEqual([
      { action: "photo-links:address", key: "hashed:203.0.113.9" },
    ]);
    expect(state.reads).toEqual([]);
  });

  it("PLK-3 a signed-in caller spends no dial and gets its links", async () => {
    const response = await post({ photoIds: [PHOTO, PHOTO] }, true);
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      ok: true,
      links: { [PHOTO]: { card: "https://storage.example/card" } },
      expiresIn: 3600,
    });
    expect(state.rateCalls).toEqual([]);
    // A duplicate id is still deduplicated.
    expect(state.reads.map((read) => read.ids)).toEqual([[PHOTO]]);
  });

  it("PLK-4 variants default to all four", async () => {
    await post({ photoIds: [PHOTO] }, true);
    expect([...state.reads[0]!.variants].sort()).toEqual(["card", "cover", "mid", "thumb"]);
  });
});
