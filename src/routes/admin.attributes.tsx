import { createFileRoute } from "@tanstack/react-router";

import { AdminAttributesPage } from "@/features/admin-attributes/attributes-page";

/**
 * C3c — the Attributes section (was the U6 placeholder). The /admin layout owns
 * the `categories:view` gate and the AdminShellProvider; this file renders the
 * body only.
 */
export const Route = createFileRoute("/admin/attributes")({
  component: AdminAttributesRoute,
});

function AdminAttributesRoute() {
  return <AdminAttributesPage />;
}
