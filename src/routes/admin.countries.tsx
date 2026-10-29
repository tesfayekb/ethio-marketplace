import { pageHead } from "@/lib/page-head";
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
      ...pageHead(
        "head.admin.pattern.title",
        "head.admin.pattern.description",
        "admin.section.countries.title",
        null,
        "Countries — ethio.com Admin",
        "Countries in the ethio.com staff panel.",
      ).meta,
      { name: "robots", content: "noindex" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminCountriesRoute,
});

function AdminCountriesRoute() {
  return <AdminCountriesPage />;
}
