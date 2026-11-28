import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { cleanup, fireEvent, screen, waitFor, within } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { renderPanel as render } from "@/components/ui/dialog-parts-test-render";
import { tableViewTestShell } from "@/components/shell/table-view-test-shell";
import { forgetTableViewsForTests } from "@/components/shell/table-view-store";
import { en } from "@/i18n/locales/en";
import { ownValue } from "@/lib/own-key";
import type { AuditStats, AuditRow } from "./audit-service";
const state = vi.hoisted(() => ({ list: vi.fn(), stats: vi.fn(), facets: vi.fn() }));
vi.mock("@/i18n", async (original) => ({
  ...(await original<typeof import("@/i18n")>()),
  useI18n: () => ({ t: (key: string) => ownValue(en, key) ?? key, language: "en" }),
}));
vi.mock("@tanstack/react-router", async (original) => ({
  ...(await original<typeof import("@tanstack/react-router")>()),
  useNavigate: () => vi.fn(),
  Link: () => null,
}));
vi.mock("./audit-service", async (original) => ({
  ...(await original<typeof import("./audit-service")>()),
  listAudit: state.list,
  getAuditStats: state.stats,
  listAuditFacets: state.facets,
}));
import { AdminAuditPage } from "./audit-page";
const stats: AuditStats = {
  days: [{ day: "2026-11-01", count: 3 }],
  topActions: [{ action: "user.update", count: 3 }],
  count24h: 3,
  count7d: 8,
  activeImpersonations: 1,
};
const row: AuditRow = {
  id: "event-1",
  actorId: null,
  actorName: "Operator",
  action: "user.update",
  entityType: "user",
  entityId: "user-1",
  meta: { changed: "status" },
  createdAt: "2026-11-01T10:00:00Z",
};
function draw() {
  const Shell = tableViewTestShell("uf2-audit");
  return render(
    <QueryClientProvider
      client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}
    >
      <Shell>
        <AdminAuditPage />
      </Shell>
    </QueryClientProvider>,
  );
}
beforeEach(() => {
  vi.resetAllMocks();
  localStorage.clear();
  forgetTableViewsForTests();
  state.list.mockResolvedValue({ rows: [], totalCount: 0 });
  state.stats.mockResolvedValue(stats);
  state.facets.mockResolvedValue({ actions: [], entityTypes: [] });
  const original = HTMLElement.prototype.getBoundingClientRect;
  vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(function (
    this: HTMLElement,
  ) {
    return this.getAttribute("data-testid") === "audit-chart-plot"
      ? new DOMRect(0, 0, 600, 300)
      : original.call(this);
  });
});
afterEach(() => {
  cleanup();
  localStorage.clear();
  forgetTableViewsForTests();
  vi.restoreAllMocks();
});
it("UFA-28 all four audit counts load, fail without numbers, retry their read and recover values uf:A11.1", async () => {
  const tiles = ["24h", "7d", "impersonations", "top-action"] as const;
  state.stats.mockReturnValueOnce(new Promise(() => {}));
  draw();
  for (const id of tiles)
    expect(screen.getByTestId(`audit-stat-${id}-loading`)).toBeInTheDocument();
  cleanup();
  for (const id of tiles) {
    state.stats.mockRejectedValueOnce(new TypeError("Failed to fetch"));
    draw();
    const alert = await screen.findByTestId(`audit-stat-${id}-failed`);
    expect(alert).toHaveTextContent(en["failure.network"]);
    for (const tile of tiles) expect(screen.queryByTestId(`audit-stat-${tile}`)).toBeNull();
    const calls = state.stats.mock.calls.length;
    fireEvent.click(within(alert).getByRole("button", { name: en["common.retry"] }));
    await waitFor(() => expect(state.stats).toHaveBeenCalledTimes(calls + 1));
    expect(await screen.findByTestId("audit-stat-24h")).toHaveTextContent("3");
    expect(screen.getByTestId("audit-stat-7d")).toHaveTextContent("8");
    expect(screen.getByTestId("audit-stat-impersonations")).toHaveTextContent("1");
    expect(screen.getByTestId("audit-stat-top-action")).toHaveTextContent("user.update");
    cleanup();
  }
});
it("UFA-29 audit chart draws loading, failed with Retry, empty and populated states uf:A11.2", async () => {
  state.stats.mockReturnValueOnce(new Promise(() => {}));
  draw();
  expect(screen.getByTestId("audit-chart-loading")).toHaveTextContent(en["prim.state.loading"]);
  cleanup();
  state.stats.mockRejectedValueOnce(new TypeError("Failed to fetch"));
  draw();
  const alert = await screen.findByTestId("audit-chart-error");
  expect(alert).toHaveTextContent(en["failure.network"]);
  fireEvent.click(within(alert).getByRole("button", { name: en["common.retry"] }));
  expect(await screen.findByTestId("audit-chart-svg")).toBeInTheDocument();
  cleanup();
  state.stats.mockResolvedValueOnce({ ...stats, days: [] });
  draw();
  expect(await screen.findByTestId("audit-chart-empty")).toHaveTextContent(en["prim.state.empty"]);
  expect(screen.queryByTestId("audit-chart-svg")).toBeNull();
});
it("UFA-30 audit row expands and collapses by keyboard and pagination shows the capped total uf:A11.5", async () => {
  state.list.mockResolvedValue({ rows: [row], totalCount: 10001 });
  draw();
  await screen.findByTestId("audit-row-event-1");
  const table = screen.getByRole("table");
  const expand = within(table).getByRole("button", { name: en["admin.audit.expand"] });
  expand.focus();
  fireEvent.keyDown(expand, { key: "Enter" });
  fireEvent.click(expand, { detail: 0 });
  expect(await within(table).findByTestId("audit-row-event-1-expanded")).toHaveTextContent(
    "status",
  );
  const collapse = within(table).getByRole("button", { name: en["admin.audit.collapse"] });
  collapse.focus();
  fireEvent.keyDown(collapse, { key: "Enter" });
  fireEvent.click(collapse, { detail: 0 });
  expect(within(table).queryByTestId("audit-row-event-1-expanded")).toBeNull();
  expect(screen.getByTestId("audit-pagination-range")).toHaveTextContent(
    en["admin.audit.total.capped"],
  );
  expect(screen.getByTestId("audit-pagination-range")).not.toHaveTextContent("10001");
  fireEvent.click(screen.getByTestId("audit-pagination-next"));
  await waitFor(() =>
    expect(state.list).toHaveBeenLastCalledWith(expect.objectContaining({ offset: 25, limit: 25 })),
  );
});
it("UFA-31 audit list loads, fails with its own words and Retry reads again to an empty answer uf:A11.6", async () => {
  state.list.mockReturnValueOnce(new Promise(() => {}));
  draw();
  expect(await screen.findByTestId("data-table-loading")).toHaveTextContent(
    en["admin.audit.loading"],
  );
  cleanup();
  state.list.mockRejectedValueOnce(new TypeError("Failed to fetch"));
  draw();
  const alert = await screen.findByTestId("data-table-error");
  expect(alert).toHaveTextContent(en["admin.audit.error"]);
  expect(alert).toHaveTextContent(en["failure.network"]);
  const calls = state.list.mock.calls.length;
  fireEvent.click(within(alert).getByRole("button", { name: en["common.retry"] }));
  expect(await screen.findByTestId("data-table-empty")).toHaveTextContent(en["admin.audit.empty"]);
  expect(state.list).toHaveBeenCalledTimes(calls + 1);
});
