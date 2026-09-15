import {
  ArrowDownUp,
  Download,
  MoveRight,
  Pencil,
  Plus,
  RotateCcw,
  Trash2,
  Upload,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";

import {
  DataTable,
  DataTablePagination,
  type DataTableColumn,
} from "@/components/shell/data-table";
import { PageCard } from "@/components/shell/page-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAdminShell } from "@/features/admin/admin-context";
import { SELECT_CLASS } from "@/features/admin-categories/category-dialogs";
import { StepUpGate } from "@/features/auth/mfa/step-up-gate";
import type { GuardFn } from "@/features/auth/mfa/use-step-up";
import { useI18n, type MessageKey } from "@/i18n";
import { supabase } from "@/integrations/supabase/client";

import { LocationCreateDialog, LocationEditDialog } from "./location-dialogs";
import { ImportLocationsDialog } from "./location-import-dialog";
import {
  LocationActiveDialog,
  LocationDeleteDialog,
  LocationMoveDialog,
  LocationReorderDialog,
} from "./location-verb-dialogs";
import {
  keyTestId,
  LOCATION_COLUMN_PRIORITIES,
  LOCATION_LEVELS,
  childLevelOf,
  toRoster,
  type LocationNode,
} from "./locations-service";
import { useAdminLocations, useAllCountries, useLocationAncestry } from "./use-locations";

/**
 * LOCATIONS ERA L2a — THE LOCATIONS CONSOLE, PART 1.
 *
 * Gate tier: `locations:view` opens the section (the /admin layout owns it);
 * every write re-checks its own granular permission AND step-up inside the door
 * (F3), so the disabled states below are convenience, never authority.
 *
 * TWO tabs today — Tree and Import & export. Countries and Coverage arrive at
 * L2b and are deliberately NOT scaffolded: C4 forbids a placeholder standing in
 * for a screen that does not exist yet.
 *
 * The roster is ONE DataTable with `cardUntil="lg"` (the tablet band would
 * crush a seven-column geography table) and priorities only — no `minWidth`
 * anywhere, no per-page width hack (C7).
 */

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100] as const;
const DEFAULT_PAGE_SIZE = 25;
const PAGE_SIZE_STORAGE_KEY = "ethio.admin.locations.pageSize";

type Dialog =
  | { kind: "none" }
  | { kind: "create"; parentId: string }
  | { kind: "edit"; id: string }
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
  /**
   * Creation in this tab is ALWAYS "a child of a row": a country anchor is born
   * by opening a market (L2b). The toolbar verb therefore needs a chosen parent,
   * and says so in words until one exists.
   */
  const [parentId, setParentId] = useState<string | null>(null);
  const [exporting, setExporting] = useState(false);
  const [exportError, setExportError] = useState(false);

  /** Page size is a device setting, read after mount so SSR and hydration agree. */
  useEffect(() => {
    const stored = Number(window.localStorage.getItem(PAGE_SIZE_STORAGE_KEY) ?? "");
    if (PAGE_SIZE_OPTIONS.includes(stored as (typeof PAGE_SIZE_OPTIONS)[number])) {
      setPageSize(stored);
    }
  }, []);

  /** The markets, open first; the default is the first OPEN one. */
  const markets = useMemo(() => {
    const rows = countries.data ?? [];
    return [...rows].sort(
      (a, b) =>
        Number(b.isActive) - Number(a.isActive) ||
        a.displayOrder - b.displayOrder ||
        a.code.localeCompare(b.code),
    );
  }, [countries.data]);

  useEffect(() => {
    if (country !== "" || markets.length === 0) return;
    setCountry((markets.find((market) => market.isActive) ?? markets[0])?.code ?? "");
  }, [country, markets]);

  const query = useAdminLocations(
    country === ""
      ? null
      : {
          countryCode: country,
          search,
          level: level === "" ? null : level,
          active: status === "" ? null : status === "active",
        },
  );
  const ancestry = useLocationAncestry(country);
  const roster = useMemo(
    () => toRoster(query.data ?? [], ancestry.data ?? []),
    [query.data, ancestry.data],
  );
  const byId = useMemo(() => new Map(roster.map((row) => [row.id, row])), [roster]);
  /**
   * The market's whole tree, unfiltered — the move and reorder pickers judge
   * candidates against the COUNTRY, never against the operator's search.
   */
  const countryRoster = useMemo(
    () => toRoster(ancestry.data ?? [], ancestry.data ?? []),
    [ancestry.data],
  );
  const parent = parentId === null ? null : (byId.get(parentId) ?? null);

  const open = (next: Dialog) => setDialog(next);
  const close = () => setDialog({ kind: "none" });
  const select = (row: LocationNode) => setParentId(row.id);

  /**
   * The export button posts nothing: it GETs the L1b route with the file name
   * and the current market as the scope (no scope = every market) and hands the
   * browser the CSV. The bearer comes from the live session, exactly as the
   * categories export does (B3). Every failure is announced (F4).
   */
  const runExport = async (file: "countries" | "locations") => {
    setExporting(true);
    setExportError(false);
    try {
      const { data: session } = await supabase.auth.getSession();
      const token = session.session?.access_token ?? "";
      const scope = country === "" ? "" : `&scope=${encodeURIComponent(country)}`;
      const response = await fetch(`/api/admin/locations/export?file=${file}${scope}`, {
        headers: token === "" ? {} : { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error(`export failed: ${response.status}`);
      const blob = await response.blob();
      const href = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = href;
      anchor.download =
        file === "countries" || country === "" ? `${file}.csv` : `${country}-${file}.csv`;
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
          <Badge variant="secondary" data-testid={`location-${keyTestId(row.key)}-level`}>
            {t(`admin.locations.level.${row.level}` as MessageKey)}
          </Badge>
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
        <Badge
          variant={row.isActive ? "default" : "outline"}
          data-testid={`location-${keyTestId(row.key)}-status`}
          title={t(row.isActive ? "admin.locations.tip.active" : "admin.locations.tip.retired")}
        >
          {t(row.isActive ? "admin.locations.badge.active" : "admin.locations.badge.retired")}
        </Badge>
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

  const rowActions = (row: LocationNode, guard: GuardFn) => {
    const id = keyTestId(row.key);
    const verb = (
      suffix: string,
      labelKey: MessageKey,
      icon: React.ReactNode,
      onClick: () => void,
      disabled = false,
      hint?: MessageKey,
    ) => (
      <Button
        key={suffix}
        type="button"
        variant="outline"
        size="touch"
        data-testid={`location-${suffix}-${id}`}
        title={disabled && hint !== undefined ? t(hint) : t(labelKey)}
        disabled={disabled}
        onClick={onClick}
      >
        {icon}
        <span>{t(labelKey)}</span>
      </Button>
    );
    const blocked =
      row.childCount > 0 ||
      row.listingCount > 0 ||
      row.coverageCount > 0 ||
      row.profileDefaultCount > 0;

    return (
      <div className="flex min-w-0 flex-wrap gap-2" data-testid={`location-${id}-verbs`}>
        {mayCreate
          ? verb(
              "create-child",
              "admin.locations.action.createChild",
              <Plus aria-hidden="true" className="size-4" />,
              () => {
                select(row);
                open({ kind: "create", parentId: row.id });
              },
              childLevelOf(row.level) === null,
              "admin.locations.action.floor",
            )
          : null}
        {mayUpdate
          ? verb(
              "edit",
              "admin.locations.action.edit",
              <Pencil aria-hidden="true" className="size-4" />,
              () => {
                select(row);
                open({ kind: "edit", id: row.id });
              },
            )
          : null}
        {mayUpdate
          ? verb(
              row.isActive ? "retire" : "activate",
              row.isActive ? "admin.locations.action.retire" : "admin.locations.action.activate",
              <RotateCcw aria-hidden="true" className="size-4" />,
              () => open({ kind: "active", id: row.id }),
            )
          : null}
        {mayRestructure
          ? verb(
              "move",
              "admin.locations.action.move",
              <MoveRight aria-hidden="true" className="size-4" />,
              () => open({ kind: "move", id: row.id }),
              row.level === "country",
              "admin.locations.action.anchorFixed",
            )
          : null}
        {mayUpdate
          ? verb(
              "reorder",
              "admin.locations.action.reorder",
              <ArrowDownUp aria-hidden="true" className="size-4" />,
              () => open({ kind: "reorder", id: row.id }),
              row.level === "country",
              "admin.locations.error.orderCountriesInProfile",
            )
          : null}
        {mayRestructure
          ? verb(
              "delete",
              "admin.locations.action.delete",
              <Trash2 aria-hidden="true" className="size-4" />,
              () => open({ kind: "delete", id: row.id }),
              blocked,
              "admin.locations.action.deleteBlocked",
            )
          : null}
        {/* The guard is threaded through the dialogs, not the row buttons. */}
        <span
          className="hidden"
          aria-hidden="true"
          data-guard={guard === undefined ? "" : "ready"}
        />
      </div>
    );
  };

  const toolbar = (
    <div className="flex min-w-0 flex-col gap-3" data-testid="location-toolbar-find">
      <div className="flex min-w-0 flex-wrap gap-3">
        <label className="flex min-w-0 flex-col gap-1 text-sm">
          <span>{t("admin.locations.filter.country")}</span>
          <select
            className={`${SELECT_CLASS} md:w-56`}
            data-testid="location-country-filter"
            value={country}
            onChange={(event) => {
              setCountry(event.target.value);
              setParentId(null);
              setPage(0);
            }}
          >
            {markets.map((market) => (
              <option key={market.code} value={market.code}>
                {market.isActive
                  ? market.nameEn
                  : `${market.nameEn} (${t("admin.locations.filter.closedMarket")})`}
              </option>
            ))}
          </select>
        </label>

        <label className="flex min-w-0 flex-col gap-1 text-sm">
          <span>{t("admin.locations.filter.level")}</span>
          <select
            className={`${SELECT_CLASS} md:w-40`}
            data-testid="location-level-filter"
            value={level}
            onChange={(event) => {
              setLevel(event.target.value);
              setPage(0);
            }}
          >
            <option value="">{t("admin.locations.filter.allLevels")}</option>
            {LOCATION_LEVELS.map((name) => (
              <option key={name} value={name}>
                {t(`admin.locations.level.${name}` as MessageKey)}
              </option>
            ))}
          </select>
        </label>

        <label className="flex min-w-0 flex-col gap-1 text-sm">
          <span>{t("admin.locations.filter.status")}</span>
          <select
            className={`${SELECT_CLASS} md:w-40`}
            data-testid="location-active-filter"
            value={status}
            onChange={(event) => {
              setStatus(event.target.value);
              setPage(0);
            }}
          >
            <option value="">{t("admin.locations.filter.allStatuses")}</option>
            <option value="active">{t("admin.locations.filter.activeOnly")}</option>
            <option value="retired">{t("admin.locations.filter.retiredOnly")}</option>
          </select>
        </label>

        <label className="flex min-w-0 flex-col gap-1 text-sm">
          <span>{t("admin.locations.filter.pageSize")}</span>
          <select
            className={`${SELECT_CLASS} md:w-32`}
            data-testid="location-page-size"
            value={pageSize}
            onChange={(event) => {
              const next = Number(event.target.value);
              setPageSize(next);
              setPage(0);
              window.localStorage.setItem(PAGE_SIZE_STORAGE_KEY, String(next));
            }}
          >
            {PAGE_SIZE_OPTIONS.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </label>
      </div>

      <Input
        data-testid="location-search"
        className="md:w-72"
        placeholder={t("admin.locations.searchPlaceholder")}
        value={search}
        onChange={(event) => {
          setSearch(event.target.value);
          setPage(0);
        }}
      />
    </div>
  );

  return (
    <StepUpGate>
      {(guard) => (
        <div data-testid="admin-section-locations" className="min-w-0 space-y-4">
          <Tabs defaultValue="tree" className="min-w-0">
            <TabsList>
              <TabsTrigger value="tree" data-testid="location-tab-tree">
                {t("admin.locations.tab.tree")}
              </TabsTrigger>
              <TabsTrigger value="transfer" data-testid="location-tab-transfer">
                {t("admin.locations.tab.transfer")}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="tree" className="min-w-0 space-y-4">
              {mayCreate ? (
                <PageCard testid="location-create-card">
                  <Button
                    type="button"
                    size="touch"
                    className="w-full md:w-auto"
                    data-testid="location-create-open"
                    disabled={parent === null || childLevelOf(parent.level) === null}
                    title={parent === null ? t("admin.locations.create.rootHint") : parent.path}
                    onClick={() =>
                      parent === null ? undefined : open({ kind: "create", parentId: parent.id })
                    }
                  >
                    {t("admin.locations.create.open")}
                  </Button>
                  {parent === null ? (
                    <p
                      className="mt-2 text-sm text-muted-foreground"
                      data-testid="location-create-hint"
                    >
                      {t("admin.locations.create.rootHint")}
                    </p>
                  ) : null}
                </PageCard>
              ) : null}

              <DataTable<LocationNode>
                columns={columns}
                rows={roster}
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
                toolbar={toolbar}
                rowActions={(row) => rowActions(row, guard)}
                page={page}
                pageSize={pageSize}
                pagination={
                  <DataTablePagination
                    testid="location-pagination"
                    offset={page * pageSize}
                    pageSize={pageSize}
                    total={roster.length}
                    onPrevious={() => setPage((current) => Math.max(0, current - 1))}
                    onNext={() => setPage((current) => current + 1)}
                  />
                }
              />
            </TabsContent>

            <TabsContent value="transfer" className="min-w-0 space-y-4">
              <PageCard testid="location-toolbar-transfer">
                <p className="text-sm text-muted-foreground">
                  {t("admin.locations.transfer.wholeFile")}
                </p>
                <div className="mt-3 flex min-w-0 flex-col gap-2 sm:flex-row sm:flex-wrap">
                  <Button
                    type="button"
                    variant="outline"
                    size="touch"
                    data-testid="location-export-countries"
                    disabled={exporting}
                    onClick={() => void runExport("countries")}
                  >
                    <Download aria-hidden="true" className="size-4" />
                    <span>
                      {exporting
                        ? t("admin.locations.export.busy")
                        : t("admin.locations.export.countries")}
                    </span>
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="touch"
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
                      size="touch"
                      data-testid="location-import"
                      onClick={() => open({ kind: "import" })}
                    >
                      <Upload aria-hidden="true" className="size-4" />
                      <span>{t("admin.locations.import.open")}</span>
                    </Button>
                  ) : null}
                </div>
                {exportError ? (
                  <p
                    role="alert"
                    className="mt-2 text-sm text-destructive"
                    data-testid="location-export-error"
                  >
                    {t("admin.locations.export.error")}
                  </p>
                ) : null}
              </PageCard>
            </TabsContent>
          </Tabs>

          {dialog.kind === "create" && byId.get(dialog.parentId) !== undefined ? (
            <LocationCreateDialog
              parent={byId.get(dialog.parentId) as LocationNode}
              guard={guard}
              onClose={close}
            />
          ) : null}
          {dialog.kind === "edit" && byId.get(dialog.id) !== undefined ? (
            <LocationEditDialog
              row={byId.get(dialog.id) as LocationNode}
              guard={guard}
              onClose={close}
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
              roster={countryRoster}
              guard={guard}
              onClose={close}
            />
          ) : null}
          {dialog.kind === "reorder" && byId.get(dialog.id) !== undefined ? (
            <LocationReorderDialog
              row={byId.get(dialog.id) as LocationNode}
              roster={countryRoster}
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
              scope={country === "" ? null : country}
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
