import type { MessageKey } from "@/i18n";
import { readRefusal, refusalText, splitRefusal, type RefusalFamily } from "@/lib/refusal";

/**
 * F1-5b — THE BUYER'S DOORS' WORDS, by code, for the one reader (DEC-339). The shell
 * answers a refusal as `code[:detail]` (`ownListing`, `rateLimited`, ...); a code with
 * no words here (`notSignedIn`, `badReason`, `noProfile`, ...) draws the door's own
 * generic line. `src/lib/door-codes.ts` does not grow (INC-1153): the family's words
 * live in this file, one family per door.
 */
export const SAVE_REFUSALS = {
  words: { rateLimited: "adPage.save.rateLimited" },
  // L22c — the dial's words that say WHEN, for a reset instant still to come.
  when: { rateLimited: "adPage.save.rateLimitedWhen" },
  generic: "adPage.save.failed",
} as const satisfies RefusalFamily;

export const REPORT_REFUSALS = {
  words: {
    rateLimited: "adPage.report.rateLimited",
    alreadyReported: "adPage.report.already",
  },
  when: { rateLimited: "adPage.report.rateLimitedWhen" },
  generic: "adPage.report.failed",
} as const satisfies RefusalFamily;

/** The contact door's two returned ceilings (`sellersCapReached`, the new-account `rateLimited`) read here too. */
export const CONTACT_REFUSALS = {
  words: {
    rateLimited: "adPage.contact.rateLimited",
    sellersCapReached: "adPage.contact.sellersCap",
  },
  when: { rateLimited: "adPage.contact.rateLimitedWhen" },
  generic: "adPage.contact.failed",
} as const satisfies RefusalFamily;

/**
 * The code a door answered: the head of its `code[:detail]`, from an error, a returned
 * `{ ok: false, reason }` or a bare string. Empty when the failure says nothing a code
 * can be read from. The reader's own split (`splitRefusal`), never a text search.
 */
export function refusalCode(failure: unknown): string {
  if (typeof failure === "string") return splitRefusal(failure.trim()).key;
  if (typeof failure !== "object" || failure === null) return "";
  const fields = failure as Record<string, unknown>;
  const text = typeof fields["message"] === "string" ? fields["message"] : fields["reason"];
  return typeof text === "string" ? splitRefusal(text.trim()).key : "";
}

/**
 * A refusal that is the dial's, read in a family's words by the one reader: a gate's
 * `rateLimited` or a returned one. The ceiling a screen words as "try again tomorrow".
 */
function isRate(failure: unknown, family: RefusalFamily & { words: { rateLimited: string } }) {
  return readRefusal(failure, family).key === family.words.rateLimited;
}

export type SaveRefusal = "rateLimited" | "ownListing" | "listingNotAvailable" | "failed";

/** A save or an unsave refused: the code the screen branches on, else the generic. */
export function saveRefusal(failure: unknown): SaveRefusal {
  const code = refusalCode(failure);
  if (code === "ownListing" || code === "listingNotAvailable") return code;
  return isRate(failure, SAVE_REFUSALS) ? "rateLimited" : "failed";
}

export type ReportRefusal = "alreadyReported" | "rateLimited" | "ownListing" | "failed";

/** A report refused. A bad reason or a long note is the generic line, as it was. */
export function reportRefusal(failure: unknown): ReportRefusal {
  if (refusalCode(failure) === "ownListing") return "ownListing";
  const key = readRefusal(failure, REPORT_REFUSALS).key;
  if (key === REPORT_REFUSALS.words.alreadyReported) return "alreadyReported";
  return key === REPORT_REFUSALS.words.rateLimited ? "rateLimited" : "failed";
}

export type ContactRefusal =
  | "sellersCapReached"
  | "rateLimited"
  | "listingNotAvailable"
  | "acceptanceRequired"
  | "failed";

/** A reveal refused: an error from the shell or one of the two answers the body returns. */
export function contactRefusal(failure: unknown): ContactRefusal {
  const code = refusalCode(failure);
  if (code === "listingNotAvailable" || code === "acceptanceRequired") return code;
  const key = readRefusal(failure, CONTACT_REFUSALS).key;
  if (key === CONTACT_REFUSALS.words.sellersCapReached) return "sellersCapReached";
  return key === CONTACT_REFUSALS.words.rateLimited ? "rateLimited" : "failed";
}

const RATE_FAMILY = { save: SAVE_REFUSALS, report: REPORT_REFUSALS, contact: CONTACT_REFUSALS };

/**
 * L22c — a door's rate sentence in the family's own words: its `when` words for an instant
 * still to come (`refusalText`, in the reader's language), else its plain words.
 */
export function rateText(
  door: keyof typeof RATE_FAMILY,
  until: string | undefined,
  t: (key: MessageKey) => string,
  language: string,
): string {
  const family = RATE_FAMILY[door];
  const read = readRefusal(until === undefined ? "rateLimited" : `rateLimited:${until}`, family);
  return refusalText(read, t, undefined, language);
}
