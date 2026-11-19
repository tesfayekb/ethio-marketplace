import type { MessageKey } from "@/i18n";
import { errorText } from "@/lib/error-text";
import { readRefusal, type RefusalFamily } from "@/lib/refusal";
import { badValueWords } from "@/features/admin-listings/listing-refusals";
import { RATE_LIMITED_KEY } from "@/lib/refusal-tail";

/**
 * F1-6b — THE AI CONSOLE'S WORDS FOR THE FEATURE DOOR'S CODES, for the one
 * reader (DEC-339). `admin_set_ai_feature` answers `code[:detail]` (behind the
 * shell: the gate codes; in its body: `overBudget`, `unknownFeature` and
 * `badValue:<field>`). The editor's problem line keeps the words it drew before
 * the door moved to codes (`ai-feature-form.test.tsx`, SV-2 read them); a code
 * with no words here draws the console's generic line with the code beneath it.
 * `src/lib/door-codes.ts` does not grow (INC-1153): the words of a family live
 * in the family's files.
 */
export const AI_DOOR_REFUSALS = {
  words: {
    notSignedIn: "admin.ai.error.denied",
    permissionDenied: "admin.ai.error.denied",
    accountDeactivated: "admin.ai.error.denied",
    stepUpRequired: "admin.ai.error.stepUp",
    // The step-up gate's own SQLSTATE, when it arrives with no message.
    P0009: "admin.ai.error.stepUp",
    rateLimited: RATE_LIMITED_KEY,
    overBudget: "admin.ai.error.overBudget",
    unknownFeature: "admin.ai.error.unknownFeature",
  },
  // The step-up gate's raise is a sentence (`step-up required: …`), matched while the gate stays one.
  sentences: [[/step[ -]?up/i, "admin.ai.error.stepUp"]],
  generic: "admin.ai.error.unknown",
} as const satisfies RefusalFamily;

/** The `badValue:<field>` lines: only the budget and the price have words of their own. */
export const AI_BAD_VALUES = {
  budget: "admin.ai.error.badBudget",
  unitCost: "admin.ai.error.badPriceDoor",
} as const satisfies Record<string, MessageKey>;

/** What the editor's problem line draws: a key, and the unread code beneath it when no words named it. */
export interface AiRefusal {
  key: MessageKey;
  raw: string | null;
}

/** A refusal of the feature door, read through the one reader over the console's words. */
export function aiRefusalOf(error: unknown): AiRefusal {
  const field = badValueWords(error, AI_BAD_VALUES);
  if (field !== null) return { key: field, raw: null };
  const read = readRefusal(error, AI_DOOR_REFUSALS);
  const text =
    typeof error === "string"
      ? error.trim()
      : error === null || error === undefined
        ? ""
        : errorText(error).trim();
  return { key: read.key, raw: read.branch === "generic" && text !== "" ? text : null };
}
