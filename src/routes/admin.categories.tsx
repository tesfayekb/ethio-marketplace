import { pageHead } from "@/lib/page-head";
import { createFileRoute } from "@tanstack/react-router";

import { AdminCategoriesPage } from "@/features/admin-categories/categories-page";

/**
 * C2-UI — the Categories section. The /admin layout owns the `categories:view`
 * gate and the AdminShellProvider; this file renders the body only.
 */
export const Route = createFileRoute("/admin/categories")({
  head: () => ({
    meta: [
      ...pageHead(
        "head.admin.pattern.title",
        "head.admin.pattern.description",
        "admin.section.categories.title",
        null,
        "Categories — ethio.com Admin",
        "Categories in the ethio.com staff panel.",
      ).meta,
      { name: "robots", content: "noindex" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminCategoriesRoute,
});

function AdminCategoriesRoute() {
  return <AdminCategoriesPage />;
}
