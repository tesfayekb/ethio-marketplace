import { createFileRoute } from "@tanstack/react-router";

import { AdminTranslationsLanguagesPage } from "@/features/admin/translations/languages-page";

/**
 * U4b — the translations roster route. The /admin layout owns the permission
 * gate and the AdminShellProvider, so this file renders the body only.
 */
export const Route = createFileRoute("/admin/translations")({
  component: AdminTranslationsRoute,
});

function AdminTranslationsRoute() {
  return <AdminTranslationsLanguagesPage />;
}
