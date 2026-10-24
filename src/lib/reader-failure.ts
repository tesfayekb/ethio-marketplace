import { errorText } from "./error-text";

/** INC-847 — diagnostic classes for a reader, never a discarded door error. */
export type ReaderFailure = {
  class: "auth" | "network" | "refused" | "server" | "malformed";
  status?: number;
  code?: string;
  message: string;
};

export function readerFailure(error: unknown): ReaderFailure {
  if (error instanceof ReaderError) return error.failure;
  const fields =
    error !== null && typeof error === "object"
      ? (error as { status?: unknown; code?: unknown })
      : {};
  const status = typeof fields.status === "number" ? fields.status : undefined;
  const code = typeof fields.code === "string" ? fields.code : undefined;
  const message = errorText(error);
  const kind: ReaderFailure["class"] =
    status === 401 ||
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
              /^(?:rateLimited|notYours|notYourListing|permissionDenied|accountDeactivated|acceptancePending|legalAcceptancePending|stepUpRequired|notInForce)(?::|$)/.test(
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
