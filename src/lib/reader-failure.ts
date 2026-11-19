import { errorText } from "./error-text";
import { splitRefusal } from "./refusal";

/** INC-847 — diagnostic classes for a reader, never a discarded door error. */
export type ReaderFailure = {
  class: "auth" | "network" | "refused" | "server" | "malformed";
  status?: number;
  code?: string;
  message: string;
};

/**
 * F1-7a (ruling 2, decision 11) — A GATE REFUSAL IS READ BY ITS CODE BEFORE ITS
 * STATUS. A reader on `door_context` raises `door_refuse(code, detail)`
 * (SQLSTATE P0D01, message `code[:detail]`) and PostgREST answers it as HTTP 500
 * (INC-1213, left to F1-7c), so a status test first would class every refusal
 * `server`. The codes a reader on the gate can raise: the two gates say the
 * caller is not allowed in (`auth`); the readers' own codes say the request was
 * refused (`refused`), as their sentences did.
 */
const GATE_AUTH_CODES = new Set(["notSignedIn", "accountDeactivated"]);
const GATE_REFUSED_CODES = new Set(["notYourListing", "notYours", "badValue", "badSize"]);

/** The code a gate refusal's message opens with: everything before the first colon. */
function gateCodeOf(message: string): string {
  return splitRefusal(message.trim()).key;
}

export function readerFailure(error: unknown): ReaderFailure {
  if (error instanceof ReaderError) return error.failure;
  const fields =
    error !== null && typeof error === "object"
      ? (error as { status?: unknown; code?: unknown })
      : {};
  const status = typeof fields.status === "number" ? fields.status : undefined;
  const code = typeof fields.code === "string" ? fields.code : undefined;
  const message = errorText(error);
  const gate = gateCodeOf(message);
  const kind: ReaderFailure["class"] = GATE_AUTH_CODES.has(gate)
    ? "auth"
    : GATE_REFUSED_CODES.has(gate)
      ? "refused"
      : status === 401 ||
          status === 403 ||
          code === "PGRST301" ||
          code === "42501" ||
          /JWT|not authenticated/i.test(message)
        ? "auth"
        : error instanceof TypeError || /Failed to fetch|Load failed|fetch failed/i.test(message)
          ? "network"
          : status !== undefined && status >= 500
            ? "server"
            : code === "P0001" ||
                /^(?:rateLimited|permissionDenied|acceptancePending|legalAcceptancePending|stepUpRequired|notInForce)(?::|$)/.test(
                  message,
                )
              ? "refused"
              : "malformed";
  return {
    class: kind,
    ...(status === undefined ? {} : { status }),
    ...(code === undefined ? {} : { code }),
    message,
  };
}

export class ReaderError extends Error {
  readonly failure: ReaderFailure;
  constructor(failure: ReaderFailure) {
    super(failure.message);
    this.name = "ReaderError";
    this.failure = failure;
  }
}

/** The one typed database-read failure factory. */
export function readFailed(error: unknown, status: number): ReaderError {
  return new ReaderError({ class: "server", status, message: errorText(error) });
}
