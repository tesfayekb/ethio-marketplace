import { errorText } from "@/lib/error-text";
import { loadOnce } from "@/lib/load-once";

import type { Messages } from "./types";

/**
 * D234 S3 (INC-897) — each compiled layer is fetched once per visit
 * (src/lib/load-once.ts); a failed download is forgotten so the next load asks
 * again, and the provider answers it as it always has (INC-107, INC-816).
 *
 * INC-107 — A MISSING COMPILED LAYER IS EMPTY, NOT FATAL.
 *
 * The compiled catalogs are a SEED, not the language registry: a language the
 * operator publishes in the console may legitimately exist in the DATABASE
 * only, with no file here. The registry is therefore a partial map keyed by
 * code, and a lookup miss means "the compiled layer for this language is `{}`"
 * — the chain becomes compiled.en ▸ {} ▸ DB[lang], never a throw.
 */
const AM_BASE = loadOnce(() => import("./locales/am-base").then((m) => m.amBase));
const loaders: Partial<Record<string, () => Promise<Partial<Messages>>>> = {
  am: () => AM_BASE.load(),
};

/**
 * DEC-231, generalised by DEC-258 (Foundations turn 30) — THE STRINGS LAYERS.
 * A string only some screens show rides apart from the first paint: the routes
 * that show it declare its layer (`staticData: { strings: [...] }`), and the
 * shell's gate (StringsLayerGate) loads the declared layers before those
 * routes draw. A compiled layer is a PART of Messages; a language without one
 * has none to load. The order is the census's preference: a key every one of
 * whose pages loads both layers lives in the first
 * (scripts/conformance/strings-layers.ts).
 */
export const STRINGS_LAYERS = ["admin", "member"] as const;
export type StringsLayer = (typeof STRINGS_LAYERS)[number];

const EN_ADMIN = loadOnce(() => import("./locales/en-admin").then((m) => m.enAdmin));
const AM_ADMIN = loadOnce(() => import("./locales/am-admin").then((m) => m.amAdmin));
const EN_MEMBER = loadOnce(() => import("./locales/en-member").then((m) => m.enMember));
const AM_MEMBER = loadOnce(() => import("./locales/am-member").then((m) => m.amMember));
const layerLoaders: Record<
  StringsLayer,
  Partial<Record<string, () => Promise<Partial<Messages>>>>
> = {
  admin: { en: () => EN_ADMIN.load(), am: () => AM_ADMIN.load() },
  member: { en: () => EN_MEMBER.load(), am: () => AM_MEMBER.load() },
};

/** A layer name read from outside (a route's declaration joined into a key). */
export function isStringsLayer(value: string): value is StringsLayer {
  return (STRINGS_LAYERS as readonly string[]).includes(value);
}

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

/** A layer's loader for a language, under the same own-key law as compiledCatalogLoader. */
export function compiledLayerLoader(
  layer: StringsLayer,
  code: string,
): (() => Promise<Partial<Messages>>) | undefined {
  const loaders = layerLoaders[layer];
  return Object.prototype.hasOwnProperty.call(loaders, code) ? loaders[code] : undefined;
}

/**
 * DEC-258 — start downloading the layers a route is about to show, for the
 * given languages (the root's beforeLoad, on a navigation or a link's
 * preload), so the gate seldom waits. Only a head start: the provider's load
 * reports and retries a failure.
 */
export function warmStringsLayers(layers: readonly StringsLayer[], codes: readonly string[]): void {
  for (const layer of layers) {
    for (const code of new Set(codes)) {
      compiledLayerLoader(layer, code)?.().catch((error: unknown) => {
        console.warn(`[i18n] warming the ${layer} strings for ${code} failed: ${errorText(error)}`);
      });
    }
  }
}

/**
 * INC-816 (bundle 22 turn 24; every layer since DEC-258) — which parts of a
 * layer apply after a load, and the layer's state. `en` is the English part
 * loaded this run or kept from an earlier run (null when none was ever
 * loaded); `lang` is the language's own part (null when it failed or the
 * language has none). With the English part in hand the layer is ready — a
 * failed language part leaves the layer's text in English, never blank.
 * Without it the base applies alone and the state is failed, unless it was
 * already ready.
 */
export function layerOutcome(input: {
  en: Partial<Messages> | null;
  lang: Partial<Messages> | null;
  wasReady: boolean;
}): {
  en: Partial<Messages> | null;
  lang: Partial<Messages> | null;
  state: "ready" | "failed";
} {
  if (input.en === null) {
    return { en: null, lang: null, state: input.wasReady ? "ready" : "failed" };
  }
  return { en: input.en, lang: input.lang, state: "ready" };
}
