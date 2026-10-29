import { pageHead } from "@/lib/page-head";
import { createFileRoute } from "@tanstack/react-router";

import { AdminCategoriesPage } from "@/features/admin-categories/categories-page";

/**
 * C2-UI — the Categories section. The /admin layout owns the `categories:view`
 * gate and the AdminShellProvider; this file renders the body only.
 */
export const Route = createFileRoute("/admin/categories")({
  head: () =>
    pageHead(
      "head.admin.pattern.title",
      "head.admin.pattern.description",
      {
        meta: [
          { title: "Categories — ethio.com Admin" },
          { name: "description", content: "Categories in the ethio.com staff panel." },
          { name: "robots", content: "noindex" },
          { property: "og:title", content: "Categories — ethio.com Admin" },
          { property: "og:description", content: "Categories in the ethio.com staff panel." },
          { property: "og:type", content: "website" },
          { name: "twitter:card", content: "summary" },
        ],
      },
      "admin.section.categories.title",
    ),
  component: AdminCategoriesRoute,
});

function AdminCategoriesRoute() {
  return <AdminCategoriesPage />;
}
