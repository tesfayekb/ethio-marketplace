import { FilterChoices } from "@/components/shell/filter-choices";
import { FormField } from "@/components/shell/form-section";
import { Textarea } from "@/components/ui/textarea";
import { useI18n, type MessageKey } from "@/i18n";

import { NOTE_MAX } from "./move-reasons";

/**
 * Bundle 11, the Listings console, turn L4a (D137, D140) — THE REASON AND THE
 * NOTE an admin gives the seller, one block for every admin change: a move
 * (Remove, Restore, Send back to review) and an edit. The reasons are the
 * door's list for that change; the note is required for Other and at most 500
 * characters (the door's rules; `moveProblem` says what is missing).
 *
 * Testids, from `testid`: the reasons `<testid>-reason-<reason>`, the note
 * `<testid>-note` (its field `<testid>-note-field`).
 */
export function ReasonNote({
  testid,
  reasons,
  reason,
  note,
  onReason,
  onNote,
}: {
  testid: string;
  reasons: readonly string[];
  reason: string;
  note: string;
  onReason: (reason: string) => void;
  onNote: (note: string) => void;
}) {
  const { t } = useI18n();
  return (
    <>
      <FilterChoices
        testid={`${testid}-reason`}
        label={t("admin.listings.move.reason")}
        value={reason}
        onChange={onReason}
        options={reasons.map((value) => ({
          value,
          label: t(`admin.listings.reason.${value}` as MessageKey),
        }))}
      />
      <FormField
        label={t("admin.listings.move.note")}
        htmlFor={`${testid}-note`}
        help={t("admin.listings.move.noteHint")}
        testid={`${testid}-note-field`}
      >
        <Textarea
          id={`${testid}-note`}
          data-testid={`${testid}-note`}
          value={note}
          maxLength={NOTE_MAX}
          rows={3}
          onChange={(event) => onNote(event.target.value)}
        />
      </FormField>
    </>
  );
}

export default ReasonNote;
