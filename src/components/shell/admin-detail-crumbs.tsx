import { Link } from "@tanstack/react-router";

import { BreadcrumbLink, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { useLanguages } from "@/features/admin/translations/use-translations";
import { useAdminListing } from "@/features/admin-listings/use-admin-listing";

/**
 * Bundle 11, turn L4b (INC-554) — THE LAST CRUMB of two admin detail pages,
 * kept out of the first paint: the shell's breadcrumb loads this module only
 * on those pages (React.lazy), so a marketplace visitor never downloads the
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
