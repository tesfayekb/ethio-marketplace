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

  it("DC-2 a door's code is not logged and reaches the client as its reason; a sentence is logged and answers doorError; translate answers first", async () => {
    // Ruling 4 (F1-5a) — a code is a known refusal (INC-368), with or without a detail.
    for (const code of ["notReady:photos", "rateLimited", "notYourListing", "other"]) {
      state.logs = [];
      const plain = await doorCall("/api/x", async () => ({
        data: null,
        error: { message: code },
        status: 400,
      }));
      expect(plain.status, code).toBe(200);
      expect(await plain.json(), code).toEqual({
        ok: false,
        refusals: [{ field: "door", reason: code }],
      });
      expect(state.logs, code).toEqual([]);
    }

    // A sentence no translate mapped is a server error: logged whole, answered as doorError
    // (with the constraint's name as detail when it names one).
    state.logs = [];
    const sentence = await doorCall("/api/x", async () => ({
      data: null,
      error: { message: "an unexpected sentence" },
      status: 400,
    }));
    expect(await sentence.json()).toEqual({
      ok: false,
      refusals: [{ field: "door", reason: "doorError" }],
    });
    expect(state.logs).toEqual(["/api/x an unexpected sentence"]);

    state.logs = [];
    const constraint = await doorCall("/api/x", async () => ({
      data: null,
      error: { message: 'violates check constraint "listings_x_check"' },
      status: 400,
    }));
    expect(await constraint.json()).toEqual({
      ok: false,
      refusals: [{ field: "door", reason: "doorError", detail: "listings_x_check" }],
    });
    expect(state.logs).toEqual(['/api/x violates check constraint "listings_x_check"']);

    state.logs = [];
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
    expect(state.logs).toHaveLength(0);

    // A translate that answers null leaves a code to the fallback (not logged) and a sentence
    // to it (logged).
    const untranslated = await doorCall(
      "/api/x",
      async () => ({
        data: null,
        error: { message: "illegalTransition:closed-reduced" },
        status: 400,
      }),
      { translate: () => null },
    );
    expect(await untranslated.json()).toEqual({
      ok: false,
      refusals: [{ field: "door", reason: "illegalTransition:closed-reduced" }],
    });
    expect(state.logs).toHaveLength(0);
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
