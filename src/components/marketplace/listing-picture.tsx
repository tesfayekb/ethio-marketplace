import { ImageOff } from "lucide-react";

import { useI18n } from "@/i18n";
import { WATERMARK_ANGLE, WATERMARK_COLOR } from "@/lib/brand-mark";

/**
 * Bundle 4 step 14 (DEC-112) — ONE PICTURE. Every surface that draws an ad's
 * picture draws it here, in this order: the listing's first photo; else the
 * category's picture (the nearest ancestor that has one); else the neutral
 * placeholder icon. "No photo yet" is never the only thing in the box: it stays
 * as the accessible label.
 *
 * Step 15 — "Photos coming soon": when the seller ticked it and the ad has no
 * photo, one band crosses the picture at the brand angle, sized by container
 * units so it reads the same on a card and on the detail. Adding a photo hides
 * it by the same rule; nothing is written.
 */
export function ListingPicture({
  photoUrl,
  categoryUrl,
  photosSoon = false,
  hasPhoto,
  boxTestId,
  imgTestId,
  dimCategory = false,
  rounded = "rounded-md",
  fill = false,
}: {
  photoUrl: string | null;
  categoryUrl: string | null;
  photosSoon?: boolean;
  /**
   * Whether the listing holds a photo at all, when the caller knows it even
   * though it cannot draw it (a stored photo has no public address yet).
   * Defaults to "a photo address was given".
   */
  hasPhoto?: boolean;
  boxTestId?: string;
  imgTestId?: string;
  /** The photos page shows the stand-in softened, as before. */
  dimCategory?: boolean;
  rounded?: string;
  /** A card fills its column; elsewhere the box is capped at 320 px. */
  fill?: boolean;
}) {
  const { t } = useI18n();
  const source = photoUrl ?? categoryUrl;
  const showRibbon = photosSoon && !(hasPhoto ?? photoUrl !== null);
  return (
    <div
      className={`@container relative flex aspect-4/3 w-full items-center justify-center overflow-hidden bg-muted ${rounded} ${fill ? "" : "mx-auto max-w-80"}`}
      data-testid={boxTestId}
      data-picture={photoUrl !== null ? "photo" : categoryUrl !== null ? "category" : "none"}
      role={photoUrl === null ? "img" : undefined}
      aria-label={photoUrl === null ? t("feed.noPhoto") : undefined}
    >
      {source !== null ? (
        <img
          src={source}
          data-testid={imgTestId}
          alt=""
          width={320}
          height={240}
          loading="lazy"
          className={`h-full w-full object-contain ${photoUrl === null && dimCategory ? "opacity-60" : ""}`}
        />
      ) : (
        <ImageOff className="h-8 w-8 text-muted-foreground" aria-hidden="true" />
      )}
      {showRibbon && (
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          aria-hidden="true"
        >
          <div
            data-testid="listing-photos-soon-ribbon"
            className="flex w-[150%] shrink-0 items-center justify-center font-bold uppercase"
            style={{
              height: "14cqw",
              fontSize: "5.5cqw",
              letterSpacing: "0.04em",
              background: WATERMARK_COLOR,
              color: "#FFFFFF",
              transform: `rotate(${WATERMARK_ANGLE}deg)`,
            }}
          >
            {t("listing.photosSoon")}
          </div>
        </div>
      )}
      {showRibbon && <span className="sr-only">{t("listing.photosSoon")}</span>}
    </div>
  );
}
