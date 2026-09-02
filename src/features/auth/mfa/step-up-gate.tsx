import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";

import { PageCard } from "@/components/shell/page-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/i18n";

import { useStepUp, type GuardFn } from "./use-step-up";

/**
 * U1f — STEP-UP GATE (INC-079).
 *
 * Render-prop wrapper: children receive `guard`, and every sensitive action's
 * click handler passes its work to it. The modal below is PageCard-styled,
 * 360-first (full-width controls, ≥44px targets) and RTL-safe (logical
 * spacing only).
 */
export function StepUpGate({ children }: { children: (guard: GuardFn) => ReactNode }) {
  const { t } = useI18n();
  const { mode, busy, errorKey, guard, submitCode, close } = useStepUp();
  const [code, setCode] = useState("");

  return (
    <>
      {children(guard)}

      {mode === "closed" ? null : (
        <Dialog
          open
          onOpenChange={(next) => {
            if (!next && !busy) {
              setCode("");
              close();
            }
          }}
        >
          {/* U4i-6 (a) — STEP-UP OWNS THE TOP LAYER (INC-124). Rendered through
              the dialog primitive's portal so it stacks ABOVE any dialog that
              armed the action (a delete confirm stays open beneath), and so
              Radix's own focus scope moves focus INTO the code input rather
              than the underlying dialog trapping it. */}
          <DialogContent
            data-testid="step-up-modal"
            aria-labelledby="step-up-title"
            overlayClassName="z-[100] bg-foreground/40"
            className="z-[101] block w-[min(24rem,calc(100vw-1.5rem))] max-w-sm p-0"
            onOpenAutoFocus={(event) => {
              if (mode !== "code") return;
              event.preventDefault();
              codeRef.current?.focus();
            }}
          >
            <DialogTitle className="sr-only">
              {mode === "code" ? t("mfa.stepUpTitle") : t("mfa.stepUpNoFactorTitle")}
            </DialogTitle>
            <PageCard className="w-full space-y-3">
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
