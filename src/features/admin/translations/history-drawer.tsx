import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type { GuardFn } from "@/features/auth/mfa/use-step-up";
import { useI18n } from "@/i18n";
import type { MessageKey } from "@/i18n/types";
import { relativeTime } from "@/lib/relative-time";

import {
  serverMessage,
  translationErrorKey,
  type TranslationRevision,
} from "./translations-service";
import {
  useSaveTranslation,
  useTranslationRevisions,
  useTranslationStatusAction,
} from "./use-translations";

/**
 * U4e — THE HISTORY DRAWER.
 *
 * READ: `admin_list_translation_revisions` — one gated definer read over the
 * append-only revision table (clients never touch it directly).
 *
 * RESTORE IS A SAVE (the whole point): there is NO new writer. A restore calls
 * `admin_save_translation` with the historical text, so the server re-checks
 * `translations:update` + step-up + scope, the value lands as EDITED, and the
 * restore itself captures a revision. History keeps everything.
 *
 * A NULL prior value cannot be saved (an empty string is not "no value"), so
 * that row offers "Clear instead", routing to the existing clear action.
 */

/** Alias: an inline arrow return type reads as JSX text to the string scan. */
interface MutationAction {
  (): Promise<void>;
}

const ACTION_LABELS: Record<string, MessageKey> = {
  machine: "admin.translations.history.action.machine",
  save: "admin.translations.history.action.save",
  approve: "admin.translations.history.action.approve",
  clear: "admin.translations.history.action.clear",
};

const STATUS_LABELS: Record<string, MessageKey> = {
  untranslated: "admin.translations.status.untranslated",
  machine: "admin.translations.status.machine",
  edited: "admin.translations.status.edited",
  approved: "admin.translations.status.approved",
};

export function HistoryDrawer({
  translationKey,
  lang,
  rtl,
  testId,
  mayUpdate,
  mayApprove,
  guard,
}: {
  translationKey: string;
  lang: string;
  rtl: boolean;
  /** Slugged key, so every control is addressable per row. */
  testId: string;
  mayUpdate: boolean;
  mayApprove: boolean;
  guard: GuardFn;
}) {
  const { t, language } = useI18n();
  const [open, setOpen] = useState(false);
  const [errorKey, setErrorKey] = useState<MessageKey | null>(null);
  const [errorDetail, setErrorDetail] = useState<string | null>(null);
  const [restored, setRestored] = useState(false);

  const history = useTranslationRevisions({ key: translationKey, lang }, open);
  const save = useSaveTranslation(lang);
  const statusAction = useTranslationStatusAction(lang);

  const run = (action: MutationAction) => {
    setRestored(false);
    setErrorKey(null);
    setErrorDetail(null);
    void guard(action)
      .then(() => setRestored(true))
      .catch((failure: unknown) => {
        // F4 — a refusal is shown, never swallowed.
        setErrorKey(translationErrorKey(failure));
        setErrorDetail(serverMessage(failure));
      });
  };

  const rows: TranslationRevision[] = history.data ?? [];

  return (
    <>
      <Button
        type="button"
        variant="outline"
        className="min-h-11"
        data-testid={`string-history-${testId}`}
        onClick={() => setOpen(true)}
      >
        {t("admin.translations.history.open")}
      </Button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="right"
          className="flex w-full flex-col gap-4 overflow-y-auto sm:max-w-md"
          data-testid={`history-drawer-${testId}`}
        >
          <SheetHeader className="text-start">
            <SheetTitle>{t("admin.translations.history.title")}</SheetTitle>
            <SheetDescription className="break-words font-mono text-xs">
              {translationKey}
            </SheetDescription>
          </SheetHeader>

          {history.isLoading ? (
            <p className="text-sm text-muted-foreground" data-testid={`history-loading-${testId}`}>
              {t("admin.translations.history.loading")}
            </p>
          ) : history.error ? (
            <p role="alert" className="text-sm text-destructive">
              {t("admin.translations.history.error")}
            </p>
          ) : rows.length === 0 ? (
            <p className="text-sm text-muted-foreground" data-testid={`history-empty-${testId}`}>
              {t("admin.translations.history.empty")}
            </p>
          ) : (
            <ul className="min-w-0 space-y-3" data-testid={`history-list-${testId}`}>
              {rows.map((row, index) => (
                <li
                  key={row.id}
                  className="min-w-0 space-y-2 rounded-md border border-border p-3"
                  data-testid={`history-row-${testId}-${index}`}
                >
                  <div className="flex min-w-0 flex-wrap items-center gap-2">
                    <Badge variant="outline" data-testid={`history-action-${testId}-${index}`}>
                      {t(ACTION_LABELS[row.action] ?? "admin.translations.history.action.save")}
                    </Badge>
                    <Badge variant="secondary" data-testid={`history-prev-${testId}-${index}`}>
                      {t(
                        STATUS_LABELS[row.prevStatus ?? ""] ??
                          "admin.translations.status.untranslated",
                      )}
                    </Badge>
                    <Badge variant="outline">
                      {t(
                        row.prevMachine
                          ? "admin.translations.provenance.machine"
                          : "admin.translations.provenance.human",
                      )}
                    </Badge>
                  </div>

                  <p className="text-xs text-muted-foreground">
                    {`${relativeTime(row.changedAt, language)} · ${
                      row.changedByName ?? t("admin.translations.history.actor.system")
                    }`}
                  </p>

                  <p
                    dir={rtl ? "rtl" : undefined}
                    className="min-w-0 whitespace-pre-wrap break-words text-sm text-foreground"
                    data-testid={`history-value-${testId}-${index}`}
                  >
                    {row.prevValue ?? t("admin.translations.history.noValue")}
                  </p>

                  {row.prevValue === null ? (
                    mayApprove ? (
                      <Button
                        type="button"
                        variant="outline"
                        className="min-h-11"
                        data-testid={`history-clear-${testId}-${index}`}
                        disabled={statusAction.isPending}
                        onClick={() =>
                          run(() =>
                            statusAction.mutateAsync({ key: translationKey, action: "clear" }),
                          )
                        }
                      >
                        {t("admin.translations.history.clearInstead")}
                      </Button>
                    ) : null
                  ) : mayUpdate ? (
                    <div className="min-w-0 space-y-2">
                      <p className="text-xs text-muted-foreground">
                        {t("admin.translations.history.confirm")}
                      </p>
                      <Button
                        type="button"
                        className="min-h-11"
                        data-testid={`history-restore-${testId}-${index}`}
                        disabled={save.isPending}
                        onClick={() =>
                          run(() =>
                            save.mutateAsync({
                              key: translationKey,
                              value: row.prevValue ?? "",
                            }),
                          )
                        }
                      >
                        {t("admin.translations.history.restore")}
                      </Button>
                    </div>
                  ) : null}
                </li>
              ))}
            </ul>
          )}

          {restored ? (
            <p
              role="status"
              className="text-sm text-muted-foreground"
              data-testid={`history-restored-${testId}`}
            >
              {t("admin.translations.history.restored")}
            </p>
          ) : null}
          {errorKey ? (
            <p
              role="alert"
              className="text-sm text-destructive"
              data-testid={`history-error-${testId}`}
            >
              {t(errorKey)}
              {errorDetail ? <span className="block text-xs opacity-80">{errorDetail}</span> : null}
            </p>
          ) : null}
        </SheetContent>
      </Sheet>
    </>
  );
}

export default HistoryDrawer;
