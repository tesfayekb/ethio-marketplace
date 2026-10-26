import { CutText } from "@/components/ui/cut-text";
import { PasswordInput } from "@/components/ui/password-input";
import { passwordPairProblem } from "@/features/auth/password-pair";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";

import { ContentGrid } from "@/components/layout/content-grid";
import { ActionMessage } from "@/components/ui/action-message";
import { PageHeader } from "@/components/layout/page-header";
import { PageShell } from "@/components/layout/page-shell";
import { Section } from "@/components/layout/section";
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
import { getSupabase } from "@/lib/supabase-door";
import { useI18n } from "@/i18n";
import { relativeTime } from "@/lib/relative-time";
import type { MessageKey } from "@/i18n";
import { formatLocale } from "@/lib/format-locale";

/** Mirrors the server's password rule; the server remains the authority. */
const MIN_PASSWORD_LENGTH = 8;

/** Shared shape of every settings action result (see law F4). */
type ActionOutcome = { ok: boolean; errorKey?: MessageKey };

/** An action the surface can run; call-signature form keeps the scanner quiet. */
type SettingsAction = { (): Promise<ActionOutcome> };

/**
 * Bundle 11 turn C8 (INC-570) — WHERE AN OUTCOME IS SHOWN. Each action's refusal
 * or confirmation is drawn beside the control that produced it (never once under
 * the page header, screens above the form on a phone): the sign-in methods'
 * actions under that section, Remove password's refusal inside its confirmation,
 * and each form under its own button.
 */
type MessageSlot = "methods" | "removePassword" | "password" | "email" | "devices";
type SlotMessage = { slot: MessageSlot; tone: "error" | "done"; key: MessageKey };

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { name: "robots", content: "noindex" },
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
  // DEC-258 — this screen shows the member strings layer; the shell's gate loads it first.
  staticData: { strings: ["member"] },
  component: SettingsScreen,
});

const fieldClass =
  "min-h-11 w-full rounded-md border border-input bg-background px-3 text-base text-foreground " +
  "placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

const primaryButtonClass =
  "inline-flex min-h-11 w-full items-center justify-center rounded-md bg-primary px-4 text-sm " +
  "font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60";

/** Bundle 11 C2 — a destructive act is red: the act in a list (or opening its confirmation), then its confirmation. */
const dangerOutlineClass =
  "min-h-11 rounded-md border border-destructive/50 px-3 text-sm font-medium text-destructive " +
  "hover:bg-destructive/10 disabled:opacity-60";
const dangerButtonClass =
  "inline-flex min-h-11 w-full items-center justify-center rounded-md bg-destructive px-4 text-sm " +
  "font-medium text-destructive-foreground transition-colors hover:bg-destructive/90 disabled:opacity-60";

const secondaryButtonClass =
  "inline-flex min-h-11 w-full items-center justify-center rounded-md border border-input px-4 " +
  "text-sm font-medium text-foreground hover:bg-accent disabled:opacity-60";

function providerLabelKey(provider: string): MessageKey {
  return provider === "google" ? "settings.providerGoogle" : "settings.providerEmail";
}

function SettingsScreen() {
  const { t, language, star, publicLanguages } = useI18n();
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();

  const [checkingSession, setCheckingSession] = useState(true);
  const [memberSince, setMemberSince] = useState<string | null>(null);
  /** U1d — own account status, for the deactivation banner (U1a leftover). */
  const [accountDeactivated, setAccountDeactivated] = useState(false);
  const [identities, setIdentities] = useState<IdentitySummary[] | null>(null);
  const [identitiesErrorKey, setIdentitiesErrorKey] = useState<MessageKey | null>(null);

  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState<SlotMessage | null>(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [confirmingSignOutOthers, setConfirmingSignOutOthers] = useState(false);
  // P1-g truth model (R2): the password is its own sign-in method, reported by
  // the server, independent of whether an 'email' identity row exists.
  const [passwordPresent, setPasswordPresent] = useState<boolean | null>(null);
  const [passwordStateErrorKey, setPasswordStateErrorKey] = useState<MessageKey | null>(null);
  const [confirmingRemovePassword, setConfirmingRemovePassword] = useState(false);
  /** Bundle 11 turn C4 (D143) — Remove password asks for the password; a new one is typed twice. */
  const [removePasswordCurrent, setRemovePasswordCurrent] = useState("");
  const [newPasswordAgain, setNewPasswordAgain] = useState("");

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
      const supabase = await getSupabase();
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
    setMessage(null);
  }

  function refuse(slot: MessageSlot, key: MessageKey) {
    setMessage({ slot, tone: "error", key });
  }

  /**
   * INC-017 precedent: busy engages on INITIATION, before the request leaves.
   * INC-570: a refusal is shown in `slot`; the confirmation in `doneSlot` (a
   * confirmation that closes as it succeeds answers in the section around it).
   */
  async function run(
    action: SettingsAction,
    done: MessageKey,
    slot: MessageSlot,
    doneSlot: MessageSlot = slot,
  ) {
    if (busy) return false;
    reset();
    setBusy(true);
    const result = await action();
    setBusy(false);
    if (!result.ok) {
      refuse(slot, result.errorKey ?? "auth.errorGeneric");
      return false;
    }
    setMessage({ slot: doneSlot, tone: "done", key: done });
    return true;
  }

  /** INC-570 — the outcome drawn beside its own control; nothing when it belongs elsewhere. */
  function messageAt(slot: MessageSlot, className?: string) {
    const here = message !== null && message.slot === slot ? message : null;
    return (
      <ActionMessage
        testid={`settings-message-${slot}`}
        tone={here?.tone ?? "done"}
        text={here === null ? null : t(here.key)}
        className={className}
      />
    );
  }

  async function handleUnlink(identity: IdentitySummary) {
    const ok = await run(
      () => unlinkProviderIdentity(identity.identityId),
      "settings.unlinked",
      "methods",
    );
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
    const ok = await run(
      () => removeOwnPassword(removePasswordCurrent),
      "settings.passwordRemoved",
      "removePassword",
      "methods",
    );
    // A wrong password keeps the confirmation open, its message beside it.
    if (!ok) return;
    setConfirmingRemovePassword(false);
    setRemovePasswordCurrent("");
    await loadPasswordState();
    await loadIdentities();
  }

  async function handleLinkGoogle() {
    if (busy) return;
    reset();
    setBusy(true);
    const result = await linkGoogleIdentity();
    if (!result.ok) {
      setBusy(false);
      refuse("methods", result.errorKey);
    }
    // On success the browser navigates away; busy stays engaged deliberately.
  }

  async function handleChangePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (newPassword.length < MIN_PASSWORD_LENGTH) {
      refuse("password", "auth.errorPasswordTooShort");
      return;
    }
    const mismatch = passwordPairProblem(newPassword, newPasswordAgain);
    if (mismatch !== null) {
      refuse("password", mismatch);
      return;
    }
    const ok = await run(
      () => changePassword(currentPassword, newPassword),
      "settings.passwordChanged",
      "password",
    );
    if (ok) {
      setCurrentPassword("");
      setNewPassword("");
      setNewPasswordAgain("");
    }
  }

  async function handleChangeEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const address = newEmail.trim();
    if (!address) {
      refuse("email", "auth.errorMissingFields");
      return;
    }
    const ok = await run(() => changeEmail(address), "settings.emailChangeSent", "email");
    if (ok) setNewEmail("");
  }

  async function handleSignOutOthers() {
    setConfirmingSignOutOthers(false);
    await run(() => signOutOtherDevices(), "settings.signOutOthersDone", "devices");
  }

  if (checkingSession) {
    return (
      <PageShell as="main" width="wide">
        <p className="text-sm text-muted-foreground">{t("auth.checking")}</p>
      </PageShell>
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
    <PageShell as="main" width="wide" data-testid="settings-page-shell">
      <PageHeader title={t("settings.title")} />

      {accountDeactivated ? (
        <Section className="mt-4 border-destructive" testid="account-deactivated-banner">
          <p role="alert" className="text-sm font-medium text-destructive">
            {t("account.deactivatedBanner")}
          </p>
        </Section>
      ) : null}

      <ContentGrid className="mt-6">
        {/* Section 1 — identity (read-only; editing waits for the REQ-021 gateway) */}
        <Section aria-labelledby="settings-identity">
          <h2 id="settings-identity" className="text-base font-semibold text-foreground">
            {t("settings.identity")}
          </h2>
          <dl className="mt-3 grid grid-cols-1 gap-2 text-sm">
            <div className="flex justify-between gap-3">
              <dt className="text-muted-foreground">{t("settings.displayName")}</dt>
              <dd className="text-foreground">
                <CutText text={user?.displayName ?? "—"} />
              </dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-muted-foreground">{t("settings.email")}</dt>
              <dd className="text-foreground">
                <CutText text={user?.email ?? "—"} />
              </dd>
            </div>
            {/* U4h — the DEVICE ★, shown here as a READ-OUT: the star is chosen in
              the language switcher (one affordance, C-laws), and this row only
              tells the operator which device default is currently in force. */}
            <div className="flex justify-between gap-3">
              <dt className="text-muted-foreground">{t("settings.deviceLanguage")}</dt>
              <dd className="text-foreground" data-testid="settings-device-language">
                <CutText
                  text={
                    star
                      ? (publicLanguages.find((row) => row.code === star)?.name_native ?? star)
                      : t("settings.deviceLanguageNone")
                  }
                />
              </dd>
            </div>
            <div className="flex justify-between gap-3">
              <dt className="text-muted-foreground">{t("settings.memberSince")}</dt>
              <dd className="text-foreground">
                {memberSince
                  ? new Intl.DateTimeFormat(formatLocale(language), { dateStyle: "medium" }).format(
                      new Date(memberSince),
                    )
                  : "—"}
              </dd>
            </div>
          </dl>
        </Section>

        {/* Section 2 — sign-in methods */}
        <Section aria-labelledby="settings-methods">
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
                    className={dangerOutlineClass}
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
                  className={dangerOutlineClass}
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
            <div
              data-testid="remove-password-confirmation"
              className="mt-3 flex flex-col gap-3 rounded-md border border-border p-3"
            >
              <p className="text-sm text-foreground">{t("settings.removePasswordConfirm")}</p>
              <label htmlFor="remove-password-current" className="text-sm text-muted-foreground">
                {t("settings.removePasswordAsk")}
              </label>
              <PasswordInput
                id="remove-password-current"
                type="password"
                autoComplete="current-password"
                required
                value={removePasswordCurrent}
                onChange={(e) => setRemovePasswordCurrent(e.target.value)}
                className={fieldClass}
              />
              {messageAt("removePassword")}
              <button
                type="button"
                onClick={() => void handleRemovePassword()}
                disabled={busy || removePasswordCurrent === ""}
                className={dangerButtonClass}
              >
                {busy ? t("auth.working") : t("settings.removePasswordConfirmYes")}
              </button>
              <button
                type="button"
                onClick={() => {
                  setConfirmingRemovePassword(false);
                  setRemovePasswordCurrent("");
                }}
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
          {messageAt("methods", "mt-3")}
        </Section>

        {/* Section 3 — two-factor authentication (U1f) */}
        <Section aria-labelledby="settings-mfa" testid="settings-mfa">
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
            <p
              role="status"
              data-testid="mfa-success"
              className="mt-3 text-sm text-muted-foreground"
            >
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
                className={dangerOutlineClass}
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
                className={dangerButtonClass}
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
        </Section>

        {/* Section 4 — security. U6-C1-R3a: `id="security"` is the rail's anchor
            target ("Sign-in and security" → /settings#security), so that item can
            be current on its own instead of sharing the highlight with Settings. */}
        <Section id="security" aria-labelledby="settings-security">
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
              <PasswordInput
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
              <PasswordInput
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
            <div className="flex flex-col gap-1">
              <label htmlFor="new-password-confirm" className="text-sm text-muted-foreground">
                {t("settings.newPasswordConfirm")}
              </label>
              <PasswordInput
                id="new-password-confirm"
                type="password"
                autoComplete="new-password"
                minLength={MIN_PASSWORD_LENGTH}
                required
                value={newPasswordAgain}
                onChange={(e) => setNewPasswordAgain(e.target.value)}
                className={fieldClass}
              />
            </div>
            {messageAt("password")}
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
            {messageAt("email")}
            <button type="submit" disabled={busy} className={secondaryButtonClass}>
              {busy ? t("auth.working") : t("settings.changeEmail")}
            </button>
          </form>

          <div data-testid="settings-devices" className="mt-8 flex flex-col gap-3">
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
            {messageAt("devices")}
          </div>
        </Section>
      </ContentGrid>
    </PageShell>
  );
}
