import { Plus } from "lucide-react";
import { useMemo, useState } from "react";

import { ColumnsButton } from "@/components/shell/columns-button";
import { useHiddenColumns, visibleColumns } from "@/components/shell/columns-state";
import {
  DataTable,
  DataTablePagination,
  type DataTableColumn,
} from "@/components/shell/data-table";
import { RowActions } from "@/components/shell/row-actions";
import { TableActions } from "@/components/shell/table-actions";
import { TableToolbar } from "@/components/shell/table-toolbar";
import { TipBadge } from "@/components/shell/tip-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAdminShell } from "@/features/admin/admin-context";
import { StepUpGate } from "@/features/auth/mfa/step-up-gate";
import { useI18n } from "@/i18n";

import { CoverageCreateDialog } from "./coverage-create-dialog";
import { CoverageEditorDialog } from "./coverage-editor";
import { COVERAGE_COLUMN_PRIORITIES, type CoveragePlanRow } from "./coverage-service";
import { useCoveragePlans } from "./use-coverage";

/**
 * LOCATIONS ERA L2b-C2 — THE COVERAGE CONSOLE.
 *
 * Gate tier: `coverage:view` opens the section (the /admin layout owns it); the
 * only write re-checks `coverage:update` AND step-up inside the door (F3), so
 * the disabled state below is convenience, never authority.
 *
 * ONE READ, ONE TABLE (the categories/countries convention, CT-8): the plans
 * come from `coverage_plans` once and the limits are edited in the editor. There
 * is no delete door — a plan is edited, never removed, until a DEC says
 * otherwise.
 *
 * Bundle 11 B1 (D118, D128) — on the agreed blocks: the header's one primary
 * action (TableActions: New plan); the toolbar (search · Columns — this table
 * has no filter); the row's actions (RowActions: Edit); the footer's three
 * zones with the page size.
 */

const PAGE_SIZE = 25;
const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];
const TABLE_ID = "admin-coverage";
const LOCKED = ["plan"];

type Dialog =
  | { kind: "none" }
  | { kind: "create" }
  | { kind: "editor"; plan: string; openedBy: string };

export function AdminCoveragePage() {
  const { t } = useI18n();
  const { permissions } = useAdminShell();
  const mayUpdate = permissions.includes("coverage:update");

  const query = useCoveragePlans();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(PAGE_SIZE);
  const [dialog, setDialog] = useState<Dialog>({ kind: "none" });
  const [hidden, toggleColumn] = useHiddenColumns(TABLE_ID);

  const [search, setSearch] = useState("");
  const all = useMemo(() => query.data ?? [], [query.data]);
  /** The one read is sieved in the browser: a keystroke costs nothing (G2). */
  const rows = useMemo(() => {
    const needle = search.trim().toLowerCase();
    return needle === "" ? all : all.filter((row) => row.plan.toLowerCase().includes(needle));
  }, [all, search]);
  const byPlan = useMemo(() => new Map(all.map((row) => [row.plan, row])), [all]);
  const selected = dialog.kind === "editor" ? (byPlan.get(dialog.plan) ?? null) : null;

  const open = (next: Dialog) => setDialog(next);
  const close = () => setDialog({ kind: "none" });

  const allColumns: DataTableColumn<CoveragePlanRow>[] = [
    {
      key: "plan",
      header: t("admin.coverage.col.plan"),
      priority: COVERAGE_COLUMN_PRIORITIES.plan,
      cell: (row) => (
        <span className="min-w-0 break-words font-medium" data-testid={`coverage-${row.plan}-plan`}>
          {row.plan}
        </span>
      ),
    },
    {
      key: "cities",
      header: t("admin.coverage.col.cities"),
      priority: COVERAGE_COLUMN_PRIORITIES.cities,
      align: "end",
      cell: (row) => (
        <span className="text-sm tabular-nums" data-testid={`coverage-${row.plan}-cities`}>
          {row.maxCities}
        </span>
      ),
    },
    {
      key: "regions",
      header: t("admin.coverage.col.regions"),
      priority: COVERAGE_COLUMN_PRIORITIES.regions,
      align: "end",
      cell: (row) => (
        <span className="text-sm tabular-nums" data-testid={`coverage-${row.plan}-regions`}>
          {row.maxRegions}
        </span>
      ),
    },
    {
      key: "countries",
      header: t("admin.coverage.col.countries"),
      priority: COVERAGE_COLUMN_PRIORITIES.countries,
      align: "end",
      cell: (row) => (
        <span className="text-sm tabular-nums" data-testid={`coverage-${row.plan}-countries`}>
          {row.maxCountries}
        </span>
      ),
    },
    {
      key: "photos",
      header: t("admin.coverage.col.photos"),
      priority: COVERAGE_COLUMN_PRIORITIES.photos,
      align: "end",
      cell: (row) => (
        <span className="text-sm tabular-nums" data-testid={`coverage-${row.plan}-photos`}>
          {row.maxPhotos}
        </span>
      ),
    },
    {
      key: "everywhere",
      header: t("admin.coverage.col.everywhere"),
      priority: COVERAGE_COLUMN_PRIORITIES.everywhere,
      cell: (row) => (
        <TipBadge
          variant="outline"
          label={t(
            row.allowEverywhere ? "admin.coverage.everywhere.yes" : "admin.coverage.everywhere.no",
          )}
          tip={t(
            row.allowEverywhere
              ? "admin.coverage.everywhere.tipYes"
              : "admin.coverage.everywhere.tipNo",
          )}
          testid={`coverage-${row.plan}-everywhere`}
        />
      ),
    },
    {
      key: "updated",
      header: t("admin.coverage.col.updated"),
      priority: COVERAGE_COLUMN_PRIORITIES.updated,
      cell: (row) => (
        <span className="text-sm">{row.updatedAt === "" ? "—" : row.updatedAt.slice(0, 10)}</span>
      ),
    },
  ];

  const columns = visibleColumns(allColumns, hidden, LOCKED);

  /** Bundle 11 B1 — Edit; the door re-checks (F3). */
  const rowActions = (row: CoveragePlanRow) => (
    <RowActions
      testid={`coverage-actions-${row.plan}`}
      name={row.plan}
      edit={
        mayUpdate
          ? {
              label: t("admin.coverage.action.edit"),
              onSelect: () => open({ kind: "editor", plan: row.plan, openedBy: "row-click" }),
            }
          : undefined
      }
    />
  );

  return (
    <StepUpGate>
      {(guard) => (
        <div data-testid="admin-section-coverage" className="min-w-0 space-y-4">
          <TableActions testid="coverage-header">
            {mayUpdate ? (
              <Button
                type="button"
                size="touch"
                data-testid="coverage-create-open"
                onClick={() => open({ kind: "create" })}
              >
                <Plus aria-hidden="true" className="size-4" />
                <span>{t("admin.coverage.create.open")}</span>
              </Button>
            ) : null}
          </TableActions>

          <DataTable<CoveragePlanRow>
            columns={columns}
            rows={rows}
            rowKey={(row) => row.plan}
            rowTestId={(row) => `coverage-${row.plan}`}
            caption={t("admin.coverage.caption")}
            cardUntil="lg"
            loading={query.isLoading}
            loadingState={<p className="text-sm">{t("admin.coverage.loading")}</p>}
            error={query.error}
            errorState={
              <p role="alert" className="text-sm text-destructive">
                {t("admin.coverage.error")}
              </p>
            }
            emptyState={
              <p className="text-sm text-muted-foreground">{t("admin.coverage.empty")}</p>
            }
            toolbar={
              <>
                <TableToolbar
                  testid="coverage-toolbar"
                  search={
                    <Input
                      data-testid="coverage-search"
                      aria-label={t("admin.coverage.filter.search")}
                      placeholder={t("admin.coverage.searchPlaceholder")}
                      value={search}
                      onChange={(event) => {
                        setSearch(event.target.value);
                        setPage(0);
                      }}
                    />
                  }
                  columns={
                    <ColumnsButton
                      testid="coverage-columns"
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
                <p className="basis-full text-xs text-muted-foreground" data-testid="coverage-note">
                  {t("admin.coverage.note")}
                </p>
              </>
            }
            rowActions={rowActions}
            page={page}
            pageSize={pageSize}
            pagination={
              <DataTablePagination
                testid="coverage-pagination"
                offset={page * pageSize}
                pageSize={pageSize}
                total={rows.length}
                onPrevious={() => setPage((current) => Math.max(0, current - 1))}
                onNext={() => setPage((current) => current + 1)}
                onPage={setPage}
                pageSizeOptions={PAGE_SIZE_OPTIONS}
                onPageSize={(next) => {
                  setPageSize(next);
                  setPage(0);
                }}
              />
            }
          />

          {dialog.kind === "create" ? <CoverageCreateDialog guard={guard} onClose={close} /> : null}
          {selected !== null ? (
            <CoverageEditorDialog
              key="coverage-editor"
              row={selected}
              guard={guard}
              openedBy={dialog.kind === "editor" ? dialog.openedBy : "row-click"}
              onClose={close}
            />
          ) : null}
        </div>
      )}
    </StepUpGate>
  );
}

export default AdminCoveragePage;
