import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

const refreshPage = vi.fn();
vi.mock("@/lib/on-demand-failure", () => ({ refreshPage: () => refreshPage() }));
vi.mock("@/components/shell-context", () => ({
  useShell: () => ({
    selectedCategoryId: "c1",
    categoryLookup: "failed",
    locationPath: [],
    feedInputsReady: true,
  }),
}));
vi.mock("@tanstack/react-router", () => ({
  useRouterState: () => null,
  Await: () => null,
}));
vi.mock("@/features/feed/use-feed", () => ({
  useFeed: () => ({
    cards: [],
    ladder: [],
    hasMore: false,
    isLoading: false,
    isLoadingMore: false,
    error: null,
    moreError: null,
    loadMore: vi.fn(),
    retry: vi.fn(),
    coverLinks: {},
    firstReadDone: true,
  }),
  useHeldFirstPage: () => null,
}));
vi.mock("@/features/feed/use-card-photos", () => ({ useCardPhotos: () => () => null }));
vi.mock("@/features/categories/category-tree", () => ({
  useCategoryTree: () => ({ tree: { byId: new Map() } }),
}));
vi.mock("@/components/shell/favourite-category", () => ({ useFavouriteCategory: () => null }));
vi.mock("@/components/shell/page-guide", () => ({ PageGuide: () => null }));

import { Feed } from "./feed";

describe("the feed's failed category lookup", () => {
  it("FD-U1 Retry goes through the one cure refreshPage, never a reload of its own", () => {
    render(<Feed />);
    const card = screen.getByTestId("feed-category-failed");
    fireEvent.click(card.querySelector("button") as HTMLButtonElement);
    expect(refreshPage).toHaveBeenCalledTimes(1);
  });
});
