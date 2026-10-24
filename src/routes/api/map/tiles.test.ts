import { afterEach, beforeEach, expect, it, vi } from "vitest";

const state = vi.hoisted(() => ({ spend: vi.fn() }));
vi.mock("@/server/dials", async (original) => ({
  ...(await original<typeof import("@/server/dials")>()),
  spend: state.spend,
}));

type Handler = (ctx: { request: Request; params: unknown }) => Promise<Response>;
async function handlers(): Promise<{ GET: Handler; POST: Handler }> {
  const { Route } = (await import("./tiles")) as { Route: { options: unknown } };
  return (Route.options as { server: { handlers: { GET: Handler; POST: Handler } } }).server
    .handlers;
}
const URL_ = "https://example.test/api/map/tiles";
const post = (body: string) =>
  new Request(URL_, { method: "POST", headers: { "content-type": "application/json" }, body });

let warn: ReturnType<typeof vi.spyOn>;
beforeEach(() => {
  vi.clearAllMocks();
  delete process.env["ESRI_API_KEY"];
  warn = vi.spyOn(console, "warn").mockImplementation(() => undefined);
  state.spend.mockResolvedValue({ allowed: true, remaining: 59, resetsAt: null });
});
afterEach(() => {
  delete process.env["ESRI_API_KEY"];
  vi.restoreAllMocks();
});

it("TIL-1 no key answers the OSM plan with private, max-age=3600", async () => {
  const response = await (await handlers()).GET({ request: new Request(URL_), params: {} });
  expect(response.status).toBe(200);
  expect(response.headers.get("Cache-Control")).toBe("private, max-age=3600");
  const plan = (await response.json()) as { provider: string; street: Array<{ url: string }> };
  expect(plan.provider).toBe("osm");
  expect(plan.street[0]?.url).toBe("https://tile.openstreetmap.org/{z}/{x}/{y}.png");
});

it("TIL-2 a key answers the Esri plan", async () => {
  process.env["ESRI_API_KEY"] = "k e y";
  const response = await (await handlers()).GET({ request: new Request(URL_), params: {} });
  const plan = (await response.json()) as { provider: string; satellite: Array<{ url: string }> };
  expect(plan.provider).toBe("esri");
  expect(plan.satellite[0]?.url).toContain("?token=k%20e%20y");
});

it("TIL-3 a POST with a non-JSON body is ok:false with no dial and no line (CHANGE 4)", async () => {
  const response = await (await handlers()).POST({ request: post("not-json"), params: {} });
  expect(response.status).toBe(200);
  expect(await response.json()).toEqual({ ok: false });
  expect(response.headers.get("Cache-Control")).toBe("no-store");
  expect(state.spend).not.toHaveBeenCalled();
  expect(warn).not.toHaveBeenCalled();
});

it("TIL-4 a spent dial is ok:false and writes no warn line", async () => {
  state.spend.mockResolvedValue({ allowed: false, remaining: 0, resetsAt: null });
  const { POST } = await handlers();
  const response = await POST({ request: post(JSON.stringify({ reason: "error" })), params: {} });
  expect(await response.json()).toEqual({ ok: false });
  expect(state.spend).toHaveBeenCalledTimes(1);
  expect(warn).not.toHaveBeenCalled();
  state.spend.mockResolvedValue({ allowed: true, remaining: 1, resetsAt: null });
  const okay = await POST({ request: post(JSON.stringify({ reason: "Bad Token!" })), params: {} });
  expect(await okay.json()).toEqual({ ok: true });
  expect(warn).toHaveBeenCalledWith("[map] fallback provider=osm reason=unknown");
});
