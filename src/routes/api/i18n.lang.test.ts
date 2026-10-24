import { beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Foundations turn 6 (INC-862 T2) — THE LANGUAGE BUNDLE ON defineRoute: the
 * anonymous client mocked, both rpcs counted (G27/G38); no real row.
 */

const state = { calls: [] as { name: string; args: unknown }[] };

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
        return name === "get_ui_bundle_version"
          ? { data: "h1", error: null, status: 200 }
          : { data: { "app.title": "T" }, error: null, status: 200 };
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
  const { Route } = await import("./i18n.$lang");
  const server = (Route.options as unknown as { server: { handlers: { GET: Get } } }).server;
  return server.handlers.GET;
}

const call = (get: Get, lang: string, headers: Record<string, string> = {}) =>
  get({ request: new Request("http://x/api/i18n/x", { headers }), params: { lang } });

const versionCalls = () => state.calls.filter((c) => c.name === "get_ui_bundle_version").length;

beforeEach(() => {
  state.calls = [];
});

describe("language bundle route", () => {
  it("I18B-1 a padded upper-case code answers the normalised bundle", async () => {
    const get = await loadGet();
    const response = await call(get, " AM ");
    expect(response.status).toBe(200);
    expect(response.headers.get("ETag")).toBe('"am.h1"');
    expect(response.headers.get("Content-Type")).toBe("application/json; charset=utf-8");
    expect(response.headers.get("Cache-Control")).toBe(
      "public, max-age=300, stale-while-revalidate=3600",
    );
    expect(response.headers.get("Vary")).toBe("Accept-Encoding");
    expect(await response.text()).toBe(
      JSON.stringify({ lang: "am", bundle: { "app.title": "T" } }),
    );
    expect(state.calls[0]).toEqual({ name: "get_ui_bundle_version", args: { p_lang: "am" } });
  });

  it("I18B-2 a malformed code answers 400 and reads nothing", async () => {
    const get = await loadGet();
    const response = await call(get, "x!");
    expect(response.status).toBe(400);
    expect(response.headers.get("Content-Type")).toBe("application/json; charset=utf-8");
    expect(await response.json()).toEqual({ error: "invalid language code" });
    expect(state.calls).toEqual([]);
  });

  it("I18B-3 the same ETag answers 304, warm and cold", async () => {
    const get = await loadGet();
    const cold = await call(get, "am", { "If-None-Match": '"am.h1"' });
    expect(cold.status).toBe(304);
    expect(cold.headers.get("ETag")).toBe('"am.h1"');
    expect(cold.headers.get("Vary")).toBe("Accept-Encoding");
    expect(state.calls.filter((c) => c.name === "get_ui_bundle")).toEqual([]);
    await call(get, "am");
    const warm = await call(get, "am", { "If-None-Match": '"am.h1"' });
    expect(warm.status).toBe(304);
    expect(await warm.text()).toBe("");
  });

  it("I18B-4 within 15 s two requests read the version once", async () => {
    const get = await loadGet();
    await call(get, "am");
    await call(get, "am");
    expect(versionCalls()).toBe(1);
  });
});
