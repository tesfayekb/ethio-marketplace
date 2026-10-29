import { pageHead } from "@/lib/page-head";
import { createFileRoute } from "@tanstack/react-router";

import { AdminSectionPage } from "@/features/admin/section-page";

export const Route = createFileRoute("/admin/images")({
  head: () => pageHead("head.admin.pattern.title", "head.admin.pattern.description", {
    meta: [
      { title: "Images — ethio.com Admin" },
      { name: "description", content: "Images in the ethio.com staff panel." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Images — ethio.com Admin" },
      { property: "og:description", content: "Images in the ethio.com staff panel." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }, "admin.section.images.title"),
  component: AdminImagesPage,
});

function AdminImagesPage() {
  return <AdminSectionPage id="images" />;
}
