import { Link } from "@tanstack/react-router";

import { BreadcrumbLink, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { useLanguages } from "@/features/admin/translations/use-translations";
import { useAdminListing } from "@/features/admin-listings/use-admin-listing";
import { useAdminRole } from "@/features/admin/roles/use-admin-roles";
import { useAdminUser } from "@/features/admin/users/use-admin-users";

/**
 * Bundle 11, turn L4b (INC-554) — THE LAST CRUMB of two admin detail pages,
 * kept out of the first paint: the shell's breadcrumb loads this module only
 * on those pages (resilientLazy, D234 S3), so a marketplace visitor never downloads the
 * admin reads behind it. Each reads the page's own cached query (the same
 * keys the page fills), so no second request is made.
 */

/** Operator directive (U0c): the CURRENT segment is underlined and heavier. */
const CURRENT = "font-semibold text-foreground underline underline-offset-4";

/**
 * A listing's page: its title, from the page's cached read. Bundle 18 turn 1
 * (D198) — on the listing's Edit (/admin/listings/<id>/edit) the crumb is a
 * link back to the listing's page and "Edit" follows it as the current segment.
 */
export function AdminListingCrumb({ listingId, link }: { listingId: string; link: boolean }) {
  const { data } = useAdminListing(listingId);
  if (link) {
    return (
      <BreadcrumbLink asChild>
        <Link
          to="/admin/listings/$listingId"
          params={{ listingId }}
          data-testid="breadcrumb-admin-listing"
          className="block max-w-[16rem] truncate"
          title={data?.listing.title}
        >
          {data?.listing.title ?? "—"}
        </Link>
      </BreadcrumbLink>
    );
  }
  return (
    <BreadcrumbPage
      data-testid="breadcrumb-admin-listing"
      className={`${CURRENT} block max-w-[16rem] truncate`}
      title={data?.listing.title}
    >
      {data?.listing.title ?? "—"}
    </BreadcrumbPage>
  );
}

/** A language's strings page: the language's own name, from the roster's read. */
export function AdminLanguageCrumb({ code }: { code: string }) {
  const { data } = useLanguages();
  const row = (data ?? []).find((entry) => entry.code === code);
  return (
    <BreadcrumbPage data-testid="breadcrumb-admin-language" className={CURRENT}>
      {row?.nameNative ?? code}
    </BreadcrumbPage>
  );
}

/**
 * D234 S3 — the user and role crumbs moved here from the shell's breadcrumbs, so
 * the admin user and role reads (and the step-up service behind them) leave every
 * page's first download. The cut style is the shell's own current segment.
 */
const CURRENT_CUT = "min-w-0 truncate font-semibold text-foreground underline underline-offset-4";

/** U1d — the 4th admin crumb; reads the detail page's cached row. */
export function AdminUserCrumb({ userId }: { userId: string }) {
  const { data } = useAdminUser(userId);
  return (
    <BreadcrumbPage data-testid="breadcrumb-admin-user" className={CURRENT_CUT}>
      {data?.displayName ?? "—"}
    </BreadcrumbPage>
  );
}

/** U2 — the 4th admin crumb for a role; reads the detail page's cached row. */
export function AdminRoleCrumb({ roleId }: { roleId: string }) {
  const { data } = useAdminRole(roleId);
  return (
    <BreadcrumbPage data-testid="breadcrumb-admin-role" className={CURRENT_CUT}>
      {data?.displayName ?? data?.name ?? "—"}
    </BreadcrumbPage>
  );
}
