import { createFileRoute } from "@tanstack/react-router";

import {
  AdminTranslationsStringsPage,
  type StringsSearch,
} from "@/features/admin/translations/strings-page";

/**
 * U4b — the per-language strings route. Flat-file nesting like the role and
 * user detail routes: /admin owns the permission gate and the shell provider.
 *
 * INC-073 law: the list's filters live in the URL, so a filtered view is
 * shareable and reproducible. validateSearch is the single parse point.
 */
export const Route = createFileRoute("/admin/translations_/$lang")({
  validateSearch: (search: Record<string, unknown>): StringsSearch => ({
    ...(typeof search["status"] === "string" ? { status: search["status"] } : {}),
    ...(search["flagged"] === true || search["flagged"] === "true" ? { flagged: true } : {}),
    ...(typeof search["q"] === "string" && search["q"] !== "" ? { q: search["q"] } : {}),
    // U4d: the Interface | Data scope is a URL filter like the others.
    ...(search["scope"] === "data" ? { scope: "data" } : {}),
  }),
  component: AdminTranslationsStringsRoute,
});

function AdminTranslationsStringsRoute() {
  const { lang } = Route.useParams();
  const search = Route.useSearch();
  return <AdminTranslationsStringsPage lang={lang} search={search} />;
}
