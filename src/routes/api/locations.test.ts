import { beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Foundations turn 6 (INC-862 T2) — THE OPEN-MARKETS LIST ON defineRoute: the
 * anonymous client mocked, the rpc counted (G27/G38); no real row.
 */

const state = {
  rpcCalls: 0,
  answer: { data: [] as unknown, error: null as unknown, status: 200 },
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
    anonymousClient: () => ({
      rpc: async () => {
        state.rpcCalls += 1;
        return state.answer;
      },
    }),
    userClientFromRequest: async () => ({ supabase: null, userId: null, reason: null }),
    refuseUserClient: () => null,
    consumeRate: async () => ({ allowed: true, resetsAt: null }),
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

type Get = (args: { request: Request; params: unknown }) => Promise<Response>;

async function loadGet(): Promise<Get> {
  vi.resetModules();
  const { Route } = await import("./locations");
  const server = (Route.options as unknown as { server: { handlers: { GET: Get } } }).server;
  return server.handlers.GET;
}

const call = (get: Get, headers: Record<string, string> = {}) =>
  get({ request: new Request("http://x/api/locations", { headers }), params: {} });

/** The real FNV-1a of `{"countries":[]}` — the value the route computes. */
const EMPTY_TAG = '"open-markets-17f93b81"';

beforeEach(() => {
  state.rpcCalls = 0;
  state.answer = { data: [], error: null, status: 200 };
});

describe("open markets route", () => {
  it("LOC-1 a 200 carries the strong ETag, Cache-Control, Vary and the body", async () => {
    const get = await loadGet();
    const response = await call(get);
    expect(response.status).toBe(200);
    expect(response.headers.get("ETag")).toBe(EMPTY_TAG);
    expect(response.headers.get("Cache-Control")).toBe(
      "public, max-age=300, stale-while-revalidate=3600",
    );
    expect(response.headers.get("Vary")).toBe("Accept-Encoding");
    expect(response.headers.get("Content-Type")).toBe("application/json; charset=utf-8");
    expect(await response.text()).toBe('{"countries":[]}');
  });

  it("LOC-2 the same ETag answers 304", async () => {
    const get = await loadGet();
    await call(get);
    const response = await call(get, { "If-None-Match": EMPTY_TAG });
    expect(response.status).toBe(304);
    expect(response.headers.get("ETag")).toBe(EMPTY_TAG);
    expect(await response.text()).toBe("");
  });

  it("LOC-3 within 15 s two requests call the rpc once", async () => {
    const get = await loadGet();
    await call(get);
    await call(get);
    expect(state.rpcCalls).toBe(1);
  });

  it("LOC-4 an rpc error answers 503 when upstream failed, 500 otherwise, never cached", async () => {
    const get = await loadGet();
    state.answer = { data: null, error: { message: "gateway" }, status: 502 };
    expect((await call(get)).status).toBe(503);
    state.answer = { data: null, error: { message: "boom" }, status: 400 };
    expect((await call(get)).status).toBe(500);
    state.answer = { data: [], error: null, status: 200 };
    expect((await call(get)).status).toBe(200);
    expect(state.rpcCalls).toBe(3);
  });
});
