import { Link } from "@tanstack/react-router";
import { useRef, useState } from "react";

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
import { useI18n, type MessageKey } from "@/i18n";

import type { StepUpMode } from "./use-step-up";

export type StepUpDialogProps = {
  mode: Exclude<StepUpMode, "closed">;
  busy: boolean;
  errorKey: MessageKey | null;
  submitCode: (code: string) => Promise<boolean>;
  close: () => void;
  unavailable: () => void;
};

/**
 * U1f — THE STEP-UP GATE'S DIALOG (INC-079), drawn by StepUpGate (step-up-gate.tsx) while a
 * guarded action waits. The one dialog look (turn S6-1), 360-first (full-width controls,
 * ≥44px targets) and RTL-safe (logical spacing only).
 *
 * U4i-6 (a) — STACKING LAW (INC-124). It renders through the dialog primitive's own portal on
 * the dedicated TOP layer (`layer="top"`, layers.ts Z_TOP) with focus moved to the code input,
 * so a Radix dialog that ARMED the action (the delete confirm) stays visible beneath and
 * step-up is usable.
 *
 * Turn S6-3 (row 48) — its own file, fetched on the first step-up: the pages that draw the gate
 * no longer carry the dialog's code on their first download.
 */
export function StepUpDialog({
  mode,
  busy,
  errorKey,
  submitCode,
  close,
  unavailable,
}: StepUpDialogProps) {
  const { t } = useI18n();
  const [code, setCode] = useState("");
  const codeRef = useRef<HTMLInputElement | null>(null);

  const cancel = () => {
    setCode("");
    close();
  };

  return (
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
  );
}
