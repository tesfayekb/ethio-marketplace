import { Eye, ImageOff, MapPin } from "lucide-react";

import type { FeedListing } from "@/features/feed/use-feed";
import { useI18n } from "@/i18n";
import { entityName } from "@/i18n/entity";
import { formatCommission } from "@/features/posting/price-basis";

function priceLabel(
  listing: FeedListing,
  t: (key: Parameters<ReturnType<typeof useI18n>["t"]>[0]) => string,
): string {
  // DEC-079 (L6) — commission is judged FIRST: its amount is null by law.
  if (listing.priceMode === "commission" && listing.priceBp !== null)
    return t("price.commission").replace("{percent}", formatCommission(listing.priceBp));
  if (listing.priceMode === "free") return t("price.free");
  if (listing.priceAmount === null) return t("price.contact");
  const amount = `${listing.priceCurrency ?? ""} ${listing.priceAmount}`.trim();
  // B — a price says what it is per, with the same period keys the preview uses.
  const period = PERIOD_KEYS[listing.pricePeriod];
  return period === undefined ? amount : `${amount} · ${t(period)}`;
}

const PERIOD_KEYS: Record<
  string,
  | "post.price.period.hour"
  | "post.price.period.day"
  | "post.price.period.week"
  | "post.price.period.month"
  | "post.price.period.year"
> = {
  hour: "post.price.period.hour",
  day: "post.price.period.day",
  week: "post.price.period.week",
  month: "post.price.period.month",
  year: "post.price.period.year",
};

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
  const { t, entities } = useI18n();
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
        Photo area. Photos are stored but NOT surfaced until the EXIF-strip pass
        ships (RLS gates listing_photos on exif_stripped), so every card shows the
        placeholder today. When the strip feature lands, render an <img
        loading="lazy" width height> here sized to the card.
      */}
      <div
        className="flex aspect-4/3 w-full items-center justify-center bg-muted"
        role="img"
        aria-label={t("feed.noPhoto")}
      >
        <ImageOff className="h-8 w-8 text-muted-foreground" aria-hidden="true" />
      </div>

      <div className="flex flex-1 flex-col gap-2 p-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="min-w-0 truncate text-sm font-semibold text-foreground">
            {listing.title}
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
            {priceLabel(listing, t)}
          </span>
          {listing.priceNegotiable ? <NegotiableBadge /> : null}
        </p>

        {locationName ? (
          <p className="flex min-w-0 items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span className="truncate">{locationName}</span>
          </p>
        ) : null}

        {/* SEAM: viewCount is 0 until the view-tracking feature ships. */}
        <p className="flex items-center gap-1 text-xs text-muted-foreground">
          <Eye className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span>{t("feed.views").replace("{count}", String(listing.viewCount))}</span>
        </p>
      </div>
    </article>
  );
}

export default ListingCard;
