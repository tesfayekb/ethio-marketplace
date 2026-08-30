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

import {
  serverMessage,
  translationErrorKey,
  type EntityTranslationRow,
} from "./translations-service";
import {
  useEntityTranslations,
  useEntityTranslationStatusAction,
  useSaveEntityTranslation,
} from "./use-translations";

const PAGE_SIZE = 25;

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
 * NO AI control: entity machine translation is deferred and rides the REQ-004
 * engine — the helper text says so rather than hiding the absence.
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
  guard,
}: {
  lang: string;
  rtl: boolean;
  status: string;
  query: string;
  mayUpdate: boolean;
  mayApprove: boolean;
  guard: GuardFn;
}) {
  const { t } = useI18n();
  const [page, setPage] = useState(0);
  const [expanded, setExpanded] = useState<string | null>(null);

  const list = useEntityTranslations(
    {
      lang,
      status: status === "flagged" ? "all" : status,
      search: query,
      limit: PAGE_SIZE,
      offset: page * PAGE_SIZE,
    },
    true,
  );
  // Two 1-row probes give an honest denominator/numerator without a new RPC.
  const totalProbe = useEntityTranslations({ lang, status: "all", limit: 1 }, true);
  const approvedProbe = useEntityTranslations({ lang, status: "approved", limit: 1 }, true);

  const rows = list.data?.rows ?? [];
  const total = list.data?.totalCount ?? 0;

  return (
    <div className="min-w-0 space-y-4" data-testid="admin-translations-data">
      <p data-testid="data-coverage" className="text-sm text-muted-foreground">
        {t("admin.translations.data.coverage")
          .replace("{approved}", String(approvedProbe.data?.totalCount ?? 0))
          .replace("{total}", String(totalProbe.data?.totalCount ?? 0))}
      </p>
      <p data-testid="data-ai-deferred" className="text-sm text-muted-foreground">
        {t("admin.translations.data.aiDeferred")}
      </p>

      <DataTable
        columns={dataColumns(t, rtl)}
        rows={rows}
        rowKey={(row) => row.entityId}
        rowTestId={(row) => `entity-row-${row.entityId}`}
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
          row.entityId === expanded ? (
            <EntityEditor
              row={row}
              lang={lang}
              rtl={rtl}
              mayUpdate={mayUpdate}
              mayApprove={mayApprove}
              guard={guard}
            />
          ) : null
        }
        rowActions={(row) => (
          <Button
            type="button"
            variant="outline"
            className="min-h-11"
            data-testid={`entity-expand-${row.entityId}`}
            onClick={() =>
              setExpanded((current) => (current === row.entityId ? null : row.entityId))
            }
          >
            {expanded === row.entityId
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
        <Badge variant="outline" data-testid={`entity-status-${row.entityId}`}>
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
  guard,
}: {
  row: EntityTranslationRow;
  lang: string;
  rtl: boolean;
  mayUpdate: boolean;
  mayApprove: boolean;
  guard: GuardFn;
}) {
  const { t } = useI18n();
  const save = useSaveEntityTranslation(lang);
  const statusAction = useEntityTranslationStatusAction(lang);
  const [draft, setDraft] = useState(row.value ?? "");
  const [errorKey, setErrorKey] = useState<MessageKey | null>(null);
  const [errorDetail, setErrorDetail] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const id = row.entityId;

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
