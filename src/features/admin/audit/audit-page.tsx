import { History } from "lucide-react";
import { useState } from "react";

import { ChartFrame } from "@/components/shell/chart-frame";
import { ColumnsButton } from "@/components/shell/columns-button";
import { todayIso } from "@/components/shell/date-day";
import { DateField } from "@/components/shell/date-field";
import { useHiddenColumns, visibleColumns } from "@/components/shell/columns-state";
import {
  DataTable,
  DataTablePagination,
  type DataTableColumn,
} from "@/components/shell/data-table";
import { DetailPanel } from "@/components/shell/detail-panel";
import { FilterChips, FiltersButton } from "@/components/shell/filter-chips";
import { FilterChoices } from "@/components/shell/filter-choices";
import { StatCard, StatGrid } from "@/components/shell/stat-card";
import { TableActions } from "@/components/shell/table-actions";
import { TableToolbar } from "@/components/shell/table-toolbar";
import { useKeptPage } from "@/components/shell/use-kept-page";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/i18n";

import type { AuditRow } from "./audit-service";
import { useAuditFacets, useAuditList, useAuditStats } from "./use-audit";
import { dateFormatter } from "@/lib/format";

const TABLE_ID = "admin-audit";
const LOCKED = ["action"];
const PAGE_SIZE_STORAGE_KEY = "ethio.admin.audit.pageSize";

/**
 * U3b (INC-093) — SPARKLINE. A dependency-free 14-day trend drawn inside the
 * bounded ChartFrame: bars normalized to the window max, a 2px baseline tick
 * for zero-days (never empty space), and one accessible label per bar. The
 * stat tiles carry the numbers; this is shape only.
 */
function DayBars({
  size,
  days,
  labelFor,
}: {
  size: { width: number; height: number };
  days: { day: string; count: number }[];
  labelFor: (day: string, count: number) => string;
}) {
  const max = Math.max(1, ...days.map((entry) => entry.count));
  const gap = 3;
  const baseline = 2;
  const barWidth =
    days.length > 0 ? Math.max(2, (size.width - gap * days.length) / days.length) : 0;
  return (
    <svg
      data-testid="audit-chart-svg"
      width={size.width}
      height={size.height}
      role="img"
      className="max-w-full"
    >
      {days.map((entry, index) => {
        const scaled = Math.round((entry.count / max) * (size.height - baseline));
        const barHeight = Math.max(scaled, baseline);
        const label = labelFor(entry.day, entry.count);
        return (
          <rect
            key={entry.day}
            x={index * (barWidth + gap)}
            y={size.height - barHeight}
            width={barWidth}
            height={barHeight}
            rx={1}
            aria-label={label}
            className={entry.count > 0 ? "fill-primary" : "fill-muted-foreground/40"}
          >
            <title>{label}</title>
          </rect>
        );
      })}
    </svg>
  );
}

/**
 * U3 — THE AUDIT & SECURITY PAGE.
 *
 * Gate tier: audit_logs:view (moderator and up). The /admin layout owns the
 * panel gate; each RPC re-checks the permission server-side (law F3), so a
 * user without it sees the section's refusal, never a blank table.
 *
 * Bundle 11 G2b (D118, D128, D132) — on the agreed blocks and the agreed look:
 * the page's heading in the header (no header action: the log is read, never
 * written here); the figures and the chart under it; the toolbar (search ·
 * Filters with the action and the entity type as pills and the From and To
 * dates · Columns, the chips under it); one card per event below md (the
 * action, the actor under it, Time and Entity as facts, Details in its footer,
 * the details inside the card when open); the footer's range, page size (kept
 * in this browser) and pages. The server pages the log (`admin_list_audit`).
 */
export function AdminAuditPage() {
  const { t, language } = useI18n();
  const [search, setSearch] = useState("");
  const [action, setAction] = useState("");
  const [entityType, setEntityType] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  // Bundle 11 C1 — the page and its size kept in this browser, one hook for every table.
  const { page, setPage, pageSize, setPageSize, pageSizeOptions } =
    useKeptPage(PAGE_SIZE_STORAGE_KEY);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [hidden, toggleColumn] = useHiddenColumns(TABLE_ID);

  const filters = {
    search,
    action: action === "" ? "all" : action,
    entityType: entityType === "" ? "all" : entityType,
    from,
    to,
    limit: pageSize,
    offset: page * pageSize,
  };
  const list = useAuditList(filters);
  const facets = useAuditFacets();
  const stats = useAuditStats(14);

  const rows = list.data?.rows ?? [];
  const total = list.data?.totalCount ?? 0;

  const timeFmt = dateFormatter("dayTimeNumeric", language);

  const dayFmt = dateFormatter("dayMonth", language);
  const days = stats.data?.days ?? [];
  const barLabel = (day: string, count: number) =>
    t("admin.audit.chart.bar")
      .replace("{date}", dayFmt.format(new Date(day)))
      .replace("{count}", String(count));
  // Sparse axis labels: first, last, and weekly ticks — never one per bar.
  const dayTicks = days.map((entry, index) =>
    index === 0 || index === days.length - 1 || index % 7 === 0
      ? dayFmt.format(new Date(entry.day))
      : null,
  );

  const resetPage = () => setPage(0);
  // INC-548 — the log holds no future events, so no day after today is offered.
  const today = todayIso();
  const allColumns: DataTableColumn<AuditRow>[] = [
    {
      key: "time",
      header: t("admin.audit.col.time"),
      priority: "primary",
      width: "w-[18%]",
      card: "meta",
      cell: (row) => (
        <span className="block truncate tabular-nums text-muted-foreground">
          {timeFmt.format(new Date(row.createdAt))}
        </span>
      ),
    },
    {
      key: "actor",
      header: t("admin.audit.col.actor"),
      priority: "primary",
      width: "w-[20%]",
      card: "sub",
      cell: (row) => (
        <span className="block truncate text-foreground" title={row.actorName ?? undefined}>
          {row.actorName ?? t("admin.audit.system")}
        </span>
      ),
    },
    {
      key: "action",
      header: t("admin.audit.col.action"),
      priority: "primary",
      width: "w-[22%]",
      card: "title",
      cell: (row) => (
        <span className="block break-all font-medium text-foreground">{row.action}</span>
      ),
    },
    {
      key: "entity",
      header: t("admin.audit.col.entity"),
      priority: "secondary",
      width: "w-[20%]",
      card: "meta",
      cell: (row) => (
        <span className="block break-all text-muted-foreground">
          {row.entityType}
          {row.entityId ? ` · ${row.entityId.slice(0, 8)}` : ""}
        </span>
      ),
    },
    {
      key: "meta",
      header: t("admin.audit.col.meta"),
      priority: "detail",
      width: "w-[20%]",
      // The card's Details opens every pair; the raw line stays in the table.
      card: "hide",
      cell: (row) => (
        <span className="block truncate text-xs text-muted-foreground">
          {JSON.stringify(row.meta)}
        </span>
      ),
    },
  ];
  const columns = visibleColumns(allColumns, hidden, LOCKED);

  const chips = [
    ...(action === ""
      ? []
      : [{ key: "action", label: action, onRemove: () => (setAction(""), resetPage()) }]),
    ...(entityType === ""
      ? []
      : [
          {
            key: "entity",
            label: entityType,
            onRemove: () => (setEntityType(""), resetPage()),
          },
        ]),
    ...(from === ""
      ? []
      : [
          {
            key: "from",
            label: `${t("admin.audit.filter.from")} ${from}`,
            onRemove: () => (setFrom(""), resetPage()),
          },
        ]),
    ...(to === ""
      ? []
      : [
          {
            key: "to",
            label: `${t("admin.audit.filter.to")} ${to}`,
            onRemove: () => (setTo(""), resetPage()),
          },
        ]),
  ];
  const clearAll = () => {
    setAction("");
    setEntityType("");
    setFrom("");
    setTo("");
    resetPage();
  };

  const topAction = stats.data?.topActions[0];

  return (
    <div data-testid="admin-audit" className="min-w-0 space-y-4">
      <TableActions testid="audit-header" title={t("admin.audit.title")} />

      <StatGrid testid="audit-stats">
        <StatCard
          testid="audit-stat-24h"
          loading={stats.isLoading}
          label={t("admin.audit.stat.events24h")}
          value={stats.data?.count24h ?? 0}
        />
        <StatCard
          testid="audit-stat-7d"
          loading={stats.isLoading}
          label={t("admin.audit.stat.events7d")}
          value={stats.data?.count7d ?? 0}
        />
        <StatCard
          testid="audit-stat-impersonations"
          loading={stats.isLoading}
          label={t("admin.audit.stat.activeImpersonations")}
          value={stats.data?.activeImpersonations ?? 0}
        />
        <StatCard
          testid="audit-stat-top-action"
          loading={stats.isLoading}
          label={t("admin.audit.stat.topAction")}
          value={topAction?.action ?? "—"}
          hint={topAction ? String(topAction.count) : undefined}
        />
      </StatGrid>

      <ChartFrame
        testid="audit-chart"
        variant="sparkline"
        title={t("admin.audit.chart.title")}
        description={t("admin.audit.chart.description")}
        loading={stats.isLoading}
        error={stats.error}
        empty={days.length === 0}
        footer={
          <div data-testid="audit-chart-labels" className="flex min-w-0 justify-between gap-2">
            {dayTicks
              .map((label, index) => ({ label, index }))
              .filter((tick) => tick.label !== null)
              .map((tick) => (
                <span key={tick.index} className="truncate tabular-nums">
                  {tick.label}
                </span>
              ))}
          </div>
        }
      >
        {(size) => <DayBars size={size} days={days} labelFor={barLabel} />}
      </ChartFrame>

      <DataTable<AuditRow>
        columns={columns}
        rows={rows}
        rowKey={(row) => row.id}
        rowTestId={(row) => `audit-row-${row.id}`}
        caption={t("admin.audit.caption")}
        cardLead={() => <History />}
        loading={list.isLoading}
        loadingState={<p className="text-sm text-muted-foreground">{t("admin.audit.loading")}</p>}
        error={list.error}
        errorState={<p className="text-sm text-destructive">{t("admin.audit.error")}</p>}
        emptyState={<p className="text-sm text-muted-foreground">{t("admin.audit.empty")}</p>}
        toolbar={
          <TableToolbar
            testid="audit-toolbar"
            search={
              <Input
                data-testid="audit-search"
                value={search}
                placeholder={t("admin.audit.filter.actor")}
                aria-label={t("admin.audit.filter.actor")}
                onChange={(event) => {
                  setSearch(event.target.value);
                  resetPage();
                }}
              />
            }
            filters={
              <FiltersButton
                testid="audit-filters"
                count={chips.length}
                state={`${action}|${entityType}|${from}|${to}`}
                resultCount={total > 10000 ? undefined : total}
                onClearAll={clearAll}
              >
                <FilterChoices
                  testid="audit-filter-action"
                  label={t("admin.audit.filter.action")}
                  value={action}
                  onChange={(value) => {
                    setAction(value);
                    resetPage();
                  }}
                  options={[
                    { value: "", label: t("admin.audit.filter.all") },
                    ...(facets.data?.actions ?? []).map((value) => ({ value, label: value })),
                  ]}
                />
                <FilterChoices
                  testid="audit-filter-entity"
                  label={t("admin.audit.filter.entity")}
                  value={entityType}
                  onChange={(value) => {
                    setEntityType(value);
                    resetPage();
                  }}
                  options={[
                    { value: "", label: t("admin.audit.filter.all") },
                    ...(facets.data?.entityTypes ?? []).map((value) => ({ value, label: value })),
                  ]}
                />
                {/* The dates are picked inside the sheet, which a focus change
                    never closes (INC-543). INC-548 — From is never after To or
                    today; To is never before From or after today. INC-549 —
                    the app's own calendar: days outside the bounds are greyed
                    and cannot be chosen, and the month stops at the bounds. */}
                <div className="grid min-w-0 grid-cols-1 gap-3">
                  <div className="flex min-w-0 flex-col gap-2">
                    <label
                      htmlFor="audit-filter-from"
                      className="text-sm font-semibold text-foreground"
                    >
                      {t("admin.audit.filter.from")}
                    </label>
                    <DateField
                      id="audit-filter-from"
                      testid="audit-filter-from"
                      value={from}
                      max={to !== "" && to < today ? to : today}
                      onChange={(next) => {
                        setFrom(next);
                        resetPage();
                      }}
                    />
                  </div>
                  <div className="flex min-w-0 flex-col gap-2">
                    <label
                      htmlFor="audit-filter-to"
                      className="text-sm font-semibold text-foreground"
                    >
                      {t("admin.audit.filter.to")}
                    </label>
                    <DateField
                      id="audit-filter-to"
                      testid="audit-filter-to"
                      value={to}
                      min={from !== "" ? from : undefined}
                      max={today}
                      onChange={(next) => {
                        setTo(next);
                        resetPage();
                      }}
                    />
                  </div>
                </div>
              </FiltersButton>
            }
            columns={
              <ColumnsButton
                testid="audit-columns"
                columns={allColumns.map((column) => ({
                  key: column.key,
                  label: String(column.header),
                  locked: LOCKED.includes(column.key),
                }))}
                hidden={hidden}
                onToggle={toggleColumn}
              />
            }
            chips={<FilterChips testid="audit-chips" chips={chips} onClearAll={clearAll} />}
          />
        }
        expandedRow={(row) =>
          row.id === expanded ? (
            <DetailPanel
              testid="audit-detail"
              title={t("admin.audit.detailTitle")}
              pairs={[
                { label: t("admin.audit.col.action"), value: row.action },
                {
                  label: t("admin.audit.col.actor"),
                  value: row.actorName ?? t("admin.audit.system"),
                },
                {
                  label: t("admin.audit.col.entity"),
                  value: `${row.entityType}${row.entityId ? ` · ${row.entityId}` : ""}`,
                },
                ...Object.entries(row.meta).map(([key, value]) => ({
                  label: key,
                  value: typeof value === "string" ? value : JSON.stringify(value),
                })),
              ]}
            />
          ) : null
        }
        rowActions={(row) => (
          <Button
            type="button"
            variant="outline"
            className="min-h-11"
            data-testid={`audit-expand-${row.id}`}
            onClick={() => setExpanded((current) => (current === row.id ? null : row.id))}
          >
            {expanded === row.id ? t("admin.audit.collapse") : t("admin.audit.expand")}
          </Button>
        )}
        pagination={
          <DataTablePagination
            testid="audit-pagination"
            offset={page * pageSize}
            pageSize={pageSize}
            total={total}
            /* INC-129 — admin_list_audit caps the count at 10,001; the raw
               boundary number is never rendered as truth (C7 totalLabel). */
            totalLabel={total > 10000 ? t("admin.audit.total.capped") : undefined}
            onPrevious={() => setPage((current) => Math.max(0, current - 1))}
            onNext={() =>
              setPage((current) => ((current + 1) * pageSize < total ? current + 1 : current))
            }
            onPage={setPage}
            pageSizeOptions={pageSizeOptions}
            onPageSize={setPageSize}
          />
        }
      />
    </div>
  );
}

export default AdminAuditPage;
