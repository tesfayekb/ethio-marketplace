import { TriangleAlert } from "lucide-react";
import { useState, type ReactNode } from "react";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ActionMessage } from "@/components/ui/action-message";
import { Button } from "@/components/ui/button";
import { PanelBody, PanelFooter, PanelHeader } from "@/components/ui/dialog-parts-facade";
import { MOVE_REASONS, moveProblem } from "@/features/admin-listings/move-reasons";
import { ReasonNote } from "@/features/admin-listings/reason-note";
import { useI18n, type MessageKey } from "@/i18n";

/**
 * DEC-469 (cursor bundle 7b) — THE REJECT OF AN AD IN SCREENING ASKS FOR A REASON, exactly as
 * removing a listing in All listings does: one reason from the Remove list (`MOVE_REASONS.remove`)
 * and a note for the seller (required for Other, at most 500 characters — `ReasonNote` and
 * `moveProblem`, the move dialog's own pieces). The door `admin_review_listing` judges both and
 * writes the seller's notice and the audit row; this dialog only asks. Approve and Hold ask
 * nothing. Shared by the queue (one ad or the ticked ones: one reason and note for all, the door
 * called once per ad) and the Edit's Review (one ad).
 *
 * Testids, from `testid`: the dialog `<testid>`, the reasons `<testid>-reason-<reason>`, the note
 * `<testid>-note`, the problem line `<testid>-problem`, Reject `<testid>-go`.
 */
export interface ScreeningRejectDialogProps {
  testid: string;
  open: boolean;
  /** How many ads this Reject sends; more than one says so in its title and text. */
  count: number;
  busy: boolean;
  /** The door's refusal, as the key its words are read by; null when there is none. */
  refusal: MessageKey | null;
  /** The ad (or the first of the ticked ones), drawn above the reason. */
  subject?: ReactNode;
  onCancel: () => void;
  onConfirm: (reason: string, note: string) => void;
}

/** The body lives inside the dialog's content, so a closed dialog forgets the reason and note. */
function RejectBody({
  testid,
  count,
  busy,
  refusal,
  subject,
  onConfirm,
}: Omit<ScreeningRejectDialogProps, "open" | "onCancel">) {
  const { t } = useI18n();
  const [reason, setReason] = useState("");
  const [note, setNote] = useState("");
  const [missing, setMissing] = useState<MessageKey | null>(null);
  const many = count > 1;
  const problem = missing ?? refusal;
  return (
    <>
      <PanelHeader tone="danger" icon={<TriangleAlert />}>
        <AlertDialogTitle>
          {many
            ? t("admin.screening.confirm.titleRejectMany").replace("{count}", String(count))
            : t("admin.screening.confirm.titleReject")}
        </AlertDialogTitle>
        <AlertDialogDescription>
          {t(
            many
              ? "admin.screening.confirm.descriptionRejectMany"
              : "admin.screening.confirm.descriptionReject",
          )}
        </AlertDialogDescription>
      </PanelHeader>
      <PanelBody>
        {subject}
        <div className="min-w-0 space-y-3">
          <ReasonNote
            testid={testid}
            reasons={MOVE_REASONS.remove}
            reason={reason}
            note={note}
            problem={missing}
            onReason={(value) => {
              setReason(value);
              setMissing(null);
            }}
            onNote={(value) => {
              setNote(value);
              setMissing(null);
            }}
          />
          <div id={`${testid}-problem`}>
            <ActionMessage
              tone="error"
              testid={`${testid}-problem`}
              text={problem === null ? null : t(problem)}
            />
          </div>
        </div>
      </PanelBody>
      <PanelFooter>
        <AlertDialogCancel disabled={busy}>{t("common.cancel")}</AlertDialogCancel>
        <Button
          type="button"
          variant="destructive"
          className="min-h-11"
          data-testid={`${testid}-go`}
          disabled={busy}
          onClick={() => {
            const absent = moveProblem(reason, note);
            if (absent !== null) {
              setMissing(absent);
              return;
            }
            onConfirm(reason, note.trim());
          }}
        >
          {t("admin.screening.reject")}
        </Button>
      </PanelFooter>
    </>
  );
}

export function ScreeningRejectDialog({ open, onCancel, ...body }: ScreeningRejectDialogProps) {
  return (
    <AlertDialog
      open={open}
      onOpenChange={(next) => {
        if (!next && !body.busy) onCancel();
      }}
    >
      <AlertDialogContent data-testid={body.testid} bands size="narrow">
        <RejectBody {...body} />
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ScreeningRejectDialog;
