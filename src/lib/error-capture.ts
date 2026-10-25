// Captures the original Error out-of-band so server.ts can recover the stack
// when h3 has already swallowed the throw into a generic 500 Response.

let lastCapturedError: { error: unknown; at: number } | undefined;
const TTL_MS = 5_000;

function record(error: unknown) {
  lastCapturedError = { error, at: Date.now() };
}

// h3's HTTPError serializes to {"status":500,"unhandled":true,"message":"HTTPError"} —
// no stack, no cause — so a plain console.error(error) reaches the log pipeline with
// the failure detail stripped. Expand Error-like args into a string that keeps the
// message, stack, and the full cause chain.
const CAUSE_DEPTH_LIMIT = 5;
const DESCRIPTION_LENGTH_LIMIT = 8_000;

export function describeError(error: unknown): string {
  const parts: string[] = [];
  let current: unknown = error;
  for (let depth = 0; depth < CAUSE_DEPTH_LIMIT && current != null; depth++) {
    // eslint-disable-next-line no-restricted-syntax -- the stack and cause chain need an Error
    if (!(current instanceof Error)) {
      parts.push(typeof current === "string" ? current : safeStringify(current));
      break;
    }
    const label = depth === 0 ? "" : "caused by: ";
    const status = describeStatus(current);
    parts.push(`${label}${current.stack ?? `${current.name}: ${current.message}`}${status}`);
    current = current.cause;
  }
  return parts.join("\n").slice(0, DESCRIPTION_LENGTH_LIMIT);
}

function describeStatus(error: Error): string {
  const { status, statusCode } = error as { status?: unknown; statusCode?: unknown };
  const value = status ?? statusCode;
  return typeof value === "number" ? ` (status ${value})` : "";
}

function safeStringify(value: unknown): string {
  try {
    return JSON.stringify(value) ?? String(value);
  } catch {
    return String(value);
  }
}

function isErrorLike(value: unknown): value is Error {
  // eslint-disable-next-line no-restricted-syntax -- this is the Error type guard itself
  return value instanceof Error;
}

/**
 * INC-894 — a component that throws during the server stream render is logged by
 * the framework as "Error in renderToReadableStream:" (or renderToPipeableStream)
 * with no `[ssr-error]` tag, so the DEC-083 census never counts it; the wrapper
 * puts the tag in front so every server render error is counted.
 * INC-893 — a request whose client left is logged by h3 as an unhandled 500 whose
 * cause chain holds an AbortError; that stack becomes one `[aborted]` warning
 * (answer.ts still writes its own `[client-aborted]` line).
 */
const RENDER_ERROR = /^Error in renderTo(?:ReadableStream|PipeableStream):/;

function abortedRequest(value: unknown): boolean {
  if (!isErrorLike(value)) return false;
  if ((value as { unhandled?: unknown }).unhandled !== true) return false;
  let current: unknown = value.cause;
  for (let depth = 0; depth < CAUSE_DEPTH_LIMIT && current != null; depth++) {
    if ((current as { name?: unknown }).name === "AbortError") return true;
    current = (current as { cause?: unknown }).cause;
  }
  return false;
}

// Wrap console.error so errors logged by any layer — including h3's internal
// unhandled-error logging, which this file cannot hook directly — are both
// recorded for consumeLastCapturedError and expanded before serialization.
const originalConsoleError = console.error.bind(console);
console.error = (...args: unknown[]) => {
  if (args.length === 1 && abortedRequest(args[0])) {
    console.warn("[aborted] the client left; h3 logged the request as unhandled (status 500)");
    return;
  }
  const tagged =
    typeof args[0] === "string" && RENDER_ERROR.test(args[0])
      ? ["[ssr-error] render", ...args]
      : args;
  const expanded = tagged.map((arg) => {
    if (!isErrorLike(arg)) return arg;
    record(arg);
    return describeError(arg);
  });
  originalConsoleError(...expanded);
};

if (typeof globalThis.addEventListener === "function") {
  globalThis.addEventListener("error", (event) => record((event as ErrorEvent).error ?? event));
  globalThis.addEventListener("unhandledrejection", (event) =>
    record((event as PromiseRejectionEvent).reason),
  );
}

export function consumeLastCapturedError(): unknown {
  if (!lastCapturedError) return undefined;
  if (Date.now() - lastCapturedError.at > TTL_MS) {
    lastCapturedError = undefined;
    return undefined;
  }
  const { error } = lastCapturedError;
  lastCapturedError = undefined;
  return error;
}
