import { errorText } from "./error-text";
import { ownValue } from "./own-key";
import { splitRefusal } from "./refusal";

/** INC-847 — diagnostic classes for a reader, never a discarded door error. */
export type ReaderFailure = {
  class: "auth" | "network" | "refused" | "server" | "malformed";
  status?: number;
  code?: string;
  message: string;
};

/**
 * F1-7c (INC-1213) — THE STATUS A READER'S REFUSAL ARRIVES AT. A reader on
 * `door_context` raises `door_refuse(code, detail)` and PostgREST answers it at
 * the status the database's one table gives the code (`door_refusal_status`):
 * `notSignedIn` 401, `permissionDenied` 403, `accountDeactivated` 403,
 * `stepUpRequired` 428, `rateLimited` 429, every other code 400 — never 500.
 * This is that table's client side; CF-REFUSAL-2
 * (scripts/conformance/refusal-readers.test.ts) reads the table's last
 * declaration and fails when the two differ in either direction.
 */
const REFUSAL_STATUS: Readonly<Record<string, number>> = {
  notSignedIn: 401,
  permissionDenied: 403,
  accountDeactivated: 403,
  stepUpRequired: 428,
  rateLimited: 429,
};

/** The HTTP status a refusal with this code arrives at (400 for a code with no row of its own). */
export function refusalStatus(code: string): number {
  return ownValue(REFUSAL_STATUS, code) ?? 400;
}

/**
 * F1-7a (ruling 2, decision 11), F1-7c — A GATE REFUSAL IS READ BY ITS CODE
 * BEFORE ITS STATUS. A reader on `door_context` raises `door_refuse(code,
 * detail)` (SQLSTATE P0D01 under the door shell, `PGRST` under a reader; message
 * `code[:detail]`). The codes a reader on the gate can raise: the two gates say
 * the caller is not allowed in (`auth`); the readers' own codes say the request
 * was refused (`refused`), as their sentences did.
 *
 * The status must AGREE with the code (`refusalStatus`): a refusal that arrives
 * at 500 (or at any status its code does not carry) is not a refusal the
 * database answered, so the code does not decide — a 500 classes `server`. An
 * answer with no status (the browser's `rpc()` drops it) is read by its code.
 */
const GATE_AUTH_CODES = new Set(["notSignedIn", "accountDeactivated"]);
const GATE_REFUSED_CODES = new Set([
  "notYourListing",
  "notYours",
  "badValue",
  "badSize",
  "permissionDenied",
  "stepUpRequired",
  "rateLimited",
  "acceptancePending",
  "legalAcceptancePending",
  "notInForce",
]);
/** The codes read as a refusal even when their status disagrees (below 500). */
const FALLBACK_REFUSED_CODES = new Set([
  "rateLimited",
  "permissionDenied",
  "acceptancePending",
  "legalAcceptancePending",
  "stepUpRequired",
  "notInForce",
]);

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
  const agrees = status === undefined || status === refusalStatus(gate);
  const kind: ReaderFailure["class"] =
    agrees && GATE_AUTH_CODES.has(gate)
      ? "auth"
      : agrees && GATE_REFUSED_CODES.has(gate)
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
              : code === "P0001" || FALLBACK_REFUSED_CODES.has(gate)
                ? "refused"
                : "malformed";
  return {
    class: kind,
    ...(status === undefined ? {} : { status }),
    ...(code === undefined ? {} : { code }),
    message,
  };
}

/** A refusal's detail answered to a client: a short code-like tail, never a sentence. */
export const REFUSAL_DETAIL = /^[A-Za-z0-9_.:+ -]{1,64}$/;

export type GateRefusal = { code: string; status: number; detail?: string };

/**
 * F1-7d (INC-1221) — THE REFUSAL A READER RAISED, read by the one reader: one of the gate's
 * codes (above), its status the one table's (`refusalStatus`) — an answer at any other status
 * is not that refusal — and its detail when it is a short code. Anything else is null.
 */
export function gateRefusal(error: unknown): GateRefusal | null {
  const failure = readerFailure(error);
  const { key, tail } = splitRefusal(failure.message.trim());
  if (!GATE_AUTH_CODES.has(key) && !GATE_REFUSED_CODES.has(key)) return null;
  const status = refusalStatus(key);
  if (failure.status !== undefined && failure.status !== status) return null;
  const detail = tail?.trim();
  return detail !== undefined && REFUSAL_DETAIL.test(detail)
    ? { code: key, status, detail }
    : { code: key, status };
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
