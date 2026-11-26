import { Link } from "@tanstack/react-router";
import { useCallback, useEffect, useState, type ReactNode } from "react";

import { Field } from "@/components/forms/field";
import { useShell } from "@/components/shell-context";
import { FailureNotice } from "@/components/shell/failure-notice";
import { LoadFailedHere } from "@/components/shell/on-demand-notice";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/i18n";
import { loadOnce } from "@/lib/load-once";
import type { Refusal } from "@/lib/refusal";

import { MFA_REFUSALS } from "./mfa-refusals";
import { readStaffFactor, type StaffFactorPhase } from "./staff-factor";

/**
 * DEC-434 — A STAFF SCREEN OPENS ONLY FOR A STAFF ACCOUNT WITH A SECOND FACTOR, IN A SESSION THAT USED IT.
 *
 * Cursor bundle 6 (DEC-451) mounts it: the admin layout (src/routes/admin.tsx) draws its body through
 * this gate, on demand (staff-factor-gate-lazy.tsx), once the permission read says the person is
 * staff. Three answers, and nothing of a staff screen is drawn before the gate says `ready`:
 *   - no verified factor        → the setup panel, which sends the person to Settings' two-factor card;
 *   - a factor, a session that has not used it (assurance level below aal2) → the code prompt;
 *   - a read that failed        → the failure, never a default that lets the screen open.
 * The server is the authority (law F3: every staff call is checked by `has_permission` and
 * `door_context`); this gate is the screen's convenience. This module is fetched on demand by the layout
 * (resilientLazy), so no member page and no first download carries it.
 */

/** What the gate draws while its read settles. */
function GateChecking() {
  const { t } = useI18n();
  return (
    <div
      role="status"
      aria-live="polite"
      data-testid="admin-factor-checking"
      className="flex min-h-40 items-center justify-center text-sm text-muted-foreground"
    >
      {t("admin.loading")}
    </div>
  );
}

/**
 * The failure, in place of every staff screen: a read that failed never opens one. It is drawn by
 * the failure notice (INC-1302): its words for the reason, and Retry for a failure that can succeed —
 * never "set up an authenticator" for a read that did not answer.
 */
function StaffFactorFailed({ error, onRetry }: { error: unknown; onRetry: () => void }) {
  const { t } = useI18n();
  return (
    <div className="flex min-h-40 items-center justify-center px-4 text-center">
      <FailureNotice
        error={error}
        testid="admin-factor-read-failed"
        subject={t("admin.factorReadFailed")}
        onRetry={onRetry}
      />
    </div>
  );
}

// The code's check is the one write the gate makes, and it needs the database client: it arrives with
// the first attempt, never with the gate (INC-1291).
const mfaService = loadOnce(() => import("./mfa-service"));

function SetupPanel() {
  const { t } = useI18n();
  return (
    <section
      data-testid="admin-factor-setup"
      className="mx-auto flex max-w-md flex-col gap-3 px-4 py-8"
    >
      <h1 className="text-lg font-semibold text-foreground">{t("admin.factorNeeded.title")}</h1>
      <p className="text-sm text-muted-foreground">{t("admin.factorNeeded.body")}</p>
      <Button asChild size="touch">
        <Link to="/settings" data-testid="admin-factor-setup-link">
          {t("admin.factorNeeded.action")}
        </Link>
      </Button>
    </section>
  );
}

function CodePanel({ onVerified }: { onVerified: () => void }) {
  const { t } = useI18n();
  const [code, setCode] = useState("");
  const [busy, setBusy] = useState(false);
  const [refusal, setRefusal] = useState<Refusal | null>(null);
  // The check's own code did not download: said here, in the panel (the gate is fetched in place,
  // so it does not also raise the shell's notice).
  const [loadFailed, setLoadFailed] = useState(false);

  const submit = async () => {
    if (busy) return;
    setBusy(true);
    setRefusal(null);
    setLoadFailed(false);
    let result;
    try {
      result = await (await mfaService.load()).stepUpWithCode(code);
    } catch {
      setBusy(false);
      setLoadFailed(true);
      return;
    }
    setBusy(false);
    if (!result.ok) {
      setRefusal(result.refusal);
      return;
    }
    setCode("");
    onVerified();
  };

  return (
    <section
      data-testid="admin-factor-code-panel"
      className="mx-auto flex max-w-md flex-col gap-3 px-4 py-8"
    >
      <h1 className="text-lg font-semibold text-foreground">{t("mfa.stepUpTitle")}</h1>
      <p className="text-sm text-muted-foreground">{t("admin.factorCode.body")}</p>
      {loadFailed ? (
        <LoadFailedHere
          testid="admin-factor-code-load-failed"
          refreshTestid="admin-factor-code-refresh"
        />
      ) : null}
      <form
        noValidate
        className="flex flex-col gap-3"
        onSubmit={(event) => {
          event.preventDefault();
          void submit();
        }}
      >
        <Field
          id="admin-factor-code"
          field="code"
          label={t("mfa.codeLabel")}
          required
          refusal={refusal}
          family={MFA_REFUSALS}
          refusalTestId="admin-factor-error"
        >
          {(control) => (
            <Input
              {...control}
              data-testid="admin-factor-code"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              placeholder={t("mfa.codePlaceholder")}
              value={code}
              onChange={(event) => setCode(event.target.value)}
            />
          )}
        </Field>
        <Button
          type="submit"
          size="touch"
          data-testid="admin-factor-submit"
          disabled={busy || code.trim().length === 0}
        >
          {t("mfa.stepUpConfirm")}
        </Button>
      </form>
    </section>
  );
}

export function StaffFactorGate({ children }: { children: ReactNode }) {
  const { user } = useShell();
  const userId = user?.id ?? null;
  const [phase, setPhase] = useState<StaffFactorPhase | "checking">("checking");
  const [failure, setFailure] = useState<{ error: unknown } | null>(null);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let live = true;
    setPhase("checking");
    setFailure(null);
    void readStaffFactor().then(
      (next) => {
        if (!live) return;
        if (next.phase === "failed") setFailure({ error: next.error });
        setPhase(next.phase);
      },
      (error: unknown) => {
        // A read that threw is a read that failed: no staff screen.
        if (!live) return;
        setFailure({ error });
        setPhase("failed");
      },
    );
    return () => {
      live = false;
    };
  }, [userId, attempt]);

  const verified = useCallback(() => setAttempt((count) => count + 1), []);

  if (phase === "ready") return <>{children}</>;
  if (phase === "failed")
    return <StaffFactorFailed error={failure?.error ?? null} onRetry={verified} />;
  if (phase === "setupNeeded") return <SetupPanel />;
  if (phase === "codeNeeded") return <CodePanel onVerified={verified} />;
  return <GateChecking />;
}
