import { createFileRoute } from "@tanstack/react-router";

import { AdminAuditPage } from "@/features/admin/audit/audit-page";

/**
 * U3 — the Audit & Security section. The /admin layout owns the permission
 * gate and the AdminShellProvider; this file renders the body only.
 */
export const Route = createFileRoute("/admin/audit")({
  component: AdminAuditRoute,
});

function AdminAuditRoute() {
  return <AdminAuditPage />;
}
