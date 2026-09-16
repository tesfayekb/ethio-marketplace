import { Download, Pencil, Plus, Upload } from "lucide-react";
import { useDeferredValue, useEffect, useMemo, useState } from "react";

import {
  DataTable,
  DataTablePagination,
  type DataTableColumn,
} from "@/components/shell/data-table";
import { TipBadge } from "@/components/shell/tip-badge";
import { Button } from "@/components/ui/button";
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
import { LocationsToolbar, PAGE_SIZE_OPTIONS } from "./locations-toolbar";
import {
  childLevelOf,
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
 * The roster follows the CATEGORIES CONVENTION: one 44px pencil per row, the
 * row itself opens the same editor, and every verb lives in the editor's verb
 * bar (CT-8). Six buttons in a table cell were what clipped the end column and
 * pushed the page sideways at 1280.
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

  const columns: DataTableColumn<LocationNode>[] = [
    {
      key: "name",
      header: t("admin.locations.col.name"),
      priority: LOCATION_COLUMN_PRIORITIES.name,
      cell: (row) => (
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <span
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
      cell: (row) => <span className="min-w-0 break-words text-sm">{row.path}</span>,
    },
    {
      key: "status",
      header: t("admin.locations.col.status"),
      priority: LOCATION_COLUMN_PRIORITIES.status,
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

  /**
   * ONE VERB IN THE ROW (the categories rowActions, verbatim in spirit): a 44px
   * pencil that opens the editor, and the row itself does the same on click or
   * on Enter/Space. The end column keeps the primitive's own width.
   */
  const rowActions = (row: LocationNode) =>
    mayUpdate ? (
      <span className="flex items-center xl:justify-end">
        <Button
          type="button"
          variant="outline"
          className="size-11 shrink-0 p-0"
          data-testid={`location-edit-${keyTestId(row.key)}`}
          aria-label={t("admin.locations.action.edit")}
          title={t("admin.locations.action.edit")}
          onClick={() => open({ kind: "editor", id: row.id, openedBy: "row-click" })}
          onKeyDown={(event) => {
            if (event.key !== "Enter" && event.key !== " ") return;
            event.preventDefault();
            open({ kind: "editor", id: row.id, openedBy: "keyboard" });
          }}
        >
          <Pencil aria-hidden="true" className="size-4" />
        </Button>
      </span>
    ) : null;

  return (
    <StepUpGate>
      {(guard) => (
        <div data-testid="admin-section-locations" className="min-w-0 space-y-4">
          <div className="flex min-w-0 flex-wrap items-center justify-end gap-3">
            {mayCreate ? (
              <Button
                type="button"
                size="touch"
                data-testid="location-create-open"
                disabled={anchorId === ""}
                onClick={() => open({ kind: "create", parentId: anchorId, fixed: false })}
              >
                <Plus aria-hidden="true" className="size-4" />
                <span>{t("admin.locations.create.open")}</span>
              </Button>
            ) : null}
          </div>

          <DataTable<LocationNode>
            columns={columns}
            rows={rows}
            rowKey={(row) => row.id}
            rowTestId={(row) => `location-${keyTestId(row.key)}`}
            caption={t("admin.locations.caption")}
            cardUntil="lg"
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
              /**
               * L2d — THE TOOLBAR READS IN GROUPS (the categories shape): the
               * find group and the transfer group are DIRECT children of the
               * primitive's own toolbar row, the market state and the legend
               * wrap beneath them on every width. No stacked labels (C1).
               */
              <>
                <LocationsToolbar
                  markets={markets}
                  country={country}
                  onCountry={(code) => {
                    setCountry(code);
                    setPage(0);
                  }}
                  search={search}
                  onSearch={(value) => {
                    setSearch(value);
                    setPage(0);
                  }}
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
                  pageSize={pageSize}
                  onPageSize={(next) => {
                    setPageSize(next);
                    setPage(0);
                    window.localStorage.setItem(PAGE_SIZE_STORAGE_KEY, String(next));
                  }}
                />
                <div
                  data-testid="location-toolbar-transfer"
                  className="flex flex-wrap items-center gap-2"
                >
                  {/* The scope reads INLINE, before the buttons it governs. */}
                  <span
                    className="text-sm text-muted-foreground"
                    data-testid="location-transfer-scope"
                  >
                    {country === ""
                      ? `${t("admin.locations.transfer.scopeAll")} ·`
                      : `${t("admin.locations.transfer.scope").replace("{country}", countryName)} ·`}
                  </span>
                  <Button
                    type="button"
                    variant="outline"
                    size="touch"
                    title={t("admin.locations.export.locationsHint")}
                    data-testid="location-export-locations"
                    disabled={exporting}
                    onClick={() => void runExport("locations")}
                  >
                    <Download aria-hidden="true" className="size-4" />
                    <span>
                      {exporting
                        ? t("admin.locations.export.busy")
                        : t("admin.locations.export.locations")}
                    </span>
                  </Button>
                  {mayImport ? (
                    <Button
                      type="button"
                      variant="outline"
                      size="touch"
                      data-testid="location-import"
                      onClick={() => open({ kind: "import" })}
                    >
                      <Upload aria-hidden="true" className="size-4" />
                      <span>{t("admin.locations.import.openPlaces")}</span>
                    </Button>
                  ) : null}
                  {exportError ? (
                    <p
                      role="alert"
                      className="w-full text-sm text-destructive"
                      data-testid="location-export-error"
                    >
                      {t("admin.locations.export.error")}
                    </p>
                  ) : null}
                </div>
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
