import { useCallback, useEffect, useRef, useState } from "react";

import { useI18n } from "@/i18n";
import type { MessageKey } from "@/i18n";

import { controlClass, Field } from "./field";
import { encodeVariants } from "./photo-encode";
import { deletePhoto, setCoverPhoto, uploadPhoto, type DraftPhotoRow } from "./posting-service";
import { fill, photoRefusalKey } from "./refusal-text";
import type { PhotoItem, Refusal } from "./types";

/**
 * U6-C1a — STEP 2: PHOTOS, PREPARED ON THE DEVICE AND SENT ONE AT A TIME.
 *
 * Three decisions carry this screen, all of them about the seller's data bill
 * and the seller's patience:
 *
 *  1 THE PHONE SHRINKS FIRST. `encodeVariants` turns a 6 MB camera photo into
 *    three small images before a single byte is sent (see photo-encode.ts).
 *  2 ONE AT A TIME, RESUMABLY. Ten photos are ten separate requests, sequential,
 *    each with its own progress and its own retry. A dropped connection at photo
 *    seven costs photo seven — not the other six, and not the draft.
 *  3 A REFUSED PHOTO IS A SENTENCE, NOT A CODE. The upload route's policy
 *    vocabulary (`nudity`, `contact_in_image`, `stock_watermark`, …) is mapped to
 *    translated words in ONE place, and the tile stays so the seller can replace
 *    exactly the photo that was refused.
 *
 * The client never writes a table: `/api/upload/photo` stores and registers, and
 * the grid below is re-read from the server after every accepted change.
 */

/**
 * D22 — WHEN THE PLAN HAS NOT ARRIVED YET the screen states no cap of its own:
 * the grid keeps working, the caption waits, and the upload door's own count
 * remains the authority (F3/F4). This is the "unknown" reading of the dial, never
 * a second dial.
 */
const NO_CAP = Number.POSITIVE_INFINITY;

const tileButtonClass =
  "min-h-11 grow rounded-md border border-input px-2 text-xs font-medium text-foreground " +
  "hover:bg-accent disabled:opacity-60";

const addButtonClass =
  "inline-flex min-h-11 w-full items-center justify-center rounded-md bg-primary px-4 text-sm " +
  "font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60";

function makeLocalId(): string {
  return `local-${Math.random().toString(36).slice(2)}-${Date.now().toString(36)}`;
}

/** A stored photo's card image, from the registered variant paths. */
function cardUrlOf(row: DraftPhotoRow): string | null {
  const paths = row.paths ?? {};
  const card = paths["card"] ?? paths["thumb"] ?? paths["cover"];
  return typeof card === "string" ? card : null;
}

export function StepPhotos({
  listingId,
  photos,
  onChanged,
  illustrationUrl,
  videoUrl,
  videoRefusal,
  onChangeVideo,
  maxPhotos,
}: {
  listingId: string | null;
  photos: DraftPhotoRow[];
  onChanged: () => void;
  illustrationUrl: string | null;
  /** U6-C1-R1 — the YouTube link lives beside the photos, not in step 4. */
  videoUrl: string;
  videoRefusal: Refusal | null;
  onChangeVideo: (value: string) => void;
  /** D22 — the plan's cap from the posting document; `null` = not read yet. */
  maxPhotos: number | null;
}) {
  const { t } = useI18n();
  /** The one dial, for this render: the plan's number, or no cap of our own. */
  const MAX_PHOTOS = maxPhotos ?? NO_CAP;
  const inputRef = useRef<HTMLInputElement>(null);
  /** Tiles for photos this session picked; server rows fill the rest. */
  const [items, setItems] = useState<PhotoItem[]>([]);
  const [busy, setBusy] = useState(false);
  const aliveRef = useRef(true);

  useEffect(() => {
    aliveRef.current = true;
    return () => {
      aliveRef.current = false;
    };
  }, []);

  const patchItem = useCallback((localId: string, patch: Partial<PhotoItem>) => {
    setItems((prev) =>
      prev.map((item) => (item.localId === localId ? { ...item, ...patch } : item)),
    );
  }, []);

  /**
   * One photo, end to end: encode on the device, then send and register.
   *
   * PP-10 — THE RETRY LAW. `attempt` counts this tile's sends. A REFUSAL is a
   * verdict and is final: it is shown once, with its reason, and never sent
   * again. A FAILURE TO REACH A VERDICT (offline, or the server's own 5xx) is
   * retried ONCE automatically; if the second send also fails the tile says
   * "couldn't send" and hands the retry to the seller (F4: nothing is silent).
   */
  const send = useCallback(
    async (localId: string, file: File, attempt = 0) => {
      if (listingId === null) return;
      patchItem(localId, {
        state: "preparing",
        percent: 0,
        refusalKey: null,
        attempts: attempt + 1,
      });

      let encoded;
      try {
        encoded = await encodeVariants(file);
      } catch {
        // The device could not decode it. Said plainly; the tile can be removed.
        patchItem(localId, { state: "failed", refusalKey: "post.photos.deviceFailed" });
        return;
      }
      if (!aliveRef.current) return;

      patchItem(localId, { state: "uploading", percent: 1 });
      const answer = await uploadPhoto(
        listingId,
        { cover: encoded.cover, card: encoded.card, thumb: encoded.thumb },
        encoded.extension,
        (percent) => {
          if (aliveRef.current) patchItem(localId, { percent });
        },
      );
      if (!aliveRef.current) return;

      if (answer.ok) {
        // The B1 route answers with `photoId` (camelCase, its own contract).
        const id = answer.payload["photoId"];
        patchItem(localId, {
          state: "stored",
          percent: 100,
          photoId: typeof id === "string" ? id : null,
          file: null,
        });
        onChanged();
        return;
      }

      if (answer.unreachable) {
        // No verdict was reached. One automatic second try, then the seller's.
        if (attempt === 0) {
          await send(localId, file, 1);
          return;
        }
        patchItem(localId, { state: "failed", refusalKey: "post.photos.couldNotSend" });
        return;
      }

      // A verdict. Final by definition — the tile stops here (PP-10).
      patchItem(localId, {
        state: "refused",
        refusalKey: photoRefusalKey(answer.refusals[0]?.reason ?? ""),
      });
    },
    [listingId, onChanged, patchItem],
  );

  /** Sequential, deliberately: parallel uploads on 2G starve each other. */
  const pick = useCallback(
    async (files: FileList | null) => {
      if (files === null || files.length === 0 || listingId === null) return;
      // A tile that will never become a photo does not hold a slot.
      const holding = items.filter(
        (item) => item.state !== "failed" && item.state !== "refused",
      ).length;
      const room = MAX_PHOTOS - (photos.length + holding);
      const chosen = Array.from(files).slice(0, Math.max(0, room));
      const queued: PhotoItem[] = chosen.map((file) => ({
        localId: makeLocalId(),
        photoId: null,
        previewUrl: URL.createObjectURL(file),
        state: "preparing",
        percent: 0,
        refusalKey: null,
        isCover: false,
        file,
        attempts: 0,
      }));
      setItems((prev) => [...prev, ...queued]);
      setBusy(true);
      for (const item of queued) {
        if (item.file) await send(item.localId, item.file);
      }
      if (aliveRef.current) setBusy(false);
    },
    [items, listingId, photos.length, send, MAX_PHOTOS],
  );

  const remove = useCallback(
    async (item: PhotoItem) => {
      if (item.photoId === null) {
        URL.revokeObjectURL(item.previewUrl);
        setItems((prev) => prev.filter((entry) => entry.localId !== item.localId));
        return;
      }
      const answer = await deletePhoto(item.photoId);
      if (!answer.ok) {
        patchItem(item.localId, { refusalKey: photoRefusalKey(answer.refusals[0]?.reason ?? "") });
        return;
      }
      URL.revokeObjectURL(item.previewUrl);
      setItems((prev) => prev.filter((entry) => entry.localId !== item.localId));
      onChanged();
    },
    [onChanged, patchItem],
  );

  const makeCover = useCallback(
    async (photoId: string, localId: string) => {
      const answer = await setCoverPhoto(photoId);
      if (!answer.ok) {
        patchItem(localId, { refusalKey: photoRefusalKey(answer.refusals[0]?.reason ?? "") });
        return;
      }
      onChanged();
    },
    [onChanged, patchItem],
  );

  const stored = items.filter((item) => item.state === "stored").length;
  const total = Math.max(photos.length, stored);
  /** The cover is the first registered photo — the server's own order. */
  const coverId = photos[0]?.id ?? null;

  return (
    <div className="space-y-4">
      <p className="text-sm text-muted-foreground">{t("post.photos.why")}</p>

      {/* D22 — the count SAYS the plan's cap, so it waits for the plan rather than
          stating a number nobody granted (F4). */}
      {maxPhotos !== null && (
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs text-muted-foreground" data-testid="post-photos-count">
            {fill(t("post.photos.count"), { count: total, max: maxPhotos })}
          </p>
        </div>
      )}

      {items.length === 0 && photos.length === 0 && (
        <div className="space-y-2" data-testid="post-photos-empty">
          {illustrationUrl !== null && (
            /* U6-C1-R3a-2 — THE STAND-IN FITS ITS BOX: a fixed 4:3 frame, the
               picture contained and centred inside it, never stretched or
               cropped, and never taller than 240 px. */
            <div
              className="mx-auto flex aspect-[4/3] w-full max-w-80 items-center justify-center overflow-hidden rounded-md"
              data-testid="post-photos-illustration-box"
            >
              <img
                src={illustrationUrl}
                data-testid="post-photos-illustration"
                alt={t("post.category.illustrationAlt")}
                width={320}
                height={240}
                loading="lazy"
                className="h-full w-full object-contain opacity-60"
              />
            </div>
          )}

          <p className="text-sm text-muted-foreground">{t("post.photos.none")}</p>
          <p className="text-xs text-muted-foreground" data-testid="post-photos-standin">
            {t("post.photos.standIn")}
          </p>
        </div>
      )}

      <ul className="grid grid-cols-2 gap-3" data-testid="post-photos-grid">
        {items.map((item) => (
          <li
            key={item.localId}
            data-testid="post-photo-tile"
            data-state={item.state}
            className="space-y-2 rounded-md border border-border p-2"
          >
            <img
              src={item.previewUrl}
              alt=""
              width={160}
              height={120}
              className="h-24 w-full rounded-sm object-cover"
            />
            <p className="text-xs text-muted-foreground" data-testid="post-photo-state">
              {item.state === "preparing" && t("post.photos.preparing")}
              {item.state === "uploading" &&
                fill(t("post.photos.uploading"), { percent: item.percent })}
              {item.state === "stored" && t("post.photos.done")}
              {(item.state === "failed" || item.state === "refused") &&
                item.refusalKey !== null &&
                t(item.refusalKey)}
            </p>
            {/* PP-10 — a refusal says so once, and says it is final. */}
            {item.state === "refused" && (
              <p className="text-xs text-destructive" data-testid="post-photo-refused">
                {t("post.photos.refusedFinal")}
              </p>
            )}
            {item.photoId !== null && item.photoId === coverId && (
              <p className="text-xs font-medium text-foreground" data-testid="post-photo-cover">
                {t("post.photos.cover")}
              </p>
            )}
            <div className="flex gap-2">
              {/* Only a failure to REACH a verdict is retryable (PP-10). */}
              {item.state === "failed" && item.file !== null && (
                <button
                  type="button"
                  data-testid="post-photo-retry"
                  className={tileButtonClass}
                  onClick={() => {
                    if (item.file) void send(item.localId, item.file, 1);
                  }}
                >
                  {t("post.photos.retry")}
                </button>
              )}

              {item.photoId !== null && item.photoId !== coverId && (
                <button
                  type="button"
                  data-testid="post-photo-makecover"
                  className={tileButtonClass}
                  onClick={() => void makeCover(item.photoId as string, item.localId)}
                >
                  {t("post.photos.makeCover")}
                </button>
              )}
              <button
                type="button"
                data-testid="post-photo-remove"
                className={tileButtonClass}
                onClick={() => void remove(item)}
              >
                {t("post.photos.remove")}
              </button>
            </div>
          </li>
        ))}
        {/* Photos stored in an earlier session: server truth, no local preview. */}
        {photos
          .filter((row) => !items.some((item) => item.photoId === row.id))
          .map((row) => {
            const url = cardUrlOf(row);
            return (
              <li
                key={row.id}
                data-testid="post-photo-stored"
                className="space-y-2 rounded-md border border-border p-2"
              >
                {url !== null ? (
                  <img
                    src={url}
                    alt=""
                    width={160}
                    height={120}
                    loading="lazy"
                    className="h-24 w-full rounded-sm object-cover"
                  />
                ) : (
                  <p className="text-xs text-muted-foreground">{t("post.photos.done")}</p>
                )}
                {row.id === coverId && (
                  <p className="text-xs font-medium text-foreground">{t("post.photos.cover")}</p>
                )}
              </li>
            );
          })}
      </ul>

      <div className="space-y-1">
        <input
          ref={inputRef}
          type="file"
          // `capture` is deliberately absent: the phone then offers BOTH the
          // camera and the gallery, which is what a seller with existing photos
          // needs. Multiple, because a listing is rarely one photo.
          accept="image/jpeg,image/png,image/webp"
          multiple
          data-testid="post-photos-input"
          className="sr-only"
          onChange={(event) => {
            void pick(event.target.files);
            event.target.value = "";
          }}
        />
        <button
          type="button"
          data-testid="post-photos-add"
          className={addButtonClass}
          disabled={busy || listingId === null || total >= MAX_PHOTOS}
          onClick={() => inputRef.current?.click()}
        >
          {t("post.photos.add")}
        </button>
        {/* U6-C1-R2 — ONE helper line, and no second button: `validate_listing_draft`
            step 2 asks for nothing, so plain `Next` already moves a seller on with
            no photos and the category illustration stands in for them. */}
        <p className="text-xs text-muted-foreground" data-testid="post-photos-helper">
          {fill(t("post.photos.helper"), { max: MAX_PHOTOS })}
        </p>
      </div>

      <Field
        id="post-video"
        label={t("post.details.videoLabel")}
        required={false}
        refusal={videoRefusal}
        hint={<p className="text-xs text-muted-foreground">{t("post.details.videoHint")}</p>}
      >
        <input
          id="post-video"
          data-testid="post-video"
          inputMode="url"
          className={controlClass(videoRefusal !== null)}
          value={videoUrl}
          placeholder={t("post.details.videoPlaceholder")}
          onChange={(event) => onChangeVideo(event.target.value)}
        />
      </Field>
    </div>
  );
}

export default StepPhotos;
