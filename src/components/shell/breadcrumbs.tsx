import { useRouterState } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

import { useShell } from "@/components/shell-context";
import { useShownPathname } from "@/components/shell/use-shown-pathname";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { PANELS } from "@/config/panels";
import { groupForPath, groupForSection, sectionForPath } from "@/features/admin/sections";
import { useAdminRole } from "@/features/admin/roles/use-admin-roles";
import { useAdminUser } from "@/features/admin/users/use-admin-users";
import { pathOf, useCategoryTree } from "@/features/categories/category-tree";
import { useI18n } from "@/i18n";
import { entityName } from "@/i18n/entity";

/**
 * The content top-line breadcrumb — band 4: Home › <panel> › <category path>.
 *
 * EVERY segment is a real control. Clicking a category segment sets the feed's
 * categoryId to THAT node (and therefore the rail's selection), so a user deep
 * in a subcategory walks back up without opening the sidebar. Home clears the
 * category entirely. This works today — it is client navigation over state the
 * shell already owns, with no backend needed.
 *
 * E3b — the path is the WHOLE category path, `pathOf` over the shared tree: a
 * subcategory shows Home › <parent> › … › <itself>, following a category's
 * first parent. The last segment is the current page (`breadcrumb-category`);
 * every earlier one links to its /c/<slug> (`breadcrumb-category-parent`).
 */
/** Operator directive (U0c): the CURRENT segment is underlined and heavier. */
const CURRENT = "font-semibold text-foreground underline underline-offset-4";

/** INC-554 — the listing and language crumbs load only on their pages (never in the first paint). */
const AdminListingCrumb = lazy(() =>
  import("./admin-detail-crumbs").then((module) => ({ default: module.AdminListingCrumb })),
);
const AdminLanguageCrumb = lazy(() =>
  import("./admin-detail-crumbs").then((module) => ({ default: module.AdminLanguageCrumb })),
);

/** What a lazy crumb shows while its module loads: the page's place, not a blank. */
function PendingCrumb() {
  return <BreadcrumbPage className={CURRENT}>—</BreadcrumbPage>;
}

export function Breadcrumbs() {
  const { t, entities } = useI18n();
  // INC-581 — the trail names the page the body shows.
  const pathname = useShownPathname();
  const searchView = useRouterState({
    select: (s) => (s.location.search as { view?: string }).view,
  });
  const { activePanel, selectedCategorySlug } = useShell();
  const { tree } = useCategoryTree();

  const panelLabel = t(PANELS[activePanel].labelKey);
  /** U0l (INC-073): the crumb reads the URL, exactly like the rail and body. */
  const selected = tree.nodes.find((node) => node.slug === selectedCategorySlug) ?? null;
  const path = selected ? pathOf(tree, selected.id) : [];

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
      <Breadcrumb data-testid="breadcrumbs" aria-label={t("shell.breadcrumbLabel")}>
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

  if (pathname === "/account") {
    return (
      <Breadcrumb data-testid="breadcrumbs" aria-label={t("shell.breadcrumbLabel")}>
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
            <BreadcrumbPage data-testid="breadcrumb-account" className={CURRENT}>
              {t("panel.account")}
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
    const ownGroup = groupForPath(pathname);
    const sectionGroup = section ? groupForSection(section) : null;
    const group = ownGroup ?? sectionGroup;
    /**
     * U1d — the user-detail route publishes the name through the SMALLEST
     * EXISTING SEAM: the react-query cache the detail page already fills
     * (`useAdminUser(userId)`, key ["admin","users","detail",id]). No new
     * context, no new fetch path — the crumb reads the same cached row.
     */
    const userDetailId = /^\/admin\/users\/([^/]+)\/?$/.exec(pathname)?.[1] ?? null;
    /** U2 — the same cache seam for the Roles > <display name> 4th segment. */
    const roleDetailId = /^\/admin\/roles\/([^/]+)\/?$/.exec(pathname)?.[1] ?? null;
    /** Bundle 11, turn L4b (INC-554) — the listing's page and a language's strings page. */
    const listingDetailId = /^\/admin\/listings\/([^/]+)\/?$/.exec(pathname)?.[1] ?? null;
    const languageDetailCode = /^\/admin\/translations\/([^/]+)\/?$/.exec(pathname)?.[1] ?? null;
    /**
     * INC-554 — ANY PAGE BELOW A SECTION'S OWN links back to the section: the
     * section crumb is a link whenever the address is deeper than the section's
     * path, whether or not a last crumb names the page (before, only the user
     * and role pages linked back, and the listing and language pages did not).
     */
    const deeper = section !== null && pathname.replace(/\/$/, "") !== section.path;
    return (
      <Breadcrumb data-testid="breadcrumbs" aria-label={t("shell.breadcrumbLabel")}>
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
            {section || group ? (
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
          {group ? (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {/* A group may own a page. On a child route it is a link; on
                    the group's own page it is the current final segment.
                    INC-557 (the operator's walk, 2026-10-11): a group with NO
                    page of its own (Listings, Catalog) is a plain name, never
                    the current segment — before, it wore the current look
                    (bold, underlined, aria-current) beside the real current
                    page. */}
                {"path" in group && group.path !== pathname ? (
                  <BreadcrumbLink asChild>
                    <Link to={group.path} data-testid="breadcrumb-admin-group">
                      {t(group.titleKey)}
                    </Link>
                  </BreadcrumbLink>
                ) : "path" in group ? (
                  <BreadcrumbPage data-testid="breadcrumb-admin-group" className={CURRENT}>
                    {t(group.titleKey)}
                  </BreadcrumbPage>
                ) : (
                  <span data-testid="breadcrumb-admin-group">{t(group.titleKey)}</span>
                )}
              </BreadcrumbItem>
            </>
          ) : null}
          {section ? (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {deeper ? (
                  <BreadcrumbLink asChild>
                    <Link to={section.path} data-testid="breadcrumb-admin-section">
                      {t(section.titleKey)}
                    </Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage data-testid="breadcrumb-admin-section" className={CURRENT}>
                    {t(section.titleKey)}
                  </BreadcrumbPage>
                )}
              </BreadcrumbItem>
            </>
          ) : null}
          {userDetailId || roleDetailId || listingDetailId || languageDetailCode ? (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {userDetailId ? (
                  <AdminUserCrumb userId={userDetailId} />
                ) : roleDetailId ? (
                  <AdminRoleCrumb roleId={roleDetailId} />
                ) : listingDetailId ? (
                  <Suspense fallback={<PendingCrumb />}>
                    <AdminListingCrumb listingId={listingDetailId} />
                  </Suspense>
                ) : languageDetailCode ? (
                  <Suspense fallback={<PendingCrumb />}>
                    <AdminLanguageCrumb code={languageDetailCode} />
                  </Suspense>
                ) : null}
              </BreadcrumbItem>
            </>
          ) : null}
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  return (
    <Breadcrumb data-testid="breadcrumbs" aria-label={t("shell.breadcrumbLabel")}>
      <BreadcrumbList>
        <BreadcrumbItem>
          {showPanelSegment || path.length > 0 ? (
            <BreadcrumbLink asChild>
              <Link to="/" data-testid="breadcrumb-home">
                {t("nav.home")}
              </Link>
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
                  <Link to="/" data-testid="breadcrumb-panel">
                    {panelLabel}
                  </Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage data-testid="breadcrumb-panel">{panelLabel}</BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </>
        ) : null}

        {path.map((node, index) => {
          const label = entityName("category", node, entities);
          const isLast = index === path.length - 1;
          return (
            <span key={node.id} className="contents">
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage data-testid="breadcrumb-category">{label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link
                      to="/c/$slug"
                      params={{ slug: node.slug }}
                      data-testid="breadcrumb-category-parent"
                    >
                      {label}
                    </Link>
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

/** U1d — the 4th admin crumb; reads the detail page's cached row. */
function AdminUserCrumb({ userId }: { userId: string }) {
  const { data } = useAdminUser(userId);
  return (
    <BreadcrumbPage data-testid="breadcrumb-admin-user" className={CURRENT}>
      {data?.displayName ?? "—"}
    </BreadcrumbPage>
  );
}

/** U2 — the 4th admin crumb for a role; reads the detail page's cached row. */
function AdminRoleCrumb({ roleId }: { roleId: string }) {
  const { data } = useAdminRole(roleId);
  return (
    <BreadcrumbPage data-testid="breadcrumb-admin-role" className={CURRENT}>
      {data?.displayName ?? data?.name ?? "—"}
    </BreadcrumbPage>
  );
}

export default Breadcrumbs;
