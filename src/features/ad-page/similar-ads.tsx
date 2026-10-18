import { useEffect, useState } from "react";

import { ListingCard } from "@/components/marketplace/listing-card";
import { PageCard } from "@/components/shell/page-card";
import { similarListings } from "@/features/ad-page/similar";
import type { FeedListing } from "@/features/feed/feed-page";
import type { PhotoLinks } from "@/features/posting/photo-links";
import { useCardPhotos } from "@/features/feed/use-card-photos";
import { useI18n } from "@/i18n";

/**
 * D201 §12 — the similar-ads section of the buyer's page. It reads once after
 * the first client render (never during SSR); while loading or when the answer
 * is empty it draws nothing at all — INC-704: the card frame is drawn here,
 * only with cards, so a live ad never shows an empty framed box under it. The
 * cards are the feed's own (src/components/marketplace/feed.tsx): two columns
 * at 360 (D201 §5), three from 640.
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
  const [coverLinks, setCoverLinks] = useState<PhotoLinks>({});
  useEffect(() => {
    let active = true;
    void similarListings(categoryId, placeId, excludeId).then((answer) => {
      if (active) {
        setCards(answer.cards);
        setCoverLinks(answer.coverLinks);
      }
    });
    return () => {
      active = false;
    };
  }, [categoryId, placeId, excludeId]);
  // DEC-195 — the answer's own links are the preset; only the rest are asked for.
  const coverOf = useCardPhotos(cards ?? [], coverLinks);
  if (cards === null || cards.length === 0) return null;
  return (
    <PageCard className="mt-6 min-w-0">
      <section data-testid="listing-similar" aria-labelledby="listing-similar-title">
        <h2 id="listing-similar-title" className="mb-3 text-base font-semibold text-foreground">
          {t("adPage.similar.title")}
        </h2>
        <ul className="grid auto-rows-fr grid-cols-3 gap-2 sm:grid-cols-4 sm:gap-4 lg:grid-cols-5">
          {cards.map((listing, index) => (
            <li
              key={listing.id}
              className={
                index >= 8 ? "hidden lg:block" : index >= 6 ? "hidden sm:block" : undefined
              }
            >
              <ListingCard
                listing={listing}
                photoUrl={coverOf(listing.coverPhotoId)}
                priority={index < 6}
              />
            </li>
          ))}
        </ul>
      </section>
    </PageCard>
  );
}
