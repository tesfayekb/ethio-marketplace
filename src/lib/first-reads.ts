import { MARKETS_PATH, parseAreaCookie, treePath } from "@/components/shell/location-data";
import { CATEGORY_TREE_PATH } from "@/features/categories/category-tree";
import { bundleUrl } from "@/i18n/bundle";

/**
 * D234 speed turn S4 — THE READS EVERY PAGE MAKES START WITH THE PAGE.
 *
 * Every page's shell asks for the category tree, the open markets, the saved
 * market's tree and the language's approved strings, but only once the code
 * has downloaded and run: on a slow phone network each read waited a round
 * trip behind the code. The server already knows them from the request, so the
 * page's <head> names them as `<link rel="preload" as="fetch"
 * crossorigin="anonymous">`: the browser asks while the code downloads, and the
 * reader's own request (the same address, mode and credentials) takes the
 * preloaded answer instead of asking again. Each address comes from its
 * reader's own builder (MARKETS_PATH, treePath, CATEGORY_TREE_PATH, bundleUrl),
 * so a preload cannot drift from its read (FRL-5 proves it).
 *
 * Only what the request itself names is preloaded: the SAVED market's tree
 * (never a guessed one — a closed market would be a wasted read), and the
 * language the client applies first — the address's `?lang`, else the device
 * star, when the publication gate lists it; else the base language.
 */
export interface FirstReadLink {
  rel: "preload";
  as: "fetch";
  href: string;
  crossOrigin: "anonymous";
}

/** A well-formed language code. Shape only; the gate list decides. */
const CODE_SHAPE = /^[a-z]{2,8}(-[a-z]{2,8})?$/i;

function link(href: string): FirstReadLink {
  return { rel: "preload", as: "fetch", href, crossOrigin: "anonymous" };
}

/** The language whose approved strings the client asks for first. */
function firstLanguage(
  requested: string | null,
  star: string | null,
  gate: ReadonlyArray<{ code: string }>,
  base: string,
): string {
  const listed = (code: string | null): code is string =>
    code !== null && CODE_SHAPE.test(code) && gate.some((row) => row.code === code);
  if (listed(requested)) return requested;
  if (requested === null && listed(star)) return star;
  return base;
}

export function firstReadLinks(facts: {
  /** The `ethio_area` cookie as the request carried it (shape-checked), or null. */
  areaCookie: string | null;
  /** The device star cookie (shape-checked), or null. */
  star: string | null;
  /** The address's `?lang`, or null. */
  requested: string | null;
  /** The publication gate's rows as the server read them. */
  languages: ReadonlyArray<{ code: string }>;
  /** The base language. */
  base: string;
}): FirstReadLink[] {
  const links = [link(CATEGORY_TREE_PATH), link(MARKETS_PATH)];
  const saved = parseAreaCookie(facts.areaCookie);
  if (saved !== null) links.push(link(treePath(saved.country)));
  links.push(
    link(bundleUrl(firstLanguage(facts.requested, facts.star, facts.languages, facts.base))),
  );
  return links;
}
