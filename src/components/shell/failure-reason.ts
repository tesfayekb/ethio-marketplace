import type { MessageKey } from "@/i18n";
import { gateRefusal, readerFailure } from "@/lib/reader-failure";
import { rateUntilOf, readRefusal, type RefusalFamily } from "@/lib/refusal";

/**
 * DEC-464 / INC-1279 — THE FAILURE NOTICE'S ONE READING. A query's or an action's failure becomes
 * one kind, decided STATUS FIRST (a status does not drift; a code list does). Each kind has one
 * set of words and one next step (failure-notice.tsx). No caller adds codes. Reading never
 * throws: anything unreadable is `server`.
 */
export type FailureKind =
  | "network"
  | "server"
  | "gone"
  | "changed"
  | "noAccess"
  | "signedOut"
  | "stepUp"
  | "rateLimited"
  | "refused";

export type FailureStep = "retry" | "exit" | "reload" | "back" | "signIn" | "stepUp" | "retryLater";

export const KINDS: Readonly<Record<FailureKind, { words: MessageKey; step: FailureStep }>> = {
  network: { words: "failure.network", step: "retry" },
  server: { words: "failure.server", step: "retry" },
  gone: { words: "failure.gone", step: "exit" },
  changed: { words: "failure.changed", step: "reload" },
  noAccess: { words: "failure.noAccess", step: "back" },
  signedOut: { words: "session.expired", step: "signIn" },
  stepUp: { words: "failure.stepUp", step: "stepUp" },
  rateLimited: { words: "failure.rateLimitedSoon", step: "retryLater" },
  refused: { words: "failure.refused", step: "back" },
};

/**
 * INC-1287 — interim, until the database's refusal-status table answers these as 404 (Cursor
 * bundle 7); then this list is deleted.
 */
export const GONE_CODES: ReadonlySet<string> = new Set([
  "listingNotFound",
  "listingNotAvailable",
  "unknownPlace",
  "unknownCategory",
  "notYours",
  "notYourListing",
]);

/** Retry is drawn at once only for these (the query client's background rule is the same). */
export function isRetryable(kind: FailureKind): boolean {
  return kind === "network" || kind === "server";
}

/** The rate refusal's words: `{when}` only for an instant still to come (the reader's own rule). */
export const RATE_FAMILY: RefusalFamily = {
  words: { rateLimited: "failure.rateLimitedSoon" },
  when: { rateLimited: "failure.rateLimited" },
};

export type FailureReading = {
  kind: FailureKind;
  /** The failure's class, for a `data-` attribute and the console only — never words. */
  diagnostic: string;
  /** The rate gate's reset instant, when it named one. */
  until: string | undefined;
};

const CODE = /^[a-z][A-Za-z]*$/;

function codeOf(error: unknown): string | undefined {
  const gate = gateRefusal(error);
  if (gate !== null) return gate.code;
  const failure = readerFailure(error);
  if (failure.code !== undefined && CODE.test(failure.code)) return failure.code;
  const head = failure.message.trim().split(":")[0]?.trim() ?? "";
  return CODE.test(head) ? head : undefined;
}

function decide(status: number | undefined, code: string | undefined, cls: string): FailureKind {
  if (status === 401 || code === "notSignedIn") return "signedOut";
  if (status === 428 || code === "stepUpRequired") return "stepUp";
  if (status === 429 || code === "rateLimited") return "rateLimited";
  if (status === 403 || code === "permissionDenied" || code === "accountDeactivated")
    return "noAccess";
  if (status === 404 || status === 410) return "gone";
  if (status === 409) return "changed";
  if (cls === "network") return "network";
  if ((status !== undefined && status >= 500) || cls === "server" || cls === "malformed")
    return "server";
  if (code !== undefined && GONE_CODES.has(code)) return "gone";
  if (cls === "refused" || cls === "auth") return "refused";
  return "server";
}

export function failureKind(error: unknown): FailureReading {
  try {
    const failure = readerFailure(error);
    const gate = gateRefusal(error);
    const status = gate?.status ?? failure.status;
    const diagnostic = `${failure.class}${status === undefined ? "" : ` ${status}`}`;
    const kind = decide(status, codeOf(error), failure.class);
    return { kind, diagnostic, until: kind === "rateLimited" ? rateUntilOf(error) : undefined };
  } catch {
    return { kind: "server", diagnostic: "unreadable", until: undefined };
  }
}

/** The rate words' read, for `refusalText` (the one place `{when}` is filled). */
export function rateRead(error: unknown) {
  return readRefusal(error, RATE_FAMILY);
}
