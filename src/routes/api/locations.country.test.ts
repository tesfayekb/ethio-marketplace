import { beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Foundations turn 6 (INC-862 T2) — THE PER-COUNTRY TREE ON defineRoute: the
 * anonymous client mocked, both rpcs counted (G27/G38); no real row.
 */

const NODE = {
  id: "n1",
  parent_id: null,
  level: "region",
  slug: "addis",
  iso_3166_2: null,
  region_id: null,
  city_id: null,
  display_order: 1,
  center_lat: null,
  center_lng: null,
  name_en: "Addis",
};

const state = {
  calls: [] as { name: string; args: unknown }[],
  rows: [NODE] as unknown[],
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
      rpc: async (name: string, args: unknown) => {
        state.calls.push({ name, args });
        return name === "get_location_tree_version"
          ? { data: "v1", error: null, status: 200 }
          : { data: state.rows, error: null, status: 200 };
      },
    }),
    userClientFromRequest: async () => ({ supabase: null, userId: null, reason: null }),
    refuseUserClient: () => null,
    consumeRate: async () => ({ allowed: true, resetsAt: null }),
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

type Get = (args: { request: Request; params: unknown }) => Promise<Response>;

async function loadGet(): Promise<Get> {
  vi.resetModules();
  const { Route } = await import("./locations.$country");
  const server = (Route.options as unknown as { server: { handlers: { GET: Get } } }).server;
  return server.handlers.GET;
}

const call = (get: Get, country: string, headers: Record<string, string> = {}) =>
  get({ request: new Request("http://x/api/locations/x", { headers }), params: { country } });

const treeCalls = () => state.calls.filter((c) => c.name === "get_location_tree").length;

beforeEach(() => {
  state.calls = [];
  state.rows = [NODE];
});

describe("per-country location tree route", () => {
  it("LOCC-1 a lower-case and a padded code answer the upper-case tree", async () => {
    const get = await loadGet();
    for (const raw of ["et", " ET "]) {
      const response = await call(get, raw);
      expect(response.status).toBe(200);
      expect(response.headers.get("ETag")).toBe('"loc-ET.v1"');
      expect(response.headers.get("Cache-Control")).toBe(
        "public, max-age=300, stale-while-revalidate=3600",
      );
      expect(response.headers.get("Vary")).toBe("Accept-Encoding");
      expect(await response.text()).toBe(
        JSON.stringify({ country: "ET", version: "v1", nodes: [NODE] }),
      );
    }
    expect(state.calls[0]).toEqual({
      name: "get_location_tree_version",
      args: { p_country_code: "ET" },
    });
  });

  it("LOCC-2 a malformed code answers 400 badCountry and reads nothing", async () => {
    const get = await loadGet();
    const response = await call(get, "xyz");
    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ error: "badCountry" });
    expect(state.calls).toEqual([]);
  });

  it("LOCC-3 zero rows answer 404 closedOrUnknownMarket and are not cached", async () => {
    const get = await loadGet();
    state.rows = [];
    const first = await call(get, "CA");
    expect(first.status).toBe(404);
    expect(await first.json()).toEqual({ error: "closedOrUnknownMarket" });
    await call(get, "CA");
    expect(treeCalls()).toBe(2);
  });

  it("LOCC-4 the same ETag answers 304, warm and cold", async () => {
    const get = await loadGet();
    const cold = await call(get, "ET", { "If-None-Match": '"loc-ET.v1"' });
    expect(cold.status).toBe(304);
    expect(cold.headers.get("ETag")).toBe('"loc-ET.v1"');
    expect(treeCalls()).toBe(0);
    await call(get, "ET");
    const warm = await call(get, "ET", { "If-None-Match": '"loc-ET.v1"' });
    expect(warm.status).toBe(304);
    expect(await warm.text()).toBe("");
  });
});
