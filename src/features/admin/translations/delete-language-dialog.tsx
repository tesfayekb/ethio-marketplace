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
import { buttonVariants } from "@/components/ui/button";
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
 *
 * Bundle 11 G3d (DEC-170) — the dialog is opened by the roster row's red
 * Delete (RowActions) and is drawn only while it is open; the result line is
 * handed to the roster (`onDeleted`), because the deleted row leaves the list.
 */
export function DeleteLanguageDialog({
  row,
  guard,
  onClose,
  onDeleted,
}: {
  row: LanguageRow;
  guard: GuardFn;
  onClose: () => void;
  onDeleted: (summary: string) => void;
}) {
  const { t } = useI18n();
  const [typed, setTyped] = useState("");
  const [errorKey, setErrorKey] = useState<MessageKey | null>(null);
  const [errorDetail, setErrorDetail] = useState<string | null>(null);

  const preview = useLanguageDeletePreview(row.code, true);
  const remove = useDeleteLanguage();

  const armed = typed.trim().toLowerCase() === row.code.toLowerCase();

  const run = () => {
    setErrorKey(null);
    setErrorDetail(null);
    void guard(async () => {
      const counts = await remove.mutateAsync(row.code);
      onDeleted(
        t("admin.translations.delete.done")
          .replace("{code}", row.code)
          .replace("{ui}", String(counts.uiRows))
          .replace("{entity}", String(counts.entityRows))
          .replace("{revisions}", String(counts.revisions))
          .replace("{assignments}", String(counts.assignments)),
      );
      onClose();
    }).catch((failure: unknown) => {
      setErrorKey(translationErrorKey(failure));
      setErrorDetail(serverMessage(failure));
    });
  };

  return (
    <AlertDialog
      open
      onOpenChange={(next) => {
        if (!next) onClose();
      }}
    >
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
            // Bundle 11 A3 (G29, the Reject-red class) — the button that
            // confirms a destruction is drawn destructive.
            className={`${buttonVariants({ variant: "destructive" })} min-h-11`}
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
  );
}

export default DeleteLanguageDialog;
