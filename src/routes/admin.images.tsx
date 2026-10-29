import { pageHead } from "@/lib/page-head";
import { createFileRoute } from "@tanstack/react-router";

import { AdminSectionPage } from "@/features/admin/section-page";

export const Route = createFileRoute("/admin/images")({
  head: () => ({
    meta: [
      ...pageHead("head.admin.pattern.title", "head.admin.pattern.description", "admin.section.images.title", null, "Images — ethio.com Admin", "Images in the ethio.com staff panel.").meta,
      { name: "robots", content: "noindex" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminImagesPage,
});

function AdminImagesPage() {
  return <AdminSectionPage id="images" />;
}
