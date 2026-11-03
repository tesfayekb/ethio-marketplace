import { Plus } from "lucide-react";
import { useState } from "react";

import { ColumnsButton } from "@/components/shell/columns-button";
import { useHiddenColumns, visibleColumns } from "@/components/shell/columns-state";
import {
  DataTable,
  DataTablePagination,
  type DataTableColumn,
} from "@/components/shell/data-table";
import { TableToolbar } from "@/components/shell/table-toolbar";
import { useKeptPage } from "@/components/shell/use-kept-page";
import { RowActions } from "@/components/shell/row-actions";
import { TableActionButton, TableActions } from "@/components/shell/table-actions";
import type { GuardFn } from "@/features/auth/mfa/use-step-up";
import { useI18n } from "@/i18n";
import { dateFormatter } from "@/lib/format";

import { MarketDialog } from "./market-dialog";
import { attributionColumns } from "./monetisation-columns";
import { MONETISATION_ANCHORS } from "./monetisation-order";
import { OnOff } from "./on-off";
import type { MarketRow, ProductRow } from "./monetisation-service";
import { useMonetisationNames } from "./use-monetisation-names";

/**
 * P-1b (D303, D311, D312) — MARKETS: per country (and the default row, "any
 * other country") the free Regular ads, the included reach, the paid-levels
 * switch with its launch bundle and when it went on. One verb per row (Edit);
 * the header adds a country's row.
 */
const LOCKED = ["market"];

type Dialog =
  | { kind: "none" }
  | { kind: "create"; openedBy: string }
  | { kind: "edit"; id: string; openedBy: string };

export function MarketsSection({
  rows,
  products,
  loading,
  error,
  mayUpdate,
  settling,
  guard,
}: {
  rows: MarketRow[];
  products: ProductRow[];
  loading: boolean;
  error: unknown;
  mayUpdate: boolean;
  settling: boolean;
  guard: GuardFn;
}) {
  const { t, language } = useI18n();
  const { marketName, productName } = useMonetisationNames(products);
  const [dialog, setDialog] = useState<Dialog>({ kind: "none" });
  const date = dateFormatter("day", language);
  const idOf = (row: MarketRow) => `market-${row.countryCode ?? "default"}`;
  const editing =
    dialog.kind === "edit" ? (rows.find((row) => row.id === dialog.id) ?? null) : null;

  const columns: DataTableColumn<MarketRow>[] = [
    {
      key: "market",
      header: t("admin.monetisation.col.market"),
      priority: "primary",
      card: "title",
      cell: (row) => (
        <span className="min-w-0 break-words font-medium" data-testid={`${idOf(row)}-name`}>
          {row.countryCode === null
            ? t("admin.monetisation.defaultMarket")
            : marketName(row.countryCode, "countryAny")}
        </span>
      ),
    },
    {
      key: "freeAds",
      header: t("admin.monetisation.col.freeAds"),
      priority: "primary",
      card: "meta",
      cell: (row) => (
        <span className="text-sm tabular-nums" data-testid={`${idOf(row)}-free-ads`}>
          {row.freeRegularAds}
        </span>
      ),
    },
    {
      key: "includedReach",
      header: t("admin.monetisation.col.includedReach"),
      priority: "primary",
      card: "sub",
      cell: (row) => (
        <span className="text-sm" data-testid={`${idOf(row)}-reach`}>
          {productName(row.includedReach)}
        </span>
      ),
    },
    {
      key: "paidLevels",
      header: t("admin.monetisation.col.paidLevels"),
      priority: "primary",
      card: "badge",
      cell: (row) => <OnOff value={row.paidLevels} testid={`${idOf(row)}-paid-levels`} t={t} />,
    },
    {
      key: "launch",
      header: t("admin.monetisation.col.launch"),
      priority: "secondary",
      card: "meta",
      cell: (row) => (
        <span className="text-sm tabular-nums" data-testid={`${idOf(row)}-launch`}>
          {row.launchCredits === null || row.launchDays === null
            ? ""
            : `${row.launchCredits} · ${row.launchDays}`}
        </span>
      ),
    },
    {
      key: "since",
      header: t("admin.monetisation.col.since"),
      priority: "secondary",
      card: "meta",
      cell: (row) => (
        <span className="text-sm" data-testid={`${idOf(row)}-since`}>
          {row.paidLevelsSince === null ? "" : date.format(new Date(row.paidLevelsSince))}
        </span>
      ),
    },
    ...attributionColumns<MarketRow>(t, (iso) => date.format(new Date(iso)), idOf),
  ];

  const [hidden, toggleColumn] = useHiddenColumns("admin-monetisation-markets");
  const { page, setPage, pageSize, setPageSize, pageSizeOptions } = useKeptPage(
    "ethio.admin.monetisation.markets.pageSize",
  );
  const shown = visibleColumns(columns, hidden, LOCKED);

  return (
    <>
      <section data-testid="monetisation-markets" className="min-w-0 space-y-3">
        <TableActions
          testid="monetisation-markets-header"
          title={t("admin.monetisation.markets.title")}
          level="h2"
        >
          {mayUpdate ? (
            <TableActionButton
              variant="default"
              data-testid="monetisation-market-add"
              disabled={settling}
              onClick={() => setDialog({ kind: "create", openedBy: "header" })}
              icon={<Plus />}
              label={t("admin.monetisation.market.add")}
            />
          ) : null}
        </TableActions>
        <DataTable<MarketRow>
          columns={shown}
          rows={rows}
          rowKey={(row) => row.id}
          rowTestId={idOf}
          caption={t("admin.monetisation.markets.title")}
          cardUntil="lg"
          guide={{
            prefix: "admin.monetisation.markets",
            anchor: MONETISATION_ANCHORS.markets,
            next: { section: "monetisation", block: MONETISATION_ANCHORS.level },
          }}
          loading={loading}
          loadingState={<p className="text-sm">{t("admin.monetisation.loading")}</p>}
          error={error}
          errorState={
            <p role="alert" className="text-sm text-destructive">
              {t("admin.monetisation.error")}
            </p>
          }
          emptyState={
            <p className="text-sm text-muted-foreground" data-testid="monetisation-markets-empty">
              {t("admin.monetisation.empty.markets")}
            </p>
          }
          toolbar={
            <TableToolbar
              testid="monetisation-markets-toolbar"
              columns={
                <ColumnsButton
                  testid="monetisation-markets-columns"
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
              testid={`market-actions-${row.countryCode ?? "default"}`}
              name={row.countryCode ?? t("admin.monetisation.defaultMarket")}
              edit={
                mayUpdate
                  ? {
                      label: t("admin.monetisation.market.edit"),
                      disabled: settling,
                      onSelect: () =>
                        setDialog({ kind: "edit", id: row.id, openedBy: "row-click" }),
                    }
                  : undefined
              }
            />
          )}
          page={page}
          pageSize={pageSize}
          pagination={
            <DataTablePagination
              testid="monetisation-markets-pagination"
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
      {dialog.kind === "create" ? (
        <MarketDialog
          row={null}
          products={products}
          taken={rows.map((row) => row.countryCode)}
          guard={guard}
          openedBy={dialog.openedBy}
          onClose={() => setDialog({ kind: "none" })}
        />
      ) : null}
      {editing !== null && dialog.kind === "edit" ? (
        <MarketDialog
          key={editing.id}
          row={editing}
          products={products}
          taken={[]}
          guard={guard}
          openedBy={dialog.openedBy}
          onClose={() => setDialog({ kind: "none" })}
        />
      ) : null}
    </>
  );
}
