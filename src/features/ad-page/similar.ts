import { callRoute } from "@/lib/route-client";
import { parseFeedPage, type FeedListing } from "@/features/feed/feed-page";
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
 * the ad itself is dropped and the first ten cards kept. A non-200 answer, a
 * body that does not parse, or a thrown fetch is an empty list: a side list
 * never disturbs the page.
 */
export async function similarListings(
  categoryId: string,
  placeId: string | null,
  excludeId: string,
): Promise<SimilarAnswer> {
  const empty: SimilarAnswer = { cards: [], coverLinks: {} };
  const params = new URLSearchParams({ category: categoryId, size: "11" });
  if (placeId !== null) params.set("place", placeId);
  const answer = await callRoute(`/api/feed?${params.toString()}`, { auth: "none" });
  if (answer.kind !== "answered" || !answer.ok) return empty;
  const page = parseFeedPage(answer.payload);
  if (page === null) return empty;
  return {
    cards: page.cards
      .filter((card) => card.id !== excludeId && card.publicId !== excludeId)
      .slice(0, 10),
    coverLinks: page.coverLinks ?? {},
  };
}
