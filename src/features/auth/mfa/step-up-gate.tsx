import { Link } from "@tanstack/react-router";
import { useRef, useState, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useI18n } from "@/i18n";

import { useStepUp, type GuardFn } from "./use-step-up";

/**
 * U1f — STEP-UP GATE (INC-079).
 *
 * Render-prop wrapper: children receive `guard`, and every sensitive action's
 * click handler passes its work to it. The modal below is the one dialog look
 * (turn S6-1), 360-first (full-width controls, ≥44px targets) and RTL-safe
 * (logical spacing only).
 *
 * U4i-6 (a) — STACKING LAW (INC-124). The gate used to be a plain in-tree
 * `fixed z-50` panel, so any Radix dialog that ARMED the action (the delete
 * confirm) portalled to the end of <body> at the same z and painted over it —
 * and kept the focus trap. It now renders through the dialog primitive's own
 * portal on the dedicated TOP layer (`layer="top"`, layers.ts Z_TOP) with focus
 * moved to the code input, so the arming dialog stays visible beneath and
 * step-up is usable.
 */
export function StepUpGate({ children }: { children: (guard: GuardFn) => ReactNode }) {
  const { t } = useI18n();
  const { mode, busy, errorKey, guard, submitCode, close, unavailable } = useStepUp();
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
          onUnavailable={unavailable}
          onOpenChange={(next) => {
            if (!next && !busy) cancel();
          }}
        >
          <DialogContent
            data-testid="step-up-modal"
            layer="top"
            size="narrow"
            onOpenAutoFocus={(event) => {
              if (mode !== "code") return;
              event.preventDefault();
              codeRef.current?.focus();
            }}
          >
            <DialogHeader>
              <DialogTitle id="step-up-title">
                {mode === "code" ? t("mfa.stepUpTitle") : t("mfa.stepUpNoFactorTitle")}
              </DialogTitle>
              {mode === "code" ? (
                <DialogDescription>{t("mfa.stepUpBody")}</DialogDescription>
              ) : (
                <DialogDescription data-testid="step-up-no-factor">
                  {t("mfa.stepUpNoFactorBody")}
                </DialogDescription>
              )}
            </DialogHeader>

            {mode === "code" ? (
              <div className="space-y-2">
                <label className="block text-sm font-medium text-foreground" htmlFor="step-up-code">
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
                  <p role="alert" data-testid="step-up-error" className="text-sm text-destructive">
                    {t(errorKey)}
                  </p>
                ) : null}
              </div>
            ) : null}

            <DialogFooter>
              <Button
                variant="outline"
                size="touch"
                data-testid="step-up-cancel"
                disabled={busy}
                onClick={cancel}
              >
                {t("settings.cancel")}
              </Button>
              {mode === "code" ? (
                <Button
                  size="touch"
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
              ) : (
                <Button asChild size="touch">
                  <Link to="/settings" data-testid="step-up-settings-link">
                    {t("mfa.stepUpGoToSettings")}
                  </Link>
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

export default StepUpGate;
