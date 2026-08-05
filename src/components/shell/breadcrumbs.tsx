import { useShell } from "@/components/app-shell";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { PANELS } from "@/config/panels";
import { useCategories } from "@/features/feed/use-feed";
import { useI18n } from "@/i18n";

/**
 * The content top-line breadcrumb — band 4: Home › <panel> › <category path>.
 *
 * EVERY segment is a real control. Clicking a category segment sets the feed's
 * categoryId to THAT node (and therefore the rail's selection), so a user deep
 * in a subcategory walks back up without opening the sidebar. Home clears the
 * category entirely. This works today — it is client navigation over state the
 * shell already owns, with no backend needed.
 *
 * The path is currently one level deep because useCategories returns top-level
 * categories only; when category children land the same map renders the full
 * chain (Home › Clothing › Child clothing › Shirts) with no change here.
 */
export function Breadcrumbs() {
  const { t, language } = useI18n();
  const { activePanel, setActivePanel, selectedCategoryId, setSelectedCategoryId } = useShell();

  /**
   * Home IS the marketplace feed — there is no separate home page. From any
   * panel the root crumb returns to the unfiltered Marketplace feed: it sets
   * the active panel back to marketplace AND clears the category filter.
   */
  const goHome = () => {
    setActivePanel("marketplace");
    setSelectedCategoryId(null);
  };
  const { categories } = useCategories();

  const panelLabel = t(PANELS[activePanel].labelKey);
  const selected = categories.find((c) => c.id === selectedCategoryId) ?? null;
  const path = selected ? [selected] : [];

  /**
   * INC-043: "Home" IS the marketplace, so "Home › Marketplace" said the same
   * thing twice. On the marketplace panel the chain is Home › <category path>.
   * On every OTHER panel the panel name is real information about where you
   * are, so it stays a segment: Home › Account › …
   */
  const showPanelSegment = activePanel !== "marketplace";

  return (
    <Breadcrumb data-testid="breadcrumbs" aria-label={t("shell.breadcrumbLabel")} className="mb-3">
      <BreadcrumbList>
        <BreadcrumbItem>
          {showPanelSegment || path.length > 0 ? (
            <BreadcrumbLink asChild>
              <button type="button" data-testid="breadcrumb-home" onClick={goHome}>
                {t("nav.home")}
              </button>
            </BreadcrumbLink>
          ) : (
            <BreadcrumbPage data-testid="breadcrumb-home">{t("nav.home")}</BreadcrumbPage>
          )}
        </BreadcrumbItem>
        {showPanelSegment ? (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {path.length > 0 ? (
                <BreadcrumbLink asChild>
                  <button
                    type="button"
                    data-testid="breadcrumb-panel"
                    onClick={() => setSelectedCategoryId(null)}
                  >
                    {panelLabel}
                  </button>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage data-testid="breadcrumb-panel">{panelLabel}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </>
        ) : null}

        {path.map((node, index) => {
          const label = language === "am" ? (node.nameAm ?? node.nameEn) : node.nameEn;
          const isLast = index === path.length - 1;
          return (
            <span key={node.id} className="contents">
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage data-testid="breadcrumb-category">{label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <button
                      type="button"
                      data-testid="breadcrumb-category"
                      onClick={() => setSelectedCategoryId(node.id)}
                    >
                      {label}
                    </button>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </span>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default Breadcrumbs;
