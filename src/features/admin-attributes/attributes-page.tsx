import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Download, Link2, Merge, Plus, Tags, Unlink, Upload } from "lucide-react";

import { supabase } from "@/integrations/supabase/client";

import { ColumnsButton } from "@/components/shell/columns-button";
import { useHiddenColumns, visibleColumns } from "@/components/shell/columns-state";
import {
  DataTable,
  DataTablePagination,
  type DataTableColumn,
} from "@/components/shell/data-table";
import { RowActions, type RowMoreAction } from "@/components/shell/row-actions";
import { TableActionButton, TableActions } from "@/components/shell/table-actions";
import { TableToolbar } from "@/components/shell/table-toolbar";
import { Button } from "@/components/ui/button";
import { CutText } from "@/components/ui/cut-text";
import { Input } from "@/components/ui/input";
import { NativeSelect } from "@/components/ui/native-select";
import { useAdminShell } from "@/features/admin/admin-context";
import { toRoster } from "@/features/admin-categories/categories-service";
import { useAdminCategories } from "@/features/admin-categories/use-categories";
import { StepUpGate } from "@/features/auth/mfa/step-up-gate";
import { useI18n, type MessageKey } from "@/i18n";
import { categoryFilterOptions } from "@/lib/category-filter-options";

import {
  AssignAttributeDialog,
  AttributeEditorDialog,
  DeleteAttributeDialog,
  MergeAttributesDialog,
  RemoveAttributeCategoryDialog,
} from "./attribute-dialogs";
import {
  describeOptions,
  groupByAttribute,
  typeHasOptions,
  type AttributeCategory,
  type AttributeRow,
  type EffectiveLink,
} from "./attributes-service";
import { ImportAttributesDialog } from "./import-dialog";
import { useAttributeLabel } from "./use-attribute-label";
import {
  useAdminAttributes,
  useAttributeCategories,
  useAttributeCoverage,
  useEffectiveCategoryLinks,
} from "./use-attributes";

/**
 * C3c PART B / C3-UX-1 — THE ATTRIBUTE LIBRARY.
 *
 * The definitions side of the normalized model: one row per `public.attributes`
 * definition with the blast radius (how many categories link it) in view. Gate
 * tier: `categories:view` opens the section, `categories:update` writes a
 * definition or assigns it to a category, `categories:restructure` + step-up
 * deletes or merges — every one of those re-checked server-side (F3).
 *
 * C7 parity (C3-UX-1 PART A): the roster renders ONLY through the DataTable
 * primitive at `cardUntil="lg"` — this table is dense, so the tablet band keeps
 * cards — with primitive-owned column min-widths. No per-page width hacks.
 *
 * Bundle 11 B3 (D118, D128; DEC-170) — on the agreed blocks: the header's
 * actions (TableActions: Merge, the transfer pair, then New attribute); the
 * toolbar (TableToolbar: the category as the table's SCOPE — it decides what is
 * read, exported and imported — then search · Columns; this table has no
 * filter); the row's actions (RowActions: Edit; Delete in red — the dialog
 * states the blast radius and the door refuses while a category links it,
 * C3e; the three-dots menu with Assign and, in red, Remove from category; an
 * inherited row's menu holds only "Open origin category"); the footer's three
 * zones with the page size kept in this browser. Names cut with "…" keep their
 * first five characters (D104, CutText).
 */

const TABLE_ID = "admin-attributes";
const LOCKED = ["name"];
const PAGE_SIZE_OPTIONS = [10, 25, 50, 100] as const;
const DEFAULT_PAGE_SIZE = 25;
const PAGE_SIZE_STORAGE_KEY = "ethio.admin.attributes.pageSize";

export function AdminAttributesPage() {
  const { t } = useI18n();
  // C3-UX-2 — every attribute label on this page resolves through the one
  // entity-translation resolver; `nameEn` is the fallback, never the read.
  const attributeLabel = useAttributeLabel();
  const { permissions } = useAdminShell();
  const { data, isLoading, error } = useAdminAttributes();
  const { data: categoryData } = useAdminCategories();
  const search = useSearch({ from: "/admin/attributes" });
  const navigate = useNavigate({ from: "/admin/attributes" });
  const [needleInput, setNeedleInput] = useState("");
  const [offset, setOffset] = useState(0);
  const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE);
  const [hidden, toggleColumn] = useHiddenColumns(TABLE_ID);

  useEffect(() => {
    try {
      const stored = Number(window.localStorage.getItem(PAGE_SIZE_STORAGE_KEY));
      if (PAGE_SIZE_OPTIONS.includes(stored as (typeof PAGE_SIZE_OPTIONS)[number])) {
        setPageSize(stored);
      }
    } catch {
      /* no storage access on this device; the default answers */
    }
  }, []);

  const choosePageSize = (next: number) => {
    setPageSize(next);
    setOffset(0);
    try {
      window.localStorage.setItem(PAGE_SIZE_STORAGE_KEY, String(next));
    } catch {
      /* the choice still holds for this session */
    }
  };
  const [exporting, setExporting] = useState(false);
  const [exportError, setExportError] = useState(false);

  const [dialog, setDialog] = useState<
    | { kind: "none" }
    | { kind: "edit"; id: string | null }
    | { kind: "delete"; id: string }
    | { kind: "assign"; id: string }
    | { kind: "remove"; id: string }
    | { kind: "merge" }
    | { kind: "import" }
  >({ kind: "none" });

  const mayUpdate = permissions.includes("categories:update");
  const mayRestructure = permissions.includes("categories:restructure");
  /** IE-2 — its own permission; the server re-checks it on every door (F3). */
  const mayImport = permissions.includes("categories:import");

  /** The picker mirrors the roster order/depth (B1: one derivation, `toRoster`). */
  const categories = useMemo(() => toRoster(categoryData ?? []), [categoryData]);
  /** C3-UX-5 — the same option builder the categories roster's filter uses (B3). */
  const filterOptions = useMemo(() => categoryFilterOptions(categories), [categories]);
  /** PART B — the filter is a SLUG in the URL; the id is derived, never stored. */
  const filterCategory = useMemo(
    () => categories.find((row) => row.slug === search.category) ?? null,
    [categories, search.category],
  );
  /**
   * C3-INH (DEC-044) — with a category filter active the library renders the
   * EFFECTIVE set: the category's own links plus every inherited one, each
   * carrying the category it came from. Inherited rows are read-only here;
   * their write verbs belong to the origin category (and the server refuses
   * them regardless — F3).
   */
  const links = useEffectiveCategoryLinks(filterCategory?.id ?? null);
  const effective = useMemo(() => links.data ?? [], [links.data]);
  const linkedIds = useMemo(
    () => (filterCategory === null ? null : new Set(effective.map((row) => row.attributeId))),
    [filterCategory, effective],
  );
  /** attribute id → its effective row, so the cell can name the origin. */
  const inheritedBy = useMemo(() => {
    const map = new Map<string, EffectiveLink>();
    for (const row of effective) if (row.inherited) map.set(row.attributeId, row);
    return map;
  }, [effective]);
  const inheritedRow = (row: AttributeRow): EffectiveLink | null => inheritedBy.get(row.id) ?? null;

  const all = useMemo(() => data ?? [], [data]);
  const needle = needleInput.trim().toLowerCase();
  const filtered = useMemo(
    () =>
      all.filter(
        (row) =>
          (needle === "" ||
            attributeLabel(row.id, row.nameEn).toLowerCase().includes(needle) ||
            row.attrKey.toLowerCase().includes(needle)) &&
          (linkedIds === null || linkedIds.has(row.id)),
      ),
    [all, needle, linkedIds, attributeLabel],
  );
  const selected =
    dialog.kind === "edit" ||
    dialog.kind === "delete" ||
    dialog.kind === "assign" ||
    dialog.kind === "remove"
      ? (all.find((row) => row.id === dialog.id) ?? null)
      : null;

  /** PART B — used-by, by NAME: one library-wide read, grouped per definition. */
  const usedBy = useAttributeCategories();
  const usedByAttribute = useMemo(() => groupByAttribute(usedBy.data ?? []), [usedBy.data]);
  const chipsFor = (row: AttributeRow): AttributeCategory[] => usedByAttribute.get(row.id) ?? [];

  /**
   * DEC-050 L3a — AMHARIC OPTION COVERAGE. One read for the whole library
   * (`admin_attribute_option_coverage`), report-only: an incomplete row is
   * amber, never blocked.
   */
  const coverage = useAttributeCoverage();
  const coverageById = useMemo(() => {
    const map = new Map<string, { total: number; withAm: number }>();
    for (const row of coverage.data ?? [])
      map.set(row.attributeId, { total: row.total, withAm: row.withAm });
    return map;
  }, [coverage.data]);

  const chooseCategory = (slug: string) => {
    setOffset(0);
    void navigate({ search: slug === "" ? {} : { category: slug } });
  };

  /**
   * IE-1 — EXPORT. Two downloads from ONE control: definitions.csv then
   * links.csv, so no archive dependency joins the bundle (G2). The button is
   * disabled ONLY while a download is in flight — never because the current
   * filter yields no rows: the export is the whole library, not the view.
   * A failure is a translated caption beside the controls (F4), never silence.
   */
  const runExport = async () => {
    setExporting(true);
    setExportError(false);
    try {
      const { data } = await supabase.auth.getSession();
      const token = data.session?.access_token ?? "";
      // C3-INH PART B — a filtered console exports THAT SUBTREE (category +
      // descendants, inherited rows included); no filter exports the library.
      // The URL is the truth (C3-UX-1 PART B): reading the derived roster row
      // would export the whole library while the roster is still loading.
      const scope = search.category ?? null;
      for (const file of ["definitions", "links"] as const) {
        const query =
          scope === null ? `file=${file}` : `file=${file}&scope=${encodeURIComponent(scope)}`;
        const response = await fetch(`/api/admin/attributes/export?${query}`, {
          headers: token === "" ? {} : { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error(`export ${file} failed: ${response.status}`);
        const blob = await response.blob();
        const href = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = href;
        anchor.download = scope === null ? `${file}.csv` : `${scope}-${file}.csv`;
        document.body.appendChild(anchor);
        anchor.click();
        anchor.remove();
        URL.revokeObjectURL(href);
      }
    } catch (error) {
      console.error("[attributes] export failed", error);
      setExportError(true);
    } finally {
      setExporting(false);
    }
  };

  /**
   * C3-UX-1d PART A — TIERS, NOT MIN-WIDTHS. A min-width is a floor: four of
   * them add up and the last column is pushed off the scroller between 1024
   * and 1279. Proportional widths plus the `wide` tier let the browser do the
   * arithmetic — Attribute · Type · Used by · ⋯ at 1024, Options joining at
   * 1280. No column declares `minWidth` (see the C7 amendment guard,
   * `scripts/check-datatable-minwidth.sh`).
   */
  const allColumns: DataTableColumn<AttributeRow>[] = [
    {
      key: "name",
      header: t("admin.attributes.col.name"),
      priority: "primary",
      card: "title",
      width: "w-[32%]",
      cell: (row) => (
        <span className="block min-w-0">
          {/* D104 — a cut name keeps its first five characters (CutText). */}
          <span
            className="block min-w-0 font-medium text-foreground"
            data-testid={`attribute-name-${row.attrKey}`}
            title={attributeLabel(row.id, row.nameEn)}
          >
            <CutText text={attributeLabel(row.id, row.nameEn)} />
          </span>
          <span className="block min-w-0 text-xs text-muted-foreground" title={row.attrKey}>
            <CutText text={row.attrKey} />
          </span>
          {inheritedRow(row) === null ? null : (
            <span
              data-testid={`attribute-inherited-${row.attrKey}`}
              className="mt-1 inline-flex max-w-full items-center rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground"
            >
              <CutText
                text={t("admin.attributes.inherited.badge").replace(
                  "{origin}",
                  inheritedRow(row)?.originNameEn ?? "",
                )}
              />
            </span>
          )}
        </span>
      ),
    },
    {
      key: "type",
      header: t("admin.attributes.col.type"),
      priority: "secondary",
      card: "sub",
      width: "w-[14%]",
      cell: (row) => (
        <span className="block break-words text-muted-foreground">
          {t(`admin.attributes.type.${row.attrType}` as MessageKey)}
        </span>
      ),
    },
    {
      key: "options",
      header: t("admin.attributes.col.options"),
      /* The COUNT is the least load-bearing cell: it earns its column only on
         a genuinely wide desktop (≥xl). The card twin's caption and the row
         expansion still carry the option list at every width. */
      priority: "wide",
      align: "end",
      width: "w-16",
      cell: (row) => (
        <span className="block tabular-nums" data-testid={`attribute-options-${row.attrKey}`}>
          {typeHasOptions(row.attrType) ? row.options.length : "—"}
        </span>
      ),
    },
    {
      key: "coverage",
      header: t("admin.attributes.col.coverage"),
      /* C7 — the least load-bearing read folds away first (detail tier). */
      priority: "detail",
      align: "end",
      width: "w-20",
      cell: (row) => {
        if (!typeHasOptions(row.attrType)) {
          return <span className="block text-muted-foreground">—</span>;
        }
        const counts = coverageById.get(row.id) ?? {
          total: row.options.length,
          withAm: 0,
        };
        const incomplete = counts.withAm < counts.total;
        return (
          <span
            className={`block tabular-nums ${
              incomplete ? "text-amber-600 dark:text-amber-400" : "text-muted-foreground"
            }`}
            data-testid={`attribute-coverage-${row.attrKey}`}
            {...(incomplete ? { "data-incomplete": "true" } : {})}
            title={t("admin.attributes.coverage.tooltip")
              .replace("{count}", String(counts.withAm))
              .replace("{total}", String(counts.total))}
          >
            {`${counts.withAm}/${counts.total}`}
          </span>
        );
      },
    },
    {
      key: "usage",
      header: t("admin.attributes.col.usage"),
      priority: "secondary",
      card: "meta",
      // The card's count already says "Used by …": no label above it.
      cardLabel: false,
      /* No width: Used by takes the remainder and the chips wrap inside it. */
      cell: (row) => {
        const chips = chipsFor(row);
        return (
          <span className="flex min-w-0 flex-wrap items-center gap-1">
            {/* THE COUNT lives in the CARD twin only (cards run below lg). */}
            <span
              className="text-xs text-muted-foreground lg:hidden"
              data-testid={`attribute-usage-${row.attrKey}`}
            >
              {chips.length === 0
                ? t("admin.attributes.usage.none")
                : t("admin.attributes.usage.count").replace("{count}", String(chips.length))}
            </span>
            {chips.length === 0 ? (
              <span className="hidden text-muted-foreground lg:inline">—</span>
            ) : (
              chips.map((chip) => (
                <span
                  key={chip.linkId}
                  data-testid={`attribute-usedby-${row.attrKey}-${chip.categorySlug}`}
                  title={chip.categorySlug}
                  className="inline-flex max-w-full items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary"
                >
                  <CutText text={chip.nameEn} />
                </span>
              ))
            )}
          </span>
        );
      },
    },
  ];
  const columns = visibleColumns(allColumns, hidden, LOCKED);

  /**
   * PART A — the OPTIONS column shows a count; the full list lives here.
   * DEC-045b PART B — each option renders its LABEL (value as fallback) and a
   * dependent definition is grouped by the parent value it hangs under.
   * Bundle 11 V2c (the operator's walk) — the line sits inside its row's box in
   * small text, at most three lines (a model list runs to hundreds of names);
   * the whole list stays in the page, and Edit shows every option.
   */
  const expandedRow = (row: AttributeRow) =>
    typeHasOptions(row.attrType) && row.options.length > 0 ? (
      <p
        className="line-clamp-3 break-words text-xs leading-5 text-muted-foreground"
        data-testid={`attribute-optionlist-${row.attrKey}`}
      >
        {`${t("admin.attributes.col.options")}: ${describeOptions(row.options)}`}
      </p>
    ) : null;

  /**
   * Bundle 11 B3 (DEC-170) — THE ROW'S ACTIONS on the shared block: Edit, a
   * red Delete, and the three-dots menu with the other verbs. Every door
   * re-checks its permission and step-up server-side (F3); hiding is
   * convenience only.
   */
  const rowActions = (row: AttributeRow) => {
    const name = attributeLabel(row.id, row.nameEn);
    /**
     * C3-INH PART A — an INHERITED row owns no write verb: it is not this
     * category's link. The menu offers exactly one way out — open the origin
     * category — so the operator edits it where it lives.
     */
    const origin = inheritedRow(row);
    if (origin !== null) {
      return (
        <RowActions
          testid={`attribute-actions-${row.attrKey}`}
          name={name}
          more={[
            {
              key: "origin",
              label: t("admin.attributes.inherited.openOrigin"),
              icon: <Link2 />,
              onSelect: () => chooseCategory(origin.originSlug),
            },
          ]}
        />
      );
    }
    const more: RowMoreAction[] = [];
    if (mayUpdate) {
      more.push({
        key: "assign",
        label: t("admin.attributes.action.assign"),
        icon: <Link2 />,
        onSelect: () => setDialog({ kind: "assign", id: row.id }),
      });
    }
    if (mayRestructure) {
      // A link removed is a destructive act: drawn red, as its confirmation is.
      more.push({
        key: "remove",
        label: t("admin.attributes.action.remove"),
        icon: <Unlink />,
        tone: "danger",
        onSelect: () => setDialog({ kind: "remove", id: row.id }),
      });
    }
    return (
      <RowActions
        testid={`attribute-actions-${row.attrKey}`}
        name={name}
        edit={
          mayUpdate
            ? {
                label: t("admin.attributes.action.edit"),
                onSelect: () => setDialog({ kind: "edit", id: row.id }),
              }
            : undefined
        }
        remove={
          mayRestructure
            ? {
                // C3e — always offered: the dialog states the blast radius and
                // the door refuses while a category still links the attribute.
                label: t("admin.attributes.action.delete"),
                onSelect: () => setDialog({ kind: "delete", id: row.id }),
              }
            : undefined
        }
        more={more}
      />
    );
  };

  return (
    <StepUpGate>
      {(guard) => (
        <div data-testid="admin-section-attributes" className="min-w-0 space-y-4">
          <TableActions testid="attribute-header" title={t("admin.section.attributes.title")}>
            {mayRestructure ? (
              <TableActionButton
                data-testid="attribute-merge-open"
                onClick={() => setDialog({ kind: "merge" })}
                icon={<Merge />}
                label={t("admin.attributes.action.merge")}
              />
            ) : null}
            <div
              data-testid="attribute-transfer"
              className="flex flex-wrap items-center gap-1.5 md:gap-2"
            >
              {/* IE-1 — never disabled on an empty filter: the export is the
                  scope (the whole library, or the chosen category's subtree),
                  not the current page. */}
              <TableActionButton
                data-testid="attribute-export"
                disabled={exporting}
                onClick={() => void runExport()}
                icon={<Download />}
                label={
                  exporting ? t("admin.attributes.export.busy") : t("admin.attributes.export.open")
                }
              />
              {/* IE-2 — the import door is its own permission; UI hiding is
                  convenience only, the route and RPCs refuse regardless. */}
              {mayImport ? (
                <TableActionButton
                  data-testid="attribute-import"
                  onClick={() => setDialog({ kind: "import" })}
                  icon={<Upload />}
                  label={t("admin.attributes.import.open")}
                />
              ) : null}
            </div>
            {mayUpdate ? (
              <TableActionButton
                variant="default"
                data-testid="attribute-create-open"
                onClick={() => setDialog({ kind: "edit", id: null })}
                icon={<Plus />}
                label={t("admin.attributes.create.open")}
              />
            ) : null}
          </TableActions>
          {exportError ? (
            <div data-testid="attribute-header-status" className="text-end">
              <p
                role="alert"
                className="text-sm text-destructive"
                data-testid="attribute-export-error"
              >
                {t("admin.attributes.export.error")}
              </p>
            </div>
          ) : null}

          <DataTable<AttributeRow>
            columns={columns}
            rows={filtered}
            page={Math.floor(offset / pageSize)}
            pageSize={pageSize}
            rowKey={(row) => row.id}
            rowTestId={(row) => `attribute-row-${row.attrKey}`}
            caption={t("admin.attributes.caption")}
            cardUntil="lg"
            cardLead={() => <Tags />}
            loading={isLoading}
            loadingState={
              <p role="status" aria-live="polite" className="text-sm text-muted-foreground">
                {t("admin.attributes.loading")}
              </p>
            }
            error={error ? true : undefined}
            errorState={
              <p role="alert" className="text-sm text-destructive">
                {t("admin.attributes.error")}
              </p>
            }
            emptyState={
              /* C4 — the empty result is a CAPTION beside the controls; the
                 toolbar (search + category filter) never disappears. */
              <p className="text-sm text-muted-foreground" data-testid="attribute-empty">
                {filterCategory === null
                  ? t("admin.attributes.empty")
                  : t("admin.attributes.filter.empty")}
              </p>
            }
            toolbar={
              <TableToolbar
                testid="attribute-toolbar"
                scope={
                  /* The category decides what the library READS (its effective
                     set, inherited rows included) and what Export and Import
                     carry: the table's scope, never a sieve inside Filters. */
                  <div className="flex w-full min-w-0 flex-wrap items-center gap-2">
                    <NativeSelect
                      data-testid="attribute-category-filter"
                      aria-label={t("admin.attributes.filter.category")}
                      className="w-full min-w-0 flex-1 md:w-64 md:flex-none"
                      value={filterCategory?.slug ?? ""}
                      onChange={(event) => chooseCategory(event.target.value)}
                    >
                      <option value="">{t("admin.attributes.filter.allCategories")}</option>
                      {filterOptions.map((row) => (
                        <option
                          key={row.id}
                          value={row.slug}
                          data-depth={row.depth}
                          data-parent-id={row.parentId ?? ""}
                          {...(row.isActive ? {} : { "data-retired": "true" })}
                          className={row.isActive ? undefined : "text-muted-foreground"}
                        >
                          {`${row.label}${
                            row.isActive ? "" : ` — ${t("admin.categories.filter.retired")}`
                          }`}
                        </option>
                      ))}
                    </NativeSelect>
                    {filterCategory === null ? null : (
                      <Button
                        type="button"
                        variant="outline"
                        size="touch"
                        data-testid="attribute-category-clear"
                        onClick={() => chooseCategory("")}
                      >
                        {t("admin.attributes.filter.clear")}
                      </Button>
                    )}
                  </div>
                }
                search={
                  <Input
                    data-testid="attribute-search"
                    aria-label={t("admin.attributes.searchPlaceholder")}
                    placeholder={t("admin.attributes.searchPlaceholder")}
                    value={needleInput}
                    onChange={(event) => {
                      setNeedleInput(event.target.value);
                      setOffset(0);
                    }}
                  />
                }
                columns={
                  <ColumnsButton
                    testid="attribute-columns"
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
            pagination={
              <DataTablePagination
                offset={offset}
                pageSize={pageSize}
                total={filtered.length}
                onPrevious={() => setOffset((prev) => Math.max(0, prev - pageSize))}
                onNext={() => setOffset((prev) => prev + pageSize)}
                onPage={(index) => setOffset(index * pageSize)}
                pageSizeOptions={[...PAGE_SIZE_OPTIONS]}
                onPageSize={choosePageSize}
                testid="attribute-pagination"
              />
            }
            expandedRow={expandedRow}
            rowActions={rowActions}
            actionsWidth="w-44"
          />

          {dialog.kind === "edit" ? (
            <AttributeEditorDialog
              key={dialog.id ?? "create"}
              attribute={selected}
              attributes={all}
              mayDepend={mayUpdate}
              guard={guard}
              onClose={() => setDialog({ kind: "none" })}
            />
          ) : null}
          {dialog.kind === "delete" && selected ? (
            <DeleteAttributeDialog
              attribute={selected}
              guard={guard}
              onClose={() => setDialog({ kind: "none" })}
            />
          ) : null}
          {dialog.kind === "assign" && selected ? (
            <AssignAttributeDialog
              attribute={selected}
              categories={categories}
              guard={guard}
              onClose={() => setDialog({ kind: "none" })}
            />
          ) : null}
          {dialog.kind === "remove" && selected ? (
            <RemoveAttributeCategoryDialog
              attribute={selected}
              links={chipsFor(selected)}
              guard={guard}
              onClose={() => setDialog({ kind: "none" })}
            />
          ) : null}

          {dialog.kind === "merge" ? (
            <MergeAttributesDialog
              attributes={all}
              guard={guard}
              onClose={() => setDialog({ kind: "none" })}
            />
          ) : null}

          {dialog.kind === "import" ? (
            <ImportAttributesDialog
              scope={search.category ?? null}
              guard={guard}
              onClose={() => setDialog({ kind: "none" })}
            />
          ) : null}
        </div>
      )}
    </StepUpGate>
  );
}

export default AdminAttributesPage;
