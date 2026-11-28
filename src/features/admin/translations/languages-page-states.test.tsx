import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, fireEvent, screen, waitFor, within } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { renderPanel as render } from "@/components/ui/dialog-parts-test-render";
import { tableViewTestShell } from "@/components/shell/table-view-test-shell";
import { forgetTableViewsForTests } from "@/components/shell/table-view-store";
import { en } from "@/i18n/locales/en";
import { am } from "@/i18n/locales/am";
import { ownValue } from "@/lib/own-key";
import type { GuardFn } from "@/features/auth/mfa/use-step-up";
import type { LanguageRow, TranslationStats } from "./translations-service";
const state = vi.hoisted(() => ({
  languages: vi.fn(),
  stats: vi.fn(),
  data: vi.fn(),
  flags: vi.fn(),
  guard: vi.fn(),
  language: "en",
  permissions: ["translations:view", "translations:manage"],
}));
vi.mock("@/i18n", async (original) => ({
  ...(await original<typeof import("@/i18n")>()),
  useI18n: () => ({
    t: (key: string) => ownValue(state.language === "am" ? am : en, key) ?? key,
    language: state.language,
  }),
}));
vi.mock("@tanstack/react-router", async (original) => ({
  ...(await original<typeof import("@tanstack/react-router")>()),
  useNavigate: () => vi.fn(),
}));
vi.mock("@/features/permissions/usePermissions", () => ({
  usePermissions: () => ({ permissions: state.permissions, loading: false, error: null }),
}));
vi.mock("@/features/auth/mfa/step-up-gate", () => ({
  StepUpGate: ({ children }: { children: (guard: GuardFn) => ReactNode }) => children(state.guard),
}));
vi.mock("./translations-service", async (original) => ({
  ...(await original<typeof import("./translations-service")>()),
  listLanguages: state.languages,
  listTranslationStats: state.stats,
  listEntityTranslationStats: state.data,
  setLanguageFlags: state.flags,
}));
vi.mock("./language-picker", () => ({ LanguagePicker: () => null }));
vi.mock("@/features/admin/users/use-admin-users", () => ({
  useCountries: () => ({ data: [], error: null, isLoading: false }),
}));
import { AdminTranslationsLanguagesPage } from "./languages-page";
const base: LanguageRow = {
  code: "en",
  nameEn: "English",
  nameNative: "English",
  rtl: false,
  isBase: true,
  enabledAdmin: true,
  enabledPublic: true,
  sort: 0,
};
const other: LanguageRow = {
  ...base,
  code: "am",
  nameEn: "Amharic",
  nameNative: "Amharic",
  isBase: false,
  sort: 1,
};
const stats: TranslationStats = {
  langCode: "en",
  total: 10,
  untranslated: 0,
  machineCount: 0,
  edited: 0,
  approved: 10,
  flagged: 0,
  orphaned: 0,
  reviewable: 0,
};
function draw() {
  const Shell = tableViewTestShell("uf2-languages");
  return render(
    <QueryClientProvider
      client={
        new QueryClient({
          defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
        })
      }
    >
      <Shell>
        <AdminTranslationsLanguagesPage />
      </Shell>
    </QueryClientProvider>,
  );
}
beforeEach(() => {
  vi.resetAllMocks();
  localStorage.clear();
  forgetTableViewsForTests();
  state.language = "en";
  state.permissions = ["translations:view", "translations:manage"];
  state.languages.mockResolvedValue([base, other]);
  state.stats.mockResolvedValue([stats, { ...stats, langCode: "am" }]);
  state.data.mockResolvedValue([]);
  state.guard.mockImplementation(async (action: () => Promise<unknown>) => action());
});
afterEach(() => {
  cleanup();
  localStorage.clear();
  forgetTableViewsForTests();
});
it("UFA-38 three translation counts load, fail without digits, Retry their own reads and recover uf:A13.2", async () => {
  state.languages.mockReturnValueOnce(new Promise(() => {}));
  state.stats.mockReturnValueOnce(new Promise(() => {}));
  draw();
  for (const id of ["keys", "languages", "approved"])
    expect(screen.getByTestId(`translations-stat-${id}-loading`)).toHaveTextContent(
      en["prim.state.loading"],
    );
  cleanup();
  for (const id of ["keys", "languages", "approved"]) {
    state.languages.mockRejectedValueOnce(new TypeError("Failed to fetch"));
    state.stats.mockRejectedValueOnce(new TypeError("Failed to fetch"));
    draw();
    const alert = await screen.findByTestId(`translations-stat-${id}-failed`);
    expect(alert).toHaveTextContent(en["failure.network"]);
    expect(alert).not.toHaveTextContent(/\d|%/);
    const lc = state.languages.mock.calls.length;
    const sc = state.stats.mock.calls.length;
    fireEvent.click(within(alert).getByRole("button", { name: en["common.retry"] }));
    if (id !== "approved")
      await waitFor(() => expect(state.languages).toHaveBeenCalledTimes(lc + 1));
    if (id !== "languages") await waitFor(() => expect(state.stats).toHaveBeenCalledTimes(sc + 1));
    expect(await screen.findByTestId(`translations-stat-${id}`)).toHaveTextContent(
      id === "keys" ? "10" : id === "languages" ? "2" : "100%",
    );
    cleanup();
  }
});
it("UFA-39 language roster loads, fails with Retry, is empty after recovery and displays a flags refusal after step-up uf:A13.8", async () => {
  state.languages.mockReturnValueOnce(new Promise(() => {}));
  draw();
  expect(await screen.findByTestId("data-table-loading")).toHaveTextContent(
    en["admin.translations.loading"],
  );
  cleanup();
  state.languages.mockRejectedValueOnce(new TypeError("Failed to fetch"));
  state.languages.mockResolvedValueOnce([]);
  draw();
  const alert = await screen.findByTestId("data-table-error");
  expect(alert).toHaveTextContent(en["admin.translations.error"]);
  expect(alert).toHaveTextContent(en["failure.network"]);
  fireEvent.click(within(alert).getByRole("button", { name: en["common.retry"] }));
  expect(await screen.findByTestId("data-table-empty")).toHaveTextContent(
    en["admin.translations.empty"],
  );
  cleanup();
  state.flags.mockRejectedValue({ code: "P0001", message: "permissionDenied" });
  draw();
  const table = await screen.findByRole("table");
  const toggle = within(table).getByTestId("lang-admin-am");
  expect(toggle).toHaveAccessibleName(en["admin.translations.switch.admin"]);
  toggle.focus();
  fireEvent.keyDown(toggle, { key: " " });
  fireEvent.click(toggle, { detail: 0 });
  expect(await screen.findByTestId("lang-flags-error")).toHaveTextContent(
    en["admin.translations.error.permission"],
  );
  expect(state.guard).toHaveBeenCalledTimes(1);
  expect(state.flags.mock.calls[0]?.[0]).toEqual({
    code: "am",
    enabledAdmin: false,
    enabledPublic: true,
  });
  expect(state.guard.mock.invocationCallOrder[0]).toBeLessThan(
    state.flags.mock.invocationCallOrder[0] ?? 0,
  );
});
it("UFA-40 Amharic language screen uses catalogue heading, counts, column choices and empty caption uf:A13.9", async () => {
  state.language = "am";
  state.languages.mockResolvedValue([]);
  draw();
  expect(screen.getByRole("heading", { name: am["admin.translations.title"] })).toBeVisible();
  for (const key of [
    "admin.translations.stat.totalKeys",
    "admin.translations.stat.languages",
    "admin.translations.stat.approved",
  ] as const)
    expect(await screen.findByText(am[key])).toBeVisible();
  expect(await screen.findByTestId("data-table-empty")).toHaveTextContent(
    am["admin.translations.empty"],
  );
  expect(screen.getByTestId("lang-columns")).toHaveAccessibleName(am["prim.table.columns"]);
  expect(screen.queryByText(en["admin.translations.empty"])).toBeNull();
});
