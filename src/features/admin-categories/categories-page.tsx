import {
  ArrowDown,
  ArrowUp,
  CalendarClock,
  Check,
  Globe,
  ImageIcon,
  ImagePlus,
  ListChecks,
  Plus,
  RotateCcw,
  Share2,
  Trash,
  Trash2,
  Download,
  Upload,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useIsFetching, useQueryClient } from "@tanstack/react-query";

import { refreshAfterWrite } from "@/lib/refresh-after-write";
import { ColumnsButton } from "@/components/shell/columns-button";
import { useHiddenColumns, visibleColumns } from "@/components/shell/columns-state";
import {
  DataTable,
  DataTablePagination,
  type DataTableColumn,
} from "@/components/shell/data-table";
import { categoryRowGlyph } from "@/components/shell/category-glyphs";
import { FilterChips, FiltersButton } from "@/components/shell/filter-chips";
import { RowActions, type RowMoreAction } from "@/components/shell/row-actions";
import { TableActionButton, TableActions } from "@/components/shell/table-actions";
import { TableToolbar } from "@/components/shell/table-toolbar";
import { PageShell } from "@/components/layout/page-shell";
import { TipBadge } from "@/components/shell/tip-badge";
import { useKeptPage } from "@/components/shell/use-kept-page";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CutText } from "@/components/ui/cut-text";
import { Input } from "@/components/ui/input";
import { NativeSelect } from "@/components/ui/native-select";
import { useAdminShell } from "@/features/admin/admin-context";
import { useCountries } from "@/features/admin/users/use-admin-users";
import { StepUpGate } from "@/features/auth/mfa/step-up-gate";
import type { GuardFn } from "@/features/auth/mfa/use-step-up";
import { useI18n } from "@/i18n";
import { categoryFilterOptions, ancestorIds, subtreeCounts } from "@/lib/category-filter-options";
import { useSettling } from "@/lib/use-settling";
import { downloadRoute } from "@/lib/route-client";

import { CategoryAttributesDialog } from "@/features/admin-attributes/category-attributes-dialog";
import { needsCardAttributes } from "@/features/admin-attributes/attributes-service";

import { CategoryImageDialog } from "./category-image-dialog";
import { ImportCategoriesDialog } from "./category-import-dialog";
import { CategoryImageError, generateCategoryImage } from "./category-images-service";
import {
  CategoryExclusionsDialog,
  CategoryPathsDialog,
  CategoryWindowDialog,
  CategoryEditorDialog,
  DeleteCategoryDialog,
  RetireCategoryDialog,
  useSubmitError,
} from "./category-dialogs";
import { ROSTER_COLUMN_PRIORITIES, toRoster, type CategoryNode } from "./categories-service";
import {
  ADMIN_CATEGORIES_KEY,
  useAdminCategories,
  useReactivateCategory,
  useReorderCategories,
} from "./use-categories";
import { errorText } from "@/lib/error-text";

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
 *
 * Bundle 11 B2 (D84, D118, D128; DEC-170) — the pattern console on the agreed
 * blocks, the later word on the two notes above: the header's actions
 * (TableActions: Generate missing, Export, Import, then Create category); the
 * toolbar (the category subtree as the table's SCOPE — it also scopes Export and
 * Import — then search · Filters with Missing assets · Columns, chips under it);
 * the row's actions (RowActions: Edit; Delete in red, on only for a retired
 * category, as the verb bar offers it; the three-dots menu with every other
 * verb of the editor's verb bar, which keeps them all); the footer's three zones
 * with the page size. A dialog opened from the row closes back to the table; one
 * opened from the editor closes back to the editor (INC-150).
 */
const TABLE_ID = "admin-categories";
const LOCKED = ["name"];

/**
 * C2c — PAGE SIZE IS A DEVICE SETTING, kept in this browser by `useKeptPage`
 * (bundle 11 C1: one hook for every table; read after mount so SSR and the
 * first client frame agree).
 */
const PAGE_SIZE_STORAGE_KEY = "ethio.admin.categories.pageSize";

/**
 * C2-CLOSE (INC-150) — THE SUB-DIALOG IS ITS OWN AXIS. The editor is the one
 * door: a secondary surface (Visibility / Countries / Browse paths / Retire /
 * Delete) opens ON TOP of `kind: "edit"` and closing it clears only `sub`, so
 * the operator returns to the OPEN editor, never to the bare table.
 */
type EditorSub =
  | "window"
  | "exclusions"
  | "retire"
  | "pointer"
  | "delete"
  | "image"
  // C3c — the per-category attribute link manager, same editor axis.
  | "attributes";

/** C5b PART C — the bulk fill never runs more than this in one pass. */
const BULK_LIMIT = 25;

/**
 * C2-GHOST (INC-152) — the editor records HOW it was opened, so a ghost dialog
 * confesses its opener in the E2E dump instead of leaving a silent surface.
 */
type OpenedBy = "row-click" | "keyboard" | "create-button" | `verb-${EditorSub}`;

type DialogState =
  | { kind: "none" }
  | { kind: "create" }
  | { kind: "import" }
  | {
      kind: "edit";
      id: string;
      sub: EditorSub | null;
      openedBy: OpenedBy;
      /** Bundle 11 B2 — opened from the row's actions: closing returns to the table. */
      fromRow?: boolean;
    };

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
/**
 * UX-2 PART 3 — SCHEDULED IS A STATUS, computed in one place so the status
 * column and the flags column can never disagree (or repeat the same word).
 */
function isScheduled(row: { visibleFrom: string | null }): boolean {
  return row.visibleFrom !== null && Date.parse(row.visibleFrom) > Date.now();
}

/**
 * L2a-R — the markup now lives in the shared `TipBadge` primitive (B3), which
 * the locations console uses too. This is the call-shape adapter only: every
 * call site, test id and rendered attribute is unchanged, plus `data-tone`.
 */
function tipBadge(
  variant: "secondary" | "destructive" | "outline",
  label: string,
  description: string,
  className?: string,
  testid?: string,
) {
  return (
    <TipBadge
      variant={variant}
      label={label}
      tip={description}
      className={className}
      testid={testid}
    />
  );
}

export function AdminCategoriesPage() {
  const { t } = useI18n();
  const { permissions } = useAdminShell();
  const { data, isLoading, error } = useAdminCategories();
  /**
   * INC-558's class (turn G3c) — the roster is settling: a move or an editor
   * opened now would compute from the old order or seed the old values.
   */
  const settling = useSettling(ADMIN_CATEGORIES_KEY);
  const countries = useCountries();
  const reorder = useReorderCategories();
  const reactivate = useReactivateCategory();
  const [search, setSearch] = useState("");
  const [rootFilter, setRootFilter] = useState("");
  const [missingOnly, setMissingOnly] = useState(false);
  // Bundle 11 C1 — the page and its size kept in this browser, one hook for every table.
  const { page, setPage, pageSize, setPageSize, pageSizeOptions } =
    useKeptPage(PAGE_SIZE_STORAGE_KEY);
  const offset = page * pageSize;

  const [dialog, setDialog] = useState<DialogState>({ kind: "none" });
  /** C2-GHOST — the only close path, so no surface can forget the transition. */
  const closeDialog = (next: DialogState) => setDialog(next);
  /**
   * INC-150 kept — a sub-dialog opened from the editor closes back to the
   * editor; bundle 11 B2 — one opened from the row's actions closes back to the
   * table.
   */
  const closeSub = () => {
    if (dialog.kind !== "edit") return;
    closeDialog(
      dialog.fromRow === true
        ? { kind: "none" }
        : { kind: "edit", id: dialog.id, sub: null, openedBy: dialog.openedBy },
    );
  };
  const [hidden, toggleColumn] = useHiddenColumns(TABLE_ID);
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
  const mayAssets = permissions.includes("categories:assets");
  /** CAT-IE — the import door is its own permission; the RPCs refuse regardless. */
  const mayImport = permissions.includes("categories:import");

  /**
   * CAT-IE PART A — EXPORT. One download; the roster's root filter narrows it
   * to that subtree (the server resolves the descendants). A failure is a
   * translated caption beside the controls (F4), never silence.
   */
  const [exporting, setExporting] = useState(false);
  const [exportError, setExportError] = useState(false);

  /**
   * C5b PART C — BULK FILL. A client-driven SERIAL loop over the rows the
   * current filter shows without imagery: one gated route call at a time, a
   * live n/N caption, and a per-row failure (with its stage) that NEVER stops
   * the run (F4). One run at a time; the controls disable while it is live.
   */
  const queryClient = useQueryClient();
  const [bulkBusy, setBulkBusy] = useState(false);
  const [bulkProgress, setBulkProgress] = useState<{ done: number; total: number } | null>(null);
  const [bulkFailures, setBulkFailures] = useState<string[]>([]);
  const [bulkSummary, setBulkSummary] = useState<string | null>(null);

  const roster = useMemo(() => toRoster(data ?? []), [data]);
  /**
   * INC-579 — the roster is one whole read, re-read after every write; the search
   * narrows what that read holds. The search box says whether a re-read is in
   * flight and how many rows the read holds, so a test that misses a row it just
   * created can name why (nothing on screen changes).
   */
  const rosterReading = useIsFetching({ queryKey: [...ADMIN_CATEGORIES_KEY, "list"] }) > 0;
  const byId = useMemo(() => new Map(roster.map((row) => [row.id, row])), [roster]);
  /**
   * C3-UX-5 — the filter is a SUBTREE PICKER: every category in roster order,
   * built by the shared option builder both catalog consoles use (B3).
   */
  const filterOptions = useMemo(() => categoryFilterOptions(roster), [roster]);
  /** The scope the export and the import obey: the selected category's slug. */
  const scopeSlug = rootFilter === "" ? null : (byId.get(rootFilter)?.slug ?? null);

  const runExport = async () => {
    setExporting(true);
    setExportError(false);
    try {
      const query = scopeSlug === null ? "" : `?scope=${encodeURIComponent(scopeSlug)}`;
      const answer = await downloadRoute(
        `/api/admin/categories/export${query}`,
        scopeSlug === null ? "categories.csv" : `${scopeSlug}-categories.csv`,
      );
      if (answer.kind !== "answered" || !answer.ok) setExportError(true);
    } catch (error) {
      console.error("[categories] export failed", error);
      setExportError(true);
    } finally {
      setExporting(false);
    }
  };

  /**
   * C3-UX-5 — the filter scopes to the SELECTED category's subtree, so the
   * predicate asks whether the selection is anywhere on the row's ancestry
   * chain (the shared derivation; the counts below use the same one).
   */
  const inSubtree = (row: CategoryNode, ancestorId: string): boolean =>
    ancestorIds(row, byId).includes(ancestorId);

  /** C2c — a category with no icon AND/OR no image is not launch-ready. */
  const missingAssets = (row: CategoryNode) => row.icon === null || !row.hasImage;

  const needle = search.trim().toLowerCase();
  const filtered = useMemo(
    () =>
      roster.filter((row) => {
        if (rootFilter !== "" && !inSubtree(row, rootFilter)) return false;
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

  /**
   * Per-subtree counts, so every option says how much that subtree holds.
   * C5l PART C — ACTIVE-ONLY: a count inflated by retired rows lies about
   * what browsing operators actually work with.
   */
  const rootCounts = useMemo(() => subtreeCounts(roster), [roster]);

  useEffect(() => {
    setPage(0);
    // `setPage` is the kept page's state setter: stable, listed for the rule.
  }, [needle, rootFilter, missingOnly, setPage]);

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
  const allColumns: DataTableColumn<CategoryNode>[] = [
    {
      key: "name",
      header: t("admin.categories.col.name"),
      card: "title",
      priority: ROSTER_COLUMN_PRIORITIES.name,
      // Bundle 11 B3 (INC-542) — the name keeps a fifth of the table, so the
      // wider actions column never crushes it to its floor at the tablet band.
      width: "w-[22%]",
      cell: (row) => {
        // C5i PART B.1 — the row's chosen glyph, rendered before the name in
        // BOTH twins. An unknown/missing icon resolves to Package.
        // UX-2 PART 1 — catch-alls carry the fixed "more" glyph; every other
        // row resolves its stored name against the ONE allowlist.
        const { Glyph, iconName } = categoryRowGlyph(row.icon, row.isCatchall);
        return (
          <span className="flex min-w-0 items-start gap-2">
            {/* FIX-SCAN-1 ISSUE 4 — `data-icon` names what actually rendered:
                the stored name when it resolves, "Package" when it fell back.
                CT-29 reads it, so a drifted allowlist fails loudly. */}
            <Glyph
              aria-hidden="true"
              data-testid={`category-icon-${row.slug}`}
              data-icon={iconName}
              className="mt-0.5 size-4 shrink-0 text-muted-foreground"
            />
            <span className="block min-w-0">
              {/* D104 (bundle 11 B3) — a cut name keeps its first five characters. */}
              <span className="flex min-w-0 font-medium text-foreground" title={row.nameEn}>
                {row.depth > 0 ? (
                  <span
                    aria-hidden="true"
                    data-indent=""
                    className="shrink-0 whitespace-pre text-muted-foreground"
                  >
                    {"· ".repeat(row.depth)}
                  </span>
                ) : null}
                <CutText text={row.nameEn} />
              </span>
              <span className="block min-w-0 text-xs text-muted-foreground" title={row.slug}>
                <CutText text={row.slug} />
              </span>
            </span>
          </span>
        );
      },
    },
    {
      key: "parent",
      header: t("admin.categories.col.parent"),
      // V2b (the operator's walk) — the parent is a fact on the card's facts
      // line ("Parent —" for a root), not a line of its own.
      card: "meta",
      priority: ROSTER_COLUMN_PRIORITIES.parent,
      /**
       * C3c PART D — THE PRIMARY/SECONDARY PARENT CELL. Line 1 is the parent
       * the category is filed under, chipped "Primary"; line 2 names the other
       * branches it also appears in, so a flipped node (auto-services under
       * Services AND Vehicles) reads its whole placement from the roster.
       * Logical properties only — the chip flips with the writing direction.
       */
      cell: (row) => (
        <span className="block min-w-0 text-muted-foreground">
          <span className="flex min-w-0 flex-wrap items-center gap-1">
            <span className="min-w-0 break-words">
              {row.parentId === null ? "—" : (byId.get(row.parentId)?.nameEn ?? "—")}
            </span>
            {row.parentId === null ? null : (
              <Badge variant="outline" data-testid={`category-parent-primary-${row.slug}`}>
                {t("admin.categories.parent.primary")}
              </Badge>
            )}
          </span>
          {row.secondaryParentNames.length > 0 ? (
            <span
              className="block break-words text-xs"
              data-testid={`category-parent-also-${row.slug}`}
            >
              {t("admin.categories.parent.also").replace(
                "{list}",
                row.secondaryParentNames.join(" · "),
              )}
            </span>
          ) : null}
        </span>
      ),
    },

    {
      key: "status",
      header: t("admin.categories.col.status"),
      card: "badge",
      priority: ROSTER_COLUMN_PRIORITIES.status,
      cell: (row) => {
        if (!row.isActive) {
          return tipBadge(
            "destructive",
            t("admin.categories.badge.inactive"),
            // The exact Retired description: a retired node keeps its history
            // and its browse pointers, but no new listing can be posted to it.
            t("admin.categories.tip.retired"),
          );
        }
        /**
         * UX-2 PART 3 — A FUTURE WINDOW IS ITS OWN STATUS. An active row whose
         * `visible_from` has not arrived is NOT live in browse, so calling it
         * "Active" was a lie the era walk caught. Both twins read Scheduled.
         */
        if (isScheduled(row)) {
          return tipBadge(
            "outline",
            t("admin.categories.badge.scheduled"),
            t("admin.categories.tip.scheduled"),
          );
        }
        return tipBadge(
          "secondary",
          t("admin.categories.badge.active"),
          t("admin.categories.tip.active"),
        );
      },
    },
    {
      key: "flags",
      header: t("admin.categories.col.flags"),
      card: "badge",
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
          {/*
            UX-2 PART 3 — the STATUS owns "Scheduled". A row whose window has
            not opened already says so in its status, so the flag would be the
            same word twice; it is rendered only for the other window shapes.
          */}
          {row.isActive && (row.visibleFrom || row.visibleUntil) && !isScheduled(row)
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
          {/*
            C3c — THE TWO-MUST-DISPLAY FLAG. An active category that accepts
            listings but ranks fewer than two card attributes would render bare
            listing cards, so the roster flags it in the same amber as a
            missing image.
          */}
          {needsCardAttributes(row)
            ? tipBadge(
                "outline",
                t("admin.categories.badge.needsCard"),
                t("admin.categories.tip.needsCard"),
                "border-amber-500 text-amber-600 dark:text-amber-400",
                `category-needs-card-${row.slug}`,
              )
            : null}
        </span>
      ),
    },
    {
      key: "order",
      header: t("admin.categories.col.order"),
      card: "foot",
      // C2-UI-FIX-5 — numeric tail: reference, not an action; a detail column.
      priority: ROSTER_COLUMN_PRIORITIES.order,
      align: "end",
      cell: (row) => <span className="block tabular-nums">{row.displayOrder}</span>,
    },
    {
      key: "listings",
      header: t("admin.categories.col.listings"),
      card: "meta",
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

  const columns = visibleColumns(allColumns, hidden, LOCKED);

  /**
   * Bundle 11 B2 (DEC-170, the later word on C2e / UI-FIX-4's one row verb) —
   * the row carries Edit, a red Delete and the three-dots menu with every other
   * verb of the editor's verb bar, under the same gates; each opens the same
   * dialog or runs the same mutation, and the doors re-check (F3).
   */
  const rowActions = (row: CategoryNode, guard: GuardFn) => {
    const fromRow = (sub: EditorSub) => () =>
      setDialog({ kind: "edit", id: row.id, sub, openedBy: `verb-${sub}`, fromRow: true });
    const more: RowMoreAction[] = [];
    if (mayUpdate) {
      more.push(
        {
          key: "window",
          label: t("admin.categories.action.window"),
          icon: <CalendarClock />,
          onSelect: fromRow("window"),
        },
        {
          key: "exclusions",
          label: t("admin.categories.action.exclusions"),
          icon: <Globe />,
          onSelect: fromRow("exclusions"),
        },
        {
          key: "attributes",
          label: t("admin.categories.action.attributes"),
          icon: <ListChecks />,
          onSelect: fromRow("attributes"),
        },
      );
    }
    if (mayAssets) {
      more.push({
        key: "image",
        label: t("admin.categories.action.image"),
        icon: <ImageIcon />,
        onSelect: fromRow("image"),
      });
    }
    if (mayRestructure) {
      more.push({
        key: "pointer",
        label: t("admin.categories.action.pointer"),
        icon: <Share2 />,
        onSelect: fromRow("pointer"),
      });
      // C2g — a catch-all is pinned last by the server: no Move entries.
      if (!row.isCatchall) {
        more.push(
          {
            key: "up",
            label: t("admin.categories.action.up"),
            icon: <ArrowUp />,
            disabled: settling,
            onSelect: () => move(row, -1),
          },
          {
            key: "down",
            label: t("admin.categories.action.down"),
            icon: <ArrowDown />,
            disabled: settling,
            onSelect: () => move(row, 1),
          },
        );
      }
      more.push(
        row.isActive
          ? {
              key: "retire",
              label: t("admin.categories.action.retire"),
              icon: <Trash2 />,
              disabled: row.isCatchall,
              onSelect: fromRow("retire"),
            }
          : {
              key: "reactivate",
              label: t("admin.categories.action.reactivate"),
              icon: <RotateCcw />,
              onSelect: () =>
                runVerb(guard, async () => {
                  await reactivate.mutateAsync({ id: row.id });
                }),
            },
      );
    }
    return (
      <RowActions
        testid={`category-actions-${row.slug}`}
        name={row.nameEn}
        edit={
          mayUpdate
            ? {
                label: t("admin.categories.action.edit"),
                disabled: settling,
                onSelect: () => openEditor(row.id, "row-click"),
              }
            : undefined
        }
        remove={
          mayRestructure
            ? {
                label: t("admin.categories.action.delete"),
                // C2d — only a retired category may be deleted (typed confirm).
                disabled: row.isActive,
                onSelect: fromRow("delete"),
              }
            : undefined
        }
        more={more}
      />
    );
  };

  const runBulkFill = async (candidates: CategoryNode[]) => {
    const batch = candidates.slice(0, BULK_LIMIT);
    const remaining = candidates.length - batch.length;
    setBulkBusy(true);
    setBulkFailures([]);
    setBulkSummary(null);
    setBulkProgress({ done: 0, total: batch.length });
    let generated = 0;
    const failures: string[] = [];
    for (const [index, row] of batch.entries()) {
      try {
        await generateCategoryImage({ categoryId: row.id });
        generated += 1;
      } catch (error) {
        const stage = error instanceof CategoryImageError && error.stage ? ` ${error.stage}` : "";
        const detail = error === null || error === undefined ? "" : errorText(error);
        failures.push(`${row.slug}: ${t("admin.categories.image.stageLabel")}${stage} ${detail}`);
      }
      setBulkProgress({ done: index + 1, total: batch.length });
    }
    setBulkFailures(failures);
    setBulkSummary(
      `${generated} ${t("admin.categories.bulk.generated")} · ${failures.length} ${t("admin.categories.bulk.failed")}${
        remaining > 0 ? ` · ${t("admin.categories.bulk.more")}` : ""
      }`,
    );
    setBulkBusy(false);
    setBulkProgress(null);
    await refreshAfterWrite(queryClient, { queryKey: ADMIN_CATEGORIES_KEY });
  };

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
        size="touch"
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
              verb(
                `category-attributes-${row.slug}`,
                t("admin.categories.action.attributes"),
                <ListChecks aria-hidden="true" className="size-4" />,
                () =>
                  setDialog({
                    kind: "edit",
                    id: row.id,
                    sub: "attributes",
                    openedBy: "verb-attributes",
                  }),
              ),
            ]
          : null}
        {mayAssets
          ? verb(
              `category-image-${row.slug}`,
              t("admin.categories.action.image"),
              <ImageIcon aria-hidden="true" className="size-4" />,
              () => setDialog({ kind: "edit", id: row.id, sub: "image", openedBy: "verb-image" }),
            )
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
                    settling,
                  ),
              row.isCatchall
                ? null
                : verb(
                    `category-down-${row.slug}`,
                    t("admin.categories.action.down"),
                    <ArrowDown aria-hidden="true" className="size-4" />,
                    () => move(row, 1),
                    settling,
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
        <PageShell width="full" data-testid="admin-section-categories" className="space-y-4">
          <TableActions testid="category-header" title={t("admin.section.categories.title")}>
            {mayAssets ? (
              <TableActionButton
                data-testid="category-bulk-generate"
                /* DEC-032 — the spend cap is stated where it is spent. */
                hint={t("admin.categories.bulk.generateHint")}
                disabled={bulkBusy}
                onClick={() => void runBulkFill(filtered.filter((row) => !row.hasImage))}
                icon={<ImagePlus />}
                label={t("admin.categories.bulk.generateMissing")}
              />
            ) : null}
            <div
              data-testid="category-transfer"
              className="flex flex-wrap items-center gap-1.5 md:gap-2"
            >
              {/* CAT-IE — export honours the scope; import is gated. */}
              <TableActionButton
                data-testid="category-export"
                disabled={exporting}
                onClick={() => void runExport()}
                icon={<Download />}
                label={
                  exporting ? t("admin.categories.export.busy") : t("admin.categories.export.open")
                }
              />
              {mayImport ? (
                <TableActionButton
                  data-testid="category-import"
                  onClick={() => setDialog({ kind: "import" })}
                  icon={<Upload />}
                  label={t("admin.categories.import.open")}
                />
              ) : null}
            </div>
            {mayCreate ? (
              <TableActionButton
                variant="default"
                data-testid="category-create-open"
                onClick={() => setDialog({ kind: "create" })}
                icon={<Plus />}
                label={t("admin.categories.create.open")}
              />
            ) : null}
          </TableActions>
          {exportError ||
          bulkProgress !== null ||
          bulkSummary !== null ||
          bulkFailures.length > 0 ||
          (dialog.kind !== "edit" && verbError !== null) ? (
            <div data-testid="category-header-status" className="space-y-1 text-end">
              {exportError ? (
                <p
                  role="alert"
                  className="text-sm text-destructive"
                  data-testid="category-export-error"
                >
                  {t("admin.categories.export.error")}
                </p>
              ) : null}
              {bulkProgress === null ? null : (
                <p
                  role="status"
                  aria-live="polite"
                  data-testid="category-bulk-progress"
                  className="text-sm text-muted-foreground"
                >
                  {`${t("admin.categories.bulk.progress")} ${bulkProgress.done}/${bulkProgress.total}`}
                </p>
              )}
              {bulkSummary === null ? null : (
                <p
                  role="status"
                  data-testid="category-bulk-summary"
                  className="text-sm text-muted-foreground"
                >
                  {bulkSummary}
                </p>
              )}
              {bulkFailures.length === 0 ? null : (
                <ul data-testid="category-bulk-failures" className="text-sm text-destructive">
                  {bulkFailures.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              )}
              {/* A verb run from the row (Move, Reactivate) says its refusal here (F4). */}
              {dialog.kind !== "edit" && verbError !== null ? (
                <p
                  role="alert"
                  data-testid="category-verb-error"
                  className="text-sm text-destructive"
                >
                  {verbError}
                </p>
              ) : null}
            </div>
          ) : null}

          <DataTable<CategoryNode>
            columns={columns}
            rows={filtered}
            page={page}
            pageSize={pageSize}
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
              <TableToolbar
                testid="category-toolbar"
                scope={
                  <NativeSelect
                    data-testid="category-root-filter"
                    aria-label={t("admin.categories.filter.root")}
                    className="w-full md:w-64"
                    value={rootFilter}
                    onChange={(event) => setRootFilter(event.target.value)}
                  >
                    <option value="">{t("admin.categories.filter.allCategories")}</option>
                    {filterOptions.map((row) => (
                      <option
                        key={row.id}
                        value={row.id}
                        data-depth={row.depth}
                        data-parent-id={row.parentId ?? ""}
                        {...(row.isActive ? {} : { "data-retired": "true" })}
                        className={row.isActive ? undefined : "text-muted-foreground"}
                      >
                        {`${row.label} (${rootCounts.get(row.id) ?? 0})${
                          row.isActive ? "" : ` — ${t("admin.categories.filter.retired")}`
                        }`}
                      </option>
                    ))}
                  </NativeSelect>
                }
                search={
                  <Input
                    data-testid="category-search"
                    data-reading={rosterReading ? "1" : "0"}
                    data-roster={roster.length}
                    data-results={filtered.length}
                    aria-label={t("admin.categories.searchPlaceholder")}
                    placeholder={t("admin.categories.searchPlaceholder")}
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                  />
                }
                filters={
                  <FiltersButton
                    testid="category-filters"
                    count={missingOnly ? 1 : 0}
                    state={String(missingOnly)}
                    resultCount={filtered.length}
                    onClearAll={() => setMissingOnly(false)}
                  >
                    {/* Bundle 11 V2 — a one-tap pill, the look of every filter choice. */}
                    <Button
                      type="button"
                      variant={missingOnly ? "default" : "outline"}
                      aria-pressed={missingOnly}
                      data-testid="category-missing-filter"
                      className="h-10 self-start rounded-full px-3.5"
                      onClick={() => setMissingOnly((prev) => !prev)}
                    >
                      {missingOnly ? <Check aria-hidden="true" /> : null}
                      {t("admin.categories.filter.missingAssets")}
                    </Button>
                  </FiltersButton>
                }
                columns={
                  <ColumnsButton
                    testid="category-columns"
                    columns={allColumns.map((column) => ({
                      key: column.key,
                      label: String(column.header),
                      locked: LOCKED.includes(column.key),
                    }))}
                    hidden={hidden}
                    onToggle={toggleColumn}
                  />
                }
                chips={
                  <FilterChips
                    testid="category-chips"
                    chips={
                      missingOnly
                        ? [
                            {
                              key: "missing",
                              label: t("admin.categories.filter.missingAssets"),
                              onRemove: () => setMissingOnly(false),
                            },
                          ]
                        : []
                    }
                    onClearAll={() => setMissingOnly(false)}
                  />
                }
              />
            }
            pagination={
              <DataTablePagination
                offset={offset}
                pageSize={pageSize}
                total={filtered.length}
                onPrevious={() => setPage((current) => Math.max(0, current - 1))}
                onNext={() => setPage((current) => current + 1)}
                onPage={setPage}
                pageSizeOptions={pageSizeOptions}
                onPageSize={setPageSize}
                testid="category-pagination"
              />
            }
            rowActions={(row) => rowActions(row, guard)}
            actionsWidth="w-44"
          />

          {dialog.kind === "import" ? (
            <ImportCategoriesDialog
              scope={scopeSlug}
              guard={guard}
              onClose={() => closeDialog({ kind: "none" })}
            />
          ) : null}

          {dialog.kind === "create" ||
          (selected && dialog.kind === "edit" && dialog.sub === null) ? (
            /* C5m PART A — ONE surface, two modes. The create-mode dialog
               transitions in place to edit-mode on the new id (no reopen). */
            <CategoryEditorDialog
              key="category-editor"
              mode={dialog.kind === "create" ? "create" : "edit"}
              category={dialog.kind === "edit" ? selected : null}
              parents={roster}
              countries={(countries.data ?? []).map((country) => ({
                code: country.code,
                nameEn: country.nameEn,
              }))}
              guard={guard}
              verbBar={
                dialog.kind === "edit" && selected ? editorVerbs(selected, guard) : undefined
              }
              openedBy={dialog.kind === "create" ? "create-button" : dialog.openedBy}
              onClose={() => closeDialog({ kind: "none" })}
            />
          ) : null}
          {selected && dialog.kind === "edit" && dialog.sub === "window" ? (
            <CategoryWindowDialog
              category={selected}
              openedBy="verb-window"
              guard={guard}
              onClose={closeSub}
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
              onClose={closeSub}
            />
          ) : null}
          {selected && dialog.kind === "edit" && dialog.sub === "retire" ? (
            <RetireCategoryDialog
              category={selected}
              openedBy="verb-retire"
              targets={roster.filter((row) => row.isActive)}
              guard={guard}
              onClose={closeSub}
            />
          ) : null}
          {selected && dialog.kind === "edit" && dialog.sub === "delete" ? (
            <DeleteCategoryDialog
              category={selected}
              openedBy="verb-delete"
              guard={guard}
              onClose={closeSub}
            />
          ) : null}
          {dialog.kind === "edit" && dialog.sub === "image" ? (
            // The freshly created row may not be in the roster yet (the list
            // refetch is async), so this surface is keyed by ID, never by the
            // roster row — the editor behind it waits for the row itself.
            <CategoryImageDialog
              categoryId={dialog.id}
              hasImage={selected?.hasImage ?? false}
              guard={guard}
              openedBy="verb-image"
              onClose={closeSub}
            />
          ) : null}
          {selected && dialog.kind === "edit" && dialog.sub === "attributes" ? (
            <CategoryAttributesDialog
              categoryId={selected.id}
              categoryName={selected.nameEn}
              guard={guard}
              onClose={closeSub}
            />
          ) : null}
          {selected && dialog.kind === "edit" && dialog.sub === "pointer" ? (
            <CategoryPathsDialog
              category={selected}
              openedBy="verb-pointer"
              parents={roster}
              guard={guard}
              onClose={closeSub}
            />
          ) : null}
        </PageShell>
      )}
    </StepUpGate>
  );
}

export default AdminCategoriesPage;
