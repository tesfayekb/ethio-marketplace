import { createFileRoute } from "@tanstack/react-router";

import { AdminCountriesPage } from "@/features/admin-countries/countries-page";

/**
 * LOCATIONS ERA L2b-C1 — the Countries section. The /admin layout owns the
 * `countries:view` gate; every write re-checks its own granular permission and
 * step-up inside the door (F3).
 */
export const Route = createFileRoute("/admin/countries")({
  head: () => ({
    meta: [
      { title: "Countries — ethio.com Admin" },
      { name: "description", content: "Countries in the ethio.com staff panel." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Countries — ethio.com Admin" },
      { property: "og:description", content: "Countries in the ethio.com staff panel." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminCountriesRoute,
});

function AdminCountriesRoute() {
  return <AdminCountriesPage />;
}
