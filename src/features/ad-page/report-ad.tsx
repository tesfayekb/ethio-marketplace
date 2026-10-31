import { Link } from "@tanstack/react-router";
import { useId, useState } from "react";
import { LIST_CHOICE_ON, LIST_ROW, LIST_ROW_WRAP } from "@/components/shell/menu-row";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { useI18n, type MessageKey } from "@/i18n";
import { cn } from "@/lib/utils";
import { REPORT_REASONS, reportListing, type ReportReason } from "./report";

export function ReportAd({
  publicId,
  viewer,
  signInTo,
  onOwn,
}: {
  publicId: string;
  viewer: "unknown" | "signedOut" | "signedIn";
  signInTo: { to: "/auth"; search: { return: string } };
  onOwn: () => void;
}) {
  const { t } = useI18n();
  const id = useId();
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState<ReportReason | null>(null);
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [state, setState] = useState<"sent" | "already" | "rateLimited" | "failed" | null>(null);
  const terminal = state === "sent" || state === "already";
  const changeOpen = (next: boolean) => {
    setOpen(next);
    if (next) {
      setReason(null);
      setNote("");
      setState(null);
    }
  };
  const send = async () => {
    if (reason === null || busy) return;
    setBusy(true);
    const answer = await reportListing(publicId, reason, note);
    setBusy(false);
    if (answer.ok) setState("sent");
    else if (answer.reason === "ownListing") {
      setOpen(false);
      onOwn();
    } else setState(answer.reason === "alreadyReported" ? "already" : answer.reason);
  };
  if (viewer === "unknown") return null;
  if (viewer === "signedOut")
    return (
      <Link
        data-testid="listing-report-sign-in"
        to="/auth"
        search={signInTo.search}
        className="inline-flex min-h-11 items-center text-sm text-muted-foreground underline"
      >
        {t("adPage.report.open")}
      </Link>
    );
  return (
    <Dialog open={open} onOpenChange={changeOpen}>
      <DialogTrigger asChild>
        <Button
          variant="link"
          size="touch"
          className="px-0 text-muted-foreground underline"
          data-testid="listing-report-open"
        >
          {t("adPage.report.open")}
        </Button>
      </DialogTrigger>
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
            {t(
              state === "sent"
                ? "adPage.report.thanks"
                : state === "already"
                  ? "adPage.report.already"
                  : state === "rateLimited"
                    ? "adPage.report.rateLimited"
                    : "adPage.report.failed",
            )}
          </p>
        )}
        {terminal ? (
          <DialogFooter>
            <Button size="touch" onClick={() => setOpen(false)}>
              {t("common.close")}
            </Button>
          </DialogFooter>
        ) : (
          <>
            <RadioGroup
              data-testid="listing-report-reasons"
              aria-labelledby={`${id}-question`}
              value={reason ?? ""}
              disabled={busy}
              onValueChange={(value) => {
                const chosen = REPORT_REASONS.find((entry) => entry === value);
                if (chosen) setReason(chosen);
              }}
              className="gap-1"
            >
              {REPORT_REASONS.map((entry) => (
                <label
                  key={entry}
                  htmlFor={`${id}-${entry}`}
                  className={cn(LIST_ROW, LIST_ROW_WRAP, LIST_CHOICE_ON, "cursor-pointer gap-3")}
                >
                  <RadioGroupItem
                    id={`${id}-${entry}`}
                    value={entry}
                    data-testid={`listing-report-reason-${entry}`}
                  />
                  <span className="min-w-0 break-words">
                    {t(`adPage.report.reason.${entry}` as MessageKey)}
                  </span>
                </label>
              ))}
            </RadioGroup>
            <label htmlFor={`${id}-note`} className="text-sm">
              {t("adPage.report.note")}
            </label>
            <Textarea
              id={`${id}-note`}
              data-testid="listing-report-note"
              maxLength={500}
              value={note}
              disabled={busy}
              onChange={(event) => setNote(event.target.value)}
            />
            <DialogFooter>
              <Button size="touch" variant="outline" onClick={() => setOpen(false)} disabled={busy}>
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
