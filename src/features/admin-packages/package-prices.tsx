import { Plus } from "lucide-react";
import { useState } from "react";

import { useHiddenColumns, visibleColumns } from "@/components/shell/columns-state";
import { ColumnsButton } from "@/components/shell/columns-button";
import {
  DataTable,
  DataTablePagination,
  type DataTableColumn,
} from "@/components/shell/data-table";
import { FilterChips, FiltersButton } from "@/components/shell/filter-chips";
import { FilterChoices } from "@/components/shell/filter-choices";
import { useOpenMarkets } from "@/components/shell/location-data";
import { RowActions } from "@/components/shell/row-actions";
import { TableActionButton, TableActions } from "@/components/shell/table-actions";
import { TableToolbar } from "@/components/shell/table-toolbar";
import { useKeptPage } from "@/components/shell/use-kept-page";
import { useCategoryTree } from "@/features/categories/category-tree";
import type { GuardFn } from "@/features/auth/mfa/use-step-up";
import { useI18n } from "@/i18n";
import { entityName } from "@/i18n/entity";
import { dateFormatter, numberFormatter } from "@/lib/format";
import { useSettling } from "@/lib/use-settling";

import { PriceCreateDialog } from "./price-create-dialog";
import { PriceEndDialog } from "./price-end-dialog";
import { PRICE_COLUMN_PRIORITIES, type PackageRow, type PriceRow } from "./packages-service";
import { ADMIN_PACKAGES_KEY, usePackagePrices } from "./use-packages";

/**
 * P-1 (D280) — THE PRICES of one package, under the packages table (Admin ›
 * AI's two-table shape): the package is chosen in Filters and shown as a chip;
 * each row is a scope (market × category) with its amount and window; the
 * header holds Add price; a live row's menu holds End price (red). Every cell
 * is the stored row shown as data — nothing here computes a price (CF-PRICE-1).
 */

const PAGE_SIZE_STORAGE_KEY = "ethio.admin.packages.prices.pageSize";
const TABLE_ID = "admin-packages-prices";
const LOCKED = ["market", "amount"];

type Dialog =
  | { kind: "none" }
  | { kind: "create"; openedBy: string }
  | { kind: "end"; id: string; openedBy: string };

export function PackagePrices({
  packages,
  packageKey,
  onPackage,
  mayUpdate,
  guard,
}: {
  packages: PackageRow[];
  packageKey: string | null;
  onPackage: (key: string | null) => void;
  mayUpdate: boolean;
  guard: GuardFn;
}) {
  const { t, language, entities } = useI18n();
  const settling = useSettling(ADMIN_PACKAGES_KEY);
  const query = usePackagePrices(packageKey);
  const markets = useOpenMarkets();
  const { tree } = useCategoryTree();
  const [hidden, toggleColumn] = useHiddenColumns(TABLE_ID);
  const { page, setPage, pageSize, setPageSize, pageSizeOptions } =
    useKeptPage(PAGE_SIZE_STORAGE_KEY);
  const [dialog, setDialog] = useState<Dialog>({ kind: "none" });
  const date = dateFormatter("day", language);
  const number = numberFormatter("exact", language);
  const rows = query.data ?? [];
  const nowIso = new Date().toISOString();

  const marketName = (code: string | null) => {
    if (code === null) return t("admin.packages.prices.everyMarket");
    const market = markets.markets.find((m) => m.code === code);
    if (!market) return code;
    return market.anchorId === null
      ? market.nameEn
      : entityName(
          "location",
          { id: market.anchorId, nameEn: market.nameEn, nameAm: null },
          entities,
        );
  };
  const categoryName = (id: string | null) => {
    if (id === null) return t("admin.packages.prices.everyCategory");
    const node = tree.byId.get(id);
    return node
      ? entityName("category", { id: node.id, nameEn: node.nameEn, nameAm: node.nameAm }, entities)
      : id;
  };
  const live = (row: PriceRow) => row.validTo === null || row.validTo > nowIso;

  const allColumns: DataTableColumn<PriceRow>[] = [
    {
      key: "market",
      header: t("admin.packages.prices.col.market"),
      priority: PRICE_COLUMN_PRIORITIES.market,
      card: "title",
      cell: (row) => (
        <span className="min-w-0 break-words" data-testid={`price-${row.id}-market`}>
          {marketName(row.countryCode)}
        </span>
      ),
    },
    {
      key: "category",
      header: t("admin.packages.prices.col.category"),
      priority: PRICE_COLUMN_PRIORITIES.category,
      card: "sub",
      cell: (row) => (
        <span className="min-w-0 break-words" data-testid={`price-${row.id}-category`}>
          {categoryName(row.categoryId)}
        </span>
      ),
    },
    {
      key: "amount",
      header: t("admin.packages.prices.col.amount"),
      priority: PRICE_COLUMN_PRIORITIES.amount,
      card: "badge",
      cell: (row) => (
        <span className="text-sm tabular-nums" data-testid={`price-${row.id}-amount`}>
          {row.amount === 0
            ? t("admin.packages.prices.free")
            : `${number.format(row.amount)} ${row.currency}`}
        </span>
      ),
    },
    {
      key: "from",
      header: t("admin.packages.prices.col.from"),
      priority: PRICE_COLUMN_PRIORITIES.from,
      card: "meta",
      cell: (row) => (
        <span className="text-sm" data-testid={`price-${row.id}-from`}>
          {date.format(new Date(row.validFrom))}
        </span>
      ),
    },
    {
      key: "to",
      header: t("admin.packages.prices.col.to"),
      priority: PRICE_COLUMN_PRIORITIES.to,
      card: "meta",
      cell: (row) => (
        <span className="text-sm" data-testid={`price-${row.id}-to`}>
          {row.validTo === null
            ? t("admin.packages.prices.open")
            : date.format(new Date(row.validTo))}
        </span>
      ),
    },
  ];
  const columns = visibleColumns(allColumns, hidden, LOCKED);

  const rowActions = (row: PriceRow) =>
    mayUpdate && live(row) ? (
      <RowActions
        testid={`price-actions-${row.id}`}
        name={marketName(row.countryCode)}
        more={[
          {
            key: "end",
            label: t("admin.packages.prices.action.end"),
            tone: "danger",
            disabled: settling,
            onSelect: () => setDialog({ kind: "end", id: row.id, openedBy: "row-menu" }),
          },
        ]}
      />
    ) : null;

  const chips =
    packageKey === null
      ? []
      : [{ key: "package", label: packageKey, onRemove: () => onPackage(null) }];
  const ending = dialog.kind === "end" ? (rows.find((row) => row.id === dialog.id) ?? null) : null;

  return (
    <section data-testid="packages-prices" className="min-w-0 space-y-3">
      <TableActions testid="packages-prices-header" title={t("admin.packages.prices.title")}>
        {mayUpdate && packageKey !== null ? (
          <TableActionButton
            variant="default"
            data-testid="packages-price-create-open"
            disabled={settling}
            onClick={() => setDialog({ kind: "create", openedBy: "header" })}
            icon={<Plus />}
            label={t("admin.packages.prices.create.open")}
          />
        ) : null}
      </TableActions>
      <DataTable<PriceRow>
        columns={columns}
        rows={rows}
        rowKey={(row) => row.id}
        rowTestId={(row) => `price-${row.id}`}
        caption={t("admin.packages.prices.caption")}
        cardUntil="lg"
        loading={packageKey !== null && query.isLoading}
        loadingState={<p className="text-sm">{t("admin.packages.prices.loading")}</p>}
        error={query.error}
        errorState={
          <p role="alert" className="text-sm text-destructive">
            {t("admin.packages.prices.error")}
          </p>
        }
        emptyState={
          <p className="text-sm text-muted-foreground" data-testid="packages-prices-empty">
            {t(
              packageKey === null ? "admin.packages.prices.filter" : "admin.packages.prices.empty",
            )}
          </p>
        }
        toolbar={
          <TableToolbar
            testid="packages-prices-toolbar"
            filters={
              <FiltersButton
                testid="packages-prices-filters"
                count={chips.length}
                state={packageKey ?? ""}
                onClearAll={() => onPackage(null)}
              >
                <FilterChoices
                  testid="packages-prices-package"
                  label={t("admin.packages.prices.filter")}
                  value={packageKey ?? ""}
                  onChange={(value) => {
                    onPackage(value === "" ? null : value);
                    setPage(0);
                  }}
                  options={[
                    { value: "", label: t("prim.table.all") },
                    ...packages.map((row) => ({ value: row.key, label: row.key })),
                  ]}
                />
              </FiltersButton>
            }
            chips={
              <FilterChips
                testid="packages-prices-chips"
                chips={chips}
                onClearAll={() => onPackage(null)}
              />
            }
            columns={
              <ColumnsButton
                testid="packages-prices-columns"
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
            testid="packages-prices-pagination"
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
      {dialog.kind === "create" && packageKey !== null ? (
        <PriceCreateDialog
          packageKey={packageKey}
          guard={guard}
          openedBy={dialog.openedBy}
          onClose={() => setDialog({ kind: "none" })}
        />
      ) : null}
      {ending !== null && dialog.kind === "end" ? (
        <PriceEndDialog
          key={ending.id}
          row={ending}
          guard={guard}
          openedBy={dialog.openedBy}
          onClose={() => setDialog({ kind: "none" })}
        />
      ) : null}
    </section>
  );
}

export default PackagePrices;
