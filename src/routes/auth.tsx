import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";

import { useAuth } from "@/features/auth/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { useI18n } from "@/i18n";
import type { MessageKey } from "@/i18n";

/**
 * BUG 2b/2c: the view lives in the URL, never in hidden local state.
 * Plain /auth is ALWAYS the sign-in form.
 */
type AuthView = "sign-up" | "check-email";

const RESEND_COOLDOWN_SECONDS = 60;
const MAX_RESENDS_PER_VISIT = 3;

/** D-004: the resend target is only ever the email captured at sign-up. */
const PENDING_EMAIL_KEY = "ethio.auth.pendingEmail";

export const Route = createFileRoute("/auth")({
  validateSearch: (search: Record<string, unknown>): { view?: AuthView } => ({
    view:
      search.view === "check-email"
        ? "check-email"
        : search.view === "sign-up"
          ? "sign-up"
          : undefined,
  }),
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

const secondaryButtonClass =
  "min-h-11 w-full rounded-md border border-input px-4 text-sm font-medium text-foreground " +
  "hover:bg-accent disabled:opacity-60";

function AuthScreen() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const { view } = Route.useSearch();
  const { signIn, signUp, resendConfirmation } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [busy, setBusy] = useState(false);
  const [errorKey, setErrorKey] = useState<MessageKey | null>(null);
  const [canResend, setCanResend] = useState(false);
  const [resendSent, setResendSent] = useState(false);

  // INC-005a: client-side throttle. Supabase's own limit remains the backstop.
  const [cooldown, setCooldown] = useState(0);
  const [resendCount, setResendCount] = useState(0);
  // INC-005c: same-browser confirmation while this screen is open.
  const [confirmed, setConfirmed] = useState(false);
  // D-004: read-only, session-scoped sign-up email.
  const [pendingEmail, setPendingEmail] = useState<string | null>(null);

  const onCheckEmail = view === "check-email";
  const isSignIn = view !== "sign-up";

  useEffect(() => {
    if (!onCheckEmail) return;
    setPendingEmail(window.sessionStorage.getItem(PENDING_EMAIL_KEY));
  }, [onCheckEmail]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const timer = window.setTimeout(() => setCooldown((s) => s - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [cooldown]);

  /**
   * INC-005 completion: local detection mechanisms while the check-email view
   * is shown — auth state change, focus/visibility recheck, a 5s poll, and a
   * pageshow listener for bfcache restores. Every recheck goes through
   * `hasSessionRehydrating`, which repairs a stale in-memory client on iOS.
   * No server-side "is this email confirmed" lookup (enumeration protection).
   */
  const onCheckEmailRef = useRef(onCheckEmail);
  onCheckEmailRef.current = onCheckEmail;
  useEffect(() => {
    if (!onCheckEmail) return;
    let active = true;

    const markConfirmed = () => {
      if (!active) return;
      setConfirmed(true);
      window.sessionStorage.removeItem(PENDING_EMAIL_KEY);
    };

    const recheck = async () => {
      if (await hasSessionRehydrating()) markConfirmed();
    };

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session && onCheckEmailRef.current) markConfirmed();
    });

    const onFocus = () => {
      if (document.visibilityState === "visible") void recheck();
    };
    const onPageShow = () => void recheck();
    window.addEventListener("focus", onFocus);
    document.addEventListener("visibilitychange", onFocus);
    window.addEventListener("pageshow", onPageShow);

    const poll = window.setInterval(() => {
      if (document.visibilityState === "visible") void recheck();
    }, 5000);

    void recheck();

    return () => {
      active = false;
      data.subscription.unsubscribe();
      window.removeEventListener("focus", onFocus);
      document.removeEventListener("visibilitychange", onFocus);
      window.removeEventListener("pageshow", onPageShow);
      window.clearInterval(poll);
    };
  }, [onCheckEmail]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorKey(null);
    setResendSent(false);
    setCanResend(false);

    if (!email.trim() || !password) {
      setErrorKey("auth.errorMissingFields");
      return;
    }

    const address = email.trim();
    setBusy(true);
    const result = isSignIn
      ? await signIn({ email: address, password })
      : await signUp({ email: address, password });
    setBusy(false);

    if (!result.ok) {
      setErrorKey(result.errorKey);
      setCanResend(Boolean(result.emailNotConfirmed));
      return;
    }

    if (!isSignIn) {
      window.sessionStorage.setItem(PENDING_EMAIL_KEY, address);
      void navigate({ to: "/auth", search: { view: "check-email" } });
      return;
    }
    void navigate({ to: "/" });
  }

  /** Resends to `address` only: the form's own email, or the stored sign-up email. */
  async function handleResend(address: string) {
    setErrorKey(null);
    setResendSent(false);
    if (!address) {
      setErrorKey("auth.errorMissingFields");
      return;
    }
    if (cooldown > 0 || resendCount >= MAX_RESENDS_PER_VISIT) return;
    setBusy(true);
    const result = await resendConfirmation(address);
    setBusy(false);
    if (result.ok) {
      setResendSent(true);
      setResendCount((n) => n + 1);
      setCooldown(RESEND_COOLDOWN_SECONDS);
    } else {
      setErrorKey(result.errorKey);
    }
  }

  if (onCheckEmail && confirmed) {
    return (
      <main className="mx-auto w-full max-w-sm px-4 py-10">
        <h1 className="text-xl font-semibold text-foreground">{t("auth.confirmedInline")}</h1>
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

  if (onCheckEmail) {
    const limitReached = resendCount >= MAX_RESENDS_PER_VISIT;
    const resendLabel = busy
      ? t("auth.working")
      : cooldown > 0
        ? t("auth.resendCooldown").replace("{s}", String(cooldown))
        : t("auth.resend");

    return (
      <main className="mx-auto w-full max-w-sm px-4 py-10">
        <h1 className="text-xl font-semibold text-foreground">{t("auth.checkEmail")}</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {pendingEmail
            ? t("auth.checkEmailSentTo").replace("{email}", pendingEmail)
            : t("auth.checkEmailBody")}
        </p>

        {errorKey ? (
          <p role="alert" className="mt-4 text-sm text-destructive">
            {t(errorKey)}
          </p>
        ) : null}
        {/* INC-005b: neutral wording — never reveals whether the account exists
            or is already confirmed. */}
        {resendSent ? (
          <p role="status" className="mt-4 text-sm text-muted-foreground">
            {t("auth.resendNeutral")}
          </p>
        ) : null}
        {limitReached ? (
          <p role="status" className="mt-4 text-sm text-muted-foreground">
            {t("auth.resendLimitReached")}
          </p>
        ) : null}

        {/* D-005: exactly one primary resend + one secondary sign-in action;
            cold load (no stored email) offers only the back-to-sign-in path. */}
        {pendingEmail ? (
          <button
            type="button"
            onClick={() => void handleResend(pendingEmail)}
            disabled={busy || cooldown > 0 || limitReached}
            className={`${primaryButtonClass} mt-6`}
          >
            {resendLabel}
          </button>
        ) : null}

        {pendingEmail ? (
          <button
            type="button"
            onClick={() => void navigate({ to: "/auth", search: {} })}
            className={`${secondaryButtonClass} mt-4`}
          >
            {t("auth.alreadyConfirmedSignIn")}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => void navigate({ to: "/auth", search: {} })}
            className={`${secondaryButtonClass} mt-6`}
          >
            {t("auth.backToSignIn")}
          </button>
        )}
      </main>
    );
  }

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
            {t("auth.resendNeutral")}
          </p>
        ) : null}
        {canResend ? (
          <button
            type="button"
            onClick={() => void handleResend(email.trim())}
            disabled={busy || cooldown > 0 || resendCount >= MAX_RESENDS_PER_VISIT}
            className="min-h-11 rounded-md border border-input px-4 text-sm text-foreground hover:bg-accent disabled:opacity-60"
          >
            {cooldown > 0
              ? t("auth.resendCooldown").replace("{s}", String(cooldown))
              : t("auth.resend")}
          </button>
        ) : null}

        <button type="submit" disabled={busy} className={primaryButtonClass}>
          {busy ? t("auth.working") : isSignIn ? t("auth.signInButton") : t("auth.signUpButton")}
        </button>
      </form>

      <button
        type="button"
        onClick={() => {
          setErrorKey(null);
          setCanResend(false);
          setResendSent(false);
          void navigate({ to: "/auth", search: isSignIn ? { view: "sign-up" } : {} });
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
