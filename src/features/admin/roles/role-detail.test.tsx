import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import type { RoleDetail } from "./roles-service";

const state = vi.hoisted(() => ({
  permissions: [] as string[],
  role: null as RoleDetail | null,
}));

vi.mock("@tanstack/react-router", () => ({
  Link: ({ children }: { children: ReactNode }) => <a>{children}</a>,
  useNavigate: () => vi.fn(),
}));
vi.mock("@/i18n", () => ({
  useI18n: () => ({ t: (key: string) => key, has: () => true, language: "en" }),
}));
vi.mock("@/features/auth/mfa/step-up-gate", () => ({
  StepUpGate: ({ children }: { children: (guard: unknown) => ReactNode }) => children(vi.fn()),
}));
vi.mock("@/features/permissions/usePermissions", () => ({
  usePermissions: () => ({ permissions: state.permissions, loading: false, error: null }),
}));
vi.mock("./use-admin-roles", () => ({
  useAdminRole: () => ({ data: state.role, isLoading: false, error: null }),
  useUpdateRole: () => ({ mutateAsync: vi.fn(), isPending: false }),
  useDeleteRole: () => ({ mutateAsync: vi.fn(), isPending: false }),
  useSetRolePermission: () => ({ mutateAsync: vi.fn(), isPending: false }),
}));

import { AdminRoleDetailPage } from "./role-detail";

const roleOf = (isSystem: boolean): RoleDetail => ({
  id: "r-1",
  name: "editor",
  displayName: "Editor",
  description: null,
  isSystem,
  memberCount: 0,
  permissions: [
    {
      permissionId: "p-1",
      resource: "listings",
      action: "view",
      requiresStepUp: false,
      granted: false,
      isCore: false,
      assignable: true,
      userBaseline: false,
    },
  ],
});

describe("D41 — the role matrix's notes", () => {
  beforeEach(() => {
    state.permissions = [];
    state.role = null;
  });

  it("RD-5 a system role shows the system note, never the read-only note", () => {
    state.role = roleOf(true);
    state.permissions = ["roles:update"];
    render(<AdminRoleDetailPage roleId="r-1" />);
    expect(screen.getByTestId("role-system-note").textContent).toBe("admin.roles.systemLockedNote");
    expect(screen.queryByTestId("role-readonly-note")).toBeNull();
  });

  it("RD-6 a custom role the viewer may not change shows the read-only note, no system note, no toggle", () => {
    state.role = roleOf(false);
    state.permissions = ["roles:view"];
    render(<AdminRoleDetailPage roleId="r-1" />);
    expect(screen.getByTestId("role-readonly-note").textContent).toBe("admin.roles.readOnlyNote");
    expect(screen.queryByTestId("role-system-note")).toBeNull();
    expect(screen.queryByTestId("role-permission-toggle-listings:view")).toBeNull();
    expect(screen.getByTestId("role-permission-locked-listings:view")).toBeTruthy();
  });

  it("RD-7 a custom role the viewer may change shows neither note, and its toggle", () => {
    state.role = roleOf(false);
    state.permissions = ["roles:view", "roles:update"];
    render(<AdminRoleDetailPage roleId="r-1" />);
    expect(screen.queryByTestId("role-readonly-note")).toBeNull();
    expect(screen.queryByTestId("role-system-note")).toBeNull();
    expect(screen.getByTestId("role-permission-toggle-listings:view")).toBeTruthy();
  });
});
