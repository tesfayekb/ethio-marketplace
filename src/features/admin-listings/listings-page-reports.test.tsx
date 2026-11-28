import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import { tableViewTestShell } from "@/components/shell/table-view-test-shell";
import { forgetTableViewsForTests } from "@/components/shell/table-view-store";

/**
 * INC-1351 (cursor-bundle-8c-3a) — the All listings page's one failed reports read is drawn ONCE for
 * the table through the shared notice (with Retry), never once for every row.
 */
const reads = vi.hoisted(() => ({
  list: vi.fn(),
  reports: vi.fn(),
  refetch: vi.fn(),
}));
vi.mock("@/i18n", () => ({
  useI18n: () => ({ t: (key: string) => key, language: "en", entities: {} }),
}));
vi.mock("@/lib/error-report", () => ({ reportBrowserFailure: vi.fn() }));
vi.mock("@tanstack/react-router", () => ({
  useNavigate: () => vi.fn(),
  Link: () => null,
  useRouterState: () => "/admin/listings",
}));
vi.mock("@tanstack/react-query", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@tanstack/react-query")>()),
  useQueryClient: () => ({ invalidateQueries: vi.fn() }),
}));
vi.mock("@/features/admin/admin-context", () => ({
  useAdminShell: () => ({ permissions: ["listings:review"] }),
}));
vi.mock("@/components/shell-context", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/components/shell-context")>()),
  useShell: () => ({ user: null, authLoading: false }),
}));
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
vi.mock("./use-listing-reports", () => ({ useOpenReportCounts: () => reads.reports() }));
vi.mock("@/features/admin-screening/use-photo-changes", () => ({
  useWarnedListings: () => ({ data: undefined }),
}));
vi.mock("@/features/posting/use-price-unit-labels", () => ({ usePriceUnitLabels: () => ({}) }));
import { AdminListingsPage } from "./listings-page";

afterEach(() => {
  localStorage.clear();
  forgetTableViewsForTests();
  reads.list.mockReset();
  reads.reports.mockReset();
  reads.refetch.mockReset();
});

/** Rows shaped like the reader's answer; their values are stand-ins, never real ads. */
const row = (n: number) => ({
  id: `00000000-0000-4000-8000-00000000000${n}`,
  title: `Row ${n}`,
  status: "active",
  tier: null,
  severe: false,
  sellerId: "00000000-0000-4000-8000-000000000009",
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
});

const answer = () => ({
  data: { rows: [row(1), row(2), row(3)], total: 3 },
  isSuccess: true,
  isLoading: false,
  isFetching: false,
  isPlaceholderData: false,
  error: null,
  refetch: vi.fn(),
});

it("ALP-U2 a failed reports read draws one notice for the table, with the old words and a Retry that reads again, however many rows", () => {
  reads.list.mockImplementation(answer);
  reads.reports.mockReturnValue({
    data: undefined,
    error: Object.assign(new Error("boom"), { status: 500 }),
    refetch: reads.refetch,
  });
  render(<AdminListingsPage />, { wrapper: tableViewTestShell("listings-reports-failed") });
  const notices = screen.getAllByTestId("listings-reports-failed");
  expect(notices).toHaveLength(1);
  expect(notices[0]?.textContent).toContain("admin.listings.reports.failed");
  expect(notices[0]?.getAttribute("data-failure-reason")).toBe("server");
  // The rows are drawn (the table and its card twin), and none of them carries an alert of its own.
  const statuses = document.querySelectorAll(
    '[data-testid^="listing-row-"][data-testid$="-status"]',
  );
  expect(statuses.length).toBeGreaterThanOrEqual(3);
  for (const status of statuses)
    expect(status.closest("span")?.querySelector("[role=alert]")).toBeNull();
  fireEvent.click(screen.getByTestId("listings-reports-failed-retry"));
  expect(reads.refetch).toHaveBeenCalledTimes(1);
});

it("ALP-U3 an answered reports read draws no notice", () => {
  reads.list.mockImplementation(answer);
  reads.reports.mockReturnValue({ data: new Map(), error: null, refetch: reads.refetch });
  render(<AdminListingsPage />, { wrapper: tableViewTestShell("listings-reports-ok") });
  expect(screen.queryByTestId("listings-reports-failed")).toBeNull();
});
