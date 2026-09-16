import { createFileRoute } from "@tanstack/react-router";

import { AdminCountriesPage } from "@/features/admin-countries/countries-page";

/**
 * LOCATIONS ERA L2b-C1 — the Countries section. The /admin layout owns the
 * `countries:view` gate; every write re-checks its own granular permission and
 * step-up inside the door (F3).
 */
export const Route = createFileRoute("/admin/countries")({
  component: AdminCountriesRoute,
});

function AdminCountriesRoute() {
  return <AdminCountriesPage />;
}
