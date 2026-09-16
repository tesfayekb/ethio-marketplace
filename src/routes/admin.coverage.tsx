import { createFileRoute } from "@tanstack/react-router";

import { AdminSectionPage } from "@/features/admin/section-page";

/**
 * LOCATIONS ERA L2b-C1 — the Coverage section's ROUTE lands with the rail group
 * so the nav is whole in one landing; the plans roster and its editor arrive at
 * L2b-C2. Until then the section renders the register's own body line — the
 * section exists, and says exactly what it will hold.
 */
export const Route = createFileRoute("/admin/coverage")({
  component: AdminCoverageRoute,
});

function AdminCoverageRoute() {
  return <AdminSectionPage id="coverage" />;
}
