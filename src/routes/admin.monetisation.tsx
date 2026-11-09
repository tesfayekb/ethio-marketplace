import { pageHead } from "@/lib/page-head";
import { createFileRoute } from "@tanstack/react-router";

import { AdminMonetisationPage } from "@/features/admin-monetisation/monetisation-page";

/**
 * P-1b (D290, D295, D303, D311, D312) — Admin › Monetisation. The /admin layout
 * owns the `packages:view` gate; every write re-checks `packages:update` and
 * step-up inside its door (F3).
 */
export const Route = createFileRoute("/admin/monetisation")({
  head: () => ({
    meta: [
      ...pageHead(
        "head.admin.pattern.title",
        "head.admin.pattern.description",
        "admin.section.monetisation.title",
        null,
        "Monetisation — ethio.com Admin",
        "Monetisation in the ethio.com staff panel.",
      ).meta,
      { name: "robots", content: "noindex" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminMonetisationRoute,
});

function AdminMonetisationRoute() {
  return <AdminMonetisationPage />;
}
