import { pageHead } from "@/lib/page-head";
import { createFileRoute } from "@tanstack/react-router";

import { ImpersonationView } from "@/features/admin/impersonation/impersonation-view";

/**
 * U3 / DEC-016 — the impersonation surface. Flat-file nesting like every
 * other admin route; the /admin layout owns the gate. The session id in the
 * URL is meaningless without the server-side box (owner + 15-minute window),
 * so a shared link grants nothing.
 */
export const Route = createFileRoute("/admin/impersonation_/$sessionId")({
  head: () =>
    pageHead(
      "head.admin.pattern.title",
      "head.admin.pattern.description",
      {
        meta: [
          { title: "Impersonation session — ethio.com Admin" },
          { name: "description", content: "Impersonation session in the ethio.com staff panel." },
          { name: "robots", content: "noindex" },
          { property: "og:title", content: "Impersonation session — ethio.com Admin" },
          {
            property: "og:description",
            content: "Impersonation session in the ethio.com staff panel.",
          },
          { property: "og:type", content: "website" },
          { name: "twitter:card", content: "summary" },
        ],
      },
      "head.admin.impersonation.title",
    ),
  component: ImpersonationRoute,
});

function ImpersonationRoute() {
  const { sessionId } = Route.useParams();
  return <ImpersonationView sessionId={sessionId} />;
}
