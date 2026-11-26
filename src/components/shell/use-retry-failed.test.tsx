import { QueryClient, QueryClientContext, QueryObserver } from "@tanstack/react-query";
import { renderHook } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it, vi, type Mock } from "vitest";

import { loadFailureReader } from "./failure-reason";
import { useRetryFailed } from "./use-retry-failed";

const answered = (status: number, message = "x") => Object.assign(new Error(message), { status });

/** A client holding one mounted failed read per error, each counting how often it ran. */
async function screen(errors: Record<string, Error>) {
  // The notice has drawn by the time Retry is pressed, so the reader of codes is here.
  await loadFailureReader();
  const client = new QueryClient();
  const reads: Record<string, Mock<() => Promise<never>>> = {};
  const stops: Array<() => void> = [];
  for (const [key, error] of Object.entries(errors)) {
    reads[key] = vi.fn<() => Promise<never>>().mockRejectedValue(error);
    const observer = new QueryObserver(client, {
      queryKey: [key],
      queryFn: reads[key],
      retry: false,
      staleTime: Number.POSITIVE_INFINITY,
    });
    stops.push(observer.subscribe(() => undefined));
    await observer.refetch().catch(() => undefined);
    reads[key].mockClear();
  }
  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientContext.Provider value={client}>{children}</QueryClientContext.Provider>
  );
  const { result } = renderHook(() => useRetryFailed(), { wrapper });
  return { reads, retry: () => result.current(), done: () => stops.forEach((stop) => stop()) };
}

describe("the failure notice's Retry reads again only what can succeed (INC-1288)", () => {
  it("RRF-1 a network and a server failure are read again; a refusal and an early rate refusal are not", async () => {
    const later = new Date(Date.now() + 60_000).toISOString();
    const { reads, retry, done } = await screen({
      network: new TypeError("Failed to fetch"),
      server: answered(500),
      refused: answered(403),
      gone: answered(404),
      rate: answered(429, `rateLimited:${later}`),
    });
    retry();
    await vi.waitFor(() => expect(reads.network).toHaveBeenCalledTimes(1));
    await vi.waitFor(() => expect(reads.server).toHaveBeenCalledTimes(1));
    expect(reads.refused).not.toHaveBeenCalled();
    expect(reads.gone).not.toHaveBeenCalled();
    expect(reads.rate).not.toHaveBeenCalled();
    done();
  });

  it("RRF-2 a rate refusal whose named time has passed is read again", async () => {
    const earlier = new Date(Date.now() - 60_000).toISOString();
    const { reads, retry, done } = await screen({ rate: answered(429, `rateLimited:${earlier}`) });
    retry();
    await vi.waitFor(() => expect(reads.rate).toHaveBeenCalledTimes(1));
    done();
  });
});
