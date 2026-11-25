import { fireEvent, render, screen } from "@testing-library/react";
import type { ReactElement } from "react";
import { afterEach, expect, it, vi } from "vitest";
import { tableViewTestShell } from "@/components/shell/table-view-test-shell";
import { forgetTableViewsForTests } from "@/components/shell/table-view-store";

const reads = vi.hoisted(() => ({
  list: vi.fn<
    (
      filters: unknown,
      enabled: boolean,
    ) => { data: undefined; isLoading: boolean; isFetching: boolean; error: null }
  >(() => ({ data: undefined, isLoading: false, isFetching: false, error: null })),
  stats: vi.fn<() => Record<string, unknown>>(() => ({ data: undefined, isLoading: false })),
  facets: vi.fn<() => Record<string, unknown>>(() => ({
    data: { actions: [], entityTypes: [] },
    isLoading: false,
  })),
  table: vi.fn<(props: Record<string, unknown>) => null>(() => null),
}));
vi.mock("@/i18n", () => ({ useI18n: () => ({ t: (key: string) => key, language: "en" }) }));
vi.mock("./use-audit", () => ({
  useAuditList: reads.list,
  useAuditFacets: reads.facets,
  useAuditStats: reads.stats,
}));
vi.mock("@/components/shell/data-table", () => ({
  DataTable: reads.table,
  DataTablePagination: () => null,
}));
vi.mock("@/components/shell/chart-frame", () => ({ ChartFrame: () => null }));
import { AdminAuditPage } from "./audit-page";

afterEach(() => {
  localStorage.clear();
  forgetTableViewsForTests();
  reads.list.mockClear();
});
it("AUD-U1 the Audit log's first enabled read carries its account's kept date pair", () => {
  forgetTableViewsForTests();
  localStorage.setItem(
    "ethio:view:audit-dates:admin-audit",
    JSON.stringify({ v: 1, dates: { "audit-filter": { from: "2026-11-01", to: "2026-11-02" } } }),
  );
  render(<AdminAuditPage />, { wrapper: tableViewTestShell("audit-dates") });
  expect(reads.list).toHaveBeenCalled();
  const enabled = reads.list.mock.calls.filter((call) => call[1]);
  expect(enabled.length).toBeGreaterThan(0);
  for (const call of enabled)
    expect(call[0]).toMatchObject({ from: "2026-11-01", to: "2026-11-02" });
});

it("AUDT-U1 a failed stats read draws the four tiles failed, none with a number", () => {
  reads.stats.mockReturnValue({
    data: undefined,
    isLoading: false,
    isError: true,
    error: new Error("down"),
    refetch: vi.fn(),
  });
  render(<AdminAuditPage />, { wrapper: tableViewTestShell("audit-failed") });
  const tiles = {
    "24h": "events24h",
    "7d": "events7d",
    impersonations: "activeImpersonations",
    "top-action": "topAction",
  } as const;
  for (const [id, label] of Object.entries(tiles)) {
    // The label keys carry digits (events24h): the tile reads exactly label, the failure's own
    // words (bundle 10b: the read's error reaches the tile's notice), Retry.
    expect(screen.getByTestId(`audit-stat-${id}-failed`).textContent).toBe(
      `admin.audit.stat.${label}failure.servercommon.retry`,
    );
    expect(screen.queryByTestId(`audit-stat-${id}`)).toBeNull();
  }
});

it("AUD-U2 a failed rows read hands the table its own refetch as Retry", () => {
  const refetch = vi.fn();
  reads.list.mockReturnValue({
    data: undefined,
    isLoading: false,
    isFetching: false,
    error: new Error("down"),
    refetch,
  } as never);
  render(<AdminAuditPage />, { wrapper: tableViewTestShell("audit-rows-failed") });
  const props = reads.table.mock.calls.at(-1)?.[0];
  expect(props?.["error"]).toBeInstanceOf(Error);
  expect(typeof props?.["retry"]).toBe("function");
  (props?.["retry"] as () => void)();
  expect(refetch).toHaveBeenCalledTimes(1);
});

it("AUD-U3 a failed facets read draws the notice with Retry, never silent empty choices", () => {
  const refetch = vi.fn();
  reads.facets.mockReturnValue({
    data: undefined,
    isLoading: false,
    error: new TypeError("Failed to fetch"),
    refetch,
  });
  render(<AdminAuditPage />, { wrapper: tableViewTestShell("audit-facets-failed") });
  const props = reads.table.mock.calls.at(-1)?.[0];
  render(props?.["toolbar"] as ReactElement, { wrapper: tableViewTestShell("audit-facets-bar") });
  expect(screen.getByTestId("audit-facets-error")).toHaveTextContent("failure.network");
  fireEvent.click(screen.getByTestId("audit-facets-error-retry"));
  expect(refetch).toHaveBeenCalledTimes(1);
});
