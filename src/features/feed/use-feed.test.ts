import { act, renderHook, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import { feedPath, parseFeedPage, type FeedPage, type FirstFeedPage } from "./feed-page";
import { useFeed } from "./use-feed";

/**
 * D234 speed turn S5 — UFS-1…UFS-4. The feed's first read takes the page the
 * server answered inside the page when it is the very address that read asks,
 * once per page load; anything else reads as before (the route client is
 * mocked; RCL-* own the transport's contract).
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
    const firstPage = Promise.resolve<FirstFeedPage | null>({
      path: feedPath(null, PLACE, null),
      page: served(["a", "b"]),
      covers: [],
    });
    const { result } = renderHook(() => useFeed({ placeId: PLACE, firstPage }));
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.cards.map((entry) => entry.id)).toEqual(["a", "b"]);
    expect(callRoute).not.toHaveBeenCalled();
  });

  it("UFS-2 a page for another address, none at all, or a failed hand-over: the read goes out", async () => {
    callRoute.mockResolvedValue(answered(["read"]));
    for (const held of [
      Promise.resolve<FirstFeedPage | null>({
        path: feedPath("other", PLACE, null),
        page: served(["stale"]),
        covers: [],
      }),
      Promise.resolve<FirstFeedPage | null>(null),
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
    const firstPage = Promise.resolve<FirstFeedPage | null>({
      path: feedPath(null, PLACE, null),
      page: served(["held"]),
      covers: [],
    });
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
    const firstPage = Promise.resolve<FirstFeedPage | null>({
      path: feedPath(null, PLACE, null),
      page: served(["held"]),
      covers: [],
    });
    const { result } = renderHook(() => useFeed({ placeId: PLACE, firstPage }));
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    act(() => result.current.retry());
    await waitFor(() => expect(result.current.cards.map((entry) => entry.id)).toEqual(["fresh"]));
    expect(callRoute).toHaveBeenCalledTimes(1);
  });
});
