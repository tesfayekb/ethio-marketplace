import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, renderHook, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { fetchMyPermissions } from "./service";
import { usePermissions } from "./usePermissions";

vi.mock("./service", () => ({ fetchMyPermissions: vi.fn() }));

const fetchGrants = vi.mocked(fetchMyPermissions);

function wrapper() {
  const client = new QueryClient({ defaultOptions: { queries: { retryDelay: 0 } } });
  return ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
  );
}

afterEach(() => fetchGrants.mockReset());

describe("usePermissions (cursor-bundle-8c-3b, INC-1345)", () => {
  it("UPR-1 a failed read reports its error and `retry` reads again by the query's own refetch", async () => {
    fetchGrants.mockRejectedValue(new Error("down"));
    const { result } = renderHook(() => usePermissions(), { wrapper: wrapper() });
    await waitFor(() => expect(result.current.error).not.toBeNull());
    expect(result.current.permissions).toEqual([]);
    const reads = fetchGrants.mock.calls.length;

    fetchGrants.mockResolvedValue(["listings:view"]);
    act(() => result.current.retry());
    await waitFor(() => expect(result.current.permissions).toEqual(["listings:view"]));
    expect(result.current.error).toBeNull();
    expect(fetchGrants.mock.calls.length).toBeGreaterThan(reads);
  });

  it("UPR-2 `retry` keeps one identity across renders", async () => {
    fetchGrants.mockResolvedValue([]);
    const { result, rerender } = renderHook(() => usePermissions(), { wrapper: wrapper() });
    await waitFor(() => expect(result.current.loading).toBe(false));
    const first = result.current.retry;
    rerender();
    expect(result.current.retry).toBe(first);
  });
});
