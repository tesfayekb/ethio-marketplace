import { beforeEach, describe, expect, it, vi } from "vitest";

/**
 * Foundations turn 3 (DEC-237) — THE DOOR-CALL ENVELOPE (DC-1…DC-3).
 */

const state = { logs: [] as string[] };

vi.mock("@/server/supabase/user-client", () => {
  const routeJson = (body: unknown, status: number) =>
    new Response(JSON.stringify(body), {
      status,
      headers: { "Content-Type": "application/json; charset=utf-8", "Cache-Control": "no-store" },
    });
  return {
    routeJson,
    logRouteError: (path: string, message: unknown) => {
      state.logs.push(`${path} ${String(message)}`);
    },
    upstreamFailed: (error: { message?: string } | null, status: number) =>
      error !== null && (status === 0 || status >= 502),
    upstreamUnavailable: (path: string, what: string, status: number) => {
      state.logs.push(`${path} ${what}: upstream unavailable (${status})`);
      return routeJson({ error: "upstream unavailable" }, 503);
    },
    doorAnswer: (data: unknown) => ({ answered: data }),
  };
});

const { doorCall } = await import("@/server/door");

beforeEach(() => {
  state.logs = [];
});

describe("doorCall — the door-call envelope", () => {
  it("DC-1 a door never reached answers 503", async () => {
    const response = await doorCall("/api/x", async () => ({
      data: null,
      error: { message: "<html>Bad Gateway</html>" },
      status: 502,
    }));
    expect(response.status).toBe(503);
    expect(await response.json()).toEqual({ error: "upstream unavailable" });
    expect(state.logs).toEqual(["/api/x door: upstream unavailable (502)"]);
  });

  it("DC-2 a door error is logged and answers the verdict, through translate when it answers", async () => {
    const plain = await doorCall("/api/x", async () => ({
      data: null,
      error: { message: "notReady:photos" },
      status: 400,
    }));
    expect(plain.status).toBe(200);
    expect(await plain.json()).toEqual({
      ok: false,
      refusals: [{ field: "door", reason: "notReady:photos" }],
    });
    expect(state.logs).toEqual(["/api/x notReady:photos"]);

    const translated = await doorCall(
      "/api/x",
      async () => ({ data: null, error: { message: "listings_price_bp_check" }, status: 400 }),
      {
        translate: (message) =>
          message.includes("listings_price_bp_check")
            ? { field: "price_bp", reason: "commissionRange" }
            : null,
      },
    );
    expect(await translated.json()).toEqual({
      ok: false,
      refusals: [{ field: "price_bp", reason: "commissionRange" }],
    });
    // INC-368 — a translated refusal writes no log line.
    expect(state.logs).toHaveLength(1);

    const untranslated = await doorCall(
      "/api/x",
      async () => ({ data: null, error: { message: "other" }, status: 400 }),
      { translate: () => null },
    );
    expect(await untranslated.json()).toEqual({
      ok: false,
      refusals: [{ field: "door", reason: "other" }],
    });
    // An untranslated door error writes one.
    expect(state.logs).toEqual(["/api/x notReady:photos", "/api/x other"]);
  });

  it("DC-3 ok answers doorAnswer(data), or the raw data with raw", async () => {
    const shaped = await doorCall("/api/x", async () => ({
      data: { ok: true },
      error: null,
      status: 200,
    }));
    expect(shaped.status).toBe(200);
    expect(await shaped.json()).toEqual({ answered: { ok: true } });
    const raw = await doorCall(
      "/api/x",
      async () => ({ data: { ok: true }, error: null, status: 200 }),
      { raw: true },
    );
    expect(await raw.json()).toEqual({ ok: true });
    expect(state.logs).toEqual([]);
  });
});
