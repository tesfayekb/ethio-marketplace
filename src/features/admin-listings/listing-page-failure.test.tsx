import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, expect, it, vi } from "vitest";

const seams = vi.hoisted(() => ({
  query: { isLoading: false, error: null, data: undefined, refetch: vi.fn() } as Record<
    string,
    unknown
  >,
}));

vi.mock("@/i18n", () => ({
  useI18n: () => ({
    t: (key: string) => key,
    has: () => false,
    language: "en",
    entities: {},
  }),
}));
vi.mock("@tanstack/react-router", () => ({
  useNavigate: () => vi.fn(),
  Link: ({ children }: { children: unknown }) => <a href="/">{children as string}</a>,
}));
vi.mock("@tanstack/react-query", async (original) => ({
  ...(await original<typeof import("@tanstack/react-query")>()),
  useQueryClient: () => ({}),
}));
vi.mock("@/features/admin/admin-context", () => ({ useAdminShell: () => ({ permissions: [] }) }));
vi.mock("@/features/permissions/use-may-call", () => ({
  useMayCall: () => ({ mayCall: () => false }),
}));
vi.mock("@/components/shell-context", () => ({ useShell: () => ({ user: null }) }));
vi.mock("./use-listing-reports", () => ({ useListingReports: () => ({}) }));
vi.mock("./use-admin-listing", async (original) => ({
  ...(await original<typeof import("./use-admin-listing")>()),
  useAdminListing: () => seams.query,
  useAdminListingCertifications: () => ({}),
}));
vi.mock("@/features/categories/category-tree", async (original) => ({
  ...(await original<typeof import("@/features/categories/category-tree")>()),
  useCategoryTree: () => ({ tree: { byId: new Map() } }),
}));
vi.mock("@/features/admin-screening/use-screening", () => ({
  useScreeningPhotos: () => ({}),
  useScreeningSchema: () => ({}),
}));
vi.mock("@/features/levels/use-level-rows", () => ({
  useLevelLook: () => null,
  useLevelRows: () => ({ rows: [], isLoading: false, error: null }),
}));
vi.mock("@/features/posting/use-price-unit-labels", () => ({ usePriceUnitLabels: () => null }));

import { readFailed } from "@/lib/reader-failure";

import { AdminListingPage } from "./listing-page";

beforeEach(() => {
  seams.query = { isLoading: false, error: null, data: undefined, refetch: vi.fn() };
});

it("ALP-U4 a failed listing read draws the shared notice with Retry, and the not-found answer keeps its words", () => {
  seams.query = {
    isLoading: false,
    error: readFailed("route 503", 503),
    data: undefined,
    refetch: vi.fn(),
  };
  render(<AdminListingPage listingId="listing-1" />);
  const failed = screen.getByTestId("listing-error");
  expect(failed).toHaveTextContent("common.error");
  expect(failed).toHaveAttribute("data-failure-reason", "server");
  fireEvent.click(screen.getByTestId("listing-error-retry"));
  expect(seams.query["refetch"]).toHaveBeenCalledTimes(1);
});

it("ALP-U5 a missing listing says so in its own line, with no Retry", () => {
  seams.query = {
    isLoading: false,
    error: new Error("listingNotFound"),
    data: undefined,
    refetch: vi.fn(),
  };
  render(<AdminListingPage listingId="listing-1" />);
  expect(screen.getByTestId("listing-error")).toHaveTextContent("admin.listings.detail.notFound");
  expect(screen.queryByTestId("listing-error-retry")).toBeNull();
});
