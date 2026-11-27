import { pageHead } from "@/lib/page-head";
import { createFileRoute } from "@tanstack/react-router";

import { ErrorReportsPage } from "@/features/admin-errors/error-reports-page";
import { errorsSearch } from "@/features/admin-errors/errors-search";

/**
 * DEC-474 Part F — one error group's reports, on its own address so a link can be shared and Back
 * works. The page checks the key's shape (isGroupKey) before it mounts any reader.
 */
export const Route = createFileRoute("/admin/errors_/$group")({
  validateSearch: errorsSearch,
  head: () => ({
    meta: [
      ...pageHead(
        "head.admin.pattern.title",
        "head.admin.pattern.description",
        "admin.errors.reports.title",
        null,
        "Reports — ethio.com Admin",
        "An error group's reports in the ethio.com staff panel.",
      ).meta,
      { name: "robots", content: "noindex" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ErrorGroupRoute,
});

function ErrorGroupRoute() {
  const { group } = Route.useParams();
  const search = Route.useSearch();
  return <ErrorReportsPage group={group} back={{ days: search.days, kind: search.kind ?? null }} />;
}
