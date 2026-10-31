import { BAND_CRUMB, BAND_CRUMB_CURRENT, BAND_CRUMB_TRACK } from "@/components/shell/band-row";
import { CutText } from "@/components/ui/cut-text";
import { useRouterState } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Suspense } from "react";

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
import { pathOf, useCategoryTree } from "@/features/categories/category-tree";
import { useI18n } from "@/i18n";
import type { MessageKey } from "@/i18n";
import { entityName } from "@/i18n/entity";
import type { PublicListingDoc } from "@/features/ad-page/public-listing";
import { resilientLazy } from "@/lib/resilient-lazy";

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
/** D265 — current crumbs share the location row's raised segment. */
const CURRENT = BAND_CRUMB_CURRENT;

/**
 * INC-554 — the admin detail crumbs load only on their pages (never in the first
 * paint); D234 S3 adds the user and role crumbs to that module, so the admin user
 * and role reads leave every page's first download. Bundle 18 turn 1 (D198) — the
 * ad's crumb on the seller's pages, loaded only there. D234 S3 (INC-897) — each
 * is resilientLazy: a crumb that cannot download shows its place, never the
 * route's error screen.
 */
const AdminListingCrumb = resilientLazy(
  () => import("./admin-detail-crumbs").then((module) => module.AdminListingCrumb),
  "a breadcrumb",
  PendingCrumb,
);
const AdminLanguageCrumb = resilientLazy(
  () => import("./admin-detail-crumbs").then((module) => module.AdminLanguageCrumb),
  "a breadcrumb",
  PendingCrumb,
);
const AdminUserCrumb = resilientLazy(
  () => import("./admin-detail-crumbs").then((module) => module.AdminUserCrumb),
  "a breadcrumb",
  PendingCrumb,
);
const AdminRoleCrumb = resilientLazy(
  () => import("./admin-detail-crumbs").then((module) => module.AdminRoleCrumb),
  "a breadcrumb",
  PendingCrumb,
);
const MyListingCrumb = resilientLazy(
  () => import("./seller-crumbs").then((module) => module.MyListingCrumb),
  "a breadcrumb",
  PendingCrumb,
);
const AdCrumbs = resilientLazy(
  () => import("./ad-crumbs").then((module) => module.AdCrumbs),
  "a breadcrumb",
  AdTitleCrumb,
);

/** What an on-demand crumb shows while its module loads, or in its place: the page's place, not a blank. */
function PendingCrumb() {
  return <BreadcrumbPage className={CURRENT}>—</BreadcrumbPage>;
}

/** The ad's own title as its last crumb: what the ad's trail shows until (or instead of) its category path. */
function AdTitleCrumb({ title }: { title: string; categoryId: string | null }) {
  return (
    <>
      <BreadcrumbSeparator />
      <BreadcrumbItem>
        <BreadcrumbPage data-testid="breadcrumb-ad" className={CURRENT} title={title}>
          <CutText text={title} />
        </BreadcrumbPage>
      </BreadcrumbItem>
    </>
  );
}

export function Breadcrumbs() {
  const { t, entities } = useI18n();
  // INC-581 — the trail names the page the body shows.
  const pathname = useShownPathname();
  const searchView = useRouterState({
    select: (s) => (s.location.search as { view?: string }).view,
  });
  const publicAd = useRouterState({
    select: (state) => {
      const match = state.matches.find((entry) => entry.routeId === "/l/$slug");
      const data = match?.loaderData as { kind?: string; doc?: PublicListingDoc } | undefined;
      return match?.status === "success" && data?.kind === "ad" && data.doc
        ? { title: data.doc.title, categoryId: data.doc.category?.id ?? null }
        : undefined;
    },
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
  if (pathname.startsWith("/l/")) {
    return (
      <Breadcrumb
        data-testid="breadcrumbs"
        className="min-w-0 max-w-full"
        aria-label={t("shell.breadcrumbLabel")}
      >
        <BreadcrumbList data-testid="breadcrumb-track" className={BAND_CRUMB_TRACK}>
          <BreadcrumbItem>
            <BreadcrumbLink asChild className={BAND_CRUMB}>
              <Link to="/" data-testid="breadcrumb-home">
                <CutText text={t("nav.home")} />
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {publicAd ? (
            <Suspense
              fallback={<AdTitleCrumb title={publicAd.title} categoryId={publicAd.categoryId} />}
            >
              <AdCrumbs title={publicAd.title} categoryId={publicAd.categoryId} />
            </Suspense>
          ) : null}
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  if (pathname.startsWith("/auth")) {
    return (
      <Breadcrumb
        data-testid="breadcrumbs"
        className="min-w-0 max-w-full"
        aria-label={t("shell.breadcrumbLabel")}
      >
        <BreadcrumbList data-testid="breadcrumb-track" className={BAND_CRUMB_TRACK}>
          <BreadcrumbItem>
            <BreadcrumbLink asChild className={BAND_CRUMB}>
              <Link to="/" data-testid="breadcrumb-home">
                <CutText text={t("nav.home")} />
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage data-testid="breadcrumb-auth" className={CURRENT}>
              <CutText
                text={searchView === "sign-up" ? t("auth.createAccount") : t("auth.signIn")}
              />
            </BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  if (pathname === "/account") {
    return (
      <Breadcrumb
        data-testid="breadcrumbs"
        className="min-w-0 max-w-full"
        aria-label={t("shell.breadcrumbLabel")}
      >
        <BreadcrumbList data-testid="breadcrumb-track" className={BAND_CRUMB_TRACK}>
          <BreadcrumbItem>
            <BreadcrumbLink asChild className={BAND_CRUMB}>
              <Link to="/" data-testid="breadcrumb-home">
                <CutText text={t("nav.home")} />
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage data-testid="breadcrumb-account" className={CURRENT}>
              <CutText text={t("panel.account")} />
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
    /**
     * Bundle 18 turn 1 (D198) — and the listing's Edit (/admin/listings/<id>/edit):
     * the listing crumb becomes a link back to its page and "Edit" is current.
     */
    const listingMatch = /^\/admin\/listings\/([^/]+)(\/edit)?\/?$/.exec(pathname);
    const listingDetailId = listingMatch?.[1] ?? null;
    const listingEditing = listingMatch?.[2] !== undefined;
    const languageDetailCode = /^\/admin\/translations\/([^/]+)\/?$/.exec(pathname)?.[1] ?? null;
    /**
     * INC-554 — ANY PAGE BELOW A SECTION'S OWN links back to the section: the
     * section crumb is a link whenever the address is deeper than the section's
     * path, whether or not a last crumb names the page (before, only the user
     * and role pages linked back, and the listing and language pages did not).
     */
    const deeper = section !== null && pathname.replace(/\/$/, "") !== section.path;
    return (
      <Breadcrumb
        data-testid="breadcrumbs"
        className="min-w-0 max-w-full"
        aria-label={t("shell.breadcrumbLabel")}
      >
        <BreadcrumbList data-testid="breadcrumb-track" className={BAND_CRUMB_TRACK}>
          <BreadcrumbItem>
            <BreadcrumbLink asChild className={BAND_CRUMB}>
              <Link to="/" data-testid="breadcrumb-home">
                <CutText text={t("nav.home")} />
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            {section || group ? (
              <BreadcrumbLink asChild className={BAND_CRUMB}>
                <Link to="/admin" data-testid="breadcrumb-admin">
                  <CutText text={t("panel.admin")} />
                </Link>
              </BreadcrumbLink>
            ) : (
              <BreadcrumbPage data-testid="breadcrumb-admin" className={CURRENT}>
                <CutText text={t("panel.admin")} />
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
                  <BreadcrumbLink asChild className={BAND_CRUMB}>
                    <Link to={group.path} data-testid="breadcrumb-admin-group">
                      <CutText text={t(group.titleKey)} />
                    </Link>
                  </BreadcrumbLink>
                ) : "path" in group ? (
                  <BreadcrumbPage data-testid="breadcrumb-admin-group" className={CURRENT}>
                    <CutText text={t(group.titleKey)} />
                  </BreadcrumbPage>
                ) : (
                  <span data-testid="breadcrumb-admin-group" className={BAND_CRUMB}>
                    <CutText text={t(group.titleKey)} />
                  </span>
                )}
              </BreadcrumbItem>
            </>
          ) : null}
          {section ? (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {deeper ? (
                  <BreadcrumbLink asChild className={BAND_CRUMB}>
                    <Link to={section.path} data-testid="breadcrumb-admin-section">
                      <CutText text={t(section.titleKey)} />
                    </Link>
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage data-testid="breadcrumb-admin-section" className={CURRENT}>
                    <CutText text={t(section.titleKey)} />
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
                  <Suspense fallback={<PendingCrumb />}>
                    <AdminUserCrumb userId={userDetailId} />
                  </Suspense>
                ) : roleDetailId ? (
                  <Suspense fallback={<PendingCrumb />}>
                    <AdminRoleCrumb roleId={roleDetailId} />
                  </Suspense>
                ) : listingDetailId ? (
                  <Suspense fallback={<PendingCrumb />}>
                    <AdminListingCrumb listingId={listingDetailId} link={listingEditing} />
                  </Suspense>
                ) : languageDetailCode ? (
                  <Suspense fallback={<PendingCrumb />}>
                    <AdminLanguageCrumb code={languageDetailCode} />
                  </Suspense>
                ) : null}
              </BreadcrumbItem>
            </>
          ) : null}
          {listingDetailId && listingEditing ? (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage data-testid="breadcrumb-edit" className={CURRENT}>
                  <CutText text={t("myListings.edit")} />
                </BreadcrumbPage>
              </BreadcrumbItem>
            </>
          ) : null}
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  /**
   * Bundle 18 turn 1 (D198; the operator's bundle-17 walk) — THE SELLER'S AND
   * THE ACCOUNT'S OWN PAGES (/my-listings and the ad's page and Edit under it,
   * /post, /settings) are route-owned like the admin's, so their trail is
   * route-derived like the admin's: Home › <panel> › <page> [› <ad> [› Edit]],
   * every segment but the current one a real control. Before, these pages
   * showed Home › <panel> with nothing to click. The panel crumb links to the
   * panel's home (panels.ts `homePath`) whenever the address is deeper than
   * it; on the home itself it is a plain name — the page crumb beside it is
   * the current segment (INC-557's rule). The page crumb is a link only under
   * an ad (/my-listings/<id>…): "Post listing" stays current on /post/<id>,
   * which is the same screen resuming a draft.
   */
  const ownPage: { key: MessageKey; path: "/my-listings" | "/post" | "/settings" } | null =
    pathname === "/my-listings" || pathname.startsWith("/my-listings/")
      ? { key: "nav.myListings", path: "/my-listings" }
      : pathname === "/post" || pathname.startsWith("/post/")
        ? { key: "nav.postListing", path: "/post" }
        : pathname === "/settings" || pathname.startsWith("/settings/")
          ? { key: "settings.navLabel", path: "/settings" }
          : null;
  if (ownPage) {
    const home = PANELS[activePanel].homePath;
    const adMatch = /^\/my-listings\/([^/]+)(\/edit)?\/?$/.exec(pathname);
    const adId = adMatch?.[1] ?? null;
    const adEditing = adMatch?.[2] !== undefined;
    return (
      <Breadcrumb
        data-testid="breadcrumbs"
        className="min-w-0 max-w-full"
        aria-label={t("shell.breadcrumbLabel")}
      >
        <BreadcrumbList data-testid="breadcrumb-track" className={BAND_CRUMB_TRACK}>
          <BreadcrumbItem>
            <BreadcrumbLink asChild className={BAND_CRUMB}>
              <Link to="/" data-testid="breadcrumb-home">
                <CutText text={t("nav.home")} />
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            {home !== null && pathname.replace(/\/$/, "") !== home ? (
              <BreadcrumbLink asChild className={BAND_CRUMB}>
                <Link to={home} data-testid="breadcrumb-panel">
                  <CutText text={panelLabel} />
                </Link>
              </BreadcrumbLink>
            ) : (
              <span data-testid="breadcrumb-panel" className={BAND_CRUMB}>
                <CutText text={panelLabel} />
              </span>
            )}
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            {adId ? (
              <BreadcrumbLink asChild className={BAND_CRUMB}>
                <Link to={ownPage.path} data-testid="breadcrumb-page">
                  <CutText text={t(ownPage.key)} />
                </Link>
              </BreadcrumbLink>
            ) : (
              <BreadcrumbPage data-testid="breadcrumb-page" className={CURRENT}>
                <CutText text={t(ownPage.key)} />
              </BreadcrumbPage>
            )}
          </BreadcrumbItem>
          {adId ? (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <Suspense fallback={<PendingCrumb />}>
                  <MyListingCrumb listingId={adId} link={adEditing} />
                </Suspense>
              </BreadcrumbItem>
            </>
          ) : null}
          {adId && adEditing ? (
            <>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage data-testid="breadcrumb-edit" className={CURRENT}>
                  <CutText text={t("myListings.edit")} />
                </BreadcrumbPage>
              </BreadcrumbItem>
            </>
          ) : null}
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  return (
    <Breadcrumb
      data-testid="breadcrumbs"
      className="min-w-0 max-w-full"
      aria-label={t("shell.breadcrumbLabel")}
    >
      <BreadcrumbList data-testid="breadcrumb-track" className={BAND_CRUMB_TRACK}>
        <BreadcrumbItem>
          {showPanelSegment || path.length > 0 ? (
            <BreadcrumbLink asChild className={BAND_CRUMB}>
              <Link to="/" data-testid="breadcrumb-home">
                <CutText text={t("nav.home")} />
              </Link>
            </BreadcrumbLink>
          ) : (
            <BreadcrumbPage data-testid="breadcrumb-home" className={CURRENT}>
              <CutText text={t("nav.home")} />
            </BreadcrumbPage>
          )}
        </BreadcrumbItem>
        {showPanelSegment ? (
          <>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              {path.length > 0 ? (
                <BreadcrumbLink asChild className={BAND_CRUMB}>
                  <Link to="/" data-testid="breadcrumb-panel">
                    <CutText text={panelLabel} />
                  </Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage data-testid="breadcrumb-panel" className={CURRENT}>
                  <CutText text={panelLabel} />
                </BreadcrumbPage>
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
                  <BreadcrumbPage
                    data-testid="breadcrumb-category"
                    className={CURRENT}
                    title={label}
                  >
                    <CutText text={label} />
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild className={BAND_CRUMB}>
                    <Link
                      to="/c/$slug"
                      params={{ slug: node.slug }}
                      data-testid="breadcrumb-category-parent"
                    >
                      <CutText text={label} />
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

export default Breadcrumbs;
