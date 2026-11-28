import { fireEvent, render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

/**
 * INC-1349 (cursor-bundle-8c-3a) — a role whose read fails draws the shared notice with Retry,
 * not its own alert: the subject keeps the screen's old words, the notice adds the reason.
 */
const state = vi.hoisted(() => ({
  error: null as Error | null,
  refetch: vi.fn(),
}));

vi.mock("@tanstack/react-router", () => ({
  Link: ({ children }: { children: ReactNode }) => <a>{children}</a>,
  useNavigate: () => vi.fn(),
  useRouterState: () => "/admin/roles/r-1",
}));
vi.mock("@/i18n", () => ({
  useI18n: () => ({ t: (key: string) => key, has: () => true, language: "en" }),
}));
vi.mock("@/lib/error-report", () => ({ reportBrowserFailure: vi.fn() }));
vi.mock("@/features/auth/mfa/step-up-gate", () => ({
  StepUpGate: ({ children }: { children: (guard: unknown) => ReactNode }) => children(vi.fn()),
}));
vi.mock("@/features/permissions/usePermissions", () => ({
  usePermissions: () => ({ permissions: [], loading: false, error: null }),
}));
vi.mock("./use-admin-roles", () => ({
  useAdminRole: () => ({
    data: undefined,
    isLoading: false,
    error: state.error,
    refetch: state.refetch,
  }),
  useUpdateRole: () => ({ mutateAsync: vi.fn(), isPending: false }),
  useDeleteRole: () => ({ mutateAsync: vi.fn(), isPending: false }),
  useSetRolePermission: () => ({ mutateAsync: vi.fn(), isPending: false }),
}));

import { AdminRoleDetailPage } from "./role-detail";

describe("INC-1349 — the role detail's failed read", () => {
  beforeEach(() => {
    state.error = null;
    state.refetch.mockReset();
  });

  it("RD-8 a server failure draws the shared notice with the old words and a Retry that reads again", () => {
    state.error = Object.assign(new Error("boom"), { status: 500 });
    render(<AdminRoleDetailPage roleId="r-1" />);
    const notice = screen.getByTestId("role-detail-error");
    expect(notice.getAttribute("role")).toBe("alert");
    expect(notice.getAttribute("data-failure-reason")).toBe("server");
    expect(notice.textContent).toContain("admin.roles.error");
    fireEvent.click(screen.getByTestId("role-detail-error-retry"));
    expect(state.refetch).toHaveBeenCalledTimes(1);
  });

  it("RD-9 a refusal draws the notice with no Retry, and a role with no error draws no notice", () => {
    state.error = Object.assign(new Error("permissionDenied"), { status: 403 });
    const { unmount } = render(<AdminRoleDetailPage roleId="r-1" />);
    expect(screen.getByTestId("role-detail-error").getAttribute("data-failure-reason")).toBe(
      "noAccess",
    );
    expect(screen.queryByTestId("role-detail-error-retry")).toBeNull();
    unmount();
    state.error = null;
    render(<AdminRoleDetailPage roleId="r-1" />);
    expect(screen.queryByTestId("role-detail-error")).toBeNull();
    expect(screen.getByTestId("role-not-found")).toBeTruthy();
  });
});
