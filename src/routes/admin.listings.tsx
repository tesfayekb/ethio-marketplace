import { pageHead } from "@/lib/page-head";
import { createFileRoute } from "@tanstack/react-router";

import { AdminListingsPage } from "@/features/admin-listings/listings-page";

/**
 * Bundle 11, the Listings console, turn L2 (D134) — All listings. `listings:view`
 * opens the section (the /admin layout's gate); the rows are read through
 * `admin_list_listings`, which re-checks `listings:view` (F3).
 */
export const Route = createFileRoute("/admin/listings")({
  head: () => ({
    meta: [
      ...pageHead("head.admin.pattern.title", "head.admin.pattern.description", "admin.section.listings.title", null, "All listings — ethio.com Admin", "All listings in the ethio.com staff panel.").meta,
      { name: "robots", content: "noindex" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminListingsRoute,
});

function AdminListingsRoute() {
  return <AdminListingsPage />;
}
