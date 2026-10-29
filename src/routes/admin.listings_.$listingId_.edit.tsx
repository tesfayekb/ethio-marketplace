import { pageHead } from "@/lib/page-head";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useAdminShell } from "@/features/admin/admin-context";
import { decideListing } from "@/features/admin-screening/use-screening";
import { stepUpAbortKey } from "@/features/auth/mfa/mfa-service";
import { StepUpGate } from "@/features/auth/mfa/step-up-gate";
import type { GuardFn } from "@/features/auth/mfa/use-step-up";
import { EditWizard } from "@/features/posting/wizard";
import { useI18n, type MessageKey } from "@/i18n";

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
 *
 * Bundle 17 turn 3 (D188: "after the edit we can approve or reject") — from
 * Screening, for listings:review, the Review carries Approve and Reject beside
 * Done. Each asks first (the queue's own words), decides through
 * `transition_listing` under the step-up gate (one ad), and returns to the queue
 * with the outcome line (`/admin/screening?decided=active|rejected`). A cancelled
 * second factor leaves the Review as it was; a refusal is said under the actions.
 */
export const Route = createFileRoute("/admin/listings_/$listingId_/edit")({
  head: () =>
    pageHead(
      "head.admin.pattern.title",
      "head.admin.pattern.description",
      {
        meta: [
          { title: "Edit listing — ethio.com Admin" },
          { name: "description", content: "Edit listing in the ethio.com staff panel." },
          { name: "robots", content: "noindex" },
          { property: "og:title", content: "Edit listing — ethio.com Admin" },
          { property: "og:description", content: "Edit listing in the ethio.com staff panel." },
          { property: "og:type", content: "website" },
          { name: "twitter:card", content: "summary" },
        ],
      },
      "head.admin.editListing.title",
    ),
  validateSearch: (search: Record<string, unknown>): { from?: "screening" } =>
    search.from === "screening" ? { from: "screening" } : {},
  component: AdminListingEditRoute,
});

type Next = "active" | "rejected";

function AdminListingEditRoute() {
  const { listingId } = Route.useParams();
  const { from } = Route.useSearch();
  const { t } = useI18n();
  const { permissions } = useAdminShell();
  const navigate = useNavigate();
  const mayReview = from === "screening" && permissions.includes("listings:review");
  const [asking, setAsking] = useState<Next | null>(null);
  const [busy, setBusy] = useState(false);
  const [problem, setProblem] = useState<MessageKey | null>(null);
  const done = () =>
    void (from === "screening"
      ? navigate({ to: "/admin/screening", search: { open: listingId } })
      : navigate({ to: "/admin/listings/$listingId", params: { listingId } }));
  const decide = async (guard: GuardFn) => {
    if (asking === null) return;
    const next = asking;
    setBusy(true);
    setProblem(null);
    try {
      await guard(() => decideListing(listingId, next));
    } catch (error) {
      setBusy(false);
      setAsking(null);
      const abort = stepUpAbortKey(error);
      // Cancelled: nothing ran, nothing said. No factor: the hint. Else the door's refusal.
      if (abort === null) return;
      console.error("[screening] decision failed", error);
      setProblem(abort ?? "common.error");
      return;
    }
    setBusy(false);
    setAsking(null);
    void navigate({ to: "/admin/screening", search: { decided: next } });
  };
  return (
    <StepUpGate>
      {(guard) => (
        <>
          <EditWizard
            listingId={listingId}
            actor="admin"
            guard={guard}
            onDone={done}
            onDecide={mayReview ? (next) => setAsking(next) : null}
          />
          {problem !== null ? (
            <p
              role="alert"
              data-testid="post-edit-decide-problem"
              className="mx-auto max-w-3xl px-3 text-sm text-destructive md:px-6"
            >
              {t(problem)}
            </p>
          ) : null}
          <AlertDialog
            open={asking !== null}
            onOpenChange={(open) => {
              if (!open && !busy) setAsking(null);
            }}
          >
            <AlertDialogContent data-testid="post-edit-confirm">
              <AlertDialogTitle>
                {asking === "rejected"
                  ? t("admin.screening.confirmReject")
                  : t("admin.screening.confirmApprove")}
              </AlertDialogTitle>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={busy} className="min-h-11">
                  {t("common.cancel")}
                </AlertDialogCancel>
                <Button
                  type="button"
                  variant={asking === "rejected" ? "destructive" : "default"}
                  className="min-h-11"
                  data-testid="post-edit-confirm-go"
                  disabled={busy}
                  onClick={() => void decide(guard)}
                >
                  {asking === "rejected"
                    ? t("admin.screening.reject")
                    : t("admin.screening.approve")}
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}
    </StepUpGate>
  );
}
