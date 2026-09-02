import { Link } from "@tanstack/react-router";
import { useRef, useState, type ReactNode } from "react";

import { PageCard } from "@/components/shell/page-card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
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
 *
 * U4i-6 (a) — STACKING LAW (INC-124). The gate used to be a plain in-tree
 * `fixed z-50` panel, so any Radix dialog that ARMED the action (the delete
 * confirm) portalled to the end of <body> at the same z and painted over it —
 * and kept the focus trap. It now renders through the dialog primitive's own
 * portal on a dedicated TOP layer (z-100/101) with focus moved to the code
 * input, so the arming dialog stays visible beneath and step-up is usable.
 */
export function StepUpGate({ children }: { children: (guard: GuardFn) => ReactNode }) {
  const { t } = useI18n();
  const { mode, busy, errorKey, guard, submitCode, close } = useStepUp();
  const [code, setCode] = useState("");
  const codeRef = useRef<HTMLInputElement | null>(null);

  const cancel = () => {
    setCode("");
    close();
  };

  return (
    <>
      {children(guard)}

      {mode === "closed" ? null : (
        <Dialog
          open
          onOpenChange={(next) => {
            if (!next && !busy) cancel();
          }}
        >
          <DialogContent
            data-testid="step-up-modal"
            overlayClassName="z-[100] bg-foreground/40"
            className="z-[101] block w-[min(24rem,calc(100vw-1.5rem))] max-w-sm border-0 bg-transparent p-0 shadow-none"
            onOpenAutoFocus={(event) => {
              if (mode !== "code") return;
              event.preventDefault();
              codeRef.current?.focus();
            }}
          >
            <DialogTitle asChild>
              <h2 id="step-up-title" className="sr-only">
                {mode === "code" ? t("mfa.stepUpTitle") : t("mfa.stepUpNoFactorTitle")}
              </h2>
            </DialogTitle>
            <PageCard className="w-full space-y-3">
              <p className="text-base font-semibold text-foreground">
                {mode === "code" ? t("mfa.stepUpTitle") : t("mfa.stepUpNoFactorTitle")}
              </p>

              {mode === "code" ? (
                <>
                  <p className="text-sm text-muted-foreground">{t("mfa.stepUpBody")}</p>
                  <label
                    className="block text-sm font-medium text-foreground"
                    htmlFor="step-up-code"
                  >
                    {t("mfa.codeLabel")}
                  </label>
                  <Input
                    id="step-up-code"
                    ref={codeRef}
                    data-testid="step-up-code"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    maxLength={6}
                    placeholder={t("mfa.codePlaceholder")}
                    value={code}
                    onChange={(event) => setCode(event.target.value)}
                  />
                  {errorKey ? (
                    <p
                      role="alert"
                      data-testid="step-up-error"
                      className="text-sm text-destructive"
                    >
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
                onClick={cancel}
              >
                {t("settings.cancel")}
              </Button>
            </PageCard>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

export default StepUpGate;
