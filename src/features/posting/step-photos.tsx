import { useCallback, useEffect, useRef, useState } from "react";

import { useI18n } from "@/i18n";
import type { MessageKey } from "@/i18n";

import { encodeVariants } from "./photo-encode";
import { deletePhoto, setCoverPhoto, uploadPhoto, type DraftPhotoRow } from "./posting-service";
import { fill, photoRefusalKey } from "./refusal-text";
import type { PhotoItem } from "./types";

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

const MAX_PHOTOS = 10;

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
}: {
  listingId: string | null;
  photos: DraftPhotoRow[];
  onChanged: () => void;
  illustrationUrl: string | null;
}) {
  const { t } = useI18n();
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

  /** One photo, end to end: encode on the device, then send and register. */
  const send = useCallback(
    async (localId: string, file: File) => {
      if (listingId === null) return;
      patchItem(localId, { state: "preparing", percent: 0, refusalKey: null });

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
        const id = answer.payload["photo_id"];
        patchItem(localId, {
          state: "stored",
          percent: 100,
          photoId: typeof id === "string" ? id : null,
          file: null,
        });
        onChanged();
        return;
      }

      const reason = answer.refusals[0]?.reason ?? "";
      patchItem(localId, {
        state: "failed",
        // Unreachable is not a verdict: the tile offers "send again", it does not
        // accuse the photo of anything (F4).
        refusalKey: answer.unreachable
          ? ("post.save.unsaved" satisfies MessageKey)
          : photoRefusalKey(reason),
      });
    },
    [listingId, onChanged, patchItem],
  );

  /** Sequential, deliberately: parallel uploads on 2G starve each other. */
  const pick = useCallback(
    async (files: FileList | null) => {
      if (files === null || files.length === 0 || listingId === null) return;
      const room = MAX_PHOTOS - (photos.length + items.filter((i) => i.state !== "failed").length);
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
      }));
      setItems((prev) => [...prev, ...queued]);
      setBusy(true);
      for (const item of queued) {
        if (item.file) await send(item.localId, item.file);
      }
      if (aliveRef.current) setBusy(false);
    },
    [items, listingId, photos.length, send],
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

      <div className="flex items-center justify-between gap-2">
        <p className="text-xs text-muted-foreground" data-testid="post-photos-count">
          {fill(t("post.photos.count"), { count: total, max: MAX_PHOTOS })}
        </p>
      </div>

      {items.length === 0 && photos.length === 0 && (
        <div className="space-y-2" data-testid="post-photos-empty">
          {illustrationUrl !== null && (
            <img
              src={illustrationUrl}
              alt={t("post.category.illustrationAlt")}
              width={320}
              height={240}
              loading="lazy"
              className="h-32 w-full rounded-md object-cover opacity-60"
            />
          )}
          <p className="text-sm text-muted-foreground">{t("post.photos.none")}</p>
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
              {item.state === "failed" && item.refusalKey !== null && t(item.refusalKey)}
            </p>
            {item.photoId !== null && item.photoId === coverId && (
              <p className="text-xs font-medium text-foreground" data-testid="post-photo-cover">
                {t("post.photos.cover")}
              </p>
            )}
            <div className="flex gap-2">
              {item.state === "failed" && item.file !== null && (
                <button
                  type="button"
                  data-testid="post-photo-retry"
                  className={tileButtonClass}
                  onClick={() => {
                    if (item.file) void send(item.localId, item.file);
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
        <p className="text-xs text-muted-foreground">
          {fill(t("post.photos.addHint"), { max: MAX_PHOTOS })}
        </p>
      </div>
    </div>
  );
}

export default StepPhotos;
