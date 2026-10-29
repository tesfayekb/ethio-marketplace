import { pageHead } from "@/lib/page-head";
import { createFileRoute } from "@tanstack/react-router";

import { AdminCoveragePage } from "@/features/admin-coverage/coverage-page";

/**
 * LOCATIONS ERA L2b-C2 — the Coverage section. The /admin layout owns the
 * `coverage:view` gate; the plan write re-checks `coverage:update` and step-up
 * inside the door (F3).
 */
export const Route = createFileRoute("/admin/coverage")({
  head: () =>
    pageHead(
      "head.admin.pattern.title",
      "head.admin.pattern.description",
      {
        meta: [
          { title: "Coverage — ethio.com Admin" },
          { name: "description", content: "Coverage in the ethio.com staff panel." },
          { name: "robots", content: "noindex" },
          { property: "og:title", content: "Coverage — ethio.com Admin" },
          { property: "og:description", content: "Coverage in the ethio.com staff panel." },
          { property: "og:type", content: "website" },
          { name: "twitter:card", content: "summary" },
        ],
      },
      "admin.section.coverage.title",
    ),
  component: AdminCoverageRoute,
});

function AdminCoverageRoute() {
  return <AdminCoveragePage />;
}
