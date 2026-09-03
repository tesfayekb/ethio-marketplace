import { ArrowDown, ArrowUp, CalendarClock, Globe, Pencil, Share2, Trash2 } from "lucide-react";
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
import { useAdminShell } from "@/features/admin/admin-context";
import { useCountries } from "@/features/admin/users/use-admin-users";
import { StepUpGate } from "@/features/auth/mfa/step-up-gate";
import type { GuardFn } from "@/features/auth/mfa/use-step-up";
import { useI18n } from "@/i18n";

import {
  CategoryExclusionsDialog,
  CategoryPathsDialog,
  CategoryWindowDialog,
  CreateCategoryDialog,
  EditCategoryDialog,
  RetireCategoryDialog,
  SELECT_CLASS,
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
 *
 * C2-UI-FIX: the table twin's actions are ONE horizontal icon row (edit,
 * visibility, countries, up, down) plus an inline overflow disclosure for the
 * rarer restructure/retire verbs. The disclosure is a `<details>`, NOT a
 * portalled menu, so the actions region stays a single DOM subtree that the
 * twin-aware E2E locators can scope to (J5). The card twin keeps full-text
 * buttons — a 360 card has the room and no hover affordance.
 */

const PAGE_SIZE = 25;

type DialogState =
  | { kind: "none" }
  | { kind: "create" }
  | { kind: "edit" | "window" | "exclusions" | "retire" | "pointer"; id: string };

function IconAction({
  testid,
  label,
  icon,
  disabled,
  onClick,
}: {
  testid: string;
  label: string;
  icon: React.ReactNode;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      className="size-11 shrink-0"
      data-testid={testid}
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
    >
      {icon}
    </Button>
  );
}

export function AdminCategoriesPage() {
  const { t } = useI18n();
  const { permissions } = useAdminShell();
  const { data, isLoading, error } = useAdminCategories();
  const countries = useCountries();
  const reorder = useReorderCategories();
  const [search, setSearch] = useState("");
  const [rootFilter, setRootFilter] = useState("");
  const [offset, setOffset] = useState(0);
  const [dialog, setDialog] = useState<DialogState>({ kind: "none" });

  const mayCreate = permissions.includes("categories:create");
  const mayUpdate = permissions.includes("categories:update");
  const mayRestructure = permissions.includes("categories:restructure");

  const roster = useMemo(() => toRoster(data ?? []), [data]);
  const byId = useMemo(() => new Map(roster.map((row) => [row.id, row])), [roster]);
  const roots = useMemo(() => roster.filter((row) => row.parentId === null), [roster]);

  /** The root a node hangs under — the filter is a whole-subtree filter. */
  const rootOf = (row: CategoryNode): string => {
    let current: CategoryNode | undefined = row;
    while (current && current.parentId !== null) current = byId.get(current.parentId);
    return current?.id ?? row.id;
  };

  const needle = search.trim().toLowerCase();
  const filtered = useMemo(
    () =>
      roster.filter((row) => {
        if (rootFilter !== "" && rootOf(row) !== rootFilter) return false;
        if (needle === "") return true;
        return row.nameEn.toLowerCase().includes(needle) || row.slug.toLowerCase().includes(needle);
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [roster, needle, rootFilter, byId],
  );

  useEffect(() => {
    setOffset(0);
  }, [needle, rootFilter]);

  const rows = filtered.slice(offset, offset + PAGE_SIZE);

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
      minWidth: "min-w-52",
      cell: (row) => (
        <span className="block min-w-0">
          <span className="block break-words font-medium text-foreground" title={row.nameEn}>
            {row.depth > 0 ? (
              <span aria-hidden="true" className="text-muted-foreground">
                {"· ".repeat(row.depth)}
              </span>
            ) : null}
            {row.nameEn}
          </span>
          <span className="block break-all text-xs text-muted-foreground">{row.slug}</span>
        </span>
      ),
    },
    {
      key: "parent",
      header: t("admin.categories.col.parent"),
      priority: "secondary",
      minWidth: "min-w-40",
      cell: (row) => (
        <span className="block min-w-0 break-words text-muted-foreground">
          {row.parentId === null ? "—" : (byId.get(row.parentId)?.nameEn ?? "—")}
        </span>
      ),
    },
    {
      key: "status",
      header: t("admin.categories.col.status"),
      priority: "secondary",
      minWidth: "min-w-24",
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
      minWidth: "min-w-32",
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
      minWidth: "min-w-16",
      cell: (row) => <span className="block tabular-nums">{row.displayOrder}</span>,
    },
    {
      key: "listings",
      header: t("admin.categories.col.listings"),
      priority: "detail",
      align: "end",
      minWidth: "min-w-20",
      cell: (row) => <span className="block tabular-nums">{row.listingCount}</span>,
    },
    {
      key: "exclusions",
      header: t("admin.categories.col.exclusions"),
      priority: "detail",
      align: "end",
      minWidth: "min-w-20",
      cell: (row) => <span className="block tabular-nums">{row.exclusionCount}</span>,
    },
  ];

  /**
   * ONE button set, two presentations (J5): the SAME element carries the
   * canonical `category-<verb>-<slug>` testid at every viewport — a duplicated
   * icon twin would put two matches inside one actions region and every
   * twin-aware locator would resolve the hidden one. At lg the label collapses
   * into `aria-label`/`title` and the row becomes a compact icon strip; below
   * lg the card keeps full text. Targets are ≥44px in both presentations.
   */
  const rowActions = (row: CategoryNode, guard: GuardFn) => {
    const verb = (
      testid: string,
      label: string,
      icon: React.ReactNode,
      onClick: () => void,
      disabled?: boolean,
    ) => (
      <Button
        key={testid}
        type="button"
        variant="outline"
        className="min-h-11 shrink-0 lg:size-11 lg:p-0"
        data-testid={testid}
        aria-label={label}
        title={label}
        disabled={disabled}
        onClick={onClick}
      >
        {icon}
        <span className="ms-2 lg:hidden">{label}</span>
      </Button>
    );

    return (
      <span className="flex flex-wrap items-center gap-2 lg:flex-nowrap lg:justify-end lg:gap-1">
        {mayUpdate
          ? [
              verb(
                `category-edit-${row.slug}`,
                t("admin.categories.action.edit"),
                <Pencil aria-hidden="true" className="size-4" />,
                () => setDialog({ kind: "edit", id: row.id }),
              ),
              verb(
                `category-window-${row.slug}`,
                t("admin.categories.action.window"),
                <CalendarClock aria-hidden="true" className="size-4" />,
                () => setDialog({ kind: "window", id: row.id }),
              ),
              verb(
                `category-exclusions-${row.slug}`,
                t("admin.categories.action.exclusions"),
                <Globe aria-hidden="true" className="size-4" />,
                () => setDialog({ kind: "exclusions", id: row.id }),
              ),
            ]
          : null}
        {mayRestructure
          ? [
              verb(
                `category-up-${row.slug}`,
                t("admin.categories.action.up"),
                <ArrowUp aria-hidden="true" className="size-4" />,
                () => move(row, -1, guard),
              ),
              verb(
                `category-down-${row.slug}`,
                t("admin.categories.action.down"),
                <ArrowDown aria-hidden="true" className="size-4" />,
                () => move(row, 1, guard),
              ),
              verb(
                `category-pointer-${row.slug}`,
                t("admin.categories.action.pointer"),
                <Share2 aria-hidden="true" className="size-4" />,
                () => setDialog({ kind: "pointer", id: row.id }),
              ),
              verb(
                `category-retire-${row.slug}`,
                t("admin.categories.action.retire"),
                <Trash2 aria-hidden="true" className="size-4" />,
                () => setDialog({ kind: "retire", id: row.id }),
                !row.isActive || row.isCatchall,
              ),
            ]
          : null}
      </span>
    );
  };

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
              <>
                <Input
                  data-testid="category-search"
                  className="md:w-72"
                  placeholder={t("admin.categories.searchPlaceholder")}
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
                <select
                  data-testid="category-root-filter"
                  aria-label={t("admin.categories.filter.root")}
                  className={`${SELECT_CLASS} md:w-64`}
                  value={rootFilter}
                  onChange={(event) => setRootFilter(event.target.value)}
                >
                  <option value="">{t("admin.categories.filter.allRoots")}</option>
                  {roots.map((row) => (
                    <option key={row.id} value={row.id}>
                      {row.nameEn}
                    </option>
                  ))}
                </select>
              </>
            }
            pagination={
              <DataTablePagination
                offset={offset}
                pageSize={PAGE_SIZE}
                total={filtered.length}
                onPrevious={() => setOffset((prev) => Math.max(0, prev - PAGE_SIZE))}
                onNext={() => setOffset((prev) => prev + PAGE_SIZE)}
                testid="category-pagination"
              />
            }
            rowActions={(row) => rowActions(row, guard)}
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
            <CategoryPathsDialog
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
