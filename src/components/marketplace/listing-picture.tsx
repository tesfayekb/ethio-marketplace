import { ImageOff } from "lucide-react";
import { useState } from "react";

import { useI18n } from "@/i18n";

/**
 * INC-435 — the hazard-tape corner band (the operator's reference): a yellow
 * band with black text and a thin black-and-yellow stripe on each edge.
 */
const TAPE_YELLOW = "#FFD200";
const TAPE_BLACK = "#000000";
const TAPE_STRIPE = `repeating-linear-gradient(45deg, ${TAPE_BLACK} 0 0.9cqw, ${TAPE_YELLOW} 0.9cqw 1.8cqw)`;
/** How far in from the corner the band's centre sits, in the picture's own width units. */
const TAPE_INSET = "21cqw";

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
 * box rotated −45° and is clipped by it, so nothing runs past the picture.
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
          <div
            data-testid="listing-photos-soon-ribbon"
            aria-hidden="true"
            className="pointer-events-none absolute flex flex-col font-bold uppercase"
            style={{
              width: "84cqw",
              left: `calc(100% - ${TAPE_INSET})`,
              top: `calc(100% - ${TAPE_INSET})`,
              transform: "translate(-50%, -50%) rotate(-45deg)",
              background: TAPE_YELLOW,
              color: TAPE_BLACK,
            }}
          >
            <span className="block" style={{ height: "1.2cqw", background: TAPE_STRIPE }} />
            <span
              className="block text-center leading-none whitespace-nowrap"
              style={{ fontSize: "3.6cqw", letterSpacing: "0.04em", padding: "1.4cqw 0" }}
            >
              {t("listing.photosSoon")}
            </span>
            <span className="block" style={{ height: "1.2cqw", background: TAPE_STRIPE }} />
          </div>
        )}
      </div>
      {showRibbon && <span className="sr-only">{t("listing.photosSoon")}</span>}
    </div>
  );
}
