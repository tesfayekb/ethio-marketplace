import { fireEvent, render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

/**
 * INC-1349 (cursor-bundle-8c-3a) — a person whose read fails draws the shared notice with Retry,
 * inside the card the browser tests already name (`user-detail-error`). Every hook is a mock.
 */
const state = vi.hoisted(() => ({
  error: null as Error | null,
  refetch: vi.fn(),
}));

vi.mock("@/i18n", () => ({ useI18n: () => ({ t: (key: string) => key, language: "en" }) }));
vi.mock("@/integrations/supabase/client", () => ({ supabase: {} }));
vi.mock("@/lib/error-report", () => ({ reportBrowserFailure: vi.fn() }));
vi.mock("@tanstack/react-router", () => ({
  Link: ({ children }: { children: ReactNode }) => <span>{children}</span>,
  useNavigate: () => vi.fn(),
  useRouterState: () => "/admin/users/scratch-user",
}));
vi.mock("@/features/permissions/usePermissions", () => ({
  usePermissions: () => ({ permissions: [], loading: false, error: null }),
}));
vi.mock("@/components/shell-context", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/components/shell-context")>()),
  useShell: () => ({ user: { id: "scratch-staff" }, authLoading: false }),
}));
vi.mock("@/features/auth/mfa/step-up-gate", () => ({
  StepUpGate: ({ children }: { children: (guard: unknown) => ReactNode }) => children(vi.fn()),
}));
vi.mock("@/features/admin/legal/user-legal-card", () => ({ UserLegalCard: () => null }));
vi.mock("@/features/admin/translations/translator-card", () => ({
  TranslatorLanguagesCard: () => null,
}));
vi.mock("@/features/admin/impersonation/impersonation-starter", () => ({
  ImpersonationStarter: () => null,
}));
const mutation = () => ({ mutateAsync: vi.fn(), isPending: false, error: null });
vi.mock("./use-admin-users", () => ({
  useAdminUser: () => ({
    data: undefined,
    isLoading: false,
    error: state.error,
    refetch: state.refetch,
  }),
  useAdminUserActivity: () => ({ data: [], isLoading: false, error: null }),
  useAdminRoles: () => ({ data: [] }),
  useCountries: () => ({ data: [] }),
  useSetAccountStatus: () => mutation(),
  useRoleAssignment: () => ({ assign: mutation(), revoke: mutation() }),
  useUpdateProfile: () => mutation(),
}));

import { AdminUserDetailPage } from "./user-detail";

describe("INC-1349 — the person detail's failed read", () => {
  beforeEach(() => {
    state.error = null;
    state.refetch.mockReset();
  });

  it("UD-F1 a server failure draws the shared notice in the error card, with the old words and a Retry that reads again", () => {
    state.error = Object.assign(new Error("boom"), { status: 500 });
    render(<AdminUserDetailPage userId="scratch-user" />);
    const card = screen.getByTestId("user-detail-error");
    const notice = screen.getByTestId("user-detail-failure");
    expect(card.contains(notice)).toBe(true);
    expect(notice.getAttribute("role")).toBe("alert");
    expect(notice.getAttribute("data-failure-reason")).toBe("server");
    expect(notice.textContent).toContain("admin.users.error");
    fireEvent.click(screen.getByTestId("user-detail-failure-retry"));
    expect(state.refetch).toHaveBeenCalledTimes(1);
  });

  it("UD-F2 a refusal draws the notice with no Retry, and a person who does not exist draws the not-found card", () => {
    state.error = Object.assign(new Error("permissionDenied"), { status: 403 });
    const { unmount } = render(<AdminUserDetailPage userId="scratch-user" />);
    expect(screen.getByTestId("user-detail-failure").getAttribute("data-failure-reason")).toBe(
      "noAccess",
    );
    expect(screen.queryByTestId("user-detail-failure-retry")).toBeNull();
    unmount();
    state.error = null;
    render(<AdminUserDetailPage userId="scratch-user" />);
    expect(screen.queryByTestId("user-detail-failure")).toBeNull();
    expect(screen.getByTestId("user-not-found")).toBeTruthy();
  });
});
