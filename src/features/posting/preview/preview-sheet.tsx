import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import { Z_SHEET } from "@/components/layout/layers";
import { useI18n } from "@/i18n";

import { ListingDetail, type ListingDetailView } from "./listing-detail";

/**
 * U6-C1-R3b-1 STEP 2c — "PREVIEW AS BUYERS SEE IT", full screen.
 *
 * A PORTAL, not a panel. The review page's own actions are a STICKY BAR at the
 * bottom of a 360-pixel screen; a preview rendered inside the form would sit
 * under it and be scrolled with it. The sheet is mounted on `document.body`
 * above every layer (`Z_SHEET`), so what the seller sees is the listing and
 * nothing of the wizard.
 *
 * ESCAPE CLOSES IT and the close button is a 44-pixel target at the top, where a
 * thumb reaches on the way back — the seller must never feel trapped in a
 * preview.
 */
export function PreviewSheet({ view, onClose }: { view: ListingDetailView; onClose: () => void }) {
  const { t } = useI18n();
  const closeRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    // The page behind must not scroll while the sheet is open.
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [onClose]);

  // SSR renders nothing: `document` belongs to the browser, and the sheet only
  // ever opens from a tap.
  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      className={`fixed inset-0 ${Z_SHEET} overflow-y-auto bg-background`}
      role="dialog"
      aria-modal="true"
      aria-label={t("post.preview.title")}
      data-testid="post-preview-sheet"
    >
      <div className="mx-auto max-w-2xl space-y-4 p-4 pb-16">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-base font-semibold text-foreground">{t("post.preview.title")}</h2>
          <button
            type="button"
            ref={closeRef}
            data-testid="post-preview-close"
            className="inline-flex min-h-11 items-center rounded-md border border-input bg-background px-3 text-sm font-medium text-foreground hover:bg-accent"
            onClick={onClose}
          >
            {t("post.preview.close")}
          </button>
        </div>
        <ListingDetail {...view} />
      </div>
    </div>,
    document.body,
  );
}

export default PreviewSheet;
