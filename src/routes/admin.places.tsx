import { createFileRoute } from "@tanstack/react-router";

import { AdminLocationsPage } from "@/features/admin-locations/locations-page";

/** The Places console; the Locations group owns the overview at the old path. */
export const Route = createFileRoute("/admin/places")({
  component: AdminPlacesRoute,
});

function AdminPlacesRoute() {
  return <AdminLocationsPage />;
}