import { Package, Plus } from "lucide-react";
import { useMemo, useState } from "react";

import { ColumnsButton } from "@/components/shell/columns-button";
import { useHiddenColumns, visibleColumns } from "@/components/shell/columns-state";
import {
  DataTable,
  DataTablePagination,
  type DataTableColumn,
} from "@/components/shell/data-table";
import { RowActions } from "@/components/shell/row-actions";
import { TableActionButton, TableActions } from "@/components/shell/table-actions";
import { TableToolbar } from "@/components/shell/table-toolbar";
import { TipBadge } from "@/components/shell/tip-badge";
import { useKeptPage } from "@/components/shell/use-kept-page";
import { Input } from "@/components/ui/input";
import { useAdminShell } from "@/features/admin/admin-context";
import { TIER_LABEL } from "@/features/admin-listings/tier-reasons";
import { StepUpGate } from "@/features/auth/mfa/step-up-gate";
import { useI18n } from "@/i18n";
import { dateFormatter } from "@/lib/format";
import { useSettling } from "@/lib/use-settling";

import { PackageEditorDialog } from "./package-editor";
import { PackagePrices } from "./package-prices";
import { PACKAGE_COLUMN_PRIORITIES, type PackageRow } from "./packages-service";
import { ADMIN_PACKAGES_KEY, usePackages } from "./use-packages";

/**
 * P-1 (D280, D283) — ADMIN › LISTINGS › PACKAGES: the promotions a seller may
 * apply to an ad, and their prices.
 *
 * Gate tier: `packages:view` opens the section (the /admin layout owns it); the
 * three writes re-check `packages:update` AND step-up inside their doors (F3),
 * so the hidden verbs below are convenience, never authority.
 *
 * Admin › AI's two-table shape on the agreed blocks (D118 / D128): ONE READ of
 * `listing_packages` drawn as the roster (key, tier, days, on/off, self-serve,
 * extends lifetime, order, updated), the header's Add package, the toolbar
 * (search · Columns), the row's one action (Edit), the footer with the page
 * size; then the prices of the chosen package (`PackagePrices`).
 */

const PAGE_SIZE_STORAGE_KEY = "ethio.admin.packages.pageSize";
const TABLE_ID = "admin-packages";
const LOCKED = ["key"];

type Dialog =
  | { kind: "none" }
  | { kind: "create"; openedBy: string }
  | { kind: "editor"; key: string; openedBy: string };

export function AdminPackagesPage() {
  const { t, language } = useI18n();
  const settling = useSettling(ADMIN_PACKAGES_KEY);
  const { permissions } = useAdminShell();
  const mayUpdate = permissions.includes("packages:update");
  const query = usePackages();
  const [dialog, setDialog] = useState<Dialog>({ kind: "none" });
  const [chosen, setChosen] = useState<string | null>(null);
  const { page, setPage, pageSize, setPageSize, pageSizeOptions } =
    useKeptPage(PAGE_SIZE_STORAGE_KEY);
  const [hidden, toggleColumn] = useHiddenColumns(TABLE_ID);
  const [search, setSearch] = useState("");
  const date = dateFormatter("day", language);

  const all = useMemo(() => query.data ?? [], [query.data]);
  /** The one read is sieved in the browser: by the key or the tier word. */
  const needle = search.trim().toLowerCase();
  const rows =
    needle === ""
      ? all
      : all.filter(
          (row) =>
            row.key.toLowerCase().includes(needle) ||
            t(TIER_LABEL[row.tier]).toLowerCase().includes(needle),
        );
  const selected =
    dialog.kind === "editor" ? (all.find((row) => row.key === dialog.key) ?? null) : null;

  const onOff = (value: boolean, testid: string) => (
    <TipBadge
      variant={value ? "secondary" : "outline"}
      label={t(value ? "admin.packages.on" : "admin.packages.off")}
      tip={t(value ? "admin.packages.on" : "admin.packages.off")}
      testid={testid}
    />
  );

  const allColumns: DataTableColumn<PackageRow>[] = [
    {
      key: "key",
      header: t("admin.packages.col.key"),
      priority: PACKAGE_COLUMN_PRIORITIES.key,
      card: "title",
      cell: (row) => (
        <span className="min-w-0 break-all font-medium" data-testid={`package-${row.key}-key`}>
          {row.key}
        </span>
      ),
    },
    {
      key: "tier",
      header: t("admin.packages.col.tier"),
      priority: PACKAGE_COLUMN_PRIORITIES.tier,
      card: "badge",
      cell: (row) => (
        <span className="text-sm" data-testid={`package-${row.key}-tier`}>
          {t(TIER_LABEL[row.tier])}
        </span>
      ),
    },
    {
      key: "days",
      header: t("admin.packages.col.days"),
      priority: PACKAGE_COLUMN_PRIORITIES.days,
      card: "meta",
      cell: (row) => (
        <span className="text-sm tabular-nums" data-testid={`package-${row.key}-days`}>
          {row.days}
        </span>
      ),
    },
    {
      key: "enabled",
      header: t("admin.packages.col.enabled"),
      priority: PACKAGE_COLUMN_PRIORITIES.enabled,
      card: "badge",
      cell: (row) => onOff(row.enabled, `package-${row.key}-enabled`),
    },
    {
      key: "selfServe",
      header: t("admin.packages.col.selfServe"),
      priority: PACKAGE_COLUMN_PRIORITIES.selfServe,
      card: "meta",
      cell: (row) => onOff(row.selfServe, `package-${row.key}-self-serve`),
    },
    {
      key: "extends",
      header: t("admin.packages.col.extends"),
      priority: PACKAGE_COLUMN_PRIORITIES.extends,
      card: "meta",
      cell: (row) => onOff(row.extendsLifetime, `package-${row.key}-extends`),
    },
    {
      key: "sort",
      header: t("admin.packages.col.sort"),
      priority: PACKAGE_COLUMN_PRIORITIES.sort,
      card: "foot",
      cell: (row) => (
        <span className="text-sm tabular-nums" data-testid={`package-${row.key}-sort`}>
          {row.sort}
        </span>
      ),
    },
    {
      key: "updated",
      header: t("admin.packages.col.updated"),
      priority: PACKAGE_COLUMN_PRIORITIES.updated,
      card: "foot",
      cell: (row) => <span className="text-sm">{date.format(new Date(row.updatedAt))}</span>,
    },
  ];
  const columns = visibleColumns(allColumns, hidden, LOCKED);

  const rowActions = (row: PackageRow) => (
    <RowActions
      testid={`package-actions-${row.key}`}
      name={row.key}
      edit={
        mayUpdate
          ? {
              label: t("admin.packages.action.edit"),
              disabled: settling,
              onSelect: () => setDialog({ kind: "editor", key: row.key, openedBy: "row-click" }),
            }
          : undefined
      }
    />
  );

  return (
    <StepUpGate>
      {(guard) => (
        <div data-testid="admin-section-packages" className="min-w-0 space-y-4">
          <TableActions testid="packages-header" title={t("admin.section.packages.title")}>
            {mayUpdate ? (
              <TableActionButton
                variant="default"
                data-testid="packages-create-open"
                disabled={settling}
                onClick={() => setDialog({ kind: "create", openedBy: "header" })}
                icon={<Plus />}
                label={t("admin.packages.create.open")}
              />
            ) : null}
          </TableActions>
          {/* The roster's own block: the prices table below has its own, so a test tells them apart. */}
          <div data-testid="packages-roster" className="min-w-0">
            <DataTable<PackageRow>
              columns={columns}
              rows={rows}
              rowKey={(row) => row.key}
              rowTestId={(row) => `package-${row.key}`}
              caption={t("admin.packages.caption")}
              cardUntil="lg"
              cardLead={() => <Package />}
              loading={query.isLoading}
              loadingState={<p className="text-sm">{t("admin.packages.loading")}</p>}
              error={query.error}
              errorState={
                <p role="alert" className="text-sm text-destructive">
                  {t("admin.packages.error")}
                </p>
              }
              emptyState={
                <p className="text-sm text-muted-foreground">{t("admin.packages.empty")}</p>
              }
              toolbar={
                <TableToolbar
                  testid="packages-toolbar"
                  search={
                    <Input
                      data-testid="packages-search"
                      aria-label={t("admin.packages.col.key")}
                      value={search}
                      onChange={(event) => {
                        setSearch(event.target.value);
                        setPage(0);
                      }}
                    />
                  }
                  columns={
                    <ColumnsButton
                      testid="packages-columns"
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
                  testid="packages-pagination"
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
          </div>
          <PackagePrices
            packages={all}
            packageKey={chosen}
            onPackage={setChosen}
            mayUpdate={mayUpdate}
            guard={guard}
          />
          {dialog.kind === "create" ? (
            <PackageEditorDialog
              row={null}
              guard={guard}
              openedBy={dialog.openedBy}
              onClose={() => setDialog({ kind: "none" })}
            />
          ) : null}
          {selected !== null && dialog.kind === "editor" ? (
            <PackageEditorDialog
              key={selected.key}
              row={selected}
              guard={guard}
              openedBy={dialog.openedBy}
              onClose={() => setDialog({ kind: "none" })}
            />
          ) : null}
        </div>
      )}
    </StepUpGate>
  );
}

export default AdminPackagesPage;
