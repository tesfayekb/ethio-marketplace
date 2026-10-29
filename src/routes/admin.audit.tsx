import { pageHead } from "@/lib/page-head";
import { createFileRoute } from "@tanstack/react-router";

import { AdminAuditPage } from "@/features/admin/audit/audit-page";

/**
 * U3 — the Audit & Security section. The /admin layout owns the permission
 * gate and the AdminShellProvider; this file renders the body only.
 */
export const Route = createFileRoute("/admin/audit")({
  head: () =>
    pageHead(
      "head.admin.pattern.title",
      "head.admin.pattern.description",
      {
        meta: [
          { title: "Audit & Security — ethio.com Admin" },
          { name: "description", content: "Audit & Security in the ethio.com staff panel." },
          { name: "robots", content: "noindex" },
          { property: "og:title", content: "Audit & Security — ethio.com Admin" },
          { property: "og:description", content: "Audit & Security in the ethio.com staff panel." },
          { property: "og:type", content: "website" },
          { name: "twitter:card", content: "summary" },
        ],
      },
      "admin.section.audit.title",
    ),
  component: AdminAuditRoute,
});

function AdminAuditRoute() {
  return <AdminAuditPage />;
}
