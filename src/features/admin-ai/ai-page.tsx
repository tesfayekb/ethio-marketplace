import { Sparkles } from "lucide-react";
import { useMemo, useState } from "react";

import { ColumnsButton } from "@/components/shell/columns-button";
import { useHiddenColumns, visibleColumns } from "@/components/shell/columns-state";
import {
  DataTable,
  DataTablePagination,
  type DataTableColumn,
} from "@/components/shell/data-table";
import { RowActions } from "@/components/shell/row-actions";
import { TableActions } from "@/components/shell/table-actions";
import { TableToolbar } from "@/components/shell/table-toolbar";
import { TipBadge } from "@/components/shell/tip-badge";
import { useKeptPage } from "@/components/shell/use-kept-page";
import { Input } from "@/components/ui/input";
import { useAdminShell } from "@/features/admin/admin-context";
import { StepUpGate } from "@/features/auth/mfa/step-up-gate";
import { useI18n } from "@/i18n";
import { useSettling } from "@/lib/use-settling";

import { AiEditorDialog } from "./ai-editor";
import { AiSpendDays } from "./ai-spend-days";
import {
  AI_COLUMN_PRIORITIES,
  budgetText,
  countText,
  featureAboutKey,
  featureLabelKey,
  priceText,
  spendText,
  type AiFeatureRow,
} from "./ai-service";
import { ADMIN_AI_KEY, useAiFeatures } from "./use-ai-features";

/**
 * Bundle 13 turn 5 (D158, the operator, 2026-10-13: "per feature an on/off
 * switch, a monthly budget and the spend so far") — ADMIN › SERVICES › AI.
 *
 * Gate tier: `services:view` opens the section (the /admin layout owns it);
 * the one write re-checks `services:manage` AND step-up inside the door (F3),
 * so the hidden Edit below is convenience, never authority.
 *
 * ONE READ, ONE TABLE (the coverage console's convention, on the agreed blocks
 * of D118 / D128): the rows of `admin_ai_features` (seven since bundle 13 turn
 * 12), each with a line of what it does (turn 14), the header, the toolbar
 * (search · Columns), the row's one action (Edit) and the footer with the page
 * size. The alerts at 80 % and 100 % are audit rows until the app has an e-mail
 * sender (DEC-091); the month's level is shown on the row. Below the table, the
 * spend of each of the last 30 days (turn 14, src/features/admin-ai/ai-spend-days.tsx).
 */

const PAGE_SIZE_STORAGE_KEY = "ethio.admin.ai.pageSize";
const TABLE_ID = "admin-ai";
const LOCKED = ["feature"];

type Dialog = { kind: "none" } | { kind: "editor"; feature: string; openedBy: string };

export function AdminAiPage() {
  const { t } = useI18n();
  const settling = useSettling(ADMIN_AI_KEY);
  const { permissions } = useAdminShell();
  const mayManage = permissions.includes("services:manage");
  const query = useAiFeatures();
  const [dialog, setDialog] = useState<Dialog>({ kind: "none" });
  // Bundle 11 C1 — the page and its size kept in this browser, one hook for every table.
  const { page, setPage, pageSize, setPageSize, pageSizeOptions } =
    useKeptPage(PAGE_SIZE_STORAGE_KEY);
  const [hidden, toggleColumn] = useHiddenColumns(TABLE_ID);
  const [search, setSearch] = useState("");

  const nameOf = (row: AiFeatureRow) => {
    const key = featureLabelKey(row.feature);
    return key === null ? row.feature : t(key);
  };
  const all = useMemo(() => query.data ?? [], [query.data]);
  /** The one read is sieved in the browser: by the name shown, or the feature's id. */
  const needle = search.trim().toLowerCase();
  const rows =
    needle === ""
      ? all
      : all.filter(
          (row) =>
            row.feature.toLowerCase().includes(needle) ||
            nameOf(row).toLowerCase().includes(needle),
        );
  const selected =
    dialog.kind === "editor" ? (all.find((row) => row.feature === dialog.feature) ?? null) : null;
  const dateOf = (iso: string | null) => (iso === null || iso === "" ? "—" : iso.slice(0, 10));

  const allColumns: DataTableColumn<AiFeatureRow>[] = [
    {
      key: "feature",
      header: t("admin.ai.col.feature"),
      priority: AI_COLUMN_PRIORITIES.feature,
      card: "title",
      cell: (row) => {
        // Bundle 13 turn 14 — what the feature does and who provides it, under its name.
        const about = featureAboutKey(row.feature);
        return (
          <span className="min-w-0">
            <span
              className="block min-w-0 break-words font-medium"
              data-testid={`ai-${row.feature}-name`}
            >
              {nameOf(row)}
            </span>
            {about === null ? null : (
              <span
                className="block min-w-0 break-words text-xs font-normal text-muted-foreground"
                data-testid={`ai-${row.feature}-about`}
              >
                {t(about)}
              </span>
            )}
          </span>
        );
      },
    },
    {
      key: "state",
      header: t("admin.ai.col.state"),
      priority: AI_COLUMN_PRIORITIES.state,
      card: "badge",
      cell: (row) =>
        row.on ? (
          <TipBadge
            variant="secondary"
            label={t("admin.ai.state.on")}
            tip={t("admin.ai.state.tipOn")}
            testid={`ai-${row.feature}-state`}
          />
        ) : (
          <TipBadge
            variant={row.offReason === "budget" ? "destructive" : "outline"}
            label={t("admin.ai.state.off")}
            tip={t(
              row.offReason === "budget" ? "admin.ai.state.tipBudget" : "admin.ai.state.tipStaff",
            ).replace("{date}", dateOf(row.offAt))}
            testid={`ai-${row.feature}-state`}
          />
        ),
    },
    {
      key: "spend",
      header: t("admin.ai.col.spend"),
      priority: AI_COLUMN_PRIORITIES.spend,
      card: "meta",
      cell: (row) => (
        <span className="flex min-w-0 flex-wrap items-center gap-2">
          <span className="text-sm tabular-nums" data-testid={`ai-${row.feature}-spend`}>
            {row.monthlyBudgetCents === null
              ? t("admin.ai.spend.noBudget").replace("{spent}", spendText(row.monthSpentMicrousd))
              : t("admin.ai.spend.ofBudget")
                  .replace("{spent}", spendText(row.monthSpentMicrousd))
                  .replace("{budget}", budgetText(row.monthlyBudgetCents))}
          </span>
          {row.alertLevel === 0 ? null : (
            <TipBadge
              variant={row.alertLevel === 100 ? "destructive" : "outline"}
              label={t(row.alertLevel === 100 ? "admin.ai.alert.full" : "admin.ai.alert.most")}
              tip={t(row.alertLevel === 100 ? "admin.ai.alert.tipFull" : "admin.ai.alert.tipMost")}
              testid={`ai-${row.feature}-alert`}
            />
          )}
        </span>
      ),
    },
    {
      key: "calls",
      header: t("admin.ai.col.calls"),
      priority: AI_COLUMN_PRIORITIES.calls,
      card: "meta",
      cell: (row) => (
        <span className="text-sm tabular-nums" data-testid={`ai-${row.feature}-calls`}>
          {t("admin.ai.calls.line")
            .replace("{month}", countText(row.monthCalls))
            .replace("{today}", countText(row.todayCalls))}
          {row.unit === "character" ? (
            <span className="block text-muted-foreground">
              {t("admin.ai.calls.characters").replace("{count}", countText(row.monthUnits))}
            </span>
          ) : null}
        </span>
      ),
    },
    {
      key: "price",
      header: t("admin.ai.col.price"),
      priority: AI_COLUMN_PRIORITIES.price,
      card: "meta",
      cell: (row) => (
        <span className="text-sm tabular-nums" data-testid={`ai-${row.feature}-price`}>
          {t(row.unit === "call" ? "admin.ai.price.perCall" : "admin.ai.price.perMillion").replace(
            "{price}",
            priceText(row.unit, row.unitCostMicrousd),
          )}
        </span>
      ),
    },
    {
      key: "updated",
      header: t("admin.ai.col.updated"),
      priority: AI_COLUMN_PRIORITIES.updated,
      card: "foot",
      cell: (row) => <span className="text-sm">{dateOf(row.updatedAt)}</span>,
    },
  ];

  const columns = visibleColumns(allColumns, hidden, LOCKED);

  const rowActions = (row: AiFeatureRow) => (
    <RowActions
      testid={`ai-actions-${row.feature}`}
      name={nameOf(row)}
      edit={
        mayManage
          ? {
              label: t("admin.ai.action.edit"),
              disabled: settling,
              onSelect: () =>
                setDialog({ kind: "editor", feature: row.feature, openedBy: "row-click" }),
            }
          : undefined
      }
    />
  );

  return (
    <StepUpGate>
      {(guard) => (
        <div data-testid="admin-section-ai" className="min-w-0 space-y-4">
          <TableActions testid="ai-header" title={t("admin.section.ai.title")} />
          <p className="text-sm text-muted-foreground" data-testid="ai-note">
            {t("admin.ai.note")}
          </p>
          <DataTable<AiFeatureRow>
            columns={columns}
            rows={rows}
            rowKey={(row) => row.feature}
            rowTestId={(row) => `ai-${row.feature}`}
            caption={t("admin.ai.caption")}
            cardUntil="lg"
            cardLead={() => <Sparkles />}
            loading={query.isLoading}
            loadingState={<p className="text-sm">{t("admin.ai.loading")}</p>}
            error={query.error}
            errorState={
              <p role="alert" className="text-sm text-destructive">
                {t("admin.ai.error")}
              </p>
            }
            emptyState={<p className="text-sm text-muted-foreground">{t("admin.ai.empty")}</p>}
            toolbar={
              <TableToolbar
                testid="ai-toolbar"
                search={
                  <Input
                    data-testid="ai-search"
                    aria-label={t("admin.ai.filter.search")}
                    placeholder={t("admin.ai.searchPlaceholder")}
                    value={search}
                    onChange={(event) => {
                      setSearch(event.target.value);
                      setPage(0);
                    }}
                  />
                }
                columns={
                  <ColumnsButton
                    testid="ai-columns"
                    columns={allColumns.map((column) => ({
                      key: column.key,
                      label: String(column.header),
                      locked: LOCKED.includes(column.key),
                    }))}
                    hidden={hidden}
                    onToggle={toggleColumn}
                  />
                }
              />
            }
            rowActions={rowActions}
            page={page}
            pageSize={pageSize}
            pagination={
              <DataTablePagination
                testid="ai-pagination"
                offset={page * pageSize}
                pageSize={pageSize}
                total={rows.length}
                onPrevious={() => setPage((current) => Math.max(0, current - 1))}
                onNext={() => setPage((current) => current + 1)}
                onPage={setPage}
                pageSizeOptions={pageSizeOptions}
                onPageSize={setPageSize}
              />
            }
          />
          <AiSpendDays />
          {selected !== null && dialog.kind === "editor" ? (
            <AiEditorDialog
              key={selected.feature}
              row={selected}
              name={nameOf(selected)}
              guard={guard}
              openedBy={dialog.openedBy}
              onClose={() => setDialog({ kind: "none" })}
            />
          ) : null}
        </div>
      )}
    </StepUpGate>
  );
}

export default AdminAiPage;
