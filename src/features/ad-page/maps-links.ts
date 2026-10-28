import { pathToNode, type TreeNode } from "@/components/shell/location-data";

export function mapsPlaceQuery(nodes: TreeNode[], coverage: string[]): string {
  const paths = coverage.map((id) => pathToNode(nodes, id)).filter((path) => path.length > 0);
  const first = paths[0];
  if (!first) return "";
  const common: TreeNode[] = [];
  for (const [index, node] of first.entries()) {
    if (!paths.every((path) => path[index]?.id === node.id)) break;
    common.push(node);
  }
  return common
    .reverse()
    .map((node) => node.nameEn ?? node.slug)
    .join(", ");
}

/** One place of the server's document, with its ancestors (country first) — INC-949. */
export interface PathedPlace {
  id: string;
  nameEn: string;
  path?: ReadonlyArray<{ id: string; nameEn: string }>;
}

/**
 * INC-949 — the Maps address from the document's own paths, so it never waits for the
 * country tree: the places' shared ancestry, nearest first. "" when there is no place or a
 * place carries no path (the caller then falls back to the tree).
 */
export function mapsPathQuery(places: ReadonlyArray<PathedPlace>): string {
  if (places.length === 0) return "";
  const chains: Array<ReadonlyArray<{ id: string; nameEn: string }>> = [];
  for (const place of places) {
    if (!place.path) return "";
    chains.push([...place.path, { id: place.id, nameEn: place.nameEn }]);
  }
  const first = chains[0] ?? [];
  const common: Array<{ id: string; nameEn: string }> = [];
  for (const [index, step] of first.entries()) {
    if (!chains.every((chain) => chain[index]?.id === step.id)) break;
    common.push(step);
  }
  return common
    .reverse()
    .map((step) => step.nameEn)
    .join(", ");
}

export function webPlaceUrl(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function webPinUrl(lat: number | string, lng: number | string): string {
  return `https://www.google.com/maps/search/?api=1&query=${lat}%2C${lng}`;
}

export function appPlaceUrl(query: string): string {
  return `comgooglemaps://?q=${encodeURIComponent(query)}`;
}

export function appPinUrl(lat: number | string, lng: number | string, zoom: number): string {
  return `comgooglemaps://?q=${lat},${lng}&center=${lat},${lng}&zoom=${zoom}`;
}

export function isIosHomeScreen(): boolean {
  return (
    typeof navigator !== "undefined" &&
    (navigator as Navigator & { standalone?: boolean }).standalone === true
  );
}
