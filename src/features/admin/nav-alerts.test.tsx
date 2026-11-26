import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, expect, it, vi } from "vitest";

/**
 * NAV-ALERT-1..3 (DEC-461, INC-1266) — the legal-review mark asks the server only when the held session
 * is aal2: at aal1 the question is not asked and nothing is cached as "no alert"; a level that could not be read
 * fails the query; the permission re-read after the factor asks afresh.
 */
const door = vi.hoisted(() => ({ level: vi.fn(), rpc: vi.fn() }));
vi.mock("@/lib/supabase-door", () => ({ rpc: (name: string) => door.rpc(name) }));
vi.mock("@/features/auth/mfa/session-level", () => ({ readSessionLevel: () => door.level() }));

import { useNavAlerts } from "./nav-alerts";

const AAL1 = { ok: true, token: "t", current: "aal1" };
const AAL2 = { ok: true, token: "t", current: "aal2" };

function render(permissions: readonly string[]) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
  );
  return renderHook(({ held }) => useNavAlerts(true, held), {
    wrapper,
    initialProps: { held: permissions },
  });
}

beforeEach(() => {
  door.level.mockReset();
  door.rpc.mockReset();
});

it("NAV-ALERT-1 asks nothing at aal1, then asks afresh once the session is aal2", async () => {
  door.level.mockResolvedValue(AAL1);
  door.rpc.mockResolvedValue({ data: true, error: null });
  const view = render(["legal:view"]);
  await waitFor(() => expect(door.level).toHaveBeenCalledTimes(1));
  expect(door.rpc).not.toHaveBeenCalled();
  expect(view.result.current.size).toBe(0);

  // The factor was used: the permission re-read changes the list, so the mark is read again.
  door.level.mockResolvedValue(AAL2);
  view.rerender({ held: [] });
  view.rerender({ held: ["legal:view"] });
  await waitFor(() => expect(view.result.current.has("legalReview")).toBe(true));
  expect(door.rpc).toHaveBeenCalledWith("legal_review_overdue");
});

it("NAV-ALERT-2 an unreadable level fails the query and asks the server nothing", async () => {
  door.level.mockResolvedValue({ ok: false, error: { status: 503 } });
  const view = render(["legal:view"]);
  await waitFor(() => expect(door.level).toHaveBeenCalled());
  expect(door.rpc).not.toHaveBeenCalled();
  expect(view.result.current.size).toBe(0);
});

it("NAV-ALERT-2b INC-1291 the failure is the reader's own, not a hand-built Error", async () => {
  const typed = { status: 503 };
  door.level.mockResolvedValue({ ok: false, error: typed });
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  const wrapper = ({ children }: { children: ReactNode }) => (
    <QueryClientProvider client={client}>{children}</QueryClientProvider>
  );
  renderHook(() => useNavAlerts(true, ["legal:view"]), { wrapper });
  await waitFor(() => expect(client.getQueryCache().getAll()[0]?.state.error).toBe(typed));
});

it("NAV-ALERT-3 no legal:view asks nothing, even at aal2", async () => {
  door.level.mockResolvedValue(AAL2);
  const view = render([]);
  await new Promise((resolve) => setTimeout(resolve, 20));
  expect(door.level).not.toHaveBeenCalled();
  expect(door.rpc).not.toHaveBeenCalled();
  expect(view.result.current.size).toBe(0);
});
