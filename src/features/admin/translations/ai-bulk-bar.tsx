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
  AI_CHUNK_SIZE,
  listEntityTranslations,
  listTranslations,
  serverMessage,
  translationErrorKey,
  type AiEntityItem,
  type AiTranslateItem,
} from "./translations-service";
import { useAiTranslate, useAiTranslateEntities } from "./use-translations";

/**
 * U4c — BULK AI FILL.
 *
 * Provisional by construction: everything the provider returns lands as
 * `machine` status through the scope's writer RPC, so a human still has to
 * approve it before it can ship (the coverage gate counts approved rows only).
 *
 * U4j — ONE BAR, TWO SCOPES (law B3: extend via props, never copy). `ui`
 * collects untranslated KEYS and writes `ui_translations`; `entity` collects
 * untranslated CONTENT NAMES and writes `entity_translations`. Confirm dialog,
 * chunking, progress and summary are identical.
 *
 * NOTE (in-scope deviation from the spec's "toast"): no `<Toaster />` is
 * mounted in this app and `__root.tsx` is outside this task's scope, so the
 * summary is an inline live region instead. Same information, same failure
 * list, no silent success (F4).
 */
export type CountState = "success" | "pending" | "error" | "missing";

export function AiBulkBar({
  lang,
  untranslated,
  guard,
  scope = "ui",
  countState = "success",
}: {
  lang: string;
  untranslated: number;
  guard: GuardFn;
  scope?: "ui" | "entity";
  /**
   * INC-119 — where the count came from. Only a `success` count may be
   * rendered as a number or believed when it is zero; a pending, failed or
   * absent count renders as pending/error and never as a quiet "(0)".
   */
  countState?: CountState;
}) {
  const { t } = useI18n();
  const translateUi = useAiTranslate(lang);
  const translateEntities = useAiTranslateEntities(lang);
  const translate = scope === "entity" ? translateEntities : translateUi;
  const [confirming, setConfirming] = useState(false);
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null);
  const [summary, setSummary] = useState<{
    done: number;
    flagged: number;
    failed: { key: string; reason: string }[];
  } | null>(null);
  const [errorKey, setErrorKey] = useState<MessageKey | null>(null);
  const [errorDetail, setErrorDetail] = useState<string | null>(null);

  /** Collect the untranslated work up front so the progress count is honest. */
  const collectUi = async (): Promise<AiTranslateItem[]> => {
    const items: AiTranslateItem[] = [];
    let offset = 0;
    for (;;) {
      const page = await listTranslations({
        lang,
        status: "untranslated",
        limit: AI_CHUNK_SIZE,
        offset,
      });
      for (const row of page.rows) {
        if (row.sourceValue !== null && row.sourceValue !== "") {
          items.push({ key: row.key, source: row.sourceValue });
        }
      }
      offset += page.rows.length;
      if (page.rows.length === 0 || offset >= page.totalCount) break;
    }
    return items;
  };

  const collectEntities = async (): Promise<AiEntityItem[]> => {
    const items: AiEntityItem[] = [];
    let offset = 0;
    for (;;) {
      const page = await listEntityTranslations({
        lang,
        status: "untranslated",
        limit: AI_CHUNK_SIZE,
        offset,
      });
      for (const row of page.rows) {
        if (row.sourceValue !== null && row.sourceValue !== "") {
          items.push({
            key: `${row.entityType}:${row.entityId}`,
            source: row.sourceValue,
            type: row.entityType,
            id: row.entityId,
            field: row.field,
          });
        }
      }
      offset += page.rows.length;
      if (page.rows.length === 0 || offset >= page.totalCount) break;
    }
    return items;
  };

  const run = async () => {
    setSummary(null);
    setErrorKey(null);
    setErrorDetail(null);

    const items = scope === "entity" ? await collectEntities() : await collectUi();

    if (items.length === 0) {
      setSummary({ done: 0, flagged: 0, failed: [] });
      return;
    }

    let done = 0;
    let flagged = 0;
    const failed: { key: string; reason: string }[] = [];
    setProgress({ done: 0, total: items.length });
    try {
      for (let index = 0; index < items.length; index += AI_CHUNK_SIZE) {
        const chunk = items.slice(index, index + AI_CHUNK_SIZE);
        const result =
          scope === "entity"
            ? await translateEntities.mutateAsync(chunk as AiEntityItem[])
            : await translateUi.mutateAsync(chunk as AiTranslateItem[]);
        done += result.done;
        flagged += result.flagged;
        failed.push(...result.failed);
        setProgress({ done: index + chunk.length, total: items.length });
      }
    } finally {
      setProgress(null);
    }
    setSummary({ done, flagged, failed });
  };

  const start = () => {
    setConfirming(false);
    void guard(run).catch((failure: unknown) => {
      setErrorKey(translationErrorKey(failure));
      setErrorDetail(serverMessage(failure));
    });
  };

  const busy = progress !== null || translate.isPending;
  const countKnown = countState === "success";

  return (
    <div data-testid="ai-bulk-bar" className="flex min-w-0 flex-col gap-2">
      <div className="flex min-w-0 flex-wrap items-center gap-2">
        <Button
          type="button"
          variant="outline"
          className="min-h-11"
          data-testid="ai-bulk-start"
          data-count-state={countState}
          disabled={busy || !countKnown || untranslated === 0}
          onClick={() => setConfirming(true)}
        >
          {countKnown
            ? t("admin.translations.ai.bulkAction").replace("{count}", String(untranslated))
            : t("admin.translations.ai.pending")}
        </Button>
        {countState === "error" || countState === "missing" ? (
          <span role="alert" data-testid="ai-bulk-count-error" className="text-sm text-destructive">
            {t("admin.translations.strings.error")}
          </span>
        ) : null}
        {progress ? (
          <span
            role="status"
            data-testid="ai-bulk-progress"
            className="text-sm text-muted-foreground"
          >
            {t("admin.translations.ai.progress")
              .replace("{done}", String(progress.done))
              .replace("{total}", String(progress.total))}
          </span>
        ) : null}
      </div>

      {summary ? (
        <div role="status" data-testid="ai-bulk-summary" className="text-sm text-muted-foreground">
          <p>
            {t("admin.translations.ai.summary")
              .replace("{done}", String(summary.done))
              .replace("{flagged}", String(summary.flagged))
              .replace("{failed}", String(summary.failed.length))}
          </p>
          {summary.failed.length > 0 ? (
            <p data-testid="ai-bulk-failed" className="text-xs text-destructive">
              {t("admin.translations.ai.failedList").replace(
                "{keys}",
                summary.failed
                  .slice(0, 10)
                  .map((entry) => entry.key)
                  .join(", "),
              )}
            </p>
          ) : null}
        </div>
      ) : null}

      {errorKey ? (
        <p role="alert" data-testid="ai-bulk-error" className="text-sm text-destructive">
          {t(errorKey)}
          {errorDetail ? <span className="block text-xs opacity-80">{errorDetail}</span> : null}
        </p>
      ) : null}

      <AlertDialog open={confirming} onOpenChange={setConfirming}>
        <AlertDialogContent data-testid="ai-bulk-confirm">
          <AlertDialogHeader>
            <AlertDialogTitle>{t("admin.translations.ai.confirmTitle")}</AlertDialogTitle>
            <AlertDialogDescription>
              {t("admin.translations.ai.confirmBody").replace("{count}", String(untranslated))}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="ai-bulk-cancel">
              {t("admin.translations.ai.cancel")}
            </AlertDialogCancel>
            <AlertDialogAction data-testid="ai-bulk-confirm-run" onClick={start}>
              {t("admin.translations.ai.confirmCta").replace("{count}", String(untranslated))}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default AiBulkBar;
