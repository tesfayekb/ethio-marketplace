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
vi.mock("@/components/shell-context", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/components/shell-context")>()),
  useShell: () => ({ user: null, authLoading: false }),
}));
// INC-1281 — the screens ask useMayCall, which reads the permissions read: the same list as the shell's.
vi.mock("@/features/permissions/usePermissions", async () => {
  const { useAdminShell } = await import("@/features/admin/admin-context");
  return {
    usePermissions: () => ({
      permissions: useAdminShell().permissions,
      loading: false,
      error: null,
    }),
  };
});
vi.mock("@/features/auth/mfa/step-up-gate", () => ({
  StepUpGate: ({ children }: { children: (guard: unknown) => React.ReactNode }) =>
    children(vi.fn()),
}));
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
vi.mock("./use-admin-listings", async (importOriginal) => ({
  ...(await importOriginal<typeof import("./use-admin-listings")>()),
  useAdminListings: reads.list,
}));
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

/** A row shaped like the reader's answer; its values are a stand-in, never a real ad. */
const ROW = {
  id: "00000000-0000-4000-8000-000000000001",
  title: "Row",
  status: "active",
  tier: null,
  severe: false,
  sellerId: "00000000-0000-4000-8000-000000000002",
  sellerAlias: null,
  sellerBusinessName: null,
  sellerEmail: null,
  categoryId: null,
  categoryNameEn: null,
  categoryNameAm: null,
  placeNameEn: null,
  placeNameAm: null,
  countryCode: null,
  priceMode: "fixed",
  priceAmount: null,
  priceCurrency: null,
  pricePeriod: null,
  priceBp: null,
  priceUnit: null,
  priceUnitText: null,
  photoCount: 0,
  createdAt: "2026-11-01T00:00:00Z",
  publishedAt: null,
  expiresAt: null,
};

it("ALT-U1 a read that has not answered draws no total: no range, and Next stays disabled", () => {
  reads.list.mockImplementation(
    () =>
      ({
        data: { rows: [ROW], total: 40 },
        isSuccess: false,
        isLoading: false,
        isFetching: true,
        error: null,
      }) as never,
  );
  render(<AdminListingsPage />, { wrapper: tableViewTestShell("listings-unanswered") });
  expect(document.body.textContent ?? "").not.toMatch(/prim\.table\.of 40/);
  expect(document.querySelector('[data-testid="listings-pagination-range"]')).toBeNull();
  expect(document.querySelector('[data-testid="listings-pagination-next"]')).toHaveProperty(
    "disabled",
    true,
  );
});
