import { createFileRoute } from "@tanstack/react-router";

import { AdminListingPage } from "@/features/admin-listings/listing-page";

/**
 * Bundle 11, the Listings console, turn L3 (D139) — one listing's page. Flat-file
 * nesting like every other admin detail route (admin.listings.tsx is the
 * section's list; this is its child segment). The /admin layout owns the
 * permission gate (the listings section's listings:view) and the shell.
 */
export const Route = createFileRoute("/admin/listings_/$listingId")({
  component: AdminListingRoute,
});

function AdminListingRoute() {
  const { listingId } = Route.useParams();
  return <AdminListingPage listingId={listingId} />;
}
