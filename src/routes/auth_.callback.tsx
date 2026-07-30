import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { completeEmailVerification, resendConfirmation } from "@/features/auth/auth-service";
import { useI18n } from "@/i18n";
import type { MessageKey } from "@/i18n";

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

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      const result = await completeEmailVerification();
      if (cancelled) return;
      // "invalid or expired" requires a genuine error param AND no session.
      setStatus(result.ok ? "confirmed" : result.hadError ? "failed" : "noSession");
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  async function handleResend() {
    setErrorKey(null);
    setResendSent(false);
    if (!email.trim()) {
      setErrorKey("auth.errorMissingFields");
      return;
    }
    setBusy(true);
    const result = await resendConfirmation(email.trim());
    setBusy(false);
    if (result.ok) setResendSent(true);
    else setErrorKey(result.errorKey);
  }

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
          onClick={() => void navigate({ to: "/" })}
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

      <div className="mt-6 flex flex-col gap-1">
        <label htmlFor="resend-email" className="text-sm font-medium text-foreground">
          {t("auth.resendEmailLabel")}
        </label>
        <input
          id="resend-email"
          type="email"
          inputMode="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t("auth.emailPlaceholder")}
          className="min-h-11 w-full rounded-md border border-input bg-background px-3 text-base text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
        />
      </div>

      {errorKey ? (
        <p role="alert" className="mt-4 text-sm text-destructive">
          {t(errorKey)}
        </p>
      ) : null}
      {resendSent ? (
        <p role="status" className="mt-4 text-sm text-muted-foreground">
          {t("auth.resendNeutral")}
        </p>
      ) : null}

      <button
        type="button"
        onClick={handleResend}
        disabled={busy}
        className={`${primaryButtonClass} mt-6`}
      >
        {busy ? t("auth.working") : t("auth.resend")}
      </button>
    </main>
  );
}
