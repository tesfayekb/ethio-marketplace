import { render, screen } from "@testing-library/react";
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
}));
vi.mock("@/i18n", () => ({ useI18n: () => ({ t: (key: string) => key, language: "en" }) }));
vi.mock("./use-audit", () => ({
  useAuditList: reads.list,
  useAuditFacets: () => ({ data: { actions: [], entityTypes: [] }, isLoading: false }),
  useAuditStats: reads.stats,
}));
vi.mock("@/components/shell/data-table", () => ({
  DataTable: () => null,
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
    // The label keys carry digits (events24h): the tile reads exactly label, words, Retry.
    expect(screen.getByTestId(`audit-stat-${id}-failed`).textContent).toBe(
      `admin.audit.stat.${label}prim.stat.failedcommon.retry`,
    );
    expect(screen.queryByTestId(`audit-stat-${id}`)).toBeNull();
  }
});
