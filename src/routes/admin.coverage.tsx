import { createFileRoute } from "@tanstack/react-router";

import { AdminCoveragePage } from "@/features/admin-coverage/coverage-page";

/**
 * LOCATIONS ERA L2b-C2 — the Coverage section. The /admin layout owns the
 * `coverage:view` gate; the plan write re-checks `coverage:update` and step-up
 * inside the door (F3).
 */
export const Route = createFileRoute("/admin/coverage")({
  component: AdminCoverageRoute,
});

function AdminCoverageRoute() {
  return <AdminCoveragePage />;
}
