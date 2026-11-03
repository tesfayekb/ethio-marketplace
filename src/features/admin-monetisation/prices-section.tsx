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
import { Input } from "@/components/ui/input";
import { TableActionButton, TableActions } from "@/components/shell/table-actions";
import type { GuardFn } from "@/features/auth/mfa/use-step-up";
import { useI18n } from "@/i18n";
import { dateFormatter, numberFormatter } from "@/lib/format";

import { attributionColumns } from "./monetisation-columns";
import type { PriceRow, ProductRow } from "./monetisation-service";
import { PriceDialog } from "./price-dialog";
import { PriceEndDialog } from "./price-end-dialog";
import { useMonetisationNames } from "./use-monetisation-names";

/**
 * P-1b (D288, D304) — PRICES of every product in one table: a row reads
 * "<Product> · <Market> · <Category>" with its amount, its credit cost and its
 * window. Add price is always in the header (the product is picked first in
 * the dialog); a row offers Edit while unused (`used_count = 0`) and live, and
 * End (red) while live. Every cell is the stored row shown as data — nothing
 * here computes a price (CF-PRICE-1).
 */
const LOCKED = ["title", "amount"];

type Dialog =
  | { kind: "none" }
  | { kind: "create"; openedBy: string }
  | { kind: "edit"; id: string; openedBy: string }
  | { kind: "end"; id: string; openedBy: string };

export function PricesSection({
  rows,
  products,
  loading,
  error,
  mayUpdate,
  settling,
  guard,
}: {
  rows: PriceRow[];
  products: ProductRow[];
  loading: boolean;
  error: unknown;
  mayUpdate: boolean;
  settling: boolean;
  guard: GuardFn;
}) {
  const { t, language } = useI18n();
  const { marketName, categoryName, productName } = useMonetisationNames(products);
  const [dialog, setDialog] = useState<Dialog>({ kind: "none" });
  const [search, setSearch] = useState("");
  const date = dateFormatter("day", language);
  const number = numberFormatter("exact", language);
  const nowIso = new Date().toISOString();
  const idOf = (row: PriceRow) => `price-${row.id}`;
  const live = (row: PriceRow) => row.validTo === null || row.validTo > nowIso;
  const titleOf = (row: PriceRow) =>
    `${productName(row.packageKey)} · ${marketName(row.countryCode, "everyMarket")} · ${categoryName(row.categoryId, "everyCategory")}`;
  const needle = search.trim().toLowerCase();
  const found =
    needle === ""
      ? rows
      : rows.filter((row) => `${titleOf(row)} ${row.currency}`.toLowerCase().includes(needle));
  const chosen =
    dialog.kind === "edit" || dialog.kind === "end"
      ? (rows.find((row) => row.id === dialog.id) ?? null)
      : null;

  const columns: DataTableColumn<PriceRow>[] = [
    {
      key: "title",
      header: t("admin.monetisation.col.product"),
      priority: "primary",
      card: "title",
      cell: (row) => (
        <span className="min-w-0 break-words font-medium" data-testid={`${idOf(row)}-title`}>
          {titleOf(row)}
        </span>
      ),
    },
    {
      key: "amount",
      header: t("admin.packages.prices.col.amount"),
      priority: "primary",
      card: "badge",
      cell: (row) => (
        <span className="text-sm tabular-nums" data-testid={`${idOf(row)}-amount`}>
          {row.amount === 0
            ? t("admin.packages.prices.free")
            : `${number.format(row.amount)} ${row.currency}`}
        </span>
      ),
    },
    {
      key: "creditCost",
      header: t("admin.monetisation.col.creditCost"),
      priority: "primary",
      card: "meta",
      cell: (row) => (
        <span className="text-sm tabular-nums" data-testid={`${idOf(row)}-credits`}>
          {row.creditCost}
        </span>
      ),
    },
    {
      key: "from",
      header: t("admin.packages.prices.col.from"),
      priority: "secondary",
      card: "meta",
      cell: (row) => (
        <span className="text-sm" data-testid={`${idOf(row)}-from`}>
          {date.format(new Date(row.validFrom))}
        </span>
      ),
    },
    {
      key: "to",
      header: t("admin.packages.prices.col.to"),
      priority: "secondary",
      card: "meta",
      cell: (row) => (
        <span className="text-sm" data-testid={`${idOf(row)}-to`}>
          {row.validTo === null
            ? t("admin.packages.prices.open")
            : date.format(new Date(row.validTo))}
        </span>
      ),
    },
    {
      key: "used",
      header: t("admin.monetisation.col.used"),
      priority: "secondary",
      card: "meta",
      cell: (row) => (
        <span className="text-sm tabular-nums" data-testid={`${idOf(row)}-used`}>
          {row.usedCount}
        </span>
      ),
    },
    ...attributionColumns<PriceRow>(t, (iso) => date.format(new Date(iso)), idOf),
  ];

  const [hidden, toggleColumn] = useHiddenColumns("admin-monetisation-prices");
  const { page, setPage, pageSize, setPageSize, pageSizeOptions } = useKeptPage(
    "ethio.admin.monetisation.prices.pageSize",
  );
  const shown = visibleColumns(columns, hidden, LOCKED);

  return (
    <>
      <section data-testid="monetisation-prices" className="min-w-0 space-y-3">
        <TableActions
          testid="monetisation-prices-header"
          title={t("admin.monetisation.prices.title")}
        >
          {mayUpdate ? (
            <TableActionButton
              variant="default"
              data-testid="monetisation-price-add"
              disabled={settling}
              onClick={() => setDialog({ kind: "create", openedBy: "header" })}
              icon={<Plus />}
              label={t("admin.monetisation.price.add")}
            />
          ) : null}
        </TableActions>
        <DataTable<PriceRow>
          columns={shown}
          rows={found}
          rowKey={(row) => row.id}
          rowTestId={idOf}
          caption={t("admin.monetisation.prices.title")}
          cardUntil="lg"
          loading={loading}
          loadingState={<p className="text-sm">{t("admin.monetisation.loading")}</p>}
          error={error}
          errorState={
            <p role="alert" className="text-sm text-destructive">
              {t("admin.monetisation.error")}
            </p>
          }
          emptyState={
            <p className="text-sm text-muted-foreground" data-testid="monetisation-prices-empty">
              {t("admin.monetisation.empty.prices")}
            </p>
          }
          toolbar={
            <TableToolbar
              testid="monetisation-prices-toolbar"
              search={
                <Input
                  data-testid="monetisation-prices-search"
                  aria-label={t("admin.monetisation.col.product")}
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value);
                    setPage(0);
                  }}
                />
              }
              columns={
                <ColumnsButton
                  testid="monetisation-prices-columns"
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
          rowActions={(row) =>
            mayUpdate && live(row) ? (
              <RowActions
                testid={`price-actions-${row.id}`}
                name={titleOf(row)}
                edit={
                  row.usedCount === 0
                    ? {
                        label: t("admin.monetisation.price.edit"),
                        disabled: settling,
                        onSelect: () =>
                          setDialog({ kind: "edit", id: row.id, openedBy: "row-click" }),
                      }
                    : undefined
                }
                more={[
                  {
                    key: "end",
                    label: t("admin.monetisation.price.end"),
                    tone: "danger",
                    disabled: settling,
                    onSelect: () => setDialog({ kind: "end", id: row.id, openedBy: "row-menu" }),
                  },
                ]}
              />
            ) : null
          }
          actionsWidth="w-32"
          page={page}
          pageSize={pageSize}
          pagination={
            <DataTablePagination
              testid="monetisation-prices-pagination"
              offset={page * pageSize}
              pageSize={pageSize}
              total={found.length}
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
        <PriceDialog
          row={null}
          products={products}
          guard={guard}
          openedBy={dialog.openedBy}
          onClose={() => setDialog({ kind: "none" })}
        />
      ) : null}
      {chosen !== null && dialog.kind === "edit" ? (
        <PriceDialog
          key={chosen.id}
          row={chosen}
          products={products}
          guard={guard}
          openedBy={dialog.openedBy}
          onClose={() => setDialog({ kind: "none" })}
        />
      ) : null}
      {chosen !== null && dialog.kind === "end" ? (
        <PriceEndDialog
          key={chosen.id}
          row={chosen}
          guard={guard}
          openedBy={dialog.openedBy}
          onClose={() => setDialog({ kind: "none" })}
        />
      ) : null}
    </>
  );
}
