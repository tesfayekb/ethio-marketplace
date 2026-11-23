import { fireEvent, render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

/**
 * INC-1140 (cursor-bundle-5, FD-U1) — the feed's retry button after a failed category lookup
 * reloads the page by the page's one cure, `refreshPage` (src/lib/on-demand-failure.ts), never by
 * a reload of its own (CF-STALE-1). Seams (DEC-026): the shell's context, the feed's reads, the
 * router, i18n (identity `t`) and the cure are mocked; nothing reaches the network.
 */
const cure = vi.hoisted(() => ({ refreshPage: vi.fn() }));
const shell = vi.hoisted(() => ({
  value: {
    selectedCategoryId: null as string | null,
    categoryLookup: "failed" as "failed" | "found" | "none" | "missing",
    locationPath: [] as unknown[],
    feedInputsReady: true,
  },
}));

vi.mock("@/lib/on-demand-failure", () => cure);
vi.mock("@/components/shell-context", () => ({ useShell: () => shell.value }));
vi.mock("@/i18n", () => ({
  useI18n: () => ({ t: (key: string) => key, language: "en", entities: {}, star: null }),
}));
vi.mock("@/i18n/entity", () => ({ entityName: () => "" }));
vi.mock("@tanstack/react-router", () => ({
  useRouterState: () => null,
  Await: ({ children }: { children: ReactNode }) => <>{children}</>,
}));
vi.mock("@/components/shell/favourite-category", () => ({
  useFavouriteCategory: () => ({ slug: null, set: vi.fn() }),
}));
vi.mock("@/features/categories/category-tree", () => ({
  useCategoryTree: () => ({ tree: { byId: new Map() } }),
}));
vi.mock("@/features/feed/use-card-photos", () => ({ useCardPhotos: () => () => null }));
vi.mock("@/features/feed/use-feed", () => ({
  useFeed: () => ({
    cards: [],
    ladder: [],
    hasMore: false,
    isLoading: false,
    isLoadingMore: false,
    error: null,
    moreError: false,
    loadMore: vi.fn(),
    retry: vi.fn(),
    coverLinks: {},
    firstReadDone: true,
  }),
  useHeldFirstPage: () => null,
}));
vi.mock("@/components/shell/page-guide", () => ({ PageGuide: () => null }));

const { Feed } = await import("./feed");

describe("the feed's retry after a failed category lookup (INC-1140)", () => {
  beforeEach(() => {
    cure.refreshPage.mockReset();
    shell.value.categoryLookup = "failed";
  });

  it("FD-U1 the category-failed retry button calls refreshPage and no reload of its own", () => {
    const reload = vi.fn();
    const original = window.location;
    Object.defineProperty(window, "location", {
      configurable: true,
      value: { ...original, reload },
    });
    try {
      render(<Feed />);
      expect(screen.getByTestId("feed-category-failed")).toBeTruthy();
      fireEvent.click(screen.getByRole("button", { name: "common.retry" }));
      expect(cure.refreshPage).toHaveBeenCalledTimes(1);
      expect(reload).not.toHaveBeenCalled();
    } finally {
      Object.defineProperty(window, "location", { configurable: true, value: original });
    }
  });
});
