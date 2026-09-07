import { useCallback, useRef, useState } from "react";

import type { MessageKey } from "@/i18n";

import { isStepUpFresh, isStepUpRequiredError, listFactors, stepUpWithCode } from "./mfa-service";

/**
 * U1f — THE CLIENT SIDE OF STEP-UP (INC-079).
 *
 * `guard(action)` is the only entry point:
 *   1. the session is fresh (token-derived, DEC-040) -> the action runs
 *      immediately;
 *   2. otherwise, with a TOTP factor present -> the modal asks for a code; a
 *      successful verify raises the session and the action runs;
 *   3. no factor exists -> the modal explains and links to settings; the
 *      action NEVER runs and no RPC is sent (MF-3).
 *
 * L5 / DEC-041 — THE COMPLETION CONTRACT (fixes INC-166).
 *
 * `guard` used to resolve as soon as the modal OPENED, so any caller reading
 * the action's result in a `.then()` (the Sync-keys card's counts, the
 * language editor's "saved" line) ran BEFORE the action had produced anything
 * — the production bug where a stepped-up sync reported nothing.
 *
 * The promise `guard` returns now settles on the ACTION:
 *   • fresh session   -> resolves with the action's value, rejects with its error;
 *   • after step-up   -> the same, once `submitCode` has run the pending action.
 * A cancelled / no-factor gate NEVER settles it: the action did not happen, so
 * neither success nor a failure message may be claimed (law F4). Callers
 * therefore only observe outcomes that really occurred.
 *
 * DEFENCE IN DEPTH: if an action reaches the server anyway and the RPC raises
 * 'step-up required' (SQLSTATE P0009), the same modal re-opens against the same
 * pending promise and the action is retried after verification. The server, not
 * this hook, is the authority (F3).
 */

export type StepUpMode = "closed" | "code" | "no-factor";

type PendingAction<T = unknown> = () => T | Promise<T>;

type Pending = {
  action: PendingAction;
  resolve: (value: unknown) => void;
  reject: (error: unknown) => void;
};

/** The gate callback handed to children of <StepUpGate>. */
export type GuardFn = <T>(action: () => T | Promise<T>) => Promise<T>;

export function useStepUp() {
  const [mode, setMode] = useState<StepUpMode>("closed");
  const [busy, setBusy] = useState(false);
  const [errorKey, setErrorKey] = useState<MessageKey | null>(null);
  const pendingRef = useRef<Pending | null>(null);

  const close = useCallback(() => {
    // Deliberately leaves the pending promise unsettled: nothing ran.
    pendingRef.current = null;
    setMode("closed");
    setErrorKey(null);
    setBusy(false);
  }, []);

  /** Parks the action behind the modal; the caller's promise waits for it. */
  const open = useCallback(async (pending: Pending) => {
    pendingRef.current = pending;
    setErrorKey(null);
    const factors = await listFactors();
    setMode(factors.ok && factors.factors.length > 0 ? "code" : "no-factor");
  }, []);

  const guard = useCallback(
    async <T,>(action: () => T | Promise<T>): Promise<T> => {
      const park = () =>
        new Promise<T>((resolve, reject) => {
          void open({
            action: action as PendingAction,
            resolve: resolve as (value: unknown) => void,
            reject,
          });
        });

      // DEC-040: an aal2 claim alone is not enough — the factor must still
      // exist and the token's totp verification must be inside the window.
      if (await isStepUpFresh()) {
        try {
          return await action();
        } catch (error) {
          if (isStepUpRequiredError(error)) return park();
          throw error;
        }
      }
      return park();
    },
    [open],
  );

  const submitCode = useCallback(async (code: string) => {
    const pending = pendingRef.current;
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
    if (pending) {
      try {
        pending.resolve(await pending.action());
      } catch (error) {
        // F4: a post-step-up failure is the caller's to render, never swallowed.
        pending.reject(error);
      }
    }
    return true;
  }, []);

  return { mode, busy, errorKey, guard, submitCode, close };
}
