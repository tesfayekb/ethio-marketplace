import { createHash } from "node:crypto";

import { beforeEach, describe, expect, it, vi } from "vitest";

/**
 * DEC-474 Part F — POST /api/error-reports on defineRoute: the byte ceiling, the address dial
 * spent before the body is read, the strict shape, the server's own cleaning, the one write.
 */

const mocks = vi.hoisted(() => ({
  rate: vi.fn(),
  rpc: vi.fn(),
  caller: vi.fn(),
}));
vi.mock("@/server/supabase/user-client", async (original) => ({
  ...(await original<typeof import("@/server/supabase/user-client")>()),
  consumeRate: mocks.rate,
  userClientFromRequest: mocks.caller,
  anonymousClient: () => null,
  envDial: (_name: string, fallback: number) => fallback,
}));
vi.mock("@/integrations/supabase/client.server", () => ({ supabaseAdmin: { rpc: mocks.rpc } }));

type Handler = (c: { request: Request; params: unknown }) => Promise<Response>;
const { Route } = (await import("./error-reports")) as { Route: { options: unknown } };
const POST = (Route.options as { server: { handlers: { POST: Handler } } }).server.handlers.POST;

const ADDRESS = "192.0.2.7";
const REPORT = {
  kind: "notice",
  code: "500",
  message: "Read failed",
  place: "/assets/index-Ab12.js:42",
  path: "/l/some-ad",
  browser: "Chrome",
  engine: "Blink",
  browserVersion: "131.0",
  device: "phone",
  language: "am",
  appVersion: null,
};

function request(body: string, headers: Record<string, string> = {}): Request {
  return new Request("http://local/api/error-reports", {
    method: "POST",
    headers: { "content-type": "application/json", "cf-connecting-ip": ADDRESS, ...headers },
    body,
  });
}

function post(body: unknown, headers?: Record<string, string>): Promise<Response> {
  return POST({ request: request(JSON.stringify(body), headers), params: {} });
}

/** The rpc's builder: `.rpc(name, args).abortSignal(signal)` answers the write. */
function writes(answer: { error: { code?: string; message: string } | null }) {
  mocks.rpc.mockImplementation(() => ({
    abortSignal: () => Promise.resolve({ data: null, ...answer }),
  }));
}

beforeEach(() => {
  vi.clearAllMocks();
  mocks.rate.mockResolvedValue({ allowed: true, resetsAt: null, remaining: 59 });
  mocks.caller.mockResolvedValue({
    supabase: null,
    userId: null,
    reason: "notSignedIn",
    message: "",
  });
  writes({ error: null });
});

describe("POST /api/error-reports (DEC-474 Part F)", () => {
  it("ERRO-1 a report in shape spends the address dial once, by the hashed address, and is written once, signed out", async () => {
    const response = await post(REPORT);
    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({ recorded: true });
    expect(mocks.rate).toHaveBeenCalledTimes(1);
    expect(mocks.rate).toHaveBeenCalledWith(
      "error-report:address",
      createHash("sha256").update(ADDRESS).digest("hex"),
      60,
      "3600 seconds",
    );
    expect(mocks.rpc).toHaveBeenCalledTimes(1);
    expect(mocks.rpc).toHaveBeenCalledWith("record_error_report", {
      p_kind: "notice",
      p_code: "500",
      p_message: "Read failed",
      p_place: "/assets/index-Ab12.js:42",
      p_path: "/l/some-ad",
      p_browser: "Chrome",
      p_engine: "Blink",
      p_browser_version: "131.0",
      p_device: "phone",
      p_language: "am",
      p_app_version: null,
      p_signed_in: false,
    });
  });

  it("ERRO-2 a body over the ceiling by its header is refused 413 before the caller, the dial or a read", async () => {
    const response = await post(REPORT, { "content-length": "5000" });
    expect(response.status).toBe(413);
    expect(mocks.rate).not.toHaveBeenCalled();
    expect(mocks.rpc).not.toHaveBeenCalled();
  });

  it("ERRO-3 a body over the ceiling with no header is refused 413 by the counting reader: the dial once, no write", async () => {
    const big = JSON.stringify({ ...REPORT, message: "x ".repeat(3000) });
    const response = await POST({ request: request(big), params: {} });
    expect(response.status).toBe(413);
    expect(mocks.rate).toHaveBeenCalledTimes(1);
    expect(mocks.rpc).not.toHaveBeenCalled();
  });

  it("ERRO-4 a spent dial answers 429 and writes nothing", async () => {
    mocks.rate.mockResolvedValue({
      allowed: false,
      resetsAt: "2026-11-27T01:00:00Z",
      remaining: 0,
    });
    const response = await post(REPORT);
    expect(response.status).toBe(429);
    expect(await response.json()).toEqual({
      error: "rateLimited",
      resetsAt: "2026-11-27T01:00:00Z",
    });
    expect(mocks.rpc).not.toHaveBeenCalled();
  });

  it("ERRO-5 a refused report (a server kind, an unknown key, not JSON) spends the dial once and writes nothing", async () => {
    for (const body of [
      JSON.stringify({ ...REPORT, kind: "route" }),
      JSON.stringify({ ...REPORT, signedIn: true }),
      "not json",
    ]) {
      vi.clearAllMocks();
      mocks.rate.mockResolvedValue({ allowed: true, resetsAt: null, remaining: 59 });
      const response = await POST({ request: request(body), params: {} });
      expect(response.status).toBe(400);
      expect(mocks.rate).toHaveBeenCalledTimes(1);
      expect(mocks.rpc).not.toHaveBeenCalled();
    }
  });

  it("ERRO-6 a failed write answers 503 and is logged once as [error-report] write failed", async () => {
    writes({ error: { code: "PGRST000", message: "Database connection error." } });
    const log = vi.spyOn(console, "error").mockImplementation(() => undefined);
    const response = await post(REPORT);
    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({ error: "reportNotRecorded" });
    expect(
      log.mock.calls.filter(([first]) => first === "[error-report] write failed"),
    ).toHaveLength(1);
    log.mockRestore();
  });

  it("ERRO-7 a verified caller is written signed in; a refused bearer is refused 401 before the dial", async () => {
    mocks.caller.mockResolvedValue({ supabase: {}, userId: "u-1", reason: null, message: "" });
    await post(REPORT, { Authorization: "Bearer stub" });
    expect(mocks.rpc.mock.calls[0]?.[1]).toMatchObject({ p_signed_in: true });

    vi.clearAllMocks();
    mocks.caller.mockResolvedValue({
      supabase: null,
      userId: null,
      reason: "notSignedIn",
      message: "",
    });
    const refused = await post(REPORT, { Authorization: "Bearer stale" });
    expect(refused.status).toBe(401);
    expect(mocks.rate).not.toHaveBeenCalled();
    expect(mocks.rpc).not.toHaveBeenCalled();
  });

  it("ERRO-8 the server cleans again: an e-mail in the message, an address in the path, a place that is no frame", async () => {
    await post({
      ...REPORT,
      message: "Read failed for someone@example.com",
      path: "/admin/users/203.0.113.7",
      place: "not a frame",
    });
    expect(mocks.rpc.mock.calls[0]?.[1]).toMatchObject({
      p_message: "Read failed for <email>",
      p_path: "/admin/users/<address>",
      p_place: null,
    });
  });
});
