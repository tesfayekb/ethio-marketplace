import { pageHead } from "@/lib/page-head";
import { createFileRoute } from "@tanstack/react-router";

import { AdminListingPage } from "@/features/admin-listings/listing-page";

/**
 * Bundle 11, the Listings console, turn L3 (D139) — one listing's page. Flat-file
 * nesting like every other admin detail route (admin.listings.tsx is the
 * section's list; this is its child segment). The /admin layout owns the
 * permission gate (the listings section's listings:view) and the shell.
 */
export const Route = createFileRoute("/admin/listings_/$listingId")({
  head: () => ({
    meta: [
      ...pageHead("head.admin.pattern.title", "head.admin.pattern.description", "head.admin.listing.title", null, "Listing — ethio.com Admin", "Listing in the ethio.com staff panel.").meta,
      { name: "robots", content: "noindex" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminListingRoute,
});

function AdminListingRoute() {
  const { listingId } = Route.useParams();
  return <AdminListingPage listingId={listingId} />;
}
