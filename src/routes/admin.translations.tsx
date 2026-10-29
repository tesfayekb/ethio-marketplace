import { pageHead } from "@/lib/page-head";
import { createFileRoute } from "@tanstack/react-router";

import { AdminTranslationsLanguagesPage } from "@/features/admin/translations/languages-page";

/**
 * U4b — the translations roster route. The /admin layout owns the permission
 * gate and the AdminShellProvider, so this file renders the body only.
 */
export const Route = createFileRoute("/admin/translations")({
  head: () => ({
    meta: [
      ...pageHead("head.admin.pattern.title", "head.admin.pattern.description", "admin.section.translations.title", null, "Translations — ethio.com Admin", "Translations in the ethio.com staff panel.").meta,
      { name: "robots", content: "noindex" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminTranslationsRoute,
});

function AdminTranslationsRoute() {
  return <AdminTranslationsLanguagesPage />;
}
