import { createFileRoute } from "@tanstack/react-router";

import { AdminLocationsPage } from "@/features/admin-locations/locations-page";

/** The Places console; the Locations group owns the overview at the old path. */
export const Route = createFileRoute("/admin/places")({
  head: () => ({
    meta: [
      { title: "Places — ethio.com Admin" },
      { name: "description", content: "Places in the ethio.com staff panel." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Places — ethio.com Admin" },
      { property: "og:description", content: "Places in the ethio.com staff panel." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminPlacesRoute,
});

function AdminPlacesRoute() {
  return <AdminLocationsPage />;
}
