import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

import { useShell } from "@/components/app-shell";
import { Logo } from "@/components/brand/logo";
import { PanelSwitcher } from "@/components/shell/panel-switcher";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { PANELS, visibleItems } from "@/config/panels";
import type { NavItem } from "@/config/panels.types";
import { useCategories } from "@/features/feed/use-feed";
import { useI18n } from "@/i18n";
import type { MessageKey } from "@/i18n";
import { cn } from "@/lib/utils";

const ITEM_BASE =
  "flex min-h-11 w-full items-center gap-2 rounded-md px-3 text-start text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
const ITEM_IDLE = "text-foreground hover:bg-muted";
/** Selection is GREEN, never a cream tint — the one emphasis surface. */
const ITEM_ACTIVE = "bg-sidebar-accent font-medium text-sidebar-accent-foreground";

/** A node the rail can render: either a config NavItem or a live category. */
type RailNode = {
  key: string;
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
      <span className="truncate">{node.label}</span>
    </>
  );
  const pad = { paddingInlineStart: `${0.75 + depth * 0.75}rem` };

  if (hasChildren) {
    return (
      <li>
        <Collapsible open={open} onOpenChange={setOpen}>
          <CollapsibleTrigger asChild>
            <button
              type="button"
              data-testid="rail-submenu-trigger"
              aria-expanded={open}
              style={pad}
              className={cn(ITEM_BASE, containsActive(node) ? ITEM_ACTIVE : ITEM_IDLE, "pe-3")}
            >
              {inner}
              <ChevronRight
                aria-hidden="true"
                className={cn("ms-auto h-4 w-4 shrink-0 transition-transform", open && "rotate-90")}
              />
            </button>
          </CollapsibleTrigger>
          <CollapsibleContent asChild>
            <ul data-testid="rail-submenu" className="mt-1 flex flex-col gap-1">
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
        <Link
          to={node.path}
          onClick={node.onSelect}
          style={pad}
          className={cn(ITEM_BASE, node.active ? ITEM_ACTIVE : ITEM_IDLE)}
        >
          {inner}
        </Link>
      </li>
    );
  }

  if (node.onSelect) {
    return (
      <li>
        <button
          type="button"
          onClick={node.onSelect}
          aria-current={node.active ? "true" : undefined}
          style={pad}
          className={cn(ITEM_BASE, node.active ? ITEM_ACTIVE : ITEM_IDLE)}
        >
          {inner}
        </button>
      </li>
    );
  }

  // No path yet: the item's page is a later feature.
  return (
    <li>
      <span style={pad} className={cn(ITEM_BASE, "text-muted-foreground")} aria-disabled="true">
        {inner}
      </span>
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
      <h2 className="px-3 pb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {t("shell.categoriesLabel")}
      </h2>
      <ul className="flex flex-col gap-1">
        <RailRow
          node={{
            key: "all",
            label: t("shell.allCategories"),
            active: selectedCategoryId === null,
            onSelect: () => {
              setSelectedCategoryId(null);
              onNavigate();
            },
          }}
        />
        {nodes.map((node) => (
          <RailRow key={node.key} node={node} />
        ))}
        {!isLoading && categories.length === 0 ? (
          <li className="px-3 text-sm text-muted-foreground">{t("shell.categoriesEmpty")}</li>
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

  const toNode = (item: NavItem): RailNode => ({
    key: item.id,
    label: t(item.labelKey),
    icon: item.icon,
    path: item.path,
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
    <nav aria-label={t("shell.mainNav")} className="flex flex-col gap-4">
      {sections.map((section, index) => (
        <div key={section.key ?? `section-${index}`}>
          {section.key ? (
            <h2 className="px-3 pb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              {t(section.key)}
            </h2>
          ) : null}
          <ul className="flex flex-col gap-1">
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
 * The rail. From lg up it is grid column 1 / row 2 — directly beneath the logo
 * cell, sharing its `border-e` so the sidebar edge is one continuous hairline.
 * Below lg it is a drawer with the logo CENTRED at the top of the panel.
 */
export function AppRail() {
  const { t } = useI18n();
  const { navOpen, setNavOpen } = useShell();

  return (
    <>
      <aside
        data-testid="app-rail"
        className="hidden border-e border-border bg-sidebar p-2 lg:col-start-1 lg:row-start-2 lg:block"
      >
        <RailBody onNavigate={() => undefined} />
      </aside>

      <Sheet open={navOpen} onOpenChange={setNavOpen}>
        <SheetContent side="left" className="w-72 bg-sidebar p-4">
          <SheetHeader className="p-0">
            <div className="flex justify-center pb-2">
              <Logo variant="full" />
            </div>
            <SheetTitle className="sr-only">{t("shell.menuTitle")}</SheetTitle>
          </SheetHeader>
          <div className="mt-4 flex flex-col gap-4">
            <PanelSwitcher variant="list" />
            <RailBody onNavigate={() => setNavOpen(false)} />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default AppRail;
