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
 * The content top-line breadcrumb: Home › <panel> › <category>.
 * It lives on the CONTENT, not in the top bar (the bar stays minimal).
 */
export function Breadcrumbs() {
  const { t, language } = useI18n();
  const { activePanel, selectedCategoryId } = useShell();
  const { categories } = useCategories();

  const panelLabel = t(PANELS[activePanel].labelKey);
  const category = categories.find((c) => c.id === selectedCategoryId) ?? null;
  const categoryLabel = category
    ? language === "am"
      ? (category.nameAm ?? category.nameEn)
      : category.nameEn
    : null;

  return (
    <Breadcrumb data-testid="breadcrumbs" className="mb-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">{t("nav.home")}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          {categoryLabel ? (
            <BreadcrumbLink href="/">{panelLabel}</BreadcrumbLink>
          ) : (
            <BreadcrumbPage>{panelLabel}</BreadcrumbPage>
          )}
        </BreadcrumbItem>
        {categoryLabel ? (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{categoryLabel}</BreadcrumbPage>
            </BreadcrumbItem>
          </>
        ) : null}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default Breadcrumbs;
