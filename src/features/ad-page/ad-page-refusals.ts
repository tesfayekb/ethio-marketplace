import type { MessageKey } from "@/i18n";
import type { DoorFamily } from "@/lib/door-family";
import { readRefusal, refusalCode, refusalText, type RefusalFamily } from "@/lib/refusal";

/**
 * F1-5b — THE BUYER'S DOORS' WORDS, by code, for the one reader (DEC-339). The shell
 * answers a refusal as `code[:detail]` (`ownListing`, `rateLimited`, ...); a code with
 * no words here (`notSignedIn`, `badReason`, `noProfile`, ...) draws the door's own
 * generic line. `src/lib/door-codes.ts` does not grow (INC-1153): the family's words
 * live in this file, one family per door.
 */
export const SAVE_REFUSALS = {
  words: {
    rateLimited: "adPage.save.rateLimited",
    // INC-1339 — an ad gone while its page was open is gone, never "try again".
    listingNotAvailable: "failure.gone",
  },
  // L22c — the dial's words that say WHEN, for a reset instant still to come.
  when: { rateLimited: "adPage.save.rateLimitedWhen" },
  generic: "adPage.save.failed",
} as const satisfies DoorFamily<{
  doors: "save_listing" | "unsave_listing";
  unreachable: {
    ownListing: "handled elsewhere: the ad page reads it by name and stops offering Save on the person's own ad";
  };
}>;

export const REPORT_REFUSALS = {
  words: {
    rateLimited: "adPage.report.rateLimited",
    alreadyReported: "adPage.report.already",
    // INC-1280 (10a-2) — an ad gone meanwhile, and a note over the door's limit.
    listingNotAvailable: "failure.gone",
    noteTooLong: "adPage.report.noteTooLong",
  },
  when: { rateLimited: "adPage.report.rateLimitedWhen" },
  generic: "adPage.report.failed",
} as const satisfies DoorFamily<{
  doors: "report_listing";
  unreachable: {
    badReason: "the dialog sends only a reason from REPORT_REASONS";
    ownListing: "handled elsewhere: the report dialog reads it by name, and the page then stops offering Report";
  };
}>;

/** The contact door's two returned ceilings (`sellersCapReached`, the new-account `rateLimited`) read here too. */
export const CONTACT_REFUSALS = {
  words: {
    rateLimited: "adPage.contact.rateLimited",
    sellersCapReached: "adPage.contact.sellersCap",
    // INC-1280 (10a-2) — an ad gone meanwhile.
    listingNotAvailable: "failure.gone",
  },
  when: { rateLimited: "adPage.contact.rateLimitedWhen" },
  generic: "adPage.contact.failed",
} as const satisfies DoorFamily<{
  doors: "reveal_listing_contact";
  also: { sellersCapReached: "returned" };
  unreachable: {
    acceptanceRequired: "handled elsewhere: the ad page sends the person to the acceptance screen (certifyRefusal)";
  };
}>;

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

export type ReportRefusal =
  | "alreadyReported"
  | "rateLimited"
  | "ownListing"
  | "gone"
  | "noteTooLong"
  | "failed";

/** A report refused. A bad reason is the generic line (the screen offers listed reasons only). */
export function reportRefusal(failure: unknown): ReportRefusal {
  if (refusalCode(failure) === "ownListing") return "ownListing";
  const key = readRefusal(failure, REPORT_REFUSALS).key;
  if (key === REPORT_REFUSALS.words.alreadyReported) return "alreadyReported";
  if (key === REPORT_REFUSALS.words.listingNotAvailable) return "gone";
  if (key === REPORT_REFUSALS.words.noteTooLong) return "noteTooLong";
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
