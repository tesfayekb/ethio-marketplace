import { fireEvent, render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

/**
 * INC-1345 (cursor-bundle-8c-3b) — THE STAFF LAYOUT'S GATE, on a failed permission read. A first
 * read that fails sends no one away: the gate draws the shared notice with a Retry that reads
 * again. A read that fails while grants are held keeps them and draws the staff body as before.
 * The permission read, the shell and the router are mocks; the notice is the real one.
 */
const state = vi.hoisted(() => ({
  permissions: [] as string[],
  loading: false,
  error: null as Error | null,
  retry: vi.fn(),
  navigate: vi.fn(),
  user: { id: "scratch-staff" } as { id: string } | null,
}));

vi.mock("@/i18n", async (original) => ({
  ...(await original<typeof import("@/i18n")>()),
  useI18n: () => ({ t: (key: string) => key, language: "en" }),
}));
vi.mock("@/lib/error-report", () => ({ reportBrowserFailure: vi.fn() }));
vi.mock("@/lib/page-head", () => ({ pageHead: () => ({ meta: [] }) }));
vi.mock("@tanstack/react-router", () => ({
  createFileRoute: () => (options: Record<string, unknown>) => ({ options }),
  Link: ({ children }: { children: ReactNode }) => <span>{children}</span>,
  Outlet: () => <div data-testid="admin-outlet" />,
  useNavigate: () => state.navigate,
}));
vi.mock("@/components/shell/use-shown-pathname", () => ({ useShownPathname: () => "/admin" }));
vi.mock("@/components/shell-context", () => ({
  useShell: () => ({ user: state.user, authLoading: false }),
}));
vi.mock("@/features/permissions/usePermissions", () => ({
  usePermissions: () => ({
    permissions: state.permissions,
    loading: state.loading,
    error: state.error,
    retry: state.retry,
    has: (slug: string) => state.permissions.includes(slug),
  }),
}));
// The gate's permission is a scratch value here (the browse-path guard keeps this file off the
// permission seam's own exports; the hook mock below is the only seam this test names).
vi.mock("@/features/permissions/service", async (original) => ({
  ...(await original<Record<string, unknown>>()),
  ADMIN_PANEL_PERMISSION: "scratch:admin",
}));
vi.mock("@/features/auth/mfa/staff-factor-gate-lazy", () => ({
  LazyStaffFactorGate: ({ children }: { children: ReactNode }) => <>{children}</>,
}));

import { Route } from "./admin";

function AdminGate() {
  const component = Route.options.component;
  return component === undefined ? null : <>{(component as () => ReactNode)()}</>;
}

describe("INC-1345 — the staff layout's gate on a failed permission read", () => {
  beforeEach(() => {
    state.permissions = [];
    state.loading = false;
    state.error = null;
    state.user = { id: "scratch-staff" };
    state.retry.mockReset();
    state.navigate.mockReset();
  });

  it("ADG-1 a first read that failed draws the notice with a Retry that reads again, and sends no one away uf:A1.3", () => {
    state.error = new Error("failed to fetch");
    render(<AdminGate />);
    expect(screen.getByTestId("admin-permissions-failed")).toBeTruthy();
    expect(screen.queryByTestId("admin-panel-root")).toBeNull();
    fireEvent.click(screen.getByTestId("admin-permissions-failed-retry"));
    expect(state.retry).toHaveBeenCalledTimes(1);
    expect(state.navigate).not.toHaveBeenCalled();
  });

  it("ADG-2 a read that failed while grants are held keeps them and draws the staff body", () => {
    state.permissions = ["scratch:admin"];
    state.error = new Error("failed to fetch");
    render(<AdminGate />);
    expect(screen.getByTestId("admin-panel-root")).toBeTruthy();
    expect(screen.queryByTestId("admin-permissions-failed")).toBeNull();
    expect(state.navigate).not.toHaveBeenCalled();
  });

  it("ADG-3 a read that settled without the admin permission still leaves for the landing", () => {
    render(<AdminGate />);
    expect(screen.queryByTestId("admin-permissions-failed")).toBeNull();
    expect(state.navigate).toHaveBeenCalledTimes(1);
  });

  it("ADG-4 a signed-out visitor leaves for the landing, never sees the notice, even with a stale error", () => {
    state.user = null;
    state.error = new Error("failed to fetch");
    render(<AdminGate />);
    expect(screen.queryByTestId("admin-permissions-failed")).toBeNull();
    expect(state.navigate).toHaveBeenCalledTimes(1);
  });
});
