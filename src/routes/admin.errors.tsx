import { pageHead } from "@/lib/page-head";
import { createFileRoute } from "@tanstack/react-router";

import { AdminErrorsPage } from "@/features/admin-errors/errors-page";
import { errorsSearch } from "@/features/admin-errors/errors-search";

/**
 * DEC-474 Part F — the Errors section. The /admin layout owns the permission gate and the
 * AdminShellProvider; this file renders the body only. The window and kind live in the address.
 */
export const Route = createFileRoute("/admin/errors")({
  validateSearch: errorsSearch,
  head: () => ({
    meta: [
      ...pageHead(
        "head.admin.pattern.title",
        "head.admin.pattern.description",
        "admin.section.errors.title",
        null,
        "Errors — ethio.com Admin",
        "Errors in the ethio.com staff panel.",
      ).meta,
      { name: "robots", content: "noindex" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AdminErrorsRoute,
});

function AdminErrorsRoute() {
  const search = Route.useSearch();
  const navigate = Route.useNavigate();
  return (
    <AdminErrorsPage
      days={search.days}
      kind={search.kind ?? null}
      onDays={(days) => void navigate({ to: ".", search: (prev) => ({ ...prev, days }) })}
      onKind={(kind) =>
        void navigate({
          to: ".",
          search: (prev) => ({ days: prev.days, ...(kind === null ? {} : { kind }) }),
        })
      }
    />
  );
}
