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
  const { Route } = (await import("./reverse")) as { Route: { options: unknown } };
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

const BAD = { ok: false, refusals: [{ field: "geocode", reason: "badCoordinates" }] };

it("GRV-1 a missing lat is badCoordinates and makes no outbound call", async () => {
  const response = await get("?lng=38.79");
  expect(await response.json()).toEqual(BAD);
  expect(await (await get("?lat=&lng=38.79")).json()).toEqual(BAD);
  expect(state.upstream).not.toHaveBeenCalled();
});

it("GRV-2 lat=91 is badCoordinates", async () => {
  expect(await (await get("?lat=91&lng=38.79")).json()).toEqual(BAD);
  expect(state.upstream).not.toHaveBeenCalled();
});

it("GRV-5 lat=abc is badCoordinates (NaN is not finite)", async () => {
  expect(await (await get("?lat=abc&lng=38.79")).json()).toEqual(BAD);
  expect(state.upstream).not.toHaveBeenCalled();
});

it("GRV-3 a valid pair answers the fake street and a second call is cached", async () => {
  process.env.E2E_FAKE_GEOCODE = "1";
  expect(await (await get("?lat=8.98&lng=38.79")).json()).toEqual({
    ok: true,
    street: "Bole, Addis Ababa, Ethiopia",
  });
  expect(await (await get("?lat=8.98001&lng=38.79001")).json()).toEqual({
    ok: true,
    street: "Bole, Addis Ababa, Ethiopia",
    cached: true,
  });
  expect(state.upstream).not.toHaveBeenCalled();
});

it("GRV-4 a 250-character upstream label is trimmed to 200", async () => {
  state.upstream.mockResolvedValue(json({ display_name: "s".repeat(250) }));
  const body = (await (await get("?lat=9&lng=38")).json()) as { street: string };
  expect(body.street).toBe("s".repeat(200));
});
