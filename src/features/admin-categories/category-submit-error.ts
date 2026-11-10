import { useState } from "react";

import { stepUpAbortKey } from "@/features/auth/mfa/mfa-service";
import { useI18n } from "@/i18n";
import { doorKeyText } from "@/lib/refusal-tail";

export function useSubmitError() {
  const { t } = useI18n();
  const [message, setMessage] = useState<string | null>(null);
  /**
   * F4 — a server refusal raises a TRANSLATION KEY (e.g. C2g's
   * `admin.categories.error.catchallParent`); it is rendered through `t`, so
   * the operator never reads a raw key. Anything else falls back to the
   * generic save failure.
   */
  const fail = (error: unknown) => {
    const abort = stepUpAbortKey(error);
    if (abort !== undefined) {
      setMessage(abort === null ? null : t(abort));
      return;
    }
    // ES4 — a door's refusal is a plain error object, not an Error instance.
    const raw =
      typeof (error as { message?: unknown } | null)?.message === "string"
        ? (error as { message: string }).message
        : "";
    // ES4 / T7 — any door's key, of any family (a move can raise the
    // parent-first refusal, `admin.attributes.error.parentAfterChild`), is read
    // by the shared helper with its tail ({count}, {detail}).
    const words = doorKeyText(raw, (key) => t(key as Parameters<typeof t>[0]));
    if (words !== null) {
      setMessage(words);
      return;
    }
    setMessage(raw === "" ? t("admin.categories.error.saveFailed") : raw);
  };
  return { message, setMessage, fail };
}
