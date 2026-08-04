import { Link } from "@tanstack/react-router";

import { useShell } from "@/components/app-shell";
import { PanelSwitcher } from "@/components/shell/panel-switcher";
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
const ITEM_ACTIVE = "bg-sidebar-accent font-medium text-sidebar-accent-foreground";

/** Marketplace rail = the LIVE category tree (top level), read from the database. */
function CategoryNav({ onNavigate }: { onNavigate: () => void }) {
  const { t, language } = useI18n();
  const { categories, isLoading } = useCategories();
  const { selectedCategoryId, setSelectedCategoryId } = useShell();

  return (
    <nav aria-label={t("shell.categoriesLabel")}>
      <h2 className="px-3 pb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {t("shell.categoriesLabel")}
      </h2>
      <ul className="flex flex-col gap-1">
        <li>
          <button
            type="button"
            onClick={() => {
              setSelectedCategoryId(null);
              onNavigate();
            }}
            aria-current={selectedCategoryId === null ? "true" : undefined}
            className={cn(ITEM_BASE, selectedCategoryId === null ? ITEM_ACTIVE : ITEM_IDLE)}
          >
            <span className="truncate">{t("shell.allCategories")}</span>
          </button>
        </li>
        {categories.map((category) => {
          const active = category.id === selectedCategoryId;
          const label = language === "am" ? (category.nameAm ?? category.nameEn) : category.nameEn;
          return (
            <li key={category.id}>
              <button
                type="button"
                onClick={() => {
                  setSelectedCategoryId(category.id);
                  onNavigate();
                }}
                aria-current={active ? "true" : undefined}
                className={cn(ITEM_BASE, active ? ITEM_ACTIVE : ITEM_IDLE)}
              >
                <span className="truncate">{label}</span>
              </button>
            </li>
          );
        })}
        {!isLoading && categories.length === 0 ? (
          <li className="px-3 text-sm text-muted-foreground">{t("shell.categoriesEmpty")}</li>
        ) : null}
      </ul>
    </nav>
  );
}

function MenuItemRow({ item, onNavigate }: { item: NavItem; onNavigate: () => void }) {
  const { t } = useI18n();
  const Icon = item.icon;
  const content = (
    <>
      {Icon ? <Icon className="h-4 w-4 shrink-0" aria-hidden="true" /> : null}
      <span className="truncate">{t(item.labelKey)}</span>
    </>
  );

  if (item.path === "/settings") {
    return (
      <Link to="/settings" onClick={onNavigate} className={cn(ITEM_BASE, ITEM_IDLE)}>
        {content}
      </Link>
    );
  }
  // No path yet: the item's page is a later feature.
  return (
    <span className={cn(ITEM_BASE, "text-muted-foreground")} aria-disabled="true">
      {content}
    </span>
  );
}

/** Non-Marketplace rails: menu items, sectioned where the config says so. */
function MenuNav({ onNavigate }: { onNavigate: () => void }) {
  const { t } = useI18n();
  const { auth, activePanel } = useShell();
  const items = visibleItems(PANELS[activePanel].items, auth);

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
              <li key={item.id}>
                <MenuItemRow item={item} onNavigate={onNavigate} />
              </li>
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
 * The rail: a persistent start-side column from lg up, a drawer below it.
 * The drawer uses ui/sheet (the same primitive ui/sidebar uses for its own
 * mobile mode) rather than re-implementing collapse logic.
 */
export function AppRail() {
  const { t } = useI18n();
  const { navOpen, setNavOpen } = useShell();

  return (
    <>
      <aside
        data-testid="app-rail"
        className="hidden w-60 shrink-0 rounded-lg border border-border bg-sidebar p-2 lg:block"
      >
        <RailBody onNavigate={() => undefined} />
      </aside>

      <Sheet open={navOpen} onOpenChange={setNavOpen}>
        <SheetContent side="left" className="w-72 bg-sidebar p-4">
          <SheetHeader className="p-0 text-start">
            <SheetTitle>{t("shell.menuTitle")}</SheetTitle>
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
