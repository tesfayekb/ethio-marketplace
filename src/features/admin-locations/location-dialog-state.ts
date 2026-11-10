import { useState } from "react";

import { stepUpAbortKey } from "@/features/auth/mfa/mfa-service";
import { useI18n, type MessageKey } from "@/i18n";
import { errorText } from "@/lib/error-text";

import { locationErrorKey, type LocationRefusal } from "./locations-service";

/** F4 — one refusal mapping for every locations surface (B2). */
export function useLocationError() {
  const { t } = useI18n();
  const [refusal, setRefusal] = useState<LocationRefusal | null>(null);
  const clear = () => setRefusal(null);
  const fail = (error: unknown) => {
    const abort = stepUpAbortKey(error);
    if (abort !== undefined) {
      setRefusal(abort === null ? null : { key: abort as MessageKey, detailKey: null, raw: null });
      return;
    }
    setRefusal(locationErrorKey(error === null || error === undefined ? "" : errorText(error)));
  };
  const render = (message: MessageKey) => setRefusal({ key: message, detailKey: null, raw: null });
  return { refusal, clear, fail, render, t };
}

export function numberOrNull(raw: string): number | null {
  const value = raw.trim();
  if (value === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}
