import { use, useCallback, useEffect, useMemo, useRef, useState } from "react";

import { callRoute } from "@/lib/route-client";
import { rootsOf, useCategoryTree } from "@/features/categories/category-tree";

import type { PhotoLinks } from "@/features/posting/photo-links";
import { feedPath, parseFeedPage, type FeedListing, type FirstFeedPage } from "./feed-page";
import type { HeldFirstPage } from "./held-first-page";

export type { FeedListing } from "./feed-page";

export interface UseFeedOptions {
  /** Narrow to one category's whole branch (null = every category). */
  categoryId?: string | null;
  /** The place the location row shows (null = everywhere). */
  placeId?: string | null;
  /**
   * INC-282 (product) — while false the hook holds isLoading = true and makes
   * NO request, so the empty state can never paint before its inputs exist.
   */
  enabled?: boolean;
  /**
   * D234 S5 — the first page the server answered inside the page (root loader,
   * src/server/first-screen.ts): the first read takes it when it is the very
   * address that read asks, once per page load; otherwise the read goes out.
   */
  firstPage?: HeldFirstPage | null;
}

/** One page from /api/feed, or null on any failure (F4). */
async function readPage(
  categoryId: string | null,
  placeId: string | null,
  after: string | null,
): Promise<ReturnType<typeof parseFeedPage>> {
  const answer = await callRoute(feedPath(categoryId, placeId, after), { auth: "none" });
  if (answer.kind !== "answered" || answer.status !== 200) return null;
  return parseFeedPage(answer.payload);
}

/** D234 S5 — a server's first page is taken at most once (a later mount reads afresh). */
const takenFirstPages = new WeakSet<HeldFirstPage>();

/**
 * D234 S5 — the first read: the server's first page when it answers this very
 * address, once; any other address, a page already taken, none at all, or a
 * failed hand-over reads as before.
 */
async function firstRead(
  categoryId: string | null,
  placeId: string | null,
  firstPage: HeldFirstPage | null,
): Promise<ReturnType<typeof parseFeedPage>> {
  if (firstPage === null || takenFirstPages.has(firstPage)) {
    return readPage(categoryId, placeId, null);
  }
  takenFirstPages.add(firstPage);
  const held = await firstPage.page;
  if (held !== null && held.path === feedPath(categoryId, placeId, null)) return held.page;
  return readPage(categoryId, placeId, null);
}

/** D234 S6 — a server's first page is drawn only by the feed first mounted with it. */
const drawnFirstPages = new WeakSet<HeldFirstPage>();

export interface HeldFirstPageOptions {
  /** The server's first page as the root loader handed it over (null after a navigation). */
  firstPage: HeldFirstPage | null;
  /** The feed read's inputs are known (useFeed's `enabled`). */
  inputsKnown: boolean;
  categoryId: string | null;
  placeId: string | null;
  /** useFeed's `firstReadDone`: this feed's own first read has landed. */
  firstReadDone: boolean;
}

/**
 * D234 S6 — the server's first page this feed draws until its own first read
 * lands, so the server draws the first cards and the browser hydrates them as
 * they are. Only the page load's first feed draws it (decided at mount: a feed
 * mounted after a navigation never does); never once that read has landed (a
 * later place, category or Retry shows its own loading); and, once the read's
 * inputs are known, only when they ask the very address the server read.
 * The decision is the same on the server and in the browser's first render.
 * It suspends until the page arrives: its caller renders under Suspense.
 */
export function useHeldFirstPage({
  firstPage,
  inputsKnown,
  categoryId,
  placeId,
  firstReadDone,
}: HeldFirstPageOptions): FirstFeedPage | null {
  const [draws] = useState(() => firstPage !== null && !drawnFirstPages.has(firstPage));
  useEffect(() => {
    if (firstPage !== null) drawnFirstPages.add(firstPage);
  }, [firstPage]);
  // Arrived: read at once, so the first render draws the very cards the server drew
  // and React keeps them; still travelling: React waits (the route's Suspense).
  const held =
    draws && firstPage !== null
      ? firstPage.settled !== undefined
        ? firstPage.settled.page
        : use(firstPage.page)
      : null;
  if (held === null || firstReadDone) return null;
  if (inputsKnown && held.path !== feedPath(categoryId, placeId, null)) return null;
  return held;
}

/**
 * Bundle 10 E3b — the listings pages' read: /api/feed, one page of 20 at a
 * time, in the server's order (D108). It never reads `listings` directly and
 * never sorts. A non-200, a thrown fetch or a refused body is an error, never
 * an empty page (F4).
 */
export function useFeed({
  categoryId = null,
  placeId = null,
  enabled = true,
  firstPage = null,
}: UseFeedOptions = {}) {
  const [cards, setCards] = useState<FeedListing[]>([]);
  const [ladder, setLadder] = useState<string[]>([]);
  const [next, setNext] = useState<string | null>(null);
  /** DEC-195 — the covers' links the pages answered with, merged over the pages. */
  const [coverLinks, setCoverLinks] = useState<PhotoLinks>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState(false);
  const [moreError, setMoreError] = useState(false);
  const [firstToken, setFirstToken] = useState(0);
  /** D234 S6 — this mount's first read has landed (a page or a failure). */
  const [firstReadDone, setFirstReadDone] = useState(false);
  /** Bumped on every start-over; an answer to an earlier generation is ignored. */
  const generation = useRef(0);
  /** D234 S5 — the server's first page as this mount received it (a later loader run never restarts the feed). */
  const [heldFirstPage] = useState(firstPage);

  // The first page: a change of category, place or enabled starts over.
  useEffect(() => {
    generation.current += 1;
    const mine = generation.current;
    setCards([]);
    setLadder([]);
    setNext(null);
    setIsLoading(true);
    setIsLoadingMore(false);
    setError(false);
    setMoreError(false);
    if (!enabled) return;
    firstRead(categoryId, placeId, heldFirstPage)
      .then((page) => {
        if (generation.current !== mine) return;
        setFirstReadDone(true);
        if (page === null) {
          setError(true);
          setIsLoading(false);
          return;
        }
        setCards(page.cards);
        setLadder(page.ladder);
        setNext(page.next);
        setCoverLinks(page.coverLinks ?? {});
        setIsLoading(false);
      })
      .catch((cause: unknown) => {
        if (generation.current !== mine) return;
        console.error("[feed] first page failed", cause);
        setFirstReadDone(true);
        setError(true);
        setIsLoading(false);
      });
  }, [categoryId, placeId, enabled, firstToken, heldFirstPage]);

  const hasMore = next !== null;

  const fetchMore = useCallback(() => {
    if (next === null) return;
    const mine = generation.current;
    setIsLoadingMore(true);
    setMoreError(false);
    readPage(categoryId, placeId, next)
      .then((page) => {
        if (generation.current !== mine) return;
        if (page === null) {
          setMoreError(true);
          setIsLoadingMore(false);
          return;
        }
        setCards((held) => [...held, ...page.cards]);
        setNext(page.next);
        setCoverLinks((held) => ({ ...held, ...page.coverLinks }));
        setIsLoadingMore(false);
      })
      .catch((cause: unknown) => {
        if (generation.current !== mine) return;
        console.error("[feed] next page failed", cause);
        setMoreError(true);
        setIsLoadingMore(false);
      });
  }, [categoryId, placeId, next]);

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
    cards,
    ladder,
    hasMore,
    isLoading,
    isLoadingMore,
    error,
    moreError,
    loadMore,
    retry,
    coverLinks,
    firstReadDone,
  };
}

export interface FeedCategory {
  id: string;
  nameEn: string;
  nameAm: string | null;
  slug: string;
  /** C5i — the stored lucide glyph name; the rail renders it. */
  icon: string | null;
}

/**
 * Live top-level categories for the Marketplace rail.
 * Top level = a category that is not the child of any tree pointer.
 *
 * U6-C1a — THE READ MOVED, THE BEHAVIOUR DID NOT. The `categories` +
 * `category_tree_pointers` pair (and its process-lifetime cache, INC-050) now
 * lives in `@/features/categories/category-tree`, because the posting wizard
 * reads the same two tables and a second copy would be two sources of truth
 * (B1/B2). This hook keeps its name, its shape and its containment law
 * (INC-031: a failed read degrades to "no categories", it never throws through
 * the shell); it now derives the roots from the shared tree instead of
 * filtering the pointer set itself.
 */
export function useCategories() {
  const { tree, isLoading } = useCategoryTree();
  const categories = useMemo<FeedCategory[]>(
    () =>
      rootsOf(tree).map((node) => ({
        id: node.id,
        nameEn: node.nameEn,
        nameAm: node.nameAm,
        slug: node.slug,
        icon: node.icon,
      })),
    [tree],
  );
  return { categories, isLoading };
}
