import { useId, useState } from "react";
import { Field } from "@/components/forms/field";
import { LIST_CHOICE_ON, LIST_ROW, LIST_ROW_WRAP } from "@/components/shell/menu-row";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useI18n, type MessageKey } from "@/i18n";
import { cn } from "@/lib/utils";
import { rateText } from "./ad-page-refusals";
import { REPORT_REASONS, reportListing, type ReportReason } from "./report";

/**
 * L12 (DEC-339 wave 4) — the "Report this ad" dialog's body, fetched on the first
 * tap (report-ad-dialog-lazy.ts). Mounted afresh on each opening (the opener keys
 * it), so the reason, the note and the state start empty every time. The reasons
 * are choice Fields with native radios, as the posting wizard's person/business
 * answer (step-who.tsx); the note is an optional stack Field.
 */
export function ReportAdDialog({
  open,
  onOpenChange,
  publicId,
  onOwn,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  publicId: string;
  onOwn: () => void;
}) {
  const { t, language } = useI18n();
  const id = useId();
  const [reason, setReason] = useState<ReportReason | null>(null);
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [state, setState] = useState<"sent" | "already" | "rateLimited" | "failed" | null>(null);
  // L22c — the report dial's reset instant, when it named one.
  const [until, setUntil] = useState<string | undefined>(undefined);
  const terminal = state === "sent" || state === "already";
  const send = async () => {
    if (reason === null || busy) return;
    setBusy(true);
    const answer = await reportListing(publicId, reason, note);
    setBusy(false);
    if (answer.ok) setState("sent");
    else if (answer.reason === "ownListing") {
      onOpenChange(false);
      onOwn();
    } else {
      setState(answer.reason === "alreadyReported" ? "already" : answer.reason);
      setUntil(answer.until);
    }
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent aria-describedby={`${id}-question`}>
        <DialogHeader>
          <DialogTitle>{t("adPage.report.open")}</DialogTitle>
          <DialogDescription id={`${id}-question`}>{t("adPage.report.question")}</DialogDescription>
        </DialogHeader>
        {state !== null && (
          <p
            role="status"
            data-testid="listing-report-status"
            data-state={state}
            className="break-words text-sm"
          >
            {state === "rateLimited"
              ? rateText("report", until, t, language)
              : t(
                  state === "sent"
                    ? "adPage.report.thanks"
                    : state === "already"
                      ? "adPage.report.already"
                      : "adPage.report.failed",
                )}
          </p>
        )}
        {terminal ? (
          <DialogFooter>
            <Button size="touch" onClick={() => onOpenChange(false)}>
              {t("common.close")}
            </Button>
          </DialogFooter>
        ) : (
          <>
            <div
              role="radiogroup"
              aria-labelledby={`${id}-question`}
              aria-required
              data-testid="listing-report-reasons"
              className="grid gap-1"
            >
              {REPORT_REASONS.map((entry) => (
                <div
                  key={entry}
                  className={cn(LIST_ROW, LIST_ROW_WRAP, LIST_CHOICE_ON, "cursor-pointer")}
                >
                  <Field
                    id={`${id}-${entry}`}
                    field="reason"
                    label={
                      <span className="min-w-0 break-words">
                        {t(`adPage.report.reason.${entry}` as MessageKey)}
                      </span>
                    }
                    required={true}
                    marked={false}
                    refusal={null}
                    layout="choice"
                  >
                    {(field) => (
                      <input
                        type="radio"
                        {...field}
                        name={`${id}-reason`}
                        value={entry}
                        className="mt-0.5 size-5 accent-primary"
                        data-testid={`listing-report-reason-${entry}`}
                        checked={reason === entry}
                        disabled={busy}
                        onChange={() => setReason(entry)}
                      />
                    )}
                  </Field>
                </div>
              ))}
            </div>
            <Field
              id={`${id}-note`}
              field="note"
              label={t("adPage.report.note")}
              required={false}
              refusal={null}
            >
              {(field) => (
                <Textarea
                  {...field}
                  data-testid="listing-report-note"
                  maxLength={500}
                  value={note}
                  disabled={busy}
                  onChange={(event) => setNote(event.target.value)}
                />
              )}
            </Field>
            <DialogFooter>
              <Button
                size="touch"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={busy}
              >
                {t("common.cancel")}
              </Button>
              <Button
                size="touch"
                data-testid="listing-report-send"
                disabled={reason === null || busy}
                onClick={() => void send()}
              >
                {t("adPage.report.send")}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
