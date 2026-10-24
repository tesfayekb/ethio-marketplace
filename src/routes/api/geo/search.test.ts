import { beforeEach, expect, it, vi } from "vitest";

const state = vi.hoisted(() => ({ caller: vi.fn(), spend: vi.fn(), upstream: vi.fn() }));
vi.mock("@/server/supabase/user-client", async (original) => ({
  ...(await original<typeof import("@/server/supabase/user-client")>()),
  userClientFromRequest: state.caller,
}));
vi.mock("@/server/dials", async (original) => ({
  ...(await original<typeof import("@/server/dials")>()),
  spend: state.spend,
}));
vi.mock("@/server/upstream", async (original) => ({
  ...(await original<typeof import("@/server/upstream")>()),
  upstream: state.upstream,
}));

beforeEach(() => {
  vi.resetModules();
  vi.clearAllMocks();
  vi.spyOn(console, "error").mockImplementation(() => undefined);
  delete process.env.E2E_FAKE_GEOCODE;
  delete process.env.E2E_FAKE_TRANSLATE;
  state.caller.mockResolvedValue({ supabase: {}, userId: "caller", reason: null, message: "" });
  state.spend.mockResolvedValue({ allowed: true, remaining: 59, resetsAt: null });
});
const json = (body: unknown) =>
  new Response(JSON.stringify(body), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
async function get(query: string): Promise<Response> {
  const { Route } = (await import("./search")) as { Route: { options: unknown } };
  const handlers = (
    Route.options as {
      server: {
        handlers: { GET: (ctx: { request: Request; params: unknown }) => Promise<Response> };
      };
    }
  ).server.handlers;
  return handlers.GET({
    request: new Request(`https://example.test/x${query}`, {
      headers: { Authorization: "Bearer test" },
    }),
    params: {},
  });
}
const SPENT = { allowed: false, remaining: 0, resetsAt: "2026-10-24T19:00:00Z" };

it("GSR-1 no bearer is 401 missing bearer token, no dial, no outbound call", async () => {
  state.caller.mockResolvedValue({
    supabase: null,
    userId: null,
    reason: "missingBearer",
    message: "",
  });
  const response = await get("?q=bole");
  expect(response.status).toBe(401);
  expect(await response.json()).toEqual({ error: "missing bearer token" });
  expect(state.spend).not.toHaveBeenCalled();
  expect(state.upstream).not.toHaveBeenCalled();
});

it("GSR-2 a spent dial is rateLimited with resetsAt and no outbound call", async () => {
  state.spend.mockResolvedValue(SPENT);
  const response = await get("?q=bole");
  expect(await response.json()).toEqual({
    ok: false,
    refusals: [{ field: "geocode", reason: "rateLimited", detail: SPENT.resetsAt }],
  });
  expect(state.upstream).not.toHaveBeenCalled();
});

it("GSR-3 a one-character q answers no results and makes no outbound call", async () => {
  const response = await get("?q=b");
  expect(response.status).toBe(200);
  expect(await response.json()).toEqual({ ok: true, results: [] });
  expect(state.spend).toHaveBeenCalledTimes(1);
  expect(state.upstream).not.toHaveBeenCalled();
});

it("GSR-4 a 121-character q is queryTooLong with its length", async () => {
  const response = await get(`?q=${"a".repeat(121)}`);
  expect(await response.json()).toEqual({
    ok: false,
    refusals: [{ field: "geocode", reason: "queryTooLong", detail: "121" }],
  });
  expect(state.upstream).not.toHaveBeenCalled();
});

it("GSR-5 a second identical q is served from the cache", async () => {
  state.upstream.mockResolvedValue(json([{ lat: "8.98", lon: "38.79", display_name: "Bole" }]));
  const first = await get("?q=Bole");
  expect(await first.json()).toEqual({
    ok: true,
    results: [{ label: "Bole", lat: 8.98, lng: 38.79 }],
  });
  expect(first.headers.get("Cache-Control")).toBe("no-store");
  const second = await get("?q=bole");
  expect(await second.json()).toEqual({
    ok: true,
    results: [{ label: "Bole", lat: 8.98, lng: 38.79 }],
    cached: true,
  });
  expect(state.upstream).toHaveBeenCalledTimes(1);
});

it("GSR-6 a null from nominatim is geocoderUnavailable and the next request asks again", async () => {
  state.upstream.mockResolvedValue(new Response("down", { status: 503 }));
  const first = await get("?q=bole");
  expect(await first.json()).toEqual({
    ok: false,
    refusals: [{ field: "geocode", reason: "geocoderUnavailable" }],
  });
  await get("?q=bole");
  expect(state.upstream).toHaveBeenCalledTimes(2);
});
