import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Foundations turn 3 (DEC-237) — THE ASSIST ROUTE ON defineRoute (D2).
 */

const state = {
  rpcCalls: 0,
  rates: [] as string[],
  hourAllowed: true,
  fetches: 0,
  pulls: 0,
  listing: { id: "l-1" } as unknown,
  fetchMode: "ok" as "ok" | "timeout",
  auditFails: false,
  auditWrites: 0,
  spends: 0,
};

function builder(table: string) {
  const chain = {
    select: () => chain,
    eq: () => chain,
    in: async () => ({ data: [], error: null }),
    maybeSingle: async () =>
      table === "categories"
        ? { data: { slug: "cars", name_en: "Cars" }, error: null }
        : { data: state.listing, error: null },
  };
  return chain;
}

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
        rpc: async () => {
          state.rpcCalls += 1;
          return { data: null, error: null, status: 200 };
        },
        from: (table: string) => builder(table),
      },
      userId: "seller-1",
      reason: null,
      message: "",
    }),
    refuseUserClient: () => null,
    anonymousClient: () => null,
    consumeRate: async (action: string) => {
      state.rates.push(action);
      const allowed = action === "assist" ? state.hourAllowed : true;
      return { allowed, resetsAt: "2026-10-24T12:00:00Z", remaining: 4 };
    },
    peekRate: async () => ({ remaining: 4 }),
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
vi.mock("@/server/ai/meter", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/server/ai/meter")>()),
  aiGate: async () => ({ on: true }),
  recordAiSpend: async () => {
    state.spends += 1;
  },
}));
vi.mock("@/server/stand-in", () => ({ standInMode: () => false }));
vi.mock("@/server/media/links", () => ({ signPhotoRows: async () => ({}) }));
vi.mock("@/integrations/supabase/client.server", () => ({
  supabaseAdmin: {
    rpc: async () => {
      state.auditWrites += 1;
      return { error: state.auditFails ? { message: "audit write failure" } : null };
    },
  },
}));

const { Route } = await import("@/routes/api/listings/assist");

const BODY = { categoryId: "cat-1", locale: "en", listingId: "l-1", title: "", description: "" };

function counted(text: string): ReadableStream<Uint8Array> {
  let sent = false;
  return new ReadableStream<Uint8Array>(
    {
      pull(controller) {
        state.pulls += 1;
        if (sent) {
          controller.close();
          return;
        }
        sent = true;
        controller.enqueue(new TextEncoder().encode(text));
      },
    },
    { highWaterMark: 0 },
  );
}

async function post(body: unknown): Promise<Response> {
  const handlers = (
    Route.options as unknown as {
      server: {
        handlers: { POST: (ctx: { request: Request; params: unknown }) => Promise<Response> };
      };
    }
  ).server.handlers;
  return handlers.POST({
    request: new Request("http://local/api/listings/assist", {
      method: "POST",
      headers: { "content-type": "application/json", Authorization: "Bearer t" },
      body: counted(JSON.stringify(body)),
      duplex: "half",
    } as RequestInit),
    params: {},
  });
}

beforeEach(() => {
  state.rpcCalls = 0;
  state.rates = [];
  state.hourAllowed = true;
  state.fetches = 0;
  state.pulls = 0;
  state.listing = { id: "l-1" };
  state.fetchMode = "ok";
  state.auditFails = false;
  state.auditWrites = 0;
  state.spends = 0;
  vi.stubEnv("GEMINI_API_KEY", "test-key");
  vi.spyOn(console, "error").mockImplementation(() => undefined);
  vi.stubGlobal("fetch", async () => {
    state.fetches += 1;
    if (state.fetchMode === "timeout") throw new DOMException("signal timed out", "TimeoutError");
    const text = JSON.stringify({ title: "Toyota Corolla 2015", description: "One owner." });
    return new Response(JSON.stringify({ candidates: [{ content: { parts: [{ text }] } }] }), {
      status: 200,
    });
  });
});
afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("POST /api/listings/assist on defineRoute (D2)", () => {
  it("AST-1 a bad body answers the verdict — no rpc, no fetch", async () => {
    const response = await post({ ...BODY, period: 7 });
    expect(response.status).toBe(200);
    const payload = (await response.json()) as { ok: boolean; refusals: unknown[] };
    expect(payload.refusals[0]).toMatchObject({ field: "period", reason: "badShape" });
    expect(state.rpcCalls).toBe(0);
    expect(state.fetches).toBe(0);
  });

  it("AST-2 the hourly dial spent answers the rate verdict before the body is read", async () => {
    state.hourAllowed = false;
    const response = await post(BODY);
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      ok: false,
      refusals: [{ field: "rate", reason: "rateLimited", detail: "2026-10-24T12:00:00Z" }],
    });
    expect(state.pulls).toBe(0);
    expect(state.rates).toEqual(["assist"]);
    expect(state.fetches).toBe(0);
  });

  it("AST-3 a foreign listing answers notYourListing, and no provider call", async () => {
    state.listing = null;
    const response = await post(BODY);
    expect(await response.json()).toEqual({
      ok: false,
      refusals: [{ field: "listingId", reason: "notYourListing" }],
    });
    expect(state.fetches).toBe(0);
    expect(state.rates).not.toContain("assist:listing");
  });

  it("AST-4 a provider timeout answers the provider-unavailable verdict", async () => {
    state.fetchMode = "timeout";
    const response = await post(BODY);
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      ok: false,
      refusals: [{ field: "assist", reason: "providerUnavailable" }],
    });
    expect(state.fetches).toBe(1);
  });

  // Foundations turn A1 (INC-952, DEC-280) — the assist's screening judges a person.
  it("AIV-5 with its audit row unwritten the assist answers providerUnavailable, never the answer", async () => {
    state.auditFails = true;
    const response = await post(BODY);
    expect(await response.json()).toEqual({
      ok: false,
      refusals: [{ field: "assist", reason: "providerUnavailable" }],
    });
    expect(state.fetches).toBe(1);
    expect(state.auditWrites).toBe(1);
    expect(state.spends).toBe(1);
    expect(state.rpcCalls).toBe(0);
  });
  it("AIV-6 the same call with its row written answers the helper's text", async () => {
    const response = await post(BODY);
    expect(await response.json()).toMatchObject({ ok: true, title: "Toyota Corolla 2015" });
    expect(state.auditWrites).toBe(1);
  });
});
