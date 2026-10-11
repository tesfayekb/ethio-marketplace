import { createFileRoute } from "@tanstack/react-router";

import { AdminListingsPage } from "@/features/admin-listings/listings-page";

/**
 * Bundle 11, the Listings console, turn L2 (D134) — All listings. `listings:view`
 * opens the section (the /admin layout's gate); the rows are read through
 * `admin_list_listings`, which re-checks `listings:view` (F3).
 */
export const Route = createFileRoute("/admin/listings")({
  component: AdminListingsRoute,
});

function AdminListingsRoute() {
  return <AdminListingsPage />;
}
