import { pageHead } from "@/lib/page-head";
import { PasswordInput } from "@/components/ui/password-input";
import { passwordPairProblem } from "@/features/auth/password-pair";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";

import {
  hasSessionRehydrating,
  requestPasswordReset,
  signInWithGoogle,
} from "@/features/auth/auth-service";
import { useAuth } from "@/features/auth/use-auth";
import { AgreeToDocument } from "@/features/legal/agree-to-document";
import { legalInForceIds } from "@/features/legal/legal-reader";
import { currentGateKinds, landAfterSignIn } from "@/features/legal/use-legal-gate";
import { errorText } from "@/lib/error-text";
import { safeReturnPath } from "@/lib/return-path";
import { getSupabase, onAuthChange } from "@/lib/supabase-door";
import { PageShell } from "@/components/layout/page-shell";
import { PageCard } from "@/components/shell/page-card";

import { useI18n } from "@/i18n";
import type { MessageKey } from "@/i18n";

/**
 * BUG 2b/2c: the view lives in the URL, never in hidden local state.
 * Plain /auth is ALWAYS the sign-in form.
 * P1-g adds "forgot": the reset REQUEST view (the reset FORM is /auth/reset).
 */
type AuthView = "sign-up" | "check-email" | "forgot";

const RESEND_COOLDOWN_SECONDS = 60;
const MAX_RESENDS_PER_VISIT = 3;

/** D-004: the resend target is only ever the email captured at sign-up. */
const PENDING_EMAIL_KEY = "ethio.auth.pendingEmail";

/**
 * D20 / INC-224 — the return path's rule is the SHARED one in
 * `@/lib/return-path`, because the Google door lands on `/auth/callback` and
 * must judge the same parameter by the same test (B2: one utility per concern).
 */

export const Route = createFileRoute("/auth")({
  validateSearch: (
    search: Record<string, unknown>,
  ): { view?: AuthView; return?: string; reason?: "deactivated" } => ({
    view:
      search.view === "check-email"
        ? "check-email"
        : search.view === "sign-up"
          ? "sign-up"
          : search.view === "forgot"
            ? "forgot"
            : undefined,
    // Kept in the URL so it survives a reload of the sign-in screen itself.
    ...(typeof search["return"] === "string" ? { return: search["return"] } : {}),
    // Bundle 16 turn S3 (D189) — why the person is here: their account was deactivated and signed out.
    ...(search["reason"] === "deactivated" ? { reason: "deactivated" as const } : {}),
  }),

  head: () => pageHead("head.site.pattern.title", "head.auth.description", {
    meta: [
      { name: "robots", content: "noindex" },
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
  }, "auth.signIn"),
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
  const { t, language } = useI18n();
  const navigate = useNavigate();
  const client = useQueryClient();
  const { view, return: returnParam, reason } = Route.useSearch();
  /** Where a successful sign-in of ANY door lands (D20); `/` when unset or unsafe. */
  const afterSignIn = safeReturnPath(returnParam);
  const { signIn, signUp, resendConfirmation } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  /** Bundle 11 turn C4 (D143) — sign-up asks for the password twice. */
  const [passwordAgain, setPasswordAgain] = useState("");
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
  // INC-017: guards against concurrent resend submits (see handleResend).
  const resendInFlightRef = useRef(false);
  // P1-g: the reset request is neutral-always, so this is the only feedback.
  const [resetRequested, setResetRequested] = useState(false);

  const onCheckEmail = view === "check-email";
  const onForgot = view === "forgot";
  const isSignIn = view !== "sign-up";

  // DEC-261 — every door on this screen needs the client: it starts downloading once the screen
  // has painted, so a submit does not wait for it. A failed download first reloads the tab once
  // (src/lib/stale-chunk.ts, INC-640: a tab opened before a Publish asks for old chunk names); a
  // failure that remains is logged here, and each submit asks again and says it failed (INC-915).
  useEffect(() => {
    void getSupabase().catch((error: unknown) =>
      console.warn(`[auth] the client did not load: ${errorText(error)}`),
    );
  }, []);

  /**
   * Bundle 22 turn 32 (D230) — the sign-up form's agreement tick. Create account is drawn closed until it
   * is ticked (D231); never persisted, cleared when the view toggles. The ids in force travel as sign-up
   * metadata for the signup trigger (M21) to record; when the read fails or finds none the sign-up goes
   * without them and the acceptance screen asks after sign-in (the designed behaviour, not an error).
   */
  const [agreed, setAgreed] = useState(false);
  const [agreeTried, setAgreeTried] = useState(false);
  useEffect(() => {
    setAgreed(false);
    setAgreeTried(false);
  }, [view]);
  const inForce = useQuery({
    queryKey: ["legal", "signup-in-force", currentGateKinds()],
    queryFn: () => legalInForceIds(currentGateKinds()),
    enabled: view === "sign-up",
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
  const land = (href: string) => void landAfterSignIn({ navigate, href, client });

  useEffect(() => {
    if (!onCheckEmail) return;
    setPendingEmail(window.sessionStorage.getItem(PENDING_EMAIL_KEY));
  }, [onCheckEmail]);

  /**
   * Sign-in view: never show a sign-in form to someone who already has a
   * session in this browser (INC-005 close). One check on mount.
   */
  useEffect(() => {
    if (onCheckEmail) return;
    let active = true;
    void (async () => {
      if ((await hasSessionRehydrating()) && active)
        void landAfterSignIn({ navigate, href: afterSignIn, client });
    })();
    return () => {
      active = false;
    };
  }, [onCheckEmail, navigate, afterSignIn, client]);

  /** Session-smart: if already signed in, go home instead of to a sign-in form. */
  async function handleAlreadyConfirmed() {
    setBusy(true);
    const signedIn = await hasSessionRehydrating();
    setBusy(false);
    if (signedIn) {
      window.sessionStorage.removeItem(PENDING_EMAIL_KEY);
      land(afterSignIn);
      return;
    }
    void navigate({ to: "/auth", search: {} });
  }

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

    // DEC-261 — the client's auth events through its door.
    const subscription = onAuthChange((_event, session) => {
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
      subscription.unsubscribe();
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

    if (!isSignIn && !agreed) {
      setAgreeTried(true);
      return;
    }
    if (!email.trim() || !password) {
      setErrorKey("auth.errorMissingFields");
      return;
    }
    if (!isSignIn) {
      const mismatch = passwordPairProblem(password, passwordAgain);
      if (mismatch !== null) {
        setErrorKey(mismatch);
        return;
      }
    }

    const address = email.trim();
    setBusy(true);
    // INC-915 — busy ends in a finally: no throw leaves the form disabled.
    let result: Awaited<ReturnType<typeof signIn>>;
    try {
      result = isSignIn
        ? await signIn({ email: address, password })
        : await signUp(
            { email: address, password },
            inForce.data && inForce.data.length > 0
              ? { versionIds: inForce.data, language }
              : undefined,
          );
    } finally {
      setBusy(false);
    }

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
    // D20 — back to the page that asked for the session. INC-530 — by `href`, so a
    // return path's query string stays a query string (D119's /post?category=…).
    land(afterSignIn);
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
    // INC-017: one in-flight resend at a time — a double-click must not start two
    // cooldowns or consume two attempts. The ref is checked/set synchronously
    // because React state updates are not visible to a second click in the same tick.
    if (resendInFlightRef.current) return;
    resendInFlightRef.current = true;

    // INC-017 (operator ruling 2026-08-02): the cooldown and the per-visit counter
    // engage when the request is INITIATED, not when it succeeds. The throttle
    // protects the send endpoint, and a refused request (e.g. Supabase's ~60s
    // per-address 429) is exactly when a user hammers the button.
    setResendCount((n) => n + 1);
    setCooldown(RESEND_COOLDOWN_SECONDS);

    setBusy(true);
    // INC-915 — busy and the in-flight lock end in a finally: no throw leaves them engaged.
    let result: Awaited<ReturnType<typeof resendConfirmation>>;
    try {
      result = await resendConfirmation(address);
    } finally {
      setBusy(false);
      resendInFlightRef.current = false;
    }
    if (result.ok) {
      setResendSent(true);
    } else {
      // The error still renders, alongside the now-active cooldown.
      setErrorKey(result.errorKey);
    }
  }

  /**
   * Google door. INC-017 precedent: the in-flight lock engages on INITIATION,
   * before the request leaves, so a double-tap cannot start two OAuth flows.
   * On success the browser navigates away; `busy` stays engaged deliberately.
   */
  async function handleGoogle() {
    if (busy) return;
    setErrorKey(null);
    setResendSent(false);
    setCanResend(false);
    setBusy(true);
    // INC-224 — the Google door carries the same return path the email door does.
    let result: Awaited<ReturnType<typeof signInWithGoogle>> | undefined;
    try {
      result = await signInWithGoogle(afterSignIn);
    } finally {
      // INC-915 — only a door that answered success keeps busy on (the browser navigates away).
      if (result === undefined || !result.ok) setBusy(false);
    }

    if (!result.ok) setErrorKey(result.errorKey);
  }

  /**
   * P1-g reset request (ruling R4). The answer is NEUTRAL-ALWAYS: the same
   * message renders whether or not an account exists, so this screen cannot be
   * used to enumerate addresses (the B-3 guard). The in-flight lock engages on
   * INITIATION, per the INC-017 precedent. INC-915 — a request that never left
   * the browser (the sign-in code did not load) is not "on its way": the screen
   * says it failed and gives back the try and the cooldown it took. That says
   * nothing about whether an account exists, so B-3 holds.
   */
  async function handleForgotSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorKey(null);
    const address = email.trim();
    if (!address) {
      setErrorKey("auth.errorMissingFields");
      return;
    }
    if (busy) return;
    // INC-025: the resubmit carries the same throttle apparatus as the sign-up
    // resend — one shared cooldown timer, one shared per-visit cap, both engaged
    // on INITIATION (INC-017 rule), plus the synchronous in-flight guard so a
    // double-click cannot start two cooldowns. The answer itself is unchanged:
    // still neutral-always (ruling R4 / guard B-3).
    if (cooldown > 0 || resendCount >= MAX_RESENDS_PER_VISIT) return;
    if (resendInFlightRef.current) return;
    resendInFlightRef.current = true;
    setResendCount((n) => n + 1);
    setCooldown(RESEND_COOLDOWN_SECONDS);

    setBusy(true);
    // INC-915 — busy and the in-flight lock end in a finally: no throw leaves them engaged.
    let result: Awaited<ReturnType<typeof requestPasswordReset>>;
    try {
      result = await requestPasswordReset(address);
    } finally {
      setBusy(false);
      resendInFlightRef.current = false;
    }
    if (!result.ok) {
      setResendCount((n) => Math.max(0, n - 1));
      setCooldown(0);
      setErrorKey(result.errorKey);
      return;
    }
    setResetRequested(true);
  }

  const resetLimitReached = resendCount >= MAX_RESENDS_PER_VISIT;

  if (onForgot) {
    return (
      <PageShell as="main" width="narrow">
        <PageCard>
          <h1 className="text-xl font-semibold text-foreground">{t("auth.resetTitle")}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{t("auth.resetBody")}</p>

          <form onSubmit={handleForgotSubmit} className="mt-6 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="reset-email" className="text-sm font-medium text-foreground">
                {t("auth.email")}
              </label>
              <input
                id="reset-email"
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("auth.emailPlaceholder")}
                className={fieldClass}
              />
            </div>

            {errorKey ? (
              <p role="alert" data-testid="auth-reset-error" className="text-sm text-destructive">
                {t(errorKey)}
              </p>
            ) : null}
            {resetRequested ? (
              <p role="status" className="text-sm text-muted-foreground">
                {t("auth.resetNeutral")}
              </p>
            ) : null}
            {resetLimitReached ? (
              <p role="status" className="text-sm text-muted-foreground">
                {t("auth.resetLimit")}
              </p>
            ) : null}

            <button
              type="submit"
              disabled={busy || cooldown > 0 || resetLimitReached}
              className={primaryButtonClass}
            >
              {busy
                ? t("auth.working")
                : cooldown > 0
                  ? t("auth.resendCooldown").replace("{s}", String(cooldown))
                  : t("auth.resetSend")}
            </button>
          </form>

          <button
            type="button"
            onClick={() => void navigate({ to: "/auth", search: {} })}
            className={`${secondaryButtonClass} mt-4`}
          >
            {t("auth.backToSignIn")}
          </button>
        </PageCard>
      </PageShell>
    );
  }

  if (onCheckEmail && confirmed) {
    return (
      <PageShell as="main" width="narrow">
        <PageCard>
          <h1 className="text-xl font-semibold text-foreground">{t("auth.confirmedInline")}</h1>
          <p className="mt-2 text-sm text-muted-foreground">{t("auth.confirmedBody")}</p>
          <button
            type="button"
            onClick={() => void navigate({ to: "/" })}
            className={`${primaryButtonClass} mt-6`}
          >
            {t("auth.continue")}
          </button>
        </PageCard>
      </PageShell>
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
      <PageShell as="main" width="narrow">
        <PageCard>
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
            <div className="mt-4">
              <p className="text-center text-sm text-muted-foreground">
                {t("auth.alreadyConfirmedPrompt")}
              </p>
              <button
                type="button"
                data-testid="auth-already-confirmed"
                onClick={() => void handleAlreadyConfirmed()}
                disabled={busy}
                className={`${secondaryButtonClass} mt-2`}
              >
                {t("auth.signIn")}
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => void navigate({ to: "/auth", search: {} })}
              className={`${secondaryButtonClass} mt-6`}
            >
              {t("auth.backToSignIn")}
            </button>
          )}
        </PageCard>
      </PageShell>
    );
  }

  return (
    <PageShell as="main" width="narrow">
      <PageCard>
        <h1 className="text-xl font-semibold text-foreground">
          {isSignIn ? t("auth.signIn") : t("auth.createAccount")}
        </h1>

        {/* Bundle 16 turn S3 (D189) — the account was deactivated and its session ended. */}
        {reason === "deactivated" ? (
          <p role="alert" data-testid="auth-deactivated" className="mt-4 text-sm text-destructive">
            {t("auth.deactivated")}
          </p>
        ) : null}

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
            <PasswordInput
              id="auth-password"
              name="password"
              type="password"
              autoComplete={isSignIn ? "current-password" : "new-password"}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t("auth.passwordPlaceholder")}
              className={fieldClass}
            />
          </div>

          {isSignIn ? null : (
            <div className="flex flex-col gap-1">
              <label
                htmlFor="auth-password-confirm"
                className="text-sm font-medium text-foreground"
              >
                {t("auth.passwordConfirm")}
              </label>
              <PasswordInput
                id="auth-password-confirm"
                name="password-confirm"
                type="password"
                autoComplete="new-password"
                required
                value={passwordAgain}
                onChange={(e) => setPasswordAgain(e.target.value)}
                className={fieldClass}
              />
            </div>
          )}

          {!isSignIn ? (
            <AgreeToDocument
              id="agreement"
              testId="auth-agree-tick"
              sentence="legal.agree.first.both"
              links={{ terms: "/terms", privacy: "/privacy" }}
              checked={agreed}
              onCheckedChange={setAgreed}
              refused={agreeTried && !agreed}
              message="legal.agree.required"
            />
          ) : null}

          {errorKey ? (
            <p role="alert" data-testid="auth-error" className="text-sm text-destructive">
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

          <button
            type="submit"
            disabled={busy}
            data-closed={!isSignIn && !agreed ? "1" : undefined}
            className={`${primaryButtonClass} data-[closed=1]:border data-[closed=1]:border-input data-[closed=1]:bg-secondary data-[closed=1]:text-secondary-foreground data-[closed=1]:hover:bg-secondary/80`}
          >
            {busy ? t("auth.working") : isSignIn ? t("auth.signInButton") : t("auth.signUpButton")}
          </button>
        </form>

        {/* P1-g: the recovery entry point, sign-in view only. */}
        {isSignIn ? (
          <button
            type="button"
            onClick={() => {
              setErrorKey(null);
              setResetRequested(false);
              void navigate({ to: "/auth", search: { view: "forgot" } });
            }}
            className="mt-4 min-h-11 w-full rounded-md text-sm font-medium text-primary underline underline-offset-4"
          >
            {t("auth.forgotPassword")}
          </button>
        ) : null}

        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-2">
          <p className="text-sm text-muted-foreground">
            {isSignIn ? t("auth.toggleToSignUpPrompt") : t("auth.toggleToSignInPrompt")}
          </p>
          <button
            type="button"
            data-testid="auth-toggle-view"
            onClick={() => {
              setErrorKey(null);
              setCanResend(false);
              setResendSent(false);
              void navigate({ to: "/auth", search: isSignIn ? { view: "sign-up" } : {} });
            }}
            className="min-h-11 rounded-md px-2 text-sm font-medium text-primary underline underline-offset-4"
          >
            {isSignIn ? t("auth.createAccount") : t("auth.signIn")}
          </button>
        </div>

        {/* P1-d: real Google door below the email form (mobile-first order).
          Telegram (P1-e) remains a slot until its own named phase. */}
        <section aria-labelledby="auth-providers" className="mt-8 border-t border-border pt-6">
          <h2 id="auth-providers" className="text-xs uppercase text-muted-foreground">
            {t("auth.orSeparator")}
          </h2>
          <div className="mt-3 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => void handleGoogle()}
              disabled={busy}
              className={secondaryButtonClass}
            >
              {t("auth.continueWithGoogle")}
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
      </PageCard>
    </PageShell>
  );
}
