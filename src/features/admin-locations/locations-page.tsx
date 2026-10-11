import { ArrowDownUp, Download, MapPin, MoveRight, Plus, RotateCcw, Upload } from "lucide-react";
import { useDeferredValue, useEffect, useMemo, useState } from "react";

import { ColumnsButton } from "@/components/shell/columns-button";
import { useHiddenColumns, visibleColumns } from "@/components/shell/columns-state";
import {
  DataTable,
  DataTablePagination,
  type DataTableColumn,
} from "@/components/shell/data-table";
import { FilterChips, FiltersButton } from "@/components/shell/filter-chips";
import { RowActions, type RowMoreAction } from "@/components/shell/row-actions";
import { TableActionButton, TableActions } from "@/components/shell/table-actions";
import { TableToolbar } from "@/components/shell/table-toolbar";
import { TipBadge } from "@/components/shell/tip-badge";
import { Input } from "@/components/ui/input";
import { useAdminShell } from "@/features/admin/admin-context";
import { StepUpGate } from "@/features/auth/mfa/step-up-gate";
import { useI18n, type MessageKey } from "@/i18n";
import { supabase } from "@/integrations/supabase/client";

import { LocationCreateDialog } from "./location-dialogs";
import { LocationEditorDialog } from "./location-editor";
import { ImportLocationsDialog } from "./location-import-dialog";
import { LocationVerbBar } from "./location-verb-bar";
import {
  LocationActiveDialog,
  LocationDeleteDialog,
  LocationMoveDialog,
  LocationReorderDialog,
} from "./location-verb-dialogs";
import { LocationFilters, MarketPicker, PAGE_SIZE_OPTIONS } from "./locations-toolbar";
import {
  childLevelOf,
  deleteBlockedKey,
  filterLocations,
  keyTestId,
  LOCATION_COLUMN_PRIORITIES,
  toRoster,
  type LocationNode,
} from "./locations-service";
import { useAdminLocations, useAllCountries } from "./use-locations";

/**
 * LOCATIONS ERA L2a-R — THE LOCATIONS CONSOLE, PART 1, RECONCILED.
 *
 * Gate tier: `locations:view` opens the section (the /admin layout owns it);
 * every write re-checks its own granular permission AND step-up inside the door
 * (F3), so the disabled states below are convenience, never authority.
 *
 * Bundle 11 B1 (D118, D128) — on the agreed blocks: the header's actions
 * (TableActions: Export and Import for the chosen scope, then New place); the
 * toolbar (the market as the table's scope · search · Filters with level and
 * status · Columns, chips under it); the row's actions (RowActions: Edit, Delete
 * in red — off, as in the verb bar, while the door would refuse it — and the
 * three-dots menu with Add a place under it, Retire or Activate, Move and
 * Reorder; the editor's verb bar keeps them all and says why Delete is off);
 * the footer's three zones with the page size. Icons and a menu replace the six
 * buttons that once clipped the end column at 1280.
 *
 * ONE READ PER COUNTRY: the door is called with the country alone and the
 * search / level / status controls sieve that roster in the browser, so nothing
 * fetches on a keystroke (G2).
 *
 * L2b-C1 — the roster OPENS on "All countries" (the door reads every market on
 * a NULL scope) and the MARKETS file moved to the Countries section: this
 * toolbar transfers places alone.
 */

const DEFAULT_PAGE_SIZE = 25;
const PAGE_SIZE_STORAGE_KEY = "ethio.admin.locations.pageSize";
const TABLE_ID = "admin-places";
const LOCKED = ["name"];

type Dialog =
  | { kind: "none" }
  | { kind: "create"; parentId: string; fixed: boolean }
  | { kind: "editor"; id: string; openedBy: string }
  | { kind: "active"; id: string }
  | { kind: "move"; id: string }
  | { kind: "reorder"; id: string }
  | { kind: "delete"; id: string }
  | { kind: "import" };

export function AdminLocationsPage() {
  const { t } = useI18n();
  const { permissions } = useAdminShell();

  const mayCreate = permissions.includes("locations:create");
  const mayUpdate = permissions.includes("locations:update");
  const mayRestructure = permissions.includes("locations:restructure");
  const mayImport = permissions.includes("locations:import");

  const countries = useAllCountries();
  const [country, setCountry] = useState("");
  const [search, setSearch] = useState("");
  const [level, setLevel] = useState("");
  const [status, setStatus] = useState("");
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE);
  const [dialog, setDialog] = useState<Dialog>({ kind: "none" });
  const [exporting, setExporting] = useState(false);
  const [exportError, setExportError] = useState(false);
  const [hidden, toggleColumn] = useHiddenColumns(TABLE_ID);

  /** Page size is a device setting, read after mount so SSR and hydration agree. */
  useEffect(() => {
    const stored = Number(window.localStorage.getItem(PAGE_SIZE_STORAGE_KEY) ?? "");
    if (PAGE_SIZE_OPTIONS.includes(stored as (typeof PAGE_SIZE_OPTIONS)[number])) {
      setPageSize(stored);
    }
  }, []);

  /** Every market: open first A–Z, then closed A–Z. */
  const markets = useMemo(() => {
    const rows = countries.data ?? [];
    return [...rows].sort(
      (a, b) =>
        Number(b.isActive) - Number(a.isActive) ||
        a.nameEn.localeCompare(b.nameEn) ||
        a.code.localeCompare(b.code),
    );
  }, [countries.data]);

  const query = useAdminLocations(country);
  const countryName = markets.find((market) => market.code === country)?.nameEn ?? country;
  /** The full tree remains the ancestry source; country anchors never render. */
  const roster = useMemo(() => toRoster(query.data ?? []), [query.data]);
  const places = useMemo(() => roster.filter((row) => row.level !== "country"), [roster]);
  const byId = useMemo(() => new Map(places.map((row) => [row.id, row])), [places]);
  /** A keystroke sieves, never fetches; deferring keeps typing smooth. */
  const deferredSearch = useDeferredValue(search);
  const rows = useMemo(
    () => filterLocations(places, { search: deferredSearch, level, status }),
    [places, deferredSearch, level, status],
  );
  /** Every row that can still hold a child — the create dialog's picker. */
  const parents = useMemo(() => roster.filter((row) => childLevelOf(row.level) !== null), [roster]);
  const anchorId = useMemo(
    () => roster.find((row) => row.level === "country")?.id ?? parents[0]?.id ?? "",
    [roster, parents],
  );
  const selectedMarket = markets.find((market) => market.code === country) ?? null;

  const open = (next: Dialog) => setDialog(next);
  const close = () => setDialog({ kind: "none" });
  const selected = dialog.kind === "editor" ? (byId.get(dialog.id) ?? null) : null;

  /**
   * The export button posts nothing: it GETs the L1b route with the file name
   * and the current market as the scope (no scope = every market) and hands the
   * browser the CSV. The bearer comes from the live session, exactly as the
   * categories export does (B3). Every failure is announced (F4).
   */
  const runExport = async (file: "locations") => {
    setExporting(true);
    setExportError(false);
    try {
      const { data: session } = await supabase.auth.getSession();
      const token = session.session?.access_token ?? "";
      // L2b-C1 — "All countries" carries NO scope: the route then exports every
      // market's places, and the file is named for the scope it was taken at.
      const scope = country === "" ? "" : `&scope=${encodeURIComponent(country)}`;
      const response = await fetch(`/api/admin/locations/export?file=${file}${scope}`, {
        headers: token === "" ? {} : { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error(`export failed: ${response.status}`);
      const blob = await response.blob();
      const href = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = href;
      anchor.download = `${country === "" ? "all" : country}-${file}.csv`;
      document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(href);
    } catch (error) {
      console.error("[locations] export failed", error);
      setExportError(true);
    } finally {
      setExporting(false);
    }
  };

  const allColumns: DataTableColumn<LocationNode>[] = [
    {
      key: "name",
      header: t("admin.locations.col.name"),
      priority: LOCATION_COLUMN_PRIORITIES.name,
      card: "title",
      cell: (row) => (
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          {/* The tree indent: the table's alone (a phone card is not a tree). */}
          <span
            data-indent=""
            className="min-w-0 break-words font-medium"
            style={{ marginInlineStart: `${row.depth * 12}px` }}
          >
            {row.nameEn}
          </span>
          <TipBadge
            variant="outline"
            label={t(`admin.locations.level.${row.level}` as MessageKey)}
            tip={t("admin.locations.field.readOnlyLevel")}
            testid={`location-${keyTestId(row.key)}-level`}
          />
        </div>
      ),
    },
    {
      key: "path",
      header: t("admin.locations.col.path"),
      priority: LOCATION_COLUMN_PRIORITIES.path,
      card: "sub",
      cell: (row) => <span className="min-w-0 break-words text-sm">{row.path}</span>,
    },
    {
      key: "status",
      header: t("admin.locations.col.status"),
      priority: LOCATION_COLUMN_PRIORITIES.status,
      card: "badge",
      cell: (row) => (
        <TipBadge
          variant={row.isActive ? "secondary" : "destructive"}
          label={t(row.isActive ? "admin.locations.badge.active" : "admin.locations.badge.retired")}
          tip={t(row.isActive ? "admin.locations.tip.active" : "admin.locations.tip.retired")}
          testid={`location-${keyTestId(row.key)}-status`}
        />
      ),
    },
    {
      key: "counts",
      header: t("admin.locations.col.counts"),
      priority: LOCATION_COLUMN_PRIORITIES.counts,
      card: "meta",
      align: "end",
      cell: (row) => (
        <span
          className="tabular-nums text-sm"
          title={t("admin.locations.counts.hint")}
          data-testid={`location-${keyTestId(row.key)}-counts`}
        >
          {`${row.listingCount} · ${row.coverageCount} · ${row.profileDefaultCount}`}
        </span>
      ),
    },
    {
      key: "order",
      header: t("admin.locations.col.order"),
      priority: LOCATION_COLUMN_PRIORITIES.order,
      card: "foot",
      align: "end",
      cell: (row) => <span className="tabular-nums text-sm">{row.displayOrder}</span>,
    },
    {
      key: "aliases",
      header: t("admin.locations.col.aliases"),
      priority: LOCATION_COLUMN_PRIORITIES.aliases,
      align: "end",
      cell: (row) => <span className="tabular-nums text-sm">{row.aliases.length}</span>,
    },
    {
      key: "iso",
      header: t("admin.locations.col.iso"),
      priority: LOCATION_COLUMN_PRIORITIES.iso,
      cell: (row) => <span className="text-sm">{row.iso ?? "—"}</span>,
    },
  ];

  const columns = visibleColumns(allColumns, hidden, LOCKED);

  const setPageSizeKept = (next: number) => {
    setPageSize(next);
    setPage(0);
    window.localStorage.setItem(PAGE_SIZE_STORAGE_KEY, String(next));
  };

  /** Bundle 11 B1 — the verb bar's own gates, the same doors (F3). */
  const rowActions = (row: LocationNode) => {
    const more: RowMoreAction[] = [];
    if (mayCreate && childLevelOf(row.level) !== null) {
      more.push({
        key: "create-child",
        label: t("admin.locations.action.createChild"),
        icon: <Plus />,
        onSelect: () => open({ kind: "create", parentId: row.id, fixed: true }),
      });
    }
    if (mayUpdate) {
      more.push({
        key: row.isActive ? "retire" : "activate",
        label: t(
          row.isActive ? "admin.locations.action.retire" : "admin.locations.action.activate",
        ),
        icon: <RotateCcw />,
        onSelect: () => open({ kind: "active", id: row.id }),
      });
    }
    if (mayRestructure && row.level !== "country") {
      more.push({
        key: "move",
        label: t("admin.locations.action.move"),
        icon: <MoveRight />,
        onSelect: () => open({ kind: "move", id: row.id }),
      });
    }
    if (mayUpdate && row.level !== "country") {
      more.push({
        key: "reorder",
        label: t("admin.locations.action.reorder"),
        icon: <ArrowDownUp />,
        onSelect: () => open({ kind: "reorder", id: row.id }),
      });
    }
    return (
      <RowActions
        testid={`location-actions-${keyTestId(row.key)}`}
        name={row.nameEn}
        edit={
          mayUpdate
            ? {
                label: t("admin.locations.action.edit"),
                onSelect: () => open({ kind: "editor", id: row.id, openedBy: "row-click" }),
              }
            : undefined
        }
        remove={
          mayRestructure
            ? {
                label: t("admin.locations.action.delete"),
                disabled: deleteBlockedKey(row) !== null,
                onSelect: () => open({ kind: "delete", id: row.id }),
              }
            : undefined
        }
        more={more}
      />
    );
  };

  const chips = [
    ...(level === ""
      ? []
      : [
          {
            key: "level",
            label: t(`admin.locations.level.${level}` as MessageKey),
            onRemove: () => {
              setLevel("");
              setPage(0);
            },
          },
        ]),
    ...(status === ""
      ? []
      : [
          {
            key: "status",
            label: t(
              status === "active"
                ? "admin.locations.filter.activeOnly"
                : "admin.locations.filter.retiredOnly",
            ),
            onRemove: () => {
              setStatus("");
              setPage(0);
            },
          },
        ]),
  ];

  return (
    <StepUpGate>
      {(guard) => (
        <div data-testid="admin-section-locations" className="min-w-0 space-y-4">
          <TableActions testid="location-header" title={t("admin.section.places.title")}>
            <div
              data-testid="location-transfer"
              className="flex flex-wrap items-center gap-1.5 md:gap-2"
            >
              {/* The scope reads INLINE, before the buttons it governs (a
                  phone reads it from the market pill under the heading). */}
              <span
                className="text-sm text-muted-foreground max-md:sr-only"
                data-testid="location-transfer-scope"
              >
                {country === ""
                  ? `${t("admin.locations.transfer.scopeAll")} ·`
                  : `${t("admin.locations.transfer.scope").replace("{country}", countryName)} ·`}
              </span>
              <TableActionButton
                title={t("admin.locations.export.locationsHint")}
                data-testid="location-export-locations"
                disabled={exporting}
                onClick={() => void runExport("locations")}
                icon={<Download />}
                label={
                  exporting
                    ? t("admin.locations.export.busy")
                    : t("admin.locations.export.locations")
                }
              />
              {mayImport ? (
                <TableActionButton
                  data-testid="location-import"
                  onClick={() => open({ kind: "import" })}
                  icon={<Upload />}
                  label={t("admin.locations.import.openPlaces")}
                />
              ) : null}
            </div>
            {mayCreate ? (
              <TableActionButton
                variant="default"
                data-testid="location-create-open"
                disabled={anchorId === ""}
                onClick={() => open({ kind: "create", parentId: anchorId, fixed: false })}
                icon={<Plus />}
                label={t("admin.locations.create.open")}
              />
            ) : null}
            {exportError ? (
              <p
                role="alert"
                className="w-full text-end text-sm text-destructive"
                data-testid="location-export-error"
              >
                {t("admin.locations.export.error")}
              </p>
            ) : null}
          </TableActions>

          <DataTable<LocationNode>
            columns={columns}
            rows={rows}
            rowKey={(row) => row.id}
            rowTestId={(row) => `location-${keyTestId(row.key)}`}
            caption={t("admin.locations.caption")}
            cardUntil="lg"
            cardLead={() => <MapPin />}
            loading={query.isLoading || countries.isLoading}
            loadingState={<p className="text-sm">{t("admin.locations.loading")}</p>}
            error={query.error ?? countries.error}
            errorState={
              <p role="alert" className="text-sm text-destructive">
                {t("admin.locations.error")}
              </p>
            }
            emptyState={
              <p className="text-sm text-muted-foreground">{t("admin.locations.empty")}</p>
            }
            toolbar={
              <>
                <TableToolbar
                  testid="location-toolbar"
                  scope={
                    <MarketPicker
                      markets={markets}
                      country={country}
                      onCountry={(code) => {
                        setCountry(code);
                        setPage(0);
                      }}
                    />
                  }
                  search={
                    <Input
                      data-testid="location-search"
                      aria-label={t("admin.locations.filter.search")}
                      placeholder={t("admin.locations.searchPlaceholder")}
                      value={search}
                      onChange={(event) => {
                        setSearch(event.target.value);
                        setPage(0);
                      }}
                    />
                  }
                  filters={
                    <FiltersButton
                      testid="location-filters"
                      count={chips.length}
                      resultCount={rows.length}
                      onClearAll={() => {
                        setLevel("");
                        setStatus("");
                        setPage(0);
                      }}
                    >
                      <LocationFilters
                        level={level}
                        onLevel={(value) => {
                          setLevel(value);
                          setPage(0);
                        }}
                        status={status}
                        onStatus={(value) => {
                          setStatus(value);
                          setPage(0);
                        }}
                      />
                    </FiltersButton>
                  }
                  columns={
                    <ColumnsButton
                      testid="location-columns"
                      columns={allColumns.map((column) => ({
                        key: column.key,
                        label: String(column.header),
                        locked: LOCKED.includes(column.key),
                      }))}
                      hidden={hidden}
                      onToggle={toggleColumn}
                    />
                  }
                  chips={
                    <FilterChips
                      testid="location-chips"
                      chips={chips}
                      onClearAll={() => {
                        setLevel("");
                        setStatus("");
                        setPage(0);
                      }}
                    />
                  }
                />
                {selectedMarket ? (
                  <p
                    className="basis-full text-xs text-muted-foreground"
                    data-testid="location-market-state"
                  >
                    {t(
                      selectedMarket.isActive
                        ? "admin.locations.market.open"
                        : "admin.locations.market.closed",
                    ).replace("{country}", selectedMarket.nameEn)}
                  </p>
                ) : null}
                {/* The legend wraps UNDER everything, on every width. */}
                <p
                  className="basis-full text-xs text-muted-foreground"
                  data-testid="location-legend"
                >
                  {`${t("admin.locations.tip.active")} ${t("admin.locations.tip.retired")}`}
                </p>
              </>
            }
            rowActions={rowActions}
            actionsWidth="w-44"
            page={page}
            pageSize={pageSize}
            pagination={
              <DataTablePagination
                testid="location-pagination"
                offset={page * pageSize}
                pageSize={pageSize}
                total={rows.length}
                onPrevious={() => setPage((current) => Math.max(0, current - 1))}
                onNext={() => setPage((current) => current + 1)}
                onPage={setPage}
                pageSizeOptions={[...PAGE_SIZE_OPTIONS]}
                onPageSize={setPageSizeKept}
              />
            }
          />

          {dialog.kind === "create" ? (
            <LocationCreateDialog
              parents={parents}
              parentId={dialog.parentId}
              fixed={dialog.fixed}
              guard={guard}
              onClose={close}
            />
          ) : null}
          {selected !== null ? (
            <LocationEditorDialog
              key="location-editor"
              row={selected}
              guard={guard}
              openedBy={dialog.kind === "editor" ? dialog.openedBy : "row-click"}
              onClose={close}
              verbBar={
                <LocationVerbBar
                  row={selected}
                  mayCreate={mayCreate}
                  mayUpdate={mayUpdate}
                  mayRestructure={mayRestructure}
                  onCreateChild={() => open({ kind: "create", parentId: selected.id, fixed: true })}
                  onActive={() => open({ kind: "active", id: selected.id })}
                  onMove={() => open({ kind: "move", id: selected.id })}
                  onReorder={() => open({ kind: "reorder", id: selected.id })}
                  onDelete={() => open({ kind: "delete", id: selected.id })}
                />
              }
            />
          ) : null}
          {dialog.kind === "active" && byId.get(dialog.id) !== undefined ? (
            <LocationActiveDialog
              row={byId.get(dialog.id) as LocationNode}
              guard={guard}
              onClose={close}
            />
          ) : null}
          {dialog.kind === "move" && byId.get(dialog.id) !== undefined ? (
            <LocationMoveDialog
              row={byId.get(dialog.id) as LocationNode}
              roster={roster}
              guard={guard}
              onClose={close}
            />
          ) : null}
          {dialog.kind === "reorder" && byId.get(dialog.id) !== undefined ? (
            <LocationReorderDialog
              row={byId.get(dialog.id) as LocationNode}
              roster={roster}
              guard={guard}
              onClose={close}
            />
          ) : null}
          {dialog.kind === "delete" && byId.get(dialog.id) !== undefined ? (
            <LocationDeleteDialog
              row={byId.get(dialog.id) as LocationNode}
              guard={guard}
              onClose={close}
            />
          ) : null}
          {dialog.kind === "import" ? (
            <ImportLocationsDialog
              scope={country}
              country={countryName}
              guard={guard}
              onClose={close}
            />
          ) : null}
        </div>
      )}
    </StepUpGate>
  );
}

export default AdminLocationsPage;
