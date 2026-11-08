import type { ReactNode } from "react";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useLevelLook } from "@/features/levels/use-level-rows";
import { useI18n } from "@/i18n";

import { ListingDetail, type ListingDetailView } from "./listing-detail";

/**
 * U6-C1-R3b-1 STEP 2c — "PREVIEW AS BUYERS SEE IT", full screen.
 *
 * Turn S6-4 — the one dialog's screen variant: it covers the review page and its
 * sticky bar, so what the seller sees is the listing and nothing of the wizard.
 * Escape and the close button leave it; the focus trap, the page's scroll lock,
 * the shell's notices and the layer order are the primitive's (INC-618: a dialog
 * opened over it, the step-up's code, keeps its focus; the newest `onClose` is
 * the one called).
 */
export function PreviewSheet({
  view,
  onClose,
  footer,
  body,
}: {
  /** P-2 (c) c2a — the look is the store's (the level row's base look), read here. */
  view: Omit<ListingDetailView, "look">;
  onClose: () => void;
  /** Bundle 11 A2 — actions under the listing (the reviewer's Approve and Reject). */
  footer?: ReactNode;
  /**
   * Bundle 16 turn E3 (D188) — what the sheet shows in the listing's place: the
   * reviewer's edit boxes while an ad is edited inside the preview. Absent, the
   * listing as buyers see it.
   */
  body?: ReactNode;
}) {
  const { t } = useI18n();
  const look = useLevelLook(view.tier);
  return (
    <Dialog
      open
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent
        variant="screen"
        data-testid="post-preview-sheet"
        closeTestId="post-preview-close"
        aria-describedby={undefined}
      >
        <div className="mx-auto w-full max-w-2xl space-y-4 p-4 pb-16">
          <DialogHeader>
            <DialogTitle>{t("post.preview.title")}</DialogTitle>
          </DialogHeader>
          {body ?? <ListingDetail {...view} look={look} />}
          {footer ? (
            <div data-testid="post-preview-footer" className="flex flex-wrap items-center gap-2">
              {footer}
            </div>
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PreviewSheet;
