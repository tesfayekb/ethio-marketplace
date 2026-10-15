import { useQueries } from "@tanstack/react-query";

import {
  CARD_THEN_THUMB,
  linksOf,
  photoUrl,
  type PhotoLinks,
} from "@/features/posting/photo-links";

/**
 * INC-606 — THE LISTING CARDS' PHOTOS. Each card of the feed names its cover
 * photo (`coverPhotoId`, a shown listing's first stripped photo — a live one, or a
 * sold one for its 30 days, bundle 16 turn 3c); this asks
 * /api/media/photo-links for the card and thumb sizes only, without a session
 * (the route reads the rows as the anonymous role, so only a shown listing's
 * stripped photos are signed), in groups of 20 in the feed's order — a new page
 * of cards adds a group and never re-asks the earlier ones. Links last an hour
 * and are kept 45 minutes. No link (not loaded, refused, failed) is null: the
 * card draws the category's picture, never a broken image.
 */
const GROUP = 20;
const CARD_SIZES = ["card", "thumb"] as const;

async function readCardLinks(photoIds: string[]): Promise<PhotoLinks> {
  const response = await fetch("/api/media/photo-links", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ photoIds, variants: CARD_SIZES }),
  });
  if (!response.ok) throw new Error(`card photo links: ${response.status}`);
  return linksOf((await response.json()) as Record<string, unknown>);
}

/** The card-size link of each card's cover, by photo id; null when there is none. */
export function useCardPhotos(
  cards: readonly { coverPhotoId: string | null }[],
): (photoId: string | null) => string | null {
  const ids = [
    ...new Set(cards.map((card) => card.coverPhotoId).filter((id): id is string => id !== null)),
  ];
  const groups: string[][] = [];
  for (let start = 0; start < ids.length; start += GROUP)
    groups.push(ids.slice(start, start + GROUP));
  const answers = useQueries({
    queries: groups.map((group) => ({
      queryKey: ["media", "card-photo-links", group.join(",")],
      queryFn: () => readCardLinks(group),
      staleTime: 45 * 60_000,
      gcTime: 50 * 60_000,
      retry: 2,
    })),
  });
  const links: Record<string, Readonly<Record<string, string>>> = {};
  for (const answer of answers) if (answer.data) Object.assign(links, answer.data);
  return (photoId) => (photoId === null ? null : photoUrl({ id: photoId }, CARD_THEN_THUMB, links));
}
