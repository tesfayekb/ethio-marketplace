import { pageHead } from "@/lib/page-head";
import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useLocation, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { LoadFailedHere } from "@/components/shell/on-demand-notice";
import { completeEmailVerification } from "@/features/auth/auth-service";
import { landAfterSignIn } from "@/features/legal/use-legal-gate";
import { useI18n } from "@/i18n";
import { safeReturnPath } from "@/lib/return-path";

export const Route = createFileRoute("/auth_/callback")({
  head: () => pageHead("head.site.pattern.title", "head.authCallback.description", {
    meta: [
      { title: "Confirm your email — ethio.com" },
      { name: "description", content: "Finish confirming your ethio.com account." },
      { property: "og:title", content: "Confirm your email — ethio.com" },
      { property: "og:description", content: "Finish confirming your ethio.com account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }, "head.authCallback.title"),
  component: AuthCallback,
});

const primaryButtonClass =
  "inline-flex min-h-11 w-full items-center justify-center rounded-md bg-primary px-4 text-sm " +
  "font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60";

function AuthCallback() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const client = useQueryClient();
  /**
   * "checking" until the landing URL has been processed and a session re-checked.
   * "confirmed"  — verification succeeded AND/OR a session exists here.
   * "noSession"  — nothing conclusive: no error param, but no session in this
   *                browser (link likely opened elsewhere). NOT a bad link.
   * "failed"     — the URL carried a real error param and no session exists.
   * "unavailable" — the sign-in code did not load (INC-914): the link may be good.
   */
  const [status, setStatus] = useState<
    "checking" | "confirmed" | "noSession" | "failed" | "unavailable"
  >("checking");
  /**
   * INC-224 — WHERE THIS LANDING GOES NEXT. The Google door put the seller's
   * intended path in this URL's own `return` parameter (see `oauthRedirectUrl`),
   * and it is judged HERE by the shared same-origin rule: anything else is `/`.
   * Read once, from the landing URL, before any navigation rewrites it.
   * The router's location is read because the server render has it too
   * (INC-894: reading `window` there threw on every server render).
   */
  const searchStr = useLocation({ select: (location) => location.searchStr });
  const [target] = useState(() => safeReturnPath(new URLSearchParams(searchStr).get("return")));

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      const result = await completeEmailVerification();
      if (cancelled) return;
      // "invalid or expired" requires a genuine error param AND no session.
      // INC-914 (Foundations turn 34c) — the sign-in code did not load: neither confirmed nor a dead link.
      const settled = result.ok
        ? "confirmed"
        : "unavailable" in result
          ? "unavailable"
          : result.hadError
            ? "failed"
            : "noSession";
      setStatus(settled);
      // A session AND a destination: there is nothing to confirm by hand.
      if (settled === "confirmed" && target !== "/") {
        // INC-530 — by `href`: the return path's query string stays a query string.
        void landAfterSignIn({ navigate, href: target, replace: true, client });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [navigate, target, client]);

  if (status === "checking") {
    return (
      <main className="mx-auto w-full max-w-sm px-4 py-10">
        <p className="text-sm text-muted-foreground">{t("auth.checking")}</p>
      </main>
    );
  }

  if (status === "confirmed") {
    return (
      <main className="mx-auto w-full max-w-sm px-4 py-10">
        <h1 className="text-xl font-semibold text-foreground">{t("auth.confirmedTitle")}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{t("auth.confirmedBody")}</p>
        <button
          type="button"
          onClick={() => void landAfterSignIn({ navigate, href: target, client })}
          className={`${primaryButtonClass} mt-6`}
        >
          {t("auth.continue")}
        </button>
      </main>
    );
  }

  if (status === "unavailable") {
    return (
      <main className="mx-auto w-full max-w-sm px-4 py-10">
        <LoadFailedHere testid="auth-callback-load-failed" refreshTestid="auth-callback-refresh" />
      </main>
    );
  }

  if (status === "noSession") {
    return (
      <main className="mx-auto w-full max-w-sm px-4 py-10">
        <h1 className="text-xl font-semibold text-foreground">{t("auth.noSessionTitle")}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{t("auth.noSessionBody")}</p>
        <button
          type="button"
          onClick={() => void navigate({ to: "/auth", search: {} })}
          className={`${primaryButtonClass} mt-6`}
        >
          {t("auth.backToSignIn")}
        </button>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-sm px-4 py-10">
      <h1 className="text-xl font-semibold text-foreground">{t("auth.linkInvalid")}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{t("auth.linkInvalidBody")}</p>

      <button
        type="button"
        onClick={() => void navigate({ to: "/auth", search: {} })}
        className={`${primaryButtonClass} mt-6`}
      >
        {t("auth.backToSignIn")}
      </button>
    </main>
  );
}
