import { beforeEach, describe, expect, it, vi } from "vitest";

/**
 * DEC-474 Part F — the server's own report of a failure it answered: written once, cleaned, never
 * outside a request, never for the report route itself, within its per-instance limits, and a
 * failed write is logged once and never thrown.
 */

const mocks = vi.hoisted(() => ({ rpc: vi.fn(), request: vi.fn(), abort: vi.fn() }));
vi.mock("@tanstack/react-start/server", () => ({ getRequest: mocks.request }));
vi.mock("@/integrations/supabase/client.server", () => ({ supabaseAdmin: { rpc: mocks.rpc } }));

const { reportServerFailure, resetServerLimits, SERVER_REPORTS_PER_MINUTE, WRITE_DEADLINE_MS } =
  await import("./error-reports");

function writes(answer: { error: { code?: string; message: string } | null }) {
  mocks.rpc.mockImplementation(() => ({
    abortSignal: (signal: AbortSignal) => {
      mocks.abort(signal);
      return Promise.resolve({ data: null, ...answer });
    },
  }));
}

function inRequest(headers: Record<string, string> = {}) {
  mocks.request.mockReturnValue(new Request("http://local/api/x", { headers }));
}

beforeEach(() => {
  vi.clearAllMocks();
  resetServerLimits();
  writes({ error: null });
  inRequest();
});

describe("the server's own error report (DEC-474 Part F)", () => {
  it("ERSV-1 outside a request (a unit test, a script) nothing is written", async () => {
    mocks.request.mockImplementation(() => {
      throw new Error("no request");
    });
    expect(await reportServerFailure("route", "/api/x", new Error("boom"))).toBe(false);
    expect(mocks.rpc).not.toHaveBeenCalled();
  });

  it("ERSV-2 a 500 is written once: kind, code, the cleaned message, our own frame, the path, whether a session rode", async () => {
    inRequest({ Authorization: "Bearer stub" });
    const error = new Error("Read of someone@example.com failed");
    error.stack = [
      "Error: Read of someone@example.com failed",
      "    at x (/app/node_modules/h3/dist/index.mjs:10:2)",
      "    at y (file:///var/task/src/server/route.ts:200:9)",
    ].join("\n");
    expect(await reportServerFailure("route", "/api/media/photo-links?x=1", error)).toBe(true);
    expect(mocks.rpc).toHaveBeenCalledTimes(1);
    expect(mocks.rpc).toHaveBeenCalledWith("record_error_report", {
      p_kind: "route",
      p_code: "500",
      p_message: "Read of <email> failed",
      p_place: "src/server/route.ts:200",
      p_path: "/api/media/photo-links",
      p_browser: null,
      p_engine: null,
      p_browser_version: null,
      p_device: null,
      p_language: null,
      p_app_version: null,
      p_signed_in: true,
    });
  });

  it("ERSV-3 an auth server failure is written as upstream 503, a sentence with no frame", async () => {
    expect(await reportServerFailure("upstream", "/api/x", "auth upstream unavailable (500)")).toBe(
      true,
    );
    expect(mocks.rpc.mock.calls[0]?.[1]).toMatchObject({
      p_kind: "upstream",
      p_code: "503",
      p_message: "auth upstream unavailable (500)",
      p_place: null,
      p_signed_in: false,
    });
  });

  it("ERSV-4 the report route's own failure is never reported", async () => {
    expect(await reportServerFailure("route", "/api/error-reports", new Error("boom"))).toBe(false);
    expect(mocks.rpc).not.toHaveBeenCalled();
  });

  it("ERSV-5 the same failure is written once a minute, and at most the minute's limit in all", async () => {
    // One place: the same failure is the same kind, code, message and frame.
    const same = () => new Error("same");
    await reportServerFailure("route", "/api/x", same());
    await reportServerFailure("route", "/api/x", same());
    expect(mocks.rpc).toHaveBeenCalledTimes(1);
    for (let n = 0; n < SERVER_REPORTS_PER_MINUTE + 5; n += 1)
      await reportServerFailure("route", "/api/x", new Error(`other ${n}`));
    expect(mocks.rpc).toHaveBeenCalledTimes(SERVER_REPORTS_PER_MINUTE);
  });

  it("ERSV-6 a failed or thrown write is logged once and resolves false, never thrown", async () => {
    const log = vi.spyOn(console, "error").mockImplementation(() => undefined);
    writes({ error: { code: "PGRST000", message: "Database connection error." } });
    expect(await reportServerFailure("route", "/api/x", new Error("one"))).toBe(false);
    mocks.rpc.mockImplementation(() => {
      throw new Error("client missing");
    });
    expect(await reportServerFailure("route", "/api/x", new Error("two"))).toBe(false);
    expect(log.mock.calls.map(([first]) => first)).toEqual([
      "[error-report] write failed",
      "[error-report] write failed",
    ]);
    log.mockRestore();
  });

  it("ERSV-7 the write ends within its deadline", async () => {
    const timeout = vi.spyOn(AbortSignal, "timeout");
    await reportServerFailure("route", "/api/x", new Error("late"));
    expect(timeout).toHaveBeenCalledWith(WRITE_DEADLINE_MS);
    expect(mocks.abort.mock.calls[0]?.[0]).toBeInstanceOf(AbortSignal);
    timeout.mockRestore();
  });
});
