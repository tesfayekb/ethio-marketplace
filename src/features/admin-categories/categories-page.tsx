import { useMemo, useState } from "react";

import { DataTable, type DataTableColumn } from "@/components/shell/data-table";
import { PageCard } from "@/components/shell/page-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAdminShell } from "@/features/admin/admin-context";
import { useCountries } from "@/features/admin/users/use-admin-users";
import { StepUpGate } from "@/features/auth/mfa/step-up-gate";
import type { GuardFn } from "@/features/auth/mfa/use-step-up";
import { useI18n } from "@/i18n";

import {
  AddPointerDialog,
  CategoryExclusionsDialog,
  CategoryWindowDialog,
  CreateCategoryDialog,
  EditCategoryDialog,
  RetireCategoryDialog,
} from "./category-dialogs";
import { toRoster, type CategoryNode } from "./categories-service";
import { useAdminCategories, useReorderCategories } from "./use-categories";

/**
 * C2-UI — THE CATEGORIES CONSOLE.
 *
 * Gate tier: `categories:view` opens the section; every write RPC re-checks
 * its own granular permission and step-up server-side (F3). The roster is one
 * flat depth-ordered list rendered through the DataTable primitive with
 * `cardUntil="lg"` and per-column min-widths (law C7) — cards through the
 * tablet band, a scrolling table from lg, and never a per-page width hack.
 */

type DialogState =
  | { kind: "none" }
  | { kind: "create" }
  | { kind: "edit" | "window" | "exclusions" | "retire" | "pointer"; id: string };

export function AdminCategoriesPage() {
  const { t } = useI18n();
  const { permissions } = useAdminShell();
  const { data, isLoading, error } = useAdminCategories();
  const countries = useCountries();
  const reorder = useReorderCategories();
  const [search, setSearch] = useState("");
  const [dialog, setDialog] = useState<DialogState>({ kind: "none" });

  const mayCreate = permissions.includes("categories:create");
  const mayUpdate = permissions.includes("categories:update");
  const mayRestructure = permissions.includes("categories:restructure");

  const roster = useMemo(() => toRoster(data ?? []), [data]);
  const needle = search.trim().toLowerCase();
  const rows = useMemo(
    () =>
      needle === ""
        ? roster
        : roster.filter(
            (row) =>
              row.nameEn.toLowerCase().includes(needle) || row.slug.toLowerCase().includes(needle),
          ),
    [roster, needle],
  );

  const selected =
    dialog.kind === "none" || dialog.kind === "create"
      ? null
      : (roster.find((row) => row.id === dialog.id) ?? null);

  const siblingsOf = (row: CategoryNode) => roster.filter((peer) => peer.parentId === row.parentId);

  const move = (row: CategoryNode, delta: number, guard: GuardFn) => {
    const siblings = siblingsOf(row);
    const index = siblings.findIndex((peer) => peer.id === row.id);
    const next = index + delta;
    if (index < 0 || next < 0 || next >= siblings.length) return;
    const ordered = siblings.map((peer) => peer.id);
    const [moved] = ordered.splice(index, 1);
    ordered.splice(next, 0, moved!);
    void guard(async () => {
      await reorder.mutateAsync({ parentId: row.parentId, orderedChildIds: ordered });
    });
  };

  const columns: DataTableColumn<CategoryNode>[] = [
    {
      key: "name",
      header: t("admin.categories.col.name"),
      priority: "primary",
      minWidth: "min-w-56",
      cell: (row) => (
        <span className="block min-w-0 break-words font-medium text-foreground" title={row.nameEn}>
          <span aria-hidden="true" className="text-muted-foreground">
            {"".padStart(0)}
            {row.depth > 0 ? `${"· ".repeat(row.depth)}` : null}
          </span>
          {row.nameEn}
        </span>
      ),
    },
    {
      key: "slug",
      header: t("admin.categories.col.slug"),
      priority: "primary",
      minWidth: "min-w-44",
      cell: (row) => (
        <span className="block min-w-0 break-all text-muted-foreground">{row.slug}</span>
      ),
    },
    {
      key: "status",
      header: t("admin.categories.col.status"),
      priority: "secondary",
      minWidth: "min-w-28",
      cell: (row) => (
        <Badge variant={row.isActive ? "secondary" : "destructive"}>
          {row.isActive ? t("admin.categories.badge.active") : t("admin.categories.badge.inactive")}
        </Badge>
      ),
    },
    {
      key: "flags",
      header: t("admin.categories.col.flags"),
      priority: "secondary",
      minWidth: "min-w-44",
      cell: (row) => (
        <span className="flex flex-wrap gap-1">
          {row.isCatchall ? (
            <Badge variant="outline">{t("admin.categories.badge.catchall")}</Badge>
          ) : null}
          {row.allowListings ? (
            <Badge variant="outline">{t("admin.categories.badge.listings")}</Badge>
          ) : null}
          {row.priceEnabled ? (
            <Badge variant="outline">{t("admin.categories.badge.price")}</Badge>
          ) : null}
          {row.visibleFrom || row.visibleUntil ? (
            <Badge variant="outline">{t("admin.categories.badge.window")}</Badge>
          ) : null}
        </span>
      ),
    },
    {
      key: "order",
      header: t("admin.categories.col.order"),
      priority: "detail",
      align: "end",
      minWidth: "min-w-20",
      cell: (row) => <span className="block tabular-nums">{row.displayOrder}</span>,
    },
    {
      key: "listings",
      header: t("admin.categories.col.listings"),
      priority: "detail",
      align: "end",
      minWidth: "min-w-24",
      cell: (row) => <span className="block tabular-nums">{row.listingCount}</span>,
    },
    {
      key: "exclusions",
      header: t("admin.categories.col.exclusions"),
      priority: "detail",
      align: "end",
      minWidth: "min-w-24",
      cell: (row) => <span className="block tabular-nums">{row.exclusionCount}</span>,
    },
  ];

  return (
    <StepUpGate>
      {(guard) => (
        <div className="min-w-0 space-y-4">
          {mayCreate ? (
            <PageCard testid="category-create-card">
              <Button
                type="button"
                className="min-h-11 w-full md:w-auto"
                data-testid="category-create-open"
                onClick={() => setDialog({ kind: "create" })}
              >
                {t("admin.categories.create.open")}
              </Button>
            </PageCard>
          ) : null}

          <DataTable<CategoryNode>
            cardUntil="lg"
            columns={columns}
            rows={rows}
            rowKey={(row) => row.id}
            rowTestId={(row) => `category-row-${row.slug}`}
            caption={t("admin.categories.caption")}
            loading={isLoading}
            loadingState={
              <p role="status" aria-live="polite" className="text-sm text-muted-foreground">
                {t("admin.categories.loading")}
              </p>
            }
            error={error ? true : undefined}
            errorState={
              <p role="alert" className="text-sm text-destructive">
                {t("admin.categories.error")}
              </p>
            }
            emptyState={
              <p className="text-sm text-muted-foreground">{t("admin.categories.empty")}</p>
            }
            toolbar={
              <Input
                data-testid="category-search"
                className="md:w-72"
                placeholder={t("admin.categories.searchPlaceholder")}
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            }
            rowActions={(row) => (
              <>
                {mayUpdate ? (
                  <>
                    <Button
                      type="button"
                      variant="outline"
                      className="min-h-11"
                      data-testid={`category-edit-${row.slug}`}
                      onClick={() => setDialog({ kind: "edit", id: row.id })}
                    >
                      {t("admin.categories.action.edit")}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="min-h-11"
                      data-testid={`category-window-${row.slug}`}
                      onClick={() => setDialog({ kind: "window", id: row.id })}
                    >
                      {t("admin.categories.action.window")}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="min-h-11"
                      data-testid={`category-exclusions-${row.slug}`}
                      onClick={() => setDialog({ kind: "exclusions", id: row.id })}
                    >
                      {t("admin.categories.action.exclusions")}
                    </Button>
                  </>
                ) : null}
                {mayRestructure ? (
                  <>
                    <Button
                      type="button"
                      variant="outline"
                      className="min-h-11"
                      data-testid={`category-up-${row.slug}`}
                      onClick={() => move(row, -1, guard)}
                    >
                      {t("admin.categories.action.up")}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="min-h-11"
                      data-testid={`category-down-${row.slug}`}
                      onClick={() => move(row, 1, guard)}
                    >
                      {t("admin.categories.action.down")}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="min-h-11"
                      data-testid={`category-pointer-${row.slug}`}
                      onClick={() => setDialog({ kind: "pointer", id: row.id })}
                    >
                      {t("admin.categories.action.pointer")}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="min-h-11"
                      data-testid={`category-retire-${row.slug}`}
                      disabled={!row.isActive || row.isCatchall}
                      onClick={() => setDialog({ kind: "retire", id: row.id })}
                    >
                      {t("admin.categories.action.retire")}
                    </Button>
                  </>
                ) : null}
              </>
            )}
          />

          {dialog.kind === "create" ? (
            <CreateCategoryDialog
              parents={roster}
              guard={guard}
              onClose={() => setDialog({ kind: "none" })}
            />
          ) : null}
          {selected && dialog.kind === "edit" ? (
            <EditCategoryDialog
              category={selected}
              guard={guard}
              onClose={() => setDialog({ kind: "none" })}
            />
          ) : null}
          {selected && dialog.kind === "window" ? (
            <CategoryWindowDialog
              category={selected}
              guard={guard}
              onClose={() => setDialog({ kind: "none" })}
            />
          ) : null}
          {selected && dialog.kind === "exclusions" ? (
            <CategoryExclusionsDialog
              category={selected}
              countries={(countries.data ?? []).map((country) => ({
                code: country.code,
                nameEn: country.nameEn,
              }))}
              guard={guard}
              onClose={() => setDialog({ kind: "none" })}
            />
          ) : null}
          {selected && dialog.kind === "retire" ? (
            <RetireCategoryDialog
              category={selected}
              targets={roster.filter((row) => row.isActive)}
              guard={guard}
              onClose={() => setDialog({ kind: "none" })}
            />
          ) : null}
          {selected && dialog.kind === "pointer" ? (
            <AddPointerDialog
              category={selected}
              parents={roster}
              guard={guard}
              onClose={() => setDialog({ kind: "none" })}
            />
          ) : null}
        </div>
      )}
    </StepUpGate>
  );
}

export default AdminCategoriesPage;
