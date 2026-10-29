import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Foundations turn 3 (DEC-237) — THE IDENTITY ROUTE ON defineRoute (D1).
 * user-client.ts mocked whole; the rpc, the fetch and the dial counted, so a
 * refusal is proven to never reach what it refused (G27/G38).
 */

const state = {
  rpcCalls: [] as string[],
  rates: [] as string[],
  rateAllowed: true,
  fetches: 0,
  modelAnswer: "{}",
  fake: false,
  realGateway: false,
  auditFails: false,
  audits: [] as string[],
  spends: 0,
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
        rpc: async (name: string) => {
          state.rpcCalls.push(name);
          return { data: { ok: true }, error: null, status: 200 };
        },
      },
      userId: "seller-1",
      reason: null,
      message: "",
    }),
    refuseUserClient: () => null,
    anonymousClient: () => null,
    consumeRate: async (action: string) => {
      state.rates.push(action);
      return { allowed: state.rateAllowed, resetsAt: "2026-10-25T00:00:00Z", remaining: 0 };
    },
    envDial: (_name: string, fallback: number) => fallback,
    upstreamFailed: (error: { message?: string } | null, status: number) =>
      error !== null && (status === 0 || status >= 502),
    upstreamUnavailable: () => routeJson({ error: "upstream unavailable" }, 503),
    doorAnswer: (data: unknown) => data,
  };
});
vi.mock("@/server/catalog-find.server", () => ({
  clientAddress: () => "203.0.113.9",
  hashAddress: (address: string) => `hashed:${address}`,
}));
vi.mock("@/server/ai/gateway", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/server/ai/gateway")>();
  return {
    ...actual,
    // Foundations turn A1 — AIV-1/2 run the real gateway (its audit write mocked below).
    aiCall: async (...args: Parameters<typeof actual.aiCall>) => {
      if (state.realGateway) return actual.aiCall(...args);
      state.fetches += 1;
      return { ok: true, value: JSON.parse(state.modelAnswer), fake: state.fake };
    },
  };
});
vi.mock("@/server/ai/meter", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/server/ai/meter")>()),
  aiGate: async () => ({ on: true }),
  recordAiSpend: async () => {
    state.spends += 1;
  },
}));
vi.mock("@/server/stand-in", () => ({ standInMode: () => false }));
vi.mock("@/integrations/supabase/client.server", () => ({
  supabaseAdmin: {
    from: (table: string) => ({
      insert: async (row: { action?: string }) => {
        state.audits.push(`${table}:${row.action ?? ""}`);
        return { error: null };
      },
    }),
    rpc: async (name: string) => {
      state.audits.push(name);
      return { error: state.auditFails ? { message: "audit write failure" } : null };
    },
  },
}));

const { Route } = await import("@/routes/api/listings/identity");

async function post(body: unknown): Promise<Response> {
  const handlers = (
    Route.options as unknown as {
      server: {
        handlers: { POST: (ctx: { request: Request; params: unknown }) => Promise<Response> };
      };
    }
  ).server.handlers;
  return handlers.POST({
    request: new Request("http://local/api/listings/identity", {
      method: "POST",
      headers: { "content-type": "application/json", Authorization: "Bearer t" },
      body: JSON.stringify(body),
    }),
    params: {},
  });
}

beforeEach(() => {
  state.rpcCalls = [];
  state.rates = [];
  state.rateAllowed = true;
  state.fetches = 0;
  state.modelAnswer = "{}";
  state.fake = false;
  state.realGateway = false;
  state.auditFails = false;
  state.audits = [];
  state.spends = 0;
  vi.stubEnv("GEMINI_API_KEY", "test-key");
  vi.spyOn(console, "error").mockImplementation(() => undefined);
  vi.stubGlobal("fetch", async () => {
    state.fetches += 1;
    return new Response(
      JSON.stringify({ candidates: [{ content: { parts: [{ text: state.modelAnswer }] } }] }),
      { status: 200 },
    );
  });
});
afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("POST /api/listings/identity on defineRoute (D1)", () => {
  it("IDT-1 a bad body answers the verdict — no rpc, no fetch, no dial", async () => {
    const response = await post({ alias: 42 });
    expect(response.status).toBe(200);
    const payload = (await response.json()) as { ok: boolean; refusals: unknown[] };
    expect(payload.ok).toBe(false);
    expect(payload.refusals[0]).toMatchObject({ field: "alias", reason: "badShape" });
    expect(state.rpcCalls).toEqual([]);
    expect(state.fetches).toBe(0);
    expect(state.rates).toEqual([]);
  });

  it("IDT-2 a home-country change reaches change_home_country and spends no dial", async () => {
    const response = await post({ homeCountryChange: "ET" });
    expect(await response.json()).toEqual({ ok: true });
    expect(state.rpcCalls).toEqual(["change_home_country"]);
    expect(state.rates).toEqual([]);
    expect(state.fetches).toBe(0);
  });

  it("IDT-3 the imitation dial spent answers the rate verdict, and no fetch", async () => {
    state.rateAllowed = false;
    const response = await post({ alias: "abebe-shop" });
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      ok: false,
      refusals: [{ field: "rate", reason: "rateLimited", detail: "2026-10-25T00:00:00Z" }],
    });
    expect(state.rates).toEqual(["identity:imitation"]);
    expect(state.fetches).toBe(0);
    expect(state.rpcCalls).toEqual([]);
  });

  it("IDT-4 a model answer longer than 200 characters reaches the client cut at 200 (INC-866)", async () => {
    state.modelAnswer = JSON.stringify({ imitates: true, of: "B".repeat(500) });
    const response = await post({ alias: "bigbrand" });
    const payload = (await response.json()) as {
      ok: boolean;
      refusals: { field: string; reason: string; detail: string }[];
    };
    expect(payload.refusals[0]?.reason).toBe("aliasImitatesBrand");
    expect(payload.refusals[0]?.detail).toBe("B".repeat(200));
    expect(state.fetches).toBe(1);
    expect(state.rpcCalls).toEqual([]);
  });

  /**
   * Foundations turn A1 (INC-952, DEC-280) — name_check judges a person. With its `ai_calls` row
   * unwritten the imitation verdict is never acted on: the gateway answers `unavailable`, and the
   * route takes its existing "could not check" path (D158 / bundle 3 step 19): no
   * aliasImitatesBrand refusal; the name goes to the door unchecked, recorded `alias.unchecked`.
   */
  it("AIV-1 an imitation verdict whose audit row failed is not acted on", async () => {
    state.realGateway = true;
    state.auditFails = true;
    state.modelAnswer = JSON.stringify({ imitates: true, of: "BigBrand" });
    const response = await post({ alias: "bigbrand" });
    const payload = (await response.json()) as { refusals?: { reason: string }[] };
    expect(JSON.stringify(payload)).not.toContain("aliasImitatesBrand");
    expect(state.fetches).toBe(1);
    expect(state.spends).toBe(1);
    expect(state.audits).toEqual(["ai_record_call", "audit_log:alias.unchecked"]);
    expect(state.rpcCalls).toEqual(["save_posting_identity"]);
  });
  it("AIV-2 the same verdict with its row written refuses the name, and nothing is saved", async () => {
    state.realGateway = true;
    state.modelAnswer = JSON.stringify({ imitates: true, of: "BigBrand" });
    const response = await post({ alias: "bigbrand" });
    const payload = (await response.json()) as { refusals: { reason: string }[] };
    expect(payload.refusals[0]?.reason).toBe("aliasImitatesBrand");
    expect(state.audits).toEqual(["ai_record_call"]);
    expect(state.rpcCalls).toEqual([]);
  });
});
