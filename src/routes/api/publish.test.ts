import { beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Foundations turn 2 (DEC-237) — THE PUBLISH ROUTE ON defineRoute (D2), on
 * the background-route pattern: user-client.ts mocked, the rpc counted, so a
 * bad body is proven to never reach the door (G27/G38).
 */

const LISTING = "11111111-1111-4111-8111-111111111111";

const state = {
  rpcCalls: [] as { name: string; args: unknown }[],
  rpcAnswer: { data: { ok: true, status: "screening" } as unknown, error: null as unknown, status: 200 },
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
    consumeRate: async () => ({ allowed: true, resetsAt: null, remaining: 9 }),
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
vi.mock("@/integrations/supabase/client.server", () => ({ supabaseAdmin: {} }));

const { Route } = await import("@/routes/api/listings/publish");

async function post(body: unknown): Promise<Response> {
  const handlers = (
    Route.options as unknown as {
      server: { handlers: { POST: (ctx: { request: Request; params: unknown }) => Promise<Response> } };
    }
  ).server.handlers;
  return handlers.POST({
    request: new Request("http://local/api/listings/publish", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: typeof body === "string" ? body : JSON.stringify(body),
    }),
    params: {},
  });
}

beforeEach(() => {
  state.rpcCalls = [];
  state.rpcAnswer = { data: { ok: true, status: "screening" }, error: null, status: 200 };
  state.logs = [];
});

describe("POST /api/listings/publish on defineRoute (D2)", () => {
  it("a bad body never reaches the rpc — the verdict names the field", async () => {
    const response = await post({ listingId: "not-a-uuid" });
    expect(response.status).toBe(200);
    const payload = (await response.json()) as { ok: boolean; refusals: unknown[] };
    expect(payload.ok).toBe(false);
    expect(payload.refusals[0]).toMatchObject({ field: "listingId", reason: "badShape" });
    expect(state.rpcCalls).toEqual([]);
  });

  it("a door refusal keeps its envelope: ok false, the door's own code, at 200", async () => {
    state.rpcAnswer = { data: null, error: { message: "notReady:photos" }, status: 200 };
    const response = await post({ listingId: LISTING });
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      ok: false,
      refusals: [{ field: "door", reason: "notReady:photos" }],
    });
    expect(state.rpcCalls).toEqual([{ name: "publish_listing", args: { p_listing_id: LISTING } }]);
  });

  it("success keeps the door's JSON, and the certification is passed on only when sent", async () => {
    const response = await post({ listingId: LISTING });
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ ok: true, status: "screening" });

    const CERT = "22222222-2222-4222-8222-222222222222";
    await post({ listingId: LISTING, certified: [CERT], language: "am" });
    expect(state.rpcCalls[1]).toEqual({
      name: "publish_listing",
      args: { p_listing_id: LISTING, p_certified: [CERT], p_language: "am" },
    });
  });

  it("an upstream failure is a 503, never a refusal", async () => {
    state.rpcAnswer = { data: null, error: { message: "<html>Bad Gateway</html>" }, status: 502 };
    const response = await post({ listingId: LISTING });
    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({ error: "upstream unavailable" });
  });
});
