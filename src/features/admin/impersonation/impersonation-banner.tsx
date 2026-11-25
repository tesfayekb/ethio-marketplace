import { Link } from "@tanstack/react-router";

import { VIEW_AS_BAR_CLASS } from "@/components/shell/view-as-bar-look";
import { FailureNotice } from "@/components/shell/failure-notice";
import { isRetryable, useFailureKind } from "@/components/shell/failure-reason";
import { ActionMessage } from "@/components/ui/action-message";
import { useI18n } from "@/i18n";

import { endRefusalKey } from "./impersonation-end-refusals";
import { useActiveImpersonation, useCountdown, useEndImpersonation } from "./use-impersonation";

/**
 * U3 / DEC-016 — THE GLOBAL IMPERSONATION BANNER.
 *
 * Mounted once by the app shell for staff only (DEC-372: the gate,
 * src/components/shell/impersonation-gate.ts; this module, its hook and its
 * service arrive on demand), so it is present on EVERY page while a session
 * is open. It disappears by itself when the 15-minute box closes (the probe
 * re-reads on a 30s poll and on every route change) — there is no
 * client-side clock that can keep it alive past the server's word. If this
 * module cannot load, the shell shows ImpersonationNotice in its place.
 */
export function ImpersonationBanner() {
  const { t } = useI18n();
  const { data: session } = useActiveImpersonation(true);
  const end = useEndImpersonation();
  const countdown = useCountdown(session?.expiresAt);
  const endKind = useFailureKind(end.error).kind;

  if (!session || countdown === null) return null;
  // D39 — a failed End now says why: a refusal in the door's words (END_REFUSALS); a network or
  // server failure through the one notice, whose Retry ends the session again.
  const unreached = end.error !== null && isRetryable(endKind);
  const endFailed = end.error !== null && !unreached ? endRefusalKey(end.error) : null;

  return (
    <div data-testid="impersonation-banner" className={VIEW_AS_BAR_CLASS}>
      {/* The bar's words are its live region; End now's failure carries its own (D39). */}
      <p role="status" aria-live="polite" className="min-w-0 break-words text-sm font-medium">
        {t("impersonation.banner")
          .replace("{name}", session.targetName ?? t("impersonation.unknownTarget"))
          .replace("{time}", countdown)}
      </p>
      <span className="flex flex-wrap items-center gap-2">
        <Link
          to="/admin/impersonation/$sessionId"
          params={{ sessionId: session.id }}
          data-testid="impersonation-banner-open"
          className="inline-flex min-h-11 items-center rounded-md px-3 text-sm font-medium underline underline-offset-4"
        >
          {t("impersonation.open")}
        </Link>
        <button
          type="button"
          data-testid="impersonation-banner-end"
          disabled={end.isPending}
          onClick={() => end.mutate(session.id)}
          className="inline-flex min-h-11 items-center rounded-md bg-background px-3 text-sm font-medium text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          {t("impersonation.endNow")}
        </button>
        {unreached ? (
          <FailureNotice
            error={end.error}
            testid="impersonation-banner-end-error"
            onRetry={() => end.mutate(session.id)}
            size="line"
            className="text-destructive-foreground"
          />
        ) : null}
        {endFailed ? (
          <ActionMessage
            tone="error"
            testid="impersonation-banner-end-error"
            className="text-destructive-foreground"
            text={t(endFailed)}
          />
        ) : null}
      </span>
    </div>
  );
}

export default ImpersonationBanner;
