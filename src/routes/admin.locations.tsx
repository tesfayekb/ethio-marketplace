import { createFileRoute } from "@tanstack/react-router";

import { AdminSectionPage } from "@/features/admin/section-page";

export const Route = createFileRoute("/admin/locations")({
  component: AdminLocationsPage,
});

function AdminLocationsPage() {
  return <AdminSectionPage id="locations" />;
}
