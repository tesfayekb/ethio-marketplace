import { createFileRoute } from "@tanstack/react-router";

import { AdminLocationsPage } from "@/features/admin-locations/locations-page";

/**
 * LOCATIONS ERA L2a — the Locations section. The /admin layout owns the
 * `locations:view` gate; every write re-checks its own granular permission and
 * step-up inside the door (F3).
 */
export const Route = createFileRoute("/admin/locations")({
  component: AdminLocationsRoute,
});

function AdminLocationsRoute() {
  return <AdminLocationsPage />;
}
