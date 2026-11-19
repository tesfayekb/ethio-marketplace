import { splitRefusal, type Refusal } from "@/lib/refusal";

/**
 * INC-447 — A DOOR'S EXCEPTION, NEVER ITS RAW TEXT.
 *
 * A route that answers an unexpected door exception logs the message whole and
 * sends the client only what is safe to show: the violated constraint's name
 * (a machine token the wizard can map), or nothing.
 *
 * INC-1050 — the worder sits beside the one refusal reader in `src/lib`, so the
 * server words a refusal without importing a feature module.
 */
const CONSTRAINT = /constraint "([^"]+)"/;

/** The constraint the message names, or undefined when it names none. */
export function doorErrorDetail(message: string): string | undefined {
  return CONSTRAINT.exec(message)?.[1];
}

/** A door's own machine reason: a bare camelCase code, optionally `code:detail` (a plain token). */
const REASON_CODE = /^[a-z][A-Za-z]*(?::[A-Za-z0-9_.-]*)?$/;

/** The code alone: bare camelCase. The strict pattern the first colon's head must keep. */
const CODE_HEAD = /^[a-z][A-Za-z]*$/;

/**
 * The refusal a route sends for a door exception. A door that refuses with its
 * own machine code (`tooManyPhotos:10`, `rateLimited`) keeps that code — the
 * wizard maps it to words; any other message becomes `doorError`, carrying the
 * constraint name or nothing.
 *
 * F1-7a (ruling 2, decision 11) — A CODE'S DETAIL MAY HOLD ANY CHARACTER. The
 * message is cut at its FIRST colon (`splitRefusal`, the one reader's cut): the
 * head keeps the strict code pattern, the rest is the detail. The gate's
 * `rateLimited:<instant>` (an instant holds `:` and `+`) is the code
 * `rateLimited` with the instant as its `detail` — the shape the wizard's pause
 * reads (`use-draft.ts`). A message whose detail is a plain token keeps the
 * joined form it always had (`tooManyPhotos:10`), which `doorCall` compares to
 * the message to know a code from a sentence.
 */
export function doorRefusal(message: string): Refusal & { field: "door" } {
  const trimmed = message.trim();
  if (REASON_CODE.test(trimmed)) return { field: "door", reason: trimmed };
  const { key, tail } = splitRefusal(trimmed);
  if (CODE_HEAD.test(key) && tail !== undefined && tail !== "") {
    return { field: "door", reason: key, detail: tail };
  }
  const detail = doorErrorDetail(message);
  return { field: "door", reason: "doorError", ...(detail ? { detail } : {}) };
}
