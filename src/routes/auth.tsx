import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";

import { useAuth } from "@/features/auth/use-auth";
import type { AuthMode } from "@/features/auth/types";
import { useI18n } from "@/i18n";
import type { MessageKey } from "@/i18n";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in — ethio.com" },
      { name: "description", content: "Sign in or create your free ethio.com account." },
      { property: "og:title", content: "Sign in — ethio.com" },
      {
        property: "og:description",
        content: "Sign in or create your free ethio.com account.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AuthScreen,
});

const fieldClass =
  "min-h-11 w-full rounded-md border border-input bg-background px-3 text-base text-foreground " +
  "placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

const primaryButtonClass =
  "inline-flex min-h-11 w-full items-center justify-center rounded-md bg-primary px-4 text-sm " +
  "font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60";

function AuthScreen() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const { signIn, signUp, resendConfirmation } = useAuth();

  const [mode, setMode] = useState<AuthMode>("signIn");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [errorKey, setErrorKey] = useState<MessageKey | null>(null);
  const [canResend, setCanResend] = useState(false);
  const [resendSent, setResendSent] = useState(false);
  const [awaitingConfirmation, setAwaitingConfirmation] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorKey(null);
    setResendSent(false);
    setCanResend(false);

    if (!email.trim() || !password) {
      setErrorKey("auth.errorMissingFields");
      return;
    }

    setBusy(true);
    const result =
      mode === "signIn"
        ? await signIn({ email: email.trim(), password })
        : await signUp({ email: email.trim(), password });
    setBusy(false);

    if (!result.ok) {
      setErrorKey(result.errorKey);
      setCanResend(Boolean(result.emailNotConfirmed));
      return;
    }

    if (mode === "signUp") {
      setAwaitingConfirmation(true);
      return;
    }
    void navigate({ to: "/" });
  }

  async function handleResend() {
    setErrorKey(null);
    setResendSent(false);
    setBusy(true);
    const result = await resendConfirmation(email.trim());
    setBusy(false);
    if (result.ok) setResendSent(true);
    else setErrorKey(result.errorKey);
  }

  if (awaitingConfirmation) {
    return (
      <main className="mx-auto w-full max-w-sm px-4 py-10">
        <h1 className="text-xl font-semibold text-foreground">{t("auth.checkEmail")}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{t("auth.checkEmailBody")}</p>
        {errorKey ? (
          <p role="alert" className="mt-4 text-sm text-destructive">
            {t(errorKey)}
          </p>
        ) : null}
        {resendSent ? (
          <p role="status" className="mt-4 text-sm text-muted-foreground">
            {t("auth.resendSent")}
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

  const isSignIn = mode === "signIn";

  return (
    <main className="mx-auto w-full max-w-sm px-4 py-10">
      <h1 className="text-xl font-semibold text-foreground">
        {isSignIn ? t("auth.signIn") : t("auth.createAccount")}
      </h1>

      <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <label htmlFor="auth-email" className="text-sm font-medium text-foreground">
            {t("auth.email")}
          </label>
          <input
            id="auth-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            autoFocus
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("auth.emailPlaceholder")}
            className={fieldClass}
          />
        </div>

        <div className="flex flex-col gap-1">
          <label htmlFor="auth-password" className="text-sm font-medium text-foreground">
            {t("auth.password")}
          </label>
          <div className="flex items-center gap-2">
            <input
              id="auth-password"
              name="password"
              type={showPassword ? "text" : "password"}
              autoComplete={isSignIn ? "current-password" : "new-password"}
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
        {resendSent ? (
          <p role="status" className="text-sm text-muted-foreground">
            {t("auth.resendSent")}
          </p>
        ) : null}
        {canResend ? (
          <button
            type="button"
            onClick={handleResend}
            disabled={busy}
            className="min-h-11 rounded-md border border-input px-4 text-sm text-foreground hover:bg-accent disabled:opacity-60"
          >
            {t("auth.resend")}
          </button>
        ) : null}

        <button type="submit" disabled={busy} className={primaryButtonClass}>
          {busy ? t("auth.working") : isSignIn ? t("auth.signInButton") : t("auth.signUpButton")}
        </button>
      </form>

      <button
        type="button"
        onClick={() => {
          setMode(isSignIn ? "signUp" : "signIn");
          setErrorKey(null);
          setCanResend(false);
          setResendSent(false);
        }}
        className="mt-4 min-h-11 w-full rounded-md text-sm font-medium text-primary underline underline-offset-4"
      >
        {isSignIn ? t("auth.toggleToSignUp") : t("auth.toggleToSignIn")}
      </button>

      {/* Slots only — Google (P1-d) and Telegram (P1-e) doors ship in later tasks. */}
      <section aria-labelledby="auth-providers" className="mt-8 border-t border-border pt-6">
        <h2 id="auth-providers" className="text-xs uppercase text-muted-foreground">
          {t("auth.orContinueWith")}
        </h2>
        <div className="mt-3 flex flex-col gap-2">
          <button
            type="button"
            disabled
            className="min-h-11 w-full rounded-md border border-dashed border-border px-4 text-sm text-muted-foreground"
          >
            {t("auth.googleSlot")}
          </button>
          <button
            type="button"
            disabled
            className="min-h-11 w-full rounded-md border border-dashed border-border px-4 text-sm text-muted-foreground"
          >
            {t("auth.telegramSlot")}
          </button>
        </div>
      </section>
    </main>
  );
}
