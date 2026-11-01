import { Suspense, useEffect, type ReactNode } from "react";

import { resilientLazy } from "@/lib/resilient-lazy";

import type { StepUpDialogProps } from "./step-up-dialog";
import { useStepUp, type GuardFn } from "./use-step-up";

/** The dialog's code did not download: the guarded action ends as unavailable (INC-911). */
function StepUpUnreachable({ unavailable }: StepUpDialogProps) {
  useEffect(() => {
    unavailable();
  }, [unavailable]);
  return null;
}

const StepUpDialog = resilientLazy(
  () => import("./step-up-dialog").then((module) => module.StepUpDialog),
  "the step-up dialog",
  StepUpUnreachable,
);

/**
 * U1f — STEP-UP GATE (INC-079).
 *
 * Render-prop wrapper: children receive `guard`, and every sensitive action's
 * click handler passes its work to it. While an action waits, the gate draws
 * its dialog (step-up-dialog.tsx) on the TOP layer (INC-124).
 *
 * Turn S6-3 (row 48) — the dialog is fetched on the first step-up, never on the
 * page's first download (resilientLazy); a failed download reports through the
 * shell's one notice and ends the guarded action as StepUpUnavailable, as a
 * failed overlay download does (the dialog root's `onUnavailable`).
 */
export function StepUpGate({ children }: { children: (guard: GuardFn) => ReactNode }) {
  const { mode, busy, errorKey, guard, submitCode, close, unavailable } = useStepUp();

  return (
    <>
      {children(guard)}

      {mode === "closed" ? null : (
        <Suspense fallback={null}>
          <StepUpDialog
            mode={mode}
            busy={busy}
            errorKey={errorKey}
            submitCode={submitCode}
            close={close}
            unavailable={unavailable}
          />
        </Suspense>
      )}
    </>
  );
}

export default StepUpGate;
