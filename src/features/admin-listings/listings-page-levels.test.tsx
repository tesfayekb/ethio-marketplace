import { cleanup, fireEvent, screen, waitFor, within } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { renderPanel as render } from "@/components/ui/dialog-parts-test-render";
import type { TableFilter } from "@/components/shell/table-filters";
import { forgetTableViewsForTests } from "@/components/shell/table-view-store";
import { tableViewTestShell } from "@/components/shell/table-view-test-shell";
import { en } from "@/i18n/locales/en";
import { ownValue } from "@/lib/own-key";
import { readFailed } from "@/lib/reader-failure";

import type { AdminListingRow } from "./use-admin-listings";

/**
 * UF-3 (INC-1346, INC-1355) — All listings: a failed levels read is said once, beside the filters,
 * with a Retry; a refused one offers none. Preamble copied from listings-page-states.test.tsx.
 * Previously: UF-2 (DEC-493) — All listings: its filters, chips and Columns (A5.2); loading, empty, failed
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
  language: "en" as const,
}));
vi.mock("@/i18n", async (original) => ({
  ...(await original<typeof import("@/i18n")>()),
  useI18n: () => ({
    t: (key: string) => ownValue(en, key) ?? key,
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
  rootsOf: () => [
    { id: "cat-1", nameEn: "Vehicles", nameAm: null },
    { id: "cat-2", nameEn: "Furniture", nameAm: null },
  ],
}));
const levelState = vi.hoisted(() => ({
  error: null as unknown,
  retry: vi.fn(),
}));
vi.mock("@/features/levels/use-level-rows", () => ({
  useLevelRows: () => ({
    rows: [],
    isLoading: false,
    error: levelState.error,
    retry: levelState.retry,
  }),
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
            <label>
              {filter.fromLabel}
              <input
                type="text"
                value={filter.value.from}
                onChange={(event) => filter.onChange({ ...filter.value, from: event.target.value })}
              />
            </label>
            <label>
              {filter.toLabel}
              <input
                type="text"
                value={filter.value.to}
                onChange={(event) => filter.onChange({ ...filter.value, to: event.target.value })}
              />
            </label>
          </fieldset>
        ) : filter.kind === "text" ? (
          <label key={filter.id}>
            {filter.name}
            <input
              type="text"
              value={filter.value}
              onChange={(event) => filter.onChange(event.target.value)}
            />
          </label>
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
const draw = () =>
  render(<AdminListingsPage />, { wrapper: tableViewTestShell("listings-uf3-levels") });

describe("All listings, failed levels read (UF-3)", () => {
  beforeEach(() => {
    mocks.list.mockReset();
    mocks.list.mockReturnValue(answered([ROW(1)]));
    levelState.retry.mockReset();
  });
  afterEach(() => {
    cleanup();
    localStorage.clear();
    forgetTableViewsForTests();
  });

  it("UFF-5 a failed levels read draws one notice with the network words, and its Retry reads the levels again", () => {
    levelState.error = new TypeError("Failed to fetch");
    draw();
    expect(screen.getAllByTestId("listings-levels-error")).toHaveLength(1);
    expect(screen.getByTestId("listings-levels-error")).toHaveTextContent(en["failure.network"]);
    fireEvent.click(
      within(screen.getByTestId("listings-levels-error")).getByRole("button", {
        name: en["common.retry"],
      }),
    );
    expect(levelState.retry).toHaveBeenCalledTimes(1);
  });
  it("UFF-6 a refused levels read is said as refused and offers no Retry", async () => {
    levelState.error = readFailed({ code: "P0D01", message: "badValue:level" }, 400);
    draw();
    await waitFor(() =>
      expect(screen.getByTestId("listings-levels-error")).toHaveAttribute(
        "data-failure-reason",
        "refused",
      ),
    );
    expect(
      within(screen.getByTestId("listings-levels-error")).queryByRole("button", {
        name: en["common.retry"],
      }),
    ).toBeNull();
  });
});
