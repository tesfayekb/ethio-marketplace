import type { MessageKey } from "@/i18n";
import { ownValue } from "@/lib/own-key";
import type { Refusal, RefusalFamily, RefusalRead } from "@/lib/refusal";

/**
 * L8 (DEC-339, wave 3) — the monetisation console's refusal family for the one
 * Field: the kit's `required` words, and each judge's own words for a single
 * field's bad answer (the judges' keys, read as themselves). A rule across
 * fields (`emptyOverride`, `launchRequired`) and every door refusal stay in the
 * dialog's `<prefix>-error` line (`MonetisationProblemLine`).
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

/**
 * F1-6b — THE CONSOLE'S WORDS FOR THE SEVEN DOORS' CODES, for the one reader
 * (DEC-339). The staff doors answer a refusal as `code[:detail]` (a
 * `door_refuse` code, behind the shell or raised by the reader); each dialog's
 * problem line keeps the words it drew before the doors moved to codes (the
 * specs read them word for word). The gates share one denied line, a
 * deactivated person included; a code with no words here draws the console's
 * own generic line, with the code beneath it. `src/lib/door-codes.ts` does not
 * grow (INC-1153): the words of a family live in the family's files.
 */
export const MONETISATION_DOOR_REFUSALS = {
  // L22b — the dial's words that say WHEN, for a reset instant still to come.
  when: { rateLimited: "admin.packages.error.rateLimitedWhen" },
  words: {
    notSignedIn: "admin.packages.error.denied",
    permissionDenied: "admin.packages.error.denied",
    accountDeactivated: "admin.packages.error.denied",
    stepUpRequired: "admin.packages.error.stepUp",
    // The step-up gate's own SQLSTATE, when it arrives with no message.
    P0009: "admin.packages.error.stepUp",
    rateLimited: "admin.packages.error.rateLimited",
    // admin_save_listing_package
    badKey: "admin.packages.error.badKey",
    unknownKind: "admin.monetisation.error.unknownKind",
    kindChange: "admin.monetisation.error.kindChange",
    badName: "admin.monetisation.error.badName",
    badDays: "admin.packages.error.badDays",
    badPhotos: "admin.monetisation.error.badPhotos",
    unknownPlacement: "admin.monetisation.error.unknownPlacement",
    perksOnReach: "admin.monetisation.error.perksOnReach",
    capsOnLevel: "admin.monetisation.error.capsOnLevel",
    badCaps: "admin.monetisation.error.badCaps",
    // admin_save_level_override / admin_clear_level_override
    unknownLevel: "admin.monetisation.error.unknownLevel",
    notMainCategory: "admin.monetisation.error.notMainCategory",
    unknownCountry: "admin.packages.error.unknownCountry",
    emptyOverride: "admin.monetisation.error.emptyOverride",
    overrideNotFound: "admin.monetisation.error.overrideNotFound",
    // admin_save_package_price / admin_edit_package_price / admin_end_package_price
    unknownPackage: "admin.packages.error.unknownPackage",
    badAmount: "admin.packages.error.badAmount",
    badCreditCost: "admin.monetisation.error.badCreditCost",
    unknownCurrency: "admin.packages.error.unknownCurrency",
    unknownCategory: "admin.packages.error.unknownCategory",
    badWindow: "admin.packages.error.badWindow",
    overlappingWindow: "admin.packages.error.overlap",
    priceNotFound: "admin.packages.error.notFound",
    priceInUse: "admin.monetisation.error.priceInUse",
    priceEnded: "admin.packages.error.alreadyEnded",
    // admin_save_market_settings
    unknownReach: "admin.monetisation.error.unknownReach",
    badFreeAds: "admin.monetisation.error.badFreeAds",
    launchRequired: "admin.monetisation.error.launchRequired",
    badLaunch: "admin.monetisation.error.badLaunch",
  },
  // The step-up gate's raise is a sentence (`step-up required: …`), matched while the gate stays one.
  sentences: [[/step-up required/i, "admin.packages.error.stepUp"]],
  generic: "admin.packages.error.unknown",
} as const satisfies RefusalFamily;

/** What a dialog's problem line draws: a key, and the unread code beneath it when no words named it. */
export interface MonetisationRefusal {
  key: MessageKey;
  /** The door's own code when no key names it (shown as a reason line). */
  raw: string | null;
  /** L22b — the door's read with its tail, so the line can say when (`refusalText`). */
  read?: RefusalRead;
}
