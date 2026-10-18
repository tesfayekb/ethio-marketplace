import { CutText } from "@/components/ui/cut-text";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, House, LogOut, Star, X, type LucideIcon } from "lucide-react";
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
import { categoryGlyphOrNull } from "@/components/shell/category-glyphs";
import { PanelHeader } from "@/components/shell/panel-header";
import { useShownPathname } from "@/components/shell/use-shown-pathname";
import { useFooterInset } from "@/components/shell/use-footer-inset";

import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { PANELS, categoryIcon, visibleItems } from "@/config/panels";
import type { NavItem } from "@/config/panels.types";
import {
  childrenOf,
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

/** FIX-SCAN-1 ISSUE 4 — the glyph map now lives in category-glyphs.ts, the one
 *  allowlist the server suggester validates against; re-exported here so the
 *  console's existing imports keep working. */
export { categoryGlyph } from "@/components/shell/category-glyphs";

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

const ITEM_CORE =
  "flex min-h-11 md:pointer-fine:min-h-8 w-full items-center gap-2 rounded-md pe-3 text-start text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring " +
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
const RailVariantContext = createContext<"rail" | "strip" | "menu">("rail");

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
function WithTooltip({ label, children }: { label: string; children: ReactNode }) {
  const collapsed = useContext(CollapsedContext);
  if (!collapsed) return children as React.ReactElement;
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
  preload?: "intent";
  onSelect?: () => void;
  children?: RailNode[];
  /** C3-UX-2 — a group that renders expanded on its first frame. */
  defaultOpen?: boolean;
  /** A visual cluster with always-present sub-items; its header may own a page. */
  group?: boolean;
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
  const compactClass =
    compact &&
    cn(
      "h-full min-h-0",
      strip ? "justify-center ps-0 pe-0" : "justify-start gap-3 ps-[var(--rail-pad)] pe-2",
    );
  const hasChildren = (node.children?.length ?? 0) > 0;
  // An active descendant keeps its ancestor open.
  const containsActive = (n: RailNode): boolean =>
    Boolean(n.active) || (n.children ?? []).some(containsActive);
  const [open, setOpen] = useState(
    () => hasChildren && (containsActive(node) || Boolean(node.defaultOpen)),
  );

  const Icon = node.icon;
  const inner = (
    <>
      {Icon ? (
        node.favourite ? (
          <span className={cn("relative shrink-0", compact ? "h-6 w-6" : "h-5 w-5")}>
            <Icon className="h-full w-full" aria-hidden="true" />
            <Star
              className="absolute -end-1 -top-1 h-3 w-3 fill-gold text-gold"
              aria-hidden="true"
            />
          </span>
        ) : (
          <Icon className={cn("shrink-0", compact ? "h-6 w-6" : "h-5 w-5")} aria-hidden="true" />
        )
      ) : null}
      <CutText className={cn(hide, strip && "sr-only")} text={node.label} />
    </>
  );
  const pad = { "--rail-pad": `${0.75 + depth * 1}rem` } as React.CSSProperties;

  // D205 — painted strip rows are not navigation controls; the strip opens the menu.
  if (strip) {
    return (
      <li className={cn(hasChildren ? "flex min-h-0 flex-1 flex-col" : "min-h-8 max-h-10 flex-1")}>
        <span
          data-testid={testid}
          aria-label={node.accessibleLabel ?? node.label}
          aria-current={node.ancestorActive ? "true" : node.active ? "page" : undefined}
          style={pad}
          className={cn(
            itemBase,
            node.active || node.ancestorActive ? ITEM_ACTIVE : ITEM_IDLE,
            compactClass,
            hasChildren && "h-8 min-h-8 max-h-10 flex-1",
          )}
        >
          {inner}
        </span>
        {hasChildren ? (
          <ul className="mt-0.5 flex min-h-0 flex-1 flex-col gap-0.5">
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
      compact && "h-8 min-h-8 max-h-10 flex-1",
    );
    return (
      <li
        className={cn(
          compact && (hasChildren ? "flex min-h-0 flex-1 flex-col" : "min-h-8 max-h-10 flex-1"),
        )}
      >
        {node.path ? (
          <Link
            to={node.path}
            onClick={node.onSelect}
            data-testid={testid}
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
            aria-label={node.accessibleLabel ?? node.label}
            aria-current={containsActive(node) ? "true" : undefined}
            style={pad}
            className={groupClassName}
          >
            {inner}
          </div>
        )}
        <ul className={cn("mt-0.5 flex flex-col gap-0.5", compact && "min-h-0 flex-1")}>
          {(node.children ?? []).map((child) => (
            <RailRow key={child.key} node={child} depth={depth + 1} />
          ))}
        </ul>
      </li>
    );
  }

  if (hasChildren) {
    return (
      <li
        className={cn(
          compact && (hasChildren ? "flex min-h-0 flex-1 flex-col" : "min-h-8 max-h-10 flex-1"),
        )}
      >
        <Collapsible
          open={open}
          onOpenChange={setOpen}
          className={cn(compact && "flex min-h-0 flex-1 flex-col")}
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
                  compact && "h-8 min-h-8 max-h-10 flex-1",
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
              className={cn("mt-0.5 flex flex-col gap-0.5", compact && "min-h-0 flex-1")}
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
      <li
        className={cn(
          compact && (hasChildren ? "flex min-h-0 flex-1 flex-col" : "min-h-8 max-h-10 flex-1"),
        )}
      >
        <WithTooltip label={node.label}>
          <Link
            to={node.path}
            params={node.params}
            hash={node.hash}
            preload={node.preload}
            onClick={node.onSelect}
            data-testid={testid}
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
      <li
        className={cn(
          compact && (hasChildren ? "flex min-h-0 flex-1 flex-col" : "min-h-8 max-h-10 flex-1"),
        )}
      >
        <WithTooltip label={node.label}>
          <button
            type="button"
            onClick={node.onSelect}
            data-testid={testid}
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
    <li
      className={cn(
        compact && (hasChildren ? "flex min-h-0 flex-1 flex-col" : "min-h-8 max-h-10 flex-1"),
      )}
    >
      <WithTooltip label={node.label}>
        <span
          style={pad}
          data-testid={testid}
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

/** Marketplace rail = the LIVE category tree, read from the database. */
function CategoryNav({ onNavigate }: { onNavigate: () => void }) {
  const variant = useContext(RailVariantContext);
  const strip = variant === "strip";
  const compact = variant === "strip" || variant === "menu";
  const hide = useHide();
  const { t, entities } = useI18n();
  const { tree, isLoading, error } = useCategoryTree();
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
  const level = !iconsOnly && levelId ? tree.byId.get(levelId) : undefined;
  const parentId = level ? tree.parentOf.get(level.id) : undefined;
  const parent = parentId ? tree.byId.get(parentId) : undefined;
  const roots = rootsOf(tree);
  const ancestors = selected ? pathOf(tree, selected.id) : [];
  const toNode = (category: CategoryNode): RailNode => ({
    key: category.id,
    testid: `rail-category-${category.slug}`,
    label: entityName("category", category, entities),
    icon: category.icon
      ? (categoryGlyphOrNull(category.icon) ?? undefined)
      : categoryIcon(category.slug),
    active: category.slug === selectedCategorySlug,
    ancestorActive: !level && ancestors.some((ancestor) => ancestor.id === category.id),
    categoryBranch: !iconsOnly && childrenOf(tree, category.id).length > 0,
    path: "/c/$slug",
    params: { slug: category.slug },
    preload: "intent",
    onSelect: () => {
      if (childrenOf(tree, category.id).length === 0) onNavigate();
      else setLocalLevel({ slug: selectedCategorySlug, id: category.id });
    },
  });
  const nodes = (level ? [level, ...childrenOf(tree, level.id)] : roots).map(toNode);

  return (
    <nav aria-label={t("shell.categoriesLabel")} className={cn(compact && "flex h-full flex-col")}>
      <ul className={cn("flex flex-col gap-0.5", compact && "h-full")}>
        {level ? (
          <li className={cn(compact && "min-h-8 max-h-10 flex-1")}>
            <Button
              variant="ghost"
              data-testid="rail-menu-back"
              onClick={() => setLocalLevel({ slug: selectedCategorySlug, id: parent?.id ?? null })}
              className={cn(
                ITEM_CORE,
                ITEM_IDLE,
                compact && "h-full min-h-0 justify-start gap-3 pe-2",
              )}
            >
              <ChevronLeft aria-hidden="true" className="h-4 w-4 shrink-0 rtl:rotate-180" />
              <CutText
                text={parent ? entityName("category", parent, entities) : t("shell.mainMenu")}
              />
            </Button>
          </li>
        ) : !compact ? (
          <RailRow
            node={{
              key: "all",
              testid: "rail-category-all",
              label: t("nav.home"),
              icon: House,
              active: selectedCategorySlug === null,
              path: "/",
              onSelect: onNavigate,
            }}
          />
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
                key={`skeleton-${index}`}
                data-testid={strip ? "strip-category-skeleton" : "rail-category-skeleton"}
                aria-hidden="true"
              >
                <div
                  className={cn(
                    "flex min-h-11 md:pointer-fine:min-h-8 items-center gap-2 px-3",
                    compact && "h-full min-h-0",
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
      className={cn("flex flex-col gap-3", compact && "h-full min-h-0 gap-0.5")}
    >
      {sections.map((section, index) => (
        <div
          key={section.key ?? `section-${index}`}
          className={cn(compact && "flex min-h-0 flex-1 flex-col")}
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
          <ul className={cn("flex flex-col gap-0.5", compact && "h-full min-h-0 flex-1")}>
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
  const peekAttempted = useRef(false);
  const peekFocus = useRef(false);

  // D206: one fixed session word; denied storage deliberately disables the peek.
  useEffect(() => {
    if (
      authLoading ||
      peekAttempted.current ||
      window.innerWidth >= 768 ||
      activePanel !== "marketplace" ||
      !(pathname === "/" || pathname.startsWith("/c/"))
    )
      return;
    peekAttempted.current = true;
    try {
      const word = sessionStorage.getItem("ethio.peek");
      if (word === "seen" || (isE2E && word !== "force")) return;
      sessionStorage.setItem("ethio.peek", "seen");
    } catch {
      return; // Blocked storage means no peek, not a repeat on every page.
    }
    peekFocus.current = true;
    setPeeking(true);
    setNavOpen(true);
  }, [authLoading, activePanel, pathname, setNavOpen]);

  useEffect(() => {
    if (!navOpen) return;
    try {
      sessionStorage.setItem("ethio.peek", "seen");
    } catch {
      // The person's menu still works when session storage is unavailable.
    }
  }, [navOpen]);

  useEffect(() => {
    if (!peeking || !navOpen) return;
    const end = () => {
      setNavOpen(false);
      setPeeking(false);
    };
    const outside = (event: Event) => {
      if (event.target instanceof Element && event.target.closest('[data-testid="rail-menu"]'))
        return;
      end();
    };
    const timer = window.setTimeout(end, 3000);
    document.addEventListener("pointerdown", outside, true);
    document.addEventListener("scroll", outside, true);
    document.addEventListener("keydown", outside, true);
    return () => {
      window.clearTimeout(timer);
      document.removeEventListener("pointerdown", outside, true);
      document.removeEventListener("scroll", outside, true);
      document.removeEventListener("keydown", outside, true);
    };
  }, [peeking, navOpen, setNavOpen]);

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
            if (peeking) return;
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
          <Button
            variant="ghost"
            size="touch"
            data-testid="rail-menu-close"
            aria-label={t("common.close")}
            onClick={() => setNavOpen(false)}
            className="fixed start-[calc(16rem-2.75rem)] top-1 z-50 w-11 p-0 md:hidden [&_svg]:size-5"
          >
            <X aria-hidden="true" />
          </Button>
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
