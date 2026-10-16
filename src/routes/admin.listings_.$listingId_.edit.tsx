import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { StepUpGate } from "@/features/auth/mfa/step-up-gate";
import { EditWizard } from "@/features/posting/wizard";

/**
 * Bundle 17 turn 2 (D194) — `/admin/listings/<id>/edit`: the staff's Edit is the
 * same wizard in edit mode (the operator: "same review page as the first and
 * gateway"), `actor: "admin"`. The Review opens with the reason box (DEC-173,
 * asked once for the sitting, sent with every step's save) above the sections;
 * the answers, the price and the words have their Edit links — the Category,
 * the Photos, the Place and the Contact do not (the staff door takes none of
 * them; a photo's removal stays on the listing page and in Screening's preview).
 * Every save goes through `admin_edit_listing` under the step-up gate, as the
 * console's Edit did.
 *
 * `?from=screening` remembers where the reviewer came from: Done returns to the
 * queue with the ad's preview re-opened (`/admin/screening?open=<id>`), so
 * Approve and Reject are at hand again (D188); otherwise to the listing's page.
 * The /admin layout owns the permission gate and the shell; the door decides
 * whether this account may edit (listings:enforce), never the address.
 */
export const Route = createFileRoute("/admin/listings_/$listingId_/edit")({
  validateSearch: (search: Record<string, unknown>): { from?: "screening" } =>
    search.from === "screening" ? { from: "screening" } : {},
  component: AdminListingEditRoute,
});

function AdminListingEditRoute() {
  const { listingId } = Route.useParams();
  const { from } = Route.useSearch();
  const navigate = useNavigate();
  const done = () =>
    void (from === "screening"
      ? navigate({ to: "/admin/screening", search: { open: listingId } })
      : navigate({ to: "/admin/listings/$listingId", params: { listingId } }));
  return (
    <StepUpGate>
      {(guard) => <EditWizard listingId={listingId} actor="admin" guard={guard} onDone={done} />}
    </StepUpGate>
  );
}
