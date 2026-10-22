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
const loaders: Partial<Record<string, () => Promise<Partial<Messages>>>> = {
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
export function compiledCatalogLoader(
  code: string,
): (() => Promise<Partial<Messages>>) | undefined {
  return Object.prototype.hasOwnProperty.call(loaders, code) ? loaders[code] : undefined;
}

/** The admin layer's loader, under the same own-key law as compiledCatalogLoader. */
export function compiledAdminLoader(code: string): (() => Promise<Partial<Messages>>) | undefined {
  return Object.prototype.hasOwnProperty.call(adminLoaders, code) ? adminLoaders[code] : undefined;
}

/**
 * INC-816 (bundle 22 turn 24) — which admin parts apply after a load, and the
 * admin layer's state. `enAdmin` is the English admin part loaded this run or
 * kept from an earlier run (null when none was ever loaded); `langAdmin` is the
 * language's own admin part (null when it failed or the language has none).
 * With the English part in hand the layer is ready — a failed language part
 * leaves admin text in English, never blank. Without it the base applies alone
 * and the state is failed, unless it was already ready.
 */
export function adminLayerOutcome(input: {
  enAdmin: Partial<Messages> | null;
  langAdmin: Partial<Messages> | null;
  wasReady: boolean;
}): {
  enAdmin: Partial<Messages> | null;
  langAdmin: Partial<Messages> | null;
  state: "ready" | "failed";
} {
  if (input.enAdmin === null) {
    return { enAdmin: null, langAdmin: null, state: input.wasReady ? "ready" : "failed" };
  }
  return { enAdmin: input.enAdmin, langAdmin: input.langAdmin, state: "ready" };
}
