import { useState } from "react";

import { LoadFailedHere } from "@/components/shell/on-demand-notice";
import { ActionMessage } from "@/components/ui/action-message";
import { useI18n } from "@/i18n";
import { DOOR_REFUSED_KEY } from "@/lib/door-codes";
import { errorText } from "@/lib/error-text";
import { loadOnce } from "@/lib/load-once";
import { logOnDemandFailure, refreshPage } from "@/lib/on-demand-failure";
import { resilientLazy } from "@/lib/resilient-lazy";

const SERVICE_LABEL = "the impersonation service";
const SERVICE = loadOnce(() => import("@/features/admin/impersonation/impersonation-service"));

type Outcome = "idle" | "ending" | "ended" | "none" | "loadFailed" | "refused";

const ON_BAR = "text-destructive-foreground";

/**
 * DEC-372 — what staff see when the impersonation banner's module could not download (the
 * fallback of LazyImpersonationBanner, below; the shell mounts it for staff only, through the gate
 * in impersonation-gate.ts). The shell cannot know whether a view-as session is open, so the
 * notice says one may be, and offers End now: the service arrives on demand, the caller's active
 * session is read and ended. No session → it says so. A failed download says so in place
 * (LoadFailedHere: the words and Refresh page); a failed call says so in the one refusal key and
 * offers the same cure (refreshPage). It arrives with its words, so its role is its own.
 */
export function ImpersonationNotice() {
  const { t } = useI18n();
  const [outcome, setOutcome] = useState<Outcome>("idle");

  async function endNow() {
    setOutcome("ending");
    let service: Awaited<ReturnType<typeof SERVICE.load>>;
    try {
      service = await SERVICE.load();
    } catch (error) {
      logOnDemandFailure(SERVICE_LABEL, error);
      setOutcome("loadFailed");
      return;
    }
    try {
      const session = await service.getActiveImpersonation();
      if (session === null) {
        setOutcome("none");
        return;
      }
      await service.endImpersonation(session.id);
      setOutcome("ended");
    } catch (error) {
      console.error(`[client-error] impersonation end: ${errorText(error)}`);
      setOutcome("refused");
    }
  }

  if (outcome === "ended") return null;

  return (
    <div
      data-testid="impersonation-notice"
      role="status"
      className="fixed inset-x-0 top-0 z-[60] flex min-w-0 flex-wrap items-center justify-center gap-x-3 gap-y-1 bg-destructive px-3 py-2 text-destructive-foreground"
    >
      <p className="min-w-0 break-words text-sm font-medium">
        {outcome === "none" ? t("impersonation.noneActive") : t("impersonation.mayBeActive")}
      </p>
      {outcome === "loadFailed" ? (
        <LoadFailedHere
          testid="impersonation-notice-failed"
          refreshTestid="impersonation-notice-refresh"
          className={`flex-row ${ON_BAR}`}
        />
      ) : outcome === "refused" ? (
        <span className="flex flex-wrap items-center gap-2">
          <ActionMessage
            tone="error"
            testid="impersonation-notice-failed"
            className={ON_BAR}
            text={t(DOOR_REFUSED_KEY)}
          />
          <button
            type="button"
            data-testid="impersonation-notice-refresh"
            onClick={refreshPage}
            className="inline-flex min-h-11 items-center rounded-md bg-background px-3 text-sm font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {t("common.refreshPage")}
          </button>
        </span>
      ) : outcome === "none" ? null : (
        <button
          type="button"
          data-testid="impersonation-banner-end"
          disabled={outcome === "ending"}
          onClick={() => void endNow()}
          className="inline-flex min-h-11 items-center rounded-md bg-background px-3 text-sm font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {t("impersonation.endNow")}
        </button>
      )}
    </div>
  );
}

/**
 * DEC-372 (INC-1116) — the impersonation banner, its hook and its service, on demand: the shell
 * draws this for staff only, and nothing while it downloads; if it cannot download, the notice
 * above stands in its place.
 */
export const LazyImpersonationBanner = resilientLazy(
  () =>
    import("@/features/admin/impersonation/impersonation-banner").then(
      (module) => module.ImpersonationBanner,
    ),
  "the impersonation banner",
  ImpersonationNotice,
  { inPlace: true },
);
