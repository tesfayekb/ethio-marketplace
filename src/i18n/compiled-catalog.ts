import type { Messages } from "./types";

/**
 * INC-107 — A MISSING COMPILED LAYER IS EMPTY, NOT FATAL.
 *
 * The compiled catalogs are a SEED, not the language registry: a language the
 * operator publishes in the console may legitimately exist in the DATABASE
 * only, with no file here. The registry is therefore a partial map keyed by
 * code, and a lookup miss means "the compiled layer for this language is `{}`"
 * — the chain becomes compiled.en ▸ {} ▸ DB[lang], never a throw.
 */
const loaders: Partial<Record<string, () => Promise<Messages>>> = {
  am: () => import("./locales/am-base").then((m) => m.amBase),
};

/**
 * DEC-231 — the ADMIN layer rides apart from the first paint: the admin gate
 * asks for it (useAdminStrings), so its loaders are a second map. A compiled
 * admin layer is a PART of Messages; a language without one has none to load.
 */
const adminLoaders: Partial<Record<string, () => Promise<Partial<Messages>>>> = {
  en: () => import("./locales/en-admin").then((m) => m.enAdmin),
  am: () => import("./locales/am-admin").then((m) => m.amAdmin),
};

/**
 * Part H1 — the loader for a language code, read from the map's OWN keys only.
 * The code arrives from outside (the URL, storage); a code that names a member
 * every object inherits ("constructor", "toString") answers undefined, like any
 * code without a compiled catalog.
 */
export function compiledCatalogLoader(code: string): (() => Promise<Messages>) | undefined {
  return Object.prototype.hasOwnProperty.call(loaders, code) ? loaders[code] : undefined;
}

/** The admin layer's loader, under the same own-key law as compiledCatalogLoader. */
export function compiledAdminLoader(
  code: string,
): (() => Promise<Partial<Messages>>) | undefined {
  return Object.prototype.hasOwnProperty.call(adminLoaders, code) ? adminLoaders[code] : undefined;
}
