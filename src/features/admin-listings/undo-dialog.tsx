import { useState } from "react";

import { FormField } from "@/components/shell/form-section";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CategoryModal } from "@/features/admin-categories/category-dialogs";
import { useI18n } from "@/i18n";

import { NOTE_MAX } from "./move-reasons";

/**
 * Bundle 11, the Listings console, turn L4d (D141) — the dialog behind "Undo
 * this edit": what the undo does, an optional note for the seller (at most 500
 * characters; the reason is "Undo" itself) and the door's refusal, shown here
 * with nothing closing on it (F4).
 *
 * Testids: the dialog `listing-undo-dialog`, the note `listing-undo-note`, the
 * problem line `listing-undo-problem`, Cancel `listing-undo-cancel`, Undo
 * `listing-undo-confirm`.
 */
export interface UndoDialogProps {
  busy: boolean;
  /** The door's refusal, already in words; null when there is none. */
  problem: string | null;
  onCancel: () => void;
  onConfirm: (note: string) => void;
}

export function UndoDialog({ busy, problem, onCancel, onConfirm }: UndoDialogProps) {
  const { t } = useI18n();
  const [note, setNote] = useState("");

  return (
    <CategoryModal
      testid="listing-undo-dialog"
      openedBy="undo-edit"
      title={t("admin.listings.undo.title")}
      onClose={() => {
        if (!busy) onCancel();
      }}
    >
      <div className="min-w-0 space-y-3">
        <p className="text-sm text-muted-foreground">{t("admin.listings.undo.hint")}</p>
        <FormField
          label={t("admin.listings.move.note")}
          htmlFor="listing-undo-note"
          testid="listing-undo-note-field"
        >
          <Textarea
            id="listing-undo-note"
            data-testid="listing-undo-note"
            value={note}
            maxLength={NOTE_MAX}
            rows={3}
            onChange={(event) => setNote(event.target.value)}
          />
        </FormField>
        {problem !== null ? (
          <p role="alert" data-testid="listing-undo-problem" className="text-sm text-destructive">
            {problem}
          </p>
        ) : null}
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            size="touch"
            data-testid="listing-undo-cancel"
            disabled={busy}
            onClick={onCancel}
          >
            {t("common.cancel")}
          </Button>
          <Button
            type="button"
            size="touch"
            data-testid="listing-undo-confirm"
            disabled={busy}
            onClick={() => onConfirm(note.trim())}
          >
            {t("admin.listings.undo.confirm")}
          </Button>
        </div>
      </div>
    </CategoryModal>
  );
}

export default UndoDialog;
