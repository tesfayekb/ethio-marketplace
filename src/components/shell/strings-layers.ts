import { STRINGS_LAYERS, type StringsLayer } from "@/i18n";

/**
 * DEC-258 — A ROUTE NAMES THE STRINGS LAYERS ITS SCREENS SHOW.
 *
 * `staticData: { strings: ["member"] }` on a route (or on a layout above it)
 * declares that its screens show that layer's keys; the shell's gate
 * (StringsLayerGate) loads every layer the matched routes declare before the
 * route draws, and the root's beforeLoad starts the download on a navigation
 * or a link's preload. scripts/conformance/strings-layers.ts decides which
 * keys live in which layer from these declarations.
 */
declare module "@tanstack/react-router" {
  interface StaticDataRouteOption {
    /** The strings layers this route's screens show (DEC-258). */
    strings?: readonly StringsLayer[];
  }
}

/** The layers a set of matched routes declare, in STRINGS_LAYERS order, each once. */
export function declaredLayers(
  staticData: readonly { strings?: readonly StringsLayer[] }[],
): StringsLayer[] {
  return STRINGS_LAYERS.filter((layer) =>
    staticData.some((data) => data.strings?.includes(layer) === true),
  );
}
