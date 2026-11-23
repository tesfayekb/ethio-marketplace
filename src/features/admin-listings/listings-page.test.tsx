import { render } from "@testing-library/react";
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
}));
vi.mock("@/i18n", () => ({
  useI18n: () => ({ t: (key: string) => key, language: "en", entities: {} }),
}));
vi.mock("@tanstack/react-router", () => ({ useNavigate: () => vi.fn(), Link: () => null }));
vi.mock("@tanstack/react-query", () => ({
  useQueryClient: () => ({ invalidateQueries: vi.fn() }),
}));
vi.mock("@/features/admin/admin-context", () => ({ useAdminShell: () => ({ permissions: [] }) }));
vi.mock("@/features/auth/use-auth", () => ({ useAuth: () => ({ user: null }) }));
vi.mock("@/features/auth/mfa/step-up-gate", () => ({ StepUpGate: () => null }));
vi.mock("@/components/shell/location-data", () => ({
  useOpenMarkets: () => ({ markets: [], isLoading: false }),
}));
vi.mock("@/features/categories/category-tree", () => ({
  useCategoryTree: () => ({ tree: [], isLoading: false }),
  rootsOf: () => [],
}));
vi.mock("@/features/levels/use-level-rows", () => ({
  useLevelRows: () => ({ rows: [], isLoading: false }),
}));
vi.mock("./use-admin-listings", () => ({ useAdminListings: reads.list }));
vi.mock("./use-listing-reports", () => ({ useOpenReportCounts: () => ({ data: undefined }) }));
vi.mock("@/features/admin-screening/use-photo-changes", () => ({
  useWarnedListings: () => ({ data: undefined }),
}));
vi.mock("@/features/posting/use-price-unit-labels", () => ({ usePriceUnitLabels: () => ({}) }));
import { AdminListingsPage } from "./listings-page";

afterEach(() => {
  localStorage.clear();
  forgetTableViewsForTests();
  reads.list.mockClear();
});
it("ALP-U1 All listings' first enabled read carries its account's kept date pair", () => {
  forgetTableViewsForTests();
  localStorage.setItem(
    "ethio:view:listings-dates:admin-listings",
    JSON.stringify({
      v: 1,
      dates: { "listings-filter": { from: "2026-11-01", to: "2026-11-02" } },
    }),
  );
  render(<AdminListingsPage />, { wrapper: tableViewTestShell("listings-dates") });
  expect(reads.list).toHaveBeenCalled();
  const enabled = reads.list.mock.calls.filter((call) => call[1]);
  expect(enabled.length).toBeGreaterThan(0);
  for (const call of enabled)
    expect(call[0]).toMatchObject({ from: "2026-11-01", to: "2026-11-02" });
});
