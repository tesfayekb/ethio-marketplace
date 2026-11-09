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
import { dateFormatter, moneyText } from "@/lib/format";

import { attributionColumns } from "./monetisation-columns";
import { productAnchor } from "./monetisation-order";
import type { PriceRow, ProductRow } from "./monetisation-service";
import { PriceDialog } from "./price-dialog";
import { PriceEndDialog } from "./price-end-dialog";
import { useMonetisationNames } from "./use-monetisation-names";

/**
 * P-1c (D313; P-1b's D288, D304 rows) — ONE PRODUCT'S PRICES, inside the
 * product's expanded row: a row reads "<Market> · <Category>" with its amount,
 * its credit cost and its window. Add price is in the header (the product is
 * this one, fixed in the dialog); a row offers Edit while unused
 * (`used_count = 0`) and live, and End (red) while live. The search sieves by
 * market, category and currency. Every cell is the stored row shown as data —
 * nothing here computes a price (CF-PRICE-1). Frame id `product-<key>-prices`.
 */
const LOCKED = ["scope", "amount"];

type Dialog =
  | { kind: "none" }
  | { kind: "create"; openedBy: string }
  | { kind: "edit"; id: string; openedBy: string }
  | { kind: "end"; id: string; openedBy: string };

export function ProductPricesTable({
  product,
  rows,
  products,
  mayUpdate,
  settling,
  guard,
}: {
  product: ProductRow;
  /** This product's rows only (the page filters the one read). */
  rows: PriceRow[];
  products: ProductRow[];
  mayUpdate: boolean;
  settling: boolean;
  guard: GuardFn;
}) {
  const { t, language } = useI18n();
  const { marketName, categoryName } = useMonetisationNames(products);
  const [dialog, setDialog] = useState<Dialog>({ kind: "none" });
  const [search, setSearch] = useState("");
  const date = dateFormatter("day", language);
  const nowIso = new Date().toISOString();
  const anchor = productAnchor(product.key, "prices");
  const idOf = (row: PriceRow) => `price-${row.id}`;
  const live = (row: PriceRow) => row.validTo === null || row.validTo > nowIso;
  const scopeOf = (row: PriceRow) =>
    `${marketName(row.countryCode, "everyMarket")} · ${categoryName(row.categoryId, "everyCategory")}`;
  const needle = search.trim().toLowerCase();
  const found =
    needle === ""
      ? rows
      : rows.filter((row) => `${scopeOf(row)} ${row.currency}`.toLowerCase().includes(needle));
  const chosen =
    dialog.kind === "edit" || dialog.kind === "end"
      ? (rows.find((row) => row.id === dialog.id) ?? null)
      : null;

  const columns: DataTableColumn<PriceRow>[] = [
    {
      key: "scope",
      header: t("admin.monetisation.col.scope"),
      priority: "primary",
      card: "title",
      cell: (row) => (
        <span className="min-w-0 break-words font-medium" data-testid={`${idOf(row)}-title`}>
          {scopeOf(row)}
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
            : moneyText(row.amount, row.currency, language, "exact")}
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

  const [hidden, toggleColumn] = useHiddenColumns("admin-monetisation-product-prices");
  const { page, setPage, pageSize, setPageSize, pageSizeOptions } = useKeptPage(
    "ethio.admin.monetisation.productPrices.pageSize",
  );
  const shown = visibleColumns(columns, hidden, LOCKED);

  return (
    <>
      <section data-testid={anchor} className="min-w-0 space-y-3">
        <TableActions
          testid={`${anchor}-header`}
          title={t("admin.monetisation.prices.title")}
          level="h2"
        >
          {mayUpdate ? (
            <TableActionButton
              variant="default"
              data-testid={`product-${product.key}-price-add`}
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
          guide={{
            prefix: "admin.monetisation.productPrices",
            anchor,
            next: { section: "monetisation", block: "admin-monetisation-markets" },
          }}
          emptyState={
            <p className="text-sm text-muted-foreground" data-testid={`${anchor}-empty`}>
              {t("admin.monetisation.empty.prices")}
            </p>
          }
          toolbar={
            <TableToolbar
              testid={`${anchor}-toolbar`}
              search={
                <Input
                  data-testid={`${anchor}-search`}
                  aria-label={t("admin.monetisation.prices.searchLabel")}
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value);
                    setPage(0);
                  }}
                />
              }
              columns={
                <ColumnsButton
                  testid={`${anchor}-columns`}
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
                name={scopeOf(row)}
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
              testid={`${anchor}-pagination`}
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
          fixedProduct={product.key}
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
          fixedProduct={product.key}
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

export default ProductPricesTable;
