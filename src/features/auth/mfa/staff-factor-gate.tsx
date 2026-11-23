import { Link } from "@tanstack/react-router";
import { useCallback, useEffect, useState, type ReactNode } from "react";

import { Field } from "@/components/forms/field";
import { useShell } from "@/components/shell-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/i18n";
import type { Refusal } from "@/lib/refusal";

import { MFA_REFUSALS, stepUpWithCode } from "./mfa-service";
import { readStaffFactor, type StaffFactorPhase } from "./staff-factor";

/**
 * DEC-434 — A STAFF SCREEN OPENS ONLY FOR A STAFF ACCOUNT WITH A SECOND FACTOR, IN A SESSION THAT USED IT.
 *
 * NOTHING MOUNTS THIS GATE UNTIL CURSOR BUNDLE 6 (DEC-451): its unit tests (AG-U1 to AG-U4) hold it.
 *
 * Once mounted, the admin layout (src/routes/admin.tsx) draws its body through this gate when the
 * permission read says the person is staff. Three answers, and nothing of a staff screen is drawn
 * before the gate says `ready`:
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

/** The failure, in place of every staff screen: a read that failed never opens one. */
function StaffFactorFailed() {
  const { t } = useI18n();
  return (
    <div
      role="alert"
      data-testid="admin-factor-read-failed"
      className="flex min-h-40 items-center justify-center px-4 text-center text-sm text-destructive"
    >
      {t("admin.factorReadFailed")}
    </div>
  );
}

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

  const submit = async () => {
    if (busy) return;
    setBusy(true);
    setRefusal(null);
    const result = await stepUpWithCode(code);
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
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let live = true;
    setPhase("checking");
    void readStaffFactor().then(
      (next) => {
        if (live) setPhase(next);
      },
      () => {
        // A read that threw is a read that failed: no staff screen.
        if (live) setPhase("failed");
      },
    );
    return () => {
      live = false;
    };
  }, [userId, attempt]);

  const verified = useCallback(() => setAttempt((count) => count + 1), []);

  if (phase === "ready") return <>{children}</>;
  if (phase === "failed") return <StaffFactorFailed />;
  if (phase === "setupNeeded") return <SetupPanel />;
  if (phase === "codeNeeded") return <CodePanel onVerified={verified} />;
  return <GateChecking />;
}
