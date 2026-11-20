import { beforeEach, expect, it, vi } from "vitest";
const state = vi.hoisted(() => ({ caller: vi.fn(), rpc: vi.fn() }));
vi.mock("@/server/supabase/user-client", async (original) => ({
  ...(await original<typeof import("@/server/supabase/user-client")>()),
  userClientFromRequest: state.caller,
}));

beforeEach(() => {
  vi.resetModules();
  vi.clearAllMocks();
  state.caller.mockResolvedValue({
    supabase: { rpc: state.rpc },
    userId: "caller",
    reason: null,
    message: "",
  });
  state.rpc.mockImplementation(async (name: string) => ({
    data:
      name === "get_attribute_options_version_read" ? "v1" : { options: ["one"], version: "v1" },
    error: null,
    status: 200,
  }));
});
async function reader() {
  const { Route } = await import("./attributes.$id.options");
  return (
    Route.options as unknown as {
      server: {
        handlers: { GET: (ctx: { request: Request; params: { id: string } }) => Promise<Response> };
      };
    }
  ).server.handlers.GET;
}
const ID = "aaaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa";
const request = (tag?: string) =>
  new Request(`https://example.test/api/attributes/${ID}/options`, {
    headers: { Authorization: "Bearer test", ...(tag ? { "If-None-Match": tag } : {}) },
  });
it("ATO-1 missing bearer refuses before rpc", async () => {
  state.caller.mockResolvedValue({
    supabase: null,
    userId: null,
    reason: "missingBearer",
    message: "",
  });
  const get = await reader();
  const response = await get({ request: new Request("https://example.test"), params: { id: ID } });
  expect(response.status).toBe(401);
  expect(await response.json()).toEqual({ error: "missing bearer token" });
  expect(state.rpc).not.toHaveBeenCalled();
});
it("ATO-2 a deactivated caller refuses before rpc", async () => {
  state.caller.mockResolvedValue({
    supabase: null,
    userId: null,
    reason: "deactivated",
    message: "",
  });
  const get = await reader();
  const response = await get({ request: request(), params: { id: ID } });
  expect(response.status).toBe(403);
  expect(await response.json()).toEqual({ error: "account is deactivated" });
  expect(state.rpc).not.toHaveBeenCalled();
});
it("ATO-3 signed-in bad id refuses after caller before rpc", async () => {
  const get = await reader();
  const response = await get({ request: request(), params: { id: "bad-id" } });
  expect(response.status).toBe(404);
  expect(await response.json()).toEqual({ error: "unknown attribute" });
  expect(state.caller).toHaveBeenCalledTimes(1);
  expect(state.rpc).not.toHaveBeenCalled();
});
it("ATO-4 private 200 and conditional 304 keep their metadata", async () => {
  const get = await reader();
  for (const [tag, status] of [
    [undefined, 200],
    ['"attr-options-2-v1"', 304],
  ] as const) {
    const response = await get({ request: request(tag), params: { id: ID } });
    expect(response.status).toBe(status);
    expect(response.headers.get("ETag")).toBe('"attr-options-2-v1"');
    expect(response.headers.get("Cache-Control")).toBe(
      "private, max-age=60, stale-while-revalidate=300",
    );
    expect(response.headers.get("Vary")).toBe("Accept-Encoding");
    if (status === 304) expect(response.body).toBeNull();
    else expect(await response.json()).toEqual({ options: ["one"], version: "v1" });
  }
});
it("ATO-5 TTL hit skips version but checks caller twice", async () => {
  const get = await reader();
  expect((await get({ request: request(), params: { id: ID } })).status).toBe(200);
  expect((await get({ request: request(), params: { id: ID } })).status).toBe(200);
  expect(state.caller).toHaveBeenCalledTimes(2);
  expect(
    state.rpc.mock.calls.filter(([name]) => name === "get_attribute_options_version_read"),
  ).toHaveLength(1);
});
it("ATO-6 rateLimited is not cached", async () => {
  const get = await reader();
  state.rpc.mockImplementation(async (name: string) => ({
    data: name === "get_attribute_options_version_read" ? "v1" : null,
    error: name === "get_attribute_options" ? { message: "rateLimited" } : null,
    status: 400,
  }));
  for (let i = 0; i < 2; i += 1) {
    const response = await get({ request: request(), params: { id: ID } });
    expect(response.status).toBe(429);
    expect(await response.json()).toEqual({ error: "rateLimited" });
  }
  expect(
    state.rpc.mock.calls.filter(([name]) => name === "get_attribute_options_version_read"),
  ).toHaveLength(2);
});
it("ATO-7 the shell's refusals: attributeNotFound is a 404, rateLimited a 429 that is not cached, any other code a read failure", async () => {
  const get = await reader();
  const refuse = (message: string, status: number) =>
    state.rpc.mockImplementation(async (name: string) => ({
      data: name === "get_attribute_options_version_read" ? "v1" : null,
      error: name === "get_attribute_options" ? { message } : null,
      status,
    }));
  refuse("attributeNotFound", 400);
  const missing = await get({ request: request(), params: { id: ID } });
  expect(missing.status).toBe(404);
  expect(await missing.json()).toEqual({ error: "unknown attribute" });
  refuse("rateLimited", 429);
  const limited = await get({ request: request(), params: { id: ID } });
  expect(limited.status).toBe(429);
  expect(await limited.json()).toEqual({ error: "rateLimited" });
  // F1-7a — the gate's rateLimited carries the dial's reset instant; the route still answers 429.
  refuse("rateLimited:2026-11-19T20:05:12.123456+00:00", 429);
  const limitedWithTime = await get({ request: request(), params: { id: ID } });
  expect(limitedWithTime.status).toBe(429);
  expect(await limitedWithTime.json()).toEqual({ error: "rateLimited" });
  refuse("accountDeactivated", 403);
  const deactivated = await get({ request: request(), params: { id: ID } });
  expect([404, 429]).not.toContain(deactivated.status);
});
it("ATO-8 F1-7d — a refusal is read by its code: a sentence that only names one is a read failure, and a gate refusal answers at its own status (INC-1221)", async () => {
  const logged = vi.spyOn(console, "error").mockImplementation(() => undefined);
  try {
    const get = await reader();
    const refuse = (message: string, status: number) =>
      state.rpc.mockImplementation(async (name: string) => ({
        data: name === "get_attribute_options_version_read" ? "v1" : null,
        error: name === "get_attribute_options" ? { message } : null,
        status,
      }));
    refuse("attributeNotFound:option", 400);
    expect((await get({ request: request(), params: { id: ID } })).status).toBe(404);
    for (const message of ["no attributeNotFound here", "notRateLimited"]) {
      refuse(message, 500);
      expect((await get({ request: request(), params: { id: ID } })).status, message).toBe(500);
    }
    refuse("accountDeactivated", 403);
    const deactivated = await get({ request: request(), params: { id: ID } });
    expect(deactivated.status).toBe(403);
    expect(await deactivated.json()).toEqual({ error: "accountDeactivated" });
  } finally {
    logged.mockRestore();
  }
});
