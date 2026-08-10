import { createFileRoute } from "@tanstack/react-router";

import { AdminSectionPage } from "@/features/admin/section-page";

export const Route = createFileRoute("/admin/audit")({
  component: AdminAuditPage,
});

function AdminAuditPage() {
  return <AdminSectionPage id="audit" />;
}
