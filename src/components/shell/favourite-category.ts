import { useMemo, useSyncExternalStore } from "react";

import { useCategoryTree } from "@/features/categories/category-tree";
import { ownValue } from "@/lib/own-key";

/** D207 — one device favourite, shared by every mounted reader. */
const FAVOURITE_KEY = "ethio.fav";
const FAVOURITE_SLUG = /^[a-z0-9-]{1,80}$/;
const favouriteReaders = new Set<() => void>();
function readFavourite(): string | null {
  try {
    const slug = window.localStorage.getItem(FAVOURITE_KEY);
    return slug !== null && FAVOURITE_SLUG.test(slug) ? slug : null;
  } catch {
    // D207: unavailable storage deliberately means no device favourite.
    return null;
  }
}
function subscribeFavourite(reader: () => void): () => void {
  favouriteReaders.add(reader);
  const onStorage = (event: StorageEvent) => {
    if (event.key === FAVOURITE_KEY || event.key === null) reader();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    favouriteReaders.delete(reader);
    window.removeEventListener("storage", onStorage);
  };
}
const favouriteServerSnapshot = () => null;
function writeFavourite(slug: string | null): void {
  try {
    if (slug === null) window.localStorage.removeItem(FAVOURITE_KEY);
    else window.localStorage.setItem(FAVOURITE_KEY, slug);
  } catch {
    console.warn("[favourite] device storage is unavailable");
  }
  for (const reader of favouriteReaders) reader();
}
export function useFavouriteCategory(): {
  slug: string | null;
  set: (slug: string | null) => void;
} {
  const { tree } = useCategoryTree();
  const bySlug = useMemo(
    () => Object.fromEntries(tree.nodes.map((node) => [node.slug, node])),
    [tree],
  );
  const stored = useSyncExternalStore(subscribeFavourite, readFavourite, favouriteServerSnapshot);
  const slug = stored !== null && ownValue(bySlug, stored) ? stored : null;
  const set = (next: string | null) => {
    if (next === null || (FAVOURITE_SLUG.test(next) && ownValue(bySlug, next)))
      writeFavourite(next);
  };
  return { slug, set };
}
