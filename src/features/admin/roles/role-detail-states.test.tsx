import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { cleanup } from "@testing-library/react";

import { en } from "@/i18n/locales/en";
import { ownValue } from "@/lib/own-key";

import type { RoleDetail } from "./roles-service";

const state = vi.hoisted(() => ({
  role: undefined as RoleDetail | undefined,
  isLoading: false,
  error: null as unknown,
  refetch: vi.fn(),
}));

vi.mock("@tanstack/react-router", () => ({
  Link: ({ to, children, ...rest }: { to: string; children: ReactNode }) => (
    <a href={to} {...rest}>
      {children}
    </a>
  ),
  useNavigate: () => vi.fn(),
  useRouterState: () => "/admin/roles/r-1",
}));
vi.mock("@/i18n", () => ({
  useI18n: () => ({
    t: (key: string) => ownValue(en, key) ?? key,
    has: () => true,
    language: "en",
  }),
}));
vi.mock("@/lib/error-report", () => ({ reportBrowserFailure: vi.fn() }));
vi.mock("@/features/auth/mfa/step-up-gate", () => ({
  StepUpGate: ({ children }: { children: (guard: unknown) => ReactNode }) => children(vi.fn()),
}));
vi.mock("@/features/permissions/usePermissions", () => ({
  usePermissions: () => ({ permissions: ["roles:view"], loading: false, error: null }),
}));
vi.mock("./use-admin-roles", () => ({
  useAdminRole: () => ({
    data: state.role,
    isLoading: state.isLoading,
    error: state.error,
    refetch: state.refetch,
  }),
  useUpdateRole: () => ({ mutateAsync: vi.fn(), isPending: false }),
  useDeleteRole: () => ({ mutateAsync: vi.fn(), isPending: false }),
  useSetRolePermission: () => ({ mutateAsync: vi.fn(), isPending: false }),
}));

import { AdminRoleDetailPage } from "./role-detail";

const ROLE: RoleDetail = {
  id: "r-1",
  name: "editor",
  displayName: "Editor",
  description: null,
  isSystem: true,
  memberCount: 0,
  permissions: [],
};

beforeEach(() => {
  state.role = undefined;
  state.isLoading = false;
  state.error = null;
  state.refetch = vi.fn();
});
afterEach(cleanup);

it("UFA-81 uf:A10.1 role page: loading, failed read with Retry, refused without Retry, not found, Back link", async () => {
  state.isLoading = true;
  const view = render(<AdminRoleDetailPage roleId="r-1" />);
  expect(screen.getByRole("status")).toHaveTextContent(en["admin.roles.loading"]);
  view.unmount();

  state.isLoading = false;
  state.error = new TypeError("Failed to fetch");
  const failed = render(<AdminRoleDetailPage roleId="r-1" />);
  const notice = screen.getByRole("alert");
  expect(notice).toHaveAttribute("data-testid", "role-detail-error");
  expect(notice).toHaveTextContent(en["admin.roles.error"]);
  expect(notice).toHaveAttribute("data-failure-reason", "network");
  fireEvent.click(within(notice).getByRole("button", { name: en["common.retry"] }));
  expect(state.refetch).toHaveBeenCalledTimes(1);
  failed.unmount();

  state.error = Object.assign(new Error("badValue:role"), { status: 400 });
  const refused = render(<AdminRoleDetailPage roleId="r-1" />);
  const refusedNotice = screen.getByTestId("role-detail-error");
  await waitFor(() => expect(refusedNotice).toHaveAttribute("data-failure-reason", "refused"));
  expect(refusedNotice).toHaveTextContent(en["admin.roles.error"]);
  expect(within(refusedNotice).queryByRole("button", { name: en["common.retry"] })).toBeNull();
  refused.unmount();

  state.error = null;
  const missing = render(<AdminRoleDetailPage roleId="r-1" />);
  expect(screen.getByRole("alert")).toHaveTextContent(en["admin.roles.detail.notFound"]);
  missing.unmount();

  state.role = ROLE;
  render(<AdminRoleDetailPage roleId="r-1" />);
  const back = screen.getByRole("link", { name: en["admin.roles.detail.back"] });
  expect(back).toHaveAttribute("href", "/admin/roles");
});
