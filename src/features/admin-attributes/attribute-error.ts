import { useState } from "react";

import { stepUpAbortKey } from "@/features/auth/mfa/mfa-service";
import { useI18n, type MessageKey } from "@/i18n";
import { fillRefusal, splitRefusal } from "@/lib/refusal-tail";

import { useAttributeLabel } from "./use-attribute-label";

/**
 * F4 — a server refusal raises a TRANSLATION KEY, optionally with a `:count`
 * tail (`admin.attributes.error.deleteHasLinks:7`). Both namespaces the
 * attribute doors can raise are rendered through `t`; anything else falls back
 * to the generic save failure.
 */
export function useAttributeError() {
  const { t } = useI18n();
  const attributeLabel = useAttributeLabel();
  const [message, setMessage] = useState<string | null>(null);
  const fail = (error: unknown) => {
    // FIX-SCAN-1 ISSUE 2 — the gate settling without running the action.
    const abort = stepUpAbortKey(error);
    if (abort !== undefined) {
      setMessage(abort === null ? null : t(abort));
      return;
    }
    const raw =
      typeof (error as { message?: unknown }).message === "string"
        ? (error as { message: string }).message
        : "";
    const { key, tail } = splitRefusal(raw);
    if (key.startsWith("admin.attributes.error.") || key.startsWith("admin.categories.error.")) {
      /**
       * DEC-050 L3b — an option refusal names its parts with pipes
       * (`<attribute>|<target>`): the sentence names the TARGET, never a raw
       * token pasted mid-line. ES4 — the tail is read by the shared helper.
       */
      setMessage(fillRefusal(t(key as MessageKey), tail));
      return;
    }
    setMessage(raw === "" ? t("admin.attributes.error.saveFailed") : raw);
  };
  return { message, setMessage, fail };
}
