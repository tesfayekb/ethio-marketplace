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
import { Input } from "@/components/ui/input";
import type { GuardFn } from "@/features/auth/mfa/use-step-up";
import { useI18n } from "@/i18n";
import type { MessageKey } from "@/i18n/types";

import { serverMessage, translationErrorKey, type LanguageRow } from "./translations-service";
import { useDeleteLanguage, useLanguageDeletePreview } from "./use-translations";

/**
 * U4i-4 (b) — DELETE LANGUAGE (`translations:manage`, step-up). INC-123.
 *
 * Destruction gets FRICTION PROPORTIONAL TO ITS BLAST RADIUS: the dialog names
 * what disappears with LIVE counts read from the server (never a client guess),
 * the action stays disabled until the operator TYPES the code, and the write
 * itself passes through StepUpGate. The base language and any published one are
 * refused by `admin_delete_language` itself — the UI's own disabling is
 * convenience only (F3).
 *
 * There is no `<Toaster />` in this app (see ai-bulk-bar), so success is an
 * inline `role="status"` line carrying the server's own per-table counts (F4).
 */
export function DeleteLanguageDialog({
  row,
  guard,
  onDeleted,
}: {
  row: LanguageRow;
  guard: GuardFn;
  onDeleted?: (code: string) => void;
}) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [typed, setTyped] = useState("");
  const [summary, setSummary] = useState<string | null>(null);
  const [errorKey, setErrorKey] = useState<MessageKey | null>(null);
  const [errorDetail, setErrorDetail] = useState<string | null>(null);

  const preview = useLanguageDeletePreview(row.code, open);
  const remove = useDeleteLanguage();

  const blocked = row.isBase || row.enabledPublic;
  const armed = typed.trim().toLowerCase() === row.code.toLowerCase();

  const run = () => {
    setErrorKey(null);
    setErrorDetail(null);
    void guard(async () => {
      const counts = await remove.mutateAsync(row.code);
      setOpen(false);
      setTyped("");
      setSummary(
        t("admin.translations.delete.done")
          .replace("{code}", row.code)
          .replace("{ui}", String(counts.uiRows))
          .replace("{entity}", String(counts.entityRows))
          .replace("{revisions}", String(counts.revisions))
          .replace("{assignments}", String(counts.assignments)),
      );
      onDeleted?.(row.code);
    }).catch((failure: unknown) => {
      setErrorKey(translationErrorKey(failure));
      setErrorDetail(serverMessage(failure));
    });
  };

  return (
    <>
      <Button
        type="button"
        variant="outline"
        className="min-h-11 shrink-0 whitespace-nowrap text-destructive"
        data-testid={`lang-delete-${row.code}`}
        title={row.enabledPublic ? t("admin.translations.delete.publishedBlocked") : undefined}
        disabled={blocked}
        onClick={() => {
          setSummary(null);
          setErrorKey(null);
          setErrorDetail(null);
          setTyped("");
          setOpen(true);
        }}
      >
        {t("admin.translations.delete.action")}
      </Button>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent data-testid={`lang-delete-dialog-${row.code}`}>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {t("admin.translations.delete.title")
                .replace("{language}", row.nameNative || row.nameEn)
                .replace("{code}", row.code)}
            </AlertDialogTitle>
            <AlertDialogDescription>{t("admin.translations.delete.body")}</AlertDialogDescription>
          </AlertDialogHeader>

          <p data-testid={`lang-delete-counts-${row.code}`} className="text-sm text-foreground">
            {preview.isPending
              ? t("admin.translations.delete.countsLoading")
              : preview.isError || !preview.data
                ? t("admin.translations.delete.countsError")
                : t("admin.translations.delete.counts")
                    .replace("{ui}", String(preview.data.uiRows))
                    .replace("{entity}", String(preview.data.entityRows))
                    .replace("{revisions}", String(preview.data.revisions))
                    .replace("{assignments}", String(preview.data.assignments))}
          </p>

          <label className="flex flex-col gap-1 text-sm text-foreground">
            <span>{t("admin.translations.delete.confirmLabel").replace("{code}", row.code)}</span>
            <Input
              value={typed}
              data-testid={`lang-delete-confirm-${row.code}`}
              autoComplete="off"
              spellCheck={false}
              onChange={(event) => setTyped(event.target.value)}
            />
          </label>

          {errorKey ? (
            <p
              role="alert"
              data-testid={`lang-delete-error-${row.code}`}
              className="text-sm text-destructive"
            >
              {t(errorKey)}
              {errorDetail ? <span className="block text-xs opacity-80">{errorDetail}</span> : null}
            </p>
          ) : null}

          <AlertDialogFooter>
            <AlertDialogCancel className="min-h-11">
              {t("admin.translations.delete.cancel")}
            </AlertDialogCancel>
            <AlertDialogAction
              className="min-h-11"
              data-testid={`lang-delete-submit-${row.code}`}
              disabled={!armed || remove.isPending}
              onClick={(event) => {
                // The dialog must stay open while step-up runs; it is closed by
                // the success path alone, so a refusal keeps its own message.
                event.preventDefault();
                run();
              }}
            >
              {remove.isPending
                ? t("admin.translations.delete.pending")
                : t("admin.translations.delete.confirm")}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {summary ? (
        <p role="status" data-testid="lang-delete-summary" className="text-xs text-foreground">
          {summary}
        </p>
      ) : null}
    </>
  );
}

export default DeleteLanguageDialog;
