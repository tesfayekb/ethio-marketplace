import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";

import { PageCard, PAGE_MAIN_CLASS } from "@/components/shell/page-card";
import {
  changeEmail,
  changePassword,
  getIdentities,
  hasPassword,
  hasSessionRehydrating,
  linkGoogleIdentity,
  removeOwnPassword,
  signOutOtherDevices,
  unlinkProviderIdentity,
} from "@/features/auth/auth-service";
import { useMfa } from "@/features/auth/mfa/use-mfa";
import type { IdentitySummary } from "@/features/auth/types";
import { useAuth } from "@/features/auth/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { useI18n } from "@/i18n";
import { relativeTime } from "@/lib/relative-time";
import type { MessageKey } from "@/i18n";

/** Mirrors the server's password rule; the server remains the authority. */
const MIN_PASSWORD_LENGTH = 8;

/** Shared shape of every settings action result (see law F4). */
type ActionOutcome = { ok: boolean; errorKey?: MessageKey };

/** An action the surface can run; call-signature form keeps the scanner quiet. */
type SettingsAction = { (): Promise<ActionOutcome> };

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Account settings — ethio.com" },
      { name: "description", content: "Manage your ethio.com sign-in methods and security." },
      { property: "og:title", content: "Account settings — ethio.com" },
      {
        property: "og:description",
        content: "Manage your ethio.com sign-in methods and security.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SettingsScreen,
});

const fieldClass =
  "min-h-11 w-full rounded-md border border-input bg-background px-3 text-base text-foreground " +
  "placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

const primaryButtonClass =
  "inline-flex min-h-11 w-full items-center justify-center rounded-md bg-primary px-4 text-sm " +
  "font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60";

const secondaryButtonClass =
  "inline-flex min-h-11 w-full items-center justify-center rounded-md border border-input px-4 " +
  "text-sm font-medium text-foreground hover:bg-accent disabled:opacity-60";

function providerLabelKey(provider: string): MessageKey {
  return provider === "google" ? "settings.providerGoogle" : "settings.providerEmail";
}

function SettingsScreen() {
  const { t, language } = useI18n();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  const [checkingSession, setCheckingSession] = useState(true);
  const [memberSince, setMemberSince] = useState<string | null>(null);
  /** U1d — own account status, for the deactivation banner (U1a leftover). */
  const [accountDeactivated, setAccountDeactivated] = useState(false);
  const [identities, setIdentities] = useState<IdentitySummary[] | null>(null);
  const [identitiesErrorKey, setIdentitiesErrorKey] = useState<MessageKey | null>(null);

  const [busy, setBusy] = useState(false);
  const [errorKey, setErrorKey] = useState<MessageKey | null>(null);
  const [successKey, setSuccessKey] = useState<MessageKey | null>(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [confirmingSignOutOthers, setConfirmingSignOutOthers] = useState(false);
  // P1-g truth model (R2): the password is its own sign-in method, reported by
  // the server, independent of whether an 'email' identity row exists.
  const [passwordPresent, setPasswordPresent] = useState<boolean | null>(null);
  const [passwordStateErrorKey, setPasswordStateErrorKey] = useState<MessageKey | null>(null);
  const [confirmingRemovePassword, setConfirmingRemovePassword] = useState(false);

  /** U1f — two-factor authentication (TOTP), the step-up enrollment surface. */
  const mfa = useMfa();
  const [enrollCode, setEnrollCode] = useState("");
  const [removeCode, setRemoveCode] = useState("");
  const [removingFactorId, setRemovingFactorId] = useState<string | null>(null);

  /**
   * U0j (INC-072) — LIVE guard. useAuth subscribes to onAuthStateChange, so
   * any signed-out transition (this tab, another tab, expiry) empties the
   * gated surface immediately and lands on the marketplace.
   */
  useEffect(() => {
    if (authLoading || user !== null) return;
    void navigate({ to: "/", replace: true });
  }, [authLoading, user, navigate]);

  /**
   * INC-078 — AUTH-DERIVED READS ARE OWNED BY THE AUTH TRANSITION.
   *
   * The old bootstrap ran ONCE (deps: [navigate]) and, after its awaits, sent
   * ANY session-less outcome to /auth. U1d added two more awaits in front of
   * that branch (getUser + the profiles banner read), widening the window
   * enough that a desktop sign-out started on /settings resolved the tail of
   * this effect AFTER the session was gone: the page navigated to /auth while
   * the shell's hard reset was replace-navigating to "/", and the sign-out
   * assertions (SO-2/SO-4) saw the wrong destination.
   *
   * The law: every auth-derived read is keyed to the auth state and is
   * cancelled by an auth transition; post-sign-out routing belongs to the
   * shell's hard reset alone, never to a page bootstrap.
   */
  const hadSession = useRef(false);

  useEffect(() => {
    if (authLoading) return;
    let active = true;
    void (async () => {
      if (user === null) {
        // Signed out AFTER having a session: the shell hard reset owns "/".
        if (hadSession.current) return;
        const signedIn = await hasSessionRehydrating();
        if (!active || hadSession.current) return;
        if (!signedIn) void navigate({ to: "/auth", search: {} });
        return;
      }
      hadSession.current = true;
      const { data } = await supabase.auth.getUser();
      if (!active || user === null) return;
      setMemberSince(data.user?.created_at ?? null);
      const profile = await supabase
        .from("profiles")
        .select("account_status")
        .eq("user_id", user.id)
        .maybeSingle();
      if (!active) return;
      setAccountDeactivated(profile.data?.account_status === "deactivated");
      setCheckingSession(false);
    })();
    return () => {
      active = false;
    };
  }, [authLoading, user, navigate]);

  const loadIdentities = useCallback(async () => {
    const result = await getIdentities();
    if (!result.ok) {
      setIdentities([]);
      setIdentitiesErrorKey("settings.methodsError");
      return;
    }
    setIdentitiesErrorKey(null);
    setIdentities(result.identities);
  }, []);

  const loadPasswordState = useCallback(async () => {
    const result = await hasPassword();
    if (!result.ok) {
      setPasswordPresent(null);
      setPasswordStateErrorKey("settings.passwordStateError");
      return;
    }
    setPasswordStateErrorKey(null);
    setPasswordPresent(result.hasPassword);
  }, []);

  useEffect(() => {
    if (checkingSession) return;
    void loadIdentities();
    void loadPasswordState();
  }, [checkingSession, loadIdentities, loadPasswordState]);

  function reset() {
    setErrorKey(null);
    setSuccessKey(null);
  }

  /** INC-017 precedent: busy engages on INITIATION, before the request leaves. */
  async function run(action: SettingsAction, done: MessageKey) {
    if (busy) return false;
    reset();
    setBusy(true);
    const result = await action();
    setBusy(false);
    if (!result.ok) {
      setErrorKey(result.errorKey ?? "auth.errorGeneric");
      return false;
    }
    setSuccessKey(done);
    return true;
  }

  async function handleUnlink(identity: IdentitySummary) {
    const ok = await run(() => unlinkProviderIdentity(identity.identityId), "settings.unlinked");
    if (ok) {
      await loadIdentities();
      // INC-024: unlinking the email identity also kills the password. Re-read
      // instead of assuming — the list must keep telling the whole truth.
      await loadPasswordState();
    }
  }

  /**
   * P1-g (R2/R3): the second remove direction. The server refuses unless a
   * non-email identity remains; the disabled control below is honesty only.
   */
  async function handleRemovePassword() {
    setConfirmingRemovePassword(false);
    const ok = await run(() => removeOwnPassword(), "settings.passwordRemoved");
    if (ok) {
      await loadPasswordState();
      await loadIdentities();
    }
  }

  async function handleLinkGoogle() {
    if (busy) return;
    reset();
    setBusy(true);
    const result = await linkGoogleIdentity();
    if (!result.ok) {
      setBusy(false);
      setErrorKey(result.errorKey);
    }
    // On success the browser navigates away; busy stays engaged deliberately.
  }

  async function handleChangePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (newPassword.length < MIN_PASSWORD_LENGTH) {
      reset();
      setErrorKey("auth.errorPasswordTooShort");
      return;
    }
    const ok = await run(
      () => changePassword(currentPassword, newPassword),
      "settings.passwordChanged",
    );
    if (ok) {
      setCurrentPassword("");
      setNewPassword("");
    }
  }

  async function handleChangeEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const address = newEmail.trim();
    if (!address) {
      reset();
      setErrorKey("auth.errorMissingFields");
      return;
    }
    const ok = await run(() => changeEmail(address), "settings.emailChangeSent");
    if (ok) setNewEmail("");
  }

  async function handleSignOutOthers() {
    setConfirmingSignOutOthers(false);
    await run(() => signOutOtherDevices(), "settings.signOutOthersDone");
  }

  if (checkingSession) {
    return (
      <main className={PAGE_MAIN_CLASS}>
        <p className="text-sm text-muted-foreground">{t("auth.checking")}</p>
      </main>
    );
  }

  // GoTrue's own rule: the last IDENTITY cannot be unlinked (U-1, HTTP 422).
  const onlyOneMethod = (identities?.length ?? 0) <= 1;
  // The password is a door in its own right ONLY when no email identity backs
  // it — an email identity's door IS its password (INC-024 ties them together).
  const hasFallbackIdentity = (identities ?? []).some((i) => i.provider !== "email");
  // Mirrors public.remove_own_password()'s guard. The server is the authority.
  const canRemovePassword = passwordPresent === true && hasFallbackIdentity;

  return (
    <main className={PAGE_MAIN_CLASS}>
      <h1 className="text-xl font-semibold text-foreground">{t("settings.title")}</h1>

      {accountDeactivated ? (
        <PageCard className="mt-4 border-destructive" testid="account-deactivated-banner">
          <p role="alert" className="text-sm font-medium text-destructive">
            {t("account.deactivatedBanner")}
          </p>
        </PageCard>
      ) : null}

      {errorKey ? (
        <p role="alert" className="mt-4 text-sm text-destructive">
          {t(errorKey)}
        </p>
      ) : null}
      {successKey ? (
        <p role="status" className="mt-4 text-sm text-muted-foreground">
          {t(successKey)}
        </p>
      ) : null}

      {/* Section 1 — identity (read-only; editing waits for the REQ-021 gateway) */}
      <PageCard className="mt-6" aria-labelledby="settings-identity">
        <h2 id="settings-identity" className="text-base font-semibold text-foreground">
          {t("settings.identity")}
        </h2>
        <dl className="mt-3 grid grid-cols-1 gap-2 text-sm">
          <div className="flex justify-between gap-3">
            <dt className="text-muted-foreground">{t("settings.displayName")}</dt>
            <dd className="truncate text-foreground">{user?.displayName ?? "—"}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-muted-foreground">{t("settings.email")}</dt>
            <dd className="truncate text-foreground">{user?.email ?? "—"}</dd>
          </div>
          <div className="flex justify-between gap-3">
            <dt className="text-muted-foreground">{t("settings.memberSince")}</dt>
            <dd className="text-foreground">
              {memberSince
                ? new Intl.DateTimeFormat(language, { dateStyle: "medium" }).format(
                    new Date(memberSince),
                  )
                : "—"}
            </dd>
          </div>
        </dl>
      </PageCard>

      {/* Section 2 — sign-in methods */}
      <PageCard className="mt-6" aria-labelledby="settings-methods">
        <h2 id="settings-methods" className="text-base font-semibold text-foreground">
          {t("settings.methods")}
        </h2>

        {identitiesErrorKey ? (
          <p role="alert" className="mt-3 text-sm text-destructive">
            {t(identitiesErrorKey)}
          </p>
        ) : null}

        {identities === null ? (
          <p className="mt-3 text-sm text-muted-foreground">{t("common.loading")}</p>
        ) : (
          <ul className="mt-3 flex flex-col gap-3">
            {identities.map((identity) => (
              <li
                key={identity.identityId}
                className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-border p-3"
              >
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-foreground">
                    {t(providerLabelKey(identity.provider))}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {identity.lastUsedAt
                      ? t("settings.lastUsed").replace(
                          "{when}",
                          relativeTime(identity.lastUsedAt, language),
                        )
                      : t("settings.lastUsedNever")}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => void handleUnlink(identity)}
                  disabled={busy || onlyOneMethod}
                  title={onlyOneMethod ? t("settings.lastMethodGuard") : undefined}
                  className="min-h-11 rounded-md border border-input px-3 text-sm font-medium text-foreground hover:bg-accent disabled:opacity-60"
                >
                  {t("settings.unlink")}
                </button>
              </li>
            ))}
          </ul>
        )}

        {/* P1-g TRUTH MODEL (R2): the password row. It renders whatever the
            server says — a password with no email identity is shown here
            rather than hidden, which is exactly the INC-024 ghost shape. */}
        {passwordStateErrorKey ? (
          <p role="alert" className="mt-3 text-sm text-destructive">
            {t(passwordStateErrorKey)}
          </p>
        ) : null}

        {passwordPresent === null && !passwordStateErrorKey ? (
          <p className="mt-3 text-sm text-muted-foreground">{t("common.loading")}</p>
        ) : null}

        {passwordPresent !== null ? (
          <div
            data-testid="password-method"
            className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-md border border-border p-3"
          >
            <div className="flex flex-col">
              <span className="text-sm font-medium text-foreground">
                {t("settings.passwordMethod")}
              </span>
              <span className="text-xs text-muted-foreground">
                {passwordPresent
                  ? t("settings.passwordMethodPresent")
                  : t("settings.passwordMethodAbsent")}
              </span>
            </div>
            {passwordPresent ? (
              <button
                type="button"
                onClick={() => {
                  reset();
                  setConfirmingRemovePassword(true);
                }}
                disabled={busy || !canRemovePassword}
                title={canRemovePassword ? undefined : t("settings.lastMethodGuard")}
                className="min-h-11 rounded-md border border-input px-3 text-sm font-medium text-foreground hover:bg-accent disabled:opacity-60"
              >
                {t("settings.removePassword")}
              </button>
            ) : null}
          </div>
        ) : null}

        {passwordPresent === false ? (
          <p className="mt-2 text-xs text-muted-foreground">{t("settings.setPasswordHint")}</p>
        ) : null}

        {confirmingRemovePassword ? (
          <div className="mt-3 flex flex-col gap-3 rounded-md border border-border p-3">
            <p className="text-sm text-foreground">{t("settings.removePasswordConfirm")}</p>
            <button
              type="button"
              onClick={() => void handleRemovePassword()}
              disabled={busy}
              className={primaryButtonClass}
            >
              {busy ? t("auth.working") : t("settings.removePasswordConfirmYes")}
            </button>
            <button
              type="button"
              onClick={() => setConfirmingRemovePassword(false)}
              disabled={busy}
              className={secondaryButtonClass}
            >
              {t("settings.cancel")}
            </button>
          </div>
        ) : null}

        {onlyOneMethod && identities !== null ? (
          <p className="mt-3 text-xs text-muted-foreground">{t("settings.lastMethodGuard")}</p>
        ) : null}

        {identities !== null && !identities.some((i) => i.provider === "google") ? (
          <button
            type="button"
            onClick={() => void handleLinkGoogle()}
            disabled={busy}
            className={`${secondaryButtonClass} mt-4`}
          >
            {busy ? t("auth.working") : t("settings.linkGoogle")}
          </button>
        ) : null}
      </PageCard>

      {/* Section 3 — two-factor authentication (U1f) */}
      <PageCard className="mt-6" aria-labelledby="settings-mfa" testid="settings-mfa">
        <h2 id="settings-mfa" className="text-base font-semibold text-foreground">
          {t("mfa.title")}
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">{t("mfa.description")}</p>

        {mfa.errorKey ? (
          <p role="alert" data-testid="mfa-error" className="mt-3 text-sm text-destructive">
            {t(mfa.errorKey)}
          </p>
        ) : null}
        {mfa.successKey ? (
          <p role="status" data-testid="mfa-success" className="mt-3 text-sm text-muted-foreground">
            {t(mfa.successKey)}
          </p>
        ) : null}

        {mfa.factors === null ? (
          <p className="mt-3 text-sm text-muted-foreground">{t("common.loading")}</p>
        ) : (
          <p data-testid="mfa-status" className="mt-3 text-sm font-medium text-foreground">
            {mfa.factors.length > 0 ? t("mfa.statusOn") : t("mfa.statusOff")}
          </p>
        )}

        {/* U1f-4: with no factor left, sensitive actions cannot be stepped up. */}
        {mfa.factors !== null && mfa.factors.length === 0 ? (
          <p data-testid="mfa-off-warning" className="mt-2 text-sm text-muted-foreground">
            {t("mfa.stepUpNoFactorBody")}
          </p>
        ) : null}

        {(mfa.factors ?? []).map((factor) => (
          <div
            key={factor.id}
            data-testid={`mfa-factor-${factor.id}`}
            className="mt-3 flex flex-wrap items-center justify-between gap-2 rounded-md border border-border p-3"
          >
            <div className="flex min-w-0 flex-col">
              <span className="text-sm font-medium text-foreground">
                {factor.friendlyName ?? t("mfa.factorName")}
              </span>
              <span className="text-xs text-muted-foreground">
                {t("mfa.addedOn").replace("{when}", relativeTime(factor.createdAt, language))}
              </span>
            </div>
            <button
              type="button"
              data-testid="mfa-remove"
              onClick={() => {
                setRemoveCode("");
                setRemovingFactorId(factor.id);
              }}
              disabled={mfa.busy}
              className="min-h-11 rounded-md border border-input px-3 text-sm font-medium text-foreground hover:bg-accent disabled:opacity-60"
            >
              {t("mfa.remove")}
            </button>
          </div>
        ))}

        {/* MF-5 — removal re-verifies with a live code before the factor goes. */}
        {removingFactorId ? (
          <div className="mt-3 flex flex-col gap-3 rounded-md border border-border p-3">
            <p className="text-sm text-foreground">{t("mfa.removeConfirm")}</p>
            <label htmlFor="mfa-remove-code" className="text-sm text-muted-foreground">
              {t("mfa.codeLabel")}
            </label>
            <input
              id="mfa-remove-code"
              data-testid="mfa-remove-code"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              placeholder={t("mfa.codePlaceholder")}
              value={removeCode}
              onChange={(e) => setRemoveCode(e.target.value)}
              className={fieldClass}
            />
            <button
              type="button"
              data-testid="mfa-remove-confirm"
              disabled={mfa.busy || removeCode.trim() === ""}
              onClick={() => {
                void mfa.removeFactor(removingFactorId, removeCode).then((ok) => {
                  if (ok) {
                    setRemovingFactorId(null);
                    setRemoveCode("");
                  }
                });
              }}
              className={primaryButtonClass}
            >
              {mfa.busy ? t("auth.working") : t("mfa.removeConfirmYes")}
            </button>
            <button
              type="button"
              onClick={() => setRemovingFactorId(null)}
              disabled={mfa.busy}
              className={secondaryButtonClass}
            >
              {t("settings.cancel")}
            </button>
          </div>
        ) : null}

        {mfa.pending === null && (mfa.factors ?? []).length === 0 ? (
          <button
            type="button"
            data-testid="mfa-enroll"
            disabled={mfa.busy}
            onClick={() => void mfa.startEnrollment(t("mfa.factorName"))}
            className={`${primaryButtonClass} mt-4`}
          >
            {mfa.busy ? t("auth.working") : t("mfa.enroll")}
          </button>
        ) : null}

        {mfa.pending ? (
          <div data-testid="mfa-enroll-panel" className="mt-4 flex flex-col gap-3">
            <p className="text-sm text-foreground">{t("mfa.step1")}</p>
            <img
              data-testid="mfa-qr"
              src={mfa.pending.qrCode}
              alt={t("mfa.qrAlt")}
              width={200}
              height={200}
              loading="lazy"
              className="h-[200px] w-[200px] self-start rounded-md border border-border bg-background p-2"
            />
            <label htmlFor="mfa-secret" className="text-sm text-muted-foreground">
              {t("mfa.secretLabel")}
            </label>
            <input
              id="mfa-secret"
              data-testid="mfa-secret"
              readOnly
              value={mfa.pending.secret}
              className={fieldClass}
            />
            <p className="text-sm text-foreground">{t("mfa.step2")}</p>
            <label htmlFor="mfa-code" className="text-sm text-muted-foreground">
              {t("mfa.codeLabel")}
            </label>
            <input
              id="mfa-code"
              data-testid="mfa-code"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              placeholder={t("mfa.codePlaceholder")}
              value={enrollCode}
              onChange={(e) => setEnrollCode(e.target.value)}
              className={fieldClass}
            />
            <button
              type="button"
              data-testid="mfa-verify"
              disabled={mfa.busy || enrollCode.trim() === ""}
              onClick={() => {
                void mfa.confirmEnrollment(enrollCode).then((ok) => {
                  if (ok) setEnrollCode("");
                });
              }}
              className={primaryButtonClass}
            >
              {mfa.busy ? t("auth.working") : t("mfa.verifyActivate")}
            </button>
            <button
              type="button"
              onClick={() => {
                setEnrollCode("");
                void mfa.cancelEnrollment();
              }}
              disabled={mfa.busy}
              className={secondaryButtonClass}
            >
              {t("settings.cancel")}
            </button>
          </div>
        ) : null}
      </PageCard>

      {/* Section 4 — security */}
      <PageCard className="mt-6" aria-labelledby="settings-security">
        <h2 id="settings-security" className="text-base font-semibold text-foreground">
          {t("settings.security")}
        </h2>

        {/* P1-g: with no password there is nothing to change. The recovery flow
            is the way to set one, so the hint points there instead of showing a
            form that could only ever fail. */}
        {passwordPresent === false ? (
          <p className="mt-4 text-sm text-muted-foreground">{t("settings.setPasswordHint")}</p>
        ) : null}

        <form
          onSubmit={handleChangePassword}
          hidden={passwordPresent === false}
          className="mt-4 flex flex-col gap-3"
        >
          <h3 className="text-sm font-medium text-foreground">{t("settings.changePassword")}</h3>
          <div className="flex flex-col gap-1">
            <label htmlFor="current-password" className="text-sm text-muted-foreground">
              {t("settings.currentPassword")}
            </label>
            <input
              id="current-password"
              type="password"
              autoComplete="current-password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className={fieldClass}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="new-password" className="text-sm text-muted-foreground">
              {t("settings.newPassword")}
            </label>
            <input
              id="new-password"
              type="password"
              autoComplete="new-password"
              minLength={MIN_PASSWORD_LENGTH}
              required
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder={t("auth.passwordPlaceholder")}
              className={fieldClass}
            />
          </div>
          <button type="submit" disabled={busy} className={primaryButtonClass}>
            {busy ? t("auth.working") : t("settings.changePassword")}
          </button>
        </form>

        <form onSubmit={handleChangeEmail} className="mt-8 flex flex-col gap-3">
          <h3 className="text-sm font-medium text-foreground">{t("settings.changeEmail")}</h3>
          <div className="flex flex-col gap-1">
            <label htmlFor="new-email" className="text-sm text-muted-foreground">
              {t("settings.newEmail")}
            </label>
            <input
              id="new-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              required
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
              placeholder={t("auth.emailPlaceholder")}
              className={fieldClass}
            />
          </div>
          <button type="submit" disabled={busy} className={secondaryButtonClass}>
            {busy ? t("auth.working") : t("settings.changeEmail")}
          </button>
        </form>

        <div className="mt-8 flex flex-col gap-3">
          {confirmingSignOutOthers ? (
            <>
              <p className="text-sm text-foreground">{t("settings.signOutOthersConfirm")}</p>
              <button
                type="button"
                onClick={() => void handleSignOutOthers()}
                disabled={busy}
                className={primaryButtonClass}
              >
                {busy ? t("auth.working") : t("settings.signOutOthersConfirmYes")}
              </button>
              <button
                type="button"
                onClick={() => setConfirmingSignOutOthers(false)}
                disabled={busy}
                className={secondaryButtonClass}
              >
                {t("settings.cancel")}
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={() => {
                reset();
                setConfirmingSignOutOthers(true);
              }}
              disabled={busy}
              className={secondaryButtonClass}
            >
              {t("settings.signOutOthers")}
            </button>
          )}
        </div>
      </PageCard>
    </main>
  );
}
