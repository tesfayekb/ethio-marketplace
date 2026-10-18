import { Link } from "@tanstack/react-router";
import { canonicalSegment } from "@/features/ad-page/address";
import { CutText } from "@/components/ui/cut-text";
import { MapPin } from "lucide-react";

import type { FeedListing } from "@/features/feed/use-feed";
import { ribbonOf } from "@/features/feed/feed-page";
import { ListingPicture } from "@/components/marketplace/listing-picture";
import { nearestCategoryPicture, useCategoryTree } from "@/features/categories/category-tree";
import { useI18n } from "@/i18n";
import { entityName } from "@/i18n/entity";
import { fill } from "@/features/posting/refusal-text";
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

export function ListingCard({
  listing,
  photoUrl = null,
  priority = false,
}: {
  listing: FeedListing;
  /** INC-606 — the cover photo's card-size link, when the feed has one; else the category's picture. */
  photoUrl?: string | null;
  /** DEC-195 — the grid's first cards load their picture at once with high fetch priority. */
  priority?: boolean;
}) {
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
  /**
   * Bundle 16 turn 3c (D173, D175 1, D180) — the ribbon: Sold (Rented, Filled), else Reserved, else Price reduced;
   * while "Price reduced" stands (14 days, D173 2) on a live ad, the old price is struck through before the price.
   */
  const ribbonKey = ribbonOf({
    soldWord: listing.soldWord,
    closed: false,
    reserved: listing.reserved,
    priceReduced: listing.priceWas !== null,
  })[0];
  const wasPrice =
    listing.soldWord !== null || listing.priceWas === null
      ? null
      : priceLine(
          {
            mode: listing.priceMode,
            amount: listing.priceWas,
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

  /**
   * Bundle 11 V2b (the operator, 2026-10-11: "cards … consistent same size and
   * no size difference between the different cards in all screens") — ONE CARD
   * SHAPE. Every card fills its grid cell (`h-full`; the feed's rows are equal,
   * `auto-rows-fr`) and lays out the same slots in the same places: the picture
   * with the tier pill on its corner; the title on one line; the price slot
   * sized for its longest common case (a compact card: two lines of price and
   * the Negotiable pill — 58 px; a wider one: 44 px), so cards in different
   * sections match too (a rarer, longer price still shows whole and its row
   * grows with it); the place on the last line, kept even when the card has
   * none.
   */
  const tierPill =
    listing.tier === "premium" ? (
      <span
        data-testid="listing-card-tier"
        data-tier="premium"
        className="absolute start-1 top-1 rounded-full bg-primary px-1.5 py-0.5 text-[11px] font-medium leading-4 text-primary-foreground shadow-sm @min-[11rem]:start-2 @min-[11rem]:top-2 @min-[11rem]:px-2 @min-[11rem]:text-xs"
      >
        {t("tier.premium")}
      </span>
    ) : listing.tier === "featured" ? (
      <span
        data-testid="listing-card-tier"
        data-tier="featured"
        className="absolute start-1 top-1 rounded-full bg-gold px-1.5 py-0.5 text-[11px] font-medium leading-4 text-gold-foreground shadow-sm @min-[11rem]:start-2 @min-[11rem]:top-2 @min-[11rem]:px-2 @min-[11rem]:text-xs"
      >
        {t("tier.featured")}
      </span>
    ) : null;

  const content = (
    <>
      {/*
        Photo area. INC-606 — the seller's cover photo when the feed gave one
        and its link came back (an active listing's stripped photo, signed for
        an hour); otherwise the category's picture from the public tree (bundle
        4 step 14), never a broken image.
      */}
      <div className="relative">
        <ListingPicture
          photoUrl={photoUrl}
          categoryUrl={nearestCategoryPicture(tree, listing.categoryId)}
          photosSoon={listing.photosSoon}
          ribbon={ribbonKey === undefined ? null : t(ribbonKey)}
          boxTestId="listing-card-picture"
          rounded=""
          fill
          priority={priority}
        />
        {tierPill}
      </div>

      {/* D123 — below 11rem (three or four a row) the card is compact. */}
      <div className="flex flex-1 flex-col gap-1 p-2 @min-[11rem]:gap-2 @min-[11rem]:p-3">
        <h3 className="min-w-0 text-xs font-semibold leading-4 text-foreground @min-[11rem]:text-sm @min-[11rem]:leading-5">
          <CutText text={listing.title} />
        </h3>

        <p className="flex min-h-[3.625rem] flex-wrap content-start items-center gap-x-1 gap-y-0.5 text-xs font-semibold leading-4 text-foreground @min-[11rem]:min-h-[2.75rem] @min-[11rem]:gap-x-2 @min-[11rem]:text-sm @min-[11rem]:leading-5">
          {wasPrice !== null ? (
            <span
              data-testid="listing-card-price-was"
              className="font-normal text-muted-foreground"
            >
              <s aria-hidden="true">{wasPrice}</s>
              <span className="sr-only">{fill(t("feed.priceWas"), { price: wasPrice })}</span>
            </span>
          ) : null}
          <span data-testid="listing-card-price" data-period={listing.pricePeriod}>
            {cardPrice}
          </span>
          {listing.priceNegotiable ? <NegotiableBadge /> : null}
        </p>

        <p
          data-testid="listing-card-place"
          className="mt-auto flex min-h-[1lh] min-w-0 items-center gap-1 text-xs leading-4 text-muted-foreground"
        >
          {locationName ? (
            <>
              <MapPin
                className="h-3 w-3 shrink-0 @min-[11rem]:h-3.5 @min-[11rem]:w-3.5"
                aria-hidden="true"
              />
              <CutText text={locationName} />
            </>
          ) : null}
        </p>
      </div>
    </>
  );

  return (
    <article
      data-testid="listing-card"
      data-listing={listing.id}
      className="@container flex h-full flex-col overflow-hidden rounded-lg border border-border bg-card"
    >
      {typeof listing.publicId === "string" ? (
        <Link
          to="/l/$slug"
          params={{ slug: canonicalSegment(listing.title, listing.publicId) }}
          data-testid="listing-card-link"
          className="flex h-full flex-col"
        >
          {content}
        </Link>
      ) : (
        content
      )}
    </article>
  );
}

export default ListingCard;
