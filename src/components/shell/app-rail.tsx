import { CutText } from "@/components/ui/cut-text";
import * as DialogPrimitive from "@/components/ui/dialog-primitive";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, LogOut, Star, type LucideIcon } from "lucide-react";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";

import { useShell } from "@/components/shell-context";
import { useCategoryGlyphs } from "@/components/shell/use-category-glyphs";
import { PanelHeader } from "@/components/shell/panel-header";
import { useShownPathname } from "@/components/shell/use-shown-pathname";
import { useFooterInset } from "@/components/shell/use-footer-inset";
import {
  SUBMENU_SIGNALS,
  submenuOpen,
  submenuTriggerProps,
} from "@/components/shell/submenu/submenu-signal";
import { useOverlays } from "@/components/ui/overlay-facade";

import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { PANELS, categoryIcon, visibleItems } from "@/config/panels";
import type { NavItem } from "@/config/panels.types";
import {
  childrenOf,
  feedRouteOf,
  pathOf,
  rootsOf,
  useCategoryTree,
  type CategoryNode,
} from "@/features/categories/category-tree";
import { isE2E } from "@/lib/env-flags";
import { useI18n } from "@/i18n";
import { entityName } from "@/i18n/entity";
import type { MessageKey } from "@/i18n";
import { cn } from "@/lib/utils";
import { ownValue } from "@/lib/own-key";
import { useRailCollapsed } from "@/providers/rail-state";
import { NAV_ALERT_LABELS, useNavAlerts } from "@/features/admin/nav-alerts";

/** D207 — one device favourite, shared by every mounted reader. */
const FAVOURITE_KEY = "ethio.fav";
const FAVOURITE_SLUG = /^[a-z0-9-]{1,80}$/;
const favouriteReaders = new Set<() => void>();
function readFavourite(): string | null {
  try {
    const slug = window.localStorage.getItem(FAVOURITE_KEY);
    return slug !== null && FAVOURITE_SLUG.test(slug) ? slug : null;
  } catch {
    // D207: unavailable storage deliberately means no device favourite.
    return null;
  }
}
function subscribeFavourite(reader: () => void): () => void {
  favouriteReaders.add(reader);
  const onStorage = (event: StorageEvent) => {
    if (event.key === FAVOURITE_KEY || event.key === null) reader();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    favouriteReaders.delete(reader);
    window.removeEventListener("storage", onStorage);
  };
}
const favouriteServerSnapshot = () => null;
function writeFavourite(slug: string | null): void {
  try {
    if (slug === null) window.localStorage.removeItem(FAVOURITE_KEY);
    else window.localStorage.setItem(FAVOURITE_KEY, slug);
  } catch {
    console.warn("[favourite] device storage is unavailable");
  }
  for (const reader of favouriteReaders) reader();
}
export function useFavouriteCategory(): {
  slug: string | null;
  set: (slug: string | null) => void;
} {
  const { tree } = useCategoryTree();
  const bySlug = useMemo(
    () => Object.fromEntries(tree.nodes.map((node) => [node.slug, node])),
    [tree],
  );
  const stored = useSyncExternalStore(subscribeFavourite, readFavourite, favouriteServerSnapshot);
  const slug = stored !== null && ownValue(bySlug, stored) ? stored : null;
  const set = (next: string | null) => {
    if (next === null || (FAVOURITE_SLUG.test(next) && ownValue(bySlug, next)))
      writeFavourite(next);
  };
  return { slug, set };
}

/**
 * COLLAPSE — an OPTION on md+, never the default and never on mobile.
 *
 * Layout keys off `html[data-rail="collapsed"]`, which the pre-paint script in
 * AppShell has already written, so the collapsed rail is correct on the FIRST
 * painted frame (no flash). React state only drives behaviour that cannot be
 * expressed in CSS — the toggle's aria-pressed and whether hovering a row
 * shows its label as a tooltip.
 *
 * One ☰ per width, top-left: below 768 it opens the phone menu; from 768
 * it folds the persistent menu. Only the stored choice activates rail-icons.
 */
const HIDE_WHEN_COLLAPSED = "rail-icons:hidden";
/** DEC-288 item 7 — a phone row: 32–40 px with a fine pointer, at least 44 px with a coarse one (C2). */
const COMPACT_ROW =
  "flex min-h-8 max-h-10 pointer-coarse:min-h-11 pointer-coarse:max-h-none flex-1 flex-col";
const COMPACT_HEAD =
  "h-8 min-h-8 max-h-10 pointer-coarse:h-auto pointer-coarse:min-h-11 pointer-coarse:max-h-none flex-1";

const ITEM_CORE =
  "flex min-h-11 md:pointer-fine:min-h-9 md:pointer-fine:max-h-12 w-full items-center gap-2 rounded-md pe-3 text-start text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring " +
  "ps-[var(--rail-pad)]";
const ITEM_ICONS = "rail-icons:justify-center rail-icons:ps-0 rail-icons:pe-0";
const ITEM_BASE = `${ITEM_CORE} ${ITEM_ICONS}`;
/** Hover stays on the SIDEBAR token family — bg-muted is a content-surface
 *  token and read as a foreign grey against bg-sidebar (INC-042). */
const ITEM_IDLE = "text-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground";
/** Selection is GREEN, never a cream tint — the one emphasis surface. */
/** C2h.2 — ONE selected look: the bar's pill tint, in every menu. */
const ITEM_ACTIVE = "bg-nav-active font-semibold text-primary";

/**
 * C5i PART B.3 — THE STORED ICON IS THE GLYPH.
 *
 * `categories.icon` (the allowlisted lucide name the suggester writes) is the
 * operator's chosen glyph, so the public rail renders IT. The slug map in
 * src/config/panels.ts stays the fallback for rows that carry no icon yet, and
 * `Package` is the last resort for a name that is not in this map — exactly the
 * server-side allowlist's fallback, so console and rail never disagree.
 */

/** True only after hydration on a collapsed desktop rail. */

const CollapsedContext = createContext(false);
/** The persistent rail, phone icon strip and opened phone menu. */
export const RailVariantContext = createContext<"rail" | "strip" | "menu">("rail");

/** Icons-only hiding belongs to the persistent rail alone. */
function useHide(): string {
  return useContext(RailVariantContext) === "rail" ? HIDE_WHEN_COLLAPSED : "";
}
function useItemBase(): string {
  return useContext(RailVariantContext) === "rail" ? ITEM_BASE : ITEM_CORE;
}

/**
 * Hover label for the icons-only rail. Expanded rails need no tooltip.
 *
 * INC-089 — THE ASCHILD/REF CONTRACT. Every `asChild` parent (Radix Slot)
 * composes ITS OWN ref — often a `useState` setter — onto the child it is
 * given. If that child cannot hold a ref (a Fragment) or is a Root/provider
 * component that never forwards one, the composed setter is written with
 * `null` on every render pass: `setRef` → `dispatchSetState` → re-render →
 * `setRef` again. Mapped rows multiply the churn until React aborts with #185.
 *
 * So: the non-collapsed branch returns `children` UNWRAPPED (no Fragment), and
 * no caller may hand this component's output to another `asChild` parent — the
 * tooltip always sits OUTSIDE the trigger, never between a trigger and its DOM
 * element. See RailRow's collapsible branch.
 */
function WithTooltip({
  label,
  children,
  skip,
}: {
  label: string;
  children: ReactNode;
  skip?: boolean;
}) {
  const collapsed = useContext(CollapsedContext);
  if (!collapsed || skip) return children as React.ReactElement;
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side="right" data-testid="rail-tooltip">
        {label}
      </TooltipContent>
    </Tooltip>
  );
}

/** A node the rail can render: either a config NavItem or a live category. */
type RailNode = {
  key: string;
  /** Stable hook for tests; config items pass their item id. */
  testid?: string;
  label: string;
  favourite?: boolean;
  accessibleLabel?: string;
  icon?: NavItem["icon"];
  /** INC-974 (row 60) — the glyph map is still on its way: the row holds the glyph's box. */
  glyphPending?: boolean;
  path?: string;
  /**
   * U6-C1-R3a — an ANCHOR item: a section of a page another item already owns
   * ("Sign-in and security" inside /settings). Two items sharing one path both
   * highlighted, which told the seller nothing; the hash separates them.
   */
  hash?: string;
  /** Route params for a dynamic path (U0l: /c/$slug). */
  params?: Record<string, string>;
  active?: boolean;
  ancestorActive?: boolean;
  categoryBranch?: boolean;
  /** DEC-288 — the row opens a side panel of its sub-items (submenu-signal.ts). */
  submenu?: string;
  preload?: "intent";
  onSelect?: () => void;
  children?: RailNode[];
  /** C3-UX-2 — a group that renders expanded on its first frame. */
  defaultOpen?: boolean;
  /** A visual cluster with always-present sub-items; its header may own a page. */
  group?: boolean; /** Bundle 22 turn 20 (DEC-219) — the server says this section needs attention: a dot on its icon. */
  alert?: boolean;
};

/**
 * ONE recursive renderer for every rail node, at any depth. A node with
 * children becomes an expand/collapse submenu (ui/collapsible — the primitive
 * already in the kit, not a re-implementation); a node without children is a
 * leaf row. Depth adds start-padding only, so the 44px tap target and the
 * 360px fit hold all the way down.
 */
function RailRow({ node, depth = 0 }: { node: RailNode; depth?: number }) {
  const variant = useContext(RailVariantContext);
  const strip = variant === "strip";
  const compact = variant === "strip" || variant === "menu";
  const hide = useHide();
  const itemBase = useItemBase();
  const testid =
    node.testid && (strip ? `strip-${node.testid.replace(/^rail-/, "")}` : node.testid);
  // INC-756 — a phone row fills its item by flex: a percentage height (h-full)
  // under the nav's min-h-full resolved to the row's content, 24 px (run 1038).
  const compactClass =
    compact &&
    cn(
      "min-h-0 flex-1",
      strip ? "justify-center ps-0 pe-0" : "justify-start gap-3 ps-[var(--rail-pad)] pe-2",
    );
  const hasChildren = (node.children?.length ?? 0) > 0;
  // An active descendant keeps its ancestor open.
  const containsActive = (n: RailNode): boolean =>
    Boolean(n.active) || (n.children ?? []).some(containsActive);
  const [open, setOpen] = useState(
    () => hasChildren && (containsActive(node) || Boolean(node.defaultOpen)),
  );

  const submenuKey = useSyncExternalStore(
    submenuOpen.subscribe,
    submenuOpen.get,
    submenuOpen.server,
  );
  const trigger = node.submenu
    ? submenuTriggerProps(node.submenu, submenuKey === node.submenu)
    : undefined;

  const Icon = node.icon;
  const inner = (
    <>
      {Icon ? (
        node.favourite || node.alert ? (
          <span className={cn("relative shrink-0", compact ? "h-6 w-6" : "h-5 w-5")}>
            <Icon className="h-full w-full" aria-hidden="true" />
            {node.favourite ? (
              <Star
                className="absolute -end-1 -top-1 h-3 w-3 fill-gold text-gold"
                aria-hidden="true"
              />
            ) : null}
            {node.alert ? (
              <span
                aria-hidden="true"
                data-testid="rail-alert"
                className="absolute -end-0.5 -top-0.5 h-2 w-2 rounded-full bg-destructive"
              />
            ) : null}
          </span>
        ) : (
          <Icon className={cn("shrink-0", compact ? "h-6 w-6" : "h-5 w-5")} aria-hidden="true" />
        )
      ) : node.glyphPending ? (
        <span
          data-testid="rail-glyph-box"
          aria-hidden="true"
          className={cn("shrink-0", compact ? "h-6 w-6" : "h-5 w-5")}
        />
      ) : null}
      <CutText className={cn(hide, strip && "sr-only")} text={node.label} />
    </>
  );
  const pad = { "--rail-pad": `${0.75 + depth * 1}rem` } as React.CSSProperties;

  // D205 — painted strip rows are not navigation controls; the strip opens the menu.
  if (strip) {
    return (
      <li className={cn(hasChildren ? "flex flex-1 flex-col" : COMPACT_ROW)}>
        <span
          data-testid={testid}
          data-alert={node.alert ? "true" : undefined}
          aria-label={node.accessibleLabel ?? node.label}
          aria-current={node.ancestorActive ? "true" : node.active ? "page" : undefined}
          style={pad}
          className={cn(
            itemBase,
            node.active || node.ancestorActive ? ITEM_ACTIVE : ITEM_IDLE,
            compactClass,
            hasChildren && COMPACT_HEAD,
          )}
        >
          {inner}
        </span>
        {hasChildren ? (
          <ul className="mt-0.5 flex flex-1 flex-col gap-0.5">
            {(node.children ?? []).map((child) => (
              <RailRow key={child.key} node={child} depth={depth + 1} />
            ))}
          </ul>
        ) : null}
      </li>
    );
  }

  // C3-UX-2 amended — a GROUP is a visual cluster, NOT an accordion. A group
  // MAY own a page; only then is its header a link. Its sub-items remain
  // indented and always present, and categories remains non-interactive.
  if (hasChildren && node.group) {
    const groupClassName = cn(
      itemBase,
      containsActive(node) ? ITEM_ACTIVE : ITEM_IDLE,
      compactClass,
      compact && COMPACT_HEAD,
    );
    return (
      <li className={cn(compact && (hasChildren ? "flex flex-1 flex-col" : COMPACT_ROW))}>
        {node.path ? (
          <Link
            to={node.path}
            onClick={node.onSelect}
            data-testid={testid}
            data-alert={node.alert ? "true" : undefined}
            aria-label={node.accessibleLabel ?? node.label}
            aria-current={node.active ? "page" : containsActive(node) ? "true" : undefined}
            style={pad}
            className={groupClassName}
          >
            {inner}
          </Link>
        ) : (
          <div
            data-testid={testid}
            data-alert={node.alert ? "true" : undefined}
            aria-label={node.accessibleLabel ?? node.label}
            aria-current={containsActive(node) ? "true" : undefined}
            style={pad}
            className={groupClassName}
          >
            {inner}
          </div>
        )}
        <ul className={cn("mt-0.5 flex flex-col gap-0.5", compact && "flex-1")}>
          {(node.children ?? []).map((child) => (
            <RailRow key={child.key} node={child} depth={depth + 1} />
          ))}
        </ul>
      </li>
    );
  }

  if (hasChildren) {
    return (
      <li className={cn(compact && (hasChildren ? "flex flex-1 flex-col" : COMPACT_ROW))}>
        <Collapsible
          open={open}
          onOpenChange={setOpen}
          className={cn(compact && "flex flex-1 flex-col")}
        >
          {/* INC-089 — the tooltip wraps the TRIGGER, never sits between the
              trigger and its DOM element: `CollapsibleTrigger asChild` must
              receive a ref-holding child, and WithTooltip's collapsed branch
              renders a Tooltip Root (no ref) while its expanded branch used to
              render a Fragment (no ref). Either one left Radix's composed
              state-setting ref writing null on every render — the #185 loop,
              multiplied by every mapped row. */}
          <WithTooltip label={node.label}>
            <CollapsibleTrigger asChild>
              <button
                type="button"
                data-testid={strip ? "strip-submenu-trigger" : "rail-submenu-trigger"}
                aria-expanded={open}
                aria-label={node.accessibleLabel ?? node.label}
                style={pad}
                className={cn(
                  itemBase,
                  containsActive(node) ? ITEM_ACTIVE : ITEM_IDLE,
                  compactClass,
                  compact && COMPACT_HEAD,
                )}
              >
                {inner}
                {!compact ? (
                  <ChevronRight
                    aria-hidden="true"
                    className={cn(
                      "ms-auto h-4 w-4 shrink-0 transition-transform",
                      open && "rotate-90",
                      hide,
                    )}
                  />
                ) : null}
              </button>
            </CollapsibleTrigger>
          </WithTooltip>

          <CollapsibleContent asChild>
            <ul
              data-testid={strip ? "strip-submenu" : "rail-submenu"}
              className={cn("mt-0.5 flex flex-col gap-0.5", compact && "flex-1")}
            >
              {(node.children ?? []).map((child) => (
                <RailRow key={child.key} node={child} depth={depth + 1} />
              ))}
            </ul>
          </CollapsibleContent>
        </Collapsible>
      </li>
    );
  }

  if (node.path) {
    return (
      <li className={cn(compact && (hasChildren ? "flex flex-1 flex-col" : COMPACT_ROW))}>
        <WithTooltip label={node.label} skip={Boolean(node.submenu)}>
          <Link
            {...trigger}
            to={node.path}
            params={node.params}
            hash={node.hash}
            preload={node.preload}
            onClick={(event) => {
              trigger?.onClick(event);
              node.onSelect?.();
            }}
            data-testid={testid}
            data-alert={node.alert ? "true" : undefined}
            aria-current={node.ancestorActive ? "true" : node.active ? "page" : undefined}
            aria-label={node.accessibleLabel ?? node.label}
            style={pad}
            className={cn(
              itemBase,
              node.active || node.ancestorActive ? ITEM_ACTIVE : ITEM_IDLE,
              compactClass,
            )}
          >
            {inner}
            {node.categoryBranch ? (
              <ChevronRight
                aria-hidden="true"
                className={cn("ms-auto h-4 w-4 shrink-0 rtl:rotate-180", hide)}
              />
            ) : null}
          </Link>
        </WithTooltip>
      </li>
    );
  }

  if (node.onSelect) {
    return (
      <li className={cn(compact && (hasChildren ? "flex flex-1 flex-col" : COMPACT_ROW))}>
        <WithTooltip label={node.label}>
          <button
            type="button"
            onClick={node.onSelect}
            data-testid={testid}
            data-alert={node.alert ? "true" : undefined}
            aria-current={node.active ? "true" : undefined}
            aria-label={node.accessibleLabel ?? node.label}
            style={pad}
            className={cn(
              itemBase,
              node.active || node.ancestorActive ? ITEM_ACTIVE : ITEM_IDLE,
              compactClass,
            )}
          >
            {inner}
          </button>
        </WithTooltip>
      </li>
    );
  }

  // No path yet: the item's page is a later feature. U0f — it still carries its
  // testid, so every rail item is addressable regardless of how it renders.
  return (
    <li className={cn(compact && (hasChildren ? "flex flex-1 flex-col" : COMPACT_ROW))}>
      <WithTooltip label={node.label}>
        <span
          style={pad}
          data-testid={testid}
          data-alert={node.alert ? "true" : undefined}
          className={cn(itemBase, "text-muted-foreground", compactClass)}
          aria-disabled="true"
          aria-label={node.accessibleLabel ?? node.label}
        >
          {inner}
        </span>
      </WithTooltip>
    </li>
  );
}

/** The first panel opens beside the rail itself. */
const railEdge = (opener: HTMLElement): Element => opener.closest("aside") ?? opener;

/** Marketplace rail = the LIVE category tree, read from the database (exported for RFT, rail-first-paint.test.tsx). */
export function CategoryNav({ onNavigate }: { onNavigate: () => void }) {
  const variant = useContext(RailVariantContext);
  const strip = variant === "strip";
  const compact = variant === "strip" || variant === "menu";
  const hide = useHide();
  const { t, entities } = useI18n();
  const { tree, isLoading: treeLoading, error, firstRail } = useCategoryTree();
  // INC-974 (row 60) — the names draw at once (the server's first-rail seed or the read);
  // the glyph map arrives after the first paint and fills each row's fixed box.
  const glyphs = useCategoryGlyphs();
  const isLoading = treeLoading && firstRail !== true;
  const { selectedCategorySlug } = useShell();
  const favourite = useFavouriteCategory();
  const favouriteCategory = tree.nodes.find((category) => category.slug === favourite.slug);
  const collapsed = useContext(CollapsedContext);
  const selected = tree.nodes.find((category) => category.slug === selectedCategorySlug);
  const fromUrl = selected
    ? childrenOf(tree, selected.id).length > 0
      ? selected.id
      : (tree.parentOf.get(selected.id) ?? null)
    : null;
  // Each phone opening starts over the strip's main rows. After navigation the
  // same mounted menu follows the whole URL tree, including third-level leaves.
  const [localLevel, setLocalLevel] = useState<{
    slug: string | null;
    id: string | null | undefined;
  }>(() => ({ slug: selectedCategorySlug, id: variant === "menu" ? null : undefined }));
  if (localLevel.slug !== selectedCategorySlug) {
    setLocalLevel({ slug: selectedCategorySlug, id: undefined });
  }
  const iconsOnly = strip || (variant === "rail" && collapsed);
  const levelId =
    localLevel.slug === selectedCategorySlug && localLevel.id !== undefined
      ? localLevel.id
      : fromUrl;
  // DEC-288 — from 768 px the rail keeps the main rows; sub-items open in the side panel.
  const level = variant === "menu" && levelId ? tree.byId.get(levelId) : undefined;
  const panels = variant === "rail";
  const overlays = useOverlays();
  const parentId = level ? tree.parentOf.get(level.id) : undefined;
  const parent = parentId ? tree.byId.get(parentId) : undefined;
  const roots = rootsOf(tree);
  const ancestors = selected ? pathOf(tree, selected.id) : [];
  const toNode = (category: CategoryNode): RailNode => ({
    key: category.id,
    testid: `rail-category-${category.slug}`,
    label: entityName("category", category, entities),
    icon: category.icon
      ? (glyphs.glyphOf(category.icon) ?? undefined)
      : categoryIcon(category.slug),
    glyphPending: category.icon !== null && !glyphs.settled,
    active: category.slug === selectedCategorySlug,
    ancestorActive: !level && ancestors.some((ancestor) => ancestor.id === category.id),
    categoryBranch: !iconsOnly && childrenOf(tree, category.id).length > 0,
    submenu: panels && childrenOf(tree, category.id).length > 0 ? category.id : undefined,
    path: "/c/$slug",
    params: { slug: category.slug },
    preload: "intent",
    onSelect: () => {
      if (childrenOf(tree, category.id).length === 0) onNavigate();
      else if (!panels) setLocalLevel({ slug: selectedCategorySlug, id: category.id });
    },
  });
  const nodes = (level ? [level, ...childrenOf(tree, level.id)] : roots).map(toNode);
  // DEC-288 — a panel's rows come from the same seeded tree: no request of their own.
  const itemsOf = (id: string) => {
    const opened = tree.byId.get(id);
    if (!opened) return null;
    return {
      header: entityName("category", opened, entities),
      items: childrenOf(tree, id).map((category) => ({
        key: category.id,
        label: entityName("category", category, entities),
        testid: `rail-category-${category.slug}`,
        to: "/c/$slug",
        params: { slug: category.slug },
        active: category.slug === selectedCategorySlug,
        ancestorActive: ancestors.some((ancestor) => ancestor.id === category.id),
        hasChildren: childrenOf(tree, category.id).length > 0,
      })),
    };
  };

  return (
    <nav
      aria-label={t("shell.categoriesLabel")}
      className={cn(
        compact && "flex min-h-full flex-col",
        panels && "md:pointer-fine:flex md:pointer-fine:min-h-full md:pointer-fine:flex-col",
      )}
    >
      <ul
        className={cn("flex flex-col gap-0.5", compact && "flex-1", panels && RAIL_SPREAD)}
        data-rail-ready={!isLoading && nodes.length > 0 ? "1" : undefined}
      >
        {level ? (
          <li className={cn(compact && COMPACT_ROW)}>
            <Button
              variant="ghost"
              data-testid="rail-menu-back"
              onClick={() => setLocalLevel({ slug: selectedCategorySlug, id: parent?.id ?? null })}
              style={{ "--rail-pad": "0.75rem" } as React.CSSProperties}
              className={cn(
                ITEM_CORE,
                ITEM_IDLE,
                "justify-start",
                compact && "min-h-0 flex-1 gap-3 pe-2",
              )}
            >
              <span
                aria-hidden="true"
                className={cn("flex shrink-0 items-center justify-center", compact ? "w-6" : "w-5")}
              >
                <ChevronLeft aria-hidden="true" className="h-4 w-4 shrink-0 rtl:rotate-180" />
              </span>
              <CutText
                text={parent ? entityName("category", parent, entities) : t("shell.mainMenu")}
              />
            </Button>
          </li>
        ) : null}
        {!level && favouriteCategory ? (
          <>
            <RailRow
              node={{
                ...toNode(favouriteCategory),
                key: "favourite",
                testid: "rail-favourite",
                favourite: true,
                accessibleLabel: `${entityName("category", favouriteCategory, entities)} — ${t("shell.favouriteBadge")}`,
              }}
            />
            <li aria-hidden="true" className="shrink-0 border-b border-neutral-soft" />
          </>
        ) : null}
        {/* INC-050: while the tree is being read the rail shows placeholder
            rows at the real pointer-dependent row height, so the sidebar does not jump when
            the categories arrive. Cached reads skip this entirely. */}
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <li
                className={cn(compact && COMPACT_ROW)}
                key={`skeleton-${index}`}
                data-testid={strip ? "strip-category-skeleton" : "rail-category-skeleton"}
                aria-hidden="true"
              >
                <div
                  className={cn(
                    "flex min-h-11 md:pointer-fine:min-h-8 items-center gap-2 px-3",
                    compact && "min-h-0 flex-1",
                    strip ? "justify-center ps-0 pe-0" : compact && "justify-start gap-3 ps-3 pe-2",
                  )}
                >
                  <span
                    className={cn(
                      "shrink-0 animate-pulse rounded bg-muted",
                      compact ? "h-6 w-6" : "h-5 w-5",
                    )}
                  />
                  <span
                    className={cn(
                      "h-3 w-24 animate-pulse rounded bg-muted",
                      hide,
                      compact && "hidden",
                    )}
                  />
                </div>
              </li>
            ))
          : nodes.map((node, index) => (
              <RailRow key={node.key} node={node} depth={level && index > 0 ? 1 : 0} />
            ))}
        {!compact && !isLoading && roots.length === 0 ? (
          <li className={cn("px-3 text-sm text-muted-foreground", hide)}>
            {t("shell.categoriesEmpty")}
          </li>
        ) : null}
      </ul>
      {panels && overlays ? (
        <overlays.submenu.SubmenuLayer itemsOf={itemsOf} edgeOf={railEdge} showHeader={collapsed} />
      ) : null}
      {error ? (
        <p role="alert" className="px-3 text-sm text-destructive">
          {t("common.error")}
        </p>
      ) : null}
    </nav>
  );
}

/** Non-Marketplace rails: config items, sectioned and/or nested. */
function MenuNav({ onNavigate }: { onNavigate: () => void }) {
  const variant = useContext(RailVariantContext);
  const strip = variant === "strip";
  const compact = variant === "strip" || variant === "menu";
  const hide = useHide();
  const { t } = useI18n();
  const { auth, activePanel } = useShell();
  const alerts = useNavAlerts(activePanel === "admin", auth.permissions);
  const items = visibleItems(PANELS[activePanel].items, auth).filter(
    (item) => !compact || item.id !== "post-entry",
  );
  // Active state for routed items — the current section is highlighted the
  // same way for every panel (U0b).
  // INC-581 — the rail marks the page the body shows.
  const pathname = useShownPathname();
  const hash = useRouterState({ select: (s) => s.location.hash }).replace(/^#/, "");

  /**
   * U6-C1-R3a — ONE HIGHLIGHT. "Sign-in and security" and "Settings" both live
   * at /settings, and the old rule (path prefix) lit both at once. An item that
   * names a section carries its `hash`, and a routed item is current only when
   * the path AND the hash match exactly — so exactly one item is ever current.
   */
  const isCurrent = (item: NavItem): boolean => {
    if (item.path === undefined) return false;
    const anchored = PANELS[activePanel].items.some(
      (other) => other.path === item.path && other.hash !== undefined,
    );
    if (anchored) return pathname === item.path && hash === (item.hash ?? "");
    return pathname === item.path || pathname.startsWith(`${item.path}/`);
  };

  const toNode = (item: NavItem): RailNode => ({
    key: item.id,
    testid: item.testid ?? `rail-item-${item.id}`,
    label: t(item.labelKey),
    ...(item.alert && alerts.has(item.alert)
      ? {
          alert: true,
          accessibleLabel: `${t(item.labelKey)} — ${t(NAV_ALERT_LABELS[item.alert])}`,
        }
      : {}),
    icon: item.icon,
    path: item.path,
    hash: item.hash,
    active: item.path ? isCurrent(item) : undefined,
    onSelect: item.path ? onNavigate : undefined,
    children: item.children?.map(toNode),
    defaultOpen: item.defaultOpen,
    group: item.group,
  });

  const sections: { key: MessageKey | null; items: NavItem[] }[] = [];
  for (const item of items) {
    const key = item.section ?? null;
    const last = sections[sections.length - 1];
    if (last && last.key === key) last.items.push(item);
    else sections.push({ key, items: [item] });
  }

  return (
    <nav
      aria-label={t("shell.mainNav")}
      // INC-755 — the phone rail fills when its rows fit and scrolls when they
      // do not: a container allowed to shrink (min-h-0) under rows with a 32 px
      // floor let the rows spill over the next group (the Admin panel, the
      // operator's iPhone, 2026-10-19).
      className={cn("flex flex-col gap-3", compact && "min-h-full gap-0.5")}
    >
      {sections.map((section, index) => (
        <div
          key={section.key ?? `section-${index}`}
          className={cn(compact && "flex flex-1 flex-col")}
        >
          {section.key && !compact ? (
            <h2
              className={cn(
                "px-3 pb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground",
                hide,
              )}
            >
              {t(section.key)}
            </h2>
          ) : null}
          <ul className={cn("flex flex-col gap-0.5", compact && "flex-1")}>
            {section.items.map((item) => (
              <RailRow key={item.id} node={toNode(item)} />
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}

function RailBody({ onNavigate }: { onNavigate: () => void }) {
  const { activePanel } = useShell();
  return activePanel === "marketplace" ? (
    <CategoryNav onNavigate={onNavigate} />
  ) : (
    <MenuNav onNavigate={onNavigate} />
  );
}

/**
 * The rail's foot, pinned above the footer line.
 *
 * Sign out here is ADDITIONAL — the account-menu item in the top bar still
 * works and stays the canonical path. Both call the same signOut().
 * The collapse toggle USED to live here; it moved to the top bar (INC-040) so
 * it is reachable without scrolling a long rail.
 */
function RailFoot({ onNavigate }: { onNavigate: () => void }) {
  const strip = useContext(RailVariantContext) === "strip";
  const { t } = useI18n();
  const { auth, requestSignOut } = useShell();
  const pad = { "--rail-pad": "0.75rem" } as React.CSSProperties;

  // Nothing but sign-out lives here now, so a logged-out rail has NO foot at
  // all — no stray hairline under the categories.
  if (!auth.isAuthenticated) return null;

  return (
    <div className="mt-auto flex flex-col gap-0.5 border-t border-border pt-2">
      <WithTooltip label={t("auth.signOut")}>
        <button
          type="button"
          data-testid={strip ? "strip-sign-out" : "rail-sign-out"}
          aria-label={t("auth.signOut")}
          style={pad}
          onClick={() => {
            onNavigate();
            requestSignOut();
          }}
          className={cn(ITEM_BASE, ITEM_IDLE, strip && "h-full min-h-0 justify-center ps-0 pe-0")}
        >
          <LogOut className="h-5 w-5 shrink-0" aria-hidden="true" />
          <CutText
            className={cn(HIDE_WHEN_COLLAPSED, strip && "sr-only")}
            text={t("auth.signOut")}
          />
        </button>
      </WithTooltip>
    </div>
  );
}

/**
 * The rail. From md up it is grid column 1 / row 2 — directly beneath the logo
 * cell. One ☰ opens the phone menu below 768 and folds the rail from 768.
 */
export function AppRail() {
  const { t } = useI18n();
  const { navOpen, setNavOpen, user, auth, authLoading, activePanel } = useShell();
  const { collapsed } = useRailCollapsed();
  const footerInset = useFooterInset();
  const pathname = useShownPathname();
  const [peeking, setPeeking] = useState(false);
  /** INC-924 — the peek's menu has been drawn (its code arrived): its 3-second clock starts here. */
  const [peekDrawn, setPeekDrawn] = useState(false);
  const peekAttempted = useRef(false);
  const peekFocus = useRef(false);

  // D216 (the operator, 2026-10-18) changes D206's once a visit: on every
  // page load, a reload included; never on an in-app navigation. Tests opt in
  // only with the force word; production never reads or writes storage.
  useEffect(() => {
    if (
      authLoading ||
      peekAttempted.current ||
      window.innerWidth >= 768 ||
      activePanel !== "marketplace" ||
      // D234 S6 — the listings pages, read as everywhere else (feedRouteOf).
      feedRouteOf(pathname) === null
    )
      return;
    peekAttempted.current = true;
    // INC-924 (Foundations turn 34w) — a menu the person opened before the sign-in check ended is
    // theirs: the peek never takes it over (it used to, and closed it three seconds later).
    if (navOpen) return;
    if (isE2E) {
      try {
        if (sessionStorage.getItem("ethio.peek") !== "force") return;
      } catch {
        return; // A denied test opt-in means no peek.
      }
    }
    peekFocus.current = true;
    setPeeking(true);
    setNavOpen(true);
  }, [authLoading, activePanel, pathname, navOpen, setNavOpen]);

  // A person's tap, scroll or key ends the peek at once, drawn or not.
  useEffect(() => {
    if (!peeking || !navOpen) return;
    const outside = (event: Event) => {
      if (event.target instanceof Element && event.target.closest('[data-testid="rail-menu"]'))
        return;
      setNavOpen(false);
      setPeeking(false);
    };
    document.addEventListener("pointerdown", outside, true);
    document.addEventListener("scroll", outside, true);
    document.addEventListener("keydown", outside, true);
    return () => {
      document.removeEventListener("pointerdown", outside, true);
      document.removeEventListener("scroll", outside, true);
      document.removeEventListener("keydown", outside, true);
    };
  }, [peeking, navOpen, setNavOpen]);

  // INC-924 (Foundations turn 34w) — the peek shows for three seconds FROM WHEN IT IS DRAWN: on a
  // slow connection its code arrives late, and a clock started at the opening closed it before it
  // was ever seen (or a moment after).
  useEffect(() => {
    if (!peeking || !navOpen || !peekDrawn) return;
    const timer = window.setTimeout(() => {
      setNavOpen(false);
      setPeeking(false);
    }, 3000);
    return () => window.clearTimeout(timer);
  }, [peeking, navOpen, peekDrawn, setNavOpen]);

  useEffect(() => {
    if (!peeking) setPeekDrawn(false);
  }, [peeking]);

  const changeMenu = (open: boolean) => {
    peekFocus.current = false;
    setPeeking(false);
    setNavOpen(open);
  };

  return (
    <TooltipProvider delayDuration={150}>
      <CollapsedContext.Provider value={collapsed === true}>
        <aside
          data-testid="app-rail"
          // U0g-2 — FIXED, never sticky: the rail must not move at any scroll
          // offset. U0i — its BOTTOM is no longer the viewport bottom: it is
          // `--rail-bottom-inset`, how far the footer has scrolled into view,
          // so the rail's box always ENDS at the footer's top edge. With the
          // fixed calc() height dropped (top-14 + bottom inset size it), the
          // inner rail-scroll region keeps its scrollbar and every item stays
          // reachable instead of hiding under the footer.
          style={{ "--rail-bottom-inset": `${footerInset}px` } as React.CSSProperties}
          className="hidden min-h-0 min-w-0 flex-col bg-sidebar shadow-side p-2 md:fixed md:start-0 md:top-14 md:bottom-[var(--rail-bottom-inset,0px)] md:z-20 md:flex md:h-auto md:w-56 lg:w-64 md:overflow-hidden rail-icons:w-16 rail-icons:px-1"
        >
          {/* U0d: the panel identity band sits directly BELOW the logo cell
              (grid row 2 starts here), identical to the drawer. Hidden on the
              collapsed rail, where there is no room for a name. */}
          <PanelHeader className={cn("mb-2", HIDE_WHEN_COLLAPSED)} />
          {/* U0f: ONLY the item region scrolls. The logo cell (grid row 1) and
              the panel band above stay fixed; RailFoot below stays pinned. */}
          <div
            data-testid="rail-scroll"
            className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain [-webkit-overflow-scrolling:touch]"
          >
            <RailBody onNavigate={() => undefined} />
          </div>
          <RailFoot onNavigate={() => undefined} />
        </aside>
      </CollapsedContext.Provider>

      <RailVariantContext.Provider value="strip">
        <div
          data-testid="rail-strip"
          aria-hidden="true"
          onClick={() => changeMenu(true)}
          style={{ "--rail-bottom-inset": `${footerInset}px` } as React.CSSProperties}
          className="fixed start-0 top-13 bottom-[var(--bottom-bar)] z-[38] flex w-12 flex-col bg-sidebar shadow-side md:hidden"
        >
          <div
            data-testid="strip-scroll"
            className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain scrollbar-none"
          >
            <RailBody onNavigate={() => undefined} />
          </div>
          {user !== null && auth.isAuthenticated ? <div className="min-h-11 shrink-0" /> : null}
        </div>
      </RailVariantContext.Provider>

      <DialogPrimitive.Root open={navOpen} onOpenChange={changeMenu} modal={false}>
        {navOpen ? (
          <div
            data-testid="rail-menu-scrim"
            aria-hidden="true"
            className="fixed inset-x-0 top-13 bottom-[var(--bottom-bar)] z-[35] bg-foreground/40 md:hidden"
            onClick={() => setNavOpen(false)}
          />
        ) : null}
        <DialogPrimitive.Content
          id="rail-menu"
          data-testid="rail-menu"
          data-panel={activePanel}
          aria-label={t("shell.menuTitle")}
          aria-describedby={undefined}
          className="fixed start-0 top-13 bottom-[var(--bottom-bar)] z-40 flex w-64 flex-col rounded-e-[1rem] bg-sidebar shadow-lg md:hidden data-[state=open]:animate-in data-[state=open]:slide-in-from-left data-[state=open]:duration-200 data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left data-[state=closed]:duration-[250ms] data-[state=closed]:z-[37] motion-reduce:animate-none"
          onPointerDownCapture={() => {
            if (peeking) {
              peekFocus.current = false;
              setPeeking(false);
            }
          }}
          onPointerDownOutside={(event) => {
            if ((event.target as Element | null)?.closest('[aria-controls="rail-menu"]')) {
              event.preventDefault();
            }
          }}
          onInteractOutside={(event) => {
            if ((event.target as Element | null)?.closest('[aria-controls="rail-menu"]')) {
              event.preventDefault();
            }
          }}
          onOpenAutoFocus={(event) => {
            event.preventDefault();
            if (peeking) {
              setPeekDrawn(true);
              return;
            }
            peekFocus.current = false;
            document
              .getElementById("rail-menu")
              ?.querySelector<HTMLElement>(
                "[data-testid='rail-scroll'] a, [data-testid='rail-scroll'] button",
              )
              ?.focus();
          }}
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            if (!peekFocus.current)
              document.querySelector<HTMLElement>('[aria-controls="rail-menu"]')?.focus();
          }}
        >
          {/* D238 (the operator, 2026-10-26) — no × here: ☰ (top-left, aria-expanded) and a tap
              outside close the menu, and Escape does; a fixed × rode the slide-in and jumped. */}
          <DialogPrimitive.Title className="sr-only">{t("shell.menuTitle")}</DialogPrimitive.Title>
          {/* The opened menu belongs to phones only and keeps its identity foot. */}
          <RailVariantContext.Provider value="menu">
            <div className="min-h-0 flex-1">
              <div
                data-testid="rail-scroll"
                className="h-full min-h-0 overflow-y-auto overflow-x-hidden overscroll-contain scrollbar-none"
              >
                <RailBody onNavigate={() => setNavOpen(false)} />
              </div>
            </div>
          </RailVariantContext.Provider>
          {user !== null && auth.isAuthenticated ? (
            <div className="flex min-h-11 shrink-0 items-center border-t border-neutral-soft px-3">
              <p data-testid="drawer-identity" className="text-sm text-muted-foreground">
                <CutText text={user.displayName ?? t("auth.signedInAs")} />
              </p>
            </div>
          ) : null}
        </DialogPrimitive.Content>
      </DialogPrimitive.Root>
    </TooltipProvider>
  );
}

export default AppRail;
