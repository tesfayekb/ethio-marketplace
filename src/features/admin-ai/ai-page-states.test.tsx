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
import type { AiFeatureRow } from "./ai-service";
const state = vi.hoisted(() => ({
  list: vi.fn(),
  save: vi.fn(),
  guard: vi.fn(),
  language: "en",
  permissions: ["services:view", "services:manage"],
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
vi.mock("@/lib/route-client", async (original) => ({
  ...(await original<typeof import("@/lib/route-client")>()),
  callRoute: vi.fn(),
  downloadRoute: vi.fn(),
}));
vi.mock("@/features/permissions/usePermissions", () => ({
  usePermissions: () => ({ permissions: state.permissions, loading: false, error: null }),
}));
vi.mock("@/features/auth/mfa/step-up-gate", () => ({
  StepUpGate: ({ children }: { children: (guard: GuardFn) => ReactNode }) => children(state.guard),
}));
vi.mock("./ai-service", async (original) => ({
  ...(await original<typeof import("./ai-service")>()),
  listAiFeatures: state.list,
  setAiFeature: state.save,
}));
// These sibling readers have their own UF rows and tests; only the feature roster is under test here.
vi.mock("./ai-spend-days", () => ({ AiSpendDays: () => null }));
vi.mock("./ai-calls", () => ({ AiCalls: () => null }));
import { AdminAiPage } from "./ai-page";
const row: AiFeatureRow = {
  feature: "writing_helper",
  on: true,
  offReason: null,
  offAt: null,
  monthlyBudgetCents: 500,
  unit: "call",
  unitCostMicrousd: 3000,
  monthSpentMicrousd: 0,
  monthCalls: 0,
  monthUnits: 0,
  todayCalls: 0,
  alertLevel: 0,
  updatedAt: "",
};
function draw() {
  const Shell = tableViewTestShell("uf2-ai");
  return render(
    <QueryClientProvider
      client={
        new QueryClient({
          defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
        })
      }
    >
      <Shell>
        <AdminAiPage />
      </Shell>
    </QueryClientProvider>,
  );
}
beforeEach(() => {
  vi.resetAllMocks();
  localStorage.clear();
  forgetTableViewsForTests();
  state.language = "en";
  state.permissions = ["services:view", "services:manage"];
  state.list.mockResolvedValue([row]);
  state.save.mockResolvedValue(undefined);
  state.guard.mockImplementation(async (action: () => Promise<unknown>) => action());
});
afterEach(() => {
  cleanup();
  localStorage.clear();
  forgetTableViewsForTests();
});
it("UFA-74 feature search, Columns choices, next and previous pages and page size change visible rows uf:A27.2", async () => {
  state.list.mockResolvedValue(
    Array.from({ length: 26 }, (_, n) => ({ ...row, feature: `feature-${n + 1}` })),
  );
  draw();
  const table = await screen.findByRole("table");
  expect(within(table).getByText("feature-1")).toBeVisible();
  expect(within(table).queryByText("feature-26")).toBeNull();
  fireEvent.click(screen.getByTestId("ai-pagination-next"));
  expect(within(table).getByText("feature-26")).toBeVisible();
  fireEvent.click(screen.getByTestId("ai-pagination-prev"));
  expect(within(table).getByText("feature-1")).toBeVisible();
  fireEvent.change(screen.getByTestId("ai-pagination-size"), { target: { value: "50" } });
  expect(within(table).getByText("feature-26")).toBeVisible();
  fireEvent.change(screen.getByRole("textbox", { name: en["admin.ai.filter.search"] }), {
    target: { value: "feature-26" },
  });
  expect(within(table).getByText("feature-26")).toBeVisible();
  expect(within(table).queryByText("feature-1")).toBeNull();
  fireEvent.click(screen.getByTestId("ai-columns"));
  const panel = await screen.findByRole("dialog");
  for (const key of ["feature", "state", "spend", "calls", "price", "updated"] as const)
    expect(within(panel).getByText(en[`admin.ai.col.${key}`])).toBeVisible();
  const toggle = within(panel).getByRole("switch", { name: en["admin.ai.col.updated"] });
  fireEvent.click(toggle);
  expect(toggle).toHaveAttribute("aria-checked", "false");
  fireEvent.click(within(panel).getByRole("button", { name: en["prim.table.done"] }));
  expect(
    within(table).queryByRole("columnheader", { name: en["admin.ai.col.updated"] }),
  ).toBeNull();
});
it("UFA-75 unmapped feature save shows generic catalogue words without the refusal text after step-up uf:A27.5", async () => {
  state.save.mockRejectedValue({ code: "P0001", message: "unmapped-private-provider-detail" });
  draw();
  const table = await screen.findByRole("table");
  const edit = within(table).getByTestId("ai-actions-writing_helper-edit");
  expect(edit).toHaveAccessibleName(
    `${en["admin.ai.action.edit"]} — ${en["admin.ai.feature.writing_helper"]}`,
  );
  fireEvent.click(edit);
  const save = await screen.findByRole("button", { name: en["common.save"] });
  save.focus();
  fireEvent.keyDown(save, { key: "Enter", code: "Enter" });
  fireEvent.click(save, { detail: 0 });
  expect(await screen.findByTestId("ai-editor-error")).toHaveTextContent(
    en["admin.ai.error.unknown"],
  );
  expect(screen.queryByTestId("ai-editor-error-reason")).toBeNull();
  expect(document.body).not.toHaveTextContent("unmapped-private-provider-detail");
  expect(state.guard).toHaveBeenCalledTimes(1);
  expect(state.save).toHaveBeenCalledWith({
    feature: "writing_helper",
    enabled: true,
    monthlyBudgetCents: 500,
    unitCostMicrousd: 3000,
  });
  expect(state.guard.mock.invocationCallOrder[0]).toBeLessThan(
    state.save.mock.invocationCallOrder[0] ?? 0,
  );
  cleanup();
  state.permissions = ["services:view"];
  draw();
  const readOnly = await screen.findByRole("table");
  expect(within(readOnly).queryByTestId("ai-actions-writing_helper-edit")).toBeNull();
});
it("UFA-79 feature list loading, empty and network failure show catalogue words and Retry recovers uf:A27.8", async () => {
  state.list.mockReturnValueOnce(new Promise(() => {}));
  draw();
  expect(screen.getByTestId("data-table-loading")).toHaveTextContent(en["admin.ai.loading"]);
  expect(screen.queryByTestId("data-table-empty")).toBeNull();
  cleanup();
  state.list.mockRejectedValueOnce(new TypeError("Failed to fetch"));
  state.list.mockResolvedValueOnce([]);
  draw();
  const alert = await screen.findByTestId("data-table-error");
  expect(alert).toHaveTextContent(en["admin.ai.error"]);
  expect(alert).toHaveTextContent(en["failure.network"]);
  expect(screen.queryByTestId("data-table-empty")).toBeNull();
  fireEvent.click(within(alert).getByRole("button", { name: en["common.retry"] }));
  expect(await screen.findByTestId("data-table-empty")).toHaveTextContent(en["admin.ai.empty"]);
  expect(state.list).toHaveBeenCalledTimes(3);
});
it("UFA-80 Amharic feature heading, search, Columns, rows and empty caption use catalogue values uf:A27.9", async () => {
  state.language = "am";
  draw();
  expect(screen.getByRole("heading", { name: am["admin.section.ai.title"] })).toBeVisible();
  const table = await screen.findByRole("table");
  expect(within(table).getByText(am["admin.ai.feature.writing_helper"])).toBeVisible();
  expect(screen.getByRole("textbox", { name: am["admin.ai.filter.search"] })).toBeVisible();
  expect(screen.getByTestId("ai-columns")).toHaveAccessibleName(am["prim.table.columns"]);
  expect(within(table).getByText(am["admin.ai.state.on"])).toBeVisible();
  expect(within(table).queryByText(en["admin.ai.feature.writing_helper"])).toBeNull();
  fireEvent.change(screen.getByTestId("ai-search"), { target: { value: "no-match" } });
  expect(screen.getByTestId("data-table-empty")).toHaveTextContent(am["admin.ai.empty"]);
  expect(screen.queryByText(en["admin.ai.empty"])).toBeNull();
});
