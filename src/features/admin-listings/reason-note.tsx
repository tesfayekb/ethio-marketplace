import { Field } from "@/components/forms/field";
import { FilterChoices } from "@/components/shell/filter-choices";
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
  problem = null,
}: {
  testid: string;
  reasons: readonly string[];
  reason: string;
  note: string;
  onReason: (reason: string) => void;
  onNote: (note: string) => void;
  /** Cross-field rules keep their dialog line; the affected answer names it. */
  problem?: MessageKey | null;
}) {
  const { t } = useI18n();
  return (
    <>
      <Field id={`${testid}-reason`} field="reason" label={<span className="sr-only">{t("admin.listings.move.reason")}</span>} required marked={false} refusal={null} layout="inline">
      {(control) => <div {...control} role="group" aria-invalid={problem === "admin.listings.move.pickReason" || undefined} aria-describedby={problem === "admin.listings.move.pickReason" ? `${testid}-problem` : undefined}>
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
      </div>}
      </Field>
      <Field
        id={`${testid}-note`}
        field="note"
        label={t("admin.listings.move.note")}
        required={reason === "other"}
        refusal={null}
        hint={<p className="text-xs text-muted-foreground">{t("admin.listings.move.noteHint")}</p>}
        testId={`${testid}-note-field`}
      >
        {(control) => (
          <>
            <Textarea
              {...control}
              data-testid={`${testid}-note`}
              value={note}
              maxLength={NOTE_MAX}
              rows={3}
              aria-invalid={problem === "admin.listings.move.noteRequired" || problem === "admin.listings.move.noteTooLong" || undefined}
              aria-describedby={problem === "admin.listings.move.noteRequired" || problem === "admin.listings.move.noteTooLong" ? `${testid}-note-hint ${testid}-problem` : control["aria-describedby"]}
              onChange={(event) => onNote(event.target.value)}
            />
          </>
        )}
      </Field>
    </>
  );
}

export default ReasonNote;
