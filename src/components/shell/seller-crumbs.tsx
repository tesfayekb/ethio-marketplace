import { BAND_CRUMB, BAND_CRUMB_CURRENT } from "@/components/shell/band-row";
import { CutText } from "@/components/ui/cut-text";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";

import { BreadcrumbLink, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { readMyListing } from "@/features/my-listings/my-listing";
import { authKey } from "@/lib/query-keys";

/**
 * Bundle 18 turn 1 (D198) — THE AD'S CRUMB on the seller's pages, kept out of
 * the first paint like the admin detail crumbs (INC-554): the shell loads this
 * module only on /my-listings/<id> and its Edit. It reads the ad page's own
 * cached query (the key my-listing-page.tsx fills, `authKey("my-listing", id)`,
 * with the page's own options), so on the ad's page no second request is
 * made; on the Edit, where the ad's page is not mounted, this is the one read
 * of the row. On the Edit the crumb is a link back to the ad's page; on the
 * ad's page it is the current segment.
 */

/** D265 — current crumbs share the location row's raised segment. */
const CURRENT = BAND_CRUMB_CURRENT;

export function MyListingCrumb({ listingId, link }: { listingId: string; link: boolean }) {
  const { data } = useQuery({
    queryKey: authKey("my-listing", listingId),
    queryFn: () => readMyListing(listingId),
  });
  const title = data !== undefined && data !== "notYours" ? data.listing.title : null;
  if (link) {
    return (
      <BreadcrumbLink asChild className={BAND_CRUMB}>
        <Link
          to="/my-listings/$listingId"
          params={{ listingId }}
          data-testid="breadcrumb-my-listing"
          className={BAND_CRUMB}
          title={title ?? undefined}
        >
          <CutText text={title ?? "—"} />
        </Link>
      </BreadcrumbLink>
    );
  }
  return (
    <BreadcrumbPage
      data-testid="breadcrumb-my-listing"
      className={CURRENT}
      title={title ?? undefined}
    >
      <CutText text={title ?? "—"} />
    </BreadcrumbPage>
  );
}
