import { useState } from "react";

import { stepUpAbortKey } from "@/features/auth/mfa/mfa-service";
import type { MessageKey } from "@/i18n";
import { errorText } from "@/lib/error-text";
import { readRefusal } from "@/lib/refusal";

import { MONETISATION_DOOR_REFUSALS, type MonetisationRefusal } from "./monetisation-refusals";

/**
 * F4 — one refusal reading for every monetisation surface (the P-1 shape). A
 * door's refusal is read through the one reader (`readRefusal`, DEC-339) over
 * the console's words (`MONETISATION_DOOR_REFUSALS`); a code the words do not
 * hold draws the console's generic line with the code beneath it.
 */
export function useMonetisationError() {
  const [refusal, setRefusal] = useState<MonetisationRefusal | null>(null);
  const clear = () => setRefusal(null);
  const fail = (error: unknown) => {
    const abort = stepUpAbortKey(error);
    if (abort !== undefined) {
      setRefusal(abort === null ? null : { key: abort as MessageKey, raw: null });
      return;
    }
    const read = readRefusal(error, MONETISATION_DOOR_REFUSALS);
    if (read.silent) {
      setRefusal(null);
      return;
    }
    const text =
      typeof error === "string"
        ? error.trim()
        : error === null || error === undefined
          ? ""
          : errorText(error).trim();
    if (read.branch === "generic" && text !== "")
      console.warn("[monetisation] unmapped refusal", text);
    setRefusal({
      key: read.key,
      // D51 (DEC-464) — an unmapped refusal's text goes to the console, never to the words.
      raw: null,
      // L22b — the read rides along only when it can say when (other shapes unchanged).
      ...(read.when === undefined || read.tail === undefined ? {} : { read }),
    });
  };
  const render = (message: MessageKey) => setRefusal({ key: message, raw: null });
  return { refusal, clear, fail, render };
}
