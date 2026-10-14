import { useEffect, useRef, useState } from "react";

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

import { onBackdrop } from "./photo-background";
import { removeBackground, type BackgroundAnswer } from "./posting-service";
import { backgroundRefusalKey, fill } from "./refusal-text";

/**
 * Bundle 13 turn 12 — D155b / D159: REMOVE THE COVER PHOTO'S BACKGROUND.
 *
 * The dialog opens on the cover with one plain sentence and the start button,
 * so an accidental tap spends nothing. Start asks the server for the cut-out
 * (`/api/listings/background`; the ad's tries are counted there: once, plus
 * one retry); the device lays it on the house background (photo-background.ts)
 * and shows it. Keep hands the picture to the step, which sends it through the
 * whole pipeline in the cover's place (the four sizes, the strip, the AI
 * screen; `replaces`). Retry asks once more while the ad has a try left.
 * Cancel keeps the photo as it was. A refusal is said in words, and the photo
 * stays as it was.
 */

type Phase = "intro" | "working" | "ready" | "saving";

/** The preview's long edge in canvas pixels: the screen scales it down further. */
const PREVIEW_EDGE = 720;

const toolButtonClass =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-md border border-input px-3 text-sm " +
  "font-medium text-foreground hover:bg-accent disabled:opacity-50";

const mainButtonClass =
  "inline-flex min-h-11 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium " +
  "text-primary-foreground hover:bg-primary/90 disabled:opacity-50";

export function BackgroundDialog({
  target,
  onCancel,
  onSave,
  remove = removeBackground,
}: {
  /** The ad and its cover; null while the dialog is closed. */
  target: { listingId: string; photoId: string } | null;
  onCancel: () => void;
  /**
   * Sends the picture in the cover's place. Resolves null when it was stored
   * (the step then closes the dialog), or the refusal to show.
   */
  onSave: (picture: ImageBitmap) => Promise<MessageKey | null>;
  /** The server call (a test hands its own). */
  remove?: (listingId: string, photoId: string) => Promise<BackgroundAnswer>;
}) {
  const { t } = useI18n();
  const [phase, setPhase] = useState<Phase>("intro");
  const [result, setResult] = useState<HTMLCanvasElement | null>(null);
  const [triesLeft, setTriesLeft] = useState<number | null>(null);
  const [refusal, setRefusal] = useState<MessageKey | null>(null);
  const previewRef = useRef<HTMLCanvasElement>(null);
  const openRef = useRef(0);

  const listingId = target?.listingId ?? null;
  const photoId = target?.photoId ?? null;

  // Opening (or a new cover): nothing asked yet.
  useEffect(() => {
    openRef.current += 1;
    setPhase("intro");
    setResult(null);
    setTriesLeft(null);
    setRefusal(null);
  }, [listingId, photoId]);

  // The preview: the picture at most PREVIEW_EDGE pixels long.
  useEffect(() => {
    const canvas = previewRef.current;
    if (result === null || canvas === null) return;
    const scale = Math.min(1, PREVIEW_EDGE / Math.max(result.width, result.height));
    canvas.width = Math.max(1, Math.round(result.width * scale));
    canvas.height = Math.max(1, Math.round(result.height * scale));
    const context = canvas.getContext("2d");
    if (!context) return;
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";
    context.drawImage(result, 0, 0, canvas.width, canvas.height);
  }, [result]);

  async function start() {
    if (listingId === null || photoId === null) return;
    const opened = openRef.current;
    setPhase("working");
    setRefusal(null);
    const answer = await remove(listingId, photoId);
    if (opened !== openRef.current) return;
    if (!answer.ok) {
      if (answer.reason === "backgroundSpent") setTriesLeft(0);
      setRefusal(
        answer.unreachable ? "post.photos.background.failed" : backgroundRefusalKey(answer.reason),
      );
      setPhase(result === null ? "intro" : "ready");
      return;
    }
    setTriesLeft(answer.triesLeft);
    let cutout: ImageBitmap | null = null;
    try {
      cutout = await createImageBitmap(answer.picture);
      const composed = onBackdrop(cutout);
      if (opened !== openRef.current) return;
      setResult(composed);
      setPhase("ready");
    } catch {
      if (opened !== openRef.current) return;
      setRefusal("post.photos.background.failed");
      setPhase(result === null ? "intro" : "ready");
    } finally {
      cutout?.close();
    }
  }

  async function keep() {
    if (result === null || phase !== "ready") return;
    setPhase("saving");
    setRefusal(null);
    let picture: ImageBitmap;
    try {
      picture = await createImageBitmap(result);
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

  const busy = phase === "working" || phase === "saving";
  const canStart = phase === "intro" && triesLeft !== 0;
  const canRetry = phase === "ready" && triesLeft !== null && triesLeft > 0;

  return (
    <Dialog
      open={target !== null}
      onOpenChange={(open) => {
        if (!open && phase !== "saving") onCancel();
      }}
    >
      <DialogContent
        data-testid="post-photo-background-dialog"
        className="max-h-[95vh] overflow-y-auto"
      >
        <DialogHeader>
          <DialogTitle>{t("post.photos.background")}</DialogTitle>
          <DialogDescription>{t("post.photos.background.hint")}</DialogDescription>
        </DialogHeader>

        {phase === "working" && (
          <p className="text-sm text-muted-foreground" data-testid="post-photo-background-working">
            {t("post.photos.background.working")}
          </p>
        )}

        {result !== null && (
          <div className="flex justify-center">
            <canvas
              ref={previewRef}
              data-testid="post-photo-background-preview"
              data-width={result.width}
              data-height={result.height}
              className="block h-auto max-h-[55vh] w-auto max-w-full rounded-md"
            />
          </div>
        )}

        {triesLeft !== null && (
          <p className="text-xs text-muted-foreground" data-testid="post-photo-background-tries">
            {fill(t("post.photos.background.triesLeft"), { count: triesLeft })}
          </p>
        )}

        {phase === "saving" && (
          <p className="text-sm text-muted-foreground" data-testid="post-photo-background-saving">
            {t("post.photos.editor.saving")}
          </p>
        )}
        {refusal !== null && (
          <div role="alert" className="space-y-1" data-testid="post-photo-background-refusal">
            <p className="text-sm text-destructive">{t(refusal)}</p>
            <p className="text-xs text-muted-foreground">{t("post.photos.editor.kept")}</p>
          </div>
        )}

        <DialogFooter className="gap-2">
          <button
            type="button"
            data-testid="post-photo-background-cancel"
            className={toolButtonClass}
            disabled={phase === "saving"}
            onClick={onCancel}
          >
            {t("common.cancel")}
          </button>
          {result === null ? (
            <button
              type="button"
              data-testid="post-photo-background-start"
              className={mainButtonClass}
              disabled={busy || !canStart}
              onClick={() => void start()}
            >
              {t("post.photos.background")}
            </button>
          ) : (
            <>
              <button
                type="button"
                data-testid="post-photo-background-retry"
                className={toolButtonClass}
                disabled={busy || !canRetry}
                onClick={() => void start()}
              >
                {t("common.retry")}
              </button>
              <button
                type="button"
                data-testid="post-photo-background-keep"
                className={mainButtonClass}
                disabled={busy}
                onClick={() => void keep()}
              >
                {t("post.photos.background.keep")}
              </button>
            </>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default BackgroundDialog;
