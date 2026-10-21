import { createFileRoute } from "@tanstack/react-router";

import { AdminScreeningPage } from "@/features/admin-screening/screening-page";

/**
 * Bundle 10 E3a — the Screening section (D109). `listings:review` opens the
 * section (the /admin layout's gate, DEC-163); the queue's rows are read under
 * `listings:view` (RLS `listings_admin_read`); Approve and Reject are decided by
 * transition_listing, which re-checks `listings:review` and a fresh second
 * factor (F3).
 *
 * Bundle 17 turn 2 (D194) — `?open=<id>` re-opens the ad's preview when the
 * reviewer comes back from its Edit (`/admin/listings/<id>/edit?from=screening`);
 * bundle 17 turn 3 (D188) — `?decided=active|rejected` shows the outcome line
 * when the decision was made on the Edit's Review. Anything else in the address
 * is dropped.
 */
export const Route = createFileRoute("/admin/screening")({
  head: () => ({
    meta: [
      { title: "Screening queue — ethio.com Admin" },
      { name: "description", content: "Screening queue in the ethio.com staff panel." },
      { name: "robots", content: "noindex" },
      { property: "og:title", content: "Screening queue — ethio.com Admin" },
      { property: "og:description", content: "Screening queue in the ethio.com staff panel." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  validateSearch: (
    search: Record<string, unknown>,
  ): { open?: string; decided?: "active" | "rejected" } => ({
    ...(typeof search.open === "string" && search.open !== "" ? { open: search.open } : {}),
    ...(search.decided === "active" || search.decided === "rejected"
      ? { decided: search.decided }
      : {}),
  }),
  component: AdminScreeningRoute,
});

function AdminScreeningRoute() {
  const { open, decided } = Route.useSearch();
  return <AdminScreeningPage openId={open ?? null} decided={decided ?? null} />;
}
