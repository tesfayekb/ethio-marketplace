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
  const { activePanel, selectedCategoryId, setSelectedCategoryId } = useShell();
  const { categories } = useCategories();

  const panelLabel = t(PANELS[activePanel].labelKey);
  const selected = categories.find((c) => c.id === selectedCategoryId) ?? null;
  const path = selected ? [selected] : [];

  return (
    <Breadcrumb data-testid="breadcrumbs" aria-label={t("shell.breadcrumbLabel")} className="mb-3">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <button
              type="button"
              data-testid="breadcrumb-home"
              onClick={() => setSelectedCategoryId(null)}
            >
              {t("nav.home")}
            </button>
          </BreadcrumbLink>
        </BreadcrumbItem>
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
            <BreadcrumbPage>{panelLabel}</BreadcrumbPage>
          )}
        </BreadcrumbItem>
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
