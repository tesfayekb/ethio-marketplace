import { CARD_SURFACE } from "@/components/layout/surface";
import { PRESSED } from "@/components/shell/menu-row";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { canonicalSegment } from "@/features/ad-page/address";
import { CutText } from "@/components/ui/cut-text";
import { MapPin } from "lucide-react";

import type { FeedListing } from "@/features/feed/use-feed";
import { ribbonOf } from "@/features/feed/feed-page";
import { ListingPicture } from "@/components/marketplace/listing-picture";
import { cardLookOf } from "@/components/marketplace/card-tier";
import { TierFlag, TierWord } from "@/components/marketplace/tier-flag";
import { levelNameOf } from "@/features/levels/level-fields";
import { nearestCategoryPicture, useCategoryTree } from "@/features/categories/category-tree";
import { useI18n } from "@/i18n";
import { entityName } from "@/i18n/entity";
import { fill } from "@/features/posting/refusal-text";
import { priceLine, storedUnitNoun } from "@/features/posting/price-line";
import { usePriceUnitLabels } from "@/features/posting/use-price-unit-labels";
import { NegotiableBadge } from "@/components/marketplace/negotiable-badge";

export { NegotiableBadge };

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
   * with the level's flag on its corner; the title on one line; the price slot
   * sized for its longest common case (a compact card: two lines of price and
   * the Negotiable pill — 58 px; a wider one: 44 px), so cards in different
   * sections match too (a rarer, longer price still shows whole and its row
   * grows with it); the place on the last line, kept even when the card has
   * none, with the level's word beside it — on a compact card under it, and every
   * compact card keeps that second line (S4 ruling 3).
   *
   * Sage S4 (spec §7, §8) — the level's look (fill and frame, divider, flag, word, ribbon
   * palette) comes from card-tier.ts; the card no longer clips, so the flag's fold and the
   * ribbon's caps show past its edges, and the picture keeps the card's top corners itself.
   * P-2 (c) c2a — the look is the card's own (`listing.look`); the word is its dictionary
   * row's name, so a badge whose key the dictionary does not hold draws no flag.
   */
  const look = cardLookOf(listing.look);
  const levelWord = listing.levelRow === null ? null : levelNameOf(listing.levelRow, language);
  const badge =
    look.badge === null || levelWord === null ? null : { look: look.badge, name: levelWord };

  const content = (
    <>
      {/*
        Photo area. INC-606 — the seller's cover photo when the feed gave one
        and its link came back (an active listing's stripped photo, signed for
        an hour); otherwise the category's picture from the public tree (bundle
        4 step 14), never a broken image.
      */}
      <div className="relative border-b border-card-rule">
        <ListingPicture
          photoUrl={photoUrl}
          categoryUrl={nearestCategoryPicture(tree, listing.categoryId)}
          photosSoon={listing.photosSoon}
          ribbon={ribbonKey === undefined ? null : t(ribbonKey)}
          palette={look.palette}
          boxTestId="listing-card-picture"
          rounded="rounded-t-card"
          fill
          crop
          priority={priority}
        />
        {badge ? <TierFlag levelKey={listing.tier} name={badge.name} look={badge.look} /> : null}
      </div>

      {/* D123 — below 11rem (three or four a row) the card is compact. */}
      <div className="flex flex-1 flex-col gap-1 px-[7px] py-[6px] md:@max-[11rem]:px-[9px] md:@max-[11rem]:py-[8px] @min-[11rem]:gap-2 @min-[11rem]:px-[14px] @min-[11rem]:pt-[13px] @min-[11rem]:pb-[14px]">
        <h3 className="min-w-0 text-xs font-semibold leading-4 text-foreground @min-[11rem]:text-sm @min-[11rem]:leading-5">
          <CutText text={listing.title} />
        </h3>

        <p className="flex min-h-[3.625rem] flex-wrap content-start items-center gap-x-1 gap-y-0.5 text-xs font-bold leading-4 text-foreground md:@max-[11rem]:text-[13px] @min-[11rem]:min-h-[2.75rem] @min-[11rem]:gap-x-2 @min-[11rem]:text-base @min-[11rem]:leading-5">
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
          className={cn(
            "mt-auto box-content flex min-h-[2lh] min-w-0 flex-wrap content-start items-center gap-x-1 border-t pt-[6px] text-xs leading-4 @min-[11rem]:min-h-[1lh] @min-[11rem]:flex-nowrap @min-[11rem]:pt-[9px]",
            look.place,
          )}
        >
          {locationName ? (
            <span className="flex min-w-0 flex-1 items-center gap-1">
              <MapPin
                className="h-3 w-3 shrink-0 @min-[11rem]:h-3.5 @min-[11rem]:w-3.5"
                aria-hidden="true"
              />
              <CutText text={locationName} />
            </span>
          ) : null}
          {badge ? (
            <TierWord
              name={badge.name}
              look={badge.look}
              className="basis-full @min-[11rem]:ms-auto @min-[11rem]:basis-auto"
            />
          ) : null}
        </p>
      </div>
    </>
  );

  return (
    <article
      data-testid="listing-card"
      data-listing={listing.id}
      data-tier={listing.tier}
      className={cn(
        CARD_SURFACE,
        look.surface,
        PRESSED.card,
        "group/card @container flex h-full flex-col wrap-anywhere",
      )}
    >
      {typeof listing.publicId === "string" ? (
        <Link
          to="/l/$slug"
          params={{ slug: canonicalSegment(listing.title, listing.publicId) }}
          data-testid="listing-card-link"
          data-pressable=""
          className={cn(PRESSED.cardLink, "flex h-full flex-col")}
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
