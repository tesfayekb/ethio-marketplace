import type { MessageKey } from "@/i18n";
import { gateRefusal, readerFailure } from "@/lib/reader-failure";
import { rateUntilOf, readRefusal, type RefusalFamily } from "@/lib/refusal";

/**
 * DEC-464 / INC-1279 — THE FAILURE NOTICE'S ONE READING. A query's or an action's failure becomes
 * one reason; each reason has one set of words and one next step (failure-notice.tsx). A new reason
 * is one row in `REASONS`, never a new component. Reading never throws: anything unreadable is
 * `server`, which offers Retry.
 */
export type FailureReason =
  | "network"
  | "server"
  | "gone"
  | "noAccess"
  | "signedOut"
  | "rateLimited"
  | "refused";

export type FailureStep = "retry" | "exit" | "back" | "signIn" | "retryLater";

export const REASONS: Readonly<Record<FailureReason, { words: MessageKey; step: FailureStep }>> = {
  network: { words: "failure.network", step: "retry" },
  server: { words: "failure.server", step: "retry" },
  gone: { words: "failure.gone", step: "exit" },
  noAccess: { words: "failure.noAccess", step: "back" },
  signedOut: { words: "session.expired", step: "signIn" },
  rateLimited: { words: "failure.rateLimitedSoon", step: "retryLater" },
  refused: { words: "failure.refused", step: "back" },
};

/** The codes that mean the thing asked for no longer exists, for every caller. */
export const GONE_CODES: ReadonlySet<string> = new Set([
  "listingNotFound",
  "listingNotAvailable",
  "unknownPlace",
  "unknownCategory",
  "notYours",
  "notYourListing",
]);

/** The rate refusal's words: `{when}` only for an instant still to come (the reader's own rule). */
export const RATE_FAMILY: RefusalFamily = {
  words: { rateLimited: "failure.rateLimitedSoon" },
  when: { rateLimited: "failure.rateLimited" },
};

export type FailureReading = {
  reason: FailureReason;
  /** The failure's class, for a `data-` attribute and the console only — never words. */
  diagnostic: string;
  /** The rate gate's reset instant, when it named one. */
  until: string | undefined;
};

function codeOf(error: unknown): string | undefined {
  const gate = gateRefusal(error);
  if (gate !== null) return gate.code;
  const failure = readerFailure(error);
  if (failure.code !== undefined && /^[a-z][A-Za-z]*$/.test(failure.code)) return failure.code;
  const head = failure.message.trim().split(":")[0]?.trim() ?? "";
  return /^[a-z][A-Za-z]*$/.test(head) ? head : undefined;
}

export function readFailure(error: unknown, gone: readonly string[] = []): FailureReading {
  try {
    const failure = readerFailure(error);
    const diagnostic = `${failure.class}${failure.status === undefined ? "" : ` ${failure.status}`}`;
    const code = codeOf(error);
    const isGone = code !== undefined && (GONE_CODES.has(code) || gone.includes(code));
    const reason: FailureReason =
      code === "rateLimited"
        ? "rateLimited"
        : isGone || failure.status === 404
          ? "gone"
          : code === "notSignedIn" || (failure.class === "auth" && failure.status === 401)
            ? "signedOut"
            : code === "permissionDenied" || failure.status === 403 || failure.class === "auth"
              ? "noAccess"
              : failure.class === "network"
                ? "network"
                : failure.class === "refused"
                  ? "refused"
                  : "server";
    return { reason, diagnostic, until: reason === "rateLimited" ? rateUntilOf(error) : undefined };
  } catch {
    return { reason: "server", diagnostic: "unreadable", until: undefined };
  }
}

/** The rate words' read, for `refusalText` (the one place `{when}` is filled). */
export function rateRead(error: unknown) {
  return readRefusal(error, RATE_FAMILY);
}
