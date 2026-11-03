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
import { OnOff } from "./on-off";
import { PLACEMENT_LABEL } from "./monetisation-forms";
import type { ProductKind, ProductRow } from "./monetisation-service";
import { ProductEditorDialog } from "./product-editor";
import { useMonetisationNames } from "./use-monetisation-names";

/**
 * P-1b (D290, D295) — THE PRODUCTS of one kind: LEVELS (an ad's level with its
 * own perks: default days, photos at most, placement, badge) and REACH (where
 * an ad is seen; days only). One block shape, the kind choosing the title, the
 * perk columns and the editor's fields. The row's one verb is Edit; the header
 * adds a product of this kind. A product is switched off, never removed.
 */
const LOCKED = ["name"];

type Dialog =
  | { kind: "none" }
  | { kind: "create"; openedBy: string }
  | { kind: "edit"; key: string; openedBy: string };

export function ProductsSection({
  kind,
  products,
  loading,
  error,
  mayUpdate,
  settling,
  guard,
}: {
  kind: ProductKind;
  /** Every product; the section keeps its own kind. */
  products: ProductRow[];
  loading: boolean;
  error: unknown;
  mayUpdate: boolean;
  settling: boolean;
  guard: GuardFn;
}) {
  const { t, language } = useI18n();
  const { productName } = useMonetisationNames(products);
  const [dialog, setDialog] = useState<Dialog>({ kind: "none" });
  const date = dateFormatter("day", language);
  const rows = products.filter((row) => row.kind === kind);
  const idOf = (row: ProductRow) => `product-${row.key}`;
  const editing =
    dialog.kind === "edit" ? (rows.find((row) => row.key === dialog.key) ?? null) : null;
  const isLevel = kind === "level";

  const perkColumns: DataTableColumn<ProductRow>[] = isLevel
    ? [
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
          cell: (row) => <OnOff value={row.badge} testid={`${idOf(row)}-badge`} t={t} />,
        },
      ]
    : [];

  const columns: DataTableColumn<ProductRow>[] = [
    {
      key: "name",
      header: t("admin.monetisation.col.name"),
      priority: "primary",
      card: "title",
      cell: (row) => (
        <span className="min-w-0 break-words font-medium" data-testid={`${idOf(row)}-name`}>
          {productName(row.key)}
        </span>
      ),
    },
    {
      key: "key",
      header: t("admin.packages.field.key"),
      priority: "secondary",
      card: "sub",
      cell: (row) => (
        <span className="min-w-0 break-all text-sm" data-testid={`${idOf(row)}-key`}>
          {row.key}
        </span>
      ),
    },
    {
      key: "days",
      header: t(isLevel ? "admin.monetisation.col.defaultDays" : "admin.packages.col.days"),
      priority: "primary",
      card: "meta",
      cell: (row) => (
        <span className="text-sm tabular-nums" data-testid={`${idOf(row)}-days`}>
          {row.days}
        </span>
      ),
    },
    ...perkColumns,
    {
      key: "enabled",
      header: t("admin.packages.col.enabled"),
      priority: "primary",
      card: "badge",
      cell: (row) => <OnOff value={row.enabled} testid={`${idOf(row)}-enabled`} t={t} />,
    },
    {
      key: "selfServe",
      header: t("admin.packages.col.selfServe"),
      priority: "secondary",
      card: "meta",
      cell: (row) => <OnOff value={row.selfServe} testid={`${idOf(row)}-self-serve`} t={t} />,
    },
    {
      key: "extends",
      header: t("admin.packages.col.extends"),
      priority: "secondary",
      card: "meta",
      cell: (row) => <OnOff value={row.extendsLifetime} testid={`${idOf(row)}-extends`} t={t} />,
    },
    {
      key: "sort",
      header: t("admin.packages.col.sort"),
      priority: "detail",
      card: "foot",
      cell: (row) => (
        <span className="text-sm tabular-nums" data-testid={`${idOf(row)}-sort`}>
          {row.sort}
        </span>
      ),
    },
    ...attributionColumns<ProductRow>(t, (iso) => date.format(new Date(iso)), idOf),
  ];

  const blockId = isLevel ? "levels" : "reach";
  const [hidden, toggleColumn] = useHiddenColumns(`admin-monetisation-${blockId}`);
  const { page, setPage, pageSize, setPageSize, pageSizeOptions } = useKeptPage(
    `ethio.admin.monetisation.${blockId}.pageSize`,
  );
  const shown = visibleColumns(columns, hidden, LOCKED);

  return (
    <>
      <section data-testid={`monetisation-${blockId}`} className="min-w-0 space-y-3">
        <TableActions
          testid={`monetisation-${blockId}-header`}
          title={t(isLevel ? "admin.monetisation.levels.title" : "admin.monetisation.reach.title")}
        >
          {mayUpdate ? (
            <TableActionButton
              variant="default"
              data-testid={`monetisation-${kind}-add`}
              disabled={settling}
              onClick={() => setDialog({ kind: "create", openedBy: "header" })}
              icon={<Plus />}
              label={t("admin.monetisation.product.add")}
            />
          ) : null}
        </TableActions>
        <DataTable<ProductRow>
          columns={shown}
          rows={rows}
          rowKey={(row) => row.key}
          rowTestId={idOf}
          caption={t(
            isLevel ? "admin.monetisation.levels.title" : "admin.monetisation.reach.title",
          )}
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
            <p
              className="text-sm text-muted-foreground"
              data-testid={`monetisation-${blockId}-empty`}
            >
              {t(isLevel ? "admin.monetisation.empty.levels" : "admin.monetisation.empty.reach")}
            </p>
          }
          toolbar={
            <TableToolbar
              testid={`monetisation-${blockId}-toolbar`}
              columns={
                <ColumnsButton
                  testid={`monetisation-${blockId}-columns`}
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
              testid={`product-actions-${row.key}`}
              name={productName(row.key)}
              edit={
                mayUpdate
                  ? {
                      label: t("admin.packages.action.edit"),
                      disabled: settling,
                      onSelect: () =>
                        setDialog({ kind: "edit", key: row.key, openedBy: "row-click" }),
                    }
                  : undefined
              }
            />
          )}
          page={page}
          pageSize={pageSize}
          pagination={
            <DataTablePagination
              testid={`monetisation-${blockId}-pagination`}
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
        <ProductEditorDialog
          kind={kind}
          row={null}
          guard={guard}
          openedBy={dialog.openedBy}
          onClose={() => setDialog({ kind: "none" })}
        />
      ) : null}
      {editing !== null && dialog.kind === "edit" ? (
        <ProductEditorDialog
          key={editing.key}
          kind={kind}
          row={editing}
          guard={guard}
          openedBy={dialog.openedBy}
          onClose={() => setDialog({ kind: "none" })}
        />
      ) : null}
    </>
  );
}
