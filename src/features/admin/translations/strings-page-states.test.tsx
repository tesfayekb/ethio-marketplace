import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, fireEvent, screen, within } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { renderPanel as render } from "@/components/ui/dialog-parts-test-render";
import { tableViewTestShell } from "@/components/shell/table-view-test-shell";
import { forgetTableViewsForTests } from "@/components/shell/table-view-store";
import { en } from "@/i18n/locales/en";
import { am } from "@/i18n/locales/am";
import { ownValue } from "@/lib/own-key";
import type { GuardFn } from "@/features/auth/mfa/use-step-up";
import type { AiTranslateResult } from "./translations-service";
const state = vi.hoisted(() => ({
  list: vi.fn(),
  collect: vi.fn(),
  translate: vi.fn(),
  guard: vi.fn(),
  language: "en",
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
  Link: () => null,
}));
vi.mock("@/features/permissions/usePermissions", () => ({
  usePermissions: () => ({ permissions: ["translations:view"], loading: false, error: null }),
}));
vi.mock("@/features/auth/mfa/step-up-gate", () => ({
  StepUpGate: ({ children }: { children: (guard: GuardFn) => ReactNode }) =>
    children(async (action) => action()),
}));
vi.mock("./translations-service", async (original) => ({
  ...(await original<typeof import("./translations-service")>()),
  aiTranslate: state.translate,
  listTranslations: state.list,
  listLanguages: async () => [
    {
      code: "am",
      nameEn: "Amharic",
      nameNative: "Amharic",
      rtl: false,
      isBase: false,
      enabledAdmin: true,
      enabledPublic: false,
      sort: 1,
    },
  ],
  listTranslationStats: async () => [],
  listEntityTranslationStats: async () => [],
}));
vi.mock("./bulk-collect", async (original) => ({
  ...(await original<typeof import("./bulk-collect")>()),
  collectUi: state.collect,
}));
vi.mock("./use-translations", async (original) => ({
  ...(await original<typeof import("./use-translations")>()),
  useUsageMap: () => ({ data: undefined, error: null, isLoading: false }),
}));
import { AdminTranslationsStringsPage } from "./strings-page";
import { AiBulkBar } from "./ai-bulk-bar";
function draw() {
  const Shell = tableViewTestShell("uf2-strings");
  return render(
    <QueryClientProvider
      client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}
    >
      <Shell>
        <AdminTranslationsStringsPage lang="am" search={{}} />
      </Shell>
    </QueryClientProvider>,
  );
}
beforeEach(() => {
  vi.resetAllMocks();
  localStorage.clear();
  forgetTableViewsForTests();
  state.language = "en";
  state.list.mockResolvedValue({ rows: [], totalCount: 0 });
  state.guard.mockImplementation(async (action: () => Promise<unknown>) => action());
});
afterEach(() => {
  cleanup();
  localStorage.clear();
  forgetTableViewsForTests();
});
it("UFA-41 AI bulk shows known and failed counts, confirms before step-up, progress and named failures uf:A14.8", async () => {
  const retry = vi.fn();
  const client = () =>
    new QueryClient({ defaultOptions: { queries: { retry: false }, mutations: { retry: false } } });
  render(
    <QueryClientProvider client={client()}>
      <AiBulkBar
        lang="am"
        untranslated={0}
        countState="error"
        countRead={{ error: new TypeError("Failed to fetch"), onRetry: retry }}
        guard={state.guard}
      />
    </QueryClientProvider>,
  );
  expect(screen.getByTestId("ai-bulk-start")).toBeDisabled();
  const failure = await screen.findByTestId("ai-bulk-count-error");
  expect(failure).toHaveTextContent(en["failure.network"]);
  fireEvent.click(within(failure).getByRole("button", { name: en["common.retry"] }));
  expect(retry).toHaveBeenCalledTimes(1);
  cleanup();
  state.collect.mockResolvedValue([
    { key: "first", source: "First" },
    { key: "second", source: "Second" },
  ]);
  let finish: ((result: AiTranslateResult) => void) | undefined;
  state.translate.mockImplementation(
    () =>
      new Promise<AiTranslateResult>((resolve) => {
        finish = resolve;
      }),
  );
  render(
    <QueryClientProvider client={client()}>
      <AiBulkBar lang="am" untranslated={2} guard={state.guard} />
    </QueryClientProvider>,
  );
  const start = screen.getByRole("button", {
    name: en["admin.translations.ai.bulkAction"].replace("{count}", "2"),
  });
  start.focus();
  fireEvent.keyDown(start, { key: "Enter" });
  fireEvent.click(start, { detail: 0 });
  const confirm = await screen.findByRole("alertdialog");
  expect(confirm).toHaveTextContent(
    en["admin.translations.ai.confirmBody"].replace("{count}", "2"),
  );
  expect(state.guard).not.toHaveBeenCalled();
  expect(state.translate).not.toHaveBeenCalled();
  fireEvent.click(
    within(confirm).getByRole("button", {
      name: en["admin.translations.ai.confirmCta"].replace("{count}", "2"),
    }),
  );
  expect(await screen.findByTestId("ai-bulk-progress")).toHaveTextContent(
    en["admin.translations.ai.progress"].replace("{done}", "0").replace("{total}", "2"),
  );
  expect(state.guard).toHaveBeenCalledTimes(1);
  expect(state.translate.mock.calls[0]?.[0]).toEqual({
    lang: "am",
    items: [
      { key: "first", source: "First" },
      { key: "second", source: "Second" },
    ],
  });
  expect(finish).toBeTypeOf("function");
  if (!finish) throw new Error("Translation was not requested");
  finish({ done: 1, flagged: 0, failed: [{ key: "second", reason: "unmapped" }] });
  expect(await screen.findByTestId("ai-bulk-summary")).toHaveTextContent(
    en["admin.translations.ai.summary"]
      .replace("{done}", "1")
      .replace("{flagged}", "0")
      .replace("{failed}", "1"),
  );
  expect(screen.getByTestId("ai-bulk-failed")).toHaveTextContent(
    en["admin.translations.ai.failedList"].replace("{keys}", "second"),
  );
  expect(screen.queryByTestId("ai-bulk-progress")).toBeNull();
});
it("UFA-42 strings roster shows loading, failed with Retry and the empty answer uf:A14.11", async () => {
  state.list.mockReturnValueOnce(new Promise(() => {}));
  draw();
  expect(await screen.findByTestId("data-table-loading")).toHaveTextContent(
    en["admin.translations.strings.loading"],
  );
  cleanup();
  state.list.mockRejectedValueOnce(new TypeError("Failed to fetch"));
  draw();
  const alert = await screen.findByTestId("data-table-error");
  expect(alert).toHaveTextContent(en["admin.translations.strings.error"]);
  expect(alert).toHaveTextContent(en["failure.network"]);
  const calls = state.list.mock.calls.length;
  fireEvent.click(within(alert).getByRole("button", { name: en["common.retry"] }));
  expect(await screen.findByTestId("data-table-empty")).toHaveTextContent(
    en["admin.translations.strings.empty"],
  );
  expect(state.list).toHaveBeenCalledTimes(calls + 1);
});
it("UFA-43 Amharic strings heading, search, Columns and empty caption use the Amharic catalogue uf:A14.12", async () => {
  state.language = "am";
  draw();
  expect(await screen.findByTestId("data-table-empty")).toHaveTextContent(
    am["admin.translations.strings.empty"],
  );
  expect(
    screen.getByRole("heading", {
      name: am["admin.translations.strings.title"].replace("{language}", "Amharic"),
    }),
  ).toBeVisible();
  expect(screen.getByTestId("strings-search")).toHaveAttribute(
    "placeholder",
    am["admin.translations.filter.search"],
  );
  expect(screen.getByTestId("strings-columns")).toHaveAccessibleName(am["prim.table.columns"]);
  expect(screen.queryByText(en["admin.translations.strings.empty"])).toBeNull();
});
