import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import type { ComponentType } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { Route } from "@/routes/settings";

/**
 * Bundle 11 turn C8 (INC-570) — Settings shows each action's outcome BESIDE the
 * control that produced it. The operator's walk (2026-10-12): Change password
 * "doesnt do anything, doesnt give alert" — every outcome was drawn once, under
 * the page header, several screens above the form on a phone. The browser half
 * (the message on screen at 360) is S-3; these pin the placement.
 *
 * Seams (DEC-026): the router, i18n (identity `t`), the auth hook, the MFA hook,
 * the auth service and the Supabase client are mocked; nothing reaches the network.
 */
const service = vi.hoisted(() => ({
  changePassword: vi.fn(),
  changeEmail: vi.fn(),
  removeOwnPassword: vi.fn(),
  signOutOtherDevices: vi.fn(),
  unlinkProviderIdentity: vi.fn(),
  linkGoogleIdentity: vi.fn(),
}));

vi.mock("@tanstack/react-router", () => ({
  createFileRoute: () => (options: Record<string, unknown>) => ({ options }),
  useNavigate: () => vi.fn(),
}));

vi.mock("@/i18n", () => ({
  useI18n: () => ({
    t: (key: string) => key,
    language: "en",
    star: null,
    publicLanguages: [],
  }),
}));

vi.mock("@/features/auth/use-auth", () => ({
  useAuth: () => ({ user: { id: "u-1", displayName: "Test person" }, loading: false }),
}));

vi.mock("@/features/auth/mfa/use-mfa", () => ({
  useMfa: () => ({
    factors: [],
    aal: { current: "aal1", next: "aal1" },
    pending: null,
    busy: false,
    errorKey: null,
    successKey: null,
    startEnrollment: vi.fn(),
    confirmEnrollment: vi.fn(),
    cancelEnrollment: vi.fn(),
    removeFactor: vi.fn(),
  }),
}));

vi.mock("@/features/auth/auth-service", () => ({
  ...service,
  getIdentities: vi.fn(async () => ({
    ok: true,
    identities: [
      { identityId: "id-email", provider: "email", lastUsedAt: null },
      { identityId: "id-google", provider: "google", lastUsedAt: null },
    ],
  })),
  hasPassword: vi.fn(async () => ({ ok: true, hasPassword: true })),
  hasSessionRehydrating: vi.fn(async () => true),
}));

vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    auth: { getUser: async () => ({ data: { user: { created_at: "2026-01-01T00:00:00Z" } } }) },
    from: () => ({
      select: () => ({
        eq: () => ({ maybeSingle: async () => ({ data: { account_status: "active" } }) }),
      }),
    }),
  },
}));

const Settings = (Route as unknown as { options: { component: ComponentType } }).options.component;

/**
 * INC-575 — the page's first render in this file is cold: the reads it awaits
 * before the password method shows are mocked and resolve at once, but rendering
 * the whole page takes far longer the first time (SETM-1: 344 ms locally against
 * 77 ms for SETM-2), and in CI, beside the other test files, it passed the 1 s
 * default of `findBy` (run 38254910194). The wait is sized for that first render.
 */
const FIRST_RENDER_MS = 5_000;

async function renderSettings() {
  render(<Settings />);
  await screen.findByTestId("password-method", undefined, { timeout: FIRST_RENDER_MS });
  const passwordForm = document.getElementById("current-password")?.closest("form") ?? null;
  const emailForm = document.getElementById("new-email")?.closest("form") ?? null;
  if (passwordForm === null || emailForm === null)
    throw new Error("the Settings forms are missing");
  return { passwordForm, emailForm };
}

function type(id: string, value: string) {
  const input = document.getElementById(id);
  if (input === null) throw new Error(`#${id} is missing`);
  fireEvent.change(input, { target: { value } });
}

describe("Settings — each outcome beside its control (INC-570)", () => {
  beforeEach(() => {
    for (const fn of Object.values(service)) fn.mockReset();
    Element.prototype.scrollIntoView = vi.fn();
  });

  it("SETM-1: Change password's refusals and its confirmation are inside its own form", async () => {
    const { passwordForm } = await renderSettings();
    type("current-password", "old-password-1");
    type("new-password", "new-password-1");
    type("new-password-confirm", "new-password-2");
    fireEvent.submit(passwordForm);
    expect(within(passwordForm).getByRole("alert")).toHaveTextContent("auth.errorPasswordMismatch");
    expect(service.changePassword).not.toHaveBeenCalled();

    service.changePassword.mockResolvedValueOnce({
      ok: false,
      errorKey: "auth.errorWrongCurrentPassword",
    });
    type("new-password-confirm", "new-password-1");
    fireEvent.submit(passwordForm);
    await waitFor(() =>
      expect(within(passwordForm).getByRole("alert")).toHaveTextContent(
        "auth.errorWrongCurrentPassword",
      ),
    );

    service.changePassword.mockResolvedValueOnce({ ok: true });
    fireEvent.submit(passwordForm);
    await waitFor(() =>
      expect(within(passwordForm).getByRole("status")).toHaveTextContent(
        "settings.passwordChanged",
      ),
    );
    expect(within(passwordForm).queryByRole("alert")).toBeNull();
    expect(screen.getAllByRole("status")).toHaveLength(1);
  });

  it("SETM-2: Change email's outcome is inside its own form, and not in the password form", async () => {
    const { passwordForm, emailForm } = await renderSettings();
    service.changeEmail.mockResolvedValueOnce({ ok: true });
    type("new-email", "someone@example.test");
    fireEvent.submit(emailForm);
    await waitFor(() =>
      expect(within(emailForm).getByRole("status")).toHaveTextContent("settings.emailChangeSent"),
    );
    expect(within(passwordForm).queryByRole("status")).toBeNull();
  });

  it("SETM-3: Remove password's refusal stays in its confirmation; its success shows under the methods", async () => {
    await renderSettings();
    fireEvent.click(screen.getByRole("button", { name: "settings.removePassword" }));
    type("remove-password-current", "wrong-password");
    service.removeOwnPassword.mockResolvedValueOnce({
      ok: false,
      errorKey: "auth.errorWrongCurrentPassword",
    });
    fireEvent.click(screen.getByRole("button", { name: "settings.removePasswordConfirmYes" }));
    const confirmation = screen.getByTestId("remove-password-confirmation");
    await waitFor(() =>
      expect(within(confirmation).getByRole("alert")).toHaveTextContent(
        "auth.errorWrongCurrentPassword",
      ),
    );

    service.removeOwnPassword.mockResolvedValueOnce({ ok: true });
    fireEvent.click(screen.getByRole("button", { name: "settings.removePasswordConfirmYes" }));
    await waitFor(() =>
      expect(screen.getByTestId("settings-message-methods")).toHaveTextContent(
        "settings.passwordRemoved",
      ),
    );
    expect(screen.queryByTestId("remove-password-confirmation")).toBeNull();
  });

  it("SETM-4: Sign out other devices answers under its own button", async () => {
    await renderSettings();
    service.signOutOtherDevices.mockResolvedValueOnce({ ok: true });
    fireEvent.click(screen.getByRole("button", { name: "settings.signOutOthers" }));
    fireEvent.click(screen.getByRole("button", { name: "settings.signOutOthersConfirmYes" }));
    const devices = screen.getByTestId("settings-devices");
    await waitFor(() =>
      expect(within(devices).getByRole("status")).toHaveTextContent("settings.signOutOthersDone"),
    );
  });
});
