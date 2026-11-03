import { useState } from "react";

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
import { RowActions } from "@/components/shell/row-actions";
import { TipBadge } from "@/components/shell/tip-badge";
import type { GuardFn } from "@/features/auth/mfa/use-step-up";
import { useI18n } from "@/i18n";
import { dateFormatter } from "@/lib/format";

import { CapsEditorDialog } from "./caps-editor";
import type { CoveragePlanRow } from "./monetisation-service";
import { useCoveragePlans } from "./use-monetisation";

/**
 * P-1b (ruling 1 §3 d) — POSTING CAPS: the free plan's coverage dials (cities,
 * regions, countries, everywhere, photos, ad lifetime, ads at most), the P-1
 * Plans roster and editor without the label key, carried here until P-2 moves
 * them to the levels and the reach. The block shows with `coverage:view`; its
 * one verb (Edit caps) with `coverage:update`; the door is M1a's, unchanged.
 */
const LOCKED = ["plan"];

export function CapsSection({
  mayUpdate,
  settling,
  guard,
}: {
  mayUpdate: boolean;
  settling: boolean;
  guard: GuardFn;
}) {
  const { t, language } = useI18n();
  const query = useCoveragePlans();
  const [editing, setEditing] = useState<{ plan: string; openedBy: string } | null>(null);
  const date = dateFormatter("day", language);
  const rows = query.data ?? [];
  const idOf = (row: CoveragePlanRow) => `caps-${row.plan}`;
  const chosen = editing === null ? null : (rows.find((row) => row.plan === editing.plan) ?? null);

  const count = (
    key: string,
    header: string,
    read: (row: CoveragePlanRow) => number,
  ): DataTableColumn<CoveragePlanRow> => ({
    key,
    header,
    priority: "primary",
    card: "meta",
    cell: (row) => (
      <span className="text-sm tabular-nums" data-testid={`${idOf(row)}-${key}`}>
        {read(row)}
      </span>
    ),
  });

  const columns: DataTableColumn<CoveragePlanRow>[] = [
    {
      key: "plan",
      header: t("admin.coverage.col.plan"),
      priority: "primary",
      card: "title",
      cell: (row) => (
        <span className="min-w-0 break-words font-medium" data-testid={`${idOf(row)}-plan`}>
          {row.plan}
        </span>
      ),
    },
    count("cities", t("admin.coverage.col.cities"), (row) => row.maxCities),
    count("regions", t("admin.coverage.col.regions"), (row) => row.maxRegions),
    count("countries", t("admin.coverage.col.countries"), (row) => row.maxCountries),
    count("photos", t("admin.coverage.col.photos"), (row) => row.maxPhotos),
    count("days", t("admin.coverage.col.days"), (row) => row.defaultDays),
    {
      key: "ads",
      header: t("admin.coverage.col.ads"),
      priority: "primary",
      card: "meta",
      cell: (row) => (
        <span className="text-sm tabular-nums" data-testid={`${idOf(row)}-ads`}>
          {row.maxActiveAds === null ? t("admin.coverage.unlimited") : row.maxActiveAds}
        </span>
      ),
    },
    {
      key: "everywhere",
      header: t("admin.coverage.col.everywhere"),
      priority: "secondary",
      card: "badge",
      cell: (row) => (
        <TipBadge
          variant={row.allowEverywhere ? "secondary" : "outline"}
          label={t(
            row.allowEverywhere ? "admin.coverage.everywhere.yes" : "admin.coverage.everywhere.no",
          )}
          tip={t(
            row.allowEverywhere
              ? "admin.coverage.everywhere.tipYes"
              : "admin.coverage.everywhere.tipNo",
          )}
          testid={`${idOf(row)}-everywhere`}
        />
      ),
    },
    {
      key: "updated",
      header: t("admin.coverage.col.updated"),
      priority: "detail",
      card: "foot",
      cell: (row) => <span className="text-sm">{date.format(new Date(row.updatedAt))}</span>,
    },
  ];

  const [hidden, toggleColumn] = useHiddenColumns("admin-monetisation-caps");
  const { page, setPage, pageSize, setPageSize, pageSizeOptions } = useKeptPage(
    "ethio.admin.monetisation.caps.pageSize",
  );
  const shown = visibleColumns(columns, hidden, LOCKED);

  return (
    <>
      <section data-testid="monetisation-caps" className="min-w-0 space-y-3">
        <TableActions
          testid="monetisation-caps-header"
          title={t("admin.monetisation.caps.title")}
        />
        <p className="text-sm text-muted-foreground" data-testid="monetisation-caps-help">
          {t("admin.monetisation.caps.untilP2")}
        </p>
        <DataTable<CoveragePlanRow>
          columns={shown}
          rows={rows}
          rowKey={(row) => row.plan}
          rowTestId={idOf}
          caption={t("admin.monetisation.caps.title")}
          cardUntil="lg"
          loading={query.isLoading}
          loadingState={<p className="text-sm">{t("admin.monetisation.loading")}</p>}
          error={query.error}
          errorState={
            <p role="alert" className="text-sm text-destructive">
              {t("admin.monetisation.error")}
            </p>
          }
          emptyState={
            <p className="text-sm text-muted-foreground" data-testid="monetisation-caps-empty">
              {t("admin.coverage.empty")}
            </p>
          }
          toolbar={
            <TableToolbar
              testid="monetisation-caps-toolbar"
              columns={
                <ColumnsButton
                  testid="monetisation-caps-columns"
                  columns={columns.map((column) => ({
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
          rowActions={(row) => (
            <RowActions
              testid={`${idOf(row)}-actions`}
              name={row.plan}
              edit={
                mayUpdate
                  ? {
                      label: t("admin.monetisation.caps.edit"),
                      disabled: settling,
                      onSelect: () => setEditing({ plan: row.plan, openedBy: "row-click" }),
                    }
                  : undefined
              }
            />
          )}
          page={page}
          pageSize={pageSize}
          pagination={
            <DataTablePagination
              testid="monetisation-caps-pagination"
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
      </section>
      {chosen !== null && editing !== null ? (
        <CapsEditorDialog
          key={chosen.plan}
          row={chosen}
          guard={guard}
          openedBy={editing.openedBy}
          onClose={() => setEditing(null)}
        />
      ) : null}
    </>
  );
}
