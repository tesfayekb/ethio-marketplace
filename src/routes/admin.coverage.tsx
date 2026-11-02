import { pageHead } from "@/lib/page-head";
import { createFileRoute } from "@tanstack/react-router";

import { AdminCoveragePage } from "@/features/admin-coverage/coverage-page";

/**
 * LOCATIONS ERA L2b-C2 — the Coverage section, Admin › Plans since P-1 (D279: a
 * plan's dials — reach, photos, ad lifetime, how many ads — are its rows). The
 * /admin layout owns the `coverage:view` gate; the plan write re-checks
 * `coverage:update` and step-up inside the door (F3).
 */
export const Route = createFileRoute("/admin/coverage")({
  head: () => ({
    meta: [
      ...pageHead(
        "head.admin.pattern.title",
        "head.admin.pattern.description",
        "admin.section.plans.title",
        null,
        "Plans — ethio.com Admin",
        "Plans in the ethio.com staff panel.",
      ).meta,
      { name: "robots", content: "noindex" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminCoverageRoute,
});

function AdminCoverageRoute() {
  return <AdminCoveragePage />;
}
