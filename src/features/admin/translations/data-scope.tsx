import { useState } from "react";

import {
  DataTable,
  DataTablePagination,
  type DataTableColumn,
} from "@/components/shell/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { GuardFn } from "@/features/auth/mfa/use-step-up";
import { useI18n } from "@/i18n";
import type { MessageKey } from "@/i18n/types";

import { AiBulkBar, type CountState } from "./ai-bulk-bar";
import { ApproveAllBar } from "./approve-bar";
import {
  entityRowSlug,
  pickEntityStats,
  serverMessage,
  translationErrorKey,
  type EntityTranslationRow,
} from "./translations-service";
import {
  useAiTranslateEntities,
  useEntityTranslations,
  useEntityTranslationStats,
  useEntityTranslationStatusAction,
  useSaveEntityTranslation,
} from "./use-translations";

const PAGE_SIZE = 25;

/** U4k — the Data scope's own status chips (entity rows carry no flag). */
const DATA_STATUS_CHIPS = [
  { value: "all", labelKey: "admin.translations.filter.all" },
  { value: "untranslated", labelKey: "admin.translations.status.untranslated" },
  { value: "machine", labelKey: "admin.translations.status.machine" },
  { value: "edited", labelKey: "admin.translations.status.edited" },
  { value: "approved", labelKey: "admin.translations.status.approved" },
] as const satisfies readonly { value: string; labelKey: MessageKey }[];

const STATUS_LABELS: Record<string, MessageKey> = {
  untranslated: "admin.translations.status.untranslated",
  machine: "admin.translations.status.machine",
  edited: "admin.translations.status.edited",
  approved: "admin.translations.status.approved",
};

const ENTITY_LABELS: Record<string, MessageKey> = {
  category: "admin.translations.entity.category",
  location: "admin.translations.entity.location",
};

/**
 * U4d — THE DATA SCOPE of the strings page.
 *
 * Content names (categories, locations) served from `entity_translations`.
 *
 * U4j — AI IS NO LONGER DEFERRED here: per-row and bulk machine fill run
 * through the same `/api/translate` route as the interface scope, with
 * `admin_machine_entity_translation` as the single writer. Results are
 * provisional (`machine`) and still need approval.
 *
 * The S10 PUBLIC GATE remains UI-keys-only: this coverage line is a METER, not
 * a publish blocker (stated in docs/features/translations.md).
 */
export function DataScope({
  lang,
  rtl,
  status,
  query,
  mayUpdate,
  mayApprove,
  mayMachine,
  guard,
}: {
  lang: string;
  rtl: boolean;
  status: string;
  query: string;
  mayUpdate: boolean;
  mayApprove: boolean;
  /** Already base-guarded by the caller: the base language is never machine-filled. */
  mayMachine: boolean;
  guard: GuardFn;
}) {
  const { t } = useI18n();
  const [page, setPage] = useState(0);
  const [expanded, setExpanded] = useState<string | null>(null);
  /**
   * U4k — the STATUS CHIPS of the Data scope, mirroring the Interface ones.
   * They are component state rather than a URL filter because the route file
   * (the single parse point for search params, INC-073) is outside this task's
   * scope; the incoming `status` prop remains the initial truth.
   */
  const [chip, setChip] = useState(status === "flagged" ? "all" : status);
  const activeStatus = chip;

  const list = useEntityTranslations(
    {
      lang,
      status: activeStatus === "flagged" ? "all" : activeStatus,
      search: query,
      limit: PAGE_SIZE,
      offset: page * PAGE_SIZE,
    },
    true,
  );
  /**
   * U4j — one gated stats RPC replaces the two 1-row probes: the meter's
   * numerator, denominator and the bulk bar's work count now come from the
   * SAME server count over the SAME universe as the list.
   */
  const stats = useEntityTranslationStats(lang);
  /**
   * INC-119 — MATCH THE LANGUAGE, NEVER `[0]`, AND NEVER FAKE A ZERO.
   * `langStats === undefined` means pending, failed, or "the server returned
   * no row for this language" — three states that are not "no work left".
   */
  const langStats = pickEntityStats(stats.data, lang);
  const countState: CountState = langStats
    ? "success"
    : stats.isError
      ? "error"
      : stats.isPending
        ? "pending"
        : "missing";

  const chipCounts: Record<string, number> = {
    all: langStats?.total ?? 0,
    untranslated: langStats?.untranslated ?? 0,
    machine: langStats?.machineCount ?? 0,
    edited: langStats?.edited ?? 0,
    approved: langStats?.approved ?? 0,
  };
  /** The entity layer has no flags: everything machine|edited is approvable. */
  const reviewable = (langStats?.machineCount ?? 0) + (langStats?.edited ?? 0);

  const rows = list.data?.rows ?? [];
  const total = list.data?.totalCount ?? 0;

  return (
    <div className="min-w-0 space-y-4" data-testid="admin-translations-data">
      {/* INC-119 — the shape trace the next failure can read straight off the DOM. */}
      <span
        hidden
        data-testid="data-stats-state"
        data-state={countState}
        data-lang={lang}
        data-rows={String((stats.data ?? []).length)}
        data-untranslated={langStats ? String(langStats.untranslated) : "unknown"}
        data-total={langStats ? String(langStats.total) : "unknown"}
        data-error={stats.error instanceof Error ? stats.error.message : ""}
      />
      <p data-testid="data-coverage" className="text-sm text-muted-foreground">
        {t("admin.translations.data.coverage")
          .replace("{approved}", String(langStats?.approved ?? 0))
          .replace("{total}", String(langStats?.total ?? 0))}
      </p>
      <p data-testid="data-ai-note" className="text-sm text-muted-foreground">
        {t("admin.translations.data.aiNote")}
      </p>

      <div className="flex min-w-0 flex-wrap gap-2" data-testid="data-chips">
        {DATA_STATUS_CHIPS.map((entry) => (
          <Button
            key={entry.value}
            type="button"
            variant={activeStatus === entry.value ? "default" : "outline"}
            className="min-h-11"
            data-testid={`data-chip-${entry.value}`}
            onClick={() => {
              setPage(0);
              setChip(entry.value);
            }}
          >
            {`${t(entry.labelKey)} · ${chipCounts[entry.value] ?? 0}`}
          </Button>
        ))}
      </div>

      <div className="flex min-w-0 flex-wrap items-start gap-3">
        {mayMachine ? (
          <AiBulkBar
            lang={lang}
            scope="entity"
            untranslated={langStats?.untranslated ?? 0}
            countState={countState}
            guard={guard}
          />
        ) : null}
        {mayApprove ? (
          <ApproveAllBar lang={lang} scope="entity" reviewable={reviewable} guard={guard} />
        ) : null}
      </div>

      <DataTable
        columns={dataColumns(t, rtl)}
        rows={rows}
        rowKey={(row) => row.key}
        rowTestId={(row) => `entity-row-${entityRowSlug(row)}`}
        caption={t("admin.translations.data.caption")}
        loading={list.isLoading}
        loadingState={
          <p className="text-sm text-muted-foreground">{t("admin.translations.strings.loading")}</p>
        }
        error={list.error}
        errorState={
          <p className="text-sm text-destructive">{t("admin.translations.strings.error")}</p>
        }
        emptyState={
          <p className="text-sm text-muted-foreground">{t("admin.translations.data.empty")}</p>
        }
        expandedRow={(row) =>
          row.key === expanded ? (
            <EntityEditor
              row={row}
              lang={lang}
              rtl={rtl}
              mayUpdate={mayUpdate}
              mayApprove={mayApprove}
              mayMachine={mayMachine}
              guard={guard}
            />
          ) : null
        }
        rowActions={(row) => (
          <Button
            type="button"
            variant="outline"
            className="min-h-11"
            data-testid={`entity-expand-${entityRowSlug(row)}`}
            onClick={() => setExpanded((current) => (current === row.key ? null : row.key))}
          >
            {expanded === row.key
              ? t("admin.translations.collapse")
              : t("admin.translations.expand")}
          </Button>
        )}
        pagination={
          <DataTablePagination
            testid="data-pagination"
            offset={page * PAGE_SIZE}
            pageSize={PAGE_SIZE}
            total={total}
            onPrevious={() => setPage((current) => Math.max(0, current - 1))}
            onNext={() =>
              setPage((current) => ((current + 1) * PAGE_SIZE < total ? current + 1 : current))
            }
          />
        }
      />
    </div>
  );
}

function dataColumns(
  t: (key: MessageKey) => string,
  rtl: boolean,
): DataTableColumn<EntityTranslationRow>[] {
  return [
    {
      key: "entity",
      header: t("admin.translations.col.entity"),
      priority: "primary",
      width: "w-[30%]",
      cell: (row) => (
        <span className="block truncate text-foreground" title={row.label}>
          {row.label}
        </span>
      ),
    },
    {
      key: "type",
      header: t("admin.translations.col.entityType"),
      priority: "detail",
      width: "w-[14%]",
      cell: (row) => (
        <span className="block truncate text-xs text-muted-foreground">
          {t(ENTITY_LABELS[row.entityType] ?? "admin.translations.entity.category")}
        </span>
      ),
    },
    {
      key: "source",
      header: t("admin.translations.col.source"),
      priority: "secondary",
      width: "w-[22%]",
      cell: (row) => (
        <span className="block truncate text-muted-foreground" title={row.sourceValue ?? undefined}>
          {row.sourceValue ?? "—"}
        </span>
      ),
    },
    {
      key: "value",
      header: t("admin.translations.col.value"),
      priority: "primary",
      width: "w-[22%]",
      cell: (row) => (
        <span
          dir={rtl ? "rtl" : undefined}
          className="block truncate text-foreground"
          title={row.value ?? undefined}
        >
          {row.value ?? "—"}
        </span>
      ),
    },
    {
      key: "status",
      header: t("admin.translations.col.status"),
      priority: "primary",
      width: "w-[12%]",
      cell: (row) => (
        <Badge variant="outline" data-testid={`entity-status-${entityRowSlug(row)}`}>
          {t(STATUS_LABELS[row.status] ?? "admin.translations.status.untranslated")}
        </Badge>
      ),
    },
  ];
}

interface MutationAction {
  (): Promise<void>;
}

function EntityEditor({
  row,
  lang,
  rtl,
  mayUpdate,
  mayApprove,
  mayMachine,
  guard,
}: {
  row: EntityTranslationRow;
  lang: string;
  rtl: boolean;
  mayUpdate: boolean;
  mayApprove: boolean;
  mayMachine: boolean;
  guard: GuardFn;
}) {
  const { t } = useI18n();
  const save = useSaveEntityTranslation(lang);
  const ai = useAiTranslateEntities(lang);
  const statusAction = useEntityTranslationStatusAction(lang);
  const [draft, setDraft] = useState(row.value ?? "");
  const [errorKey, setErrorKey] = useState<MessageKey | null>(null);
  const [errorDetail, setErrorDetail] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  // INC-119b — every marker keys on the ENTITY identity, never a translation id.
  const id = entityRowSlug(row);

  const run = (action: MutationAction) => {
    setSaved(false);
    setErrorKey(null);
    setErrorDetail(null);
    void guard(action)
      .then(() => setSaved(true))
      .catch((failure: unknown) => {
        setErrorKey(translationErrorKey(failure));
        setErrorDetail(serverMessage(failure));
      });
  };

  return (
    <div className="min-w-0 space-y-3" data-testid={`entity-editor-${id}`}>
      <div className="min-w-0 space-y-1">
        <p className="text-xs font-medium text-muted-foreground">
          {t("admin.translations.editor.source")}
        </p>
        <p data-testid={`entity-source-${id}`} className="min-w-0 break-words text-sm">
          {row.sourceValue ?? "—"}
        </p>
      </div>

      <label className="block text-sm font-medium text-foreground" htmlFor={`entity-input-${id}`}>
        {t("admin.translations.editor.label")}
      </label>
      <Textarea
        id={`entity-input-${id}`}
        data-testid={`entity-input-${id}`}
        dir={rtl ? "rtl" : undefined}
        rows={2}
        value={draft}
        onChange={(event) => setDraft(event.target.value)}
      />

      <div className="flex min-w-0 flex-wrap gap-2">
        {mayUpdate ? (
          <Button
            className="min-h-11"
            data-testid={`entity-save-${id}`}
            disabled={save.isPending}
            onClick={() =>
              run(() =>
                save.mutateAsync({
                  type: row.entityType,
                  id: row.entityId,
                  field: row.field,
                  value: draft,
                }),
              )
            }
          >
            {t("admin.translations.editor.save")}
          </Button>
        ) : null}
        {mayMachine ? (
          <Button
            variant="outline"
            className="min-h-11"
            data-testid={`entity-ai-${id}`}
            disabled={ai.isPending || row.sourceValue === null}
            onClick={() =>
              run(async () => {
                const result = await ai.mutateAsync([
                  {
                    key: `${row.entityType}:${row.entityId}`,
                    source: row.sourceValue ?? "",
                    type: row.entityType,
                    id: row.entityId,
                    field: row.field,
                  },
                ]);
                const failure = result.failed[0];
                // F4 — a per-item refusal is an ERROR here, never a quiet no-op.
                if (failure) throw new Error(failure.reason);
              })
            }
          >
            {ai.isPending ? t("admin.translations.ai.pending") : t("admin.translations.ai.row")}
          </Button>
        ) : null}
        {mayApprove ? (
          <>
            <Button
              variant="outline"
              className="min-h-11"
              data-testid={`entity-approve-${id}`}
              disabled={statusAction.isPending}
              onClick={() =>
                run(() =>
                  statusAction.mutateAsync({
                    type: row.entityType,
                    id: row.entityId,
                    field: row.field,
                    action: "approve",
                  }),
                )
              }
            >
              {t("admin.translations.editor.approve")}
            </Button>
            <Button
              variant="outline"
              className="min-h-11"
              data-testid={`entity-clear-${id}`}
              disabled={statusAction.isPending}
              onClick={() =>
                run(() =>
                  statusAction.mutateAsync({
                    type: row.entityType,
                    id: row.entityId,
                    field: row.field,
                    action: "clear",
                  }),
                )
              }
            >
              {t("admin.translations.editor.clear")}
            </Button>
          </>
        ) : null}
      </div>

      {saved ? (
        <p
          role="status"
          data-testid={`entity-saved-${id}`}
          className="text-sm text-muted-foreground"
        >
          {t("admin.translations.editor.saved")}
        </p>
      ) : null}
      {errorKey ? (
        <p role="alert" data-testid={`entity-error-${id}`} className="text-sm text-destructive">
          {t(errorKey)}
          {errorDetail ? <span className="block text-xs opacity-80">{errorDetail}</span> : null}
        </p>
      ) : null}
    </div>
  );
}

export default DataScope;
