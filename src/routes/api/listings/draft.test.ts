import { beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Foundations turn 3 (DEC-237) — THE DRAFT ROUTE ON defineRoute (C1), on the
 * publish.test.ts pattern: user-client.ts mocked whole, the rpc counted, so a
 * refused body is proven to never reach the door (G27/G38).
 */

const state = {
  rpcCalls: [] as { name: string; args: unknown }[],
  adminCalls: [] as { name: string; args: unknown }[],
  rpcAnswer: {
    data: { ok: true, listing_id: "l-1" } as unknown,
    error: null as unknown,
    status: 200,
  },
  rates: 0,
  logs: [] as string[],
};

vi.mock("@/server/supabase/user-client", () => {
  const routeJson = (body: unknown, status: number) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
    });
  return {
    routeJson,
    logRouteError: (path: string, message: unknown) => {
      state.logs.push(`${path} ${String(message)}`);
    },
    userClientFromRequest: async () => ({
      supabase: {
        rpc: async (name: string, args: unknown) => {
          state.rpcCalls.push({ name, args });
          return state.rpcAnswer;
        },
      },
      userId: "seller-1",
      reason: null,
      message: "",
    }),
    refuseUserClient: () => null,
    anonymousClient: () => null,
    consumeRate: async () => {
      state.rates += 1;
      return { allowed: true, resetsAt: null, remaining: 9 };
    },
    envDial: (_name: string, fallback: number) => fallback,
    upstreamFailed: (error: { message?: string } | null, status: number) =>
      error !== null && (status === 0 || status >= 502),
    upstreamUnavailable: (path: string, what: string, status: number) => {
      state.logs.push(`${path} ${what}: upstream unavailable (${status})`);
      return routeJson({ error: "upstream unavailable" }, 503);
    },
    doorAnswer: (data: unknown) => data,
  };
});
vi.mock("@/server/catalog-find.server", () => ({
  clientAddress: () => "203.0.113.9",
  hashAddress: (address: string) => `hashed:${address}`,
}));
vi.mock("@/server/geo/guess", () => ({ geoGuess: () => ({ country: "XX" }) }));
vi.mock("@/integrations/supabase/client.server", () => ({
  supabaseAdmin: {
    rpc: async (name: string, args: unknown) => {
      state.adminCalls.push({ name, args });
      return { data: null, error: null, status: 204 };
    },
  },
}));

const { Route } = await import("@/routes/api/listings/draft");

async function post(body: unknown): Promise<Response> {
  const handlers = (
    Route.options as unknown as {
      server: {
        handlers: { POST: (ctx: { request: Request; params: unknown }) => Promise<Response> };
      };
    }
  ).server.handlers;
  return handlers.POST({
    request: new Request("http://local/api/listings/draft", {
      method: "POST",
      headers: { "content-type": "application/json", Authorization: "Bearer t" },
      body: JSON.stringify(body),
    }),
    params: {},
  });
}

beforeEach(() => {
  state.rpcCalls = [];
  state.adminCalls = [];
  state.rpcAnswer = { data: { ok: true, listing_id: "l-1" }, error: null, status: 200 };
  state.rates = 0;
  state.logs = [];
});

describe("POST /api/listings/draft on defineRoute (C1)", () => {
  it("DRT-1 a bad body answers the verdict with field step, and no rpc", async () => {
    const response = await post({ listingId: null, step: "x" });
    expect(response.status).toBe(200);
    const payload = (await response.json()) as { ok: boolean; refusals: unknown[] };
    expect(payload.ok).toBe(false);
    expect(payload.refusals[0]).toMatchObject({ field: "step", reason: "badShape" });
    expect(state.rpcCalls).toEqual([]);
    expect(state.adminCalls).toEqual([]);
    expect(state.rates).toBe(0);
  });

  it("DRT-2 an unknown key is refused (strict), and no rpc", async () => {
    const response = await post({ listingId: null, step: 1, sellerId: "someone-else" });
    expect(response.status).toBe(200);
    const payload = (await response.json()) as { ok: boolean; refusals: unknown[] };
    expect(payload.ok).toBe(false);
    expect(payload.refusals[0]).toMatchObject({ reason: "badShape", detail: "unrecognized_keys" });
    expect(state.rpcCalls).toEqual([]);
    expect(state.adminCalls).toEqual([]);
  });

  it("DRT-3 listings_price_bp_check answers the commission-range refusal", async () => {
    state.rpcAnswer = {
      data: null,
      error: { message: 'new row violates check constraint "listings_price_bp_check"' },
      status: 400,
    };
    const response = await post({ listingId: "l-1", step: 5, priceMode: "commission", priceBp: 9 });
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      ok: false,
      refusals: [{ field: "price_bp", reason: "commissionRange" }],
    });
  });

  it("DRT-4 success answers the door's answer, after the residency fact for the verified caller", async () => {
    const response = await post({ listingId: null, step: 1, categoryId: "cars", title: "  " });
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true, listing_id: "l-1" });
    expect(state.adminCalls).toEqual([
      { name: "residency_country_for", args: { p_user_id: "seller-1", p_request_country: "XX" } },
    ]);
    expect(state.rpcCalls).toHaveLength(1);
    expect(state.rpcCalls[0]).toMatchObject({
      name: "submit_listing",
      args: { p_listing_id: null, p_step: 1, p_category_id: "cars", p_title: null },
    });
  });
});
