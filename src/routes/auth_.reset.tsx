import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";

import { completePasswordReset, hasSessionRehydrating } from "@/features/auth/auth-service";
import { useI18n } from "@/i18n";
import type { MessageKey } from "@/i18n";

/**
 * P1-g — the landing page of a password-reset link.
 *
 * The link carries a RECOVERY session (implicit flow: tokens in the URL hash,
 * consumed by detectSessionInUrl). We only ask "is there a session in this
 * browser now?" — via `hasSessionRehydrating`, the same iOS-safe read the
 * check-email view uses (INC-005). No session means the link is spent,
 * tampered with, or was opened in a different browser; that is stated plainly
 * rather than rendered as a form that could never work (law F4).
 */

const MIN_PASSWORD_LENGTH = 8;

export const Route = createFileRoute("/auth_/reset")({
  head: () => ({
    meta: [
      { title: "Reset your password — ethio.com" },
      { name: "description", content: "Choose a new password for your ethio.com account." },
      { property: "og:title", content: "Reset your password — ethio.com" },
      {
        property: "og:description",
        content: "Choose a new password for your ethio.com account.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ResetScreen,
});

const fieldClass =
  "min-h-11 w-full rounded-md border border-input bg-background px-3 text-base text-foreground " +
  "placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

const primaryButtonClass =
  "inline-flex min-h-11 w-full items-center justify-center rounded-md bg-primary px-4 text-sm " +
  "font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60";

const secondaryButtonClass =
  "min-h-11 w-full rounded-md border border-input px-4 text-sm font-medium text-foreground " +
  "hover:bg-accent disabled:opacity-60";

function ResetScreen() {
  const { t } = useI18n();
  const navigate = useNavigate();

  const [checking, setChecking] = useState(true);
  const [hasRecoverySession, setHasRecoverySession] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [errorKey, setErrorKey] = useState<MessageKey | null>(null);

  useEffect(() => {
    let active = true;
    void (async () => {
      // The SDK may still be consuming the URL hash on first paint; one retry
      // covers that without inventing tolerance for a genuinely dead link.
      let signedIn = await hasSessionRehydrating();
      if (!signedIn) {
        await new Promise((resolve) => window.setTimeout(resolve, 600));
        signedIn = await hasSessionRehydrating();
      }
      if (!active) return;
      setHasRecoverySession(signedIn);
      setChecking(false);
    })();
    return () => {
      active = false;
    };
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorKey(null);
    if (password.length < MIN_PASSWORD_LENGTH) {
      setErrorKey("auth.errorPasswordTooShort");
      return;
    }
    setBusy(true);
    const result = await completePasswordReset(password);
    setBusy(false);
    if (!result.ok) {
      setErrorKey(result.errorKey);
      return;
    }
    setPassword("");
    setDone(true);
  }

  if (checking) {
    return (
      <main className="mx-auto w-full max-w-sm px-4 py-10">
        <p className="text-sm text-muted-foreground">{t("auth.checking")}</p>
      </main>
    );
  }

  if (done) {
    return (
      <main className="mx-auto w-full max-w-sm px-4 py-10">
        <h1 className="text-xl font-semibold text-foreground">{t("auth.resetNewTitle")}</h1>
        <p role="status" className="mt-2 text-sm text-muted-foreground">
          {t("auth.resetDone")}
        </p>
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

  if (!hasRecoverySession) {
    return (
      <main className="mx-auto w-full max-w-sm px-4 py-10">
        <h1 className="text-xl font-semibold text-foreground">{t("auth.resetLinkInvalid")}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{t("auth.resetLinkInvalidBody")}</p>
        <button
          type="button"
          onClick={() => void navigate({ to: "/auth", search: { view: "forgot" } })}
          className={`${secondaryButtonClass} mt-6`}
        >
          {t("auth.resetTitle")}
        </button>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-sm px-4 py-10">
      <h1 className="text-xl font-semibold text-foreground">{t("auth.resetNewTitle")}</h1>
      <p className="mt-2 text-sm text-muted-foreground">{t("auth.resetNewBody")}</p>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="reset-password" className="text-sm font-medium text-foreground">
            {t("settings.newPassword")}
          </label>
          <div className="flex items-center gap-2">
            <input
              id="reset-password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              minLength={MIN_PASSWORD_LENGTH}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t("auth.passwordPlaceholder")}
              className={fieldClass}
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              aria-pressed={showPassword}
              className="min-h-11 shrink-0 rounded-md border border-input px-3 text-sm text-muted-foreground hover:bg-accent"
            >
              {showPassword ? t("auth.hidePassword") : t("auth.showPassword")}
            </button>
          </div>
        </div>

        {errorKey ? (
          <p role="alert" className="text-sm text-destructive">
            {t(errorKey)}
          </p>
        ) : null}

        <button type="submit" disabled={busy} className={primaryButtonClass}>
          {busy ? t("auth.working") : t("auth.resetSubmit")}
        </button>
      </form>
    </main>
  );
}
