import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import type { FeedListing } from "@/features/feed/feed-page";

const similarListings = vi.fn<() => Promise<FeedListing[]>>();
vi.mock("./similar", () => ({
  similarListings: (...args: unknown[]) => similarListings(...(args as [])),
}));
vi.mock("@/i18n", () => ({
  useI18n: () => ({
    t: (key: string) => key,
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
vi.mock("@tanstack/react-router", () => ({
  Link: ({ children, ...props }: { children?: React.ReactNode }) => <a {...props}>{children}</a>,
}));

const { SimilarAds } = await import("./similar-ads");

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

const props = { categoryId: "c-leaf", placeId: "place-1", excludeId: "l-self" };

describe("SIM-4 the similar-ads section", () => {
  it("draws nothing while loading and nothing when the answer is empty", async () => {
    let resolve: (cards: FeedListing[]) => void = () => {};
    similarListings.mockReturnValue(
      new Promise<FeedListing[]>((done) => {
        resolve = done;
      }),
    );
    const { container, rerender } = render(<SimilarAds {...props} />);
    // INC-704: while loading the container holds no element at all (no frame).
    expect(container.firstElementChild).toBeNull();
    resolve([]);
    await waitFor(() => expect(similarListings).toHaveBeenCalledTimes(1));
    rerender(<SimilarAds {...props} />);
    await waitFor(() => expect(container.firstElementChild).toBeNull());
    expect(container.textContent).toBe("");
  });

  it("draws the heading and one card per listing when there are some", async () => {
    similarListings.mockResolvedValue(
      Array.from({ length: 10 }, (_, index) => card(`l-${index + 1}`)),
    );
    render(<SimilarAds {...props} />);
    const section = await screen.findByTestId("listing-similar");
    // INC-704: with cards, the section sits inside the card frame.
    expect(section.parentElement?.className).toContain("rounded-lg");
    expect(section.getAttribute("aria-labelledby")).toBe("listing-similar-title");
    expect(screen.getByRole("heading", { name: "adPage.similar.title" })).toBeTruthy();
    await waitFor(() => expect(section.querySelectorAll("ul > li")).toHaveLength(10));
    expect(section.querySelector("ul")?.className).toContain("grid-cols-3");
    expect(section.querySelector("ul")?.className).toContain("sm:grid-cols-4");
    expect(section.querySelector("ul")?.className).toContain("lg:grid-cols-5");
    const items = section.querySelectorAll("ul > li");
    for (const index of [6, 7]) expect(items[index]?.className).toBe("hidden sm:block");
    for (const index of [8, 9]) expect(items[index]?.className).toBe("hidden lg:block");
  });
});
