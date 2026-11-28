import { render, screen, waitFor } from "@testing-library/react";
import type { ReactElement } from "react";
import { expect, it, vi } from "vitest";

import { tableViewTestShell } from "@/components/shell/table-view-test-shell";
import { readFailed } from "@/lib/reader-failure";

const reads = vi.hoisted(() => ({
  facets: vi.fn<() => Record<string, unknown>>(),
  table: vi.fn<(props: Record<string, unknown>) => null>(() => null),
}));
vi.mock("@/i18n", () => ({ useI18n: () => ({ t: (key: string) => key, language: "en" }) }));
vi.mock("./use-audit", () => ({
  useAuditList: () => ({ data: undefined, isLoading: false, isFetching: false, error: null }),
  useAuditFacets: reads.facets,
  useAuditStats: () => ({ data: undefined, isLoading: false }),
}));
vi.mock("@/components/shell/data-table", () => ({
  DataTable: reads.table,
  DataTablePagination: () => null,
}));
vi.mock("@/components/shell/chart-frame", () => ({ ChartFrame: () => null }));
import { AdminAuditPage } from "./audit-page";

function drawToolbar(name: string) {
  render(<AdminAuditPage />, { wrapper: tableViewTestShell(name) });
  const props = reads.table.mock.calls.at(-1)?.[0];
  render(props?.["toolbar"] as ReactElement, { wrapper: tableViewTestShell(`${name}-bar`) });
}

it("UFA-83 a failed facets read is said once for both choices with Retry; a refused one offers none uf:A11.4", async () => {
  const refetch = vi.fn();
  reads.facets.mockReturnValue({
    data: undefined,
    isLoading: false,
    error: new TypeError("Failed to fetch"),
    refetch,
  });
  drawToolbar("audit-facets-a");
  expect(screen.getAllByTestId("audit-facets-error")).toHaveLength(1);
  expect(screen.getByTestId("audit-facets-error")).toHaveTextContent("failure.network");
  screen.getByRole("button", { name: "common.retry" }).click();
  expect(refetch).toHaveBeenCalledTimes(1);
  document.body.innerHTML = "";

  reads.facets.mockReturnValue({
    data: undefined,
    isLoading: false,
    error: readFailed({ code: "P0D01", message: "badValue:entity" }, 400),
    refetch,
  });
  drawToolbar("audit-facets-b");
  await waitFor(() =>
    expect(screen.getByTestId("audit-facets-error")).toHaveAttribute(
      "data-failure-reason",
      "refused",
    ),
  );
  expect(screen.queryByRole("button", { name: "common.retry" })).toBeNull();
});
