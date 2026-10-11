import { useState } from "react";

import { FilterChoices } from "@/components/shell/filter-choices";
import { FormField } from "@/components/shell/form-section";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CategoryModal } from "@/features/admin-categories/category-dialogs";
import { useI18n, type MessageKey } from "@/i18n";

import { MOVE_LABEL, MOVE_REASONS, moveProblem, NOTE_MAX, type MoveKind } from "./move-reasons";

/**
 * Bundle 11, the Listings console, turn L2b (D136 4, D137) — the dialog of an
 * admin's move: Remove, Restore or Send back to review, for one listing or for
 * the ticked ones. It asks for the reason (the door's own list for that move)
 * and a note for the seller (required when the reason is Other, at most 500
 * characters), and says what the move does. The door decides (F3); its refusal
 * is shown here and nothing closes on it (F4).
 *
 * Testids: the dialog `listings-move-dialog` (data-kind), the reasons
 * `listings-move-reason-<reason>`, the note `listings-move-note`, the problem
 * line `listings-move-problem`, Cancel `listings-move-cancel`, the move
 * `listings-move-confirm`.
 */

const TITLE: Record<MoveKind, { one: MessageKey; many: MessageKey }> = {
  remove: {
    one: "admin.listings.move.remove.title",
    many: "admin.listings.move.remove.titleMany",
  },
  restore: {
    one: "admin.listings.move.restore.title",
    many: "admin.listings.move.restore.titleMany",
  },
  send_back: {
    one: "admin.listings.move.sendBack.title",
    many: "admin.listings.move.sendBack.title",
  },
};

const HINT: Record<MoveKind, MessageKey> = {
  remove: "admin.listings.move.remove.hint",
  restore: "admin.listings.move.restore.hint",
  send_back: "admin.listings.move.sendBack.hint",
};

export interface MoveDialogProps {
  kind: MoveKind;
  count: number;
  busy: boolean;
  /** The door's refusal, already translated; null when there is none. */
  refusal: string | null;
  onCancel: () => void;
  onConfirm: (reason: string, note: string) => void;
}

export function MoveDialog({ kind, count, busy, refusal, onCancel, onConfirm }: MoveDialogProps) {
  const { t } = useI18n();
  const [reason, setReason] = useState("");
  const [note, setNote] = useState("");
  const [problem, setProblem] = useState<MessageKey | null>(null);
  const title = count > 1 ? TITLE[kind].many : TITLE[kind].one;

  return (
    <CategoryModal
      testid="listings-move-dialog"
      openedBy={`move-${kind}`}
      title={t(title).replace("{count}", String(count))}
      onClose={() => {
        if (!busy) onCancel();
      }}
    >
      <div data-kind={kind} className="min-w-0 space-y-3">
        <p className="text-sm text-muted-foreground">{t(HINT[kind])}</p>
        <FilterChoices
          testid="listings-move-reason"
          label={t("admin.listings.move.reason")}
          value={reason}
          onChange={(value) => {
            setReason(value);
            setProblem(null);
          }}
          options={MOVE_REASONS[kind].map((value) => ({
            value,
            label: t(`admin.listings.reason.${value}` as MessageKey),
          }))}
        />
        <FormField
          label={t("admin.listings.move.note")}
          htmlFor="listings-move-note"
          help={t("admin.listings.move.noteHint")}
          testid="listings-move-note-field"
        >
          <Textarea
            id="listings-move-note"
            data-testid="listings-move-note"
            value={note}
            maxLength={NOTE_MAX}
            rows={3}
            onChange={(event) => {
              setNote(event.target.value);
              setProblem(null);
            }}
          />
        </FormField>
        {problem !== null || refusal !== null ? (
          <p role="alert" data-testid="listings-move-problem" className="text-sm text-destructive">
            {problem !== null ? t(problem) : refusal}
          </p>
        ) : null}
        <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
          <Button
            type="button"
            variant="outline"
            size="touch"
            data-testid="listings-move-cancel"
            disabled={busy}
            onClick={onCancel}
          >
            {t("common.cancel")}
          </Button>
          <Button
            type="button"
            size="touch"
            variant={kind === "remove" ? "destructive" : "default"}
            data-testid="listings-move-confirm"
            disabled={busy}
            onClick={() => {
              const missing = moveProblem(reason, note);
              if (missing !== null) {
                setProblem(missing);
                return;
              }
              onConfirm(reason, note.trim());
            }}
          >
            {t(MOVE_LABEL[kind])}
          </Button>
        </div>
      </div>
    </CategoryModal>
  );
}

export default MoveDialog;
