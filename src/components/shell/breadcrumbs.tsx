import { useRouterState } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";

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
import { sectionForPath } from "@/features/admin/sections";
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
/** Operator directive (U0c): the CURRENT segment is underlined and heavier. */
const CURRENT = "font-semibold text-foreground underline underline-offset-4";

export function Breadcrumbs() {
  const { t, language } = useI18n();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const searchView = useRouterState({
    select: (s) => (s.location.search as { view?: string }).view,
  });
  const { activePanel, setActivePanel, selectedCategorySlug } = useShell();

  /**
   * Home IS the marketplace feed — there is no separate home page. From any
   * panel the root crumb returns to the unfiltered Marketplace feed: it sets
   * the active panel back to marketplace; the URL "/" clears the category.
   */
  const goHome = () => setActivePanel("marketplace");
  const { categories } = useCategories();

  const panelLabel = t(PANELS[activePanel].labelKey);
  /** U0l (INC-073): the crumb reads the URL, exactly like the rail and body. */
  const selected = categories.find((c) => c.slug === selectedCategorySlug) ?? null;
  const path = selected ? [selected] : [];

  /**
   * INC-043: "Home" IS the marketplace, so "Home › Marketplace" said the same
   * thing twice. On the marketplace panel the chain is Home › <category path>.
   * On every OTHER panel the panel name is real information about where you
   * are, so it stays a segment: Home › Account › …
   */
  const showPanelSegment = activePanel !== "marketplace" && !pathname.startsWith("/auth");

  /**
   * U0l PART 2 — /auth IS A PAGE: Home › Sign in (or › Create an account in
   * the sign-up view, read from the same search param the route owns).
   */
  if (pathname.startsWith("/auth")) {
    return (
      <Breadcrumb
        data-testid="breadcrumbs"
        aria-label={t("shell.breadcrumbLabel")}
        className="mb-3"
      >
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/" data-testid="breadcrumb-home">
                {t("nav.home")}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage data-testid="breadcrumb-auth" className={CURRENT}>
              {searchView === "sign-up" ? t("auth.createAccount") : t("auth.signIn")}
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  /**
   * U0c — ADMIN ROUTES feed THIS seam, route-derived (INC-058). The admin
   * panel no longer carries its own breadcrumb row: exactly one breadcrumb
   * nav renders on every route, and it is this one.
   */
  if (pathname.startsWith("/admin")) {
    const section = sectionForPath(pathname);
    return (
      <Breadcrumb
        data-testid="breadcrumbs"
        aria-label={t("shell.breadcrumbLabel")}
        className="mb-3"
      >
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/" data-testid="breadcrumb-home">
                {t("nav.home")}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            {section ? (
              <BreadcrumbLink asChild>
                <Link to="/admin" data-testid="breadcrumb-admin">
                  {t("panel.admin")}
                </Link>
              </BreadcrumbLink>
            ) : (
              <BreadcrumbPage data-testid="breadcrumb-admin" className={CURRENT}>
                {t("panel.admin")}
              </BreadcrumbPage>
            )}
          </BreadcrumbItem>
          {section ? (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage data-testid="breadcrumb-admin-section" className={CURRENT}>
                  {t(section.titleKey)}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </>
          ) : null}
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

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
