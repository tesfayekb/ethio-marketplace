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

import { attributionColumns } from "./monetisation-columns";
import { PLACEMENT_LABEL } from "./monetisation-forms";
import type { OverrideRow, ProductRow } from "./monetisation-service";
import { OverrideDialog } from "./override-dialog";
import { useMonetisationNames } from "./use-monetisation-names";

/**
 * P-1b (D295) — PER-CATEGORY PERKS: a level's row per main category and
 * country, each cell a perk the row sets (days, photos, placement, badge); a
 * blank cell is the level's own value, a subcategory inherits its main
 * category's row. Verbs: Add override (header), Edit, Clear (red) on the row.
 * The level's own values are the Levels table's, never a row here.
 */
const LOCKED = ["level"];

type Dialog =
  | { kind: "none" }
  | { kind: "create"; openedBy: string }
  | { kind: "edit"; id: string; openedBy: string }
  | { kind: "clear"; id: string; openedBy: string };

export function OverridesSection({
  rows,
  products,
  loading,
  error,
  mayUpdate,
  settling,
  guard,
}: {
  rows: OverrideRow[];
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
  const date = dateFormatter("day", language);
  const idOf = (row: OverrideRow) => `override-${row.id}`;
  const chosen =
    dialog.kind === "edit" || dialog.kind === "clear"
      ? (rows.find((row) => row.id === dialog.id) ?? null)
      : null;

  const columns: DataTableColumn<OverrideRow>[] = [
    {
      key: "level",
      header: t("admin.monetisation.col.level"),
      priority: "primary",
      card: "title",
      cell: (row) => (
        <span className="min-w-0 break-words font-medium" data-testid={`${idOf(row)}-level`}>
          {productName(row.levelKey)}
        </span>
      ),
    },
    {
      key: "category",
      header: t("admin.monetisation.col.category"),
      priority: "primary",
      card: "sub",
      cell: (row) => (
        <span className="min-w-0 break-words text-sm" data-testid={`${idOf(row)}-category`}>
          {categoryName(row.categoryId, "mainCategoryAny")}
        </span>
      ),
    },
    {
      key: "country",
      header: t("admin.monetisation.col.country"),
      priority: "primary",
      card: "sub",
      cell: (row) => (
        <span className="min-w-0 break-words text-sm" data-testid={`${idOf(row)}-country`}>
          {marketName(row.countryCode, "countryAny")}
        </span>
      ),
    },
    {
      key: "days",
      header: t("admin.monetisation.col.days"),
      priority: "primary",
      card: "meta",
      cell: (row) => (
        <span className="text-sm tabular-nums" data-testid={`${idOf(row)}-days`}>
          {row.days ?? ""}
        </span>
      ),
    },
    {
      key: "photos",
      header: t("admin.monetisation.col.photos"),
      priority: "primary",
      card: "meta",
      cell: (row) => (
        <span className="text-sm tabular-nums" data-testid={`${idOf(row)}-photos`}>
          {row.maxPhotos ?? ""}
        </span>
      ),
    },
    {
      key: "placement",
      header: t("admin.monetisation.col.placement"),
      priority: "secondary",
      card: "meta",
      cell: (row) => (
        <span className="text-sm" data-testid={`${idOf(row)}-placement`}>
          {row.placement === null ? "" : t(PLACEMENT_LABEL[row.placement])}
        </span>
      ),
    },
    {
      key: "badge",
      header: t("admin.monetisation.col.badge"),
      priority: "secondary",
      card: "meta",
      cell: (row) => (
        <span className="text-sm" data-testid={`${idOf(row)}-badge`}>
          {row.badge === null
            ? ""
            : t(row.badge ? "admin.coverage.everywhere.yes" : "admin.coverage.everywhere.no")}
        </span>
      ),
    },
    ...attributionColumns<OverrideRow>(t, (iso) => date.format(new Date(iso)), idOf),
  ];

  const [hidden, toggleColumn] = useHiddenColumns("admin-monetisation-overrides");
  const { page, setPage, pageSize, setPageSize, pageSizeOptions } = useKeptPage(
    "ethio.admin.monetisation.overrides.pageSize",
  );
  const shown = visibleColumns(columns, hidden, LOCKED);

  return (
    <>
      <section data-testid="monetisation-overrides" className="min-w-0 space-y-3">
        <TableActions
          testid="monetisation-overrides-header"
          title={t("admin.monetisation.overrides.title")}
        >
          {mayUpdate ? (
            <TableActionButton
              variant="default"
              data-testid="monetisation-override-add"
              disabled={settling}
              onClick={() => setDialog({ kind: "create", openedBy: "header" })}
              icon={<Plus />}
              label={t("admin.monetisation.override.add")}
            />
          ) : null}
        </TableActions>
        <p className="text-sm text-muted-foreground" data-testid="monetisation-overrides-help">
          {t("admin.monetisation.help.overrides")}
        </p>
        <DataTable<OverrideRow>
          columns={shown}
          rows={rows}
          rowKey={(row) => row.id}
          rowTestId={idOf}
          caption={t("admin.monetisation.overrides.title")}
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
            <p className="text-sm text-muted-foreground" data-testid="monetisation-overrides-empty">
              {t("admin.monetisation.empty.overrides")}
            </p>
          }
          toolbar={
            <TableToolbar
              testid="monetisation-overrides-toolbar"
              columns={
                <ColumnsButton
                  testid="monetisation-overrides-columns"
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
            mayUpdate ? (
              <RowActions
                testid={`${idOf(row)}-actions`}
                name={productName(row.levelKey)}
                edit={{
                  label: t("admin.monetisation.override.edit"),
                  disabled: settling,
                  onSelect: () => setDialog({ kind: "edit", id: row.id, openedBy: "row-click" }),
                }}
                more={[
                  {
                    key: "clear",
                    label: t("admin.monetisation.override.clear"),
                    tone: "danger",
                    disabled: settling,
                    onSelect: () => setDialog({ kind: "clear", id: row.id, openedBy: "row-menu" }),
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
              testid="monetisation-overrides-pagination"
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
        <OverrideDialog
          mode="create"
          row={null}
          products={products}
          guard={guard}
          openedBy={dialog.openedBy}
          onClose={() => setDialog({ kind: "none" })}
        />
      ) : null}
      {chosen !== null && (dialog.kind === "edit" || dialog.kind === "clear") ? (
        <OverrideDialog
          key={`${dialog.kind}-${chosen.id}`}
          mode={dialog.kind}
          row={chosen}
          products={products}
          guard={guard}
          openedBy={dialog.openedBy}
          onClose={() => setDialog({ kind: "none" })}
        />
      ) : null}
    </>
  );
}
