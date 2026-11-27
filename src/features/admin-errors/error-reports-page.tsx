import { Link } from "@tanstack/react-router";

import { ColumnsButton } from "@/components/shell/columns-button";
import { useHiddenColumns, visibleColumns } from "@/components/shell/columns-state";
import { DataTable, type DataTableColumn } from "@/components/shell/data-table";
import { TableActions } from "@/components/shell/table-actions";
import { TableToolbar } from "@/components/shell/table-toolbar";
import { Button } from "@/components/ui/button";
import { CutText } from "@/components/ui/cut-text";
import { useI18n } from "@/i18n";
import type { ErrorKind } from "@/lib/error-clean";
import { dateFormatter } from "@/lib/format";

import { DEVICE_WORDS, type ErrorWindow } from "./error-labels";
import { isGroupKey, type ErrorOccurrence } from "./errors-service";
import { useErrorOccurrences } from "./use-errors";

const REPORTS_TABLE = "admin-errors-reports";
const LOCKED = ["when"];

type Back = { days: ErrorWindow; kind: ErrorKind | null };

function BackLink({ back }: { back: Back }) {
  const { t } = useI18n();
  return (
    <Button asChild variant="outline" className="min-h-11">
      <Link
        to="/admin/errors"
        search={{ days: back.days, ...(back.kind === null ? {} : { kind: back.kind }) }}
        data-testid="errors-back"
      >
        {t("admin.errors.back")}
      </Link>
    </Button>
  );
}

/** One group's reports. A key not of the doors' shape draws "not found" and reads nothing. */
export function ErrorReportsPage({ group, back }: { group: string; back: Back }) {
  const { t } = useI18n();
  if (!isGroupKey(group))
    return (
      <div data-testid="admin-section-errors" className="min-w-0 space-y-4">
        <TableActions testid="errors-reports-header" title={t("admin.errors.reports.title")}>
          <BackLink back={back} />
        </TableActions>
        <p data-testid="errors-group-not-found" className="text-sm text-muted-foreground">
          {t("admin.errors.group.notFound")}
        </p>
      </div>
    );
  return <Reports group={group} back={back} />;
}

function Reports({ group, back }: { group: string; back: Back }) {
  const { t, language } = useI18n();
  const reports = useErrorOccurrences(group);
  const { query } = reports;
  const [hidden, toggleColumn] = useHiddenColumns(REPORTS_TABLE);
  const timeFmt = dateFormatter("moment", language);
  const unknown = t("admin.errors.unknown");

  const allColumns: DataTableColumn<ErrorOccurrence>[] = [
    {
      key: "when",
      header: t("admin.errors.col.when"),
      priority: "primary",
      size: "date",
      card: "title",
      cell: (row) => <span className="tabular-nums">{timeFmt.format(new Date(row.seenAt))}</span>,
    },
    {
      key: "message",
      header: t("admin.errors.col.message"),
      priority: "primary",
      size: "text",
      cell: (row) => <CutText text={row.message} keep={24} />,
    },
    {
      key: "page",
      header: t("admin.errors.col.page"),
      priority: "secondary",
      size: "text",
      cell: (row) => <CutText text={row.path} keep={16} />,
    },
    {
      key: "browser",
      header: t("admin.errors.col.browser"),
      priority: "secondary",
      size: "name",
      cell: (row) => (
        <CutText
          text={row.browser === null ? unknown : `${row.browser} ${row.browserVersion ?? unknown}`}
          keep={12}
        />
      ),
    },
    {
      key: "device",
      header: t("admin.errors.col.device"),
      priority: "detail",
      size: "short",
      cell: (row) => (row.device === null ? unknown : t(DEVICE_WORDS[row.device])),
    },
    {
      key: "language",
      header: t("admin.errors.col.language"),
      priority: "detail",
      size: "short",
      cell: (row) => <CutText text={row.language ?? unknown} keep={8} />,
    },
    {
      key: "signedIn",
      header: t("admin.errors.col.signedIn"),
      priority: "detail",
      size: "short",
      cell: (row) => (row.signedIn ? t("admin.errors.yes") : t("admin.errors.no")),
    },
    {
      key: "appVersion",
      header: t("admin.errors.col.appVersion"),
      priority: "detail",
      size: "name",
      cell: (row) => <CutText text={row.appVersion ?? unknown} keep={12} />,
    },
  ];
  const columns = visibleColumns(allColumns, hidden, LOCKED);

  return (
    <div data-testid="admin-section-errors" className="min-w-0 space-y-4">
      <TableActions testid="errors-reports-header" title={t("admin.errors.reports.title")}>
        <BackLink back={back} />
      </TableActions>
      <DataTable<ErrorOccurrence>
        guide={{ prefix: "admin.errors.reports", next: { section: "errors" } }}
        cardUntil="lg"
        columns={columns}
        serverPage={{
          rows: query.data?.rows,
          busy: query.isFetching,
          first: !reports.hasPrevious,
          onFirst: reports.onFirst,
        }}
        keyset={{
          hasPrevious: reports.hasPrevious,
          hasNext: reports.hasNext,
          busy: query.isFetching,
          onPrevious: reports.onPrevious,
          onNext: reports.onNext,
        }}
        rowKey={(row) => row.id}
        rowTestId={(row) => `errors-report-${row.id}`}
        caption={t("admin.errors.reports.title")}
        loading={query.isPending}
        loadingState={<p className="text-sm text-muted-foreground">{t("common.loading")}</p>}
        error={query.error}
        retry={() => void query.refetch()}
        errorState={<p className="text-sm text-destructive">{t("admin.errors.read.reports")}</p>}
        emptyState={
          <p className="text-sm text-muted-foreground">{t("admin.errors.reports.empty")}</p>
        }
        toolbar={
          <TableToolbar
            testid="errors-reports-toolbar"
            columns={
              <ColumnsButton
                testid="errors-reports-columns"
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
      />
    </div>
  );
}
