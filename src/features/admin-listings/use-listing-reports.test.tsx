import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const rpc = vi.hoisted(() => vi.fn());
vi.mock("@/integrations/supabase/client", () => ({ supabase: { rpc } }));

import { ReaderError, readerFailure } from "@/lib/reader-failure";
import { useListingReports, useOpenReportCounts } from "./use-listing-reports";

function wrapper({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider
      client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}
    >
      {children}
    </QueryClientProvider>
  );
}

beforeEach(() => rpc.mockReset());

/**
 * DEC-429 — the staff report readers fail as one typed failure: a refused door call is a
 * `ReaderError` whose class is read from the door's mark, never a bare message.
 */
describe("the listing reports' readers", () => {
  it("LRP-1 a refused admin_open_report_counts is a typed failure classed by the mark", async () => {
    rpc.mockResolvedValueOnce({
      data: null,
      error: { message: "permissionDenied", code: "P0D01", status: 403 },
    });
    const { result } = renderHook(() => useOpenReportCounts(["l-1"], true), { wrapper });
    await waitFor(() => expect(result.current.isError).toBe(true));
    expect(result.current.error).toBeInstanceOf(ReaderError);
    expect(readerFailure(result.current.error)).toMatchObject({
      class: "refused",
      status: 403,
      message: "permissionDenied",
    });
  });

  it("LRP-2 a refused admin_listing_reports is a typed failure classed by the mark; its answer is read as before", async () => {
    rpc.mockResolvedValueOnce({
      data: null,
      error: { message: "notSignedIn", code: "P0D01", status: 401 },
    });
    const failed = renderHook(() => useListingReports("l-1", true), { wrapper });
    await waitFor(() => expect(failed.result.current.isError).toBe(true));
    expect(failed.result.current.error).toBeInstanceOf(ReaderError);
    expect(readerFailure(failed.result.current.error)).toMatchObject({ class: "auth" });

    rpc.mockResolvedValueOnce({
      data: [
        {
          id: "r-1",
          reason: "spam",
          note: null,
          status: "open",
          createdAt: "2026-11-01T00:00:00Z",
        },
      ],
      error: null,
    });
    const read = renderHook(() => useListingReports("l-2", true), { wrapper });
    await waitFor(() => expect(read.result.current.isSuccess).toBe(true));
    expect(read.result.current.data).toEqual([
      { id: "r-1", reason: "spam", note: null, status: "open", createdAt: "2026-11-01T00:00:00Z" },
    ]);
  });
});
