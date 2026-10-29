import { createFileRoute } from "@tanstack/react-router";

import { AdminTranslationsLanguagesPage } from "@/features/admin/translations/languages-page";

/**
 * U4b — the translations roster route. The /admin layout owns the permission
 * gate and the AdminShellProvider, so this file renders the body only.
 */
export const Route = createFileRoute("/admin/translations")({
  head: () => ({
    meta: [
      { title: "Translations — ethio.com Admin" },
      { name: "description", content: "Translations in the ethio.com staff panel." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Translations — ethio.com Admin" },
      { property: "og:description", content: "Translations in the ethio.com staff panel." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminTranslationsRoute,
});

function AdminTranslationsRoute() {
  return <AdminTranslationsLanguagesPage />;
}
