import { useSyncExternalStore } from "react";

/**
 * D255 (turn R1d-c) — THE CATEGORY LIST'S ONE LEVEL STATE. The phone menu (D246) and the
 * phone strip read the same level, never two copies: a level chosen in the menu ("‹" or
 * opening a branch) is the strip's level, and the strip's back item moves both up.
 * `slug` is the URL's category when the level was chosen; a navigation to another
 * category makes the stored level stale, and the readers fall back to the URL's level.
 * `id` is the open category (null: the main level). CF-SUB-1 refuses a second level state.
 */
export type MenuLevel = { slug: string | null; id: string | null };

let current: MenuLevel | null = null;
const listeners = new Set<() => void>();

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
const read = () => current;
const readOnServer = () => null;

/** Sets the level the category list shows, for the URL's category `slug`. */
export function setMenuLevel(next: MenuLevel): void {
  if (current?.slug === next.slug && current.id === next.id) return;
  current = next;
  for (const listener of listeners) listener();
}

/**
 * The level shown for the URL's category: the chosen one while the URL still names the
 * category it was chosen on, otherwise `fromUrl` (D246: the open category, or a leaf's parent).
 */
export function levelFor(
  stored: MenuLevel | null,
  selectedSlug: string | null,
  fromUrl: string | null,
): string | null {
  return stored && stored.slug === selectedSlug ? stored.id : fromUrl;
}

export function useMenuLevel(): MenuLevel | null {
  return useSyncExternalStore(subscribe, read, readOnServer);
}
