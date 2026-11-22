import { CircleHelp } from "lucide-react";
import { PanelSubject } from "@/components/ui/dialog-parts-facade";
import { Field } from "@/components/forms/field";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import { CategoryModal } from "@/components/ui/category-modal";
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
  subjectTitle?: string;
  busy: boolean;
  /** The door's refusal, already in words; null when there is none. */
  problem: string | null;
  onCancel: () => void;
  onConfirm: (note: string) => void;
}

export function UndoDialog({ subjectTitle, busy, problem, onCancel, onConfirm }: UndoDialogProps) {
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
      description={t("admin.listings.undo.hint")}
      size="narrow"
      subject={subjectTitle === undefined ? undefined : <PanelSubject title={subjectTitle} />}
      tone={"confirm"}
      icon={<CircleHelp />}
      footer={
        <>
          {" "}
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
          </Button>{" "}
        </>
      }
    >
      <div className="min-w-0 space-y-3">
        <Field
          id={"listing-undo-note"}
          field="note"
          label={t("admin.listings.move.note")}
          required={false}
          refusal={null}
          testId={"listing-undo-note-field"}
        >
          {(control) => (
            <>
              <Textarea
                {...control}
                data-testid="listing-undo-note"
                value={note}
                maxLength={NOTE_MAX}
                rows={3}
                onChange={(event) => setNote(event.target.value)}
              />
            </>
          )}
        </Field>
        {problem !== null ? (
          <p role="alert" data-testid="listing-undo-problem" className="text-sm text-destructive">
            {problem}
          </p>
        ) : null}
      </div>
    </CategoryModal>
  );
}

export default UndoDialog;
