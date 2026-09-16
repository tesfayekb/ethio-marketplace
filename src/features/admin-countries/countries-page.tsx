import { Download, Pencil, Upload } from "lucide-react";
import { useDeferredValue, useEffect, useMemo, useState } from "react";

import {
  DataTable,
  DataTablePagination,
  type DataTableColumn,
} from "@/components/shell/data-table";
import { TipBadge } from "@/components/shell/tip-badge";
import { Button } from "@/components/ui/button";
import { useAdminShell } from "@/features/admin/admin-context";
import { PAGE_SIZE_OPTIONS } from "@/features/admin-locations/locations-toolbar";
import { StepUpGate } from "@/features/auth/mfa/step-up-gate";
import { useI18n, type MessageKey } from "@/i18n";
import { supabase } from "@/integrations/supabase/client";

import { CountriesToolbar } from "./countries-toolbar";
import { COUNTRY_COLUMN_PRIORITIES, filterCountries, type CountryRow } from "./countries-service";
import { CountryEditorDialog } from "./country-editor";
import { ImportCountriesDialog } from "./country-import-dialog";
import { CountryVerbBar } from "./country-verb-bar";
import { CountryActiveDialog, CountryRailOrderDialog } from "./country-verb-dialogs";
import { useAdminCountries } from "./use-countries";

/**
 * LOCATIONS ERA L2b-C1 — THE COUNTRIES CONSOLE.
 *
 * Gate tier: `countries:view` opens the section (the /admin layout owns it);
 * every write re-checks its own granular permission AND step-up inside the door
 * (F3), so the disabled states below are convenience, never authority.
 *
 * ONE READ, ONE TABLE (the categories/places convention, CT-8): the roster
 * comes from `admin_list_countries` once, the search and status controls sieve
 * it in the browser, one 44px pencil per row opens the editor, and every verb
 * lives in that editor's verb bar. The MARKETS transfer group sits inside this
 * table's own toolbar — a markets file names its own countries, so it is never
 * scoped.
 */

const DEFAULT_PAGE_SIZE = 25;
const PAGE_SIZE_STORAGE_KEY = "ethio.admin.countries.pageSize";

type Dialog =
  | { kind: "none" }
  | { kind: "editor"; code: string; openedBy: string }
  | { kind: "active"; code: string }
  | { kind: "rail"; code: string }
  | { kind: "import" };

export function AdminCountriesPage() {
  const { t } = useI18n();
  const { permissions } = useAdminShell();

  // The GATES MIRROR THE DOORS (E7): `admin_upsert_country` and
  // `admin_set_country_root_order` demand `countries:update`, while opening or
  // closing a market demands `countries:activate`. The server re-checks both.
  const mayUpdate = permissions.includes("countries:update");
  const mayActivate = permissions.includes("countries:activate");
  const mayImport = permissions.includes("locations:import");

  const query = useAdminCountries();
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE);
  const [dialog, setDialog] = useState<Dialog>({ kind: "none" });
  const [exporting, setExporting] = useState(false);
  const [exportError, setExportError] = useState(false);

  /** Page size is a device setting, read after mount so SSR and hydration agree. */
  useEffect(() => {
    const stored = Number(window.localStorage.getItem(PAGE_SIZE_STORAGE_KEY) ?? "");
    if (PAGE_SIZE_OPTIONS.includes(stored as (typeof PAGE_SIZE_OPTIONS)[number])) {
      setPageSize(stored);
    }
  }, []);

  const roster = useMemo(() => query.data ?? [], [query.data]);
  const byCode = useMemo(() => new Map(roster.map((row) => [row.code, row])), [roster]);
  /** A keystroke sieves, never fetches; deferring keeps typing smooth. */
  const deferredSearch = useDeferredValue(search);
  const rows = useMemo(
    () => filterCountries(roster, { search: deferredSearch, status }),
    [roster, deferredSearch, status],
  );

  const open = (next: Dialog) => setDialog(next);
  const close = () => setDialog({ kind: "none" });
  const selected = dialog.kind === "editor" ? (byCode.get(dialog.code) ?? null) : null;

  /** The markets file, unscoped: the L1b export route with the live bearer. */
  const runExport = async () => {
    setExporting(true);
    setExportError(false);
    try {
      const { data: session } = await supabase.auth.getSession();
      const token = session.session?.access_token ?? "";
      const response = await fetch("/api/admin/locations/export?file=countries", {
        headers: token === "" ? {} : { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error(`export failed: ${response.status}`);
      const blob = await response.blob();
      const href = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = href;
      anchor.download = "countries.csv";
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(href);
    } catch (error) {
      console.error("[countries] export failed", error);
      setExportError(true);
    } finally {
      setExporting(false);
    }
  };

  const columns: DataTableColumn<CountryRow>[] = [
    {
      key: "name",
      header: t("admin.countries.col.name"),
      priority: COUNTRY_COLUMN_PRIORITIES.name,
      cell: (row) => (
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <span className="min-w-0 break-words font-medium">{row.nameEn}</span>
          <span className="text-sm tabular-nums text-muted-foreground">{row.code}</span>
        </div>
      ),
    },
    {
      key: "status",
      header: t("admin.countries.col.status"),
      priority: COUNTRY_COLUMN_PRIORITIES.status,
      cell: (row) => (
        <TipBadge
          variant={row.isActive ? "secondary" : "outline"}
          label={t(row.isActive ? "admin.countries.badge.open" : "admin.countries.badge.closed")}
          tip={t(row.isActive ? "admin.countries.tip.open" : "admin.countries.tip.closed")}
          testid={`country-${row.code}-status`}
        />
      ),
    },
    {
      key: "places",
      header: t("admin.countries.col.places"),
      priority: COUNTRY_COLUMN_PRIORITIES.places,
      align: "end",
      cell: (row) => (
        <span
          className="text-sm tabular-nums"
          title={t("admin.countries.places.hint")}
          data-testid={`country-${row.code}-places`}
        >
          {`${row.activePlaceCount} / ${row.placeCount}`}
        </span>
      ),
    },
    {
      key: "units",
      header: t("admin.countries.col.units"),
      priority: COUNTRY_COLUMN_PRIORITIES.units,
      cell: (row) => (
        <span className="text-sm" data-testid={`country-${row.code}-units`}>
          {`${t(`admin.countries.unit.${row.unitSystem}` as MessageKey)} · ${row.currencyCode ?? "—"}`}
        </span>
      ),
    },
    {
      key: "rail",
      header: t("admin.countries.col.rail"),
      priority: COUNTRY_COLUMN_PRIORITIES.rail,
      align: "end",
      cell: (row) => (
        <span
          className="text-sm tabular-nums"
          title={t("admin.countries.rail.hint")}
          data-testid={`country-${row.code}-rail`}
        >
          {row.rootOrder.length}
        </span>
      ),
    },
    {
      key: "roles",
      header: t("admin.countries.col.roles"),
      priority: COUNTRY_COLUMN_PRIORITIES.roles,
      align: "end",
      cell: (row) => (
        <span className="text-sm tabular-nums" title={t("admin.countries.roles.hint")}>
          {row.scopedRoleCount}
        </span>
      ),
    },
    {
      key: "updated",
      header: t("admin.countries.col.updated"),
      priority: COUNTRY_COLUMN_PRIORITIES.updated,
      cell: (row) => (
        <span className="text-sm">{row.updatedAt === "" ? "—" : row.updatedAt.slice(0, 10)}</span>
      ),
    },
  ];

  /** ONE VERB IN THE ROW: a 44px pencil that opens the editor (CT-8). */
  const rowActions = (row: CountryRow) =>
    mayUpdate ? (
      <span className="flex items-center xl:justify-end">
        <Button
          type="button"
          variant="outline"
          className="size-11 shrink-0 p-0"
          data-testid={`country-edit-${row.code}`}
          aria-label={t("admin.countries.action.edit")}
          title={t("admin.countries.action.edit")}
          onClick={() => open({ kind: "editor", code: row.code, openedBy: "row-click" })}
          onKeyDown={(event) => {
            if (event.key !== "Enter" && event.key !== " ") return;
            event.preventDefault();
            open({ kind: "editor", code: row.code, openedBy: "keyboard" });
          }}
        >
          <Pencil aria-hidden="true" className="size-4" />
        </Button>
      </span>
    ) : null;

  return (
    <StepUpGate>
      {(guard) => (
        <div data-testid="admin-section-countries" className="min-w-0 space-y-4">
          <DataTable<CountryRow>
            columns={columns}
            rows={rows}
            rowKey={(row) => row.code}
            rowTestId={(row) => `country-${row.code}`}
            caption={t("admin.countries.caption")}
            cardUntil="lg"
            loading={query.isLoading}
            loadingState={<p className="text-sm">{t("admin.countries.loading")}</p>}
            error={query.error}
            errorState={
              <p role="alert" className="text-sm text-destructive">
                {t("admin.countries.error")}
              </p>
            }
            emptyState={
              <p className="text-sm text-muted-foreground">{t("admin.countries.empty")}</p>
            }
            toolbar={
              /**
               * L2d — the categories shape: the find group and the transfer
               * group are DIRECT children of the primitive's toolbar row, the
               * legend wraps beneath them; no stacked labels (C1).
               */
              <>
                <CountriesToolbar
                  search={search}
                  onSearch={(value) => {
                    setSearch(value);
                    setPage(0);
                  }}
                  status={status}
                  onStatus={(value) => {
                    setStatus(value);
                    setPage(0);
                  }}
                  pageSize={pageSize}
                  onPageSize={(next) => {
                    setPageSize(next);
                    setPage(0);
                    window.localStorage.setItem(PAGE_SIZE_STORAGE_KEY, String(next));
                  }}
                />
                <div
                  data-testid="country-toolbar-transfer"
                  className="flex flex-wrap items-center gap-2"
                >
                  {/* A markets file names its own countries: never scoped. */}
                  <span
                    className="text-sm text-muted-foreground"
                    data-testid="country-transfer-scope"
                  >
                    {`${t("admin.countries.transfer.scope")} ·`}
                  </span>
                  <Button
                    type="button"
                    variant="outline"
                    size="touch"
                    title={t("admin.locations.export.countriesHint")}
                    data-testid="country-export"
                    disabled={exporting}
                    onClick={() => void runExport()}
                  >
                    <Download aria-hidden="true" className="size-4" />
                    <span>
                      {exporting
                        ? t("admin.locations.export.busy")
                        : t("admin.locations.export.countries")}
                    </span>
                  </Button>
                  {mayImport ? (
                    <Button
                      type="button"
                      variant="outline"
                      size="touch"
                      data-testid="country-import"
                      onClick={() => open({ kind: "import" })}
                    >
                      <Upload aria-hidden="true" className="size-4" />
                      <span>{t("admin.countries.import.title")}</span>
                    </Button>
                  ) : null}
                  {exportError ? (
                    <p
                      role="alert"
                      className="w-full text-sm text-destructive"
                      data-testid="country-export-error"
                    >
                      {t("admin.locations.export.error")}
                    </p>
                  ) : null}
                </div>
                <p
                  className="basis-full text-xs text-muted-foreground"
                  data-testid="country-legend"
                >
                  {`${t("admin.countries.tip.open")} ${t("admin.countries.tip.closed")}`}
                </p>
              </>
            }
            rowActions={rowActions}
            page={page}
            pageSize={pageSize}
            pagination={
              <DataTablePagination
                testid="country-pagination"
                offset={page * pageSize}
                pageSize={pageSize}
                total={rows.length}
                onPrevious={() => setPage((current) => Math.max(0, current - 1))}
                onNext={() => setPage((current) => current + 1)}
              />
            }
          />

          {selected !== null ? (
            <CountryEditorDialog
              key="country-editor"
              row={selected}
              guard={guard}
              openedBy={dialog.kind === "editor" ? dialog.openedBy : "row-click"}
              onClose={close}
              verbBar={
                <CountryVerbBar
                  row={selected}
                  mayUpdate={mayUpdate}
                  mayActivate={mayActivate}
                  onActive={() => open({ kind: "active", code: selected.code })}
                  onRailOrder={() => open({ kind: "rail", code: selected.code })}
                />
              }
            />
          ) : null}
          {dialog.kind === "active" && byCode.get(dialog.code) !== undefined ? (
            <CountryActiveDialog
              row={byCode.get(dialog.code) as CountryRow}
              guard={guard}
              onClose={close}
            />
          ) : null}
          {dialog.kind === "rail" && byCode.get(dialog.code) !== undefined ? (
            <CountryRailOrderDialog
              row={byCode.get(dialog.code) as CountryRow}
              guard={guard}
              onClose={close}
            />
          ) : null}
          {dialog.kind === "import" ? (
            <ImportCountriesDialog guard={guard} onClose={close} />
          ) : null}
        </div>
      )}
    </StepUpGate>
  );
}

export default AdminCountriesPage;
