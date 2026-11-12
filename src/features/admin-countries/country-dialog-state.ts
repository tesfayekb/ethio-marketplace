import { useState } from "react";

import { stepUpAbortKey } from "@/features/auth/mfa/mfa-service";
import { type MessageKey } from "@/i18n";
import { errorText } from "@/lib/error-text";

import { countryErrorKey, type CountryRefusal } from "./countries-service";

/** F4 — one refusal mapping for every countries surface (B2). */
export function useCountryError() {
  const [refusal, setRefusal] = useState<CountryRefusal | null>(null);
  const clear = () => setRefusal(null);
  const fail = (error: unknown) => {
    const abort = stepUpAbortKey(error);
    if (abort !== undefined) {
      setRefusal(abort === null ? null : { key: abort as MessageKey, raw: null });
      return;
    }
    setRefusal(countryErrorKey(error === null || error === undefined ? "" : errorText(error)));
  };
  const render = (message: MessageKey) => setRefusal({ key: message, raw: null });
  return { refusal, clear, fail, render };
}

export function numberOrZero(raw: string): number {
  const parsed = Number(raw.trim());
  return Number.isFinite(parsed) ? parsed : 0;
}
