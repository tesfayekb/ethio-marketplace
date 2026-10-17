import { useEffect, useState } from "react";

import { ListingCard } from "@/components/marketplace/listing-card";
import { similarListings } from "@/features/ad-page/similar";
import type { FeedListing } from "@/features/feed/feed-page";
import { useCardPhotos } from "@/features/feed/use-card-photos";
import { useI18n } from "@/i18n";

/**
 * D201 §12 — the similar-ads section of the buyer's page. It reads once after
 * the first client render (never during SSR); while loading or when the answer
 * is empty it draws nothing at all. The cards are the feed's own
 * (src/components/marketplace/feed.tsx): two columns at 360 (D201 §5), three
 * from 640.
 */
export function SimilarAds({
  categoryId,
  placeId,
  excludeId,
}: {
  categoryId: string;
  placeId: string | null;
  excludeId: string;
}) {
  const { t } = useI18n();
  const [cards, setCards] = useState<FeedListing[] | null>(null);
  useEffect(() => {
    let active = true;
    void similarListings(categoryId, placeId, excludeId).then((answer) => {
      if (active) setCards(answer);
    });
    return () => {
      active = false;
    };
  }, [categoryId, placeId, excludeId]);
  const coverOf = useCardPhotos(cards ?? []);
  if (cards === null || cards.length === 0) return null;
  return (
    <section data-testid="listing-similar" aria-labelledby="listing-similar-title" className="mt-6">
      <h2 id="listing-similar-title" className="mb-3 text-base font-semibold text-foreground">
        {t("adPage.similar.title")}
      </h2>
      <ul className="grid auto-rows-fr grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-4">
        {cards.map((listing) => (
          <li key={listing.id}>
            <ListingCard listing={listing} photoUrl={coverOf(listing.coverPhotoId)} />
          </li>
        ))}
      </ul>
    </section>
  );
}
