import { useMemo, useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import {
  Download,
  Link2,
  Merge,
  MoreHorizontal,
  Pencil,
  Trash,
  Unlink,
  Upload,
} from "lucide-react";

import { supabase } from "@/integrations/supabase/client";

import {
  DataTable,
  DataTablePagination,
  type DataTableColumn,
} from "@/components/shell/data-table";
import { PageCard } from "@/components/shell/page-card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useAdminShell } from "@/features/admin/admin-context";
import { SELECT_CLASS } from "@/features/admin-categories/category-dialogs";
import { toRoster } from "@/features/admin-categories/categories-service";
import { useAdminCategories } from "@/features/admin-categories/use-categories";
import { StepUpGate } from "@/features/auth/mfa/step-up-gate";
import { useI18n, type MessageKey } from "@/i18n";

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
 */

const PAGE_SIZE = 25;

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
  const columns: DataTableColumn<AttributeRow>[] = [
    {
      key: "name",
      header: t("admin.attributes.col.name"),
      priority: "primary",
      width: "w-[32%]",
      cell: (row) => (
        <span className="block min-w-0">
          <span
            className="block truncate font-medium text-foreground"
            title={attributeLabel(row.id, row.nameEn)}
          >
            {attributeLabel(row.id, row.nameEn)}
          </span>
          <span className="block truncate text-xs text-muted-foreground" title={row.attrKey}>
            {row.attrKey}
          </span>
          {inheritedRow(row) === null ? null : (
            <span
              data-testid={`attribute-inherited-${row.attrKey}`}
              className="mt-1 inline-flex max-w-full items-center rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground"
            >
              <span className="truncate">
                {t("admin.attributes.inherited.badge").replace(
                  "{origin}",
                  inheritedRow(row)?.originNameEn ?? "",
                )}
              </span>
            </span>
          )}
        </span>
      ),
    },
    {
      key: "type",
      header: t("admin.attributes.col.type"),
      priority: "secondary",
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
      key: "usage",
      header: t("admin.attributes.col.usage"),
      priority: "secondary",
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
                  <span className="truncate">{chip.nameEn}</span>
                </span>
              ))
            )}
          </span>
        );
      },
    },
  ];

  /**
   * PART A — the OPTIONS column shows a count; the full list lives here.
   * DEC-045b PART B — each option renders its LABEL (value as fallback) and a
   * dependent definition is grouped by the parent value it hangs under.
   */
  const expandedRow = (row: AttributeRow) =>
    typeHasOptions(row.attrType) && row.options.length > 0 ? (
      <p
        className="text-sm text-muted-foreground"
        data-testid={`attribute-optionlist-${row.attrKey}`}
      >
        {`${t("admin.attributes.col.options")}: ${describeOptions(row.options)}`}
      </p>
    ) : null;

  /**
   * PART B — ONE row ⋯ MENU, never a stack of verbs: the actions column stays
   * narrow at every width and the card twin keeps a single 44px target.
   */
  const rowActions = (row: AttributeRow) => {
    /**
     * C3-INH PART A — an INHERITED row owns no write verb: it is not this
     * category's link. The menu offers exactly one way out — open the origin
     * category — so the operator edits it where it lives.
     */
    const origin = inheritedRow(row);
    if (origin !== null) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="outline"
              size="touch"
              data-testid={`attribute-actions-${row.attrKey}`}
              aria-label={`${t("admin.attributes.action.menu")} — ${attributeLabel(row.id, row.nameEn)}`}
              title={t("admin.attributes.action.menu")}
            >
              <MoreHorizontal aria-hidden="true" className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" data-testid="attribute-actions-menu">
            <DropdownMenuItem
              className="min-h-11"
              data-testid={`attribute-open-origin-${row.attrKey}`}
              onSelect={() => chooseCategory(origin.originSlug)}
            >
              <Link2 aria-hidden="true" className="size-4" />
              <span>{t("admin.attributes.inherited.openOrigin")}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
    return mayUpdate || mayRestructure ? (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="outline"
            size="touch"
            data-testid={`attribute-actions-${row.attrKey}`}
            aria-label={`${t("admin.attributes.action.menu")} — ${attributeLabel(row.id, row.nameEn)}`}
            title={t("admin.attributes.action.menu")}
          >
            <MoreHorizontal aria-hidden="true" className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" data-testid="attribute-actions-menu">
          {mayUpdate ? (
            <DropdownMenuItem
              className="min-h-11"
              data-testid={`attribute-edit-${row.attrKey}`}
              onSelect={() => setDialog({ kind: "edit", id: row.id })}
            >
              <Pencil aria-hidden="true" className="size-4" />
              <span>{t("admin.attributes.action.edit")}</span>
            </DropdownMenuItem>
          ) : null}
          {mayUpdate ? (
            <DropdownMenuItem
              className="min-h-11"
              data-testid={`attribute-assign-${row.attrKey}`}
              onSelect={() => setDialog({ kind: "assign", id: row.id })}
            >
              <Link2 aria-hidden="true" className="size-4" />
              <span>{t("admin.attributes.action.assign")}</span>
            </DropdownMenuItem>
          ) : null}
          {mayRestructure ? (
            <DropdownMenuItem
              className="min-h-11"
              data-testid={`attribute-remove-${row.attrKey}`}
              onSelect={() => setDialog({ kind: "remove", id: row.id })}
            >
              <Unlink aria-hidden="true" className="size-4" />
              <span>{t("admin.attributes.action.remove")}</span>
            </DropdownMenuItem>
          ) : null}
          {mayRestructure ? (
            <DropdownMenuItem
              className="min-h-11 text-destructive focus:text-destructive"
              data-testid={`attribute-delete-${row.attrKey}`}
              onSelect={() => setDialog({ kind: "delete", id: row.id })}
            >
              <Trash aria-hidden="true" className="size-4" />
              <span>{t("admin.attributes.action.delete")}</span>
            </DropdownMenuItem>
          ) : null}
        </DropdownMenuContent>
      </DropdownMenu>
    ) : null;
  };

  return (
    <StepUpGate>
      {(guard) => (
        <div data-testid="admin-section-attributes" className="min-w-0 space-y-4">
          {mayUpdate || mayRestructure ? (
            <PageCard testid="attribute-create-card">
              <div className="flex flex-col gap-2 sm:flex-row">
                {mayUpdate ? (
                  <Button
                    type="button"
                    size="touch"
                    className="w-full sm:w-auto"
                    data-testid="attribute-create-open"
                    onClick={() => setDialog({ kind: "edit", id: null })}
                  >
                    {t("admin.attributes.create.open")}
                  </Button>
                ) : null}
                {mayRestructure ? (
                  <Button
                    type="button"
                    variant="outline"
                    size="touch"
                    className="w-full sm:w-auto"
                    data-testid="attribute-merge-open"
                    onClick={() => setDialog({ kind: "merge" })}
                  >
                    <Merge aria-hidden="true" className="size-4" />
                    <span>{t("admin.attributes.action.merge")}</span>
                  </Button>
                ) : null}
              </div>
            </PageCard>
          ) : null}

          <DataTable<AttributeRow>
            columns={columns}
            rows={filtered}
            page={Math.floor(offset / PAGE_SIZE)}
            pageSize={PAGE_SIZE}
            rowKey={(row) => row.id}
            rowTestId={(row) => `attribute-row-${row.attrKey}`}
            caption={t("admin.attributes.caption")}
            cardUntil="lg"
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
              /* UX-2 PART 2 — grouped: [find] · [transfer]. */
              <>
                <div
                  data-testid="attribute-toolbar-find"
                  className="flex flex-wrap items-center gap-2"
                >
                  <Input
                    data-testid="attribute-search"
                    className="md:w-72"
                    placeholder={t("admin.attributes.searchPlaceholder")}
                    value={needleInput}
                    onChange={(event) => {
                      setNeedleInput(event.target.value);
                      setOffset(0);
                    }}
                  />
                  <select
                    data-testid="attribute-category-filter"
                    aria-label={t("admin.attributes.filter.category")}
                    className={`${SELECT_CLASS} md:w-72`}
                    value={filterCategory?.slug ?? ""}
                    onChange={(event) => chooseCategory(event.target.value)}
                  >
                    <option value="">{t("admin.attributes.filter.allCategories")}</option>
                    {categories.map((row) => (
                      <option key={row.id} value={row.slug}>
                        {`${"· ".repeat(row.depth)}${row.nameEn}`}
                      </option>
                    ))}
                  </select>
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
                <div
                  data-testid="attribute-toolbar-transfer"
                  className="flex flex-wrap items-center gap-2"
                >
                  {/* IE-1 — never disabled on an empty filter: the export is the
                      whole library, not the current view. */}
                  <Button
                    type="button"
                    variant="outline"
                    size="touch"
                    data-testid="attribute-export"
                    disabled={exporting}
                    onClick={() => void runExport()}
                  >
                    <Download aria-hidden="true" className="size-4" />
                    <span>
                      {exporting
                        ? t("admin.attributes.export.busy")
                        : t("admin.attributes.export.open")}
                    </span>
                  </Button>
                  {/* IE-2 — the import door is its own permission; UI hiding is
                      convenience only, the route and RPCs refuse regardless. */}
                  {mayImport ? (
                    <Button
                      type="button"
                      variant="outline"
                      size="touch"
                      data-testid="attribute-import"
                      onClick={() => setDialog({ kind: "import" })}
                    >
                      <Upload aria-hidden="true" className="size-4" />
                      <span>{t("admin.attributes.import.open")}</span>
                    </Button>
                  ) : null}
                  {exportError ? (
                    <p
                      role="alert"
                      className="text-sm text-destructive"
                      data-testid="attribute-export-error"
                    >
                      {t("admin.attributes.export.error")}
                    </p>
                  ) : null}
                </div>
              </>
            }
            pagination={
              <DataTablePagination
                offset={offset}
                pageSize={PAGE_SIZE}
                total={filtered.length}
                onPrevious={() => setOffset((prev) => Math.max(0, prev - PAGE_SIZE))}
                onNext={() => setOffset((prev) => prev + PAGE_SIZE)}
                testid="attribute-pagination"
              />
            }
            expandedRow={expandedRow}
            rowActions={rowActions}
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
