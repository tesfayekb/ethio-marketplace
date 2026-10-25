import { beforeEach, describe, expect, it, vi } from "vitest";

const state = vi.hoisted(() => ({ staff: true, known: true, reads: 0 }));
const provider = vi.hoisted(() => vi.fn());
vi.mock("@tanstack/react-router", () => ({ createFileRoute: () => (options: unknown) => options }));
vi.mock("@/server/supabase/user-client", () => ({
  userClientFromRequest: async () => ({
    userId: "staff-1",
    supabase: {
      from: (table: string) => {
        state.reads += 1;
        const chain = {
          select: () => chain,
          eq: () => chain,
          not: () => chain,
          order: () => chain,
          limit: () => chain,
          maybeSingle: async () => ({
            data: table === "categories" && state.known ? { id: ID, name_en: "Sofas" } : null,
            error: null,
          }),
        };
        return chain;
      },
    },
  }),
  refuseUserClient: () => null,
  callerHasPermission: async () => state.staff,
  logRouteError: () => undefined,
}));
vi.mock("@/server/ai/gateway", () => ({
  aiCall: provider,
  renderTask: () => "rendered house prompt",
}));

const ID = "11111111-1111-4111-8111-111111111111";
const { Route } = await import("./generate-image");
function handlersOf(value: unknown): {
  POST: (ctx: { request: Request }) => Promise<Response>;
  GET: (ctx: { request: Request }) => Promise<Response>;
} {
  if (typeof value !== "object" || value === null || !("server" in value))
    throw new Error("route missing");
  const server = value.server;
  if (typeof server !== "object" || server === null || !("handlers" in server))
    throw new Error("handlers missing");
  const handlers = server.handlers;
  if (
    typeof handlers !== "object" ||
    handlers === null ||
    !("POST" in handlers) ||
    !("GET" in handlers)
  )
    throw new Error("methods missing");
  const post = handlers.POST;
  const get = handlers.GET;
  if (typeof post !== "function" || typeof get !== "function")
    throw new Error("methods not callable");
  return { POST: async (ctx) => post(ctx), GET: async (ctx) => get(ctx) };
}
const handlers = handlersOf(Route);
function post(body: unknown = { categoryId: ID }) {
  return handlers.POST({
    request: new Request("http://local/api/admin/categories/generate-image", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    }),
  });
}
function probe() {
  return handlers.GET({
    request: new Request(
      `http://local/api/admin/categories/generate-image?probe=1&categoryId=${ID}`,
    ),
  });
}
beforeEach(() => {
  state.staff = true;
  state.known = true;
  state.reads = 0;
  provider.mockReset();
});
describe("category image staff boundary", () => {
  it("CIR-1 non-staff is refused before reads or the gateway", async () => {
    state.staff = false;
    const response = await post();
    expect(response.status).toBe(403);
    expect(await response.json()).toEqual({ error: "forbidden" });
    expect(state.reads).toBe(0);
    expect(provider).not.toHaveBeenCalled();
  });
  it("CIR-2 unknown category is 404 before the gateway", async () => {
    state.known = false;
    const response = await post();
    expect(response.status).toBe(404);
    expect(await response.json()).toEqual({ error: "category not found" });
    expect(provider).not.toHaveBeenCalled();
  });
  it("CIR-3 switch-off and unreadable retain switched-off status", async () => {
    for (const [reason, status, word] of [
      ["featureOff", 409, "staff"],
      ["unavailable", 503, "unavailable"],
    ] as const) {
      provider.mockResolvedValue({ ok: false, reason });
      const response = await post();
      expect(response.status).toBe(status);
      expect(await response.json()).toEqual({
        error: `AI feature category_images is off (${word})`,
        stage: "switched-off",
      });
    }
  });
  it("CIR-4 provider status maps to fixed words without provider text", async () => {
    for (const [status, expectedStatus, error] of [
      [429, 429, "modelRateLimited"],
      [500, 502, "server error"],
    ] as const) {
      provider.mockResolvedValue({
        ok: false,
        reason: "providerError",
        status,
        message: "secret provider marker",
      });
      const response = await post();
      expect(response.status).toBe(expectedStatus);
      expect(await response.json()).toEqual({ error, stage: "model-call" });
    }
  });
  it("CIR-5 probe returns bytes, measured type and latency; failure contains no provider text", async () => {
    const image = new Uint8Array([137, 80, 78, 71]);
    provider.mockResolvedValue({
      ok: true,
      value: { bytes: image, mime: "image/png" },
      latencyMs: 17,
      fake: false,
    });
    const response = await probe();
    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toBe("image/png");
    expect(response.headers.get("x-gen-ms")).toBe("17");
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(new Uint8Array(await response.arrayBuffer())).toEqual(image);
    provider.mockResolvedValue({
      ok: false,
      reason: "providerError",
      status: 500,
      message: "secret provider marker",
    });
    const failed = await probe();
    expect(failed.status).toBe(502);
    expect(await failed.json()).toEqual({ error: "server error", stage: "model-call" });
  });
  it("CIR-6 customPrompt is refused before reads and gateway", async () => {
    const response = await post({ categoryId: ID, customPrompt: "override" });
    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({ error: "invalid categoryId" });
    expect(state.reads).toBe(0);
    expect(provider).not.toHaveBeenCalled();
  });
});
