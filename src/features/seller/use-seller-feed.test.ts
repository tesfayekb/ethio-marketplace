import { renderHook, act, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useSellerFeed } from "./use-seller-feed";

/**
 * Bundle 19 turn 16 — SL-1…SL-3. The fetch is mocked; the hook's promises
 * settle on their own.
 */

function card(id: string, step = 1) {
  return {
    id,
    publicId: `pub-${id}`,
    title: `Ad ${id}`,
    tier: "regular",
    priceAmount: 100,
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
    publishedAt: "2026-10-17T00:00:00Z",
    categoryId: "c-leaf",
    locationId: "place-1",
    locationNameEn: "Place",
    locationNameAm: null,
    step,
  };
}

function pageBody(cards: unknown[], next: string | null) {
  return {
    seller: { alias: "abebe", businessName: null, memberSince: "2026-01-01T00:00:00Z" },
    cards,
    next,
  };
}

function respond(status: number, body: unknown) {
  return Promise.resolve({
    status,
    json: () => Promise.resolve(body),
  } as unknown as Response);
}

describe("useSellerFeed", () => {
  beforeEach(() => {
    vi.stubGlobal("fetch", vi.fn());
  });
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("SL-1 asks the first page by key and the next page with its after cursor", async () => {
    const fetchMock = vi.mocked(fetch);
    fetchMock
      .mockImplementationOnce(() => respond(200, pageBody([card("l-1")], "cursor-1")))
      .mockImplementationOnce(() => respond(200, pageBody([card("l-2")], null)));
    const { result } = renderHook(() => useSellerFeed("abebe"));
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(fetchMock).toHaveBeenNthCalledWith(1, "/api/seller?key=abebe", { method: "GET" });
    expect(result.current.cards.map((one) => one.id)).toEqual(["l-1"]);
    expect(result.current.hasMore).toBe(true);
    await act(async () => result.current.loadMore());
    await waitFor(() => expect(result.current.isLoadingMore).toBe(false));
    expect(fetchMock).toHaveBeenNthCalledWith(2, "/api/seller?key=abebe&after=cursor-1", {
      method: "GET",
    });
    expect(result.current.cards.map((one) => one.id)).toEqual(["l-1", "l-2"]);
    expect(result.current.hasMore).toBe(false);
  });

  it("SL-2 a 404 is notFound; a 500 and an unparsable body are errors, never an empty page", async () => {
    const fetchMock = vi.mocked(fetch);
    fetchMock.mockImplementationOnce(() => respond(404, { error: "unknownSeller" }));
    const missing = renderHook(() => useSellerFeed("nobody"));
    await waitFor(() => expect(missing.result.current.isLoading).toBe(false));
    expect(missing.result.current.notFound).toBe(true);
    expect(missing.result.current.error).toBe(false);
    missing.unmount();

    fetchMock.mockImplementationOnce(() => respond(500, { error: "internal error" }));
    const failed = renderHook(() => useSellerFeed("abebe"));
    await waitFor(() => expect(failed.result.current.isLoading).toBe(false));
    expect(failed.result.current.error).toBe(true);
    expect(failed.result.current.notFound).toBe(false);
    expect(failed.result.current.cards).toEqual([]);
    failed.unmount();

    fetchMock.mockImplementationOnce(() => respond(200, { cards: "no" }));
    const refused = renderHook(() => useSellerFeed("abebe"));
    await waitFor(() => expect(refused.result.current.isLoading).toBe(false));
    expect(refused.result.current.error).toBe(true);
    expect(refused.result.current.cards).toEqual([]);
    refused.unmount();
  });

  it("SL-3 an answer to an earlier key is ignored", async () => {
    const fetchMock = vi.mocked(fetch);
    let resolveFirst: ((response: Response) => void) | null = null;
    fetchMock
      .mockImplementationOnce(
        () =>
          new Promise<Response>((resolve) => {
            resolveFirst = resolve;
          }),
      )
      .mockImplementationOnce(() => respond(200, pageBody([card("l-new")], null)));
    const { result, rerender } = renderHook(({ sellerKey }) => useSellerFeed(sellerKey), {
      initialProps: { sellerKey: "first" },
    });
    rerender({ sellerKey: "second" });
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(result.current.cards.map((one) => one.id)).toEqual(["l-new"]);
    // The first key's late answer must not overwrite the second key's page.
    (resolveFirst as (response: Response) => void)({
      status: 200,
      json: () => Promise.resolve(pageBody([card("l-old")], null)),
    } as unknown as Response);
    await waitFor(() => expect(fetchMock).toHaveBeenCalledTimes(2));
    expect(result.current.cards.map((one) => one.id)).toEqual(["l-new"]);
  });
});
