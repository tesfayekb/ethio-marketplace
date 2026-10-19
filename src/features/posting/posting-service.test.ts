import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    auth: {
      getSession: async () => ({ data: { session: { access_token: "t" } }, error: null }),
    },
  },
}));

import { call, SAVE_TIMEOUT_MS, shapePostingSchema } from "./posting-service";

let afterEachRestore: () => void = () => {};

describe("call() — DEC-135 save timeout", () => {
  afterEach(() => {
    afterEachRestore();
    vi.useRealTimers();
    vi.unstubAllGlobals();
  });

  it("answers unreachable after SAVE_TIMEOUT_MS when the fetch never resolves", async () => {
    vi.useFakeTimers();
    // The runtime's own AbortSignal.timeout sits outside the fake clock; this
    // stand-in aborts on the faked setTimeout so the test controls the clock.
    const realTimeout = AbortSignal.timeout;
    const seen: number[] = [];
    AbortSignal.timeout = (ms: number) => {
      seen.push(ms);
      const controller = new AbortController();
      setTimeout(() => controller.abort(new DOMException("timed out", "TimeoutError")), ms);
      return controller.signal;
    };
    afterEachRestore = () => {
      AbortSignal.timeout = realTimeout;
    };
    vi.stubGlobal(
      "fetch",
      (_path: string, init: RequestInit) =>
        new Promise((_resolve, reject) => {
          init.signal?.addEventListener("abort", () =>
            reject(new DOMException("timed out", "TimeoutError")),
          );
        }),
    );
    const pending = call("/api/listings/draft", "{}", {});
    await vi.advanceTimersByTimeAsync(SAVE_TIMEOUT_MS);
    const answer = await pending;
    expect(answer.unreachable).toBe(true);
    expect(answer.ok).toBe(false);
    expect(seen).toEqual([SAVE_TIMEOUT_MS]);
  });
});

describe("shapePostingSchema — K5 failed read", () => {
  it("a payload without an attributes array is a failed read", () => {
    expect(shapePostingSchema({ category: {} })).toBeNull();
    expect(shapePostingSchema({ attributes: "x" })).toBeNull();
  });
  it("an empty attributes array is an empty list", () => {
    const schema = shapePostingSchema({ attributes: [] });
    expect(schema).not.toBeNull();
    expect(schema?.details).toBe(0);
  });
});

describe("the publish route's certification (bundle 22 turn 4)", () => {
  const ID = "0b9a6c1e-2f3d-4e5a-8b7c-9d0e1f2a3b4c";
  it("passes certified and language only when sent", async () => {
    const { readCertification } = await import("@/routes/api/listings/publish");
    expect(readCertification({ listingId: "x" })).toEqual({ ok: true, args: {} });
    expect(readCertification({ certified: [ID], language: "am" })).toEqual({
      ok: true,
      args: { p_certified: [ID], p_language: "am" },
    });
  });
  it("refuses a non-uuid entry, more than 20 entries and a long language", async () => {
    const { readCertification } = await import("@/routes/api/listings/publish");
    expect(readCertification({ certified: [ID, "not-a-uuid"] })).toEqual({
      ok: false,
      field: "certified",
    });
    expect(readCertification({ certified: Array.from({ length: 21 }, () => ID) })).toEqual({
      ok: false,
      field: "certified",
    });
    expect(readCertification({ certified: Array.from({ length: 20 }, () => ID) }).ok).toBe(true);
    expect(readCertification({ language: "x".repeat(11) })).toEqual({
      ok: false,
      field: "language",
    });
  });
  it("publishListing sends certified and language only when given", async () => {
    const { publishListing } = await import("./posting-service");
    const bodies: string[] = [];
    vi.stubGlobal(
      "fetch",
      vi.fn(async (_url: string, init: RequestInit) => {
        bodies.push(String(init.body));
        return new Response(JSON.stringify({ ok: true }), { status: 200 });
      }),
    );
    await publishListing("l-1");
    await publishListing("l-1", { certified: [ID], language: "en" });
    vi.unstubAllGlobals();
    expect(JSON.parse(bodies[0] ?? "{}")).toEqual({ listingId: "l-1" });
    expect(JSON.parse(bodies[1] ?? "{}")).toEqual({
      listingId: "l-1",
      certified: [ID],
      language: "en",
    });
  });
});
