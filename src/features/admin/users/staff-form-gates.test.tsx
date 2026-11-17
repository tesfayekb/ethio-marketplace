import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { GuardFn } from "@/features/auth/mfa/use-step-up";

/**
 * L9 (DEC-339, wave 3) — the staff consoles' controls in the one Field: a blank
 * required answer is held by the shared gate (nothing is sent), and the error
 * lines the browser tests read stay where they were, named by the control.
 * Every write is a mock; no backend, no real row (J3).
 */
const calls = vi.hoisted(() => ({
  status: vi.fn(),
  profile: vi.fn(),
  begin: vi.fn(),
  create: vi.fn(),
}));
vi.mock("@/i18n", () => ({ useI18n: () => ({ t: (key: string) => key, language: "en" }) }));
vi.mock("@/integrations/supabase/client", () => ({ supabase: {} }));
vi.mock("@tanstack/react-router", () => ({
  Link: ({ children }: { children: ReactNode }) => <span>{children}</span>,
  useNavigate: () => vi.fn(),
}));
vi.mock("@/features/admin/admin-context", () => ({
  useAdminShell: () => ({
    permissions: ["profiles:update", "impersonation:use", "roles:create"],
  }),
}));
vi.mock("@/features/auth/use-auth", () => ({ useAuth: () => ({ user: { id: "scratch-staff" } }) }));
vi.mock("@/features/auth/mfa/step-up-gate", () => ({
  StepUpGate: ({ children }: { children: (guard: GuardFn) => ReactNode }) =>
    children(async (run) => run()),
}));
vi.mock("@/features/admin/legal/user-legal-card", () => ({ UserLegalCard: () => null }));
vi.mock("@/features/admin/translations/translator-card", () => ({
  TranslatorLanguagesCard: () => null,
}));
const mutation = (fn: (input: unknown) => unknown) => ({
  mutateAsync: fn,
  isPending: false,
  error: null,
});
vi.mock("./use-admin-users", () => ({
  useAdminUser: () => ({
    data: {
      userId: "scratch-user",
      email: "scratch@example.invalid",
      displayName: "Scratch",
      sellerAlias: null,
      homeCountryCode: null,
      accountStatus: "active",
      statusChangedAt: null,
      statusReason: null,
      createdAt: "2026-11-17T00:00:00Z",
      lastSignInAt: null,
      roles: [],
    },
    isLoading: false,
    error: null,
  }),
  useAdminUserActivity: () => ({ data: [], isLoading: false, error: null }),
  useAdminRoles: () => ({ data: [] }),
  useCountries: () => ({ data: [] }),
  useSetAccountStatus: () => mutation(calls.status),
  useRoleAssignment: () => ({ assign: mutation(vi.fn()), revoke: mutation(vi.fn()) }),
  useUpdateProfile: () => mutation(calls.profile),
}));
vi.mock("@/features/admin/impersonation/use-impersonation", () => ({
  useBeginImpersonation: () => mutation(calls.begin),
}));
vi.mock("@/features/admin/roles/use-admin-roles", () => ({
  useAdminRolesDetailed: () => ({ data: [], isLoading: false, error: null }),
  useCreateRole: () => mutation(calls.create),
}));

import { AdminRolesList } from "@/features/admin/roles/roles-list";
import { ImpersonationStarter } from "@/features/admin/impersonation/impersonation-starter";
import { AdminUserDetailPage } from "./user-detail";

beforeEach(() => {
  calls.status.mockReset().mockResolvedValue(undefined);
  calls.profile.mockReset().mockResolvedValue(undefined);
  calls.begin.mockReset().mockResolvedValue({ sessionId: "scratch-session" });
  calls.create.mockReset().mockResolvedValue("scratch-role");
});

describe("staff consoles — the one Field and gate (L9)", () => {
  it("KFS-1 a blank deactivation reason sends nothing and keeps reason-error, named by the box", async () => {
    render(<AdminUserDetailPage userId="scratch-user" />);
    fireEvent.click(screen.getByTestId("deactivate-user"));
    const line = await screen.findByTestId("reason-error");
    expect(line.textContent).toBe("admin.users.status.reasonRequired");
    const box = screen.getByTestId("deactivate-reason");
    expect(box.getAttribute("aria-invalid")).toBe("true");
    expect(box.getAttribute("aria-describedby")).toBe("reason-error");
    expect(calls.status).not.toHaveBeenCalled();
    fireEvent.change(box, { target: { value: "  Scratch reason  " } });
    fireEvent.click(screen.getByTestId("deactivate-user"));
    await waitFor(() =>
      expect(calls.status).toHaveBeenCalledWith({
        status: "deactivated",
        reason: "Scratch reason",
      }),
    );
  });

  it("KFS-2 a blank display name is held by the gate under its box; edit-error stays empty", async () => {
    render(<AdminUserDetailPage userId="scratch-user" />);
    fireEvent.change(screen.getByTestId("edit-display-name"), { target: { value: "  " } });
    fireEvent.click(screen.getByTestId("edit-save"));
    const box = screen.getByTestId("edit-display-name");
    await waitFor(() => expect(box.getAttribute("aria-invalid")).toBe("true"));
    expect(screen.getByText("post.refusal.required")).toBeTruthy();
    expect(screen.queryByTestId("edit-error")).toBeNull();
    expect(calls.profile).not.toHaveBeenCalled();
  });

  it("KFS-3 a taken alias stays in edit-error, and the alias box names that line", async () => {
    calls.profile.mockRejectedValueOnce({ message: "aliasTaken" });
    render(<AdminUserDetailPage userId="scratch-user" />);
    fireEvent.change(screen.getByTestId("edit-seller-alias"), { target: { value: "scratch" } });
    fireEvent.click(screen.getByTestId("edit-save"));
    await waitFor(() => expect(calls.profile).toHaveBeenCalledTimes(1));
    expect(calls.profile).toHaveBeenCalledWith({
      displayName: "Scratch",
      sellerAlias: "scratch",
      homeCountryCode: null,
      reason: null,
    });
    const line = await screen.findByTestId("edit-error");
    expect(line.id).toBe("edit-error");
    expect(line.textContent).toBe("admin.users.edit.errorAliasTaken");
    const alias = screen.getByTestId("edit-seller-alias");
    expect(alias.getAttribute("aria-invalid")).toBe("true");
    expect(alias.getAttribute("aria-describedby")).toBe("edit-seller-alias-hint edit-error");
    expect(screen.getByTestId("edit-display-name").getAttribute("aria-invalid")).toBeNull();
  });

  it("KFS-4 a blank view-as reason is held by the gate; a short one keeps impersonation-error", async () => {
    render(<ImpersonationStarter userId="scratch-user" guard={async (run) => run()} />);
    fireEvent.click(screen.getByTestId("impersonation-begin"));
    const box = screen.getByTestId("impersonation-reason");
    await waitFor(() => expect(box.getAttribute("aria-invalid")).toBe("true"));
    expect(screen.getByText("post.refusal.required")).toBeTruthy();
    expect(screen.queryByTestId("impersonation-error")).toBeNull();
    fireEvent.change(box, { target: { value: "abc" } });
    fireEvent.click(screen.getByTestId("impersonation-begin"));
    const line = await screen.findByTestId("impersonation-error");
    expect(line.textContent).toBe("impersonation.reasonTooShort");
    expect(box.getAttribute("aria-invalid")).toBe("true");
    expect(box.getAttribute("aria-describedby")).toBe("impersonation-error");
    expect(calls.begin).not.toHaveBeenCalled();
    fireEvent.change(box, { target: { value: "Scratch ticket" } });
    fireEvent.click(screen.getByTestId("impersonation-begin"));
    await waitFor(() =>
      expect(calls.begin).toHaveBeenCalledWith({
        targetId: "scratch-user",
        reason: "Scratch ticket",
      }),
    );
  });

  it("KFS-5 a blank role key is held by the gate under its box, then an answered one is sent", async () => {
    render(<AdminRolesList />);
    fireEvent.click(screen.getByTestId("role-create-open"));
    fireEvent.click(await screen.findByTestId("role-create-submit"));
    const box = screen.getByTestId("role-create-name");
    await waitFor(() => expect(box.getAttribute("aria-invalid")).toBe("true"));
    expect(screen.getByText("post.refusal.required")).toBeTruthy();
    expect(screen.queryByTestId("role-create-error")).toBeNull();
    expect(calls.create).not.toHaveBeenCalled();
    fireEvent.change(box, { target: { value: " qz_scratch " } });
    fireEvent.click(screen.getByTestId("role-create-submit"));
    await waitFor(() =>
      expect(calls.create).toHaveBeenCalledWith({
        name: "qz_scratch",
        displayName: "",
        description: "",
      }),
    );
  });
});
