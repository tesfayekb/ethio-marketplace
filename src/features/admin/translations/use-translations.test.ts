import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import { createElement, type ReactNode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { CALL_DEADLINES_MS } from "@/lib/call-deadline";

import { useUsageMap } from "./use-translations";

/**
 * INC-1304 (cursor-bundle-8a) — the "used on" map, a static asset, is read under its class's
 * deadline (src/lib/call-deadline.ts): the fetch carries the deadline's signal, and a read that
 * runs past it fails as the network's failure, never hangs.
 */
function wrapper({ children }: { children: ReactNode }) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return createElement(QueryClientProvider, { client }, children);
}

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("useUsageMap (INC-1304)", () => {
  it("UTU-1 the map is read with the deadline's signal and answers its keys", async () => {
    const fetchSpy = vi.fn(
      async (_input: string, _init?: RequestInit) =>
        new Response(JSON.stringify({ keys: { "a.b": ["src/x.tsx"] } }), { status: 200 }),
    );
    vi.stubGlobal("fetch", fetchSpy);
    const { result } = renderHook(() => useUsageMap(), { wrapper });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual({ "a.b": ["src/x.tsx"] });
    expect(fetchSpy).toHaveBeenCalledTimes(1);
    const [input, init] = fetchSpy.mock.calls[0] ?? [];
    expect(input).toBe("/i18n-usage.json");
    expect(init?.signal).toBeInstanceOf(AbortSignal);
    expect(init?.headers).toEqual({ Accept: "application/json" });
  });

  it("UTU-2 a read that runs past the read class's deadline fails, never hangs", async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    vi.stubGlobal(
      "fetch",
      vi.fn(
        (_input: string, init?: RequestInit) =>
          new Promise<Response>((_resolve, reject) => {
            init?.signal?.addEventListener("abort", () => reject(init.signal?.reason));
          }),
      ),
    );
    const { result } = renderHook(() => useUsageMap(), { wrapper });
    // The hook's own one retry runs past the deadline too.
    await vi.advanceTimersByTimeAsync(2 * CALL_DEADLINES_MS.read + 2_000);
    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(String(result.current.error)).toContain("deadline");
  });

  it("UTU-3 a refused read is a failure, never an empty map", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => new Response("", { status: 404 })),
    );
    const { result } = renderHook(() => useUsageMap(), { wrapper });
    await waitFor(() => expect(result.current.isError).toBe(true), { timeout: 4_000 });
    expect(result.current.data).toBeUndefined();
  });
});
