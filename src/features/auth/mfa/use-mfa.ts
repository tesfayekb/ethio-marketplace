import { useCallback, useEffect, useState } from "react";

import type { MessageKey } from "@/i18n";

import {
  MFA_ENROLL_REFUSALS,
  enrollTotp,
  getAal,
  listFactors,
  unenrollFactor,
  verifyFactor,
  type AalState,
  type EnrollResult,
  type MfaFactor,
} from "./mfa-service";

/**
 * U1f — the settings-side MFA state (enroll / list / unenroll).
 * The step-up gate has its own hook (use-step-up.ts); this one never gates
 * anything, it only manages the enrollment surface.
 *
 * Cursor bundle 4 (INC-1147, class 2) — A SETUP THE PROVIDER HOLDS HALF-DONE IS OFFERED BACK. The
 * page's own `pending` holds the setup this screen started (its QR and its secret, given once); the
 * provider's list holds every unfinished setup, here, in another tab or on another device, and is read
 * on load into `unfinished`. A setup the page cannot show again cannot be continued: it says one is in
 * progress and offers Start again, which clears it before it begins. A failed read is `readFailed` —
 * an error on the card, never "off".
 */

type PendingEnrollment = { factorId: string; qrCode: string; secret: string; uri: string };

export function useMfa() {
  const [factors, setFactors] = useState<MfaFactor[] | null>(null);
  const [unfinished, setUnfinished] = useState(false);
  const [readFailed, setReadFailed] = useState(false);
  const [aal, setAal] = useState<AalState>({ current: null, next: null });
  const [pending, setPending] = useState<PendingEnrollment | null>(null);
  const [busy, setBusy] = useState(false);
  const [errorKey, setErrorKey] = useState<MessageKey | null>(null);
  const [successKey, setSuccessKey] = useState<MessageKey | null>(null);

  const refresh = useCallback(async () => {
    const result = await listFactors();
    if (result.ok) {
      setFactors(result.factors);
      setUnfinished(result.pending.length > 0);
      setReadFailed(false);
    } else {
      // Unknown, never "off": the card says the read failed and offers nothing that depends on it.
      setFactors(null);
      setUnfinished(false);
      setReadFailed(true);
      setErrorKey(result.errorKey);
    }
    // A failed level read leaves the level unknown (never "aal1"): nothing here depends on it.
    const level = await getAal();
    setAal(level.ok ? { current: level.current, next: level.next } : { current: null, next: null });
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const startEnrollment = useCallback(async (friendlyName: string) => {
    setErrorKey(null);
    setSuccessKey(null);
    setBusy(true);
    const result: EnrollResult = await enrollTotp(friendlyName);
    setBusy(false);
    if (!result.ok) {
      setErrorKey(result.errorKey);
      return false;
    }
    setUnfinished(false);
    setPending({
      factorId: result.factorId,
      qrCode: result.qrCode,
      secret: result.secret,
      uri: result.uri,
    });
    return true;
  }, []);

  const cancelEnrollment = useCallback(async () => {
    const factorId = pending?.factorId;
    setPending(null);
    setErrorKey(null);
    if (factorId) await unenrollFactor(factorId);
    await refresh();
  }, [pending, refresh]);

  const confirmEnrollment = useCallback(
    async (code: string) => {
      if (!pending) return false;
      setErrorKey(null);
      setBusy(true);
      const result = await verifyFactor(pending.factorId, code, MFA_ENROLL_REFUSALS);
      setBusy(false);
      if (!result.ok) {
        setErrorKey(result.errorKey);
        return false;
      }
      setPending(null);
      setSuccessKey("mfa.enrolledDone");
      await refresh();
      return true;
    },
    [pending, refresh],
  );

  /** MF-5 — removal re-verifies first; only then does the factor go away. */
  const removeFactor = useCallback(
    async (factorId: string, code: string) => {
      setErrorKey(null);
      setBusy(true);
      const verified = await verifyFactor(factorId, code);
      if (!verified.ok) {
        setBusy(false);
        setErrorKey(verified.errorKey);
        return false;
      }
      const removed = await unenrollFactor(factorId);
      setBusy(false);
      if (!removed.ok) {
        setErrorKey(removed.errorKey);
        return false;
      }
      setSuccessKey("mfa.removed");
      await refresh();
      return true;
    },
    [refresh],
  );

  return {
    factors,
    unfinished,
    readFailed,
    aal,
    pending,
    busy,
    errorKey,
    successKey,
    refresh,
    startEnrollment,
    cancelEnrollment,
    confirmEnrollment,
    removeFactor,
  };
}
