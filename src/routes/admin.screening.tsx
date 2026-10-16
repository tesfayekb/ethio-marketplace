import { createFileRoute } from "@tanstack/react-router";

import { AdminScreeningPage } from "@/features/admin-screening/screening-page";

/**
 * Bundle 10 E3a — the Screening section (D109). `listings:review` opens the
 * section (the /admin layout's gate, DEC-163); the queue's rows are read under
 * `listings:view` (RLS `listings_admin_read`); Approve and Reject are decided by
 * transition_listing, which re-checks `listings:review` and a fresh second
 * factor (F3).
 *
 * Bundle 17 turn 2 (D194) — `?open=<id>` re-opens the ad's preview when the
 * reviewer comes back from its Edit (`/admin/listings/<id>/edit?from=screening`);
 * anything else in the address is dropped.
 */
export const Route = createFileRoute("/admin/screening")({
  validateSearch: (search: Record<string, unknown>): { open?: string } =>
    typeof search.open === "string" && search.open !== "" ? { open: search.open } : {},
  component: AdminScreeningRoute,
});

function AdminScreeningRoute() {
  const { open } = Route.useSearch();
  return <AdminScreeningPage openId={open ?? null} />;
}
