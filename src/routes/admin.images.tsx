import { createFileRoute } from "@tanstack/react-router";

import { AdminSectionPage } from "@/features/admin/section-page";

export const Route = createFileRoute("/admin/images")({
  component: AdminImagesPage,
});

function AdminImagesPage() {
  return <AdminSectionPage id="images" />;
}
