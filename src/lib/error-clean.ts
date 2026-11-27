/**
 * DEC-474 Part F — THE ONE CLEANER of an error report. Pure: the browser runs it before it sends,
 * and the server runs it again before it writes (the server is the authority). What survives is
 * what a report may hold (docs/features/error-reports.md): never an e-mail, a phone number, a
 * network address, a token, a query string or a fragment. Each output fits its column in
 * `public.error_reports` (the table's CHECKs refuse anything longer or shaped otherwise).
 */

/** The report route's address; here, not beside its shape, so the browser's sender carries no zod. */
export const ERROR_REPORTS_PATH = "/api/error-reports";

/** The kinds a report can have; the browser sends only its own three (the report's shape). */
export const ERROR_KINDS = ["notice", "crash", "unhandled", "route", "upstream", "render"] as const;
export type ErrorKind = (typeof ERROR_KINDS)[number];
export const BROWSER_KINDS = ["notice", "crash", "unhandled"] as const;
export type BrowserKind = (typeof BROWSER_KINDS)[number];

export const MESSAGE_MAX = 500;
export const PLACE_MAX = 300;
export const PATH_MAX = 300;

/** What a message holds when nothing readable survives the cleaning. */
export const NO_MESSAGE = "no message";

const EMAIL = /[\w.+-]+@[\w-]+(?:\.[\w-]+)+/g;
const BEARER = /\bbearer\s+\S+/gi;
const JWT = /\beyJ[\w-]*\.[\w-]+\.[\w-]*/g;
const URL_TAIL = /(\bhttps?:\/\/[^\s?#"'`<>]*)[?#][^\s"'`<>]*/gi;
const IPV4 = /\b(?:\d{1,3}\.){3}\d{1,3}\b/g;
// Three colons at least, so a time of day (12:30:45) is not an address.
const IPV6 = /\b(?:[0-9a-f]{1,4}:){3,7}[0-9a-f]{1,4}\b/gi;
const PHONE = /\+?\d[\d ().-]{6,}\d/g;
const LONG_SECRET = /\b[A-Za-z0-9_-]{32,}\b/g;
const CODE = /^[A-Za-z0-9][A-Za-z0-9_.:-]{0,63}$/;

/** Cuts by code points, so a character outside the basic plane is never split. */
function cut(text: string, max: number): string {
  const points = Array.from(text);
  return points.length <= max ? text : points.slice(0, max).join("");
}

/** Every control character (U+0000–U+001F, U+007F) becomes a space. */
function spaceControls(text: string): string {
  return Array.from(text, (point) => {
    const code = point.codePointAt(0) ?? 0;
    return code < 0x20 || code === 0x7f ? " " : point;
  }).join("");
}

/** The parts no report holds, each replaced by its name. */
function scrub(text: string): string {
  return (
    spaceControls(text)
      .replace(URL_TAIL, "$1")
      .replace(EMAIL, "<email>")
      .replace(BEARER, "<token>")
      .replace(JWT, "<token>")
      .replace(IPV6, "<address>")
      .replace(IPV4, "<address>")
      // A long secret before a phone number: a run of digits inside it must not split it.
      .replace(LONG_SECRET, "<token>")
      .replace(PHONE, "<phone>")
      .replace(/\s+/g, " ")
      .trim()
  );
}

/** A failure's message, cleaned and cut; `NO_MESSAGE` when nothing readable survives. */
export function cleanMessage(text: string): string {
  const cleaned = cut(scrub(text), MESSAGE_MAX).trim();
  return cleaned === "" ? NO_MESSAGE : cleaned;
}

/** A page path: no query or fragment, no control character, cleaned and cut; "/" when unusable. */
export function cleanPath(path: string): string {
  const bare = path.split(/[?#]/, 1)[0] ?? "";
  if (!bare.startsWith("/")) return "/";
  const cleaned = cut(scrub(bare).replace(/\s/g, ""), PATH_MAX);
  return cleaned === "" ? "/" : cleaned;
}

/** A typed failure's code or status, kept only in its column's form. */
export function cleanCode(code: string | number | null | undefined): string | null {
  if (code === null || code === undefined) return null;
  const text = String(code);
  return CODE.test(text) ? text : null;
}

// A frame's file (its query, a dev server's `?v=…`, skipped) and its line.
const FRAME =
  /((?:[a-z][a-z0-9+.-]*:\/\/[^\s/()]*)?\/[^\s()?#]+?\.(?:[cm]?js|tsx?|jsx))(?:\?[^\s():]*)?:(\d+)/gi;
const FOREIGN = /node_modules|\/@vite\/|\/@fs\/|-extension:\/\//;

/**
 * The place: the first frame of our own code in a stack, as `path:line`, with no origin, query or
 * fragment. `origin` (the browser's own) keeps only its frames; on the server any frame outside
 * node_modules is ours, kept from its `src/` part when it has one. Null when no frame is ours.
 */
export function cleanPlace(stack: string | undefined, origin?: string): string | null {
  if (stack === undefined) return null;
  for (const match of stack.matchAll(FRAME)) {
    const [, file, line] = match;
    if (file === undefined || line === undefined || FOREIGN.test(file)) continue;
    let path = file;
    const scheme = /^[a-z][a-z0-9+.-]*:\/\/[^/]*/i.exec(file);
    if (scheme !== null) {
      if (origin !== undefined && scheme[0] !== origin) continue;
      path = file.slice(scheme[0].length);
    } else if (origin !== undefined) continue;
    const ours = path.indexOf("/src/");
    if (ours >= 0) path = path.slice(ours + 1);
    const place = cut(scrub(`${path}:${line}`), PLACE_MAX);
    return place === "" ? null : place;
  }
  return null;
}

/** A short free label (a browser's or an engine's name): cleaned, cut to `max`; null when empty. */
export function cleanLabel(text: string | null | undefined, max: number): string | null {
  if (text === null || text === undefined) return null;
  const cleaned = cut(scrub(text), max).trim();
  return cleaned === "" ? null : cleaned;
}
