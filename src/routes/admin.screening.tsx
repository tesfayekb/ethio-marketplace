import { createFileRoute } from "@tanstack/react-router";

import { AdminScreeningPage } from "@/features/admin-screening/screening-page";

/**
 * Bundle 10 E3a — the Screening section (D109). `listings:review` opens the
 * section (the /admin layout's gate, DEC-163); the queue's rows are read under
 * `listings:view` (RLS `listings_admin_read`); Approve and Reject are decided by
 * transition_listing, which re-checks `listings:review` and a fresh second
 * factor (F3).
 */
export const Route = createFileRoute("/admin/screening")({
  component: AdminScreeningRoute,
});

function AdminScreeningRoute() {
  return <AdminScreeningPage />;
}
