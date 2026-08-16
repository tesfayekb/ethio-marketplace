import { Link, useRouterState } from "@tanstack/react-router";
import { ChevronRight, LogOut, Tag } from "lucide-react";
import { createContext, useContext, useState, type ReactNode } from "react";

import { useShell } from "@/components/app-shell";
import { Logo } from "@/components/brand/logo";
import { PanelHeader } from "@/components/shell/panel-header";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { PANELS, categoryIcon, visibleItems } from "@/config/panels";
import type { NavItem } from "@/config/panels.types";
import { useCategories } from "@/features/feed/use-feed";
import { useI18n } from "@/i18n";
import type { MessageKey } from "@/i18n";
import { cn } from "@/lib/utils";
import { useRailCollapsed } from "@/providers/rail-state";

/**
 * COLLAPSE — an OPTION on md+, never the default and never on mobile.
 *
 * Layout keys off `html[data-rail="collapsed"]`, which the pre-paint script in
 * AppShell has already written, so the collapsed rail is correct on the FIRST
 * painted frame (no flash). React state only drives behaviour that cannot be
 * expressed in CSS — the toggle's aria-pressed and whether hovering a row
 * shows its label as a tooltip.
 *
 * Every `md:[html[data-rail=collapsed]_&]:` below is therefore desktop-only by
 * construction: the mobile drawer keeps full labels at all times.
 */
const HIDE_WHEN_COLLAPSED = "md:[html[data-rail=collapsed]_&]:hidden";

const ITEM_BASE =
  "flex min-h-11 w-full items-center gap-2 rounded-md pe-3 text-start text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring " +
  "ps-[var(--rail-pad)] md:[html[data-rail=collapsed]_&]:justify-center md:[html[data-rail=collapsed]_&]:ps-0 md:[html[data-rail=collapsed]_&]:pe-0";
/** Hover stays on the SIDEBAR token family — bg-muted is a content-surface
 *  token and read as a foreign grey against bg-sidebar (INC-042). */
const ITEM_IDLE = "text-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground";
/** Selection is GREEN, never a cream tint — the one emphasis surface. */
const ITEM_ACTIVE = "bg-sidebar-accent font-medium text-sidebar-accent-foreground";

/** True only after hydration on a collapsed desktop rail. */
const CollapsedContext = createContext(false);

/** Hover label for the icons-only rail. Expanded rails need no tooltip. */
function WithTooltip({ label, children }: { label: string; children: ReactNode }) {
  const collapsed = useContext(CollapsedContext);
  if (!collapsed) return <>{children}</>;
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
  icon?: NavItem["icon"];
  path?: string;
  active?: boolean;
  onSelect?: () => void;
  children?: RailNode[];
};

/**
 * ONE recursive renderer for every rail node, at any depth. A node with
 * children becomes an expand/collapse submenu (ui/collapsible — the primitive
 * already in the kit, not a re-implementation); a node without children is a
 * leaf row. Depth adds start-padding only, so the 44px tap target and the
 * 360px fit hold all the way down.
 */
function RailRow({ node, depth = 0 }: { node: RailNode; depth?: number }) {
  const hasChildren = (node.children?.length ?? 0) > 0;
  // An active descendant keeps its ancestor open.
  const containsActive = (n: RailNode): boolean =>
    Boolean(n.active) || (n.children ?? []).some(containsActive);
  const [open, setOpen] = useState(() => hasChildren && containsActive(node));

  const Icon = node.icon;
  const inner = (
    <>
      {Icon ? <Icon className="h-4 w-4 shrink-0" aria-hidden="true" /> : null}
      <span className={cn("truncate", HIDE_WHEN_COLLAPSED)}>{node.label}</span>
    </>
  );
  const pad = { "--rail-pad": `${0.75 + depth * 0.75}rem` } as React.CSSProperties;

  if (hasChildren) {
    return (
      <li>
        <Collapsible open={open} onOpenChange={setOpen}>
          <CollapsibleTrigger asChild>
            <WithTooltip label={node.label}>
              <button
                type="button"
                data-testid="rail-submenu-trigger"
                aria-expanded={open}
                aria-label={node.label}
                style={pad}
                className={cn(ITEM_BASE, containsActive(node) ? ITEM_ACTIVE : ITEM_IDLE)}
              >
                {inner}
                <ChevronRight
                  aria-hidden="true"
                  className={cn(
                    "ms-auto h-4 w-4 shrink-0 transition-transform",
                    open && "rotate-90",
                    HIDE_WHEN_COLLAPSED,
                  )}
                />
              </button>
            </WithTooltip>
          </CollapsibleTrigger>
          <CollapsibleContent asChild>
            <ul data-testid="rail-submenu" className="mt-0.5 flex flex-col gap-0.5">
              {node.children!.map((child) => (
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
      <li>
        <WithTooltip label={node.label}>
          <Link
            to={node.path}
            onClick={node.onSelect}
            data-testid={node.testid}
            aria-label={node.label}
            style={pad}
            className={cn(ITEM_BASE, node.active ? ITEM_ACTIVE : ITEM_IDLE)}
          >
            {inner}
          </Link>
        </WithTooltip>
      </li>
    );
  }

  if (node.onSelect) {
    return (
      <li>
        <WithTooltip label={node.label}>
          <button
            type="button"
            onClick={node.onSelect}
            data-testid={node.testid}
            aria-current={node.active ? "true" : undefined}
            aria-label={node.label}
            style={pad}
            className={cn(ITEM_BASE, node.active ? ITEM_ACTIVE : ITEM_IDLE)}
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
    <li>
      <WithTooltip label={node.label}>
        <span
          style={pad}
          data-testid={node.testid}
          className={cn(ITEM_BASE, "text-muted-foreground")}
          aria-disabled="true"
          aria-label={node.label}
        >
          {inner}
        </span>
      </WithTooltip>
    </li>
  );
}

/** Marketplace rail = the LIVE category tree, read from the database. */
function CategoryNav({ onNavigate }: { onNavigate: () => void }) {
  const { t, language } = useI18n();
  const { categories, isLoading } = useCategories();
  const { selectedCategoryId, setSelectedCategoryId } = useShell();

  const nodes: RailNode[] = categories.map((category) => ({
    key: category.id,
    label: language === "am" ? (category.nameAm ?? category.nameEn) : category.nameEn,
    // Categories are DATA, not config, so their glyph comes from the slug map
    // in src/config/panels.ts — DISTINCT per category, so the collapsed rail is
    // readable without hovering (INC-039). Unmapped slugs fall back to Tag.
    icon: categoryIcon(category.slug),
    active: category.id === selectedCategoryId,
    onSelect: () => {
      setSelectedCategoryId(category.id);
      onNavigate();
    },
    // Subcategories dive in place through the same RailRow recursion the admin
    // tree uses. useCategories currently returns top-level nodes only, so this
    // is empty until the category-children read lands with its own feature.
    children: [],
  }));

  return (
    <nav aria-label={t("shell.categoriesLabel")}>
      <h2
        className={cn(
          "px-3 pb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground",
          HIDE_WHEN_COLLAPSED,
        )}
      >
        {t("shell.categoriesLabel")}
      </h2>
      <ul className="flex flex-col gap-0.5">
        <RailRow
          node={{
            key: "all",
            label: t("shell.allCategories"),
            icon: Tag,
            active: selectedCategoryId === null,
            onSelect: () => {
              setSelectedCategoryId(null);
              onNavigate();
            },
          }}
        />
        {/* INC-050: while the tree is being read the rail shows placeholder
            rows at the real 44px row height, so the sidebar does not jump when
            the categories arrive. Cached reads skip this entirely. */}
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => (
              <li key={`skeleton-${index}`} data-testid="rail-category-skeleton" aria-hidden="true">
                <div className="flex min-h-11 items-center gap-2 px-3">
                  <span className="h-4 w-4 shrink-0 animate-pulse rounded bg-muted" />
                  <span
                    className={cn("h-3 w-24 animate-pulse rounded bg-muted", HIDE_WHEN_COLLAPSED)}
                  />
                </div>
              </li>
            ))
          : nodes.map((node) => <RailRow key={node.key} node={node} />)}
        {!isLoading && categories.length === 0 ? (
          <li className={cn("px-3 text-sm text-muted-foreground", HIDE_WHEN_COLLAPSED)}>
            {t("shell.categoriesEmpty")}
          </li>
        ) : null}
      </ul>
    </nav>
  );
}

/** Non-Marketplace rails: config items, sectioned and/or nested. */
function MenuNav({ onNavigate }: { onNavigate: () => void }) {
  const { t } = useI18n();
  const { auth, activePanel } = useShell();
  const items = visibleItems(PANELS[activePanel].items, auth);
  // Active state for routed items — the current section is highlighted the
  // same way for every panel (U0b).
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const toNode = (item: NavItem): RailNode => ({
    key: item.id,
    testid: `rail-item-${item.id}`,
    label: t(item.labelKey),
    icon: item.icon,
    path: item.path,
    active: item.path ? pathname === item.path || pathname.startsWith(`${item.path}/`) : undefined,
    onSelect: item.path ? onNavigate : undefined,
    children: item.children?.map(toNode),
  });

  const sections: { key: MessageKey | null; items: NavItem[] }[] = [];
  for (const item of items) {
    const key = item.section ?? null;
    const last = sections[sections.length - 1];
    if (last && last.key === key) last.items.push(item);
    else sections.push({ key, items: [item] });
  }

  return (
    <nav aria-label={t("shell.mainNav")} className="flex flex-col gap-3">
      {sections.map((section, index) => (
        <div key={section.key ?? `section-${index}`}>
          {section.key ? (
            <h2
              className={cn(
                "px-3 pb-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground",
                HIDE_WHEN_COLLAPSED,
              )}
            >
              {t(section.key)}
            </h2>
          ) : null}
          <ul className="flex flex-col gap-0.5">
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
  const { t } = useI18n();
  const { auth, signOut } = useShell();
  const pad = { "--rail-pad": "0.75rem" } as React.CSSProperties;

  // Nothing but sign-out lives here now, so a logged-out rail has NO foot at
  // all — no stray hairline under the categories.
  if (!auth.isAuthenticated) return null;

  return (
    <div className="mt-auto flex flex-col gap-0.5 border-t border-border pt-2">
      <WithTooltip label={t("auth.signOut")}>
        <button
          type="button"
          data-testid="rail-sign-out"
          aria-label={t("auth.signOut")}
          style={pad}
          onClick={() => {
            onNavigate();
            void signOut();
          }}
          className={cn(ITEM_BASE, ITEM_IDLE)}
        >
          <LogOut className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span className={cn("truncate", HIDE_WHEN_COLLAPSED)}>{t("auth.signOut")}</span>
        </button>
      </WithTooltip>
    </div>
  );
}

/**
 * The rail. From md up it is grid column 1 / row 2 — directly beneath the logo
 * cell, sharing its `border-e` so the sidebar edge is one continuous hairline.
 * Below md it is a drawer with the logo CENTRED at the top of the panel.
 */
export function AppRail() {
  const { t } = useI18n();
  const { navOpen, setNavOpen } = useShell();
  const { collapsed } = useRailCollapsed();

  return (
    <TooltipProvider delayDuration={150}>
      <CollapsedContext.Provider value={collapsed === true}>
        <aside
          data-testid="app-rail"
          className="hidden min-w-0 flex-col border-e border-border bg-sidebar p-2 md:col-start-1 md:row-start-2 md:flex md:[html[data-rail=collapsed]_&]:px-1"
        >
          {/* U0d: the panel identity band sits directly BELOW the logo cell
              (grid row 2 starts here), identical to the drawer. Hidden on the
              collapsed rail, where there is no room for a name. */}
          <PanelHeader className={cn("mb-2", HIDE_WHEN_COLLAPSED)} />
          <RailBody onNavigate={() => undefined} />
          <RailFoot onNavigate={() => undefined} />
        </aside>
      </CollapsedContext.Provider>

      {/* The drawer never collapses: labels always, tooltips never. */}
      <Sheet open={navOpen} onOpenChange={setNavOpen}>
        <SheetContent side="left" className="flex w-72 flex-col bg-sidebar p-4">
          <SheetHeader className="p-0">
            {/* U0e: the drawer's logo block mirrors the top bar exactly — the
                same h-14 height and the same `border-b border-border` divider
                the header carries — so the drawer opens on the same geometry
                the page already shows. */}
            <div
              data-testid="drawer-logo-block"
              className="-mx-4 -mt-4 flex h-14 items-center justify-center border-b border-border px-4"
            >
              <Logo variant="full" />
            </div>
            <SheetTitle className="sr-only">{t("shell.menuTitle")}</SheetTitle>
          </SheetHeader>
          {/* U0d: the SAME panel band as the md+ rail, directly below the
              logo cell. The old stacked all-panels list is gone (U0c). */}
          <PanelHeader className="mt-3" />
          <div className="mt-4 flex flex-1 flex-col gap-4">
            <RailBody onNavigate={() => setNavOpen(false)} />
            <RailFoot onNavigate={() => setNavOpen(false)} />
          </div>
        </SheetContent>
      </Sheet>
    </TooltipProvider>
  );
}

export default AppRail;
