import { beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Bundle 2 step 18 — the route returns the fallback icon with fallback: true
 * for an off-list answer, and fallback: false for a listed one.
 */
const answer = { value: "" as unknown };
/** When set, the model call throws a GeminiError with this message and status. */
const thrown = { value: null as { message: string; status: number } | null };
/** D158 — the switch the route asks first, and the meter it writes. */
const meter = { gate: { on: true } as { on: boolean; reason?: string }, spent: [] as string[] };
const asked = { count: 0 };

vi.mock("@/server/supabase/user-client", () => ({
  userClientFromRequest: async () => ({ supabase: {}, userId: "staff-1" }),
  refuseUserClient: () => null,
  callerHasPermission: async () => true,
  logRouteError: () => undefined,
  routeJson: (body: unknown, status: number) =>
    new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } }),
}));
vi.mock("@/server/ai/meter", () => ({
  aiGate: async () => meter.gate,
  recordAiSpend: async (feature: string) => {
    meter.spent.push(feature);
  },
}));
vi.mock("@/server/ai/gateway", () => {
  return {
    aiCall: async () => {
      if (!meter.gate.on)
        return {
          ok: false,
          reason: meter.gate.reason === "staff" ? "featureOff" : meter.gate.reason,
        };
      asked.count += 1;
      if (thrown.value !== null)
        return { ok: false, reason: "providerError", status: thrown.value.status };
      meter.spent.push("category_icons");
      return { ok: true, value: { icon: answer.value }, fake: false };
    },
  };
});

const { Route } = await import("@/routes/api/admin/categories/suggest-icon");

async function post(): Promise<Response> {
  const handlers = (
    Route.options as unknown as {
      server: { handlers: { POST: (ctx: { request: Request }) => Promise<Response> } };
    }
  ).server.handlers;
  return handlers.POST({
    request: new Request("http://local/api/admin/categories/suggest-icon", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name: "Sofas & armchairs", parentName: "Furniture" }),
    }),
  });
}

async function call(): Promise<Record<string, unknown>> {
  const handlers = (
    Route.options as unknown as {
      server: { handlers: { POST: (ctx: { request: Request }) => Promise<Response> } };
    }
  ).server.handlers;
  const request = new Request("http://local/api/admin/categories/suggest-icon", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ name: "Sofas & armchairs", parentName: "Furniture" }),
  });
  const response = await handlers.POST({ request });
  expect(response.status).toBe(200);
  return (await response.json()) as Record<string, unknown>;
}

describe("POST /api/admin/categories/suggest-icon (bundle 2 step 18)", () => {
  beforeEach(() => {
    answer.value = "";
    thrown.value = null;
    meter.gate = { on: true };
    meter.spent = [];
    asked.count = 0;
  });
  it("a listed answer returns that icon with fallback: false", async () => {
    answer.value = "Sofa";
    expect(await call()).toEqual({ icon: "Sofa", fallback: false, fake: false });
  });
  it.each(["NotARealIcon", "", 42])(
    "an off-list answer (%s) returns Package with fallback: true",
    async (raw) => {
      answer.value = raw;
      expect(await call()).toEqual({ icon: "Package", fallback: true, fake: false });
    },
  );

  it("AIM-5 switched off, the route answers 409 and asks nothing; on, one answer is metered (D158)", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    meter.gate = { on: false, reason: "budget" };
    const off = await post();
    expect(off.status).toBe(409);
    expect(await off.json()).toEqual({
      error: "AI feature category_icons is off (budget)",
      stage: "switched-off",
    });
    meter.gate = { on: false, reason: "unavailable" };
    expect((await post()).status).toBe(503);
    expect(asked.count).toBe(0);
    expect(meter.spent).toEqual([]);

    meter.gate = { on: true };
    answer.value = "Sofa";
    expect(await call()).toEqual({ icon: "Sofa", fallback: false, fake: false });
    expect(asked.count).toBe(1);
    expect(meter.spent).toEqual(["category_icons"]);
  });

  it("INC-804 a provider refusal replies a fixed code and no detail", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    thrown.value = { message: "marker-text-that-must-not-travel", status: 400 };
    const response = await post();
    expect(response.status).toBe(400);
    const text = await response.text();
    expect(JSON.parse(text)).toEqual({ error: "modelRefused" });
    expect(text).not.toContain("marker-text-that-must-not-travel");
  });

  it("INC-804 a provider rate limit keeps its status and its fixed code", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    thrown.value = { message: "quota exceeded for the day", status: 429 };
    const response = await post();
    expect(response.status).toBe(429);
    expect(await response.json()).toEqual({ error: "modelRateLimited" });
  });
});
