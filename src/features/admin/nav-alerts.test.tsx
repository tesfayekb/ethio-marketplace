import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, expect, it, vi } from "vitest";

/**
 * NAV-ALERT-1..3 (DEC-461, INC-1266) — the legal-review mark asks the server only when the held session
 * is aal2: at aal1 the question is not asked and nothing is cached as "no alert"; a failed session
 * read fails the query; the permission re-read after the factor asks afresh.
 */
const door = vi.hoisted(() => ({ session: vi.fn(), rpc: vi.fn() }));
vi.mock("@/lib/supabase-door", () => ({
  currentSession: () => door.session(),
  rpc: (name: string) => door.rpc(name),
}));
vi.mock("@/features/auth/mfa/mfa-service", () => ({
  decodeJwt: (token: string) => {
    const aal = token.split(".")[1];
    return aal === undefined ? null : { aal };
  },
}));

import { isAal2Token, useNavAlerts } from "./nav-alerts";

const AAL1 = { session: { access_token: "h.aal1.s" }, failed: false };
const AAL2 = { session: { access_token: "h.aal2.s" }, failed: false };

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
  door.session.mockReset();
  door.rpc.mockReset();
});

it("NAV-ALERT-1 reads the assurance level from the token and only aal2 holds", () => {
  expect(isAal2Token("h.aal2.s")).toBe(true);
  expect(isAal2Token("h.aal1.s")).toBe(false);
  expect(isAal2Token(undefined)).toBe(false);
});

it("NAV-ALERT-2 asks nothing at aal1, then asks afresh once the session is aal2", async () => {
  door.session.mockResolvedValue(AAL1);
  door.rpc.mockResolvedValue({ data: true, error: null });
  const view = render(["legal:view"]);
  await waitFor(() => expect(door.session).toHaveBeenCalledTimes(1));
  expect(door.rpc).not.toHaveBeenCalled();
  expect(view.result.current.size).toBe(0);

  // The factor was used: the permission re-read changes the list, so the mark is read again.
  door.session.mockResolvedValue(AAL2);
  view.rerender({ held: [] });
  view.rerender({ held: ["legal:view"] });
  await waitFor(() => expect(view.result.current.has("legalReview")).toBe(true));
  expect(door.rpc).toHaveBeenCalledWith("legal_review_overdue");
});

it("NAV-ALERT-3 a failed session read fails the query and asks the server nothing", async () => {
  door.session.mockResolvedValue({ session: null, failed: true, error: new Error("unreadable") });
  const view = render(["legal:view"]);
  await waitFor(() => expect(door.session).toHaveBeenCalled());
  expect(door.rpc).not.toHaveBeenCalled();
  expect(view.result.current.size).toBe(0);
});

it("NAV-ALERT-4 no legal:view asks nothing, even at aal2", async () => {
  door.session.mockResolvedValue(AAL2);
  const view = render([]);
  await new Promise((resolve) => setTimeout(resolve, 20));
  expect(door.session).not.toHaveBeenCalled();
  expect(door.rpc).not.toHaveBeenCalled();
  expect(view.result.current.size).toBe(0);
});
