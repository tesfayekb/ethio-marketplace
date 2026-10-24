import { beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Foundations turn 3 (DEC-237) — THE VIEW COUNTER ON defineRoute (C3).
 */

const mocks = vi.hoisted(() => ({ rate: vi.fn(), rpc: vi.fn() }));
vi.mock("@/server/supabase/user-client", async (original) => ({
  ...(await original<typeof import("@/server/supabase/user-client")>()),
  consumeRate: mocks.rate,
  anonymousClient: () => null,
  logRouteError: () => undefined,
  envDial: (_name: string, fallback: number) => fallback,
}));
vi.mock("@/integrations/supabase/client.server", () => ({ supabaseAdmin: { rpc: mocks.rpc } }));

const { Route } = await import("@/routes/api/listings/view");
const ID = "2345678923";

function post(body: unknown): Promise<Response> {
  return (
    Route.options as unknown as {
      server: {
        handlers: { POST: (c: { request: Request; params: unknown }) => Promise<Response> };
      };
    }
  ).server.handlers.POST({
    request: new Request("http://local/api/listings/view", {
      method: "POST",
      headers: { "content-type": "application/json", "cf-connecting-ip": "192.0.2.7" },
      body: JSON.stringify(body),
    }),
    params: {},
  });
}

beforeEach(() => {
  vi.clearAllMocks();
  mocks.rate.mockResolvedValue({ allowed: true, resetsAt: null, remaining: 9 });
  mocks.rpc.mockResolvedValue({ data: true, error: null, status: 200 });
});

describe("POST /api/listings/view on defineRoute (C3)", () => {
  it("VWR-1 a malformed id and an empty body answer 400, and no dial or rpc", async () => {
    for (const body of [{ publicId: "nope" }, {}]) {
      const response = await post(body);
      expect(response.status).toBe(400);
      expect(await response.json()).toEqual({ error: "bad request" });
    }
    expect(mocks.rate).not.toHaveBeenCalled();
    expect(mocks.rpc).not.toHaveBeenCalled();
  });

  it("VWR-2 success answers counted true", async () => {
    const response = await post({ publicId: ID });
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ counted: true });
    expect(mocks.rpc).toHaveBeenCalledOnce();
  });
});
