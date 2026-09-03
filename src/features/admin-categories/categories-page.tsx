import {
  ArrowDown,
  ArrowUp,
  CalendarClock,
  Globe,
  Pencil,
  RotateCcw,
  Share2,
  Trash,
  Trash2,
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
  DeleteCategoryDialog,
  EditCategoryDialog,
  RetireCategoryDialog,
  SELECT_CLASS,
} from "./category-dialogs";
import { toRoster, type CategoryNode } from "./categories-service";
import { useAdminCategories, useReactivateCategory, useReorderCategories } from "./use-categories";

/**
 * C2-UI — THE CATEGORIES CONSOLE.
 *
 * Gate tier: `categories:view` opens the section; every write RPC re-checks
 * its own granular permission and step-up server-side (F3). The roster is one
 * flat depth-ordered list rendered through the DataTable primitive with the
 * primitive's DEFAULTS — cards below md, priorities only, no min-widths and no
 * per-page width hack (C2-UI-FIX-5: the roster reads like the audit table).

 *
 * C2-UI-FIX: the table twin's actions are ONE horizontal icon row (edit,
 * visibility, countries, up, down) plus an inline overflow disclosure for the
 * rarer restructure/retire verbs. The disclosure is a `<details>`, NOT a
 * portalled menu, so the actions region stays a single DOM subtree that the
 * twin-aware E2E locators can scope to (J5). The card twin keeps full-text
 * buttons — a 360 card has the room and no hover affordance.
 */

/**
 * C2c — PAGE SIZE IS A DEVICE SETTING. Same storage discipline as the language
 * star: localStorage is the durable per-device record, read after mount so SSR
 * and the first client frame agree.
 */
const PAGE_SIZE_OPTIONS = [10, 25, 50, 100] as const;
const DEFAULT_PAGE_SIZE = 25;
const PAGE_SIZE_STORAGE_KEY = "ethio.admin.categories.pageSize";

type DialogState =
  | { kind: "none" }
  | { kind: "create" }
  | { kind: "edit" | "window" | "exclusions" | "retire" | "pointer" | "delete"; id: string };

/**
 * C2c — every status/flag badge carries an ACCESSIBLE description. `title`
 * serves the pointer, `aria-label` serves the screen reader; the visible text
 * stays the short chip so a 360px row still reads.
 */
function tipBadge(
  variant: "secondary" | "destructive" | "outline",
  label: string,
  description: string,
  className?: string,
  testid?: string,
) {
  return (
    <Badge
      variant={variant}
      className={className}
      title={description}
      aria-label={`${label}: ${description}`}
      data-testid={testid}
    >
      {label}
    </Badge>
  );
}

export function AdminCategoriesPage() {
  const { t } = useI18n();
  const { permissions } = useAdminShell();
  const { data, isLoading, error } = useAdminCategories();
  const countries = useCountries();
  const reorder = useReorderCategories();
  const reactivate = useReactivateCategory();
  const [search, setSearch] = useState("");
  const [rootFilter, setRootFilter] = useState("");
  const [missingOnly, setMissingOnly] = useState(false);
  const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE);
  const [offset, setOffset] = useState(0);

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

  /** C2c — a category with no icon AND/OR no image is not launch-ready. */
  const missingAssets = (row: CategoryNode) => row.icon === null || !row.hasImage;

  const needle = search.trim().toLowerCase();
  const filtered = useMemo(
    () =>
      roster.filter((row) => {
        if (rootFilter !== "" && rootOf(row) !== rootFilter) return false;
        if (missingOnly && !missingAssets(row)) return false;
        if (needle === "") return true;
        const parentName =
          row.parentId === null ? "" : (byId.get(row.parentId)?.nameEn.toLowerCase() ?? "");
        return (
          row.nameEn.toLowerCase().includes(needle) ||
          row.slug.toLowerCase().includes(needle) ||
          parentName.includes(needle)
        );
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [roster, needle, rootFilter, missingOnly, byId],
  );

  /** Per-root counts, so the filter says how much each subtree holds. */
  const rootCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const row of roster) counts.set(rootOf(row), (counts.get(rootOf(row)) ?? 0) + 1);
    return counts;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roster, byId]);

  useEffect(() => {
    setOffset(0);
  }, [needle, rootFilter, missingOnly]);

  const rows = filtered.slice(offset, offset + pageSize);

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

  /**
   * C2-UI-FIX-5 — THE ROSTER CONFORMS TO THE AUDIT TABLE. No per-column
   * min-widths, no `cardUntil` override, no pinned column: priorities alone
   * decide what a width shows, exactly as every other console table does.
   * The priorities themselves live in the service so they can be asserted
   * without rendering (see categories-service.test.ts).
   */
  const columns: DataTableColumn<CategoryNode>[] = [
    {
      key: "name",
      header: t("admin.categories.col.name"),
      priority: ROSTER_COLUMN_PRIORITIES.name,
      cell: (row) => (
        <span className="block min-w-0">
          <span className="block truncate font-medium text-foreground" title={row.nameEn}>
            {row.depth > 0 ? (
              <span aria-hidden="true" className="text-muted-foreground">
                {"· ".repeat(row.depth)}
              </span>
            ) : null}
            {row.nameEn}
          </span>
          <span className="block truncate text-xs text-muted-foreground" title={row.slug}>
            {row.slug}
          </span>
        </span>
      ),

    },
    {
      key: "parent",
      header: t("admin.categories.col.parent"),
      priority: ROSTER_COLUMN_PRIORITIES.parent,
      cell: (row) => (
        <span className="block min-w-0 break-words text-muted-foreground">
          {row.parentId === null ? "—" : (byId.get(row.parentId)?.nameEn ?? "—")}
        </span>
      ),
    },
    {
      key: "status",
      header: t("admin.categories.col.status"),
      priority: ROSTER_COLUMN_PRIORITIES.status,
      cell: (row) =>
        row.isActive
          ? tipBadge(
              "secondary",
              t("admin.categories.badge.active"),
              t("admin.categories.tip.active"),
            )
          : tipBadge(
              "destructive",
              t("admin.categories.badge.inactive"),
              // The exact Retired description: a retired node keeps its history
              // and its browse pointers, but no new listing can be posted to it.
              t("admin.categories.tip.retired"),
            ),
    },
    {
      key: "flags",
      header: t("admin.categories.col.flags"),
      priority: ROSTER_COLUMN_PRIORITIES.flags,
      cell: (row) => (
        <span className="flex flex-wrap gap-1">
          {row.isCatchall
            ? tipBadge(
                "outline",
                t("admin.categories.badge.catchall"),
                t("admin.categories.tip.catchall"),
              )
            : null}
          {/*
            C2-UI-FIX-3 — a RETIRED row states only what still applies to it.
            "Accepts listings" and "Price" describe posting behaviour a retired
            node no longer has, so they are not rendered at all; the row reads
            Retired (+ Missing assets when its media is absent).
          */}
          {row.isActive && row.allowListings
            ? tipBadge(
                "outline",
                t("admin.categories.badge.listings"),
                t("admin.categories.tip.listings"),
              )
            : null}
          {row.isActive && row.priceEnabled
            ? tipBadge(
                "outline",
                t("admin.categories.badge.price"),
                t("admin.categories.tip.price"),
              )
            : null}
          {row.isActive && (row.visibleFrom || row.visibleUntil)
            ? tipBadge(
                "outline",
                t("admin.categories.badge.window"),
                t("admin.categories.tip.window"),
              )
            : null}
          {missingAssets(row)
            ? tipBadge(
                "outline",
                t("admin.categories.badge.missingAssets"),
                t("admin.categories.tip.missingAssets"),
                "border-amber-500 text-amber-600 dark:text-amber-400",
                `category-missing-${row.slug}`,
              )
            : null}
        </span>
      ),
    },
    {
      key: "order",
      header: t("admin.categories.col.order"),
      // C2-UI-FIX-5 — numeric tail: reference, not an action; a detail column.
      priority: ROSTER_COLUMN_PRIORITIES.order,
      align: "end",
      cell: (row) => <span className="block tabular-nums">{row.displayOrder}</span>,
    },
    {
      key: "listings",
      header: t("admin.categories.col.listings"),
      // C2-UI-FIX-5 — numeric tail: reference, not an action; a detail column.
      priority: ROSTER_COLUMN_PRIORITIES.listings,
      align: "end",
      cell: (row) => <span className="block tabular-nums">{row.listingCount}</span>,
    },
    {
      key: "exclusions",
      header: t("admin.categories.col.exclusions"),
      // C2-UI-FIX-5 — numeric tail: reference, not an action; a detail column.
      priority: ROSTER_COLUMN_PRIORITIES.exclusions,
      align: "end",
      cell: (row) => <span className="block tabular-nums">{row.exclusionCount}</span>,
    },
  ];

  /**
   * C2e / UI-FIX-4 — THE ROLES INTERACTION MODEL. The row carries exactly ONE
   * verb: Edit. Every other verb (visibility, countries, browse paths, move,
   * retire/reactivate, delete) lives in the editor's verb bar, so the actions
   * column fits one button at every width and the card twin never wraps a
   * strip. The canonical `category-<verb>-<slug>` testids are preserved —
   * they simply moved inside the dialog (J5: still one match each).
   */
  const rowActions = (row: CategoryNode) =>
    mayUpdate ? (
      <span className="flex items-center xl:justify-end">
        <Button
          type="button"
          variant="outline"
          className="size-11 shrink-0 p-0"
          data-testid={`category-edit-${row.slug}`}
          aria-label={t("admin.categories.action.edit")}
          title={t("admin.categories.action.edit")}
          onClick={() => setDialog({ kind: "edit", id: row.id })}
        >
          <Pencil aria-hidden="true" className="size-4" />
        </Button>
      </span>
    ) : null;

  /**
   * The editor's verb bar: full-text buttons, ≥44px, wrapping by construction
   * so a 360px dialog and a 1440px dialog both show every verb without a
   * horizontal scroller. Gates and step-up are unchanged — each verb opens the
   * same dialog / mutation it did from the row.
   */
  const editorVerbs = (row: CategoryNode, guard: GuardFn) => {
    const verb = (
      testid: string,
      label: string,
      icon: React.ReactNode,
      onClick: () => void,
      disabled?: boolean,
      danger?: boolean,
    ) => (
      <Button
        key={testid}
        type="button"
        variant={danger ? "destructive" : "outline"}
        className="min-h-11"
        data-testid={testid}
        title={label}
        disabled={disabled}
        onClick={onClick}
      >
        {icon}
        <span>{label}</span>
      </Button>
    );

    return (
      <div className="flex flex-wrap gap-2" data-testid="category-verb-bar">
        {mayUpdate
          ? [
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
                `category-pointer-${row.slug}`,
                t("admin.categories.action.pointer"),
                <Share2 aria-hidden="true" className="size-4" />,
                () => setDialog({ kind: "pointer", id: row.id }),
              ),
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
              // C2d — a retired row swaps Retire for Reactivate and gains the
              // one destructive verb in the console: Delete, typed-confirm.
              row.isActive
                ? verb(
                    `category-retire-${row.slug}`,
                    t("admin.categories.action.retire"),
                    <Trash2 aria-hidden="true" className="size-4" />,
                    () => setDialog({ kind: "retire", id: row.id }),
                    row.isCatchall,
                  )
                : verb(
                    `category-reactivate-${row.slug}`,
                    t("admin.categories.action.reactivate"),
                    <RotateCcw aria-hidden="true" className="size-4" />,
                    () => {
                      void guard(async () => {
                        await reactivate.mutateAsync({ id: row.id });
                      });
                    },
                  ),
              row.isActive
                ? null
                : verb(
                    `category-delete-${row.slug}`,
                    t("admin.categories.action.delete"),
                    <Trash aria-hidden="true" className="size-4" />,
                    () => setDialog({ kind: "delete", id: row.id }),
                    false,
                    true,
                  ),
            ]
          : null}
      </div>
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
                      {`${row.nameEn} (${rootCounts.get(row.id) ?? 0})`}
                    </option>
                  ))}
                </select>
                <Button
                  type="button"
                  variant={missingOnly ? "default" : "outline"}
                  className="min-h-11"
                  aria-pressed={missingOnly}
                  data-testid="category-missing-filter"
                  onClick={() => setMissingOnly((prev) => !prev)}
                >
                  {t("admin.categories.filter.missingAssets")}
                </Button>
                <select
                  data-testid="category-page-size"
                  aria-label={t("admin.categories.filter.pageSize")}
                  className={`${SELECT_CLASS} md:w-32`}
                  value={String(pageSize)}
                  onChange={(event) => choosePageSize(Number(event.target.value))}
                >
                  {PAGE_SIZE_OPTIONS.map((size) => (
                    <option key={size} value={size}>
                      {String(size)}
                    </option>
                  ))}
                </select>
              </>
            }
            pagination={
              <DataTablePagination
                offset={offset}
                pageSize={pageSize}
                total={filtered.length}
                onPrevious={() => setOffset((prev) => Math.max(0, prev - pageSize))}
                onNext={() => setOffset((prev) => prev + pageSize)}
                testid="category-pagination"
              />
            }
            rowActions={(row) => rowActions(row)}
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
              verbBar={editorVerbs(selected, guard)}
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
          {selected && dialog.kind === "delete" ? (
            <DeleteCategoryDialog
              category={selected}
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
