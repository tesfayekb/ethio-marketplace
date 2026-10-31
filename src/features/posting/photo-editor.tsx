import { RotateCcw, RotateCw } from "lucide-react";
import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useI18n } from "@/i18n";
import type { MessageKey } from "@/i18n";

import {
  boxPixels,
  FULL,
  isFull,
  keyBox,
  moveBox,
  resizeBox,
  turn,
  turnedSize,
  type Box,
  type Corner,
  type Turns,
} from "./photo-edit";

/**
 * D154 B2 — TURN AND CROP A PHOTO, ON THE DEVICE.
 *
 * The editor opens on the photo's own stored cover (its signed link) and holds
 * two things: quarter turns and a crop box (photo-edit.ts). Save draws the
 * turned and cropped picture on a canvas and hands it to the step, which sends
 * it through the whole pipeline as a new photo — the four sizes made on the
 * device, the strip, the AI screen — in the old photo's place
 * (`/api/upload/photo` with `replaces`). A refusal keeps the old photo: the
 * editor stays open and says why. Nothing is saved until Save.
 *
 * The box is moved and sized with a finger or a mouse (its body and its four
 * corners), or with the keyboard: it is one focusable control, where an arrow
 * key moves it and Shift with an arrow key moves its bottom-right corner.
 */

type Phase = "loading" | "failed" | "ready" | "saving";

/** The preview's long edge in canvas pixels: the screen scales it down further. */
const PREVIEW_EDGE = 720;

const CORNERS: readonly Corner[] = ["nw", "ne", "sw", "se"];

/**
 * Each corner's handle sits inside the box, in its corner, so the frame never
 * clips it: a 44-px target (at most 40 % of the box, so a small box keeps a
 * middle to move it by) with its mark in the very corner.
 */
const CORNER_PLACE: Record<Corner, string> = {
  nw: "left-0 top-0 items-start justify-start cursor-nwse-resize",
  ne: "right-0 top-0 items-start justify-end cursor-nesw-resize",
  sw: "bottom-0 left-0 items-end justify-start cursor-nesw-resize",
  se: "bottom-0 right-0 items-end justify-end cursor-nwse-resize",
};

const toolButtonClass =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-input px-3 text-sm " +
  "font-medium text-foreground hover:bg-accent disabled:opacity-50";

const saveButtonClass =
  "inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium " +
  "text-primary-foreground hover:bg-primary/90 disabled:opacity-50";

/** Draws the source turned by `turns` quarter turns clockwise on a new canvas of `scale`. */
function drawTurned(source: ImageBitmap, turns: Turns, scale: number): HTMLCanvasElement {
  const { w, h } = turnedSize(source.width, source.height, turns);
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(w * scale));
  canvas.height = Math.max(1, Math.round(h * scale));
  const context = canvas.getContext("2d");
  if (!context) throw new Error("no 2d context");
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  context.translate(canvas.width / 2, canvas.height / 2);
  context.rotate((turns * Math.PI) / 2);
  const dw = source.width * scale;
  const dh = source.height * scale;
  context.drawImage(source, -dw / 2, -dh / 2, dw, dh);
  return canvas;
}

export function PhotoEditor({
  sourceUrl,
  onCancel,
  onSave,
}: {
  /** The stored photo's signed link; null while the editor is closed. */
  sourceUrl: string | null;
  onCancel: () => void;
  /**
   * Sends the edited picture in the old photo's place. Resolves null when it
   * was stored (the step then closes the editor), or the refusal to show.
   */
  onSave: (picture: ImageBitmap) => Promise<MessageKey | null>;
}) {
  const { t } = useI18n();
  const [phase, setPhase] = useState<Phase>("loading");
  const [source, setSource] = useState<ImageBitmap | null>(null);
  const [turns, setTurns] = useState<Turns>(0);
  const [box, setBox] = useState<Box>(FULL);
  const [refusal, setRefusal] = useState<MessageKey | null>(null);
  const previewRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{
    mode: "move" | Corner;
    startX: number;
    startY: number;
    startBox: Box;
  } | null>(null);

  // Opening: the stored photo, fetched and decoded on the device.
  useEffect(() => {
    if (sourceUrl === null) return;
    let alive = true;
    let opened: ImageBitmap | null = null;
    setPhase("loading");
    setSource(null);
    setTurns(0);
    setBox(FULL);
    setRefusal(null);
    void (async () => {
      try {
        const response = await fetch(sourceUrl);
        if (!response.ok) throw new Error(`photo ${response.status}`);
        opened = await createImageBitmap(await response.blob());
        if (!alive) {
          opened.close();
          return;
        }
        setSource(opened);
        setPhase("ready");
      } catch {
        if (alive) setPhase("failed");
      }
    })();
    return () => {
      alive = false;
      opened?.close();
    };
  }, [sourceUrl]);

  // The preview: the turned picture, at most PREVIEW_EDGE pixels long.
  useEffect(() => {
    const canvas = previewRef.current;
    if (source === null || canvas === null) return;
    const scale = Math.min(1, PREVIEW_EDGE / Math.max(source.width, source.height));
    const drawn = drawTurned(source, turns, scale);
    canvas.width = drawn.width;
    canvas.height = drawn.height;
    canvas.getContext("2d")?.drawImage(drawn, 0, 0);
    drawn.width = 0;
  }, [source, turns]);

  const busy = phase !== "ready";
  const unchanged = turns === 0 && isFull(box);

  function rotate(direction: "left" | "right") {
    setTurns((current) => turn(current, direction));
    setBox(FULL);
    setRefusal(null);
  }

  function startDrag(event: ReactPointerEvent<HTMLElement>, mode: "move" | Corner) {
    if (busy) return;
    event.preventDefault();
    event.stopPropagation();
    frameRef.current?.setPointerCapture(event.pointerId);
    dragRef.current = { mode, startX: event.clientX, startY: event.clientY, startBox: box };
  }

  function drag(event: ReactPointerEvent<HTMLDivElement>) {
    const state = dragRef.current;
    const frame = frameRef.current;
    if (state === null || frame === null) return;
    const rect = frame.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const dx = (event.clientX - state.startX) / rect.width;
    const dy = (event.clientY - state.startY) / rect.height;
    setBox(
      state.mode === "move"
        ? moveBox(state.startBox, dx, dy)
        : resizeBox(state.startBox, state.mode, dx, dy),
    );
    setRefusal(null);
  }

  function endDrag(event: ReactPointerEvent<HTMLDivElement>) {
    if (dragRef.current === null) return;
    dragRef.current = null;
    if (frameRef.current?.hasPointerCapture(event.pointerId)) {
      frameRef.current.releasePointerCapture(event.pointerId);
    }
  }

  async function save() {
    if (source === null || busy || unchanged) return;
    setPhase("saving");
    setRefusal(null);
    let picture: ImageBitmap;
    try {
      const turned = drawTurned(source, turns, 1);
      const { sx, sy, sw, sh } = boxPixels(box, turned.width, turned.height);
      const cropped = document.createElement("canvas");
      cropped.width = sw;
      cropped.height = sh;
      cropped.getContext("2d")?.drawImage(turned, sx, sy, sw, sh, 0, 0, sw, sh);
      picture = await createImageBitmap(cropped);
      turned.width = 0;
      cropped.width = 0;
    } catch {
      setRefusal("post.photos.deviceFailed");
      setPhase("ready");
      return;
    }
    const answer = await onSave(picture);
    if (answer !== null) {
      setRefusal(answer);
      setPhase("ready");
    }
  }

  return (
    <Dialog
      open={sourceUrl !== null}
      onOpenChange={(open) => {
        if (!open && phase !== "saving") onCancel();
      }}
    >
      <DialogContent data-testid="post-photo-editor">
        <DialogHeader>
          <DialogTitle>{t("post.photos.edit")}</DialogTitle>
          <DialogDescription>{t("post.photos.editor.hint")}</DialogDescription>
        </DialogHeader>

        {phase === "loading" && (
          <p className="text-sm text-muted-foreground" data-testid="post-photo-editor-loading">
            {t("common.loading")}
          </p>
        )}
        {phase === "failed" && (
          <p
            className="text-sm text-destructive"
            role="alert"
            data-testid="post-photo-editor-failed"
          >
            {t("post.photos.editor.failed")}
          </p>
        )}

        {source !== null && (
          <div className="flex justify-center">
            <div
              ref={frameRef}
              data-testid="post-photo-editor-frame"
              data-turns={turns}
              className="relative inline-block touch-none select-none overflow-hidden"
              onPointerMove={drag}
              onPointerUp={endDrag}
              onPointerCancel={endDrag}
            >
              <canvas
                ref={previewRef}
                data-testid="post-photo-editor-preview"
                className="block h-auto max-h-[55vh] w-auto max-w-full"
              />
              <div
                role="group"
                tabIndex={busy ? -1 : 0}
                aria-label={t("post.photos.editor.box")}
                data-testid="post-photo-editor-box"
                data-box={[box.x, box.y, box.w, box.h].map((n) => n.toFixed(4)).join(",")}
                className="absolute cursor-move border-2 border-white outline-none shadow-[0_0_0_9999px_rgba(0,0,0,0.5)] focus-visible:border-primary"
                style={{
                  left: `${box.x * 100}%`,
                  top: `${box.y * 100}%`,
                  width: `${box.w * 100}%`,
                  height: `${box.h * 100}%`,
                }}
                onPointerDown={(event) => startDrag(event, "move")}
                onKeyDown={(event) => {
                  if (busy) return;
                  const next = keyBox(box, event.key, event.shiftKey);
                  if (next === null) return;
                  event.preventDefault();
                  setBox(next);
                  setRefusal(null);
                }}
              >
                {CORNERS.map((corner) => (
                  <span
                    key={corner}
                    aria-hidden="true"
                    data-testid={`post-photo-editor-corner-${corner}`}
                    className={`absolute flex h-11 max-h-[40%] w-11 max-w-[40%] ${CORNER_PLACE[corner]}`}
                    onPointerDown={(event) => startDrag(event, corner)}
                  >
                    <span className="h-3.5 w-3.5 rounded-sm border border-foreground bg-white" />
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {source !== null && (
          <div className="flex justify-center gap-2">
            <button
              type="button"
              data-testid="post-photo-editor-left"
              className={toolButtonClass}
              disabled={busy}
              onClick={() => rotate("left")}
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              {t("post.photos.editor.rotateLeft")}
            </button>
            <button
              type="button"
              data-testid="post-photo-editor-right"
              className={toolButtonClass}
              disabled={busy}
              onClick={() => rotate("right")}
            >
              <RotateCw className="h-4 w-4" aria-hidden="true" />
              {t("post.photos.editor.rotateRight")}
            </button>
          </div>
        )}

        {phase === "saving" && (
          <p className="text-sm text-muted-foreground" data-testid="post-photo-editor-saving">
            {t("post.photos.editor.saving")}
          </p>
        )}
        {refusal !== null && (
          <div role="alert" className="space-y-1" data-testid="post-photo-editor-refusal">
            <p className="text-sm text-destructive">{t(refusal)}</p>
            <p className="text-xs text-muted-foreground">{t("post.photos.editor.kept")}</p>
          </div>
        )}

        <DialogFooter>
          <button
            type="button"
            data-testid="post-photo-editor-cancel"
            className={toolButtonClass}
            disabled={phase === "saving"}
            onClick={onCancel}
          >
            {t("common.cancel")}
          </button>
          <button
            type="button"
            data-testid="post-photo-editor-save"
            className={saveButtonClass}
            disabled={busy || unchanged}
            onClick={() => void save()}
          >
            {t("common.save")}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default PhotoEditor;
