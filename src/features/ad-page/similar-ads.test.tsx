import { act, render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import type { FeedListing } from "@/features/feed/feed-page";

const similarListings =
  vi.fn<() => Promise<{ cards: FeedListing[]; coverLinks: Record<string, never> }>>();
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
    let resolve: (answer: {
      cards: FeedListing[];
      coverLinks: Record<string, never>;
    }) => void = () => {};
    similarListings.mockReturnValue(
      new Promise((done) => {
        resolve = done;
      }),
    );
    const { container, rerender } = render(<SimilarAds {...props} />);
    // INC-704: while loading the container holds no frame and no text — only the
    // section's 1px anchor (D234 S1), which says the read has not answered.
    const anchor = screen.getByTestId("listing-similar-anchor");
    expect(container.children).toHaveLength(1);
    expect(anchor.getAttribute("data-similar")).toBe("waiting");
    expect(container.querySelector(".rounded-card")).toBeNull();
    resolve({ cards: [], coverLinks: {} });
    await waitFor(() => expect(similarListings).toHaveBeenCalledTimes(1));
    rerender(<SimilarAds {...props} />);
    await waitFor(() =>
      expect(screen.getByTestId("listing-similar-anchor").getAttribute("data-similar")).toBe(
        "empty",
      ),
    );
    expect(container.children).toHaveLength(1);
    expect(container.querySelector(".rounded-card")).toBeNull();
    expect(container.textContent).toBe("");
  });

  it("draws the heading and one card per listing when there are some", async () => {
    similarListings.mockResolvedValue({
      cards: Array.from({ length: 10 }, (_, index) => card(`l-${index + 1}`)),
      coverLinks: {},
    });
    render(<SimilarAds {...props} />);
    const section = await screen.findByTestId("listing-similar");
    // INC-704: with cards, the section sits inside the card frame.
    expect(section.parentElement?.className).toContain("rounded-card");
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

/**
 * D234 speed turn S1 — the read waits until the section's place nears the screen
 * (src/lib/use-near-viewport.ts): a buyer who never scrolls down downloads none of it.
 */
describe("SIM-5 the similar-ads read waits for its place to near the screen", () => {
  it("reads nothing until the anchor nears the screen, then reads once", async () => {
    const observers: Array<(entries: Array<{ isIntersecting: boolean }>) => void> = [];
    class FakeObserver {
      constructor(callback: (entries: Array<{ isIntersecting: boolean }>) => void) {
        observers.push(callback);
      }
      observe() {}
      disconnect() {}
    }
    vi.stubGlobal("IntersectionObserver", FakeObserver);
    try {
      similarListings.mockReset();
      similarListings.mockResolvedValue({ cards: [card("l-1")], coverLinks: {} });
      render(<SimilarAds {...props} />);
      await new Promise((done) => setTimeout(done, 20));
      expect(similarListings).not.toHaveBeenCalled();
      expect(screen.getByTestId("listing-similar-anchor").getAttribute("data-similar")).toBe(
        "waiting",
      );
      act(() => {
        for (const notify of observers) notify([{ isIntersecting: true }]);
      });
      expect(await screen.findByTestId("listing-similar")).toBeTruthy();
      expect(similarListings).toHaveBeenCalledTimes(1);
      expect(screen.getByTestId("listing-similar-anchor").getAttribute("data-similar")).toBe(
        "shown",
      );
    } finally {
      vi.unstubAllGlobals();
    }
  });
});
