import { pageHead } from "@/lib/page-head";
import { createFileRoute } from "@tanstack/react-router";

import { LocationsOverview } from "@/features/admin-overview/locations-overview";

/**
 * LOCATIONS ERA L2c — the Locations group overview. The child links remain
 * permission-filtered; the /admin layout owns the panel gate.
 */
export const Route = createFileRoute("/admin/locations")({
  head: () => ({
    meta: [
      ...pageHead(
        "head.admin.pattern.title",
        "head.admin.pattern.description",
        "nav.locations",
        null,
        "Locations — ethio.com Admin",
        "Locations in the ethio.com staff panel.",
      ).meta,
      { name: "robots", content: "noindex" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminLocationsRoute,
});

function AdminLocationsRoute() {
  return <LocationsOverview />;
}
