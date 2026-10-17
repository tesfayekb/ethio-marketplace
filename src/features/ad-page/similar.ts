import { parseFeedPage, type FeedListing } from "@/features/feed/feed-page";

/**
 * D201 §12 — SIMILAR ADS. One read of the public feed route with the ad's leaf
 * category and its place (the feed's widening ladder may answer with a wider
 * place or a parent category when the leaf is thin — similar, not identical);
 * the ad itself is dropped and the first six cards kept. A non-200 answer, a
 * body that does not parse, or a thrown fetch is an empty list: a side list
 * never disturbs the page.
 */
export async function similarListings(
  categoryId: string,
  placeId: string | null,
  excludeId: string,
): Promise<FeedListing[]> {
  try {
    const params = new URLSearchParams({ category: categoryId, size: "7" });
    if (placeId !== null) params.set("place", placeId);
    const response = await fetch(`/api/feed?${params.toString()}`);
    if (!response.ok) return [];
    const page = parseFeedPage(await response.json());
    if (page === null) return [];
    return page.cards
      .filter((card) => card.id !== excludeId && card.publicId !== excludeId)
      .slice(0, 6);
  } catch {
    return [];
  }
}
