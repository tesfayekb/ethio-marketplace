import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import type { FeedListing } from "@/features/feed/feed-page";
import type { UseSellerFeed } from "./use-seller-feed";

/**
 * Bundle 19 turn 16 — SL-4: the title from the business name else the alias,
 * the cards, and the empty, not-found and error states with Retry.
 */

const hookState: { current: UseSellerFeed } = {
  current: {
    seller: null,
    cards: [],
    hasMore: false,
    isLoading: true,
    isLoadingMore: false,
    error: false,
    notFound: false,
    loadMore: () => {},
    retry: () => {},
  },
};
vi.mock("./use-seller-feed", () => ({
  useSellerFeed: () => hookState.current,
}));
vi.mock("@/i18n", () => ({
  useI18n: () => ({
    t: (key: string) => (key === "sellerPage.title" ? "Ads by {name}" : key),
    language: "en",
    setLanguage: () => {},
    entities: {},
  }),
}));
vi.mock("@/features/feed/use-card-photos", () => ({
  useCardPhotos: () => () => null,
}));
vi.mock("@/features/categories/category-tree", () => ({
  useCategoryTree: () => ({ tree: null }),
  nearestCategoryPicture: () => null,
}));
vi.mock("@/features/posting/use-price-unit-labels", () => ({
  usePriceUnitLabels: () => null,
}));
vi.mock("@/components/layout/page-shell", () => ({
  PageShell: ({ children }: { children?: React.ReactNode }) => <div>{children}</div>,
}));
vi.mock("@/components/marketplace/listing-card", () => ({
  ListingCard: ({ listing }: { listing: { id: string } }) => <div>{listing.id}</div>,
}));

const { SellerPage } = await import("./seller-page");

const card = (id: string): FeedListing => ({
  id,
  publicId: null,
  title: `Ad ${id}`,
  tier: "regular",
  priceAmount: 1000,
  priceCurrency: "ETB",
  priceMode: "fixed",
  priceBp: null,
  priceNegotiable: false,
  pricePeriod: "once",
  priceUnit: null,
  priceUnitText: null,
  photosSoon: false,
  coverPhotoId: null,
  soldWord: null,
  reserved: false,
  priceWas: null,
  publishedAt: "2026-10-17T08:00:00Z",
  categoryId: "c-leaf",
  locationId: null,
  locationNameEn: null,
  locationNameAm: null,
  step: 1,
});

const base: UseSellerFeed = {
  seller: { alias: "abebe", businessName: null, memberSince: "2026-01-01T00:00:00Z" },
  cards: [],
  hasMore: false,
  isLoading: false,
  isLoadingMore: false,
  error: false,
  notFound: false,
  loadMore: () => {},
  retry: () => {},
};

describe("SellerPage", () => {
  it("SL-4 the title from the business name else the alias, the cards, the empty, not-found and error states with Retry", async () => {
    hookState.current = { ...base, cards: [card("l-1"), card("l-2")] };
    const { rerender, unmount } = render(<SellerPage sellerKey="abebe" />);
    expect(screen.getByTestId("seller-page-title").textContent).toContain("abebe");
    expect(screen.getAllByTestId("seller-page-card")).toHaveLength(2);

    // A business name outranks the alias in the title.
    hookState.current = {
      ...base,
      seller: { alias: "abebe", businessName: "Abebe Trading", memberSince: null },
      cards: [card("l-1")],
    };
    rerender(<SellerPage sellerKey="abebe" />);
    expect(screen.getByTestId("seller-page-title").textContent).toContain("Abebe Trading");

    // Empty.
    hookState.current = { ...base };
    rerender(<SellerPage sellerKey="abebe" />);
    expect(screen.getByTestId("seller-page-empty")).toBeDefined();
    unmount();

    // Not found.
    hookState.current = { ...base, seller: null, notFound: true };
    const missing = render(<SellerPage sellerKey="nobody" />);
    expect(missing.getByTestId("seller-page-not-found")).toBeDefined();
    missing.unmount();

    // Error with Retry.
    const retry = vi.fn();
    hookState.current = { ...base, seller: null, error: true, retry };
    const failed = render(<SellerPage sellerKey="abebe" />);
    expect(failed.getByTestId("seller-page-error")).toBeDefined();
    failed.getByTestId("seller-page-retry").click();
    expect(retry).toHaveBeenCalledTimes(1);
    failed.unmount();

    // Loading.
    hookState.current = { ...base, seller: null, isLoading: true };
    const loading = render(<SellerPage sellerKey="abebe" />);
    await waitFor(() => expect(loading.getByTestId("seller-page-loading")).toBeDefined());
    loading.unmount();
  });
});
