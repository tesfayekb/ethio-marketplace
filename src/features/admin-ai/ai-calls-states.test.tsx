import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, fireEvent, screen, waitFor, within } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { renderPanel as render } from "@/components/ui/dialog-parts-test-render";
import { tableViewTestShell } from "@/components/shell/table-view-test-shell";
import { forgetTableViewsForTests } from "@/components/shell/table-view-store";
import { en } from "@/i18n/locales/en";
import { ownValue } from "@/lib/own-key";
import { readFailed } from "@/lib/reader-failure";
import type { AiCallRow } from "./ai-service";
const state = vi.hoisted(() => ({ list: vi.fn() }));
vi.mock("@/i18n", async (original) => ({
  ...(await original<typeof import("@/i18n")>()),
  useI18n: () => ({ t: (key: string) => ownValue(en, key) ?? key, language: "en" }),
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
vi.mock("./ai-service", async (original) => ({
  ...(await original<typeof import("./ai-service")>()),
  fetchAiCalls: state.list,
}));
// Draw the declared choices directly; keep the real filters store and chip controls.
vi.mock("@/components/shell/filter-chips", async (original) => ({
  ...(await original<typeof import("@/components/shell/filter-chips")>()),
  FiltersButton: ({
    filters,
  }: {
    filters: readonly import("@/components/shell/table-filters").TableFilter[];
  }) => (
    <>
      {filters.map((filter) =>
        filter.kind === "select" ? (
          <select
            key={filter.id}
            aria-label={filter.name}
            value={filter.value[0] ?? ""}
            onChange={(event) => filter.onChange(event.target.value ? [event.target.value] : [])}
          >
            <option value="" />
            {filter.options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        ) : null,
      )}
    </>
  ),
}));
import { AiCalls } from "./ai-calls";
const row: AiCallRow = {
  id: "one",
  created_at: "2026-10-29T00:00:00Z",
  feature: "name_check",
  model: "model",
  outcome: "ok",
  latency_ms: 4,
  actor: { kind: "hidden" },
};
const cursor = { at: row.created_at, id: row.id };
function draw() {
  const Shell = tableViewTestShell("uf2-ai-calls");
  return render(
    <QueryClientProvider
      client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}
    >
      <Shell>
        <AiCalls />
      </Shell>
    </QueryClientProvider>,
  );
}
beforeEach(() => {
  vi.resetAllMocks();
  localStorage.clear();
  forgetTableViewsForTests();
  state.list.mockResolvedValue({ rows: [row], next: cursor });
});
afterEach(() => {
  cleanup();
  localStorage.clear();
  forgetTableViewsForTests();
});
it("UFA-77 call history renders facts, filters reset cursors, previous and next carry actual cursors, failed reads Retry, and badValue refusals for limit, feature, outcome and cursor say refused without Retry uf:A27.7", async () => {
  draw();
  const table = await screen.findByRole("table");
  expect(within(table).getByText(en["admin.ai.feature.name_check"])).toBeVisible();
  expect(within(table).getByText("model")).toBeVisible();
  expect(within(table).getByText(en["admin.ai.log.outcome.ok"])).toBeVisible();
  expect(within(table).getByText(en["admin.ai.log.personHidden"])).toBeVisible();
  expect(within(table).getByText(en["admin.ai.log.latencyMs"].replace("{ms}", "4"))).toBeVisible();
  fireEvent.click(screen.getByRole("button", { name: en["prim.table.next"] }));
  await waitFor(() => expect(state.list).toHaveBeenCalledWith("", "", cursor));
  fireEvent.click(await screen.findByRole("button", { name: en["prim.table.previous"] }));
  expect(await screen.findByRole("button", { name: en["prim.table.previous"] })).toBeDisabled();
  fireEvent.change(screen.getByRole("combobox", { name: en["admin.ai.log.col.outcome"] }), {
    target: { value: "timeout" },
  });
  fireEvent.change(screen.getByRole("combobox", { name: en["admin.ai.col.feature"] }), {
    target: { value: "name_check" },
  });
  await waitFor(() => expect(state.list).toHaveBeenLastCalledWith("name_check", "timeout", null));
  expect(screen.getByTestId("ai-calls-chips-chip-feature")).toHaveTextContent(
    en["admin.ai.feature.name_check"],
  );
  expect(screen.getByTestId("ai-calls-chips-chip-outcome")).toHaveTextContent(
    en["admin.ai.log.outcome.timeout"],
  );
  fireEvent.click(await screen.findByRole("button", { name: en["prim.table.next"] }));
  await waitFor(() => expect(state.list).toHaveBeenLastCalledWith("name_check", "timeout", cursor));
  fireEvent.click(screen.getByTestId("ai-calls-chips-chip-outcome-remove"));
  await waitFor(() => expect(state.list).toHaveBeenLastCalledWith("name_check", "", null));
  expect(screen.queryByTestId("ai-calls-chips-chip-outcome")).toBeNull();
  cleanup();
  localStorage.clear();
  forgetTableViewsForTests();
  state.list.mockReturnValueOnce(new Promise(() => {}));
  draw();
  expect(screen.getByTestId("data-table-loading")).toHaveTextContent(en["admin.ai.log.loading"]);
  cleanup();
  state.list.mockRejectedValueOnce(new TypeError("Failed to fetch"));
  state.list.mockResolvedValueOnce({ rows: [], next: null });
  draw();
  const alert = await screen.findByTestId("data-table-error");
  expect(alert).toHaveTextContent(en["admin.ai.log.error"]);
  expect(alert).toHaveTextContent(en["failure.network"]);
  expect(screen.queryByTestId("data-table-empty")).toBeNull();
  fireEvent.click(within(alert).getByRole("button", { name: en["common.retry"] }));
  expect(await screen.findByTestId("data-table-empty")).toHaveTextContent(
    en["admin.ai.days.empty"].replace("{days}", "90"),
  );
  for (const code of [
    "badValue:limit",
    "badValue:feature",
    "badValue:outcome",
    "badValue:cursor",
  ] as const) {
    cleanup();
    localStorage.clear();
    forgetTableViewsForTests();
    state.list.mockRejectedValueOnce(readFailed({ code: "P0D01", message: code }, 400));
    draw();
    const refused = await screen.findByTestId("data-table-error");
    expect(refused).toHaveAttribute("data-failure-reason", "refused");
    expect(refused).toHaveTextContent(en["admin.ai.log.error"]);
    expect(refused).toHaveTextContent(en["failure.refused"]);
    expect(refused).not.toHaveTextContent(en["failure.network"]);
    expect(refused).not.toHaveTextContent("badValue");
    expect(within(refused).queryByRole("button", { name: en["common.retry"] })).toBeNull();
  }
});
