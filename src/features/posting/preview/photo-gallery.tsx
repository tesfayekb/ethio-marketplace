import {
  useEffect,
  useId,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  type RefObject,
} from "react";

import { PhotoRibbon } from "@/components/marketplace/listing-picture";
import type { RibbonPalette } from "@/components/marketplace/ribbon-geometry";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { StripArrows, keepInStrip } from "@/components/ui/strip-arrows";
import { useI18n } from "@/i18n";

import type { GalleryPhoto } from "../photo-links";
import { fill } from "../refusal-text";

/** A sideways move this far (CSS px) is a swipe; this little is a tap. */
const SWIPE_PX = 40;
const TAP_PX = 8;

function useSwipe(onStep: (direction: 1 | -1) => void) {
  const start = useRef<{ x: number; y: number } | null>(null);
  const swiped = useRef(false);
  return {
    swiped,
    handlers: {
      onPointerDown: (event: ReactPointerEvent) => {
        start.current = { x: event.clientX, y: event.clientY };
        swiped.current = false;
      },
      onPointerUp: (event: ReactPointerEvent) => {
        const from = start.current;
        start.current = null;
        if (from === null) return;
        const dx = event.clientX - from.x;
        const dy = event.clientY - from.y;
        if (Math.abs(dx) >= SWIPE_PX && Math.abs(dx) > Math.abs(dy)) {
          swiped.current = true;
          onStep(dx < 0 ? 1 : -1);
        } else if (Math.abs(dx) > TAP_PX || Math.abs(dy) > TAP_PX) {
          swiped.current = true;
        }
      },
      onPointerCancel: () => {
        start.current = null;
      },
    },
  };
}

/** Sage S5 (spec §12) — 44 px round, white at 92 %, a soft drop and no border. */
const arrowClass =
  "absolute top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full " +
  "bg-card/92 text-lg text-foreground shadow-arrow disabled:opacity-30";

/**
 * D161 (the operator, 2026-10-13) — THE LISTING'S PHOTO GALLERY, as big sites
 * show it (the operator: "the main photo in regular size and on the side small
 * of the rest just like in amazon … clicking those opens bigger image on that
 * panel"; Baymard: thumbnails, not dots, on a computer and on a phone).
 *
 *   - A computer (the gallery 32rem wide or more): the main photo large, the
 *     thumbnails in a column on its left; a thumbnail shows its photo in the
 *     main panel.
 *   - A phone: the main photo full width; a swipe moves to the next or the
 *     previous photo; a counter "2 / 7" on it; the thumbnails in a row under it.
 *   - A tap or click on the main photo opens a full-screen viewer: the large
 *     size, a swipe or the arrows to move, the thumbnails, Escape or Close to
 *     leave; a double click doubles the size, and a phone's own pinch zoom
 *     works.
 *
 * Light by design: only the photo shown is drawn at a large size — the card
 * size or the middle size (960 px, D162), chosen by the browser from `srcSet`;
 * a photo stored before the middle size offers the cover instead. Thumbnails
 * are the thumb size (about 6 KB); the full-screen viewer draws the cover only
 * when it is opened.
 *
 * INC-613 — on a computer the photo sits at the TOP of its 4:3 frame, so a
 * photo wider than 4:3 lines up with the first thumbnail beside it (centred, a
 * wide photo sat below the thumbnails' top). On a phone it stays centred.
 *
 * Sage S5 (spec §12) — the photo well in --photo-empty at 14 px; the ribbon in
 * the ad's palette pinned to the main photo's bottom-end corner with its caps
 * uncut, the tier flag (the caller's) on its top-start corner; thumbnails at
 * 6 px with a hairline ring, the chosen one edged in the tier's accent.
 */
export function PhotoGallery({
  photos,
  markUnscreened = false,
  ribbon = null,
  fill: fillColumn = false,
  palette = "pearl",
  flag = null,
  thumbOn = "border-primary",
}: {
  photos: readonly GalleryPhoto[];
  /** D158 — staff's preview marks a photo held while photo screening was off. */
  markUnscreened?: boolean;
  /** D180 — the ad's status word, drawn as the gold ribbon on the large photo; null when it has none. */
  ribbon?: string | null;
  /** DEC-197 — from a 32rem container the gallery grows to its card's height (the photo whole, centred, never shorter than its 4:3 height). Below 32rem nothing changes. */
  fill?: boolean;
  /** Spec §8 — the ribbon's palette, from the ad's tier (card-tier.ts adPageLookOf). */
  palette?: RibbonPalette;
  /** Spec §12 — the tier flag (TierFlag on="photo"), drawn on the main photo's top-start corner. */
  flag?: ReactNode;
  /** The chosen thumbnail's edge (adPageLookOf().thumbOn). */
  thumbOn?: string;
}) {
  const { t } = useI18n();
  const total = photos.length;
  const [index, setIndex] = useState(0);
  const [viewer, setViewer] = useState(false);
  const stripRef = useRef<HTMLUListElement>(null);
  const placeId = useId();
  const at = Math.min(index, total - 1);
  const go = (next: number) => setIndex(Math.max(0, Math.min(total - 1, next)));
  const swipe = useSwipe((direction) => go(at + direction));
  if (total === 0) return null;
  const photo = photos[at]!;
  const several = total > 1;

  return (
    <div
      data-testid="listing-detail-gallery"
      className={`@container${fillColumn ? " @min-[32rem]:flex @min-[32rem]:h-full @min-[32rem]:flex-1 @min-[32rem]:flex-col" : ""}`}
    >
      <div
        className={`flex flex-col gap-2 @min-[32rem]:flex-row-reverse ${fillColumn ? "@min-[32rem]:min-h-0 @min-[32rem]:flex-1 @min-[32rem]:items-stretch" : "@min-[32rem]:items-start"}`}
      >
        <div
          className={`relative min-w-0 flex-1${fillColumn ? " @min-[32rem]:flex @min-[32rem]:flex-col" : ""}`}
        >
          <button
            type="button"
            data-testid="gallery-main"
            data-index={at}
            aria-label={t("post.gallery.enlarge")}
            aria-describedby={placeId}
            className={`flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-row bg-photo-empty${fillColumn ? " @min-[32rem]:min-h-full" : ""}`}
            style={{ touchAction: "pan-y" }}
            {...swipe.handlers}
            onClick={() => {
              if (swipe.swiped.current) {
                swipe.swiped.current = false;
                return;
              }
              setViewer(true);
            }}
          >
            <img
              src={photo.main}
              srcSet={srcSetOf(photo)}
              sizes="(min-width: 640px) 36rem, 100vw"
              alt=""
              width={480}
              height={360}
              loading="eager"
              fetchPriority="high"
              decoding="async"
              className="h-full w-full object-contain @min-[32rem]:object-top"
              draggable={false}
            />
          </button>
          {ribbon !== null ? (
            <>
              <PhotoRibbon
                text={ribbon}
                palette={palette}
                rounded="rounded-row"
                className={fillColumn ? "inset-0" : "inset-x-0 top-0 aspect-[4/3]"}
              />
              <span className="sr-only">{ribbon}</span>
            </>
          ) : null}
          {flag !== null ? (
            // The flag's own container, so its size follows the photo and no other query moves.
            <div
              data-testid="gallery-flag"
              className="@container pointer-events-none absolute inset-0"
            >
              {flag}
            </div>
          ) : null}
          {markUnscreened && photo.unscreened === true ? (
            <span
              data-testid="gallery-unscreened"
              className="pointer-events-none absolute start-2 top-2 rounded-md bg-foreground/80 px-2 py-0.5 text-xs font-medium text-background"
            >
              {/* Bundle 16 turn 4b (D178) — a photo the check judged waits for a person. */}
              {photo.inReview === true ? t("post.gallery.inReview") : t("post.gallery.unscreened")}
            </span>
          ) : null}
          {/* The photo's place, read with the button (outside it: the button's own words are its label). */}
          <span id={placeId} className="sr-only">
            {fill(t("post.preview.photoCount"), { index: at + 1, total })}
          </span>
          {several ? (
            <>
              <button
                type="button"
                data-testid="gallery-previous"
                aria-label={t("post.gallery.previous")}
                className={`${arrowClass} start-2`}
                disabled={at === 0}
                onClick={() => go(at - 1)}
              >
                <span aria-hidden="true">‹</span>
              </button>
              <button
                type="button"
                data-testid="gallery-next"
                aria-label={t("post.gallery.next")}
                className={`${arrowClass} end-2`}
                disabled={at === total - 1}
                onClick={() => go(at + 1)}
              >
                <span aria-hidden="true">›</span>
              </button>
              <span
                data-testid="gallery-count"
                className="absolute bottom-2 end-2 rounded-full bg-foreground/70 px-2 py-0.5 text-xs font-medium text-background"
              >
                {`${at + 1} / ${total}`}
              </span>
            </>
          ) : null}
        </div>
        {several ? (
          <div className="relative @min-[32rem]:shrink-0 @min-[32rem]:self-start">
            <Thumbs
              ref={stripRef}
              photos={photos}
              at={at}
              onPick={go}
              thumbOn={thumbOn}
              testid="gallery-thumbs"
              className="scrollbar-none flex gap-2 overflow-x-auto @min-[32rem]:max-h-[27rem] @min-[32rem]:w-16 @min-[32rem]:flex-col @min-[32rem]:overflow-x-hidden @min-[32rem]:overflow-y-auto"
            />
            <StripArrows
              stripRef={stripRef}
              backLabel={t("post.gallery.stripBack")}
              moreLabel={t("post.gallery.stripMore")}
              testIdPrefix="gallery-strip"
            />
          </div>
        ) : null}
      </div>
      {viewer ? (
        <Viewer
          photos={photos}
          at={at}
          onGo={go}
          onClose={() => setViewer(false)}
          thumbOn={thumbOn}
        />
      ) : null}
    </div>
  );
}

/**
 * D162 — the sizes the page's photo may be drawn from: the card and the middle
 * size; the cover only for a photo stored before the middle size existed, so
 * the full size is never fetched for the page when a middle size exists.
 */
function srcSetOf(photo: GalleryPhoto): string | undefined {
  if (photo.middle !== null) return `${photo.main} 480w, ${photo.middle} 960w`;
  if (photo.large !== null) return `${photo.main} 480w, ${photo.large} 1600w`;
  return undefined;
}

function Thumbs({
  ref,
  photos,
  at,
  onPick,
  thumbOn = "border-primary",
  testid,
  className,
}: {
  /** The strip itself, so the arrows and the keep-in-view rule can read it. */
  ref: RefObject<HTMLUListElement | null>;
  photos: readonly GalleryPhoto[];
  at: number;
  onPick: (index: number) => void;
  thumbOn?: string;
  testid: string;
  className: string;
}) {
  const { t } = useI18n();
  // When the shown photo changes (the photo's ‹ ›, a swipe, a key), its
  // thumbnail is kept fully inside the strip — the strip's own scroll only.
  useEffect(() => {
    const strip = ref.current;
    const item = strip?.children[at];
    if (strip && item instanceof HTMLElement) keepInStrip(strip, item);
  }, [ref, at, photos.length]);
  return (
    <ul ref={ref} data-testid={testid} className={className}>
      {photos.map((photo, index) => (
        <li key={photo.id} className="shrink-0">
          <button
            type="button"
            data-testid="gallery-thumb"
            data-index={index}
            aria-label={fill(t("post.gallery.show"), { index: index + 1 })}
            aria-current={index === at ? "true" : undefined}
            // The idle edge is an outline on the border's band: a ring would be cut by the strip.
            className={`block h-12 w-16 overflow-hidden rounded-thumb border-2 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ring ${
              index === at
                ? thumbOn
                : "border-transparent opacity-80 outline-1 -outline-offset-1 outline-hairline hover:opacity-100"
            }`}
            onClick={() => onPick(index)}
          >
            <img
              src={photo.thumb}
              alt=""
              width={64}
              height={48}
              loading="lazy"
              className="h-full w-full object-cover"
            />
          </button>
        </li>
      ))}
    </ul>
  );
}

function Viewer({
  photos,
  at,
  onGo,
  onClose,
  thumbOn,
}: {
  photos: readonly GalleryPhoto[];
  at: number;
  onGo: (index: number) => void;
  onClose: () => void;
  thumbOn: string;
}) {
  const { t } = useI18n();
  const total = photos.length;
  const photo = photos[at]!;
  const stripRef = useRef<HTMLUListElement>(null);
  const [zoomed, setZoomed] = useState(false);
  const swipe = useSwipe((direction) => {
    if (!zoomed) onGo(at + direction);
  });
  useEffect(() => {
    setZoomed(false);
  }, [at]);
  const place = fill(t("post.preview.photoCount"), { index: at + 1, total });

  // Turn S6-4 — the one dialog's screen variant, on the viewer layer above the preview sheet:
  // one Escape closes the top layer only, and the focus goes back to the photo that opened it.
  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent
        variant="screen"
        layer="viewer"
        data-testid="gallery-viewer"
        closeTestId="gallery-viewer-close"
        aria-describedby={undefined}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") onGo(at + 1);
          else if (event.key === "ArrowLeft") onGo(at - 1);
          else return;
          event.preventDefault();
        }}
      >
        <DialogTitle className="sr-only">{place}</DialogTitle>
        <div className="flex min-h-16 items-center px-4 pe-16">
          <span data-testid="gallery-viewer-count" className="text-sm text-muted-foreground">
            {`${at + 1} / ${total}`}
          </span>
        </div>
        <div
          className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden"
          style={{ touchAction: "pan-y pinch-zoom" }}
          {...swipe.handlers}
        >
          <img
            data-testid="gallery-viewer-image"
            src={photo.large ?? photo.main}
            alt={place}
            className={`max-h-full max-w-full object-contain transition-transform ${
              zoomed ? "scale-200 cursor-zoom-out" : "cursor-zoom-in"
            }`}
            draggable={false}
            onDoubleClick={() => setZoomed((value) => !value)}
          />
          {total > 1 ? (
            <>
              <button
                type="button"
                data-testid="gallery-viewer-previous"
                aria-label={t("post.gallery.previous")}
                className={`${arrowClass} start-2`}
                disabled={at === 0}
                onClick={() => onGo(at - 1)}
              >
                <span aria-hidden="true">‹</span>
              </button>
              <button
                type="button"
                data-testid="gallery-viewer-next"
                aria-label={t("post.gallery.next")}
                className={`${arrowClass} end-2`}
                disabled={at === total - 1}
                onClick={() => onGo(at + 1)}
              >
                <span aria-hidden="true">›</span>
              </button>
            </>
          ) : null}
        </div>
        {total > 1 ? (
          <div className="relative">
            <Thumbs
              ref={stripRef}
              photos={photos}
              at={at}
              onPick={onGo}
              thumbOn={thumbOn}
              testid="gallery-viewer-thumbs"
              // INC-720 — safe centre: centred while the row fits, start-aligned
              // when it overflows, so the first photos stay reachable.
              className="scrollbar-none flex justify-center-safe gap-2 overflow-x-auto p-2"
            />
            <StripArrows
              stripRef={stripRef}
              backLabel={t("post.gallery.stripBack")}
              moreLabel={t("post.gallery.stripMore")}
              testIdPrefix="gallery-viewer-strip"
            />
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
