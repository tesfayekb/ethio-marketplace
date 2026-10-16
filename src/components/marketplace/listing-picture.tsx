import { ImageOff } from "lucide-react";
import { useState } from "react";

import { useI18n } from "@/i18n";
import { WATERMARK_ANGLE } from "@/lib/brand-mark";

/**
 * D122 — the band's centre sits this far from the corner ALONG the band's own
 * line, in the picture's width units, so the words fit between the two edges
 * at any angle (at −45° this was 21cqw in from each edge).
 */
const TAPE_REACH = 29.7;
const TAPE_RAD = (Math.abs(WATERMARK_ANGLE) * Math.PI) / 180;
const TAPE_INSET_X = `${(TAPE_REACH * Math.cos(TAPE_RAD)).toFixed(2)}cqw`;
const TAPE_INSET_Y = `${(TAPE_REACH * Math.sin(TAPE_RAD)).toFixed(2)}cqw`;

/**
 * Bundle 4 step 14 (DEC-112) — ONE PICTURE. Every surface that draws an ad's
 * picture draws it here, in this order: the listing's first photo; else the
 * category's picture (the nearest ancestor that has one); else the neutral
 * placeholder icon. "No photo yet" is never the only thing in the box: it stays
 * as the accessible label.
 *
 * Step 15 — "Photos coming soon": when the seller ticked it and the ad has no
 * photo, a band is drawn. Adding a photo hides it by the same rule; nothing is
 * written.
 *
 * INC-435 — the band is a corner ribbon in the LOWER-RIGHT corner of the
 * picture's OWN drawn box: the img sits in a box sized to its rendered shape
 * (its natural ratio, contained in the 4:3 frame), the band lives inside that
 * box rotated by the brand angle (−30°, D122; −45° until then) and is clipped by
 * it, so nothing runs past the picture.
 * D197 (the operator, 2026-10-16) — it is drawn in the site's second colour (the
 * gold), like the status ribbons below; a clean band with no stripes.
 *
 * D180 (the operator's walk of bundle 16, 2026-10-14) — an ad's status is a RIBBON in the site's second colour
 * (the gold): Sold, Rented or Filled, No longer available, Reserved or Price reduced — one word, the most important
 * first (src/features/feed/feed-page.ts, `ribbonOf`). It takes the photos-soon band's corner and replaces it, so a
 * picture never carries two.
 *
 * INC-670 (bundle 18 turn 1; the operator's bundle-17 walk: "the thickness of all ribbons should look the same
 * including text color, size, style") — ONE RIBBON. Every band across an ad's picture — the status word and the
 * photos-soon band — is drawn by this one component, from one class set and one style: one band height (the
 * letters at `clamp(9px, 6cqw, 22px)` with 1.6cqw above and below), one weight, one tracking, one colour, one
 * shadow. Before, the photos-soon band had its own, smaller set (3.6cqw letters, 1.4cqw padding, 0.04em) and read
 * thinner beside a status ribbon. The band's visible run between the picture's edges is about 59cqw, so one size
 * fits every ribbon only while its words stay within 14 characters (RB-1, the status words' cap, now the band's
 * too): "PHOTOS COMING SOON" became "PHOTOS SOON".
 */
/** The band itself — one class set for every ribbon; a test proves no ribbon is drawn with another. */
export const RIBBON_BAND_CLASS =
  "absolute bg-gold font-bold uppercase text-gold-foreground shadow-sm";
export const RIBBON_TEXT_CLASS = "block text-center leading-none whitespace-nowrap";
export const RIBBON_TEXT_STYLE = {
  fontSize: "clamp(9px, 6cqw, 22px)",
  letterSpacing: "0.06em",
  padding: "1.6cqw 0",
} as const;

export function ListingRibbon({
  text,
  testId = "listing-ribbon",
  textTestId = "listing-ribbon-text",
}: {
  text: string;
  /** The wrapper's id: `listing-ribbon` (the status word) or `listing-photos-soon-ribbon` (the band). */
  testId?: string;
  textTestId?: string;
}) {
  return (
    <div
      data-testid={testId}
      aria-hidden="true"
      className="@container pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div
        className={RIBBON_BAND_CLASS}
        style={{
          width: "84cqw",
          left: `calc(100% - ${TAPE_INSET_X})`,
          top: `calc(100% - ${TAPE_INSET_Y})`,
          // D122 — the ribbon and the watermark share one angle.
          transform: `translate(-50%, -50%) rotate(${WATERMARK_ANGLE}deg)`,
        }}
      >
        <span data-testid={textTestId} className={RIBBON_TEXT_CLASS} style={RIBBON_TEXT_STYLE}>
          {text}
        </span>
      </div>
    </div>
  );
}

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
  ribbon = null,
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
  /** D180 — the ad's status word, drawn as the gold ribbon; null when it has none. */
  ribbon?: string | null;
}) {
  const { t } = useI18n();
  const source = photoUrl ?? categoryUrl;
  const showRibbon = ribbon === null && photosSoon && !(hasPhoto ?? photoUrl !== null);
  /** The drawn picture's own ratio; 4:3 until the image says otherwise. */
  const [ratio, setRatio] = useState(4 / 3);
  return (
    <div
      className={`@container relative flex aspect-4/3 w-full items-center justify-center overflow-hidden bg-muted ${rounded} ${fill ? "" : "mx-auto max-w-80"}`}
      data-testid={boxTestId}
      data-picture={photoUrl !== null ? "photo" : categoryUrl !== null ? "category" : "none"}
      role={photoUrl === null ? "img" : undefined}
      aria-label={photoUrl === null ? t("feed.noPhoto") : undefined}
    >
      <div
        className="@container relative overflow-hidden"
        data-testid={imgTestId === undefined ? undefined : `${imgTestId}-frame`}
        style={
          source === null
            ? { width: "100%", height: "100%" }
            : {
                aspectRatio: String(ratio),
                width: `min(100cqw, ${75 * ratio}cqw)`,
              }
        }
      >
        {source !== null ? (
          <img
            src={source}
            data-testid={imgTestId}
            alt=""
            width={320}
            height={240}
            loading="lazy"
            onLoad={(event) => {
              const { naturalWidth, naturalHeight } = event.currentTarget;
              if (naturalWidth > 0 && naturalHeight > 0) setRatio(naturalWidth / naturalHeight);
            }}
            className={`block h-full w-full object-contain ${photoUrl === null && dimCategory ? "opacity-60" : ""}`}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <ImageOff className="h-8 w-8 text-muted-foreground" aria-hidden="true" />
          </div>
        )}
        {showRibbon && (
          <ListingRibbon
            text={t("listing.photosSoon")}
            testId="listing-photos-soon-ribbon"
            textTestId="listing-photos-soon-text"
          />
        )}
        {ribbon !== null && <ListingRibbon text={ribbon} />}
      </div>
      {showRibbon && <span className="sr-only">{t("listing.photosSoon")}</span>}
      {ribbon !== null && <span className="sr-only">{ribbon}</span>}
    </div>
  );
}
