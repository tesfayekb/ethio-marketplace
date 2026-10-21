import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";

import type { GuardFn } from "@/features/auth/mfa/use-step-up";

import { listCategories } from "@/features/admin-categories/categories-service";
import type { CategoryRow } from "@/features/admin-categories/categories-service";
import type { CountryRow } from "./countries-service";
import { setCountryRootOrder } from "./countries-service";
import { CountryRailOrderDialog } from "./country-verb-dialogs";

vi.mock("@/i18n", () => ({
  useI18n: () => ({
    t: (key: string) => key,
    language: "en",
    setLanguage: () => {},
    publicLanguages: [],
  }),
}));

vi.mock("@/features/admin-categories/category-dialogs", () => ({
  CategoryModal: ({ children, testid }: { children: ReactNode; testid: string }) => (
    <div data-testid={testid}>{children}</div>
  ),
}));

vi.mock("@/features/admin-categories/categories-service", async (importOriginal) => ({
  ...(await importOriginal<typeof import("@/features/admin-categories/categories-service")>()),
  listCategories: vi.fn(),
}));

vi.mock("./countries-service", async (importOriginal) => ({
  ...(await importOriginal<typeof import("./countries-service")>()),
  setCountryRootOrder: vi.fn(),
}));

const guard: GuardFn = (action) => Promise.resolve(action());

function root(id: string, slug: string, displayOrder: number): CategoryRow {
  return {
    id,
    parentId: null,
    slug,
    nameEn: slug,
    icon: null,
    displayOrder,
    isActive: true,
    isCatchall: false,
    allowListings: true,
    priceEnabled: false,
    expiryDays: null,
    visibleFrom: null,
    visibleUntil: null,
    listingCount: 0,
    exclusionCount: 0,
    excludedCountryCodes: [],
    hasImage: false,
    attributeCount: 0,
    cardAttributeCount: 0,
    secondaryParentNames: [],
  };
}

const country: CountryRow = {
  code: "ET",
  nameEn: "Ethiopia",
  isActive: true,
  unitSystem: "metric",
  currencyCode: "ETB",
  displayOrder: 1,
  updatedAt: "2026-10-21T00:00:00Z",
  anchorId: null,
  anchorActive: false,
  placeCount: 0,
  activePlaceCount: 0,
  scopedRoleCount: 0,
  rootOrder: [],
};

describe("CountryRailOrderDialog (INC-814)", () => {
  it("a save refused notARoot re-reads the roots and rebuilds the list from the new read", async () => {
    vi.mocked(listCategories)
      .mockResolvedValueOnce([root("cat-a", "vehicles", 1), root("cat-b", "property", 2)])
      .mockResolvedValue([root("cat-b", "property", 2)]);
    vi.mocked(setCountryRootOrder).mockRejectedValue({
      message: "notARoot",
      code: "P0001",
      details: null,
      hint: null,
    });

    render(
      <QueryClientProvider
        client={new QueryClient({ defaultOptions: { queries: { retry: false } } })}
      >
        <CountryRailOrderDialog row={country} guard={guard} onClose={() => {}} />
      </QueryClientProvider>,
    );

    await screen.findByTestId("country-rail-cat-a");
    expect(screen.getByTestId("country-rail-cat-b")).toBeInTheDocument();

    fireEvent.click(screen.getByTestId("country-rail-save"));

    // The refusal is a plain object, not an Error: the branch must still run.
    await waitFor(() => expect(vi.mocked(listCategories)).toHaveBeenCalledTimes(2));
    // The root gone from the fresh read is gone from the list.
    await waitFor(() => expect(screen.queryByTestId("country-rail-cat-a")).not.toBeInTheDocument());
    expect(screen.getByTestId("country-rail-cat-b")).toBeInTheDocument();
  });
});
