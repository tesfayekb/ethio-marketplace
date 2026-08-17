import { useCallback, useRef, useState } from "react";

import type { MessageKey } from "@/i18n";

import { isStepUpRequiredError, isSteppedUp, listFactors, stepUpWithCode } from "./mfa-service";

/**
 * U1f — THE CLIENT SIDE OF STEP-UP (INC-079).
 *
 * `guard(action)` is the only entry point:
 *   1. the session is already aal2  -> the action runs immediately;
 *   2. the session is aal1 and a TOTP factor exists -> the modal asks for a
 *      code; a successful verify raises the session to aal2 and the action
 *      runs, still inside the same user gesture flow;
 *   3. no factor exists -> the modal explains and links to settings; the
 *      action NEVER runs and no RPC is sent (MF-3).
 *
 * DEFENCE IN DEPTH: if an action reaches the server anyway (a caller that
 * forgot the gate, a stale AAL read), the RPC raises 'step-up required'
 * (SQLSTATE P0009); `guard` catches exactly that and re-opens the same modal,
 * then retries the action. The server, not this hook, is the authority (F3).
 *
 * AAL PERSISTENCE (observed): once GoTrue verifies a factor, the refreshed
 * session carries aal2 for its lifetime, so later sensitive actions in the
 * same session do not re-prompt. A FRESH sign-in starts at aal1 again.
 */

export type StepUpMode = "closed" | "code" | "no-factor";

type PendingAction = () => void | Promise<void>;

export function useStepUp() {
  const [mode, setMode] = useState<StepUpMode>("closed");
  const [busy, setBusy] = useState(false);
  const [errorKey, setErrorKey] = useState<MessageKey | null>(null);
  const pendingRef = useRef<PendingAction | null>(null);

  const close = useCallback(() => {
    pendingRef.current = null;
    setMode("closed");
    setErrorKey(null);
    setBusy(false);
  }, []);

  const open = useCallback(async (action: PendingAction) => {
    pendingRef.current = action;
    setErrorKey(null);
    const factors = await listFactors();
    setMode(factors.ok && factors.factors.length > 0 ? "code" : "no-factor");
  }, []);

  /** Runs the action, converting a server step-up refusal into the modal. */
  const runGuarded = useCallback(
    async (action: PendingAction) => {
      try {
        await action();
        return true;
      } catch (error) {
        if (isStepUpRequiredError(error)) {
          await open(action);
          return false;
        }
        throw error;
      }
    },
    [open],
  );

  const guard = useCallback(
    async (action: PendingAction) => {
      if (await isSteppedUp()) {
        await runGuarded(action);
        return;
      }
      await open(action);
    },
    [open, runGuarded],
  );

  const submitCode = useCallback(
    async (code: string) => {
      const action = pendingRef.current;
      setBusy(true);
      setErrorKey(null);
      const verified = await stepUpWithCode(code);
      if (!verified.ok) {
        setBusy(false);
        setErrorKey(verified.errorKey);
        return false;
      }
      setBusy(false);
      setMode("closed");
      pendingRef.current = null;
      if (action) await runGuarded(action);
      return true;
    },
    [runGuarded],
  );

  return { mode, busy, errorKey, guard, submitCode, close };
}
