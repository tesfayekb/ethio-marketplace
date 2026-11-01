import { ImageOff } from "lucide-react";
import { useState, type CSSProperties } from "react";

import { useI18n } from "@/i18n";

import {
  CAP_END_STYLE,
  CAP_FOOT_STYLE,
  RIBBON_BAND_STYLE,
  RIBBON_TEXT_STYLE,
  ribbonPaletteVars,
  type RibbonPalette,
} from "./ribbon-geometry";

export { RIBBON_TEXT_STYLE };

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
 * letters at `clamp(9px, 5cqw, 20px)` with 1.4cqw above and below), one weight, one tracking, one colour, one
 * shadow. Before, the photos-soon band had its own, smaller set (3.6cqw letters, 1.4cqw padding, 0.04em) and read
 * thinner beside a status ribbon; its words became "PHOTOS SOON". The band's ends are clipped by the picture's corners,
 * so at this size a word may be at most 10.6em wide (8.6em at the first size, 6cqw, which cut "Price reduced" — INC-675):
 * a ribbon word is at most 14 characters AND at most 10.0em in the site's bold (RB-1; the supervisor measures a new word).
 *
 * D220 (the operator's walk, 2026-10-18) — a tall photo's frame was narrow,
 * so its ribbon was small. On cards the photo fills the 4:3 box (cropped at
 * its edges, centred) and every ribbon is one size; the ad's own page keeps
 * the whole photo. Category pictures and placeholders keep their old shape.
 *
 * Sage S4 (spec §8; rulings 1 and 2) — a SATIN band in the card's palette (a regular ad pearl,
 * Premium gold, Featured sage; the caller names it), drawn by the stylesheet's ribbon rules from
 * tokens, with a rolled cap beyond each edge it crosses. Place, angle, size and words are
 * unchanged; the geometry lives in ribbon-geometry.ts. The box no longer clips: its clip layer
 * keeps the photo and the band inside its corners, and the caps sit on a copy of the drawn frame.
 */
/** The band itself — one class set for every ribbon; a test proves no ribbon is drawn with another. */
export const RIBBON_BAND_CLASS = "ribbon-band absolute font-bold uppercase";
export const RIBBON_TEXT_CLASS = "block text-center leading-none whitespace-nowrap";

function paletteStyle(palette: RibbonPalette): CSSProperties {
  return ribbonPaletteVars(palette) as CSSProperties;
}

export function ListingRibbon({
  text,
  palette = "pearl",
  testId = "listing-ribbon",
  textTestId = "listing-ribbon-text",
}: {
  text: string;
  palette?: RibbonPalette;
  /** The wrapper's id: `listing-ribbon` (the status word) or `listing-photos-soon-ribbon` (the band). */
  testId?: string;
  textTestId?: string;
}) {
  return (
    <div
      data-testid={testId}
      data-ribbon={palette}
      aria-hidden="true"
      className="@container pointer-events-none absolute inset-0 overflow-hidden"
      style={paletteStyle(palette)}
    >
      <div className={RIBBON_BAND_CLASS} style={RIBBON_BAND_STYLE as CSSProperties}>
        <span data-testid={textTestId} className={RIBBON_TEXT_CLASS} style={RIBBON_TEXT_STYLE}>
          {text}
        </span>
      </div>
    </div>
  );
}

/** The two rolled caps, beyond the right and bottom edges of the frame they sit on. */
function RibbonEnds({ palette }: { palette: RibbonPalette }) {
  return (
    <div
      data-testid="listing-ribbon-ends"
      data-ribbon={palette}
      className="ribbon-ends absolute inset-0"
      style={paletteStyle(palette)}
    >
      <span className="ribbon-cap-end absolute" style={CAP_END_STYLE} />
      <span className="ribbon-cap-foot absolute" style={CAP_FOOT_STYLE} />
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
  crop = false,
  ribbon = null,
  palette = "pearl",
  priority = false,
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
  /** D220 — a seller photo fills the card's 4:3 box; category pictures stay whole. */
  crop?: boolean;
  /** D180 — the ad's status word, drawn as the ribbon; null when it has none. */
  ribbon?: string | null;
  /** Spec §8 — the ribbon's palette, from the card's tier (card-tier.ts); pearl elsewhere. */
  palette?: RibbonPalette;
  /** DEC-195 — the grid's first cards load at once with high fetch priority; the rest lazily. */
  priority?: boolean;
}) {
  const { t } = useI18n();
  const source = photoUrl ?? categoryUrl;
  const cropPhoto = crop && photoUrl !== null;
  const showRibbon = ribbon === null && photosSoon && !(hasPhoto ?? photoUrl !== null);
  /** The drawn picture's own ratio; 4:3 until the image says otherwise. */
  const [ratio, setRatio] = useState(4 / 3);
  const frameStyle =
    source === null || cropPhoto
      ? { width: "100%", height: "100%" }
      : { aspectRatio: String(ratio), width: `min(100cqw, ${75 * ratio}cqw)` };
  const banded = showRibbon || ribbon !== null;
  return (
    <div
      className={`@container relative aspect-4/3 w-full bg-photo-empty ${rounded} ${fill ? "" : "mx-auto max-w-80"}`}
      data-testid={boxTestId}
      data-picture={photoUrl !== null ? "photo" : categoryUrl !== null ? "category" : "none"}
      role={photoUrl === null ? "img" : undefined}
      aria-label={photoUrl === null ? t("feed.noPhoto") : undefined}
    >
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-[inherit]">
        <div
          className="@container relative overflow-hidden"
          data-testid={imgTestId === undefined ? undefined : `${imgTestId}-frame`}
          style={frameStyle}
        >
          {source !== null ? (
            <img
              src={source}
              data-testid={imgTestId}
              alt=""
              width={320}
              height={240}
              loading={priority ? "eager" : "lazy"}
              fetchPriority={priority ? "high" : undefined}
              decoding="async"
              onLoad={(event) => {
                const { naturalWidth, naturalHeight } = event.currentTarget;
                if (!cropPhoto && naturalWidth > 0 && naturalHeight > 0)
                  setRatio(naturalWidth / naturalHeight);
              }}
              className={`block h-full w-full ${cropPhoto ? "object-cover" : "object-contain"} ${photoUrl === null && dimCategory ? "opacity-60" : ""}`}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <ImageOff className="h-8 w-8 text-muted-foreground" aria-hidden="true" />
            </div>
          )}
          {showRibbon && (
            <ListingRibbon
              text={t("listing.photosSoon")}
              palette={palette}
              testId="listing-photos-soon-ribbon"
              textTestId="listing-photos-soon-text"
            />
          )}
          {ribbon !== null && <ListingRibbon text={ribbon} palette={palette} />}
        </div>
      </div>
      {banded && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
        >
          <div className="@container relative" style={frameStyle}>
            <RibbonEnds palette={palette} />
          </div>
        </div>
      )}
      {showRibbon && <span className="sr-only">{t("listing.photosSoon")}</span>}
      {ribbon !== null && <span className="sr-only">{ribbon}</span>}
    </div>
  );
}
