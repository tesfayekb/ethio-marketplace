import { createFileRoute } from "@tanstack/react-router";

import { ImpersonationView } from "@/features/admin/impersonation/impersonation-view";

/**
 * U3 / DEC-016 — the impersonation surface. Flat-file nesting like every
 * other admin route; the /admin layout owns the gate. The session id in the
 * URL is meaningless without the server-side box (owner + 15-minute window),
 * so a shared link grants nothing.
 */
export const Route = createFileRoute("/admin/impersonation_/$sessionId")({
  component: ImpersonationRoute,
});

function ImpersonationRoute() {
  const { sessionId } = Route.useParams();
  return <ImpersonationView sessionId={sessionId} />;
}
