import { CutText } from "@/components/ui/cut-text";
import { MapPin } from "lucide-react";

import type { FeedListing } from "@/features/feed/use-feed";
import { ListingPicture } from "@/components/marketplace/listing-picture";
import { nearestCategoryPicture, useCategoryTree } from "@/features/categories/category-tree";
import { useI18n } from "@/i18n";
import { entityName } from "@/i18n/entity";
import { priceLine, storedUnitNoun } from "@/features/posting/price-line";
import { usePriceUnitLabels } from "@/features/posting/use-price-unit-labels";

/**
 * DEC-081 (D62-2) — NEGOTIABLE IS A FLAG, SHOWN AS A BADGE beside the price on
 * every surface that prints one (card, preview, detail, review, impersonation).
 */
export function NegotiableBadge() {
  const { t } = useI18n();
  return (
    <span
      data-testid="price-negotiable-badge"
      className="inline-flex shrink-0 items-center rounded-full border border-border px-2 py-0.5 text-xs font-medium text-muted-foreground"
    >
      {t("price.negotiable")}
    </span>
  );
}

export function ListingCard({ listing }: { listing: FeedListing }) {
  const { t, entities, language } = useI18n();
  const { tree } = useCategoryTree();
  // Bundle 4 step 10 — the unit words load only when this card holds a unit.
  const unitLabels = usePriceUnitLabels(listing.priceUnit !== null);
  const cardPrice = priceLine(
    {
      mode: listing.priceMode,
      amount: listing.priceAmount,
      currency: listing.priceCurrency,
      period: listing.pricePeriod,
      bp: listing.priceBp,
      unit: storedUnitNoun(listing.priceUnit, listing.priceUnitText, unitLabels, language),
    },
    t,
    t("price.contact"),
    language,
  );
  // U4d: one resolver for every entity name — DB[lang] ▸ name_am ▸ name_en.
  const locationName =
    listing.locationId === null
      ? listing.locationNameEn
      : entityName(
          "location",
          {
            id: listing.locationId,
            nameEn: listing.locationNameEn ?? "",
            nameAm: listing.locationNameAm,
          },
          entities,
        );

  return (
    <article
      data-testid="listing-card"
      data-listing={listing.id}
      className="flex flex-col overflow-hidden rounded-lg border border-border bg-card"
    >
      {/*
        Photo area. Listing photos stay un-surfaced here until the photo
        clean-up bundle (RLS gates listing_photos on exif_stripped); the card
        draws the category's picture from the public tree (bundle 4 step 14).
      */}
      <ListingPicture
        photoUrl={null}
        categoryUrl={nearestCategoryPicture(tree, listing.categoryId)}
        photosSoon={listing.photosSoon}
        boxTestId="listing-card-picture"
        rounded=""
        fill
      />

      <div className="flex flex-1 flex-col gap-2 p-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold text-foreground">
            <CutText text={listing.title} />
          </h3>
          {listing.tier === "premium" ? (
            <span className="shrink-0 rounded-full bg-primary px-2 py-0.5 text-xs font-medium text-primary-foreground">
              {t("tier.premium")}
            </span>
          ) : null}
          {listing.tier === "featured" ? (
            <span className="shrink-0 rounded-full bg-gold px-2 py-0.5 text-xs font-medium text-gold-foreground">
              {t("tier.featured")}
            </span>
          ) : null}
        </div>

        <p className="flex flex-wrap items-center gap-2 text-sm font-semibold text-foreground">
          <span data-testid="listing-card-price" data-period={listing.pricePeriod}>
            {cardPrice}
          </span>
          {listing.priceNegotiable ? <NegotiableBadge /> : null}
        </p>

        {locationName ? (
          <p className="flex min-w-0 items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <CutText text={locationName} />
          </p>
        ) : null}
      </div>
    </article>
  );
}

export default ListingCard;
