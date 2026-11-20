import { useState } from "react";

import { useI18n, type MessageKey } from "@/i18n";
import { PARSE_INVALID_KEY } from "@/lib/parse-input";
import { readRefusal, refusalText, type RefusalFamily } from "@/lib/refusal";
import { ADMIN_WHEN, RATE_LIMITED_KEY } from "@/lib/refusal-tail";

/**
 * DEC-333 (F1-4b) — the markets console's own words for its doors' codes. Every id the console
 * spoke before the doors moved to codes keeps its line; `permissionDenied` (with or without its
 * `:scope`) reads the console's denied line, the gate's step-up sentence (SQLSTATE P0009) its own
 * line, and a code with no words of its own (`notSignedIn`, `accountDeactivated`) draws the
 * console's generic line.
 */
export const COUNTRY_REFUSALS = {
  when: ADMIN_WHEN,
  words: {
    rateLimited: RATE_LIMITED_KEY,
    permissionDenied: "admin.countries.error.denied",
    badCountryCode: "admin.countries.error.badCountryCode",
    badUnitSystem: "admin.countries.error.badUnitSystem",
    badCurrency: "admin.countries.error.badCurrency",
    nameRequired: "admin.countries.error.nameRequired",
    unknownCountry: "admin.countries.error.unknownCountry",
    scopedRolesExist: "admin.countries.error.scopedRolesExist",
    duplicateCategory: "admin.countries.error.duplicateCategory",
    notARoot: "admin.countries.error.notARoot",
    // DEC-339 — the editor's own Fields: the gate's blank and the parser's unreadable number.
    required: "post.refusal.required",
    badType: PARSE_INVALID_KEY,
  },
  sentences: [[/step[ -]?up/i, "admin.countries.error.stepUp"]],
  generic: "admin.countries.error.unknown",
} as const satisfies RefusalFamily;

/**
 * A markets screen's refusal state: `fail` reads a door's refusal through the one reader with this
 * family's words; a cancelled step-up says nothing. `render` shows a client-side check's own key.
 */
export function useCountryRefusal() {
  const { t, has, language } = useI18n();
  const [message, setMessage] = useState<string | null>(null);
  const clear = () => setMessage(null);
  const fail = (error: unknown) => {
    const read = readRefusal(error, COUNTRY_REFUSALS, has);
    setMessage(read.silent ? null : refusalText(read, t, undefined, language));
  };
  const render = (key: MessageKey) => setMessage(t(key));
  return { message, clear, fail, render };
}
