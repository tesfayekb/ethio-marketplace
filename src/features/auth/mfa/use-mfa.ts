import { useCallback, useEffect, useState } from "react";

import type { MessageKey } from "@/i18n";

import {
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
 */

type PendingEnrollment = { factorId: string; qrCode: string; secret: string; uri: string };

export function useMfa() {
  const [factors, setFactors] = useState<MfaFactor[] | null>(null);
  const [aal, setAal] = useState<AalState>({ current: null, next: null });
  const [pending, setPending] = useState<PendingEnrollment | null>(null);
  const [busy, setBusy] = useState(false);
  const [errorKey, setErrorKey] = useState<MessageKey | null>(null);
  const [successKey, setSuccessKey] = useState<MessageKey | null>(null);

  const refresh = useCallback(async () => {
    const result = await listFactors();
    setFactors(result.ok ? result.factors : []);
    if (!result.ok) setErrorKey(result.errorKey);
    setAal(await getAal());
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
      const result = await verifyFactor(pending.factorId, code);
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
