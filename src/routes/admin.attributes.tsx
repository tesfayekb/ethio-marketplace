import { createFileRoute } from "@tanstack/react-router";

import { AdminSectionPage } from "@/features/admin/section-page";

export const Route = createFileRoute("/admin/attributes")({
  component: AdminAttributesPage,
});

function AdminAttributesPage() {
  return <AdminSectionPage id="attributes" />;
}
