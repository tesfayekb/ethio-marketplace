import { useState } from "react";

import { ChartFrame } from "@/components/shell/chart-frame";
import {
  DataTable,
  DataTablePagination,
  type DataTableColumn,
} from "@/components/shell/data-table";
import { DetailPanel } from "@/components/shell/detail-panel";
import { StatCard, StatGrid } from "@/components/shell/stat-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/i18n";

import type { AuditRow } from "./audit-service";
import { useAuditFacets, useAuditList, useAuditStats } from "./use-audit";

const PAGE_SIZE = 25;

const SELECT_CLASS =
  "h-11 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground";

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
 */
export function AdminAuditPage() {
  const { t, language } = useI18n();
  const [search, setSearch] = useState("");
  const [action, setAction] = useState("all");
  const [entityType, setEntityType] = useState("all");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [page, setPage] = useState(0);
  const [expanded, setExpanded] = useState<string | null>(null);

  const filters = {
    search,
    action,
    entityType,
    from,
    to,
    limit: PAGE_SIZE,
    offset: page * PAGE_SIZE,
  };
  const list = useAuditList(filters);
  const facets = useAuditFacets();
  const stats = useAuditStats(14);

  const rows = list.data?.rows ?? [];
  const total = list.data?.totalCount ?? 0;

  const timeFmt = new Intl.DateTimeFormat(language === "am" ? "am-ET" : "en-GB", {
    dateStyle: "short",
    timeStyle: "short",
  });

  const dayFmt = new Intl.DateTimeFormat(language === "am" ? "am-ET" : "en-GB", {
    day: "numeric",
    month: "short",
  });
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

  const columns: DataTableColumn<AuditRow>[] = [
    {
      key: "time",
      header: t("admin.audit.col.time"),
      priority: "primary",
      width: "w-[18%]",
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
      cell: (row) => (
        <span className="block break-all font-medium text-foreground">{row.action}</span>
      ),
    },
    {
      key: "entity",
      header: t("admin.audit.col.entity"),
      priority: "secondary",
      width: "w-[20%]",
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
      cell: (row) => (
        <span className="block truncate text-xs text-muted-foreground">
          {JSON.stringify(row.meta)}
        </span>
      ),
    },
  ];

  const topAction = stats.data?.topActions[0];

  return (
    <div data-testid="admin-audit" className="min-w-0 space-y-4">
      <h1 className="min-w-0 truncate text-lg font-semibold text-foreground">
        {t("admin.audit.title")}
      </h1>

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

      <DataTable
        columns={columns}
        rows={rows}
        rowKey={(row) => row.id}
        rowTestId={(row) => `audit-row-${row.id}`}
        caption={t("admin.audit.caption")}
        loading={list.isLoading}
        loadingState={<p className="text-sm text-muted-foreground">{t("admin.audit.loading")}</p>}
        error={list.error}
        errorState={<p className="text-sm text-destructive">{t("admin.audit.error")}</p>}
        emptyState={<p className="text-sm text-muted-foreground">{t("admin.audit.empty")}</p>}
        toolbar={
          <div className="grid min-w-0 grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
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
            <select
              data-testid="audit-filter-action"
              aria-label={t("admin.audit.filter.action")}
              className={SELECT_CLASS}
              value={action}
              onChange={(event) => {
                setAction(event.target.value);
                resetPage();
              }}
            >
              <option value="all">{t("admin.audit.filter.all")}</option>
              {(facets.data?.actions ?? []).map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
            <select
              data-testid="audit-filter-entity"
              aria-label={t("admin.audit.filter.entity")}
              className={SELECT_CLASS}
              value={entityType}
              onChange={(event) => {
                setEntityType(event.target.value);
                resetPage();
              }}
            >
              <option value="all">{t("admin.audit.filter.all")}</option>
              {(facets.data?.entityTypes ?? []).map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
            <Input
              type="date"
              data-testid="audit-filter-from"
              aria-label={t("admin.audit.filter.from")}
              value={from}
              onChange={(event) => {
                setFrom(event.target.value);
                resetPage();
              }}
            />
            <Input
              type="date"
              data-testid="audit-filter-to"
              aria-label={t("admin.audit.filter.to")}
              value={to}
              onChange={(event) => {
                setTo(event.target.value);
                resetPage();
              }}
            />
          </div>
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

export default AdminAuditPage;
