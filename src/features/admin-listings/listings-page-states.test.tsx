import { act, cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import type { TableFilter } from "@/components/shell/table-filters";
import { forgetTableViewsForTests } from "@/components/shell/table-view-store";
import { tableViewTestShell } from "@/components/shell/table-view-test-shell";
import { am } from "@/i18n/locales/am";
import { en } from "@/i18n/locales/en";
import { ownValue } from "@/lib/own-key";
import { readFailed } from "@/lib/reader-failure";

import type { AdminListingFilters, AdminListingRow } from "./use-admin-listings";

/**
 * UF-2 (DEC-493) — All listings: its filters, chips and Columns (A5.2); loading, empty, failed
 * with Retry, and the pager (A5.11); its words in Amharic (A5.12). Seams: the listings read, the
 * reference reads (markets, categories, levels), the permissions read and the router. The filter
 * panel is drawn as its declarations (its own tests cover the panel); the chips are the real ones.
 */
type Query = {
  data: { rows: AdminListingRow[]; total: number } | undefined;
  isLoading: boolean;
  isFetching: boolean;
  isSuccess: boolean;
  isPlaceholderData: boolean;
  error: unknown;
  refetch: () => void;
};
const mocks = vi.hoisted(() => ({
  list: vi.fn(),
  refetch: vi.fn(),
  language: "en" as "en" | "am",
}));
vi.mock("@/i18n", async (original) => ({
  ...(await original<typeof import("@/i18n")>()),
  useI18n: () => ({
    t: (key: string) => ownValue(mocks.language === "am" ? am : en, key) ?? key,
    language: mocks.language,
    has: () => true,
    entities: {},
  }),
}));
vi.mock("@/lib/error-report", () => ({ reportBrowserFailure: vi.fn() }));
vi.mock("@tanstack/react-router", () => ({ useNavigate: () => vi.fn(), Link: () => null }));
vi.mock("@tanstack/react-query", async (original) => ({
  ...(await original<typeof import("@tanstack/react-query")>()),
  useQueryClient: () => ({ invalidateQueries: vi.fn() }),
}));
vi.mock("@/features/admin/admin-context", () => ({ useAdminShell: () => ({ permissions: [] }) }));
vi.mock("@/features/permissions/usePermissions", () => ({
  usePermissions: () => ({ permissions: [], loading: false, error: null }),
}));
vi.mock("@/features/auth/mfa/step-up-gate", () => ({
  StepUpGate: ({ children }: { children: (guard: unknown) => React.ReactNode }) =>
    children(vi.fn()),
}));
vi.mock("@/components/shell/location-data", () => ({
  useOpenMarkets: () => ({
    markets: [{ code: "ZZ", nameEn: "Testland", anchorId: null }],
    isLoading: false,
  }),
}));
vi.mock("@/features/categories/category-tree", () => ({
  useCategoryTree: () => ({ tree: [], isLoading: false }),
  rootsOf: () => [{ id: "cat-1", nameEn: "Vehicles", nameAm: null }],
}));
vi.mock("@/features/levels/use-level-rows", () => ({
  useLevelRows: () => ({ rows: [], isLoading: false }),
}));
vi.mock("./use-admin-listings", async (importOriginal) => ({
  ...(await importOriginal<typeof import("./use-admin-listings")>()),
  useAdminListings: mocks.list,
}));
vi.mock("./use-listing-reports", () => ({ useOpenReportCounts: () => ({ data: undefined }) }));
vi.mock("@/features/admin-screening/use-photo-changes", () => ({
  useWarnedListings: () => ({ data: undefined, error: null }),
}));
vi.mock("@/features/posting/use-price-unit-labels", () => ({ usePriceUnitLabels: () => ({}) }));
vi.mock("@/components/shell/filter-chips", async (original) => ({
  ...(await original<typeof import("@/components/shell/filter-chips")>()),
  FiltersButton: ({ testid, filters }: { testid: string; filters: readonly TableFilter[] }) => (
    <div data-testid={testid}>
      {filters.map((filter) =>
        filter.kind === "select" ? (
          <fieldset key={filter.id} aria-label={filter.name}>
            {filter.options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => filter.onChange([...filter.value, option.value])}
              >
                {option.label}
              </button>
            ))}
          </fieldset>
        ) : filter.kind === "dates" ? (
          <fieldset key={filter.id} aria-label={filter.fromLabel}>
            {filter.fromLabel} {filter.toLabel}
          </fieldset>
        ) : null,
      )}
    </div>
  ),
}));

import { AdminListingsPage } from "./listings-page";

const ROW = (n: number): AdminListingRow => ({
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
const answered = (rows: AdminListingRow[], total = rows.length): Query => ({
  data: { rows, total },
  isLoading: false,
  isFetching: false,
  isSuccess: true,
  isPlaceholderData: false,
  error: null,
  refetch: mocks.refetch,
});
const lastFilters = (): AdminListingFilters => {
  const enabled = mocks.list.mock.calls.filter((call) => call[1] === true);
  const last = enabled.at(-1);
  if (last === undefined) throw new Error("the list was never read");
  return last[0] as AdminListingFilters;
};
const draw = () => render(<AdminListingsPage />, { wrapper: tableViewTestShell("listings-uf2") });

describe("All listings (UF-2)", () => {
  beforeEach(() => {
    mocks.list.mockReset();
    mocks.refetch.mockReset();
    mocks.language = "en";
  });
  afterEach(() => {
    cleanup();
    localStorage.clear();
    forgetTableViewsForTests();
  });

  it("UFA-14 the filters offer country, category, seller and dates; a choice is read and shown as a chip; Columns is there uf:A5.2", async () => {
    mocks.list.mockReturnValue(answered([ROW(1)]));
    draw();
    const panel = screen.getByTestId("listings-filters");
    expect(within(panel).getByRole("group", { name: en["location.country"] })).toBeTruthy();
    expect(
      within(panel).getByRole("group", { name: en["admin.listings.filter.category"] }),
    ).toBeTruthy();
    expect(
      within(panel).getByRole("group", { name: en["admin.listings.filter.from"] }).textContent,
    ).toContain(en["admin.listings.filter.to"]);
    await act(async () => {
      fireEvent.click(within(panel).getByRole("button", { name: "Testland" }));
    });
    expect(lastFilters().country).toEqual(["ZZ"]);
    await act(async () => {
      fireEvent.click(within(panel).getByRole("button", { name: /Vehicles/ }));
    });
    expect(lastFilters().category).toEqual(["cat-1"]);
    const chips = screen.getByTestId("listings-chips");
    expect(chips.textContent).toContain("Testland");
    expect(screen.getByTestId("listings-columns")).toBeTruthy();
  });

  it("UFA-15 loading, empty, a failed read with Retry, and a pager that asks for the next page uf:A5.11", async () => {
    mocks.list.mockReturnValue({
      ...answered([]),
      data: undefined,
      isLoading: true,
      isSuccess: false,
    });
    const first = draw();
    expect(screen.getByRole("status").textContent).toBe(en["common.loading"]);
    first.unmount();
    mocks.list.mockReturnValue(answered([]));
    const second = draw();
    expect(screen.getByTestId("listings-empty").textContent).toBe(en["admin.listings.empty"]);
    second.unmount();
    mocks.list.mockReturnValue({
      ...answered([]),
      data: undefined,
      isSuccess: false,
      error: readFailed(new Error("down"), 503),
    });
    const third = draw();
    const notice = await screen.findByTestId("data-table-error");
    expect(notice.textContent).toContain(en["common.error"]);
    expect(notice.textContent).toContain(en["failure.server"]);
    fireEvent.click(screen.getByRole("button", { name: en["common.retry"] }));
    expect(mocks.refetch).toHaveBeenCalledTimes(1);
    third.unmount();
    mocks.list.mockReturnValue(answered([ROW(1)], 60));
    draw();
    const before = lastFilters().offset;
    await act(async () => {
      fireEvent.click(screen.getByTestId("listings-pagination-next"));
    });
    expect(lastFilters().offset).toBeGreaterThan(before);
  });

  it("UFA-16 All listings' words are the Amharic catalogue's, none English uf:A5.12", () => {
    mocks.language = "am";
    mocks.list.mockReturnValue(answered([]));
    draw();
    const text = document.body.textContent ?? "";
    expect(text).toContain(am["admin.listings.empty"]);
    expect(text).not.toContain(en["admin.listings.empty"]);
    for (const key of ["admin.listings.filter.category", "location.country"] as const)
      expect(screen.getByRole("group", { name: am[key] }), key).toBeTruthy();
    expect(screen.getByRole("textbox", { name: am["admin.listings.searchLabel"] })).toBeTruthy();
  });
});
