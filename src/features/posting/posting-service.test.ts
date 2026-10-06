import { afterEach, describe, expect, it, vi } from "vitest";

vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    auth: {
      getSession: async () => ({ data: { session: { access_token: "t" } }, error: null }),
    },
  },
}));

import { call, SAVE_TIMEOUT_MS } from "./posting-service";

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
