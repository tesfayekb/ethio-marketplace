import { useState } from "react";

import { useI18n } from "@/i18n";
import { readRefusal, refusalText, type RefusalFamily } from "@/lib/refusal";
import { ADMIN_WHEN, RATE_LIMITED_KEY } from "@/lib/refusal-tail";
import { PARSE_INVALID_KEY } from "@/lib/parse-input";

/**
 * DEC-333 (F1-4a) — the attribute library's own words for its doors' codes. Each code that
 * replaced a console key reads that key's words, its tail filling `{count}`, `{detail}` or
 * `{target}` where the words take one (DEC-050 L3b: `<attribute>|<target>`); `rankInherited`'s
 * tail is a diagnostic its words never draw. Bundle 10b (D50) gave the link doors' last codes
 * their words; a gate's code goes to the shell, and a code no family names reads the generic.
 */
export const ATTRIBUTE_REFUSALS = {
  when: ADMIN_WHEN,
  words: {
    rateLimited: RATE_LIMITED_KEY,
    /** DEC-339 — the one gate's words for a blank required answer (and the door's). */
    required: "post.refusal.required",
    /** DEC-339 — the one parser's words for an answer it could not read. */
    badType: PARSE_INVALID_KEY,
    duplicateKey: "admin.attributes.error.keyTaken",
    unknownAttribute: "admin.attributes.error.notFound",
    unknownLink: "admin.attributes.error.linkNotFound",
    confirmMismatch: "admin.attributes.error.confirmMismatch",
    deleteHasLinks: "admin.attributes.error.deleteHasLinks",
    deleteHasDependents: "admin.attributes.error.deleteHasDependents",
    unlinkHasDependents: "admin.attributes.error.unlinkHasDependents",
    alreadyLinked: "admin.attributes.error.alreadyLinked",
    cardLimit: "admin.attributes.error.cardLimit",
    factLimit: "admin.attributes.error.factLimit",
    rankInherited: "admin.attributes.error.rankInherited",
    orderMismatch: "admin.attributes.error.orderMismatch",
    mergeNoSources: "admin.attributes.error.mergeNoSources",
    mergeTargetInSources: "admin.attributes.error.mergeTargetInSources",
    mergeHasHolders: "admin.attributes.error.mergeHasHolders",
    mergeAcrossDependency: "admin.attributes.error.mergeAcrossDependency",
    dependsUnknown: "admin.attributes.error.dependsUnknown",
    dependsNotSelect: "admin.attributes.error.dependsNotSelect",
    dependsSelf: "admin.attributes.error.dependsSelf",
    dependsCycle: "admin.attributes.error.dependsCycle",
    parentWithoutDepends: "admin.attributes.error.parentWithoutDepends",
    parentNotInParent: "admin.attributes.error.parentNotInParent",
    badOption: "admin.attributes.error.badOption",
    badCell: "admin.attributes.error.badCell",
    boundsTargetNotNumber: "admin.attributes.error.boundsTargetNotNumber",
    boundsTargetNotColinked: "admin.attributes.error.boundsTargetNotColinked",
    allowedTargetNotSelect: "admin.attributes.error.allowedTargetNotSelect",
    allowedTargetNotColinked: "admin.attributes.error.allowedTargetNotColinked",
    allowedTargetCircular: "admin.attributes.error.allowedTargetCircular",
    allowedUnknownValue: "admin.attributes.error.allowedUnknownValue",
    unknownCategory: "admin.categories.error.unknownCategory",
    badAllowedOption: "admin.attributes.error.badAllowedOption",
    badDefault: "admin.attributes.error.badDefault",
    badVisibleWhen: "admin.attributes.error.badVisibleWhen",
    priceBasisDuplicate: "admin.attributes.error.priceBasisDuplicate",
    badClearCell: "admin.attributes.error.badClearCell",
  },
  generic: "admin.attributes.error.saveFailed",
} as const satisfies RefusalFamily;

/**
 * Bundle 10b (D55) — the attributes export's own words for the route's codes
 * (src/routes/api/admin/attributes/export.ts): its gate's `forbidden`, the scope's
 * `unknownCategory` and `badScope`; anything else reads the export's generic line.
 */
export const ATTRIBUTE_EXPORT_REFUSALS = {
  words: {
    forbidden: "failure.noAccess",
    unknownCategory: "admin.categories.error.unknownCategory",
    badScope: "admin.attributes.export.badScope",
  },
  generic: "admin.attributes.export.error",
} as const satisfies RefusalFamily;

/**
 * An attribute screen's refusal state: `fail` reads a door's refusal through the one reader, with
 * this family's words and the catalogue's own check for a key a trigger still raises
 * (`admin.attributes.error.parentAfterChild:…`); a cancelled step-up says nothing.
 */
export function useAttributeRefusal() {
  const { t, has, language } = useI18n();
  const [message, setMessage] = useState<string | null>(null);
  /** Sets the screen's line and returns the same words (null when silent), for a cell's caption. */
  const fail = (error: unknown): string | null => {
    const read = readRefusal(error, ATTRIBUTE_REFUSALS, has);
    const text = read.silent ? null : refusalText(read, t, undefined, language);
    setMessage(text);
    return text;
  };
  return { message, setMessage, fail };
}
