import { pageHead } from "@/lib/page-head";
import { createFileRoute } from "@tanstack/react-router";

import { AdminCoveragePage } from "@/features/admin-coverage/coverage-page";

/**
 * LOCATIONS ERA L2b-C2 — the Coverage section. The /admin layout owns the
 * `coverage:view` gate; the plan write re-checks `coverage:update` and step-up
 * inside the door (F3).
 */
export const Route = createFileRoute("/admin/coverage")({
  head: () => ({
    meta: [
      ...pageHead(
        "head.admin.pattern.title",
        "head.admin.pattern.description",
        "admin.section.coverage.title",
        null,
        "Coverage — ethio.com Admin",
        "Coverage in the ethio.com staff panel.",
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
