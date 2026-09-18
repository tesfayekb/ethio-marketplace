import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

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
import { ADMIN_TRANSLATIONS_KEY, useAiTranslate, useAiTranslateEntities } from "./use-translations";

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
  filter = "",
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
  /**
   * INC-219 — THE ROSTER'S SEARCH FILTER IS THE RUN'S SCOPE. An admin filters,
   * then fills: with a filter set the sweep collects only the untranslated keys
   * that match it (and the button says so), so a filtered console never starts
   * a whole-catalog run. Empty string = today's behaviour, the whole language.
   */
  filter?: string;
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

  /** The filter only scopes the UI-key sweep; the entity scope is untouched. */
  const search = scope === "entity" ? "" : filter.trim();
  const filtered = search !== "";

  /**
   * The filtered count is a FACT read from the same door the run walks, so the
   * button's number and the work it queues can never disagree (F4).
   */
  const filteredCount = useQuery({
    queryKey: [...ADMIN_TRANSLATIONS_KEY, "ai-filtered-count", lang, search],
    queryFn: () => listTranslations({ lang, status: "untranslated", search, limit: 1, offset: 0 }),
    enabled: filtered,
  });

  /** Collect the untranslated work up front so the progress count is honest. */
  const collectUi = async (): Promise<AiTranslateItem[]> => {
    const items: AiTranslateItem[] = [];
    let offset = 0;
    for (;;) {
      const page = await listTranslations({
        lang,
        status: "untranslated",
        search,
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
        const send = () =>
          scope === "entity"
            ? translateEntities.mutateAsync(chunk as AiEntityItem[])
            : translateUi.mutateAsync(chunk as AiTranslateItem[]);
        // INC-207 — a chunk that THROWS is retried ONCE; if it throws again its
        // keys land in `failed` with the server's own words and the sweep goes
        // on, so a transient failure can never leave the summary null (F4).
        let result: Awaited<ReturnType<typeof send>> | null = null;
        try {
          result = await send();
        } catch {
          try {
            result = await send();
          } catch (retryFailure: unknown) {
            const reason = serverMessage(retryFailure) ?? "";
            for (const item of chunk) failed.push({ key: item.key, reason });
          }
        }
        if (result !== null) {
          done += result.done;
          flagged += result.flagged;
          failed.push(...result.failed);
        }
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

  /**
   * INC-119 stays the law with a filter set: the count is believed only when
   * the filtered read SUCCEEDED, and a failed read renders as an error, never
   * as a quiet "(0)".
   */
  const effectiveCountState: CountState = filtered
    ? filteredCount.isError
      ? "error"
      : filteredCount.data === undefined
        ? "pending"
        : "success"
    : countState;
  const effectiveCount = filtered ? (filteredCount.data?.totalCount ?? 0) : untranslated;
  const countKnown = effectiveCountState === "success";

  /**
   * INC-219 — READINESS IS A FACT, NOT A HOPE. A click that lands before the
   * effects have run reaches a button whose handler is not yet live, and the run
   * never starts — 54 TR-12 ledger entries of exactly that. The flag is set in an
   * effect, so `data-ready="true"` means the handlers are mounted, and the test
   * waits for it instead of for visibility alone.
   */
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);

  /** The run state, readable from outside: one attribute, five values. */
  const runState = errorKey
    ? "error"
    : busy
      ? "running"
      : confirming
        ? "confirming"
        : summary
          ? "done"
          : "idle";

  return (
    <div
      data-testid="ai-bulk-bar"
      data-run-state={runState}
      {...(progress ? { "data-progress": `${progress.done}/${progress.total}` } : {})}
      className="flex min-w-0 flex-col gap-2"
    >
      <div className="flex min-w-0 flex-wrap items-center gap-2">
        <Button
          type="button"
          variant="outline"
          className="min-h-11"
          data-testid="ai-bulk-start"
          data-count-state={effectiveCountState}
          data-scope={filtered ? "filtered" : "all"}
          data-ready={ready ? "true" : "false"}
          disabled={!ready || busy || !countKnown || effectiveCount === 0}
          onClick={() => setConfirming(true)}
        >
          {countKnown
            ? t(
                filtered
                  ? "admin.translations.ai.bulkActionFiltered"
                  : "admin.translations.ai.bulkAction",
              ).replace("{count}", String(effectiveCount))
            : t("admin.translations.ai.pending")}
        </Button>
        {effectiveCountState === "error" || effectiveCountState === "missing" ? (
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
              {t("admin.translations.ai.confirmBody").replace("{count}", String(effectiveCount))}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-testid="ai-bulk-cancel">
              {t("admin.translations.ai.cancel")}
            </AlertDialogCancel>
            <AlertDialogAction
              data-testid="ai-bulk-confirm-run"
              data-ready={ready ? "true" : "false"}
              disabled={!ready}
              onClick={start}
            >
              {t("admin.translations.ai.confirmCta").replace("{count}", String(effectiveCount))}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default AiBulkBar;
