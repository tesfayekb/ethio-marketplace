/**
 * Bundle 3 step 11 (INC-402) — READING A PHONE NUMBER.
 *
 * The number a seller types is read by libphonenumber-js ("libphonenumber-js/min",
 * 1.11.18 — the version phone-plans.ts was taken from). The library is NEVER
 * imported statically: `loadPhoneLib()` fetches it when the contact step opens,
 * so it stays off the first-paint path (scripts/check-marketplace-imports.mjs
 * forbids a static import). A failed load is reported, never replaced by a rule.
 *
 * The saved value is the parsed "+ code digits" form the door expects
 * (^\+[0-9]{7,15}$, unchanged). A number the library cannot read is kept as the
 * typed digits behind the code, and the door refuses it as before.
 */
import { CALLING_CODES } from "./calling-codes";

export interface PhoneLib {
  parsePhoneNumberFromString: (
    text: string,
    country?: string,
  ) =>
    | { number: string; countryCallingCode: string; formatInternational: () => string }
    | undefined;
}

let pending: Promise<PhoneLib> | null = null;

/** The one dynamic import; a failure clears the cache so a retry can try again. */
export function loadPhoneLib(): Promise<PhoneLib> {
  if (pending === null) {
    pending = import("libphonenumber-js/min").then(
      (module) => module as unknown as PhoneLib,
      (error: unknown) => {
        pending = null;
        throw error;
      },
    );
  }
  return pending;
}

/** What may stay in the box while typing: digits, separators and one leading +. */
export function tidyTyping(typed: string): string {
  const lead = typed.trimStart().startsWith("+") ? "+" : "";
  return lead + typed.replace(/[^0-9\s.\-()]/g, "");
}

/** The digits alone, separators removed (a leading zero is kept). */
export function typedDigits(typed: string): string {
  return typed.replace(/\D/g, "");
}

/** International grouping without the "+code " prefix. */
function nationalGrouping(international: string, code: string): string {
  const prefix = `+${code}`;
  return international.startsWith(prefix)
    ? international.slice(prefix.length).trim()
    : international;
}

/**
 * The typed national text, read for `iso`. `value` is what is saved; `shown`
 * the grouped national part. Unreadable → typed digits behind the code.
 */
export function readPhone(
  lib: PhoneLib,
  iso: string,
  typed: string,
): { value: string; shown: string; parsed: boolean } {
  const digits = typedDigits(typed);
  if (digits === "") return { value: "", shown: "", parsed: false };
  const code = CALLING_CODES[iso];
  const parsed = code === undefined ? undefined : lib.parsePhoneNumberFromString(digits, iso);
  if (parsed !== undefined && parsed.countryCallingCode === code) {
    return {
      value: parsed.number,
      shown: nationalGrouping(parsed.formatInternational(), code),
      parsed: true,
    };
  }
  return { value: code === undefined ? digits : `+${code}${digits}`, shown: digits, parsed: false };
}

/** A saved "+…" number grouped for display ("+251 91 123 4567"); unreadable → as saved. */
export function groupedPhone(lib: PhoneLib | null, saved: string): string {
  if (lib === null || !saved.startsWith("+")) return saved;
  return lib.parsePhoneNumberFromString(saved)?.formatInternational() ?? saved;
}
