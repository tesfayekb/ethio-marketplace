import { Eye, ImageOff, MapPin } from "lucide-react";

import type { FeedListing } from "@/features/feed/use-feed";
import { useI18n } from "@/i18n";

function priceLabel(
  listing: FeedListing,
  t: (key: Parameters<ReturnType<typeof useI18n>["t"]>[0]) => string,
): string {
  if (listing.priceMode === "free") return t("price.free");
  if (listing.priceMode === "negotiable" && listing.priceAmount === null)
    return t("price.negotiable");
  if (listing.priceAmount === null) return t("price.contact");
  return `${listing.priceCurrency ?? ""} ${listing.priceAmount}`.trim();
}

export function ListingCard({ listing }: { listing: FeedListing }) {
  const { t, language } = useI18n();
  const locationName =
    (language === "am" ? listing.locationNameAm : listing.locationNameEn) ?? listing.locationNameEn;

  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-border bg-card">
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

        <p className="text-sm font-semibold text-foreground">{priceLabel(listing, t)}</p>

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
