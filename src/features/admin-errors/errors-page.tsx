import { ColumnsButton } from "@/components/shell/columns-button";
import { useHiddenColumns, visibleColumns } from "@/components/shell/columns-state";
import {
  DataTable,
  DataTablePagination,
  type DataTableColumn,
} from "@/components/shell/data-table";
import { TableActions } from "@/components/shell/table-actions";
import { TableToolbar } from "@/components/shell/table-toolbar";
import { useKeptPage } from "@/components/shell/use-kept-page";
import { CutText } from "@/components/ui/cut-text";
import { NativeSelect } from "@/components/ui/native-select";
import { useI18n, type MessageKey } from "@/i18n";
import { ERROR_KINDS, type ErrorKind } from "@/lib/error-clean";
import { dateFormatter, numberFormatter } from "@/lib/format";

import { ERROR_WINDOWS, KIND_WORDS, WINDOW_WORDS, type ErrorWindow } from "./error-labels";
import { errorsRefusalKey } from "./errors-refusals";
import type { ErrorGroup, ErrorStats } from "./errors-service";
import { useErrorGroups, useErrorStats } from "./use-errors";

const GROUPS_TABLE = "admin-errors-groups";
const LOCKED = ["message"];

type DayRow = { day: string; total: number } & Record<ErrorKind, number>;

/** The days answer as a row per day (newest first), a count per kind and the day's total. */
export function dayRows(days: ErrorStats["days"]): DayRow[] {
  const byDay = new Map<string, DayRow>();
  for (const entry of days) {
    const row = byDay.get(entry.day) ?? {
      day: entry.day,
      total: 0,
      notice: 0,
      crash: 0,
      unhandled: 0,
      route: 0,
      upstream: 0,
      render: 0,
    };
    row[entry.kind] += entry.count;
    row.total += entry.count;
    byDay.set(entry.day, row);
  }
  return [...byDay.values()].sort((a, b) => b.day.localeCompare(a.day));
}

/** The words a failed read draws: a refusal's own words, else the read's sentence. */
function failedSubject(error: unknown, read: MessageKey): MessageKey {
  const refusal = errorsRefusalKey(error);
  return refusal === "failure.server" ? read : refusal;
}

export function AdminErrorsPage({
  days,
  kind,
  onDays,
  onKind,
}: {
  days: ErrorWindow;
  kind: ErrorKind | null;
  onDays: (days: ErrorWindow) => void;
  onKind: (kind: ErrorKind | null) => void;
}) {
  const { t, language } = useI18n();
  const stats = useErrorStats(days);
  const groups = useErrorGroups(days, kind);
  const [hidden, toggleColumn] = useHiddenColumns(GROUPS_TABLE);
  const { page, setPage, pageSize, setPageSize, pageSizeOptions } = useKeptPage(
    "ethio.admin.errors.groups.pageSize",
  );
  const count = numberFormatter("count", language);
  const dayFmt = dateFormatter("dayNumeric", language, "UTC");
  const timeFmt = dateFormatter("dayTimeNumeric", language);
  const unknown = t("admin.errors.unknown");
  const num = (value: number) => <span className="tabular-nums">{count.format(value)}</span>;
  const loadingState = <p className="text-sm text-muted-foreground">{t("common.loading")}</p>;
  const empty = <p className="text-sm text-muted-foreground">{t("admin.errors.empty")}</p>;
  const statsFailed = (
    <p className="text-sm text-destructive">
      {t(failedSubject(stats.error, "admin.errors.read.stats"))}
    </p>
  );
  const statsTable = {
    loading: stats.isPending,
    loadingState,
    error: stats.error,
    retry: () => void stats.refetch(),
    errorState: statsFailed,
    emptyState: empty,
  };

  const rows = dayRows(stats.data?.days ?? []);
  const present = (key: ErrorKind) => rows.some((row) => row[key] > 0);
  const kindColumn = (key: ErrorKind, column: DataTableColumn<DayRow>) =>
    present(key) ? [column] : [];
  const kindCell = (key: ErrorKind) => ({
    header: t(KIND_WORDS[key]),
    priority: "secondary" as const,
    size: "short" as const,
    align: "end" as const,
    cell: (row: DayRow) => num(row[key]),
  });
  const dayColumns: DataTableColumn<DayRow>[] = [
    {
      key: "day",
      header: t("admin.errors.col.day"),
      priority: "primary",
      size: "date",
      card: "title",
      cell: (row) => <span className="tabular-nums">{dayFmt.format(new Date(row.day))}</span>,
    },
    ...kindColumn("notice", { key: "notice", ...kindCell("notice") }),
    ...kindColumn("crash", { key: "crash", ...kindCell("crash") }),
    ...kindColumn("unhandled", { key: "unhandled", ...kindCell("unhandled") }),
    ...kindColumn("route", { key: "route", ...kindCell("route") }),
    ...kindColumn("upstream", { key: "upstream", ...kindCell("upstream") }),
    ...kindColumn("render", { key: "render", ...kindCell("render") }),
    {
      key: "total",
      header: t("admin.errors.col.total"),
      priority: "primary",
      size: "short",
      align: "end",
      cell: (row) => num(row.total),
    },
  ];

  type PageRow = ErrorStats["pages"][number];
  const pageColumns: DataTableColumn<PageRow>[] = [
    {
      key: "page",
      header: t("admin.errors.col.page"),
      priority: "primary",
      size: "text",
      card: "title",
      cell: (row) => <CutText text={row.path} keep={24} />,
    },
    {
      key: "count",
      header: t("admin.errors.col.count"),
      priority: "primary",
      size: "short",
      align: "end",
      cell: (row) => num(row.count),
    },
  ];

  type BrowserRow = ErrorStats["browsers"][number];
  const browserName = (row: BrowserRow) =>
    row.browser === null ? unknown : `${row.browser} ${row.version ?? unknown}`;
  const browserColumns: DataTableColumn<BrowserRow>[] = [
    {
      key: "browser",
      header: t("admin.errors.col.browser"),
      priority: "primary",
      size: "name",
      card: "title",
      cell: (row) => <CutText text={browserName(row)} keep={16} />,
    },
    {
      key: "count",
      header: t("admin.errors.col.count"),
      priority: "primary",
      size: "short",
      align: "end",
      cell: (row) => num(row.count),
    },
  ];

  type VersionRow = ErrorStats["versions"][number];
  const versionColumns: DataTableColumn<VersionRow>[] = [
    {
      key: "appVersion",
      header: t("admin.errors.col.appVersion"),
      priority: "primary",
      size: "name",
      card: "title",
      cell: (row) => <CutText text={row.appVersion ?? unknown} keep={16} />,
    },
    {
      key: "count",
      header: t("admin.errors.col.count"),
      priority: "primary",
      size: "short",
      align: "end",
      cell: (row) => num(row.count),
    },
  ];

  const allGroupColumns: DataTableColumn<ErrorGroup>[] = [
    {
      key: "kind",
      header: t("admin.errors.col.kind"),
      priority: "primary",
      size: "short",
      card: "meta",
      cell: (row) => t(KIND_WORDS[row.kind]),
    },
    {
      key: "message",
      header: t("admin.errors.col.message"),
      priority: "primary",
      size: "text",
      card: "title",
      cell: (row) => <CutText text={row.shape} keep={24} />,
    },
    {
      key: "code",
      header: t("admin.errors.col.code"),
      priority: "secondary",
      size: "short",
      cell: (row) => <CutText text={row.code ?? unknown} keep={8} />,
    },
    {
      key: "place",
      header: t("admin.errors.col.place"),
      priority: "detail",
      size: "text",
      cell: (row) => <CutText text={row.place ?? unknown} keep={16} />,
    },
    {
      key: "count",
      header: t("admin.errors.col.count"),
      priority: "primary",
      size: "short",
      align: "end",
      card: "meta",
      cell: (row) => num(row.count),
    },
    {
      key: "firstSeen",
      header: t("admin.errors.col.firstSeen"),
      priority: "detail",
      size: "date",
      cell: (row) => (
        <span className="tabular-nums">{timeFmt.format(new Date(row.firstSeen))}</span>
      ),
    },
    {
      key: "lastSeen",
      header: t("admin.errors.col.lastSeen"),
      priority: "secondary",
      size: "date",
      cell: (row) => <span className="tabular-nums">{timeFmt.format(new Date(row.lastSeen))}</span>,
    },
  ];
  const groupColumns = visibleColumns(allGroupColumns, hidden, LOCKED);
  const groupRows = groups.data?.rows ?? [];

  return (
    <div data-testid="admin-section-errors" className="min-w-0 space-y-6">
      <TableActions testid="errors-header" title={t("admin.section.errors.title")} />
      <TableToolbar
        testid="errors-toolbar"
        filters={
          <>
            <NativeSelect
              data-testid="errors-window"
              aria-label={t("admin.errors.window.label")}
              value={String(days)}
              onChange={(event) => {
                const next = ERROR_WINDOWS.find((value) => String(value) === event.target.value);
                if (next !== undefined) {
                  setPage(0);
                  onDays(next);
                }
              }}
            >
              {ERROR_WINDOWS.map((value) => (
                <option key={value} value={String(value)}>
                  {t(WINDOW_WORDS[value])}
                </option>
              ))}
            </NativeSelect>
            <NativeSelect
              data-testid="errors-kind"
              aria-label={t("admin.errors.kind.label")}
              value={kind ?? ""}
              onChange={(event) => {
                setPage(0);
                onKind(ERROR_KINDS.find((value) => value === event.target.value) ?? null);
              }}
            >
              <option value="">{t("admin.errors.kind.all")}</option>
              {ERROR_KINDS.map((value) => (
                <option key={value} value={value}>
                  {t(KIND_WORDS[value])}
                </option>
              ))}
            </NativeSelect>
          </>
        }
        columns={
          <ColumnsButton
            testid="errors-groups-columns"
            columns={allGroupColumns.map((column) => ({
              key: column.key,
              label: String(column.header),
              locked: LOCKED.includes(column.key),
            }))}
            hidden={hidden}
            onToggle={toggleColumn}
          />
        }
      />

      <section className="min-w-0 space-y-3">
        <TableActions testid="errors-days-header" level="h2" title={t("admin.errors.days.title")} />
        <DataTable<DayRow>
          guide={{
            prefix: "admin.errors",
            next: { section: "audit" },
            anchor: "admin-errors-days",
          }}
          columns={dayColumns}
          rows={rows}
          rowKey={(row) => row.day}
          rowTestId={(row) => `errors-day-${row.day}`}
          caption={t("admin.errors.days.title")}
          {...statsTable}
        />
      </section>

      <div className="grid min-w-0 gap-6 lg:grid-cols-2">
        <section className="min-w-0 space-y-3">
          <TableActions
            testid="errors-pages-header"
            level="h2"
            title={t("admin.errors.pages.title")}
          />
          <DataTable<PageRow>
            guide={{
              prefix: "admin.errors",
              next: { section: "audit" },
              anchor: "admin-errors-pages",
            }}
            columns={pageColumns}
            rows={stats.data?.pages ?? []}
            rowKey={(row) => row.path}
            rowTestId={(row) => `errors-page-${row.path}`}
            caption={t("admin.errors.pages.title")}
            {...statsTable}
          />
        </section>
        <section className="min-w-0 space-y-3">
          <TableActions
            testid="errors-browsers-header"
            level="h2"
            title={t("admin.errors.browsers.title")}
          />
          <DataTable<BrowserRow>
            guide={{
              prefix: "admin.errors",
              next: { section: "audit" },
              anchor: "admin-errors-browsers",
            }}
            columns={browserColumns}
            rows={stats.data?.browsers ?? []}
            rowKey={(row) => `${row.browser ?? ""}|${row.version ?? ""}`}
            rowTestId={(row) =>
              `errors-browser-${row.browser ?? "unknown"}-${row.version ?? "unknown"}`
            }
            caption={t("admin.errors.browsers.title")}
            {...statsTable}
          />
        </section>
        <section className="min-w-0 space-y-3">
          <TableActions
            testid="errors-versions-header"
            level="h2"
            title={t("admin.errors.versions.title")}
          />
          <DataTable<VersionRow>
            guide={{
              prefix: "admin.errors",
              next: { section: "audit" },
              anchor: "admin-errors-versions",
            }}
            columns={versionColumns}
            rows={stats.data?.versions ?? []}
            rowKey={(row) => row.appVersion ?? ""}
            rowTestId={(row) => `errors-version-${row.appVersion ?? "unknown"}`}
            caption={t("admin.errors.versions.title")}
            {...statsTable}
          />
        </section>
      </div>

      <section className="min-w-0 space-y-3">
        <TableActions
          testid="errors-groups-header"
          level="h2"
          title={t("admin.errors.groups.title")}
        />
        {groups.data?.more ? (
          <p data-testid="errors-groups-more" className="text-sm text-muted-foreground">
            {t("admin.errors.groups.more")}
          </p>
        ) : null}
        <DataTable<ErrorGroup>
          guide={{
            prefix: "admin.errors",
            next: { section: "audit" },
            anchor: "admin-errors-groups",
          }}
          cardUntil="lg"
          columns={groupColumns}
          rows={groupRows}
          page={page}
          pageSize={pageSize}
          rowKey={(row) => row.group}
          rowTestId={(row) => `errors-group-${row.group}`}
          rowHref={(row) => ({
            to: "/admin/errors/$group",
            params: { group: row.group },
            search: { days, ...(kind === null ? {} : { kind }) },
          })}
          caption={t("admin.errors.groups.title")}
          loading={groups.isPending}
          loadingState={loadingState}
          error={groups.error}
          retry={() => void groups.refetch()}
          errorState={
            <p className="text-sm text-destructive">
              {t(failedSubject(groups.error, "admin.errors.read.groups"))}
            </p>
          }
          emptyState={empty}
          pagination={
            <DataTablePagination
              testid="errors-groups-pagination"
              offset={page * pageSize}
              pageSize={pageSize}
              total={groupRows.length}
              onPrevious={() => setPage((current) => Math.max(0, current - 1))}
              onNext={() =>
                setPage((current) =>
                  (current + 1) * pageSize < groupRows.length ? current + 1 : current,
                )
              }
              onPage={setPage}
              pageSizeOptions={pageSizeOptions}
              onPageSize={setPageSize}
            />
          }
        />
      </section>
    </div>
  );
}
