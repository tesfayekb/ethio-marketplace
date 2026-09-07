import { useMemo, useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Link2, Merge, MoreHorizontal, Pencil, Trash, Unlink } from "lucide-react";

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
  groupByAttribute,
  typeHasOptions,
  type AttributeCategory,
  type AttributeRow,
} from "./attributes-service";
import { useAdminAttributes, useAttributeCategories, useCategoryLinks } from "./use-attributes";


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
  const { permissions } = useAdminShell();
  const { data, isLoading, error } = useAdminAttributes();
  const { data: categoryData } = useAdminCategories();
  const search = useSearch({ from: "/admin/attributes" });
  const navigate = useNavigate({ from: "/admin/attributes" });
  const [needleInput, setNeedleInput] = useState("");
  const [offset, setOffset] = useState(0);
  const [dialog, setDialog] = useState<
    | { kind: "none" }
    | { kind: "edit"; id: string | null }
    | { kind: "delete"; id: string }
    | { kind: "assign"; id: string }
    | { kind: "remove"; id: string }
    | { kind: "merge" }
  >({ kind: "none" });


  const mayUpdate = permissions.includes("categories:update");
  const mayRestructure = permissions.includes("categories:restructure");

  /** The picker mirrors the roster order/depth (B1: one derivation, `toRoster`). */
  const categories = useMemo(() => toRoster(categoryData ?? []), [categoryData]);
  /** PART B — the filter is a SLUG in the URL; the id is derived, never stored. */
  const filterCategory = useMemo(
    () => categories.find((row) => row.slug === search.category) ?? null,
    [categories, search.category],
  );
  const links = useCategoryLinks(filterCategory?.id ?? null);
  const linkedIds = useMemo(
    () =>
      filterCategory === null ? null : new Set((links.data ?? []).map((row) => row.attributeId)),
    [filterCategory, links.data],
  );

  const all = useMemo(() => data ?? [], [data]);
  const needle = needleInput.trim().toLowerCase();
  const filtered = useMemo(
    () =>
      all.filter(
        (row) =>
          (needle === "" ||
            row.nameEn.toLowerCase().includes(needle) ||
            row.attrKey.toLowerCase().includes(needle)) &&
          (linkedIds === null || linkedIds.has(row.id)),
      ),
    [all, needle, linkedIds],
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

  const columns: DataTableColumn<AttributeRow>[] = [
    {
      key: "name",
      header: t("admin.attributes.col.name"),
      priority: "primary",
      minWidth: "min-w-[14rem]",
      cell: (row) => (
        <span className="block min-w-0">
          <span className="block truncate font-medium text-foreground" title={row.nameEn}>
            {row.nameEn}
          </span>
          <span className="block truncate text-xs text-muted-foreground" title={row.attrKey}>
            {row.attrKey}
          </span>
        </span>
      ),
    },
    {
      key: "type",
      header: t("admin.attributes.col.type"),
      priority: "secondary",
      minWidth: "min-w-[8rem]",
      cell: (row) => (
        <span className="block break-words text-muted-foreground">
          {t(`admin.attributes.type.${row.attrType}` as MessageKey)}
        </span>
      ),
    },
    {
      key: "options",
      header: t("admin.attributes.col.options"),
      priority: "secondary",
      align: "end",
      minWidth: "min-w-[6rem]",
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
      /* PART B — chips WRAP inside their own width; the primitive owns the
         only horizontal behaviour, so nothing is clipped at 1024…1366. */
      minWidth: "min-w-[16rem]",
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

  /** PART A — the OPTIONS column shows a count; the full list lives here. */
  const expandedRow = (row: AttributeRow) =>
    typeHasOptions(row.attrType) && row.options.length > 0 ? (
      <p className="text-sm text-muted-foreground">
        {`${t("admin.attributes.col.options")}: ${row.options.join(" · ")}`}
      </p>
    ) : null;

  /**
   * PART B — ONE row ⋯ MENU, never a stack of verbs: the actions column stays
   * narrow at every width and the card twin keeps a single 44px target.
   */
  const rowActions = (row: AttributeRow) =>
    mayUpdate || mayRestructure ? (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            variant="outline"
            size="touch"
            data-testid={`attribute-actions-${row.attrKey}`}
            aria-label={`${t("admin.attributes.action.menu")} — ${row.nameEn}`}
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


  return (
    <StepUpGate>
      {(guard) => (
        <div className="min-w-0 space-y-4">
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
              <>
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
        </div>
      )}
    </StepUpGate>
  );
}

export default AdminAttributesPage;
