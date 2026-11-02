import { pageHead } from "@/lib/page-head";
import { createFileRoute } from "@tanstack/react-router";

import { AdminPackagesPage } from "@/features/admin-packages/packages-page";

/**
 * P-1 (D280, D283) — Admin › Listings › Packages. The /admin layout owns the
 * `packages:view` gate; the three writes re-check `packages:update` and step-up
 * inside their doors (F3).
 */
export const Route = createFileRoute("/admin/packages")({
  head: () => ({
    meta: [
      ...pageHead(
        "head.admin.pattern.title",
        "head.admin.pattern.description",
        "admin.section.packages.title",
        null,
        "Packages — ethio.com Admin",
        "Packages in the ethio.com staff panel.",
      ).meta,
      { name: "robots", content: "noindex" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminPackagesRoute,
});

function AdminPackagesRoute() {
  return <AdminPackagesPage />;
}
