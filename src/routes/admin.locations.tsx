import { createFileRoute } from "@tanstack/react-router";

import { LocationsOverview } from "@/features/admin-overview/locations-overview";

/**
 * LOCATIONS ERA L2c — the Locations group overview. The child links remain
 * permission-filtered; the /admin layout owns the panel gate.
 */
export const Route = createFileRoute("/admin/locations")({
  component: AdminLocationsRoute,
});

function AdminLocationsRoute() {
  return <LocationsOverview />;
}
