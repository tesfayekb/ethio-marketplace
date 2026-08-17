import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";

import { PageCard } from "@/components/shell/page-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/i18n";

import { useStepUp } from "./use-step-up";

/**
 * U1f — STEP-UP GATE (INC-079).
 *
 * Render-prop wrapper: children receive `guard`, and every sensitive action's
 * click handler passes its work to it. The modal below is PageCard-styled,
 * 360-first (full-width controls, ≥44px targets) and RTL-safe (logical
 * spacing only).
 */
export function StepUpGate({
  children,
}: {
  children: (guard: (action: () => void | Promise<void>) => Promise<void>) => ReactNode;
}) {
  const { t } = useI18n();
  const { mode, busy, errorKey, guard, submitCode, close } = useStepUp();
  const [code, setCode] = useState("");

  return (
    <>
      {children(guard)}

      {mode === "closed" ? null : (
        <div
          data-testid="step-up-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="step-up-title"
          className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/40 p-3 sm:items-center"
        >
          <PageCard className="w-full max-w-sm space-y-3">
            <h2 id="step-up-title" className="text-base font-semibold text-foreground">
              {mode === "code" ? t("mfa.stepUpTitle") : t("mfa.stepUpNoFactorTitle")}
            </h2>

            {mode === "code" ? (
              <>
                <p className="text-sm text-muted-foreground">{t("mfa.stepUpBody")}</p>
                <label className="block text-sm font-medium text-foreground" htmlFor="step-up-code">
                  {t("mfa.codeLabel")}
                </label>
                <Input
                  id="step-up-code"
                  data-testid="step-up-code"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={6}
                  placeholder={t("mfa.codePlaceholder")}
                  value={code}
                  onChange={(event) => setCode(event.target.value)}
                />
                {errorKey ? (
                  <p role="alert" data-testid="step-up-error" className="text-sm text-destructive">
                    {t(errorKey)}
                  </p>
                ) : null}
                <Button
                  className="min-h-11 w-full"
                  data-testid="step-up-submit"
                  disabled={busy || code.trim().length === 0}
                  onClick={() => {
                    void submitCode(code).then((ok) => {
                      if (ok) setCode("");
                    });
                  }}
                >
                  {t("mfa.stepUpConfirm")}
                </Button>
              </>
            ) : (
              <>
                <p data-testid="step-up-no-factor" className="text-sm text-muted-foreground">
                  {t("mfa.stepUpNoFactorBody")}
                </p>
                <Link
                  to="/settings"
                  data-testid="step-up-settings-link"
                  className="inline-flex min-h-11 w-full items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground"
                >
                  {t("mfa.stepUpGoToSettings")}
                </Link>
              </>
            )}

            <Button
              variant="outline"
              className="min-h-11 w-full"
              data-testid="step-up-cancel"
              disabled={busy}
              onClick={() => {
                setCode("");
                close();
              }}
            >
              {t("settings.cancel")}
            </Button>
          </PageCard>
        </div>
      )}
    </>
  );
}

export default StepUpGate;
