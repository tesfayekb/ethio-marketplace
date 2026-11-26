import { afterEach, describe, expect, it, vi } from "vitest";
import {
  anySignal,
  CALL_DEADLINES_MS,
  classOfCall,
  deadlineFetch,
  fetchWithDeadline,
  UPLOAD_STALL_MS,
  watchUpload,
} from "./call-deadline";

/** A fetch that never answers and gives up with the signal's reason, as the platform's does. */
function stalled(): typeof fetch {
  return (_input, init) =>
    new Promise((_resolve, reject) => {
      init?.signal?.addEventListener("abort", () => reject(init.signal?.reason), { once: true });
    });
}

afterEach(() => {
  vi.useRealTimers();
});

describe("the one deadline of every browser call (DEC-477)", () => {
  it("CDL-1 a call that runs past its class's deadline fails as the network kind", async () => {
    vi.useFakeTimers();
    const read = fetchWithDeadline(stalled(), "https://p.example.invalid/rest/v1/t?select=*");
    const settled = read.then(
      () => "answered",
      (failure: unknown) => failure,
    );
    await vi.advanceTimersByTimeAsync(CALL_DEADLINES_MS.read - 1);
    let early = true;
    void settled.then(() => (early = false));
    await Promise.resolve();
    expect(early).toBe(true);
    await vi.advanceTimersByTimeAsync(1);
    expect(await settled).toBeInstanceOf(TypeError);
  });

  it("CDL-2 each class runs out at its own value; a write is not cut at a read's", async () => {
    vi.useFakeTimers();
    const outcome = async (method: string, url: string) => {
      const answer = fetchWithDeadline(stalled(), url, { method }).then(
        () => "answered",
        () => "failed",
      );
      return answer;
    };
    const write = outcome("POST", "https://p.example.invalid/rest/v1/rpc/f");
    const auth = outcome("POST", "https://p.example.invalid/auth/v1/token");
    let writeDone = false;
    void write.then(() => (writeDone = true));
    await vi.advanceTimersByTimeAsync(CALL_DEADLINES_MS.read + 1);
    expect(writeDone).toBe(false);
    await vi.advanceTimersByTimeAsync(CALL_DEADLINES_MS.auth - CALL_DEADLINES_MS.read);
    expect(await auth).toBe("failed");
    await vi.advanceTimersByTimeAsync(CALL_DEADLINES_MS.write);
    expect(await write).toBe("failed");
    expect(classOfCall("GET", "/api/x")).toBe("read");
    expect(classOfCall("PUT", "/api/x")).toBe("write");
  });

  it("CDL-3 the caller's own abort stays an abort; a deadline never rewrites it", async () => {
    const caller = new AbortController();
    const call = fetchWithDeadline(stalled(), "https://p.example.invalid/rest/v1/t", {
      signal: caller.signal,
    });
    caller.abort();
    const failure: unknown = await call.catch((error: unknown) => error);
    expect(failure).not.toBeInstanceOf(TypeError);
    expect(failure !== null && typeof failure === "object" && Reflect.get(failure, "name")).toBe(
      "AbortError",
    );
  });

  it("CDL-4 an answer inside the deadline is returned whole, with the caller's init", async () => {
    const seen: Array<RequestInit | undefined> = [];
    const answered: typeof fetch = async (_input, init) => {
      seen.push(init);
      return new Response("{}");
    };
    const response = await deadlineFetch(answered)("https://p.example.invalid/rest/v1/t", {
      method: "POST",
      headers: { a: "b" },
    });
    expect(response.status).toBe(200);
    expect(seen[0]?.method).toBe("POST");
    expect(seen[0]?.headers).toEqual({ a: "b" });
    expect(seen[0]?.signal).toBeInstanceOf(AbortSignal);
  });

  it("CDL-5 the signals together fall back to a wired controller where AbortSignal.any is missing", () => {
    const original = AbortSignal.any;
    Reflect.deleteProperty(AbortSignal, "any");
    try {
      const a = new AbortController();
      const b = new AbortController();
      const both = anySignal([a.signal, b.signal]);
      expect(both.aborted).toBe(false);
      b.abort(new Error("second"));
      expect(both.aborted).toBe(true);
      expect(both.reason).toEqual(new Error("second"));
    } finally {
      Object.defineProperty(AbortSignal, "any", { value: original, configurable: true });
    }
  });

  it("CDL-6 an upload fails on a stall, not on its length; its cap is the end", () => {
    vi.useFakeTimers();
    const expired = vi.fn();
    const watch = watchUpload(expired, 120_000);
    for (let moved = 0; moved < 4; moved += 1) {
      vi.advanceTimersByTime(UPLOAD_STALL_MS - 1);
      watch.touch();
    }
    expect(expired).not.toHaveBeenCalled();
    vi.advanceTimersByTime(UPLOAD_STALL_MS);
    expect(expired).toHaveBeenCalledTimes(1);
    const capped = vi.fn();
    const long = watchUpload(capped, 50_000);
    vi.advanceTimersByTime(UPLOAD_STALL_MS - 1);
    long.touch();
    vi.advanceTimersByTime(20_001);
    expect(capped).toHaveBeenCalledTimes(1);
    expect(vi.getTimerCount()).toBe(0);
  });
});
