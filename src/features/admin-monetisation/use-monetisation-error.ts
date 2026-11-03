import { useState } from "react";

import { stepUpAbortKey } from "@/features/auth/mfa/mfa-service";
import type { MessageKey } from "@/i18n";
import { errorText } from "@/lib/error-text";

import {
  MonetisationDoorError,
  monetisationErrorKey,
  type MonetisationRefusal,
} from "./monetisation-service";

/** F4 — one refusal mapping for every monetisation surface (the P-1 shape). */
export function useMonetisationError() {
  const [refusal, setRefusal] = useState<MonetisationRefusal | null>(null);
  const clear = () => setRefusal(null);
  const fail = (error: unknown) => {
    const abort = stepUpAbortKey(error);
    if (abort !== undefined) {
      setRefusal(abort === null ? null : { key: abort as MessageKey, raw: null });
      return;
    }
    if (error instanceof MonetisationDoorError) {
      setRefusal(monetisationErrorKey(error.message, error.code));
      return;
    }
    setRefusal(monetisationErrorKey(error === null || error === undefined ? "" : errorText(error)));
  };
  const render = (message: MessageKey) => setRefusal({ key: message, raw: null });
  return { refusal, clear, fail, render };
}
