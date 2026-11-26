import { readFailed } from "@/lib/reader-failure";
import { callRoute, routeFailure } from "@/lib/route-client";
import { feedPath, parseFeedPage, type FeedListing } from "@/features/feed/feed-page";
import { seedLevelRows } from "@/features/levels/levels-store";
import type { PhotoLinks } from "@/features/posting/photo-links";

/** DEC-195 — the cards and the cover links the answer already signed. */
export interface SimilarAnswer {
  cards: FeedListing[];
  coverLinks: PhotoLinks;
}

/**
 * D201 §12 — SIMILAR ADS. One read of the public feed route with the ad's leaf
 * category and its place (the feed's widening ladder may answer with a wider
 * place or a parent category when the leaf is thin — similar, not identical);
 * the ad itself is dropped and the first ten cards kept. INC-1305 — a read that
 * fails (an answer that is not ok, a body that does not parse, a thrown fetch)
 * throws the typed failure, never an empty list that reads as "nothing similar":
 * the section draws the failure notice with Retry.
 */
export async function similarListings(
  categoryId: string,
  placeId: string | null,
  excludeId: string,
): Promise<SimilarAnswer> {
  // D234 S6 — the feed read's one address builder (feedPath): eleven, so ten remain without the ad.
  const answer = await callRoute(feedPath(categoryId, placeId, null, 11), { auth: "none" });
  if (answer.kind !== "answered" || !answer.ok) throw await routeFailure(answer);
  const page = parseFeedPage(answer.payload);
  if (page === null) throw readFailed("similar ads: an answer that does not parse");
  seedLevelRows(page.levels);
  return {
    cards: page.cards
      .filter((card) => card.id !== excludeId && card.publicId !== excludeId)
      .slice(0, 10),
    coverLinks: page.coverLinks ?? {},
  };
}
