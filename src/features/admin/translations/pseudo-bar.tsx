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

import { PSEUDO_LANG, pseudoize } from "./pseudo";
import { serverMessage, translationErrorKey } from "./translations-service";
import { usePseudoGenerate } from "./use-translations";

/**
 * U4i ⑦ — PSEUDO-LOCALIZATION (`translations:manage`).
 *
 * Turns the whole EN catalog into bracketed, accented, +40% text in the
 * reserved `zxa` language so an operator can see truncation, clipping and
 * missing `t()` calls at 360px without waiting for a real translation.
 *
 * NEVER PUBLISHABLE: `admin_set_language_flags` refuses `enabled_public` for
 * `zxa` by rule (migration 20260901234603). The server is the authority; this
 * button only creates the row admin-only and fills it.
 *
 * Rows are written through `admin_machine_translation` — the same writer the AI
 * route uses — so pseudo text is `machine`, unapproved, placeholder-validated
 * and revertible through History like any other machine row.
 */
export function PseudoBar({ guard }: { guard: GuardFn }) {
  const { t } = useI18n();
  const generate = usePseudoGenerate();
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null);
  const [summary, setSummary] = useState<string | null>(null);
  const [errorKey, setErrorKey] = useState<MessageKey | null>(null);
  const [errorDetail, setErrorDetail] = useState<string | null>(null);
  const [confirming, setConfirming] = useState(false);

  const run = () => {
    setConfirming(false);
    setSummary(null);
    setErrorKey(null);
    setErrorDetail(null);
    setProgress({ done: 0, total: 0 });
    void guard(async () => {
      const result = await generate.mutateAsync({
        transform: pseudoize,
        onProgress: (done, total) => setProgress({ done, total }),
      });
      setSummary(
        t("admin.translations.pseudo.summary")
          .replace("{written}", String(result.written))
          .replace("{failed}", String(result.failed)),
      );
    })
      .catch((failure: unknown) => {
        setErrorKey(translationErrorKey(failure));
        setErrorDetail(serverMessage(failure));
      })
      .finally(() => setProgress(null));
  };

  return (
    <div
      data-testid="strings-pseudo"
      className="flex min-w-0 flex-col gap-2 rounded-md border border-border p-3"
    >
      <p className="text-sm font-medium text-foreground">{t("admin.translations.pseudo.title")}</p>
      <p className="text-xs text-muted-foreground">
        {t("admin.translations.pseudo.note").replace("{code}", PSEUDO_LANG)}
      </p>
      <div className="flex min-w-0 flex-wrap gap-2">
        <Button
          type="button"
          variant="outline"
          className="min-h-11"
          data-testid="pseudo-generate"
          disabled={generate.isPending}
          onClick={() => setConfirming(true)}
        >
          {generate.isPending
            ? t("admin.translations.pseudo.pending")
            : t("admin.translations.pseudo.run")}
        </Button>
      </div>

      {/* U4i-3 (e): a catalog-wide machine write confirms first, naming zxa. */}
      <AlertDialog open={confirming} onOpenChange={setConfirming}>
        <AlertDialogContent data-testid="pseudo-generate-confirm">
          <AlertDialogHeader>
            <AlertDialogTitle>
              {t("admin.translations.pseudo.confirmTitle").replace("{code}", PSEUDO_LANG)}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {t("admin.translations.pseudo.confirmBody").replaceAll("{code}", PSEUDO_LANG)}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="min-h-11">
              {t("admin.translations.pseudo.confirmCancel")}
            </AlertDialogCancel>
            <AlertDialogAction
              className="min-h-11"
              data-testid="pseudo-generate-confirm-action"
              onClick={run}
            >
              {t("admin.translations.pseudo.confirmAction")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {progress && progress.total > 0 ? (
        <p role="status" data-testid="strings-pseudo-progress" className="text-xs text-foreground">
          {t("admin.translations.pseudo.progress")
            .replace("{done}", String(progress.done))
            .replace("{total}", String(progress.total))}
        </p>
      ) : null}
      {summary ? (
        <p role="status" data-testid="strings-pseudo-summary" className="text-sm text-foreground">
          {summary}
        </p>
      ) : null}
      {errorKey ? (
        <p role="alert" data-testid="strings-pseudo-error" className="text-sm text-destructive">
          {t(errorKey)}
          {errorDetail ? <span className="block text-xs opacity-80">{errorDetail}</span> : null}
        </p>
      ) : null}
    </div>
  );
}

export default PseudoBar;
