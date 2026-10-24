import { beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Foundations turn 3 (DEC-237) — THE ALIAS ROUTE ON defineRoute (C2).
 */

const state = {
  rpcCalls: [] as { name: string; args: unknown }[],
  rpcAnswer: { data: { ok: true } as unknown, error: null as unknown, status: 200 },
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
    upstreamUnavailable: (_path: string, _what: string, _status: number) =>
      routeJson({ error: "upstream unavailable" }, 503),
    doorAnswer: (data: unknown) => data,
  };
});
vi.mock("@/server/catalog-find.server", () => ({
  clientAddress: () => "203.0.113.9",
  hashAddress: (address: string) => `hashed:${address}`,
}));
vi.mock("@/integrations/supabase/client.server", () => ({ supabaseAdmin: {} }));

const { Route } = await import("@/routes/api/listings/alias");

async function post(body: unknown): Promise<Response> {
  const handlers = (
    Route.options as unknown as {
      server: {
        handlers: { POST: (ctx: { request: Request; params: unknown }) => Promise<Response> };
      };
    }
  ).server.handlers;
  return handlers.POST({
    request: new Request("http://local/api/listings/alias", {
      method: "POST",
      headers: { "content-type": "application/json", Authorization: "Bearer t" },
      body: JSON.stringify(body),
    }),
    params: {},
  });
}

beforeEach(() => {
  state.rpcCalls = [];
  state.rpcAnswer = { data: { ok: true }, error: null, status: 200 };
});

describe("POST /api/listings/alias on defineRoute (C2)", () => {
  it("ALT-1 a bad body answers the verdict, and no rpc", async () => {
    const response = await post({ alias: 42 });
    expect(response.status).toBe(200);
    const payload = (await response.json()) as { ok: boolean; refusals: unknown[] };
    expect(payload.ok).toBe(false);
    expect(payload.refusals[0]).toMatchObject({ field: "alias", reason: "badShape" });
    expect(state.rpcCalls).toEqual([]);
  });

  it("ALT-2 suggest routes to suggest_seller_aliases with the trimmed names; blanks and nulls are left out", async () => {
    await post({
      suggest: true,
      businessName: null,
      firstName: " Abebe ",
      lastName: "",
      categoryId: "cars",
    });
    expect(state.rpcCalls).toEqual([
      {
        name: "suggest_seller_aliases",
        args: {
          p_business_name: undefined,
          p_first_name: "Abebe",
          p_last_name: undefined,
          p_category_id: "cars",
        },
      },
    ]);
    await post({ alias: "  " });
    expect(state.rpcCalls[1]).toEqual({ name: "check_seller_alias", args: { p_alias: "" } });
  });

  it("ALT-3 a flat door refusal is rewritten into refusals", async () => {
    state.rpcAnswer = {
      data: { ok: false, field: "alias", reason: "aliasTaken" },
      error: null,
      status: 200,
    };
    const response = await post({ alias: "abebe" });
    expect(await response.json()).toEqual({
      ok: false,
      refusals: [{ field: "alias", reason: "aliasTaken" }],
    });
  });
});
