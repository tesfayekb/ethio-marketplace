import { beforeEach, expect, it, vi } from "vitest";

const state = vi.hoisted(() => ({ search: vi.fn() }));
vi.mock("@/server/supabase/user-client", async (original) => ({
  ...(await original<typeof import("@/server/supabase/user-client")>()),
  anonymousClient: () => ({}),
}));
vi.mock("@/server/catalog-find.server", async (original) => ({
  ...(await original<typeof import("@/server/catalog-find.server")>()),
  catalogSearch: state.search,
}));

type Handler = (ctx: { request: Request; params: unknown }) => Promise<Response>;
async function get(query: string): Promise<Response> {
  const { Route } = (await import("./catalog.find")) as { Route: { options: unknown } };
  const GET = (Route.options as { server: { handlers: { GET: Handler } } }).server.handlers.GET;
  return GET({ request: new Request(`https://example.test/api/catalog/find${query}`), params: {} });
}

beforeEach(() => {
  vi.clearAllMocks();
  state.search.mockResolvedValue({ rows: [{ id: "r" }], timing: { find: 1.25 } });
});

it("CFR-1 q=a is 400 bad query and searches nothing", async () => {
  const response = await get("?q=a");
  expect(response.status).toBe(400);
  expect(await response.json()).toEqual({ error: "bad query" });
  expect(response.headers.get("Cache-Control")).toBe("no-store");
  expect(state.search).not.toHaveBeenCalled();
});

it("CFR-2 lang=engl is 400 (langCodeLoose capped at three is ^[a-z]{2,3}$)", async () => {
  expect((await get("?q=car&lang=engl")).status).toBe(400);
  expect((await get("?q=car&lang=e")).status).toBe(400);
  expect((await get("?q=car&lang=e-gb")).status).toBe(400);
  expect((await get("?q=car&lang=")).status).toBe(400);
  expect(state.search).not.toHaveBeenCalled();
  expect((await get("?q=car&lang=tir")).status).toBe(200);
});

it("CFR-3 a padded upper-case lang is accepted and lower-cased; q is trimmed", async () => {
  expect((await get("?q=%20car%20&lang=%20AM%20")).status).toBe(200);
  expect(state.search).toHaveBeenCalledWith(expect.any(Request), "car", "am");
  await get("?q=car");
  expect(state.search).toHaveBeenLastCalledWith(expect.any(Request), "car", "en");
});

it("CFR-4 a null search is 429 rateLimited", async () => {
  state.search.mockResolvedValue(null);
  const response = await get("?q=car");
  expect(response.status).toBe(429);
  expect(await response.json()).toEqual({ error: "rateLimited" });
});

it("CFR-5 a 200 carries Server-Timing and the public max-age", async () => {
  const response = await get("?q=car");
  expect(response.status).toBe(200);
  expect(await response.json()).toEqual({ ok: true, results: [{ id: "r" }] });
  expect(response.headers.get("Content-Type")).toBe("application/json; charset=utf-8");
  expect(response.headers.get("Cache-Control")).toBe("public, max-age=60");
  expect(response.headers.get("Server-Timing")).toBe("search;dur=1.3, rebuild;dur=0.0");
});
