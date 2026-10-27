import type { MessageKey } from "@/i18n/types";

/**
 * INC-940 — THE STILL MAP HOLDS ITS BOX FROM THE FIRST PAINT. The still map's code is fetched on
 * demand (src/features/posting/preview/listing-detail.tsx, src/features/posting/step-where.tsx)
 * and, on the buyer's page, its library waits until its box nears the screen (D234 S1), so the
 * map and its credit arrive after the page has painted. Its place while it loads, its place when it
 * cannot download (MapFrame, map-frame.tsx), and the map itself draw the same box and the same
 * caption from this one module;
 * the provider's credit, whose length only the tile plan knows (one line for OpenStreetMap, two for
 * Esri on a narrow card), is drawn ON the map's box at its foot, as map attributions are, so it
 * takes no room in the page. Nothing around the map moves when it arrives. This file and
 * map-frame.tsx are not fetched on demand: they carry no map code, only the box.
 */

/** The still map's box: the map draws into it, and its places draw it empty. */
export const STILL_MAP_BOX = "isolate h-48 w-full overflow-hidden rounded-md border border-border";

/** The provider's credit: a band across the still map's foot, inside its border, above its panes. */
export const STILL_MAP_CREDIT =
  "absolute inset-x-px bottom-px z-10 rounded-b-md bg-background/80 px-2 py-0.5 text-end text-xs text-muted-foreground";

/** The caption under the still map: the buyer's words for an approximate pin, the seller's always. */
export function stillMapCaptionKey(
  audience: "seller" | "buyer",
  approx: boolean,
): MessageKey | null {
  if (audience === "buyer") return approx ? "adPage.map.approx" : null;
  return approx ? "post.pin.previewApprox" : "post.pin.previewExact";
}
