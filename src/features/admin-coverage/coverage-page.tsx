import { Pencil, Plus } from "lucide-react";
import { useMemo, useState } from "react";

import {
  DataTable,
  DataTablePagination,
  type DataTableColumn,
} from "@/components/shell/data-table";
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
 * come from `coverage_plans` once, one 44px pencil per row opens the editor, and
 * the limits are edited there. There is no delete door — a plan is edited,
 * never removed, until a DEC says otherwise.
 */

const PAGE_SIZE = 25;

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
  const [dialog, setDialog] = useState<Dialog>({ kind: "none" });

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

  const columns: DataTableColumn<CoveragePlanRow>[] = [
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

  /** ONE VERB IN THE ROW: a 44px pencil that opens the editor (CT-8). */
  const rowActions = (row: CoveragePlanRow) =>
    mayUpdate ? (
      <span className="flex items-center xl:justify-end">
        <Button
          type="button"
          variant="outline"
          className="size-11 shrink-0 p-0"
          data-testid={`coverage-edit-${row.plan}`}
          aria-label={t("admin.coverage.action.edit")}
          title={t("admin.coverage.action.edit")}
          onClick={() => open({ kind: "editor", plan: row.plan, openedBy: "row-click" })}
          onKeyDown={(event) => {
            if (event.key !== "Enter" && event.key !== " ") return;
            event.preventDefault();
            open({ kind: "editor", plan: row.plan, openedBy: "keyboard" });
          }}
        >
          <Pencil aria-hidden="true" className="size-4" />
        </Button>
      </span>
    ) : null;

  return (
    <StepUpGate>
      {(guard) => (
        <div data-testid="admin-section-coverage" className="min-w-0 space-y-4">
          <div className="flex min-w-0 flex-wrap items-center justify-end gap-3">
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
          </div>

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
              /**
               * L2d — the categories shape: the find group is a DIRECT child of
               * the primitive's toolbar row with no visible label above it, and
               * the note wraps beneath as the legend. Coverage has no transfer
               * door, so the find group is the only group.
               */
              <>
                <div
                  className="flex flex-wrap items-center gap-2"
                  data-testid="coverage-toolbar-find"
                >
                  <Input
                    data-testid="coverage-search"
                    className="md:w-72"
                    aria-label={t("admin.coverage.filter.search")}
                    placeholder={t("admin.coverage.searchPlaceholder")}
                    value={search}
                    onChange={(event) => {
                      setSearch(event.target.value);
                      setPage(0);
                    }}
                  />
                </div>
                <p className="basis-full text-xs text-muted-foreground" data-testid="coverage-note">
                  {t("admin.coverage.note")}
                </p>
              </>
            }
            rowActions={rowActions}
            page={page}
            pageSize={PAGE_SIZE}
            pagination={
              <DataTablePagination
                testid="coverage-pagination"
                offset={page * PAGE_SIZE}
                pageSize={PAGE_SIZE}
                total={rows.length}
                onPrevious={() => setPage((current) => Math.max(0, current - 1))}
                onNext={() => setPage((current) => current + 1)}
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
