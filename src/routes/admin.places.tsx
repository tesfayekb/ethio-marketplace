import { pageHead } from "@/lib/page-head";
import { createFileRoute } from "@tanstack/react-router";

import { AdminLocationsPage } from "@/features/admin-locations/locations-page";

/** The Places console; the Locations group owns the overview at the old path. */
export const Route = createFileRoute("/admin/places")({
  head: () => ({
    meta: [
      ...pageHead(
        "head.admin.pattern.title",
        "head.admin.pattern.description",
        "admin.section.places.title",
        null,
        "Places — ethio.com Admin",
        "Places in the ethio.com staff panel.",
      ).meta,
      { name: "robots", content: "noindex" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminPlacesRoute,
});

function AdminPlacesRoute() {
  return <AdminLocationsPage />;
}
