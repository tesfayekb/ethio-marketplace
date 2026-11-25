import { useState } from "react";

import { LoadFailedHere } from "@/components/shell/on-demand-notice";
import { ActionMessage } from "@/components/ui/action-message";
import { useI18n } from "@/i18n";
import type { MessageKey } from "@/i18n/types";
import { DOOR_REFUSED_KEY } from "@/lib/door-refused-key";
import { errorText } from "@/lib/error-text";
import { loadOnce } from "@/lib/load-once";
import { logOnDemandFailure, refreshPage } from "@/lib/on-demand-failure";
import { resilientLazy } from "@/lib/resilient-lazy";
import { FailureNotice } from "./failure-notice";
import { failureKind, isRetryable, loadFailureReader } from "./failure-reason";
import { VIEW_AS_BAR_CLASS } from "./view-as-bar-look";

const SERVICE_LABEL = "the impersonation service";
const SERVICE = loadOnce(() => import("@/features/admin/impersonation/impersonation-service"));
/** D39 — End now's words (END_REFUSALS) arrive on demand with the service, off the first download. */
const WORDS = loadOnce(() => import("@/features/admin/impersonation/impersonation-end-refusals"));

type Outcome = "idle" | "ending" | "ended" | "none" | "loadFailed" | "refused" | "unreached";

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
  const [failure, setFailure] = useState<{ error: unknown; key: MessageKey } | null>(null);

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
      console.error("[client-error] impersonation end:", errorText(error));
      // D39 — a network or server failure offers Retry (End now again); a refusal says why. The
      // failure's reader arrives on demand (INC-864); if it cannot, the error's own shape decides.
      await loadFailureReader().catch((loadError: unknown) => {
        logOnDemandFailure("reader-failure", loadError);
      });
      if (isRetryable(failureKind(error).kind)) {
        setFailure({ error, key: DOOR_REFUSED_KEY });
        setOutcome("unreached");
        return;
      }
      let key: MessageKey | null = DOOR_REFUSED_KEY;
      try {
        key = (await WORDS.load()).endRefusalKey(error);
      } catch (loadError) {
        logOnDemandFailure(SERVICE_LABEL, loadError);
      }
      if (key === "impersonation.noneActive") {
        setOutcome("none");
        return;
      }
      setFailure({ error, key: key ?? DOOR_REFUSED_KEY });
      setOutcome("refused");
    }
  }

  if (outcome === "ended") return null;

  return (
    <div data-testid="impersonation-notice" role="status" className={VIEW_AS_BAR_CLASS}>
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
            text={t(failure?.key ?? DOOR_REFUSED_KEY)}
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
      ) : outcome === "unreached" ? (
        <FailureNotice
          error={failure?.error}
          testid="impersonation-notice-failed"
          retryTestid="impersonation-notice-retry"
          onRetry={() => void endNow()}
          size="line"
          className={ON_BAR}
        />
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
