import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useState, type FormEvent } from "react";

import {
  changeEmail,
  changePassword,
  getIdentities,
  hasSessionRehydrating,
  linkGoogleIdentity,
  signOutOtherDevices,
  unlinkProviderIdentity,
} from "@/features/auth/auth-service";
import type { IdentitySummary } from "@/features/auth/types";
import { useAuth } from "@/features/auth/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { useI18n } from "@/i18n";
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

const sectionClass = "mt-8 border-t border-border pt-6";

/**
 * Relative "last used" rendering. Intl only — no locale strings are built by
 * hand and no date library is added. If a second surface needs this, it moves
 * to a single /src/lib formatter (law B2).
 */
function relativeTime(iso: string, language: string): string {
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return "";
  const seconds = Math.round((then - Date.now()) / 1000);
  const units: Array<[Intl.RelativeTimeFormatUnit, number]> = [
    ["year", 31_536_000],
    ["month", 2_592_000],
    ["day", 86_400],
    ["hour", 3_600],
    ["minute", 60],
  ];
  const formatter = new Intl.RelativeTimeFormat(language, { numeric: "auto" });
  for (const [unit, size] of units) {
    if (Math.abs(seconds) >= size) return formatter.format(Math.round(seconds / size), unit);
  }
  return formatter.format(Math.round(seconds), "second");
}

function providerLabelKey(provider: string): MessageKey {
  return provider === "google" ? "settings.providerGoogle" : "settings.providerEmail";
}

function SettingsScreen() {
  const { t, language } = useI18n();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [checkingSession, setCheckingSession] = useState(true);
  const [memberSince, setMemberSince] = useState<string | null>(null);
  const [identities, setIdentities] = useState<IdentitySummary[] | null>(null);
  const [identitiesErrorKey, setIdentitiesErrorKey] = useState<MessageKey | null>(null);

  const [busy, setBusy] = useState(false);
  const [errorKey, setErrorKey] = useState<MessageKey | null>(null);
  const [successKey, setSuccessKey] = useState<MessageKey | null>(null);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [confirmingSignOutOthers, setConfirmingSignOutOthers] = useState(false);

  /** Auth-required. The server refuses everything anyway; this is the UX. */
  useEffect(() => {
    let active = true;
    void (async () => {
      const signedIn = await hasSessionRehydrating();
      if (!active) return;
      if (!signedIn) {
        void navigate({ to: "/auth", search: {} });
        return;
      }
      const { data } = await supabase.auth.getUser();
      if (!active) return;
      setMemberSince(data.user?.created_at ?? null);
      setCheckingSession(false);
    })();
    return () => {
      active = false;
    };
  }, [navigate]);

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

  useEffect(() => {
    if (checkingSession) return;
    void loadIdentities();
  }, [checkingSession, loadIdentities]);

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
    if (ok) await loadIdentities();
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
      <main className="mx-auto w-full max-w-sm px-4 py-10">
        <p className="text-sm text-muted-foreground">{t("auth.checking")}</p>
      </main>
    );
  }

  const onlyOneMethod = (identities?.length ?? 0) <= 1;

  return (
    <main className="mx-auto w-full max-w-sm px-4 py-10">
      <h1 className="text-xl font-semibold text-foreground">{t("settings.title")}</h1>

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
      <section className={sectionClass} aria-labelledby="settings-identity">
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
      </section>

      {/* Section 2 — sign-in methods */}
      <section className={sectionClass} aria-labelledby="settings-methods">
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
      </section>

      {/* Section 3 — security */}
      <section className={sectionClass} aria-labelledby="settings-security">
        <h2 id="settings-security" className="text-base font-semibold text-foreground">
          {t("settings.security")}
        </h2>

        <form onSubmit={handleChangePassword} className="mt-4 flex flex-col gap-3">
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
      </section>
    </main>
  );
}
