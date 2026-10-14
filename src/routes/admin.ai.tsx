import { createFileRoute } from "@tanstack/react-router";

import { AdminAiPage } from "@/features/admin-ai/ai-page";

/**
 * Bundle 13 turn 5 (D158) — Admin › Services › AI. The /admin layout owns the
 * `services:view` gate; the one write re-checks `services:manage` and step-up
 * inside its door (F3).
 */
export const Route = createFileRoute("/admin/ai")({
  component: AdminAiRoute,
});

function AdminAiRoute() {
  return <AdminAiPage />;
}
