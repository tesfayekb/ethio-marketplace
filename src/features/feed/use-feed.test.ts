import { act, renderHook, waitFor } from "@testing-library/react";
import { createElement, Suspense, type ReactNode } from "react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { feedPath, parseFeedPage, type FeedPage, type FirstFeedPage } from "./feed-page";
import { HeldFirstPage } from "./held-first-page";
import { useFeed, useHeldFirstPage, type HeldFirstPageOptions } from "./use-feed";

/**
 * D234 speed turns S5 and S6 — UFS-1…UFS-7. The feed's first read takes the
 * page the server answered inside the page when it is the very address that
 * read asks, once per page load; anything else reads as before (the route
 * client is mocked; RCL-* own the transport's contract). Until that read lands,
 * the page load's first feed draws the server's page (useHeldFirstPage).
 */
const { callRoute } = vi.hoisted(() => ({ callRoute: vi.fn() }));
vi.mock("@/lib/route-client", () => ({ callRoute }));

const PLACE = "11111111-1111-4111-8111-111111111111";

function card(id: string) {
  return {
    id,
    publicId: `pub-${id}`,
    title: `Ad ${id}`,
    tier: "regular",
    priceAmount: null,
    priceCurrency: null,
    priceMode: "contact",
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
    publishedAt: "2026-10-17T00:00:00Z",
    categoryId: "c-leaf",
    locationId: PLACE,
    locationNameEn: "Place",
    locationNameAm: null,
    step: 1,
  };
}

/** The page as the server hands it over: the route's answer read by parseFeedPage. */
function served(ids: string[]): FeedPage {
  const page = parseFeedPage({ cards: ids.map(card), ladder: [PLACE], steps: [1], next: null });
  if (page === null) throw new Error("UFS: the fixture page does not parse");
  return page;
}

function answered(ids: string[]) {
  return {
    kind: "answered",
    status: 200,
    ok: true,
    payload: { cards: ids.map(card), ladder: [PLACE], steps: [1], next: null },
    error: null,
    detail: null,
    headers: new Headers(),
    bytes: null,
  };
}

afterEach(() => {
  callRoute.mockReset();
});

describe("useFeed's first page from the server (D234 S5)", () => {
  it("UFS-1 the server's page for the very address is the first page; nothing is asked", async () => {
    const firstPage = new HeldFirstPage(
      Promise.resolve<FirstFeedPage | null>({
        path: feedPath(null, PLACE, null),
        page: served(["a", "b"]),
        covers: [],
        places: [],
      }),
    );
    const { result } = renderHook(() => useFeed({ placeId: PLACE, firstPage }));
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.cards.map((entry) => entry.id)).toEqual(["a", "b"]);
    expect(callRoute).not.toHaveBeenCalled();
  });

  it("UFS-2 a page for another address, none at all, or a failed hand-over: the read goes out", async () => {
    callRoute.mockResolvedValue(answered(["read"]));
    for (const held of [
      new HeldFirstPage(
        Promise.resolve<FirstFeedPage | null>({
          path: feedPath("other", PLACE, null),
          page: served(["stale"]),
          covers: [],
          places: [],
        }),
      ),
      new HeldFirstPage(Promise.resolve<FirstFeedPage | null>(null)),
    ]) {
      callRoute.mockClear();
      const { result } = renderHook(() => useFeed({ placeId: PLACE, firstPage: held }));
      await waitFor(() => expect(result.current.isLoading).toBe(false));
      expect(result.current.cards.map((entry) => entry.id)).toEqual(["read"]);
      expect(callRoute).toHaveBeenCalledWith(feedPath(null, PLACE, null), { auth: "none" });
    }
  });

  it("UFS-3 the server's page is taken once: a second mount with the same page reads afresh", async () => {
    callRoute.mockResolvedValue(answered(["fresh"]));
    const firstPage = new HeldFirstPage(
      Promise.resolve<FirstFeedPage | null>({
        path: feedPath(null, PLACE, null),
        page: served(["held"]),
        covers: [],
        places: [],
      }),
    );
    const first = renderHook(() => useFeed({ placeId: PLACE, firstPage }));
    await waitFor(() => expect(first.result.current.isLoading).toBe(false));
    expect(first.result.current.cards.map((entry) => entry.id)).toEqual(["held"]);
    first.unmount();
    const second = renderHook(() => useFeed({ placeId: PLACE, firstPage }));
    await waitFor(() => expect(second.result.current.isLoading).toBe(false));
    expect(second.result.current.cards.map((entry) => entry.id)).toEqual(["fresh"]);
  });

  it("UFS-4 Retry reads afresh, never the server's page again", async () => {
    callRoute.mockResolvedValue(answered(["fresh"]));
    const firstPage = new HeldFirstPage(
      Promise.resolve<FirstFeedPage | null>({
        path: feedPath(null, PLACE, null),
        page: served(["held"]),
        covers: [],
        places: [],
      }),
    );
    const { result } = renderHook(() => useFeed({ placeId: PLACE, firstPage }));
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    act(() => result.current.retry());
    await waitFor(() => expect(result.current.cards.map((entry) => entry.id)).toEqual(["fresh"]));
    expect(callRoute).toHaveBeenCalledTimes(1);
  });
});

/** useHeldFirstPage suspends until the page arrives: its caller renders under Suspense. */
function suspended({ children }: { children: ReactNode }) {
  return createElement(Suspense, { fallback: null }, children);
}

/** Rendered inside an awaited act, so the suspension resolves (React 19's act contract). */
async function heldOf(firstPage: HeldFirstPage) {
  return act(async () =>
    renderHook(
      (props: Partial<HeldFirstPageOptions>) =>
        useHeldFirstPage({
          firstPage,
          inputsKnown: false,
          categoryId: null,
          placeId: null,
          firstReadDone: false,
          ...props,
        }),
      { wrapper: suspended, initialProps: {} },
    ),
  );
}

describe("the server's first page drawn until the feed's own read lands (D234 S6)", () => {
  it("UFS-5 the first feed draws it until its read lands; a feed mounted after it never draws it", async () => {
    const firstPage = new HeldFirstPage(
      Promise.resolve<FirstFeedPage | null>({
        path: feedPath(null, PLACE, null),
        page: served(["held"]),
        covers: [],
        places: [],
      }),
    );
    const first = await heldOf(firstPage);
    expect(first.result.current?.page.cards.map((entry) => entry.id)).toEqual(["held"]);
    first.rerender({ firstReadDone: true });
    expect(first.result.current).toBeNull();
    const later = await heldOf(firstPage);
    expect(later.result.current).toBeNull();
  });

  it("UFS-6 once the read's inputs are known, only a page for the very address is drawn", async () => {
    const firstPage = new HeldFirstPage(
      Promise.resolve<FirstFeedPage | null>({
        path: feedPath(null, PLACE, null),
        page: served(["held"]),
        covers: [],
        places: [],
      }),
    );
    const held = await heldOf(firstPage);
    expect(held.result.current).not.toBeNull();
    held.rerender({ inputsKnown: true, placeId: PLACE });
    expect(held.result.current?.path).toBe(feedPath(null, PLACE, null));
    held.rerender({ inputsKnown: true, placeId: "another-place" });
    expect(held.result.current).toBeNull();
    held.rerender({ inputsKnown: true, categoryId: "c-leaf", placeId: PLACE });
    expect(held.result.current).toBeNull();
  });

  it("UFS-7 useFeed's first read landing, a page or a failure, is firstReadDone", async () => {
    callRoute.mockResolvedValueOnce(answered(["read"]));
    const landed = renderHook(() => useFeed({ placeId: PLACE }));
    expect(landed.result.current.firstReadDone).toBe(false);
    await waitFor(() => expect(landed.result.current.firstReadDone).toBe(true));
    expect(landed.result.current.cards.map((entry) => entry.id)).toEqual(["read"]);
    callRoute.mockResolvedValueOnce({ ...answered([]), status: 500, ok: false });
    const failed = renderHook(() => useFeed({ placeId: PLACE }));
    await waitFor(() => expect(failed.result.current.firstReadDone).toBe(true));
    expect(failed.result.current.error).toBe(true);
  });
});
