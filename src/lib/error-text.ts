/**
 * INC-625 (bundle 15 turn 1) — ONE RULE FOR WHAT A CAUGHT ERROR SAYS IN A LOG LINE.
 *
 * INC-328 and INC-574 named an upstream HTML error page in the user-client
 * helpers; `/api/feed` and `/api/categories/tree` kept their own copies of the
 * rule, and `/api/i18n` had none. Run 38590378235 (shard 6) logged
 * "[ssr-error] /api/i18n <html>" and "[ssr-error] /api/categories/tree
 * undefined". Every `[ssr-error]` line that carries a caught error's text now
 * goes through `errorText` (or `errorWithStack`):
 * - an HTML error page — from its first `<!doctype` or `<html` tag to the end —
 *   is named, with the status the page states when it states one; what came
 *   before it (a prefix such as "remove: ") is kept;
 * - an Error: its message, or its name when the message is empty;
 * - an object (a database or provider error): its message, else its code, else
 *   its status;
 * - a string or a number: itself;
 * - nothing (undefined, null, an empty string, an object with none of those):
 *   "no message (<type>)" — never the word "undefined".
 * A plain message comes back unchanged, so the census's allowlisted lines keep
 * their words. Safe in the browser and on the server: it imports nothing.
 */

/** INC-328 / INC-574 — an upstream HTML error page, from its first tag to the end. */
export const HTML_PAGE = /<(?:!doctype|html)\b[\s\S]*$/i;

const STATUS_IN_PAGE = /\b([45]\d\d)\b/;

function rawText(error: unknown): string | null {
  if (typeof error === "string") return error.trim() === "" ? null : error;
  if (typeof error === "number" || typeof error === "bigint" || typeof error === "boolean") {
    return String(error);
  }
  // eslint-disable-next-line no-restricted-syntax -- an Error with no message falls back to its name
  if (error instanceof Error) {
    if (error.message.trim() !== "") return error.message;
    return error.name.trim() === "" ? null : error.name;
  }
  if (error !== null && typeof error === "object") {
    const fields = error as Record<string, unknown>;
    const message = fields["message"];
    if (typeof message === "string" && message.trim() !== "") return message;
    for (const key of ["code", "status"] as const) {
      const value = fields[key];
      if ((typeof value === "string" && value.trim() !== "") || typeof value === "number") {
        return `${key} ${String(value)}`;
      }
    }
  }
  return null;
}

export function errorText(error: unknown): string {
  const raw = rawText(error);
  if (raw === null) return `no message (${error === null ? "null" : typeof error})`;
  const page = HTML_PAGE.exec(raw);
  if (page === null) return raw;
  const status = STATUS_IN_PAGE.exec(page[0])?.[1];
  const named =
    status === undefined
      ? "upstream returned an HTML error page"
      : `upstream returned an HTML error page (${status})`;
  return raw.slice(0, page.index) + named;
}

/** The same text, with the first line of an Error's stack after it (the routes' I4 format). */
export function errorWithStack(error: unknown): string {
  // eslint-disable-next-line no-restricted-syntax -- only an Error has a stack
  if (!(error instanceof Error)) return errorText(error);
  return `${errorText(error)} | ${(error.stack ?? "").split("\n")[1]?.trim() ?? "no stack"}`;
}
