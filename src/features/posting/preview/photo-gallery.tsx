import { useEffect, useId, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { createPortal } from "react-dom";

import { Z_VIEWER } from "@/components/layout/layers";
import { ListingRibbon } from "@/components/marketplace/listing-picture";
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

const arrowClass =
  "absolute top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full " +
  "border border-border bg-background/90 text-lg text-foreground shadow-sm disabled:opacity-30";

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
 */
export function PhotoGallery({
  photos,
  markUnscreened = false,
  ribbon = null,
}: {
  photos: readonly GalleryPhoto[];
  /** D158 — staff's preview marks a photo held while photo screening was off. */
  markUnscreened?: boolean;
  /** D180 — the ad's status word, drawn as the gold ribbon on the large photo; null when it has none. */
  ribbon?: string | null;
}) {
  const { t } = useI18n();
  const total = photos.length;
  const [index, setIndex] = useState(0);
  const [viewer, setViewer] = useState(false);
  const mainRef = useRef<HTMLButtonElement>(null);
  const placeId = useId();
  const at = Math.min(index, total - 1);
  const go = (next: number) => setIndex(Math.max(0, Math.min(total - 1, next)));
  const swipe = useSwipe((direction) => go(at + direction));
  if (total === 0) return null;
  const photo = photos[at]!;
  const several = total > 1;

  return (
    <div data-testid="listing-detail-gallery" className="@container">
      <div className="flex flex-col gap-2 @min-[32rem]:flex-row-reverse @min-[32rem]:items-start">
        <div className="relative min-w-0 flex-1">
          <button
            ref={mainRef}
            type="button"
            data-testid="gallery-main"
            data-index={at}
            aria-label={t("post.gallery.enlarge")}
            aria-describedby={placeId}
            className="flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-md bg-muted"
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
              className="h-full w-full object-contain @min-[32rem]:object-top"
              draggable={false}
            />
          </button>
          {ribbon !== null ? (
            <div className="pointer-events-none absolute inset-x-0 top-0 aspect-[4/3] overflow-hidden rounded-md">
              <ListingRibbon text={ribbon} />
              <span className="sr-only">{ribbon}</span>
            </div>
          ) : null}
          {markUnscreened && photo.unscreened === true ? (
            <span
              data-testid="gallery-unscreened"
              className="pointer-events-none absolute start-2 top-2 rounded-md bg-foreground/80 px-2 py-0.5 text-xs font-medium text-background"
            >
              {t("post.gallery.unscreened")}
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
          <Thumbs
            photos={photos}
            at={at}
            onPick={go}
            testid="gallery-thumbs"
            className="flex gap-2 overflow-x-auto @min-[32rem]:max-h-[27rem] @min-[32rem]:w-16 @min-[32rem]:shrink-0 @min-[32rem]:flex-col @min-[32rem]:overflow-x-hidden @min-[32rem]:overflow-y-auto"
          />
        ) : null}
      </div>
      {viewer ? (
        <Viewer
          photos={photos}
          at={at}
          onGo={go}
          onClose={() => {
            setViewer(false);
            mainRef.current?.focus();
          }}
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
  photos,
  at,
  onPick,
  testid,
  className,
}: {
  photos: readonly GalleryPhoto[];
  at: number;
  onPick: (index: number) => void;
  testid: string;
  className: string;
}) {
  const { t } = useI18n();
  return (
    <ul data-testid={testid} className={className}>
      {photos.map((photo, index) => (
        <li key={photo.id} className="shrink-0">
          <button
            type="button"
            data-testid="gallery-thumb"
            data-index={index}
            aria-label={fill(t("post.gallery.show"), { index: index + 1 })}
            aria-current={index === at ? "true" : undefined}
            className={`block h-12 w-16 overflow-hidden rounded-sm border-2 ${
              index === at ? "border-primary" : "border-transparent opacity-80 hover:opacity-100"
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
}: {
  photos: readonly GalleryPhoto[];
  at: number;
  onGo: (index: number) => void;
  onClose: () => void;
}) {
  const { t } = useI18n();
  const total = photos.length;
  const photo = photos[at]!;
  const closeRef = useRef<HTMLButtonElement>(null);
  const [zoomed, setZoomed] = useState(false);
  const swipe = useSwipe((direction) => {
    if (!zoomed) onGo(at + direction);
  });

  useEffect(() => {
    closeRef.current?.focus();
  }, []);
  useEffect(() => {
    setZoomed(false);
  }, [at]);
  // Captured on the document and stopped there: the preview sheet under the
  // viewer closes on its own Escape (a document listener), and one Escape must
  // close the viewer only.
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      else if (event.key === "ArrowRight") onGo(at + 1);
      else if (event.key === "ArrowLeft") onGo(at - 1);
      else return;
      event.stopPropagation();
      event.preventDefault();
    };
    document.addEventListener("keydown", onKey, true);
    return () => document.removeEventListener("keydown", onKey, true);
  }, [at, onGo, onClose]);

  if (typeof document === "undefined") return null;
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={fill(t("post.preview.photoCount"), { index: at + 1, total })}
      data-testid="gallery-viewer"
      className={`fixed inset-0 ${Z_VIEWER} flex flex-col bg-background`}
    >
      <div className="flex items-center justify-between gap-3 p-2">
        <span data-testid="gallery-viewer-count" className="px-2 text-sm text-muted-foreground">
          {`${at + 1} / ${total}`}
        </span>
        <button
          ref={closeRef}
          type="button"
          data-testid="gallery-viewer-close"
          className="inline-flex min-h-11 items-center rounded-md border border-input bg-background px-3 text-sm font-medium text-foreground hover:bg-accent"
          onClick={onClose}
        >
          {t("common.close")}
        </button>
      </div>
      <div
        className="relative flex min-h-0 flex-1 items-center justify-center overflow-hidden"
        style={{ touchAction: "pan-y pinch-zoom" }}
        {...swipe.handlers}
      >
        <img
          data-testid="gallery-viewer-image"
          src={photo.large ?? photo.main}
          alt={fill(t("post.preview.photoCount"), { index: at + 1, total })}
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
        <Thumbs
          photos={photos}
          at={at}
          onPick={onGo}
          testid="gallery-viewer-thumbs"
          className="flex justify-center gap-2 overflow-x-auto p-2"
        />
      ) : null}
    </div>,
    document.body,
  );
}
