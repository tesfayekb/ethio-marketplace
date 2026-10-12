import { useState, type ReactNode } from "react";

import { ColumnsButton } from "@/components/shell/columns-button";
import { useHiddenColumns, visibleColumns } from "@/components/shell/columns-state";
import {
  DataTable,
  DataTablePagination,
  type DataTableColumn,
} from "@/components/shell/data-table";
import { FilterChips, FiltersButton } from "@/components/shell/filter-chips";
import { FilterChoices } from "@/components/shell/filter-choices";
import { RowActions } from "@/components/shell/row-actions";
import { TableToolbar } from "@/components/shell/table-toolbar";
import { useKeptPage } from "@/components/shell/use-kept-page";
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
  ENTITY_ROWS_KEY,
} from "./use-translations";
import { ownValue } from "@/lib/own-key";
import { useFollowingDraft } from "@/lib/use-following-draft";
import { useSettling } from "@/lib/use-settling";
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
  attribute: "admin.translations.entity.attribute",
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
  search,
  mayUpdate,
  mayApprove,
  mayMachine,
  guard,
}: {
  lang: string;
  rtl: boolean;
  status: string;
  query: string;
  /** Bundle 11 G3e — the page's search box (it drives the URL), drawn in this table's toolbar. */
  search?: ReactNode;
  mayUpdate: boolean;
  mayApprove: boolean;
  /** Already base-guarded by the caller: the base language is never machine-filled. */
  mayMachine: boolean;
  guard: GuardFn;
}) {
  const { t } = useI18n();
  /** Bundle 11 G3e (D128, D132) — the footer's page size, kept in this browser. */
  const paging = useKeptPage("ethio.admin.data.pageSize", 25);
  const { page, setPage, pageSize } = paging;
  const [hidden, toggleColumn] = useHiddenColumns("admin-data");
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
      limit: pageSize,
      offset: page * pageSize,
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
  const allColumns = dataColumns(t, rtl);
  /** Bundle 11 G3e — the Filters panel's status pills; the chosen one is a chip. */
  const chooseStatus = (value: string) => {
    setPage(0);
    setChip(value);
  };
  const chosen = DATA_STATUS_CHIPS.find((entry) => entry.value === activeStatus);
  const chips =
    activeStatus !== "all" && chosen
      ? [{ key: activeStatus, label: t(chosen.labelKey), onRemove: () => chooseStatus("all") }]
      : [];

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

      <div className="flex min-w-0 flex-wrap items-start gap-3">
        {mayMachine ? (
          <AiBulkBar
            lang={lang}
            scope="entity"
            untranslated={langStats?.untranslated ?? 0}
            countState={countState}
            guard={guard}
            filter={query}
          />
        ) : null}
        {mayApprove ? (
          <ApproveAllBar lang={lang} scope="entity" reviewable={reviewable} guard={guard} />
        ) : null}
      </div>

      <DataTable
        columns={visibleColumns(allColumns, hidden, ["entity"])}
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
        toolbar={
          <TableToolbar
            testid="data-toolbar"
            search={search}
            filters={
              <FiltersButton
                testid="data-filters"
                count={chips.length}
                state={activeStatus}
                resultCount={total}
                onClearAll={() => chooseStatus("all")}
              >
                <FilterChoices
                  testid="data-status-filter"
                  label={t("admin.translations.col.status")}
                  value={activeStatus}
                  options={DATA_STATUS_CHIPS.map((entry) => ({
                    value: entry.value,
                    label: `${t(entry.labelKey)} · ${chipCounts[entry.value] ?? 0}`,
                  }))}
                  onChange={chooseStatus}
                />
              </FiltersButton>
            }
            columns={
              <ColumnsButton
                testid="data-columns"
                columns={allColumns.map((column) => ({
                  key: column.key,
                  label: String(column.header),
                  locked: column.key === "entity",
                }))}
                hidden={hidden}
                onToggle={toggleColumn}
              />
            }
            chips={
              <FilterChips
                testid="data-chips"
                chips={chips}
                onClearAll={() => chooseStatus("all")}
              />
            }
          />
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
        /** Bundle 11 G3e (DEC-170) — the row's Edit opens its editor in the row's own box (V2c). */
        rowActions={(row) => (
          <RowActions
            testid={`entity-actions-${entityRowSlug(row)}`}
            name={row.label}
            edit={{
              label:
                expanded === row.key
                  ? t("admin.translations.collapse")
                  : t("admin.translations.expand"),
              onSelect: () => setExpanded((current) => (current === row.key ? null : row.key)),
            }}
          />
        )}
        pagination={
          <DataTablePagination
            testid="data-pagination"
            offset={page * pageSize}
            pageSize={pageSize}
            total={total}
            onPrevious={() => setPage((current) => Math.max(0, current - 1))}
            onNext={() =>
              setPage((current) => ((current + 1) * pageSize < total ? current + 1 : current))
            }
            onPage={setPage}
            pageSizeOptions={paging.pageSizeOptions}
            onPageSize={paging.setPageSize}
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
      card: "title",
      width: "w-[30%]",
      cell: (row) => (
        <span className="block min-w-0">
          <span className="block truncate text-foreground" title={row.label}>
            {row.label}
          </span>
          {/*
            UX-2 item 7 — THE IDENTITY UNDER THE NAME (the attribute library's
            own pattern). Six definitions labelled "Make" differ only by their
            key; six categories only by their slug. A location carries no
            machine identity, so nothing is rendered for it — an absent
            identifier is silence, never a placeholder.
          */}
          {row.identifier ? (
            <span
              data-testid={`entity-identifier-${entityRowSlug(row)}`}
              className="block truncate font-mono text-xs text-muted-foreground"
              title={row.identifier}
            >
              {row.identifier}
            </span>
          ) : null}
        </span>
      ),
    },
    {
      key: "type",
      header: t("admin.translations.col.entityType"),
      priority: "detail",
      card: "sub",
      width: "w-[14%]",
      cell: (row) => (
        <span className="block truncate text-xs text-muted-foreground">
          {t(ownValue(ENTITY_LABELS, row.entityType) ?? "admin.translations.entity.category")}
        </span>
      ),
    },
    {
      key: "source",
      header: t("admin.translations.col.source"),
      priority: "secondary",
      card: "meta",
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
      card: "meta",
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
      card: "badge",
      width: "w-[12%]",
      cell: (row) => (
        <Badge variant="outline" data-testid={`entity-status-${entityRowSlug(row)}`}>
          {t(ownValue(STATUS_LABELS, row.status) ?? "admin.translations.status.untranslated")}
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
  /**
   * INC-558's class (turn G3c) — the box follows the stored text until it is
   * edited (the AI's text), and Save waits while the text is being written or
   * re-read, so it never sends the old text back.
   */
  const [draft, setDraft] = useFollowingDraft(row.value ?? "");
  const settling = useSettling(ENTITY_ROWS_KEY);
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
            disabled={save.isPending || settling}
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
