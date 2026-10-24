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
  const { Route } = (await import("./outline")) as { Route: { options: unknown } };
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

const POLY = {
  type: "Polygon",
  coordinates: [
    [
      [38, 9],
      [39, 9],
      [39, 10],
      [38, 9],
    ],
  ],
};

it("GOL-1 a cached outline is answered without spending the dial", async () => {
  state.upstream.mockResolvedValue(json([{ geojson: POLY }]));
  await get("?q=Bole, ET");
  state.spend.mockClear();
  const second = await get("?q=bole, et");
  expect(await second.json()).toEqual({ ok: true, outline: POLY, cached: true });
  expect(state.spend).not.toHaveBeenCalled();
  expect(state.upstream).toHaveBeenCalledTimes(1);
});

it("GOL-2 a miss spends the dial once and answers with the week-long private cache", async () => {
  state.upstream.mockResolvedValue(json([{ geojson: POLY }]));
  const response = await get("?q=Bole, ET");
  expect(await response.json()).toEqual({ ok: true, outline: POLY });
  expect(response.headers.get("Cache-Control")).toBe("private, max-age=604800");
  expect(state.spend).toHaveBeenCalledTimes(1);
});

it("GOL-3 q=a is badQuery with no dial", async () => {
  expect(await (await get("?q=a")).json()).toEqual({
    ok: false,
    refusals: [{ field: "geocode", reason: "badQuery" }],
  });
  expect(state.spend).not.toHaveBeenCalled();
});

it("GOL-4 a spent dial is rateLimited, no outbound call, nothing cached", async () => {
  state.spend.mockResolvedValueOnce(SPENT);
  expect(await (await get("?q=Bole, ET")).json()).toEqual({
    ok: false,
    refusals: [{ field: "geocode", reason: "rateLimited", detail: SPENT.resetsAt }],
  });
  expect(state.upstream).not.toHaveBeenCalled();
  state.upstream.mockResolvedValue(json([{ geojson: POLY }]));
  expect(await (await get("?q=Bole, ET")).json()).toEqual({ ok: true, outline: POLY });
});
