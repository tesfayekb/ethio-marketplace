import { createFileRoute } from "@tanstack/react-router";

import { AdminScreeningPage } from "@/features/admin-screening/screening-page";

/**
 * Bundle 10 E3a — the Screening section (D109). The /admin layout owns the
 * `listings:view` gate; Approve and Reject are decided by transition_listing,
 * which re-checks `listings:review` and a fresh second factor (F3).
 */
export const Route = createFileRoute("/admin/screening")({
  component: AdminScreeningRoute,
});

function AdminScreeningRoute() {
  return <AdminScreeningPage />;
}
