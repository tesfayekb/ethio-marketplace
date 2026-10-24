import { beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Foundations turn 6 (INC-862 T2) — THE CATEGORY TREE ON defineRoute: the
 * anonymous client mocked, the version read and the table reads counted
 * (G27/G38); no real row.
 */

const state = {
  versionCalls: 0,
  tableCalls: 0,
  version: { data: "7" as unknown, error: null as unknown, status: 200 },
  logs: [] as string[],
};

const NODES = [
  { id: "b", name_en: "B", display_order: 2 },
  { id: "a", name_en: "A", display_order: 1 },
];
const POINTERS = [
  {
    id: "p1",
    child_id: "b",
    parent_id: "a",
    display_order: 0,
    is_primary: true,
    created_at: "2026-01-01T00:00:00Z",
  },
];

function table(name: string) {
  state.tableCalls += 1;
  let paged = false;
  const builder = {
    select: () => builder,
    eq: () => builder,
    order: () => builder,
    limit: () => builder,
    gt: () => {
      paged = true;
      return builder;
    },
    then: (resolve: (value: unknown) => unknown) =>
      resolve({
        data: paged ? [] : name === "categories" ? NODES : POINTERS,
        error: null,
      }),
  };
  return builder;
}

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
    anonymousClient: () => ({
      rpc: async () => {
        state.versionCalls += 1;
        return state.version;
      },
      from: (name: string) => table(name),
    }),
    userClientFromRequest: async () => ({ supabase: null, userId: null, reason: null }),
    refuseUserClient: () => null,
    consumeRate: async () => ({ allowed: true, resetsAt: null }),
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

type Get = (args: { request: Request; params: unknown }) => Promise<Response>;

async function loadGet(): Promise<Get> {
  vi.resetModules();
  const { Route } = await import("./categories.tree");
  const server = (Route.options as unknown as { server: { handlers: { GET: Get } } }).server;
  return server.handlers.GET;
}

const call = (get: Get, headers: Record<string, string> = {}) =>
  get({ request: new Request("http://x/api/categories/tree", { headers }), params: {} });

beforeEach(() => {
  state.versionCalls = 0;
  state.tableCalls = 0;
  state.version = { data: "7", error: null, status: 200 };
  state.logs = [];
});

describe("categories tree route", () => {
  it("TREE-1 a 200 carries the ETag, Cache-Control, Vary and the {version, nodes, pointers} body", async () => {
    const get = await loadGet();
    const response = await call(get);
    expect(response.status).toBe(200);
    expect(response.headers.get("ETag")).toBe('"cat-tree-7"');
    expect(response.headers.get("Cache-Control")).toBe(
      "public, max-age=60, stale-while-revalidate=300",
    );
    expect(response.headers.get("Vary")).toBe("Accept-Encoding");
    expect(response.headers.get("Content-Type")).toBe("application/json; charset=utf-8");
    const expected = JSON.stringify({
      version: "7",
      nodes: [NODES[1], NODES[0]],
      pointers: [{ child_id: "b", parent_id: "a", display_order: 0, is_primary: true }],
    });
    expect(await response.text()).toBe(expected);
  });

  it("TREE-2 If-None-Match equal answers 304 with the ETag and no body, warm and cold", async () => {
    const get = await loadGet();
    const cold = await call(get, { "If-None-Match": '"cat-tree-7"' });
    expect(cold.status).toBe(304);
    expect(cold.headers.get("ETag")).toBe('"cat-tree-7"');
    expect(await cold.text()).toBe("");
    expect(state.tableCalls).toBe(0);
    await call(get);
    const warm = await call(get, { "If-None-Match": '"cat-tree-7"' });
    expect(warm.status).toBe(304);
    expect(warm.headers.get("ETag")).toBe('"cat-tree-7"');
    expect(warm.headers.get("Cache-Control")).toBe(
      "public, max-age=60, stale-while-revalidate=300",
    );
    expect(await warm.text()).toBe("");
  });

  it("TREE-3 two requests read the version twice (ttl 0) and the tables once", async () => {
    const get = await loadGet();
    await call(get);
    await call(get);
    expect(state.versionCalls).toBe(2);
    expect(state.tableCalls).toBe(2);
  });

  it("TREE-4 a version-read error answers 503 when upstream failed, 500 otherwise, never cached", async () => {
    const get = await loadGet();
    state.version = { data: null, error: { message: "gateway" }, status: 503 };
    expect((await call(get)).status).toBe(503);
    state.version = { data: null, error: { message: "boom" }, status: 400 };
    const failed = await call(get);
    expect(failed.status).toBe(500);
    expect(((await failed.json()) as { error: string }).error).toBe("server error");
    state.version = { data: "7", error: null, status: 200 };
    expect((await call(get)).status).toBe(200);
    expect(state.tableCalls).toBe(2);
  });
});
