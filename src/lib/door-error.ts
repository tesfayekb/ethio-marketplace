import type { Refusal } from "@/lib/refusal";

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

/** A door's own machine reason: a bare camelCase code, optionally `code:detail`. */
const REASON_CODE = /^[a-z][A-Za-z]*(?::[A-Za-z0-9_.-]*)?$/;

/**
 * The refusal a route sends for a door exception. A door that refuses with its
 * own machine code (`tooManyPhotos:10`, `rateLimited`) keeps that code — the
 * wizard maps it to words; any other message becomes `doorError`, carrying the
 * constraint name or nothing.
 */
export function doorRefusal(message: string): Refusal & { field: "door" } {
  const trimmed = message.trim();
  if (REASON_CODE.test(trimmed)) return { field: "door", reason: trimmed };
  const detail = doorErrorDetail(message);
  return { field: "door", reason: "doorError", ...(detail ? { detail } : {}) };
}
