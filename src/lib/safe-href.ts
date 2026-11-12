/**
 * DEC-370 (INC-826) — A LINK TARGET THAT COMES FROM DATA reaches the page only through this
 * module, parsed by the WHATWG URL parser — never a regex on the raw string, which case and
 * whitespace tricks defeat (`JaVaScRiPt:`, `java\tscript:`).
 *
 *  - `safeHref` answers the normalised href for `https:`, `mailto:`, `tel:`, a root-relative
 *    path or a fragment, and null for everything else (`http:`, `javascript:`, `data:`,
 *    `blob:`, `file:`, protocol-relative, unparsable). A null renders the text without a link
 *    or the control undrawn — never a dead `#`. An app scheme of APP_SCHEMES is admitted only
 *    for a caller that asks with `{ app: true }`: the maps builders alone (CF-HREF-3).
 *  - `siteHref` builds the site's own absolute links (hreflang, canonical): a root-relative
 *    path on the page's own origin, `http:` included, so a local server's links stay whole.
 *  - `appObjectUrl` accepts only a `blob:` object URL the app made, for the one download
 *    helper (src/lib/save-file.ts), and throws on anything else.
 *
 * Every answer is typed `SafeHref`, minted only here; scripts/conformance/safe-href.test.ts
 * reads the type of every link sink. A new scheme is one line here, its test and its DEC.
 * Navigation targets are the concern's other half: D20's `safeReturnPath` (return-path.ts).
 */

declare const safe: unique symbol;
export type SafeHref = string & { readonly [safe]: true };

const SCHEMES: readonly string[] = ["https:", "mailto:", "tel:"];
export const APP_SCHEMES: readonly string[] = ["comgooglemaps:"];

const BASE = "https://ethio.invalid/";
const BASE_ORIGIN = new URL(BASE).origin;

/** The parser's own preprocessing: C0 controls and spaces cut from both ends, tabs and newlines removed. */
function prepared(input: string): string {
  let start = 0;
  let end = input.length;
  while (start < end && input.charCodeAt(start) <= 0x20) start += 1;
  while (end > start && input.charCodeAt(end - 1) <= 0x20) end -= 1;
  return input.slice(start, end).replace(/[\t\n\r]/g, "");
}

function parsed(input: string, base?: string | URL): URL | null {
  try {
    return new URL(input, base);
  } catch {
    return null;
  }
}

export function safeHref(input: unknown, options: { app?: boolean } = {}): SafeHref | null {
  if (typeof input !== "string") return null;
  const raw = prepared(input);
  const url = parsed(raw, BASE);
  if (url === null) return null;
  if (raw.startsWith("#")) return url.hash.length > 1 ? (url.hash as SafeHref) : null;
  if (url.origin === BASE_ORIGIN) {
    // A root-relative path stays on the page's own site; any other relative form (`terms`,
    // `?q`, `https:x`, which resolves against the base) is refused.
    return /^\/(?![/\\])/.test(raw)
      ? (`${url.pathname}${url.search}${url.hash}` as SafeHref)
      : null;
  }
  if (/^[/\\]/.test(raw)) return null;
  if (SCHEMES.includes(url.protocol)) return url.href as SafeHref;
  return options.app === true && APP_SCHEMES.includes(url.protocol) ? (url.href as SafeHref) : null;
}

export function siteHref(origin: string, path: string): SafeHref | null {
  if (!/^\/(?![/\\])/.test(path)) return null;
  const site = parsed(origin);
  if (site === null || (site.protocol !== "https:" && site.protocol !== "http:")) return null;
  const url = parsed(path, site);
  return url !== null && url.origin === site.origin ? (url.href as SafeHref) : null;
}

export function appObjectUrl(url: string): SafeHref {
  if (parsed(url)?.protocol !== "blob:") throw new Error("appObjectUrl: not an object URL");
  return url as SafeHref;
}
