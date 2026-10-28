import { LoadFailedHere } from "@/components/shell/on-demand-notice";

import { MAP_FAILED_IDS } from "./still-map";

/**
 * INC-956 (Foundations turns C1, C1-2, C2) — A MAP WHOSE OWN CODE CANNOT DOWNLOAD SAYS SO WHERE THE
 * MAP IS: the failure and its one cure, Refresh (LoadFailedHere), once — the resilientLazy fallback
 * of the map's own chunk, drawn by the pages (listing-detail.tsx, step-where.tsx) inside MapFrame.
 * What the map fetches when it draws (Leaflet and the tile plan) the map says itself, in its own
 * box (map-preview.tsx, map-large.tsx), with the same test ids from still-map.ts. This file is
 * imported only by the pages' fallbacks, never by a piece fetched on demand (INC-964's rule), so
 * the fallback is on the device when the piece's download fails.
 */
export function MapFailedHere({ large = false }: { large?: boolean }) {
  return <LoadFailedHere {...(large ? MAP_FAILED_IDS.large : MAP_FAILED_IDS.still)} />;
}
