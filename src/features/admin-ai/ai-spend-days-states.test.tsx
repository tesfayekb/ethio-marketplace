import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, fireEvent, screen, waitFor, within } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { renderPanel as render } from "@/components/ui/dialog-parts-test-render";
import { tableViewTestShell } from "@/components/shell/table-view-test-shell";
import { forgetTableViewsForTests } from "@/components/shell/table-view-store";
import { en } from "@/i18n/locales/en";
import { ownValue } from "@/lib/own-key";
import { readFailed } from "@/lib/reader-failure";
import type { AiSpendDay } from "./ai-service";
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
  listAiSpendDays: state.list,
}));
import { AiSpendDays } from "./ai-spend-days";
const days: AiSpendDay[] = [
  { feature: "photo_screen", day: "2026-10-14", calls: 3, units: 3, costMicrousd: 6000 },
  { feature: "background_removal", day: "2026-10-14", calls: 1, units: 1, costMicrousd: 20000 },
  { feature: "photo_screen", day: "2026-10-12", calls: 2, units: 2, costMicrousd: 4000 },
];
function draw() {
  const Shell = tableViewTestShell("uf2-ai-days");
  return render(
    <QueryClientProvider
      client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}
    >
      <Shell>
        <AiSpendDays />
      </Shell>
    </QueryClientProvider>,
  );
}
beforeEach(() => {
  vi.resetAllMocks();
  localStorage.clear();
  forgetTableViewsForTests();
  state.list.mockResolvedValue(days);
});
afterEach(() => {
  cleanup();
  localStorage.clear();
  forgetTableViewsForTests();
});
it("UFA-76 daily spend shows calls and cost, feature choices narrow days, failed reads Retry without numbers, and a badValue:days refusal says refused without Retry uf:A27.6", async () => {
  draw();
  const table = await screen.findByTestId("ai-days-table");
  const rows = within(table).getAllByTestId("ai-days-row");
  expect(rows.map((line) => line.getAttribute("data-day"))).toEqual(["2026-10-14", "2026-10-12"]);
  const first = rows[0];
  if (!first) throw new Error("Missing first spend day");
  expect(within(first).getByTestId("ai-days-calls")).toHaveTextContent("4");
  expect(within(first).getByTestId("ai-days-cost")).toHaveTextContent("$0.03");
  expect(screen.getByTestId("ai-days-total")).toHaveTextContent(
    en["admin.ai.days.total"]
      .replace("{days}", "30")
      .replace("{spend}", "$0.03")
      .replace("{calls}", "6"),
  );
  const picker = screen.getByRole("combobox", { name: en["admin.ai.col.feature"] });
  for (const key of [
    "photo_screen",
    "writing_helper",
    "name_check",
    "category_images",
    "category_icons",
    "translations",
    "background_removal",
  ] as const)
    expect(
      within(picker).getByRole("option", { name: en[`admin.ai.feature.${key}`] }),
    ).toBeInTheDocument();
  fireEvent.change(picker, { target: { value: "background_removal" } });
  expect(screen.getAllByTestId("ai-days-row")).toHaveLength(1);
  expect(screen.getByTestId("ai-days-cost")).toHaveTextContent("$0.02");
  fireEvent.change(picker, { target: { value: "writing_helper" } });
  expect(screen.getByTestId("ai-days-empty")).toHaveTextContent(
    en["admin.ai.days.empty"].replace("{days}", "30"),
  );
  cleanup();
  state.list.mockReturnValueOnce(new Promise(() => {}));
  draw();
  expect(screen.getByText(en["common.loading"])).toBeVisible();
  expect(screen.queryByTestId("ai-days-table")).toBeNull();
  cleanup();
  state.list.mockRejectedValueOnce(new TypeError("Failed to fetch"));
  draw();
  const alert = await screen.findByTestId("ai-days-error");
  expect(alert).toHaveTextContent(en["admin.ai.days.error"]);
  expect(alert).toHaveTextContent(en["failure.network"]);
  expect(screen.queryByTestId("ai-days-table")).toBeNull();
  expect(screen.queryByTestId("ai-days-total")).toBeNull();
  const calls = state.list.mock.calls.length;
  fireEvent.click(within(alert).getByRole("button", { name: en["common.retry"] }));
  await screen.findByTestId("ai-days-table");
  await waitFor(() => expect(state.list).toHaveBeenCalledTimes(calls + 1));
  expect(state.list).toHaveBeenLastCalledWith(30);
  cleanup();
  state.list.mockRejectedValueOnce(readFailed({ code: "P0D01", message: "badValue:days" }, 400));
  draw();
  const refused = await screen.findByTestId("ai-days-error");
  expect(refused).toHaveAttribute("data-failure-reason", "refused");
  expect(refused).toHaveTextContent(en["admin.ai.days.error"]);
  expect(refused).toHaveTextContent(en["failure.refused"]);
  expect(refused).not.toHaveTextContent(en["failure.network"]);
  expect(refused).not.toHaveTextContent("badValue");
  expect(within(refused).queryByRole("button", { name: en["common.retry"] })).toBeNull();
  expect(screen.queryByTestId("ai-days-table")).toBeNull();
});
