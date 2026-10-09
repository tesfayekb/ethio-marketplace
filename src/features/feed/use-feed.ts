import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { rootsOf, useCategoryTree } from "@/features/categories/category-tree";

import { parseFeedPage, type FeedListing } from "./feed-page";

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
}

/** One page from /api/feed, or null on any failure (F4). */
async function readPage(
  categoryId: string | null,
  placeId: string | null,
  after: string | null,
): Promise<ReturnType<typeof parseFeedPage>> {
  const params = new URLSearchParams();
  if (categoryId !== null) params.set("category", categoryId);
  if (placeId !== null) params.set("place", placeId);
  if (after !== null) params.set("after", after);
  const query = params.toString();
  const response = await fetch(query === "" ? "/api/feed" : `/api/feed?${query}`, {
    method: "GET",
  });
  if (response.status !== 200) return null;
  return parseFeedPage(await response.json());
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
}: UseFeedOptions = {}) {
  const [cards, setCards] = useState<FeedListing[]>([]);
  const [ladder, setLadder] = useState<string[]>([]);
  const [next, setNext] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState(false);
  const [moreError, setMoreError] = useState(false);
  const [firstToken, setFirstToken] = useState(0);
  /** Bumped on every start-over; an answer to an earlier generation is ignored. */
  const generation = useRef(0);

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
    readPage(categoryId, placeId, null)
      .then((page) => {
        if (generation.current !== mine) return;
        if (page === null) {
          setError(true);
          setIsLoading(false);
          return;
        }
        setCards(page.cards);
        setLadder(page.ladder);
        setNext(page.next);
        setIsLoading(false);
      })
      .catch((cause: unknown) => {
        if (generation.current !== mine) return;
        console.error("[feed] first page failed", cause);
        setError(true);
        setIsLoading(false);
      });
  }, [categoryId, placeId, enabled, firstToken]);

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

  return { cards, ladder, hasMore, isLoading, isLoadingMore, error, moreError, loadMore, retry };
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
