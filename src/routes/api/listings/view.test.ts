import { beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Foundations turn 3 (DEC-237) — THE VIEW COUNTER ON defineRoute (C3).
 */

const mocks = vi.hoisted(() => ({ rate: vi.fn(), rpc: vi.fn(), logged: vi.fn() }));
vi.mock("@/server/supabase/user-client", async (original) => ({
  ...(await original<typeof import("@/server/supabase/user-client")>()),
  consumeRate: mocks.rate,
  anonymousClient: () => null,
  logRouteError: mocks.logged,
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

  it("VWR-3 an ad removed before its counter's write answers its not-found, quietly", async () => {
    // INC-1134 — the counter's link to the ad fails (Postgres 23503): nothing was written.
    mocks.rpc.mockResolvedValue({
      data: null,
      error: { code: "23503", message: "insert or update violates foreign key constraint" },
      status: 409,
    });
    const errors = vi.spyOn(console, "error");
    const response = await post({ publicId: ID });
    expect(response.status).toBe(404);
    expect(await response.json()).toEqual({ error: "listingNotFound" });
    expect(mocks.rpc).toHaveBeenCalledOnce();
    expect(mocks.logged).not.toHaveBeenCalled();
    expect(errors).not.toHaveBeenCalled();
    errors.mockRestore();
  });

  it("VWR-4 another database error is logged and answers counted false, as before", async () => {
    mocks.rpc.mockResolvedValue({
      data: null,
      error: { code: "P0001", message: "rate key required" },
      status: 400,
    });
    const response = await post({ publicId: ID });
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ counted: false });
    // Positive control: the other-error branch was really taken (its error line, once).
    expect(mocks.rpc).toHaveBeenCalledOnce();
    expect(mocks.logged).toHaveBeenCalledExactlyOnceWith("/api/listings/view", "rate key required");
  });
});
