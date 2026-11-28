import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { am } from "@/i18n/locales/am";
import { en } from "@/i18n/locales/en";
import { ownValue } from "@/lib/own-key";
import { readRefusal } from "@/lib/refusal";

import { BEGIN_REFUSALS } from "../impersonation/impersonation-refusals";
import { accessRefusalKey } from "./access-refusals";
import {
  PROFILE_EDIT_REFUSALS,
  profileEditRefusalKey,
  type AdminUserDetail,
} from "./admin-users-service";

/**
 * UF-2 (DEC-493) — one person's page: loading and not found (A4.2), the status, role, View as
 * and profile refusals in their own words (A4.5, A4.7, A4.9, A4.12), the translator block by its
 * door (A4.13) and the page in Amharic (A4.15). Seams: the users and impersonation services, the
 * step-up gate (it runs the action), the permission hook, the shell and the router.
 */
const mocks = vi.hoisted(() => ({
  user: vi.fn(),
  activity: vi.fn(),
  roles: vi.fn(),
  countries: vi.fn(),
  status: vi.fn(),
  assign: vi.fn(),
  update: vi.fn(),
  begin: vi.fn(),
  denied: new Set<string>(),
  language: "en" as "en" | "am",
}));
vi.mock("@/i18n", async (original) => ({
  ...(await original<typeof import("@/i18n")>()),
  useI18n: () => ({
    t: (key: string) => ownValue(mocks.language === "am" ? am : en, key) ?? key,
    language: mocks.language,
    has: () => true,
  }),
}));
vi.mock("@/lib/error-report", () => ({ reportBrowserFailure: vi.fn() }));
vi.mock("@tanstack/react-router", () => ({
  useNavigate: () => vi.fn(),
  useRouterState: ({ select }: { select: (s: { location: { href: string } }) => string }) =>
    select({ location: { href: "/admin/users/u-2" } }),
  Link: ({
    to,
    children,
    params: _p,
    search: _s,
    ...rest
  }: { to: string; children: ReactNode } & Record<string, unknown>) => (
    <a href={to} {...rest}>
      {children}
    </a>
  ),
}));
vi.mock("@/components/shell-context", () => ({ useShell: () => ({ user: { id: "u-1" } }) }));
vi.mock("@/features/auth/mfa/step-up-gate", () => ({
  StepUpGate: ({ children }: { children: (guard: unknown) => ReactNode }) =>
    children((run: () => Promise<unknown>) => run()),
}));
vi.mock("@/features/permissions/use-may-call", () => ({
  useMayCall: () => ({
    mayCall: (target: { door?: string }) => !mocks.denied.has(target.door ?? ""),
  }),
}));
vi.mock("@/features/admin/translations/translator-card", () => ({
  TranslatorLanguagesCard: ({ userId }: { userId: string }) => (
    <div data-testid="translator-card-stub">{userId}</div>
  ),
}));
vi.mock("./admin-users-service", async (original) => ({
  ...(await original<typeof import("./admin-users-service")>()),
  getUser: mocks.user,
  listUserActivity: mocks.activity,
  listRoles: mocks.roles,
  listCountries: mocks.countries,
  setAccountStatus: mocks.status,
  assignRole: mocks.assign,
  updateProfile: mocks.update,
}));
vi.mock("../impersonation/impersonation-service", async (original) => ({
  ...(await original<typeof import("../impersonation/impersonation-service")>()),
  beginImpersonation: mocks.begin,
}));

import { AdminShellProvider } from "../admin-shell-provider";
import { AdminUserDetailPage } from "./user-detail";

const person = (over: Partial<AdminUserDetail> = {}): AdminUserDetail => ({
  userId: "u-2",
  displayName: "Abebe",
  email: "abebe@example.test",
  homeCountryCode: null,
  accountStatus: "deactivated",
  createdAt: "2026-10-01T00:00:00Z",
  roles: [],
  sellerAlias: null,
  showPhone: false,
  showTelegram: false,
  contactWhatsapp: false,
  statusReason: null,
  statusChangedAt: null,
  lastSignInAt: null,
  ...over,
});
const coded = (code: string) => Object.assign(new Error(code), { code: "P0D01" });

function draw() {
  const client = new QueryClient({ defaultOptions: { queries: { retry: false } } });
  render(
    <QueryClientProvider client={client}>
      <AdminShellProvider permissions={[]} accessDenied={false}>
        <AdminUserDetailPage userId="u-2" />
      </AdminShellProvider>
    </QueryClientProvider>,
  );
}

async function refusalsShow(
  codes: readonly string[],
  door: ReturnType<typeof vi.fn>,
  press: () => void,
  testid: string,
  expected: (error: unknown) => string,
) {
  for (const code of codes) {
    const error = coded(code);
    door.mockRejectedValueOnce(error);
    await act(async () => press());
    await waitFor(() => expect(screen.getByTestId(testid).textContent).toBe(expected(error)));
  }
}

describe("one person's page (UF-2)", () => {
  beforeEach(() => {
    for (const fn of [mocks.user, mocks.status, mocks.assign, mocks.update, mocks.begin])
      fn.mockReset();
    mocks.activity.mockReset().mockResolvedValue([]);
    mocks.roles
      .mockReset()
      .mockResolvedValue([
        { name: "editor", displayName: "Editor", isSystem: false, priority: 10 },
      ]);
    mocks.countries.mockReset().mockResolvedValue([]);
    mocks.denied = new Set();
    mocks.language = "en";
  });
  afterEach(cleanup);

  it("UFA-7 while the person is read the page says so; a person who does not exist is named not found", async () => {
    let answer: (row: AdminUserDetail | null) => void = () => undefined;
    mocks.user.mockReturnValueOnce(new Promise<AdminUserDetail | null>((r) => (answer = r)));
    draw();
    expect((await screen.findByTestId("user-detail-loading")).textContent).toBe(
      en["admin.users.loading"],
    );
    answer(null);
    expect((await screen.findByTestId("user-not-found")).textContent).toBe(
      en["admin.users.detail.notFound"],
    );
    expect(screen.getByRole("link", { name: en["admin.users.detail.back"] })).toHaveAttribute(
      "href",
      "/admin/users",
    );
  });

  it("UFA-8 each status refusal shows its own words uf:A4.5", async () => {
    mocks.user.mockResolvedValue(person());
    draw();
    const activate = await screen.findByTestId("activate-user");
    await refusalsShow(
      ["badValue", "required", "unknownUser"],
      mocks.status,
      () => fireEvent.click(activate),
      "status-error",
      (error) => en[accessRefusalKey(error, "status") ?? "common.error"],
    );
    expect(screen.getByTestId("status-error").textContent).toBe(
      en["admin.users.error.unknownUser"],
    );
  });

  it("UFA-9 each role refusal shows its own words uf:A4.7", async () => {
    mocks.user.mockResolvedValue(person({ accountStatus: "active" }));
    draw();
    fireEvent.change(await screen.findByTestId("assign-role-select"), {
      target: { value: "editor" },
    });
    await refusalsShow(
      ["roleReserved", "unknownRole", "badCountryCode", "unknownUser"],
      mocks.assign,
      () => fireEvent.click(screen.getByTestId("assign-role")),
      "roles-error",
      (error) => en[accessRefusalKey(error, "roles") ?? "common.error"],
    );
  });

  it("UFA-10 each View as refusal shows its own words uf:A4.9", async () => {
    mocks.user.mockResolvedValue(person({ accountStatus: "active" }));
    draw();
    fireEvent.change(await screen.findByTestId("impersonation-reason"), {
      target: { value: "Checking a reported listing for the seller" },
    });
    await refusalsShow(
      ["impersonateSelf", "impersonateSuperAdmin", "unknownUser", "badLength", "sessionActive"],
      mocks.begin,
      () => fireEvent.click(screen.getByTestId("impersonation-begin")),
      "impersonation-error",
      (error) => en[readRefusal(error, BEGIN_REFUSALS).key],
    );
    expect(screen.getByTestId("impersonation-error").textContent).toBe(
      en["impersonation.error.sessionActive"],
    );
  });

  it("UFA-11 each profile edit refusal shows its own words uf:A4.12", async () => {
    mocks.user.mockResolvedValue(person({ accountStatus: "active" }));
    draw();
    const save = await screen.findByTestId("edit-save");
    await refusalsShow(
      Object.keys(PROFILE_EDIT_REFUSALS.words).filter((code) => code !== "required"),
      mocks.update,
      () => fireEvent.click(save),
      "edit-error",
      (error) => en[profileEditRefusalKey(error) ?? "common.error"],
    );
    expect(mocks.update).toHaveBeenCalled();
  });

  it("UFA-12 the translator block shows with its door's permission and not without uf:A4.13", async () => {
    mocks.user.mockResolvedValue(person({ accountStatus: "active" }));
    draw();
    expect(await screen.findByTestId("translator-card-stub")).toHaveTextContent("u-2");
    cleanup();
    mocks.denied = new Set(["admin_set_translator_languages"]);
    draw();
    await screen.findByTestId("edit-save");
    expect(screen.queryByTestId("translator-card-stub")).toBeNull();
  });

  it("UFA-13 the page's words are the Amharic catalogue's, none English uf:A4.15", async () => {
    mocks.language = "am";
    mocks.user.mockResolvedValue(person({ accountStatus: "active" }));
    draw();
    await screen.findByTestId("edit-save");
    const text = document.body.textContent ?? "";
    const keys = [
      "admin.users.detail.identity",
      "admin.users.roles.title",
      "admin.users.edit.title",
      "admin.users.edit.save",
      "impersonation.viewAs",
      "impersonation.start",
    ] as const;
    for (const key of keys) {
      expect(text, key).toContain(am[key]);
      if (am[key] !== en[key]) expect(text, key).not.toContain(en[key]);
    }
  });
});
