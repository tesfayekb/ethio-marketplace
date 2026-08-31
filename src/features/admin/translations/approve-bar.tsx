import { useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import type { GuardFn } from "@/features/auth/mfa/use-step-up";
import { useI18n } from "@/i18n";
import type { MessageKey } from "@/i18n/types";

import {
  serverMessage,
  translationErrorKey,
  type ApproveAllResult,
} from "./translations-service";
import { useApproveAllTranslations } from "./use-translations";

/**
 * U4g — BULK APPROVAL (publication-affecting, Tier A).
 *
 * The count shown is the server's own `reviewable` statistic: machine|edited,
 * unflagged, not orphaned. The button only starts the action — law F3 leaves
 * the decision to `admin_approve_all_translations`, which re-checks the
 * permission, the step-up and the language scope, skips flagged rows and
 * captures one revision per approved row before it mutates anything.
 *
 * The summary is an inline live region (no <Toaster/> is mounted in this app),
 * and every refusal surfaces with the server's own words (F4).
 */
export function ApproveAllBar({
  lang,
  reviewable,
  guard,
}: {
  lang: string;
  reviewable: number;
  guard: GuardFn;
}) {
  const { t } = useI18n();
  const approve = useApproveAllTranslations(lang);
  const [confirming, setConfirming] = useState(false);
  const [summary, setSummary] = useState<ApproveAllResult | null>(null);
  const [errorKey, setErrorKey] = useState<MessageKey | null>(null);
  const [errorDetail, setErrorDetail] = useState<string | null>(null);

  const start = () => {
    setConfirming(false);
    setSummary(null);
    setErrorKey(null);
    setErrorDetail(null);
    // `guard` resolves void, so the RPC's counts ride out through this box.
    const box: { result: ApproveAllResult | null } = { result: null };
    void guard(async () => {
      box.result = await approve.mutateAsync();
    })
      .then(() => {
        if (box.result) setSummary(box.result);
      })
      .catch((failure: unknown) => {
        setErrorKey(translationErrorKey(failure));
        setErrorDetail(serverMessage(failure));
      });
  };

  return (
    <div data-testid="approve-all-bar" className="flex min-w-0 flex-col gap-2">
      <div className="flex min-w-0 flex-wrap items-center gap-2">
        <Button
          type="button"
          variant="outline"
          className="min-h-11"
          data-testid="approve-all-start"
          disabled={approve.isPending || reviewable === 0}
          onClick={() => setConfirming(true)}
        >
          {t("admin.translations.approve.action").replace("{count}", String(reviewable))}
        </Button>
        {approve.isPending ? (
          <span
            role="status"
            data-testid="approve-all-pending"
            className="text-sm text-muted-foreground"
          >
            {t("admin.translations.approve.pending")}
          </span>
        ) : null}
        {reviewable === 0 && summary === null ? (
          <span data-testid="approve-all-none" className="text-sm text-muted-foreground">
            {t("admin.translations.approve.none")}
          </span>
        ) : null}
      </div>

      {summary ? (
        <p role="status" data-testid="approve-all-summary" className="text-sm text-muted-foreground">
          {t("admin.translations.approve.summary")
            .replace("{approved}", String(summary.approved))
            .replace("{skipped}", String(summary.skippedFlagged))}
        </p>
      ) : null}

      {errorKey ? (
        <p role="alert" data-testid="approve-all-error" className="text-sm text-destructive">
          {t(errorKey)}
          {errorDetail ? <span className="block text-xs opacity-80">{errorDetail}</span> : null}
        </p>
      ) : null}

      <AlertDialog open={confirming} onOpenChange={setConfirming}>
        <AlertDialogContent data-testid="approve-all-confirm">
          <AlertDialogHeader>
            <AlertDialogTitle>{t("admin.translations.approve.confirmTitle")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("admin.translations.approve.confirmBody").replace(
                "{count}",
                String(reviewable),
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="approve-all-cancel">
              {t("admin.translations.approve.cancel")}
            </AlertDialogCancel>
            <AlertDialogAction data-testid="approve-all-confirm-run" onClick={start}>
              {t("admin.translations.approve.confirmCta").replace("{count}", String(reviewable))}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default ApproveAllBar;
