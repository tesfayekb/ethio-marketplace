import { Link } from "@tanstack/react-router";

import { useI18n } from "@/i18n";

import { useActiveImpersonation, useCountdown, useEndImpersonation } from "./use-impersonation";

/**
 * U3 / DEC-016 — THE GLOBAL IMPERSONATION BANNER.
 *
 * Mounted once by the app shell, so it is present on EVERY page while a
 * session is open. It disappears by itself when the 15-minute box closes
 * (the probe re-reads on a 30s poll and on every route change) — there is no
 * client-side clock that can keep it alive past the server's word.
 */
export function ImpersonationBanner({ enabled }: { enabled: boolean }) {
  const { t } = useI18n();
  const { data: session } = useActiveImpersonation(enabled);
  const end = useEndImpersonation();
  const countdown = useCountdown(session?.expiresAt);

  if (!session || countdown === null) return null;

  return (
    <div
      data-testid="impersonation-banner"
      role="status"
      aria-live="polite"
      className="fixed inset-x-0 top-0 z-[60] flex min-w-0 flex-wrap items-center justify-center gap-x-3 gap-y-1 bg-destructive px-3 py-2 text-destructive-foreground"
    >
      <p className="min-w-0 break-words text-sm font-medium">
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
      </span>
    </div>
  );
}

export default ImpersonationBanner;
