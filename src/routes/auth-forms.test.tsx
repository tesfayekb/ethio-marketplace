import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import type { ComponentType, ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

/**
 * L11 (DEC-339, forms wave 2) — the sign-in, sign-up, forgot-password and
 * reset forms on the one Field and the shared gate. A blank required answer is
 * refused under its own field and nothing is sent; a rule across two fields
 * (the password pair) stays the form's ONE alert. Seams (DEC-026): the router,
 * i18n (identity `t`), the sign-in service, the legal reads and the client door
 * are mocked; nothing reaches the network.
 */
const search = vi.hoisted(() => ({ value: {} as Record<string, unknown> }));
const service = vi.hoisted(() => ({
  signInWithPassword: vi.fn(),
  signUp: vi.fn(),
  requestPasswordReset: vi.fn(),
  resendConfirmation: vi.fn(),
  signInWithGoogle: vi.fn(),
  completePasswordReset: vi.fn(),
}));

vi.mock("@tanstack/react-router", () => ({
  createFileRoute: () => (options: Record<string, unknown>) => ({
    options,
    useSearch: () => search.value,
  }),
  useNavigate: () => vi.fn(),
  Link: ({ children }: { children: ReactNode }) => <a>{children}</a>,
}));

vi.mock("@/i18n", () => ({
  useI18n: () => ({ t: (key: string) => key, language: "en", star: null, publicLanguages: [] }),
}));

vi.mock("@/features/auth/auth-service", () => ({
  ...service,
  hasSessionRehydrating: vi.fn(async () => false),
  sessionRehydration: vi.fn(async () => "session"),
}));

vi.mock("@/features/legal/legal-reader", () => ({ legalInForceIds: vi.fn(async () => []) }));
vi.mock("@/features/legal/use-legal-gate", () => ({
  currentGateKinds: () => [],
  landAfterSignIn: vi.fn(),
}));
vi.mock("@/features/legal/agree-to-document", () => ({
  AgreeToDocument: ({ onCheckedChange }: { onCheckedChange: (on: boolean) => void }) => (
    <input type="checkbox" data-testid="auth-agree-tick" onChange={() => onCheckedChange(true)} />
  ),
}));
vi.mock("@/components/shell/page-guide", () => ({ PageGuide: () => null }));
vi.mock("@/lib/supabase-door", () => ({
  getSupabase: vi.fn(async () => ({})),
  onAuthChange: () => ({ unsubscribe: () => undefined }),
}));

const { Route: AuthRoute } = await import("@/routes/auth");
const { Route: ResetRoute } = await import("@/routes/auth_.reset");
const componentOf = (route: unknown) =>
  (route as { options: { component: ComponentType } }).options.component;

function draw(Screen: ComponentType) {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  return render(
    <QueryClientProvider client={client}>
      <Screen />
    </QueryClientProvider>,
  );
}

function byId(id: string): HTMLElement {
  const element = document.getElementById(id);
  if (element === null) throw new Error(`#${id} is missing`);
  return element;
}

function type(id: string, value: string) {
  fireEvent.change(byId(id), { target: { value } });
}

function formOf(id: string): HTMLFormElement {
  const form = byId(id).closest("form");
  if (form === null) throw new Error(`#${id} has no form`);
  return form;
}

describe("L11 — the auth forms on the one Field and gate", () => {
  beforeEach(() => {
    for (const fn of Object.values(service)) fn.mockReset();
    search.value = {};
    Element.prototype.scrollIntoView = vi.fn();
  });

  it("KAU-1: a blank sign-in is refused under each field and nothing is sent", async () => {
    draw(componentOf(AuthRoute));
    expect(formOf("auth-email").noValidate).toBe(true);
    fireEvent.submit(formOf("auth-email"));
    await waitFor(() => expect(byId("auth-email")).toHaveAttribute("aria-invalid", "true"));
    expect(byId("auth-password")).toHaveAttribute("aria-invalid", "true");
    expect(byId("auth-email").getAttribute("aria-describedby")).toBe("auth-email-refusal");
    expect(byId("auth-email-refusal")).toHaveTextContent("post.refusal.required");
    expect(screen.queryByTestId("auth-error")).toBeNull();
    expect(service.signInWithPassword).not.toHaveBeenCalled();
  });

  it("KAU-2: an answer given clears its own refusal only, and a full form is sent", async () => {
    service.signInWithPassword.mockResolvedValue({ ok: false, errorKey: "auth.errorGeneric" });
    draw(componentOf(AuthRoute));
    fireEvent.submit(formOf("auth-email"));
    await waitFor(() => expect(byId("auth-email")).toHaveAttribute("aria-invalid", "true"));
    type("auth-email", "someone@example.test");
    await waitFor(() => expect(byId("auth-email")).not.toHaveAttribute("aria-invalid"));
    expect(byId("auth-password")).toHaveAttribute("aria-invalid", "true");
    type("auth-password", "pw-12345678");
    fireEvent.submit(formOf("auth-email"));
    await waitFor(() =>
      expect(service.signInWithPassword).toHaveBeenCalledWith({
        email: "someone@example.test",
        password: "pw-12345678",
      }),
    );
    expect(await screen.findByTestId("auth-error")).toHaveTextContent("auth.errorGeneric");
  });

  it("KAU-3: a sign-up mismatch is the form's one alert and nothing is sent", async () => {
    search.value = { view: "sign-up" };
    draw(componentOf(AuthRoute));
    fireEvent.click(screen.getByTestId("auth-agree-tick"));
    type("auth-email", "someone@example.test");
    type("auth-password", "pw-12345678");
    type("auth-password-confirm", "pw-12345679");
    fireEvent.submit(formOf("auth-email"));
    await waitFor(() =>
      expect(screen.getByRole("alert")).toHaveTextContent("auth.errorPasswordMismatch"),
    );
    expect(screen.getAllByRole("alert")).toHaveLength(1);
    expect(service.signUp).not.toHaveBeenCalled();
  });

  it("KAU-4: a blank forgot-password address is refused under its field and nothing is sent", async () => {
    search.value = { view: "forgot" };
    draw(componentOf(AuthRoute));
    fireEvent.submit(formOf("reset-email"));
    await waitFor(() => expect(byId("reset-email")).toHaveAttribute("aria-invalid", "true"));
    expect(screen.queryByTestId("auth-reset-error")).toBeNull();
    expect(service.requestPasswordReset).not.toHaveBeenCalled();
  });

  it("KAU-5: the reset's too-short password is refused under the password field", async () => {
    draw(componentOf(ResetRoute));
    await screen.findByText("auth.resetNewTitle");
    type("reset-password", "short");
    type("reset-password-confirm", "short");
    fireEvent.submit(formOf("reset-password"));
    await waitFor(() =>
      expect(byId("reset-password")).toHaveAttribute("aria-describedby", "reset-password-refusal"),
    );
    expect(byId("reset-password")).toHaveAttribute("aria-invalid", "true");
    expect(byId("reset-password-refusal")).toHaveTextContent("auth.errorPasswordTooShort");
    expect(screen.getAllByRole("alert")).toHaveLength(1);
    expect(service.completePasswordReset).not.toHaveBeenCalled();
  });

  it("KAU-6: the reset's mismatch is its one alert; a blank pair is refused per field", async () => {
    draw(componentOf(ResetRoute));
    await screen.findByText("auth.resetNewTitle");
    fireEvent.submit(formOf("reset-password"));
    await waitFor(() =>
      expect(byId("reset-password-confirm")).toHaveAttribute("aria-invalid", "true"),
    );
    expect(byId("reset-password-confirm-refusal")).toHaveTextContent("post.refusal.required");
    type("reset-password", "pw-12345678");
    type("reset-password-confirm", "pw-12345679");
    fireEvent.submit(formOf("reset-password"));
    await waitFor(() =>
      expect(screen.getByRole("alert")).toHaveTextContent("auth.errorPasswordMismatch"),
    );
    expect(screen.getAllByRole("alert")).toHaveLength(1);
    expect(service.completePasswordReset).not.toHaveBeenCalled();
  });
});
