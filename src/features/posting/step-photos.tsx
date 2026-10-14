import { ListingPicture } from "@/components/marketplace/listing-picture";
import { ChevronLeft, ChevronRight, Crop } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

import { useI18n } from "@/i18n";
import type { MessageKey } from "@/i18n";

import { controlClass, Field } from "./field";
import { encodeBitmap, encodeVariants } from "./photo-encode";
import { PhotoEditor } from "./photo-editor";
import { PhotoEditor } from "./photo-editor";
import { CARD_THEN_THUMB, photoUrl } from "./photo-links";
import {
  deletePhoto,
  movePhoto,
  setCoverPhoto,
  uploadPhoto,
  type DraftPhotoRow,
} from "./posting-service";
import { fill, photoRefusalKey } from "./refusal-text";
import type { PhotoItem, Refusal } from "./types";
import { usePhotoLinks } from "./use-photo-links";

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
/** Bundle 11 C2 — Remove deletes the photo at once: a destructive act, red. */
const tileDangerClass =
  "min-h-11 grow rounded-md border border-destructive/50 px-2 text-xs font-medium text-destructive " +
  "hover:bg-destructive/10 disabled:opacity-60";

const addButtonClass =
  "inline-flex min-h-11 w-full items-center justify-center rounded-md bg-primary px-4 text-sm " +
  "font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60";

/** D154 — the drag of a stored photo to another place carries its id under this type. */
const PHOTO_DRAG = "application/x-ethio-photo";

const moveButtonClass =
  "inline-flex min-h-11 grow items-center justify-center rounded-md border border-input text-foreground " +
  "hover:bg-accent disabled:opacity-40";

function makeLocalId(): string {
  return `local-${Math.random().toString(36).slice(2)}-${Date.now().toString(36)}`;
}

export function StepPhotos({
  listingId,
  photos,
  onChanged,
  illustrationUrl,
  photosSoon = false,
  onPhotosSoon,
  videoUrl,
  videoRefusal,
  onChangeVideo,
  maxPhotos,
  onHeldChange,
  onSendingChange,
}: {
  listingId: string | null;
  photos: DraftPhotoRow[];
  onChanged: () => void;
  illustrationUrl: string | null;
  /** Bundle 4 step 15 — "Photos coming soon" as the door holds it. */
  photosSoon?: boolean;
  /** Ticks or unticks it through the door; resolves false on a refusal. */
  onPhotosSoon?: (on: boolean) => Promise<boolean>;
  /** U6-C1-R1 — the YouTube link lives beside the photos, not in step 4. */
  videoUrl: string;
  videoRefusal: Refusal | null;
  onChangeVideo: (value: string) => void;
  /** D22 — the plan's cap from the posting document; `null` = not read yet. */
  maxPhotos: number | null;
  /**
   * INC-585 — how many tiles hold a photo that was not added (refused, or not
   * sent): the wizard closes Next while any is on the step. 0 on leaving it.
   */
  onHeldChange?: (count: number) => void;
  /**
   * INC-605 — how many photos are still being prepared or sent: the wizard
   * holds Next and Back while any is on its way, as Add photos is held. 0 on
   * leaving the step.
   */
  onSendingChange?: (count: number) => void;
}) {
  const { t } = useI18n();
  /** The one dial, for this render: the plan's number, or no cap of our own. */
  const MAX_PHOTOS = maxPhotos ?? NO_CAP;
  const inputRef = useRef<HTMLInputElement>(null);
  /** INC-588 / D151 — the stored photos' links, which expire. */
  const storedLinks = usePhotoLinks(photos);
  /** Tiles for photos this session picked; server rows fill the rest. */
  const [items, setItems] = useState<PhotoItem[]>([]);
  const [busy, setBusy] = useState(false);
  /** D154 — files dragged over the step on a computer: the drop area is outlined. */
  const [dragging, setDragging] = useState(false);
  const [soonBusy, setSoonBusy] = useState(false);
  const [soonFailed, setSoonFailed] = useState(false);
  const aliveRef = useRef(true);
  /**
   * INC-596 — PHOTOS THE SELLER REMOVED BEFORE THEY WERE STORED. Remove on a tile
   * that has no photo id yet (preparing, uploading or waiting its turn) puts its
   * local id here. A waiting photo is then never sent; a photo already on its
   * way is deleted on the server the moment its id comes back — even if the
   * step has closed meanwhile — so it never returns.
   */
  const removedRef = useRef(new Set<string>());
  /** INC-595 — a stored photo's Remove or Make cover in flight, by photo id. */
  const [rowBusy, setRowBusy] = useState<ReadonlySet<string>>(new Set());
  /** INC-595 — a stored photo's last refusal (its Remove or Make cover), by photo id. */
  /** D154 B2 — the stored photo open in the editor, and its stored cover's link. */
  const [editing, setEditing] = useState<{ photoId: string; url: string } | null>(null);
  /** D154 B2 — an edited photo on its way: Next and Back wait for it, as for a new one. */
  const [editSaving, setEditSaving] = useState(false);
  const [rowRefusal, setRowRefusal] = useState<Readonly<Record<string, MessageKey>>>({});
  /** D154 B2 — the stored photo open in the editor, and its stored cover's link. */
  const [editing, setEditing] = useState<{ photoId: string; url: string } | null>(null);
  /** D154 B2 — an edited photo on its way: Next and Back wait for it, as for a new one. */
  const [editSaving, setEditSaving] = useState(false);

  useEffect(() => {
    aliveRef.current = true;
    return () => {
      aliveRef.current = false;
    };
  }, []);

  // INC-585 — a refused or unsent photo is on the step until the seller
  // removes it (or sends it again); the wizard holds Next meanwhile.
  const sending =
    items.filter((item) => item.state === "preparing" || item.state === "uploading").length +
    (editSaving ? 1 : 0);
  }, [held, onHeldChange]);
  useEffect(() => () => onHeldChange?.(0), [onHeldChange]);
  const sending =
    items.filter((item) => item.state === "preparing" || item.state === "uploading").length +
    (editSaving ? 1 : 0);
  useEffect(() => {
    onSendingChange?.(sending);
  }, [sending, onSendingChange]);
  useEffect(() => () => onSendingChange?.(0), [onSendingChange]);

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
      // INC-596 — a photo removed while it waited its turn is never sent.
      if (removedRef.current.has(localId)) return;
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
      // INC-596 — removed while the device prepared it: nothing is sent.
      if (removedRef.current.has(localId)) return;
      if (!aliveRef.current) return;

      patchItem(localId, { state: "uploading", percent: 1 });
      const answer = await uploadPhoto(
        listingId,
        { cover: encoded.cover, mid: encoded.mid, card: encoded.card, thumb: encoded.thumb },
        encoded.extension,
        (percent) => {
          if (aliveRef.current) patchItem(localId, { percent });
        },
      );
      // INC-596 — removed while it was on its way: a photo the server stored is
      // deleted now, whether or not the step is still open. A failed delete is
      // not hidden: the step re-reads the server, and the photo shows again with
      // its own Remove (F4).
      if (removedRef.current.has(localId)) {
        const id = answer.ok ? answer.payload["photoId"] : null;
        if (typeof id === "string") {
          const gone = await deletePhoto(id);
          if (!gone.ok && aliveRef.current) onChanged();
        }
        return;
      }
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
        // INC-596 — not stored yet: the tile goes now, and the photo is stopped
        // or deleted when its send reaches the next point (see `send`).
        removedRef.current.add(item.localId);
        URL.revokeObjectURL(item.previewUrl);
        setItems((prev) => prev.filter((entry) => entry.localId !== item.localId));
        // A tile stored without an id (an answer that named none) has no send
        // left to delete it: the step re-reads the server, and the stored photo
        // shows with its own Remove.
        if (item.state === "stored") onChanged();
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

  /** INC-595 — a stored photo from an earlier visit is removed through the same door. */
  const removeStored = useCallback(
    async (photoId: string) => {
      setRowBusy((prev) => new Set(prev).add(photoId));
      const answer = await deletePhoto(photoId);
      if (!aliveRef.current) return;
      setRowBusy((prev) => {
        const next = new Set(prev);
        next.delete(photoId);
        return next;
      });
      if (!answer.ok) {
        const key = photoRefusalKey(answer.refusals[0]?.reason ?? "");
        setRowRefusal((prev) => ({ ...prev, [photoId]: key }));
        return;
      }
      setRowRefusal((prev) => {
        const next = { ...prev };
        delete next[photoId];
        return next;
      });
      onChanged();
    },
    [onChanged],
  );

  /** INC-595 — a stored photo from an earlier visit is made the cover through the same door. */
  const coverStored = useCallback(
    async (photoId: string) => {
      setRowBusy((prev) => new Set(prev).add(photoId));
      const answer = await setCoverPhoto(photoId);
      if (!aliveRef.current) return;
      setRowBusy((prev) => {
        const next = new Set(prev);
        next.delete(photoId);
        return next;
      });
      if (!answer.ok) {
        const key = photoRefusalKey(answer.refusals[0]?.reason ?? "");
        setRowRefusal((prev) => ({ ...prev, [photoId]: key }));
        return;
      }
      onChanged();
    },
    [onChanged],
  );

  /**
   * D154 — Move earlier, Move later and a drag on a computer: one door
   * (`move_listing_photo`), which puts the photo at the place and closes the
   * others up; the first place is the cover.
   */
  const moveStored = useCallback(
    async (photoId: string, position: number) => {
      setRowBusy((prev) => new Set(prev).add(photoId));
      const answer = await movePhoto(photoId, position);
      if (!aliveRef.current) return;
      setRowBusy((prev) => {
        const next = new Set(prev);
        next.delete(photoId);
        return next;
      });
      if (!answer.ok) {
        const key = photoRefusalKey(answer.refusals[0]?.reason ?? "");
        setRowRefusal((prev) => ({ ...prev, [photoId]: key }));
        return;
      }
      setRowRefusal((prev) => {
        const next = { ...prev };
        delete next[photoId];
        return next;
      });
  /**
   * D154 B2 — SAVE IN THE EDITOR: the turned and cropped picture goes the whole
   * way as a new photo (the four sizes on the device, the strip, the AI screen)
   * and takes the old photo's place (`replaces`). Resolves null when stored —
   * the editor closes and the step re-reads the server — or the words of the
   * refusal, which the editor shows while the old photo stays as it was.
   */
  const saveEdit = useCallback(
    async (photoId: string, picture: ImageBitmap): Promise<MessageKey | null> => {
      if (listingId === null) {
        picture.close();
        return "post.photos.couldNotSend";
      }
      setEditSaving(true);
      setRowBusy((prev) => new Set(prev).add(photoId));
      try {
        let encoded;
        try {
          encoded = await encodeBitmap(picture);
        } catch {
          return "post.photos.deviceFailed";
        }
        const answer = await uploadPhoto(
          listingId,
          { cover: encoded.cover, mid: encoded.mid, card: encoded.card, thumb: encoded.thumb },
          encoded.extension,
          undefined,
          photoId,
        );
        if (answer.ok) {
          // The old photo's tile from this visit leaves with it.
          setItems((prev) => {
            for (const item of prev) {
              if (item.photoId === photoId) URL.revokeObjectURL(item.previewUrl);
            }
            return prev.filter((item) => item.photoId !== photoId);
          });
          setRowRefusal((prev) => {
            const next = { ...prev };
            delete next[photoId];
            return next;
          });
          setEditing(null);
          onChanged();
          return null;
        }
        if (answer.unreachable) return "post.photos.couldNotSend";
        return photoRefusalKey(answer.refusals[0]?.reason ?? "");
      } finally {
        if (aliveRef.current) {
          setEditSaving(false);
          setRowBusy((prev) => {
            const next = new Set(prev);
            next.delete(photoId);
            return next;
          });
        }
      }
    },
    [listingId, onChanged],
  );

      onChanged();
    },
    [onChanged],
  );

  /**
   * D154 B2 — SAVE IN THE EDITOR: the turned and cropped picture goes the whole
   * way as a new photo (the four sizes on the device, the strip, the AI screen)
   * and takes the old photo's place (`replaces`). Resolves null when stored —
   * the editor closes and the step re-reads the server — or the words of the
   * refusal, which the editor shows while the old photo stays as it was.
   */
  const saveEdit = useCallback(
    async (photoId: string, picture: ImageBitmap): Promise<MessageKey | null> => {
      if (listingId === null) {
        picture.close();
        return "post.photos.couldNotSend";
      }
      setEditSaving(true);
      setRowBusy((prev) => new Set(prev).add(photoId));
      try {
        let encoded;
        try {
          encoded = await encodeBitmap(picture);
        } catch {
          return "post.photos.deviceFailed";
        }
        const answer = await uploadPhoto(
          listingId,
          { cover: encoded.cover, mid: encoded.mid, card: encoded.card, thumb: encoded.thumb },
          encoded.extension,
          undefined,
          photoId,
        );
        if (answer.ok) {
          // The old photo's tile from this visit leaves with it.
          setItems((prev) => {
            for (const item of prev) {
              if (item.photoId === photoId) URL.revokeObjectURL(item.previewUrl);
            }
            return prev.filter((item) => item.photoId !== photoId);
          });
          setRowRefusal((prev) => {
            const next = { ...prev };
            delete next[photoId];
            return next;
          });
          setEditing(null);
          onChanged();
          return null;
        }
        if (answer.unreachable) return "post.photos.couldNotSend";
        return photoRefusalKey(answer.refusals[0]?.reason ?? "");
      } finally {
        if (aliveRef.current) {
          setEditSaving(false);
          setRowBusy((prev) => {
            const next = new Set(prev);
            next.delete(photoId);
            return next;
          });
        }
      }
    },
    [listingId, onChanged],
  );
  const stored = items.filter((item) => item.state === "stored").length;
  const total = Math.max(photos.length, stored);
  /** The cover is the first registered photo — the server's own order. */
  const coverId = photos[0]?.id ?? null;
  const placed = photos.map((row, index) => ({
    row,
    index,
    item: items.find((entry) => entry.photoId === row.id) ?? null,
  }));
  const pending = items.filter(
    (entry) => entry.photoId === null || !photos.some((row) => row.id === entry.photoId),
  );
  /** D154 — a drag to another place only where a fine pointer can drag (a computer). */
  const canDrag =
    typeof window !== "undefined" &&
    typeof window.matchMedia === "function" &&
    window.matchMedia("(pointer: fine)").matches;

  /** D154 — the drag handlers of a photo at its place in the order. */
  function placeProps(photoId: string, index: number) {
    return {
      "data-place": index,
      draggable: canDrag && !rowBusy.has(photoId),
      onDragStart: (event: React.DragEvent<HTMLLIElement>) => {
        event.dataTransfer.setData(PHOTO_DRAG, photoId);
        event.dataTransfer.effectAllowed = "move";
      },
      onDragOver: (event: React.DragEvent<HTMLLIElement>) => {
        if (!Array.from(event.dataTransfer.types).includes(PHOTO_DRAG)) return;
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
      },
      onDrop: (event: React.DragEvent<HTMLLIElement>) => {
        const dragged = event.dataTransfer.getData(PHOTO_DRAG);
        if (!dragged) return;
        event.preventDefault();
        event.stopPropagation();
        if (dragged !== photoId) void moveStored(dragged, index);
      },
    };
  }

  /**
   * D160 (the operator, 2026-10-13: "make the cover box more prominent and have
   * a red ribbon saying cover photo") — the cover's tile is outlined in the
   * ribbon's colour, and a ribbon reading "Cover photo" sits on its picture.
   * D163 (his walk the same evening: "RED GENERALLY SIGNALS DANGER, CAN WE MAKE
   * IT THE GOLD COLOR … BUT REMOVE REMAINS RED") — the ribbon and the outline
   * are the system's gold; red stays for Remove, the one destructive act.
   */
  function tileClass(isCover: boolean): string {
    return isCover
      ? "space-y-2 rounded-md border-2 border-gold p-2"
      : "space-y-2 rounded-md border border-border p-2";
  }

  function coverRibbon(): ReactNode {
    return (
      <span
        data-testid="post-photo-cover"
        className="absolute start-0 top-2 rounded-e-md bg-gold px-2 py-0.5 text-xs font-semibold text-gold-foreground shadow-sm"
      >
        {t("post.photos.coverRibbon")}
      </span>
    );
  }

  /**
   * A photo added in this visit: its local preview, its state, and its buttons.
   * `index` is its place once the server has it in the order, else null.
   */
  function sessionTile(item: PhotoItem, index: number | null): ReactNode {
    const atPlace = index !== null && item.photoId !== null;
    return (
      <li
        key={item.localId}
        data-testid="post-photo-tile"
        data-photo-id={item.photoId ?? ""}
        data-state={item.state}
        className={tileClass(item.photoId !== null && item.photoId === coverId)}
        {...(atPlace ? placeProps(item.photoId as string, index) : {})}
      >
        <div className="relative">
          <img
            src={item.previewUrl}
            alt=""
            width={160}
            height={120}
            className="h-24 w-full rounded-sm object-cover"
          />
          {item.photoId !== null && item.photoId === coverId && coverRibbon()}
        </div>
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
        {item.photoId !== null && rowRefusal[item.photoId] !== undefined && (
          <p className="text-xs text-destructive" role="alert" data-testid="post-photo-row-refusal">
            {t(rowRefusal[item.photoId]!)}
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
            className={tileDangerClass}
            onClick={() => void remove(item)}
          >
  /**
   * D154 — Move earlier and Move later, on every photo at its place; D154 B2 —
   * and Edit, which opens the editor on the photo's stored cover.
   */
          </button>
        </div>
    const editUrl = photoUrl({ id: photoId }, ["cover"], storedLinks);
        {atPlace && moveRow(item.photoId as string, index)}
      </li>
    );
  }

  /** INC-595 — a photo stored in an earlier visit: server truth, the same buttons. */
  function storedTile(row: DraftPhotoRow, index: number): ReactNode {
    const url = photoUrl(row, CARD_THEN_THUMB, storedLinks);
    return (
      <li
        key={row.id}
        data-testid="post-photo-stored"
        data-photo-id={row.id}
        className={tileClass(row.id === coverId)}
        {...placeProps(row.id, index)}
      >
        <div className="relative">
          {url !== null ? (
            <img
              src={url}
              alt=""
              width={160}
              height={120}
        </button>
        <button
          type="button"
          data-testid="post-photo-edit"
          className={moveButtonClass}
          aria-label={t("post.photos.edit")}
          title={t("post.photos.edit")}
          disabled={busyRow || editUrl === null || editSaving}
          onClick={() => {
            if (editUrl !== null) setEditing({ photoId, url: editUrl });
          }}
        >
          <Crop className="h-4 w-4" aria-hidden="true" />
              loading="lazy"
              className="h-24 w-full rounded-sm object-cover"
            />
          ) : (
            <p className="h-24 text-xs text-muted-foreground">{t("post.photos.done")}</p>
          )}
          {row.id === coverId && coverRibbon()}
        </div>
        {rowRefusal[row.id] !== undefined && (
          <p className="text-xs text-destructive" role="alert" data-testid="post-photo-state">
            {t(rowRefusal[row.id]!)}
          </p>
        )}
        <div className="flex gap-2">
          {row.id !== coverId && (
            <button
              type="button"
              data-testid="post-photo-makecover"
              className={tileButtonClass}
              disabled={rowBusy.has(row.id)}
              onClick={() => void coverStored(row.id)}
            >
              {t("post.photos.makeCover")}
            </button>
          )}
          <button
            type="button"
            data-testid="post-photo-remove"
            className={tileDangerClass}
            disabled={rowBusy.has(row.id)}
            onClick={() => void removeStored(row.id)}
          >
            {t("post.photos.remove")}
          </button>
        </div>
        {moveRow(row.id, index)}
      </li>
    );
  }

  /**
   * D154 — Move earlier and Move later, on every photo at its place; D154 B2 —
   * and Edit, which opens the editor on the photo's stored cover.
   */
  function moveRow(photoId: string, index: number): ReactNode {
    const busyRow = rowBusy.has(photoId);
    const editUrl = photoUrl({ id: photoId }, ["cover"], storedLinks);
    return (
      <div className="flex gap-2">
        <button
          type="button"
          data-testid="post-photo-earlier"
          className={moveButtonClass}
          aria-label={t("post.photos.moveUp")}
          title={t("post.photos.moveUp")}
          disabled={busyRow || index === 0}
          onClick={() => void moveStored(photoId, index - 1)}
        >
          <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        </button>
        <button
          type="button"
          data-testid="post-photo-later"
          className={moveButtonClass}
          aria-label={t("post.photos.moveDown")}
          title={t("post.photos.moveDown")}
          disabled={busyRow || index === photos.length - 1}
          onClick={() => void moveStored(photoId, index + 1)}
        >
          <ChevronRight className="h-4 w-4" aria-hidden="true" />
        </button>
        <button
          type="button"
          data-testid="post-photo-edit"
          className={moveButtonClass}
          aria-label={t("post.photos.edit")}
          title={t("post.photos.edit")}
          disabled={busyRow || editUrl === null || editSaving}
          onClick={() => {
            if (editUrl !== null) setEditing({ photoId, url: editUrl });
          }}
        >
          <Crop className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    );
  }

  return (
    <div
      data-testid="post-photos-drop"
      data-dragging={dragging ? "1" : "0"}
      className={
        dragging ? "space-y-4 rounded-md outline-dashed outline-2 outline-primary" : "space-y-4"
      }
      // D154 — on a computer, photos can be dropped anywhere on the step. They take
      // the same way as the picker's: the same queue, the same cap, the same screen.
      onDragOver={(event) => {
        if (!Array.from(event.dataTransfer.types).includes("Files")) return;
        event.preventDefault();
        if (!dragging) setDragging(true);
      }}
      onDragLeave={(event) => {
        const next = event.relatedTarget;
        if (next instanceof Node && event.currentTarget.contains(next)) return;
        setDragging(false);
      }}
      onDrop={(event) => {
        if (!Array.from(event.dataTransfer.types).includes("Files")) return;
        event.preventDefault();
        setDragging(false);
        if (busy || total >= MAX_PHOTOS) return;
        void pick(event.dataTransfer.files);
      }}
    >
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
          {/* U6-C1-R3a-2 — THE STAND-IN FITS ITS BOX: a fixed 4:3 frame, the
              picture contained and centred inside it, never stretched or cropped. */}
          <ListingPicture
            photoUrl={null}
            categoryUrl={illustrationUrl}
            photosSoon={photosSoon}
            boxTestId="post-photos-illustration-box"
            imgTestId="post-photos-illustration"
            dimCategory
          />

          <p className="text-sm text-muted-foreground">{t("post.photos.none")}</p>
          <p className="text-xs text-muted-foreground" data-testid="post-photos-standin">
            {t("post.photos.standIn")}
          </p>
          {onPhotosSoon !== undefined && listingId !== null && (
            <label className="flex min-h-11 cursor-pointer items-center gap-3 text-sm text-foreground">
              <input
                type="checkbox"
                data-testid="post-photos-soon"
                className="h-5 w-5 shrink-0 accent-primary"
      <PhotoEditor
        sourceUrl={editing?.url ?? null}
        onCancel={() => setEditing(null)}
        onSave={(picture) => {
          if (editing === null) {
            picture.close();
            return Promise.resolve(null);
          }
          return saveEdit(editing.photoId, picture);
        }}
      />

                checked={photosSoon}
                disabled={soonBusy}
                onChange={(event) => {
                  const on = event.target.checked;
                  setSoonBusy(true);
                  setSoonFailed(false);
                  void onPhotosSoon(on).then((ok) => {
                    if (!aliveRef.current) return;
                    setSoonBusy(false);
                    setSoonFailed(!ok);
                  });
                }}
              />
              <span>{t("post.photos.soonTick")}</span>
            </label>
          )}
          {soonFailed && (
            <p
              className="text-xs text-destructive"
              role="alert"
              data-testid="post-photos-soon-failed"
            >
              {t("post.photos.soonFailed")}
            </p>
          )}
        </div>
      )}

      <ul className="grid grid-cols-2 gap-3" data-testid="post-photos-grid">
        {/* D154 — THE GRID IS THE SERVER'S ORDER: each stored photo at its place, by
            its own tile when it was added in this visit (its local preview), else
            by its stored tile; the photos not stored yet follow, as picked. */}
        {placed.map(({ row, index, item }) =>
          item !== null ? sessionTile(item, index) : storedTile(row, index),
        )}
        {pending.map((item) => sessionTile(item, null))}
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
        {/* D148 — everything on a business card is allowed, so the step says
            plainly that what a photo shows is public. */}
        <p className="text-xs text-muted-foreground" data-testid="post-photos-public">
          {t("post.photos.public")}
        </p>
        {/* D158 (bundle 13 turn 6) — photo screening is off: the photos were saved
            and staff check them, with the ad, before any buyer sees them. */}
        {photos.some((row) => row.unscreened === true) ? (
          <p className="text-xs text-muted-foreground" data-testid="post-photos-held-note">
            {t("post.photos.heldNote")}
          </p>
        ) : null}
      </div>

      <PhotoEditor
        sourceUrl={editing?.url ?? null}
        onCancel={() => setEditing(null)}
        onSave={(picture) => {
          if (editing === null) {
            picture.close();
            return Promise.resolve(null);
          }
          return saveEdit(editing.photoId, picture);
        }}
      />
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
