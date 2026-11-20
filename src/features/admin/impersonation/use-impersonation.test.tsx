import { QueryClientProvider } from "@tanstack/react-query";
import { act, renderHook } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { sessionQueryClient } from "@/features/auth/session-end";

/**
 * F1-7d (INC-1218) — THE ONE POLL STOPS ON A 401. The active-impersonation probe polls every 30 s
 * (the only `refetchInterval` under src/, F1-7d's census): an answer that ended the session stops
 * it, so a signed-out tab never keeps calling; any other answer keeps it polling.
 */
const service = vi.hoisted(() => ({ getActiveImpersonation: vi.fn() }));
vi.mock("./impersonation-service", () => ({
  getActiveImpersonation: service.getActiveImpersonation,
  beginImpersonation: vi.fn(),
  endImpersonation: vi.fn(),
  getImpersonatedProfile: vi.fn(),
  listImpersonatedListings: vi.fn(),
}));
vi.mock("@tanstack/react-router", () => ({
  useRouterState: () => "/admin",
}));

import { useActiveImpersonation } from "./use-impersonation";

function probe() {
  const client = sessionQueryClient();
  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
  );
  return renderHook(() => useActiveImpersonation(true), { wrapper });
}

beforeEach(() => {
  vi.useFakeTimers();
  service.getActiveImpersonation.mockReset();
});
afterEach(() => {
  vi.useRealTimers();
});

describe("the impersonation poll", () => {
  it("IMH-1 a 401 stops the poll: no call after it, however long the tab stays open", async () => {
    service.getActiveImpersonation.mockRejectedValue({
      message: "notSignedIn",
      code: "P0D01",
      status: 401,
    });
    const view = probe();
    // The mount's read and the route's re-read both start before the first answer lands.
    await act(() => vi.advanceTimersByTimeAsync(1_000));
    const answered = service.getActiveImpersonation.mock.calls.length;
    expect(answered).toBeGreaterThanOrEqual(1);
    await act(() => vi.advanceTimersByTimeAsync(120_000));
    expect(service.getActiveImpersonation).toHaveBeenCalledTimes(answered);
    view.unmount();
  });

  it("IMH-2 an answer keeps the poll going every 30 s", async () => {
    service.getActiveImpersonation.mockResolvedValue(null);
    const view = probe();
    await act(() => vi.advanceTimersByTimeAsync(1_000));
    const first = service.getActiveImpersonation.mock.calls.length;
    await act(() => vi.advanceTimersByTimeAsync(61_000));
    expect(service.getActiveImpersonation.mock.calls.length).toBeGreaterThanOrEqual(first + 2);
    view.unmount();
  });
});
