import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

import { completeEmailVerification, resendConfirmation } from "@/features/auth/auth-service";
import { supabase } from "@/integrations/supabase/client";
import { useI18n } from "@/i18n";
import type { MessageKey } from "@/i18n";

/** TEMPORARY (INC-005 diagnosis). Remove before launch. */
const DEBUG_LABEL = "DEBUG — remove before launch";

/** Which shape the landing URL carries. Diagnosis only; no logic depends on it. */
function detectBranch(search: URLSearchParams, hash: URLSearchParams): string {
  if (search.get("error") || search.get("error_code") || hash.get("error")) return "error";
  if (search.get("code")) return "code";
  if (hash.get("access_token") && hash.get("refresh_token")) return "access_token";
  if (search.get("token_hash") && (search.get("type") || hash.get("type"))) return "token_hash";
  return "none";
}

function paramMap(params: URLSearchParams): Record<string, string> {
  const out: Record<string, string> = {};
  params.forEach((value, key) => {
    // Never print token material; only its presence and length.
    out[key] = /token|code/i.test(key) ? `<${value.length} chars>` : value;
  });
  return out;
}

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
  /** "checking" until the landing URL has been processed and a session re-checked. */
  const [status, setStatus] = useState<"checking" | "confirmed" | "failed">("checking");

  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [resendSent, setResendSent] = useState(false);
  const [errorKey, setErrorKey] = useState<MessageKey | null>(null);
  /** TEMPORARY (INC-005). Diagnostic snapshot of the landing URL + session. */
  const [debug, setDebug] = useState<string>("");

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      const url = new URL(window.location.href);
      const hash = new URLSearchParams(url.hash.startsWith("#") ? url.hash.slice(1) : "");
      const before = await supabase.auth.getSession();
      const snapshot: Record<string, unknown> = {
        href: url.href.replace(/(code|token|token_hash)=[^&]+/g, "$1=<redacted>"),
        search: url.search.replace(/(code|token|token_hash)=[^&]+/g, "$1=<redacted>"),
        hash: url.hash.replace(/(access_token|refresh_token|token_hash)=[^&]+/g, "$1=<redacted>"),
        searchParams: paramMap(url.searchParams),
        hashParams: paramMap(hash),
        branch: detectBranch(url.searchParams, hash),
        sessionBeforeExchange: Boolean(before.data.session),
        sessionBeforeError: before.error?.message ?? null,
      };
      console.info("[INC-005 callback] before exchange", snapshot);

      const result = await completeEmailVerification();
      const after = await supabase.auth.getSession();
      snapshot.verificationResult = result;
      snapshot.sessionAfterExchange = Boolean(after.data.session);
      snapshot.sessionAfterError = after.error?.message ?? null;
      snapshot.userAfter = after.data.session?.user?.email ?? null;
      console.info("[INC-005 callback] after exchange", snapshot);

      if (cancelled) return;
      setDebug(JSON.stringify(snapshot, null, 2));
      setStatus(result.ok ? "confirmed" : "failed");
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  const debugPanel = debug ? (
    <section className="mt-8 rounded-md border border-dashed border-border p-3">
      <p className="text-xs font-semibold uppercase text-destructive">{DEBUG_LABEL}</p>
      <pre className="mt-2 overflow-x-auto text-[11px] leading-snug text-muted-foreground">
        {debug}
      </pre>
    </section>
  ) : null;

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
        {debugPanel}
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
      {debugPanel}
    </main>
  );
}
