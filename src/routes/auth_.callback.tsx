import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { completeEmailVerification } from "@/features/auth/auth-service";
import { useI18n } from "@/i18n";
import { safeReturnPath } from "@/lib/return-path";

export const Route = createFileRoute("/auth_/callback")({
  head: () => ({
    meta: [
      { title: "Confirm your email — ethio.com" },
      { name: "description", content: "Finish confirming your ethio.com account." },
      { property: "og:title", content: "Confirm your email — ethio.com" },
      { property: "og:description", content: "Finish confirming your ethio.com account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AuthCallback,
});

const primaryButtonClass =
  "inline-flex min-h-11 w-full items-center justify-center rounded-md bg-primary px-4 text-sm " +
  "font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60";

function AuthCallback() {
  const { t } = useI18n();
  const navigate = useNavigate();
  /**
   * "checking" until the landing URL has been processed and a session re-checked.
   * "confirmed"  — verification succeeded AND/OR a session exists here.
   * "noSession"  — nothing conclusive: no error param, but no session in this
   *                browser (link likely opened elsewhere). NOT a bad link.
   * "failed"     — the URL carried a real error param and no session exists.
   */
  const [status, setStatus] = useState<"checking" | "confirmed" | "noSession" | "failed">(
    "checking",
  );
  /**
   * INC-224 — WHERE THIS LANDING GOES NEXT. The Google door put the seller's
   * intended path in this URL's own `return` parameter (see `oauthRedirectUrl`),
   * and it is judged HERE by the shared same-origin rule: anything else is `/`.
   * Read once, from the landing URL, before any navigation rewrites it.
   */
  const [target] = useState(() =>
    safeReturnPath(new URLSearchParams(window.location.search).get("return")),
  );

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      const result = await completeEmailVerification();
      if (cancelled) return;
      // "invalid or expired" requires a genuine error param AND no session.
      const settled = result.ok ? "confirmed" : result.hadError ? "failed" : "noSession";
      setStatus(settled);
      // A session AND a destination: there is nothing to confirm by hand.
      if (settled === "confirmed" && target !== "/") {
        void navigate({ to: target, replace: true });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [navigate, target]);

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
          onClick={() => void navigate({ to: target })}
          className={`${primaryButtonClass} mt-6`}
        >
          {t("auth.continue")}
        </button>
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
