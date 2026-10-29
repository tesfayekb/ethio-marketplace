import { pageHead } from "@/lib/page-head";
import { createFileRoute } from "@tanstack/react-router";

import { AdminAiPage } from "@/features/admin-ai/ai-page";

/**
 * Bundle 13 turn 5 (D158) — Admin › Services › AI. The /admin layout owns the
 * `services:view` gate; the one write re-checks `services:manage` and step-up
 * inside its door (F3).
 */
export const Route = createFileRoute("/admin/ai")({
  head: () => ({
    meta: [
      ...pageHead("head.admin.pattern.title", "head.admin.pattern.description", "admin.section.ai.title", null, "AI — ethio.com Admin", "AI in the ethio.com staff panel.").meta,
      { name: "robots", content: "noindex" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminAiRoute,
});

function AdminAiRoute() {
  return <AdminAiPage />;
}
