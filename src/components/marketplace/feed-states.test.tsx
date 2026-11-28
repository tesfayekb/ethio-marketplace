import { renderPanel as render } from "@/components/ui/dialog-parts-test-render";
import { fireEvent, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { en } from "@/i18n/locales/en";
import { am } from "@/i18n/locales/am";
import { routeFailure, type RouteAnswer } from "@/lib/route-client";
import { KINDS, failureKind, loadFailureReader } from "@/components/shell/failure-reason";

/**
 * UF-1 Part 1 (DEC-493) — the feed's one-screen rows. Seams: the shell's context, the feed's
 * read (`useFeed`), the router, the category tree; the words are the real catalogues, and a
 * refusal's words are read through the failure notice's own reader, never copied.
 */
const cure = vi.hoisted(() => ({ refreshPage: vi.fn() }));
const lang = vi.hoisted(() => ({ value: "en" as "en" | "am" }));
const shell = vi.hoisted(() => ({
  value: {
    selectedCategoryId: null as string | null,
    categoryLookup: "none" as "failed" | "found" | "none" | "missing",
    locationPath: [] as unknown[],
    setLocationPath: vi.fn(),
    feedInputsReady: true,
  },
}));
const feed = vi.hoisted(() => ({
  value: {} as Record<string, unknown>,
}));

vi.mock("@/lib/on-demand-failure", async (original) => ({
  ...(await original<typeof import("@/lib/on-demand-failure")>()),
  refreshPage: cure.refreshPage,
}));
vi.mock("@/components/shell-context", () => ({ useShell: () => shell.value }));
vi.mock("@/i18n", async (original) => {
  const { en: EN } = await import("@/i18n/locales/en");
  const { am: AM } = await import("@/i18n/locales/am");
  const { ownValue: own } = await import("@/lib/own-key");
  return {
    ...(await original<typeof import("@/i18n")>()),
    useStringsLayers: () => ({ state: "ready" }),
    useI18n: () => ({
      t: (key: string) => own(lang.value === "am" ? AM : EN, key) ?? key,
      language: lang.value,
      entities: { map: {}, lang: lang.value },
      star: null,
    }),
  };
});
vi.mock("@/i18n/entity", async (original) => ({
  ...(await original<typeof import("@/i18n/entity")>()),
  entityName: () => "Scratch place",
}));
vi.mock("@tanstack/react-router", () => ({
  useRouterState: ({ select }: { select?: (s: { matches: unknown[] }) => unknown } = {}) =>
    select ? select({ matches: [] }) : null,
  Await: ({ children }: { children: ReactNode }) => <>{children}</>,
  Link: ({ to, children, ...rest }: { to: string; children: ReactNode }) => (
    <a href={to} {...rest} onClickCapture={(event) => event.preventDefault()}>
      {children}
    </a>
  ),
}));
vi.mock("@/features/admin/admin-context", () => ({ useAdminShellIfAny: () => null }));
vi.mock("@/components/shell/favourite-category", () => ({
  useFavouriteCategory: () => ({ slug: null, set: vi.fn() }),
}));
vi.mock("@/features/categories/category-tree", () => ({
  useCategoryTree: () => ({ tree: { byId: new Map() } }),
}));
vi.mock("@/features/feed/use-card-photos", () => ({ useCardPhotos: () => () => null }));
vi.mock("@/features/feed/use-feed", () => ({
  useFeed: () => feed.value,
  useHeldFirstPage: () => null,
}));
vi.mock("./listing-card", () => ({
  ListingCard: ({ listing }: { listing: { id: string } }) => (
    <span data-testid="scratch-card">{listing.id}</span>
  ),
}));

const { Feed } = await import("./feed");

const IDLE = {
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
};

function answered(status: number, error: string): RouteAnswer {
  return {
    kind: "answered",
    status,
    ok: false,
    payload: null,
    error,
    detail: null,
    headers: new Headers(),
    bytes: null,
  };
}

/** The words the one failure notice draws for an error, read by its own reader. */
async function noticeWords(error: unknown): Promise<string> {
  await loadFailureReader();
  return en[KINDS[failureKind(error).kind].words];
}

beforeEach(() => {
  lang.value = "en";
  cure.refreshPage.mockReset();
  shell.value.setLocationPath.mockReset();
  shell.value.categoryLookup = "none";
  shell.value.locationPath = [];
  feed.value = { ...IDLE, loadMore: vi.fn(), retry: vi.fn() };
});

describe("UF-1 the feed", () => {
  it("UFP-1 the Guide button opens the feed's guide, whose next step is Post an ad uf:S1.5", async () => {
    render(<Feed />);
    const control = screen.getByRole("button", { name: en["prim.guide.open"] });
    expect(control).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(control);
    expect(await screen.findByTestId("feed-guide-body")).toHaveTextContent(en["feed.guide.what"]);
    expect(control).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByTestId("feed-guide-next")).toHaveAttribute("href", "/post");
  });

  it("UFP-2 a failed category lookup says so and Retry refreshes the page uf:S1.7", () => {
    shell.value.categoryLookup = "failed";
    render(<Feed />);
    const notice = screen.getByTestId("feed-category-failed");
    expect(notice).toHaveTextContent(en["feed.errorTitle"]);
    fireEvent.click(screen.getByRole("button", { name: en["common.retry"] }));
    expect(cure.refreshPage).toHaveBeenCalledTimes(1);
  });

  it("UFP-3 while the first read runs the feed shows Loading listings and no card uf:S1.8", () => {
    feed.value = { ...feed.value, isLoading: true, firstReadDone: false };
    render(<Feed />);
    expect(screen.getAllByText(en["feed.loading"]).length).toBeGreaterThan(0);
    expect(screen.queryByTestId("scratch-card")).toBeNull();
  });

  it("UFP-4 a category gone after its lookup reads as gone, with no Retry uf:S1.11", async () => {
    const error = await routeFailure(answered(404, "unknownCategory"));
    feed.value = { ...feed.value, error };
    render(<Feed />);
    const words = await noticeWords(error);
    expect(words).toBe(en["failure.gone"]);
    expect(await screen.findByTestId("feed-error")).toHaveTextContent(words);
    expect(screen.queryByTestId("feed-retry")).toBeNull();
    expect(shell.value.setLocationPath).not.toHaveBeenCalled();
  });

  it("UFP-5 a 400 badCursor, badSize, badCategory or badPlace answer draws the failure notice with the reader's words uf:S1.12", async () => {
    for (const code of ["badCursor", "badSize", "badCategory", "badPlace"]) {
      const error = await routeFailure(answered(400, code));
      feed.value = { ...IDLE, error };
      const { unmount } = render(<Feed />);
      const words = await noticeWords(error);
      expect(await screen.findByTestId("feed-error")).toHaveTextContent(words);
      expect(words).not.toBe(en["failure.gone"]);
      unmount();
    }
  });

  it("UFP-6 a first band that is wider, with no invitation, says Nothing here yet in your area uf:S1.14", () => {
    shell.value.categoryLookup = "found";
    feed.value = {
      ...feed.value,
      cards: [{ id: "c1", step: 2, level: 0 }],
      ladder: [{ step: 2, place: null }],
    };
    render(<Feed />);
    expect(screen.getByTestId("feed-step-none")).toHaveTextContent(en["feed.emptyTitle"]);
  });

  it("UFP-7 a failed next page shows its notice and Retry reads that page again uf:S1.19", async () => {
    const error = await routeFailure(answered(503, "unavailable"));
    const retry = vi.fn();
    feed.value = {
      ...feed.value,
      cards: [{ id: "c1", step: 1, level: 0 }],
      ladder: [{ step: 1, place: null }],
      hasMore: true,
      moreError: error,
      retry,
    };
    render(<Feed />);
    expect(await screen.findByTestId("feed-more-error")).toHaveTextContent(
      await noticeWords(error),
    );
    fireEvent.click(screen.getByTestId("feed-more-retry"));
    expect(retry).toHaveBeenCalledTimes(1);
  });

  it("UFP-8 in Amharic the feed's own words are the Amharic catalogue's uf:S1.22", () => {
    lang.value = "am";
    shell.value.categoryLookup = "failed";
    const { unmount } = render(<Feed />);
    const keys = ["feed.errorTitle", "common.retry", "nav.allListings", "prim.guide.open"] as const;
    for (const key of keys) expect(document.body.textContent).toContain(am[key]);
    unmount();
    shell.value.categoryLookup = "none";
    feed.value = { ...feed.value, isLoading: true, firstReadDone: false };
    const loading = render(<Feed />);
    expect(screen.getAllByText(am["feed.loading"]).length).toBeGreaterThan(0);
    loading.unmount();
    feed.value = {
      ...IDLE,
      cards: [{ id: "c1", step: 2, level: 0 }],
      ladder: [{ step: 2, place: null }],
    };
    shell.value.categoryLookup = "found";
    render(<Feed />);
    expect(screen.getByTestId("feed-step-none")).toHaveTextContent(am["feed.emptyTitle"]);
    for (const key of [...keys, "feed.loading", "feed.emptyTitle"] as const) {
      if (am[key] !== en[key]) expect(document.body.textContent).not.toContain(en[key]);
    }
  });
});
