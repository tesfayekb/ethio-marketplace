import { useState } from "react";

import { useI18n } from "@/i18n";
import { readRefusal, refusalText, type RefusalFamily } from "@/lib/refusal";
import { ADMIN_WHEN, RATE_LIMITED_KEY } from "@/lib/refusal-tail";
import { PARSE_INVALID_KEY } from "@/lib/parse-input";

/**
 * DEC-333 (F1-4a) — the attribute library's own words for its doors' codes. Each code that
 * replaced a console key reads that key's words, its tail filling `{count}`, `{detail}` or
 * `{target}` where the words take one (DEC-050 L3b: `<attribute>|<target>`); `rankInherited`'s
 * tail is a diagnostic its words never draw. A code that never had words (unknownCategory,
 * badAllowedOption, badDefault, badVisibleWhen, priceBasisDuplicate, badClearCell,
 * permissionDenied) draws the library's generic line.
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
  },
  generic: "admin.attributes.error.saveFailed",
} as const satisfies RefusalFamily;

/**
 * An attribute screen's refusal state: `fail` reads a door's refusal through the one reader, with
 * this family's words and the catalogue's own check for a key a trigger still raises
 * (`admin.attributes.error.parentAfterChild:…`); a cancelled step-up says nothing.
 */
export function useAttributeRefusal() {
  const { t, has, language } = useI18n();
  const [message, setMessage] = useState<string | null>(null);
  const fail = (error: unknown) => {
    const read = readRefusal(error, ATTRIBUTE_REFUSALS, has);
    setMessage(read.silent ? null : refusalText(read, t, undefined, language));
  };
  return { message, setMessage, fail };
}
