import { useState } from "react";

import { stepUpAbortKey } from "@/features/auth/mfa/mfa-service";
import type { MessageKey } from "@/i18n";
import { errorText } from "@/lib/error-text";

import { PackagesDoorError, packagesErrorKey, type PackagesRefusal } from "./packages-service";

/** F4 — one refusal mapping for every packages surface. */
export function usePackagesError() {
  const [refusal, setRefusal] = useState<PackagesRefusal | null>(null);
  const clear = () => setRefusal(null);
  const fail = (error: unknown) => {
    const abort = stepUpAbortKey(error);
    if (abort !== undefined) {
      setRefusal(abort === null ? null : { key: abort as MessageKey, raw: null });
      return;
    }
    if (error instanceof PackagesDoorError) {
      setRefusal(packagesErrorKey(error.message, error.code));
      return;
    }
    setRefusal(packagesErrorKey(error === null || error === undefined ? "" : errorText(error)));
  };
  const render = (message: MessageKey) => setRefusal({ key: message, raw: null });
  return { refusal, clear, fail, render };
}
