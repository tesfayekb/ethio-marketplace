import type { MessageKey } from "@/i18n";
import { ownValue } from "@/lib/own-key";
import type { Refusal, RefusalFamily } from "@/lib/refusal";

/**
 * L8 (DEC-339, wave 3) — the monetisation console's refusal family for the one
 * Field: the kit's `required` words, and each judge's own words for a single
 * field's bad answer (the judges' keys, read as themselves). A rule across
 * fields (`emptyOverride`, `launchRequired`) and every door refusal stay in the
 * dialog's `<prefix>-error` line (`MonetisationErrorLine`).
 */
const FIELD_KEYS: readonly MessageKey[] = [
  "admin.packages.error.badAmount",
  "admin.monetisation.error.badCreditCost",
  "admin.packages.error.badDays",
  "admin.monetisation.error.badPhotos",
  "admin.monetisation.error.badCaps",
  "admin.monetisation.error.badFreeAds",
  "admin.monetisation.error.badLaunch",
  "admin.packages.error.badKey",
  "admin.monetisation.error.badName",
];

export const MONETISATION_REFUSALS: RefusalFamily = {
  words: {
    required: "post.refusal.required",
    ...Object.fromEntries(FIELD_KEYS.map((key) => [key, key])),
  },
  generic: "admin.packages.error.unknown",
};

/** The refusals a field shows: the gate's blank mark first, then the judge's own. */
export function refusalFor(
  field: string,
  marks: readonly Refusal[],
  own: readonly Refusal[],
): Refusal | null {
  return (
    marks.find((mark) => mark.field === field) ?? own.find((mark) => mark.field === field) ?? null
  );
}

/**
 * A judge's key on the fields that earned it (`fieldsOf` names them for the
 * answers at hand), or null when the key is not a single field's refusal.
 */
export function ownRefusals(
  key: MessageKey,
  fieldsOf: Readonly<Partial<Record<MessageKey, readonly string[]>>>,
): Refusal[] | null {
  const fields = ownValue(fieldsOf, key);
  if (fields === undefined || fields.length === 0) return null;
  return fields.map((field) => ({ field, reason: key }));
}
