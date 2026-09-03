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
  useSubmitError,
} from "./category-dialogs";
import { ROSTER_COLUMN_PRIORITIES, toRoster, type CategoryNode } from "./categories-service";
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

/**
 * C2-CLOSE (INC-150) — THE SUB-DIALOG IS ITS OWN AXIS. The editor is the one
 * door: a secondary surface (Visibility / Countries / Browse paths / Retire /
 * Delete) opens ON TOP of `kind: "edit"` and closing it clears only `sub`, so
 * the operator returns to the OPEN editor, never to the bare table.
 */
type EditorSub = "window" | "exclusions" | "retire" | "pointer" | "delete";

/**
 * C2-GHOST (INC-152) — the editor records HOW it was opened, so a ghost dialog
 * confesses its opener in the E2E dump instead of leaving a silent surface.
 */
type OpenedBy = "row-click" | "keyboard" | "create-button" | `verb-${EditorSub}`;

type DialogState =
  | { kind: "none" }
  | { kind: "create" }
  | { kind: "edit"; id: string; sub: EditorSub | null; openedBy: OpenedBy };

/**
 * C2-GHOST PART A — STRUCTURAL KILL, retuned by C2-SETTLE. The single
 * edit-opener is a NO-OP while any dialog is open: a closing dialog's
 * animation used to hand its click straight back to the row underneath,
 * re-opening a "ghost" editor. The kind-check alone proved sufficient, so the
 * 350ms time-window and its timestamp ref were removed here (INC-152 closed).
 */

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
  /** C2-GHOST — the only close path, so no surface can forget the transition. */
  const closeDialog = (next: DialogState) => setDialog(next);
  /**
   * The single edit-opener; a no-op while a dialog is open (C2-SETTLE Part A:
   * the kind check alone — no time-window, no close timestamp).
   */
  const openEditor = (id: string, openedBy: "row-click" | "keyboard") => {
    if (dialog.kind !== "none") return;
    setDialog({ kind: "edit", id, sub: null, openedBy });
  };
  // UI-FIX-7 — the verb bar's own refusal line, filled by the shared runner.
  const { message: verbError, setMessage: setVerbError, fail: failVerb } = useSubmitError();

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

  /**
   * INC-142 — the dialog stores ONLY the id; the rendered row is looked up in
   * the live roster on every render, so the verb bar tracks a status change
   * (retire / reactivate) the moment the query settles.
   */
  const selected =
    dialog.kind === "edit" ? (roster.find((row) => row.id === dialog.id) ?? null) : null;

  // A newly opened dialog never inherits the previous verb's refusal.
  useEffect(() => {
    setVerbError(null);
  }, [dialog, setVerbError]);

  /** ... and the editor closes gracefully when its row vanishes (delete). */
  useEffect(() => {
    if (dialog.kind !== "edit") return;
    if (isLoading) return;
    if (!roster.some((row) => row.id === dialog.id)) closeDialog({ kind: "none" });
  }, [dialog, roster, isLoading]);

  const siblingsOf = (row: CategoryNode) => roster.filter((peer) => peer.parentId === row.parentId);

  /**
   * UI-FIX-7 (INC-144) — ONE GUARDED RUNNER FOR EVERY BAR VERB.
   *
   * The shared step-up flow already replays the pending action after a
   * successful verification (`use-step-up.submitCode` → `runGuarded`); what the
   * verb bar lacked was the working consumers' `.catch` (see
   * translations/languages-page `apply`/`move`): a refusal used to reject an
   * un-awaited promise, so a failed verb looked like nothing happened (F4).
   * Every guarded verb now goes through this one function — never a per-verb
   * patch — and its refusal renders translated in the bar.
   */
  const runVerb = (guard: GuardFn, action: () => Promise<void>) => {
    setVerbError(null);
    void guard(action).catch(failVerb);
  };

  /**
   * C2k / INC-148 — MOVE CARRIES NO PRE-EMPTIVE STEP-UP FLAG.
   *
   * `guard()` pre-checks the client's step-up freshness and opens the modal
   * BEFORE any RPC. Reorder is not step-up gated on the server (C2h), so that
   * pre-check was a client-side flag inventing a prompt the server never asks
   * for. Move now calls the mutation directly; if any server ever answers
   * `step-up required` (P0009), the shared defence-in-depth path in
   * `use-step-up` still opens the modal and replays the action.
   */
  const move = (row: CategoryNode, delta: number) => {
    const siblings = siblingsOf(row);
    const index = siblings.findIndex((peer) => peer.id === row.id);
    const next = index + delta;
    if (index < 0 || next < 0 || next >= siblings.length) return;
    const ordered = siblings.map((peer) => peer.id);
    const [moved] = ordered.splice(index, 1);
    ordered.splice(next, 0, moved!);
    setVerbError(null);
    void reorder
      .mutateAsync({ parentId: row.parentId, orderedChildIds: ordered })
      .then(() => undefined)
      .catch(failVerb);
  };

  /**
   * C2-UI-FIX-5 — THE ROSTER CONFORMS TO THE AUDIT TABLE. No per-column
   * min-widths, no card-breakpoint override, no pinned column: priorities alone
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
          onClick={() => openEditor(row.id, "row-click")}
          onKeyDown={(event) => {
            if (event.key !== "Enter" && event.key !== " ") return;
            event.preventDefault();
            openEditor(row.id, "keyboard");
          }}
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
        {verbError === null ? null : (
          <p
            role="alert"
            data-testid="category-verb-error"
            className="w-full text-sm text-destructive"
          >
            {verbError}
          </p>
        )}
        {mayUpdate
          ? [
              verb(
                `category-window-${row.slug}`,
                t("admin.categories.action.window"),
                <CalendarClock aria-hidden="true" className="size-4" />,
                () =>
                  setDialog({ kind: "edit", id: row.id, sub: "window", openedBy: "verb-window" }),
              ),
              verb(
                `category-exclusions-${row.slug}`,
                t("admin.categories.action.exclusions"),
                <Globe aria-hidden="true" className="size-4" />,
                () =>
                  setDialog({
                    kind: "edit",
                    id: row.id,
                    sub: "exclusions",
                    openedBy: "verb-exclusions",
                  }),
              ),
            ]
          : null}
        {mayRestructure
          ? [
              verb(
                `category-pointer-${row.slug}`,
                t("admin.categories.action.pointer"),
                <Share2 aria-hidden="true" className="size-4" />,
                () =>
                  setDialog({ kind: "edit", id: row.id, sub: "pointer", openedBy: "verb-pointer" }),
              ),
              // C2g — a catch-all is pinned last by the server, so it carries
              // no Move verbs at all (the console never offers a refused move).
              row.isCatchall
                ? null
                : verb(
                    `category-up-${row.slug}`,
                    t("admin.categories.action.up"),
                    <ArrowUp aria-hidden="true" className="size-4" />,
                    () => move(row, -1),
                  ),
              row.isCatchall
                ? null
                : verb(
                    `category-down-${row.slug}`,
                    t("admin.categories.action.down"),
                    <ArrowDown aria-hidden="true" className="size-4" />,
                    () => move(row, 1),
                  ),

              // C2d — a retired row swaps Retire for Reactivate and gains the
              // one destructive verb in the console: Delete, typed-confirm.
              row.isActive
                ? verb(
                    `category-retire-${row.slug}`,
                    t("admin.categories.action.retire"),
                    <Trash2 aria-hidden="true" className="size-4" />,
                    () =>
                      setDialog({
                        kind: "edit",
                        id: row.id,
                        sub: "retire",
                        openedBy: "verb-retire",
                      }),
                    row.isCatchall,
                  )
                : verb(
                    `category-reactivate-${row.slug}`,
                    t("admin.categories.action.reactivate"),
                    <RotateCcw aria-hidden="true" className="size-4" />,
                    () =>
                      runVerb(guard, async () => {
                        await reactivate.mutateAsync({ id: row.id });
                      }),
                  ),
              row.isActive
                ? null
                : verb(
                    `category-delete-${row.slug}`,
                    t("admin.categories.action.delete"),
                    <Trash aria-hidden="true" className="size-4" />,
                    () =>
                      setDialog({
                        kind: "edit",
                        id: row.id,
                        sub: "delete",
                        openedBy: "verb-delete",
                      }),
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
              openedBy="create-button"
              guard={guard}
              onClose={() => closeDialog({ kind: "none" })}
            />
          ) : null}
          {selected && dialog.kind === "edit" && dialog.sub === null ? (
            <EditCategoryDialog
              category={selected}
              guard={guard}
              openedBy={dialog.openedBy}
              verbBar={editorVerbs(selected, guard)}
              onClose={() => closeDialog({ kind: "none" })}
            />
          ) : null}
          {selected && dialog.kind === "edit" && dialog.sub === "window" ? (
            <CategoryWindowDialog
              category={selected}
              openedBy="verb-window"
              guard={guard}
              onClose={() =>
                closeDialog({ kind: "edit", id: dialog.id, sub: null, openedBy: dialog.openedBy })
              }
            />
          ) : null}
          {selected && dialog.kind === "edit" && dialog.sub === "exclusions" ? (
            <CategoryExclusionsDialog
              category={selected}
              openedBy="verb-exclusions"
              countries={(countries.data ?? []).map((country) => ({
                code: country.code,
                nameEn: country.nameEn,
              }))}
              guard={guard}
              onClose={() =>
                closeDialog({ kind: "edit", id: dialog.id, sub: null, openedBy: dialog.openedBy })
              }
            />
          ) : null}
          {selected && dialog.kind === "edit" && dialog.sub === "retire" ? (
            <RetireCategoryDialog
              category={selected}
              openedBy="verb-retire"
              targets={roster.filter((row) => row.isActive)}
              guard={guard}
              onClose={() =>
                closeDialog({ kind: "edit", id: dialog.id, sub: null, openedBy: dialog.openedBy })
              }
            />
          ) : null}
          {selected && dialog.kind === "edit" && dialog.sub === "delete" ? (
            <DeleteCategoryDialog
              category={selected}
              openedBy="verb-delete"
              guard={guard}
              onClose={() =>
                closeDialog({ kind: "edit", id: dialog.id, sub: null, openedBy: dialog.openedBy })
              }
            />
          ) : null}
          {selected && dialog.kind === "edit" && dialog.sub === "pointer" ? (
            <CategoryPathsDialog
              category={selected}
              openedBy="verb-pointer"
              parents={roster}
              guard={guard}
              onClose={() =>
                closeDialog({ kind: "edit", id: dialog.id, sub: null, openedBy: dialog.openedBy })
              }
            />
          ) : null}
        </div>
      )}
    </StepUpGate>
  );
}

export default AdminCategoriesPage;
