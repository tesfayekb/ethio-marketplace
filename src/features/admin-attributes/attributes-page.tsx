import { useMemo, useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Pencil, Trash, Merge, Link2 } from "lucide-react";

import {
  DataTable,
  DataTablePagination,
  type DataTableColumn,
} from "@/components/shell/data-table";
import { PageCard } from "@/components/shell/page-card";
import { Button } from "@/components/ui/button";
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
} from "./attribute-dialogs";
import { typeHasOptions, type AttributeRow } from "./attributes-service";
import { useAdminAttributes, useCategoryLinks } from "./use-attributes";

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
  const rows = filtered.slice(offset, offset + PAGE_SIZE);
  const selected =
    dialog.kind === "edit" || dialog.kind === "delete" || dialog.kind === "assign"
      ? (all.find((row) => row.id === dialog.id) ?? null)
      : null;

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
      align: "end",
      minWidth: "min-w-[7rem]",
      cell: (row) => (
        <span className="block tabular-nums" data-testid={`attribute-usage-${row.attrKey}`}>
          {row.usageCount}
        </span>
      ),
    },
  ];

  /** PART A — the OPTIONS column shows a count; the full list lives here. */
  const expandedRow = (row: AttributeRow) =>
    typeHasOptions(row.attrType) && row.options.length > 0 ? (
      <p className="text-sm text-muted-foreground">
        {`${t("admin.attributes.col.options")}: ${row.options.join(" · ")}`}
      </p>
    ) : null;

  const rowActions = (row: AttributeRow) => (
    <span className="flex flex-wrap items-center gap-2 xl:justify-end">
      {mayUpdate ? (
        <Button
          type="button"
          variant="outline"
          size="touch"
          data-testid={`attribute-edit-${row.attrKey}`}
          title={t("admin.attributes.action.edit")}
          onClick={() => setDialog({ kind: "edit", id: row.id })}
        >
          <Pencil aria-hidden="true" className="size-4" />
          <span>{t("admin.attributes.action.edit")}</span>
        </Button>
      ) : null}
      {mayUpdate ? (
        <Button
          type="button"
          variant="outline"
          size="touch"
          data-testid={`attribute-assign-${row.attrKey}`}
          title={t("admin.attributes.action.assign")}
          onClick={() => setDialog({ kind: "assign", id: row.id })}
        >
          <Link2 aria-hidden="true" className="size-4" />
          <span>{t("admin.attributes.action.assign")}</span>
        </Button>
      ) : null}
      {mayRestructure ? (
        <Button
          type="button"
          variant="destructive"
          size="touch"
          data-testid={`attribute-delete-${row.attrKey}`}
          title={t("admin.attributes.action.delete")}
          onClick={() => setDialog({ kind: "delete", id: row.id })}
        >
          <Trash aria-hidden="true" className="size-4" />
          <span>{t("admin.attributes.action.delete")}</span>
        </Button>
      ) : null}
    </span>
  );

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
            rows={rows}
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
