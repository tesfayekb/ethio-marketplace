import { useCallback, useEffect, useRef, useState } from "react";

import { parseCard, type FeedListing } from "@/features/feed/feed-page";

/**
 * Bundle 19 turn 16 (D201 §12) — the seller page's read: /api/seller, one
 * page of the seller's live ads at a time, in the server's order (feed_page's
 * order). The key is the seller's alias lower-cased, never an id. A card is
 * parsed by the feed's own card parser (src/features/feed/feed-page.ts); the
 * seller door answers without a ladder, so the bound is the largest step the
 * page carries. A non-200, a thrown fetch or a refused body is an error —
 * never an empty page (F4); a 404 is the seller not found.
 */

/** The seller block the door answers (no id travels). */
export interface SellerInfo {
  alias: string | null;
  businessName: string | null;
  memberSince: string | null;
}

interface SellerPage {
  seller: SellerInfo;
  cards: FeedListing[];
  next: string | null;
}

function isStrOrNull(value: unknown): value is string | null {
  return value === null || typeof value === "string";
}

/** One page, or null on any mismatch (F4: a malformed answer is a failure). */
function parseSellerPage(value: unknown): SellerPage | null {
  if (value === null || typeof value !== "object" || Array.isArray(value)) return null;
  const { seller, cards, next } = value as Record<string, unknown>;
  if (seller === null || typeof seller !== "object" || Array.isArray(seller)) return null;
  const s = seller as Record<string, unknown>;
  if (!isStrOrNull(s.alias) || !isStrOrNull(s.businessName) || !isStrOrNull(s.memberSince)) {
    return null;
  }
  if (!Array.isArray(cards) || !isStrOrNull(next)) return null;
  let maxStep = 1;
  for (const card of cards) {
    if (card !== null && typeof card === "object" && !Array.isArray(card)) {
      const step = (card as Record<string, unknown>).step;
      if (typeof step === "number" && Number.isInteger(step) && step > maxStep) maxStep = step;
    }
  }
  const parsed: FeedListing[] = [];
  for (const card of cards) {
    const one = parseCard(card, maxStep);
    if (one === null) return null;
    parsed.push(one);
  }
  return {
    seller: { alias: s.alias, businessName: s.businessName, memberSince: s.memberSince },
    cards: parsed,
    next,
  };
}

export type SellerFeedResult =
  | { kind: "ok"; page: SellerPage }
  | { kind: "notFound" }
  | { kind: "error" };

/** One page from /api/seller; never throws its classification away. */
async function readPage(key: string, after: string | null): Promise<SellerFeedResult> {
  const params = new URLSearchParams({ key });
  if (after !== null) params.set("after", after);
  let response: Response;
  try {
    response = await fetch(`/api/seller?${params.toString()}`, { method: "GET" });
  } catch (cause: unknown) {
    console.error("[seller] page fetch failed", cause);
    return { kind: "error" };
  }
  if (response.status === 404) return { kind: "notFound" };
  if (response.status !== 200) return { kind: "error" };
  try {
    const page = parseSellerPage(await response.json());
    return page === null ? { kind: "error" } : { kind: "ok", page };
  } catch (cause: unknown) {
    console.error("[seller] page body refused", cause);
    return { kind: "error" };
  }
}

export interface UseSellerFeed {
  seller: SellerInfo | null;
  cards: FeedListing[];
  hasMore: boolean;
  isLoading: boolean;
  isLoadingMore: boolean;
  error: boolean;
  notFound: boolean;
  loadMore: () => void;
  retry: () => void;
}

/**
 * The seller's live ads by his public key. A change of key starts over; an
 * answer to an earlier key is ignored (the generation guard of
 * src/features/feed/use-feed.ts).
 */
export function useSellerFeed(key: string): UseSellerFeed {
  const [seller, setSeller] = useState<SellerInfo | null>(null);
  const [cards, setCards] = useState<FeedListing[]>([]);
  const [next, setNext] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState(false);
  const [notFound, setNotFound] = useState(false);
  const [moreError, setMoreError] = useState(false);
  const [firstToken, setFirstToken] = useState(0);
  /** Bumped on every start-over; an answer to an earlier generation is ignored. */
  const generation = useRef(0);

  // The first page: a change of key starts over.
  useEffect(() => {
    generation.current += 1;
    const mine = generation.current;
    setSeller(null);
    setCards([]);
    setNext(null);
    setIsLoading(true);
    setIsLoadingMore(false);
    setError(false);
    setNotFound(false);
    setMoreError(false);
    void readPage(key, null).then((result) => {
      if (generation.current !== mine) return;
      if (result.kind === "notFound") {
        setNotFound(true);
        setIsLoading(false);
        return;
      }
      if (result.kind === "error") {
        setError(true);
        setIsLoading(false);
        return;
      }
      setSeller(result.page.seller);
      setCards(result.page.cards);
      setNext(result.page.next);
      setIsLoading(false);
    });
  }, [key, firstToken]);

  const hasMore = next !== null;

  const fetchMore = useCallback(() => {
    if (next === null) return;
    const mine = generation.current;
    setIsLoadingMore(true);
    setMoreError(false);
    void readPage(key, next).then((result) => {
      if (generation.current !== mine) return;
      if (result.kind !== "ok") {
        setMoreError(true);
        setIsLoadingMore(false);
        return;
      }
      setCards((held) => [...held, ...result.page.cards]);
      setNext(result.page.next);
      setIsLoadingMore(false);
    });
  }, [key, next]);

  const loadMore = useCallback(() => {
    if (!hasMore || isLoading || isLoadingMore || moreError) return;
    fetchMore();
  }, [hasMore, isLoading, isLoadingMore, moreError, fetchMore]);

  const retry = useCallback(() => {
    if (moreError) {
      fetchMore();
      return;
    }
    setFirstToken((n) => n + 1);
  }, [moreError, fetchMore]);

  return {
    seller,
    cards,
    hasMore,
    isLoading,
    isLoadingMore,
    error,
    notFound,
    loadMore,
    retry,
  };
}
